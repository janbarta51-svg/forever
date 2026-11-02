"use strict";
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=f=>fs.readFileSync(path.join(root,f),"utf8");
const assets=["index.html","cms.html","styles.css","forever.css","app.js","cms.js","data-food.js","data-warrior.js","data-party.js","class-ui.js","links.json","assets/roles/tank.svg","assets/roles/healer.svg","assets/roles/dps.svg","assets/icons/copy.svg","addon/ForeverBuffLinks/ForeverBuffLinks.toc","addon/ForeverBuffLinks/ForeverBuffLinks.lua"];
let failures=0;
function check(condition,message){console.log((condition?"PASS ":"FAIL ")+message);if(!condition)failures++}
function finish(){console.log("\n"+(failures?"FAILED: "+failures:"ALL TESTS PASSED"));process.exitCode=failures?1:0}
for(const file of assets)check(fs.existsSync(path.join(root,file)),"Asset: "+file);
for(const file of assets.filter(x=>x.endsWith(".js")))try{new vm.Script(read(file),{filename:file});check(true,"JavaScript syntax: "+file)}catch(e){check(false,file+": "+e.message)}
for(const file of ["index.html","cms.html","app.js","cms.js","data-warrior.js","data-party.js","data-food.js","class-ui.js","README.md"]){
  check(!/[áčďéěíňóřšťúůýž]/i.test(read(file)),"English-only content: "+file);
}
const w={addEventListener(){}};
const sandbox={window:w};
for(const f of ["data-food.js","data-warrior.js","data-party.js","class-ui.js"])vm.runInNewContext(read(f),sandbox,{filename:f});
for(const [key,value] of Object.entries(w))sandbox[key]=value;
check(Object.keys(w.CLASS_THEME).length===9,"Nine class themes");
check(w.CLASS_THEME.Warrior.color==="#C69B6D","Warrior is brown");
check(w.CLASS_THEME.Priest.color==="#FFFFFF","Priest is white");
for(const role of ["tank","healer","dps"])check(read("assets/roles/"+role+".svg").includes("data:image/png;base64,"),"Blizzard role icon embedded: "+role);
check(w.FOODS.length>=70,"Food catalog contains at least 70 entries");
check(w.WARRIOR_ITEMS.length>=50,"Warrior items contain at least 50 entries");
check(w.WARRIOR_ITEMS.every(x=>x.purchasable===true),"All listed consumables are explicitly tradable");
check(w.FOODS.every(x=>x.purchasable===true),"All listed cooked foods are marked as tradable");
const copyWeapons=w.WARRIOR_WEAPONS.filter(x=>x.purchasable===true).map(x=>x.name);
check(copyWeapons.length===2&&copyWeapons.includes("Copper Shortsword")&&copyWeapons.includes("Blackwater Cutlass"),"Only known BoE weapons have name-copy actions");
check(w.WARRIOR_QUESTS.every(x=>!x.purchasable),"Class quests never get name-copy actions");
check(read("forever.css").includes('.copy-item-glyph')&&read("forever.css").includes('mask:url("assets/icons/copy.svg")'),"Amber 1em copy glyph references local SVG");

check(w.CAMP_FEATURES.length===12,"All 12 camp objects");
check(Object.keys(w.GROUP_ABILITY_DATA).length===9,"All nine classes covered");
check(Object.values(w.GROUP_ABILITY_DATA).every(list=>list.every(a=>a[2].every(n=>n>=1&&n<=30))),"All class unlock levels <= 30");
const markup=read("index.html");
for(const tab of ["warrior","food","group","camp","links"])check(markup.includes('id="view-'+tab+'"'),"Tab: "+tab);
check(markup.includes('src="class-ui.js"'),"Class themes loaded before app script");
check(read("forever.css").includes(".role-class-trigger .selected-class"),"Centered class selector styling");

const baseCSS=read("styles.css"), foreverCSS=read("forever.css");
check(!/(^|\\})table\\{width:100%;border-collapse:collapse;min-width:700px\\}/.test(baseCSS),"No global 700px table rule inflates Wowhead tooltips");
check(baseCSS.includes(".table-scroll > table{width:100%;border-collapse:collapse;min-width:700px}"),"Food Buffs table still has its 700px scrollable minimum");
check(baseCSS.includes(".table-scroll > table th") && baseCSS.includes(".table-scroll > table td"),"Food table headers and cells remain styled without affecting tooltips");
check(!foreverCSS.includes(".local-tooltip") && !read("app.js").includes('class="local-tooltip"'),"Duplicate local hover cards completely removed");
check(read("app.js").includes("data-wowhead"),"Original Wowhead tooltip bindings preserved");
check(foreverCSS.includes(".wowhead-tooltip,") && foreverCSS.includes("max-width:min(420px, calc(100vw - 24px))"),"Wowhead tooltip has responsive width cap, not fixed width");

