/* Forever native talent calculator integration.
 * Uses the documented, maintained embed library from Warcraft Forever.
 * Wowhead does not currently document an equivalent Forever embed endpoint.
 * No third-party scripts are copied into our GitHub repository.
 * Documentation: https://warcraftforever.com/developers/quickstart/
 */
(() => {
  "use strict";

  const LIBRARY_URL = "https://warcraftforever.com/talents/latest.js?alias=0";
  const CLASSES = new Set([
    "warrior", "paladin", "hunter", "rogue", "priest",
    "shaman", "mage", "warlock", "druid"
  ]);
  const $ = id => document.getElementById(id);
  let loading = null;
  let instance = null;
  let lastClass = null;
  let lastLevel = null;
  let requestId = 0;
  let initialized = false;

  function options() {
    const chosen = $("talentClass").value;
    const className = CLASSES.has(chosen) ? chosen : "warrior";
    const raw = Number($("talentLevel").value);
    const maxLevel = Number.isFinite(raw) ? Math.min(60, Math.max(10, Math.round(raw))) : 60;
    $("talentLevel").value = String(maxLevel);
    $("talentPoints").textContent = String(maxLevel - 9);
    $("talentWowhead").href = "https://www.wowhead.com/forever/talent-calc/" + className;
    return { class: className, maxLevel, editable: true, view: "calculator", chrome: "compact" };
  }

  function status(message, isError = false) {
    const target = $("talentStatus");
    target.textContent = message;
    target.dataset.state = isError ? "error" : "info";
    $("talentRetry").hidden = !isError;
  }

  function loadLibrary() {
    if (window.WarcraftForever?.Talents?.mount) {
      return Promise.resolve(window.WarcraftForever.Talents);
    }
    if (!loading) {
      loading = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = LIBRARY_URL;
        script.async = true;
        script.dataset.foreverTalentLibrary = "true";
        script.onload = () => {
          if (window.WarcraftForever?.Talents?.mount) {
            resolve(window.WarcraftForever.Talents);
          } else {
            reject(new Error("Talent library loaded without the expected calculator API."));
          }
        };
        script.onerror = () => reject(new Error("Cannot load the talent library from its provider."));
        document.head.appendChild(script);
      });
    }
    return loading;
  }

  async function renderCalculator() {
    const current = ++requestId;
    const config = options();
    $("talentCopyLink").disabled = true;
    status("Loading the talent trees…");
    try {
      const api = await loadLibrary();
      if (current !== requestId) return;
      if (!instance) {
        instance = api.mount($("talentCanvas"), config);
        lastClass = config.class;
        lastLevel = config.maxLevel;
        instance.on("error", error => {
          status("Talent calculator error: " + (error?.message || "Unknown error"), true);
        });
        await instance.ready;
      } else if (config.class !== lastClass || config.maxLevel !== lastLevel) {
        // Class changes reset its talent build. Lower level caps can make an
        // allocated build invalid; in that case reset to a valid empty build.
        const changedClass = config.class !== lastClass;
        try {
          await instance.update(changedClass ? { ...config, build: undefined } : config);
        } catch (error) {
          if (current !== requestId) return;
          await instance.update({ ...config, build: undefined });
        }
        lastClass = config.class;
        lastLevel = config.maxLevel;
      }
      if (current !== requestId) return;
      $("talentCopyLink").disabled = false;
      status("Ready · Choose talents in the trees below. You can share your build.");
    } catch (error) {
      if (current !== requestId) return;
      status("The embedded calculator could not load. You can still open the original on Wowhead. " +
        (error?.message || ""), true);
    }
  }

  async function copyShareLink() {
    if (!instance) return;
    let url = instance.getState()?.shareUrl;
    if (typeof url !== "string" || !/^https:\/\//.test(url)) {
      status("The provider has not created a share link for this build yet.", true);
      return;
    }
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const field = document.createElement("textarea");
        field.value = url;
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Clipboard permission denied");
      }
      status("Build link copied. You can share it with your party.");
    } catch (_) {
      status("Copy failed. Use the built-in share option inside the calculator.", true);
    }
  }

  function initialize() {
    if (initialized) return;
    initialized = true;
    $("talentClass").addEventListener("change", () => { void renderCalculator(); });
    $("talentLevel").addEventListener("change", () => { void renderCalculator(); });
    $("talentCopyLink").addEventListener("click", () => { void copyShareLink(); });
    $("talentRetry").addEventListener("click", () => {
      // Retry after a CDN/CSP failure rather than reusing a rejected Promise.
      document.querySelector('script[data-forever-talent-library="true"]')?.remove();
      loading = null;
      void renderCalculator();
    });
  }

  window.ForeverTalentCalculator = Object.freeze({
    show() {
      initialize();
      if (!instance) void renderCalculator();
    }
  });
})();
