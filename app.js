/* OshiForge - MyOshi CSS builder (GitHub Pages friendly)
   - Live preview via iframe srcdoc
   - State -> CSS generator
   - Import/Export JSON
   - Share URL hash (base64 JSON)
*/

const DEFAULT_STATE = {
  meta: { name: "OshiForge Theme" },

  vars: {
    text: "#EBF3FF",
    textDim: "#AAB6C8",
    panel: "#0A0E16",
    panel2: "#101624",
    border: "#49F6FF",
    borderSoft: "#2B3446",

    cyan: "#49F6FF",
    blue: "#3B82FF",
    purple: "#B36BFF",
    amber: "#FFD75F",
    green: "#00FF9C",
    pink: "#FF4FD8"
  },

  effects: { blur: 14, shadow: 62, glow: 40 },

  type: {
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Courier New\", monospace",
    nameSize: 22,
    headerCaps: "uppercase"
  },

  layout: {
    cardRadius: 18,
    cardPadding: 14,
    hoverLift: 4,
    avatarSize: 220,
    avatarShape: "hex",
    avatarBorder: 2
  },

  background: {
    url: "",
    pos: "center top",
    attach: "fixed"
  },

  sections: {
    topbar: { enabled: true, custom: "" },
    cards: { enabled: true, custom: "" },
    avatar: { enabled: true, custom: "" },
    tagline: { enabled: true, custom: "" },
    contactButtons: { enabled: true, custom: "" },
    sectionLinks: { enabled: true, custom: "" },
    socialLinks: { enabled: true, custom: "" },
    friends: { enabled: true, custom: "" },
    media: { enabled: true, custom: "" },
    comments: { enabled: false, custom: "" }
  },

  extraCss: ""
};

let state = deepClone(DEFAULT_STATE);

// --- DOM refs
const el = (id) => document.getElementById(id);

const presetSelect = el("presetSelect");
const lockScheme = el("lockScheme");
const enablePreviewBg = el("enablePreviewBg");

const cssOutput = el("cssOutput");
const extraCss = el("extraCss");

const previewFrame = el("previewFrame");

const selectorHelper = el("selectorHelper");

// Theme controls
const cText = el("cText");
const cTextDim = el("cTextDim");
const cPanel = el("cPanel");
const cPanel2 = el("cPanel2");
const cBorder = el("cBorder");
const cBorderSoft = el("cBorderSoft");

const aCyan = el("aCyan");
const aBlue = el("aBlue");
const aPurple = el("aPurple");
const aAmber = el("aAmber");
const aGreen = el("aGreen");
const aPink = el("aPink");

const blur = el("blur");
const shadow = el("shadow");
const glow = el("glow");
const blurVal = el("blurVal");
const shadowVal = el("shadowVal");
const glowVal = el("glowVal");

const fontFamily = el("fontFamily");
const nameSize = el("nameSize");
const nameSizeVal = el("nameSizeVal");
const headerCaps = el("headerCaps");

// Layout controls
const cardRadius = el("cardRadius");
const cardRadiusVal = el("cardRadiusVal");
const cardPadding = el("cardPadding");
const cardPaddingVal = el("cardPaddingVal");
const hoverLift = el("hoverLift");
const hoverLiftVal = el("hoverLiftVal");

const avatarSize = el("avatarSize");
const avatarSizeVal = el("avatarSizeVal");
const avatarShape = el("avatarShape");
const avatarBorder = el("avatarBorder");
const avatarBorderVal = el("avatarBorderVal");

const bgUrl = el("bgUrl");
const bgPos = el("bgPos");
const bgAttach = el("bgAttach");

// Buttons
el("btnCopyCss").addEventListener("click", copyCss);
el("btnCopyCss2").addEventListener("click", copyCss);
el("btnDownloadJson").addEventListener("click", downloadJson);
el("btnShare").addEventListener("click", shareLink);
el("btnReset").addEventListener("click", () => {
  state = deepClone(DEFAULT_STATE);
  // If a preset exists, default to first preset's state (nicer UX)
  const first = (window.OSHIFORGE_PRESETS || [])[0];
  if (first?.state) state = mergeDeep(deepClone(DEFAULT_STATE), deepClone(first.state));
  syncUIFromState();
  renderAll();
});

// Import JSON file
el("fileImportJson").addEventListener("change", async (e) => {
  const file = e.target.files?.[0];
  if (!file) return;
  try {
    const txt = await file.text();
    const obj = JSON.parse(txt);
    state = mergeDeep(deepClone(DEFAULT_STATE), obj);
    syncUIFromState();
    renderAll();
  } catch (err) {
    alert("Import failed: invalid JSON.");
  } finally {
    e.target.value = "";
  }
});

// Tabs
document.querySelectorAll(".tab").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".tab").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tabPanel").forEach(p => p.classList.remove("active"));
    btn.classList.add("active");
    el(`tab-${btn.dataset.tab}`).classList.add("active");
  });
});

// --- Sections accordion build
const SECTIONS = [
  {
    key: "topbar",
    title: "Top bar / Breadcrumb",
    desc: "The translucent bar at top of profile pages."
  },
  {
    key: "cards",
    title: "Cards (global)",
    desc: "All cards: background, border, hover, header gradient."
  },
  {
    key: "avatar",
    title: "Avatar (profile picture)",
    desc: "Avatar size, shape, border and glow."
  },
  {
    key: "tagline",
    title: "Tagline pill",
    desc: "The small tagline text box under username."
  },
  {
    key: "contactButtons",
    title: "Contact buttons (Add Friend / Message / Boop)",
    desc: "Styles both <a> and <button> versions; fixes “stubborn white buttons”."
  },
  {
    key: "sectionLinks",
    title: "Section links row",
    desc: "View Journals / Photos / Groups / Places row."
  },
  {
    key: "socialLinks",
    title: "Social links list",
    desc: "Twitter/Twitch/Discord/etc blocks."
  },
  {
    key: "friends",
    title: "Friends grid",
    desc: "Top friends item cards."
  },
  {
    key: "media",
    title: "Embeds & media (iframes)",
    desc: "YouTube embeds, iframes, etc."
  },
  {
    key: "comments",
    title: "Comments editor / comment blocks",
    desc: "Optional: styles comment editor + comment cards."
  }
];

