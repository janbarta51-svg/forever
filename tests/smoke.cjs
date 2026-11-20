"use strict";
const fs=require("node:fs");
const path=require("node:path");
const vm=require("node:vm");
const root=path.resolve(__dirname,"..");
const read=f=>fs.readFileSync(path.join(root,f),"utf8");
const assets=["index.html","cms.html","styles.css","forever.css","app.js","cms.js","data-food.js","data-warrior.js","data-60.js","data-party.js","class-ui.js","talents.js","links.json","assets/roles/tank.svg","assets/roles/healer.svg","assets/roles/dps.svg","assets/icons/copy.svg","addon/ForeverBuffLinks/ForeverBuffLinks.toc","addon/ForeverBuffLinks/ForeverBuffLinks.lua"];
let failures=0;
function check(condition,message){console.log((condition?"PASS ":"FAIL ")+message);if(!condition)failures++}
function finish(){console.log("\n"+(failures?"FAILED: "+failures:"ALL TESTS PASSED"));process.exitCode=failures?1:0}
for(const file of assets)check(fs.existsSync(path.join(root,file)),"Asset: "+file);
for(const file of assets.filter(x=>x.endsWith(".js")))try{new vm.Script(read(file),{filename:file});check(true,"JavaScript syntax: "+file)}catch(e){check(false,file+": "+e.message)}
for(const file of ["index.html","cms.html","app.js","cms.js","data-warrior.js","data-60.js","data-party.js","data-food.js","class-ui.js","talents.js","README.md"]){
  check(!/[áčďéěíňóřšťúůýž]/i.test(read(file)),"English-only content: "+file);
}
const w={addEventListener(){}};
const sandbox={window:w};
for(const f of ["data-food.js","data-warrior.js","data-party.js","class-ui.js"])vm.runInNewContext(read(f),sandbox,{filename:f});
sandbox.WARRIOR_ITEMS=w.WARRIOR_ITEMS;
vm.runInNewContext(read("data-60.js"),sandbox,{filename:"data-60.js"});
for(const [key,value] of Object.entries(w))sandbox[key]=value;
check(Object.keys(w.CLASS_THEME).length===9,"Nine class themes");
check(w.CLASS_THEME.Warrior.color==="#C69B6D","Warrior is brown");
check(w.CLASS_THEME.Priest.color==="#FFFFFF","Priest is white");
for(const role of ["tank","healer","dps"])check(read("assets/roles/"+role+".svg").includes("data:image/png;base64,"),"Blizzard role icon embedded: "+role);
check(w.FOODS.length===112,"Food catalog contains 112 verified Forever item links");
check(new Set(w.FOODS.map(x=>x.name)).size===112,"No duplicate food names");
check(new Set(w.FOODS.map(x=>x.id)).size===112,"All food IDs are unique");
check(w.FOODS.every(x=>Number.isInteger(x.id)&&x.id>0&&x.food===true),"Every food has a positive verified item ID");
check(["Poached Sunscale Salmon","Savory Turtle Stew","Swiftstrike Steak","Wicked Smoothie","Dirge's Kickin' Chimaerok Chops","Sage's Tea","Mightfish Steak"].every(name=>w.FOODS.some(x=>x.name===name)),"All missing high-level food buffs have been added");
check(w.FOODS.find(x=>x.name==="Sunny Tea").category==="HEAL"&&w.FOODS.find(x=>x.name==="Sunny Tea").effect==="+33 healing power","Sunny Tea healing category corrected from its tooltip");
check(w.FOODS.find(x=>x.name==="Lobster Stew").category==="SPELL"&&w.FOODS.find(x=>x.name==="Lobster Stew").effect==="+28 spell damage","Lobster Stew damage category corrected from tooltip");
check(w.FOODS.find(x=>x.name==="Savory Turtle Stew").level===45&&w.FOODS.find(x=>x.name==="Savory Turtle Stew").id===250068,"Savory Turtle Stew verified level and ID");
check(["Prowler Steak","Filet o' Flank","Sunrise Omelette","Grand Lobster Banquet","Specklefin Feast","Spotted Yellowtail","Roasted Kodo Meat","Goblin Deviled Clams","Egg Nog","Gingerbread Cookie"].every(name=>w.FOODS.some(x=>x.name===name)),"Additional November and Horde food items present");
check(w.FOODS.find(x=>x.name==="Prowler Steak").id===238637&&w.FOODS.find(x=>x.name==="Filet o' Flank").id===238638,"Level 55 melee food has correct IDs");
check(w.FOODS.find(x=>x.name==="Sunrise Omelette").statBonuses.HEAL===55&&w.FOODS.find(x=>x.name==="Sunrise Omelette").statBonuses.SPELL===25,"Sunrise Omelette multistat buff values");
check(w.FOODS.find(x=>x.name==="Roasted Kodo Meat").id===5474,"Early Horde Tauren food included");

