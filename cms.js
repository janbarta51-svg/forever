(()=>{"use strict";
const REPO="janbarta51-svg/forever";const FILE="links.json";const $=s=>document.querySelector(s);
const status=(msg,bad=false)=>{$("#cmsStatus").textContent=msg;$("#cmsStatus").style.color=bad?"#df8f86":"#92c88e"};
let links=[];
function isURL(v){try{let u=new URL(v.trim());return ["https:","http:"].includes(u.protocol)}catch{return false}}
function render(){const root=$("#cmsList");root.replaceChildren();links.forEach((item,i)=>{const row=document.createElement("div");row.className="cms-row";
 const title=document.createElement("input");title.placeholder="Site name";title.value=item.title;title.setAttribute("aria-label","Link name "+(i+1));
 const url=document.createElement("input");url.placeholder="https://…";url.value=item.url;url.setAttribute("aria-label","Link URL "+(i+1));
 const del=document.createElement("button");del.textContent="Remove";del.type="button";
 title.addEventListener("input",()=>{links[i].title=title.value});url.addEventListener("input",()=>{links[i].url=url.value});del.addEventListener("click",()=>{links.splice(i,1);render()});
 row.append(title,url,del);root.append(row)})}
function validLinks(){const clean=links.map(x=>({title:x.title.trim(),url:x.url.trim()}));if(!clean.every(x=>x.title&&isURL(x.url)))throw Error("Enter a name and a valid http/https URL for every link.");return clean}
function json(){return JSON.stringify({links:validLinks()},null,2)+"\n"}
async function load(){try{const r=await fetch(FILE,{cache:"no-store"});if(!r.ok)throw Error("HTTP "+r.status);const d=await r.json();links=(Array.isArray(d.links)?d.links:[]).map(x=>({title:String(x.title||""),url:String(x.url||"")}));render();status("Links loaded.")}catch(e){status("Cannot load links.json. Open the editor through a web server or GitHub Pages, not file://. "+e.message,true);render()}}
function bytesBase64(s){const arr=new TextEncoder().encode(s);let bin="";arr.forEach(b=>bin+=String.fromCharCode(b));return btoa(bin)}
async function githubPublish(){const tok=$("#githubToken").value.trim();if(!tok){status("Enter a token with Contents: Read and write access, or download the JSON and upload it manually.",true);return}
 let payload;try{payload=json()}catch(e){status(e.message,true);return}
 $("#publishLinks").disabled=true;status("Checking the current links.json version…");
 const endpoint="https://api.github.com/repos/"+REPO+"/contents/"+FILE;
 const headers={"Authorization":"Bearer "+tok,"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","Content-Type":"application/json"};
 try{
  const get=await fetch(endpoint,{headers,cache:"no-store"});if(!get.ok)throw Error("GitHub read failed: HTTP "+get.status+" (check token and permissions)");
  const original=await get.json();
  const put=await fetch(endpoint,{method:"PUT",headers,body:JSON.stringify({message:"CMS: update useful links",content:bytesBase64(payload),sha:original.sha,branch:"main"})});
  if(!put.ok){const result=await put.json().catch(()=>({}));throw Error("GitHub write failed: HTTP "+put.status+" "+(result.message||""))}
  $("#githubToken").value="";status("✓ Saved to the main branch. GitHub Pages will publish the changes on its next deployment.");
 }catch(e){status("Error: "+e.message,true)}finally{$("#publishLinks").disabled=false}
}
$("#addLink").addEventListener("click",()=>{links.push({title:"",url:""});render();$("#cmsList").lastElementChild?.querySelector("input")?.focus()});
$("#downloadJson").addEventListener("click",()=>{let data;try{data=json()}catch(e){status(e.message,true);return}const url=URL.createObjectURL(new Blob([data],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="links.json";document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);status("JSON downloaded. Commit it as links.json in the main branch.")});
$("#publishLinks").addEventListener("click",githubPublish);
$("#reloadLinks").addEventListener("click",load);
load();
})();