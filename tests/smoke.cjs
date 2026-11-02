"use strict";
const fs=require("node:fs");
const vm=require("node:vm");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=file=>fs.readFileSync(path.join(root,file),"utf8");
const assets=["index.html","cms.html","styles.css","forever.css","app.js","cms.js","data-food.js","data-warrior.js","data-party.js","links.json"];
let fail=0;
function check(ok,msg){if(!ok){console.error("FAIL",msg);fail++}else console.log("PASS",msg)}
for(const name of assets)check(fs.existsSync(path.join(root,name)),"Asset "+name);
for(const name of assets.filter(x=>x.endsWith(".js")))try{new vm.Script(read(name),{filename:name});check(true,"Syntax "+name)}catch(e){check(false,"Syntax "+name+": "+e.message)}
const win={},sandbox={window:win};
for(const name of ["data-food.js","data-warrior.js","data-party.js"])vm.runInNewContext(read(name),sandbox,{filename:name});
check(win.FOODS.length>=60,"Food catalog >=60 entries");
check(win.WARRIOR_ITEMS.length>=50,"Warrior consumables >=50 entries");
check(win.WARRIOR_WEAPONS.length>=8,"Weapon progression");
check(win.CAMP_FEATURES.length===12,"All 12 camp feature categories");
check(Object.keys(win.GROUP_ABILITY_DATA).length===9,"All nine classes");
check(Object.values(win.GROUP_ABILITY_DATA).every(list=>list.every(a=>a[2].every(level=>level<=30))),"Group ranks within 1–30");
check(win.FOODS.every(x=>x.level===null||(x.level>=1&&x.level<=30)),"Food verified levels within 1–30");
check(win.FOODS.some(x=>x.level===null),"Unverified food level kept explicit");
check(win.WARRIOR_ITEMS.some(x=>x.name==="Solid Sharpening Stone"&&x.level===25),"Level 25 stone progression");
const html=read("index.html"),app=read("app.js");
for(const tab of ["warrior","food","group","camp","links"])check(html.includes('id="view-'+tab+'"'),"Tab "+tab);
for(const [,id] of app.matchAll(/\$\("#([^"]+)"\)/g))check(html.includes('id="'+id+'"'),"App selector #"+id);
const links=JSON.parse(read("links.json")).links;
check(links.every(x=>x.title&&/^https?:\/\//.test(x.url)),"All useful URLs valid");
console.log("\n"+(fail?"FAILED ("+fail+")":"ALL TESTS PASSED"));
process.exitCode=fail?1:0;