check(w.WARRIOR_ITEMS.length>=140,"Warrior items expanded with level 31-60 consumables");
check(w.WARRIOR_ITEMS.every(x=>x.level===null||(x.level>=1&&x.level<=60)),"Consumable character levels within 1–60");
check(new Set(w.WARRIOR_ITEMS.map(x=>x.name)).size===w.WARRIOR_ITEMS.length,"No duplicated consumable names");
check(["Dense Sharpening Stone","Dense Weightstone","Elemental Sharpening Stone","Thorium Grenade","Goblin Sapper Charge","Mighty Rage Potion","Major Healing Potion","Flask of the Titans","Elixir of the Phalanx"].every(name=>w.WARRIOR_ITEMS.some(x=>x.name===name)),"Key post-30 consumables present");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Iron Grenade").professionSkill===175,"Iron Grenade gated by Engineering 175, not item level");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Dense Sharpening Stone").level===35,"Dense stone unlocks at level 35");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Mighty Rage Potion").level===46,"Mighty Rage unlocks at 46");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Elixir of Greater Defense").id===13445,"Forever-renamed Greater Defense elixir has correct ID");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Elixir of Defense").id===8951,"Lower-rank Defense elixir has distinct ID");
const assignedIds=w.WARRIOR_ITEMS.filter(x=>Number.isInteger(x.id)&&x.id>0).map(x=>x.id);
check(new Set(assignedIds).size===assignedIds.length,"Catalog has no conflicting item IDs");
check(w.WARRIOR_ITEMS.every(x=>x.purchasable===true),"All listed consumables are explicitly tradable");
check(w.FOODS.every(x=>x.purchasable===true),"All listed cooked foods are marked as tradable");
const copyWeapons=w.WARRIOR_WEAPONS.filter(x=>x.purchasable===true).map(x=>x.name);
check(copyWeapons.length===4&&["Copper Axe","Hatchet","Flurry Axe","Mass of McGowan"].every(name=>copyWeapons.includes(name)),"Only vendor, crafted and BoE Horde weapon options have name-copy actions");
check(w.WARRIOR_WEAPONS.length>=17&&w.WARRIOR_WEAPONS.some(x=>x.level===60&&x.name==="Quel'Serrar"),"Tauren Horde one-hand weapon progression reaches level 60");
check(w.WARRIOR_WEAPONS.every(x=>Number.isInteger(x.id)&&x.id>0),"All recommended one-hand weapons have direct Forever item IDs");
check(!w.WARRIOR_WEAPONS.some(x=>["Haggard's Axe","Hamhock's Cleaver","Cookie's Tenderizer"].includes(x.name)),"Alliance-only old weapons removed");
check(!w.WARRIOR_ITEMS.some(x=>["Iron Shield Spike","Thorium Shield Spike"].includes(x.name))&&w.WARRIOR_ITEMS.some(x=>x.name==="Mithril Shield Spike"),"Only Mithril Shield Spike is offered");
check(w.WARRIOR_ITEMS.filter(x=>x.upgradeGroup==="armor-stamina").length===5,"Five stamina armor kit ranks");
check(w.WARRIOR_ITEMS.filter(x=>x.upgradeGroup==="armor-attack").length===4,"Four attack-power armor kit ranks");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Forceful Rugged Armor Kit").id===252488,"Highest Forever AP armor kit uses verified item ID");
check(w.FOODS.find(x=>x.name==="Dragonbreath Chili").id===12217,"Food item links include verified Dragonbreath Chili ID");
check(w.WARRIOR_QUESTS.every(x=>!x.purchasable),"Class quests never get name-copy actions");
check(read("forever.css").includes('.copy-item-glyph')&&read("forever.css").includes('mask:url("assets/icons/copy.svg")'),"Amber 1em copy glyph references local SVG");