function buildSectionsAccordion() {
  const root = el("sectionsAccordion");
  root.innerHTML = "";

  SECTIONS.forEach((s, idx) => {
    const item = document.createElement("div");
    item.className = "accItem" + (idx === 0 ? " open" : "");
    const head = document.createElement("div");
    head.className = "accHead";
    head.innerHTML = `
      <div>
        <b>${escapeHtml(s.title)}</b>
        <div class="mini">${escapeHtml(s.desc)}</div>
      </div>
      <div class="mini">${idx === 0 ? "▼" : "▶"}</div>
    `;

    const body = document.createElement("div");
    body.className = "accBody";
    body.innerHTML = `
      <label class="check" style="margin-bottom:8px">
        <input type="checkbox" data-sec-enabled="${s.key}">
        <span>Enable ${escapeHtml(s.title)}</span>
      </label>

      <label class="field" style="border-bottom:none; padding: 0 0 8px 0">
        <span>Custom CSS for this section</span>
      </label>
      <textarea class="code" spellcheck="false" data-sec-custom="${s.key}" placeholder="/* optional overrides for ${s.key} */"></textarea>

      <div class="hint" style="margin-top:8px">
        The generator writes “safe defaults” for this section. Your custom CSS is appended after it.
      </div>
    `;

    head.addEventListener("click", () => {
      const open = item.classList.toggle("open");
      head.querySelector(".mini:last-child").textContent = open ? "▼" : "▶";
    });

    item.appendChild(head);
    item.appendChild(body);
    root.appendChild(item);
  });

  // Wire inputs
  root.querySelectorAll("input[data-sec-enabled]").forEach(cb => {
    cb.addEventListener("change", (e) => {
      const key = e.target.dataset.secEnabled;
      state.sections[key].enabled = !!e.target.checked;
      renderAll();
    });
  });

  root.querySelectorAll("textarea[data-sec-custom]").forEach(tx => {
    tx.addEventListener("input", (e) => {
      const key = e.target.dataset.secCustom;
      state.sections[key].custom = e.target.value || "";
      renderAll();
    });
  });
}

// --- Presets
function loadPresets() {
  const presets = window.OSHIFORGE_PRESETS || [];
  presetSelect.innerHTML = "";
  presets.forEach(p => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    presetSelect.appendChild(opt);
  });

  presetSelect.addEventListener("change", () => {
    const chosen = presets.find(p => p.id === presetSelect.value);
    if (!chosen) return;
    state = mergeDeep(deepClone(DEFAULT_STATE), deepClone(chosen.state || {}));
    syncUIFromState();
    renderAll();
  });
}

// --- UI wiring
function wireControls() {
  // Core colors
  cText.addEventListener("input", () => { state.vars.text = cText.value; renderAll(); });
  cTextDim.addEventListener("input", () => { state.vars.textDim = cTextDim.value; renderAll(); });
  cPanel.addEventListener("input", () => { state.vars.panel = cPanel.value; renderAll(); });
  cPanel2.addEventListener("input", () => { state.vars.panel2 = cPanel2.value; renderAll(); });
  cBorder.addEventListener("input", () => { state.vars.border = cBorder.value; renderAll(); });
  cBorderSoft.addEventListener("input", () => { state.vars.borderSoft = cBorderSoft.value; renderAll(); });

  // Accents (scheme lock optional)
  aCyan.addEventListener("input", () => {
    state.vars.cyan = aCyan.value;
    if (lockScheme.checked) syncAccentsFromCyan(aCyan.value);
    syncUIFromState(); // keep the pickers in sync
    renderAll();
  });
  aBlue.addEventListener("input", () => { state.vars.blue = aBlue.value; renderAll(); });
  aPurple.addEventListener("input", () => { state.vars.purple = aPurple.value; renderAll(); });
  aAmber.addEventListener("input", () => { state.vars.amber = aAmber.value; renderAll(); });
  aGreen.addEventListener("input", () => { state.vars.green = aGreen.value; renderAll(); });
  aPink.addEventListener("input", () => { state.vars.pink = aPink.value; renderAll(); });

  // Effects
  blur.addEventListener("input", () => { state.effects.blur = +blur.value; renderAll(); });
  shadow.addEventListener("input", () => { state.effects.shadow = +shadow.value; renderAll(); });
  glow.addEventListener("input", () => { state.effects.glow = +glow.value; renderAll(); });

  // Typography
  fontFamily.addEventListener("change", () => { state.type.fontFamily = fontFamily.value; renderAll(); });
  nameSize.addEventListener("input", () => { state.type.nameSize = +nameSize.value; renderAll(); });
  headerCaps.addEventListener("change", () => { state.type.headerCaps = headerCaps.value; renderAll(); });

  // Layout
  cardRadius.addEventListener("input", () => { state.layout.cardRadius = +cardRadius.value; renderAll(); });
  cardPadding.addEventListener("input", () => { state.layout.cardPadding = +cardPadding.value; renderAll(); });
  hoverLift.addEventListener("input", () => { state.layout.hoverLift = +hoverLift.value; renderAll(); });

  avatarSize.addEventListener("input", () => { state.layout.avatarSize = +avatarSize.value; renderAll(); });
  avatarShape.addEventListener("change", () => { state.layout.avatarShape = avatarShape.value; renderAll(); });
  avatarBorder.addEventListener("input", () => { state.layout.avatarBorder = +avatarBorder.value; renderAll(); });

  // Background
  bgUrl.addEventListener("input", () => { state.background.url = bgUrl.value; renderAll(); });
  bgPos.addEventListener("change", () => { state.background.pos = bgPos.value; renderAll(); });
  bgAttach.addEventListener("change", () => { state.background.attach = bgAttach.value; renderAll(); });

  // Extra CSS
  extraCss.addEventListener("input", () => { state.extraCss = extraCss.value || ""; renderAll(); });

  enablePreviewBg.addEventListener("change", () => {
    renderPreview();
  });
}

// --- Render pipeline
function renderAll() {
  // Update range labels
  blurVal.textContent = `${state.effects.blur}px`;
  shadowVal.textContent = `${state.effects.shadow}%`;
  glowVal.textContent = `${state.effects.glow}%`;

  nameSizeVal.textContent = `${state.type.nameSize}px`;

  cardRadiusVal.textContent = `${state.layout.cardRadius}px`;
  cardPaddingVal.textContent = `${state.layout.cardPadding}px`;
  hoverLiftVal.textContent = `${state.layout.hoverLift}px`;

  avatarSizeVal.textContent = `${state.layout.avatarSize}px`;
  avatarBorderVal.textContent = `${state.layout.avatarBorder}px`;

  // CSS output
  const css = buildCss(state);
  cssOutput.value = css;

  // preview
  renderPreview();

  // helper
  selectorHelper.textContent = buildSelectorHelper();
}

