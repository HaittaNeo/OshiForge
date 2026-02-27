// OshiForge - static GitHub Pages app
// Generates CSS for MyOshi profile custom CSS

const SHAPES = [
  { value: "square",  label: "Square" },
  { value: "rounded", label: "Rounded" },
  { value: "circle",  label: "Circle" },
  { value: "hex",     label: "Hex" },
  { value: "diamond", label: "Diamond" },
  { value: "octagon", label: "Octagon" },
  { value: "star",    label: "Star" },
  { value: "heart",   label: "Heart" },
  { value: "shield",  label: "Shield" },
];

const DEFAULTS = {
  cPrimary: "#49f6ff",
  cSecondary: "#3b82ff",
  cAccent: "#b36bff",
  cText: "#ebf3ff",
  linkColor: "#49f6ff",
  linkHoverColor: "#3b82ff",
  linkWeight: 700,
  linkUnderline: false,

  fontBody: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Courier New', monospace",
  fontHeader: "inherit",
  baseFontSize: 14,
  lineHeight: 1.55,
  headerFontSize: 12,
  headerLinkSize: 11,
  headerGradStart: "#7fd6ff",
  headerGradMid: "#4ca4ff",
  headerGradEnd: "#78b8ff",
  headerUppercase: true,
  starIcon: "⭐",
  heartIcon: "💚",
  blurbTitleColor: "#ffffff",
  blurbTextColor: "#e6f6ff",
  customHtmlColor: "#c0fced",
  interestTitleColor: "#ffffff",
  interestTextColor: "#e6f6ff",
  taglineColor: "#7cff9b",
  taglineBoxEnabled: true,
  taglineBoxBgColor: "#101624",
  taglineBoxBorderColor: "#49f6ff",
  taglineBoxAlpha: 0.55,
  taglineBoxGlow: 0.8,
  taglineBoxRadius: 16,
  taglineBoxPadding: 10,
  aboutBodyColor: "#ebf3ff",
  headerTextColor: "#ffffff",
  forceReadableText: true,
  preserveLineBreaks: true,

  panelAlpha: 0.78,
  panelBaseColor: "#0a0e16",
  panelHoverBaseColor: "#121a28",
  borderAlpha: 0.22,
  glowStrength: 0.45,

  containerWidth: 980,
  rightColumnMax: 760,
  layoutPreset: "default",
  panelGap: 14,
  cardPadding: 12,
  sectionSpacing: 14,
  cardRadius: 18,
  cardBorderWidth: 1,
  frameEnabled: false,
  frameImageUrl: "",
  frameSlice: 50,
  frameWidth: 10,
  frameRepeat: "round",
  frameRadius: 24,
  frameApplySections: false,
  decorBorderEnabled: false,
  decorBorderStyle: "solid",
  decorBorderWidth: 2,
  decorBorderAlpha: 0.7,
  decorBorderColor: "#7ee6d3",
  decorBorderAltColor: "#c0fced",
  decorBorderGradient: false,
  decorBorderGlow: 0.35,
  decorBorderRadius: 18,
  decorApplySections: false,
  hoverLift: 4,
  hoverScale: 1.0,
  shadowStrength: 1.0,

  uniformLinks: true,
  btnBg: "#101624",
  btnText: "#ebf3ff",
  btnBorder: "#49f6ff",
  btnHoverBg: "#1a2234",
  btnHoverText: "#49f6ff",
  buttonAlpha: 0.78,
  buttonHoverAlpha: 0.86,
  topbarAlpha: 0.55,
  sectionAlpha: 0.70,
  socialAlpha: 0.78,
  glassBlur: 12,
  showTopbar: true,
  showTop8: true,
  showSectionLinks: true,
  showSocialLinks: true,
  showDetails: true,
  showSong: true,
  showComments: true,
  orderTop8: 1,
  orderSocial: 2,
  orderDetails: 3,
  orderSong: 4,
  orderComments: 5,
  leftColumnX: 0,
  leftColumnY: 0,
  rightColumnX: 0,
  rightColumnY: 0,
  top8X: 0,
  top8Y: 0,
  socialX: 0,
  socialY: 0,
  songX: 0,
  songY: 0,
  cardShapeStyle: "rounded",
  buttonShapeStyle: "rounded",
  shapeChamferSize: 14,
  shapeBorderWidth: 1,
  commentsBg: "#101624",
  commentsTextColor: "#ebf3ff",
  commentsBorderColor: "#49f6ff",
  replyBg: "#0a0e16",
  replyTextColor: "#ebf3ff",
  commentsAlpha: 0.72,
  moodBgColor: "#efe8d6",
  moodTextColor: "#1a1f2d",
  moodBorderColor: "#bfa76f",
  fixDarkText: false,
  fixHeaderStyle: false,
  fixCommentContrast: false,

  avatarSize: 220,
  avatarShape: "hex",
  avatarBorder: 2,
  avatarGlow: 1.0,
  nameColor: "#ffffff",
  nameGlow: 0.45,
  avatarLogoEnabled: false,
  avatarLogoUrl: "",
  avatarLogoWidth: 180,
  avatarLogoHeight: 90,
  avatarLogoOffsetY: 6,
  avatarLogoOpacity: 1,

  customShapeCss: "",
  customCursorCss: "",
  extraCss: "",
  snippetAvatarOnly: false,
  snippetTextOnly: false,
  snippetButtonsOnly: false,
  snippetCommentsOnly: false,
  snippetTaglineOnly: false,
  commentPadding: 10,
  replyBorderColor: "#49f6ff",
  commentBordersTransparent: false,
  enableTwoColHelper: false,
};

const BINDINGS = [
  ["cPrimary", "value", "cPrimary"],
  ["cSecondary", "value", "cSecondary"],
  ["cAccent", "value", "cAccent"],
  ["cText", "value", "cText"],
  ["linkColor", "value", "linkColor"],
  ["linkHoverColor", "value", "linkHoverColor"],
  ["linkWeight", "value", "linkWeight"],
  ["linkUnderline", "checked", "linkUnderline"],

  ["fontBody", "value", "fontBody"],
  ["fontHeader", "value", "fontHeader"],
  ["baseFontSize", "value", "baseFontSize"],
  ["lineHeight", "value", "lineHeight"],
  ["headerFontSize", "value", "headerFontSize"],
  ["headerLinkSize", "value", "headerLinkSize"],
  ["headerGradStart", "value", "headerGradStart"],
  ["headerGradMid", "value", "headerGradMid"],
  ["headerGradEnd", "value", "headerGradEnd"],
  ["headerUppercase", "checked", "headerUppercase"],
  ["starIcon", "value", "starIcon"],
  ["heartIcon", "value", "heartIcon"],
  ["blurbTitleColor", "value", "blurbTitleColor"],
  ["blurbTextColor", "value", "blurbTextColor"],
  ["customHtmlColor", "value", "customHtmlColor"],
  ["interestTitleColor", "value", "interestTitleColor"],
  ["interestTextColor", "value", "interestTextColor"],
  ["taglineColor", "value", "taglineColor"],
  ["taglineBoxEnabled", "checked", "taglineBoxEnabled"],
  ["taglineBoxBgColor", "value", "taglineBoxBgColor"],
  ["taglineBoxBorderColor", "value", "taglineBoxBorderColor"],
  ["taglineBoxAlpha", "value", "taglineBoxAlpha"],
  ["taglineBoxGlow", "value", "taglineBoxGlow"],
  ["taglineBoxRadius", "value", "taglineBoxRadius"],
  ["taglineBoxPadding", "value", "taglineBoxPadding"],
  ["aboutBodyColor", "value", "aboutBodyColor"],
  ["headerTextColor", "value", "headerTextColor"],
  ["forceReadableText", "checked", "forceReadableText"],
  ["preserveLineBreaks", "checked", "preserveLineBreaks"],

  ["panelAlpha", "value", "panelAlpha"],
  ["panelBaseColor", "value", "panelBaseColor"],
  ["panelHoverBaseColor", "value", "panelHoverBaseColor"],
  ["borderAlpha", "value", "borderAlpha"],
  ["glowStrength", "value", "glowStrength"],

  ["containerWidth", "value", "containerWidth"],
  ["rightColumnMax", "value", "rightColumnMax"],
  ["layoutPreset", "value", "layoutPreset"],
  ["panelGap", "value", "panelGap"],
  ["cardPadding", "value", "cardPadding"],
  ["sectionSpacing", "value", "sectionSpacing"],
  ["cardRadius", "value", "cardRadius"],
  ["cardBorderWidth", "value", "cardBorderWidth"],
  ["frameEnabled", "checked", "frameEnabled"],
  ["frameImageUrl", "value", "frameImageUrl"],
  ["frameSlice", "value", "frameSlice"],
  ["frameWidth", "value", "frameWidth"],
  ["frameRepeat", "value", "frameRepeat"],
  ["frameRadius", "value", "frameRadius"],
  ["frameApplySections", "checked", "frameApplySections"],
  ["decorBorderEnabled", "checked", "decorBorderEnabled"],
  ["decorBorderStyle", "value", "decorBorderStyle"],
  ["decorBorderWidth", "value", "decorBorderWidth"],
  ["decorBorderAlpha", "value", "decorBorderAlpha"],
  ["decorBorderColor", "value", "decorBorderColor"],
  ["decorBorderAltColor", "value", "decorBorderAltColor"],
  ["decorBorderGradient", "checked", "decorBorderGradient"],
  ["decorBorderGlow", "value", "decorBorderGlow"],
  ["decorBorderRadius", "value", "decorBorderRadius"],
  ["decorApplySections", "checked", "decorApplySections"],
  ["hoverLift", "value", "hoverLift"],
  ["hoverScale", "value", "hoverScale"],
  ["shadowStrength", "value", "shadowStrength"],

  ["uniformLinks", "checked", "uniformLinks"],
  ["btnBg", "value", "btnBg"],
  ["btnText", "value", "btnText"],
  ["btnBorder", "value", "btnBorder"],
  ["btnHoverBg", "value", "btnHoverBg"],
  ["btnHoverText", "value", "btnHoverText"],
  ["buttonAlpha", "value", "buttonAlpha"],
  ["buttonHoverAlpha", "value", "buttonHoverAlpha"],
  ["topbarAlpha", "value", "topbarAlpha"],
  ["sectionAlpha", "value", "sectionAlpha"],
  ["socialAlpha", "value", "socialAlpha"],
  ["glassBlur", "value", "glassBlur"],
  ["showTopbar", "checked", "showTopbar"],
  ["showTop8", "checked", "showTop8"],
  ["showSectionLinks", "checked", "showSectionLinks"],
  ["showSocialLinks", "checked", "showSocialLinks"],
  ["showDetails", "checked", "showDetails"],
  ["showSong", "checked", "showSong"],
  ["showComments", "checked", "showComments"],
  ["orderTop8", "value", "orderTop8"],
  ["orderSocial", "value", "orderSocial"],
  ["orderDetails", "value", "orderDetails"],
  ["orderSong", "value", "orderSong"],
  ["orderComments", "value", "orderComments"],
  ["leftColumnX", "value", "leftColumnX"],
  ["leftColumnY", "value", "leftColumnY"],
  ["rightColumnX", "value", "rightColumnX"],
  ["rightColumnY", "value", "rightColumnY"],
  ["top8X", "value", "top8X"],
  ["top8Y", "value", "top8Y"],
  ["socialX", "value", "socialX"],
  ["socialY", "value", "socialY"],
  ["songX", "value", "songX"],
  ["songY", "value", "songY"],
  ["cardShapeStyle", "value", "cardShapeStyle"],
  ["buttonShapeStyle", "value", "buttonShapeStyle"],
  ["shapeChamferSize", "value", "shapeChamferSize"],
  ["shapeBorderWidth", "value", "shapeBorderWidth"],
  ["commentsBg", "value", "commentsBg"],
  ["commentsTextColor", "value", "commentsTextColor"],
  ["commentsBorderColor", "value", "commentsBorderColor"],
  ["replyBg", "value", "replyBg"],
  ["replyTextColor", "value", "replyTextColor"],
  ["commentsAlpha", "value", "commentsAlpha"],
  ["moodBgColor", "value", "moodBgColor"],
  ["moodTextColor", "value", "moodTextColor"],
  ["moodBorderColor", "value", "moodBorderColor"],
  ["fixDarkText", "checked", "fixDarkText"],
  ["fixHeaderStyle", "checked", "fixHeaderStyle"],
  ["fixCommentContrast", "checked", "fixCommentContrast"],

  ["avatarSize", "value", "avatarSize"],
  ["avatarShape", "value", "avatarShape"],
  ["avatarBorder", "value", "avatarBorder"],
  ["avatarGlow", "value", "avatarGlow"],
  ["nameColor", "value", "nameColor"],
  ["nameGlow", "value", "nameGlow"],
  ["avatarLogoEnabled", "checked", "avatarLogoEnabled"],
  ["avatarLogoUrl", "value", "avatarLogoUrl"],
  ["avatarLogoWidth", "value", "avatarLogoWidth"],
  ["avatarLogoHeight", "value", "avatarLogoHeight"],
  ["avatarLogoOffsetY", "value", "avatarLogoOffsetY"],
  ["avatarLogoOpacity", "value", "avatarLogoOpacity"],

  ["customShapeCss", "value", "customShapeCss"],
  ["customCursorCss", "value", "customCursorCss"],
  ["extraCss", "value", "extraCss"],
  ["snippetAvatarOnly", "checked", "snippetAvatarOnly"],
  ["snippetTextOnly", "checked", "snippetTextOnly"],
  ["snippetButtonsOnly", "checked", "snippetButtonsOnly"],
  ["snippetCommentsOnly", "checked", "snippetCommentsOnly"],
  ["snippetTaglineOnly", "checked", "snippetTaglineOnly"],
  ["commentPadding", "value", "commentPadding"],
  ["replyBorderColor", "value", "replyBorderColor"],
  ["commentBordersTransparent", "checked", "commentBordersTransparent"],
  ["enableTwoColHelper", "checked", "enableTwoColHelper"],
];

