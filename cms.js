(()=>{"use strict";
const REPO="janbarta51-svg/forever";const FILE="links.json";const $=s=>document.querySelector(s);
const status=(msg,bad=false)=>{$("#cmsStatus").textContent=msg;$("#cmsStatus").style.color=bad?"#df8f86":"#92c88e"};
let links=[];
function isURL(v){try{let u=new URL(v.trim());return ["https:","http:"].includes(u.protocol)}catch{return false}}
function render(){const root=$("#cmsList");root.replaceChildren();links.forEach((item,i)=>{const row=document.createElement("div");row.className="cms-row";
 const title=document.createElement("input");title.placeholder="Jméno webu";title.value=item.title;title.setAttribute("aria-label","Název odkazu "+(i+1));
 const url=document.createElement("input");url.placeholder="https://…";url.value=item.url;url.setAttribute("aria-label","URL odkazu "+(i+1));
 const del=document.createElement("button");del.textContent="Smazat";del.type="button";
 title.addEventListener("input",()=>{links[i].title=title.value});url.addEventListener("input",()=>{links[i].url=url.value});del.addEventListener("click",()=>{links.splice(i,1);render()});
 row.append(title,url,del);root.append(row)})}
function validLinks(){const clean=links.map(x=>({title:x.title.trim(),url:x.url.trim()}));if(!clean.every(x=>x.title&&isURL(x.url)))throw Error("Doplň názvy a platné http/https URL ke všem odkazům.");return clean}
function json(){return JSON.stringify({links:validLinks()},null,2)+"\n"}
async function load(){try{const r=await fetch(FILE,{cache:"no-store"});if(!r.ok)throw Error("HTTP "+r.status);const d=await r.json();links=(Array.isArray(d.links)?d.links:[]).map(x=>({title:String(x.title||""),url:String(x.url||"")}));render();status("Odkazy načteny.")}catch(e){status("Soubor links.json nelze načíst. Otevři CMS přes webový server / GitHub Pages, ne přes file://. "+e.message,true);render()}}
function bytesBase64(s){const arr=new TextEncoder().encode(s);let bin="";arr.forEach(b=>bin+=String.fromCharCode(b));return btoa(bin)}
async function githubPublish(){const tok=$("#githubToken").value.trim();if(!tok){status("Vyplň token s Contents: Read and write, nebo stáhni JSON a nahraj ho ručně.",true);return}
 let payload;try{payload=json()}catch(e){status(e.message,true);return}
 $("#publishLinks").disabled=true;status("Zjišťuji současnou verzi links.json…");
 const endpoint="https://api.github.com/repos/"+REPO+"/contents/"+FILE;
 const headers={"Authorization":"Bearer "+tok,"Accept":"application/vnd.github+json","X-GitHub-Api-Version":"2022-11-28","Content-Type":"application/json"};
 try{
  const get=await fetch(endpoint,{headers,cache:"no-store"});if(!get.ok)throw Error("GitHub čtení: HTTP "+get.status+" (zkontroluj oprávnění a token)");
  const original=await get.json();
  const put=await fetch(endpoint,{method:"PUT",headers,body:JSON.stringify({message:"CMS: update useful links",content:bytesBase64(payload),sha:original.sha,branch:"main"})});
  if(!put.ok){const result=await put.json().catch(()=>({}));throw Error("GitHub uložení: HTTP "+put.status+" "+(result.message||""))}
  $("#githubToken").value="";status("✓ Uloženo na GitHub do main. GitHub Pages změny zveřejní při další aktualizaci.");
 }catch(e){status("Chyba: "+e.message,true)}finally{$("#publishLinks").disabled=false}
}
$("#addLink").addEventListener("click",()=>{links.push({title:"",url:""});render();$("#cmsList").lastElementChild?.querySelector("input")?.focus()});
$("#downloadJson").addEventListener("click",()=>{let data;try{data=json()}catch(e){status(e.message,true);return}const url=URL.createObjectURL(new Blob([data],{type:"application/json"}));const a=document.createElement("a");a.href=url;a.download="links.json";document.body.append(a);a.click();a.remove();URL.revokeObjectURL(url);status("Soubor připraven. Commitni jej jako links.json do main větve.")});
$("#publishLinks").addEventListener("click",githubPublish);
$("#reloadLinks").addEventListener("click",load);
load();
})();