// WoW Forever: group buffs and crowd control, levels 1–30.
// [spellName, category, unlockLevels, rankDescriptions, baseSpellId, notes, requirement].
// baseSpellId identifies a spell family; it may not be the current-rank ID.
// English-only content. Source: Icy Veins and Warcraft Wiki, with Forever caveats.
window.GROUP_ABILITY_DATA={
  "Warrior": [
    [
      "Battle Shout",
      "buff",
      [
        1,
        12,
        22
      ],
      [
        "12 melee attack power",
        "23 melee attack power",
        "35 melee attack power"
      ],
      6673,
      "Group melee attack power buff.",
      null
    ],
    [
      "Intimidating Shout",
      "cc",
      [
        22
      ],
      [
        "Area fear"
      ],
      5246,
      "Emergency crowd control; fleeing enemies can pull more packs.",
      null
    ],
    [
      "Hamstring",
      "cc",
      [
        8
      ],
      [
        "Movement speed reduction"
      ],
      1715,
      "Single-target slow.",
      null
    ],
    [
      "Disarm",
      "cc",
      [
        18
      ],
      [
        "Disarms the target"
      ],
      676,
      "The enemy must have a weapon that can be disarmed.",
      null
    ],
    [
      "Shield Bash",
      "cc",
      [
        12
      ],
      [
        "Interrupts spellcasting"
      ],
      72,
      "Requires an equipped shield.",
      null
    ],
    [
      "Intercept",
      "cc",
      [
        30
      ],
      [
        "Charge and short stun"
      ],
      20252,
      "Requires Berserker Stance.",
      null
    ]
  ],
  "Paladin": [
    [
      "Devotion Aura",
      "buff",
      [
        1,
        10,
        20,
        30
      ],
      [
        "+55 Armor",
        "Improved Armor bonus",
        "Improved Armor bonus",
        "Improved Armor bonus"
      ],
      465,
      "Party-wide Armor aura.",
      "aura"
    ],
    [
      "Blessing of Might",
      "buff",
      [
        4,
        12,
        22
      ],
      [
        "+14 melee attack power",
        "+25 melee attack power",
        "+40 melee attack power"
      ],
      19740,
      "One normal Blessing per Paladin on each target.",
      "blessing"
    ],
    [
      "Blessing of Protection",
      "buff",
      [
        10,
        24
      ],
      [
        "Temporary immunity to physical attacks",
        "Improved protection"
      ],
      1022,
      "Emergency use only on a tank: may prevent normal enemy attacks and threat generation.",
      "blessing"
    ],
    [
      "Blessing of Freedom",
      "buff",
      [
        18
      ],
      [
        "Removes and temporarily prevents movement impairments"
      ],
      1044,
      "Useful against roots and slows.",
      "blessing"
    ],
    [
      "Blessing of Kings",
      "buff",
      [
        20
      ],
      [
        "+10% to all attributes"
      ],
      20217,
      "Available to all Paladins at level 20 in Forever.",
      "blessing"
    ],
    [
      "Blessing of Wisdom",
      "buff",
      [
        14,
        24
      ],
      [
        "Mana regeneration",
        "Improved mana regeneration"
      ],
      19742,
      "Most useful for mana users.",
      "blessing"
    ],
    [
      "Salvation",
      "buff",
      [
        26
      ],
      [
        "30% less threat generated"
      ],
      1038,
      "Put on DPS or the healer, not on the tank.",
      "salvation"
    ],
    [
      "Retribution Aura",
      "buff",
      [
        16,
        26
      ],
      [
        "Returns Holy damage when hit",
        "Improved reflected Holy damage"
      ],
      7294,
      "Good for tank AoE threat.",
      "aura"
    ],
    [
      "Concentration Aura",
      "buff",
      [
        22
      ],
      [
        "Reduces spell pushback"
      ],
      19746,
      "Useful for casters and healers.",
      "aura"
    ],
    [
      "Shadow Resistance Aura",
      "buff",
      [
        28
      ],
      [
        "Increases Shadow Resistance"
      ],
      19876,
      "Situational resistance aura.",
      "aura"
    ],
    [
      "Hammer of Justice",
      "cc",
      [
        8,
        24
      ],
      [
        "Target stun",
        "Improved stun"
      ],
      853,
      "Short hard crowd control.",
      null
    ],
    [
      "Turn Undead",
      "cc",
      [
        24
      ],
      [
        "Fears Undead"
      ],
      2878,
      "Only works on Undead.",
      null
    ]
  ],
  "Druid": [
    [
      "Mark of the Wild",
      "buff",
      [
        1,
        10,
        20,
        30
      ],
      [
        "+34 Armor",
        "+88 Armor and +3 attributes",
        "+142 Armor and +5 attributes",
        "+203 Armor, +8 attributes and +7 resistances"
      ],
      1126,
      "Excellent all-round buff.",
      null
    ],
    [
      "Thorns",
      "buff",
      [
        6,
        14,
        24
      ],
      [
        "Returns Nature damage when attacked",
        "Improved reflected damage",
        "Stronger reflected damage"
      ],
      467,
      "Especially useful for a Warrior tank holding multiple enemies.",
      null
    ],
    [
      "Entangling Roots",
      "cc",
      [
        8,
        18,
        28
      ],
      [
        "Roots the target",
        "Improved root",
        "Stronger root"
      ],
      339,
      "Generally outdoors; may not be usable inside some dungeons.",
      null
    ],
    [
      "Hibernate",
      "cc",
      [
        18
      ],
      [
        "Sleeps a Beast or Dragonkin"
      ],
      2637,
      "Only works on Beasts and Dragonkin.",
      null
    ],
    [
      "Bash",
      "cc",
      [
        14,
        30
      ],
      [
        "Short stun",
        "Improved stun"
      ],
      5211,
      "Requires Bear Form.",
      null
    ],
    [
      "Nature's Grasp",
      "cc",
      [
        10
      ],
      [
        "Reactive root"
      ],
      16689,
      "Requires a Balance talent.",
      "talent"
    ]
  ],
  "Priest": [
    [
      "Power Word: Fortitude",
      "buff",
      [
        1,
        12,
        24
      ],
      [
        "+4 Stamina",
        "+10 Stamina",
        "+26 Stamina"
      ],
      1243,
      "High-value survivability buff for tanks.",
      null
    ],
    [
      "Power Word: Shield",
      "buff",
      [
        6,
        12,
        18,
        24,
        30
      ],
      [
        "Absorbs damage",
        "Stronger absorb",
        "Stronger absorb",
        "Stronger absorb",
        "Stronger absorb"
      ],
      17,
      "Coordinate with the tank: absorbs can affect incoming-hit Rage generation.",
      null
    ],
    [
      "Fear Ward",
      "buff",
      [
        20
      ],
      [
        "Prevents one Fear effect"
      ],
      6346,
      "Available to all Priest races in Forever.",
      null
    ],
    [
      "Shadow Protection",
      "buff",
      [
        30
      ],
      [
        "Shadow Resistance"
      ],
      976,
      "Situational resistance buff.",
      null
    ],
    [
      "Divine Spirit",
      "buff",
      [
        30
      ],
      [
        "Increases Spirit"
      ],
      14752,
      "Requires a Discipline talent.",
      "talent"
    ],
    [
      "Psychic Scream",
      "cc",
      [
        14,
        28
      ],
      [
        "Area fear",
        "Improved fear"
      ],
      8122,
      "Fleeing enemies may run into other groups.",
      null
    ],
    [
      "Shackle Undead",
      "cc",
      [
        20
      ],
      [
        "Long crowd control on an Undead"
      ],
      9484,
      "Undead targets only.",
      null
    ],
    [
      "Mind Control",
      "cc",
      [
        30
      ],
      [
        "Controls a Humanoid"
      ],
      605,
      "Humanoid targets only.",
      null
    ]
  ],
  "Shaman": [
    [
      "Stoneskin Totem",
      "buff",
      [
        4,
        14,
        24
      ],
      [
        "Reduces physical damage",
        "Stronger physical mitigation",
        "Stronger physical mitigation"
      ],
      8071,
      "Earth totem: conflicts with Strength of Earth from the same Shaman.",
      "earth"
    ],
    [
      "Strength of Earth Totem",
      "buff",
      [
        10,
        24
      ],
      [
        "+7 Strength",
        "+14 Strength"
      ],
      8075,
      "Earth totem: cannot be maintained alongside Stoneskin by one Shaman.",
      "earth"
    ],
    [
      "Healing Stream Totem",
      "buff",
      [
        20,
        30
      ],
      [
        "Periodic group healing",
        "Improved healing"
      ],
      5394,
      "Water totem.",
      "water"
    ],
    [
      "Mana Spring Totem",
      "buff",
      [
        26
      ],
      [
        "Mana regeneration"
      ],
      5675,
      "Water totem.",
      "water"
    ],
    [
      "Flametongue Totem",
      "buff",
      [
        28
      ],
      [
        "Adds Fire damage to weapon attacks"
      ],
      8227,
      "Fire totem.",
      "fire"
    ],
    [
      "Tremor Totem",
      "buff",
      [
        18
      ],
      [
        "Pulsing removal of Fear, Charm and Sleep"
      ],
      8143,
      "Earth totem.",
      "earth"
    ],
    [
      "Poison Cleansing Totem",
      "buff",
      [
        22
      ],
      [
        "Removes Poison from the party"
      ],
      8166,
      "Water totem.",
      "water"
    ],
    [
      "Frost Resistance Totem",
      "buff",
      [
        24
      ],
      [
        "Frost Resistance"
      ],
      8181,
      "Fire totem.",
      "fire"
    ],
    [
      "Fire Resistance Totem",
      "buff",
      [
        28
      ],
      [
        "Fire Resistance"
      ],
      8184,
      "Water totem.",
      "water"
    ],
    [
      "Grounding Totem",
      "buff",
      [
        30
      ],
      [
        "Absorbs an enemy spell"
      ],
      8177,
      "Air totem.",
      "air"
    ],
    [
      "Earthbind Totem",
      "cc",
      [
        6
      ],
      [
        "Area movement slow"
      ],
      2484,
      "Earth totem.",
      "earth"
    ],
    [
      "Stoneclaw Totem",
      "cc",
      [
        8,
        18,
        28
      ],
      [
        "Distracts enemies onto the totem",
        "Improved distraction",
        "Stronger distraction"
      ],
      5730,
      "Earth totem; can divert enemies.",
      "earth"
    ],
    [
      "Earth Shock",
      "cc",
      [
        4,
        8,
        14,
        24
      ],
      [
        "Interrupts spellcasting",
        "Higher-rank interrupt",
        "Higher-rank interrupt",
        "Higher-rank interrupt"
      ],
      8042,
      "Instant spell interruption.",
      "shock"
    ]
  ],
  "Warlock": [
    [
      "Blood Pact",
      "buff",
      [
        4,
        14,
        26
      ],
      [
        "+4 Stamina",
        "+12 Stamina",
        "+25 Stamina"
      ],
      6307,
      "Requires an active Imp pet.",
      "imp"
    ],
    [
      "Fire Shield",
      "buff",
      [
        14,
        24
      ],
      [
        "5 Fire damage to attackers",
        "7 Fire damage to attackers"
      ],
      2947,
      "Requires an Imp. Check whether it stacks with Thorns.",
      "imp"
    ],
    [
      "Soulstone Resurrection",
      "buff",
      [
        18,
        30
      ],
      [
        "Allows resurrection after death",
        "Improved Soulstone"
      ],
      20707,
      "Requires a Soulstone and appropriate setup before a wipe.",
      null
    ],
    [
      "Fear",
      "cc",
      [
        8,
        20
      ],
      [
        "Fears an enemy",
        "Higher-rank fear"
      ],
      5782,
      "A fleeing mob can pull other enemies.",
      null
    ],
    [
      "Banish",
      "cc",
      [
        28
      ],
      [
        "Removes a Demon or Elemental from combat"
      ],
      710,
      "Only works on Demons or Elementals.",
      null
    ],
    [
      "Seduction",
      "cc",
      [
        20
      ],
      [
        "Crowd control on a Humanoid"
      ],
      6358,
      "Requires a Succubus pet.",
      "succubus"
    ]
  ],
  "Mage": [
    [
      "Arcane Intellect",
      "buff",
      [
        1,
        14,
        28
      ],
      [
        "+2 Intellect",
        "+7 Intellect",
        "+15 Intellect"
      ],
      1459,
      "Most useful on casters and healers.",
      null
    ],
    [
      "Dampen Magic",
      "buff",
      [
        12,
        24
      ],
      [
        "Reduces magic damage and healing received",
        "Greater reduction to both"
      ],
      604,
      "Discuss with the healer before using on the tank.",
      null
    ],
    [
      "Amplify Magic",
      "buff",
      [
        18,
        30
      ],
      [
        "Increases magic damage and healing received",
        "Stronger amplification"
      ],
      1008,
      "Can be useful for mostly physical encounters.",
      null
    ],
    [
      "Polymorph",
      "cc",
      [
        8,
        20
      ],
      [
        "Transforms a Humanoid or Beast",
        "Improved Polymorph"
      ],
      118,
      "Do not attack the polymorphed target.",
      null
    ],
    [
      "Frost Nova",
      "cc",
      [
        10,
        26
      ],
      [
        "Area root",
        "Improved area root"
      ],
      122,
      "Roots enemies around the Mage.",
      null
    ],
    [
      "Counterspell",
      "cc",
      [
        24
      ],
      [
        "Interrupts and locks a spell school"
      ],
      2139,
      "Important interrupt for dangerous enemy casters.",
      null
    ]
  ],
  "Hunter": [
    [
      "Furious Howl",
      "buff",
      [
        10,
        24
      ],
      [
        "+13 melee attack power",
        "Improved melee attack power"
      ],
      24604,
      "Requires a Wolf pet and the learned pet skill.",
      "wolf"
    ],
    [
      "Trueshot Aura",
      "buff",
      [
        25
      ],
      [
        "Ranged attack power to the party"
      ],
      19506,
      "Requires a Marksmanship talent; does not provide melee attack power in current Forever data.",
      "talent"
    ],
    [
      "Freezing Trap",
      "cc",
      [
        20
      ],
      [
        "Long freeze on one target"
      ],
      1499,
      "Requires a trap; avoid damaging the frozen target.",
      null
    ],
    [
      "Frost Trap",
      "cc",
      [
        28
      ],
      [
        "Area slow"
      ],
      13809,
      "Slows enemies in the trap area.",
      null
    ],
    [
      "Intimidation",
      "cc",
      [
        30
      ],
      [
        "Pet stun"
      ],
      19577,
      "Requires a Beast Mastery talent.",
      "talent"
    ],
    [
      "Scatter Shot",
      "cc",
      [
        30
      ],
      [
        "Short disorient"
      ],
      19503,
      "Requires a Marksmanship talent.",
      "talent"
    ],
    [
      "Concussive Shot",
      "cc",
      [
        8
      ],
      [
        "Ranged slow"
      ],
      5116,
      "Slows movement.",
      null
    ],
    [
      "Wing Clip",
      "cc",
      [
        12
      ],
      [
        "Melee slow"
      ],
      2974,
      "Slows movement.",
      null
    ]
  ],
  "Rogue": [
    [
      "Gouge",
      "cc",
      [
        6,
        22
      ],
      [
        "Short incapacitate",
        "Improved incapacitate"
      ],
      1776,
      "Damage breaks the effect.",
      null
    ],
    [
      "Sap",
      "cc",
      [
        10,
        28
      ],
      [
        "Pre-pull Humanoid crowd control",
        "Improved Sap"
      ],
      6770,
      "Requires Stealth and a valid target.",
      null
    ],
    [
      "Kick",
      "cc",
      [
        12,
        28
      ],
      [
        "Interrupt",
        "Improved interrupt"
      ],
      1766,
      "Stops the target casting.",
      null
    ],
    [
      "Cheap Shot",
      "cc",
      [
        26
      ],
      [
        "Opening stun from Stealth"
      ],
      1833,
      "Requires Stealth.",
      null
    ],
    [
      "Kidney Shot",
      "cc",
      [
        30
      ],
      [
        "Stun based on combo points"
      ],
      408,
      "Finishing move.",
      null
    ],
    [
      "Crippling Poison",
      "cc",
      [
        20
      ],
      [
        "Weapon poison that slows movement"
      ],
      3408,
      "Requires the poison on a weapon.",
      null
    ],
    [
      "Mind-numbing Poison",
      "cc",
      [
        24
      ],
      [
        "Weapon poison that slows casting"
      ],
      5761,
      "Requires the poison on a weapon.",
      null
    ]
  ]
};
window.CLASS_ICONS={"Warrior":"🛡","Paladin":"✝","Druid":"🌿","Priest":"✨","Shaman":"⚡","Warlock":"🔥","Mage":"❄","Hunter":"🏹","Rogue":"🗡"};
window.GROUP_SOURCES=["https://www.icy-veins.com/wow-forever/","https://warcraft.wiki.gg/wiki/World_of_Warcraft:_Forever","https://www.wowhead.com/forever/guide/classes/warrior/protection/leveling-tips"];