const PRESETS = [
  {
    id: "goal-clean-readable",
    name: "Goal: Clean & Readable",
    state: {
      cPrimary: "#75d4ff",
      cSecondary: "#5aa8ff",
      cAccent: "#b7a8ff",
      cText: "#f4f8ff",
      panelAlpha: 0.86,
      borderAlpha: 0.18,
      glowStrength: 0.18,
      headerTextColor: "#ffffff",
      aboutBodyColor: "#ecf4ff",
      forceReadableText: true,
      fixDarkText: true,
      fixHeaderStyle: true,
      fixCommentContrast: true,
      commentsAlpha: 0.82,
    },
  },
  {
    id: "goal-glowy-cyber",
    name: "Goal: Glowy Cyber",
    state: {
      cPrimary: "#49f6ff",
      cSecondary: "#3b82ff",
      cAccent: "#ff6bd8",
      cText: "#ebf8ff",
      glowStrength: 0.55,
      borderAlpha: 0.28,
      taglineBoxEnabled: true,
      taglineBoxGlow: 1.1,
      avatarGlow: 1.2,
      fixHeaderStyle: true,
    },
  },
  {
    id: "goal-soft-pastel",
    name: "Goal: Soft Pastel",
    state: {
      cPrimary: "#b8e3ff",
      cSecondary: "#bfaeff",
      cAccent: "#ffd0e6",
      cText: "#f8fbff",
      panelAlpha: 0.9,
      borderAlpha: 0.14,
      glowStrength: 0.15,
      cardRadius: 22,
      buttonAlpha: 0.72,
      topbarAlpha: 0.5,
      sectionAlpha: 0.72,
      socialAlpha: 0.78,
    },
  },
  {
    id: "neo-cyberglass",
    name: "Neo CyberGlass",
    state: {
      bgUrl: "https://myoshi.jinxxy-cdn.com/backgrounds/user_01kj21f4b6fzxsgz6xxpky3tya/73097151-f08b-48d3-834d-99f19d521c77.png",
      bgPos: "center top",
      bgAttach: "fixed",
      cPrimary: "#49f6ff",
      cSecondary: "#3b82ff",
      cAccent: "#b36bff",
      cText: "#ebf3ff",
      panelAlpha: 0.78,
      borderAlpha: 0.22,
      glowStrength: 0.45,
      cardRadius: 18,
      hoverLift: 4,
      uniformLinks: true,
      btnBg: "#101624",
      btnText: "#ebf3ff",
      btnBorder: "#49f6ff",
      btnHoverBg: "#1a2234",
      btnHoverText: "#49f6ff",
      buttonAlpha: 0.78,
      buttonHoverAlpha: 0.86,
      topbarAlpha: 0.55,
      sectionAlpha: 0.70,
      socialAlpha: 0.78,
      glassBlur: 12,
      avatarSize: 220,
      avatarShape: "hex",
      avatarBorder: 2,
      customShapeCss: "",
    },
  },
  {
    id: "soft-noir",
    name: "Soft Noir",
    state: {
      bgUrl: "",
      cPrimary: "#9ea5ff",
      cSecondary: "#8bb1ff",
      cAccent: "#d2a6ff",
      cText: "#f3f5ff",
      panelAlpha: 0.88,
      borderAlpha: 0.18,
      glowStrength: 0.22,
      cardRadius: 22,
      hoverLift: 3,
      btnBg: "#1b1e33",
      btnText: "#f3f5ff",
      btnBorder: "#9ea5ff",
      btnHoverBg: "#252944",
      btnHoverText: "#d2a6ff",
      buttonAlpha: 0.78,
      buttonHoverAlpha: 0.86,
      topbarAlpha: 0.62,
      sectionAlpha: 0.76,
      socialAlpha: 0.80,
      glassBlur: 14,
      avatarShape: "circle",
      avatarBorder: 2,
    },
  },
  {
    id: "crimson-terminal",
    name: "Crimson Terminal",
    state: {
      bgUrl: "",
      cPrimary: "#ff6b8a",
      cSecondary: "#ff3b5c",
      cAccent: "#ff9f1a",
      cText: "#ffeef2",
      panelAlpha: 0.86,
      borderAlpha: 0.28,
      glowStrength: 0.36,
      cardRadius: 10,
      hoverLift: 2,
      btnBg: "#2a1018",
      btnText: "#ffeef2",
      btnBorder: "#ff6b8a",
      btnHoverBg: "#36151f",
      btnHoverText: "#ff9f1a",
      buttonAlpha: 0.78,
      buttonHoverAlpha: 0.88,
      topbarAlpha: 0.58,
      sectionAlpha: 0.72,
      socialAlpha: 0.79,
      glassBlur: 10,
      avatarShape: "diamond",
      avatarBorder: 3,
    },
  },
  {
    id: "mint-wave",
    name: "Mint Wave",
    state: {
      bgUrl: "",
      cPrimary: "#45ffd1",
      cSecondary: "#28b2ff",
      cAccent: "#7aff8f",
      cText: "#ebfffb",
      panelAlpha: 0.72,
      borderAlpha: 0.2,
      glowStrength: 0.4,
      cardRadius: 24,
      hoverLift: 5,
      btnBg: "#0f2430",
      btnText: "#ebfffb",
      btnBorder: "#45ffd1",
      btnHoverBg: "#163042",
      btnHoverText: "#7aff8f",
      buttonAlpha: 0.72,
      buttonHoverAlpha: 0.82,
      topbarAlpha: 0.48,
      sectionAlpha: 0.66,
      socialAlpha: 0.74,
      glassBlur: 13,
      avatarShape: "rounded",
      avatarBorder: 1,
    },
  },
  {
    id: "frosted-glass",
    name: "Frosted Glass",
    state: {
      bgUrl: "",
      cPrimary: "#9fe7ff",
      cSecondary: "#79b8ff",
      cAccent: "#c7b8ff",
      cText: "#f2f8ff",
      panelAlpha: 0.84,
      borderAlpha: 0.16,
      glowStrength: 0.2,
      cardRadius: 22,
      hoverLift: 3,
      btnBg: "#1a2533",
      btnText: "#f2f8ff",
      btnBorder: "#9fe7ff",
      btnHoverBg: "#243246",
      btnHoverText: "#c7edff",
      buttonAlpha: 0.52,
      buttonHoverAlpha: 0.64,
      topbarAlpha: 0.36,
      sectionAlpha: 0.48,
      socialAlpha: 0.54,
      glassBlur: 18,
      avatarShape: "rounded",
      avatarBorder: 1,
    },
  },
  {
    id: "penplaid-windows-vista",
    name: "Penplaid - Windows Vista",
    state: {
      bgUrl: "",
    },
    overrideCss: `@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&family=Segoe+UI:wght@600&display=swap');

/* ======================================================
   Myoshi Vista - Classic Blue Edition by Penplaid
====================================================== */

.profile-page.profile-custom-css,
.profile-page.profile-custom-css * {
  cursor: url("https://www.rw-designer.com/cursor-view/2314.png"), auto;
}

* {
  font-family: 'Quicksand', sans-serif !important;
}

.card,
.profile-info,
.blurbs,
.contact,
.panel,
.module {
  border: 2px solid rgba(100,150,255,0.4) !important;
  border-radius: 12px !important;
  background-color: rgba(240,248,255,0.35) !important;
  backdrop-filter: blur(6px) !important;
  -webkit-backdrop-filter: blur(6px) !important;
  margin-bottom: 25px !important;
  box-shadow: 10px 14px 25px rgba(50,80,150,0.2) !important;
  position: relative !important;
  overflow: visible !important;
  transition: transform .35s ease, box-shadow .35s ease,
              background-color .35s ease, backdrop-filter .35s ease !important;
}

.card:hover,
.profile-info:hover,
.blurbs:hover,
.contact:hover,
.panel:hover,
.module:hover {
  transform: scale(.98) !important;
  background-color: rgba(240,248,255,0.6) !important;
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
  box-shadow: 3px 5px 10px rgba(50,80,150,0.4) !important;
}

.card-body {
  transform: none !important;
}

.card-header {
  display: flex !important;
  align-items: flex-start !important;
  justify-content: flex-start !important;
  height: auto !important;
  min-height: 52px !important;
  padding: 6px 15px 22px 15px !important;
  padding-right: 90px !important;
  position: relative !important;
  background: linear-gradient(to bottom,
                              #cce7ff 0%,
                              #99ccff 10%,
                              #cce7ff 40%,
                              #66a3ff 80%,
                              #99ccff 100%) !important;
  border: 1px solid #4d94ff !important;
  color: #ffffff !important;
  font-size: 19px !important;
  font-family: 'Segoe UI', sans-serif !important;
  text-shadow: 0 0 6px #ffffff, 0 0 12px #ffffff !important;
}

.card-header * {
  font-family: 'Segoe UI', sans-serif !important;
  margin: 0 !important;
}

.card-header a {
  position: absolute !important;
  left: 15px !important;
  bottom: 4px !important;
  font-size: 11px !important;
  font-weight: 600 !important;
  text-transform: uppercase !important;
  color: #ffffff !important;
  text-shadow: 0 0 4px #ffffff, 0 0 8px #ffffff !important;
}

.card-header::after {
  content: "";
  position: absolute !important;
  top: 50% !important;
  right: 12px !important;
  left: auto !important;
  transform: translateY(-50%) !important;
  width: 65px !important;
  height: 22px !important;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="65" height="22" viewBox="0 0 65 22"><rect x="0" y="2" width="18" height="18" rx="2" fill="none" stroke="white" stroke-width="1.5"/><text x="5" y="15" fill="white" font-family="Arial" font-weight="bold" font-size="12">_</text><rect x="22" y="2" width="18" height="18" rx="2" fill="none" stroke="white" stroke-width="1.5"/><text x="26" y="15" fill="white" font-family="Arial" font-weight="bold" font-size="12">□</text><rect x="44" y="2" width="18" height="18" rx="2" fill="%23ff4d4d" stroke="white" stroke-width="1.5"/><text x="49" y="16" fill="white" font-family="Arial" font-weight="bold" font-size="12">X</text></svg>') no-repeat !important;
  background-size: contain !important;
}

.btn,
.btn-primary,
button,
input[type="submit"],
.add-comment-btn,
.contact .btn,
.links a,
.links-blurb a {
  background: linear-gradient(to bottom,#cce7ff,#99ccff) !important;
  border: 2px solid #4d94ff !important;
  color: white !important;
  border-radius: 20px !important;
  font-weight: bold !important;
  padding: 4px 12px !important;
  display: inline-block !important;
  transition: .25s ease !important;
}

.btn:hover,
button:hover,
.links-blurb a:hover {
  background: #66a3ff !important;
  transform: scale(1.05) !important;
}

p, td, div, span, b, strong, .panel-body {
  color: #2f2f2f !important;
}

a, a:link {
  color: #4d94ff !important;
  font-weight: 700 !important;
}

.profile-page.profile-custom-css ::-webkit-scrollbar {
  width: 12px;
  height: 12px;
}

.profile-page.profile-custom-css ::-webkit-scrollbar-track {
  background: rgba(204,231,255,0.3);
  border-radius: 10px;
}

.profile-page.profile-custom-css ::-webkit-scrollbar-thumb {
  background: linear-gradient(#cce7ff,#99ccff);
  border-radius: 10px;
}

.profile-page.profile-custom-css ::-webkit-scrollbar-thumb:hover {
  background: #66a3ff;
}

.card-header.starred::before { content: "⭐" !important; font-size: 12px; }
.card-header.hearted::before { content: "💚" !important; font-size: 12px; }`,
  },
  {
    id: "minimal-ice",
    name: "Minimal Ice",
    state: {
      bgUrl: "",
      cPrimary: "#cfe7ff",
      cSecondary: "#a9cbff",
      cAccent: "#d6beff",
      cText: "#f6f9ff",
      panelAlpha: 0.9,
      borderAlpha: 0.12,
      glowStrength: 0.15,
      cardRadius: 16,
      hoverLift: 2,
      btnBg: "#1c2632",
      btnText: "#f6f9ff",
      btnBorder: "#cfe7ff",
      btnHoverBg: "#273544",
      btnHoverText: "#a9cbff",
      buttonAlpha: 0.74,
      buttonHoverAlpha: 0.84,
      topbarAlpha: 0.52,
      sectionAlpha: 0.68,
      socialAlpha: 0.76,
      glassBlur: 8,
      avatarShape: "square",
      avatarBorder: 1,
    },
  },
];

const STORAGE_KEY = "oshiforge_state_v2";
const UI_MODE_KEY = "oshiforge_ui_mode_v1";

const SIMPLE_CONTROL_IDS = new Set([
  "presetSelect", "btnRandomPalette", "btnCopy", "btnSaveDraft", "btnLoadDraft", "btnExportTheme", "btnImportTheme",
  "snippetAvatarOnly", "snippetTextOnly", "snippetButtonsOnly", "snippetCommentsOnly", "snippetTaglineOnly",
  "fixDarkText", "fixHeaderStyle", "fixCommentContrast",
  "cPrimary", "cSecondary", "cAccent", "cText", "linkColor", "linkHoverColor", "linkUnderline",
  "containerWidth", "layoutPreset", "rightColumnMax", "cardRadius", "cardPadding",
  "fontBody", "headerTextColor", "baseFontSize",
  "panelAlpha", "glassBlur",
  "avatarShape", "avatarSize", "avatarGlow", "nameColor", "nameGlow",
  "avatarLogoEnabled", "avatarLogoWidth", "avatarLogoHeight", "avatarLogoOpacity",
  "btnBg", "btnText", "btnBorder", "btnHoverBg", "btnHoverText",
  "blurbTextColor", "interestTextColor", "aboutBodyColor", "taglineColor",
  "taglineBoxEnabled", "taglineBoxBgColor", "taglineBoxBorderColor", "taglineBoxGlow",
  "commentsBg", "commentsTextColor", "replyBg", "replyTextColor", "commentBordersTransparent",
  "showTopbar", "showTop8", "showSectionLinks", "showSocialLinks", "showDetails", "showSong", "showComments",
  "forceReadableText",
]);

let state = { ...DEFAULTS };
let activePresetCss = "";

const $ = (id) => document.getElementById(id);

function clamp(n, a, b){ return Math.max(a, Math.min(b, n)); }

function hexToRgb(hex) {
  const h = hex.replace("#","").trim();
  const full = h.length === 3 ? h.split("").map(x=>x+x).join("") : h;
  const n = parseInt(full, 16);
  return { r:(n>>16)&255, g:(n>>8)&255, b:n&255 };
}
function rgba(hex, a){
  const {r,g,b} = hexToRgb(hex);
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function cssUrl(rawUrl){
  const url = String(rawUrl || "").trim();
  const safe = url
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, "");
  return `url("${safe}")`;
}

function cssContentString(value){
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
    .replace(/\r?\n/g, " ");
}

function normalizeLegacyScope(css){
  // MyOshi now auto-scopes profile CSS. Keep compatibility by reducing old
  // root selector to .profile-custom-css instead of hard-requiring .profile-page.
  return String(css || "").replace(/\.profile-page\.profile-custom-css/g, ".profile-custom-css");
}

function getDisallowedImports(css){
  const allowedHosts = [
    "fonts.googleapis.com",
    "fonts.gstatic.com",
    "fonts.bunny.net",
    "use.typekit.net",
    "cdnjs.cloudflare.com",
  ];
  const bad = [];
  const re = /@import\s+(?:url\(\s*)?['"]?([^'")\s;]+)['"]?\s*\)?/gi;
  let m;
  while ((m = re.exec(String(css || ""))) !== null){
    const raw = String(m[1] || "").trim();
    if (!raw) continue;
    if (/^data:/i.test(raw)) continue;
    let parsed;
    try{
      parsed = new URL(raw);
    }catch{
      bad.push(raw);
      continue;
    }
    if (parsed.protocol !== "https:"){
      bad.push(raw);
      continue;
    }
    const host = parsed.hostname.toLowerCase();
    const ok = allowedHosts.some((h) => host === h || host.endsWith(`.${h}`));
    if (!ok) bad.push(raw);
  }
  return Array.from(new Set(bad));
}

function setHint(id, text){ $(id).textContent = text; }

function flashButton(id, text, fallback, ms = 900){
  const el = $(id);
  if (!el) return;
  el.textContent = text;
  setTimeout(() => { el.textContent = fallback; }, ms);
}

