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