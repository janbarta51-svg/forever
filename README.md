# WoW Forever — Warrior Field Guide

A responsive, **English-only** WoW Forever companion for a Human Protection Warrior from levels 1–30. The layout is based on the original `janbarta51-svg/wow.field.guide` design, including Wowhead mouseover tooltips.

## Features

- **Warrior:** level slider, consumable upgrades, class quests, one-handed weapon suggestions and tanking checklist.
- **Auction House quick copy:** a tiny muted amber overlapping-pages icon appears beside purchasable/tradable items in Warrior cards, current-item highlights and the Food Buffs table. Clicking it copies only the exact item name for Auction House search. Quest rewards, spells and non-tradable dungeon gear have no copy icon. The icon is a clean vector reinterpretation of the provided reference rather than a watermarked bitmap.
- **Food Buffs:** 71 food recipes with stat categories, filters and clear distinction between character level and Cooking skill.
- **Dungeon Group:** a fixed Warrior **Tank**, one **Healer** (Druid, Paladin, Priest or Shaman only), and **three DPS** slots (all nine classes available). Each slot has its own level from 1–30, its Blizzard role icon (shield/cross/sword), and a centered class selector showing WoW class colors and Wowhead class icons. Buff and Crowd Control results remain grouped by class and respect the individual player's level.
- **WoW Chat Export:** in-game Lua commands for real recipient-visible spell links (no addon), plain text, plus the optional addon token format.
- **Campfire:** profession objects, level scaling and stacking conflicts.
- **Useful Links + CMS:** a simple `links.json` editor for named bookmarks.

## WoW clickable spell links

Directly pasting externally generated raw WoW hyperlinks into chat is **not reliable**. WoW may escape them, and the server may reject custom links. The website offers three formats:

1. **In-game links (default):** copy one short `/run C_ChatInfo.SendChatMessage(...)` command at a time, paste into the game chat and press Enter. WoW first calls `C_Spell.GetSpellLink(spellID)` locally, then tries a Lua-escaped `\124cff71d5ff\124Hspell:...` link if the API returns nil. Battle Shout uses verified rank IDs (6673, 5242 and 6192). The command sends the result to Party, Say or Guild. Recipients do not need the addon. Each generated command is capped at 250 characters and projected chat output at 230 characters. The server may still strip or reject a constructed hyperlink. Character levels are intentionally omitted from all exported chat lines; required spell unlock levels remain in parentheses. Use this outside active encounters: macro-driven chat is restricted in combat and may be rate-limited. Requires live testing in the Forever client.
2. **Plain text:** everyone can read it. Copy one line at a time into party chat.
3. **Addon links:** `[Spell Name]{spell:1234} (24)` — readable in chat without an addon, clickable **only for players who install** the optional `addon/ForeverBuffLinks/` companion addon and whose client resolves the spell ID.

The in-game command option is not a guarantee: servers can reject links or restrict scripted messages. Try a single spell in Say or Party first. The addon does not send chat automatically and does not bypass server link restrictions. Ability IDs represent spell families / base ranks, not necessarily the currently available rank. Its operation still needs testing in the live Forever client; see the addon README.

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

## Compact hover tooltip sizing (v1.4)

The original shared stylesheet applied a `min-width:700px` rule to **every** HTML table. Wowhead item tooltips also use internal tables, which forced even short descriptions to appear over 700 pixels wide. The wide-table styling is now scoped to `.table-scroll > table` so that only the Food Buffs table keeps its horizontal scroll. Exceptionally long Wowhead tooltips have a responsive 420px maximum. **Only native Wowhead hover cards are rendered** for items and spells with validated tooltip IDs; no extra local tooltip is shown.

## v1.5.1 — Old browser-cached tooltip protection

The current JavaScript already renders **only** Wowhead hover tooltips, but browser/hosting caches can keep an older `app.js` that still injects a custom `.local-tooltip` card on item hover or click/focus. A CSS safeguard in `forever.css` now permanently hides that legacy element (`display:none !important`) without touching native Wowhead popups. The home page references `app.js`, `forever.css`, and `styles.css` with a version query (`v=20261102-tooltip-fix`), ensuring fresh assets load after the updated HTML is served. This does not affect the name-copy buttons, class icons or chat export.
