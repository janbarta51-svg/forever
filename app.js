(()=>{"use strict";
const $=s=>document.querySelector(s);
const clamp=n=>Math.max(1,Math.min(30,Math.round(Number(n)||1)));
const esc=v=>String(v??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const state={level:clamp(sessionStorage.getItem("forever-level")||20),tab:"warrior",party:["Warrior","Priest","Druid","Paladin","Mage"],foodCategory:"all",foodSearch:"",showUnknown:true};
const classOrder=["Warrior","Priest","Druid","Paladin","Mage","Shaman","Warlock","Hunter","Rogue"];
const categoryOrder=["Weapon buff","Elixíry","Scrolly","Potiony","Armor / Shield","Engineering","First Aid"];
const q=(name)=>"https://www.wowhead.com/forever/search?q="+encodeURIComponent(name);
function whLink(o,type){const id=Number(o.id);const known=Number.isInteger(id)&&id>0;
  const href=known?("https://www.wowhead.com/forever/"+(type||o.tooltipType||"item")+"="+id):q(o.name);
  const extra=known?' data-wowhead="'+esc((type||o.tooltipType||"item")+"="+id)+'"':'';
  const desc=[o.effect,o.note].filter(Boolean).map(esc).join("<br>");
  return '<span class="tooltip-wrap '+(known?"has-wh":"")+'"><a href="'+esc(href)+'"'+extra+' target="_blank" rel="noopener noreferrer">'+esc(o.name)+'</a><span class="local-tooltip" role="tooltip"><strong>'+esc(o.name)+'</strong>'+desc+'<span class="tip-meta">'+(o.level===null?"Požadovaný level neověřen":o.level!==undefined?"Od levelu "+esc(o.level):"")+" · '+esc(type==="spell"?"Spell":"Item")+'</span></span></span>';
}
function abilityLink(a){return whLink({name:a[0],effect:a[3][0],note:a[5],id:a[4]}, "spell")}
function refreshTips(){try{if(window.WH&&WH.Tooltips&&typeof WH.Tooltips.refreshLinks==="function"){WH.Tooltips.refreshLinks();document.body.classList.add("wowhead-ready")}}catch(e){console.warn("Tooltip fallback active",e)}}
function latest(arr,part){return arr.filter(x=>x.level!==null&&x.level<=state.level&&(!part||x.category===part)).sort((a,b)=>b.level-a.level)[0]||null}
function setLevel(v){state.level=clamp(v);$("#mainLevel").value=state.level;$("#levelNumber").value=state.level;$("#levelNum").textContent=state.level;sessionStorage.setItem("forever-level",String(state.level));renderAll()}
function renderSummary(){const count=WARRIOR_ITEMS.filter(x=>x.level!==null&&x.level<=state.level).length;const foods=FOODS.filter(x=>x.level!==null&&x.level<=state.level).length;$("#levelSummary").innerHTML="<strong>"+count+"</strong> dostupných itemů · <strong>"+foods+"</strong> ověřených jídel"}
function renderWarrior(){
 const stone=latest(WARRIOR_ITEMS.filter(x=>/Sharpening Stone/.test(x.name)));
 const heal=latest(WARRIOR_ITEMS.filter(x=>/Healing Potion/.test(x.name)));
 const food=FOODS.filter(x=>x.category==="STR"&&x.level!==null&&x.level<=state.level).sort((a,b)=>b.level-a.level)[0];
 $("#warriorHighlights").innerHTML=[
   ["AKTUÁLNÍ SHARPENING STONE",stone?.name||"—",stone?.effect||"Zatím bez upgradu"],
   ["HEALING POTION",heal?.name||"—",heal?.effect||""],
   ["STRENGTH FOOD",food?.name||"—",food?.effect+" · +5 % kill XP"||""]
 ].map(x=>'<div class="highlight panel"><small>'+esc(x[0])+'</small><strong>'+esc(x[1])+'</strong><p>'+esc(x[2])+'</p></div>').join("");
 const categories=[...categoryOrder,"Questy & milestone"];
 $("#warriorCategories").innerHTML=categories.map(cat=>{
   const quests=cat==="Questy & milestone";
   const list=(quests?WARRIOR_QUESTS:WARRIOR_ITEMS.filter(x=>x.category===cat))
     .filter(x=>x.level===null||x.level<=state.level).sort((a,b)=>(b.level||0)-(a.level||0));
   const rows=list.map(x=>{
     const tag=x.level===null?'<span class="small-flag uncertain">skill</span>':'<span class="level-badge">'+x.level+'</span>';
     const name=whLink(x,quests?(x.kind==="spell"?"spell":"quest"):"item");
     return '<div class="entry"><span>'+tag+'</span><div><span class="entry-title">'+name+'</span><div class="entry-desc">'+esc(x.effect)+'</div>'+(x.note?'<div class="flag-note">'+esc(x.note)+'</div>':"")+'</div>'+(x.flag?'<span class="small-flag">'+esc(x.flag)+'</span>':"")+'</div>';
   }).join("");
   return '<article class="mini-panel panel"><h2>'+esc(cat)+'<span class="subtitle">'+(quests?"Questy a odemčení klíčových skillů":list.length+" dostupných / podmíněných předmětů")+'</span></h2><div class="entry-list">'+(rows||'<div class="empty-state">Žádná dostupná položka.</div>')+'</div></article>'
 }).join("");
 refreshTips();
}
function renderFoods(){
 const cat=state.foodCategory;const term=state.foodSearch.toLowerCase().trim();
 const items=FOODS.filter(f=>(cat==="all"||f.category===cat)&&(!term||f.name.toLowerCase().includes(term))&&
   ((f.level!==null&&f.level<=state.level)||(f.level===null&&state.showUnknown)))
 .sort((a,b)=>(a.level===null?999:a.level)-(b.level===null?999:b.level)||a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
 $("#foodCount").textContent="Zobrazeno "+items.length+" z "+FOODS.length+" receptů. ? = minimum levelu není potvrzené pro Forever (Cooking skill je ověřen samostatně).";
 $("#foodRows").innerHTML=items.map(f=>'<tr><td><span class="level-badge">'+(f.level??"?")+'</span></td><td>'+whLink(f,"item")+'</td><td>'+esc(f.effect)+'</td><td>'+esc(f.skill)+'</td><td class="'+(f.verified?"status-verified":"status-estimated")+'">'+(f.verified?"Ověřený level":"Level ověřit")+'</td></tr>').join("")||'<tr><td colspan="5" class="empty">Zde zatím žádné položky.</td></tr>';
 refreshTips();
}
function renderGroupSlots(){
 $("#groupSlots").innerHTML=state.party.map((cl,i)=>{
   const locked=i===0;const opts=classOrder.map(c=>'<option value="'+c+'"'+(c===cl?" selected":"")+'>'+c+'</option>').join("");
   return '<div class="member-slot"><div class="role-label"><span class="role-icon">'+esc(CLASS_ICONS[cl])+'</span><div><strong>'+(locked?"Tank":"Member "+(i+1))+'</strong><small>'+(locked?"Tvůj Human Warrior":"Class ve skupině")+'</small></div></div>'+(
   locked?'<div class="class-picker-button">Warrior <span class="picker-caret">🛡</span></div>':
   '<select class="group-select" data-slot="'+i+'" aria-label="Class hráče '+(i+1)+'">'+opts+'</select>'
   )+'</div>'
 }).join("");
}
function resolvedAbility(a,level){const ranks=a[2].filter(n=>n<=level);if(!ranks.length)return null;
 const idx=ranks.length-1;return {a,rank:idx+1,level:ranks[idx],effect:a[3][idx]||a[3][0]||""}}
function renderGroup(){
 $("#groupSummary").textContent="Buffy a crowd control pro lvl "+state.level;
 const entries=state.party.flatMap((cl,i)=>(GROUP_ABILITY_DATA[cl]||[]).map(a=>{
   const r=resolvedAbility(a,state.level);return r?{...r,cl,index:i}:null}).filter(Boolean));
 const totals={buff:entries.filter(x=>x.a[1]==="buff").length,cc:entries.filter(x=>x.a[1]==="cc").length};
 const tag=(x)=>x.a[6]?'<span class="small-flag">'+esc(x.a[6])+'</span>':"";
 const cats=[["buff","Buffy","Dostupné skupinové buffy a aury"],["cc","Crowd control","Stuny, roots, feary, interrupcy"]];
 $("#partyResults").innerHTML='<div class="matrix-summary"><strong>'+totals.buff+' buffů · '+totals.cc+' CC</strong><span>Pouze dvě požadované kategorie, rank vždy odpovídá lvl '+state.level+'</span></div>'+
 cats.map(([type,title,desc])=>'<article class="mini-panel panel" style="margin-top:16px"><h2>'+title+'<span class="subtitle">'+desc+'</span></h2><div class="entry-list">'+
 (entries.filter(x=>x.a[1]===type).map(x=>'<div class="entry"><span class="level-badge">'+x.level+'</span><div><span class="entry-title">'+esc(CLASS_ICONS[x.cl])+' '+esc(x.cl)+' · '+abilityLink(x.a)+' <span class="rank">R'+x.rank+'</span></span><div class="entry-desc">'+esc(x.effect)+'</div><div class="flag-note">'+esc(x.a[5])+'</div></div>'+tag(x)+'</div>').join("")||'<div class="empty-state">Zatím není dostupná žádná schopnost tohoto typu.</div>')+'</div></article>').join("")+
 '<div class="notice party-note"><strong>Pozor na konflikty:</strong> jedna Paladin Aura současně; standardní Blessing se od stejného Paladina přepisují; Shaman má jen jeden aktivní totem od každého elementu; Warlock a Hunter buffy mohou vyžadovat peta a talentové ability nejsou automatické.</div>';
 refreshTips();
}
function renderCamp(){
 $("#campCards").innerHTML=CAMP_FEATURES.map(c=>'<article class="mini-panel panel"><h2>'+esc(c.profession)+(c.good?' <span class="small-flag">Tank ✓</span>':'')+'<span class="subtitle">'+esc(c.name)+' · profession skill '+c.skill+'</span></h2><div class="entry-list"><strong class="stat-good">'+esc(c.effect)+'</strong><div class="camp-note">'+(c.conflict?'Nekombinuje se s: <strong>'+esc(c.conflict)+'</strong>':'Neudán class buff konflikt')+'</div></div></article>').join("")
}
let linkCache=[];
function validURL(url){try{const a=new URL(url);return ["https:","http:"].includes(a.protocol)}catch{return false}}
async function renderLinks(){try{const r=await fetch("links.json",{cache:"no-store"});if(!r.ok)throw new Error("HTTP "+r.status);const payload=await r.json();linkCache=Array.isArray(payload.links)?payload.links:[]}catch(e){linkCache=[{title:"Wowhead Forever",url:"https://www.wowhead.com/forever/"},{title:"Icy Veins Forever",url:"https://www.icy-veins.com/wow-forever/"}];}
 $("#linksCards").innerHTML=linkCache.filter(x=>x.title&&validURL(x.url)).map(x=>'<a class="panel link-card" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer"><strong>↗ '+esc(x.title)+'</strong><span>'+esc(x.url)+'</span></a>').join("");
}
function selectTab(tab){tab=["warrior","food","group","camp","links"].includes(tab)?tab:"warrior";state.tab=tab;
 document.querySelectorAll(".tab-view").forEach(el=>el.hidden=el.id!=="view-"+tab);
 document.querySelectorAll("[data-tab]").forEach(el=>{el.classList.toggle("active",el.dataset.tab===tab);el.setAttribute("aria-current",el.dataset.tab===tab?"page":"false")});
 $(".nav").classList.remove("open");$(".nav-toggle").setAttribute("aria-expanded","false");
 if(tab==="links")renderLinks();refreshTips();
}
function renderAll(){renderSummary();renderWarrior();renderFoods();renderGroup();renderCamp()}
$("#mainLevel").addEventListener("input",e=>setLevel(e.target.value));
$("#levelNumber").addEventListener("change",e=>setLevel(e.target.value));
$("#foodCategory").addEventListener("change",e=>{state.foodCategory=e.target.value;renderFoods()});
$("#foodSearch").addEventListener("input",e=>{state.foodSearch=e.target.value;renderFoods()});
$("#foodShowUnverified").checked=true;$("#foodShowUnverified").addEventListener("change",e=>{state.showUnknown=e.target.checked;renderFoods()});
$("#groupSlots").addEventListener("change",e=>{const i=Number(e.target.dataset.slot);if(i>=1&&i<=4&&GROUP_ABILITY_DATA[e.target.value]){state.party[i]=e.target.value;renderGroupSlots();renderGroup()}});
$("#refreshGroup").addEventListener("click",renderGroup);
$(".nav-toggle").addEventListener("click",()=>{const nav=$(".nav");const open=nav.classList.toggle("open");$(".nav-toggle").setAttribute("aria-expanded",String(open))});
window.addEventListener("hashchange",()=>selectTab(location.hash.replace("#","")));
document.querySelectorAll("[data-tab]").forEach(a=>a.addEventListener("click",()=>selectTab(a.dataset.tab)));
renderGroupSlots();setLevel(state.level);selectTab(location.hash.replace("#","")||"warrior");
})();
