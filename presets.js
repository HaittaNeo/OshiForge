// You can add more presets anytime.
// Each preset is just a partial "state" - it merges onto defaults.
window.OSHIFORGE_PRESETS = [
  {
    id: "neo-cyberglass",
    name: "Neo CyberGlass (default)",
    state: {
      meta: { name: "Neo CyberGlass" },
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
      type: { fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, \"Courier New\", monospace", nameSize: 22, headerCaps: "uppercase" },
      layout: { cardRadius: 18, cardPadding: 14, hoverLift: 4, avatarSize: 220, avatarShape: "hex", avatarBorder: 2 },
      background: {
        url: "https://myoshi.jinxxy-cdn.com/backgrounds/user_01kj21f4b6fzxsgz6xxpky3tya/73097151-f08b-48d3-834d-99f19d521c77.png",
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
    }
  },

  {
    id: "soft-noir",
    name: "Soft Noir",
    state: {
      meta: { name: "Soft Noir" },
      vars: {
        text: "#F3F5FF",
        textDim: "#B7BED6",
        panel: "#0F1016",
        panel2: "#171826",
        border: "#9EA5FF",
        borderSoft: "#31344A",
        cyan: "#9EA5FF",
        blue: "#8BB1FF",
        purple: "#D2A6FF",
        amber: "#FFD7A3",
        green: "#7CFFCC",
        pink: "#FF9FD7"
      },
      effects: { blur: 18, shadow: 55, glow: 26 },
      layout: { cardRadius: 22, cardPadding: 16, hoverLift: 3, avatarSize: 210, avatarShape: "circle", avatarBorder: 2 },
      sections: { comments: { enabled: true, custom: "" } }
    }
  },

  {
    id: "minimal-glass",
    name: "Minimal Glass",
    state: {
      meta: { name: "Minimal Glass" },
      effects: { blur: 10, shadow: 35, glow: 12 },
      layout: { cardRadius: 16, cardPadding: 12, hoverLift: 2 },
      vars: {
        border: "#CFE7FF",
        borderSoft: "#2C3444",
        cyan: "#CFE7FF",
        blue: "#A9CBFF",
        purple: "#D6BEFF",
        green: "#B7FFD9",
        pink: "#FFC2E6",
        amber: "#FFE3A3"
      }
    }
  }
];
