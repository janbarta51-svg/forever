"use strict";
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=f=>fs.readFileSync(path.join(root,f),"utf8");
const assets=["index.html","cms.html","styles.css","forever.css","app.js","cms.js","data-food.js","data-warrior.js","data-party.js","class-ui.js","links.json","addon/ForeverBuffLinks/ForeverBuffLinks.toc","addon/ForeverBuffLinks/ForeverBuffLinks.lua"];
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
check(w.FOODS.length>=70,"Food catalog contains at least 70 entries");
check(w.WARRIOR_ITEMS.length>=50,"Warrior items contain at least 50 entries");
check(w.CAMP_FEATURES.length===12,"All 12 camp objects");
check(Object.keys(w.GROUP_ABILITY_DATA).length===9,"All nine classes covered");
check(Object.values(w.GROUP_ABILITY_DATA).every(list=>list.every(a=>a[2].every(n=>n>=1&&n<=30))),"All class unlock levels <= 30");
const markup=read("index.html");
for(const tab of ["warrior","food","group","camp","links"])check(markup.includes('id="view-'+tab+'"'),"Tab: "+tab);
check(markup.includes('src="class-ui.js"'),"Class themes loaded before app script");
check(read("addon/ForeverBuffLinks/ForeverBuffLinks.toc").includes("## Interface: 16001"),"Addon targets Forever 1.60.1 beta");
const saved=JSON.parse(read("links.json")).links;
check(saved.every(x=>x.title&&/^https?:\/\//.test(x.url)),"Useful URLs are valid");

(async function runtimeCheck(){
  // Lightweight DOM stand-in: checks UI logic without claiming full browser coverage.
  const elements={};
  for(const [,id] of markup.matchAll(/\bid="([^"]+)"/g)){
    elements["#"+id]={
      value:"20",checked:false,innerHTML:"",textContent:"",handlers:{},
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
    elements["#groupSlots"].handlers.change({target:{matches:s=>s==="[data-slot]",dataset:{slot:"2"},value:"Hunter"}});
    check(elements["#partyResults"].innerHTML.includes("Hunter <small>Lv 20"),"Class selection updates result");
    elements["#mainLevel"].handlers.input({target:{value:"1"}});
    check(elements["#warriorCategories"].innerHTML.includes("Rough Sharpening Stone") && !elements["#warriorCategories"].innerHTML.includes("Solid Sharpening Stone"),"Level 1 item availability respected");
    elements["#mainLevel"].handlers.input({target:{value:"30"}});
    check(elements["#warriorCategories"].innerHTML.includes("Solid Sharpening Stone"),"Level 30 item availability respected");
  }catch(error){check(false,"Runtime UI smoke test: "+error.stack)}
  finish();
})().catch(error=>{check(false,error.stack);finish()});
