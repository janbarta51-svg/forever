// Food items verified from Wowhead Forever 2026-09-26 food XP overview and Icy Veins Cooking.
// lvl=null means the exact character-use level was NOT established from a Forever item tooltip.
// Cooking skill and character level are deliberately distinct.
window.FOOD_SOURCES=[
  "https://www.wowhead.com/forever/news/all-cooking-food-that-currently-gives-xp-buffs-in-wow-forever-382928",
  "https://www.icy-veins.com/wow-forever/cooking",
  "https://mobalytics.gg/wow-forever/classes/protection-warrior-guide-kalltorak"
];
window.FOODS=`Brilliant Smallfish|AP|+2 AP|1|||
Slitherskin Mackerel|AP|+6 AP|50|||
Longjaw Mud Snapper|AP|+10 AP|50|||
Mithril Head Trout|AP|+20 AP|175|||
Rainbow Fin Albacore|SPELL|+1 spell damage|50|||
Smoked Sagefish|SPELL|+4 spell damage|80|||
Sagefish Delight|SPELL|+7 spell damage|175|||
Briny Seafood Stew|SPELL|+14 spell damage|200|||
Peace Tea|SPELL|+2 healing power|25|||
Royal Tea|SPELL|+7 healing power|100|||
Root Tea|SPELL|+11 healing power|125|||
Triage Tea|SPELL|+22 healing power|180|||
Herb Baked Egg|STA|+1 Stamina|1|1|6888|
Kaldorei Spider Kabob|STA|+1 Stamina|10|||
Skywall Souffle|STA|+1 Stamina|25|||
Murloc Fin Soup|STA|+1 Stamina|90|||
Breakfast Omelette|STA|+3 Stamina|75|||
Crispy Lizard Tail|STA|+3 Stamina|100|||
Carrion Surprise|STA|+3 Stamina|175|5||
Curiously Tasty Omelet|STA|+5 Stamina|130|||
Gooey Spider Cake|STA|+5 Stamina|110|15||
Soothing Turtle Bisque|STA|+5 Stamina|175|15||
Mystery Stew|STA|+5 Stamina|175|||
Giant Scrambled Eggs|STA|+10 Stamina|175|||
Giant Clam Scorcho|STA|+10 Stamina|175|25||
Heavy Kodo Stew|STA|+10 Stamina|200|25||
Beer Basted Boar Ribs|STR|+1 Strength|25|1||
Smoked Bear Meat|STR|+1 Strength|40|||
Roasted Boar Meat|STR|+1 Strength|50|||
Goretusk Liver Pie|STR|+3 Strength|50|5|724|
Blood Sausage|STR|+3 Strength|60|||
Big Bear Steak|STR|+3 Strength|110|5||
Dry Pork Ribs|STR|+3 Strength|110|||
Succulent Pork Ribs|STR|+5 Strength|110|15||
Lean Venison|STR|+5 Strength|110|15||
Bear Brisket|STR|+10 Strength|175|25|250074|
Plain Ol' Paletusk|STR|+10 Strength|185|25||
Spiced Wolf Meat|AGI|+1 Agility|25|||
Coyote Steak|AGI|+3 Agility|50|||
Crocolisk Steak|AGI|+3 Agility|80|||
Seasoned Wolf Kabob|AGI|+5 Agility|100|||
Hot Lion Chops|AGI|+5 Agility|100|||
Crocolisk Gumbo|AGI|+5 Agility|125|||
Lean Wolf Steak|AGI|+5 Agility|125|||
Hot Wolf Ribs|AGI|+10 Agility|175|||
Heavy Crocolisk Stew|AGI|+10 Agility|150|||
Jungle Stew|AGI|+15 Agility|125|||
Crispy Bat Wing|INT|+1 Intellect|1|||
Tasty Raptor Bites|INT|+1 Intellect|25|||
Pincer Bites|INT|+1 Intellect|35|||
Strider Stew|INT|+1 Intellect|50|||
Cooked Crab Claw|INT|+1 Intellect|85|||
Crab Cake|INT|+3 Intellect|75|||
Redridge Goulash|INT|+3 Intellect|100|||
Twice-Spiced Raptor Slice|INT|+3 Intellect|75|||
Roast Raptor|INT|+5 Intellect|175|||
Barbecued Buzzard Wing|INT|+10 Intellect|175|||
Bat Hachee|INT|+20 Intellect|175|||
Venomous Smoothie|SPR|+1 Spirit|25|||
Slimy Smoothie|SPR|+3 Spirit|100|||
Mrrggl Smrrthle|SPR|+5 Spirit|125|||
Calcified Smoothie|SPR|+10 Spirit|125|||
Spicy Smoothie|SPR|+15 Spirit|200|||
Westfall Stew|SPECIAL|+15% movement speed while in Westfall|75|5||
Loch Frenzy Delight|SPECIAL|+3 Fishing skill|100|||
Fillet of Frenzy|SPECIAL|+5 Fishing skill|50|||
Bristle Whisker Catfish|SPECIAL|+8 Fishing skill|100|||
Rockscale Cod|SPECIAL|+12 Fishing skill|100|||
Spinefin Halibut|SPECIAL|+18 Fishing skill|100|||
Goldthorn Tea|SPECIAL|+15 Herbalism|100|||
Dragonbreath Chili|SPECIAL|Chance to breathe fire on melee hits|200|25||Unique combat proc; may not share the Well Fed food category`.split("\n").filter(Boolean).map(line=>{
  const [name,category,effect,skill,lvl,id,note]=line.split("|");
  return {name,category,effect,skill:Number(skill),level:lvl?Number(lvl):null,id:id?Number(id):null,note:note||"",
  purchasable:true,verified:!!lvl,source:"Wowhead Forever food overview; lvl: Mobalytics Protection Warrior (where available)"};
});

