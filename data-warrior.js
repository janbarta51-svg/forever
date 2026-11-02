// Practical Warrior items. "level" is character use level when confirmed.
// Items gated by profession are flagged and do not use a falsely precise character-level claim.
const _ITEM_RAW=`Rough Sharpening Stone|1|Weapon buff|+2 weapon damage|2862|Doporučeno|Na ostré zbraně
Coarse Sharpening Stone|5|Weapon buff|+3 weapon damage|2863|Doporučeno|Na ostré zbraně
Heavy Sharpening Stone|15|Weapon buff|+4 weapon damage|2871|Doporučeno|Na ostré zbraně
Solid Sharpening Stone|25|Weapon buff|+6 weapon damage|7964|Doporučeno|Na ostré zbraně
Rough Weightstone|1|Weapon buff|Zvýšení damage tupé zbraně|3240||Na palice
Coarse Weightstone|5|Weapon buff|Zvýšení damage tupé zbraně|3241||Na palice
Heavy Weightstone|15|Weapon buff|Zvýšení damage tupé zbraně|3243||Na palice
Solid Weightstone|25|Weapon buff|Zvýšení damage tupé zbraně|7965||Na palice
Elixir of Minor Strength|1|Elixíry|+4 Strength|2454|Doporučeno|
Elixir of Giant Growth|8|Elixíry|+8 Strength|6662||Nepřekrývat se stejnou kategorií, pokud hra buff přepisuje
Elixir of Ogre Strength|20|Elixíry|+8 Strength|3391||Alternativa k Giant Growth
Elixir of Minor Agility|2|Elixíry|+4 Agility|2457||
Elixir of Lesser Agility|18|Elixíry|+8 Agility|3390||
Elixir of Agility|27|Elixíry|+15 Agility|8949||
Elixir of Minor Fortitude|2|Elixíry|+27 max HP|2458||
Elixir of Lesser Fortitude|25|Elixíry|+120 max HP|3825||
Elixir of Minor Defense|1|Elixíry|+50 Armor|5997||
Elixir of Lesser Defense|16|Elixíry|+150 Armor|3389||
Elixir of Defense|29|Elixíry|+250 Armor|8949||Přesný Wowhead ID ověřit
Lesser Troll's Blood Elixir|15|Elixíry|+6 HP / 5 s|3382||
Troll's Blood Elixir|26|Elixíry|+12 HP / 5 s|3388||
Scroll of Protection|1|Scrolly|+60 Armor|3013||
Scroll of Protection II|15|Scrolly|+120 Armor|1478||
Scroll of Protection III|30|Scrolly|+180 Armor|4421||
Scroll of Stamina|5|Scrolly|+4 Stamina|1180||
Scroll of Stamina II|20|Scrolly|+8 Stamina|1711||
Scroll of Strength|10|Scrolly|+5 Strength|954||
Scroll of Strength II|25|Scrolly|+9 Strength|2289||
Scroll of Agility|10|Scrolly|+5 Agility|3012||
Scroll of Agility II|25|Scrolly|+9 Agility|1477||
Minor Healing Potion|1|Potiony|80 HP|118|Doporučeno|
Lesser Healing Potion|3|Potiony|160 HP|858|Doporučeno|
Healing Potion|12|Potiony|320 HP|929|Doporučeno|
Greater Healing Potion|21|Potiony|520 HP|1710|Doporučeno|
Rage Potion|4|Potiony|20–40 Rage|5631|Doporučeno|
Great Rage Potion|25|Potiony|30–60 Rage|5633|Doporučeno|
Minor Frenzy Potion|5|Potiony|+12 Attack Power|0||
Lesser Frenzy Potion|15|Potiony|+18 Attack Power|0||
Frenzy Potion|25|Potiony|+28 Attack Power|0||
Swiftness Potion|5|Potiony|+50 % rychlost běhu|2459||
Free Action Potion|20|Potiony|Ochrana proti stun, root a slow na 30 sekund|5634|Doporučeno|Nevymaže již aktivní efekty
Lesser Invisibility Potion|23|Potiony|Neviditelnost na 15 sekund|3823||
Forceful Medium Armor Kit|15|Armor / Shield|+4 AP a +16 Armor|0|Doporučeno|Pro hrudník, nohy, rukavice nebo boty
Forceful Heavy Armor Kit|30|Armor / Shield|+6 AP a +24 Armor|0||Pro hrudník, nohy, rukavice nebo boty
Iron Shield Spike|12|Armor / Shield|8–12 damage při blocku|6042||Podmíněné: blacksmithing skill 150 pro aplikaci dle tooltipu; lvl 12 je orientační podle spell aplikace
Mithril Shield Spike|30|Armor / Shield|16–20 damage při blocku|7967||Podmíněné: blacksmithing skill 215 pro aplikaci; minimum character lvl neověřeno
Linen Bandage|1|First Aid|Ošetření mimo rizikový damage|1251||Vyžaduje First Aid skill
Wool Bandage|1|First Aid|Silnější ošetření|3530||Vyžaduje First Aid 50
Silk Bandage|1|First Aid|Silnější ošetření|6450||Vyžaduje First Aid 100
Heavy Silk Bandage|1|First Aid|Silnější ošetření|6451||Vyžaduje First Aid 125
Mageweave Bandage|1|First Aid|Silnější ošetření|8544||Vyžaduje First Aid 150
Heavy Mageweave Bandage|1|First Aid|Silnější ošetření|8545||Vyžaduje First Aid 175
Rough Dynamite|1|Engineering|AoE damage / pull|4358||Vyžaduje Engineering skill a použití přístroje
Coarse Dynamite|1|Engineering|AoE damage / pull|4360||Vyžaduje Engineering skill a použití přístroje
Heavy Dynamite|1|Engineering|AoE damage / pull|4370||Vyžaduje Engineering skill a použití přístroje
Iron Grenade|1|Engineering|AoE damage + stun|4390|Doporučeno|Vyžaduje Engineering skill a úroveň dle item tooltipu`;
window.WARRIOR_ITEMS=_ITEM_RAW.split("\n").map(r=>{let [name,lv,category,effect,id,flag,note]=r.split("|");
  let gated=/Shield Spike|Bandage|Dynamite|Grenade/.test(name);
  return {name,level:gated?null:Number(lv),category,effect,id:(!id||id==="0"||name==="Elixir of Defense")?null:Number(id),
  flag:flag||"",note:note||"",gated,tooltipType:"item"};
});
window.WARRIOR_QUESTS=[
{level:10,name:"Bartleby's Mug",kind:"quest",effect:"Defensive Stance, Taunt a Sunder Armor",note:"Class quest ve Stormwindu; priorita pro tanka"},
{level:14,name:"Revenge",kind:"spell",effect:"Reaktivní threat attack",note:"Nauč se rank u trainera"},
{level:16,name:"Shield Block",kind:"spell",effect:"Spolehlivější aktivace Revenge",note:"Zásadní milník Prot Warriora",id:2565},
{level:20,name:"Fire Hardened Mail",kind:"quest",effect:"Class quest chain; štít Furen's Favor",note:"Ne všechny části jsou snadné na levelu 20"},
{level:30,name:"The Affray",kind:"quest",effect:"Odemkne Berserker Stance",note:"Fray Island; class quest"}
];
window.CAMP_FEATURES=[
{name:"First Aid Kit",profession:"First Aid",skill:20,effect:"Stamina +3 až +56 podle levelu",conflict:"Power Word: Fortitude",good:true},
{name:"Sharpening Wheel",profession:"Blacksmithing",skill:20,effect:"Strength +6 až +34 podle levelu",conflict:"Strength of Earth Totem",good:true},
{name:"Lodestone",profession:"Mining",skill:20,effect:"Melee Attack Power +12 až +90 podle levelu",conflict:"Blessing of Might",good:true},
{name:"Fish Bowl",profession:"Fishing",skill:20,effect:"+8 % ke všem statům",conflict:"Blessing of Kings",good:true},
{name:"Camp Chair",profession:"Skinning",skill:20,effect:"+2 % critical strike",conflict:"Moonkin Aura",good:true},
{name:"Enchanted Lute",profession:"Enchanting",skill:20,effect:"Armor, všechny staty, resistances",conflict:"Mark of the Wild",good:true},
{name:"Incense Candle",profession:"Herbalism",skill:20,effect:"Intellect",conflict:"Arcane Intellect",good:false},
{name:"Faction Banner",profession:"Tailoring",skill:20,effect:"Spirit",conflict:"Divine Spirit",good:false},
{name:"Mana Well",profession:"Alchemy",skill:20,effect:"Mana regeneration",conflict:"Blessing of Wisdom",good:false},
{name:"Camp Tent",profession:"Leatherworking",skill:20,effect:"Rested XP (až 5 % levelu)",conflict:"",good:true},
{name:"Reagent Bot",profession:"Engineering",skill:20,effect:"Nákup reagentů",conflict:"",good:false},
{name:"Basic Campfire Kit",profession:"Cooking",skill:1,effect:"Oheň a 3 místa na další camp objekty",conflict:"",good:false}
];
window.CAMP_SOURCES=["https://worldofwarcraft.blizzard.com/en-gb/news/24301516","https://www.wowhead.com/forever/guide/camping-overview-unlock-rewards"];


