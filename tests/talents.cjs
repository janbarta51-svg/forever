"use strict";
// No browser, external requests or API token needed.
// Tests the documented third-party mount contract against a local stub.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const root = path.resolve(__dirname, "..");
const read = name => fs.readFileSync(path.join(root, name), "utf8");
const html = read("index.html");

function check(condition, label) {
  assert.ok(condition, label);
  console.log("PASS " + label);
}
class Element {
  constructor(id) {
    this.id = id;
    this.value = "";
    this.textContent = "";
    this.href = "";
    this.disabled = false;
    this.hidden = false;
    this.dataset = {};
    this.handlers = {};
    this.onError = null;
  }
  addEventListener(name, handler) { this.handlers[name] = handler; }
  remove() { this.removed = true; }
}
function host() {
  const ids = ["talentClass", "talentLevel", "talentPoints", "talentWowhead",
    "talentCopyLink", "talentStatus", "talentRetry", "talentCanvas"];
  const elements = Object.fromEntries(ids.map(id => [id, new Element(id)]));
  elements.talentClass.value = "warrior";
  elements.talentLevel.value = "60";
  let failNextLoad = false;
  const mounted = [], updates = [], copied = [], scripts = [];
  const state = {
    shareUrl: "https://warcraftforever.com/talents/warrior/?v=2&build=TEST",
    pointsSpent: 0,
    complete: false
  };
  const widget = {
    ready: Promise.resolve(state),
    on() { return () => {}; },
    async update(options) { updates.push(options); return state; },
    getState() { return state; }
  };
  const window = {};
  const document = {
    getElementById(id) { return elements[id] || null; },
    createElement(tag) {
      const node = new Element(tag);
      return node;
    },
    head: {
      appendChild(script) {
        scripts.push(script);
        setImmediate(() => {
          if (failNextLoad) {
            script.onerror?.();
          } else {
            window.WarcraftForever = {
              Talents: {
                mount(target, options) {
                  mounted.push({target, options});
                  return widget;
                }
              }
            };
            script.onload?.();
          }
        });
      }
    },
    querySelector(selector) {
      if (selector === 'script[data-forever-talent-library="true"]') {
        return scripts.find(script=>script.dataset.foreverTalentLibrary === "true" && !script.removed) || null;
      }
      return null;
    },
    body: { appendChild() {} }
  };
  const navigator = {clipboard: {async writeText(text) {copied.push(text);}}};
  vm.runInNewContext(read("talents.js"), {window, document, navigator}, {filename:"talents.js"});
  return {elements, window, document, mounted, updates, copied, scripts,
    setLoadError(enabled) {failNextLoad = enabled;}};
}
const flush = async () => {
  await new Promise(resolve=>setImmediate(resolve));
  await new Promise(resolve=>setImmediate(resolve));
};
async function run() {
  check(html.includes('href="#talents" data-tab="talents"'), "Talent Calculator navigation link exists");
  check(html.includes('id="view-talents"') && html.includes('id="talentCanvas"'), "Planner has its own in-page tab");
  check(html.includes('src="talents.js?v=20261120"'), "Integration script is loaded on the page");
  check(html.indexOf('src="talents.js') < html.indexOf('src="app.js'), "Talent integration is available before main app");
  check(read("app.js").includes('if(selected==="talents")window.ForeverTalentCalculator?.show()'),
    "Main navigation lazily mounts the calculator");
  check(html.includes('https://www.wowhead.com/forever/talent-calc/warrior'),
    "Original Wowhead calculator remains directly accessible");
  for (const cl of ["warrior","paladin","hunter","rogue","priest","shaman","mage","warlock","druid"])
    check(html.includes('value="' + cl + '"'), "Class selector supports " + cl);
  const h = host();
  check(h.scripts.length===0, "Calculator loads nothing until its tab is shown");
  h.window.ForeverTalentCalculator.show();
  await flush();
  check(h.scripts.length===1 && h.scripts[0].src.endsWith("/talents/latest.js?alias=0"),
    "Supported third-party talent library loads lazily");
  check(h.mounted.length===1 && h.mounted[0].target===h.elements.talentCanvas,
    "Calculator renders inside this page");
  check(h.mounted[0].options.class==="warrior"&&h.mounted[0].options.maxLevel===60,
    "Warrior defaults to the level 60 planner");
  check(h.elements.talentPoints.textContent==="51" && !h.elements.talentCopyLink.disabled,
    "Full 51 points and share button available");
  h.elements.talentClass.value="priest";
  h.elements.talentClass.handlers.change();
  await flush();
  check(h.updates.length===1 && h.updates[0].class==="priest",
    "Class change updates the same mounted calculator");
  check(h.elements.talentWowhead.href.endsWith("/priest"), "Wowhead shortcut follows selected class");
  h.elements.talentLevel.value="30";
  h.elements.talentLevel.handlers.change();
  await flush();
  check(h.updates.at(-1).maxLevel===30&&h.elements.talentPoints.textContent==="21",
    "Level 30 offers exactly 21 talent points");
  h.elements.talentLevel.value="999";
  h.elements.talentLevel.handlers.change();
  await flush();
  check(h.elements.talentLevel.value==="60"&&h.updates.at(-1).maxLevel===60,
    "Planner level is safely capped at 60");
  h.elements.talentCopyLink.handlers.click();
  await flush();
  check(h.copied.length===1&&h.copied[0].startsWith("https://warcraftforever.com/"),
    "Copy build link uses the actual provider share URL");
  h.window.ForeverTalentCalculator.show();
  await flush();
  check(h.mounted.length===1&&h.scripts.length===1,"Repeated tab visits do not remount or reload");
  const fallback=host();
  fallback.setLoadError(true);
  fallback.window.ForeverTalentCalculator.show();
  await flush();
  check(fallback.elements.talentStatus.dataset.state==="error"&&!fallback.elements.talentRetry.hidden,
    "CDN failure is reported with a retry button");
  check(fallback.elements.talentWowhead.href.includes("wowhead.com/forever/talent-calc"),
    "Wowhead remains available after an embed failure");
  fallback.setLoadError(false);
  fallback.elements.talentRetry.handlers.click();
  await flush();
  check(fallback.mounted.length===1&&!fallback.elements.talentCopyLink.disabled,
    "Retry recovers and mounts the calculator");
  console.log("All talent integration tests passed.");
}
run().catch(error=>{console.error(error);process.exitCode=1;});
