# Forever Buff Links (optional addon)

**Purpose:** Makes website-exported spell tokens clickable for **players who install this addon**. It does not forge clickable hyperlinks on the server, does not send any chat on your behalf, and does not alter the text for players who have not installed it.

Example message:
```
Priest (Lv 24) - Buffs: [Power Word: Fortitude]{spell:1243} (24)
```

On a recipient's game client with this addon, the spell token is replaced by a proper local WoW hyperlink if the spell ID is recognized by the client. The rank noted in parentheses is sourced from the website; linked spell IDs may represent the base rank rather than the displayed rank.

## Installation

1. Open your WoW Forever installation and locate `_forever_/Interface/AddOns/` (or your configured Forever client folder).
2. Copy the complete `ForeverBuffLinks` folder into `AddOns`; verify `ForeverBuffLinks.toc` is directly inside it.
3. Restart WoW. If necessary, enable the addon in the character-select AddOns list.
4. Enter `/fbl` to check whether the addon is active.

WoW Forever beta 1.60.1 uses `## Interface: 16001`. Verify the installed client with `/dump select(4, GetBuildInfo())`; this number can change after patches.

## Technical limitations

- A **website-only paste cannot guarantee live hyperlinks** for every recipient. WoW may escape raw hyperlinked text pasted externally.
- The addon is intentionally display-only and runs in each installed recipient's chat UI.
- A link is only generated if `C_Spell.GetSpellLink` or `GetSpellLink` successfully resolves it.
- It has not yet been tested inside a live Forever session. The Lua syntax and simple text-filter logic can be checked statically; test in-game before relying on it.
- All ability IDs from the website are representative base spell IDs; rank-specific ID verification is a separate future data task.

API references: https://warcraft.wiki.gg/wiki/Hyperlinks and https://warcraft.wiki.gg/wiki/API_ChatFrame_AddMessageEventFilter