function normalizeState(candidate){
  const next = { ...DEFAULTS };
  const src = candidate && typeof candidate === "object" ? candidate : {};
  for (const key of Object.keys(DEFAULTS)){
    if (!(key in src)) continue;
    const def = DEFAULTS[key];
    const value = src[key];
    if (typeof def === "number"){
      const n = Number(value);
      if (Number.isFinite(n)) next[key] = n;
    } else if (typeof def === "boolean"){
      next[key] = Boolean(value);
    } else if (typeof def === "string"){
      next[key] = String(value);
    }
  }
  return next;
}

function syncUIFromState(){
  for (const [id, prop, key] of BINDINGS){
    const el = $(id);
    if (!el) continue;
    el[prop] = state[key];
  }
}

function saveDraft(){
  try{
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  }catch{
    return false;
  }
}

function loadDraft(silent = false){
  try{
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    state = normalizeState(parsed);
    syncUIFromState();
    renderAll(false);
    if (!silent) flashButton("btnLoadDraft", "Loaded", "Load Draft");
    return true;
  }catch{
    return false;
  }
}

function applyPresetById(id){
  const preset = PRESETS.find(p => p.id === id);
  if (!preset) return;
  state = normalizeState({ ...DEFAULTS, ...preset.state });
  activePresetCss = preset.overrideCss || "";
  syncUIFromState();
  renderAll();
}

