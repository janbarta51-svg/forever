// WoW Forever 1.60.1: dungeon group buffs, useful party utility and crowd control, levels 1-60.
// Client-derived learn/rank levels cross-checked against the launch progression
// at https://senseos.gg/wiki/wow-forever/talents/abilities/
// and spellbooks at https://sixtyforever.com/abilities/  (beta references).
// Only trained/quest-learned spells are guaranteed at their unlock level.
// Talent, pet, form, poison and reagent requirements are labelled explicitly.
// Categories "buff" and "cc" also include relevant group/pull utilities,
// but notes distinguish true crowd control from mitigation/debuffs/dispels.
// [name, kind, rankUnlockLevels, rankEffectDescriptions, baseSpellId, note, requirement]
window.GROUP_ABILITY_DATA={
  "Warrior": [
    [
      "Battle Shout",
      "buff",
      [
        1,
        12,
        22,
        32,
        42,
        52,
        60
      ],
      [
        "Raises nearby party members' melee attack power",
        "Raises nearby party members' melee attack power",
        "Raises nearby party members' melee attack power",
        "Raises nearby party members' melee attack power",
        "Raises nearby party members' melee attack power",
        "Raises nearby party members' melee attack power",
        "Raises nearby party members' melee attack power"
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
        8,
        32,
        54
      ],
      [
        "Movement speed reduction",
        "Movement speed reduction",
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
        12,
        32,
        52
      ],
      [
        "Interrupts spellcasting",
        "Interrupts spellcasting",
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
        30,
        42,
        52
      ],
      [
        "Charge and short stun",
        "Charge and short stun",
        "Charge and short stun"
      ],
      20252,
      "Requires Berserker Stance.",
      null
    ],
    [
      "Demoralizing Shout",
      "cc",
      [
        14,
        24,
        34,
        44,
        54
      ],
      [
        "Reduces attack power of enemies in range",
        "Reduces attack power of enemies in range",
        "Reduces attack power of enemies in range",
        "Reduces attack power of enemies in range",
        "Reduces attack power of enemies in range"
      ],
      1160,
      "Enemy mitigation debuff, not a hard CC.",
      null
    ],
    [
      "Pummel",
      "cc",
      [
        38,
        58
      ],
      [
        "Interrupts spellcasting",
        "Interrupts spellcasting"
      ],
      6552,
      "Requires Berserker Stance or stance support.",
      null
    ],
    [
      "Piercing Howl",
      "cc",
      [
        20
      ],
      [
        "Area movement slow"
      ],
      12323,
      "Fury talent.",
      "talent"
    ],
    [
      "Concussion Blow",
      "cc",
      [
        30
      ],
      [
        "Long single-target stun"
      ],
      12809,
      "Protection talent.",
      "talent"
    ],
    [
      "Challenging Shout",
      "cc",
      [
        26
      ],
      [
        "Temporarily taunts enemies in an area"
      ],
      1161,
      "AoE taunt utility, not a stun or fear.",
      null
    ],
    [
      "Taunt",
      "cc",
      [
        10
      ],
      [
        "Forces the enemy to attack the Warrior temporarily"
      ],
      355,
      "Threat management; not hard crowd control.",
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
        30,
        40,
        50,
        60
      ],
      [
        "Increases party Armor",
        "Increases party Armor",
        "Increases party Armor",
        "Increases party Armor",
        "Increases party Armor",
        "Increases party Armor",
        "Increases party Armor"
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
        22,
        32,
        42,
        52,
        60
      ],
      [
        "Increases ally melee attack power",
        "Increases ally melee attack power",
        "Increases ally melee attack power",
        "Increases ally melee attack power",
        "Increases ally melee attack power",
        "Increases ally melee attack power",
        "Increases ally melee attack power"
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
        24,
        38
      ],
      [
        "Temporary immunity to physical attacks",
        "Temporary immunity to physical attacks",
        "Temporary immunity to physical attacks"
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
        "Rank improves this ability's effect"
      ],
      20217,
      "Baseline single-target Kings in Forever, not a talent. Greater Kings becomes available at 60.",
      null
    ],
    [
      "Blessing of Wisdom",
      "buff",
      [
        14,
        24,
        34,
        44,
        54,
        60
      ],
      [
        "Mana regeneration",
        "Mana regeneration",
        "Mana regeneration",
        "Mana regeneration",
        "Mana regeneration",
        "Mana regeneration"
      ],
      19742,
      "Most useful for mana users.",
      "blessing"
    ],
    [
      "Retribution Aura",
      "buff",
      [
        16,
        26,
        36,
        46,
        56
      ],
      [
        "Returns Holy damage when hit",
        "Returns Holy damage when hit",
        "Returns Holy damage when hit",
        "Returns Holy damage when hit",
        "Returns Holy damage when hit"
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
        28,
        40,
        52
      ],
      [
        "Increases Shadow Resistance",
        "Increases Shadow Resistance",
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
        24,
        40,
        54
      ],
      [
        "Target stun",
        "Target stun",
        "Target stun",
        "Target stun"
      ],
      853,
      "Short hard crowd control.",
      null
    ],
    [
      "Turn Undead",
      "cc",
      [
        24,
        36,
        52
      ],
      [
        "Fears Undead",
        "Fears Undead",
        "Fears Undead"
      ],
      2878,
      "Only works on Undead.",
      null
    ],
    [
      "Fire Resistance Aura",
      "buff",
      [
        36,
        48,
        60
      ],
      [
        "Party Fire resistance aura",
        "Party Fire resistance aura",
        "Party Fire resistance aura"
      ],
      19891,
      "Mutually exclusive with other Paladin auras.",
      "aura"
    ],
    [
      "Frost Resistance Aura",
      "buff",
      [
        32,
        44,
        56
      ],
      [
        "Party Frost resistance aura",
        "Party Frost resistance aura",
        "Party Frost resistance aura"
      ],
      19888,
      "Mutually exclusive with other Paladin auras.",
      "aura"
    ],
    [
      "Blessing of Sacrifice",
      "buff",
      [
        46,
        54
      ],
      [
        "Transfers part of an ally's damage to the Paladin",
        "Transfers part of an ally's damage to the Paladin"
      ],
      6940,
      "Plan defensive cooldowns; only one normal Blessing per Paladin on a target.",
      "blessing"
    ],
    [
      "Greater Blessing of Might",
      "buff",
      [
        52,
        60
      ],
      [
        "Class-wide longer-duration Blessing of Might",
        "Class-wide longer-duration Blessing of Might"
      ],
      25782,
      "Uses a Symbol of Kings; same effect family as normal Might.",
      "blessing"
    ],
    [
      "Greater Blessing of Wisdom",
      "buff",
      [
        54,
        60
      ],
      [
        "Class-wide longer-duration Blessing of Wisdom",
        "Class-wide longer-duration Blessing of Wisdom"
      ],
      25894,
      "Uses a Symbol of Kings; same effect family as normal Wisdom.",
      "blessing"
    ],
    [
      "Greater Blessing of Kings",
      "buff",
      [
        60
      ],
      [
        "Class-wide longer-duration Blessing of Kings"
      ],
      25898,
      "Uses a Symbol of Kings; same effect family as normal Kings.",
      "blessing"
    ],
    [
      "Repentance",
      "cc",
      [
        30
      ],
      [
        "Incapacitation of a Humanoid"
      ],
      20066,
      "Retribution talent, breaks on damage.",
      "talent"
    ],
    [
      "Cleanse",
      "buff",
      [
        42
      ],
      [
        "Removes poison, disease and magic effects from an ally"
      ],
      4987,
      "Group utility; removes debuffs, not a persistent buff.",
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
        30,
        40,
        50,
        60
      ],
      [
        "Increases armor, primary attributes and resistances",
        "Increases armor, primary attributes and resistances",
        "Increases armor, primary attributes and resistances",
        "Increases armor, primary attributes and resistances",
        "Increases armor, primary attributes and resistances",
        "Increases armor, primary attributes and resistances",
        "Increases armor, primary attributes and resistances"
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
        24,
        34,
        44,
        54
      ],
      [
        "Returns Nature damage when attacked",
        "Returns Nature damage when attacked",
        "Returns Nature damage when attacked",
        "Returns Nature damage when attacked",
        "Returns Nature damage when attacked",
        "Returns Nature damage when attacked"
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
        28,
        38,
        48,
        58
      ],
      [
        "Roots the target",
        "Roots the target",
        "Roots the target",
        "Roots the target",
        "Roots the target",
        "Roots the target"
      ],
      339,
      "Generally outdoors; may not be usable inside some dungeons.",
      null
    ],
    [
      "Hibernate",
      "cc",
      [
        18,
        38,
        58
      ],
      [
        "Sleeps a Beast or Dragonkin",
        "Sleeps a Beast or Dragonkin",
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
        30,
        46
      ],
      [
        "Short stun",
        "Short stun",
        "Short stun"
      ],
      5211,
      "Requires Bear Form.",
      null
    ],
    [
      "Nature's Grasp",
      "cc",
      [
        10,
        18,
        28,
        38,
        48,
        58
      ],
      [
        "Reactive root",
        "Reactive root",
        "Reactive root",
        "Reactive root",
        "Reactive root",
        "Reactive root"
      ],
      16689,
      "Reactive outdoor root; gained as baseline in WoW Forever; some dungeon areas restrict roots.",
      null
    ],
    [
      "Gift of the Wild",
      "buff",
      [
        50,
        60
      ],
      [
        "Group-wide Mark of the Wild",
        "Group-wide Mark of the Wild"
      ],
      21849,
      "Reagent required; same category as Mark of the Wild.",
      null
    ],
    [
      "Innervate",
      "buff",
      [
        40
      ],
      [
        "Restores an ally's mana over time"
      ],
      29166,
      "Important healer mana cooldown.",
      null
    ],
    [
      "Rebirth",
      "buff",
      [
        20,
        30,
        40,
        50,
        60
      ],
      [
        "Resurrects an ally during combat",
        "Resurrects an ally during combat",
        "Resurrects an ally during combat",
        "Resurrects an ally during combat",
        "Resurrects an ally during combat"
      ],
      20484,
      "Combat resurrection; consumes a reagent and has a long cooldown.",
      null
    ],
    [
      "Remove Curse",
      "buff",
      [
        24
      ],
      [
        "Removes a curse from an ally"
      ],
      2782,
      "Helpful dispel, not an ongoing buff.",
      null
    ],
    [
      "Abolish Poison",
      "buff",
      [
        26
      ],
      [
        "Removes poisons over time"
      ],
      2893,
      "Useful when poison effects recur.",
      null
    ],
    [
      "Feral Charge",
      "cc",
      [
        20
      ],
      [
        "Immobilizes and interrupts an enemy"
      ],
      16979,
      "Feral talent; requires Bear Form.",
      "talent"
    ],
    [
      "Pounce",
      "cc",
      [
        36,
        46,
        56
      ],
      [
        "Stun opener from Cat Form Prowl",
        "Stun opener from Cat Form Prowl",
        "Stun opener from Cat Form Prowl"
      ],
      9005,
      "Requires Cat Form and Prowl.",
      null
    ],
    [
      "Demoralizing Roar",
      "cc",
      [
        10,
        20,
        32,
        42,
        52
      ],
      [
        "Reduces nearby enemies' attack power",
        "Reduces nearby enemies' attack power",
        "Reduces nearby enemies' attack power",
        "Reduces nearby enemies' attack power",
        "Reduces nearby enemies' attack power"
      ],
      99,
      "Mitigation debuff, not hard CC; requires Bear Form.",
      null
    ],
    [
      "Challenging Roar",
      "cc",
      [
        28
      ],
      [
        "AoE taunt"
      ],
      5209,
      "Requires Bear Form; area threat utility.",
      null
    ]
  ],
  "Priest": [
    [
      "Power Word: Fortitude",
      "buff",
      [
        1,
        12,
        24,
        36,
        48,
        60
      ],
      [
        "Increases ally Stamina",
        "Increases ally Stamina",
        "Increases ally Stamina",
        "Increases ally Stamina",
        "Increases ally Stamina",
        "Increases ally Stamina"
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
        30,
        36,
        42,
        48,
        54,
        60
      ],
      [
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage",
        "Absorbs damage"
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
        30,
        42,
        56
      ],
      [
        "Shadow Resistance",
        "Shadow Resistance",
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
        30,
        40,
        50,
        60
      ],
      [
        "Increases Spirit",
        "Increases Spirit",
        "Increases Spirit",
        "Increases Spirit"
      ],
      14752,
      "Baseline Spirit buff in WoW Forever; no longer restricted to a Discipline talent.",
      null
    ],
    [
      "Psychic Scream",
      "cc",
      [
        14,
        28,
        42,
        56
      ],
      [
        "Area fear",
        "Area fear",
        "Area fear",
        "Area fear"
      ],
      8122,
      "Fleeing enemies may run into other groups.",
      null
    ],
    [
      "Shackle Undead",
      "cc",
      [
        20,
        40,
        60
      ],
      [
        "Long crowd control on an Undead",
        "Long crowd control on an Undead",
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
        30,
        44,
        58
      ],
      [
        "Controls a Humanoid",
        "Controls a Humanoid",
        "Controls a Humanoid"
      ],
      605,
      "Humanoid targets only.",
      null
    ],
    [
      "Prayer of Fortitude",
      "buff",
      [
        48,
        60
      ],
      [
        "Party-wide Power Word: Fortitude",
        "Party-wide Power Word: Fortitude"
      ],
      21562,
      "Requires a reagent; long-duration group buff.",
      null
    ],
    [
      "Prayer of Spirit",
      "buff",
      [
        60
      ],
      [
        "Party-wide Divine Spirit"
      ],
      27681,
      "Requires a reagent; provides Spirit to the group.",
      null
    ],
    [
      "Prayer of Shadow Protection",
      "buff",
      [
        56
      ],
      [
        "Party-wide Shadow Protection"
      ],
      27683,
      "Requires reagent; situational resistance.",
      null
    ],
    [
      "Power Infusion",
      "buff",
      [
        40
      ],
      [
        "Temporarily improves a friendly caster's throughput"
      ],
      10060,
      "Discipline talent, coordinate with healer/DPS.",
      "talent"
    ],
    [
      "Dispel Magic",
      "buff",
      [
        18,
        36
      ],
      [
        "Removes a magical effect from a friendly target or beneficial magic from an enemy",
        "Removes a magical effect from a friendly target or beneficial magic from an enemy"
      ],
      527,
      "Party utility; rank controls strength/number of effects.",
      null
    ],
    [
      "Abolish Disease",
      "buff",
      [
        32
      ],
      [
        "Removes disease effects over time"
      ],
      552,
      "Party dispel utility.",
      null
    ],
    [
      "Silence",
      "cc",
      [
        30
      ],
      [
        "Silences an enemy caster"
      ],
      15487,
      "Shadow talent, not available without investment.",
      "talent"
    ],
    [
      "Mind Soothe",
      "cc",
      [
        20,
        36,
        52
      ],
      [
        "Reduces a Humanoid's aggro radius",
        "Reduces a Humanoid's aggro radius",
        "Reduces a Humanoid's aggro radius"
      ],
      453,
      "Pulling utility; not hard CC.",
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
        24,
        34,
        44,
        54
      ],
      [
        "Reduces physical damage",
        "Reduces physical damage",
        "Reduces physical damage",
        "Reduces physical damage",
        "Reduces physical damage",
        "Reduces physical damage"
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
        24,
        38,
        52,
        60
      ],
      [
        "Rank improves this ability's effect",
        "Rank improves this ability's effect",
        "Rank improves this ability's effect",
        "Rank improves this ability's effect",
        "Rank improves this ability's effect"
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
        30,
        40,
        50,
        60
      ],
      [
        "Periodic group healing",
        "Periodic group healing",
        "Periodic group healing",
        "Periodic group healing",
        "Periodic group healing"
      ],
      5394,
      "Water totem.",
      "water"
    ],
    [
      "Mana Spring Totem",
      "buff",
      [
        26,
        36,
        46,
        56
      ],
      [
        "Mana regeneration",
        "Mana regeneration",
        "Mana regeneration",
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
        28,
        38,
        48,
        58
      ],
      [
        "Adds Fire damage to weapon attacks",
        "Adds Fire damage to weapon attacks",
        "Adds Fire damage to weapon attacks",
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
        24,
        38,
        54
      ],
      [
        "Frost Resistance",
        "Frost Resistance",
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
        28,
        42,
        58
      ],
      [
        "Fire Resistance",
        "Fire Resistance",
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
        28,
        38,
        48,
        58
      ],
      [
        "Distracts enemies onto the totem",
        "Distracts enemies onto the totem",
        "Distracts enemies onto the totem",
        "Distracts enemies onto the totem",
        "Distracts enemies onto the totem",
        "Distracts enemies onto the totem"
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
        24,
        36,
        48,
        60
      ],
      [
        "Interrupts spellcasting",
        "Interrupts spellcasting",
        "Interrupts spellcasting",
        "Interrupts spellcasting",
        "Interrupts spellcasting",
        "Interrupts spellcasting",
        "Interrupts spellcasting"
      ],
      8042,
      "Instant spell interruption.",
      "shock"
    ],
    [
      "Windfury Totem",
      "buff",
      [
        32,
        42,
        52
      ],
      [
        "Provides extra melee weapon attack opportunities",
        "Provides extra melee weapon attack opportunities",
        "Provides extra melee weapon attack opportunities"
      ],
      8512,
      "Air totem: cannot coexist with Grace of Air and Grounding from the same Shaman.",
      "air"
    ],
    [
      "Grace of Air Totem",
      "buff",
      [
        42,
        56,
        60
      ],
      [
        "Agility to the party",
        "Agility to the party",
        "Agility to the party"
      ],
      8835,
      "Air totem; conflicts with Windfury Totem from one Shaman.",
      "air"
    ],
    [
      "Nature Resistance Totem",
      "buff",
      [
        30,
        44,
        60
      ],
      [
        "Nature resistance to the party",
        "Nature resistance to the party",
        "Nature resistance to the party"
      ],
      10595,
      "Air totem, one air totem at a time per Shaman.",
      "air"
    ],
    [
      "Windwall Totem",
      "buff",
      [
        36,
        46,
        56
      ],
      [
        "Reduces ranged damage to party",
        "Reduces ranged damage to party",
        "Reduces ranged damage to party"
      ],
      15107,
      "Air totem.",
      "air"
    ],
    [
      "Disease Cleansing Totem",
      "buff",
      [
        38
      ],
      [
        "Periodically removes disease from nearby allies"
      ],
      8170,
      "Water totem; replaces Mana Spring/Healing Stream from one Shaman.",
      "water"
    ],
    [
      "Mana Tide Totem",
      "buff",
      [
        25,
        36,
        48,
        58
      ],
      [
        "Restores group mana over time",
        "Restores group mana over time",
        "Restores group mana over time",
        "Restores group mana over time"
      ],
      16190,
      "Restoration talent; Water totem.",
      "talent"
    ],
    [
      "Frost Shock",
      "cc",
      [
        20,
        34,
        46,
        58
      ],
      [
        "Slows enemy movement",
        "Slows enemy movement",
        "Slows enemy movement",
        "Slows enemy movement"
      ],
      8056,
      "Useful for kiting and controlling runners.",
      null
    ],
    [
      "Purge",
      "cc",
      [
        12,
        32
      ],
      [
        "Removes beneficial magic from an enemy",
        "Removes beneficial magic from an enemy"
      ],
      370,
      "Offensive dispel utility, not hard CC.",
      null
    ]
  ],
  "Warlock": [
    [
      "Blood Pact",
      "buff",
      [
        4,
        14,
        26,
        38,
        50
      ],
      [
        "Imp pet aura grants Stamina",
        "Imp pet aura grants Stamina",
        "Imp pet aura grants Stamina",
        "Imp pet aura grants Stamina",
        "Imp pet aura grants Stamina"
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
        24,
        34,
        44,
        54
      ],
      [
        "Rank improves this ability's effect",
        "Rank improves this ability's effect",
        "Rank improves this ability's effect",
        "Rank improves this ability's effect",
        "Rank improves this ability's effect"
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
        30,
        40,
        50,
        60
      ],
      [
        "Allows resurrection after death",
        "Allows resurrection after death",
        "Allows resurrection after death",
        "Allows resurrection after death",
        "Allows resurrection after death"
      ],
      20707,
      "Cast the Soulstone before combat to enable a self-resurrection. Listed as Create Soulstone ranks.",
      null
    ],
    [
      "Fear",
      "cc",
      [
        8,
        32,
        56
      ],
      [
        "Fears an enemy",
        "Fears an enemy",
        "Fears an enemy"
      ],
      5782,
      "A fleeing mob can pull other enemies.",
      null
    ],
    [
      "Banish",
      "cc",
      [
        28,
        48
      ],
      [
        "Removes a Demon or Elemental from combat",
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
        26
      ],
      [
        "Crowd control on a Humanoid"
      ],
      6358,
      "Requires an active Succubus or Incubus pet; crowd control on a Humanoid.",
      "succubus/incubus"
    ],
    [
      "Create Healthstone",
      "buff",
      [
        10,
        22,
        34,
        46,
        58
      ],
      [
        "Creates a healthstone that an ally can use for emergency healing",
        "Creates a healthstone that an ally can use for emergency healing",
        "Creates a healthstone that an ally can use for emergency healing",
        "Creates a healthstone that an ally can use for emergency healing",
        "Creates a healthstone that an ally can use for emergency healing"
      ],
      6201,
      "Warlock support item; sharing requires a trade or appropriate group mechanic.",
      null
    ],
    [
      "Detect Invisibility",
      "buff",
      [
        26,
        38,
        50
      ],
      [
        "Grants invisibility detection",
        "Grants invisibility detection",
        "Grants invisibility detection"
      ],
      132,
      "Utility buff for certain dungeons.",
      null
    ],
    [
      "Unending Breath",
      "buff",
      [
        16
      ],
      [
        "Allows breathing underwater"
      ],
      5697,
      "Situational utility, not combat throughput.",
      null
    ],
    [
      "Curse of Weakness",
      "cc",
      [
        4,
        12,
        22,
        32,
        42,
        52
      ],
      [
        "Reduces an enemy's damage",
        "Reduces an enemy's damage",
        "Reduces an enemy's damage",
        "Reduces an enemy's damage",
        "Reduces an enemy's damage",
        "Reduces an enemy's damage"
      ],
      702,
      "Mitigation debuff, not hard CC.",
      null
    ],
    [
      "Curse of Tongues",
      "cc",
      [
        26,
        50
      ],
      [
        "Increases enemy spellcasting time",
        "Increases enemy spellcasting time"
      ],
      1714,
      "Useful against caster packs; only one Warlock curse per target.",
      null
    ],
    [
      "Curse of Exhaustion",
      "cc",
      [
        25
      ],
      [
        "Slows enemy movement"
      ],
      18223,
      "Affliction talent.",
      "talent"
    ],
    [
      "Spell Lock",
      "cc",
      [
        36,
        52
      ],
      [
        "Felhunter interrupt and spell-school lockout",
        "Felhunter interrupt and spell-school lockout"
      ],
      19244,
      "Requires an active Felhunter pet.",
      "felhunter"
    ],
    [
      "Howl of Terror",
      "cc",
      [
        40,
        54
      ],
      [
        "Area fear",
        "Area fear"
      ],
      5484,
      "Fleeing enemies can pull extra packs.",
      null
    ],
    [
      "Death Coil",
      "cc",
      [
        42,
        50,
        58
      ],
      [
        "Horrifies an enemy and heals the caster",
        "Horrifies an enemy and heals the caster",
        "Horrifies an enemy and heals the caster"
      ],
      6789,
      "Short emergency CC.",
      null
    ],
    [
      "Subjugate Demon",
      "cc",
      [
        30,
        44,
        58
      ],
      [
        "Temporarily enslaves an enemy Demon",
        "Temporarily enslaves an enemy Demon",
        "Temporarily enslaves an enemy Demon"
      ],
      1098,
      "Demon targets only.",
      null
    ],
    [
      "Devour Magic",
      "cc",
      [
        30,
        38,
        46,
        54
      ],
      [
        "Felhunter dispels a magic effect",
        "Felhunter dispels a magic effect",
        "Felhunter dispels a magic effect",
        "Felhunter dispels a magic effect"
      ],
      19505,
      "Pet utility; requires Felhunter.",
      "felhunter"
    ]
  ],
  "Mage": [
    [
      "Arcane Intellect",
      "buff",
      [
        1,
        14,
        28,
        42,
        56
      ],
      [
        "Increases ally Intellect",
        "Increases ally Intellect",
        "Increases ally Intellect",
        "Increases ally Intellect",
        "Increases ally Intellect"
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
        24,
        36,
        48,
        60
      ],
      [
        "Reduces magic damage and healing received",
        "Reduces magic damage and healing received",
        "Reduces magic damage and healing received",
        "Reduces magic damage and healing received",
        "Reduces magic damage and healing received"
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
        30,
        42,
        54
      ],
      [
        "Increases magic damage and healing received",
        "Increases magic damage and healing received",
        "Increases magic damage and healing received",
        "Increases magic damage and healing received"
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
        20,
        40,
        60
      ],
      [
        "Transforms a Humanoid or Beast",
        "Transforms a Humanoid or Beast",
        "Transforms a Humanoid or Beast",
        "Transforms a Humanoid or Beast"
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
        26,
        40,
        54
      ],
      [
        "Area root",
        "Area root",
        "Area root",
        "Area root"
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
    ],
    [
      "Arcane Brilliance",
      "buff",
      [
        56
      ],
      [
        "Long-duration group Arcane Intellect"
      ],
      23028,
      "Requires Arcane Powder reagent.",
      null
    ],
    [
      "Conjure Food",
      "buff",
      [
        6,
        12,
        22,
        32,
        42,
        52,
        60
      ],
      [
        "Creates food for a group member",
        "Creates food for a group member",
        "Creates food for a group member",
        "Creates food for a group member",
        "Creates food for a group member",
        "Creates food for a group member",
        "Creates food for a group member"
      ],
      587,
      "Utility; not a combat buff.",
      null
    ],
    [
      "Conjure Water",
      "buff",
      [
        4,
        10,
        20,
        30,
        40,
        50,
        60
      ],
      [
        "Creates water for healer or casters",
        "Creates water for healer or casters",
        "Creates water for healer or casters",
        "Creates water for healer or casters",
        "Creates water for healer or casters",
        "Creates water for healer or casters",
        "Creates water for healer or casters"
      ],
      5504,
      "Utility; not a combat buff.",
      null
    ],
    [
      "Remove Lesser Curse",
      "buff",
      [
        18
      ],
      [
        "Removes a curse from a friendly target"
      ],
      475,
      "Important party dispel.",
      null
    ],
    [
      "Cone of Cold",
      "cc",
      [
        26,
        34,
        42,
        50
      ],
      [
        "Area Frost movement slow",
        "Area Frost movement slow",
        "Area Frost movement slow",
        "Area Frost movement slow"
      ],
      120,
      "Instant cone slow.",
      null
    ],
    [
      "Frostbolt",
      "cc",
      [
        4,
        8,
        14,
        20,
        26,
        32,
        38,
        44,
        50,
        56,
        60
      ],
      [
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit",
        "Slows the target on hit"
      ],
      116,
      "Damage spell with a useful single-target slow.",
      null
    ],
    [
      "Blast Wave",
      "cc",
      [
        30
      ],
      [
        "Area slow and damage"
      ],
      11113,
      "Fire talent; may differ in strength by build.",
      "talent"
    ]
  ],
  "Hunter": [
    [
      "Furious Howl",
      "buff",
      [
        10,
        24,
        40,
        56
      ],
      [
        "Wolf pet raises melee attack power briefly",
        "Wolf pet raises melee attack power briefly",
        "Wolf pet raises melee attack power briefly",
        "Wolf pet raises melee attack power briefly"
      ],
      24604,
      "Requires a Wolf pet that has learned its own Furious Howl rank; pet skill is separate from the Hunter trainer.",
      "wolf"
    ],
    [
      "Trueshot Aura",
      "buff",
      [
        25,
        32,
        40,
        50,
        60
      ],
      [
        "Ranged attack power to the party",
        "Ranged attack power to the party",
        "Ranged attack power to the party",
        "Ranged attack power to the party",
        "Ranged attack power to the party"
      ],
      19506,
      "Marksmanship talent. In Forever this increases RANGED attack power, not melee attack power.",
      "talent"
    ],
    [
      "Freezing Trap",
      "cc",
      [
        20,
        40,
        60
      ],
      [
        "Long freeze on one target",
        "Long freeze on one target",
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
        12,
        38,
        60
      ],
      [
        "Melee slow",
        "Melee slow",
        "Melee slow"
      ],
      2974,
      "Slows movement.",
      null
    ],
    [
      "Aspect of the Wild",
      "buff",
      [
        46,
        56
      ],
      [
        "Nature resistance to nearby party/raid members",
        "Nature resistance to nearby party/raid members"
      ],
      20043,
      "Only one Hunter Aspect can be active.",
      null
    ],
    [
      "Aspect of the Pack",
      "buff",
      [
        40
      ],
      [
        "Increases party travel speed"
      ],
      13159,
      "Dazes affected allies when hit; turn it off before combat.",
      null
    ],
    [
      "Hunter's Mark",
      "buff",
      [
        6,
        22,
        40,
        58
      ],
      [
        "Increases ranged attack power against the marked target",
        "Increases ranged attack power against the marked target",
        "Increases ranged attack power against the marked target",
        "Increases ranged attack power against the marked target"
      ],
      1130,
      "Enemy debuff useful for ranged DPS, not a player buff.",
      null
    ],
    [
      "Scare Beast",
      "cc",
      [
        14,
        30,
        46
      ],
      [
        "Fears a Beast",
        "Fears a Beast",
        "Fears a Beast"
      ],
      1513,
      "Only valid on Beasts; damage may break it.",
      null
    ],
    [
      "Counterattack",
      "cc",
      [
        25,
        30,
        42,
        54
      ],
      [
        "Roots the enemy after a parry",
        "Roots the enemy after a parry",
        "Roots the enemy after a parry",
        "Roots the enemy after a parry"
      ],
      19306,
      "Survival talent.",
      "talent"
    ],
    [
      "Tranquilizing Shot",
      "cc",
      [
        60
      ],
      [
        "Removes one Frenzy effect from an enemy"
      ],
      19801,
      "Specialized boss utility; learned through endgame content.",
      null
    ],
    [
      "Strider Kick",
      "cc",
      [
        30
      ],
      [
        "Interrupt-oriented melee utility"
      ],
      0,
      "Survival talent; check current in-game tooltip.",
      "talent"
    ]
  ],
  "Rogue": [
    [
      "Gouge",
      "cc",
      [
        6,
        18,
        32,
        46,
        60
      ],
      [
        "Short incapacitate",
        "Short incapacitate",
        "Short incapacitate",
        "Short incapacitate",
        "Short incapacitate"
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
        28,
        48
      ],
      [
        "Pre-pull Humanoid crowd control",
        "Pre-pull Humanoid crowd control",
        "Pre-pull Humanoid crowd control"
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
        26,
        42,
        58
      ],
      [
        "Interrupt",
        "Interrupt",
        "Interrupt",
        "Interrupt"
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
        30,
        50
      ],
      [
        "Stun based on combo points",
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
        20,
        50
      ],
      [
        "Weapon poison that slows movement",
        "Weapon poison that slows movement"
      ],
      3408,
      "Applied to a weapon; requires the appropriate poison rank and poison supply.",
      "poison"
    ],
    [
      "Mind-numbing Poison",
      "cc",
      [
        24,
        38,
        52
      ],
      [
        "Weapon poison that slows casting",
        "Weapon poison that slows casting",
        "Weapon poison that slows casting"
      ],
      5761,
      "Applied to a weapon; slows enemy casting; requires the appropriate poison rank.",
      "poison"
    ],
    [
      "Blind",
      "cc",
      [
        34
      ],
      [
        "Incapacitation that breaks on damage"
      ],
      2094,
      "Requires a consumable; useful for emergency CC.",
      null
    ],
    [
      "Distract",
      "cc",
      [
        22
      ],
      [
        "Changes enemy facing before a pull"
      ],
      1725,
      "Utility from Stealth, not hard CC.",
      null
    ],
    [
      "Expose Armor",
      "cc",
      [
        14,
        26,
        36,
        46,
        56
      ],
      [
        "Reduces a target's armor for group physical DPS",
        "Reduces a target's armor for group physical DPS",
        "Reduces a target's armor for group physical DPS",
        "Reduces a target's armor for group physical DPS",
        "Reduces a target's armor for group physical DPS"
      ],
      8647,
      "Armor debuff, not hard CC. Cannot combine with stronger competing armor debuffs.",
      null
    ],
    [
      "Wound Poison",
      "cc",
      [
        32,
        40,
        48,
        56
      ],
      [
        "Reduces healing received by an enemy",
        "Reduces healing received by an enemy",
        "Reduces healing received by an enemy",
        "Reduces healing received by an enemy"
      ],
      13219,
      "Weapon poison debuff; not hard CC.",
      null
    ]
  ]
};
window.CLASS_ICONS={"Warrior":"🛡","Paladin":"✝","Druid":"🌿","Priest":"✨","Shaman":"⚡","Warlock":"🔥","Mage":"❄","Hunter":"🏹","Rogue":"🗡"};
window.GROUP_SOURCES=["https://senseos.gg/wiki/wow-forever/talents/abilities/","https://sixtyforever.com/abilities/","https://senseos.gg/guides/wow-forever/abilities-by-level/","https://www.wowhead.com/forever/"];
