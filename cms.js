(() => {
"use strict";
const REPO = "janbarta51-svg/forever";
const FILE = "links.json";
const API = "https://api.github.com/repos/" + REPO + "/contents/" + FILE;
const $ = selector => document.querySelector(selector);

let links = [];
let loadedSnapshot = null;
let dirty = false;

function status(message, bad = false) {
  const element = $("#cmsStatus");
  element.textContent = message;
  element.style.color = bad ? "#df8f86" : "#92c88e";
}
function normalize(documentData) {
  if (!documentData || !Array.isArray(documentData.links)) {
    throw new Error("Invalid links.json: expected a links array.");
  }
  return documentData.links.map(item => ({
    title: String(item?.title ?? ""),
    url: String(item?.url ?? "")
  }));
}
function snapshot(items) {
  return JSON.stringify(items);
}
function isURL(value) {
  try {
    const url = new URL(value.trim());
    return ["https:", "http:"].includes(url.protocol);
  } catch {
    return false;
  }
}
function validLinks() {
  const clean = links.map(item => ({ title: item.title.trim(), url: item.url.trim() }));
  if (!clean.every(item => item.title && isURL(item.url))) {
    throw new Error("Enter a name and valid http/https URL for every link.");
  }
  return clean;
}
function json() {
  return JSON.stringify({ links: validLinks() }, null, 2) + "\n";
}
function render() {
  const root = $("#cmsList");
  root.replaceChildren();
  links.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "cms-row";
    const title = document.createElement("input");
    title.placeholder = "Site name";
    title.value = item.title;
    title.setAttribute("aria-label", "Link name " + (index + 1));
    const url = document.createElement("input");
    url.placeholder = "https://...";
    url.value = item.url;
    url.setAttribute("aria-label", "Link URL " + (index + 1));
    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.type = "button";
    title.addEventListener("input", () => { links[index].title = title.value; dirty = true; });
    url.addEventListener("input", () => { links[index].url = url.value; dirty = true; });
    remove.addEventListener("click", () => { links.splice(index, 1); dirty = true; render(); });
    row.append(title, url, remove);
    root.append(row);
  });
}
function decodeBase64UTF8(encoded) {
  const binary = atob(encoded.replace(/\s/g, ""));
  return new TextDecoder().decode(Uint8Array.from(binary, character => character.charCodeAt(0)));
}
async function readGitHub(token = "") {
  const headers = { "Accept": "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" };
  if (token) headers.Authorization = "Bearer " + token;
  const response = await fetch(API + "?ref=main", { headers, cache: "no-store" });
  if (!response.ok) throw new Error("GitHub read failed: HTTP " + response.status);
  const file = await response.json();
  if (file.encoding !== "base64" || !file.sha || typeof file.content !== "string") {
    throw new Error("GitHub did not return a valid links.json file.");
  }
  return { sha: file.sha, links: normalize(JSON.parse(decodeBase64UTF8(file.content))) };
}
async function load(source = "published") {
  if (dirty && !window.confirm("Discard unsaved CMS changes and reload?")) return;
  $("#reloadLinks").disabled = true;
  try {
    let next;
    if (source === "github") {
      const token = $("#githubToken").value.trim();
      $("#githubToken").value = "";
      next = (await readGitHub(token)).links;
    } else {
      const response = await fetch(FILE, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      next = normalize(await response.json());
    }
    links = next;
    loadedSnapshot = snapshot(links);
    dirty = false;
    render();
    status(source === "github"
      ? "Loaded the latest links.json from GitHub main. The public site updates after deployment."
      : "Loaded links.json from the published site.");
  } catch (error) {
    status("Could not load links: " + error.message, true);
  } finally {
    $("#reloadLinks").disabled = false;
  }
}
function bytesBase64(value) {
  const bytes = new TextEncoder().encode(value);
  let binary = "";
  bytes.forEach(byte => { binary += String.fromCharCode(byte); });
  return btoa(binary);
}
async function publish() {
  const token = $("#githubToken").value.trim();
  if (!token) {
    status("Enter a fine-grained GitHub token or download links.json and commit it manually.", true);
    return;
  }
  // Never keep credentials in the input after the operation begins.
  $("#githubToken").value = "";
  let payload, clean;
  try {
    clean = validLinks();
    payload = json();
    if (loadedSnapshot === null) throw new Error("Load links before publishing.");
  } catch (error) {
    status(error.message, true);
    return;
  }
  $("#publishLinks").disabled = true;
  $("#reloadLinks").disabled = true;
  status("Checking GitHub for newer changes...");
  const headers = {
    "Authorization": "Bearer " + token,
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "Content-Type": "application/json"
  };
  try {
    const current = await readGitHub(token);
    if (snapshot(current.links) !== loadedSnapshot) {
      throw new Error("GitHub links.json changed since it was loaded. Copy your unsaved edits first, then use Reload from GitHub. Nothing was overwritten.");
    }
    const response = await fetch(API, {
      method: "PUT",
      headers,
      body: JSON.stringify({
        message: "CMS: update useful links",
        content: bytesBase64(payload),
        sha: current.sha,
        branch: "main"
      })
    });
    if (!response.ok) {
      const result = await response.json().catch(() => ({}));
      throw new Error("GitHub write failed: HTTP " + response.status + " " + (result.message || ""));
    }
    links = clean;
    loadedSnapshot = snapshot(links);
    dirty = false;
    render();
    status("Saved to GitHub main. GitHub Pages will display the changes after deployment.");
  } catch (error) {
    status("Publish failed: " + error.message, true);
  } finally {
    $("#publishLinks").disabled = false;
    $("#reloadLinks").disabled = false;
  }
}
$("#addLink").addEventListener("click", () => {
  links.push({ title: "", url: "" });
  dirty = true;
  render();
  $("#cmsList").lastElementChild?.querySelector("input")?.focus();
});
$("#downloadJson").addEventListener("click", () => {
  let data;
  try { data = json(); } catch (error) { status(error.message, true); return; }
  const url = URL.createObjectURL(new Blob([data], { type: "application/json" }));
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = FILE;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  status("Downloaded links.json. Commit it to main to publish.");
});
$("#publishLinks").addEventListener("click", publish);
$("#reloadLinks").addEventListener("click", () => load("github"));
load();
})();
