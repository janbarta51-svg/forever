(() => {
"use strict";
const $ = s => document.querySelector(s);
const esc = value => String(value ?? "").replace(/[&<>"']/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));
const clamp = v => Math.max(1,Math.min(30,Math.round(Number(v)||1)));
const classOrder = ["Warrior","Paladin","Priest","Druid","Shaman","Mage","Warlock","Hunter","Rogue"];
const healerClasses = ["Druid","Paladin","Priest","Shaman"];
const roleLabels = ["Tank","Healer","DPS 1","DPS 2","DPS 3"];
const roleForSlot = index => index===0 ? "tank" : index===1 ? "healer" : "dps";
const allowedClasses = index => index===1 ? healerClasses : index===0 ? ["Warrior"] : classOrder;
const roleIcon = role => '<img class="party-role-icon" src="assets/roles/'+role+'.svg" width="38" height="38" alt="" loading="lazy">';

const categoryOrder = ["Weapon buff","Elixirs","Scrolls","Potions","Armor / Shield","Engineering","First Aid"];
const startLevel = clamp(sessionStorage.getItem("forever-level")||20);
const state = {
  level:startLevel,
  party:[
    {className:"Warrior",level:startLevel},
    {className:"Priest",level:startLevel},
    {className:"Druid",level:startLevel},
    {className:"Paladin",level:startLevel},
    {className:"Mage",level:startLevel}
  ],
  foodCategory:"all", foodSearch:"", showUnknown:true, tab:"warrior"
};
const classTheme = cl => CLASS_THEME[cl] || {color:"#ffffff",icon:"classicon_warrior"};
const classIcon = (cl,extra="") => '<img class="party-class-icon '+extra+'" src="'+esc(classIconUrl(cl))+'" alt="" loading="lazy" width="30" height="30">';
const themeStyle = cl => 'style="--class-color:'+classTheme(cl).color+'"';
const queryLink = name => "https://www.wowhead.com/forever/search?q="+encodeURIComponent(name);

// Only items explicitly tagged as tradable get an Auction House name-copy button.
// The button is a sibling of the Wowhead link, never inside it, so copying cannot navigate.
function copyItemButton(item) {
  if(!item || item.purchasable !== true)return "";
  const name=esc(item.name);
  return '<button type="button" class="copy-item-name" data-copy-name="'+name+'" '+
    'title="Copy item name" aria-label="Copy '+name+' to clipboard">'+
    '<span class="copy-item-glyph" aria-hidden="true"></span></button>';
}
function itemLink(item,type) {
  const link=whLink(item,type);
  return item && item.purchasable===true
    ? '<span class="buyable-item-name">'+link+copyItemButton(item)+'</span>'
    : link;
}

function whLink(item,type) {
  const id = Number(item.id);
  const verified = Number.isInteger(id) && id > 0;
  const kind = type || item.tooltipType || "item";
  const href = verified ? "https://www.wowhead.com/forever/"+kind+"="+id : queryLink(item.name);
  const attr = verified ? ' data-wowhead="'+esc(kind+"="+id)+'"' : "";
  // Wowhead is the only tooltip provider; don't render a second local hover card.
  // Links without a verified ID remain clickable searches but have no fake tooltip.
  return '<span class="tooltip-wrap '+(verified?"has-wh":"")+'"><a href="'+esc(href)+'"'+attr+' target="_blank" rel="noopener noreferrer">'+esc(item.name)+'</a></span>';
}
function abilityLink(row,detail) {
  return whLink({name:row[0],effect:detail.effect,note:row[5],id:row[4],level:detail.level},"spell");
}
function refreshTooltips(){
  try {
    if(window.WH && window.WH.Tooltips && typeof window.WH.Tooltips.refreshLinks==="function"){
      window.WH.Tooltips.refreshLinks();
      document.body.classList.add("wowhead-ready");
    }
  } catch(error){console.warn("Wowhead tooltip refresh failed",error)}
}
function latest(items){return items.filter(x=>x.level!==null&&x.level<=state.level).sort((a,b)=>b.level-a.level)[0]||null}
function setLevel(value) {
  state.level=clamp(value);
  state.party[0].level=state.level;
  $("#mainLevel").value=state.level;
  $("#levelNumber").value=state.level;
  $("#levelNum").textContent=state.level;
  sessionStorage.setItem("forever-level",String(state.level));
  renderSummary(); renderWarrior(); renderFood(); renderGroupSlots(); renderGroup();
}
function renderSummary(){
  const count=WARRIOR_ITEMS.filter(x=>x.level!==null&&x.level<=state.level).length;
  const food=FOODS.filter(x=>x.level!==null&&x.level<=state.level).length;
  $("#levelSummary").innerHTML="<strong>"+count+"</strong> available items · <strong>"+food+"</strong> verified food choices";
}
function renderWarrior(){
  const stone=latest(WARRIOR_ITEMS.filter(x=>/Sharpening Stone/.test(x.name)));
  const heal=latest(WARRIOR_ITEMS.filter(x=>/Healing Potion/.test(x.name)));
  const food=latest(FOODS.filter(x=>x.category==="STR"));
  $("#warriorHighlights").innerHTML=[
    ["BEST SHARPENING STONE",stone,stone?.effect||"No upgrade yet"],
    ["HEALING POTION",heal,heal?.effect||"Not yet available"],
    ["STRENGTH FOOD",food,food?food.effect+" · +5% kill XP":"Not yet available"]
  ].map(([label,item,detail])=>'<div class="highlight panel"><small>'+esc(label)+'</small><strong>'+
    (item?itemLink(item,"item"):"—")+'</strong><p>'+esc(detail)+'</p></div>').join("");
  const categories=[...categoryOrder,"1H Weapon Progression","Tank Checklist","Class Quests & Milestones"];
  $("#warriorCategories").innerHTML=categories.map(cat=>{
    const quests=cat==="Class Quests & Milestones";
    const weapons=cat==="1H Weapon Progression";
    const tips=cat==="Tank Checklist";
    const list=(quests?WARRIOR_QUESTS:weapons?WARRIOR_WEAPONS:tips?WARRIOR_TIPS:WARRIOR_ITEMS.filter(x=>x.category===cat))
      .filter(x=>x.level===null||x.level<=state.level).sort((a,b)=>(b.level||0)-(a.level||0));
    const rows=list.map(x=>{
      const tag=x.level===null?'<span class="small-flag uncertain">Skill</span>':'<span class="level-badge">'+x.level+'</span>';
      const name=itemLink(x,quests?(x.kind==="spell"?"spell":"quest"):tips?"spell":"item");
      return '<div class="entry"><span>'+tag+'</span><div><span class="entry-title">'+name+'</span><div class="entry-desc">'+esc(x.effect)+'</div>'+(x.note?'<div class="flag-note">'+esc(x.note)+'</div>':"")+'</div>'+(x.flag?'<span class="small-flag">'+esc(x.flag)+'</span>':"")+'</div>';
    }).join("");
    const subtitle=quests?"Class quests and spell unlocks":weapons?"Recommended dungeon stages, not exact equip levels":tips?"Threat and tanking reminders":list.length+" available / conditional items";
    return '<article class="mini-panel panel"><h2>'+esc(cat)+'<span class="subtitle">'+subtitle+'</span></h2><div class="entry-list">'+(rows||'<div class="empty-state">Nothing available at this level.</div>')+'</div></article>';
  }).join("");
  refreshTooltips();
}
function renderFood(){
  const items=FOODS.filter(x=>(state.foodCategory==="all"||x.category===state.foodCategory) &&
    (!state.foodSearch||x.name.toLowerCase().includes(state.foodSearch)) &&
    ((x.level!==null&&x.level<=state.level)||(x.level===null&&state.showUnknown)))
    .sort((a,b)=>(a.level??999)-(b.level??999)||a.category.localeCompare(b.category)||a.name.localeCompare(b.name));
  $("#foodCount").textContent="Showing "+items.length+" of "+FOODS.length+" recipes. A '?' means the minimum character level is not verified (Cooking skill is tracked separately).";
  $("#foodRows").innerHTML=items.map(x=>'<tr><td><span class="level-badge">'+esc(x.level??"?")+'</span></td><td>'+itemLink(x,"item")+'</td><td>'+esc(x.effect)+'</td><td>'+esc(x.skill)+'</td><td class="'+(x.verified?"status-verified":"status-estimated")+'">'+(x.verified?"Verified level":"Level unverified")+'</td></tr>').join("")||'<tr><td colspan="5" class="empty">No food matches these filters.</td></tr>';
  refreshTooltips();
}
function renderGroupSlots(){
  $("#groupSlots").innerHTML=state.party.map((member,index)=>{
    const cl=member.className, locked=index===0;
    const role=roleForSlot(index),roleLabel=roleLabels[index];
    const header='<div class="role-label role-heading">'+roleIcon(role)+
      '<div class="role-heading-copy"><strong class="role-heading-title">'+esc(roleLabel)+'</strong>'+
      '<small class="class-colored">'+esc(cl)+'</small></div></div>';
    const selection=classIcon(cl,"role-picker-class-icon")+
      '<span class="selected-class class-colored">'+esc(cl)+'</span>'+
      '<span class="picker-arrow" aria-hidden="true">'+(locked?'◆':'⌄')+'</span>';
    const picker=locked?
      '<div class="role-class-selector fixed" aria-label="Fixed class: Warrior">'+
      '<div class="role-class-trigger role-class-static">'+selection+'</div></div>':
      '<details class="role-class-selector" data-slot-selector="'+index+'">'+
      '<summary class="role-class-trigger" aria-label="Choose '+esc(roleLabel)+' class">'+selection+'</summary>'+
      '<div class="role-class-menu" role="listbox" aria-label="'+esc(roleLabel)+' classes">'+
      allowedClasses(index).map(candidate=>{
        const chosen=cl===candidate;
        return '<button type="button" role="option" aria-selected="'+chosen+'" '+
          'class="role-class-option'+(chosen?' active':'')+'" '+
          'data-class-choice="'+index+'" data-choice-class="'+candidate+'" '+themeStyle(candidate)+'>'+
          classIcon(candidate,"role-option-class-icon")+
          '<span class="option-class-name">'+esc(candidate)+'</span>'+
          '<span class="option-check" aria-hidden="true">'+(chosen?'✓':'')+'</span></button>';
      }).join("")+'</div></details>';
    return '<div class="member-slot class-slot role-slot role-slot-'+role+'" '+themeStyle(cl)+'>'+
      header+'<div class="member-controls">'+picker+
      '<label class="level-control" for="partyLevel'+index+'"><span>Level</span>'+
      '<input id="partyLevel'+index+'" class="member-level" data-party-level="'+index+
      '" type="number" min="1" max="30" value="'+member.level+'" '+
      (locked?'title="Synced with Warrior level slider"':'')+'></label></div></div>';
  }).join("");
}
function resolveAbility(ability,level){
  const ranks=ability[2].filter(x=>x<=level);
  if(!ranks.length)return null;
  const rankIndex=ranks.length-1;
  return {a:ability,rank:rankIndex+1,level:ranks[rankIndex],effect:ability[3][rankIndex]||ability[3][0]||""};
}
function memberAbilities(member){
  return (GROUP_ABILITY_DATA[member.className]||[]).map(a=>resolveAbility(a,member.level)).filter(Boolean);
}
function renderGroup(){
  const summary=state.party.map(x=>x.className+" "+x.level).join(" · ");
  $("#groupSummary").textContent=summary;
  const all=state.party.map(memberAbilities);
  const buffCount=all.reduce((n,entries)=>n+entries.filter(x=>x.a[1]==="buff").length,0);
  const ccCount=all.reduce((n,entries)=>n+entries.filter(x=>x.a[1]==="cc").length,0);
  const markup=state.party.map((member,index)=>{
    const cl=member.className,abilities=all[index];
    const types=[["buff","Buffs"],["cc","Crowd Control"]];
    const columns=types.map(([type,title])=>{
      const list=abilities.filter(x=>x.a[1]===type);
      const entries=list.map(x=>{
        const requirement=x.a[6]?'<span class="small-flag requirement-flag">'+esc(x.a[6])+'</span>':"";
        return '<div class="group-ability"><div class="group-ability-line">'+abilityLink(x.a,x)+' <span class="rank">Rank '+x.rank+'</span><span class="level-badge" title="Level the current rank becomes available">Lv '+x.level+'</span>'+requirement+'</div><p class="group-effect">'+esc(x.effect)+'</p><p class="group-note">'+esc(x.a[5])+'</p></div>';
      }).join("");
      return '<div class="group-type"><h3><span class="cat-dot '+type+'"></span>'+title+' <span class="muted">('+list.length+')</span></h3>'+(entries||'<p class="empty-state">None available yet.</p>')+'</div>';
    }).join("");
    return '<article class="panel member-result" '+themeStyle(cl)+'><div class="member-result-header">'+classIcon(cl)+'<div><h2 class="class-colored">'+esc(cl)+' <small>Lv '+member.level+'</small></h2><span>Party slot '+(index+1)+(index===0?" · Tank":"")+'</span></div></div><div class="group-columns">'+columns+'</div></article>';
  }).join("");
  $("#partyResults").innerHTML='<div class="matrix-summary"><strong>'+buffCount+' buffs · '+ccCount+' crowd-control abilities</strong><span>Each member level and highest available rank</span></div><div class="party-class-results">'+markup+'</div>'+
  '<div class="notice party-note"><strong>Important:</strong> Paladin auras are mutually exclusive; a Shaman can have only one totem of each element; pet and talent abilities are conditional. Do not apply Salvation to your tank. Some buff categories do not stack.</div>';
  renderExport();
  refreshTooltips();
}

const CHAT_LIMIT=235;
function abilityText(ability){
  // resolveAbility() chooses the highest available rank for this member's
  // individual level. The index is the rank, not the unlock level itself.
  return ability.a[0]+" (Rank"+ability.rank+")"+(ability.a[6]?"*":"");
}
function exportLines(){
  const lines=[];
  state.party.forEach((member,index)=>{
    const entries=memberAbilities(member);
    if(!entries.length){
      lines.push({text:member.className+" - No Buffs or CC available yet",member:index,className:member.className});
      return;
    }
    [["buff","Buffs"],["cc","CC"]].forEach(([type,label])=>{
      const names=entries.filter(x=>x.a[1]===type).map(abilityText);
      if(!names.length)return;
      let prefix=member.className+" - "+label+": ";
      let buffer=prefix;
      names.forEach(name=>{
        const next=buffer===prefix?name:", "+name;
        if(buffer.length+next.length>CHAT_LIMIT && buffer!==prefix){
          lines.push({text:buffer,member:index,className:member.className});
          prefix=member.className+" - "+label+" (cont.): ";
          buffer=prefix+name;
        }else buffer+=next;
      });
      lines.push({text:buffer,member:index,className:member.className});
    });
  });
  return lines;
}
async function copyText(text){
  if(navigator.clipboard&&navigator.clipboard.writeText){
    try{await navigator.clipboard.writeText(text);return true}catch(error){console.warn("Clipboard API fallback",error)}
  }
  try{
    const area=document.createElement("textarea");area.value=text;area.setAttribute("readonly","");area.style.position="fixed";area.style.left="-9999px";document.body.appendChild(area);area.select();
    const ok=document.execCommand("copy");area.remove();return Boolean(ok);
  }catch(error){return false}
}
function renderExport(){
  const lines=exportLines();
  $("#exportRows").innerHTML=lines.map((line,index)=>
    '<div class="export-row" '+themeStyle(line.className)+'><span class="export-index">'+(index+1)+'</span>'+
    '<div class="export-text">'+esc(line.text)+'</div>'+
    '<button class="button export-copy" type="button" data-copy-line="'+index+'" aria-label="Copy chat line '+(index+1)+'">Copy</button></div>'
  ).join("");
}
function renderCamp(){
  $("#campCards").innerHTML=CAMP_FEATURES.map(x=>'<article class="mini-panel panel"><h2>'+esc(x.profession)+(x.good?' <span class="small-flag">Tank ★</span>':'')+'<span class="subtitle">'+esc(x.name)+' · Profession skill '+x.skill+'</span></h2><div class="entry-list"><strong class="stat-good">'+esc(x.effect)+'</strong><div class="camp-note">'+(x.conflict?'Does not stack with: <strong>'+esc(x.conflict)+'</strong>':'No known overlapping class buff')+'</div></div></article>').join("");
}
let links=[];
function validURL(v){try{return ["http:","https:"].includes(new URL(v).protocol)}catch{return false}}
async function renderLinks(){
  try{
    const response=await fetch("links.json",{cache:"no-store"});
    if(!response.ok)throw new Error("HTTP "+response.status);
    const data=await response.json();links=Array.isArray(data.links)?data.links:[];
  }catch(error){links=[{title:"Wowhead Forever",url:"https://www.wowhead.com/forever/"},{title:"Icy Veins Forever",url:"https://www.icy-veins.com/wow-forever/"}]}
  $("#linksCards").innerHTML=links.filter(x=>x.title&&validURL(x.url)).map(x=>'<a class="panel link-card" href="'+esc(x.url)+'" target="_blank" rel="noopener noreferrer"><strong>↗ '+esc(x.title)+'</strong><span>'+esc(x.url)+'</span></a>').join("");
}
function selectTab(tab){
  const selected=["warrior","food","group","camp","links"].includes(tab)?tab:"warrior";
  state.tab=selected;
  document.querySelectorAll(".tab-view").forEach(el=>el.hidden=el.id!=="view-"+selected);
  document.querySelectorAll("[data-tab]").forEach(el=>{el.classList.toggle("active",el.dataset.tab===selected);el.setAttribute("aria-current",el.dataset.tab===selected?"page":"false")});
  $(".nav").classList.remove("open");$(".nav-toggle").setAttribute("aria-expanded","false");
  if(selected==="links")renderLinks();
  refreshTooltips();
}
$("#mainLevel").addEventListener("input",event=>setLevel(event.target.value));
$("#levelNumber").addEventListener("change",event=>setLevel(event.target.value));
$("#foodCategory").addEventListener("change",event=>{state.foodCategory=event.target.value;renderFood()});
$("#foodSearch").addEventListener("input",event=>{state.foodSearch=event.target.value.toLowerCase().trim();renderFood()});
$("#foodShowUnverified").checked=true;
$("#foodShowUnverified").addEventListener("change",event=>{state.showUnknown=event.target.checked;renderFood()});
$("#groupSlots").addEventListener("click",event=>{
  const summary=event.target.closest("summary.role-class-trigger");
  if(summary){
    const active=summary.closest(".role-class-selector");
    document.querySelectorAll(".role-class-selector[open]").forEach(el=>{
      if(el!==active)el.open=false;
    });
    return;
  }
  const option=event.target.closest("[data-class-choice]");
  if(!option)return;
  const index=Number(option.dataset.classChoice);
  const candidate=option.dataset.choiceClass;
  if(index<1||index>4||!allowedClasses(index).includes(candidate))return;
  state.party[index].className=candidate;
  renderGroupSlots();
  renderGroup();
});
$("#groupSlots").addEventListener("change",event=>{
  const e=event.target;
  if(!e.matches("[data-party-level]"))return;
  const index=Number(e.dataset.partyLevel),value=clamp(e.value);
  if(index===0){setLevel(value)}
  else if(index>=1&&index<=4){state.party[index].level=value;e.value=value;renderGroup()}
});
document.addEventListener("click",event=>{
  if(event.target.closest(".role-class-selector"))return;
  document.querySelectorAll(".role-class-selector[open]").forEach(el=>el.open=false);
});
$("#groupSlots").addEventListener("keydown",event=>{
  if(event.key!=="Escape")return;
  const active=event.target.closest(".role-class-selector[open]");
  if(!active)return;
  active.open=false;
  active.querySelector("summary.role-class-trigger")?.focus();
  event.preventDefault();
});
// Event delegation survives slider, food filtering and dynamic card refreshes.
let copyNameTimer=null;
async function handleItemCopy(event) {
  const button=event.target.closest("[data-copy-name]");
  if(!button)return;
  event.preventDefault();
  event.stopPropagation();
  const name=button.dataset.copyName;
  const success=await copyText(name);
  const status=$("#itemCopyStatus");
  status.textContent=success?"Copied: "+name:"Copy failed. Please select the item name manually.";
  status.dataset.state=success?"success":"error";
  if(copyNameTimer!==null && typeof clearTimeout==="function")clearTimeout(copyNameTimer);
  if(typeof setTimeout==="function")copyNameTimer=setTimeout(()=>{status.textContent="";},1800);
}
for(const root of ["#warriorHighlights","#warriorCategories","#foodRows"]){
  $(root).addEventListener("click",handleItemCopy);
}
$("#refreshGroup").addEventListener("click",renderGroup);
$("#exportRows").addEventListener("click",async event=>{
  const b=event.target.closest("[data-copy-line]");if(!b)return;
  const index=Number(b.dataset.copyLine),line=exportLines()[index];
  if(!line)return;const ok=await copyText(line.text);
  $("#copyStatus").textContent=ok?"Copied line "+(index+1)+" — paste it into WoW chat.":"Automatic copy unavailable; select the text and copy it manually.";
});
$("#copyAll").addEventListener("click",async()=>{
  const text=exportLines().map(x=>x.text).join("\n");
  const ok=await copyText(text);
  $("#copyStatus").textContent=ok?"Copied all "+exportLines().length+" lines. Standard WoW chat cannot paste these as separate messages at once; use individual Copy buttons in-game.":"Automatic copy unavailable; use the individual Copy buttons.";
});
$(".nav-toggle").addEventListener("click",()=>{const nav=$(".nav");const expanded=nav.classList.toggle("open");$(".nav-toggle").setAttribute("aria-expanded",String(expanded))});
window.addEventListener("hashchange",()=>selectTab(location.hash.replace("#","")));
document.querySelectorAll("[data-tab]").forEach(node=>node.addEventListener("click",()=>selectTab(node.dataset.tab)));
renderCamp();setLevel(startLevel);selectTab(location.hash.replace("#","")||"warrior");
})();