check(w.CAMP_FEATURES.length===12,"All 12 camp objects");
check(Object.keys(w.GROUP_ABILITY_DATA).length===9,"All nine classes covered");
check(Object.values(w.GROUP_ABILITY_DATA).every(list=>list.every(a=>a[2].every((n,i)=>n>=1&&n<=60&&(i===0||n>a[2][i-1])))),"All class ranks strictly rise and stay within level 60");
check(Object.values(w.GROUP_ABILITY_DATA).every(list=>list.every(a=>a[2].length===a[3].length)),"All spell rank descriptions match their unlock tables");
check(Object.values(w.GROUP_ABILITY_DATA).flat().length>=130,"Comprehensive nine-class buff and CC catalogue");
check(Object.values(w.GROUP_ABILITY_DATA).some(list=>list.some(a=>a[2].some(n=>n>30))),"Spells progress beyond level 30");
check(!w.GROUP_ABILITY_DATA.Paladin.some(a=>/Salvation/i.test(a[0])),"Paladin has neither Blessing nor Greater Blessing of Salvation");
check(!w.GROUP_ABILITY_DATA.Hunter.some(a=>["Strider Kick","Counterattack"].includes(a[0])),"Hunter damage/movement abilities are not listed as CC");
const markup=read("index.html");
for(const tab of ["warrior","food","group","talents","camp","links"])check(markup.includes('id="view-'+tab+'"'),"Tab: "+tab);
check(markup.includes('href="#talents" data-tab="talents"'),"Talent Calculator added to main navigation");
check(markup.includes('src="talents.js?v=20261120"'),"Lazy talent embed library integration script included");
check(markup.includes('id="talentClass"')&&markup.includes('id="talentLevel"'),"Talent class and level controls are available");
check(read("talents.js").includes("WarcraftForever.Talents")&&read("talents.js").includes("latest.js?alias=0"),"Supported live talent library API is used, not an unverified Wowhead iframe");
check(read("forever.css").includes(".talent-canvas")&&read("forever.css").includes("max-width:1050px"),"Talent layout and responsive menu styles are present");
check(markup.includes('src="class-ui.js"'),"Class themes loaded before app script");
check(markup.includes('src="data-food.js?v=20261116-food-112"'),"Updated foods dataset cache-busted");
check(markup.includes('iconSize:true'),"Wowhead icon sizing enabled");
check(markup.includes('<option value="HEAL">Healing Power</option>'),"Healing Power has a separate food filter");
check(read("app.js").includes('document.addEventListener("DOMContentLoaded",refreshTooltips)'),"Wowhead tooltip icons refreshed after deferred loader");
check(read("forever.css").includes(".food-fallback-icon"),"Food icon placeholder remains when CDN fails");