// --- CSS generator (the important part)
function buildCss(s) {
  const selector = `.profile-page.profile-custom-css`;

  const blurPx = clamp(s.effects.blur, 0, 28);
  const shadowPct = clamp(s.effects.shadow, 0, 100) / 100; // 0..1
  const glowPct = clamp(s.effects.glow, 0, 100) / 100;

  // Derived
  const panelRGBA = hexToRgba(s.vars.panel, 0.78);
  const panel2RGBA = hexToRgba(s.vars.panel2, 0.66);

  const borderMain = hexToRgba(s.vars.border, 0.22);
  const borderHover = hexToRgba(s.vars.border, 0.45);

  const glow1 = hexToRgba(s.vars.cyan, 0.18 * glowPct);
  const glow2 = hexToRgba(s.vars.blue, 0.10 * glowPct);

  const shadow = `0 14px 40px rgba(0,0,0,${(0.62 * shadowPct).toFixed(3)})`;

  const cardRadiusPx = `${s.layout.cardRadius}px`;
  const cardPadPx = `${s.layout.cardPadding}px`;
  const hoverLiftPx = `${s.layout.hoverLift}px`;

  const avatarSizePx = `${s.layout.avatarSize}px`;
  const avatarBorderPx = `${s.layout.avatarBorder}px`;
  const avatarClip = (s.layout.avatarShape === "hex")
    ? `polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)`
    : (s.layout.avatarShape === "circle")
      ? `circle(50% at 50% 50%)`
      : null;

  const bgUrl = (s.background.url || "").trim();
  const bgCss = bgUrl
    ? `${selector}{background-image:url(${cssUrl(bgUrl)});background-size:cover;background-position:${s.background.pos};background-attachment:${s.background.attach};background-repeat:no-repeat;}`
    : `${selector}{background-image:none;}`;

  // Start building in sections so toggles can drop blocks cleanly
  let out = "";
  out += `/* OshiForge CSS — ${s.meta?.name || "Theme"} */\n`;
  out += `/* Paste into MyOshi "Custom CSS" */\n\n`;

  out += bgCss + "\n\n";

  // Global tokens
  out += `${selector}{\n`;
  out += `  --of-text: ${hexToRgba(s.vars.text, 0.94)};\n`;
  out += `  --of-text-dim: ${hexToRgba(s.vars.textDim, 0.70)};\n`;
  out += `  --of-panel: ${panelRGBA};\n`;
  out += `  --of-panel-2: ${panel2RGBA};\n`;
  out += `  --of-border: ${borderMain};\n`;
  out += `  --of-border-soft: ${hexToRgba(s.vars.borderSoft, 0.20)};\n`;
  out += `  --of-shadow: ${shadow};\n`;
  out += `  --of-glow: 0 0 18px ${glow1}, 0 0 42px ${glow2};\n`;
  out += `  --of-glow-strong: 0 0 40px ${hexToRgba(s.vars.cyan, 0.45 * glowPct)}, 0 0 90px ${hexToRgba(s.vars.blue, 0.18 * glowPct)};\n`;
  out += `  --of-blur: ${blurPx}px;\n`;
  out += `  --of-card-radius: ${cardRadiusPx};\n`;
  out += `  --of-card-pad: ${cardPadPx};\n`;
  out += `  --of-hover-lift: ${hoverLiftPx};\n`;
  out += `  --of-cyan: ${s.vars.cyan};\n`;
  out += `  --of-blue: ${s.vars.blue};\n`;
  out += `  --of-purple: ${s.vars.purple};\n`;
  out += `  --of-amber: ${s.vars.amber};\n`;
  out += `  --of-green: ${s.vars.green};\n`;
  out += `  --of-pink: ${s.vars.pink};\n`;
  out += `  color: var(--of-text);\n`;
  out += `  font-family: ${s.type.fontFamily};\n`;
  out += `}\n\n`;

  // Links
  out += `${selector} a{color:${hexToRgba(s.vars.cyan, 0.90)};text-decoration:none;transition:color 140ms ease,text-shadow 140ms ease,transform 140ms ease;}\n`;
  out += `${selector} a:hover{color:${s.vars.cyan};text-shadow:0 0 14px ${hexToRgba(s.vars.cyan, 0.35)};}\n\n`;

  // Topbar
  if (s.sections.topbar.enabled) {
    out += `/* Top bar */\n`;
    out += `${selector} .profile-top-bar, ${selector} .profile-top-bar *{background:transparent !important;}\n`;
    out += `${selector} .profile-top-bar{background:${hexToRgba("#000000",0.55)} !important;border:1px solid ${hexToRgba("#ffffff",0.06)} !important;border-radius:14px !important;box-shadow:0 10px 30px ${hexToRgba("#000000",0.55)} !important;backdrop-filter:blur(var(--of-blur));-webkit-backdrop-filter:blur(var(--of-blur));padding:10px 12px !important;}\n\n`;
    out += (s.sections.topbar.custom || "") + "\n\n";
  }

  // Container background
  out += `${selector} .container{background:transparent !important;}\n\n`;

  // Cards
  if (s.sections.cards.enabled) {
    out += `/* Cards */\n`;
    out += `${selector} .card{position:relative;background:linear-gradient(180deg,${hexToRgba("#ffffff",0.05)},${hexToRgba("#ffffff",0.00)} 40%),linear-gradient(135deg,${hexToRgba(s.vars.cyan,0.08)},${hexToRgba(s.vars.blue,0.06)} 45%,${hexToRgba("#000000",0)} 75%),var(--of-panel);border:1px solid var(--of-border);border-radius:var(--of-card-radius);box-shadow:var(--of-shadow);backdrop-filter:blur(var(--of-blur));-webkit-backdrop-filter:blur(var(--of-blur));overflow:hidden;transition:transform 240ms cubic-bezier(.2,.8,.2,1),box-shadow 240ms cubic-bezier(.2,.8,.2,1),border-color 240ms cubic-bezier(.2,.8,.2,1);}\n`;
    out += `${selector} .card:hover{transform:translateY(calc(-1 * var(--of-hover-lift)));border-color:${borderHover};box-shadow:var(--of-shadow),var(--of-glow-strong);}\n`;
    out += `${selector} .card .card-body{padding:var(--of-card-pad) !important;}\n`;
    out += `${selector} .card-header{background:linear-gradient(90deg,${hexToRgba(s.vars.cyan,0.18)},${hexToRgba(s.vars.blue,0.14)},${hexToRgba(s.vars.purple,0.10)});border-bottom:1px solid ${hexToRgba("#ffffff",0.08)};letter-spacing:1.3px;font-size:12px;text-transform:${s.type.headerCaps};}\n`;
    out += `${selector} .card-header.starred::before{content:"⛧" !important;margin-right:8px;color:var(--of-cyan);}\n`;
    out += `${selector} .card-header.hearted::before{content:"⛓" !important;margin-right:8px;color:var(--of-blue);}\n\n`;
    out += (s.sections.cards.custom || "") + "\n\n";
  }

  // Avatar
  if (s.sections.avatar.enabled) {
    out += `/* Avatar */\n`;
    out += `${selector} img.user-avatar.profile-avatar{width:${avatarSizePx} !important;height:${avatarSizePx} !important;max-width:${avatarSizePx} !important;max-height:${avatarSizePx} !important;object-fit:cover !important;overflow:hidden !important;`;
    if (avatarClip) {
      if (s.layout.avatarShape === "hex") {
        out += `border-radius:0 !important;clip-path:${avatarClip} !important;-webkit-clip-path:${avatarClip} !important;`;
      } else if (s.layout.avatarShape === "circle") {
        out += `border-radius:999px !important;clip-path:none !important;-webkit-clip-path:none !important;`;
      } else {
        out += `border-radius:16px !important;clip-path:none !important;-webkit-clip-path:none !important;`;
      }
    }
    out += `border:${avatarBorderPx} solid ${hexToRgba(s.vars.cyan,0.55)} !important;background:${hexToRgba("#000000",0.35)};box-shadow:0 0 ${Math.round(30*glowPct)}px ${hexToRgba(s.vars.cyan,0.45*glowPct)},0 0 ${Math.round(80*glowPct)}px ${hexToRgba(s.vars.blue,0.25*glowPct)},0 18px 50px ${hexToRgba("#000000",0.85)} !important;transition:transform 0.25s ease,box-shadow 0.25s ease,filter 0.25s ease,border-color 0.25s ease;}\n`;
    out += `${selector} img.user-avatar.profile-avatar:hover{transform:scale(1.08) translateY(-4px);border-color:${s.vars.cyan} !important;box-shadow:0 0 ${Math.round(45*glowPct)}px ${hexToRgba(s.vars.cyan,0.80*glowPct)},0 0 ${Math.round(120*glowPct)}px ${hexToRgba(s.vars.blue,0.45*glowPct)},0 0 ${Math.round(200*glowPct)}px ${hexToRgba(s.vars.cyan,0.25*glowPct)},0 30px 80px ${hexToRgba("#000000",0.95)} !important;filter:saturate(1.15) brightness(1.08);}\n\n`;
    out += (s.sections.avatar.custom || "") + "\n\n";
  }

  // Name + username
  out += `/* Identity text */\n`;
  out += `${selector} .profile-display-name{font-size:${s.type.nameSize}px;font-weight:900;letter-spacing:0.4px;text-shadow:0 0 16px ${hexToRgba(s.vars.cyan,0.35*glowPct)},0 0 40px ${hexToRgba(s.vars.blue,0.18*glowPct)};}\n`;
  out += `${selector} .profile-username{color:${hexToRgba(s.vars.cyan,0.90)};}\n`;
  out += `${selector} .profile-online-status, ${selector} .profile-boop-stats{color:var(--of-text-dim);}\n\n`;

  // Tagline
  if (s.sections.tagline.enabled) {
    out += `/* Tagline pill */\n`;
    out += `${selector} .profile-tagline{margin-top:10px;display:inline-block;max-width:92%;padding:7px 12px;color:${s.vars.cyan} !important;font-size:12.5px;font-weight:850;letter-spacing:0.35px;line-height:1.35;background:linear-gradient(90deg,${hexToRgba(s.vars.cyan,0.18)},${hexToRgba(s.vars.blue,0.20)},${hexToRgba("#000000",0.10)}) !important;border:1px solid ${hexToRgba(s.vars.cyan,0.45)} !important;border-radius:10px;text-shadow:0 0 10px ${hexToRgba(s.vars.cyan,0.55*glowPct)},0 0 22px ${hexToRgba(s.vars.blue,0.25*glowPct)};box-shadow:0 0 18px ${hexToRgba(s.vars.cyan,0.12*glowPct)};transition:transform 220ms ease,box-shadow 220ms ease,border-color 220ms ease,filter 220ms ease;}\n`;
    out += `${selector} .profile-tagline:hover{transform:translateY(-2px) scale(1.02);border-color:${hexToRgba(s.vars.cyan,0.75)} !important;box-shadow:0 0 28px ${hexToRgba(s.vars.cyan,0.22*glowPct)},0 0 70px ${hexToRgba(s.vars.blue,0.18*glowPct)};filter:saturate(1.08);}\n\n`;
    out += (s.sections.tagline.custom || "") + "\n\n";
  }

  // Friends grid
  if (s.sections.friends.enabled) {
    out += `/* Friends grid items */\n`;
    out += `${selector} a.friend-item{background:linear-gradient(135deg,${hexToRgba(s.vars.cyan,0.08)},${hexToRgba(s.vars.blue,0.06)}),${hexToRgba("#000000",0.22)};border:1px solid ${hexToRgba("#ffffff",0.08)};border-radius:14px;transition:all 0.25s ease;}\n`;
    out += `${selector} a.friend-item:hover{transform:translateY(-4px) scale(1.02);border-color:${hexToRgba(s.vars.cyan,0.50)};box-shadow:0 0 28px ${hexToRgba(s.vars.cyan,0.25*glowPct)},0 12px 30px ${hexToRgba("#000000",0.60)};}\n\n`;
    out += (s.sections.friends.custom || "") + "\n\n";
  }

  // Media iframes
  if (s.sections.media.enabled) {
    out += `/* Embeds / iframes */\n`;
    out += `${selector} iframe{border-radius:18px !important;border:1px solid ${hexToRgba("#ffffff",0.10)};box-shadow:0 18px 40px ${hexToRgba("#000000",0.55)};transition:transform 0.25s ease,box-shadow 0.25s ease;}\n`;
    out += `${selector} iframe:hover{transform:translateY(-3px);box-shadow:0 24px 60px ${hexToRgba("#000000",0.70)},0 0 35px ${hexToRgba(s.vars.cyan,0.18*glowPct)};}\n\n`;
    out += (s.sections.media.custom || "") + "\n\n";
  }

  // Section links
  if (s.sections.sectionLinks.enabled) {
    out += `/* Section links row */\n`;
    out += `${selector} .section-links{background:${hexToRgba(s.vars.panel,0.70)} !important;border:1px solid ${hexToRgba(s.vars.cyan,0.20)} !important;border-radius:14px !important;box-shadow:0 14px 34px ${hexToRgba("#000000",0.55)} !important;backdrop-filter:blur(var(--of-blur));-webkit-backdrop-filter:blur(var(--of-blur));overflow:hidden;}\n`;
    out += `${selector} .section-links a{display:inline-block;padding:10px 12px;color:${hexToRgba(s.vars.text,0.90)} !important;border-right:1px solid ${hexToRgba("#ffffff",0.07)};}\n`;
    out += `${selector} .section-links a:last-child{border-right:none;}\n`;
    out += `${selector} .section-links a:hover{background:${hexToRgba(s.vars.panel2,0.75)} !important;color:${s.vars.cyan} !important;text-shadow:0 0 14px ${hexToRgba(s.vars.cyan,0.35*glowPct)};}\n\n`;
    out += (s.sections.sectionLinks.custom || "") + "\n\n";
  }

  // Social links
  if (s.sections.socialLinks.enabled) {
    out += `/* Social links */\n`;
    out += `${selector} .social-links-list .social-link-item{background:${hexToRgba(s.vars.panel2,0.78)} !important;border:1px solid ${hexToRgba(s.vars.cyan,0.22)} !important;border-radius:12px !important;box-shadow:0 10px 24px ${hexToRgba("#000000",0.55)} !important;}\n`;
    out += `${selector} .social-links-list .social-link-item:hover{background:${hexToRgba(s.vars.panel2,0.86)} !important;border-color:${hexToRgba(s.vars.cyan,0.55)} !important;box-shadow:0 14px 34px ${hexToRgba("#000000",0.62)},0 0 28px ${hexToRgba(s.vars.cyan,0.22*glowPct)} !important;}\n`;
    out += `${selector} .social-links-list .social-link-platform{color:${hexToRgba(s.vars.text,0.92)} !important;letter-spacing:0.6px;}\n\n`;
    out += (s.sections.socialLinks.custom || "") + "\n\n";
  }

  // Contact buttons (the “stubborn white buttons” fix)
  if (s.sections.contactButtons.enabled) {
    out += `/* Contact buttons: Add Friend / Send Message / Boop */\n`;
    out += `${selector} .profile-contact-links a.contact-link,\n`;
    out += `${selector} .profile-contact-links a.boop-link,\n`;
    out += `${selector} a.contact-link,\n`;
    out += `${selector} a.boop-link,\n`;
    out += `${selector} .profile-contact-links button,\n`;
    out += `${selector} .profile-contact-links .action-btn,\n`;
    out += `${selector} button.action-btn,\n`;
    out += `${selector} button[class*="contact"],\n`;
    out += `${selector} button[class*="boop"]{\n`;
    out += `  background:${hexToRgba(s.vars.panel2,0.78)} !important;\n`;
    out += `  color:${hexToRgba(s.vars.text,0.92)} !important;\n`;
    out += `  border:1px solid ${hexToRgba(s.vars.cyan,0.28)} !important;\n`;
    out += `  border-radius:12px !important;\n`;
    out += `  text-decoration:none !important;\n`;
    out += `  box-shadow:0 10px 24px ${hexToRgba("#000000",0.55)},0 0 18px ${hexToRgba(s.vars.cyan,0.12*glowPct)} !important;\n`;
    out += `  backdrop-filter:blur(var(--of-blur));\n`;
    out += `  -webkit-backdrop-filter:blur(var(--of-blur));\n`;
    out += `  transition:transform 180ms cubic-bezier(.2,.8,.2,1),box-shadow 180ms cubic-bezier(.2,.8,.2,1),border-color 180ms cubic-bezier(.2,.8,.2,1),background 180ms cubic-bezier(.2,.8,.2,1);\n`;
    out += `}\n`;

    out += `${selector} .profile-contact-links a.contact-link:hover,\n`;
    out += `${selector} .profile-contact-links a.boop-link:hover,\n`;
    out += `${selector} a.contact-link:hover,\n`;
    out += `${selector} a.boop-link:hover,\n`;
    out += `${selector} .profile-contact-links button:hover,\n`;
    out += `${selector} .profile-contact-links .action-btn:hover,\n`;
    out += `${selector} button.action-btn:hover,\n`;
    out += `${selector} button[class*="contact"]:hover,\n`;
    out += `${selector} button[class*="boop"]:hover{\n`;
    out += `  transform:translateY(-2px);\n`;
    out += `  background:${hexToRgba(s.vars.panel2,0.86)} !important;\n`;
    out += `  border-color:${hexToRgba(s.vars.cyan,0.55)} !important;\n`;
    out += `  box-shadow:0 14px 34px ${hexToRgba("#000000",0.62)},0 0 28px ${hexToRgba(s.vars.cyan,0.22*glowPct)} !important;\n`;
    out += `}\n`;

    // Also catch "white text" from :visited
    out += `${selector} .profile-contact-links a.contact-link:visited,\n`;
    out += `${selector} .profile-contact-links a.boop-link:visited,\n`;
    out += `${selector} a.contact-link:visited,\n`;
    out += `${selector} a.boop-link:visited{color:${hexToRgba(s.vars.text,0.92)} !important;}\n\n`;

    out += (s.sections.contactButtons.custom || "") + "\n\n";
  }

  // Comments optional
  if (s.sections.comments.enabled) {
    out += `/* Comments (optional) */\n`;
    out += `${selector} .add-comment [contenteditable="true"]{background:${hexToRgba(s.vars.panel2,0.60)} !important;color:${hexToRgba(s.vars.text,0.92)} !important;border:1px solid ${hexToRgba(s.vars.cyan,0.22)} !important;border-radius:12px !important;}\n`;
    out += `${selector} .profile-comment{border-left:1px solid ${hexToRgba(s.vars.cyan,0.16)} !important;}\n\n`;
    out += (s.sections.comments.custom || "") + "\n\n";
  }

  // Global extra CSS
  if ((s.extraCss || "").trim()) {
    out += `/* Extra CSS (global) */\n`;
    out += `${s.extraCss}\n`;
  }

  return out.trim() + "\n";
}

