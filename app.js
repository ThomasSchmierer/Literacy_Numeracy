/* TGS Literacy and Numeracy Framework - single-page app (no build step, no dependencies). */
(function () {
  "use strict";

  var C = window.CONTENT;
  var W = window.WORKBOOK;
  var main = document.getElementById("main");
  var YEARS = ["P", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
  var STAGE_YEARS = { foundational: ["P", "1", "2"], developing: ["3", "4", "5", "6"], consolidating: ["7", "8", "9"], extending: ["10"] };
  var SHORT = { sl: "Speaking & Listening", reading: "Reading", writing: "Writing", na: "Number & Algebra", mg: "Measurement & Geometry", sp: "Statistics & Probability" };
  var TINY = { sl: "S&L", reading: "Read", writing: "Write", na: "N&A", mg: "M&G", sp: "S&P" };
  var lastPath = null;

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function md(s) {
    return esc(s)
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^\w*])\*(?!\s)(.+?)\*(?!\w)/g, "$1<em>$2</em>");
  }
  function stage(id) { for (var i = 0; i < C.stages.length; i++) if (C.stages[i].id === id) return C.stages[i]; return null; }
  function domain(A, id) { for (var i = 0; i < A.domains.length; i++) if (A.domains[i].id === id) return A.domains[i]; return null; }
  function subject(id) { for (var i = 0; i < C.subjects.length; i++) if (C.subjects[i].id === id) return C.subjects[i]; return null; }
  function yearLabel(y) { return y === "P" ? "Prep" : "Yr " + y; }
  function isNone(v) { return !v || /^—/.test(v); }
  function targetHref(areaId, s, d, tab) { return "#/" + areaId + "/" + s + "/" + d + (tab ? "?tab=" + tab : ""); }
  function wbRow(areaId, sub) {
    var rows = W.grids[areaId].rows;
    for (var i = 0; i < rows.length; i++) if (rows[i].sub.toLowerCase() === sub.toLowerCase()) return rows[i];
    return null;
  }
  function stageCell(s, extra) {
    return '<td class="stage-cell stage-' + s.id + '"><span class="s-name">' + esc(s.name) + '</span><span class="s-years">' + esc(s.years) + "</span>" + (extra || "") + "</td>";
  }
  function setNav(key) {
    var links = document.querySelectorAll(".site-nav a");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === key) links[i].setAttribute("aria-current", "page");
      else links[i].removeAttribute("aria-current");
    }
  }
  /* ---------- secondary navigation ---------- */
  // Each section's in-page and sub-page links. Items: {t: label, h: href, on: function(ctx) -> active?}
  // or {sep: "Group label"}. ctx = {path, q, anchor} for the current route.
  function subnavItems(key) {
    if (key === "literacy" || key === "numeracy") {
      var A = C[key], base = "#/" + key;
      var view = function (v, label) {
        return { t: label, h: base + "?view=" + v + "#grid", on: function (c) { return c.path === key && (c.q.get("view") || "targets") === v && (!c.anchor || c.anchor === "grid"); } };
      };
      return [{ t: "About", h: base + "#about" }, { t: "Domains", h: base + "#domains" }, { sep: "Stage targets" }, view("targets", "Targets"), view("focus", "Stage focus"), view("posters", "Staff guides"),
        { sep: "" }, { t: "How " + A.lead + " teaches it", h: base + "#teach" }, { t: "Across subjects", h: base + "#across" },
        { sep: "In your subject" }].concat(SUBJECT_PAGES.filter(function (sp) { return !(sp.kind === "lead" && sp.area !== key); }).map(function (sp) {
          return { t: sp.name, h: "#/subject/" + sp.id + (sp.kind === "subject" ? "#" + key : "") };
        }));
    }
    if (key === "subjects") {
      return [{ t: "All subjects", h: "#/subjects", on: function (c) { return c.path === "subjects"; } }, { sep: "Lead" }].concat(
        SUBJECT_PAGES.map(function (sp, i) {
          var it = { t: sp.name, h: "#/subject/" + sp.id, on: function (c) { return c.path === "subject/" + sp.id; } };
          return i === 3 ? [{ sep: "Subjects" }, it] : [it];
        }).reduce(function (a, b) { return a.concat(b); }, []));
    }
    if (key === "resources") {
      var post = function (s, label) { return { t: label, h: "#/posters?set=" + s, on: function (c) { return c.path === "posters" && (c.q.get("set") || "classroom") === s || (s !== "staff" && /^poster\/classroom\//.test(c.path) && (s === "subject") === !!(posterById(c.path.split("/")[2]) || {}).subject) || (s === "staff" && /^poster\/staff\//.test(c.path)); } }; };
      return [
        { t: "Shared routines", h: "#/resources#routines", on: function (c) { return (c.path === "resources" && c.anchor === "routines") || /^routine\//.test(c.path); } },
        { t: "Routines by target", h: "#/resources#by-target" },
        { t: "Teaching moves", h: "#/resources#moves", on: function (c) { return (c.path === "resources" && c.anchor === "moves") || /^move\//.test(c.path); } },
        { sep: "Posters" }, post("classroom", "Classroom posters"), post("subject", "Subject examples"), post("staff", "Staff guides")
      ];
    }
    if (key === "framework") {
      var fw = function (id, label) { return { t: label, h: "#/framework#" + id }; };
      return [fw("layers", "Three layers"), fw("stages", "Four stages"), fw("areas", "Literacy and numeracy"), fw("why", "Why whole-school"), fw("documents", "How the pieces fit"),
        { sep: "" }, { t: "Progressions", h: "#/progressions", on: function (c) { return c.path === "progressions"; } },
        { sep: "" }, fw("tier2", "Tier 2 referral"), fw("data-tracking", "Data tracking"), fw("roles", "Roles"), fw("next-steps", "Next steps"), fw("questions", "Questions")];
    }
    return null;
  }
  function currentCtx() {
    var raw = location.hash.replace(/^#\/?/, ""), anchor = null, hi = raw.indexOf("#");
    if (hi >= 0) { anchor = raw.slice(hi + 1); raw = raw.slice(0, hi); }
    var qi = raw.indexOf("?");
    return { path: qi >= 0 ? raw.slice(0, qi) : raw, q: new URLSearchParams(qi >= 0 ? raw.slice(qi + 1) : ""), anchor: anchor };
  }
  var SECTION_NAMES = { literacy: "Literacy", numeracy: "Numeracy", subjects: "Subjects", resources: "Resources", framework: "Framework" };
  function subnav(key) {
    var items = subnavItems(key);
    if (!items) return "";
    var c = currentCtx();
    var h = '<nav class="subnav" aria-label="' + esc(SECTION_NAMES[key]) + ' sections"><div class="wrap subnav-inner"><a class="sn-title" href="' + (key === "subjects" ? "#/subjects" : "#/" + key) + '">' + esc(SECTION_NAMES[key]) + "</a>";
    items.forEach(function (it) {
      if (it.sep !== undefined) { h += '<span class="sn-sep">' + esc(it.sep) + "</span>"; return; }
      var active = it.on ? it.on(c) : (c.anchor && it.h.split("#")[2] === c.anchor && it.h.indexOf("#/" + c.path) === 0);
      h += '<a href="' + it.h + '"' + (active ? ' aria-current="true" class="on"' : "") + ">" + esc(it.t) + "</a>";
    });
    return h + "</div></nav>";
  }
  function setHeaderHeight() {
    var hdr = document.querySelector(".site-header");
    if (hdr) document.documentElement.style.setProperty("--hdr-h", hdr.offsetHeight + "px");
  }
  window.addEventListener("resize", setHeaderHeight);
  function stickyOffset() {
    var hdr = document.querySelector(".site-header"), sn = main.querySelector(".subnav");
    return (hdr ? hdr.offsetHeight : 0) + (sn ? sn.offsetHeight : 0) + 12;
  }

  function page(navKey, title, html) {
    setNav(navKey);
    html = subnav(navKey) + html;
    document.title = title + " — TGS Literacy and Numeracy";
    main.innerHTML = html;
    setHeaderHeight();
    var on = main.querySelector(".subnav a.on");
    if (on) {
      var inner = on.parentNode, right = on.offsetLeft + on.offsetWidth - inner.offsetLeft;
      if (right > inner.clientWidth) inner.scrollLeft = right - inner.clientWidth + 40;   // only scroll when the active item would be hidden
    }
  }

  /* ---------- home (landing page and site map) ---------- */
  // Site-map groups for one section, as labelled columns. Built from subnavItems() so they match the section bars.
  function sitemapGroups(key) {
    var items = subnavItems(key) || [], groups = [], cur = { label: "Sections", links: [] };
    items.forEach(function (it) {
      if (it.sep !== undefined) {
        if (cur.links.length) groups.push(cur);
        cur = { label: it.sep || "More", links: [] };
        return;
      }
      cur.links.push(it);
    });
    if (cur.links.length) groups.push(cur);
    return groups.map(function (g) {
      return '<div class="sm-group"><h3>' + esc(g.label) + "</h3><ul>" + g.links.map(function (it) { return '<li><a href="' + it.h + '">' + esc(it.t) + "</a></li>"; }).join("") + "</ul></div>";
    }).join("");
  }
  function miniTargets(a) {
    var A = C[a];
    var h = '<div class="sm-group sm-group-wide"><h3>Every target</h3><div class="sm-targets"><span></span>' + A.domains.map(function (d) { return '<span class="h">' + esc(d.name) + "</span>"; }).join("");
    C.stages.forEach(function (s) {
      h += '<span class="s stage-' + s.id + '">' + esc(s.name) + "</span>";
      A.domains.forEach(function (d) { h += '<a href="' + targetHref(a, s.id, d.id) + '" title="' + esc(s.name + " · " + d.name) + '">' + esc(s.years) + "</a>"; });
    });
    return h + "</div></div>";
  }
  function domainStrip(A) {
    return '<div class="dom-strip">' + A.domains.map(function (d) {
      return '<a class="dom-card" href="#/' + A.id + '#domains">' + icon(DOMAIN_ICON[d.id], 30) + "<b>" + esc(d.name) + "</b><span>" + esc(d.plain) + "</span></a>";
    }).join("") + "</div>";
  }
  function renderHome() {
    var o = C.overview;
    var count = function (obj) { return Object.keys(obj).length; };
    var targets = 0;
    ["literacy", "numeracy"].forEach(function (a) { targets += C.stages.length * C[a].domains.length; });

    // 1. The start
    var h = '<section class="hero"><div class="wrap">' +
      '<div class="kicker">' + esc(C.meta.school) + " · " + esc(C.meta.status) + "</div>" +
      "<h1>Literacy and Numeracy Framework</h1>" +
      '<p class="lead">What every student should be able to do at each stage from Prep to Year 12, how English and Mathematics teach it, and what every other subject does, with the routines, posters and curriculum links behind it.</p>' +
      '<div class="actions"><a class="btn btn-light" href="#find">Find your way</a><a class="btn btn-ghost" href="#/subjects">Go to your subject</a><a class="btn btn-ghost" href="#/framework">About the Framework</a></div>' +
      "</div></section>";

    // 2. Rationale
    h += '<section class="section home-rationale" id="rationale"><div class="wrap">' +
      '<div class="kicker-dark">Why this Framework</div>' +
      '<p class="rationale-statement">' + md(o.rationale) + "</p>" +
      '<div class="grid-3 principles">' + o.principles.map(function (p, i) {
        return '<div class="card principle"><span class="pr-num">' + (i + 1) + "</span><h3>" + esc(p.t) + "</h3><p>" + md(p.d) + "</p></div>";
      }).join("") + "</div>" +
      '<div class="stat-strip">' + [
        ["13", "year levels, Prep to Year 12"], [String(C.stages.length), "developmental stages"], ["6", "domains: 3 literacy, 3 numeracy"],
        [String(targets), "stage targets"], [String(count(C.routines)), "shared routines"], [String(C.moves.length), "teaching moves"]
      ].map(function (s) { return '<div class="stat"><b>' + s[0] + "</b><span>" + esc(s[1]) + "</span></div>"; }).join("") + "</div>" +
      "</div></section>";

    // 3. From the Statement and Framework
    h += '<section class="section" id="develops"><div class="wrap"><h2>How this develops, Prep to Year 12</h2>' +
      '<p class="section-intro">' + md(o.intention) + '</p><div class="stage-band">' +
      C.stages.map(function (s) { return '<div class="stage-card stage-' + s.id + '"><div class="s-name">' + esc(s.name) + '</div><div class="s-years">' + esc(s.long) + "</div><p>" + esc(s.plain) + "</p></div>"; }).join("") +
      "</div></div></section>";

    ["literacy", "numeracy"].forEach(function (a) {
      var A = C[a];
      h += '<section class="section home-area" id="home-' + a + '"><div class="wrap"><div class="card area-block">' +
        '<div class="area-head"><h2>' + esc(A.name) + '</h2><a class="btn btn-outline" href="#/' + a + '">Explore ' + esc(A.name.toLowerCase()) + " →</a></div>" +
        '<p class="area-statement">' + md(a === "literacy" ? o.statementLiteracy : o.statementNumeracy) + "</p>" +
        '<p class="area-def"><span>Framework definition</span>' + md(A.definition) + "</p>" +
        domainStrip(A) +
        '<p class="area-goal"><span>Our goal</span>' + md(a === "literacy" ? o.literacyGoal : o.numeracyGoal) + "</p>" +
        "</div></div></section>";
    });

    h += '<section class="section"><div class="wrap"><blockquote class="home-goal"><span>Our goal</span>' + md(o.goal) + "</blockquote></div></section>";

    // 4. Find your way
    h += '<section class="section home-nav" id="find"><div class="wrap"><h2>Find your way</h2>' +
      '<div class="find-grid">' +
        '<form class="card home-find" id="find-target" aria-label="Find a target"><h3>Go straight to a target</h3>' +
          '<div class="find-fields"><label>Area<select name="area"><option value="literacy">Literacy</option><option value="numeracy">Numeracy</option></select></label>' +
          '<label>Stage<select name="stage">' + C.stages.map(function (s) { return '<option value="' + s.id + '">' + esc(s.name + " (" + s.years + ")") + "</option>"; }).join("") + "</select></label>" +
          '<label>Domain<select name="domain"></select></label></div>' +
          '<button class="btn btn-solid" type="submit">Open the target</button></form>' +
        '<div class="card"><h3>Start from your subject</h3><p class="small muted" style="margin:0 0 8px">Everything for your subject on one page: literacy and numeracy strategies for every stage, the routines and your posters.</p>' +
          '<div class="home-subjects">' + SUBJECT_PAGES.map(function (sp) { return '<a href="#/subject/' + sp.id + '">' + esc(sp.name) + "</a>"; }).join("") + "</div>" +
        "</div>" +
      "</div>" +
      '<div class="quick-links">' + [
        ["#/literacy", "Literacy"], ["#/numeracy", "Numeracy"], ["#/subjects", "Subjects"], ["#/resources", "Resources"],
        ["#/framework", "Framework"], ["#/posters?set=classroom", "Posters"], ["#/resources#routines", "Shared routines"], ["#/progressions", "Progressions"]
      ].map(function (l) { return '<a class="quick" href="' + l[0] + '">' + esc(l[1]) + "</a>"; }).join("") + "</div>" +
      "</div></section>";

    // 5. Everything on this site: full-width tiles, one per section, stacked
    var tileRow = function (key, title, href, desc, extra) {
      return '<div class="card sm-row"><div class="sm-intro"><h2><a href="' + href + '">' + esc(title) + '</a></h2><p>' + esc(desc) + '</p><a class="btn btn-outline" href="' + href + '">Open ' + esc(title) + " →</a></div>" +
        '<div class="sm-links">' + sitemapGroups(key) + (extra || "") + "</div></div>";
    };
    h += '<section class="section" id="sitemap"><div class="wrap"><h2>Everything on this site</h2><p class="section-intro">Every section and its parts. The same links appear in the bar under the header on each section’s pages.</p><div class="sitemap-rows">' +
      tileRow("literacy", "Literacy", "#/literacy", "Information: what literacy is, its three domains, the target for every stage, and how English teaches it.", miniTargets("literacy")) +
      tileRow("numeracy", "Numeracy", "#/numeracy", "Information: what numeracy is, its three domains, the target for every stage, and how Mathematics teaches it.", miniTargets("numeracy")) +
      tileRow("subjects", "Subjects", "#/subjects", "Strategies: one page per subject with its literacy and numeracy strategies for every stage, the routines to use and its posters.") +
      tileRow("resources", "Resources", "#/resources", "Shared tools: the routines, teaching moves and posters every subject uses.",
        '<div class="sm-group"><h3>Teaching moves</h3><ul>' + C.moves.map(function (m) { return '<li><a href="#/move/' + m.id + '">' + esc(m.name) + "</a></li>"; }).join("") + "</ul></div>") +
      tileRow("framework", "Framework", "#/framework", "About the Framework: the stages, progressions, Tier 2 referral, data tracking, roles, next steps and review questions.") +
      "</div></div></section>";

    page("home", "Home", h);

    var f = document.getElementById("find-target");
    var fillDomains = function () {
      var A = C[f.area.value], cur = f.domain.value;
      f.domain.innerHTML = A.domains.map(function (d) { return '<option value="' + d.id + '">' + esc(d.name) + "</option>"; }).join("");
      if (domain(A, cur)) f.domain.value = cur;
    };
    fillDomains();
    f.area.addEventListener("change", fillDomains);
    f.addEventListener("submit", function (e) { e.preventDefault(); location.hash = targetHref(f.area.value, f.stage.value, f.domain.value); });
    var jumps = main.querySelectorAll('a[href="#find"]');
    for (var i = 0; i < jumps.length; i++) jumps[i].addEventListener("click", function (e) { e.preventDefault(); scrollToId("find"); });
  }

  /* ---------- framework (about the framework itself) ---------- */
  function renderFramework() {
    var o = C.overview, I = C.implementation;
    var h = '<section class="hero"><div class="wrap">' +
      '<div class="kicker">The Framework · ' + esc(C.meta.status) + "</div>" +
      "<h1>About the Framework</h1>" +
      '<p class="lead">' + md(o.intention) + "</p>" +
      '<div class="actions"><a class="btn btn-light" href="#/literacy">Literacy</a><a class="btn btn-light" href="#/numeracy">Numeracy</a><a class="btn btn-ghost" href="#/subjects">Your subject</a><a class="btn btn-ghost" href="#/resources">Resources</a></div>' +
      "</div></section>";

    h += '<section class="section" id="layers"><div class="wrap"><h2>Three layers for every target</h2><div class="grid-3 layers">' +
      '<div class="card layer"><h3>Target</h3><p class="small" style="margin:0">What a student can do by the end of the stage. One per domain per stage, matching Framework Tables 3 and 6. Found under <a href="#/literacy">Literacy</a> and <a href="#/numeracy">Numeracy</a>.</p></div>' +
      '<div class="card layer"><h3>Lead method</h3><p class="small" style="margin:0">How English (literacy) or Mathematics (numeracy) teaches it explicitly. The Junior School class teacher leads P–6. Found under <a href="#/subjects">Subjects</a>.</p></div>' +
      '<div class="card layer"><h3>Subject strategy</h3><p class="small" style="margin:0">What Science, Humanities, Health and PE, and Technologies teachers do, grounded in each subject’s own achievement standard. Found under <a href="#/subjects">Subjects</a>.</p></div>' +
      "</div></div></section>";

    h += '<section class="section" id="stages"><div class="wrap"><h2>Four stages, used everywhere</h2>' +
      '<p class="section-intro">Every target, method and subject strategy is organised by the same four developmental stages, Prep to Year 12.</p><div class="grid-4">';
    C.stages.forEach(function (s) {
      h += '<div class="stage-card stage-' + s.id + '"><div class="s-name">' + esc(s.name) + '</div><div class="s-years">' + esc(s.long) + "</div><p>" + esc(s.plain) + "</p></div>";
    });
    h += "</div></div></section>";

    h += '<section class="section" id="areas"><div class="wrap"><div class="grid-2">';
    ["literacy", "numeracy"].forEach(function (id) {
      var A = C[id];
      h += '<div class="card"><h2>' + esc(A.name) + "</h2>" +
        '<p class="muted small"><strong>Definition.</strong> ' + md(A.definition) + "</p>" +
        "<p>" + md(A.challenge) + "</p>" +
        '<div class="grid-3" style="gap:10px;margin:12px 0">';
      A.domains.forEach(function (d) {
        h += '<div style="border:1px solid var(--line);border-radius:8px;padding:10px"><strong style="font-size:.92rem">' + esc(d.name) + '</strong><div class="small muted">' + esc(d.plain) + "</div></div>";
      });
      h += '</div><a class="btn btn-outline" href="#/' + id + '">' + esc(A.name) + " information →</a></div>";
    });
    h += "</div></div></section>";

    h += '<section class="section" id="why"><div class="wrap"><div class="grid-2">' +
      '<div class="card"><h2>Why a whole-school approach</h2><ul>' + o.why.map(function (w) { return "<li>" + md(w) + "</li>"; }).join("") + "</ul>" +
      '<p class="muted small" style="margin:0">' + md(o.goal) + "</p></div>" +
      '<div class="card"><h2>How to use this site</h2><ol class="steps">' +
      '<li><strong><a href="#/literacy">Literacy</a> and <a href="#/numeracy">Numeracy</a></strong> explain what each is, its domains, and the target for every stage. Click a target for its full classroom guide.</li>' +
      '<li><strong><a href="#/subjects">Subjects</a></strong> gives each teacher one page: English, Mathematics, Junior School, Science, Humanities, Health and PE, and Technologies.</li>' +
      '<li><strong><a href="#/resources">Resources</a></strong> holds the shared routines, teaching moves and posters that every subject uses.</li>' +
      "<li><strong>Framework</strong> (this page) covers the stages, progressions, Tier 2 referral, data tracking, roles and next steps.</li>" +
      "</ol></div></div></div></section>";

    h += '<section class="section" id="documents"><div class="wrap"><h2>How the pieces fit</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Document</th><th>What it contains</th></tr></thead><tbody>';
    o.documents.forEach(function (d) { h += "<tr><td><strong>" + esc(d.name) + "</strong></td><td>" + md(d.what) + "</td></tr>"; });
    h += "</tbody></table></div></div></section>";

    h += '<section class="section" id="progressions-intro"><div class="wrap"><div class="card"><h2>Progressions</h2>' +
      '<p>' + md(C.progressions.what) + " " + md(C.progressions.notCurriculum) + "</p>" +
      '<div class="chips"><a class="chip" href="#/progressions?set=literacy">Literacy sub-elements</a><a class="chip" href="#/progressions?set=numeracy">Numeracy sub-elements</a><a class="chip" href="#/progressions?set=subjects">Subject evidence</a></div></div></div></section>';

    h += '<section class="section" id="tier2"><div class="wrap"><h2>Tier 2 referral points</h2><p class="section-intro">Points where students not yet secure in a constrained skill are referred for Tier 2 support. They are built into the targets and feed the Tier 1–3 intervention plan, which is still to be written.</p>' +
      ["literacy", "numeracy"].map(function (a) {
        var pts = I.tier2.filter(function (t) { return t.area === a; });
        var proposed = pts.some(function (t) { return t.proposed; });
        return "<h3 style=\"margin-top:18px\">" + esc(C[a].name) + (proposed ? ' <span class="pill warn">Proposed</span>' : "") + "</h3>" +
          (proposed ? '<p class="small muted">Each sits where the progressions show a constrained numeracy skill concluding. Thresholds to be agreed with the Mathematics Head of Department and the Diverse Learners team.</p>' : "") +
          '<div class="tier-list">' + pts.map(function (t) { return '<a class="card tier' + (t.proposed ? " proposed" : "") + '" href="' + t.link + '"><b>' + esc(t.when) + "</b><span>" + md(t.what) + "</span></a>"; }).join("") + "</div>";
      }).join("") + "</div></section>";

    h += '<section class="section" id="data-tracking"><div class="wrap"><h2>Data tracking map</h2><p class="section-intro">What evidence tracks student progress against the targets at each stage. NAPLAN falls at the stage boundaries: Year 3 starts Developing, Year 5 is mid-Developing, Year 7 starts Consolidating and Year 9 ends it.</p><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Stage</th><th>Target year</th><th>Standardised evidence</th><th>Teacher-judgement evidence</th><th>To resolve in the data audit</th></tr></thead><tbody>';
    I.measurement.forEach(function (m) {
      h += '<tr><td class="stage-td stage-' + m.stage + '">' + esc(stage(m.stage).name) + "</td><td>" + esc(m.year) + "</td><td>" + md(m.standardised) + "</td><td>" + md(m.teacher) + "</td><td>" + md(m.gaps) + "</td></tr>";
    });
    h += "</tbody></table></div></div></section>";

    h += '<section class="section" id="roles"><div class="wrap"><div class="grid-2"><div class="card"><h2>Roles and accountability</h2><div class="tbl-wrap" style="box-shadow:none"><table class="tbl"><tbody>' +
      I.roles.map(function (r) { return "<tr><td><strong>" + esc(r.role) + "</strong></td><td>" + md(r.resp) + "</td></tr>"; }).join("") +
      '</tbody></table></div><p class="small muted" style="margin:10px 0 0">Role titles are indicative and still to be reconciled with TGS position titles.</p></div>';
    h += '<div class="card" id="next-steps"><h2>Next steps</h2><ul class="next-list">' +
      I.nextSteps.map(function (n) {
        var cls = n.status === "Drafted" ? "ok" : n.status === "Next" ? "next" : "";
        return '<li><span class="pill ' + cls + '">' + esc(n.status) + "</span><div><strong>" + esc(n.t) + '</strong><div class="small muted">' + md(n.d) + "</div></div></li>";
      }).join("") + "</ul></div></div></div></section>";

    h += '<section class="section" id="questions"><div class="wrap"><div class="card"><h2>Questions for review</h2><ol>' +
      I.questions.map(function (x) { return "<li>" + md(x) + "</li>"; }).join("") + "</ol></div></div></section>";

    page("framework", "Framework", h);
  }

  /* ---------- literacy / numeracy: information pages ---------- */
  function areaViews(A) {
    return [
      { id: "targets", label: "Targets" },
      { id: "focus", label: "Stage focus" },
      { id: "posters", label: "Staff guides" }
    ];
  }

  function routineCell(A, sId, dId) {
    var det = A.details[sId + "." + dId] || {};
    return '<div class="cell-routines">' + (det.routines || []).map(function (r) {
      var R = C.routines[r];
      return R ? '<a class="chip sm" href="#/routine/' + r + '">' + esc(R.t) + "</a>" : "";
    }).join("") + '</div><a class="cell-open" href="' + targetHref(A.id, sId, dId) + '">Open guide →</a>';
  }

  function routineGrid(A) {
    var h = '<div class="fw-grid-wrap"><table class="fw-grid"><thead><tr><th>Stage</th>';
    A.domains.forEach(function (d) { h += "<th>" + esc(d.name) + "</th>"; });
    h += "</tr></thead><tbody>";
    C.stages.forEach(function (s) {
      h += "<tr>" + stageCell(s);
      A.domains.forEach(function (d) {
        h += '<td class="routine-td" data-audit="' + esc(A.name + " routines › " + s.name + " › " + d.name) + '">' + routineCell(A, s.id, d.id) + "</td>";
      });
      h += "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  // A stage x domain grid whose cells are links. cellFn(s, d) -> inner HTML, hrefFn(s, d) -> link.
  function linkGrid(A, stages, cellFn, hrefFn, auditLabel) {
    var h = '<div class="fw-grid-wrap"><table class="fw-grid"><thead><tr><th>Stage</th>';
    A.domains.forEach(function (d) { h += "<th>" + esc(d.name) + "</th>"; });
    h += "</tr></thead><tbody>";
    stages.forEach(function (s) {
      h += "<tr>" + stageCell(s, '<span class="s-target">by end of Year ' + esc(s.targetYear) + "</span>");
      A.domains.forEach(function (d) {
        h += '<td data-audit="' + esc(auditLabel + " › " + s.name + " › " + d.name) + '"><a class="cell-link" href="' + hrefFn(s, d) + '">' + cellFn(s, d) + '<span class="go">Open guide →</span></a></td>';
      });
      h += "</tr>";
    });
    return h + "</tbody></table></div>";
  }

  function renderArea(areaId, q) {
    var A = C[areaId], o = C.overview;
    var view = q.get("view") || "targets";
    var tableNo = areaId === "literacy" ? "3" : "6";

    var h = '<section class="hero"><div class="wrap">' +
      '<div class="kicker">' + esc(A.name) + " information</div>" +
      "<h1>" + esc(A.name) + "</h1>" +
      '<p class="lead">' + md(A.plain) + "</p>" +
      '<div class="actions"><a class="btn btn-light" href="#/' + areaId + '?view=targets#grid">Stage targets</a>' +
      '<a class="btn btn-ghost" href="#/' + areaId + '#teach">How ' + esc(A.lead) + " teaches it</a>" +
      '<a class="btn btn-ghost" href="#/subjects">' + esc(A.name) + " in your subject</a></div>" +
      "</div></section>";

    h += '<section class="section" id="about"><div class="wrap"><div class="card area-block"><h2>About ' + esc(A.name.toLowerCase()) + "</h2>" +
      '<p class="area-statement">' + md(areaId === "literacy" ? o.statementLiteracy : o.statementNumeracy) + "</p>" +
      '<p class="area-def"><span>Framework definition</span>' + md(A.definition) + "</p>" +
      '<p class="area-def"><span>The challenge</span>' + md(A.challenge) + "</p>" +
      '<p class="area-goal"><span>Our goal</span>' + md(areaId === "literacy" ? o.literacyGoal : o.numeracyGoal) + "</p></div></div></section>";

    h += '<section class="section" id="domains"><div class="wrap"><h2>Domains</h2><div class="grid-3">';
    A.domains.forEach(function (d) {
      h += '<div class="card domain-card"><h3>' + esc(d.name) + '</h3><p class="plain">' + esc(d.plain) + "</p><p class=\"small\">" + md(d.def) + "</p><ul>" +
        d.parts.map(function (p) { return "<li>" + md(p) + "</li>"; }).join("") + "</ul></div>";
    });
    h += "</div></div></section>";

    h += '<section class="section" id="grid"><div class="wrap"><h2>Stage targets</h2>' +
      '<p class="section-intro">The same layout as Framework Table ' + tableNo + ". <strong>Click any cell</strong> to open its classroom guide. For what each subject does, go to <a href=\"#/subjects\">Subjects</a>.</p>";
    h += '<div class="tabs" role="tablist">' + areaViews(A).map(function (v) {
      return '<a class="tab" role="tab" aria-selected="' + (v.id === view) + '" href="#/' + areaId + "?view=" + v.id + '#grid">' + esc(v.label) + "</a>";
    }).join("") + "</div>";
    var viewHelp = {
      targets: "**Targets** are the measurable outcome: what a student can do by the end of the stage. Each one is built from the stage focus.",
      focus: "**Stage focus** is the Framework's Table " + tableNo + " wording: what teaching concentrates on across the stage. The targets turn each focus into something a student can be seen to do.",
      posters: "**Staff guides** put each target on one page: what it looks like, the routines, the classroom ideas and what every subject does. Click one to open, print or download it."
    };
    if (viewHelp[view]) h += '<p class="view-help">' + md(viewHelp[view]) + "</p>";

    h += '<div class="fw-grid-wrap"><table class="fw-grid"><thead><tr><th>Stage</th>';
    A.domains.forEach(function (d) { h += "<th>" + esc(d.name) + "</th>"; });
    if (view === "targets") h += "<th>How we track it</th>";
    h += "</tr></thead><tbody>";
    C.stages.forEach(function (s) {
      var extra = view === "targets" ? '<span class="s-target">by end of Year ' + esc(s.targetYear) + "</span>" : "";
      h += "<tr>" + stageCell(s, extra);
      A.domains.forEach(function (d) {
        if (view === "posters") {
          h += '<td class="poster-td" data-audit="' + esc(A.name + " grid › Staff guides › " + s.name + " › " + d.name) + '">' + tile(staffHref(areaId, s.id, d.id), staffPoster(A, s, d), "Open the staff guide") + "</td>";
          return;
        }
        var inner = md(view === "focus" ? A.focus[s.id][d.id] : A.targets[s.id][d.id]);
        h += '<td data-audit="' + esc(A.name + " grid › " + (view === "focus" ? "Stage focus" : "Targets") + " › " + s.name + " › " + d.name) + '"><a class="cell-link" href="' + targetHref(areaId, s.id, d.id) + '" aria-label="' + esc(A.name + ", " + d.name + ", " + s.name + " stage: open guide") + '">' + inner + '<span class="go">Open guide →</span></a></td>';
      });
      if (view === "targets") h += '<td class="measure">' + md(A.measure[s.id]) + "</td>";
      h += "</tr>";
    });
    h += "</tbody></table></div>";
    if (view === "targets") h += '<p class="grid-hint"><strong>[audit]</strong> marks evidence that depends on the Year 1 data audit. Extending targets are set at Year 10, where the Australian Curriculum ends; Years 11–12 are not yet mapped to QCE.</p>';
    h += "</div></section>";

    h += '<section class="section" id="teach"><div class="wrap"><h2>How ' + esc(A.lead) + " teaches it</h2>" +
      '<p class="section-intro">' + md(A.leadWho) + " Each cell shows the target and the explicit teaching behind it. The full " + esc(A.lead) + ' page is under <a href="#/subject/' + (areaId === "literacy" ? "english" : "mathematics") + '">Subjects</a>.</p>' +
      linkGrid(A, C.stages, function (s, d) { return '<span class="lnk"><b>Target:</b> ' + md(A.targets[s.id][d.id]) + '</span><span class="strat"><b>' + esc(A.lead) + ":</b> " + md(A.method[s.id][d.id]) + "</span>"; },
        function (s, d) { return targetHref(areaId, s.id, d.id, "method"); }, A.name + " › " + A.lead + " method") +
      '<div class="card" style="margin-top:16px"><h3>What explicit teaching looks like</h3><div class="tbl-wrap" style="box-shadow:none"><table class="tbl"><thead><tr><th>' + (areaId === "literacy" ? "Literacy element" : "Numeracy element") + "</th><th>What explicit teaching looks like</th></tr></thead><tbody>" +
      A.pedagogy.map(function (p) { return "<tr><td><strong>" + esc(p.el) + "</strong></td><td>" + md(p.how) + "</td></tr>"; }).join("") + "</tbody></table></div></div>" +
      "</div></section>";

    h += '<section class="section" id="across"><div class="wrap"><h2>' + esc(A.name) + " across subjects</h2><div class=\"grid-2\">" +
      '<div class="card"><h3>What this means across subjects</h3><div class="tbl-wrap" style="box-shadow:none"><table class="tbl"><tbody>' +
      C.stages.map(function (s) { return '<tr><td class="stage-td stage-' + s.id + '">' + esc(s.name) + "<br><span style=\"font-weight:400\">" + esc(s.years) + "</span></td><td>" + md(A.acrossSubjects[s.id]) + "</td></tr>"; }).join("") +
      "</tbody></table></div></div>" +
      '<div class="card"><h3>' + esc(A.name) + ' in each subject</h3><p class="small muted">Each subject has its own page with its strategies for every stage, the routines to use and its posters.</p><div class="subject-links">' +
      SUBJECT_PAGES.filter(function (sp) { return !(sp.kind === "lead" && sp.area !== areaId); }).map(function (sp) {
        return '<a class="subject-link" href="#/subject/' + sp.id + (sp.kind === "subject" ? "#" + areaId : "") + '"><b>' + esc(sp.name) + "</b><span>" + esc(sp.kind === "lead" ? "Leads " + A.name.toLowerCase() : sp.kind === "junior" ? "P–6 class teachers" : "Strategies by stage") + "</span></a>";
      }).join("") + "</div></div></div></div></section>";

    page(areaId, A.name, h);
    fitPosters();
  }

  /* ---------- subjects: one page per teacher ---------- */
  var SUBJECT_PAGES = [
    { id: "english", name: "English", kind: "lead", area: "literacy", blurb: "Leads literacy: the explicit teaching of speaking and listening, reading and writing." },
    { id: "mathematics", name: "Mathematics", kind: "lead", area: "numeracy", blurb: "Leads numeracy: the explicit teaching of number, measurement, geometry, statistics and probability." },
    { id: "junior", name: "Junior School (P–6)", kind: "junior", blurb: "Class teachers teach literacy and numeracy explicitly through the Foundational and Developing stages." }
  ].concat(C.subjects.map(function (s) {
    return { id: s.id, name: s.name, kind: "subject", note: s.note, blurb: "Literacy and numeracy strategies for every stage, grounded in " + s.name + "’s own achievement standard." };
  }));
  var SUBJECT_WHO = { science: /Science/, humanities: /Humanities|Geography|HASS/, hpe: /Health|HPE/, technologies: /Technolog/ };
  function subjectPage(id) { for (var i = 0; i < SUBJECT_PAGES.length; i++) if (SUBJECT_PAGES[i].id === id) return SUBJECT_PAGES[i]; return null; }
  function routinesFor(sp) {
    return Object.keys(C.routines).filter(function (r) {
      var R = C.routines[r];
      if (sp.kind === "lead") return R.area === sp.area;
      if (sp.kind === "junior") return R.stages.indexOf("foundational") >= 0 || R.stages.indexOf("developing") >= 0;
      return /^All |all subjects|Every subject other than Mathematics/i.test(R.who) || (SUBJECT_WHO[sp.id] && SUBJECT_WHO[sp.id].test(R.who));
    });
  }
  function routineCard(id) {
    var R = C.routines[id], rp = posterById(id);
    return '<a class="card routine-card ' + R.area + (rp ? " has-poster" : "") + '" href="#/routine/' + id + '"><div><h3>' + esc(R.t) + "</h3>" + moveBadges(C.routineMoves[id]) + "<p>" + md(R.what) + '</p><div class="meta">' + stagePills(R.stages) +
      (R.status ? ' <span class="pill warn">' + esc(R.status) + "</span>" : "") + "</div></div>" +
      (rp ? '<div class="rc-thumb">' + frame(classroomPoster(rp), "thumb") + "</div>" : "") + "</a>";
  }
  function routinesSection(sp) {
    var ids = routinesFor(sp);
    return '<section class="section" id="routines"><div class="wrap"><h2>Shared routines to use</h2>' +
      '<p class="section-intro">The whole-school routines that apply to ' + esc(sp.name) + ". Use the same routine and the same words as every other classroom.</p>" +
      ["literacy", "numeracy"].map(function (a) {
        var list = ids.filter(function (r) { return C.routines[r].area === a; });
        return list.length ? "<h3>" + esc(C[a].name) + ' routines</h3><div class="grid-3" style="margin-bottom:18px">' + list.map(routineCard).join("") + "</div>" : "";
      }).join("") + "</div></section>";
  }
  function postersSection(sp) {
    var ids = routinesFor(sp);
    var ex = subjectPosters(function (p) { return p.subjectId === sp.id; });
    var shared = ids.map(posterById).filter(function (p) { return p && !p.subject; });
    if (sp.kind === "lead") shared = sharedPosters().filter(function (p) { return p.area === sp.area; });
    var h = '<section class="section" id="posters"><div class="wrap"><h2>Posters</h2>';
    if (ex.length) h += "<h3>" + esc(sp.name) + ' examples</h3><div class="poster-grid">' + ex.map(subjectTile).join("") + "</div>";
    h += '<h3>Classroom posters for these routines</h3><div class="poster-grid">' + shared.map(function (p) { return tile(classroomHref(p), classroomPoster(p), p.title, "Classroom poster"); }).join("") + "</div>" +
      '<p><a class="btn btn-outline" href="#/posters?set=staff">Staff guides for every target →</a></p></div></section>';
    return h;
  }
  function subjectHero(sp, actions) {
    return '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/subjects">Subjects</a> › ' + esc(sp.name) + "</nav></div>" +
      '<section class="hero" style="margin-top:12px"><div class="wrap"><div class="kicker">Subjects</div><h1>' + esc(sp.name) + '</h1><p class="lead">' + esc(sp.blurb) + '</p><div class="actions">' +
      actions.map(function (a, i) { return '<a class="btn ' + (i ? "btn-ghost" : "btn-light") + '" href="' + a[0] + '">' + esc(a[1]) + "</a>"; }).join("") + "</div></div></section>";
  }

  function renderSubjects() {
    var h = '<section class="hero"><div class="wrap"><div class="kicker">Subjects</div><h1>Literacy and numeracy in your subject</h1>' +
      '<p class="lead">One page for each teacher: what literacy and numeracy look like in your subject at every stage, the routines to use, and the posters for your room.</p></div></section>';
    h += '<section class="section"><div class="wrap"><h2>Leading subjects</h2><div class="grid-3">' +
      SUBJECT_PAGES.filter(function (sp) { return sp.kind !== "subject"; }).map(subjectCard).join("") + "</div>" +
      '<h2 style="margin-top:28px">Every other subject</h2><div class="grid-2">' +
      SUBJECT_PAGES.filter(function (sp) { return sp.kind === "subject"; }).map(subjectCard).join("") + "</div>" +
      '<p class="callout info" style="margin-top:18px">The Arts and Languages, numeracy in English, and literacy in Mathematics are not yet mapped. They can be added the same way.</p></div></section>';
    page("subjects", "Subjects", h);
  }
  function subjectCard(sp) {
    var n = routinesFor(sp).length;
    return '<a class="card subject-card" href="#/subject/' + sp.id + '"><h3>' + esc(sp.name) + " →</h3><p>" + esc(sp.blurb) + '</p><span class="small muted">' + n + " shared routines" + (sp.kind === "subject" ? " · 24 stage strategies" : "") + "</span></a>";
  }

  function renderSubject(id) {
    var sp = subjectPage(id);
    if (!sp) return renderNotFound();
    var h;
    if (sp.kind === "subject") {
      var subj = subject(sp.id);
      h = subjectHero(sp, [["#literacy", "Literacy strategies"], ["#numeracy", "Numeracy strategies"], ["#routines", "Routines"], ["#posters", "Posters"]]);
      if (sp.note) h += '<div class="wrap"><p class="callout info" style="margin-top:18px">' + md(sp.note) + "</p></div>";
      ["literacy", "numeracy"].forEach(function (a) {
        var A = C[a];
        h += '<section class="section" id="' + a + '"><div class="wrap"><h2>' + esc(A.name) + " in " + esc(sp.name) + "</h2>" +
          '<p class="section-intro">' + (a === "numeracy" ? "In every subject other than Mathematics: <strong>identify</strong> the maths, <strong>check the prerequisite</strong> before the unit, and <strong>model applying it</strong>. Don’t re-teach Mathematics. " : "") +
          "<strong>Link</strong> is what " + esc(sp.name) + "’s own achievement standard asks for; <em>grey italic</em> means it isn’t required there, so the strategy is an opportunity. Click a cell for the full guide.</p>" +
          linkGrid(A, C.stages, function (s, d) {
            var c = A.subjectCells[subj.id][s.id][d.id];
            return '<span class="lnk' + (c.gap ? " gap" : "") + '"><b>Link:</b> ' + md(c.l) + '</span><span class="strat"><b>Strategy:</b> ' + md(c.s) + "</span>";
          }, function (s, d) { return targetHref(a, s.id, d.id, subj.id); }, sp.name + " › " + A.name) +
          '<p class="small" style="margin-top:8px"><a href="#/progressions?set=subjects&subject=' + subj.id + "&kind=" + a + '">' + esc(sp.name) + "’s " + esc(A.name.toLowerCase()) + " evidence, year by year →</a></p>" +
          "</div></section>";
      });
    } else if (sp.kind === "lead") {
      var A = C[sp.area], other = sp.area === "literacy" ? "numeracy" : "literacy";
      h = subjectHero(sp, [["#teach", "How " + sp.name + " teaches it"], ["#routines", "Routines"], ["#posters", "Posters"], ["#/" + sp.area, A.name + " information"]]);
      h += '<section class="section" id="teach"><div class="wrap"><h2>How ' + esc(sp.name) + " teaches " + esc(A.name.toLowerCase()) + "</h2>" +
        '<p class="section-intro">' + md(A.leadWho) + " Each cell shows the target and the explicit teaching behind it. Click a cell for the full guide.</p>" +
        linkGrid(A, C.stages, function (s, d) { return '<span class="lnk"><b>Target:</b> ' + md(A.targets[s.id][d.id]) + '</span><span class="strat"><b>' + esc(sp.name) + ":</b> " + md(A.method[s.id][d.id]) + "</span>"; },
          function (s, d) { return targetHref(sp.area, s.id, d.id, "method"); }, sp.name + " method") +
        '<p class="callout info" style="margin-top:14px">' + esc(C[other].name) + " in " + esc(sp.name) + " is not yet mapped. It is listed in the Framework’s questions for review.</p>" +
        "</div></section>";
    } else {
      h = subjectHero(sp, [["#literacy", "Literacy, P–6"], ["#numeracy", "Numeracy, P–6"], ["#routines", "Routines"], ["#posters", "Posters"]]);
      h += '<div class="wrap"><p class="callout info" style="margin-top:18px">Specialist teachers in the Junior School (for example Science or Health and PE) will find their strategies on their own subject page.</p></div>';
      var p6 = C.stages.filter(function (s) { return s.id === "foundational" || s.id === "developing"; });
      ["literacy", "numeracy"].forEach(function (a) {
        var A = C[a];
        h += '<section class="section" id="' + a + '"><div class="wrap"><h2>' + esc(A.name) + ", Prep to Year 6</h2>" +
          '<p class="section-intro">The target for each stage and how the class teacher teaches it in ' + esc(A.lead) + " time. Click a cell for the full guide.</p>" +
          linkGrid(A, p6, function (s, d) { return '<span class="lnk"><b>Target:</b> ' + md(A.targets[s.id][d.id]) + '</span><span class="strat"><b>Class teacher:</b> ' + md(A.method[s.id][d.id]) + "</span>"; },
            function (s, d) { return targetHref(a, s.id, d.id, "method"); }, "Junior School › " + A.name) +
          "</div></section>";
      });
    }
    h += routinesSection(sp) + postersSection(sp);
    page("subjects", sp.name, h);
    fitPosters();
    var jumps = main.querySelectorAll('.hero a[href^="#"]:not([href^="#/"])');
    for (var i = 0; i < jumps.length; i++) jumps[i].addEventListener("click", function (e) { e.preventDefault(); scrollToId(e.currentTarget.getAttribute("href").slice(1)); });
  }

  /* ---------- target page ---------- */
  function subjectPanel(A, subj, sId, dId) {
    var c = A.subjectCells[subj.id][sId][dId];
    return '<span class="label">Link to the ' + esc(subj.name) + " achievement standard</span>" +
      '<p class="lnk' + (c.gap ? " gap" : "") + '">' + md(c.l) + (c.gap ? " <span class=\"pill\">opportunity, not a requirement</span>" : "") + "</p>" +
      '<span class="label">Strategy for ' + esc(subj.name) + " teachers</span>" +
      '<p class="strat">' + md(c.s) + "</p>" +
      (subj.note ? '<p class="small muted" style="margin:0">' + md(subj.note) + "</p>" : "") +
      '<p class="small" style="margin:8px 0 0"><a class="btn btn-outline" href="#/subject/' + subj.id + "#" + A.id + '">All of ' + esc(subj.name) + "’s " + esc(A.name.toLowerCase()) + ' strategies →</a> <a href="#/progressions?set=subjects&subject=' + subj.id + "&kind=" + A.id + '">' + esc(subj.name) + "’s year-by-year evidence →</a></p>";
  }

  function miniNav(A, sId, dId) {
    var h = '<div class="mini-nav"><table><thead><tr><th></th>';
    A.domains.forEach(function (d) { h += '<th title="' + esc(d.name) + '">' + esc(TINY[d.id]) + "</th>"; });
    h += "</tr></thead><tbody>";
    C.stages.forEach(function (s) {
      h += '<tr><td class="row-h stage-' + s.id + '">' + esc(s.name.slice(0, 4)) + "</td>";
      A.domains.forEach(function (d) {
        var cur = s.id === sId && d.id === dId;
        h += '<td><a class="' + (cur ? "current" : "") + '" style="' + (cur ? "background:" + s.colour : "") + '" href="' + targetHref(A.id, s.id, d.id) + '" title="' + esc(s.name + " · " + d.name) + '" aria-label="' + esc(s.name + ", " + d.name) + '"' + (cur ? ' aria-current="page"' : "") + "></a></td>";
      });
      h += "</tr>";
    });
    h += "</tbody></table>";
    var idx = C.stages.map(function (s) { return s.id; }).indexOf(sId);
    var prev = C.stages[idx - 1], next = C.stages[idx + 1];
    h += '<div class="step-nav"><span>' + (prev ? '<a href="' + targetHref(A.id, prev.id, dId) + '">← ' + esc(prev.name) + "</a>" : "") + "</span><span>" +
      (next ? '<a href="' + targetHref(A.id, next.id, dId) + '">' + esc(next.name) + " →</a>" : "") + "</span></div></div>";
    return h;
  }

  function renderTarget(areaId, sId, dId, q) {
    var A = C[areaId], s = stage(sId), d = A && domain(A, dId);
    if (!s || !d) return renderNotFound();
    var det = A.details[sId + "." + dId] || {};
    var tab = q.get("tab");
    var subj = subject(tab) || C.subjects[0];

    var h = '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/' + areaId + '">' + esc(A.name) + "</a> › " +
      '<a href="#/' + areaId + '?view=targets">' + esc(s.name) + " (" + esc(s.years) + ")</a> › " + esc(d.name) + "</nav></div>";

    h += '<section class="target-hero stage-' + sId + '" style="margin-top:12px"><div class="wrap">' +
      '<div class="kicker">' + esc(A.name) + " · " + esc(d.name) + " · " + esc(s.name) + " stage</div>" +
      '<p class="by" style="margin:8px 0 0">By the end of Year ' + esc(s.targetYear) + ", a student can…</p>" +
      "<h1>" + md(A.targets[sId][dId]) + "</h1>" +
      '<div class="focus"><b>Stage focus (Framework Table ' + (areaId === "literacy" ? "3" : "6") + ")</b>" + md(A.focus[sId][dId]) + "</div>" +
      '<nav class="jump" aria-label="On this page"><span>Put it into practice:</span>' +
        '<button type="button" data-jump="practice">Shared routines</button>' +
        '<button type="button" data-jump="ideas">Classroom ideas</button>' +
        '<button type="button" data-jump="method">How ' + esc(A.lead) + " teaches it</button>" +
        '<button type="button" data-jump="subjects">In your subject</button>' +
        '<button type="button" data-jump="target-posters">Posters</button>' +
      "</nav>" +
      "</div></section>";

    h += '<div class="wrap"><div class="target-layout"><div class="target-main">';

    if (det.lookFors) {
      h += '<div class="card"><h2>What it looks like</h2><p class="small muted">A student who has met this target can be seen to:</p><ul class="lookfors">' +
        det.lookFors.map(function (l) { return "<li>" + md(l) + "</li>"; }).join("") + "</ul></div>";
    }

    if (det.routines && det.routines.length) {
      h += '<div class="card" id="practice"><h2>Put it into practice</h2>' +
        '<p class="small muted">Start with these shared routines. Each one is used the same way in every classroom, with step-by-step guidance on its own page.</p><div class="routine-minis">' +
        det.routines.map(function (r) {
          var R = C.routines[r];
          if (!R) return "";
          return '<a class="routine-mini ' + R.area + '" href="#/routine/' + r + '"><span class="rm-head"><strong>' + esc(R.t) + "</strong>" + moveBadges(C.routineMoves[r]) + "</span><span>" + md(R.what) + '</span><span class="who">' + esc(R.who) + (R.status ? " · " + esc(R.status) : "") + "</span><span class=\"go2\">How it works →</span></a>";
        }).join("") + "</div></div>";
    }

    if (det.ideas) {
      h += '<div class="card" id="ideas"><h2>Classroom ideas</h2>' + moveLegend() + '<div class="ideas">' +
        det.ideas.map(function (i) { return '<div class="idea" style="border-left-color:' + s.colour + '"><div class="idea-head"><h4>' + md(i.t) + "</h4>" + moveBadges(ideaMoves(i.t), true) + "</div><p>" + md(i.d) + "</p></div>"; }).join("") +
        "</div>";
      if (det.example) {
        h += '<div class="example" style="margin-top:14px"><h4>Example · ' + md(det.example.t) + "</h4>" +
          det.example.lines.map(function (l) { return '<div class="line">' + md(l) + "</div>"; }).join("") + "</div>";
      }
      h += "</div>";
    }

    h += '<div class="card" id="method"><h2>How ' + esc(A.lead) + " teaches it</h2>" +
      '<p class="small muted">' + md(A.leadWho) + "</p><p>" + md(A.method[sId][dId]) + "</p></div>";

    h += '<div class="card subject-panel" id="subjects"><h2>In your subject</h2>' +
      (areaId === "numeracy" ? '<p class="small muted">Identify the maths, check the prerequisite before the unit, and model applying it. Don’t re-teach Mathematics.</p>' : "") +
      '<div class="tabs" role="tablist">';
    C.subjects.forEach(function (x) {
      h += '<button class="tab" role="tab" data-subj="' + x.id + '" aria-selected="' + (x.id === subj.id) + '">' + esc(x.name) + "</button>";
    });
    h += '</div><div id="subject-body" role="tabpanel">' + subjectPanel(A, subj, sId, dId) + "</div></div>";

    var key = areaId + "." + sId + "." + dId;
    var linked = subjectPosters(function (p) { return p.target === key; }).concat((det.routines || []).map(posterById).filter(Boolean));
    h += '<div class="card" id="target-posters"><h2>Posters for this target</h2>' +
      '<p class="small muted">The <strong>staff guide</strong> puts this target on one page. The <strong>classroom posters</strong> show its shared practices in student language for the wall. Click any poster to open, print or download it.</p>' +
      '<div class="poster-row">' + tile(staffHref(areaId, sId, dId), staffPoster(A, s, d), "Staff guide", "This target on one page") +
      linked.map(function (p) { return p.subject ? subjectTile(p) : tile(classroomHref(p), classroomPoster(p), p.title, "Classroom poster"); }).join("") +
      "</div></div>";

    h += "</div>";

    // side column
    h += '<aside class="target-side"><div class="card"><h3>Move around</h3>' + miniNav(A, sId, dId) + "</div>";
    h += '<div class="card"><h3>How we track it</h3><p class="small" style="margin:0">' + md(A.measure[sId]) + "</p>" +
      (det.tier ? '<p class="callout" style="margin:12px 0 0">' + md(det.tier) + "</p>" : "") +
      (det.note ? '<p class="callout info" style="margin:12px 0 0">' + md(det.note) + "</p>" : "") + "</div>";

    if (det.subElements) {
      var y = s.targetYear;
      h += '<div class="card"><h3>Curriculum anchors</h3><p class="small muted">ACARA sub-elements behind this target, with the AC:' + (areaId === "literacy" ? "English" : "Mathematics") + " codes the alignment workbook lists for " + yearLabel(y) + ".</p><ul class=\"anchor-list\">";
      det.subElements.forEach(function (sub) {
        var r = wbRow(areaId, sub);
        var code = r ? r.years[y] : "";
        h += "<li><a href=\"#/progressions?set=" + areaId + "&sub=" + encodeURIComponent(sub) + "&year=" + y + "\"><strong>" + esc(sub) + "</strong></a>" +
          (r && r.constrained ? ' <span class="pill">constrained</span>' : "") +
          '<span class="codes' + (isNone(code) ? " none" : "") + '">' + esc(code || "not in workbook") + "</span></li>";
      });
      h += "</ul>" + (sId === "extending" ? '<p class="small muted" style="margin:8px 0 0">Year 10 is where the Australian Curriculum ends. Years 11–12 continue through QCE syllabuses, not yet mapped.</p>' : "") + "</div>";
    }
    h += "</aside></div></div>";

    page(areaId, s.name + " " + d.name, h);

    var buttons = main.querySelectorAll("[data-subj]");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        var id = e.currentTarget.getAttribute("data-subj");
        for (var j = 0; j < buttons.length; j++) buttons[j].setAttribute("aria-selected", String(buttons[j] === e.currentTarget));
        document.getElementById("subject-body").innerHTML = subjectPanel(A, subject(id), sId, dId);
        history.replaceState(null, "", targetHref(areaId, sId, dId, id));
      });
    }
    var jumps = main.querySelectorAll("[data-jump]");
    for (var k = 0; k < jumps.length; k++) {
      jumps[k].addEventListener("click", function (e) { scrollToId(e.currentTarget.getAttribute("data-jump")); });
    }
    fitPosters();
    if (tab === "method") scrollToId("method");
    else if (tab === "routines") scrollToId("practice");
    else if (subject(tab)) scrollToId("subjects");
  }

  function scrollToId(id) {
    setTimeout(function () {
      var el = document.getElementById(id);
      if (!el) return;
      var offset = stickyOffset();
      window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - offset, behavior: "auto" });
    }, 30);
  }

  /* ---------- progressions ---------- */
  function shownYears(stageFilter) { return stageFilter === "all" || !STAGE_YEARS[stageFilter] ? YEARS : STAGE_YEARS[stageFilter]; }
  function bandHeader(firstLabel, extraLast, years) {
    var h = '<thead><tr><th class="sub-col band-blank" rowspan="2">' + esc(firstLabel) + "</th>";
    C.stages.forEach(function (s) {
      var n = STAGE_YEARS[s.id].filter(function (y) { return years.indexOf(y) >= 0; }).length;
      if (!n) return;
      h += '<th colspan="' + n + '" class="stage-' + s.id + '">' + esc(s.name) + " (" + esc(s.years) + ")" + (s.id === "extending" ? "*" : "") + "</th>";
    });
    if (extraLast) h += '<th class="band-blank" rowspan="2">' + esc(extraLast) + "</th>";
    h += "</tr><tr>";
    years.forEach(function (y) { h += "<th>" + yearLabel(y) + "</th>"; });
    return h + "</tr></thead>";
  }
  function stageChips(base, stageFilter) {
    return '<div class="controls"><label>Show</label><div class="tabs" style="margin:0">' +
      ["all"].concat(C.stages.map(function (s) { return s.id; })).map(function (k) {
        var label = k === "all" ? "All years" : stage(k).name + " (" + stage(k).years + ")";
        return '<a class="tab" aria-selected="' + (k === stageFilter) + '" href="' + base + "&stage=" + k + '">' + esc(label) + "</a>";
      }).join("") + "</div></div>";
  }

  function renderProgressions(q) {
    var set = q.get("set") || "literacy";
    var stageFilter = q.get("stage") || "all";
    var hlSub = q.get("sub"), hlYear = q.get("year");
    var P = C.progressions;

    var h = '<section class="hero"><div class="wrap"><div class="kicker">ACARA v9.0 general capabilities · Foundation–Year 10</div><h1>Progressions</h1>' +
      '<p class="lead">' + md(P.what) + "</p></div></section>";

    h += '<section class="section"><div class="wrap"><div class="grid-3">' +
      '<div class="card"><h3>Progressions are not the curriculum</h3><p class="small" style="margin:0">' + md(P.notCurriculum) + "</p></div>" +
      '<div class="card"><h3>Constrained and unconstrained</h3><p class="small" style="margin:0">' + md(P.constrained) + "</p></div>" +
      '<div class="card"><h3>Scope</h3><p class="small" style="margin:0">' + md(P.scope) + "</p></div></div></div></section>";

    h += '<section class="section"><div class="wrap"><div class="tabs" role="tablist">' +
      ["literacy", "numeracy", "subjects"].map(function (k) {
        var label = k === "subjects" ? "Subject evidence" : C[k].name + " sub-elements";
        return '<a class="tab" role="tab" aria-selected="' + (k === set) + '" href="#/progressions?set=' + k + '">' + label + "</a>";
      }).join("") + "</div>";

    if (set === "literacy" || set === "numeracy") {
      var G = W.grids[set];
      h += "<h2>" + esc(C[set].name) + " sub-elements by year</h2>" +
        '<p class="section-intro">Each cell lists the AC:' + (set === "literacy" ? "English" : "Mathematics") + " content descriptor codes that anchor that sub-element at that year level. A dash range (AC9E4LA03-09) means every descriptor in that range.</p>" +
        '<p class="callout info">' + md(P.confidence[set]) + "</p>";
      var years = shownYears(stageFilter);
      h += stageChips("#/progressions?set=" + set + (hlSub ? "&sub=" + encodeURIComponent(hlSub) : "") + (hlYear ? "&year=" + hlYear : ""), stageFilter);
      h += '<div class="legend"><span><span class="sw" style="background:var(--gap-bg)"></span>No code in the source (untagged or concluded)</span><span><span class="sw" style="background:#e8a33d"></span>Flagged in the workbook — open the note</span><span><span class="pill">constrained</span> learned early, then consolidated</span></div>';

      h += '<div class="prog-wrap" id="prog"><table class="prog' + (years.length < YEARS.length ? " filtered" : "") + '">' + bandHeader("Sub-element", null, years) + "<tbody>";
      var lastEl = null, ncols = years.length + 1;
      G.rows.forEach(function (r, idx) {
        if (r.element !== lastEl) { h += '<tr class="el-row"><td class="sub-col">' + esc(r.element) + '</td><td colspan="' + (ncols - 1) + '"></td></tr>'; lastEl = r.element; }
        var isHl = hlSub && r.sub.toLowerCase() === hlSub.toLowerCase();
        h += '<tr class="' + (r.notes ? "flagged " : "") + (isHl ? "hl" : "") + '"' + (isHl ? ' id="hl-row"' : "") + '><td class="sub-col"><b>' + esc(r.sub) + "</b>" +
          '<span class="muted">Levels ' + esc(r.levels) + "</span> " + (r.constrained ? '<span class="pill">constrained</span>' : "") +
          (r.notes ? '<br><button class="note-btn" data-note="n' + idx + '" aria-expanded="false">Note</button>' : "") + "</td>";
        years.forEach(function (y) {
          var v = r.years[y];
          var cls = "code" + (isNone(v) ? " none" : "") + (isHl && y === hlYear ? " col-hl" : "");
          h += '<td class="' + cls + '" data-audit="' + esc("Progressions › " + C[set].name + " › " + r.sub + " › " + yearLabel(y)) + '">' + esc(v || "") + "</td>";
        });
        h += "</tr>";
        if (r.notes) h += '<tr class="note-row" id="n' + idx + '" hidden><td class="sub-col"></td><td colspan="' + (ncols - 1) + '"><strong>Workbook note:</strong> ' + esc(r.notes) + "</td></tr>";
      });
      h += "</tbody></table></div>";
      h += '<p class="grid-hint">* Extending runs to Year 12, but the progressions and AC content descriptors stop at Year 10.</p>';
    } else {
      var subjId = q.get("subject") || "science";
      var kind = q.get("kind") || "literacy";
      var sj = subject(subjId) || C.subjects[0];
      var S = W.subjects[sj.workbook] && W.subjects[sj.workbook][kind];
      h += "<h2>Subject evidence, year by year</h2>" +
        '<p class="section-intro">What each subject’s own Australian Curriculum achievement standard requires or offers, against the three ' + kind + " domains. These are the evidence behind the subject strategies on each target page.</p>";
      h += '<div class="controls"><label for="subj-sel">Subject</label><select id="subj-sel">' +
        C.subjects.map(function (x) { return '<option value="' + x.id + '"' + (x.id === sj.id ? " selected" : "") + ">" + esc(x.name) + "</option>"; }).join("") +
        '</select><div class="tabs" style="margin:0">' +
        ["literacy", "numeracy"].map(function (k) { return '<a class="tab" aria-selected="' + (k === kind) + '" href="#/progressions?set=subjects&subject=' + sj.id + "&kind=" + k + '">' + C[k].name + "</a>"; }).join("") +
        "</div></div>";
      if (sj.note) h += '<p class="callout info">' + md(sj.note) + "</p>";
      var syears = shownYears(stageFilter);
      h += stageChips("#/progressions?set=subjects&subject=" + sj.id + "&kind=" + kind, stageFilter);
      if (S) {
        h += '<div class="prog-wrap"><table class="prog' + (syears.length < YEARS.length ? " filtered" : "") + '">' + bandHeader("Domain", "Notes", syears) + "<tbody>";
        S.rows.forEach(function (r) {
          h += '<tr><td class="sub-col"><b>' + esc(r.domain) + "</b></td>";
          syears.forEach(function (y) { var v = r.years[y]; h += '<td class="text' + (isNone(v) ? " none" : "") + '" data-audit="' + esc("Progressions › " + sj.name + " (" + C[kind].name + ") › " + r.domain + " › " + yearLabel(y)) + '">' + esc(v || "") + "</td>"; });
          h += '<td class="text" style="min-width:220px">' + esc(r.notes || "") + "</td></tr>";
        });
        h += "</tbody></table></div>";
      } else {
        h += '<p class="empty">No workbook data for this subject.</p>';
      }
    }

    h += '<details class="card" id="about-workbook" style="margin-top:20px"><summary><strong>About the alignment workbook</strong> (methodology and caveats)</summary><div style="margin-top:10px">' +
      W.preface.slice(1).map(function (p) { return p.length < 80 && !/\.$/.test(p) ? "<h4 style=\"margin:14px 0 4px\">" + esc(p) + "</h4>" : '<p class="small">' + esc(p) + "</p>"; }).join("") +
      "</div></details>";
    h += "</div></section>";

    page("framework", "Progressions", h);

    var sel = document.getElementById("subj-sel");
    if (sel) sel.addEventListener("change", function () { location.hash = "#/progressions?set=subjects&subject=" + sel.value + "&kind=" + (q.get("kind") || "literacy"); });
    var notes = main.querySelectorAll("[data-note]");
    for (var i = 0; i < notes.length; i++) {
      notes[i].addEventListener("click", function (e) {
        var b = e.currentTarget, row = document.getElementById(b.getAttribute("data-note"));
        row.hidden = !row.hidden; b.setAttribute("aria-expanded", String(!row.hidden));
      });
    }
    var hl = document.getElementById("hl-row");
    if (hl) {
      var nb = hl.querySelector("[data-note]");
      if (nb) nb.click();
      var placeTable = function () {
        var wrapEl = document.getElementById("prog");
        if (!wrapEl) return;
        var off = stickyOffset();
        var head = wrapEl.querySelector("thead");
        wrapEl.scrollTop = Math.max(0, hl.offsetTop - (head ? head.offsetHeight : 0) - 40);
        window.scrollTo({ top: wrapEl.getBoundingClientRect().top + window.pageYOffset - off, behavior: "instant" });
      };
      setTimeout(placeTable, 30);
      setTimeout(placeTable, 250);   // again after layout settles (fonts, opened note)
    }
  }

  /* ---------- implementation & routines ---------- */
  function routineUses(id) {
    var uses = [];
    ["literacy", "numeracy"].forEach(function (aId) {
      var A = C[aId];
      C.stages.forEach(function (s) {
        A.domains.forEach(function (d) {
          var det = A.details[s.id + "." + d.id];
          if (det && det.routines && det.routines.indexOf(id) >= 0) uses.push({ A: A, s: s, d: d });
        });
      });
    });
    return uses;
  }
  function stagePills(stages) {
    return stages.map(function (sid) { var s = stage(sid); return '<span class="pill stage-' + sid + '">' + esc(s.name) + "</span>"; }).join(" ");
  }

  /* ---------- resources: shared tools for every subject ---------- */
  function renderResources(q) {
    var area = q.get("area") || "all";
    var byArea = q.get("by") === "numeracy" ? "numeracy" : "literacy";
    var h = '<section class="hero"><div class="wrap"><div class="kicker">Resources</div><h1>Shared resources</h1>' +
      '<p class="lead">The routines, teaching moves and posters every subject uses, so students meet the same practices and the same words in every room.</p>' +
      '<div class="actions"><a class="btn btn-light" href="#/resources#routines">Shared routines</a><a class="btn btn-ghost" href="#/resources#by-target">Routines by target</a><a class="btn btn-ghost" href="#/resources#moves">Teaching moves</a><a class="btn btn-ghost" href="#/resources#posters">Posters</a></div></div></section>';

    h += '<section class="section" id="routines"><div class="wrap"><h2>Shared routines</h2><p class="section-intro">The same routine, the same words, in every room. Each routine links to the targets it supports.</p><div class="tabs">' +
      [["all", "All"], ["literacy", "Literacy"], ["numeracy", "Numeracy"]].map(function (a) {
        return '<a class="tab" aria-selected="' + (a[0] === area) + '" href="#/resources?area=' + a[0] + '#routines">' + a[1] + "</a>";
      }).join("") + '</div><div class="grid-3">' +
      Object.keys(C.routines).filter(function (id) { return area === "all" || C.routines[id].area === area; }).map(routineCard).join("") +
      "</div></div></section>";

    h += '<section class="section" id="by-target"><div class="wrap"><h2>Routines by target</h2>' +
      '<p class="section-intro">Find your stage and domain to see which routines put that target into practice. Click a routine for how it works, or open the guide for the whole target.</p><div class="tabs">' +
      ["literacy", "numeracy"].map(function (k) {
        return '<a class="tab" aria-selected="' + (k === byArea) + '" href="#/resources?area=' + area + "&by=" + k + '#by-target">' + C[k].name + "</a>";
      }).join("") + "</div>" + routineGrid(C[byArea]) + "</div></section>";

    h += '<section class="section" id="moves"><div class="wrap"><h2>Teaching moves</h2>' +
      '<p class="section-intro">Six moves recur across every routine and classroom idea. The symbols appear beside each one, on the guide pages and on the posters, so the same moves are easy to spot everywhere. Click one to see everywhere it is used.</p>' +
      '<div class="moves-grid">' + C.moves.map(function (m) {
        return '<a class="card move-card" href="#/move/' + m.id + '">' + moveIcon(m.id, 30) + "<div><h3>" + esc(m.name) + '</h3><p class="move-short">' + esc(m.short) + '</p><p class="small" style="margin:0">' + md(m.def) + "</p></div></a>";
      }).join("") + "</div></div></section>";

    h += '<section class="section" id="posters"><div class="wrap"><h2>Posters</h2><p class="section-intro">Ready to print, and viewable here.</p><div class="grid-3">' +
      '<a class="card poster-promo" href="#/posters?set=classroom"><div class="promo-thumbs">' + ["cer", "bda", "no-unit"].map(posterById).filter(Boolean).map(function (p) { return frame(classroomPoster(p), "thumb"); }).join("") + "</div><h3>Classroom posters</h3><p>" + sharedPosters().length + " shared practices in student language, one design for every room.</p></a>" +
      '<a class="card poster-promo" href="#/posters?set=subject"><div class="promo-thumbs">' + subjectPosters().slice(0, 3).map(function (p) { return frame(classroomPoster(p), "thumb"); }).join("") + "</div><h3>Subject examples</h3><p>" + subjectPosters().length + " shared practices applied in one subject and year level.</p></a>" +
      '<a class="card poster-promo" href="#/posters?set=staff"><div class="promo-thumbs">' + [["literacy", "consolidating", "writing"], ["numeracy", "developing", "mg"], ["literacy", "foundational", "reading"]].map(function (x) { return frame(staffPoster(C[x[0]], stage(x[1]), domain(C[x[0]], x[2])), "thumb"); }).join("") + "</div><h3>Staff guides</h3><p>" + staffList().length + " targets, one page each: what it looks like, the routines, the ideas and what every subject does.</p></a>" +
      "</div></div></section>";

    page("resources", "Resources", h);
    fitPosters();
  }

  function renderRoutine(id) {
    var R = C.routines[id];
    if (!R) return renderNotFound();
    var uses = routineUses(id);
    var h = '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/resources">Resources</a> › <a href="#/resources?area=' + R.area + '#routines">Shared routines</a> › ' + esc(R.t) + "</nav></div>";
    h += '<section class="hero" style="margin-top:12px"><div class="wrap"><div class="kicker">' + esc(C[R.area].name) + " routine · " + esc(R.who) + "</div><h1>" + esc(R.t) + '</h1><p class="lead">' + md(R.what) + "</p>" +
      '<div style="margin-top:10px">' + stagePills(R.stages) + (R.status ? ' <span class="pill warn">' + esc(R.status) + "</span>" : "") + "</div>" +
      '<div class="hero-moves"><span>Teaching moves:</span>' + moveBadges(C.routineMoves[id], true, true) + "</div></div></section>";
    h += '<div class="wrap"><div class="target-layout"><div class="target-main"><div class="card"><h2>How it works</h2><ol class="steps">' +
      R.steps.map(function (s) { return "<li>" + md(s) + "</li>"; }).join("") + '</ol></div><div class="card"><h2>Why we do it</h2><p style="margin:0">' + md(R.why) + "</p></div>";
    var cp = posterById(id);
    if (cp) {
      h += '<div class="card" id="routine-poster"><h2>Classroom poster</h2><p class="small muted">For the wall, in student language. The same poster is used in every room.</p>' +
        '<div class="routine-poster"><a class="poster-link" href="' + classroomHref(cp) + '" aria-label="Open the ' + esc(cp.title) + ' poster">' + frame(classroomPoster(cp)) + "</a>" +
        '<div class="rp-actions"><a class="btn btn-solid" href="' + classroomHref(cp) + '">Open and print</a><a class="btn btn-outline" href="' + classroomPdf(cp) + '" download>Download PDF</a></div></div></div>';
    }
    var subEx = subjectPosters(function (p) { return p.routine === id; });
    if (subEx.length) {
      h += '<div class="card"><h2>Subject examples</h2><p class="small muted">This practice applied in a particular subject and year level.</p><div class="poster-row">' + subEx.map(subjectTile).join("") + "</div></div>";
    }
    h += "</div>";
    h += '<aside class="target-side"><div class="card"><h3>Supports these targets</h3>' +
      (uses.length ? '<ul class="anchor-list">' + uses.map(function (u) {
        return '<li><span class="pill stage-' + u.s.id + '">' + esc(u.s.name) + '</span> <a href="' + targetHref(u.A.id, u.s.id, u.d.id) + '">' + esc(u.A.name + " · " + u.d.name) + "</a></li>";
      }).join("") + "</ul>" : '<p class="small muted">Used across subjects; not tied to a single target.</p>') +
      "</div>";
    h += "</aside></div></div>";
    page("resources", R.t, h);
    fitPosters();
    setTimeout(fitPosters, 50);
  }

  /* ---------- posters ---------- */
  var P = window.POSTERS || { classroom: [] };
  var ICONS = {
    speak: '<path d="M4 4h16v11H9l-5 4z"/><path d="M8 8.5h8M8 11.5h5"/>',
    chat: '<path d="M3 4h11v8H8l-3 3v-3H3z"/><path d="M14 8h7v7h-2v3l-3-3h-5v-3"/>',
    book: '<path d="M3 5c3-1 6-1 9 1 3-2 6-2 9-1v14c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6v14"/>',
    pencil: '<path d="M4 20l1-5L16 4l4 4L9 19z"/><path d="M14 6l4 4"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/><path d="M13 7l4 4"/><path d="M14 20h6"/>',
    numbers: '<path d="M4 8l2-1.5V17"/><path d="M9.5 8.5a2 2 0 1 1 3.2 1.6L9.5 17h4"/><path d="M16 7h4l-2.5 3.5a2.5 2.5 0 1 1-1.8 4.6"/>',
    ruler: '<rect x="2" y="8.5" width="20" height="7" rx="1"/><path d="M6 8.5v3M10 8.5v4M14 8.5v3M18 8.5v4"/>',
    chart: '<path d="M4 20V4M4 20h16"/><path d="M8.5 16v-4M12.5 16V8M16.5 16v-6"/>',
    search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',
    blocks: '<rect x="4" y="3.5" width="16" height="4.5" rx="1"/><rect x="4" y="10" width="16" height="4.5" rx="1"/><rect x="4" y="16.5" width="16" height="4.5" rx="1"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4.5 6h.01M4.5 12h.01M4.5 18h.01"/>',
    lines: '<path d="M4 7h16M4 12h16M4 17h10"/>',
    cycle: '<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4.5h-4.5"/>',
    plustimes: '<path d="M7 3.5v7M3.5 7h7"/><path d="M14.5 14.5l5 5M19.5 14.5l-5 5"/>',
    question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2a2.5 2.5 0 1 1 3.4 2.3c-.6.3-.9.8-.9 1.5"/><path d="M12 16.8h.01"/>',
    ear: '<path d="M7 9a5 5 0 0 1 10 0c0 3-2.5 4-3.5 6s-1 4-3.5 4"/><path d="M10 9a2 2 0 0 1 4 0"/>'
  };
  var DOMAIN_ICON = { sl: "speak", reading: "book", writing: "pencil", na: "numbers", mg: "ruler", sp: "chart" };
  ICONS.eye = '<path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z"/><circle cx="12" cy="12" r="2.8"/>';
  ICONS.repeat = '<path d="M17 2.5l3 3-3 3"/><path d="M4 11.5v-2a4 4 0 0 1 4-4h12"/><path d="M7 21.5l-3-3 3-3"/><path d="M20 12.5v2a4 4 0 0 1-4 4H4"/>';
  ICONS.aa = '<path d="M2.5 19L7.5 5l5 14M4.3 14h6.4"/><circle cx="17.5" cy="15.5" r="3"/><path d="M20.5 12.5V19"/>';
  ICONS.tick = '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.2 9.8"/>';
  var MOVE_ICON = { model: "eye", talk: "speak", practise: "repeat", write: "pencil", words: "aa", check: "tick" };
  function moveById(id) { for (var i = 0; i < C.moves.length; i++) if (C.moves[i].id === id) return C.moves[i]; return null; }
  function moveIcon(id, size) { return '<span class="mv-ico">' + icon(MOVE_ICON[id], size || 14) + "</span>"; }
  // ids: list of move ids. linked: render as links to the move page (only where not already inside a link).
  // labels: show the move name beside the symbol.
  function moveBadges(ids, linked, labels) {
    if (!ids || !ids.length) return "";
    return '<span class="moves' + (labels ? " labelled" : "") + '">' + ids.map(function (id) {
      var m = moveById(id);
      if (!m) return "";
      var inner = icon(MOVE_ICON[id], labels ? 15 : 13) + (labels ? "<span>" + esc(m.name) + "</span>" : "");
      var attrs = ' class="mv mv-' + id + '" title="' + esc(m.name + ": " + m.short) + '" aria-label="' + esc(m.name) + '"';
      return linked ? '<a href="#/move/' + id + '"' + attrs + ">" + inner + "</a>" : "<span" + attrs + ">" + inner + "</span>";
    }).join("") + "</span>";
  }
  function moveLegend() {
    return '<div class="move-legend"><span class="ml-label">Teaching moves</span>' + moveBadges(C.moves.map(function (m) { return m.id; }), true, true) + "</div>";
  }
  function ideaMoves(title) { return C.ideaMoves[title] || []; }

  function renderMove(id) {
    var m = moveById(id);
    if (!m) return renderNotFound();
    var h = '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/resources">Resources</a> › <a href="#/resources#moves">Teaching moves</a> › ' + esc(m.name) + "</nav></div>";
    h += '<section class="hero" style="margin-top:12px"><div class="wrap"><div class="kicker">Teaching move</div><h1 class="move-h1">' + moveIcon(id, 40) + esc(m.name) + '</h1><p class="lead"><strong>' + esc(m.short) + ".</strong> " + md(m.def) + "</p>" +
      '<div class="move-switch">' + moveBadges(C.moves.map(function (x) { return x.id; }), true, true) + "</div></div></section>";
    var routines = Object.keys(C.routines).filter(function (r) { return (C.routineMoves[r] || []).indexOf(id) >= 0; });
    h += '<section class="section"><div class="wrap"><h2>Shared routines that use it (' + routines.length + ')</h2><div class="grid-3">' + routines.map(function (r) {
      var R = C.routines[r];
      return '<a class="card routine-card ' + R.area + '" href="#/routine/' + r + '"><div><h3>' + esc(R.t) + "</h3>" + moveBadges(C.routineMoves[r]) + "<p>" + md(R.what) + '</p><div class="meta">' + stagePills(R.stages) + "</div></div></a>";
    }).join("") + "</div></div></section>";
    var found = [];
    ["literacy", "numeracy"].forEach(function (a) {
      C.stages.forEach(function (s) {
        C[a].domains.forEach(function (d) {
          var det = C[a].details[s.id + "." + d.id];
          (det && det.ideas || []).forEach(function (i) { if (ideaMoves(i.t).indexOf(id) >= 0) found.push({ a: a, s: s, d: d, i: i }); });
        });
      });
    });
    h += '<section class="section"><div class="wrap"><h2>Classroom ideas that use it (' + found.length + ')</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Target</th><th>Idea</th></tr></thead><tbody>' +
      found.map(function (f) {
        return '<tr><td style="white-space:nowrap"><span class="pill stage-' + f.s.id + '">' + esc(f.s.name) + '</span><br><a href="' + targetHref(f.a, f.s.id, f.d.id) + '">' + esc(C[f.a].name + " · " + f.d.name) + "</a></td><td><strong>" + md(f.i.t) + "</strong> " + moveBadges(ideaMoves(f.i.t)) + '<div class="small muted">' + md(f.i.d) + "</div></td></tr>";
      }).join("") + "</tbody></table></div></div></section>";
    page("resources", m.name, h);
  }
  function icon(name, size) {
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + (ICONS[name] || ICONS.lines) + "</svg>";
  }
  function deep(s) { return s.id === "consolidating" ? "#8F6A00" : s.colour; }
  function classroomPoster(p) {
    var s = stage(p.stage), R = C.routines[p.routine] || { stages: [p.stage] };
    var dom = p.target ? domain(C[p.area], p.target.split(".")[2]) : null;
    var kicker = p.subject ? p.subject + " · " + (dom ? dom.name : C[p.area].name) : "Shared practice · " + C[p.area].name;
    var h = '<article class="poster poster-class" style="--acc:' + deep(s) + '">' +
      '<header class="p-hero"><div class="p-icon">' + icon(p.icon, 58) + '</div><div>' +
      '<div class="p-kicker">' + esc(kicker) + "</div><h1>" + md(p.title) + "</h1><p>" + md(p.subtitle) + "</p></div></header>" +
      '<div class="p-body">';
    if (p.layout === "columns") {
      h += '<div class="p-cols" style="--n:' + p.cards.length + '">' + p.cards.map(function (c, i) {
        return '<div class="p-colcard"><span class="p-num big">' + (i + 1) + "</span><h2>" + md(c.h) + "</h2><p>" + md(c.t) + "</p></div>";
      }).join("") + "</div>";
    } else if (p.layout === "cycle") {
      h += '<ol class="p-cycle">' + p.cards.map(function (c, i) {
        return '<li><span class="p-num">' + (i + 1) + "</span><div><h2>" + md(c.h) + "</h2><p>" + md(c.t) + "</p></div></li>";
      }).join("") + '</ol><div class="p-loop">' + icon("cycle", 26) + "<span>New question? Go round again.</span></div>";
    } else {
      h += '<ol class="p-cards' + (p.cards.length > 5 ? " many" : "") + '">' + p.cards.map(function (c, i) {
        return '<li><span class="p-num">' + (i + 1) + "</span><div><h2>" + md(c.h) + "</h2><p>" + md(c.t) + "</p></div></li>";
      }).join("") + "</ol>";
    }
    h += "</div>";
    if (p.example) h += '<div class="p-example"><h3>' + md(p.example.h) + "</h3>" + p.example.lines.map(function (l) { return "<p>" + md(l) + "</p>"; }).join("") + "</div>";
    var footStages = p.subject ? [p.stage] : R.stages;
    var footText = p.subject ? "TGS Literacy and Numeracy Framework · " + C[p.area].name + (dom ? " · " + dom.name : "") : "TGS Literacy and Numeracy Framework · Shared practice";
    h += '<footer class="p-foot"><span class="p-foot-l">' + moveBadges(C.routineMoves[p.routine], false, true) + '<span class="p-foot-text">' + esc(footText) + '</span></span><span class="p-stages">' +
      footStages.map(function (id) { var x = stage(id); return '<i style="background:' + deep(x) + '">' + esc(x.name + (p.subject ? " · " + x.years : "")) + "</i>"; }).join("") + "</span></footer></article>";
    return h;
  }
  function staffPoster(A, s, d) {
    var det = A.details[s.id + "." + d.id] || {};
    var h = '<article class="poster poster-staff" style="--acc:' + deep(s) + '">' +
      '<header class="p-hero"><div class="p-icon">' + icon(DOMAIN_ICON[d.id], 44) + '</div><div>' +
      '<div class="p-kicker">Staff guide · ' + esc(A.name) + " · " + esc(d.name) + "</div>" +
      '<p class="p-by"><span class="p-stagepill">' + esc(s.name) + " · " + esc(s.years) + "</span> By the end of Year " + esc(s.targetYear) + ", students can…</p>" +
      "<h1>" + md(A.targets[s.id][d.id]) + "</h1></div></header>" +
      '<div class="p-focus"><b>Stage focus</b> ' + md(A.focus[s.id][d.id]) + "</div>" +
      '<div class="p-grid"><section>' +
        "<h2>What it looks like</h2><ul class=\"p-ticks\">" + (det.lookFors || []).map(function (l) { return "<li>" + md(l) + "</li>"; }).join("") + "</ul>" +
        "<h2>Shared routines</h2><ul class=\"p-routines\">" + (det.routines || []).map(function (r) { var R = C.routines[r]; return R ? "<li><b>" + esc(R.t) + " " + moveBadges(C.routineMoves[r]) + "</b><span>" + esc(R.who) + "</span></li>" : ""; }).join("") + "</ul>" +
        "<h2>How we track it</h2><p>" + md(A.measure[s.id]) + "</p>" +
        (det.tier ? '<p class="p-tier">' + md(det.tier) + "</p>" : "") +
      "</section><section>" +
        '<h2>Classroom ideas</h2><ol class="p-ideas">' + (det.ideas || []).map(function (i) { return "<li><b>" + md(i.t) + (/[.?!:]$/.test(i.t) ? "" : ".") + "</b> " + moveBadges(ideaMoves(i.t)) + " " + md(i.d) + "</li>"; }).join("") + "</ol>" +
        "<h2>" + esc(A.lead) + " leads</h2><p>" + md(A.method[s.id][d.id]) + "</p>" +
      "</section></div>" +
      '<section class="p-subjects"><h2>In every subject</h2><div class="p-subj-grid">' + C.subjects.map(function (x) {
        var c = A.subjectCells[x.id][s.id][d.id];
        return '<div class="p-subj"><b>' + esc(x.name) + (c.gap ? ' <i>opportunity</i>' : "") + "</b><p>" + md(c.s) + "</p></div>";
      }).join("") + "</div></section>" +
      (det.example ? '<div class="p-example"><h3>Example · ' + md(det.example.t) + "</h3>" + det.example.lines.map(function (l) { return "<p>" + md(l) + "</p>"; }).join("") + "</div>" : "") +
      '<footer class="p-foot"><span class="p-legend">' + moveBadges(C.moves.map(function (m) { return m.id; }), false, true) + "</span><span>TGS Literacy and Numeracy Framework · Staff guide · " + esc(A.name + " · " + d.name + " · " + s.name) + "</span></footer></article>";
    return h;
  }
  function staffList() {
    var list = [];
    ["literacy", "numeracy"].forEach(function (a) { C.stages.forEach(function (s) { C[a].domains.forEach(function (d) { list.push({ A: C[a], s: s, d: d }); }); }); });
    return list;
  }
  function frame(inner, extra) { return '<div class="poster-frame' + (extra ? " " + extra : "") + '"' + (extra === "thumb" ? ' aria-hidden="true"' : "") + ">" + inner + "</div>"; }
  function fitPosters() {
    var frames = document.querySelectorAll(".poster-frame");
    for (var i = 0; i < frames.length; i++) {
      var f = frames[i], p = f.firstElementChild;
      if (!p) continue;
      var sc = f.clientWidth / 794;
      p.style.transform = "scale(" + sc + ")";
      f.style.height = Math.round(1123 * sc) + "px";
    }
  }
  var fitTimer;
  window.addEventListener("resize", function () { clearTimeout(fitTimer); fitTimer = setTimeout(fitPosters, 80); });
  function classroomHref(p) { return "#/poster/classroom/" + p.id; }
  function staffHref(a, s, d) { return "#/poster/staff/" + a + "/" + s + "/" + d; }
  function classroomPdf(p) { return "posters/classroom/" + p.id + ".pdf"; }
  function staffPdf(a, s, d) { return "posters/staff/" + a + "-" + s + "-" + d + ".pdf"; }
  function posterById(id) { for (var i = 0; i < P.classroom.length; i++) if (P.classroom[i].id === id) return P.classroom[i]; return null; }
  function sharedPosters() { return P.classroom.filter(function (p) { return !p.subject; }); }
  function subjectPosters(filter) { return P.classroom.filter(function (p) { return p.subject && (!filter || filter(p)); }); }
  function subjectTile(p) { return tile(classroomHref(p), classroomPoster(p), p.title, p.subject + " · subject example"); }
  function tile(href, inner, cap, sub) {
    return '<a class="poster-tile" href="' + href + '">' + frame(inner, "thumb") + '<span class="tile-cap">' + esc(cap) + "</span>" + (sub ? '<span class="tile-sub">' + esc(sub) + "</span>" : "") + "</a>";
  }

  function renderPosterGallery(q) {
    var set = q.get("set") === "staff" ? "staff" : q.get("set") === "subject" ? "subject" : "classroom";
    var h = '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/resources">Resources</a> › Posters</nav></div>' +
      '<section class="hero" style="margin-top:12px"><div class="wrap"><div class="kicker">Resources</div><h1>Posters</h1>' +
      '<p class="lead"><strong>Classroom posters</strong> show the shared practices in student language, the same design in every room. <strong>Staff guides</strong> give each target on one page: what it looks like, the routines, the ideas and what every subject does.</p></div></section>';
    h += '<section class="section"><div class="wrap"><div class="tabs">' +
      '<a class="tab" aria-selected="' + (set === "classroom") + '" href="#/posters?set=classroom">Classroom posters (' + sharedPosters().length + ")</a>" +
      '<a class="tab" aria-selected="' + (set === "subject") + '" href="#/posters?set=subject">Subject examples (' + subjectPosters().length + ")</a>" +
      '<a class="tab" aria-selected="' + (set === "staff") + '" href="#/posters?set=staff">Staff guides (' + staffList().length + ")</a></div>";
    if (set === "subject") {
      h += '<p class="section-intro">A shared practice applied in one subject and year level, with that subject’s own language and examples. Each sits beside the general poster for the same practice.</p><div class="subject-examples">' +
        subjectPosters().map(function (p) {
          var shared = posterById(p.routine), t = p.target.split(".");
          return '<div class="card subject-example"><div class="poster-row pair">' + subjectTile(p) + (shared ? tile(classroomHref(shared), classroomPoster(shared), shared.title, "Shared practice (all subjects)") : "") + "</div>" +
            '<p class="small" style="margin:10px 0 0"><a href="' + targetHref(t[0], t[1], t[2]) + '">Open the target this supports →</a></p></div>';
        }).join("") + "</div>";
    } else if (set === "classroom") {
      ["literacy", "numeracy"].forEach(function (a) {
        h += "<h2>" + esc(C[a].name) + ' practices</h2><div class="poster-grid">' + sharedPosters().filter(function (p) { return p.area === a; }).map(function (p) {
          var R = C.routines[p.routine];
          return tile(classroomHref(p), classroomPoster(p), p.title, R ? R.stages.map(function (x) { return stage(x).name; }).join(", ") : "");
        }).join("") + "</div>";
      });
    } else {
      ["literacy", "numeracy"].forEach(function (a) {
        var A = C[a];
        h += "<h2>" + esc(A.name) + ' staff guides</h2><div class="staff-gallery"><div></div>' + A.domains.map(function (d) { return '<div class="sg-head">' + esc(d.name) + "</div>"; }).join("");
        C.stages.forEach(function (s) {
          h += '<div class="sg-stage stage-' + s.id + '"><b>' + esc(s.name) + "</b><span>" + esc(s.years) + "</span></div>";
          A.domains.forEach(function (d) { h += tile(staffHref(a, s.id, d.id), staffPoster(A, s, d), d.name + " · " + s.name); });
        });
        h += "</div>";
      });
    }
    h += "</div></section>";
    page("resources", "Posters", h);
    fitPosters();
  }

  function posterToolbar(prev, next, title, pdf, back) {
    return '<div class="poster-toolbar">' +
      '<span>' + (prev ? '<a class="btn btn-outline" href="' + prev + '">← Previous</a>' : "") + "</span>" +
      '<span class="pt-actions"><button type="button" class="btn btn-solid" data-print>Print</button>' +
      '<a class="btn btn-outline" href="' + pdf + '" download>Download PDF</a>' + back + "</span>" +
      "<span>" + (next ? '<a class="btn btn-outline" href="' + next + '">Next →</a>' : "") + "</span></div>";
  }
  function afterPoster() {
    document.body.classList.add("poster-view");
    var b = main.querySelector("[data-print]");
    if (b) b.addEventListener("click", function () { window.print(); });
    fitPosters();
  }

  function renderClassroomPoster(id) {
    var p = posterById(id);
    if (!p) return renderNotFound();
    var list = p.subject ? subjectPosters() : sharedPosters();
    var i = list.indexOf(p), prev = list[i - 1], next = list[i + 1];
    var h = '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/resources">Resources</a> › ' +
      (p.subject ? '<a href="#/posters?set=subject">Subject examples</a>' : '<a href="#/posters?set=classroom">Classroom posters</a>') + " › " + esc(p.title) + "</nav>" +
      posterToolbar(prev && classroomHref(prev), next && classroomHref(next), p.title, classroomPdf(p), '<a class="btn btn-outline" href="#/routine/' + p.routine + '">How the routine works</a>') +
      '<div class="poster-stage">' + frame(classroomPoster(p)) + "</div></div>";
    page("resources", p.title + " poster", h);
    afterPoster();
  }

  function renderStaffPoster(a, sId, dId) {
    var A = C[a], s = stage(sId), d = A && domain(A, dId);
    if (!s || !d) return renderNotFound();
    var list = staffList(), i = -1;
    list.forEach(function (x, k) { if (x.A.id === a && x.s.id === sId && x.d.id === dId) i = k; });
    var prev = list[i - 1], next = list[i + 1];
    var h = '<div class="wrap"><nav class="crumbs" aria-label="Breadcrumb"><a href="#/resources">Resources</a> › <a href="#/posters?set=staff">Staff guides</a> › ' + esc(A.name + " · " + s.name + " · " + d.name) + "</nav>" +
      posterToolbar(prev && staffHref(prev.A.id, prev.s.id, prev.d.id), next && staffHref(next.A.id, next.s.id, next.d.id), "", staffPdf(a, sId, dId), '<a class="btn btn-outline" href="' + targetHref(a, sId, dId) + '">Open the full guide</a>') +
      '<div class="poster-stage">' + frame(staffPoster(A, s, d)) + "</div></div>";
    page("resources", s.name + " " + d.name + " staff guide", h);
    afterPoster();
  }

  function renderNotFound() {
    page("", "Not found", '<div class="wrap empty"><h1>Page not found</h1><p><a href="#/">Back to home</a></p></div>');
  }

  /* ---------- router ---------- */
  var FRAMEWORK_ANCHORS = ["layers", "stages", "areas", "why", "documents", "tier2", "data-tracking", "roles", "next-steps", "questions"];
  function redirectFor(parts, q, anchor) {
    var a = anchor ? "#" + anchor : "";
    if (parts[0] === "overview") return "#/framework" + (anchor === "posters-preview" ? "" : a).replace(/^$/, "");
    if (parts[0] === "implementation") {
      if (anchor && FRAMEWORK_ANCHORS.indexOf(anchor) >= 0) return "#/framework" + a;
      var keep = [];
      if (q.get("area")) keep.push("area=" + q.get("area"));
      if (q.get("by")) keep.push("by=" + q.get("by"));
      return "#/resources" + (keep.length ? "?" + keep.join("&") : "") + a;
    }
    if ((parts[0] === "literacy" || parts[0] === "numeracy") && parts.length === 1) {
      var v = q.get("view");
      if (v && subject(v)) return "#/subject/" + v + "#" + parts[0];
      if (v === "method") return "#/" + parts[0] + "#teach";
      if (v === "routines") return "#/resources?by=" + parts[0] + "#by-target";
      if (anchor === "classroom-posters") return "#/posters?set=classroom";
    }
    return null;
  }

  function route() {
    var raw = location.hash.replace(/^#\/?/, "");
    var anchor = null;
    var hi = raw.indexOf("#");
    if (hi >= 0) { anchor = raw.slice(hi + 1); raw = raw.slice(0, hi); }
    var qi = raw.indexOf("?");
    var path = qi >= 0 ? raw.slice(0, qi) : raw;
    var qs = qi >= 0 ? raw.slice(qi + 1) : "";
    var q = new URLSearchParams(qs);
    var parts = path.split("/").filter(Boolean);
    var samePath = path === lastPath;

    // Old addresses (before the site was reorganised) are sent to their new home.
    var moved = redirectFor(parts, q, anchor);
    if (moved) { location.replace(moved); return; }

    document.body.classList.remove("poster-view");
    try {
      if (parts.length === 0) renderHome();
      else if (parts[0] === "framework") renderFramework();
      else if (parts[0] === "subjects") renderSubjects();
      else if (parts[0] === "subject" && parts[1]) renderSubject(parts[1]);
      else if (parts[0] === "resources") renderResources(q);
      else if (parts[0] === "posters") renderPosterGallery(q);
      else if (parts[0] === "poster" && parts[1] === "classroom" && parts[2]) renderClassroomPoster(parts[2]);
      else if (parts[0] === "poster" && parts[1] === "staff" && parts.length === 5) renderStaffPoster(parts[2], parts[3], parts[4]);
      else if ((parts[0] === "literacy" || parts[0] === "numeracy") && parts.length === 1) renderArea(parts[0], q);
      else if ((parts[0] === "literacy" || parts[0] === "numeracy") && parts.length === 3) renderTarget(parts[0], parts[1], parts[2], q);
      else if (parts[0] === "progressions") renderProgressions(q);
      else if (parts[0] === "routine" && parts[1]) renderRoutine(parts[1]);
      else if (parts[0] === "move" && parts[1]) renderMove(parts[1]);
      else renderNotFound();
    } catch (err) {
      console.error(err);
      main.innerHTML = '<div class="wrap empty"><h1>Something went wrong</h1><p>' + esc(err.message) + '</p><p><a href="#/">Back to home</a></p></div>';
    }

    if (anchor) scrollToId(anchor);
    else if (!samePath && !q.get("tab") && !q.get("sub")) window.scrollTo(0, 0);
    if (!samePath) main.focus({ preventScroll: true });
    lastPath = path;
  }

  if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  window.addEventListener("hashchange", route);
  route();
})();