// Direct Forever item IDs confirmed by item database; other foods retain
// honest Wowhead searches rather than guessed item links / fake icons.
const VERIFIED_FOOD_ITEM_IDS={
  "Brilliant Smallfish": 6290,
  "Hot Wolf Ribs": 13851,
  "Sagefish Delight": 21217,
  "Dragonbreath Chili": 12217,
  "Heavy Kodo Stew": 12215
};
window.FOODS.forEach(item=>{
  if(VERIFIED_FOOD_ITEM_IDS[item.name])item.id=VERIFIED_FOOD_ITEM_IDS[item.name];
});

// 2026-11-16 verified WoW Forever cooking catalogue.
// Every entry below links to the exact FOOD ITEM, not its recipe scroll.
// Based on live Wowhead Forever item pages and the Icy Veins Cooking guide.
// Cook skill is not a character-level requirement; only measured item
// requirements are recorded, and other level cells stay unverified ("?").
// The original rows are updated in place; additional foods are appended.
const FOOD_CATALOG=[
  {
    "name": "Brilliant Smallfish",
    "category": "AP",
    "effect": "+2 AP",
    "skill": 1,
    "id": 6290,
    "level": null
  },
  {
    "name": "Slitherskin Mackerel",
    "category": "AP",
    "effect": "+6 AP",
    "skill": 50,
    "id": 787,
    "level": null
  },
  {
    "name": "Longjaw Mud Snapper",
    "category": "AP",
    "effect": "+10 AP",
    "skill": 50,
    "id": 4592,
    "level": null
  },
  {
    "name": "Mithril Head Trout",
    "category": "AP",
    "effect": "+20 AP",
    "skill": 175,
    "id": 8364,
    "level": null
  },
  {
    "name": "Cooked Glossy Mightfish",
    "category": "AP",
    "effect": "+30 AP",
    "skill": 225,
    "id": 13927,
    "level": 35
  },
  {
    "name": "Poached Sunscale Salmon",
    "category": "AP",
    "effect": "+40 AP",
    "skill": 250,
    "id": 13932,
    "level": 35
  },
  {
    "name": "Mightfish Steak",
    "category": "AP",
    "effect": "+40 AP",
    "skill": 275,
    "id": 13934,
    "level": 45
  },
  {
    "name": "Rainbow Fin Albacore",
    "category": "SPELL",
    "effect": "+1 spell damage",
    "skill": 50,
    "id": 5095,
    "level": null
  },
  {
    "name": "Smoked Sagefish",
    "category": "SPELL",
    "effect": "+4 spell damage",
    "skill": 80,
    "id": 21072,
    "level": null
  },
  {
    "name": "Sagefish Delight",
    "category": "SPELL",
    "effect": "+7 spell damage",
    "skill": 175,
    "id": 21217,
    "level": null
  },
  {
    "name": "Briny Seafood Stew",
    "category": "SPELL",
    "effect": "+14 spell damage",
    "skill": 200,
    "id": 274971,
    "level": 25
  },
  {
    "name": "Nightfin Soup",
    "category": "SPELL",
    "effect": "+22 spell damage",
    "skill": 250,
    "id": 13931,
    "level": null
  },
  {
    "name": "Baked Salmon",
    "category": "SPELL",
    "effect": "+28 spell damage",
    "skill": 275,
    "id": 13935,
    "level": 45
  },
  {
    "name": "Lobster Stew",
    "category": "SPELL",
    "effect": "+28 spell damage",
    "skill": 275,
    "id": 13933,
    "level": 45
  },
  {
    "name": "Peace Tea",
    "category": "HEAL",
    "effect": "+2 healing power",
    "skill": 25,
    "id": 249865,
    "level": null
  },
  {
    "name": "Royal Tea",
    "category": "HEAL",
    "effect": "+7 healing power",
    "skill": 100,
    "id": 249866,
    "level": null
  },
  {
    "name": "Root Tea",
    "category": "HEAL",
    "effect": "+11 healing power",
    "skill": 125,
    "id": 249867,
    "level": null
  },
  {
    "name": "Triage Tea",
    "category": "HEAL",
    "effect": "+22 healing power",
    "skill": 180,
    "id": 249868,
    "level": null
  },
  {
    "name": "Sunny Tea",
    "category": "HEAL",
    "effect": "+33 healing power",
    "skill": 200,
    "id": 249869,
    "level": 35
  },
  {
    "name": "Sage's Tea",
    "category": "HEAL",
    "effect": "+44 healing power",
    "skill": 250,
    "id": 249870,
    "level": null
  },
  {
    "name": "Herb Baked Egg",
    "category": "STA",
    "effect": "+1 Stamina",
    "skill": 1,
    "id": 6888,
    "level": 1
  },
  {
    "name": "Kaldorei Spider Kabob",
    "category": "STA",
    "effect": "+1 Stamina",
    "skill": 10,
    "id": 5472,
    "level": null
  },
  {
    "name": "Skywall Souffle",
    "category": "STA",
    "effect": "+1 Stamina",
    "skill": 25,
    "id": 263509,
    "level": null
  },
  {
    "name": "Murloc Fin Soup",
    "category": "STA",
    "effect": "+1 Stamina",
    "skill": 90,
    "id": 3663,
    "level": null
  },
  {
    "name": "Breakfast Omelette",
    "category": "STA",
    "effect": "+3 Stamina",
    "skill": 75,
    "id": 250080,
    "level": null
  },
  {
    "name": "Crispy Lizard Tail",
    "category": "STA",
    "effect": "+3 Stamina",
    "skill": 100,
    "id": 5479,
    "level": null
  },
  {
    "name": "Carrion Surprise",
    "category": "STA",
    "effect": "+3 Stamina",
    "skill": 175,
    "id": 12213,
    "level": 5
  },
  {
    "name": "Curiously Tasty Omelet",
    "category": "STA",
    "effect": "+5 Stamina",
    "skill": 130,
    "id": 3665,
    "level": null
  },
  {
    "name": "Gooey Spider Cake",
    "category": "STA",
    "effect": "+5 Stamina",
    "skill": 110,
    "id": 3666,
    "level": 15
  },
  {
    "name": "Soothing Turtle Bisque",
    "category": "STA",
    "effect": "+5 Stamina",
    "skill": 175,
    "id": 3729,
    "level": 15
  },
  {
    "name": "Mystery Stew",
    "category": "STA",
    "effect": "+5 Stamina",
    "skill": 175,
    "id": 12214,
    "level": null
  },
  {
    "name": "Giant Scrambled Eggs",
    "category": "STA",
    "effect": "+10 Stamina",
    "skill": 175,
    "id": 250078,
    "level": null
  },
  {
    "name": "Giant Clam Scorcho",
    "category": "STA",
    "effect": "+10 Stamina",
    "skill": 175,
    "id": 6038,
    "level": 25
  },
  {
    "name": "Heavy Kodo Stew",
    "category": "STA",
    "effect": "+10 Stamina",
    "skill": 200,
    "id": 12215,
    "level": 25
  },
  {
    "name": "Monster Omelet",
    "category": "STA",
    "effect": "+15 Stamina",
    "skill": 225,
    "id": 12218,
    "level": null
  },
  {
    "name": "Spider Sausage",
    "category": "STA",
    "effect": "+15 Stamina",
    "skill": 200,
    "id": 17222,
    "level": null
  },
  {
    "name": "Savory Turtle Stew",
    "category": "STA",
    "effect": "+20 Stamina",
    "skill": 275,
    "id": 250068,
    "level": 45
  },
  {
    "name": "Dirge's Kickin' Chimaerok Chops",
    "category": "STA",
    "effect": "+25 Stamina",
    "skill": 300,
    "id": 21023,
    "level": 45
  },
  {
    "name": "Beer Basted Boar Ribs",
    "category": "STR",
    "effect": "+1 Strength",
    "skill": 25,
    "id": 2888,
    "level": 1
  },
  {
    "name": "Smoked Bear Meat",
    "category": "STR",
    "effect": "+1 Strength",
    "skill": 40,
    "id": 6890,
    "level": null
  },
  {
    "name": "Roasted Boar Meat",
    "category": "STR",
    "effect": "+1 Strength",
    "skill": 50,
    "id": 2681,
    "level": null
  },
  {
    "name": "Goretusk Liver Pie",
    "category": "STR",
    "effect": "+3 Strength",
    "skill": 50,
    "id": 724,
    "level": 5
  },
  {
    "name": "Blood Sausage",
    "category": "STR",
    "effect": "+3 Strength",
    "skill": 60,
    "id": 3220,
    "level": null
  },
  {
    "name": "Big Bear Steak",
    "category": "STR",
    "effect": "+3 Strength",
    "skill": 110,
    "id": 3726,
    "level": 5
  },
  {
    "name": "Dry Pork Ribs",
    "category": "STR",
    "effect": "+3 Strength",
    "skill": 110,
    "id": 2687,
    "level": null
  },
  {
    "name": "Succulent Pork Ribs",
    "category": "STR",
    "effect": "+5 Strength",
    "skill": 110,
    "id": 2685,
    "level": 15
  },
  {
    "name": "Lean Venison",
    "category": "STR",
    "effect": "+5 Strength",
    "skill": 110,
    "id": 5480,
    "level": 15
  },
  {
    "name": "Bear Brisket",
    "category": "STR",
    "effect": "+10 Strength",
    "skill": 175,
    "id": 250074,
    "level": 25
  },
  {
    "name": "Plain Ol' Paletusk",
    "category": "STR",
    "effect": "+10 Strength",
    "skill": 185,
    "id": 274976,
    "level": 25
  },
  {
    "name": "Savory Stag Sliders",
    "category": "STR",
    "effect": "+15 Strength",
    "skill": 225,
    "id": 250065,
    "level": 35
  },
  {
    "name": "Bear Bruscitti",
    "category": "STR",
    "effect": "+20 Strength",
    "skill": 275,
    "id": 250070,
    "level": null
  },
  {
    "name": "Steaming Stag Steak",
    "category": "STR",
    "effect": "+20 Strength",
    "skill": 275,
    "id": 250071,
    "level": null
  },
  {
    "name": "Smoked Desert Dumplings",
    "category": "STR",
    "effect": "+20 Strength",
    "skill": 285,
    "id": 20452,
    "level": null
  },
  {
    "name": "Spiced Wolf Meat",
    "category": "AGI",
    "effect": "+1 Agility",
    "skill": 25,
    "id": 2680,
    "level": null
  },
  {
    "name": "Coyote Steak",
    "category": "AGI",
    "effect": "+3 Agility",
    "skill": 50,
    "id": 2684,
    "level": null
  },
  {
    "name": "Crocolisk Steak",
    "category": "AGI",
    "effect": "+3 Agility",
    "skill": 80,
    "id": 3662,
    "level": null
  },
  {
    "name": "Seasoned Wolf Kabob",
    "category": "AGI",
    "effect": "+5 Agility",
    "skill": 100,
    "id": 1017,
    "level": null
  },
  {
    "name": "Hot Lion Chops",
    "category": "AGI",
    "effect": "+5 Agility",
    "skill": 100,
    "id": 3727,
    "level": null
  },
  {
    "name": "Crocolisk Gumbo",
    "category": "AGI",
    "effect": "+5 Agility",
    "skill": 125,
    "id": 3664,
    "level": null
  },
  {
    "name": "Lean Wolf Steak",
    "category": "AGI",
    "effect": "+5 Agility",
    "skill": 125,
    "id": 12209,
    "level": null
  },
  {
    "name": "Hot Wolf Ribs",
    "category": "AGI",
    "effect": "+10 Agility",
    "skill": 175,
    "id": 13851,
    "level": null
  },
  {
    "name": "Heavy Crocolisk Stew",
    "category": "AGI",
    "effect": "+10 Agility",
    "skill": 150,
    "id": 20074,
    "level": null
  },
  {
    "name": "Jungle Stew",
    "category": "AGI",
    "effect": "+15 Agility",
    "skill": 125,
    "id": 12212,
    "level": null
  },
  {
    "name": "Tender Wolf Steak",
    "category": "AGI",
    "effect": "+15 Agility",
    "skill": 225,
    "id": 18045,
    "level": null
  },
  {
    "name": "Swiftstrike Steak",
    "category": "AGI",
    "effect": "+20 Agility",
    "skill": 275,
    "id": 250072,
    "level": 45
  },
  {
    "name": "Flank au Poivre",
    "category": "AGI",
    "effect": "+20 Agility",
    "skill": 275,
    "id": 250069,
    "level": null
  },
  {
    "name": "Crispy Bat Wing",
    "category": "INT",
    "effect": "+1 Intellect",
    "skill": 1,
    "id": 12224,
    "level": null
  },
  {
    "name": "Tasty Raptor Bites",
    "category": "INT",
    "effect": "+1 Intellect",
    "skill": 25,
    "id": 250079,
    "level": null
  },
  {
    "name": "Pincer Bites",
    "category": "INT",
    "effect": "+1 Intellect",
    "skill": 35,
    "id": 263512,
    "level": null
  },
  {
    "name": "Strider Stew",
    "category": "INT",
    "effect": "+1 Intellect",
    "skill": 50,
    "id": 5477,
    "level": null
  },
  {
    "name": "Cooked Crab Claw",
    "category": "INT",
    "effect": "+1 Intellect",
    "skill": 85,
    "id": 2682,
    "level": null
  },
  {
    "name": "Crab Cake",
    "category": "INT",
    "effect": "+3 Intellect",
    "skill": 75,
    "id": 2683,
    "level": null
  },
  {
    "name": "Redridge Goulash",
    "category": "INT",
    "effect": "+3 Intellect",
    "skill": 100,
    "id": 1082,
    "level": null
  },
  {
    "name": "Twice-Spiced Raptor Slice",
    "category": "INT",
    "effect": "+3 Intellect",
    "skill": 75,
    "id": 250077,
    "level": null
  },
  {
    "name": "Roast Raptor",
    "category": "INT",
    "effect": "+5 Intellect",
    "skill": 175,
    "id": 12210,
    "level": null
  },
  {
    "name": "Barbecued Buzzard Wing",
    "category": "INT",
    "effect": "+10 Intellect",
    "skill": 175,
    "id": 4457,
    "level": null
  },
  {
    "name": "Spiced Chili Crab",
    "category": "INT",
    "effect": "+10 Intellect",
    "skill": 225,
    "id": 12216,
    "level": null
  },
  {
    "name": "Raging Raptor Ribs",
    "category": "INT",
    "effect": "+10 Intellect",
    "skill": 275,
    "id": 250073,
    "level": null
  },
  {
    "name": "Raptor Rouladen",
    "category": "INT",
    "effect": "+15 Intellect",
    "skill": 225,
    "id": 250076,
    "level": null
  },
  {
    "name": "Runn Tum Tuber Surprise",
    "category": "INT",
    "effect": "+15 Intellect",
    "skill": 275,
    "id": 18254,
    "level": null
  },
  {
    "name": "Soaring Pamplona",
    "category": "INT",
    "effect": "+20 Intellect",
    "skill": 275,
    "id": 250066,
    "level": null
  },
  {
    "name": "Bat Hachee",
    "category": "INT",
    "effect": "+20 Intellect",
    "skill": 175,
    "id": 250067,
    "level": null
  },
  {
    "name": "Prehistoric Pulled Raptor",
    "category": "INT",
    "effect": "+20 Intellect",
    "skill": 275,
    "id": 250075,
    "level": null
  },
  {
    "name": "Venomous Smoothie",
    "category": "SPR",
    "effect": "+1 Spirit",
    "skill": 25,
    "id": 249871,
    "level": null
  },
  {
    "name": "Slimy Smoothie",
    "category": "SPR",
    "effect": "+3 Spirit",
    "skill": 100,
    "id": 249872,
    "level": null
  },
  {
    "name": "Mrrggl Smrrthle",
    "category": "SPR",
    "effect": "+5 Spirit",
    "skill": 125,
    "id": 249873,
    "level": 15
  },
  {
    "name": "Calcified Smoothie",
    "category": "SPR",
    "effect": "+10 Spirit",
    "skill": 125,
    "id": 249874,
    "level": 25
  },
  {
    "name": "Spicy Smoothie",
    "category": "SPR",
    "effect": "+15 Spirit",
    "skill": 200,
    "id": 249875,
    "level": 35
  },
  {
    "name": "Wicked Smoothie",
    "category": "SPR",
    "effect": "+20 Spirit",
    "skill": 250,
    "id": 249876,
    "level": null
  },
  {
    "name": "Westfall Stew",
    "category": "SPECIAL",
    "effect": "+15% movement speed in Westfall",
    "skill": 75,
    "id": 733,
    "level": 5
  },
  {
    "name": "Sweetpaw Jam",
    "category": "SPECIAL",
    "effect": "+15% movement speed",
    "skill": 275,
    "id": 267341,
    "level": null
  },
  {
    "name": "Grilled Squid",
    "category": "SPECIAL",
    "effect": "+1% critical strike chance",
    "skill": 240,
    "id": 13928,
    "level": null
  },
  {
    "name": "Hot Smoked Bass",
    "category": "SPECIAL",
    "effect": "+1% critical strike chance",
    "skill": 240,
    "id": 13929,
    "level": null
  },
  {
    "name": "Plated Armorfish",
    "category": "SPECIAL",
    "effect": "+150 Armor",
    "skill": 225,
    "id": 286152,
    "level": null
  },
  {
    "name": "Loch Frenzy Delight",
    "category": "SPECIAL",
    "effect": "+3 Fishing skill",
    "skill": 100,
    "id": 6316,
    "level": null
  },
  {
    "name": "Fillet of Frenzy",
    "category": "SPECIAL",
    "effect": "+5 Fishing skill",
    "skill": 50,
    "id": 5476,
    "level": null
  },
  {
    "name": "Bristle Whisker Catfish",
    "category": "SPECIAL",
    "effect": "+8 Fishing skill",
    "skill": 100,
    "id": 4593,
    "level": null
  },
  {
    "name": "Rockscale Cod",
    "category": "SPECIAL",
    "effect": "+12 Fishing skill",
    "skill": 100,
    "id": 4594,
    "level": null
  },
  {
    "name": "Spinefin Halibut",
    "category": "SPECIAL",
    "effect": "+18 Fishing skill",
    "skill": 100,
    "id": 8957,
    "level": null
  },
  {
    "name": "Filet of Redgill",
    "category": "SPECIAL",
    "effect": "+18 Fishing skill",
    "skill": 225,
    "id": 13930,
    "level": null
  },
  {
    "name": "Goldthorn Tea",
    "category": "SPECIAL",
    "effect": "+15 Herbalism",
    "skill": 175,
    "id": 10841,
    "level": null
  },
  {
    "name": "Dragonbreath Chili",
    "category": "SPECIAL",
    "effect": "Chance to breathe fire on melee hits",
    "skill": 200,
    "id": 12217,
    "level": 25
  }
];
const originalFoods=new Map(window.FOODS.map(food=>[food.name,food]));
for(const item of FOOD_CATALOG){
  const previous=originalFoods.get(item.name);
  if(previous){
    Object.assign(previous,{category:item.category,effect:item.effect,skill:item.skill,id:item.id,
      level:item.level??previous.level,verified:item.level!==null||previous.verified,
      purchasable:true,food:true,idVerified:true});
  }else{
    const entry={...item,note:"",purchasable:true,verified:item.level!==null,
      food:true,idVerified:true,source:"WoW Forever item database and Cooking overview"};
    window.FOODS.push(entry);
  }
}
window.FOOD_SOURCES=[
 "https://www.wowhead.com/forever/news/all-cooking-food-that-currently-gives-xp-buffs-in-wow-forever-382928",
 "https://www.icy-veins.com/wow-forever/cooking",
 "https://www.wowhead.com/forever/item=250068"
];

