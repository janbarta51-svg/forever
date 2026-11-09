"use strict";
// Run with: node tests/cms.cjs
// Simulates the browser's DOM and GitHub Contents API; no network or token needed.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { TextDecoder, TextEncoder } = require("node:util");
const root = path.resolve(__dirname, "..");
const read = file => fs.readFileSync(path.join(root, file), "utf8");
const published = JSON.parse(read("links.json"));
const API = "https://api.github.com/repos/janbarta51-svg/forever/contents/links.json";

class Element {
  constructor(tag) {
    this.tag = tag;
    this.children = [];
    this.handlers = {};
    this.style = {};
    this.value = "";
    this.textContent = "";
    this.disabled = false;
  }
  replaceChildren() { this.children = []; }
  append(...nodes) { this.children.push(...nodes); }
  setAttribute() {}
  addEventListener(name, handler) { this.handlers[name] = handler; }
  get lastElementChild() { return this.children.at(-1) || null; }
  querySelector(name) { return this.children.find(child => child.tag === name) || null; }
  focus() {}
  click() {}
  remove() {}
}
const ids = ["cmsList", "cmsStatus", "githubToken", "publishLinks", "reloadLinks", "addLink", "downloadJson"];
const elements = Object.fromEntries(ids.map(id => ["#" + id, new Element("control")]));
const document = {
  querySelector: selector => elements[selector],
  createElement: tag => new Element(tag),
  body: new Element("body")
};
let confirmResult = true, confirmCalls = 0;
const window = {
  confirm: () => { confirmCalls++; return confirmResult; }
};
let remote = JSON.parse(JSON.stringify(published));
let remoteSha = "test-sha-1";
let reads = 0, writes = 0, publishedReads = 0;
const fetch = async (url, options = {}) => {
  if (url === "links.json") {
    publishedReads++;
    return { ok: true, json: async () => published };
  }
  if (url === API + "?ref=main") {
    reads++;
    return {
      ok: true,
      json: async () => ({
        encoding: "base64",
        sha: remoteSha,
        content: Buffer.from(JSON.stringify(remote), "utf8").toString("base64")
      })
    };
  }
  if (url === API && options.method === "PUT") {
    writes++;
    const payload = JSON.parse(options.body);
    assert.equal(payload.branch, "main");
    assert.equal(payload.sha, remoteSha);
    assert.match(options.headers.Authorization, /^Bearer test-token$/);
    remote = JSON.parse(Buffer.from(payload.content, "base64").toString("utf8"));
    remoteSha = "test-sha-" + (writes + 1);
    return { ok: true, json: async () => ({ content: { sha: remoteSha } }) };
  }
  throw new Error("Unexpected request: " + url);
};
const context = {
  document, window, fetch,
  URL, TextEncoder, TextDecoder, Uint8Array, Blob, setTimeout,
  atob: encoded => Buffer.from(encoded, "base64").toString("binary"),
  btoa: binary => Buffer.from(binary, "binary").toString("base64")
};
const tick = () => new Promise(resolve => setImmediate(resolve));
function assertTrue(value, message) {
  assert.ok(value, message);
  console.log("PASS " + message);
}
async function run() {
  const cmsHTML = read("cms.html"), index = read("index.html");
  assertTrue(cmsHTML.includes('class="cms-back-link"'), "CMS has visible back navigation on mobile");
  assertTrue(index.includes('href="cms.html"'), "Website links to the CMS");
  assertTrue(index.includes('id="linksStatus"'), "Website shows link loading errors");
  assertTrue(read("app.js").includes('fetch("links.json",{cache:"no-store"})'), "Website reads the CMS data source");
  vm.runInNewContext(read("cms.js"), context, { filename: "cms.js" });
  await tick();
  assertTrue(elements["#cmsList"].children.length === published.links.length, "CMS loads the published file");
  assertTrue(elements["#cmsStatus"].textContent.includes("published site"), "CMS distinguishes published data");
  elements["#addLink"].handlers.click();
  const last = elements["#cmsList"].lastElementChild;
  last.children[0].value = "Temporary entry";
  last.children[0].handlers.input();
  last.children[1].value = "https://example.org";
  last.children[1].handlers.input();
  assertTrue(elements["#cmsList"].children.length === published.links.length + 1, "Editing adds a new link");
  confirmResult = false;
  await elements["#reloadLinks"].handlers.click();
  assertTrue(elements["#cmsList"].children.length === published.links.length + 1, "Reload cannot discard changes without confirmation");
  confirmResult = true;
  await elements["#reloadLinks"].handlers.click();
  assertTrue(elements["#cmsList"].children.length === published.links.length && reads === 1, "Reload fetches current GitHub main file");
  const first = elements["#cmsList"].children[0];
  first.children[1].value = "javascript:alert(1)";
  first.children[1].handlers.input();
  elements["#githubToken"].value = "test-token";
  await elements["#publishLinks"].handlers.click();
  assertTrue(writes === 0 && elements["#cmsStatus"].textContent.includes("valid http/https"), "Unsafe URLs cannot be published");
  assertTrue(elements["#githubToken"].value === "", "Token is cleared even on validation error");
  first.children[1].value = "https://updated.example.net";
  first.children[1].handlers.input();
  elements["#githubToken"].value = "test-token";
  await elements["#publishLinks"].handlers.click();
  assertTrue(writes === 1 && remote.links[0].url === "https://updated.example.net", "Publishing updates the GitHub document");
  assertTrue(elements["#githubToken"].value === "" && elements["#cmsStatus"].textContent.includes("Saved to GitHub"), "Publish clears token and reports success");
  const changed = elements["#cmsList"].children[0];
  changed.children[0].value = "Unpublished edit";
  changed.children[0].handlers.input();
  remote.links.push({ title: "Concurrent edit", url: "https://other.example.net" });
  elements["#githubToken"].value = "test-token";
  await elements["#publishLinks"].handlers.click();
  assertTrue(writes === 1 && elements["#cmsStatus"].textContent.includes("Nothing was overwritten"), "Concurrent GitHub changes block stale publish");
  assertTrue(remote.links.at(-1).title === "Concurrent edit", "Other people's changes remain intact");
  assertTrue(confirmCalls >= 2 && publishedReads === 1, "Initial loading and discard confirmation paths are covered");
  console.log("All CMS integration tests passed.");
}
run().catch(error => { console.error(error); process.exitCode = 1; });
