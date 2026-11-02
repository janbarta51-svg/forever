# WoW Forever — Warrior Field Guide

A responsive, **English-only** WoW Forever companion for a Human Protection Warrior from levels 1–30. The layout is based on the original `janbarta51-svg/wow.field.guide` design, including Wowhead mouseover tooltips.

## Features

- **Warrior:** level slider, consumable upgrades, class quests, one-handed weapon suggestions and tanking checklist.
- **Auction House quick copy:** a tiny muted amber overlapping-pages icon appears beside purchasable/tradable items in Warrior cards, current-item highlights and the Food Buffs table. Clicking it copies only the exact item name for Auction House search. Quest rewards, spells and non-tradable dungeon gear have no copy icon. The icon is a clean vector reinterpretation of the provided reference rather than a watermarked bitmap.
- **Food Buffs:** 71 food recipes with stat categories, filters and clear distinction between character level and Cooking skill.
- **Dungeon Group:** a fixed Warrior **Tank**, one **Healer** (Druid, Paladin, Priest or Shaman only), and **three DPS** slots (all nine classes available). Each slot has its own level from 1–30, its Blizzard role icon (shield/cross/sword), and a centered class selector showing WoW class colors and Wowhead class icons. Buff and Crowd Control results remain grouped by class and respect the individual player's level.
- **WoW Chat Export:** plain-text copy by short line, plus an addon-compatible format for clickable local spell links.
- **Campfire:** profession objects, level scaling and stacking conflicts.
- **Useful Links + CMS:** a simple `links.json` editor for named bookmarks.

## WoW clickable spell links

Directly pasting externally generated raw WoW hyperlinks into chat is **not reliable**. WoW may escape them, and the server may reject custom links. The website offers two safe formats:

1. **Plain text:** everyone can read it. Copy one line at a time into party chat.
2. **Addon links:** `[Spell Name]{spell:1234} (24)` — readable in chat without an addon, clickable **only for players who install** the optional `addon/ForeverBuffLinks/` companion addon and whose client resolves the spell ID.

The addon does not send chat automatically and does not bypass server link restrictions. Ability IDs represent spell families / base ranks, not necessarily the currently available rank. Its operation still needs testing in the live Forever client; see the addon README.

## Installation and hosting

The website is plain HTML/CSS/JS without a build step. Host the repository with GitHub Pages (workflow at `.github/workflows/pages.yml`). No database needed.

To use the optional addon, copy `addon/ForeverBuffLinks/` into the Forever client's `Interface/AddOns/` directory and restart. The beta 1.60.1 TOC interface number is `16001`, subject to updates.

## Useful Links CMS

Open `cms.html`. To publish, enter a fine-grained GitHub token restricted to **this repository** with `Contents: read/write`; the token is used for the request and then cleared, not stored. Alternatively download `links.json` and commit the file manually.

## Development tests

Run `node tests/smoke.cjs` (no external dependencies). The website deploy workflow executes this check before publishing. For any changes to class data, verify the in-game spell rank and stacking behavior against the live Forever client.

## Sources

- Class colors: https://warcraft.wiki.gg/wiki/Class_colors
- Class icon catalog: https://www.wowhead.com/classic/icons/name:class
- Transparent Blizzard role icon atlas (tank, healer, DPS): https://github.com/yanivkalfa/LFG/blob/master/Icons/UI-LFG-ICON-ROLES.tga
- Wowhead Forever: https://www.wowhead.com/forever/
- Icy Veins Forever: https://www.icy-veins.com/wow-forever/
- WoW Hyperlink format: https://warcraft.wiki.gg/wiki/Hyperlinks
- WoW ChatFrame event filter: https://warcraft.wiki.gg/wiki/API_ChatFrame_AddMessageEventFilter

World of Warcraft names and art belong to Blizzard Entertainment. This project is an unofficial player-made guide. Game data can change with patches.

## Role icon assets

`assets/roles/tank.svg`, `healer.svg` and `dps.svg` are self-contained assets containing transparent crops of Blizzard's original `UI-LFG-ICON-ROLES` texture. No solid image background is added. These images are used only as role indicators in the Dungeon Group layout.

## Purchaseability and copy icon

- `assets/icons/copy.svg` is a clean, transparent overlapping-pages symbol. `forever.css` tints it amber and sizes it to about one character high.
- The UI renders the copy icon **only if** `purchasable === true` in the item data. It is deliberately absent for spells and quest rewards.
- Consumables and cooked foods in the current catalog are treated as tradable; among weapon progression items, only **Copper Shortsword** and **Blackwater Cutlass** are specifically flagged because they are confirmed Bind on Equip.
- Clipboard access requires a secure context in most browsers. If the Clipboard API is unavailable, the website also attempts the standard textarea selection fallback and displays a short status message.

Tradeability evidence: [Copper Shortsword](https://foreverdb.net/item/2847) and [Blackwater Cutlass](https://foreverdb.net/item/1951). Class-quest rewards generally bind to the recipient.
