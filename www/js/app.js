/* Tracepath — app logic. Vanilla JS, no build step. Data lives in data.js and resources.js. */
(function () {
  "use strict";

  const { STAGES, PROJECTS, CERTS, DATA_VERIFIED } = window.TP_DATA;
  const BUILTIN = window.TP_RES;
  const I18N = window.TP_I18N;
  const APP_VERSION = "1.2.0";
  const KEY = "tracepath.v1";

  /* ───────────────────────── icons ───────────────────────── */
  const IC = {
    home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    route: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.5 6H14a3 3 0 010 6h-4a3 3 0 000 6h5.5"/>',
    book: '<path d="M4 4.5A2.5 2.5 0 016.5 2H20v17H6.5A2.5 2.5 0 004 21.5z"/><path d="M4 21.5V4.5"/>',
    flask: '<path d="M9 3h6"/><path d="M10 3v6L4.5 19a1.5 1.5 0 001.3 2h12.4a1.5 1.5 0 001.3-2L14 9V3"/><path d="M7.5 15h9"/>',
    folder: '<path d="M3 6a2 2 0 012-2h4l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 14.5L7 22l5-3 5 3-1.5-7.5"/>',
    sliders: '<path d="M4 6h8M18 6h2M4 12h2M12 12h8M4 18h10M20 18h0"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    bookmark: '<path d="M6 3h12v18l-6-4-6 4z"/>',
    external: '<path d="M14 4h6v6"/><path d="M20 4l-9 9"/><path d="M18 14v5a1 1 0 01-1 1H5a1 1 0 01-1-1V7a1 1 0 011-1h5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/>',
    x: '<path d="M6 6l12 12M18 6L6 18"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    trash: '<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
    download: '<path d="M12 3v12M7 10l5 5 5-5M4 20h16"/>',
    upload: '<path d="M12 15V3M7 8l5-5 5 5M4 20h16"/>',
    chevron: '<path d="M9 5l7 7-7 7"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    down: '<path d="M5 9l7 7 7-7"/>',
    shield: '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/>',
    network: '<circle cx="12" cy="5" r="2.5"/><circle cx="5" cy="19" r="2.5"/><circle cx="19" cy="19" r="2.5"/><path d="M12 7.5v4M12 11.5H5v5M12 11.5h7v5"/>',
    terminal: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 10l3 2.5L7 15M12.5 15H17"/>',
    cloud: '<path d="M7 18a4.5 4.5 0 010-9 6 6 0 0111.6 1.5A3.8 3.8 0 0118 18z"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    radar: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12l5-5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2M3 13h18"/>',
    flame: '<path d="M12 3c1 4 5 5.5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z"/>',
    filter: '<path d="M4 5h16l-6 8v6l-4-2v-4z"/>',
    undo: '<path d="M9 8H4V3"/><path d="M4 8a9 9 0 11-1 6"/>',
    moon: '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0114 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    play: '<path d="M8 5l11 7-11 7z"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    wifioff: '<path d="M3 3l18 18"/><path d="M8.5 16.5a5 5 0 017 0M5 12.5a10 10 0 015-2.6M12 20h.01"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17"/><path d="M12 3c2.5 2.6 2.5 15.4 0 18-2.5-2.6-2.5-15.4 0-18z"/>',
  };
  const icon = (n, s, cls) =>
    `<svg class="ic ${cls || ""}" width="${s || 20}" height="${s || 20}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ""}</svg>`;

  /* ───────────────────────── helpers ───────────────────────── */
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const pct = (f) => Math.round(Math.max(0, Math.min(1, f)) * 100);
  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));
  const safeUrl = (u) => { try { const x = new URL(u); return x.protocol === "http:" || x.protocol === "https:" ? x.href : ""; } catch (e) { return ""; } };
  const dayKey = (d) => (d || new Date()).toLocaleDateString("en-CA");
  const avg = (a) => (a.length ? a.reduce((x, y) => x + y, 0) / a.length : 0);
  const langOf = (r) => (r.lang === "ar" ? "ar" : "en");
  const isYT = (r) => (r.source || "") === "YouTube";

  /* ───────────────────────── language ─────────────────────────
     L is the interface language. It decides the dictionary, the text direction,
     and which language of resource is suggested first. Resource links themselves
     are never translated: an English course stays English, and says so. */
  const LANGS = Object.keys(I18N.ui); // every language that has a dictionary, English first
  const RTL_LANGS = ["ar"];             // languages that read right-to-left
  const isRTL = (l) => RTL_LANGS.indexOf(l) >= 0;
  let L = "en";
  const detectLang = () => {
    const list = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "en"]);
    for (const tag of list) { const base = String(tag).toLowerCase().split("-")[0]; if (LANGS.indexOf(base) >= 0) return base; }
    return "en";
  };
  function t(key, vars) {
    const d = I18N.ui[L] || I18N.ui.en;
    let out = d[key];
    if (out == null) out = I18N.ui.en[key];
    if (out == null) return key;
    if (vars) Object.keys(vars).forEach((k) => { out = out.split("{" + k + "}").join(vars[k]); });
    return out;
  }
  // Arabic counts differently: one, two, 3–10, then the rest.
  function plural(n, kind) {
    const k = "plural." + kind + ".";
    if (L === "ar") {
      if (n === 1) return t(k + "one");
      if (n === 2) return t(k + "two");
      return t(k + (n % 100 >= 3 && n % 100 <= 10 ? "few" : "other"), { n });
    }
    return n === 1 ? t(k + "one") : t(k + "other", { n });
  }
  // Content is written in English in data.js / resources.js. Every other language keeps its overrides,
  // by id, in I18N.<lang>; a missing section or id falls back to the English text.
  const EMPTY_CONTENT = { stage: {}, arNote: {}, topic: {}, lab: {}, project: {}, cert: {}, res: {}, phrase: {}, search: {} };
  const contentCache = {};
  const contentOf = (l) => (l === "en" || !I18N[l] ? null : (contentCache[l] = contentCache[l] || Object.assign({}, EMPTY_CONTENT, I18N[l])));
  const TC = () => contentOf(L);
  const tp = (str) => { const a = TC(); return (a && a.phrase[str]) || str; };
  function tstage(s2) { const a = TC(); return (a && a.stage[s2.id]) || {}; }
  const stageTitle = (s2) => tstage(s2).title || s2.title;
  const stageShort = (s2) => tstage(s2).short || s2.short;
  const topicTitle = (x) => { const a = TC(); return (a && a.topic[x.id]) || x.title; };
  const labTitle = (x) => { const a = TC(); return (a && a.lab[x.id]) || x.title; };
  const flowText = (s2, key) => (tstage(s2).flow || {})[key] || s2.flow[key].text;
  const arNoteOf = (s2) => { const a = TC(); return (a && a.arNote[s2.id]) || s2.picks.arNote || ""; };
  function tproj(p2) { const a = TC(); return (a && a.project[p2.id]) || {}; }
  const projTitle = (p2) => tproj(p2).title || p2.title;
  const projList = (p2, key) => tproj(p2)[key] || p2[key];
  const projDifficulty = (p2) => tproj(p2).difficulty || p2.difficulty;
  const projSteps = (p2) => { const x = tproj(p2).steps; return x ? x.map(([tt, d]) => ({ t: tt, d })) : p2.steps; };
  function tcert(c) { const a = TC(); return (a && a.cert[c.id]) || {}; }
  const certName = (c) => tcert(c).name || c.name;
  // Built-in resources are translated by id. Ones the person edited keep the name and description they
  // typed; the price note cannot be edited, so it stays translated.
  function tres(r) { const c = TC(); return (c && !r._custom && c.res[r.id]) || {}; }
  const resName = (r) => (r._edited ? r.name : tres(r).name || r.name);
  const resBlurb = (r) => (r._edited ? r.blurb || "" : tres(r).blurb || r.blurb || "");
  const resNote = (r) => tres(r).note || (r.price || {}).note || "";

  const COST = { free: "", paid: "", mixed: "" };
  const LEVEL = { beginner: "", intermediate: "", advanced: "" };
  const costLabel = (k) => t("cost." + k);
  const levelLabel = (k) => t("level." + k);
  const varyText = () => t("price.varies");
  const langLabel = (k) => t("lang." + k);
  // Hours are stored in English ("80–120 h"). Other languages get their own unit words.
  function hrs(x) {
    const v = String(x || "");
    if (L === "en") return v;
    const m = /^\s*(\d+)\s*[–-]\s*(\d+)\s*h\s*$/i.exec(v);
    if (m) return t("unit.hoursRange", { a: m[1], b: m[2] });
    const pl = /^\s*(\d+)\s*\+\s*h\s*$/i.exec(v);
    if (pl) return t("unit.hoursPlus", { n: pl[1] });
    const o = /^\s*(\d+)\s*h\s*$/i.exec(v);
    return o ? t("unit.hours", { n: o[1] }) : v;
  }
  // "Sep 2026" is stored in English; other languages get their own month name, with Latin digits kept.
  const MONTHS = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  function dateLabel(x) {
    const v = String(x || "");
    if (L === "en") return v;
    const m = /^([A-Za-z]{3})[A-Za-z]*\.?\s+(\d{4})$/.exec(v.trim()); const mi = m ? MONTHS.indexOf(m[1].toLowerCase()) : -1;
    if (mi < 0) return v;
    try { return new Intl.DateTimeFormat(t("lang.locale") + "-u-nu-latn", { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(+m[2], mi, 1))); } catch (e) { return v; }
  }
  // In a right-to-left paragraph a trailing "+" or "#" on a Latin word jumps to the wrong side
  // ("Network+" reads "+Network"). A left-to-right mark right after it keeps the sign attached.
  // Only text is edited, never the element structure, so flex and grid layouts are untouched.
  const KEEP_ATTACHED = /([A-Za-z0-9][+#]+)(?![+#\u200E])/g;
  function bidiFix(root) {
    if (!isRTL(L) || !root) return;
    const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = w.nextNode())) {
      const v = n.nodeValue;
      if (v.indexOf("+") < 0 && v.indexOf("#") < 0) continue;
      if (/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/.test(n.parentNode.nodeName)) continue;
      const nv = v.replace(KEEP_ATTACHED, "$1\u200E");
      if (nv !== v) n.nodeValue = nv;
    }
  }
  const mediaLabel = (r) => (r.media ? t("media." + String(r.media).replace(/\s/g, "").toLowerCase()) : tp(r.format || ""));

  /* ───────────────────────── state ───────────────────────── */
  let memFallback = null;
  const blank = () => ({ v: 1, name: "", theme: "auto", uiLang: "", prefLang: "both", topics: {}, labs: {}, flow: {}, res: {}, custom: [], edits: {}, projects: {}, certs: {}, activity: {} });
  const readRaw = () => { try { return localStorage.getItem(KEY); } catch (e) { return memFallback; } };
  const writeRaw = (v) => { try { localStorage.setItem(KEY, v); } catch (e) { memFallback = v; } };
  let S = (function () { try { const raw = readRaw(); if (raw) return Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* ignore */ } return blank(); })();
  let resCache = null;
  function save() { resCache = null; writeRaw(JSON.stringify(S)); }
  function touch() { const k = dayKey(); S.activity[k] = (S.activity[k] || 0) + 1; }

  /* ───────────────────────── data access ───────────────────────── */
  const stageById = (id) => STAGES.find((s) => s.id === id);
  const projectById = (id) => PROJECTS.find((p) => p.id === id);
  const certById = (id) => CERTS.find((c) => c.id === id);
  const topicIndex = {};
  STAGES.forEach((s) => s.topics.forEach((t) => { topicIndex[t.id] = { t, s }; }));

  function resources(includeHidden) {
    if (!resCache) {
      const out = [];
      BUILTIN.forEach((b) => {
        const e = S.edits[b.id];
        const r = Object.assign({}, b, e || {});
        r._builtin = true; r._edited = !!e; r._hidden = !!(S.res[b.id] && S.res[b.id].hidden);
        out.push(r);
      });
      S.custom.forEach((c) => out.push(Object.assign({}, c, { _custom: true })));
      resCache = out;
    }
    return includeHidden ? resCache : resCache.filter((r) => !r._hidden);
  }
  const resById = (id) => resources(true).find((r) => r.id === id);
  const rs = (id) => S.res[id] || {};
  const stageResources = (stage) => resources().filter((r) => (r.stages || []).includes(stage.num));
  const topicResources = (tid) => resources().filter((r) => (r.topics || []).includes(tid));

  /* ───────────────────────── progress engine ───────────────────────── */
  function projectProgress(p) {
    const st = S.projects[p.id] || {};
    const total = p.steps.length + p.checklist.length;
    const done = p.steps.filter((_, i) => (st.steps || {})[i]).length + p.checklist.filter((_, i) => (st.checks || {})[i]).length;
    return total ? done / total : 0;
  }
  const projectStatusKey = (p) => { const f = projectProgress(p); return f >= 1 ? "completed" : f > 0 ? "inprogress" : "notstarted"; };
  const projectStatus = (p) => t("status." + projectStatusKey(p));
  function topicFrac(t) {
    if (t.link && t.link.indexOf("project:") === 0) return projectProgress(projectById(t.link.slice(8)));
    return S.topics[t.id] ? 1 : 0;
  }
  const topicsFrac = (s) => avg(s.topics.map(topicFrac));
  const labsFrac = (s) => (s.labs.length ? avg(s.labs.map((l) => (S.labs[l.id] ? 1 : 0))) : 1);
  function stageProgress(s) {
    const items = s.topics.map(topicFrac).concat(s.labs.map((l) => (S.labs[l.id] ? 1 : 0)));
    return avg(items);
  }
  const overall = () => avg(STAGES.map(stageProgress));
  const anyProgress = () => Object.keys(S.topics).length + Object.keys(S.labs).length + Object.keys(S.projects).length + Object.keys(S.certs).length > 0;
  const currentStage = () => STAGES.find((s) => stageProgress(s) < 1) || null;
  const nextTopic = (s) => s.topics.find((t) => !t.link && !S.topics[t.id]) || null;
  const nextLab = (s) => s.labs.find((l) => !S.labs[l.id]) || null;
  const certState = (id) => S.certs[id] || { status: "todo" };
  const CERT_STATUS_KEYS = ["todo", "studying", "booked", "passed", "skipped"];
  const certStatusLabel = (k) => t("cs." + k);

  function readiness() {
    const core = STAGES.filter((s) => s.num <= 7);
    const knowledge = avg(core.map(topicsFrac));
    const labs = avg(core.filter((s) => s.labs.length).map(labsFrac));
    const proj = stageProgress(STAGES[7]);
    const active = CERTS.filter((c) => certState(c.id).status !== "skipped");
    const coreCerts = active.filter((c) => !c.optional);
    const passedCore = coreCerts.filter((c) => certState(c.id).status === "passed").length;
    const passedOpt = active.filter((c) => c.optional && certState(c.id).status === "passed").length;
    const certs = coreCerts.length ? Math.min(1, (passedCore + 0.5 * passedOpt) / coreCerts.length) : 0;
    const parts = [
      { key: "knowledge", label: t("ready.knowledge"), w: 0.4, f: knowledge },
      { key: "labs", label: t("ready.labs"), w: 0.2, f: labs },
      { key: "projects", label: t("ready.projects"), w: 0.25, f: proj },
      { key: "certs", label: t("ready.certs"), w: 0.15, f: certs },
    ];
    const score = parts.reduce((a, p) => a + p.w * p.f, 0);
    const tiers = [
      [0.15, t("tier.start")], [0.35, t("tier.foundations")], [0.55, t("tier.handson")], [0.75, t("tier.junior")], [1.01, t("tier.ready")],
    ];
    const tier = tiers.find((t) => score < t[0])[1];
    const gap = parts.slice().sort((a, b) => b.w * (1 - b.f) - a.w * (1 - a.f))[0];
    return { parts, score, tier, gap };
  }

  function streakInfo() {
    const days = [];
    for (let i = 6; i >= 0; i--) { const d = new Date(); d.setDate(d.getDate() - i); days.push({ d, n: S.activity[dayKey(d)] || 0 }); }
    let streak = 0;
    const d = new Date();
    if (!(S.activity[dayKey(d)] || 0)) d.setDate(d.getDate() - 1);
    while (S.activity[dayKey(d)]) { streak++; d.setDate(d.getDate() - 1); }
    return { days, streak, today: S.activity[dayKey()] || 0 };
  }

  /* ───────────────────────── small UI parts ───────────────────────── */
  const bar = (f, color) => `<div class="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${pct(f)}" style="--f:${pct(f)}%;--c:${color || "var(--primary)"}"><i></i></div>`;
  const chk = (on, key, action, id, label) =>
    `<button class="chk" role="checkbox" aria-checked="${on ? "true" : "false"}" aria-label="${esc(label)}" data-a="${action}" data-id="${esc(id)}" data-fk="${esc(key)}">${icon("check", 16)}</button>`;
  const stageTile = (s, size) => `<span class="tile" style="--h:${s.hue};${size ? "--sz:" + size + "px" : ""}">${icon(s.icon, size ? Math.round(size * 0.5) : 22)}</span>`;

  function costBadge(r) {
    return `<span class="b b-${r.pricing}">${costLabel(r.pricing)}</span>`;
  }
  const langBadge = (r) => { const l = langOf(r); return `<span class="b b-${l}">${icon("globe", 13)}${langLabel(l)}</span>`; };
  function badges(r, withLevel) {
    return `<div class="badges">${costBadge(r)}${langBadge(r)}${r.official ? `<span class="b b-off">${t("academy.f.official")}</span>` : ""}${r.lab ? `<span class="b b-lab">${t("academy.f.labs")}</span>` : ""}${r.prep ? `<span class="b b-prep">${t("academy.f.prep")}</span>` : ""}${withLevel && r.level ? `<span class="b b-lvl">${levelLabel(r.level)}</span>` : ""}</div>`;
  }
  const costText = (r) => (r.pricing === "free" ? t("cost.free") : tp((r.price && r.price.text) || "") || varyText());
  function ledger(r, full) {
    const p = r.price || {}; const c = r.cert || [];
    const note = resNote(r);
    const rows = [[t("res.cost"), `<strong>${esc(costText(r))}</strong>`]];
    if (full || r.pricing !== "free") {
      const model = [p.model && p.model !== "Free" ? tp(p.model) : "", p.currency && p.currency !== "—" ? p.currency : ""].filter(Boolean).join("، ");
      if (full && model) rows.push([t("res.billing"), esc(model)]);
    }
    if (full && note) rows.push([t("res.goodToKnow"), esc(note)]);
    if (full) {
      rows.push([t("res.source"), esc(r.source || r.provider || "—")]);
      rows.push([t("res.language"), langLabel(langOf(r))]);
      if (r.channel) rows.push([t("res.channelRow"), esc(r.channel) + (r.instructor ? `<span class="td">${esc(r.instructor)}</span>` : "")]);
      else if (r.instructor) rows.push([t("res.instructor"), esc(r.instructor)]);
    }
    rows.push([t("res.courseCert"), esc(tp(c[0] || "None"))]);
    rows.push([t("res.proCert"), esc(tp(c[1] || "Not applicable"))]);
    return `<dl class="ledger">${rows.map((x) => `<div><dt>${x[0]}</dt><dd>${x[1]}</dd></div>`).join("")}</dl>`;
  }
  const fmtIcon = (r) => {
    const f = (r.format || "").toLowerCase();
    if (isYT(r) || /video/.test(f)) return "play";
    if (r.lab || /lab|simulator|emulator|tool|dataset|wargame|environment/.test(f)) return "flask";
    if (/doc|reference|book|article|roadmap|study/.test(f)) return "doc";
    return "book";
  };
  const stars = (n) => [1, 2, 3, 4, 5].map((i) => icon("star", 14, i <= n ? "fill on" : "")).join("");

  function subLine(r) {
    const ch = safeUrl(r.channelUrl || "");
    const channel = ch
      ? `<a class="chl" href="${esc(ch)}" target="_blank" rel="noopener noreferrer">${esc(r.channel || r.provider)}</a>`
      : esc(r.channel || r.provider || "");
    const bits = isYT(r) ? [channel, esc(mediaLabel(r)), "YouTube"] : [esc(r.provider || ""), esc(tp(r.format || ""))];
    return bits.filter(Boolean).join('<span class="sep"></span>');
  }
  const arTitle = (r) => (r.arName ? `<span class="arname" lang="ar" dir="rtl">${esc(r.arName)}</span>` : "");

  function resCard(r) {
    const st = rs(r.id); const url = safeUrl(r.url);
    return `<article class="rcard${st.done ? " is-done" : ""}">
      <div class="rc-head">
        <span class="fmt${isYT(r) ? " yt" : ""}">${icon(fmtIcon(r), 20)}</span>
        <div class="rc-title">
          <button class="linkbtn" data-a="res-open" data-id="${esc(r.id)}">${esc(resName(r))}</button>
          ${arTitle(r)}
          <div class="sub">${subLine(r)}</div>
        </div>
        <button class="ib${st.bookmark ? " on" : ""}" data-a="res-bm" data-id="${esc(r.id)}" data-fk="bm:${esc(r.id)}" aria-pressed="${st.bookmark ? "true" : "false"}" aria-label="${st.bookmark ? t("res.removeBm") : t("res.bookmark")}: ${esc(resName(r))}">${icon("bookmark", 20, st.bookmark ? "fill" : "")}</button>
      </div>
      ${badges(r, true)}
      ${ledger(r, false)}
      ${resBlurb(r) ? `<p class="blurb">${esc(resBlurb(r))}</p>` : ""}
      <div class="rc-actions">
        ${url ? `<a class="btn sm${isYT(r) ? " yt" : ""}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${isYT(r) ? icon("play", 14) + " " + t("res.watch") : t("res.open") + " " + icon("external", 15)}</a>` : ""}
        <button class="btn sm ghost${st.done ? " on" : ""}" data-a="res-done" data-id="${esc(r.id)}" data-fk="rd:${esc(r.id)}" aria-pressed="${st.done ? "true" : "false"}">${icon("check", 15)} ${st.done ? t("res.done") : t("res.markDone")}</button>
        ${st.rating ? `<span class="mystars" aria-label="${t("res.ratingAria", { n: st.rating })}">${stars(st.rating)}</span>` : ""}
      </div>
    </article>`;
  }

  /* ───────────────────────── views ───────────────────────── */
  function routeStrip() {
    const cur = currentStage();
    const parts = STAGES.map((s, i) => {
      const f = stageProgress(s); const isCur = cur && cur.id === s.id; const done = f >= 1;
      const node = `<a class="node${done ? " done" : ""}${isCur ? " cur" : ""}" href="#/stage/${s.id}" aria-label="${t("roadmap.hopAria", { n: s.num, stage: esc(stageShort(s)), p: pct(f) })}${isCur ? t("roadmap.hereAria") : ""}"><span class="dot">${done ? icon("check", 12) : ""}</span><span class="nl">${s.num}<em>${esc(stageShort(s))}</em></span></a>`;
      const seg = i < STAGES.length - 1 ? `<span class="seg" style="--f:${pct(f)}%"><i></i></span>` : "";
      return node + seg;
    });
    return `<nav class="strip" aria-label="${t("roadmap.aria")}">${parts.join("")}</nav>`;
  }

  function nextRow(kind, title, sub, right) {
    return `<div class="nrow"><span class="nk">${kind}</span><div class="nb"><div class="nt">${title}</div>${sub ? `<div class="ns">${sub}</div>` : ""}</div>${right || ""}</div>`;
  }

  function nextPickFor(stage, topic, lang) {
    const ok = (r) => r && !r._hidden && !rs(r.id).done && langOf(r) === lang;
    const byTopic = topic ? topicResources(topic.id).filter(ok) : [];
    const keys = lang === "ar" ? ["ar"] : ["free", "paid", "labs", "docs"];
    const fromPicks = keys.reduce((a, k) => a.concat((stage.picks[k] || []).map(resById)), []).filter(ok);
    const best = byTopic.find((r) => fromPicks.some((p) => p.id === r.id));
    return best || byTopic[0] || fromPicks[0] || stageResources(stage).filter(ok)[0] || null;
  }

  let introPlayed = false;
  function viewHome() {
    const intro = !introPlayed; introPlayed = true;
    const cur = currentStage(); const ov = overall(); const rd = readiness(); const sk = streakInfo();
    let hero;
    if (!cur) {
      hero = `<section class="hero${intro ? " intro" : ""}"><div class="hero-l"><span class="here">${icon("pin", 16)} ${t("home.routeComplete")}</span><h1>${t("home.lastHop")}</h1><p>${t("home.lastHopBody")}</p><a class="btn beacon" href="#/roadmap">${t("home.reviewRoute")}</a></div>${routeStrip()}</section>`;
    } else {
      const nt = nextTopic(cur);
      const started = anyProgress();
      hero = `<section class="hero${intro ? " intro" : ""}">
        <div class="hero-l">
          <span class="here">${icon("pin", 16)} ${started ? t("common.youAreHere") : t("home.startHere")}<span class="hopn">${t("home.hopOf", { n: cur.num, total: STAGES.length })}</span></span>
          <h1>${esc(stageTitle(cur))}</h1>
          <p>${nt ? t("home.nextTopic", { topic: esc(topicTitle(nt)) }) + " " : ""}${esc(tstage(cur).outcome || cur.outcome)}</p>
          <div class="hero-cta"><a class="btn beacon" href="#/stage/${cur.id}">${nt ? t("home.continueWith", { topic: esc(topicTitle(nt)) }) : t("home.openThisStage")}</a><span class="ov">${t("home.ofRoute", { p: pct(ov) })}</span></div>
        </div>
        ${routeStrip()}
      </section>`;
    }

    // next steps
    const rows = [];
    if (cur) {
      const nt = nextTopic(cur);
      // Application language leads. Arabic first when the app is Arabic, with the official
      // English resource behind it; English first otherwise, and Arabic only if asked for.
      const bias = resBias();
      const arRec = bias === "ar" || S.prefLang === "ar" ? nextPickFor(cur, nt, "ar") : null;
      const enRec = nextPickFor(cur, nt, "en");
      // No Arabic resource covers this exact topic: say so, then lead with the official English one.
      const noArTopic = bias === "ar" && !!nt && !!enRec && !topicResources(nt.id).some((r) => langOf(r) === "ar");
      if (noArTopic) rows.push(`<p class="arnote">${icon("globe", 16)} ${t("picks.arNoneTopic")}</p>`);
      const order = bias === "ar" && !noArTopic ? [arRec, enRec] : [enRec, arRec];
      order.filter(Boolean).forEach((r, i) => {
        const kind = i === 0 ? (isYT(r) ? t("home.kind.watch") : t("home.kind.learn")) : t("home.kind.then");
        rows.push(nextRow(kind, `<button class="linkbtn" data-a="res-open" data-id="${esc(r.id)}">${esc(resName(r))}</button>`,
          `${nt ? t("home.forTopic", { topic: esc(topicTitle(nt)) }) + " " : ""}${t("home.resMeta", { lang: langLabel(langOf(r)), cost: esc(costText(r)) })}`, badges(r, false)));
      });
      const nl = nextLab(cur);
      if (nl) rows.push(nextRow(t("home.kind.practice"), esc(labTitle(nl)), t("home.labSub", { stage: esc(stageShort(cur)) }), `<a class="btn sm ghost" href="#/stage/${cur.id}">${t("common.openStage")}</a>`));
      const steps = flowSteps(cur); const cs = steps.find((x) => !x.done);
      if (cs && (cs.key === "project" || cs.key === "cert")) {
        const p = cs.f.projectId && projectById(cs.f.projectId); const c = cs.f.certId && certById(cs.f.certId);
        if (p) rows.push(nextRow(t("home.kind.build"), esc(projTitle(p)), `${projDifficulty(p)}، ${t("common.about", { x: esc(hrs(p.time)) })}`, `<a class="btn sm ghost" href="#/project/${p.id}">${t("common.openProject")}</a>`));
        else if (c) rows.push(nextRow(t("home.kind.certify"), esc(certName(c)), esc(c.code), `<a class="btn sm ghost" href="#/certs">${t("common.seePath")}</a>`));
      } else if (!rows.some((r) => r.indexOf(t("home.kind.build")) > -1)) {
        const np = PROJECTS.find((p) => p.stages.includes(cur.num) && projectProgress(p) < 1);
        if (np) rows.push(nextRow(t("home.kind.build"), esc(projTitle(np)), t("home.projectOf", { n: np.n, total: PROJECTS.length }), `<a class="btn sm ghost" href="#/project/${np.id}">${t("common.openProject")}</a>`));
      }
    }
    const later = cur ? cur.topics.filter((t) => !t.link && topicFrac(t) < 1)[1] : null;
    const nextSteps = `<section class="block"><h2>${t("home.whatNext")}</h2><div class="nlist">${rows.join("") || `<p class="muted">${t("home.nothingQueued")}</p>`}</div>
      ${later ? `<p class="muted small after">${t("home.afterThat", { topic: esc(topicTitle(later)), stage: esc(stageShort(cur)) })}</p>` : ""}</section>`;

    const overview = `<section class="block"><div class="bh"><h2>${t("home.yourRoute")}</h2><a class="more" href="#/roadmap">${t("home.fullRoadmap")}</a></div><ul class="ovl">${STAGES.map((s) => {
      const f = stageProgress(s); const isCur = cur && cur.id === s.id;
      return `<li><a href="#/stage/${s.id}" class="ovr${isCur ? " cur" : ""}">${stageTile(s, 34)}<span class="ot">${esc(stageShort(s))}${isCur ? `<span class="tag">${t("common.youAreHere")}</span>` : ""}</span><span class="op">${f >= 1 ? '<span class="okc">' + icon("check", 15) + " 100%</span>" : pct(f) + "%"}</span>${bar(f, s.hue)}</a></li>`;
    }).join("")}</ul></section>`;

    const ready = `<section class="block panel"><h2>${t("home.jobReady")}</h2>
      <div class="rtrack" role="img" aria-label="${t("home.readyAria", { p: pct(rd.score), tier: esc(rd.tier) })}"><i style="width:${pct(rd.score)}%"></i><b style="--p:${pct(rd.score)}%"></b><span style="--p:15%"></span><span style="--p:35%"></span><span style="--p:55%"></span><span style="--p:75%"></span></div>
      <div class="rtier"><strong>${esc(rd.tier)}</strong><span>${pct(rd.score)}%</span></div>
      <ul class="rparts">${rd.parts.map((p) => `<li><span>${p.label}</span>${bar(p.f)}<em>${pct(p.f)}%</em></li>`).join("")}</ul>
      <p class="muted small">${rd.score >= 0.75 ? t("home.strong") : t("home.biggestGain", { advice: gapAdvice(rd.gap.key, cur) })} ${t("home.estimateNote")}</p>
    </section>`;

    const nc = nextCert(); const np = PROJECTS.find((p) => projectProgress(p) < 1);
    const side = `<section class="block duo">
      ${nc ? `<a class="mini" href="#/certs"><span class="mk">${icon("award", 18)} ${t("home.nextCert")}</span><strong>${esc(nc.short)}</strong><span class="ms">${nc.fee ? t("home.examFeeAbout", { currency: nc.fee.currency, amount: nc.fee.amount }) : t("home.examFeeVaries", { text: varyText() })}</span><span class="ms">${certStatusLabel(certState(nc.id).status)}</span></a>` : ""}
      ${np ? `<a class="mini" href="#/project/${np.id}"><span class="mk">${icon("folder", 18)} ${t("home.nextProject")}</span><strong>${esc(projTitle(np))}</strong><span class="ms">${projectStatus(np)}، ${pct(projectProgress(np))}%</span>${bar(projectProgress(np))}</a>` : ""}
    </section>`;

    const week = `<section class="block panel"><h2>${t("home.thisWeek")}</h2><div class="week">${sk.days.map((d) => `<span class="wd${d.n ? " on" : ""}${dayKey(d.d) === dayKey() ? " today" : ""}" title="${t("home.dayItems", { date: dayKey(d.d), n: plural(d.n, "item") })}"><i></i>${d.d.toLocaleDateString(t("lang.locale"), { weekday: "narrow" })}</span>`).join("")}</div>
      <p class="muted small">${sk.streak ? icon("flame", 15) + " " + t("home.streakLine", { n: plural(sk.streak, "day") }) : t("home.streakNone")}</p></section>`;

    const install = deferredInstall ? `<section class="block"><button class="btn ghost" data-a="install">${icon("download", 16)} ${t("home.install")}</button></section>` : "";

    return `<div class="page home">${hero}<div class="home-grid"><div class="col-main">${nextSteps}${overview}</div><div class="col-side">${ready}${side}${week}${install}</div></div></div>`;
  }

  function gapAdvice(key, cur) {
    if (key === "knowledge") return cur ? t("gap.knowledge", { stage: stageShort(cur) }) : t("gap.knowledgeAny");
    if (key === "labs") return t("gap.labs");
    if (key === "projects") return t("gap.projects");
    return t("gap.certs");
  }
  function nextCert() {
    return CERTS.slice().sort((a, b) => a.order - b.order).find((c) => {
      const st = certState(c.id).status;
      if (st === "passed" || st === "skipped") return false;
      return !c.optional || st === "studying" || st === "booked";
    }) || null;
  }

  /* — flow — */
  function flowSteps(stage) {
    const labels = { learn: t("flow.learn"), practice: t("flow.practice"), lab: t("flow.lab"), review: t("flow.review"), project: t("flow.project"), cert: t("flow.cert") };
    const out = ["learn", "practice", "lab", "review", "project", "cert"].filter((k) => stage.flow[k]).map((k) => {
      const f = stage.flow[k]; let done; let auto = false; let note = "";
      if (k === "learn" && stage.num !== 8) { done = topicsFrac(stage) >= 1; auto = true; note = t("flow.allTopics"); }
      else if (k === "lab" && stage.labs.length) { done = labsFrac(stage) >= 1; auto = true; note = t("flow.allLabs"); }
      else if (k === "project" && f.projectId) { const p = projectById(f.projectId); done = projectProgress(p) >= 1; auto = true; note = t("flow.finishProject", { project: projTitle(p) }); }
      else if (k === "cert" && f.certId) { const st = certState(f.certId).status; done = st === "passed" || st === "skipped"; auto = true; note = st === "skipped" ? t("flow.certSkipped") : t("flow.certPassed"); }
      else done = !!S.flow[stage.id + ":" + k];
      return { key: k, label: labels[k], f, done, auto, note };
    });
    const firstOpen = out.findIndex((x) => !x.done);
    out.forEach((x, i) => { x.cur = i === firstOpen; });
    return out;
  }

  function viewRoadmap() {
    const cur = currentStage();
    const ov = overall();
    const rows = STAGES.map((s, i) => {
      const f = stageProgress(s); const isCur = cur && cur.id === s.id; const done = f >= 1;
      const proj = PROJECTS.filter((p) => p.stages.includes(s.num) && s.flow.project && s.flow.project.projectId === p.id);
      const certs = s.certIds.map(certById);
      return `<li class="hop${done ? " done" : ""}${isCur ? " cur" : ""}" style="--h:${s.hue};--f:${pct(f)}%">
        <span class="rail"><span class="pn">${done ? icon("check", 14) : s.num}</span>${i < STAGES.length - 1 ? "<span class='rl'></span>" : ""}</span>
        <a class="hbody" href="#/stage/${s.id}">
          <div class="hh">${stageTile(s, 40)}<div><h3>${esc(stageTitle(s))}</h3>${isCur ? `<span class="tag">${t("common.youAreHere")}</span>` : ""}</div><span class="hp">${done ? '<span class="okc">' + icon("check", 15) + " 100%</span>" : pct(f) + "%"}</span></div>
          <p>${esc(tstage(s).summary || s.summary)}</p>
          ${bar(f, s.hue)}
          <div class="hm"><span>${plural(s.topics.length, "topic")}</span>${s.labs.length ? `<span>${plural(s.labs.length, "lab")}</span>` : ""}<span>${t("roadmap.effort", { x: esc(hrs(s.hours)) })}</span>${proj.map((p) => `<span class="chip">${esc(projTitle(p))}</span>`).join("")}${certs.map((c) => `<span class="chip cert">${esc(c.short)}</span>`).join("")}</div>
        </a></li>`;
    }).join("");
    return `<div class="page"><header class="ph"><h1>${t("title.roadmap")}</h1><p>${t("roadmap.lead")}</p>
      <div class="ovbar"><span>${t("roadmap.overall")}</span><strong>${pct(ov)}%</strong></div>${bar(ov)}</header>
      <ol class="hops">${rows}</ol></div>`;
  }

  const openTopics = new Set();
  function viewStage(id) {
    const s = stageById(id);
    if (!s) return viewRoadmap();
    const f = stageProgress(s); const steps = flowSteps(s);
    const flow = steps.map((st, i) => {
      const resLinks = (st.f.res || []).map(resById).filter((r) => r && !r._hidden);
      const manual = !st.auto;
      const proj = st.f.projectId ? projectById(st.f.projectId) : null;
      const cert = st.f.certId ? certById(st.f.certId) : null;
      return `<li class="fs${st.done ? " done" : ""}${st.cur ? " cur" : ""}">
        <span class="fsn">${st.done ? icon("check", 14) : i + 1}</span>
        <div class="fsb">
          <div class="fst"><strong>${st.label}</strong>${st.cur ? `<span class="tag">${t("common.youAreHere")}</span>` : ""}${manual ? chk(st.done, "f:" + s.id + st.key, "flow", s.id + ":" + st.key, t("stage.markStep", { step: st.label })) : ""}</div>
          <p>${esc(flowText(s, st.key))}</p>
          ${resLinks.length ? `<div class="chips">${resLinks.map((r) => `<button class="chip" data-a="res-open" data-id="${esc(r.id)}">${esc(resName(r))}</button>`).join("")}</div>` : ""}
          ${proj ? `<div class="chips"><a class="chip" href="#/project/${proj.id}">${esc(projTitle(proj))}، ${pct(projectProgress(proj))}%</a></div>` : ""}
          ${cert ? `<div class="chips"><a class="chip" href="#/certs">${esc(cert.short)}، ${certStatusLabel(certState(cert.id).status)}</a></div>` : ""}
          ${st.auto && st.note ? `<span class="autonote">${esc(st.note)}</span>` : ""}
        </div></li>`;
    }).join("");

    const topics = s.topics.map((tp2) => {
      const linked = tp2.link ? projectById(tp2.link.slice(8)) : null;
      const on = topicFrac(tp2) >= 1; const rl = topicResources(tp2.id); const open = openTopics.has(tp2.id);
      return `<li class="trow${on ? " done" : ""}">
        <div class="tline">${linked ? `<span class="chk ro${on ? "" : " part"}" aria-hidden="true">${on ? icon("check", 16) : ""}</span>` : chk(on, "t:" + tp2.id, "topic", tp2.id, t("stage.markLearned", { topic: topicTitle(tp2) }))}
          <span class="tt">${linked ? `<a href="#/project/${linked.id}">${esc(topicTitle(tp2))}</a> <span class="muted small">${t("common.complete", { p: pct(projectProgress(linked)) })}</span>` : esc(topicTitle(tp2))}</span>
          ${rl.length ? `<button class="tcount" data-a="topic-res" data-id="${esc(tp2.id)}" aria-expanded="${open}">${plural(rl.length, "resource")} ${icon("down", 14, open ? "flip" : "")}</button>` : ""}</div>
        ${open ? `<div class="tres">${rl.map((r) => `<button class="tr" data-a="res-open" data-id="${esc(r.id)}"><span>${esc(resName(r))}</span>${costBadge(r)}</button>`).join("")}</div>` : ""}
      </li>`;
    }).join("");

    const labs = s.labs.length ? `<section class="block"><h2>${t("stage.labs")}</h2><p class="muted small">${t("stage.labsNote")}</p><ul class="checks">${s.labs.map((l) => `<li class="trow${S.labs[l.id] ? " done" : ""}"><div class="tline">${chk(!!S.labs[l.id], "l:" + l.id, "lab", l.id, t("stage.markLab", { x: labTitle(l) }))}<span class="tt">${esc(labTitle(l))}</span></div></li>`).join("")}</ul></section>` : "";

    const groups = [["ar", t("picks.ar")], ["free", t("picks.free")], ["paid", t("picks.paid")], ["labs", t("picks.labs")], ["docs", t("picks.docs")]];
    if (resBias() !== "ar") groups.push(groups.shift()); // English leads: official English first, Arabic after
    const seen = new Set();
    const rec = groups.map(([k, label]) => {
      const list = (s.picks[k] || []).map(resById).filter((r) => r && !r._hidden && !seen.has(r.id + k));
      if (!list.length) {
        if (k === "ar") return `<div class="pgroup"><h3>${label}</h3><p class="arnote">${icon("globe", 16)} ${esc(arNoteOf(s) || t("picks.arNone"))}</p></div>`;
        return k === "paid" && s.num === 8 ? `<div class="pgroup"><h3>${label}</h3><p class="muted small">${t("picks.noPay")}</p></div>` : "";
      }
      list.forEach((r) => seen.add(r.id + k));
      const note = k === "ar"
        ? `<p class="muted small">${arNoteOf(s) ? esc(arNoteOf(s)) : t("picks.arNote")}</p>`
        : k === "paid" ? `<p class="muted small">${t("picks.paidNote")}</p>` : "";
      return `<div class="pgroup${k === "ar" ? " arg" : ""}"><h3>${label}</h3>${note}<div class="rlist">${list.map(resCard).join("")}</div></div>`;
    }).join("");
    const total = stageResources(s).length;
    const arTotal = stageResources(s).filter((r) => langOf(r) === "ar").length;

    const projs = PROJECTS.filter((p) => p.stages.includes(s.num));
    const rel = projs.length || s.certIds.length ? `<section class="block"><h2>${t("stage.proveIt")}</h2><div class="duo">${projs.map((p) => `<a class="mini" href="#/project/${p.id}"><span class="mk">${icon("folder", 18)} ${t("stage.project", { n: p.n })}</span><strong>${esc(projTitle(p))}</strong><span class="ms">${projectStatus(p)}، ${pct(projectProgress(p))}%</span>${bar(projectProgress(p))}</a>`).join("")}${s.certIds.map(certById).map((c) => `<a class="mini" href="#/certs"><span class="mk">${icon("award", 18)} ${t("stage.certification")}</span><strong>${esc(c.short)}</strong><span class="ms">${c.fee ? t("home.examFeeAbout", { currency: c.fee.currency, amount: c.fee.amount }) : t("home.examFeeVaries", { text: varyText() })}</span><span class="ms">${certStatusLabel(certState(c.id).status)}</span></a>`).join("")}</div></section>` : "";

    const prev = STAGES[s.num - 2], next = STAGES[s.num];
    return `<div class="page stage" style="--h:${s.hue}">
      <a class="backl" href="#/roadmap">${icon("back", 16)} ${t("stage.back")}</a>
      <header class="sh">${stageTile(s, 56)}<div><span class="hopn">${t("home.hopOf", { n: s.num, total: STAGES.length })}</span><h1>${esc(stageTitle(s))}</h1></div></header>
      <p class="lead">${esc(tstage(s).summary || s.summary)}</p>
      <div class="sprog"><span>${t("common.complete", { p: pct(f) })}</span><span class="muted">${t("roadmap.effort", { x: esc(hrs(s.hours)) })}</span></div>${bar(f, s.hue)}
      <p class="outcome"><strong>${t("stage.byTheEnd")}</strong> ${esc(tstage(s).outcome || s.outcome)}</p>
      <section class="block"><h2>${t("stage.flow")}</h2><ol class="flow">${flow}</ol></section>
      <section class="block"><h2>${t("stage.topics")}</h2><ul class="checks">${topics}</ul></section>
      ${labs}
      <section class="block"><h2>${t("stage.where")}</h2>${rec}
        <div class="btnrow"><button class="btn ghost" data-a="go-academy" data-id="${s.num}">${t("stage.browseAll", { n: plural(total, "resource") })}</button>
        ${arTotal ? `<button class="btn ghost" data-a="go-academy" data-id="${s.num}" data-lang="ar">${icon("globe", 15)} ${t("stage.browseAr", { n: arTotal })}</button>` : ""}</div></section>
      ${rel}
      <nav class="pn2">${prev ? `<a href="#/stage/${prev.id}">${icon("back", 16)} ${esc(stageShort(prev))}</a>` : "<span></span>"}${next ? `<a href="#/stage/${next.id}">${esc(stageShort(next))} ${icon("chevron", 16)}</a>` : ""}</nav>
    </div>`;
  }

  /* — academy — */
  const F = { q: "", stage: "all", lang: "all", cost: new Set(), types: new Set(), levels: new Set(), saved: false, hideDone: false, sort: "best", limit: 12 };
  function pickRank(r, stageNum) {
    let best = 999;
    STAGES.forEach((s) => {
      if (stageNum && s.num !== stageNum) return;
      const base = stageNum ? 0 : s.num * 10; // with no stage chosen, earlier stages come first
      [["ar", 0], ["free", 0.1], ["labs", 0.3], ["paid", 0.5], ["docs", 0.7]].forEach(([k, off]) => { const i = (s.picks[k] || []).indexOf(r.id); if (i >= 0) best = Math.min(best, base + i + off); });
    });
    return best;
  }
  /* Search works in every language. Each word (or known phrase) is a "concept"; a concept is satisfied
     by its own text or by the English term it maps to, and every concept must be satisfied:
     "معامل عربية" means Arabic AND labs, not either one, and "جدار الحماية" finds Firewall.
     Relevance: name, then description, then tags. */
  const normText = (v) => String(v).toLowerCase().replace(/[\u064B-\u065F\u0640]/g, "").replace(/[أإآ]/g, "ا").replace(/ى/g, "ي").replace(/ة/g, "ه");
  const translated = () => LANGS.map(contentOf).filter(Boolean);
  let synList = null;
  function synonyms() {
    if (!synList) {
      const all = {}; translated().forEach((c) => Object.assign(all, c.search));
      synList = Object.keys(all).map((k) => ({ k: normText(k), en: all[k].toLowerCase() })).sort((a, b) => b.k.length - a.k.length);
    }
    return synList;
  }
  function concepts(q) {
    let rest = normText(q); const out = [];
    synonyms().forEach(({ k, en }) => { if (rest.indexOf(k) >= 0) { out.push([k, en]); rest = rest.split(k).join(" "); } });
    rest.split(/\s+/).filter(Boolean).forEach((w) => out.push([w]));
    return out;
  }
  function matchScore(r, q) {
    const cs = concepts(q); if (!cs.length) return 1;
    const tc = translated(); const trs = tc.map((c) => c.res[r.id] || {});
    const topicTxt = (r.topics || []).map((id) => tc.map((c) => c.topic[id] || "").join(" ") + " " + (((topicIndex[id] || {}).t || {}).title || "")).join(" ");
    const stageTxt = (r.stages || []).map((n) => {
      const st = STAGES[n - 1]; if (!st) return "";
      return [st.short, st.title].concat(...tc.map((c) => [(c.stage[st.id] || {}).short, (c.stage[st.id] || {}).title])).filter(Boolean).join(" ");
    }).join(" ");
    const tiers = [
      [3, normText([r.name, r.arName].concat(trs.map((x) => x.name)).filter(Boolean).join(" "))],
      [2, normText([r.blurb].concat(trs.map((x) => x.blurb)).filter(Boolean).join(" "))],
      [1, normText([r.provider, r.channel, r.instructor, r.source, r.format, topicTxt, stageTxt,
        langOf(r) === "ar" ? "arabic" : "english", r.lab ? "lab" : "", r.prep ? "certification exam" : "", r.official ? "official" : "",
        r.pricing === "free" ? "free" : r.pricing === "paid" ? "paid" : "free paid"].filter(Boolean).join(" "))],
    ];
    let score = 0;
    for (const alts of cs) {
      let best = 0;
      for (const [w, hay] of tiers) { if (best < w && alts.some((a) => hay.indexOf(a) >= 0)) best = w; }
      if (!best) return 0;
      score += best;
    }
    return score;
  }
  function filtered() {
    const q = F.q.trim().toLowerCase(); const sn = F.stage === "all" ? 0 : +F.stage;
    const scores = new Map();
    let list = resources().filter((r) => {
      if (sn && !(r.stages || []).includes(sn)) return false;
      if (F.lang !== "all" && langOf(r) !== F.lang) return false;
      if (F.cost.size && !F.cost.has(r.pricing)) return false;
      if (F.types.has("official") && !r.official) return false;
      if (F.types.has("lab") && !r.lab) return false;
      if (F.types.has("prep") && !r.prep) return false;
      if (F.levels.size && !F.levels.has(r.level)) return false;
      if (F.saved && !rs(r.id).bookmark) return false;
      if (F.hideDone && rs(r.id).done) return false;
      if (q) { const sc = matchScore(r, q); if (!sc) return false; scores.set(r.id, sc); }
      return true;
    });
    const key = (r) => (F.sort === "rating" ? -(rs(r.id).rating || 0) : pickRank(r, sn));
    const langKey = (r) => (F.sort !== "best" ? 0 : langOf(r) === resBias() ? 0 : 1);
    const rel = (r) => (q && F.sort === "best" ? -(scores.get(r.id) || 0) : 0);
    list.sort((a, b) => (rs(a.id).done ? 1 : 0) - (rs(b.id).done ? 1 : 0) || rel(a) - rel(b) || langKey(a) - langKey(b) || key(a) - key(b) || a.name.localeCompare(b.name));
    if (F.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }
  const activeFilterCount = () => (F.stage !== "all" ? 1 : 0) + (F.lang !== "all" ? 1 : 0) + F.cost.size + F.types.size + F.levels.size + (F.saved ? 1 : 0) + (F.hideDone ? 1 : 0);
  const QUICK = {
    "ar-free": { label: () => t("academy.quick.arFree"), set: () => { F.lang = "ar"; F.cost = new Set(["free"]); } },
    "ar-labs": { label: () => t("academy.quick.arLabs"), set: () => { F.lang = "ar"; F.types = new Set(["lab"]); } },
    "ar-prep": { label: () => t("academy.quick.arPrep"), set: () => { F.lang = "ar"; F.types = new Set(["prep"]); } },
    official: { label: () => t("academy.quick.official"), set: () => { F.types = new Set(["official"]); } },
  };
  const quickOn = (k) => {
    if (k === "ar-free") return F.lang === "ar" && F.cost.size === 1 && F.cost.has("free") && !F.types.size;
    if (k === "ar-labs") return F.lang === "ar" && F.types.size === 1 && F.types.has("lab");
    if (k === "ar-prep") return F.lang === "ar" && F.types.size === 1 && F.types.has("prep");
    return F.types.size === 1 && F.types.has("official") && F.lang === "all" && !F.cost.size;
  };
  const fchip = (g, v, label, on) => `<button class="fc${on ? " on" : ""}" data-a="filter" data-g="${g}" data-v="${v}" aria-pressed="${on}">${label}</button>`;

  function academyList() {
    const list = filtered(); const shown = list.slice(0, F.limit);
    if (!list.length) return `<div class="empty"><strong>${t("academy.emptyTitle")}</strong><p>${t("academy.emptyBody")}</p><button class="btn ghost" data-a="clear-filters">${t("academy.clear")}</button></div>`;
    return `<p class="count" aria-live="polite">${t("academy.showing", { n: shown.length, total: list.length })}</p><div class="rlist">${shown.map(resCard).join("")}</div>${list.length > shown.length ? `<button class="btn ghost wide" data-a="more">${t("academy.more", { n: Math.min(12, list.length - shown.length) })}</button>` : ""}`;
  }
  function viewAcademy() {
    const hidden = resources(true).filter((r) => r._hidden);
    const n = activeFilterCount();
    return `<div class="page"><header class="ph"><div class="phrow"><div><h1>${t("title.academy")}</h1><p>${t("academy.lead")}</p></div><button class="btn sm" data-a="res-new">${icon("plus", 16)} ${t("academy.add")}</button></div></header>
      <aside class="legend"><span>${icon("info", 18)}</span><p><strong>${t("academy.legendTitle")}</strong> ${t("academy.legend")}</p></aside>
      <div class="search">${icon("search", 18)}<input id="q" type="search" placeholder="${t("academy.search")}" value="${esc(F.q)}" aria-label="${t("academy.searchAria")}" autocomplete="off"></div>
      <div class="qrow" role="group" aria-label="${t("academy.quickAria")}">${Object.keys(QUICK).map((k) => `<button class="fc${quickOn(k) ? " on" : ""}" data-a="quick" data-v="${k}" aria-pressed="${quickOn(k)}">${QUICK[k].label()}</button>`).join("")}</div>
      <details class="filters"${n || window.innerWidth >= 960 ? " open" : ""}><summary>${icon("filter", 16)} ${t("academy.filters")}${n ? ` <span class="fn">${n}</span>` : ""}</summary>
        <div class="fg"><span class="fl">${t("academy.f.stage")}</span><div class="fchips"><button class="fc${F.stage === "all" ? " on" : ""}" data-a="filter" data-g="stage" data-v="all" aria-pressed="${F.stage === "all"}">${t("academy.f.allStages")}</button>${STAGES.map((s) => fchip("stage", s.num, esc(stageShort(s)), F.stage === String(s.num))).join("")}</div></div>
        <div class="fg"><span class="fl">${t("academy.f.language")}</span><div class="fchips">${[["all", t("academy.f.all")], ["ar", langLabel("ar")], ["en", langLabel("en")]].map(([v, l]) => fchip("lang", v, l, F.lang === v)).join("")}</div></div>
        <div class="fg"><span class="fl">${t("academy.f.cost")}</span><div class="fchips">${["free", "paid", "mixed"].map((c) => fchip("cost", c, costLabel(c), F.cost.has(c))).join("")}</div></div>
        <div class="fg"><span class="fl">${t("academy.f.type")}</span><div class="fchips">${fchip("types", "official", t("academy.f.official"), F.types.has("official"))}${fchip("types", "lab", t("academy.f.labs"), F.types.has("lab"))}${fchip("types", "prep", t("academy.f.prep"), F.types.has("prep"))}</div></div>
        <div class="fg"><span class="fl">${t("academy.f.level")}</span><div class="fchips">${Object.keys(LEVEL).map((l) => fchip("levels", l, levelLabel(l), F.levels.has(l))).join("")}</div></div>
        <div class="fg"><span class="fl">${t("academy.f.mine")}</span><div class="fchips">${fchip("saved", "1", t("academy.f.bookmarked"), F.saved)}${fchip("hideDone", "1", t("academy.f.hideDone"), F.hideDone)}</div></div>
        <div class="fg sortg"><label class="fl" for="sortsel">${t("academy.f.sort")}</label><select id="sortsel" data-a="sort"><option value="best"${F.sort === "best" ? " selected" : ""}>${t("academy.sort.best")}</option><option value="rating"${F.sort === "rating" ? " selected" : ""}>${t("academy.sort.rating")}</option><option value="name"${F.sort === "name" ? " selected" : ""}>${t("academy.sort.name")}</option></select>${n ? `<button class="btn sm ghost" data-a="clear-filters">${t("academy.clear")}</button>` : ""}</div>
        <p class="muted small">${t("academy.filterNote")}</p>
      </details>
      <div id="rlist">${academyList()}</div>
      ${hidden.length ? `<p class="muted small removed">${t("academy.removed", { n: plural(hidden.length, "resource") })} <button class="linkbtn" data-a="res-restore-all">${t("academy.restoreAll")}</button></p>` : ""}
    </div>`;
  }

  /* — projects — */
  function viewProjects() {
    return `<div class="page"><header class="ph"><h1>${t("title.projects")}</h1><p>${t("projects.lead")}</p></header>
      <ul class="plist">${PROJECTS.map((p) => {
        const f = projectProgress(p);
        return `<li><a class="pcard" href="#/project/${p.id}"><span class="tile" style="--h:var(--primary)">${icon(p.icon, 22)}</span><div class="pb"><h3>${t("project.n", { n: p.n, title: esc(projTitle(p)) })}</h3><p>${esc(tproj(p).objective || p.objective)}</p><div class="hm"><span>${esc(projDifficulty(p))}</span><span>${t("common.about", { x: esc(hrs(p.time)) })}</span><span class="status s-${projectStatusKey(p)}">${projectStatus(p)}</span></div>${bar(f)}<div class="pp">${t("common.complete", { p: pct(f) })}</div></div></a></li>`;
      }).join("")}</ul></div>`;
  }
  function viewProject(id) {
    const p = projectById(id);
    if (!p) return viewProjects();
    const st = S.projects[p.id] || {}; const f = projectProgress(p);
    const li = (arr, kind) => arr.map((x, i) => {
      const on = !!(st[kind] || {})[i]; const title = typeof x === "string" ? x : x.t; const d = typeof x === "string" ? "" : x.d;
      return `<li class="trow${on ? " done" : ""}"><div class="tline">${chk(on, kind + ":" + i, "proj-" + kind, p.id + ":" + i, t("common.markDone", { x: title }))}<span class="tt">${esc(title)}${d ? `<span class="td">${esc(d)}</span>` : ""}</span></div></li>`;
    }).join("");
    return `<div class="page">
      <a class="backl" href="#/projects">${icon("back", 16)} ${t("project.back")}</a>
      <header class="sh"><span class="tile" style="--h:var(--primary);--sz:56px">${icon(p.icon, 28)}</span><div><span class="hopn">${t("home.projectOf", { n: p.n, total: PROJECTS.length })}</span><h1>${esc(projTitle(p))}</h1></div></header>
      <div class="hm big"><span class="status s-${projectStatusKey(p)}">${projectStatus(p)}</span><span>${esc(projDifficulty(p))}</span><span>${t("common.about", { x: esc(hrs(p.time)) })}</span></div>
      <div class="sprog"><span>${t("common.complete", { p: pct(f) })}</span><span class="muted">${t("project.steps", { steps: plural(p.steps.length, "step"), checks: plural(p.checklist.length, "check") })}</span></div>${bar(f)}
      <section class="block"><h2>${t("project.objective")}</h2><p>${esc(tproj(p).objective || p.objective)}</p></section>
      ${tproj(p).note || p.note ? `<aside class="legend warn"><span>${icon("info", 18)}</span><p>${esc(tproj(p).note || p.note)}</p></aside>` : ""}
      <section class="block cols"><div><h2>${t("project.prereq")}</h2><ul class="dots">${projList(p, "prerequisites").map((x) => `<li>${esc(x)}</li>`).join("")}</ul></div>
        <div><h2>${t("project.skills")}</h2><div class="chips">${projList(p, "skills").map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div><h2 class="h2b">${t("project.tech")}</h2><div class="chips">${projList(p, "tech").map((x) => `<span class="chip">${esc(x)}</span>`).join("")}</div></div></section>
      <section class="block"><h2>${t("project.tasks")}</h2><ul class="checks">${li(projSteps(p), "steps")}</ul></section>
      <section class="block"><h2>${t("project.done")}</h2><p class="muted small">${t("project.doneNote")}</p><ul class="checks">${li(projList(p, "checklist"), "checks")}</ul></section>
      <section class="block"><h2>${t("project.notes")}</h2><label class="sr" for="pnotes">${t("project.notesLabel")}</label><textarea id="pnotes" class="notes" data-note="${p.id}" rows="5" placeholder="${t("project.notesHint")}">${esc(st.notes || "")}</textarea><p class="muted small">${t("project.notesSaved")}</p></section>
    </div>`;
  }

  /* — certifications — */
  function viewCerts() {
    const list = CERTS.slice().sort((a, b) => a.order - b.order);
    const nc = nextCert();
    return `<div class="page"><header class="ph"><h1>${t("title.certs")}</h1><p>${t("certs.lead")}</p></header>
      <aside class="legend"><span>${icon("info", 18)}</span><p><strong>${t("certs.legendTitle")}</strong> ${t("certs.legend", { date: esc(dateLabel(DATA_VERIFIED)) })}</p></aside>
      <ol class="cpath">${list.map((c) => {
        const st = certState(c.id); const isNext = nc && nc.id === c.id;
        const fee = c.fee ? `<strong>${t("certs.feeAbout", { currency: esc(c.fee.currency), amount: c.fee.amount })}</strong> ${t("certs.perAttempt")}<span class="td">${esc(tcert(c).feeNote || c.fee.note)}</span>` : `<strong>${varyText()}</strong>${c.feeHint ? `<span class="td">${esc(tcert(c).feeHint || c.feeHint)}</span>` : ""}`;
        const prep = c.prep.map(resById).filter((r) => r && !r._hidden);
        return `<li class="cc st-${st.status}${isNext ? " next" : ""}">
          <div class="cch"><span class="tile" style="--h:${stageById("s" + c.stage).hue}">${icon("award", 22)}</span><div><h3>${esc(certName(c))}</h3><div class="sub">${esc(c.issuer)}<span class="sep"></span>${esc(tcert(c).code || c.code)}</div></div>${isNext ? `<span class="tag">${t("common.nextUp")}</span>` : c.optional ? `<span class="tag soft">${t("common.optional")}</span>` : ""}</div>
          <p>${esc(tcert(c).blurb || c.blurb)}</p>
          <dl class="ledger"><div><dt>${t("certs.fee")}</dt><dd>${fee}</dd></div><div><dt>${t("certs.level")}</dt><dd>${esc(tcert(c).level || c.level)}</dd></div><div><dt>${t("certs.valid")}</dt><dd>${esc(tcert(c).valid || c.valid)}</dd></div><div><dt>${t("certs.stage")}</dt><dd><a href="#/stage/s${c.stage}">${esc(stageShort(stageById("s" + c.stage)))}</a></dd></div></dl>
          <div class="seg3" role="group" aria-label="${t("certs.statusAria", { cert: esc(c.short) })}">${CERT_STATUS_KEYS.map((k) => `<button class="${st.status === k ? "on" : ""}" data-a="cert-status" data-id="${c.id}" data-v="${k}" aria-pressed="${st.status === k}">${certStatusLabel(k)}</button>`).join("")}</div>
          ${st.status === "booked" || st.status === "passed" ? `<label class="fld"><span>${st.status === "passed" ? t("certs.datePassed") : t("certs.examDate")}</span><input type="date" data-a="cert-date" data-id="${c.id}" value="${esc(st.date || "")}"></label>` : ""}
          <div class="cprep"><span class="fl">${t("certs.prepare")}</span><div class="chips">${prep.map((r) => `<button class="chip" data-a="res-open" data-id="${esc(r.id)}">${esc(resName(r))}</button>`).join("")}</div></div>
          <a class="btn sm ghost" href="${esc(c.url)}" target="_blank" rel="noopener noreferrer">${t("certs.official")} ${icon("external", 15)}</a>
        </li>`;
      }).join("")}</ol></div>`;
  }

  /* — settings — */
  function viewSettings() {
    const standalone = window.matchMedia && matchMedia("(display-mode: standalone)").matches;
    return `<div class="page narrow"><header class="ph"><h1>${t("title.settings")}</h1></header>
      <section class="block"><h2>${t("set.appLang")}</h2>${langSwitch("seg3")}
        <p class="muted small">${t("set.appLangNote")}</p></section>
      <section class="block"><h2>${t("set.you")}</h2><label class="fld"><span>${t("set.name")}</span><input id="nm" type="text" value="${esc(S.name)}" maxlength="40" autocomplete="given-name" placeholder="${t("set.nameHint")}"></label></section>
      <section class="block"><h2>${t("set.appearance")}</h2><div class="seg3" role="group" aria-label="${t("set.theme")}">${[["auto", t("set.themeAuto")], ["light", t("set.themeLight")], ["dark", t("set.themeDark")]].map(([v, l]) => `<button class="${S.theme === v ? "on" : ""}" data-a="theme" data-v="${v}" aria-pressed="${S.theme === v}">${l}</button>`).join("")}</div></section>
      <section class="block"><h2>${t("set.resLang")}</h2><div class="seg3" role="group" aria-label="${t("set.resLangAria")}">${[["both", t("set.resBoth")], ["ar", t("set.resAr")], ["en", t("set.resEn")]].map(([v, l]) => `<button class="${(S.prefLang || "both") === v ? "on" : ""}" data-a="pref-lang" data-v="${v}" aria-pressed="${(S.prefLang || "both") === v}">${l}</button>`).join("")}</div>
        <p class="muted small">${t("set.resLangNote")}</p></section>
      <section class="block"><h2>${t("set.install")}</h2><p class="muted">${standalone ? t("set.installed") : deferredInstall ? t("set.canInstall") : t("set.installHow")}</p>
        ${deferredInstall ? `<button class="btn" data-a="install">${icon("download", 16)} ${t("set.installBtn")}</button>` : ""}
        <p class="muted small">${t("set.privacy")}</p></section>
      <section class="block"><h2>${t("set.data")}</h2><div class="btnrow"><button class="btn ghost" data-a="export">${icon("download", 16)} ${t("set.export")}</button><label class="btn ghost filebtn">${icon("upload", 16)} ${t("set.import")}<input type="file" accept="application/json,.json" id="imp" hidden></label></div>
        <p class="muted small">${t("set.exportNote")}</p>
        <div class="btnrow"><button class="btn ghost" data-a="demo">${t("set.demo")}</button><button class="btn danger" data-a="reset">${t("set.reset")}</button></div></section>
      <section class="block"><h2>${t("set.about")}</h2><p class="muted small">${t("set.aboutText", { version: APP_VERSION, varies: varyText() })}</p></section>
    </div>`;
  }

  /* ───────────────────────── sheets ───────────────────────── */
  const sheet = () => $("#sheet");
  function openSheet(html, cls) {
    const d = sheet(); d.className = cls || "";
    d.innerHTML = `<div class="sh-in">${html}</div>`; bidiFix(d);
    if (!d.open) { try { d.showModal(); } catch (e) { d.setAttribute("open", ""); } }
  }
  function closeSheet() { const d = sheet(); if (d.open) { try { d.close(); } catch (e) { d.removeAttribute("open"); } } }

  function openResSheet(id) {
    const r = resById(id); if (!r) return;
    const st = rs(id); const url = safeUrl(r.url);
    const stg = (r.stages || []).map((n) => STAGES[n - 1]).filter(Boolean);
    const topics = (r.topics || []).map((t) => topicIndex[t]).filter(Boolean);
    openSheet(`<div class="sheet-h"><h2>${esc(resName(r))}</h2><button class="ib" data-a="close-sheet" aria-label="${t('common.close')}">${icon("x", 20)}</button></div>
      ${arTitle(r)}
      <div class="sub">${subLine(r)}</div>
      ${badges(r, true)}
      ${resBlurb(r) ? `<p>${esc(resBlurb(r))}</p>` : ""}
      ${ledger(r, true)}
      ${stg.length ? `<div class="fg"><span class="fl">${t("res.stages")}</span><div class="chips">${stg.map((s) => `<a class="chip" href="#/stage/${s.id}" data-a="close-sheet">${esc(stageShort(s))}</a>`).join("")}</div></div>` : ""}
      ${topics.length ? `<div class="fg"><span class="fl">${t("res.topics")}</span><div class="chips">${topics.map((x) => `<span class="chip">${esc(topicTitle(x.t))}</span>`).join("")}</div></div>` : ""}
      <div class="fg"><span class="fl">${t("res.rating")}</span><div class="rate" role="group" aria-label="${t("res.rateAria")}">${[1, 2, 3, 4, 5].map((i) => `<button class="ib${i <= (st.rating || 0) ? " on" : ""}" data-a="res-rate" data-id="${esc(id)}" data-v="${i}" aria-label="${i > 1 ? t("res.stars", { n: i }) : t("res.star1")}" aria-pressed="${st.rating === i}">${icon("star", 22, i <= (st.rating || 0) ? "fill" : "")}</button>`).join("")}${st.rating ? `<button class="linkbtn small" data-a="res-rate" data-id="${esc(id)}" data-v="0">${t("res.clear")}</button>` : ""}</div></div>
      <div class="sheet-actions">
        ${url ? `<a class="btn${isYT(r) ? " yt" : ""}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${isYT(r) ? icon("play", 15) + " " + t("res.watch") : t("res.open") + " " + icon("external", 16)}</a>` : ""}
        ${safeUrl(r.channelUrl || "") ? `<a class="btn ghost" href="${esc(safeUrl(r.channelUrl))}" target="_blank" rel="noopener noreferrer">${icon("external", 15)} ${t("res.channel")}</a>` : ""}
        <button class="btn ghost${st.done ? " on" : ""}" data-a="res-done" data-id="${esc(id)}" data-sheet="1" aria-pressed="${!!st.done}">${icon("check", 16)} ${st.done ? t("res.done") : t("res.markDone")}</button>
        <button class="btn ghost${st.bookmark ? " on" : ""}" data-a="res-bm" data-id="${esc(id)}" data-sheet="1" aria-pressed="${!!st.bookmark}">${icon("bookmark", 16, st.bookmark ? "fill" : "")} ${st.bookmark ? t("res.bookmarked") : t("res.bookmark")}</button>
      </div>
      <div class="sheet-manage"><button class="linkbtn" data-a="res-edit" data-id="${esc(id)}">${icon("edit", 15)} ${t("common.edit")}</button>
        ${r._edited ? `<button class="linkbtn" data-a="res-reset" data-id="${esc(id)}">${icon("undo", 15)} ${t("res.resetOriginal")}</button>` : ""}
        <button class="linkbtn danger" data-a="res-remove" data-id="${esc(id)}">${icon("trash", 15)} ${t("common.remove")}</button></div>`, "wide");
  }

  const MODEL_KINDS = ["One-time", "Subscription", "Per course", "Varies"];
  const modelLabel = (m) => t("model." + m.replace(/[\s-]/g, "").toLowerCase());
  function modelKind(m) {
    m = m || "";
    if (/subscri|monthly|annual|per month/i.test(m)) return "Subscription";
    if (/per course|per book/i.test(m)) return "Per course";
    if (/one-time|per attempt|exam|voucher/i.test(m)) return "One-time";
    return "Varies";
  }

  function openResForm(id) {
    const r = id ? resById(id) : null;
    const v0 = r || { name: "", url: "", provider: "", pricing: "free", price: { text: "", currency: "USD", model: "Varies", amount: "" }, cert: ["None", "Not applicable"], level: "beginner", official: false, lab: false, prep: false, blurb: "", stages: [], topics: [], format: "" };
    // Editing a built-in resource starts from the text shown in the current language, not the English source.
    const shown = !!r && !r._custom && !r._edited && L !== "en";
    const v = shown ? Object.assign({}, v0, { name: resName(r), blurb: resBlurb(r), format: tp(v0.format || ""), cert: [tp((v0.cert || [])[0] || "None"), (v0.cert || [])[1]] }) : v0;
    const p = v.price || {}; const cert = v.cert || [];
    const proOpts = ["No. The official exam is separate.", "Yes. The exam is included.", "Not applicable"];
    const proLabel = { "No. The official exam is separate.": t("pro.no"), "Yes. The exam is included.": t("pro.yes"), "Not applicable": t("pro.na") };
    const proVal = proOpts.includes(cert[1]) ? cert[1] : cert[1] ? "__keep" : "Not applicable";
    openSheet(`<form id="resForm" data-id="${esc(id || "")}" novalidate>
      <div class="sheet-h"><h2>${r ? t("form.editTitle") : t("form.addTitle")}</h2><button type="button" class="ib" data-a="close-sheet" aria-label="${t('common.close')}">${icon("x", 20)}</button></div>
      <label class="fld"><span>${t("form.name")}</span><input name="name" required maxlength="120" value="${esc(v.name)}"></label>
      <label class="fld"><span>${t("form.link")}</span><input name="url" type="url" required inputmode="url" placeholder="https://" value="${esc(v.url)}"></label>
      <label class="fld"><span>${t("form.provider")}</span><input name="provider" maxlength="80" value="${esc(v.provider)}"></label>
      <fieldset class="fld"><legend>${t("form.costType")}</legend><div class="radios">${["free", "mixed", "paid"].map((k) => `<label><input type="radio" name="pricing" value="${k}"${v.pricing === k ? " checked" : ""}> ${costLabel(k)}</label>`).join("")}</div></fieldset>
      <div class="row3"><label class="fld"><span>${t("form.amount")}</span><input name="amount" inputmode="decimal" placeholder="${t("form.amountHint")}" value="${esc(p.amount || "")}"></label>
        <label class="fld"><span>${t("form.currency")}</span><select name="currency">${["USD", "EUR", "GBP", "EGP", "—"].map((c) => `<option${(p.currency || "USD") === c ? " selected" : ""}>${c}</option>`).join("")}</select></label>
        <label class="fld"><span>${t("form.billing")}</span><select name="model">${MODEL_KINDS.map((c) => `<option value="${c}"${modelKind(p.model) === c ? " selected" : ""}>${modelLabel(c)}</option>`).join("")}</select></label></div>
      <p class="muted small">${t("form.priceNote", { varies: varyText() })}</p>
      <label class="fld"><span>${t("form.courseCert")}</span><input name="courseCert" maxlength="120" value="${esc(cert[0] || "None")}" placeholder="${t("form.courseCertHint")}"></label>
      <label class="fld"><span>${t("form.proCert")}</span><select name="proCert">${proOpts.map((o) => `<option value="${esc(o)}"${proVal === o ? " selected" : ""}>${proLabel[o]}</option>`).join("")}${proVal === "__keep" ? `<option value="__keep" selected>${esc(tp(cert[1]))}</option>` : ""}</select></label>
      <div class="row3"><label class="fld"><span>${t("form.level")}</span><select name="level">${Object.keys(LEVEL).map((l) => `<option value="${l}"${v.level === l ? " selected" : ""}>${levelLabel(l)}</option>`).join("")}</select></label>
        <label class="fld"><span>${t("form.format")}</span><input name="format" maxlength="40" value="${esc(v.format)}" placeholder="${t("form.formatHint")}"></label></div>
      <fieldset class="fld"><legend>${t("form.tags")}</legend><div class="radios"><label><input type="checkbox" name="tags" value="official"${v.official ? " checked" : ""}> ${t("form.tagOfficial")}</label><label><input type="checkbox" name="tags" value="lab"${v.lab ? " checked" : ""}> ${t("form.tagLab")}</label><label><input type="checkbox" name="tags" value="prep"${v.prep ? " checked" : ""}> ${t("form.tagPrep")}</label></div></fieldset>
      <fieldset class="fld"><legend>${t("form.stages")}</legend><div class="radios">${STAGES.map((s) => `<label><input type="checkbox" name="stages" value="${s.num}"${(v.stages || []).includes(s.num) ? " checked" : ""}> ${esc(stageShort(s))}</label>`).join("")}</div></fieldset>
      <fieldset class="fld"><legend>${t("form.topics")}</legend>${STAGES.map((s) => `<details class="tpick"><summary>${esc(stageShort(s))}</summary><div class="radios">${s.topics.filter((x) => !x.link).map((x) => `<label><input type="checkbox" name="topics" value="${x.id}"${(v.topics || []).includes(x.id) ? " checked" : ""}> ${esc(topicTitle(x))}</label>`).join("")}</div></details>`).join("")}</fieldset>
      <label class="fld"><span>${t("form.note")}</span><textarea name="blurb" rows="3" maxlength="400">${esc(v.blurb)}</textarea></label>
      <p class="err" id="formErr" role="alert" hidden></p>
      <div class="sheet-actions"><button class="btn" type="submit">${t("form.save")}</button><button class="btn ghost" type="button" data-a="close-sheet">${t("common.cancel")}</button></div>
    </form>`, "wide");
  }

  function saveResForm(form) {
    const fd = new FormData(form); const id = form.dataset.id;
    const name = (fd.get("name") || "").trim(); const url = safeUrl((fd.get("url") || "").trim());
    const err = $("#formErr");
    if (!name) { err.textContent = t("form.errName"); err.hidden = false; return; }
    if (!url) { err.textContent = t("form.errUrl"); err.hidden = false; return; }
    const pricing = fd.get("pricing") || "free";
    const amount = (fd.get("amount") || "").trim(); const currency = fd.get("currency") || "—";
    const oldModel = id && (resById(id).price || {}).model; const pickedModel = fd.get("model") || "Varies";
    const model = pricing === "free" ? "Free" : (oldModel && modelKind(oldModel) === pickedModel ? oldModel : pickedModel);
    const price = pricing === "free" ? { text: "Free", currency: "—", model: "Free", amount: "" }
      : { text: amount ? "≈ " + (currency === "—" ? "" : currency + " ") + amount : "Price varies — check provider", currency, model, amount, note: (id && (resById(id).price || {}).note) || "" };
    const tags = fd.getAll("tags");
    const proRaw = fd.get("proCert"); const oldPro = id && resById(id) && (resById(id).cert || [])[1];
    const data = {
      name, url, provider: (fd.get("provider") || "").trim(), pricing, price,
      cert: [(fd.get("courseCert") || "None").trim() || "None", proRaw === "__keep" ? oldPro : proRaw],
      level: fd.get("level") || "beginner", format: (fd.get("format") || "").trim(), official: tags.includes("official"), lab: tags.includes("lab"), prep: tags.includes("prep"),
      stages: fd.getAll("stages").map(Number), topics: fd.getAll("topics"), blurb: (fd.get("blurb") || "").trim(),
    };
    if (id) {
      const r = resById(id);
      if (r._custom) { const i = S.custom.findIndex((c) => c.id === id); S.custom[i] = Object.assign({}, S.custom[i], data); }
      else S.edits[id] = data;
    } else {
      S.custom.push(Object.assign({ id: "c-" + Date.now().toString(36) }, data));
    }
    save(); closeSheet(); toast(t(id ? "toast.resUpdated" : "toast.resAdded")); render(true);
  }

  function confirmSheet(title, body, ok, fn) {
    openSheet(`<div class="sheet-h"><h2>${esc(title)}</h2></div><p>${body}</p><div class="sheet-actions"><button class="btn danger" data-a="confirm-yes">${esc(ok)}</button><button class="btn ghost" data-a="close-sheet">${t("common.cancel")}</button></div>`);
    confirmFn = fn;
  }
  let confirmFn = null;

  /* ───────────────────────── toast ───────────────────────── */
  let toastTimer = 0;
  function toast(msg, label, fn) {
    const t = $("#toast"); t.innerHTML = `<span>${esc(msg)}</span>${label ? `<button class="linkbtn" id="toastBtn">${esc(label)}</button>` : ""}`;
    bidiFix(t); t.classList.add("show"); clearTimeout(toastTimer);
    if (label) $("#toastBtn").onclick = () => { fn(); t.classList.remove("show"); };
    toastTimer = setTimeout(() => t.classList.remove("show"), label ? 6000 : 2400);
  }

  /* ───────────────────────── render + routing ───────────────────────── */
  const NAV = [["", "nav.today", "home"], ["roadmap", "nav.route", "route"], ["academy", "nav.academy", "book"], ["projects", "nav.projects", "folder"], ["certs", "nav.certs", "award"]];
  const ROUTES = { "": viewHome, roadmap: viewRoadmap, stage: viewStage, academy: viewAcademy, projects: viewProjects, project: viewProject, certs: viewCerts, settings: viewSettings };
  const TITLES = { "": "title.today", roadmap: "title.roadmap", stage: "title.stage", academy: "title.academy", projects: "title.projects", project: "title.project", certs: "title.certs", settings: "title.settings" };
  const parse = () => { const h = location.hash.replace(/^#\/?/, ""); const [name, arg] = h.split("/"); return { name: name || "", arg: arg || "" }; };
  const navBase = (n) => (n === "stage" ? "roadmap" : n === "project" ? "projects" : n);

  function renderNav(active) {
    const items = NAV.map(([r, key, ic]) => `<a href="#/${r}" class="ni${navBase(active) === r ? " on" : ""}"${navBase(active) === r ? ' aria-current="page"' : ""}>${icon(ic, 22)}<span>${t(key)}</span></a>`).join("");
    $("#tabs").innerHTML = items;
    const cur = currentStage(); const sk = streakInfo();
    $("#sidenav").innerHTML = items;
    $("#sidefoot").innerHTML = `${sk.streak ? `<div class="sstreak">${icon("flame", 16)} ${t("nav.streak", { n: plural(sk.streak, "day") })}</div>` : ""}<div class="sprogress"><span>${t("nav.routeProgress")}</span><strong>${pct(overall())}%</strong></div>${bar(overall())}${cur ? `<a class="shere" href="#/stage/${cur.id}">${icon("pin", 15)} ${esc(stageShort(cur))}</a>` : ""}${langSwitch("seg3 compact")}<a class="ni set${active === "settings" ? " on" : ""}" href="#/settings">${icon("sliders", 20)}<span>${t("nav.settings")}</span></a>`;
  }

  function render(keep) {
    const { name, arg } = parse();
    const fn = ROUTES[name] || viewHome;
    const y = window.scrollY; const fk = document.activeElement && document.activeElement.dataset && document.activeElement.dataset.fk;
    const view = $("#view");
    view.innerHTML = fn(arg);
    renderNav(ROUTES[name] ? name : "");
    bidiFix(view); bidiFix($("#tabs")); bidiFix($("#sidefoot"));
    applyTheme();
    document.title = t(TITLES[name] || "title.today") + " · Tracepath";
    if (keep) { window.scrollTo(0, y); if (fk) { const el = view.querySelector('[data-fk="' + fk.replace(/"/g, '\\"') + '"]'); if (el) el.focus({ preventScroll: true }); } }
    else { window.scrollTo(0, 0); view.focus({ preventScroll: true }); }
    $$(".greet").forEach((g) => { g.textContent = S.name ? t("shell.greet", { name: S.name }) : ""; });
  }

  /* Direction and language live on <html>, so CSS and the browser both follow. */
  function applyLang() {
    const root = document.documentElement;
    root.lang = L;
    root.dir = isRTL(L) ? "rtl" : "ltr";
    const set = (sel, key) => { const el = $(sel); if (el) el.textContent = t(key); };
    set(".skip", "shell.skip");
    set("#offline", "shell.offline");
    const brandLabels = $$(".brand"); brandLabels.forEach((b) => b.setAttribute("aria-label", t("shell.home")));
    const ts = $(".topset"); if (ts) ts.setAttribute("aria-label", t("nav.settings"));
    const other = LANGS[(LANGS.indexOf(L) + 1) % LANGS.length]; const tl = $("#topLang");
    if (tl) { tl.textContent = I18N.ui[other]["lang.name"]; tl.lang = other; tl.setAttribute("aria-label", t("lang.switchTo", { name: I18N.ui[other]["lang.name"] })); }
    $$("nav[aria-label]").forEach((n) => { if (n.id === "tabs" || n.id === "sidenav") n.setAttribute("aria-label", t("nav.primary")); });
  }
  const langSwitch = (cls) => `<div class="${cls} langsw" role="group" aria-label="${t("lang.switch")}">${LANGS.map((x) => `<button class="${L === x ? "on" : ""}" data-a="ui-lang" data-v="${x}" aria-pressed="${L === x}" lang="${x}">${I18N.ui[x]["lang.name"]}</button>`).join("")}</div>`;

  function applyTheme() {
    const root = document.documentElement;
    if (S.theme === "auto") root.removeAttribute("data-theme"); else root.setAttribute("data-theme", S.theme);
    const dark = S.theme === "dark" || (S.theme === "auto" && matchMedia("(prefers-color-scheme: dark)").matches);
    const m = document.querySelector('meta[name="theme-color"][data-dyn]'); if (m) m.setAttribute("content", dark ? "#0A1524" : "#EDF1F5");
  }

  /* ───────────────────────── actions ───────────────────────── */
  let deferredInstall = null;
  const A = {
    topic(el) { const id = el.dataset.id; if (S.topics[id]) delete S.topics[id]; else { S.topics[id] = 1; touch(); } save(); render(true); },
    lab(el) { const id = el.dataset.id; if (S.labs[id]) delete S.labs[id]; else { S.labs[id] = 1; touch(); } save(); render(true); },
    flow(el) { const id = el.dataset.id; if (S.flow[id]) delete S.flow[id]; else { S.flow[id] = 1; touch(); } save(); render(true); },
    "topic-res"(el) { const id = el.dataset.id; if (openTopics.has(id)) openTopics.delete(id); else openTopics.add(id); render(true); },
    "proj-steps"(el) { projToggle(el, "steps"); },
    "proj-checks"(el) { projToggle(el, "checks"); },
    "res-open"(el) { openResSheet(el.dataset.id); },
    "res-done"(el) { const id = el.dataset.id; const r = (S.res[id] = S.res[id] || {}); r.done = !r.done; if (r.done) touch(); save(); if (el.dataset.sheet) openResSheet(id); render(true); },
    "res-bm"(el) { const id = el.dataset.id; const r = (S.res[id] = S.res[id] || {}); r.bookmark = !r.bookmark; save(); if (el.dataset.sheet) openResSheet(id); render(true); },
    "res-rate"(el) { const id = el.dataset.id; const r = (S.res[id] = S.res[id] || {}); r.rating = +el.dataset.v === r.rating ? 0 : +el.dataset.v; save(); openResSheet(id); render(true); },
    "res-new"() { openResForm(null); },
    "res-edit"(el) { openResForm(el.dataset.id); },
    "res-reset"(el) { delete S.edits[el.dataset.id]; save(); closeSheet(); toast(t("toast.restoredOriginal")); render(true); },
    "res-remove"(el) {
      const id = el.dataset.id; const r = resById(id);
      confirmSheet(t("ask.removeRes"), t(r._custom ? "ask.removeResBodyCustom" : "ask.removeResBody", { name: esc(resName(r)) }), t("common.remove"), () => {
        if (r._custom) { const gone = S.custom.find((c) => c.id === id); S.custom = S.custom.filter((c) => c.id !== id); save(); render(true); toast(t("toast.resDeleted"), t("common.undo"), () => { S.custom.push(gone); save(); render(true); }); }
        else { S.res[id] = Object.assign(S.res[id] || {}, { hidden: true }); save(); render(true); toast(t("toast.resRemoved"), t("common.undo"), () => { S.res[id].hidden = false; save(); render(true); }); }
      });
    },
    "res-restore-all"() { Object.keys(S.res).forEach((k) => { if (S.res[k].hidden) S.res[k].hidden = false; }); save(); render(true); toast(t("toast.resRestored")); render(true); },
    "confirm-yes"() { const f = confirmFn; confirmFn = null; closeSheet(); if (f) f(); },
    "close-sheet"() { closeSheet(); },
    filter(el) {
      const g = el.dataset.g, v = el.dataset.v;
      if (g === "stage" || g === "lang") F[g] = v; else if (g === "saved" || g === "hideDone") F[g] = !F[g];
      else { const set = F[g]; if (set.has(v)) set.delete(v); else set.add(v); }
      F.limit = 12; render(true);
    },
    sort(el) { F.sort = el.value; render(true); },
    more() { F.limit += 12; render(true); },
    "clear-filters"() { F.stage = "all"; F.lang = "all"; F.cost = new Set(); F.types = new Set(); F.levels = new Set(); F.saved = false; F.hideDone = false; F.q = ""; F.limit = 12; render(true); },
    quick(el) { const k = el.dataset.v; const was = quickOn(k); A["clear-filters"](); if (!was) QUICK[k].set(); render(true); },
    "go-academy"(el) { A["clear-filters"](); F.stage = el.dataset.id; if (el.dataset.lang) F.lang = el.dataset.lang; location.hash = "#/academy"; },
    "pref-lang"(el) { S.prefLang = el.dataset.v; save(); render(true); },
    "ui-lang"(el) { setLang(el.dataset.v); },
    "ui-lang-toggle"() { setLang(LANGS[(LANGS.indexOf(L) + 1) % LANGS.length]); },
    "first-lang"(el) { setLang(el.dataset.v); closeSheet(); },
    "cert-status"(el) { const id = el.dataset.id; const c = (S.certs[id] = S.certs[id] || {}); c.status = el.dataset.v; if (c.status === "passed") touch(); save(); render(true); },
    theme(el) { S.theme = el.dataset.v; save(); render(true); },
    export() {
      const blob = new Blob([JSON.stringify({ app: "tracepath", version: APP_VERSION, exportedAt: new Date().toISOString(), data: S }, null, 2)], { type: "application/json" });
      const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "tracepath-backup-" + dayKey() + ".json"; document.body.appendChild(a); a.click(); a.remove(); setTimeout(() => URL.revokeObjectURL(a.href), 2000);
      toast(t("toast.backup"));
    },
    demo() { confirmSheet(t("ask.demo"), t("ask.demoBody"), t("ask.demoOk"), loadDemo); },
    reset() { confirmSheet(t("ask.reset"), t("ask.resetBody"), t("ask.resetOk"), () => { const keep = { uiLang: S.uiLang, theme: S.theme, prefLang: S.prefLang }; S = Object.assign(blank(), keep); save(); resCache = null; toast(t("toast.reset")); render(false); }); },
    install() { if (!deferredInstall) return; deferredInstall.prompt(); deferredInstall.userChoice.finally(() => { deferredInstall = null; render(true); }); },
  };
  function projToggle(el, kind) {
    const [pid, i] = el.dataset.id.split(":"); const st = (S.projects[pid] = S.projects[pid] || { steps: {}, checks: {}, notes: "" });
    st[kind] = st[kind] || {};
    if (st[kind][i]) delete st[kind][i]; else { st[kind][i] = 1; touch(); }
    save(); render(true);
  }

  function loadDemo() {
    const keep = { uiLang: S.uiLang, theme: S.theme, prefLang: S.prefLang, name: S.name };
    S = Object.assign(blank(), keep);
    const mark = (s, nT, nL) => { s.topics.slice(0, nT).forEach((t) => { if (!t.link) S.topics[t.id] = 1; }); s.labs.slice(0, nL).forEach((l) => { S.labs[l.id] = 1; }); };
    mark(STAGES[0], 99, 99); mark(STAGES[1], 5, 2); mark(STAGES[2], 3, 1);
    S.flow["s1:practice"] = 1; S.flow["s1:review"] = 1; S.flow["s1:project"] = 1; S.flow["s2:practice"] = 1;
    const p1 = PROJECTS[0]; S.projects.p1 = { steps: { 0: 1, 1: 1, 2: 1, 3: 1, 4: 1 }, checks: {}, notes: "Using Packet Tracer first, then rebuild in GNS3." };
    S.certs.ccna = { status: "studying" };
    S.res.skillsforall = { done: true, rating: 5 }; S.res.jeremy = { bookmark: true }; S.res.packettracer = { done: true, bookmark: true, rating: 5 };
    for (let i = 0; i < 4; i++) { const d = new Date(); d.setDate(d.getDate() - i); S.activity[dayKey(d)] = 2 + i; }
    void p1; save(); closeSheet(); toast(t("toast.sample")); render(false);
  }

  /* ───────────────────────── events ───────────────────────── */
  document.addEventListener("click", (e) => {
    const el = e.target.closest("[data-a]");
    if (el && A[el.dataset.a]) {
      if (el.tagName === "A" && el.dataset.a === "close-sheet") { closeSheet(); return; }
      if (el.tagName === "SELECT") return;
      e.preventDefault(); A[el.dataset.a](el, e);
    }
  });
  document.addEventListener("change", (e) => {
    const el = e.target;
    if (el.matches("select[data-a]") && A[el.dataset.a]) A[el.dataset.a](el);
    else if (el.dataset.a === "cert-date") { const c = (S.certs[el.dataset.id] = S.certs[el.dataset.id] || { status: "todo" }); c.date = el.value; save(); }
    else if (el.id === "imp" && el.files[0]) importFile(el.files[0]);
  });
  document.addEventListener("input", (e) => {
    const el = e.target;
    if (el.id === "q") { F.q = el.value; F.limit = 12; const l = $("#rlist"); if (l) { l.innerHTML = academyList(); bidiFix(l); } }
    else if (el.id === "nm") { S.name = el.value.trim(); save(); $$(".greet").forEach((g) => { g.textContent = S.name ? t("shell.greet", { name: S.name }) : ""; }); }
    else if (el.dataset.note) { const st = (S.projects[el.dataset.note] = S.projects[el.dataset.note] || { steps: {}, checks: {}, notes: "" }); st.notes = el.value; clearTimeout(noteT); noteT = setTimeout(save, 300); }
  });
  let noteT = 0;
  document.addEventListener("submit", (e) => { if (e.target.id === "resForm") { e.preventDefault(); saveResForm(e.target); } });
  document.addEventListener("click", (e) => { if (e.target === sheet()) closeSheet(); });
  window.addEventListener("hashchange", () => { closeSheet(); render(false); });

  function importFile(file) {
    const rd = new FileReader();
    rd.onload = () => {
      try {
        const o = JSON.parse(rd.result); const d = o && o.app === "tracepath" ? o.data : null;
        if (!d || typeof d !== "object") throw new Error("bad");
        confirmSheet(t("ask.import"), t("ask.importBody"), t("ask.importOk"), () => { S = Object.assign(blank(), d); if (!S.uiLang) S.uiLang = L; save(); setLang(S.uiLang); toast(t("toast.imported")); });
      } catch (err) { toast(t("toast.badFile")); }
    };
    rd.readAsText(file);
  }

  /* ───────────────────────── PWA ───────────────────────── */
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; render(true); });
  window.addEventListener("appinstalled", () => { deferredInstall = null; toast(t("toast.installed")); render(true); });
  function netState() { const b = $("#offline"); if (b) b.hidden = navigator.onLine; }
  window.addEventListener("online", netState); window.addEventListener("offline", netState);
  matchMedia("(prefers-color-scheme: dark)").addEventListener && matchMedia("(prefers-color-scheme: dark)").addEventListener("change", applyTheme);

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").then((reg) => {
        reg.addEventListener("updatefound", () => {
          const nw = reg.installing;
          nw && nw.addEventListener("statechange", () => {
            if (nw.state === "installed" && navigator.serviceWorker.controller) toast(t("toast.update"), t("toast.reload"), () => { nw.postMessage("SKIP_WAITING"); });
          });
        });
      }).catch(() => { /* offline support is optional */ });
      let reloaded = false;
      const hadController = !!navigator.serviceWorker.controller; // first install must not reload the page
      navigator.serviceWorker.addEventListener("controllerchange", () => { if (hadController && !reloaded) { reloaded = true; location.reload(); } });
    });
  }

  /* ───────────────────────── language, first launch, boot ───────────────────────── */
  function setLang(next) {
    if (LANGS.indexOf(next) < 0) return;
    L = next; S.uiLang = next; save();
    applyLang(); render(true);
  }
  // Which language of resource leads: what the user picked, else the interface language.
  function resBias() { return S.prefLang === "ar" || S.prefLang === "en" ? S.prefLang : L; }

  function askLanguage() {
    const suggested = detectLang(); const dirOf = (x) => (isRTL(x) ? "rtl" : "ltr");
    const each = (fn) => LANGS.map(fn).join("");
    openSheet(`<div class="sheet-h"><h2>${LANGS.map((x) => `<span lang="${x}" dir="${dirOf(x)}">${I18N.ui[x]["first.title"]}</span>`).join(" / ")}</h2></div>
      <p class="firstp">${each((x) => `<span lang="${x}" dir="${dirOf(x)}">${I18N.ui[x]["first.body"]}</span>`)}</p>
      <div class="firstpick">${each((x) => `<button class="btn${x === suggested ? "" : " ghost"} big" data-a="first-lang" data-v="${x}" lang="${x}" dir="${dirOf(x)}">${I18N.ui[x]["lang.name"]}${x === suggested ? `<span class="sug">${I18N.ui[x]["first.suggested"]}</span>` : ""}</button>`)}</div>`, "first");
  }

  L = LANGS.indexOf(S.uiLang) >= 0 ? S.uiLang : detectLang();
  applyLang();
  applyTheme();
  netState();
  render(false);
  if (!S.uiLang) askLanguage();
  window.__tp = { S: () => S, render, stageProgress, readiness, overall };
})();