// November high-level additions verified against Forever item IDs.
// Recipe acquisition of the three Holy Salts dishes is not established.
const NOVEMBER_FOOD_ADDITIONS=[
  {
    "name": "Prowler Steak",
    "category": "STR",
    "effect": "+25 Strength, +10 Stamina",
    "skill": 250,
    "level": 55,
    "id": 238637,
    "categories": [
      "STR",
      "STA"
    ],
    "statBonuses": {
      "STR": 25,
      "STA": 10
    },
    "note": "Recipe source not confirmed; check live availability."
  },
  {
    "name": "Filet o' Flank",
    "category": "AGI",
    "effect": "+25 Agility, +10 Stamina",
    "skill": 250,
    "level": 55,
    "id": 238638,
    "categories": [
      "AGI",
      "STA"
    ],
    "statBonuses": {
      "AGI": 25,
      "STA": 10
    },
    "note": "Recipe source not confirmed; check live availability."
  },
  {
    "name": "Sunrise Omelette",
    "category": "HEAL",
    "effect": "+25 spell damage, +55 healing power, +10 Stamina",
    "skill": 250,
    "level": 55,
    "id": 238639,
    "categories": [
      "SPELL",
      "HEAL",
      "STA"
    ],
    "statBonuses": {
      "SPELL": 25,
      "HEAL": 55,
      "STA": 10
    },
    "note": "Recipe source not confirmed; check live availability."
  },
  {
    "name": "Grand Lobster Banquet",
    "category": "SPECIAL",
    "effect": "+20 AP, +23 spell damage, +44 healing power, +10 Stamina (40-player feast)",
    "skill": 280,
    "level": 55,
    "id": 238642,
    "categories": [
      "SPECIAL",
      "AP",
      "SPELL",
      "HEAL",
      "STA"
    ],
    "statBonuses": {
      "AP": 20,
      "SPELL": 23,
      "HEAL": 44,
      "STA": 10
    },
    "note": "40-player feast, 45-minute buff."
  },
  {
    "name": "Specklefin Feast",
    "category": "SPECIAL",
    "effect": "+20 AP, +23 spell damage, +44 healing power, +10 Stamina (40-player feast)",
    "skill": 280,
    "level": 55,
    "id": 238641,
    "categories": [
      "SPECIAL",
      "AP",
      "SPELL",
      "HEAL",
      "STA"
    ],
    "statBonuses": {
      "AP": 20,
      "SPELL": 23,
      "HEAL": 44,
      "STA": 10
    },
    "note": "40-player feast, 45-minute buff."
  },
  {
    "name": "Spotted Yellowtail",
    "category": "SPELL",
    "effect": "+22 spell damage",
    "skill": 225,
    "level": 35,
    "id": 6887,
    "categories": [
      "SPELL"
    ],
    "statBonuses": {
      "SPELL": 22
    },
    "note": "Provides the Forever kill XP bonus."
  },
  {
    "name": "Roasted Kodo Meat",
    "category": "STA",
    "effect": "+1 Stamina",
    "skill": 35,
    "level": 1,
    "id": 5474,
    "categories": [
      "STA"
    ],
    "statBonuses": {
      "STA": 1
    },
    "note": "Horde/Mulgore recipe."
  },
  {
    "name": "Goblin Deviled Clams",
    "category": "STA",
    "effect": "+6 Stamina and +6 Spirit",
    "skill": 125,
    "level": 15,
    "id": 5527,
    "categories": [
      "STA",
      "SPR"
    ],
    "statBonuses": {
      "STA": 6,
      "SPR": 6
    },
    "note": "Does not provide the usual Forever kill XP food bonus."
  },
  {
    "name": "Egg Nog",
    "category": "STA",
    "effect": "+2 Stamina and +2 Spirit",
    "skill": 35,
    "level": 1,
    "id": 17198,
    "categories": [
      "STA",
      "SPR"
    ],
    "statBonuses": {
      "STA": 2,
      "SPR": 2
    },
    "note": "Seasonal Winter Veil recipe."
  },
  {
    "name": "Gingerbread Cookie",
    "category": "STA",
    "effect": "+2 Stamina and +2 Spirit",
    "skill": 1,
    "level": 1,
    "id": 17197,
    "categories": [
      "STA",
      "SPR"
    ],
    "statBonuses": {
      "STA": 2,
      "SPR": 2
    },
    "note": "Seasonal Winter Veil recipe."
  }
];
for(const item of NOVEMBER_FOOD_ADDITIONS){
 if(window.FOODS.some(existing=>existing.name===item.name))throw Error("Duplicate food "+item.name);
 window.FOODS.push({...item,verified:true,idVerified:true,purchasable:true,food:true,source:"Wowhead Forever item page / Cooking database"});
}