check(markup.includes('src="data-party.js?v=20261116-party60"'),"New level 60 class data is cache-busted");
check(markup.includes("all nine classes through level 60"),"Party guide advertises all-class level 60 support");
check(markup.includes('src="data-60.js?v=20261116-tauren-armor"'),"Horde armor kit data loaded with fresh cache");
check(w.WARRIOR_ITEMS.filter(x=>x.upgradeGroup).length>=60,"Upgrade families cover potions, elixirs, weapon buffs and scrolls");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Elixir of Minor Agility").upgradeGroup===w.WARRIOR_ITEMS.find(x=>x.name==="Elixir of Agility").upgradeGroup,"Agility elixirs are one upgrade family");
check(w.WARRIOR_ITEMS.find(x=>x.name==="Elemental Sharpening Stone").upgradeGroup===undefined,"Critical strike stone remains independent from weapon-damage stones");
check(markup.includes('id="mainLevel" min="1" max="60"'),"Warrior slider reaches level 60");
check(markup.includes('id="levelNumber" min="1" max="60"'),"Exact level input reaches level 60");
check(markup.includes('id="linksStatus"'),"Links failure status is present");
check(read("cms.html").includes('class="cms-back-link"'),"CMS back navigation works without the mobile menu toggle");
check(read("cms.html").includes('src="cms.js?v=20261116-http-safety"'),"Fresh CMS JavaScript is loaded");
check(read("cms.js").includes('fetch(API + "?ref=main"'),"CMS reload fetches GitHub main, not stale Pages");
check(read("cms.js").includes('snapshot(current.links) !== loadedSnapshot'),"CMS blocks overwriting changes made in GitHub");
check(read("forever.css").includes(".role-class-trigger .selected-class"),"Centered class selector styling");

