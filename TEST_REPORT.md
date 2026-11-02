# WoW Forever – Implementation and QA report
Date: 2026-11-02
Repository: https://github.com/janbarta51-svg/forever
Branch: main

## Delivered
- Original wow.field.guide styles.css copied without changes; new page-specific styling in forever.css.
- Single-page responsive tab interface: Warrior, Food buffy, Dungeon group, Campfire, Užitečné linky.
- Warrior level selector 1–30, consumables, item upgrades, quest milestones, 1H dungeon weapon suggestions and threat checklist.
- Food catalog: 71 recipes, category and name filters. Character-use levels shown only when corroborated; otherwise visibly marked as unverified. Cooking skill shown separately.
- Dungeon party: 9 classes, 5 group slots (Warrior tank fixed), rank lookup by level, 72 buff/CC entries. Only buffs and crowd control included; talent, pet and totem constraints annotated.
- Camping: 12 profession objects, level-dependent buffs, conflicting class buffs and skill requirements.
- Item/spell links: Wowhead tooltip support for known IDs, accessible fallback tooltip for every entry.
- Link CMS: cms.html + cms.js with input validation, JSON download and direct GitHub Contents API save (fine-grained token entered temporarily, not persisted).
- GitHub Actions workflow for test/deploy, tests/smoke.cjs with no external packages.

## Completed checks
- Syntax compilation of all JavaScript files: pass (one tooltip concatenation syntax error was found and fixed).
- Data structure checks: food 71; warrior items 56; class abilities 72; camping 12; weapon stages 10; classes 9.
- Regression smoke run with simulated document: level slider changes at 1, 5, 15, 25 and 30; out-of-level stone upgrades hidden; weapon, food, party CC and camp cards render.
- CMS mocked load and GitHub save: five default links loaded, PUT invoked with previous SHA, token cleared after success.
- Linked assets and view IDs: present and matched.
- CI script and workflow syntax: static parse checked; GitHub-hosted CI run not confirmed.

## Known limitations / next steps
1. GitHub Pages public URL has not been confirmed. Enable GitHub Pages source 'GitHub Actions' in repository Settings → Pages (subject to private-repo plan support). The workflow will then build/deploy on main pushes.
2. Wowhead live tooltip rendering requires testing in a real browser with network access; fallback tooltip is available offline.
3. Some Forever food item level requirements and shield spike requirements remain unverified, deliberately marked as conditional. Do not confuse Cooking/Blacksmithing skill with player level.
4. Guild/group talents, pet choice and aura/totem conflicts are annotated but not enforced as a complete constraint solver.
5. Further game patches may change ability levels, bonuses or loot; update corresponding data-*.js and sources.

## Sources
- https://www.wowhead.com/forever/guide/classes/warrior/protection/enchants-consumables-pve-tank
- https://www.wowhead.com/forever/news/all-cooking-food-that-currently-gives-xp-buffs-in-wow-forever-382928
- https://www.icy-veins.com/wow-forever/cooking
- https://www.icy-veins.com/wow-forever/protection-warrior-leveling
- https://worldofwarcraft.blizzard.com/en-gb/news/24301516