// --- Preview generator
function renderPreview() {
  const css = cssOutput.value || buildCss(state);
  const showBg = enablePreviewBg.checked;

  const bgInline = (showBg && state.background.url)
    ? `style="background-image:url(${escapeAttr(state.background.url)});background-size:cover;background-position:${escapeAttr(state.background.pos)};background-attachment:${escapeAttr(state.background.attach)};background-repeat:no-repeat"`
    : `style="background:#0b0f18"`;

  const srcdoc = `
<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  body{margin:0;background:#0b0f18;color:#eaf2ff;font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;}
  .wrap{padding:14px;}
  /* Minimal "MyOshi-ish" base styles (so your custom CSS has something to target) */
  .profile-page.profile-custom-css .container{max-width:1080px;margin:0 auto;}
  .profile-layout{display:grid;grid-template-columns: 360px 1fr;gap:14px;}
  @media (max-width: 900px){ .profile-layout{grid-template-columns:1fr;} }

  .profile-top-bar{padding:10px 12px;border-radius:14px;background:rgba(0,0,0,0.25);border:1px solid rgba(255,255,255,0.08);}
  .profile-breadcrumb{font-size:12px;color:rgba(255,255,255,0.75);}
  .profile-breadcrumb a{color:rgba(255,255,255,0.85);}

  .card{background:#111827;border:1px solid rgba(255,255,255,0.10);border-radius:16px;overflow:hidden;}
  .card-header{padding:10px 12px;font-size:12px;font-weight:700;background:rgba(255,255,255,0.04);display:flex;align-items:center;justify-content:space-between;}
  .card-body{padding:14px;}

  .profile-main-card .profile-display-name{margin-top:10px;font-weight:900;}
  .profile-username{opacity:0.9;}
  .profile-tagline{margin-top:10px;opacity:0.95;}
  .profile-oshi-mark{margin-top:8px;}
  .profile-online-status,.profile-boop-stats{margin-top:6px;font-size:12px;color:rgba(255,255,255,0.70);}
  .profile-url-box{margin-top:10px;font-size:12px;color:rgba(255,255,255,0.70);}
  .profile-url-box code{background:rgba(0,0,0,0.25);padding:6px 8px;border-radius:10px;border:1px solid rgba(255,255,255,0.10);}

  .profile-contact-links{display:flex;gap:10px;flex-wrap:wrap;margin-top:12px;justify-content:center;}
  .profile-contact-links a, .profile-contact-links button{
    border:1px solid rgba(255,255,255,0.14);
    background:#ffffff; /* intentionally "bad" so your CSS fix is obvious */
    color:#111;
    padding:10px 12px;
    border-radius:12px;
    cursor:pointer;
    font-weight:700;
  }

  .friends-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  a.friend-item{display:flex;align-items:center;gap:10px;padding:10px;border-radius:14px;border:1px solid rgba(255,255,255,0.10);color:rgba(255,255,255,0.92);text-decoration:none;}
  .friend-avatar{width:46px;height:46px;border-radius:14px;border:1px solid rgba(255,255,255,0.14);object-fit:cover;}
  .friend-name{font-weight:700;font-size:12px;}

  .social-links-list{display:grid;grid-template-columns:1fr 1fr;gap:10px;}
  .social-link-item{display:block;padding:10px 12px;border-radius:12px;border:1px solid rgba(255,255,255,0.10);text-decoration:none;}
  .social-link-platform{text-transform:lowercase;font-weight:800;font-size:12px;color:rgba(255,255,255,0.85);}

  .section-links{display:flex;gap:0;margin-top:14px;border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.10);}
  .section-links a{flex:1;text-align:center;padding:10px 12px;color:rgba(255,255,255,0.85);text-decoration:none;background:rgba(0,0,0,0.20);}
  .section-links a:hover{background:rgba(255,255,255,0.06);}

  iframe{width:100%;height:86px;border:0;border-radius:10px;background:#000;}
</style>

<style>
${css}
</style>
</head>

<body>
  <div class="wrap">
    <div class="profile-page profile-custom-css" ${bgInline}>
      <div class="container">

        <div class="profile-top-bar">
          <div class="profile-breadcrumb"><a href="#">Home</a> &gt; <a href="#">Browse</a> &gt; <strong>~.::ℍ𝕒𝕚𝕥𝕥𝕒ℕ𝔼𝕆::.~</strong></div>
        </div>

        <div class="profile-layout" style="margin-top:14px;">
          <div class="profile-left">
            <div class="card profile-main-card">
              <div class="card-header starred">
                <span>~.::ℍ𝕒𝕚𝕥𝕥𝕒ℕ𝔼𝕆::.~</span>
                <a href="#" style="font-weight:800">Edit</a>
              </div>
              <div class="card-body" style="text-align:center">

                <img class="user-avatar profile-avatar" alt="avatar"
                  src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj21f4b6fzxsgz6xxpky3tya/11a59534-cfce-40c9-8c63-835b38c4015b.png"
                  style="width:100px;height:100px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;object-fit:cover" />

                <div class="profile-display-name">~.::ℍ𝕒𝕚𝕥𝕥𝕒ℕ𝔼𝕆::.~</div>
                <div class="profile-username">@haittaneo</div>
                <div class="profile-tagline">"Full stack do it from the front and the backend"</div>
                <div class="profile-oshi-mark">😈🛜</div>
                <div class="profile-online-status">Last online just now</div>
                <div class="profile-boop-stats"><span>👉 53 boops received</span></div>
                <div class="profile-url-box"><code>myoshi.co/haittaneo</code></div>

                <div class="profile-contact-links">
                  <button class="action-btn">Add Friend</button>
                  <button class="action-btn">Send Message</button>
                  <button class="action-btn">Boop</button>
                </div>
              </div>
            </div>

            <div class="card" style="margin-top:14px;">
              <div class="card-header starred" style="display:flex;justify-content:space-between">
                <span>Top Friends</span>
                <a href="#">View All</a>
              </div>
              <div class="card-body">
                <div class="friends-grid">
                  <a class="friend-item" href="#">
                    <img class="user-avatar friend-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj228g4ef6etbrd4kdx42wws/df876dab-190c-40f5-9582-ba9d57a441bb.gif" />
                    <span class="friend-name">RoeBunny</span>
                  </a>
                  <a class="friend-item" href="#">
                    <img class="user-avatar friend-avatar" src="https://myoshi.jinxxy-cdn.com/avatars/user_01kj1mg5j9fk2b74rq9cgpf0br/55c8b98a-4836-4a1d-a374-a5f2b85b215a.gif" />
                    <span class="friend-name">lunaerys</span>
                  </a>
                </div>
              </div>
            </div>

            <div class="card" style="margin-top:14px;">
              <div class="card-header hearted">Links</div>
              <div class="card-body">
                <div class="social-links-list">
                  <a class="social-link-item" href="#"><span class="social-link-platform">twitter</span></a>
                  <a class="social-link-item" href="#"><span class="social-link-platform">twitch</span></a>
                  <a class="social-link-item" href="#"><span class="social-link-platform">discord</span></a>
                  <a class="social-link-item" href="#"><span class="social-link-platform">youtube</span></a>
                </div>
              </div>
            </div>

            <div class="section-links">
              <a href="#">View Journals</a>
              <a href="#">View Photos</a>
              <a href="#">View Groups</a>
              <a href="#">View Places</a>
            </div>

          </div>

          <div class="profile-right">
            <div class="card">
              <div class="card-header hearted">Profile Song</div>
              <div class="card-body">
                <iframe title="yt" srcdoc="<div style='display:grid;place-items:center;height:86px;color:white;font-family:system-ui;background:#000'>YouTube Embed</div>"></iframe>
              </div>
            </div>

            <div class="card" style="margin-top:14px;">
              <div class="card-header hearted">Comments (preview)</div>
              <div class="card-body">
                <div class="add-comment">
                  <div contenteditable="true" style="min-height:72px;padding:10px;border-radius:12px;border:1px solid rgba(255,255,255,0.10);background:rgba(255,255,255,0.06);">
                    Leave a comment…
                  </div>
                  <button class="action-btn primary" style="margin-top:10px;">Post Comment</button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</body>
</html>`;

  previewFrame.srcdoc = srcdoc;
}

