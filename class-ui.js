/* Verified class colors: https://warcraft.wiki.gg/wiki/Class_colors
 * WoW icon names: https://www.wowhead.com/classic/icons/name:class
 * Assets are loaded from Wowhead's public CDN (rather than redistributed).
 */
window.CLASS_THEME = Object.freeze({
  Warrior:{color:"#C69B6D", icon:"classicon_warrior"},
  Paladin:{color:"#F48CBA", icon:"classicon_paladin"},
  Hunter:{color:"#AAD372", icon:"classicon_hunter"},
  Rogue:{color:"#FFF468", icon:"classicon_rogue"},
  Priest:{color:"#FFFFFF", icon:"classicon_priest"},
  Shaman:{color:"#0070DD", icon:"classicon_shaman"},
  Mage:{color:"#3FC7EB", icon:"classicon_mage"},
  Warlock:{color:"#8788EE", icon:"classicon_warlock"},
  Druid:{color:"#FF7C0A", icon:"classicon_druid"}
});
window.classIconUrl = cls => {
  const entry = window.CLASS_THEME[cls];
  return entry ? "https://wow.zamimg.com/images/wow/icons/medium/" + entry.icon + ".jpg" : "";
};