function hslToHex(h, s, l){
  const sat = clamp(s, 0, 100) / 100;
  const light = clamp(l, 0, 100) / 100;
  const c = (1 - Math.abs(2 * light - 1)) * sat;
  const hp = ((h % 360) + 360) % 360 / 60;
  const x = c * (1 - Math.abs((hp % 2) - 1));
  let r = 0, g = 0, b = 0;
  if (hp >= 0 && hp < 1) [r, g, b] = [c, x, 0];
  else if (hp < 2) [r, g, b] = [x, c, 0];
  else if (hp < 3) [r, g, b] = [0, c, x];
  else if (hp < 4) [r, g, b] = [0, x, c];
  else if (hp < 5) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  const m = light - c / 2;
  const toHex = (n) => Math.round((n + m) * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function randomizePalette(){
  const base = Math.floor(Math.random() * 360);
  state.cPrimary = hslToHex(base, 92, 64);
  state.cSecondary = hslToHex(base + 30, 88, 58);
  state.cAccent = hslToHex(base + 300, 82, 66);
  state.cText = hslToHex(base + 190, 48, 94);
  state.linkColor = state.cPrimary;
  state.linkHoverColor = state.cSecondary;
  syncUIFromState();
  renderAll();
}

function initTabs(){
  const tabs = Array.from(document.querySelectorAll(".tabBtn"));
  const panels = Array.from(document.querySelectorAll(".tabPanel"));
  const activate = (name) => {
    tabs.forEach((btn) => btn.classList.toggle("active", btn.dataset.tab === name));
    panels.forEach((panel) => panel.classList.toggle("active", panel.dataset.tabPanel === name));
    applyUiMode();
  };
  tabs.forEach((btn) => {
    btn.addEventListener("click", () => activate(btn.dataset.tab));
  });
}

function getActivePanel(){
  return document.querySelector(".tabPanel.active");
}

function applyUiMode(){
  const mode = ($("uiMode") && $("uiMode").value) || "simple";
  const panel = getActivePanel();
  const advTabBtn = document.querySelector('.tabBtn[data-tab="advanced"]');
  if (advTabBtn) advTabBtn.style.display = mode === "simple" ? "none" : "";
  if (mode === "simple" && panel && panel.dataset.tabPanel === "advanced"){
    const startTab = document.querySelector('.tabBtn[data-tab="presets"]');
    if (startTab) startTab.click();
    return;
  }
  if (!panel) return;
  const rows = panel.querySelectorAll(".row");
  rows.forEach((row) => {
    row.classList.remove("hiddenByMode");
    if (mode !== "simple") return;
    const controls = row.querySelectorAll("input[id], select[id], textarea[id], button[id]");
    if (!controls.length) return;
    const hasSimple = Array.from(controls).some((el) => SIMPLE_CONTROL_IDS.has(el.id));
    if (!hasSimple) row.classList.add("hiddenByMode");
  });
}

function initSectionGroups(){
  const panels = Array.from(document.querySelectorAll(".tabPanel"));
  panels.forEach((panel) => {
    const heads = Array.from(panel.querySelectorAll(":scope > h2"));
    heads.forEach((h2, idx) => {
      if (h2.parentElement && h2.parentElement.classList.contains("sectionHeader")) return;
      const groupClass = `section-${panel.dataset.tabPanel}-${idx}`;
      const wrap = document.createElement("div");
      wrap.className = "sectionHeader";
      const toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "sectionToggle";
      toggle.textContent = "Hide";
      h2.parentNode.insertBefore(wrap, h2);
      wrap.appendChild(h2);
      wrap.appendChild(toggle);
      let sib = wrap.nextElementSibling;
      const groupNodes = [];
      while (sib && !(sib.classList.contains("sectionHeader")) && sib.tagName !== "H2"){
        groupNodes.push(sib);
        sib.classList.add(groupClass);
        sib = sib.nextElementSibling;
      }
      toggle.addEventListener("click", () => {
        const hidden = toggle.textContent === "Show";
        groupNodes.forEach((n) => { n.style.display = hidden ? "" : "none"; });
        toggle.textContent = hidden ? "Hide" : "Show";
      });
    });
  });
}

function resetCurrentTabToDefaults(){
  const panel = getActivePanel();
  if (!panel) return;
  const controls = panel.querySelectorAll("input[id], select[id], textarea[id]");
  const ids = new Set(Array.from(controls).map((el) => el.id));
  for (const [id, , key] of BINDINGS){
    if (ids.has(id)) state[key] = DEFAULTS[key];
  }
  syncUIFromState();
  renderAll();
}

function initUsabilityTools(){
  const mode = localStorage.getItem(UI_MODE_KEY);
  if ($("uiMode") && (mode === "simple" || mode === "advanced")) $("uiMode").value = mode;
  $("uiMode").addEventListener("change", () => {
    localStorage.setItem(UI_MODE_KEY, $("uiMode").value);
    applyUiMode();
  });
  $("btnResetSection").addEventListener("click", resetCurrentTabToDefaults);
}

function initUI(){
  initTabs();
  initSectionGroups();
  initUsabilityTools();
  // Populate shapes select
  const sel = $("avatarShape");
  sel.innerHTML = SHAPES.map(s => `<option value="${s.value}">${s.label}</option>`).join("");

  const presetSel = $("presetSelect");
  presetSel.innerHTML = PRESETS.map(p => `<option value="${p.id}">${p.name}</option>`).join("");
  presetSel.addEventListener("input", () => applyPresetById(presetSel.value));
  presetSel.addEventListener("change", () => applyPresetById(presetSel.value));

  if (!loadDraft(true)){
    state = { ...DEFAULTS };
  }

  // Apply state to UI, then wire listeners
  syncUIFromState();
  for (const [id, prop, key] of BINDINGS){
    const el = $(id);
    const onChange = () => {
      const v = (prop === "checked") ? el.checked : el[prop];
      state[key] = (typeof DEFAULTS[key] === "number") ? Number(v) : v;
      renderAll();
    };
    el.addEventListener("input", onChange);
    el.addEventListener("change", onChange);
  }

  $("btnReset").addEventListener("click", () => {
    state = { ...DEFAULTS };
    activePresetCss = "";
    syncUIFromState();
    renderAll();
  });

  $("btnRandomPalette").addEventListener("click", () => {
    randomizePalette();
    flashButton("btnRandomPalette", "Shuffled", "Random Palette");
  });

  $("btnSaveDraft").addEventListener("click", () => {
    const ok = saveDraft();
    flashButton("btnSaveDraft", ok ? "Saved" : "Failed", "Save Draft");
  });

  $("btnLoadDraft").addEventListener("click", () => {
    const ok = loadDraft();
    if (!ok) flashButton("btnLoadDraft", "No Draft", "Load Draft");
  });

  $("btnExportTheme").addEventListener("click", () => {
    const payload = {
      app: "oshiforge",
      version: 1,
      exportedAt: new Date().toISOString(),
      state,
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "oshiforge-theme.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    flashButton("btnExportTheme", "Exported", "Export Theme");
  });

  $("btnImportTheme").addEventListener("click", () => {
    $("themeFile").click();
  });

  $("themeFile").addEventListener("change", async (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    try{
      const text = await file.text();
      const parsed = JSON.parse(text);
      const incoming = parsed && parsed.state ? parsed.state : parsed;
      state = normalizeState({ ...DEFAULTS, ...incoming });
      syncUIFromState();
      renderAll();
      flashButton("btnImportTheme", "Imported", "Import Theme");
    }catch{
      alert("Import failed - invalid theme JSON.");
    }finally{
      e.target.value = "";
    }
  });

  $("btnCopy").addEventListener("click", async () => {
    const text = $("cssOut").value;
    try{
      await navigator.clipboard.writeText(text);
      $("btnCopy").textContent = "Copied!";
      setTimeout(()=> $("btnCopy").textContent = "Copy CSS", 900);
    }catch{
      alert("Copy failed - select the CSS and copy manually.");
    }
  });

  renderAll(false);
}

function getAvatarGeometry(shape){
  // Returns { clipPath, radius, maskSvg } where:
  // - clipPath string if using clip-path
  // - radius string for border-radius fallback
  // - maskSvg string (data URI) if using mask-image
  // We prefer clip-path for geometric shapes, mask for heart.

  const hex = "polygon(25% 6%, 75% 6%, 100% 50%, 75% 94%, 25% 94%, 0% 50%)";
  const diamond = "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)";
  const octagon = "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)";
  const star = "polygon(50% 3%, 61% 35%, 95% 35%, 67% 55%, 78% 88%, 50% 69%, 22% 88%, 33% 55%, 5% 35%, 39% 35%)";
  const shield = "polygon(50% 0%, 90% 12%, 92% 50%, 50% 100%, 8% 50%, 10% 12%)";

  if (shape === "square"){
    return { clipPath: null, radius: "0px", maskSvg: null };
  }
  if (shape === "rounded"){
    return { clipPath: null, radius: "16px", maskSvg: null };
  }
  if (shape === "circle"){
    return { clipPath: "circle(50% at 50% 50%)", radius: "999px", maskSvg: null };
  }
  if (shape === "hex"){
    return { clipPath: hex, radius: "0px", maskSvg: null };
  }
  if (shape === "diamond"){
    return { clipPath: diamond, radius: "0px", maskSvg: null };
  }
  if (shape === "octagon"){
    return { clipPath: octagon, radius: "0px", maskSvg: null };
  }
  if (shape === "star"){
    return { clipPath: star, radius: "0px", maskSvg: null };
  }
  if (shape === "shield"){
    return { clipPath: shield, radius: "0px", maskSvg: null };
  }
  if (shape === "heart"){
    // Mask-based heart (more consistent than clip-path: path())
    const svg = encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 29">
        <path fill="white" d="M23.6,0c-2.7,0-5.1,1.3-6.6,3.3C15.5,1.3,13.1,0,10.4,0
        C5.9,0,2.3,3.6,2.3,8.1c0,9.1,14.7,20.9,14.7,20.9S31.7,17.2,31.7,8.1
        C31.7,3.6,28.1,0,23.6,0z"/>
      </svg>
    `).replace(/%0A/g,"").replace(/%20/g," ");
    const data = `data:image/svg+xml,${svg}`;
    return { clipPath: null, radius: "0px", maskSvg: data };
  }

  return { clipPath: null, radius: "0px", maskSvg: null };
}

function buildCss(){
  const selector = ".profile-page.profile-custom-css";

  const primary = state.cPrimary;
  const secondary = state.cSecondary;
  const accent = state.cAccent;
  const text = state.cText;
  const linkColor = state.linkColor;
  const linkHoverColor = state.linkHoverColor;
  const linkWeight = clamp(state.linkWeight, 400, 900);
  const linkUnderline = state.linkUnderline ? "underline" : "none";
  const fontBody = state.fontBody;
  const fontHeader = state.fontHeader;
  const baseFontSize = clamp(state.baseFontSize, 12, 20);
  const lineHeight = clamp(state.lineHeight, 1.2, 2);
  const headerFontSize = clamp(state.headerFontSize, 12, 28);
  const headerLinkSize = clamp(state.headerLinkSize, 9, 16);
  const headerGradStart = state.headerGradStart;
  const headerGradMid = state.headerGradMid;
  const headerGradEnd = state.headerGradEnd;
  const headerUppercase = state.headerUppercase ? "uppercase" : "none";
  const starIcon = cssContentString((state.starIcon || "").trim() || "⭐");
  const heartIcon = cssContentString((state.heartIcon || "").trim() || "💚");
  const blurbTitleColor = state.blurbTitleColor;
  const blurbTextColor = state.blurbTextColor;
  const customHtmlColor = state.customHtmlColor;
  const interestTitleColor = state.interestTitleColor;
  const interestTextColor = state.interestTextColor;
  const taglineColor = state.taglineColor;
  const taglineBoxEnabled = Boolean(state.taglineBoxEnabled);
  const taglineBoxBgColor = state.taglineBoxBgColor;
  const taglineBoxBorderColor = state.taglineBoxBorderColor;
  const taglineBoxAlpha = clamp(state.taglineBoxAlpha, 0.1, 1);
  const taglineBoxGlow = clamp(state.taglineBoxGlow, 0, 2);
  const taglineBoxRadius = clamp(state.taglineBoxRadius, 0, 30);
  const taglineBoxPadding = clamp(state.taglineBoxPadding, 4, 24);
  const aboutBodyColor = state.aboutBodyColor;
  const headerTextColor = state.headerTextColor;
  const forceReadableText = Boolean(state.forceReadableText);
  const forceReadableTextFinal = forceReadableText || Boolean(state.fixDarkText);
  const preserveLineBreaks = Boolean(state.preserveLineBreaks);

  const panelBaseColor = state.panelBaseColor;
  const panelHoverBaseColor = state.panelHoverBaseColor;
  const panel = rgba(panelBaseColor, clamp(state.panelAlpha, 0.2, 0.95));
  const border = rgba(primary, clamp(state.borderAlpha, 0.05, 0.9));
  const buttonBg = state.btnBg;
  const buttonText = state.btnText;
  const buttonBorder = state.btnBorder;
  const buttonHoverBg = state.btnHoverBg;
  const buttonHoverText = state.btnHoverText;
  const buttonAlpha = clamp(state.buttonAlpha, 0.1, 0.95);
  const buttonHoverAlpha = clamp(state.buttonHoverAlpha, 0.1, 0.98);
  const topbarAlpha = clamp(state.topbarAlpha, 0.05, 0.95);
  const sectionAlpha = clamp(state.sectionAlpha, 0.05, 0.95);
  const socialAlpha = clamp(state.socialAlpha, 0.05, 0.95);
  const glassBlur = clamp(state.glassBlur, 0, 24);
  const glassBlurSoft = clamp(glassBlur - 2, 0, 24);
  const commentsBg = state.commentsBg;
  const commentsTextColor = state.commentsTextColor;
  const commentsBorderColor = state.commentsBorderColor;
  const replyBg = state.replyBg;
  const replyTextColor = state.replyTextColor;
  const commentsAlpha = clamp(state.commentsAlpha, 0.1, 1);
  const fixHeaderStyle = Boolean(state.fixHeaderStyle);
  const fixCommentContrast = Boolean(state.fixCommentContrast);
  const commentsTextFinal = fixCommentContrast ? "#f5f8ff" : commentsTextColor;
  const replyTextFinal = fixCommentContrast ? "#f5f8ff" : replyTextColor;
  const commentsAlphaFinal = fixCommentContrast ? Math.max(commentsAlpha, 0.82) : commentsAlpha;
  const moodBgColor = state.moodBgColor;
  const moodTextColor = state.moodTextColor;
  const moodBorderColor = state.moodBorderColor;
  const commentPadding = clamp(state.commentPadding, 0, 26);
  const replyBorderColor = state.replyBorderColor;
  const commentBordersTransparent = Boolean(state.commentBordersTransparent);
  const commentBorderFinal = commentBordersTransparent ? "transparent" : rgba(commentsBorderColor, 0.45);
  const replyBorderFinal = commentBordersTransparent ? "transparent" : rgba(replyBorderColor, 0.45);
  const enableTwoColHelper = Boolean(state.enableTwoColHelper);
  const presetCssRaw = String(activePresetCss || "").trim();
  const presetImports = presetCssRaw.match(/^\s*@import[^;]+;\s*$/gm) || [];
  const presetCssBody = presetCssRaw.replace(/^\s*@import[^;]+;\s*$/gm, "").trim();
  const fontImports = [];
  if (`${fontBody} ${fontHeader}`.includes("Quicksand")){
    fontImports.push("@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@500;700&display=swap');");
  }
  if (`${fontBody} ${fontHeader}`.includes("Playfair Display")){
    fontImports.push("@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap');");
  }

  const glow = clamp(state.glowStrength, 0, 1);
  const containerWidth = clamp(state.containerWidth, 760, 1400);
  const rightColumnMax = clamp(state.rightColumnMax, 420, 1100);
  const layoutPreset = ["default", "single", "leftFocus", "rightFocus", "wiredStack"].includes(state.layoutPreset) ? state.layoutPreset : "default";
  const panelGap = clamp(state.panelGap, 8, 40);
  const cardPadding = clamp(state.cardPadding, 6, 30);
  const sectionSpacing = clamp(state.sectionSpacing, 6, 30);
  const glowSoft = `0 0 ${Math.round(18 + 24*glow)}px ${rgba(primary, 0.10 + 0.25*glow)}, 0 0 ${Math.round(42 + 70*glow)}px ${rgba(secondary, 0.06 + 0.14*glow)}`;
  const glowStrong = `0 0 ${Math.round(40 + 60*glow)}px ${rgba(primary, 0.22 + 0.38*glow)}, 0 0 ${Math.round(90 + 120*glow)}px ${rgba(secondary, 0.08 + 0.18*glow)}`;

  const cardRadius = clamp(state.cardRadius, 0, 28);
  const cardBorderWidth = clamp(state.cardBorderWidth, 0, 4);
  const frameEnabled = Boolean(state.frameEnabled && String(state.frameImageUrl || "").trim());
  const frameImage = cssUrl(state.frameImageUrl);
  const frameSlice = clamp(state.frameSlice, 1, 120);
  const frameWidth = clamp(state.frameWidth, 1, 24);
  const frameRepeat = ["round", "stretch", "repeat"].includes(state.frameRepeat) ? state.frameRepeat : "round";
  const frameRadius = clamp(state.frameRadius, 0, 40);
  const frameApplySections = Boolean(state.frameApplySections);
  const decorBorderEnabled = Boolean(state.decorBorderEnabled);
  const decorBorderStyle = ["solid", "double", "dashed", "dotted"].includes(state.decorBorderStyle) ? state.decorBorderStyle : "solid";
  const decorBorderWidth = clamp(state.decorBorderWidth, 1, 12);
  const decorBorderAlpha = clamp(state.decorBorderAlpha, 0.1, 1);
  const decorBorderColor = state.decorBorderColor;
  const decorBorderAltColor = state.decorBorderAltColor;
  const decorBorderGradient = Boolean(state.decorBorderGradient);
  const decorBorderGlow = clamp(state.decorBorderGlow, 0, 1);
  const decorBorderRadius = clamp(state.decorBorderRadius, 0, 40);
  const decorApplySections = Boolean(state.decorApplySections);
  const lift = clamp(state.hoverLift, 0, 10);
  const hoverScale = clamp(state.hoverScale, 0.95, 1.08);
  const shadowStrength = clamp(state.shadowStrength, 0, 1.5);
  const orderTop8 = clamp(state.orderTop8, 1, 10);
  const orderSocial = clamp(state.orderSocial, 1, 10);
  const orderDetails = clamp(state.orderDetails, 1, 10);
  const orderSong = clamp(state.orderSong, 1, 10);
  const orderComments = clamp(state.orderComments, 1, 10);
  const leftColumnX = clamp(state.leftColumnX, -300, 300);
  const leftColumnY = clamp(state.leftColumnY, -300, 300);
  const rightColumnX = clamp(state.rightColumnX, -300, 300);
  const rightColumnY = clamp(state.rightColumnY, -300, 300);
  const top8X = clamp(state.top8X, -300, 300);
  const top8Y = clamp(state.top8Y, -300, 300);
  const socialX = clamp(state.socialX, -300, 300);
  const socialY = clamp(state.socialY, -300, 300);
  const songX = clamp(state.songX, -300, 300);
  const songY = clamp(state.songY, -300, 300);
  const cardShapeStyle = ["rounded", "chamfer", "hex"].includes(state.cardShapeStyle) ? state.cardShapeStyle : "rounded";
  const buttonShapeStyle = ["rounded", "pill", "square", "chamfer"].includes(state.buttonShapeStyle) ? state.buttonShapeStyle : "rounded";
  const shapeChamferSize = clamp(state.shapeChamferSize, 4, 30);
  const shapeBorderWidth = clamp(state.shapeBorderWidth, 0, 4);

  // Avatar geometry
  const geo = getAvatarGeometry(state.avatarShape);
  const avatarSize = clamp(state.avatarSize, 80, 280);
  const avatarBorder = clamp(state.avatarBorder, 0, 6);
  const avatarGlow = clamp(state.avatarGlow, 0, 2);
  const nameColor = state.nameColor;
  const nameGlow = clamp(state.nameGlow, 0, 2);
  const avatarLogoEnabled = Boolean(state.avatarLogoEnabled && String(state.avatarLogoUrl || "").trim());
  const avatarLogoWidth = clamp(state.avatarLogoWidth, 40, 420);
  const avatarLogoHeight = clamp(state.avatarLogoHeight, 20, 260);
  const avatarLogoOffsetY = clamp(state.avatarLogoOffsetY, -80, 120);
  const avatarLogoOpacity = clamp(state.avatarLogoOpacity, 0, 1);
  const avatarLogoImage = cssUrl(state.avatarLogoUrl);
  const avatarMediaSelector = [
    `${selector} img.user-avatar.profile-avatar`,
    `${selector} .profile-main-card img.user-avatar`,
    `${selector} .profile-main-card img.profile-avatar`,
    `${selector} .profile-main-card img[class*="avatar"]`,
    `${selector} .profile-main-card [class*="avatar"] img`,
    `${selector} .profile-main-card .avatar img`,
  ].join(", ");
  const avatarBoxSelector = [
    `${selector} .profile-main-card [class*="avatar"]`,
    `${selector} .profile-main-card .avatar`,
    `${selector} .profile-main-card .profile-avatar-wrap`,
  ].join(", ");

  // Build CSS
  let css = "";
  css += `/* Code generated by OshiForge | @HaittaNEO */\n\n`;
  if (fontImports.length){
    css += `${Array.from(new Set(fontImports)).join("\n")}\n\n`;
  }
  if (presetImports.length){
    css += `${presetImports.join("\n")}\n\n`;
  }
  css += `${selector}{\n`;
  css += `  --of-primary: ${primary};\n`;
  css += `  --of-secondary: ${secondary};\n`;
  css += `  --of-accent: ${accent};\n`;
  css += `  --of-text: ${text};\n`;
  css += `  --of-panel: ${panel};\n`;
  css += `  --of-border: ${border};\n`;
  css += `  --of-shadow: 0 14px 40px rgba(0,0,0,0.62);\n`;
  css += `  --of-glow: ${glowSoft};\n`;
  css += `  --of-glow-strong: ${glowStrong};\n`;
  css += `  color: rgba(235,243,255,0.92);\n`;
  css += `  font-family: ${fontBody};\n`;
  css += `  font-size: ${baseFontSize}px;\n`;
  css += `  line-height: ${lineHeight};\n`;
  css += `}\n\n`;

  // Core containers
  css += `${selector} .container{max-width:${containerWidth}px !important;background:transparent !important;}\n`;
  css += `${selector} .profile-layout{gap:${panelGap}px !important;}\n`;
  css += `${selector} .profile-right{max-width:${rightColumnMax}px !important;display:flex !important;flex-direction:column !important;}\n`;
  if (layoutPreset === "single"){
    css += `${selector} .profile-layout{display:grid !important;grid-template-columns:1fr !important;}\n`;
    css += `${selector} .profile-left, ${selector} .profile-right{max-width:${Math.min(containerWidth - 40, 920)}px !important;margin:0 auto !important;}\n`;
  } else if (layoutPreset === "leftFocus"){
    css += `${selector} .profile-layout{display:grid !important;grid-template-columns:420px 1fr !important;}\n`;
  } else if (layoutPreset === "rightFocus"){
    css += `${selector} .profile-layout{display:grid !important;grid-template-columns:280px 1fr !important;}\n`;
  } else if (layoutPreset === "wiredStack"){
    css += `${selector} .profile-layout{display:flex !important;flex-direction:column !important;align-items:center !important;gap:${Math.max(16,panelGap)}px !important;}\n`;
    css += `${selector} .profile-left{max-width:440px !important;width:100% !important;}\n`;
    css += `${selector} .profile-right{max-width:${rightColumnMax}px !important;width:100% !important;}\n`;
  }
  css += `${selector} .profile-left{transform:translate(${leftColumnX}px, ${leftColumnY}px) !important;}\n`;
  css += `${selector} .profile-right{transform:translate(${rightColumnX}px, ${rightColumnY}px) !important;}\n`;
  css += `${selector} .mod-top8{order:${orderTop8} !important;transform:translate(${top8X}px, ${top8Y}px) !important;}\n`;
  css += `${selector} .mod-social{order:${orderSocial} !important;transform:translate(${socialX}px, ${socialY}px) !important;}\n`;
  css += `${selector} .mod-details{order:${orderDetails} !important;}\n`;
  css += `${selector} .mod-song{order:${orderSong} !important;transform:translate(${songX}px, ${songY}px) !important;}\n`;
  css += `${selector} .mod-comments{order:${orderComments} !important;}\n`;
  if (cardShapeStyle === "chamfer"){
    const chamfer = `polygon(${shapeChamferSize}px 0, calc(100% - ${shapeChamferSize}px) 0, 100% ${shapeChamferSize}px, 100% calc(100% - ${shapeChamferSize}px), calc(100% - ${shapeChamferSize}px) 100%, ${shapeChamferSize}px 100%, 0 calc(100% - ${shapeChamferSize}px), 0 ${shapeChamferSize}px)`;
    css += `${selector} .card{border-radius:0 !important;clip-path:${chamfer} !important;-webkit-clip-path:${chamfer} !important;border-width:${shapeBorderWidth}px !important;}\n`;
  } else if (cardShapeStyle === "hex"){
    css += `${selector} .card{border-radius:0 !important;clip-path:polygon(2% 10%, 10% 2%, 90% 2%, 98% 10%, 98% 90%, 90% 98%, 10% 98%, 2% 90%) !important;-webkit-clip-path:polygon(2% 10%, 10% 2%, 90% 2%, 98% 10%, 98% 90%, 90% 98%, 10% 98%, 2% 90%) !important;border-width:${shapeBorderWidth}px !important;}\n`;
  } else {
    css += `${selector} .card{clip-path:none !important;-webkit-clip-path:none !important;border-radius:${cardRadius}px !important;border-width:${shapeBorderWidth > 0 ? shapeBorderWidth : cardBorderWidth}px !important;}\n`;
  }
  if (buttonShapeStyle === "pill"){
    css += `${selector} .profile-contact-links a.contact-link, ${selector} .profile-contact-links a.boop-link, ${selector} a.contact-link, ${selector} a.boop-link, ${selector} .social-links-list .social-link-item{border-radius:999px !important;clip-path:none !important;-webkit-clip-path:none !important;}\n`;
  } else if (buttonShapeStyle === "square"){
    css += `${selector} .profile-contact-links a.contact-link, ${selector} .profile-contact-links a.boop-link, ${selector} a.contact-link, ${selector} a.boop-link, ${selector} .social-links-list .social-link-item{border-radius:0 !important;clip-path:none !important;-webkit-clip-path:none !important;}\n`;
  } else if (buttonShapeStyle === "chamfer"){
    const bChamfer = `polygon(${Math.max(6, Math.round(shapeChamferSize * 0.6))}px 0, calc(100% - ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px) 0, 100% ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px, 100% calc(100% - ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px), calc(100% - ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px) 100%, ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px 100%, 0 calc(100% - ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px), 0 ${Math.max(6, Math.round(shapeChamferSize * 0.6))}px)`;
    css += `${selector} .profile-contact-links a.contact-link, ${selector} .profile-contact-links a.boop-link, ${selector} a.contact-link, ${selector} a.boop-link, ${selector} .social-links-list .social-link-item{border-radius:0 !important;clip-path:${bChamfer} !important;-webkit-clip-path:${bChamfer} !important;}\n`;
  }
  css += `${selector} a{color:${linkColor} !important;text-decoration:${linkUnderline} !important;font-weight:${linkWeight} !important;transition:color 140ms ease,text-shadow 140ms ease,transform 140ms ease;}\n`;
  css += `${selector} a:hover{color:${linkHoverColor} !important;text-shadow:0 0 14px ${rgba(linkHoverColor,0.35)};}\n\n`;

  // Cards
  css += `${selector} .card{\n`;
  css += `  position:relative;\n`;
  css += `  background:\n`;
  css += `    linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.00) 40%),\n`;
  css += `    linear-gradient(135deg, ${rgba(primary,0.08)}, ${rgba(secondary,0.06)} 45%, rgba(0,0,0,0) 75%),\n`;
  css += `    var(--of-panel);\n`;
  css += `  border: ${cardBorderWidth}px solid var(--of-border);\n`;
  css += `  border-radius: ${cardRadius}px;\n`;
  css += `  box-shadow: 0 14px ${Math.round(40 * shadowStrength)}px rgba(0,0,0,0.62);\n`;
  css += `  backdrop-filter: blur(${glassBlur}px);\n`;
  css += `  -webkit-backdrop-filter: blur(${glassBlur}px);\n`;
  css += `  overflow:hidden;\n`;
  css += `  transition: transform 240ms cubic-bezier(.2,.8,.2,1), box-shadow 240ms cubic-bezier(.2,.8,.2,1), border-color 240ms cubic-bezier(.2,.8,.2,1);\n`;
  css += `}\n`;
  css += `${selector} .card:hover{transform:translateY(-${lift}px) scale(${hoverScale});border-color:${rgba(primary,0.45)};box-shadow: var(--of-shadow), var(--of-glow-strong);}\n\n`;

  // Card/panel header accent
  css += `${selector} .card-header,\n`;
  css += `${selector} .panel .panel-heading,\n`;
  css += `${selector} .panel-heading,\n`;
  css += `${selector} .sectionHeader,\n`;
  css += `${selector} .profileSection h3,\n`;
  css += `${selector} .contentBox .title,\n`;
  css += `${selector} .module .title{\n`;
  css += `  background: linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;\n`;
  css += `  background-image: linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;\n`;
  css += `  border-bottom: 1px solid rgba(255,255,255,0.08);\n`;
  css += `  color: ${headerTextColor} !important;\n`;
  css += `  letter-spacing: 1.3px;\n`;
  css += `  font-size: ${headerFontSize}px;\n`;
  css += `  text-transform: ${headerUppercase};\n`;
  css += `  font-family: ${fontHeader};\n`;
  css += `}\n\n`;
  css += `${selector} .card-header a{font-size:${headerLinkSize}px !important;}\n`;
  css += `${selector} .card-header.starred::before,\n`;
  css += `${selector} .card-header.hearted::before{background:none !important;background-image:none !important;filter:none !important;display:inline-block !important;position:static !important;width:auto !important;height:auto !important;left:auto !important;top:auto !important;transform:none !important;margin-right:8px !important;}\n`;
  css += `${selector} .card-header.starred::before{content:"${starIcon}" !important;}\n`;
  css += `${selector} .card-header.hearted::before{content:"${heartIcon}" !important;}\n\n`;

  // Top bar
  css += `${selector} .profile-top-bar, ${selector} .profile-top-bar *{background:transparent !important;}\n`;
  css += `${selector} .profile-top-bar{background:${rgba("#000000", topbarAlpha)} !important;border:1px solid rgba(255,255,255,0.06) !important;border-radius:14px !important;box-shadow:0 10px 30px rgba(0,0,0,0.55) !important;backdrop-filter:blur(${glassBlurSoft}px);-webkit-backdrop-filter:blur(${glassBlurSoft}px);padding:10px 12px !important;}\n\n`;

  // Avatar sizing (MyOshi sometimes uses inline 100px)
  css += `${selector} .profile-main-card [style*="width:100px"], ${selector} .profile-main-card div[style*="width: 100px"]{width:${avatarSize}px !important;height:${avatarSize}px !important;}\n`;
  css += `${selector} .card-body{padding:${cardPadding}px !important;}\n`;
  css += `${selector} .card{margin-bottom:${sectionSpacing}px !important;}\n`;

  // Avatar rule
  css += `${avatarMediaSelector}{\n`;
  css += `  display:block !important;\n`;
  css += `  width:${avatarSize}px !important;\n`;
  css += `  height:${avatarSize}px !important;\n`;
  css += `  aspect-ratio:1 / 1 !important;\n`;
  css += `  max-width:${avatarSize}px !important;\n`;
  css += `  max-height:${avatarSize}px !important;\n`;
  css += `  object-fit:cover !important;\n`;
  css += `  overflow:hidden !important;\n`;
  css += `  background: rgba(0,0,0,0.35);\n`;
  css += `  border: ${avatarBorder}px solid ${rgba(primary,0.55)} !important;\n`;
  css += `  box-shadow: 0 0 ${Math.round(30 + 28 * avatarGlow)}px ${rgba(primary,0.25 + 0.35*avatarGlow)}, 0 0 ${Math.round(80 + 50 * avatarGlow)}px ${rgba(secondary,0.15 + 0.25*avatarGlow)}, 0 18px 50px rgba(0,0,0,0.85) !important;\n`;
  css += `  transition: transform .25s ease, box-shadow .25s ease, filter .25s ease, border-color .25s ease;\n`;
  css += `  transform: translateZ(0);\n`;

  // Apply geometry
  if (geo.maskSvg){
    css += `  border-radius: 0 !important;\n`;
    css += `  clip-path: none !important;\n`;
    css += `  -webkit-clip-path: none !important;\n`;
    css += `  -webkit-mask-image: url("${geo.maskSvg}");\n`;
    css += `  mask-image: url("${geo.maskSvg}");\n`;
    css += `  -webkit-mask-repeat: no-repeat;\n`;
    css += `  mask-repeat: no-repeat;\n`;
    css += `  -webkit-mask-size: 100% 100%;\n`;
    css += `  mask-size: 100% 100%;\n`;
    css += `  -webkit-mask-position: center;\n`;
    css += `  mask-position: center;\n`;
  } else if (geo.clipPath){
    css += `  border-radius: 0 !important;\n`;
    css += `  clip-path: ${geo.clipPath} !important;\n`;
    css += `  -webkit-clip-path: ${geo.clipPath} !important;\n`;
    css += `  -webkit-mask-image: none !important;\n`;
    css += `  mask-image: none !important;\n`;
  } else {
    css += `  border-radius: ${geo.radius} !important;\n`;
    css += `  clip-path: none !important;\n`;
    css += `  -webkit-clip-path: none !important;\n`;
    css += `  -webkit-mask-image: none !important;\n`;
    css += `  mask-image: none !important;\n`;
  }

  // Custom shape CSS (power user)
  if (state.customShapeCss.trim()){
    css += `  ${state.customShapeCss.trim().replace(/\n/g, "\n  ")}\n`;
  }

  css += `}\n`;

  css += `${avatarMediaSelector}:hover{transform:scale(1.08) translateY(-4px);border-color:${primary} !important;box-shadow:0 0 ${Math.round(45 + 36 * avatarGlow)}px ${rgba(primary,0.35 + 0.45*avatarGlow)}, 0 0 ${Math.round(120 + 80 * avatarGlow)}px ${rgba(secondary,0.2 + 0.35*avatarGlow)}, 0 0 ${Math.round(200 + 120 * avatarGlow)}px ${rgba(primary,0.12 + 0.25*avatarGlow)}, 0 30px 80px rgba(0,0,0,0.95) !important;filter:saturate(1.15) brightness(1.08);}\n\n`;

  // Safety net: avatar wrappers
  if (geo.clipPath){
    css += `${avatarBoxSelector}{clip-path:${geo.clipPath} !important;-webkit-clip-path:${geo.clipPath} !important;overflow:hidden !important;}\n\n`;
  } else {
    css += `${avatarBoxSelector}{border-radius:${geo.radius} !important;clip-path:none !important;-webkit-clip-path:none !important;overflow:hidden !important;}\n\n`;
  }
  if (avatarLogoEnabled){
    css += `${selector} .profile-main-card .card-body{position:relative !important;}\n`;
    css += `${selector} .profile-main-card .card-body::after{content:"";position:absolute;left:50%;top:calc(${avatarSize}px + ${avatarLogoOffsetY}px);transform:translateX(-50%);width:${avatarLogoWidth}px;height:${avatarLogoHeight}px;background-image:${avatarLogoImage};background-size:contain;background-repeat:no-repeat;background-position:center;opacity:${avatarLogoOpacity};pointer-events:none;z-index:6 !important;}\n\n`;
  }

  // Buttons/links (contact + boop)
  if (state.uniformLinks){
    css += `${selector} .profile-contact-links a.contact-link,\n`;
    css += `${selector} .profile-contact-links a.boop-link,\n`;
    css += `${selector} a.contact-link,\n`;
    css += `${selector} a.boop-link{\n`;
    css += `  background: ${rgba(buttonBg, buttonAlpha)} !important;\n`;
    css += `  color: ${rgba(buttonText, 0.92)} !important;\n`;
    css += `  border: 1px solid ${rgba(buttonBorder, 0.28)} !important;\n`;
    css += `  border-radius: 12px !important;\n`;
    css += `  text-decoration:none !important;\n`;
    css += `  box-shadow: 0 10px 24px rgba(0,0,0,0.55), 0 0 18px ${rgba(buttonBorder,0.12)} !important;\n`;
    css += `  backdrop-filter: blur(${glassBlurSoft}px);\n`;
    css += `  -webkit-backdrop-filter: blur(${glassBlurSoft}px);\n`;
    css += `  transition: transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 180ms cubic-bezier(.2,.8,.2,1), border-color 180ms cubic-bezier(.2,.8,.2,1), background 180ms cubic-bezier(.2,.8,.2,1);\n`;
    css += `}\n`;
    css += `${selector} .profile-contact-links a.contact-link:hover,\n`;
    css += `${selector} .profile-contact-links a.boop-link:hover,\n`;
    css += `${selector} a.contact-link:hover,\n`;
    css += `${selector} a.boop-link:hover{\n`;
    css += `  transform: translateY(-2px);\n`;
    css += `  background: ${rgba(buttonHoverBg, buttonHoverAlpha)} !important;\n`;
    css += `  color: ${buttonHoverText} !important;\n`;
    css += `  border-color: ${rgba(buttonBorder, 0.55)} !important;\n`;
    css += `  box-shadow: 0 14px 34px rgba(0,0,0,0.62), 0 0 28px ${rgba(buttonBorder,0.22)} !important;\n`;
    css += `}\n\n`;
  }

  // Section links
  css += `${selector} .section-links{background:${rgba(panelBaseColor,sectionAlpha)} !important;border:1px solid ${rgba(primary,0.20)} !important;border-radius:14px !important;box-shadow:0 14px 34px rgba(0,0,0,0.55) !important;backdrop-filter:blur(${glassBlur}px);-webkit-backdrop-filter:blur(${glassBlur}px);overflow:hidden;}\n`;
  css += `${selector} .section-links a{display:inline-block;padding:10px 12px;color:${rgba(text,0.90)} !important;border-right:1px solid rgba(255,255,255,0.07);}\n`;
  css += `${selector} .section-links a:last-child{border-right:none;}\n`;
  css += `${selector} .section-links a:hover{background:${rgba(panelHoverBaseColor,Math.min(0.98, sectionAlpha + 0.08))} !important;color:${primary} !important;text-shadow:0 0 14px ${rgba(primary,0.35)};}\n\n`;

  // Social list items
  css += `${selector} .social-links-list .social-link-item{background:${rgba(panelBaseColor,socialAlpha)} !important;border:1px solid ${rgba(primary,0.22)} !important;border-radius:12px !important;box-shadow:0 10px 24px rgba(0,0,0,0.55) !important;}\n`;
  css += `${selector} .social-links-list .social-link-item:hover{background:${rgba(panelHoverBaseColor,Math.min(0.98, socialAlpha + 0.08))} !important;border-color:${rgba(primary,0.55)} !important;box-shadow:0 14px 34px rgba(0,0,0,0.62), 0 0 28px ${rgba(primary,0.22)} !important;}\n`;
  css += `${selector} .social-links-list .social-link-item{display:inline-flex !important;align-items:center !important;justify-content:center !important;}\n`;
  css += `${selector} .social-links-list .social-link-platform, ${selector} .social-links-list .social-link-item, ${selector} .social-links-list .social-link-item *{color:${rgba(text,0.92)} !important;letter-spacing:0.6px;}\n`;
  css += `${selector} .profile-display-name{color:${nameColor} !important;text-shadow:0 0 ${Math.round(8 + (24 * nameGlow))}px ${rgba(nameColor,0.25 + (0.3 * nameGlow))},0 0 ${Math.round(18 + (34 * nameGlow))}px ${rgba(primary,0.12 + (0.26 * nameGlow))} !important;}\n`;
  css += `${selector} .profile-tagline{color:${taglineColor} !important;}\n`;
  if (taglineBoxEnabled){
    css += `${selector} .profile-tagline{display:inline-block !important;padding:${taglineBoxPadding}px ${Math.round(taglineBoxPadding * 1.6)}px !important;background:${rgba(taglineBoxBgColor, taglineBoxAlpha)} !important;border:1px solid ${rgba(taglineBoxBorderColor,0.55)} !important;border-radius:${taglineBoxRadius}px !important;box-shadow:0 0 ${Math.round(16 + (26 * taglineBoxGlow))}px ${rgba(taglineBoxBorderColor,0.12 + 0.22 * taglineBoxGlow)},0 0 ${Math.round(40 + (52 * taglineBoxGlow))}px ${rgba(primary,0.08 + 0.16 * taglineBoxGlow)},0 12px 30px rgba(0,0,0,0.6) !important;transition:transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, filter 220ms ease !important;}\n`;
    css += `${selector} .profile-tagline:hover{border-color:${rgba(taglineBoxBorderColor,0.85)} !important;box-shadow:0 0 ${Math.round(24 + (36 * taglineBoxGlow))}px ${rgba(taglineBoxBorderColor,0.16 + 0.28 * taglineBoxGlow)},0 0 ${Math.round(60 + (78 * taglineBoxGlow))}px ${rgba(secondary,0.1 + 0.2 * taglineBoxGlow)},0 14px 34px rgba(0,0,0,0.66) !important;}\n`;
  }
  css += `${selector} .blurb-section .blurb-title{color:${blurbTitleColor} !important;}\n`;
  css += `${selector} .blurb-section .blurb-content{color:${blurbTextColor} !important;}\n`;
  css += `${selector} .profile-custom-html{color:${customHtmlColor} !important;}\n`;
  css += `${selector} .profile-about-me, ${selector} .about-me, ${selector} .blurb-section .blurb-content p, ${selector} .blurb-section .blurb-content li{color:${aboutBodyColor} !important;}\n`;
  css += `${selector} .interest-title{color:${interestTitleColor} !important;}\n`;
  css += `${selector} .interest-content{color:${interestTextColor} !important;}\n`;
  if (forceReadableTextFinal){
    css += `${selector} .blurb-section .blurb-content, ${selector} .blurb-section .blurb-content *, ${selector} .profile-custom-html, ${selector} .profile-custom-html *, ${selector} .interest-content, ${selector} .interest-content *{color:${aboutBodyColor} !important;}\n`;
    css += `${selector} .card-body p, ${selector} .card-body li, ${selector} .card-body span, ${selector} .card-body div, ${selector} .panel-body p, ${selector} .panel-body li, ${selector} .panel-body span, ${selector} .panel-body div, ${selector} .module-body p, ${selector} .module-body li, ${selector} .module-body span, ${selector} .module-body div{color:${aboutBodyColor} !important;opacity:1 !important;}\n`;
  }
  css += `${selector} .profile-mood, ${selector} .mood-display, ${selector} .profile-status{background:${rgba(moodBgColor,0.92)} !important;border:1px solid ${rgba(moodBorderColor,0.55)} !important;color:${moodTextColor} !important;}\n`;
  css += `${selector} .profile-mood *, ${selector} .mood-display *, ${selector} .profile-status *, ${selector} .mood-text{color:${moodTextColor} !important;}\n`;
  if (preserveLineBreaks){
    css += `${selector} .blurb-section .blurb-content, ${selector} .profile-custom-html, ${selector} .status-message, ${selector} .comment-body{white-space:pre-wrap !important;}\n`;
  }
  css += `${selector} .profile-comment, ${selector} .comment-content{background:${rgba(commentsBg, commentsAlphaFinal)} !important;color:${commentsTextFinal} !important;border:1px solid ${commentBorderFinal} !important;padding:${commentPadding}px !important;}\n`;
  css += `${selector} .profile-comment .comment-body, ${selector} .comment-content .comment-body{padding:${Math.max(0, Math.round(commentPadding * 0.7))}px 0 !important;}\n`;
  css += `${selector} .profile-comment *, ${selector} .comment-content *{color:${commentsTextFinal} !important;}\n`;
  css += `${selector} .add-comment, ${selector} .add-comment [contenteditable=\"true\"], ${selector} .add-comment textarea{background:${rgba(replyBg, commentsAlphaFinal)} !important;color:${replyTextFinal} !important;border:1px solid ${replyBorderFinal} !important;}\n`;
  css += `${selector} .profile-comment textarea, ${selector} .profile-comment input[type="text"], ${selector} .profile-comment [contenteditable="true"], ${selector} .comment-content textarea, ${selector} .comment-content input[type="text"], ${selector} .comment-content [contenteditable="true"]{background:${rgba(replyBg, commentsAlphaFinal)} !important;color:${replyTextFinal} !important;border:1px solid ${replyBorderFinal} !important;}\n`;
  css += `${selector} .add-comment textarea::placeholder, ${selector} .profile-comment textarea::placeholder, ${selector} .profile-comment input[type="text"]::placeholder, ${selector} .comment-content textarea::placeholder, ${selector} .comment-content input[type="text"]::placeholder{color:${rgba(replyTextFinal,0.72)} !important;}\n`;

  // Custom cursor CSS (advanced, appended raw)
  if (state.customCursorCss.trim()){
    css += `\n${state.customCursorCss.trim()}\n`;
  }

  // Raw preset override CSS goes last so its !important rules win.
  if (presetCssBody){
    css += `\n${presetCssBody}\n`;
  }

  // Final glass override so transparency controls still work even with heavy preset overrides.
  css += `\n/* OshiForge glass controls (final override) */\n`;
  css += `${selector} .card,\n`;
  css += `${selector} [class*="card"],\n`;
  css += `${selector} .profile-info,\n`;
  css += `${selector} .profile-comment,\n`;
  css += `${selector} .comment-content,\n`;
  css += `${selector} .blurbs,\n`;
  css += `${selector} .contact,\n`;
  css += `${selector} .panel,\n`;
  css += `${selector} .module,\n`;
  css += `${selector} .add-comment,\n`;
  css += `${selector} .profile-url-box,\n`;
  css += `${selector} .friends-grid a.friend-item{\n`;
  css += `  background: ${panel} !important;\n`;
  css += `  background-image: none !important;\n`;
  css += `  backdrop-filter: blur(${glassBlur}px) !important;\n`;
  css += `  -webkit-backdrop-filter: blur(${glassBlur}px) !important;\n`;
  css += `}\n`;
  css += `${selector} .card-body,\n`;
  css += `${selector} .panel-body,\n`;
  css += `${selector} .module-body,\n`;
  css += `${selector} .contentBox .content,\n`;
  css += `${selector} .profile-main-card .card-body,\n`;
  css += `${selector} .blurb-section{\n`;
  css += `  background: transparent !important;\n`;
  css += `  background-image: none !important;\n`;
  css += `}\n`;
  css += `${selector} .card:hover,\n`;
  css += `${selector} [class*="card"]:hover,\n`;
  css += `${selector} .profile-info:hover,\n`;
  css += `${selector} .profile-comment:hover,\n`;
  css += `${selector} .comment-content:hover,\n`;
  css += `${selector} .blurbs:hover,\n`;
  css += `${selector} .contact:hover,\n`;
  css += `${selector} .panel:hover,\n`;
  css += `${selector} .module:hover,\n`;
  css += `${selector} .add-comment:hover,\n`;
  css += `${selector} .profile-url-box:hover,\n`;
  css += `${selector} .friends-grid a.friend-item:hover{\n`;
  css += `  background: ${rgba(panelHoverBaseColor, Math.min(0.98, clamp(state.panelAlpha, 0.2, 0.95) + 0.08))} !important;\n`;
  css += `  background-image: none !important;\n`;
  css += `}\n`;
  css += `${selector} .profile-top-bar{background:${rgba("#000000", topbarAlpha)} !important;backdrop-filter:blur(${glassBlurSoft}px) !important;-webkit-backdrop-filter:blur(${glassBlurSoft}px) !important;}\n`;
  css += `${selector} .section-links{background:${rgba(panelBaseColor, sectionAlpha)} !important;backdrop-filter:blur(${glassBlur}px) !important;-webkit-backdrop-filter:blur(${glassBlur}px) !important;}\n`;
  css += `${selector} .social-links-list .social-link-item{background:${rgba(panelBaseColor, socialAlpha)} !important;}\n`;
  css += `${selector} .social-links-list .social-link-item:hover{background:${rgba(panelHoverBaseColor, Math.min(0.98, socialAlpha + 0.08))} !important;}\n`;
  css += `${selector} .profile-contact-links a.contact-link,\n`;
  css += `${selector} .profile-contact-links a.boop-link,\n`;
  css += `${selector} a.contact-link,\n`;
  css += `${selector} a.boop-link{\n`;
  css += `  background:${rgba(buttonBg, buttonAlpha)} !important;\n`;
  css += `  color:${rgba(buttonText, 0.92)} !important;\n`;
  css += `  border-color:${rgba(buttonBorder, 0.28)} !important;\n`;
  css += `  backdrop-filter: blur(${glassBlurSoft}px) !important;\n`;
  css += `  -webkit-backdrop-filter: blur(${glassBlurSoft}px) !important;\n`;
  css += `}\n`;
  css += `${selector} .profile-contact-links a.contact-link:hover,\n`;
  css += `${selector} .profile-contact-links a.boop-link:hover,\n`;
  css += `${selector} a.contact-link:hover,\n`;
  css += `${selector} a.boop-link:hover{\n`;
  css += `  background:${rgba(buttonHoverBg, buttonHoverAlpha)} !important;\n`;
  css += `  color:${buttonHoverText} !important;\n`;
  css += `}\n`;

  if (decorBorderEnabled){
    const decorTargets = [
      `${selector} .card`,
      `${selector} .profile-info`,
      `${selector} .blurbs`,
      `${selector} .contact`,
      `${selector} .panel`,
      `${selector} .module`,
      `${selector} .contentBox`,
    ];
    if (decorApplySections){
      decorTargets.push(`${selector} .section-links`);
      decorTargets.push(`${selector} .social-links-list .social-link-item`);
    }
    css += `\n/* OshiForge decorative border */\n`;
    css += `${decorTargets.join(",\n")}{\n`;
    if (decorBorderGradient){
      css += `  border: ${decorBorderWidth}px solid transparent !important;\n`;
      css += `  border-image: linear-gradient(135deg, ${rgba(decorBorderColor, decorBorderAlpha)}, ${rgba(decorBorderAltColor, decorBorderAlpha)}) 1 !important;\n`;
    } else {
      css += `  border: ${decorBorderWidth}px ${decorBorderStyle} ${rgba(decorBorderColor, decorBorderAlpha)} !important;\n`;
      css += `  border-image: none !important;\n`;
    }
    css += `  border-radius: ${decorBorderRadius}px !important;\n`;
    css += `  box-shadow: 0 0 ${Math.round(10 + 28 * decorBorderGlow)}px ${rgba(decorBorderColor, 0.18 + 0.45 * decorBorderGlow)} !important;\n`;
    css += `}\n`;
  }

  if (frameEnabled){
    const frameTargets = [
      `${selector} .card`,
      `${selector} .profile-info`,
      `${selector} .blurbs`,
      `${selector} .contact`,
      `${selector} .panel`,
      `${selector} .module`,
      `${selector} .contentBox`,
    ];
    if (frameApplySections){
      frameTargets.push(`${selector} .section-links`);
      frameTargets.push(`${selector} .social-links-list .social-link-item`);
    }
    css += `\n/* OshiForge frame border */\n`;
    css += `${frameTargets.join(",\n")}{\n`;
    css += `  border: ${frameWidth}px solid transparent !important;\n`;
    css += `  border-image-source: ${frameImage} !important;\n`;
    css += `  border-image-slice: ${frameSlice} !important;\n`;
    css += `  border-image-repeat: ${frameRepeat} !important;\n`;
    css += `  border-image-width: 1 !important;\n`;
    css += `  border-radius: ${frameRadius}px !important;\n`;
    css += `}\n`;
  }

  // Final content overrides so these controls still work on top of preset CSS.
  css += `\n/* OshiForge content overrides (final) */\n`;
  css += `${selector} .card-header.starred::before,\n`;
  css += `${selector} .card-header.hearted::before{background:none !important;background-image:none !important;filter:none !important;display:inline-block !important;position:static !important;width:auto !important;height:auto !important;left:auto !important;top:auto !important;transform:none !important;margin-right:8px !important;}\n`;
  css += `${selector} .card-header.starred::before{content:"${starIcon}" !important;}\n`;
  css += `${selector} .card-header.hearted::before{content:"${heartIcon}" !important;}\n`;
  css += `${selector} .card-header,\n`;
  css += `${selector} .panel .panel-heading,\n`;
  css += `${selector} .panel-heading,\n`;
  css += `${selector} .sectionHeader,\n`;
  css += `${selector} .profileSection h3,\n`;
  css += `${selector} .contentBox .title,\n`;
  css += `${selector} .module .title{background:linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;background-image:linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;color:${headerTextColor} !important;}\n`;
  css += `${selector} .card-header, ${selector} .card-header *, ${selector} .panel .panel-heading, ${selector} .panel .panel-heading *, ${selector} .panel-heading, ${selector} .panel-heading *, ${selector} .sectionHeader, ${selector} .sectionHeader *, ${selector} .profileSection h3, ${selector} .profileSection h3 *, ${selector} .contentBox .title, ${selector} .contentBox .title *, ${selector} .module .title, ${selector} .module .title *{color:${headerTextColor} !important;}\n`;
  if (fixHeaderStyle){
    css += `${selector} .panel .panel-heading, ${selector} .card-header, ${selector} .sectionHeader, ${selector} .profileSection h3, ${selector} .panel-heading, ${selector} .contentBox .title, ${selector} .module .title{background:linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;color:${headerTextColor} !important;background-image:linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;}\n`;
  }
  css += `${selector} .profile-display-name{position:relative !important;z-index:2 !important;display:inline-block !important;color:${nameColor} !important;text-shadow:0 0 ${Math.round(8 + (24 * nameGlow))}px ${rgba(nameColor,0.25 + (0.3 * nameGlow))},0 0 ${Math.round(18 + (34 * nameGlow))}px ${rgba(primary,0.12 + (0.26 * nameGlow))} !important;}\n`;
  css += `${selector} .profile-tagline{color:${taglineColor} !important;}\n`;
  if (taglineBoxEnabled){
    css += `${selector} .profile-tagline{display:inline-block !important;padding:${taglineBoxPadding}px ${Math.round(taglineBoxPadding * 1.6)}px !important;background:${rgba(taglineBoxBgColor, taglineBoxAlpha)} !important;border:1px solid ${rgba(taglineBoxBorderColor,0.55)} !important;border-radius:${taglineBoxRadius}px !important;box-shadow:0 0 ${Math.round(16 + (26 * taglineBoxGlow))}px ${rgba(taglineBoxBorderColor,0.12 + 0.22 * taglineBoxGlow)},0 0 ${Math.round(40 + (52 * taglineBoxGlow))}px ${rgba(primary,0.08 + 0.16 * taglineBoxGlow)},0 12px 30px rgba(0,0,0,0.6) !important;transition:transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease, filter 220ms ease !important;}\n`;
    css += `${selector} .profile-tagline:hover{border-color:${rgba(taglineBoxBorderColor,0.85)} !important;box-shadow:0 0 ${Math.round(24 + (36 * taglineBoxGlow))}px ${rgba(taglineBoxBorderColor,0.16 + 0.28 * taglineBoxGlow)},0 0 ${Math.round(60 + (78 * taglineBoxGlow))}px ${rgba(secondary,0.1 + 0.2 * taglineBoxGlow)},0 14px 34px rgba(0,0,0,0.66) !important;}\n`;
  }
  css += `${selector} .blurb-section .blurb-title{color:${blurbTitleColor} !important;}\n`;
  css += `${selector} .blurb-section .blurb-content{color:${blurbTextColor} !important;}\n`;
  css += `${selector} .profile-custom-html{color:${customHtmlColor} !important;}\n`;
  css += `${selector} .profile-about-me, ${selector} .about-me, ${selector} .blurb-section .blurb-content p, ${selector} .blurb-section .blurb-content li{color:${aboutBodyColor} !important;}\n`;
  css += `${selector} .interest-title{color:${interestTitleColor} !important;}\n`;
  css += `${selector} .interest-content{color:${interestTextColor} !important;}\n`;
  if (forceReadableTextFinal){
    css += `${selector} .blurb-section .blurb-content, ${selector} .blurb-section .blurb-content *, ${selector} .profile-custom-html, ${selector} .profile-custom-html *, ${selector} .interest-content, ${selector} .interest-content *{color:${aboutBodyColor} !important;}\n`;
    css += `${selector} .card-body p, ${selector} .card-body li, ${selector} .card-body span, ${selector} .card-body div, ${selector} .panel-body p, ${selector} .panel-body li, ${selector} .panel-body span, ${selector} .panel-body div, ${selector} .module-body p, ${selector} .module-body li, ${selector} .module-body span, ${selector} .module-body div{color:${aboutBodyColor} !important;opacity:1 !important;}\n`;
  }
  css += `${selector} .social-links-list .social-link-item{display:inline-flex !important;align-items:center !important;justify-content:center !important;}\n`;
  css += `${selector} .social-links-list .social-link-platform, ${selector} .social-links-list .social-link-item, ${selector} .social-links-list .social-link-item *{color:${rgba(text,0.92)} !important;}\n`;
  css += `${selector} .profile-mood, ${selector} .mood-display, ${selector} .profile-status{background:${rgba(moodBgColor,0.92)} !important;border:1px solid ${rgba(moodBorderColor,0.55)} !important;color:${moodTextColor} !important;}\n`;
  css += `${selector} .profile-mood *, ${selector} .mood-display *, ${selector} .profile-status *, ${selector} .mood-text{color:${moodTextColor} !important;}\n`;
  if (preserveLineBreaks){
    css += `${selector} .blurb-section .blurb-content, ${selector} .profile-custom-html, ${selector} .status-message, ${selector} .comment-body{white-space:pre-wrap !important;}\n`;
  }
  css += `${selector} .profile-comment, ${selector} .comment-content{background:${rgba(commentsBg, commentsAlphaFinal)} !important;color:${commentsTextFinal} !important;border:1px solid ${commentBorderFinal} !important;padding:${commentPadding}px !important;}\n`;
  css += `${selector} .profile-comment .comment-body, ${selector} .comment-content .comment-body{padding:${Math.max(0, Math.round(commentPadding * 0.7))}px 0 !important;}\n`;
  css += `${selector} .profile-comment *, ${selector} .comment-content *{color:${commentsTextFinal} !important;}\n`;
  css += `${selector} .add-comment, ${selector} .add-comment [contenteditable=\"true\"], ${selector} .add-comment textarea{background:${rgba(replyBg, commentsAlphaFinal)} !important;color:${replyTextFinal} !important;border:1px solid ${replyBorderFinal} !important;}\n`;
  css += `${selector} .profile-comment textarea, ${selector} .profile-comment input[type="text"], ${selector} .profile-comment [contenteditable="true"], ${selector} .comment-content textarea, ${selector} .comment-content input[type="text"], ${selector} .comment-content [contenteditable="true"]{background:${rgba(replyBg, commentsAlphaFinal)} !important;color:${replyTextFinal} !important;border:1px solid ${replyBorderFinal} !important;}\n`;
  css += `${selector} .add-comment textarea::placeholder, ${selector} .profile-comment textarea::placeholder, ${selector} .profile-comment input[type="text"]::placeholder, ${selector} .comment-content textarea::placeholder, ${selector} .comment-content input[type="text"]::placeholder{color:${rgba(replyTextFinal,0.72)} !important;}\n`;
  if (enableTwoColHelper){
    css += `${selector} .of-two-col{display:grid !important;grid-template-columns:repeat(2, minmax(0,1fr)) !important;gap:10px !important;align-items:start !important;}\n`;
    css += `${selector} .of-two-col > *{min-width:0;}\n`;
    css += `@media (max-width: 760px){${selector} .of-two-col{grid-template-columns:1fr !important;}}\n`;
  }
  css += `${avatarMediaSelector}{box-shadow: 0 0 ${Math.round(30 + 28 * avatarGlow)}px ${rgba(primary,0.25 + 0.35*avatarGlow)}, 0 0 ${Math.round(80 + 50 * avatarGlow)}px ${rgba(secondary,0.15 + 0.25*avatarGlow)}, 0 18px 50px rgba(0,0,0,0.85) !important;}\n`;
  css += `${avatarMediaSelector}:hover{box-shadow:0 0 ${Math.round(45 + 36 * avatarGlow)}px ${rgba(primary,0.35 + 0.45*avatarGlow)}, 0 0 ${Math.round(120 + 80 * avatarGlow)}px ${rgba(secondary,0.2 + 0.35*avatarGlow)}, 0 0 ${Math.round(200 + 120 * avatarGlow)}px ${rgba(primary,0.12 + 0.25*avatarGlow)}, 0 30px 80px rgba(0,0,0,0.95) !important;}\n`;

  // Section visibility toggles
  if (!state.showTopbar) css += `${selector} .mod-topbar{display:none !important;}\n`;
  if (!state.showTop8) css += `${selector} .mod-top8{display:none !important;}\n`;
  if (!state.showSectionLinks) css += `${selector} .mod-section-links{display:none !important;}\n`;
  if (!state.showSocialLinks) css += `${selector} .mod-social{display:none !important;}\n`;
  if (!state.showDetails) css += `${selector} .mod-details{display:none !important;}\n`;
  if (!state.showSong) css += `${selector} .mod-song{display:none !important;}\n`;
  if (!state.showComments) css += `${selector} .mod-comments{display:none !important;}\n`;

  if (state.extraCss.trim()){
    css += `\n${state.extraCss.trim()}\n`;
  }

  return normalizeLegacyScope(css);
}

function buildSnippetCss(){
  const selector = ".profile-page.profile-custom-css";
  const primary = state.cPrimary;
  const secondary = state.cSecondary;
  const text = state.cText;
  const linkColor = state.linkColor;
  const linkHoverColor = state.linkHoverColor;
  const linkWeight = clamp(state.linkWeight, 400, 900);
  const linkUnderline = state.linkUnderline ? "underline" : "none";
  const headerGradStart = state.headerGradStart;
  const headerGradMid = state.headerGradMid;
  const headerGradEnd = state.headerGradEnd;
  const headerTextColor = state.headerTextColor;
  const starIcon = cssContentString((state.starIcon || "").trim() || "⭐");
  const heartIcon = cssContentString((state.heartIcon || "").trim() || "💚");
  const commentsBorderFinal = state.commentBordersTransparent ? "transparent" : rgba(state.commentsBorderColor, 0.45);
  const replyBorderFinal = state.commentBordersTransparent ? "transparent" : rgba(state.replyBorderColor, 0.45);
  const commentsAlpha = clamp(state.commentsAlpha, 0.1, 1);
  const commentsText = state.fixCommentContrast ? "#f5f8ff" : state.commentsTextColor;
  const replyText = state.fixCommentContrast ? "#f5f8ff" : state.replyTextColor;
  const commentPadding = clamp(state.commentPadding, 0, 26);
  const geo = getAvatarGeometry(state.avatarShape);
  const avatarSize = clamp(state.avatarSize, 80, 280);
  const avatarBorder = clamp(state.avatarBorder, 0, 6);
  const avatarGlow = clamp(state.avatarGlow, 0, 2);
  const nameColor = state.nameColor;
  const nameGlow = clamp(state.nameGlow, 0, 2);
  const taglineBoxEnabled = Boolean(state.taglineBoxEnabled);
  const taglineBoxBgColor = state.taglineBoxBgColor;
  const taglineBoxBorderColor = state.taglineBoxBorderColor;
  const taglineBoxAlpha = clamp(state.taglineBoxAlpha, 0.1, 1);
  const taglineBoxGlow = clamp(state.taglineBoxGlow, 0, 2);
  const taglineBoxRadius = clamp(state.taglineBoxRadius, 0, 30);
  const taglineBoxPadding = clamp(state.taglineBoxPadding, 4, 24);
  const avatarMediaSelector = [
    `${selector} img.user-avatar.profile-avatar`,
    `${selector} .profile-main-card img.user-avatar`,
    `${selector} .profile-main-card img.profile-avatar`,
    `${selector} .profile-main-card img[class*="avatar"]`,
    `${selector} .profile-main-card [class*="avatar"] img`,
    `${selector} .profile-main-card .avatar img`,
  ].join(", ");

  const chosen = [
    state.snippetAvatarOnly,
    state.snippetTextOnly,
    state.snippetButtonsOnly,
    state.snippetCommentsOnly,
    state.snippetTaglineOnly,
  ].some(Boolean);
  if (!chosen) return buildCss();

  let css = "/* Code generated by OshiForge | @HaittaNEO */\n";
  css += "/* Snippet mode: only selected sections */\n\n";

  if (state.snippetAvatarOnly){
    css += `/* Avatar */\n`;
    css += `${avatarMediaSelector}{width:${avatarSize}px !important;height:${avatarSize}px !important;object-fit:cover !important;border:${avatarBorder}px solid ${rgba(primary,0.55)} !important;box-shadow:0 0 ${Math.round(30 + 28 * avatarGlow)}px ${rgba(primary,0.25 + 0.35*avatarGlow)},0 0 ${Math.round(80 + 50 * avatarGlow)}px ${rgba(secondary,0.15 + 0.25*avatarGlow)} !important;}\n`;
    if (geo.maskSvg){
      css += `${avatarMediaSelector}{border-radius:0 !important;-webkit-mask-image:url("${geo.maskSvg}");mask-image:url("${geo.maskSvg}");-webkit-mask-repeat:no-repeat;mask-repeat:no-repeat;-webkit-mask-size:100% 100%;mask-size:100% 100%;}\n`;
    } else if (geo.clipPath){
      css += `${avatarMediaSelector}{border-radius:0 !important;clip-path:${geo.clipPath} !important;-webkit-clip-path:${geo.clipPath} !important;}\n`;
    } else {
      css += `${avatarMediaSelector}{border-radius:${geo.radius} !important;}\n`;
    }
    css += `${selector} .profile-display-name{color:${nameColor} !important;text-shadow:0 0 ${Math.round(8 + (24 * nameGlow))}px ${rgba(nameColor,0.25 + (0.3 * nameGlow))},0 0 ${Math.round(18 + (34 * nameGlow))}px ${rgba(primary,0.12 + (0.26 * nameGlow))} !important;}\n\n`;
  }

  if (state.snippetTextOnly){
    css += `/* Text + Headers */\n`;
    css += `${selector} .card-header{background:linear-gradient(90deg, ${headerGradStart}, ${headerGradMid}, ${headerGradEnd}) !important;color:${headerTextColor} !important;}\n`;
    css += `${selector} .card-header, ${selector} .card-header *{color:${headerTextColor} !important;}\n`;
    css += `${selector} .card-header.starred::before{content:"${starIcon}" !important;}\n`;
    css += `${selector} .card-header.hearted::before{content:"${heartIcon}" !important;}\n`;
    css += `${selector} .blurb-section .blurb-title{color:${state.blurbTitleColor} !important;}\n`;
    css += `${selector} .blurb-section .blurb-content, ${selector} .profile-custom-html, ${selector} .interest-content{color:${state.aboutBodyColor} !important;}\n`;
    css += `${selector} .interest-title{color:${state.interestTitleColor} !important;}\n`;
    css += `${selector} .profile-tagline{color:${state.taglineColor} !important;}\n\n`;
  }

  if (state.snippetButtonsOnly){
    css += `/* Buttons + Links */\n`;
    css += `${selector} a{color:${linkColor} !important;text-decoration:${linkUnderline} !important;font-weight:${linkWeight} !important;}\n`;
    css += `${selector} a:hover{color:${linkHoverColor} !important;}\n`;
    css += `${selector} .profile-contact-links a.contact-link, ${selector} .profile-contact-links a.boop-link, ${selector} a.contact-link, ${selector} a.boop-link{background:${rgba(state.btnBg, clamp(state.buttonAlpha, 0.1, 0.95))} !important;color:${state.btnText} !important;border:1px solid ${rgba(state.btnBorder,0.35)} !important;}\n`;
    css += `${selector} .profile-contact-links a.contact-link:hover, ${selector} .profile-contact-links a.boop-link:hover, ${selector} a.contact-link:hover, ${selector} a.boop-link:hover{background:${rgba(state.btnHoverBg, clamp(state.buttonHoverAlpha, 0.1, 0.98))} !important;color:${state.btnHoverText} !important;}\n`;
    css += `${selector} .section-links a{color:${rgba(text,0.9)} !important;}\n`;
    css += `${selector} .social-links-list .social-link-item, ${selector} .social-links-list .social-link-platform{color:${rgba(text,0.92)} !important;}\n\n`;
  }

  if (state.snippetCommentsOnly){
    css += `/* Comments + Replies */\n`;
    css += `${selector} .profile-comment, ${selector} .comment-content{background:${rgba(state.commentsBg, commentsAlpha)} !important;color:${commentsText} !important;border:1px solid ${commentsBorderFinal} !important;padding:${commentPadding}px !important;}\n`;
    css += `${selector} .profile-comment *, ${selector} .comment-content *{color:${commentsText} !important;}\n`;
    css += `${selector} .add-comment, ${selector} .add-comment [contenteditable="true"], ${selector} .add-comment textarea, ${selector} .profile-comment textarea, ${selector} .profile-comment input[type="text"], ${selector} .profile-comment [contenteditable="true"]{background:${rgba(state.replyBg, commentsAlpha)} !important;color:${replyText} !important;border:1px solid ${replyBorderFinal} !important;}\n\n`;
  }

  if (state.snippetTaglineOnly && taglineBoxEnabled){
    css += `/* Tagline Box Glow */\n`;
    css += `${selector} .profile-tagline{display:inline-block !important;padding:${taglineBoxPadding}px ${Math.round(taglineBoxPadding * 1.6)}px !important;background:${rgba(taglineBoxBgColor, taglineBoxAlpha)} !important;border:1px solid ${rgba(taglineBoxBorderColor,0.55)} !important;border-radius:${taglineBoxRadius}px !important;box-shadow:0 0 ${Math.round(16 + (26 * taglineBoxGlow))}px ${rgba(taglineBoxBorderColor,0.12 + 0.22 * taglineBoxGlow)},0 0 ${Math.round(40 + (52 * taglineBoxGlow))}px ${rgba(primary,0.08 + 0.16 * taglineBoxGlow)},0 12px 30px rgba(0,0,0,0.6) !important;}\n`;
    css += `${selector} .profile-tagline:hover{border-color:${rgba(taglineBoxBorderColor,0.85)} !important;box-shadow:0 0 ${Math.round(24 + (36 * taglineBoxGlow))}px ${rgba(taglineBoxBorderColor,0.16 + 0.28 * taglineBoxGlow)},0 0 ${Math.round(60 + (78 * taglineBoxGlow))}px ${rgba(secondary,0.1 + 0.2 * taglineBoxGlow)} !important;}\n\n`;
  }

  return normalizeLegacyScope(css);
}

function renderPreview(css){
  const previewCss = css || buildCss();

  // Starter markup modeled after HaittaNEO's MyOshi profile layout
  const doc = `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<style>
  body{margin:0;font-family:ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;}
  .profile-page.profile-custom-css{min-height:100vh;padding:16px;}
  .container{max-width:980px;margin:0 auto;}
  .profile-top-bar{margin-bottom:12px;}
  .profile-layout{display:grid;grid-template-columns: 340px 1fr;gap:14px;}
  @media(max-width:920px){.profile-layout{grid-template-columns:1fr}}
  .card{margin-bottom:14px;}
  .card-header{padding:10px 12px;font-weight:800;display:flex;justify-content:space-between;align-items:center;}
  .card-body{padding:12px;}
  .profile-main-card .card-body{text-align:center}
  .profile-display-name{margin-top:10px;font-weight:900;font-size:22px}
  .profile-username{opacity:.85;margin-top:4px}
  .profile-tagline{margin-top:10px;display:inline-block}
  .profile-oshi-mark{margin-top:10px;font-size:22px}
  .profile-mood{margin-top:10px;padding:8px 10px;border-radius:10px;border:1px solid rgba(255,255,255,.14);display:inline-flex;gap:6px;align-items:center}
  .profile-online-status,.profile-boop-stats{margin-top:6px;font-size:12px;opacity:.85}
  .profile-url-box{margin-top:10px;font-size:12px;opacity:.9}
  .profile-contact-links{display:flex;gap:10px;justify-content:center;margin-top:12px;flex-wrap:wrap}
  a.contact-link,a.boop-link{padding:10px 12px;border-radius:12px;display:inline-block}
  .section-links{margin-top:12px}
  .section-links a{display:inline-block}
  .social-links-list{display:flex;gap:10px;flex-wrap:wrap}
  .social-link-item{padding:10px 12px;border-radius:12px}
  .friends-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}
  .friend-item{display:flex;gap:8px;align-items:center;padding:8px;border-radius:12px}
  .friend-avatar{width:48px;height:48px;border-radius:10px;object-fit:cover}
  .stats-table{width:100%;border-collapse:collapse;font-size:12px}
  .stats-table td{padding:6px 4px;border-bottom:1px solid rgba(255,255,255,.08)}
  .byline{margin:0 0 12px;padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:10px;font-size:11px;opacity:.9}
  .byline a{text-decoration:none}
  .profile-avatar{border-radius:0 !important;} /* critical: don't fight generated shapes */
  .comments-card .card-body{padding:0}
  .add-comment{padding:12px}
  .comment-editor{
    width:100%;
    min-height:76px;
    border:1px solid rgba(255,255,255,.14);
    border-radius:8px;
    padding:10px;
    font-size:12px;
    line-height:1.45;
    outline:none;
    white-space:pre-wrap;
  }
  .comment-editor-actions{margin-top:8px}
  .action-btn.primary{
    appearance:none;
    border:1px solid rgba(255,255,255,.18);
    border-radius:8px;
    padding:8px 12px;
    font-size:12px;
    cursor:pointer;
  }
  .profile-comment{
    display:flex;
    gap:10px;
    margin:0 12px 12px;
    padding:10px;
    border:1px solid rgba(255,255,255,.12);
    border-radius:10px;
  }
  .comment-avatar{width:50px;height:50px;border-radius:8px;object-fit:cover;flex-shrink:0}
  .comment-content{flex:1;min-width:0}
  .comment-meta{font-size:12px;margin-bottom:4px}
  .comment-author-name{font-weight:700}
  .comment-time{opacity:.75}
  .comment-body{font-size:12px;line-height:1.55}
  .comment-actions{font-size:11px;margin-top:6px;opacity:.9}
  .comment-reply{
    margin-top:8px;
    border-left:2px solid rgba(255,255,255,.2);
    padding:8px 0 0 10px;
  }
  .comment-reply textarea{
    width:100%;
    min-height:48px;
    resize:vertical;
    border:1px solid rgba(255,255,255,.14);
    border-radius:8px;
    padding:8px;
    font-size:12px;
    line-height:1.4;
    outline:none;
  }
</style>
</head>
<body>
<div class="profile-page profile-custom-css">
  <div class="container">
    <div class="profile-top-bar mod-topbar">
      <div class="profile-breadcrumb"><a href="#">Home</a> &gt; <a href="#">Browse</a> &gt; <strong>~.::HaittaNEO::.~</strong></div>
    </div>

    <div class="profile-layout">
      <div class="profile-left">
        <div class="byline">Template by <a href="https://myoshi.co/haittaneo" target="_blank" rel="noopener noreferrer">@haittaneo</a> on MyOshi</div>

        <div class="card profile-main-card">
          <div class="card-header starred"><span>~.::HaittaNEO::.~</span><a href="https://myoshi.co/haittaneo" target="_blank" rel="noopener noreferrer">Visit</a></div>
          <div class="card-body">
            <img class="user-avatar profile-avatar"
                 src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj21f4b6fzxsgz6xxpky3tya/11a59534-cfce-40c9-8c63-835b38c4015b.png?width=200&height=200"
                 alt="avatar"
                 style="width:100px;height:100px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;object-fit:cover" />

            <div class="profile-display-name">~.::HaittaNEO::.~</div>
            <div class="profile-username">@haittaneo</div>
            <div class="profile-tagline">"Full stack do it from the front and the backend"</div>
            <div class="profile-oshi-mark">DEV / VTUBER</div>
            <div class="profile-mood"><span class="mood-text">Productive</span> <span class="mood-display">💪</span></div>
            <div class="profile-online-status">Last online just now</div>
            <div class="profile-boop-stats">61 boops received</div>
            <div class="profile-url-box"><code>myoshi.co/haittaneo</code></div>

            <div class="profile-contact-links">
              <a class="contact-link" href="#">Add Friend</a>
              <a class="contact-link" href="#">Send Message</a>
              <a class="boop-link" href="#">Boop</a>
            </div>
          </div>
        </div>

        <div class="section-links mod-section-links">
          <a href="#">View Journals</a>
          <a href="#">View Photos</a>
          <a href="#">View Groups</a>
          <a href="#">View Places</a>
        </div>
      </div>

      <div class="profile-right">
        <div class="card mod-top8">
          <div class="card-header starred"><span>Top 8</span><a href="#">View All</a></div>
          <div class="card-body">
            <div class="friends-grid">
              <a class="friend-item" href="#"><img class="friend-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj228g4ef6etbrd4kdx42wws/df876dab-190c-40f5-9582-ba9d57a441bb.gif?width=100&height=100" alt=""><span>Roebunny</span></a>
              <a class="friend-item" href="#"><img class="friend-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj1mg5j9fk2b74rq9cgpf0br/55c8b98a-4836-4a1d-a374-a5f2b85b215a.gif?width=100&height=100" alt=""><span>lunaeryschu</span></a>
              <a class="friend-item" href="#"><img class="friend-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj2cjjn3f6av20awgyrnp5m6/51bf5d7f-9ac0-4dce-878f-0ea9be76c3d2.gif?width=100&height=100" alt=""><span>Nyxia</span></a>
              <a class="friend-item" href="#"><img class="friend-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj1epk06e01sj1an48c4vfr9/8a9f88cf-c38b-4991-a6aa-ae143fbe150e.gif?width=100&height=100" alt=""><span>RavennaNya</span></a>
            </div>
          </div>
        </div>

        <div class="card mod-social">
          <div class="card-header hearted"><span>Links</span></div>
          <div class="card-body">
            <div class="social-links-list">
              <a class="social-link-item" href="https://x.com/HaittaNeo"><span class="social-link-platform">twitter</span></a>
              <a class="social-link-item" href="https://www.twitch.tv/haittaneo"><span class="social-link-platform">twitch</span></a>
              <a class="social-link-item" href="https://discord.com/invite/ezBtvA6M8x"><span class="social-link-platform">discord</span></a>
              <a class="social-link-item" href="https://www.youtube.com/@haittaneo"><span class="social-link-platform">youtube</span></a>
            </div>
          </div>
        </div>

        <div class="card mod-details">
          <div class="card-header hearted"><span>Details</span></div>
          <div class="card-body">
            <table class="stats-table">
              <tr><td>Generation:</td><td>Gen 6</td></tr>
              <tr><td>Friends:</td><td>132</td></tr>
              <tr><td>Comments:</td><td>4</td></tr>
              <tr><td>Languages:</td><td>English</td></tr>
            </table>
          </div>
        </div>

        <div class="card mod-song">
          <div class="card-header starred"><span>Profile Song</span></div>
          <div class="card-body">
            <iframe width="100%" height="80" src="https://www.youtube.com/embed/QO_W4I-bsHg" title="YouTube video player" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>

        <div class="card comments-card mod-comments" id="comments">
          <div class="card-header hearted"><span>~.::HaittaNEO::.~'s Friend Comments</span><a href="#">View All (9)</a></div>
          <div class="card-body">
            <div class="add-comment">
              <div class="comment-editor" contenteditable="true" role="textbox" aria-label="Leave a comment">Leave a comment for ~.::HaittaNEO::.~...</div>
              <div class="comment-editor-actions"><button class="action-btn primary" type="button">Post Comment</button></div>
            </div>

            <div class="profile-comment">
              <img class="user-avatar comment-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj4qg9twesj81xk2jxrr083z/bce74e56-20d0-4a49-a550-722ef23834a6.png?width=100&height=100" alt="Mitzii_Art">
              <div class="comment-content">
                <div class="comment-meta"><a class="comment-author-name" href="#">Mitzii_Art</a><span class="comment-time"> - 15m ago</span></div>
                <div class="comment-body">TYYY for oshiforge you are so goated
(*^_^*)</div>
                <div class="comment-actions"><a href="#">Reply</a></div>
              </div>
            </div>

            <div class="profile-comment">
              <img class="user-avatar comment-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj1r9vd4f6et9wnefs96wcc2/19121d44-1c27-4003-8477-e5af3a753c42.gif?width=100&height=100" alt="marime">
              <div class="comment-content">
                <div class="comment-meta"><a class="comment-author-name" href="#">marime</a><span class="comment-time"> - 22m ago</span></div>
                <div class="comment-body">Thank you so much for your work on Oshiforge!!</div>
                <div class="comment-actions"><a href="#">Reply</a></div>
              </div>
            </div>

            <div class="profile-comment">
              <img class="user-avatar comment-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kgtrcnf3fzsba1c29h0fcgbs/1d201d89-27d5-448a-914c-1f58f771ed7a.jpg?width=100&height=100" alt="suzy_q">
              <div class="comment-content">
                <div class="comment-meta"><a class="comment-author-name" href="#">suzy_q</a><span class="comment-time"> - 2h ago</span></div>
                <div class="comment-body">Love the layout and border glow.</div>
                <div class="comment-reply">
                  <div class="comment-meta"><a class="comment-author-name" href="#">~.::HaittaNEO::.~</a><span class="comment-time"> - 2h ago</span></div>
                  <textarea aria-label="Reply preview">Yes! That was so much fun! Let's plan another one.</textarea>
                </div>
                <div class="comment-actions"><a href="#">Reply</a></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>${previewCss}</style>
</body>
</html>`;

  $("preview").srcdoc = doc;
}

function renderAll(persist = true){
  // labels
  setHint("panelAlphaLabel", `Opacity: ${state.panelAlpha.toFixed(2)}`);
  setHint("borderAlphaLabel", `Opacity: ${state.borderAlpha.toFixed(2)}`);
  setHint("glowStrengthLabel", `Strength: ${state.glowStrength.toFixed(2)}`);
  setHint("containerWidthLabel", `${state.containerWidth}px`);
  setHint("rightColumnMaxLabel", `${state.rightColumnMax}px`);
  setHint("panelGapLabel", `${state.panelGap}px`);
  setHint("cardPaddingLabel", `${state.cardPadding}px`);
  setHint("sectionSpacingLabel", `${state.sectionSpacing}px`);
  setHint("cardBorderWidthLabel", `${state.cardBorderWidth}px`);
  setHint("frameSliceLabel", `${state.frameSlice}`);
  setHint("frameWidthLabel", `${state.frameWidth}px`);
  setHint("frameRadiusLabel", `${state.frameRadius}px`);
  setHint("decorBorderWidthLabel", `${state.decorBorderWidth}px`);
  setHint("decorBorderAlphaLabel", `Opacity: ${Number(state.decorBorderAlpha).toFixed(2)}`);
  setHint("decorBorderGlowLabel", `Glow: ${Number(state.decorBorderGlow).toFixed(2)}`);
  setHint("decorBorderRadiusLabel", `${state.decorBorderRadius}px`);
  setHint("commentsAlphaLabel", `Opacity: ${Number(state.commentsAlpha).toFixed(2)}`);
  setHint("commentPaddingLabel", `${Math.round(state.commentPadding)}px`);
  setHint("orderTop8Label", `${Math.round(state.orderTop8)}`);
  setHint("orderSocialLabel", `${Math.round(state.orderSocial)}`);
  setHint("orderDetailsLabel", `${Math.round(state.orderDetails)}`);
  setHint("orderSongLabel", `${Math.round(state.orderSong)}`);
  setHint("orderCommentsLabel", `${Math.round(state.orderComments)}`);
  setHint("leftColumnXLabel", `${Math.round(state.leftColumnX)}px`);
  setHint("leftColumnYLabel", `${Math.round(state.leftColumnY)}px`);
  setHint("rightColumnXLabel", `${Math.round(state.rightColumnX)}px`);
  setHint("rightColumnYLabel", `${Math.round(state.rightColumnY)}px`);
  setHint("top8XLabel", `${Math.round(state.top8X)}px`);
  setHint("top8YLabel", `${Math.round(state.top8Y)}px`);
  setHint("socialXLabel", `${Math.round(state.socialX)}px`);
  setHint("socialYLabel", `${Math.round(state.socialY)}px`);
  setHint("songXLabel", `${Math.round(state.songX)}px`);
  setHint("songYLabel", `${Math.round(state.songY)}px`);
  setHint("shapeChamferSizeLabel", `${Math.round(state.shapeChamferSize)}px`);
  setHint("shapeBorderWidthLabel", `${Math.round(state.shapeBorderWidth)}px`);
  setHint("hoverScaleLabel", `${Number(state.hoverScale).toFixed(2)}x`);
  setHint("shadowStrengthLabel", `x${Number(state.shadowStrength).toFixed(2)}`);
  setHint("baseFontSizeLabel", `${state.baseFontSize}px`);
  setHint("lineHeightLabel", `${Number(state.lineHeight).toFixed(2)}`);
  setHint("headerFontSizeLabel", `${state.headerFontSize}px`);
  setHint("headerLinkSizeLabel", `${state.headerLinkSize}px`);
  setHint("linkWeightLabel", `${state.linkWeight}`);
  setHint("taglineBoxAlphaLabel", `Opacity: ${Number(state.taglineBoxAlpha).toFixed(2)}`);
  setHint("taglineBoxGlowLabel", `Glow: ${Number(state.taglineBoxGlow).toFixed(2)}`);
  setHint("taglineBoxRadiusLabel", `${Math.round(state.taglineBoxRadius)}px`);
  setHint("taglineBoxPaddingLabel", `${Math.round(state.taglineBoxPadding)}px`);
  setHint("buttonAlphaLabel", `Opacity: ${state.buttonAlpha.toFixed(2)}`);
  setHint("buttonHoverAlphaLabel", `Opacity: ${state.buttonHoverAlpha.toFixed(2)}`);
  setHint("topbarAlphaLabel", `Opacity: ${state.topbarAlpha.toFixed(2)}`);
  setHint("sectionAlphaLabel", `Opacity: ${state.sectionAlpha.toFixed(2)}`);
  setHint("socialAlphaLabel", `Opacity: ${state.socialAlpha.toFixed(2)}`);
  setHint("glassBlurLabel", `${Math.round(state.glassBlur)}px blur`);
  setHint("cardRadiusLabel", `${state.cardRadius}px`);
  setHint("hoverLiftLabel", `${state.hoverLift}px`);
  setHint("avatarSizeLabel", `${state.avatarSize}px`);
  setHint("avatarBorderLabel", `${state.avatarBorder}px`);
  setHint("avatarGlowLabel", `Glow: ${Number(state.avatarGlow).toFixed(2)}`);
  setHint("nameGlowLabel", `Glow: ${Number(state.nameGlow).toFixed(2)}`);
  setHint("avatarLogoWidthLabel", `${Math.round(state.avatarLogoWidth)}px`);
  setHint("avatarLogoHeightLabel", `${Math.round(state.avatarLogoHeight)}px`);
  setHint("avatarLogoOffsetYLabel", `${Math.round(state.avatarLogoOffsetY)}px`);
  setHint("avatarLogoOpacityLabel", `Opacity: ${Number(state.avatarLogoOpacity).toFixed(2)}`);

  const cssForOutput = buildSnippetCss();
  const cssForPreview = buildCss();
  $("cssOut").value = cssForOutput;
  const snippetActive = [
    state.snippetAvatarOnly,
    state.snippetTextOnly,
    state.snippetButtonsOnly,
    state.snippetCommentsOnly,
    state.snippetTaglineOnly,
  ].some(Boolean);
  setHint("snippetWarn", snippetActive
    ? "Snippet mode is ON: copied CSS only includes selected sections."
    : "");
  const blockedImports = getDisallowedImports(cssForOutput);
  setHint("importWarn", blockedImports.length
    ? `Import warning: MyOshi only allows font hosts in @import. Check: ${blockedImports.join(", ")}`
    : "");

  renderPreview(cssForPreview);
  applyUiMode();
  if (persist) saveDraft();
}

window.addEventListener("DOMContentLoaded", initUI);