// --- Selector helper text
function buildSelectorHelper() {
  return [
    "/* OshiForge Selector Helper */",
    "",
    "/* Global wrapper */",
    ".profile-page.profile-custom-css",
    "",
    "/* Top bar */",
    ".profile-top-bar",
    ".profile-breadcrumb a",
    "",
    "/* Cards */",
    ".card",
    ".card-header",
    ".card-body",
    "",
    "/* Profile identity */",
    ".profile-display-name",
    ".profile-username",
    ".profile-tagline",
    "",
    "/* Contact buttons (this is the common problem area) */",
    ".profile-contact-links a.contact-link",
    ".profile-contact-links a.boop-link",
    ".profile-contact-links button",
    "button.action-btn",
    "",
    "/* Lists */",
    ".friends-grid a.friend-item",
    ".social-links-list .social-link-item",
    ".section-links a",
    "",
    "/* Media */",
    "iframe",
    "",
    "/* Tip: if something is still white, it might be inline-styled */",
    "/* Use: background: ... !important; color: ... !important; */",
  ].join("\n");
}

// --- State <-> UI sync
function syncUIFromState() {
  // Core colors
  cText.value = normalizeHex(state.vars.text);
  cTextDim.value = normalizeHex(state.vars.textDim);
  cPanel.value = normalizeHex(state.vars.panel);
  cPanel2.value = normalizeHex(state.vars.panel2);
  cBorder.value = normalizeHex(state.vars.border);
  cBorderSoft.value = normalizeHex(state.vars.borderSoft);

  // Accents
  aCyan.value = normalizeHex(state.vars.cyan);
  aBlue.value = normalizeHex(state.vars.blue);
  aPurple.value = normalizeHex(state.vars.purple);
  aAmber.value = normalizeHex(state.vars.amber);
  aGreen.value = normalizeHex(state.vars.green);
  aPink.value = normalizeHex(state.vars.pink);

  // Effects
  blur.value = state.effects.blur;
  shadow.value = state.effects.shadow;
  glow.value = state.effects.glow;

  // Typography
  fontFamily.value = state.type.fontFamily;
  nameSize.value = state.type.nameSize;
  headerCaps.value = state.type.headerCaps;

  // Layout
  cardRadius.value = state.layout.cardRadius;
  cardPadding.value = state.layout.cardPadding;
  hoverLift.value = state.layout.hoverLift;

  avatarSize.value = state.layout.avatarSize;
  avatarShape.value = state.layout.avatarShape;
  avatarBorder.value = state.layout.avatarBorder;

  // Background
  bgUrl.value = state.background.url || "";
  bgPos.value = state.background.pos || "center top";
  bgAttach.value = state.background.attach || "fixed";

  // Extra CSS
  extraCss.value = state.extraCss || "";

  // Sections accordion toggles + text
  SECTIONS.forEach(sec => {
    const cb = document.querySelector(`input[data-sec-enabled="${sec.key}"]`);
    const tx = document.querySelector(`textarea[data-sec-custom="${sec.key}"]`);
    if (cb) cb.checked = !!state.sections[sec.key].enabled;
    if (tx) tx.value = state.sections[sec.key].custom || "";
  });

  renderAll();
}