const baseCSS=read("styles.css"), foreverCSS=read("forever.css");
check(!/(^|\\})table\\{width:100%;border-collapse:collapse;min-width:700px\\}/.test(baseCSS),"No global 700px table rule inflates Wowhead tooltips");
check(baseCSS.includes(".table-scroll > table{width:100%;border-collapse:collapse;min-width:700px}"),"Food Buffs table still has its 700px scrollable minimum");
check(baseCSS.includes(".table-scroll > table th") && baseCSS.includes(".table-scroll > table td"),"Food table headers and cells remain styled without affecting tooltips");
check(!read("app.js").includes('class="local-tooltip"'),"Current app.js generates no local tooltip markup");
check(read("app.js").includes("data-wowhead"),"Original Wowhead tooltip bindings preserved");
check(foreverCSS.includes(".tooltip-wrap .local-tooltip") && foreverCSS.includes("display:none !important"),"Cached local tooltip is force-hidden, including after link click/focus");
check(markup.includes('src="app.js?v=20261120-talents"'),"Talent-aware main app cache version is current");
check(markup.includes('href="forever.css?v=20261120-talents"'),"Talent layout CSS cache version loaded");
check(markup.includes('href="styles.css?v=20261102-tooltip-fix"'),"Latest table CSS uses explicit cache-busting version");
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
  const tabs=["warrior","food","group","talents","camp","links"].map(id=>({
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
    check(initialWarrior.includes('data-copy-name="Heavy Sharpening Stone"')&&!initialWarrior.includes('data-copy-name="Rough Sharpening Stone"'),"Only latest available sharpening stone has a copy icon at level 20");
    check(initialWarrior.includes('data-copy-name="Copper Axe"'),"Crafted Horde weapon has an AH copy icon");
    check(initialWarrior.includes('data-copy-name="Hatchet"'),"Vendor one-hand axe has a copy icon");
    check(!initialWarrior.includes('data-copy-name="Wingblade"'),"Horde quest sword has no AH copy icon");
    check(!initialWarrior.includes('data-copy-name="Revenge"'),"Warrior spell has no copy icon");
    check(initialFood.includes('data-copy-name="Goretusk Liver Pie"'),"Purchasable food has a copy icon");
    check(initialFood.includes('data-wh-icon-size="small"'),"Verified food links request actual Wowhead item icons");
    check(initialFood.includes('food-fallback-icon'),"Food rows have a visible category-icon fallback");
    check(!initialFood.includes('class="item-lookup"'),"Food rows no longer show unverified item search indicators");
    check(!elements["#partyResults"].innerHTML.includes('data-copy-name='),"Party spell list has no item copy icons");
    const slotMarkup=elements["#groupSlots"].innerHTML;
    check(slotMarkup.includes("assets/roles/tank.svg"),"Transparent tank role icon");
    check(slotMarkup.includes("assets/roles/healer.svg"),"Transparent healer role icon");
    check(slotMarkup.split("assets/roles/dps.svg").length-1===3,"Exactly three DPS role icons");
    check(slotMarkup.includes(">Tank</strong>") && slotMarkup.includes(">Healer</strong>"),"Tank and Healer role headers");
    check(slotMarkup.includes("selected-class class-colored"),"Centered class label elements");
    check(!slotMarkup.includes("picker-arrow")&&!slotMarkup.includes("◆")&&!slotMarkup.includes("⌄"),"All five class selectors are free of arrow and diamond glyphs");
    check(slotMarkup.includes('<summary class="role-class-trigger"'),"Healer and DPS class dropdowns are still clickable");
    check(read("forever.css").includes("grid-template-columns:28px minmax(0,1fr);"),"Class selector grid has no third arrow column");
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
    check(elements["#groupSlots"].innerHTML.includes('id="partyLevel1"') && elements["#groupSlots"].innerHTML.includes('id="partyLevel1" class="member-level" data-party-level="1" type="number" min="1" max="60" value="12"'),"Warrior slider preserves teammate level");
    elements["#mainLevel"].handlers.input({target:{value:"1"}});
    check(elements["#exportRows"].innerHTML.includes("Battle Shout (Rank1)"),"Warrior at level 1 exports Battle Shout Rank1");
    elements["#mainLevel"].handlers.input({target:{value:"11"}});
    check(elements["#exportRows"].innerHTML.includes("Battle Shout (Rank1)"),"Warrior at level 11 remains Battle Shout Rank1");
    elements["#mainLevel"].handlers.input({target:{value:"12"}});
    check(elements["#exportRows"].innerHTML.includes("Battle Shout (Rank2)"),"Warrior at level 12 exports Battle Shout Rank2");
    elements["#mainLevel"].handlers.input({target:{value:"22"}});
    check(elements["#exportRows"].innerHTML.includes("Battle Shout (Rank3)"),"Warrior at level 22 exports Battle Shout Rank3");
    await elements["#exportRows"].handlers.click({target:{closest:s=>s==="[data-copy-line]"?{dataset:{copyLine:"0"}}:null}});
    check(copied.startsWith("Warrior - Buffs: Battle Shout (Rank3)")&&!copied.includes("(Lv "),"Single-line copy is ranked plain text and omits character level");
    await elements["#copyAll"].handlers.click();
    let lines=copied.split("\n").filter(Boolean);
    check(lines.length>=5&&lines.every(x=>x.length<=235),"Copy all preserves chat-safe individual lines");
    check(lines.every(x=>/^(Warrior|Priest|Paladin|Druid|Shaman|Mage|Warlock|Hunter|Rogue) - /.test(x)),"All chat lines start with their class");
    check(lines.some(x=>x.startsWith("Priest - Buffs: Power Word: Fortitude (Rank2)")),"Other members use their own selected level and rank");
    check(lines.every(x=>!x.includes("(Lv ")&&!x.includes("{spell:")&&!x.includes("/run")),"No character levels, addon tokens or untested game links");
    elements["#groupSlots"].handlers.change({target:{matches:s=>s==="[data-party-level]",dataset:{partyLevel:"1"},value:"24"}});
    await elements["#copyAll"].handlers.click();
    lines=copied.split("\n").filter(Boolean);
    check(lines.some(x=>x.startsWith("Priest - Buffs: Power Word: Fortitude (Rank3)")),"Priest updates independently to Rank3 at level 24");
    elements["#groupSlots"].handlers.change({target:{matches:s=>s==="[data-party-level]",dataset:{partyLevel:"1"},value:"12"}});
    elements["#mainLevel"].handlers.input({target:{value:"25"}});
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
    const hasWarriorItem=name=>elements["#warriorCategories"].innerHTML.includes(">"+name+"</a>")||
      elements["#warriorCategories"].innerHTML.includes(">"+name+" <span");
    for(const [level,shown,hidden] of [
      [1,["Rough Sharpening Stone","Rough Weightstone","Minor Healing Potion"],["Coarse Sharpening Stone","Lesser Healing Potion"]],
      [2,["Elixir of Minor Agility"],["Elixir of Lesser Agility"]],
      [17,["Elixir of Minor Agility"],["Elixir of Lesser Agility"]],
      [18,["Elixir of Lesser Agility"],["Elixir of Minor Agility","Elixir of Agility"]],
      [27,["Elixir of Agility"],["Elixir of Minor Agility","Elixir of Lesser Agility"]],
      [38,["Elixir of Greater Agility"],["Elixir of Agility","Elixir of Lesser Agility"]],
      [35,["Dense Sharpening Stone","Dense Weightstone"],["Solid Sharpening Stone","Solid Weightstone"]],
      [45,["Major Healing Potion"],["Superior Healing Potion","Greater Healing Potion"]],
      [46,["Mighty Rage Potion"],["Great Rage Potion","Rage Potion"]],
      [55,["Major Frenzy Potion"],["Superior Frenzy Potion","Lesser Frenzy Potion"]],
      [60,["Scroll of Agility IV","Elixir of Greater Fortitude"],["Scroll of Agility III","Elixir of Lesser Fortitude"]]
    ]){
      elements["#mainLevel"].handlers.input({target:{value:String(level)}});
      check(shown.every(hasWarriorItem)&&hidden.every(name=>!hasWarriorItem(name)),"Level "+level+" shows only current ranks for tested upgrade families");
    }
    for(const [level,staminaKit,apKit,hidden] of [
      [1,"Light Armor Kit",null,"Medium Armor Kit"],
      [15,"Medium Armor Kit","Forceful Medium Armor Kit","Heavy Armor Kit"],
      [20,"Heavy Armor Kit","Forceful Medium Armor Kit","Thick Armor Kit"],
      [30,"Thick Armor Kit","Forceful Heavy Armor Kit","Rugged Armor Kit"],
      [40,"Rugged Armor Kit","Forceful Thick Armor Kit","Forceful Rugged Armor Kit"],
      [50,"Rugged Armor Kit","Forceful Rugged Armor Kit","Forceful Thick Armor Kit"]
    ]){
      elements["#mainLevel"].handlers.input({target:{value:String(level)}});
      check(hasWarriorItem(staminaKit)&&(!apKit||hasWarriorItem(apKit))&&!hasWarriorItem(hidden),
        "Level "+level+" shows only strongest stamina and AP armor kits");
    }
    check(!["Tank Checklist","Class Quests & Milestones","First Aid","Flasks"].some(name=>
      elements["#warriorCategories"].innerHTML.includes("<h2>"+name)),
      "Requested categories are removed from Warrior page");
    check(hasWarriorItem("Mithril Shield Spike")&&!hasWarriorItem("Iron Shield Spike")&&!hasWarriorItem("Thorium Shield Spike"),
      "Only Mithril Shield Spike remains at level 50");
    elements["#mainLevel"].handlers.input({target:{value:"60"}});
    elements["#foodCategory"].handlers.change({target:{value:"STR"}});
    const highStr=elements["#foodRows"].innerHTML;
    check(highStr.includes("Prowler Steak")&&highStr.indexOf("Prowler Steak")<highStr.indexOf("Bear Bruscitti"),"Prowler Steak leads Strength foods at level 55");
    elements["#foodCategory"].handlers.change({target:{value:"AGI"}});
    const highAgi=elements["#foodRows"].innerHTML;
    check(highAgi.includes("Filet o&#39; Flank")&&highAgi.indexOf("Filet o&#39; Flank")<highAgi.indexOf("Swiftstrike Steak"),"Filet o' Flank leads Agility foods at level 55");
    elements["#foodCategory"].handlers.change({target:{value:"HEAL"}});
    const highHeal=elements["#foodRows"].innerHTML;
    check(highHeal.includes("Sunrise Omelette")&&highHeal.indexOf("Sunrise Omelette")<highHeal.indexOf("Sage&#39;s Tea"),"Healing food correctly sorts Sunrise Omelette by +55, not by +25 Spell Damage");
    elements["#foodCategory"].handlers.change({target:{value:"STA"}});
    check(elements["#foodRows"].innerHTML.includes("Grand Lobster Banquet")&&elements["#foodRows"].innerHTML.includes("Prowler Steak"),"Multistat feast and steak appear in Stamina filter");
    elements["#foodCategory"].handlers.change({target:{value:"HEAL"}});
    const healingRows=elements["#foodRows"].innerHTML;
    check(healingRows.includes("Sage&#39;s Tea")&&healingRows.includes("Sunny Tea")&&!healingRows.includes("Lobster Stew"),
      "Healing Power filter includes new healing drinks but not spell damage");
    check(healingRows.indexOf("Sage&#39;s Tea")<healingRows.indexOf("Sunny Tea"),"Healing food is sorted strongest first");
    elements["#foodCategory"].handlers.change({target:{value:"SPELL"}});
    const spellRows=elements["#foodRows"].innerHTML;
    check(spellRows.includes("Lobster Stew")&&spellRows.includes("Baked Salmon")&&!spellRows.includes("Sunny Tea"),
      "Spell Damage filter includes Lobster Stew and excludes healing tea");
    elements["#foodCategory"].handlers.change({target:{value:"AGI"}});
    const agilityRows=elements["#foodRows"].innerHTML;
    check(agilityRows.indexOf("Jungle Stew")<agilityRows.indexOf("Hot Wolf Ribs")&&
      agilityRows.indexOf("Hot Wolf Ribs")<agilityRows.indexOf("Spiced Wolf Meat"),
      "Food Agility filter sorts numeric buffs descending");
    elements["#foodCategory"].handlers.change({target:{value:"STR"}});
    const strengthRows=elements["#foodRows"].innerHTML;
    check(strengthRows.indexOf("Bear Brisket")<strengthRows.indexOf("Big Bear Steak"),
      "Food Strength filter sorts strongest first");
    elements["#foodCategory"].handlers.change({target:{value:"all"}});
    elements["#mainLevel"].handlers.input({target:{value:"1"}});
    check(hasWarriorItem("Rough Sharpening Stone") && !hasWarriorItem("Solid Sharpening Stone"),"Level 1 item availability respected");
    elements["#mainLevel"].handlers.input({target:{value:"30"}});
    check(elements["#warriorCategories"].innerHTML.includes("Solid Sharpening Stone")&&!elements["#warriorCategories"].innerHTML.includes("Dense Sharpening Stone"),"Level 30 item availability respected");
    elements["#mainLevel"].handlers.input({target:{value:"35"}});
    check(elements["#warriorCategories"].innerHTML.includes("Dense Sharpening Stone"),"Dense stone available at level 35");
    const engineeringSection=()=>elements["#warriorCategories"].innerHTML.split("<h2>Engineering")[1]?.split("</article>")[0]||"";
    const engineering=engineeringSection();
    check(["Rough Dynamite","Coarse Dynamite","Heavy Dynamite","Solid Dynamite","Dense Dynamite"].every(name=>engineering.includes(">"+name+"</a>")),"Engineering lists the five standard dynamites");
    const engineeringNames=[...engineering.matchAll(/<a\b[^>]*>([^<]+)<\/a>/g)].map(match=>match[1]);
    check(engineeringNames.length===5&&engineeringNames.every(name=>name.endsWith(" Dynamite")),"Engineering excludes grenades, bombs, and expensive variants");
    check(elements["#warriorHighlights"].innerHTML.includes("LATEST DYNAMITE"),"Fourth highlight recommends dynamite, not grenades");
    elements["#mainLevel"].handlers.input({target:{value:"46"}});
    check(elements["#warriorCategories"].innerHTML.includes("Mighty Rage Potion"),"Mighty Rage unlocked at level 46");
    elements["#mainLevel"].handlers.input({target:{value:"60"}});
    check(elements["#levelNum"].textContent===60&&elements["#warriorCategories"].innerHTML.includes("Quel&#39;Serrar")&&!elements["#warriorCategories"].innerHTML.includes("<h2>Flasks"),"Level 60 Horde weapons and removed Flasks category");
    check(elements["#groupSlots"].innerHTML.includes('id="partyLevel0" class="member-level" data-party-level="0" type="number" min="1" max="60" value="60"'),"Warrior party selector updates to level 60");
    check(elements["#partyResults"].innerHTML.includes("Warrior <small>Lv 60"),"Warrior at level 60 has rank-aware party results");
    check(elements["#partyResults"].innerHTML.includes("Battle Shout")&&elements["#partyResults"].innerHTML.includes("Rank 7"),"Battle Shout Rank 7 displays at level 60");
    await elements["#copyAll"].handlers.click();
    let endGameLines=copied.split("\n").filter(Boolean);
    check(endGameLines.some(x=>x.startsWith("Warrior - Buffs: Battle Shout (Rank7)")),"Copy all includes Warrior Rank7 at 60");
    check(endGameLines.every(x=>x.length<=235),"Expanded group export respects 235-character per-line limit");
    elements["#groupSlots"].handlers.change({target:{matches:s=>s==="[data-party-level]",dataset:{partyLevel:"1"},value:"60"}});
    await elements["#copyAll"].handlers.click();
    endGameLines=copied.split("\n").filter(Boolean);
    check(endGameLines.some(x=>x.startsWith("Shaman - Buffs:")&&x.includes("Stoneskin Totem (Rank6)")),"Shaman rank 6 at level 60 independent of Warrior");
    check(endGameLines.every(x=>x.length<=235),"Party level 60 remains chat-safe");
    check(!endGameLines.some(x=>x.includes("Salvation")),"Removed Salvation never enters chat export");
    for(const [candidate,expected] of [
      ["Priest","Power Word: Fortitude (Rank6)"],
      ["Paladin","Blessing of Might (Rank7)"],
      ["Druid","Mark of the Wild (Rank7)"],
      ["Mage","Arcane Intellect (Rank5)"],
      ["Warlock","Blood Pact (Rank5)"],
      ["Hunter","Freezing Trap (Rank3)"],
      ["Rogue","Gouge (Rank5)"],
      ["Shaman","Strength of Earth Totem (Rank5)"]
    ]){
      elements["#groupSlots"].handlers.click({target:{closest:s=>s==="[data-class-choice]"?{dataset:{classChoice:"2",choiceClass:candidate}}:null}});
      elements["#groupSlots"].handlers.change({target:{matches:s=>s==="[data-party-level]",dataset:{partyLevel:"2"},value:"60"}});
      await elements["#copyAll"].handlers.click();
      check(copied.includes(expected),"Level 60 "+candidate+" exports "+expected);
    }
    check(!elements["#exportRows"].innerHTML.includes("Intimidating Shout (Rank1)"),"Single-rank CC does not claim a fabricated Rank1");
  }catch(error){check(false,"Runtime UI smoke test: "+error.stack)}
  finish();
})().catch(error=>{check(false,error.stack);finish()});
