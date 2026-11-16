// WoW Forever expansion: Warrior-relevant consumables for levels 31-60.
// Data checked against Forever item tables (client build 1.60.1.70888),
// https://www.60.tools/items/consumables and individual Wowhead Forever item pages.
// "level" is the item's CHARACTER requirement. Profession-only items use
// level:null plus professionSkill and showFromLevel (earliest skill training
// bracket, NOT a character-level requirement on the item).
// Unknown Wowhead item IDs intentionally remain null (safe search fallback).
(() => {
"use strict";
const rows = [
  // Weapon enhancements: level requirements verified on Wowhead Forever.
  ["Weapon buff",35,"Dense Sharpening Stone",12404,"+8 damage to a bladed weapon","30 minutes. Replaces other temporary weapon coatings."],
  ["Weapon buff",35,"Dense Weightstone",12643,"+8 damage to a blunt weapon","30 minutes. For maces, staves and fist weapons."],
  ["Weapon buff",50,"Elemental Sharpening Stone",18262,"+2% melee critical strike chance","30 minutes. A critical-strike alternative to +weapon damage."],
  ["Weapon buff",30,"Frost Oil",3829,"10% chance to cast Frostbolt on melee hit","Temporary coating; does not stack with sharpening stones."],

  // Healing / Rage / special utility potions (Warrior-usable).
  ["Potions",32,"Restorative Potion",9030,"Repeatedly removes certain negative effects","Useful against poison, disease, curses and magic effects; check tooltip."],
  ["Potions",32,"Magic Resistance Potion",9036,"Temporary resistance to all magic schools","Defensive option against magic-heavy encounters."],
  ["Potions",33,"Lesser Stoneshield Potion",4623,"Temporary bonus Armor","Tank mitigation; a potion cooldown applies."],
  ["Potions",35,"Superior Healing Potion",3928,"Restores 700–900 health","Standard healing upgrade; requires character level 35."],
  ["Potions",35,"Superior Discolored Healing Potion",null,"Restores health","Forever variant; amount and acquisition require in-game verification."],
  ["Potions",35,"Greater Frenzy Potion",250941,"+40 Attack Power for 30 seconds","Forever combat potion."],
  ["Potions",35,"Dragonfire Potion",250953,"280 Fire damage in a frontal cone; additional damage over time","Forever AoE potion; face your targets."],
  ["Potions",35,"Dreamless Sleep Potion",12190,"Restores health and mana while sleeping","Channeled; not for active tanking."],
  ["Potions",35,"Wildvine Potion",9144,"Chance to restore health and/or mana","Random outcome; mana restoration is irrelevant to Warrior."],
  ["Potions",37,"Invisibility Potion",9172,"Temporary invisibility","Utility; avoid actions that reveal you."],
  ["Potions",40,"Potion of Beast Slaying",null,"+180 Attack Power against Beasts for 5 minutes","Forever potion; only useful against Beasts."],
  ["Potions",45,"Major Healing Potion",13446,"Restores 1,050–1,750 health","Strong healing upgrade for level 45+."],
  ["Potions",45,"Limited Invulnerability Potion",3387,"Brief immunity to physical attacks","Emergency utility; affected by shared potion cooldown."],
  ["Potions",45,"Caustic Smog Potion",250951,"Creates 12-second damaging Nature cloud","31–35 Nature damage per second to enemies in the cloud."],
  ["Potions",45,"Superior Frenzy Potion",null,"Temporary Attack Power boost","Forever potion; check current tooltip for exact value."],
  ["Potions",46,"Mighty Rage Potion",13442,"45–75 Rage and +60 Strength for 20 seconds","High-priority Warrior potion."],
  ["Potions",46,"Greater Stoneshield Potion",13455,"Large temporary Armor boost","Tank cooldown. Stronger than Lesser Stoneshield."],
  ["Potions",47,"Living Action Potion",20008,"Removes stun and movement-impairing effects","Defensive utility in PvP and specific encounters."],
  ["Potions",47,"Purification Potion",13462,"Attempts to remove harmful effects","Useful when debuffs are a greater threat than raw damage."],
  ["Potions",48,"Greater Fire Protection Potion",13457,"Absorbs Fire damage","Encounter-dependent resistance potion."],
  ["Potions",48,"Greater Frost Protection Potion",13456,"Absorbs Frost damage","Encounter-dependent resistance potion."],
  ["Potions",48,"Greater Nature Protection Potion",13458,"Absorbs Nature damage","Encounter-dependent resistance potion."],
  ["Potions",48,"Greater Shadow Protection Potion",13459,"Absorbs Shadow damage","Encounter-dependent resistance potion."],
  ["Potions",48,"Greater Holy Protection Potion",13460,"Absorbs Holy damage","Encounter-dependent resistance potion."],
  ["Potions",48,"Greater Arcane Protection Potion",13461,"Absorbs Arcane damage","Encounter-dependent resistance potion."],
  ["Potions",50,"Major Rejuvenation Potion",18253,"Restores both health and mana","Health component useful for Warrior; mana component wasted."],
  ["Potions",55,"Major Frenzy Potion",null,"Temporary Attack Power boost","Forever level-55 version; verify exact AP from tooltip."],
  ["Potions",55,"Greater Dreamless Sleep Potion",20002,"Restores health and mana while asleep","Out-of-combat recovery; not for active tanking."],
  // Forever alternatives and situational potions, all with verified character requirements.
  ["Potions",35,"Greater Mender's Potion",null,"Mender potion effect","Forever-specific; verify benefit before buying."],
  ["Potions",45,"Superior Mender's Potion",null,"Mender potion effect","Forever-specific; verify benefit before buying."],
  ["Potions",55,"Major Mender's Potion",null,"Mender potion effect","Forever-specific; verify benefit before buying."],
  ["Potions",45,"Major Healing Draught",null,"Restores health","PvP-related alternative; availability varies."],
  ["Potions",35,"Superior Healing Draught",null,"Restores health","PvP-related alternative; availability varies."],
  ["Potions",40,"Potion of Venomous Blood",null,"Situational potion","Forever-specific; exact effect should be checked in-game."],
  ["Potions",35,"Greater Spellblasting Potion",null,"Spell-damage potion","Situational; primarily useful for casters, not a tank."],
  ["Potions",45,"Superior Spellblasting Potion",null,"Spell-damage potion","Caster-oriented; included for completeness."],
  ["Potions",55,"Major Spellblasting Potion",null,"Spell-damage potion","Caster-oriented; included for completeness."],

  // High-level tank / melee elixirs; character levels from Forever client.
  ["Elixirs",38,"Elixir of Greater Agility",9187,"+25 Agility","Good for critical chance and avoidance."],
  ["Elixirs",38,"Gift of Arthas",9088,"Shadow resistance and chance to inflict disease","Situational tank utility."],
  ["Elixirs",38,"Elixir of the Sages",13447,"Boosts intellect and spirit","Not normally recommended for Warrior."],
  ["Elixirs",43,"Elixir of Greater Defense",13445,"+450 Armor","Tank mitigation. Forever name of the original Superior Defense elixir."],
  ["Elixirs",45,"Elixir of Brute Force",13453,"+18 Strength and +18 Stamina","Useful combined melee/tank stats."],
  ["Elixirs",45,"Elixir of Strength",null,"Strength increase","New Forever stat elixir; check client tooltip."],
  ["Elixirs",45,"Elixir of Fortitude",null,"Increases survivability","New Forever stat elixir; check exact amount."],
  ["Elixirs",45,"Distilled Firewater",null,"Damage-oriented buff","Forever consumable; see current tooltip."],
  ["Elixirs",45,"Winterfall Firewater",12820,"+35 Attack Power","Reliable melee damage buff."],
  ["Elixirs",46,"Elixir of the Mongoose",13452,"+25 Agility and +2% critical chance","Excellent melee elixir."],
  ["Elixirs",48,"Elixir of Greater Strength",null,"Strength buff","Check current version; item ID not independently confirmed."],
  ["Elixirs",53,"Major Troll's Blood Elixir",20004,"Improved health regeneration","Long-duration regen buff."],
  ["Elixirs",55,"Elixir of Greater Fortitude",null,"Maximum health increase","Forever-specific tank option."],
  ["Elixirs",55,"Elixir of the Grizzly",null,"Stamina-oriented effect","Forever-specific; verify effect before choosing."],
  ["Elixirs",55,"Elixir of the Phalanx",250329,"+400 maximum health and +500 Armor for 30 minutes","Forever-specific, strong tank survivability."],
  ["Elixirs",55,"Elixir of Ferocity",null,"Damage-oriented buff","Forever-specific; verify effect and stacking."],
  ["Elixirs",55,"Elixir of Wicked Regeneration",null,"Health regeneration","Forever-specific high-level utility."],
  ["Elixirs",55,"Elixir of the Whale",null,"Stamina-oriented effect","Forever-specific; exact tooltip should be checked."],

  // Scrolls for Warrior: actual item-required character levels.
  ["Scrolls",35,"Scroll of Stamina III",4422,"+12 Stamina","Longer-lasting stamina buff."],
  ["Scrolls",40,"Scroll of Strength III",4426,"+13 Strength","Does not stack with the same stat-family buff."],
  ["Scrolls",40,"Scroll of Agility III",4425,"+13 Agility","Does not stack with the same stat-family buff."],
  ["Scrolls",45,"Scroll of Protection IV",10305,"Armor increase","Higher-rank armor scroll."],
  ["Scrolls",50,"Scroll of Stamina IV",10307,"+16 Stamina","Highest Classic stamina scroll rank."],
  ["Scrolls",55,"Scroll of Strength IV",10310,"+17 Strength","Highest Classic strength scroll rank."],
  ["Scrolls",55,"Scroll of Agility IV",10309,"+17 Agility","Highest Classic agility scroll rank."],
  // Forever-specific weapon scroll consumables. Verified item level requirements.
  ["Scrolls",46,"Scroll of Imbue Greater Flame",null,"Temporary Fire weapon imbue","Forever enchantment; check compatibility with sharpening stones."],
  ["Scrolls",46,"Scroll of Imbue Greater Frost",null,"Temporary Frost weapon imbue","Forever enchantment; check compatibility with sharpening stones."],
  ["Scrolls",46,"Scroll of Imbue Precision",null,"Temporary precision weapon imbue","Forever enchantment; compare with sharpening stones."],
  ["Scrolls",46,"Scroll of Imbue Spellbreak",null,"Temporary anti-caster weapon imbue","Forever enchantment; effect detail requires validation."],

  // Flasks for level 50+. Only effects relevant to Warrior.
  ["Flasks",50,"Flask of the Titans",13510,"+1,200 maximum health for 2 hours","Persists through death; premier tank flask."],
  ["Flasks",50,"Flask of Chromatic Resistance",13513,"Increases resistance to all magic schools","Situational tank flask; verify current effect value."],

  // First Aid and armor consumables (skill-gated entries adjusted below).
  ["Armor / Shield",40,"Rugged Armor Kit",15564,"Adds +40 Armor to eligible armor pieces","Leatherworking-made permanent armor kit."],
  ["Armor / Shield",50,"Thorium Shield Spike",12645,"Returns damage when blocking","Requires Blacksmithing to apply; confirm current application rules."],

  // Higher-tier bandages; minimum use skill and profession progress vary.
  // These are not character-level requirements.
  ["First Aid",null,"Runecloth Bandage",14529,"Heals 1,360 damage over 8 seconds","High-tier First Aid bandage; verify skill requirements before use."],
  ["First Aid",null,"Heavy Runecloth Bandage",14530,"Heals 2,000 damage over 8 seconds","Requires First Aid 225 to use; crafting requires higher skill (290)."],
  ["First Aid",null,"Powerful Anti-Venom",19440,"Cures higher-level poison effects","High-level First Aid utility; poison removal depends on the effect."],

  // New bombs which can be used with profession restrictions, not a character minimum.
  ["Engineering",null,"Small Bronze Bomb",4374,"Explosive AoE damage and brief disruption","Early engineering bomb.",{professionSkill:120}],
  ["Engineering",null,"Big Bronze Bomb",4380,"AoE damage and stun","Stronger bronze-tier bomb.",{professionSkill:140}],
  ["Engineering",null,"Solid Dynamite",10507,"Area damage without grenade stun","Engineering-made AoE pull tool.",{professionSkill:175}],
  ["Engineering",null,"Goblin Land Mine",4395,"Placed explosive trap","Engineering utility; verify placement restrictions.",{professionSkill:195}],
  ["Engineering",null,"Big Iron Bomb",4394,"AoE damage and stun","Iron-tier AoE bomb.",{professionSkill:190}],
  ["Engineering",null,"Mithril Frag Bomb",10514,"AoE damage and stun","Reliable upgrade from Iron Grenade.",{professionSkill:205}],
  ["Engineering",null,"Goblin Sapper Charge",10646,"450–750 Fire damage nearby; also damages you","Requires Engineering 205; Goblin specialization for crafting. 5-min cooldown.",{professionSkill:205}],
  ["Engineering",null,"Hi-Explosive Bomb",10562,"Large explosive AoE damage","Engineering bomb; check tooltip for stun details.",{professionSkill:235}],
  ["Engineering",null,"The Big One",10586,"Large-radius explosive AoE damage","Goblin Engineering crafted bomb.",{professionSkill:235}],
  ["Engineering",null,"Dense Dynamite",18641,"Strong AoE explosive damage","High-tier dynamite.",{professionSkill:250}],
  ["Engineering",null,"Thorium Grenade",15993,"AoE Fire damage and stun","High-level grenade choice.",{professionSkill:260}],
  ["Engineering",null,"Dark Iron Bomb",16005,"High-tier AoE bomb","High-tier engineering explosive.",{professionSkill:285}],
  ["Engineering",null,"Arcane Bomb",16040,"Burns mana and silences enemies for 5 seconds","Engineering 300. Outstanding against caster packs.",{professionSkill:300}],
  ["Engineering",null,"Flash Bomb",4852,"Disorients nearby beasts","Requires character level 27; engineering skill may be needed.",{professionSkill:185,level:27}],
  // Forever-specific easy-use bombs have character req 1 in the client;
  // include only those relevant to level 31-60 in the guide.
  ["Engineering",1,"SAF-T Bronze Bomb",null,"Forever engineering explosive","Usable without level 35+ requirement; check the client tooltip."],
  ["Engineering",1,"SAF-T Jumbo Dynamite",null,"Forever dynamite","Check current effect."],
  ["Engineering",1,"Shafety Sheep",null,"Forever explosive sheep","Check current effect."],
  ["Engineering",1,"EZ-Thro Grenade",null,"Forever throw-ready grenade","Check current effect."],
  ["Engineering",1,"EZ-Thro Thorium Grenade",260816,"Forever throw-ready thorium grenade","Check current effect."],
  ["Engineering",1,"SAF-T Bomb",null,"Forever engineering bomb","Check current effect."],
  ["Engineering",1,"Tru-Trigger Frag Bomb",null,"Forever engineering grenade","Check current effect."],
  ["Engineering",1,"SAF-T Clever Dynamite",null,"Forever dynamite variant","Check current effect."],
  ["Engineering",1,"EZ-Thro Dark Bomb",null,"Forever throw-ready dark bomb","Check current effect."],
  ["Engineering",1,"EZ-Thro Mana Bomb",null,"Forever anti-mana bomb","Check current effect."],
  ["Engineering",1,"EZ-Thro Copper Bomb XL",null,"Forever throw-ready copper bomb","Check current effect."],
  ["Engineering",1,"SAF-T Copper Bomb",null,"Forever copper bomb","Check current effect."],
  ["Engineering",1,"SAF-T Dynamite",null,"Forever dynamite","Check current effect."]
];
const minTrainingLevel=skill => skill>225?35:skill>150?20:skill>75?10:1;
const existing = new Map(WARRIOR_ITEMS.map(item => [item.name,item]));
for (const [category, minimumLevel, name, id, effect, note, opts={}] of rows) {
  const skill=opts.professionSkill??null;
  const level=Number.isInteger(opts.level)?opts.level:minimumLevel;
  const target=existing.get(name);
  const item={
    name, level, category, effect, id, note,
    flag: ["Mighty Rage Potion","Goblin Sapper Charge","Dense Sharpening Stone","Elemental Sharpening Stone","Thorium Grenade","Elixir of the Phalanx","Flask of the Titans"].includes(name)?"Recommended":"",
    gated:skill!==null,
    tooltipType:"item", purchasable:true
  };
  if(skill!==null){
    item.professionSkill=skill;
    item.profession="Engineering";
    if(level===null)item.showFromLevel=minTrainingLevel(skill);
    item.note += " Requires Engineering "+skill+(level===null?"; earliest training bracket around character level "+item.showFromLevel+" (not an item-level requirement).":".");
  }
  if(target)Object.assign(target,item);
  else { WARRIOR_ITEMS.push(item);existing.set(name,item); }
}
// Existing engineering entries had no skill metadata, and were displayed even
// at level 1. Clarify profession-gated progress without inventing item levels.
const knownSkills={"Rough Dynamite":1,"Coarse Dynamite":50,"Heavy Dynamite":125,"Iron Grenade":175};
for(const [name,skill] of Object.entries(knownSkills)){
  const entry=existing.get(name);
  if(!entry)continue;
  entry.level=null;
  entry.profession="Engineering";
  entry.professionSkill=skill;
  entry.showFromLevel=minTrainingLevel(skill);
  entry.gated=true;
  entry.note=(entry.note?entry.note+" ":"")+"Requires Engineering "+skill+
    "; earliest training bracket around character level "+entry.showFromLevel+" (not an item-level requirement).";
}

/* Two current armor-kit choices: a survivability line (+Stamina)
 * and a damage line (+Attack Power). Effects are from Forever item tooltips.
 * Exactly one shield spike is offered in this guide: Mithril Shield Spike. */
const obsoleteArmor=new Set(["Iron Shield Spike","Thorium Shield Spike"]);
for(let i=WARRIOR_ITEMS.length-1;i>=0;i--){
  if(obsoleteArmor.has(WARRIOR_ITEMS[i].name))WARRIOR_ITEMS.splice(i,1);
}
const armorUpgrades=[
  {
    "name": "Light Armor Kit",
    "level": 1,
    "id": 2304,
    "effect": "+1 Stamina and +8 Armor",
    "note": "Stamina/Armor kit for chest, legs, hands or feet."
  },
  {
    "name": "Medium Armor Kit",
    "level": 5,
    "id": 2313,
    "effect": "+2 Stamina and +16 Armor",
    "note": "Stamina/Armor kit; replaces Light Armor Kit."
  },
  {
    "name": "Heavy Armor Kit",
    "level": 20,
    "id": 4265,
    "effect": "+3 Stamina and +24 Armor",
    "note": "Stamina/Armor kit; replaces Medium Armor Kit."
  },
  {
    "name": "Thick Armor Kit",
    "level": 30,
    "id": 8173,
    "effect": "+4 Stamina and +32 Armor",
    "note": "Stamina/Armor kit; replaces Heavy Armor Kit."
  },
  {
    "name": "Rugged Armor Kit",
    "level": 40,
    "id": 15564,
    "effect": "+5 Stamina and +40 Armor",
    "note": "Stamina/Armor kit; requires suitably leveled armor."
  },
  {
    "name": "Forceful Medium Armor Kit",
    "level": 15,
    "id": 252437,
    "effect": "+4 Attack Power and +16 Armor",
    "note": "Forever Attack Power kit for chest, legs, hands or feet."
  },
  {
    "name": "Forceful Heavy Armor Kit",
    "level": 30,
    "id": 252453,
    "effect": "+6 Attack Power and +24 Armor",
    "note": "Forever Attack Power kit; replaces Forceful Medium."
  },
  {
    "name": "Forceful Thick Armor Kit",
    "level": 40,
    "id": 252463,
    "effect": "+8 Attack Power and +32 Armor",
    "note": "Forever Attack Power kit; replaces Forceful Heavy."
  },
  {
    "name": "Forceful Rugged Armor Kit",
    "level": 50,
    "id": 252488,
    "effect": "+10 Attack Power and +40 Armor",
    "note": "Forever Attack Power kit; requires level 50 and suitably leveled armor."
  }
];
for(const kit of armorUpgrades){
  const existingKit=WARRIOR_ITEMS.find(item=>item.name===kit.name);
  if(existingKit)Object.assign(existingKit,kit);
  else WARRIOR_ITEMS.push({category:"Armor / Shield",gated:false,tooltipType:"item",purchasable:true,flag:"",...kit});
}
const fixedItemIds={"Elixir of Defense":8951,"Major Frenzy Potion":250943};
for(const item of WARRIOR_ITEMS)if(fixedItemIds[item.name])item.id=fixedItemIds[item.name];
const spike=WARRIOR_ITEMS.find(item=>item.name==="Mithril Shield Spike");
if(spike)spike.note="Blacksmithing-made shield spike. Application may require Blacksmithing; check in-game requirements.";

WARRIOR_ITEMS.sort((a,b)=>(a.level??a.showFromLevel??0)-(b.level??b.showFromLevel??0)||a.name.localeCompare(b.name));
window.WARRIOR_ITEMS=WARRIOR_ITEMS;
// Explicit upgrade families: only interchangeable higher ranks share a family.
// Distinct effects (e.g., Mongoose vs Agility; Elemental vs Dense Stone)
// intentionally remain separate. Ranks are based on required character level,
// not alphabetic naming, so only one available tier is rendered at a time.
const UPGRADE_FAMILIES={
  "elixir-agility": [
    "Elixir of Minor Agility",
    "Elixir of Lesser Agility",
    "Elixir of Agility",
    "Elixir of Greater Agility"
  ],
  "elixir-strength": [
    "Elixir of Minor Strength",
    "Elixir of Giant Growth",
    "Elixir of Ogre Strength",
    "Elixir of Strength",
    "Elixir of Greater Strength"
  ],
  "elixir-defense": [
    "Elixir of Minor Defense",
    "Elixir of Lesser Defense",
    "Elixir of Defense",
    "Elixir of Greater Defense"
  ],
  "elixir-fortitude": [
    "Elixir of Minor Fortitude",
    "Elixir of Lesser Fortitude",
    "Elixir of Fortitude",
    "Elixir of Greater Fortitude"
  ],
  "elixir-troll-blood": [
    "Lesser Troll's Blood Elixir",
    "Troll's Blood Elixir",
    "Major Troll's Blood Elixir"
  ],
  "potion-healing": [
    "Minor Healing Potion",
    "Lesser Healing Potion",
    "Healing Potion",
    "Greater Healing Potion",
    "Superior Healing Potion",
    "Major Healing Potion"
  ],
  "potion-rage": [
    "Rage Potion",
    "Great Rage Potion",
    "Mighty Rage Potion"
  ],
  "potion-frenzy": [
    "Minor Frenzy Potion",
    "Lesser Frenzy Potion",
    "Frenzy Potion",
    "Greater Frenzy Potion",
    "Superior Frenzy Potion",
    "Major Frenzy Potion"
  ],
  "potion-stoneshield": [
    "Lesser Stoneshield Potion",
    "Greater Stoneshield Potion"
  ],
  "potion-invisibility": [
    "Lesser Invisibility Potion",
    "Invisibility Potion"
  ],
  "potion-dreamless": [
    "Dreamless Sleep Potion",
    "Greater Dreamless Sleep Potion"
  ],
  "potion-mender": [
    "Greater Mender's Potion",
    "Superior Mender's Potion",
    "Major Mender's Potion"
  ],
  "potion-spellblasting": [
    "Greater Spellblasting Potion",
    "Superior Spellblasting Potion",
    "Major Spellblasting Potion"
  ],
  "potion-healing-draught": [
    "Superior Healing Draught",
    "Major Healing Draught"
  ],
  "stone-sharpening": [
    "Rough Sharpening Stone",
    "Coarse Sharpening Stone",
    "Heavy Sharpening Stone",
    "Solid Sharpening Stone",
    "Dense Sharpening Stone"
  ],
  "stone-weight": [
    "Rough Weightstone",
    "Coarse Weightstone",
    "Heavy Weightstone",
    "Solid Weightstone",
    "Dense Weightstone"
  ],
  "scroll-stamina": [
    "Scroll of Stamina",
    "Scroll of Stamina II",
    "Scroll of Stamina III",
    "Scroll of Stamina IV"
  ],
  "scroll-strength": [
    "Scroll of Strength",
    "Scroll of Strength II",
    "Scroll of Strength III",
    "Scroll of Strength IV"
  ],
  "scroll-agility": [
    "Scroll of Agility",
    "Scroll of Agility II",
    "Scroll of Agility III",
    "Scroll of Agility IV"
  ],
  "armor-stamina": ["Light Armor Kit","Medium Armor Kit","Heavy Armor Kit","Thick Armor Kit","Rugged Armor Kit"],
  "armor-attack": ["Forceful Medium Armor Kit","Forceful Heavy Armor Kit","Forceful Thick Armor Kit","Forceful Rugged Armor Kit"],
  "scroll-protection": [
    "Scroll of Protection",
    "Scroll of Protection II",
    "Scroll of Protection III",
    "Scroll of Protection IV"
  ]
};
const byName=new Map(WARRIOR_ITEMS.map(item=>[item.name,item]));
for(const [family,names] of Object.entries(UPGRADE_FAMILIES)){
  names.forEach((name,index)=>{
    const item=byName.get(name);
    if(!item)throw Error("Missing upgrade family item: "+name);
    item.upgradeGroup=family;
    item.upgradeRank=index;
  });
}
})();