check(read("addon/ForeverBuffLinks/ForeverBuffLinks.toc").includes("## Interface: 16001"),"Addon targets Forever 1.60.1 beta");
const saved=JSON.parse(read("links.json")).links;
check(saved.every(x=>x.title&&/^https?:\/\//.test(x.url)),"Useful URLs are valid");

(async function runtimeCheck(){
  // Lightweight DOM stand-in: checks UI logic without claiming full browser coverage.
  const elements={};
  for(const [,id] of markup.matchAll(/\bid="([^"]+)"/g)){
    elements["#"+id]={
      value:"20",checked:false,innerHTML:"",textContent:"",dataset:{},handlers:{},
      classList:{add(){},remove(){},toggle(){return true}},
      setAttribute(){},addEventListener(name,fn){this.handlers[name]=fn}
    };
  }
  elements[".nav"]={classList:{remove(){},toggle(){return true}}};
  elements[".nav-toggle"]={addEventListener(){},setAttribute(){}};
  const tabs=["warrior","food","group","camp","links"].map(id=>({
    id:"view-"+id,hidden:false,dataset:{tab:id},classList:{toggle(){}},setAttribute(){},addEventListener(){}
  }));
  const doc={
    querySelector:s=>elements[s]||null,
    querySelectorAll:s=>[".tab-view","[data-tab]"].includes(s)?tabs:[],
    addEventListener(){},
    body:{classList:{add(){}}}
  };
  const sessionStorage={getItem(){return null},setItem(){}};
  const location={hash:"#warrior"};
  let copied="";
  const navigator={clipboard:{writeText:async str=>{copied=str}}};
  const fetch=async()=>({ok:true,json:async()=>({links:saved})});
  Object.assign(sandbox,{document:doc,sessionStorage,location,navigator,fetch,console,URL});
  try{
    vm.runInNewContext(read("app.js"),sandbox,{filename:"app.js"});
    const initialWarrior=elements["#warriorCategories"].innerHTML;
    const initialFood=elements["#foodRows"].innerHTML;
    check(initialWarrior.includes('data-copy-name="Rough Sharpening Stone"'),"Buyable stone has a copy icon");
    check(initialWarrior.includes('data-copy-name="Copper Shortsword"'),"Crafted BoE weapon has a copy icon");
    check(initialWarrior.includes('data-copy-name="Blackwater Cutlass"'),"BoE world-drop weapon has a copy icon");
    check(!initialWarrior.includes('data-copy-name="Haggard'),"Class quest weapon has no copy icon");
    check(!initialWarrior.includes('data-copy-name="Revenge"'),"Warrior spell has no copy icon");
    check(initialFood.includes('data-copy-name="Goretusk Liver Pie"'),"Purchasable food has a copy icon");
    check(!elements["#partyResults"].innerHTML.includes('data-copy-name='),"Party spell list has no item copy icons");
    const slotMarkup=elements["#groupSlots"].innerHTML;
    check(slotMarkup.includes("assets/roles/tank.svg"),"Transparent tank role icon");
    check(slotMarkup.includes("assets/roles/healer.svg"),"Transparent healer role icon");
    check(slotMarkup.split("assets/roles/dps.svg").length-1===3,"Exactly three DPS role icons");
    check(slotMarkup.includes(">Tank</strong>") && slotMarkup.includes(">Healer</strong>"),"Tank and Healer role headers");
    check(slotMarkup.includes("selected-class class-colored"),"Centered class label elements");
    const choicesFor=slot=>[...slotMarkup.matchAll(new RegExp('data-class-choice="'+slot+'" data-choice-class="([^"]+)"','g'))].map(m=>m[1]);
    check(choicesFor(1).length===4 && ["Druid","Paladin","Priest","Shaman"].every(c=>choicesFor(1).includes(c)),"Healer selector limited to four eligible classes");
    check(choicesFor(2).length===9 && choicesFor(2).includes("Warlock"),"DPS selector offers all nine classes");
    check(slotMarkup.includes('data-choice-class="Shaman" style="--class-color:#0070DD"'),"Class picker displays Shaman color");
    check(slotMarkup.includes('data-choice-class="Paladin" style="--class-color:#F48CBA"'),"Class picker displays Paladin color");
    check(slotMarkup.includes("classicon_shaman.jpg"),"Class choices include Wowhead icons");
    check(read("forever.css").includes('.role-class-selector:not([open]) .role-class-menu{display:none}'),"Closed class dropdown remains hidden");
    check(read("forever.css").includes("@media(min-width:900px)"),"Five desktop party roles stay in one row");
    check(!slotMarkup.includes('data-class-choice="0"'),"Tank class cannot be changed");
    const chooseClass=(slot,cls)=>elements["#groupSlots"].handlers.click({target:{closest:s=>s==="[data-class-choice]"?{dataset:{classChoice:String(slot),choiceClass:cls}}:null}});
    const wowheadMarkup=elements["#warriorCategories"].innerHTML+" "+elements["#foodRows"].innerHTML+" "+elements["#partyResults"].innerHTML;
    check(!wowheadMarkup.includes("local-tooltip") && !wowheadMarkup.includes('role="tooltip"'),"All item and spell lists render only one tooltip provider");
    check(wowheadMarkup.includes('data-wowhead="item=') && wowheadMarkup.includes('data-wowhead="spell='),"Native item and spell Wowhead tooltip IDs remain in the DOM");
    check(elements["#groupSlots"].innerHTML.includes("classicon_priest.jpg"),"Wowhead class icon rendered");
    check(elements["#groupSlots"].innerHTML.includes("#C69B6D"),"Warrior brown applied in group");
    check(elements["#groupSlots"].innerHTML.includes("#FFFFFF"),"Priest white applied in group");
    check(elements["#partyResults"].innerHTML.includes("member-result-header"),"Buffs/CC grouped by class");
    check(elements["#partyResults"].innerHTML.includes("Power Word: Fortitude"),"Priest buff rendered");
    check(elements["#partyResults"].innerHTML.includes("Polymorph"),"Mage crowd control rendered");
    elements["#groupSlots"].handlers.change({target:{matches:s=>s==="[data-party-level]",dataset:{partyLevel:"1"},value:"12"}});
    check(elements["#partyResults"].innerHTML.includes("Priest <small>Lv 12"),"Priest level independent");
    elements["#mainLevel"].handlers.input({target:{value:"25"}});
    check(elements["#groupSlots"].innerHTML.includes('id="partyLevel1"') && elements["#groupSlots"].innerHTML.includes('id="partyLevel1" class="member-level" data-party-level="1" type="number" min="1" max="30" value="12"'),"Warrior slider preserves teammate level");
    elements["#exportAddon"].handlers.click();
    check(elements["#exportRows"].innerHTML.includes("{spell:1243}"),"Addon-ready spell token export");
    elements["#exportPlain"].handlers.click();
    check(!elements["#exportRows"].innerHTML.includes("{spell:"),"Plain export has no addon tokens");
    await elements["#copyAll"].handlers.click();
    const lines=copied.split("\n").filter(Boolean);
    check(lines.length>=5 && lines.every(x=>x.length<=235),"Every copied WoW chat line <=235 characters");
    check(lines.some(x=>x.startsWith("Warrior (Lv 25)")) && lines.some(x=>x.startsWith("Priest (Lv 12)")),"Copied text reflects per-member levels");
    chooseClass(1,"Warlock");
    check(elements["#partyResults"].innerHTML.includes("Priest <small>Lv 12"),"Healer rejects Warlock");
    chooseClass(1,"Shaman");
    check(elements["#partyResults"].innerHTML.includes("Shaman <small>Lv 12"),"Healer accepts Shaman and keeps level");
    chooseClass(2,"Hunter");
    check(elements["#partyResults"].innerHTML.includes("Hunter <small>Lv 20"),"DPS class selection updates result");
    const copyEvent=name=>({
      target:{closest:selector=>selector==="[data-copy-name]"?{dataset:{copyName:name}}:null},
      preventDefault(){},stopPropagation(){}
    });
    await elements["#warriorCategories"].handlers.click(copyEvent("Rough Sharpening Stone"));
    check(copied==="Rough Sharpening Stone","Warrior copy icon writes only the item name");
    check(elements["#itemCopyStatus"].textContent.includes("Rough Sharpening Stone"),"Warrior copy confirms success");
    await elements["#foodRows"].handlers.click(copyEvent("Goretusk Liver Pie"));
    check(copied==="Goretusk Liver Pie","Food copy icon writes only the food name");
    check(elements["#itemCopyStatus"].textContent.includes("Goretusk Liver Pie"),"Food copy confirms success");
    elements["#mainLevel"].handlers.input({target:{value:"1"}});
    check(elements["#warriorCategories"].innerHTML.includes("Rough Sharpening Stone") && !elements["#warriorCategories"].innerHTML.includes("Solid Sharpening Stone"),"Level 1 item availability respected");
    elements["#mainLevel"].handlers.input({target:{value:"30"}});
    check(elements["#warriorCategories"].innerHTML.includes("Solid Sharpening Stone"),"Level 30 item availability respected");
  }catch(error){check(false,"Runtime UI smoke test: "+error.stack)}
  finish();
})().catch(error=>{check(false,error.stack);finish()});