// --- QoL features
async function copyCss() {
  try {
    await navigator.clipboard.writeText(cssOutput.value || "");
    toast("CSS copied to clipboard ✅");
  } catch {
    cssOutput.select();
    document.execCommand("copy");
    toast("CSS copied ✅");
  }
}

function downloadJson() {
  const data = JSON.stringify(state, null, 2);
  const blob = new Blob([data], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "oshiforge-theme.json";
  a.click();
  URL.revokeObjectURL(url);
}

function shareLink() {
  try {
    const json = JSON.stringify(state);
    const b64 = toBase64Url(json);
    location.hash = b64;
    toast("Share link updated in URL ✅");
  } catch {
    alert("Could not create share link.");
  }
}

// --- URL hash load
function tryLoadFromHash() {
  const h = (location.hash || "").replace(/^#/, "").trim();
  if (!h) return false;
  try {
    const json = fromBase64Url(h);
    const obj = JSON.parse(json);
    state = mergeDeep(deepClone(DEFAULT_STATE), obj);
    return true;
  } catch {
    return false;
  }
}

// --- Scheme lock helper
function syncAccentsFromCyan(hex) {
  // Generate related accents by shifting hue/lightness a bit.
  // (Simple, predictable, and "good enough" without heavy color libs.)
  const hsl = hexToHsl(hex);
  state.vars.blue = hslToHex((hsl.h + 210) % 360, clamp(hsl.s, 40, 85), clamp(hsl.l, 45, 60));
  state.vars.purple = hslToHex((hsl.h + 265) % 360, clamp(hsl.s + 8, 45, 90), clamp(hsl.l, 50, 65));
  state.vars.pink = hslToHex((hsl.h + 310) % 360, clamp(hsl.s + 10, 50, 95), clamp(hsl.l, 55, 70));
  state.vars.green = hslToHex((hsl.h + 120) % 360, clamp(hsl.s, 35, 85), clamp(hsl.l, 45, 62));
  state.vars.amber = hslToHex((hsl.h + 40) % 360, clamp(hsl.s - 10, 35, 85), clamp(hsl.l + 10, 55, 72));
}

// --- Utilities
function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function mergeDeep(target, source) {
  // Mutates target; returns target
  for (const k of Object.keys(source || {})) {
    const sv = source[k];
    if (sv && typeof sv === "object" && !Array.isArray(sv)) {
      if (!target[k] || typeof target[k] !== "object") target[k] = {};
      mergeDeep(target[k], sv);
    } else {
      target[k] = sv;
    }
  }
  return target;
}

function clamp(n, a, b) { return Math.max(a, Math.min(b, n)); }

function normalizeHex(hex) {
  if (!hex) return "#000000";
  if (hex.startsWith("#") && (hex.length === 7 || hex.length === 4)) {
    if (hex.length === 4) {
      // #abc -> #aabbcc
      return "#" + hex[1] + hex[1] + hex[2] + hex[2] + hex[3] + hex[3];
    }
    return hex.toUpperCase();
  }
  // fallback
  return "#000000";
}

function hexToRgba(hex, a) {
  const h = normalizeHex(hex);
  const r = parseInt(h.slice(1,3), 16);
  const g = parseInt(h.slice(3,5), 16);
  const b = parseInt(h.slice(5,7), 16);
  return `rgba(${r},${g},${b},${clamp(a,0,1).toFixed(3)})`;
}

function cssUrl(url) {
  // wrap in quotes if needed
  return url.includes(")") ? `"${url.replaceAll('"', '\\"')}"` : url;
}

function escapeHtml(s) {
  return String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
}
function escapeAttr(s) {
  return String(s).replaceAll('"', "&quot;");
}

function toBase64Url(str) {
  const b64 = btoa(unescape(encodeURIComponent(str)));
  return b64.replaceAll("+","-").replaceAll("/","_").replaceAll("=","");
}
function fromBase64Url(b64url) {
  let b64 = b64url.replaceAll("-","+").replaceAll("_","/");
  // pad
  while (b64.length % 4 !== 0) b64 += "=";
  return decodeURIComponent(escape(atob(b64)));
}

// Color conversion helpers (simple HSL)
function hexToHsl(hex) {
  const h = normalizeHex(hex);
  let r = parseInt(h.slice(1,3),16)/255;
  let g = parseInt(h.slice(3,5),16)/255;
  let b = parseInt(h.slice(5,7),16)/255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let hh, ss, ll = (max+min)/2;

  if (max === min) { hh = 0; ss = 0; }
  else {
    const d = max - min;
    ss = ll > 0.5 ? d/(2-max-min) : d/(max+min);
    switch (max) {
      case r: hh = (g-b)/d + (g < b ? 6 : 0); break;
      case g: hh = (b-r)/d + 2; break;
      case b: hh = (r-g)/d + 4; break;
    }
    hh *= 60;
  }
  return { h: hh, s: ss*100, l: ll*100 };
}

function hslToHex(h, s, l) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const x = c * (1 - Math.abs((h/60) % 2 - 1));
  const m = l - c/2;
  let r=0,g=0,b=0;

  if (0<=h && h<60){ r=c; g=x; b=0; }
  else if (60<=h && h<120){ r=x; g=c; b=0; }
  else if (120<=h && h<180){ r=0; g=c; b=x; }
  else if (180<=h && h<240){ r=0; g=x; b=c; }
  else if (240<=h && h<300){ r=x; g=0; b=c; }
  else { r=c; g=0; b=x; }

  const R = Math.round((r+m)*255);
  const G = Math.round((g+m)*255);
  const B = Math.round((b+m)*255);

  return "#" + [R,G,B].map(v => v.toString(16).padStart(2,"0")).join("").toUpperCase();
}

// Toast (tiny)
let toastTimer = null;
function toast(msg) {
  let t = document.getElementById("toast");
  if (!t) {
    t = document.createElement("div");
    t.id = "toast";
    t.style.position = "fixed";
    t.style.left = "50%";
    t.style.bottom = "18px";
    t.style.transform = "translateX(-50%)";
    t.style.padding = "10px 12px";
    t.style.borderRadius = "12px";
    t.style.background = "rgba(0,0,0,0.75)";
    t.style.border = "1px solid rgba(255,255,255,0.14)";
    t.style.color = "rgba(235,243,255,0.92)";
    t.style.fontFamily = "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Courier New\", monospace";
    t.style.fontSize = "12px";
    t.style.zIndex = "9999";
    t.style.backdropFilter = "blur(12px)";
    document.body.appendChild(t);
  }
  t.textContent = msg;
  t.style.opacity = "1";
  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    t.style.opacity = "0";
  }, 1500);
}

// --- Init
(function init(){
  buildSectionsAccordion();
  loadPresets();
  wireControls();

  // Load from URL hash if present; otherwise load first preset if exists
  const loaded = tryLoadFromHash();
  if (!loaded) {
    const first = (window.OSHIFORGE_PRESETS || [])[0];
    if (first?.id) presetSelect.value = first.id;
    if (first?.state) state = mergeDeep(deepClone(DEFAULT_STATE), deepClone(first.state));
  }

  syncUIFromState();
})();
