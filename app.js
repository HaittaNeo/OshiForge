// OshiForge - static GitHub Pages app
// Generates scoped CSS for: .profile-page.profile-custom-css

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
  bgUrl: "",
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

  avatarSize: 220,
  avatarShape: "hex",
  avatarBorder: 2,

  customShapeCss: "",
};

let state = { ...DEFAULTS };

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

function setHint(id, text){ $(id).textContent = text; }

function initUI(){
  // Populate shapes select
  const sel = $("avatarShape");
  sel.innerHTML = SHAPES.map(s => `<option value="${s.value}">${s.label}</option>`).join("");

  // Wire inputs
  const bindings = [
    ["bgUrl", "value", "bgUrl"],
    ["bgPos", "value", "bgPos"],
    ["bgAttach", "value", "bgAttach"],

    ["cPrimary", "value", "cPrimary"],
    ["cSecondary", "value", "cSecondary"],
    ["cAccent", "value", "cAccent"],
    ["cText", "value", "cText"],

    ["panelAlpha", "value", "panelAlpha"],
    ["borderAlpha", "value", "borderAlpha"],
    ["glowStrength", "value", "glowStrength"],

    ["cardRadius", "value", "cardRadius"],
    ["hoverLift", "value", "hoverLift"],

    ["uniformLinks", "checked", "uniformLinks"],

    ["avatarSize", "value", "avatarSize"],
    ["avatarShape", "value", "avatarShape"],
    ["avatarBorder", "value", "avatarBorder"],

    ["customShapeCss", "value", "customShapeCss"],
  ];

  // apply defaults to UI
  for (const [id, prop, key] of bindings){
    const el = $(id);
    el[prop] = state[key];
    el.addEventListener("input", () => {
      const v = (prop === "checked") ? el.checked : el[prop];
      state[key] = (typeof DEFAULTS[key] === "number") ? Number(v) : v;
      renderAll();
    });
  }

  $("btnReset").addEventListener("click", () => {
    state = { ...DEFAULTS };
    // reapply
    for (const [id, prop, key] of bindings){
      $(id)[prop] = state[key];
    }
    renderAll();
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

  renderAll();
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

  const panel = rgba("#0a0e16", clamp(state.panelAlpha, 0.2, 0.95));
  const border = rgba(primary, clamp(state.borderAlpha, 0.05, 0.9));

  const glow = clamp(state.glowStrength, 0, 1);
  const glowSoft = `0 0 ${Math.round(18 + 24*glow)}px ${rgba(primary, 0.10 + 0.25*glow)}, 0 0 ${Math.round(42 + 70*glow)}px ${rgba(secondary, 0.06 + 0.14*glow)}`;
  const glowStrong = `0 0 ${Math.round(40 + 60*glow)}px ${rgba(primary, 0.22 + 0.38*glow)}, 0 0 ${Math.round(90 + 120*glow)}px ${rgba(secondary, 0.08 + 0.18*glow)}`;

  const cardRadius = clamp(state.cardRadius, 0, 28);
  const lift = clamp(state.hoverLift, 0, 10);

  const bgLine = state.bgUrl.trim()
    ? `${selector}{background-image:${cssUrl(state.bgUrl)};background-size:cover;background-position:${state.bgPos};background-attachment:${state.bgAttach};background-repeat:no-repeat;}`
    : `${selector}{background:transparent;}`;

  // Avatar geometry
  const geo = getAvatarGeometry(state.avatarShape);
  const avatarSize = clamp(state.avatarSize, 80, 280);
  const avatarBorder = clamp(state.avatarBorder, 0, 6);

  // Build CSS
  let css = "";
  css += `${bgLine}\n\n`;
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
  css += `  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Courier New", monospace;\n`;
  css += `}\n\n`;

  // Core containers
  css += `${selector} .container{background:transparent !important;}\n`;
  css += `${selector} a{color:${rgba(primary, 0.90)};text-decoration:none;transition:color 140ms ease,text-shadow 140ms ease,transform 140ms ease;}\n`;
  css += `${selector} a:hover{color:${primary};text-shadow:0 0 14px ${rgba(primary,0.35)};}\n\n`;

  // Cards
  css += `${selector} .card{\n`;
  css += `  position:relative;\n`;
  css += `  background:\n`;
  css += `    linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.00) 40%),\n`;
  css += `    linear-gradient(135deg, ${rgba(primary,0.08)}, ${rgba(secondary,0.06)} 45%, rgba(0,0,0,0) 75%),\n`;
  css += `    var(--of-panel);\n`;
  css += `  border: 1px solid var(--of-border);\n`;
  css += `  border-radius: ${cardRadius}px;\n`;
  css += `  box-shadow: var(--of-shadow);\n`;
  css += `  backdrop-filter: blur(14px);\n`;
  css += `  -webkit-backdrop-filter: blur(14px);\n`;
  css += `  overflow:hidden;\n`;
  css += `  transition: transform 240ms cubic-bezier(.2,.8,.2,1), box-shadow 240ms cubic-bezier(.2,.8,.2,1), border-color 240ms cubic-bezier(.2,.8,.2,1);\n`;
  css += `}\n`;
  css += `${selector} .card:hover{transform:translateY(-${lift}px);border-color:${rgba(primary,0.45)};box-shadow: var(--of-shadow), var(--of-glow-strong);}\n\n`;

  // Card header accent
  css += `${selector} .card-header{\n`;
  css += `  background: linear-gradient(90deg, ${rgba(primary,0.18)}, ${rgba(secondary,0.14)}, ${rgba(accent,0.10)});\n`;
  css += `  border-bottom: 1px solid rgba(255,255,255,0.08);\n`;
  css += `  letter-spacing: 1.3px;\n`;
  css += `  font-size: 12px;\n`;
  css += `  text-transform: uppercase;\n`;
  css += `}\n\n`;

  // Top bar
  css += `${selector} .profile-top-bar, ${selector} .profile-top-bar *{background:transparent !important;}\n`;
  css += `${selector} .profile-top-bar{background:rgba(0,0,0,0.55) !important;border:1px solid rgba(255,255,255,0.06) !important;border-radius:14px !important;box-shadow:0 10px 30px rgba(0,0,0,0.55) !important;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);padding:10px 12px !important;}\n\n`;

  // Avatar sizing (MyOshi sometimes uses inline 100px)
  css += `${selector} .profile-main-card [style*="width:100px"], ${selector} .profile-main-card div[style*="width: 100px"]{width:${avatarSize}px !important;height:${avatarSize}px !important;}\n`;

  // Avatar rule
  css += `${selector} img.user-avatar.profile-avatar{\n`;
  css += `  width:${avatarSize}px !important;\n`;
  css += `  height:${avatarSize}px !important;\n`;
  css += `  max-width:${avatarSize}px !important;\n`;
  css += `  max-height:${avatarSize}px !important;\n`;
  css += `  object-fit:cover !important;\n`;
  css += `  overflow:hidden !important;\n`;
  css += `  background: rgba(0,0,0,0.35);\n`;
  css += `  border: ${avatarBorder}px solid ${rgba(primary,0.55)} !important;\n`;
  css += `  box-shadow: 0 0 30px ${rgba(primary,0.45)}, 0 0 80px ${rgba(secondary,0.25)}, 0 18px 50px rgba(0,0,0,0.85) !important;\n`;
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

  css += `${selector} img.user-avatar.profile-avatar:hover{transform:scale(1.08) translateY(-4px);border-color:${primary} !important;box-shadow:0 0 45px ${rgba(primary,0.80)}, 0 0 120px ${rgba(secondary,0.45)}, 0 0 200px ${rgba(primary,0.25)}, 0 30px 80px rgba(0,0,0,0.95) !important;filter:saturate(1.15) brightness(1.08);}\n\n`;

  // Safety net: any avatar wrapper
  if (geo.clipPath){
    css += `${selector} .profile-main-card [class*="avatar"]{clip-path:${geo.clipPath} !important;-webkit-clip-path:${geo.clipPath} !important;overflow:hidden !important;}\n\n`;
  }

  // Buttons/links (contact + boop)
  if (state.uniformLinks){
    css += `${selector} .profile-contact-links a.contact-link,\n`;
    css += `${selector} .profile-contact-links a.boop-link,\n`;
    css += `${selector} a.contact-link,\n`;
    css += `${selector} a.boop-link{\n`;
    css += `  background: ${rgba("#101624", 0.78)} !important;\n`;
    css += `  color: ${rgba(text, 0.92)} !important;\n`;
    css += `  border: 1px solid ${rgba(primary, 0.28)} !important;\n`;
    css += `  border-radius: 12px !important;\n`;
    css += `  text-decoration:none !important;\n`;
    css += `  box-shadow: 0 10px 24px rgba(0,0,0,0.55), 0 0 18px ${rgba(primary,0.12)} !important;\n`;
    css += `  backdrop-filter: blur(10px);\n`;
    css += `  -webkit-backdrop-filter: blur(10px);\n`;
    css += `  transition: transform 180ms cubic-bezier(.2,.8,.2,1), box-shadow 180ms cubic-bezier(.2,.8,.2,1), border-color 180ms cubic-bezier(.2,.8,.2,1), background 180ms cubic-bezier(.2,.8,.2,1);\n`;
    css += `}\n`;
    css += `${selector} .profile-contact-links a.contact-link:hover,\n`;
    css += `${selector} .profile-contact-links a.boop-link:hover,\n`;
    css += `${selector} a.contact-link:hover,\n`;
    css += `${selector} a.boop-link:hover{\n`;
    css += `  transform: translateY(-2px);\n`;
    css += `  background: ${rgba("#1a2234", 0.86)} !important;\n`;
    css += `  border-color: ${rgba(primary, 0.55)} !important;\n`;
    css += `  box-shadow: 0 14px 34px rgba(0,0,0,0.62), 0 0 28px ${rgba(primary,0.22)} !important;\n`;
    css += `}\n\n`;
  }

  // Section links
  css += `${selector} .section-links{background:${rgba("#0a0e16",0.70)} !important;border:1px solid ${rgba(primary,0.20)} !important;border-radius:14px !important;box-shadow:0 14px 34px rgba(0,0,0,0.55) !important;backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);overflow:hidden;}\n`;
  css += `${selector} .section-links a{display:inline-block;padding:10px 12px;color:${rgba(text,0.90)} !important;border-right:1px solid rgba(255,255,255,0.07);}\n`;
  css += `${selector} .section-links a:last-child{border-right:none;}\n`;
  css += `${selector} .section-links a:hover{background:${rgba("#101624",0.75)} !important;color:${primary} !important;text-shadow:0 0 14px ${rgba(primary,0.35)};}\n\n`;

  // Social list items
  css += `${selector} .social-links-list .social-link-item{background:${rgba("#101624",0.78)} !important;border:1px solid ${rgba(primary,0.22)} !important;border-radius:12px !important;box-shadow:0 10px 24px rgba(0,0,0,0.55) !important;}\n`;
  css += `${selector} .social-links-list .social-link-item:hover{background:${rgba("#1a2234",0.86)} !important;border-color:${rgba(primary,0.55)} !important;box-shadow:0 14px 34px rgba(0,0,0,0.62), 0 0 28px ${rgba(primary,0.22)} !important;}\n`;
  css += `${selector} .social-links-list .social-link-platform{color:${rgba(text,0.92)} !important;letter-spacing:0.6px;}\n`;

  return css;
}

function renderPreview(){
  const css = buildCss();

  // Minimal markup resembling MyOshi enough for styling/shape testing
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
  .profile-contact-links{display:flex;gap:10px;justify-content:center;margin-top:12px;flex-wrap:wrap}
  a.contact-link,a.boop-link{padding:10px 12px;border-radius:12px;display:inline-block}
  .section-links{margin-top:12px}
  .section-links a{display:inline-block}
  .social-links-list{display:flex;gap:10px;flex-wrap:wrap}
  .social-link-item{padding:10px 12px;border-radius:12px}
  .profile-avatar{border-radius:0 !important;} /* critical: don't fight generated shapes */
</style>
</head>
<body>
<div class="profile-page profile-custom-css">
  <div class="container">
    <div class="profile-top-bar">
      <div class="profile-breadcrumb"><a href="#">Home</a> &gt; <strong>Preview</strong></div>
    </div>

    <div class="profile-layout">
      <div class="profile-left">
        <div class="card profile-main-card">
          <div class="card-header starred"><span>~.::OshiForge Preview::.~</span><a href="#">Edit</a></div>
          <div class="card-body">
            <img class="user-avatar profile-avatar"
                 src="https://images.unsplash.com/photo-1549692520-acc6669e2f0c?auto=format&fit=crop&w=600&q=80"
                 alt="avatar"
                 style="width:100px;height:100px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;object-fit:cover" />

            <div class="profile-display-name">~.::HaittaNEO::.~</div>
            <div class="profile-username">@haittaneo</div>
            <div class="profile-tagline">"Full stack do it from the front and the backend"</div>

            <div class="profile-contact-links">
              <a class="contact-link" href="#">Add Friend</a>
              <a class="contact-link" href="#">Send Message</a>
              <a class="boop-link" href="#">Boop</a>
            </div>
          </div>
        </div>

        <div class="section-links">
          <a href="#">View Journals</a>
          <a href="#">View Photos</a>
          <a href="#">View Groups</a>
        </div>
      </div>

      <div class="profile-right">
        <div class="card">
          <div class="card-header hearted"><span>Links</span></div>
          <div class="card-body">
            <div class="social-links-list">
              <a class="social-link-item" href="#"><span class="social-link-platform">twitter</span></a>
              <a class="social-link-item" href="#"><span class="social-link-platform">twitch</span></a>
              <a class="social-link-item" href="#"><span class="social-link-platform">discord</span></a>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header starred"><span>About</span></div>
          <div class="card-body">
            This is a simplified preview so you can test shapes, colors, and buttons.
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>${css}</style>
</body>
</html>`;

  $("preview").srcdoc = doc;
}

function renderAll(){
  // labels
  setHint("panelAlphaLabel", `Alpha: ${state.panelAlpha.toFixed(2)}`);
  setHint("borderAlphaLabel", `Alpha: ${state.borderAlpha.toFixed(2)}`);
  setHint("glowStrengthLabel", `Strength: ${state.glowStrength.toFixed(2)}`);
  setHint("cardRadiusLabel", `${state.cardRadius}px`);
  setHint("hoverLiftLabel", `${state.hoverLift}px`);
  setHint("avatarSizeLabel", `${state.avatarSize}px`);
  setHint("avatarBorderLabel", `${state.avatarBorder}px`);

  const css = buildCss();
  $("cssOut").value = css;

  renderPreview();
}

window.addEventListener("DOMContentLoaded", initUI);
