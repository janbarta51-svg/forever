# WoW Forever — v1.1 English UI and Dungeon Group QA Report

**Date:** 2026-11-02  
**Repository:** https://github.com/janbarta51-svg/forever  
**Branch:** `main`

## Work completed

1. Converted all website and CMS text to English, including Warrior item descriptions, food effects, profession notes, class abilities and the default link titles. There is no Czech-language toggle.
2. Dungeon Group now uses **five separate level fields** (levels 1–30). The tank's field is synchronized with the main Warrior level slider; changing the slider does not overwrite the four teammates' levels.
3. Added nine official WoW class colors in `class-ui.js`. Warrior `#C69B6D` is brown; Priest `#FFFFFF` is white. All class names, slot accents and results use the correct colors.
4. Added icon URLs from the Wowhead class icon catalog. Class icons load remotely from Wowhead CDN and are not copied into the repository as image binaries.
5. Dungeon Group results are grouped into **a separate class card for each party slot**, with Buffs and Crowd Control sections, highest unlocked ranks, rank unlock levels and talent/pet/aura notes.
6. Added WoW chat export: **Plain Text** and **Addon Links**, both split into short lines (235 character cap), with per-line Copy and Copy All.
7. Added optional `addon/ForeverBuffLinks/` companion addon, using game-resolved spell links when recognized. Recipients **must install the addon** to see converted clickable links, otherwise they see readable text plus spell IDs; no server-side link spoofing or automatic chat sending.
8. Preserved the original dark/gold Warrior Field Guide styling, original `styles.css`, five-tab layout, tooltips, cooking catalog, campfire and links CMS.
9. Updated `README.md` and the no-dependency GitHub Actions smoke test.

## Checks performed — passed

- JS compilation: all site and CMS scripts parse.
- All 9 class color mappings and icon slugs present.
- English-only scan: index, app, CMS, data, README.
- Individual levels: Priest 12 while Warrior changes to 25; no accidental synchronization.
- Selected class changes show in class-colored result cards.
- Buff/CC availability responds to level changes at 1, 5, 15, 25, and 30.
- Warrior gear progression retains level-gated stones.
- Export: 9 plain-text lines and 10 addon-token lines for the tested sample party; longest lines 201 and 222 characters respectively, both below the 235 cap.
- Buffs and CC listed per class and copy text includes each member's correct current level.
- CMS functions and GitHub publication request tested earlier using a mocked service. English changes do not alter the flow.
- Static asset paths and IDs exist; GitHub commit succeeded.

## Remaining limitations / live verification needed

- **Clickability:** external clipboard text cannot force clickable spell links for all WoW recipients. The optional addon resolves and displays local links only for installed players. The addon's actual behavior must be tested in the Forever 1.60.1 live client, which is not possible from this environment.
- **Spell ranks:** ID in addon tokens is the base spell-family ID, while the number in parentheses represents the latest unlocked rank level. A few linked tooltips may show the base rank.
- **Wowhead icons/tooltips:** remote CDN icons and hover tooltips are wired up; actual browser/CDN rendering was not verified end-to-end.
- **GitHub Pages:** source committed and CI deployment workflow present; public deployment status and URL not confirmed.
- **Game data:** Forever is subject to changes. The existing dataset's rank levels and consumables should continue to be checked against live client tooltips; some item level requirements remain explicitly unverified.
- **Grouping constraints:** conditional abilities are labeled, not auto-removed when talent, pet or totem is absent.

## References

- Official class color table: https://warcraft.wiki.gg/wiki/Class_colors
- Wowhead class icons: https://www.wowhead.com/classic/icons/name:class
- WoW chat hyperlink handling: https://warcraft.wiki.gg/wiki/Hyperlinks
- Chat event filters: https://warcraft.wiki.gg/wiki/API_ChatFrame_AddMessageEventFilter
- Forever addon interface version: https://warcraft.wiki.gg/wiki/Interface_version


---

## v1.2 — role-based party card update (2026-11-02)

### Changes

- Fixed Party Slot 1 to a **Warrior Tank**; the tank card header now displays Blizzard's shield role icon, title **Tank**, and subtitle **Warrior**.
- Fixed Party Slot 2 to the **Healer** role with a strict allowed-class list: **Druid, Paladin, Priest, Shaman**. Healer class still retains an independently set player level.
- Slots 3–5 are always **DPS 1 / DPS 2 / DPS 3**, each with all nine class options and their own player level.
- Replaced native HTML selects with keyboard-accessible `<details>` selectors so every option can show a **Wowhead class icon** and the **correct class color**.
- Centered the selected class name between a class icon and menu indicator; option labels also center their names.
- Sourced original Blizzard `UI-LFG-ICON-ROLES` artwork from an existing WoW UI sprite and extracted three 67×67 transparent icons. The repository stores self-contained SVG wrappers with embedded transparent PNG pixel data at `assets/roles/tank.svg`, `healer.svg`, and `dps.svg`, without added background.
- Added open-menu behavior (close on outside click, Escape key and switching selectors), responsive dropdown scrolling, and a 5-column desktop layout at widths of 900px and above.

### Validation

- JavaScript syntax check: passed.
- Simulated DOM checks: tank class fixed, healer accepts only 4 classes, DPS options include all 9, rejected Warlock-as-healer selection, accepted Shaman-as-healer selection, DPS class switching, independent player levels and exported chat text: passed.
- Role sprite preview: cropped shield, cross and sword were visually checked with transparency.
- GitHub role asset files checked as self-contained SVG / PNG data; source and references are committed.
- Regression test script `tests/smoke.cjs` extended with role icon paths, selectors, class colors and role restrictions.
- Site is still English-only, and Buff/CC output structure and chat export logic are unchanged.

### Limitations

- The public GitHub Pages deployment status cannot be verified from this environment.
- The browser's final responsive rendering and live Wowhead CDN loads have not been verified in a real deployed site.
- A role icon may appear different in other game clients; assets originate from the Blizzard UI texture used by the game's dungeon role picker.

Role texture source: https://github.com/yanivkalfa/LFG/blob/master/Icons/UI-LFG-ICON-ROLES.tga
