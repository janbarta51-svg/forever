-- Forever Buff Links: client-only conversion of readable website tokens.
-- No chat messages are sent; recipients without this addon see the original text.
-- This addon intentionally resolves links from the game's own spell API:
-- unrecognized spell IDs are left as plain text, not forged into hyperlinks.
local events = {
  "CHAT_MSG_SAY", "CHAT_MSG_YELL", "CHAT_MSG_PARTY", "CHAT_MSG_PARTY_LEADER",
  "CHAT_MSG_RAID", "CHAT_MSG_RAID_LEADER", "CHAT_MSG_RAID_WARNING",
  "CHAT_MSG_GUILD", "CHAT_MSG_OFFICER", "CHAT_MSG_WHISPER",
  "CHAT_MSG_WHISPER_INFORM", "CHAT_MSG_INSTANCE_CHAT", "CHAT_MSG_INSTANCE_CHAT_LEADER",
  "CHAT_MSG_CHANNEL"
}

local function getLink(spellID)
  if not spellID or spellID < 1 then return nil end
  if C_Spell and C_Spell.GetSpellLink then
    local ok, link = pcall(C_Spell.GetSpellLink, spellID)
    if ok and type(link) == "string" and link:find("|Hspell:", 1, true) then
      return link
    end
  end
  if GetSpellLink then
    local ok, link = pcall(GetSpellLink, spellID)
    if ok and type(link) == "string" and link:find("|Hspell:", 1, true) then
      return link
    end
  end
  return nil
end

local function filterChat(_, _, message, ...)
  if type(message) ~= "string" or not message:find("{spell:", 1, true) then
    return false
  end
  local changed = false
  -- The label remains readable to users without the addon. The spell ID
  -- is resolved locally to avoid fabricating server-side clickable links.
  local converted = message:gsub("%[([^%]]+)%]%{spell:(%d+)%}", function(name, id)
    local spellID = tonumber(id)
    local link = getLink(spellID)
    if link then
      changed = true
      return link
    end
    return "[" .. name .. "]{spell:" .. id .. "}"
  end)
  if changed then
    return false, converted, ...
  end
  return false
end

if ChatFrame_AddMessageEventFilter then
  for _, eventName in ipairs(events) do
    ChatFrame_AddMessageEventFilter(eventName, filterChat)
  end
end

SLASH_FOREVERBUFFLINKS1 = "/fbl"
SlashCmdList.FOREVERBUFFLINKS = function()
  print("|cffc69b6dForever Buff Links|r: active. Buff tokens from the field guide become clickable locally when the spell is known to your client.")
end
