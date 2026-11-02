# WoW Forever — Warrior Field Guide

A responsive, **English-only** WoW Forever companion for a Human Protection Warrior from levels 1–30. The layout is based on the original `janbarta51-svg/wow.field.guide` design, including Wowhead mouseover tooltips.

## Features

- **Warrior:** level slider, consumable upgrades, class quests, one-handed weapon suggestions and tanking checklist.
- **Food Buffs:** 71 food recipes with stat categories, filters and clear distinction between character level and Cooking skill.
- **Dungeon Group:** Warrior tank plus four individually configurable party members (each has an independent level from 1–30), with exact class colors and Wowhead CDN class icons. Each class has its own Buffs and Crowd Control cards; the highest unlocked rank is calculated from that member's level.
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
- Wowhead Forever: https://www.wowhead.com/forever/
- Icy Veins Forever: https://www.icy-veins.com/wow-forever/
- WoW Hyperlink format: https://warcraft.wiki.gg/wiki/Hyperlinks
- WoW ChatFrame event filter: https://warcraft.wiki.gg/wiki/API_ChatFrame_AddMessageEventFilter

World of Warcraft names and art belong to Blizzard Entertainment. This project is an unofficial player-made guide. Game data can change with patches.