window.WARRIOR_WEAPONS=[
 {level:1,name:"Copper Shortsword",effect:"Blacksmithing craft; výchozí 1H alternativa",note:"Level je orientační začátek progression, ne oficiální equip requirement."},
 {level:10,name:"Haggard's Axe",effect:"Human class quest Dead-tooth Jack (Elwynn)",note:"Quest reward po level 10; 1H Axe"},
 {level:13,name:"Durgen's Crescent Axe",effect:"Hall of Thanes – Durgen Dirgehammer",note:"Orientační dungeon etapa (nikoliv minimální equip level)."},
 {level:17,name:"Buzz Saw",effect:"Deadmines – Sneed's Shredder",note:"Orientační dungeon etapa; ověř drop."},
 {level:17,name:"Cookie's Tenderizer",effect:"Deadmines – Cookie",note:"Orientační dungeon etapa; alternativa ke zbrani."},
 {level:18,name:"Blackwater Cutlass",effect:"Deadmines – Defias Pirates",note:"Orientační dungeon etapa; random drop."},
 {level:23,name:"Darkwater Talwar",effect:"Blackfathom Deeps – Lady Sarevess",note:"Orientační dungeon etapa; porovnej weapon DPS."},
 {level:24,name:"Hamhock's Cleaver",effect:"The Stockade – Hamhock (Alliance)",note:"Orientační dungeon etapa."},
 {level:29,name:"Pronged Reaver",effect:"Razorfen Kraul – Charlga Razorflank",note:"Orientační dungeon etapa; může být náročnější do 30."},
 {level:29,name:"Thornspike",effect:"Razorfen Kraul – Aggem Thorncurse",note:"Orientační dungeon etapa; může být náročnější do 30."}
];
window.WARRIOR_TIPS=[
 {level:1,name:"Battle Shout",effect:"Udržuj aktivní party AP buff; nové ranky na 1 / 12 / 22."},
 {level:10,name:"Defensive Stance",effect:"Udělej class quest hned; tankuj s 1H + shield, zejména od lvl 14."},
 {level:14,name:"Tab-target Revenge",effect:"Používej Revenge na moby s nízkým threatem, ne jen na původní cíl."},
 {level:16,name:"Shield Block + Revenge",effect:"Bloky podporují Revenge i příjem rage; šetři rage na další pull."},
 {level:20,name:"Victory Rush",effect:"Po killu využij heal; nauč se správné chain pully."},
 {level:22,name:"Aggro management",effect:"Nenakládej další rage do cíle, který už bezpečně umírá – podpoř další cíle."},
 {level:25,name:"Vanguard (talent)",effect:"Dle buildu můžeš Charge z Defensive Stance; nejde o automatický skill."},
 {level:30,name:"Berserker Stance",effect:"Class quest The Affray; přidej Intercept a novou utility."}
];
window.WARRIOR_GEAR_SOURCE="https://www.icy-veins.com/wow-forever/protection-warrior-leveling";
