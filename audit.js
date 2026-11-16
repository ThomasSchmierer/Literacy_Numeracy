/* Self-audit mode: flag any item on the site, record a problem or recommendation,
   review the list, and export it (Markdown report or JSON data).
   Notes are stored in this browser only (localStorage), so export to keep or share them. */
(function () {
  "use strict";

  var KEY_ITEMS = "tgsAudit.items.v1";
  var KEY_MODE = "tgsAudit.mode";
  var KEY_NAME = "tgsAudit.reviewer";
  var TYPES = [
    "Content is wrong",
    "Unclear or hard to use",
    "Something is missing",
    "Misaligned with Framework or curriculum",
    "Recommendation"
  ];
  var PRIORITIES = ["High", "Medium", "Low"];
  var BLOCKS = "td, li, .idea, .example, .stage-card, .tier, .routine-card, .chip, p, h1, h2, h3, h4, .card, section";

  /* ---------- storage (falls back to memory if the browser blocks it) ---------- */
  var memory = {};
  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v == null ? fallback : JSON.parse(v); }
    catch (e) { return key in memory ? memory[key] : fallback; }
  }
  function save(key, value) {
    memory[key] = value;
    try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch (e) { return false; }
  }

  var items = load(KEY_ITEMS, []);
  var mode = !!load(KEY_MODE, false);
  var picking = false;
  var hovered = null;
  var filter = "open";

  /* ---------- helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function uid() { return "a" + Date.now().toString(36) + Math.random().toString(36).slice(2, 7); }
  function route() { return location.hash || "#/"; }
  function pageName() { return document.title.split(" — ")[0]; }
  function clean(t, n) { t = String(t || "").replace(/\s+/g, " ").trim(); return n && t.length > n ? t.slice(0, n - 1) + "…" : t; }
  function today() { var d = new Date(); return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2); }
  function fmtDate(iso) { try { return new Date(iso).toLocaleString("en-AU", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" }); } catch (e) { return iso; } }
  function persist() {
    var ok = save(KEY_ITEMS, items);
    var warn = document.getElementById("audit-storage-warn");
    if (warn) warn.hidden = ok;
    refreshCounts();
  }
  function el(html) { var d = document.createElement("div"); d.innerHTML = html.trim(); return d.firstChild; }

  function describe(block) {
    var explicit = block.closest("[data-audit]");
    var parts = [pageName()];
    if (explicit) return explicit.getAttribute("data-audit");
    var container = block.closest(".card, .target-hero, .hero, section");
    var heading = container && container.querySelector("h1, h2, h3");
    if (heading && heading !== block) parts.push(clean(heading.textContent, 80));
    var idea = block.closest(".idea, .routine-card, .tier");
    if (idea) { var t = idea.querySelector("h3, h4, b"); if (t) parts.push(clean(t.textContent, 80)); }
    var tr = block.closest("tr");
    if (tr && tr.cells && tr.cells[0] && tr.cells[0] !== block) parts.push(clean(tr.cells[0].textContent, 60));
    if (block.matches("h1, h2, h3, h4")) parts.push(clean(block.textContent, 80));
    return parts.filter(function (p, i) { return p && parts.indexOf(p) === i; }).join(" › ");
  }

  /* ---------- UI scaffolding ---------- */
  var toggle = el('<button type="button" class="audit-toggle" aria-pressed="false">Audit mode</button>');
  var bar = el(
    '<div class="audit-bar" role="region" aria-label="Audit tools" hidden>' +
      '<span class="audit-bar-title">Audit mode</span>' +
      '<span class="audit-status" aria-live="polite"></span>' +
      '<button type="button" class="audit-btn primary" data-act="pick">Flag an item</button>' +
      '<button type="button" class="audit-btn" data-act="page">Note on this page</button>' +
      '<button type="button" class="audit-btn" data-act="list">Audit list <span class="audit-count">0</span></button>' +
      '<button type="button" class="audit-btn ghost" data-act="exit">Exit</button>' +
    "</div>"
  );
  var drawer = el(
    '<aside class="audit-drawer" aria-label="Audit list" hidden>' +
      '<div class="audit-drawer-head"><h2>Audit list</h2><button type="button" class="audit-x" data-act="close" aria-label="Close">×</button></div>' +
      '<p class="audit-storage" id="audit-storage-warn" hidden>This browser is not saving notes between visits. Export before closing the page.</p>' +
      '<div class="audit-filter" role="tablist"></div>' +
      '<div class="audit-items"></div>' +
      '<div class="audit-drawer-foot">' +
        '<p class="audit-hint">Notes are saved in this browser only. Export the list to keep it or pass it on.</p>' +
        '<div class="audit-actions">' +
          '<button type="button" class="audit-btn primary" data-act="export-md">Export report (.md)</button>' +
          '<button type="button" class="audit-btn" data-act="export-json">Export data (.json)</button>' +
          '<button type="button" class="audit-btn" data-act="copy">Copy report</button>' +
          '<button type="button" class="audit-btn" data-act="import">Import…</button>' +
          '<button type="button" class="audit-btn danger" data-act="clear">Clear all</button>' +
          '<input type="file" accept=".json,application/json" class="audit-file" hidden>' +
        "</div>" +
      "</div>" +
    "</aside>"
  );
  var dialog = el(
    '<div class="audit-modal" role="dialog" aria-modal="true" aria-labelledby="audit-dlg-title" hidden>' +
      '<form class="audit-dialog">' +
        '<h2 id="audit-dlg-title">Flag an item</h2>' +
        '<div class="audit-field"><span class="audit-label">Location</span><div class="audit-loc"></div></div>' +
        '<details class="audit-field audit-excerpt-wrap"><summary>What it currently says</summary><blockquote class="audit-excerpt"></blockquote></details>' +
        '<div class="audit-row">' +
          '<label class="audit-field"><span class="audit-label">Type</span><select name="type">' + TYPES.map(function (t) { return "<option>" + esc(t) + "</option>"; }).join("") + "</select></label>" +
          '<label class="audit-field"><span class="audit-label">Priority</span><select name="priority">' + PRIORITIES.map(function (p) { return "<option" + (p === "Medium" ? " selected" : "") + ">" + p + "</option>"; }).join("") + "</select></label>" +
        "</div>" +
        '<label class="audit-field"><span class="audit-label">Problem or recommendation <em>(required)</em></span><textarea name="note" rows="4" required></textarea></label>' +
        '<label class="audit-field"><span class="audit-label">Suggested change <em>(optional)</em></span><textarea name="suggestion" rows="3"></textarea></label>' +
        '<label class="audit-field"><span class="audit-label">Your name <em>(optional)</em></span><input name="reviewer" type="text" autocomplete="name"></label>' +
        '<div class="audit-dialog-actions"><button type="button" class="audit-btn ghost" data-act="cancel">Cancel</button><button type="submit" class="audit-btn primary">Save note</button></div>' +
      "</form>" +
    "</div>"
  );

  function mount() {
    var footer = document.querySelector(".site-footer .wrap");
    if (footer) footer.appendChild(toggle);
    document.body.appendChild(bar);
    document.body.appendChild(drawer);
    document.body.appendChild(dialog);
    setMode(mode);
    refreshCounts();
  }

  /* ---------- mode ---------- */
  function setMode(on) {
    mode = on;
    save(KEY_MODE, on);
    document.body.classList.toggle("audit-on", on);
    bar.hidden = !on;
    toggle.setAttribute("aria-pressed", String(on));
    toggle.textContent = on ? "Audit mode: on" : "Audit mode";
    if (!on) { stopPicking(); drawer.hidden = true; }
  }

  function startPicking() {
    picking = true;
    document.body.classList.add("audit-picking");
    status("Click the item you want to flag. Press Esc to cancel.");
  }
  function stopPicking() {
    picking = false;
    document.body.classList.remove("audit-picking");
    if (hovered) hovered.classList.remove("audit-hover");
    hovered = null;
    status("");
  }
  function status(t) { var s = bar.querySelector(".audit-status"); s.textContent = t || pageCountText(); }
  function pageCountText() {
    var n = items.filter(function (i) { return i.route === route(); }).length;
    return n ? n + (n === 1 ? " note" : " notes") + " on this page" : "";
  }
  function refreshCounts() {
    var open = items.filter(function (i) { return i.status !== "Resolved"; }).length;
    bar.querySelector(".audit-count").textContent = open;
    if (!picking) status("");
    if (!drawer.hidden) renderList();
  }

  function blockFor(target) {
    var main = document.getElementById("main");
    if (!main || !main.contains(target)) return null;
    var b = target.closest(BLOCKS);
    return b && main.contains(b) ? b : null;
  }

  document.addEventListener("mouseover", function (e) {
    if (!picking) return;
    var b = blockFor(e.target);
    if (b === hovered) return;
    if (hovered) hovered.classList.remove("audit-hover");
    hovered = b;
    if (b) b.classList.add("audit-hover");
  });

  document.addEventListener("click", function (e) {
    if (!picking) return;
    if (bar.contains(e.target)) return;
    var b = blockFor(e.target);
    e.preventDefault();
    e.stopPropagation();
    if (!b) { status("That isn't part of the page content. Click an item in the page, or press Esc."); return; }
    stopPicking();
    var copy = b.cloneNode(true);
    Array.prototype.forEach.call(copy.querySelectorAll(".go, button, .note-btn"), function (n) { n.remove(); });
    openDialog({ location: describe(b), excerpt: clean(copy.textContent, 600) });
  }, true);

  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    if (!dialog.hidden) closeDialog();
    else if (picking) stopPicking();
    else if (!drawer.hidden) drawer.hidden = true;
  });

  window.addEventListener("hashchange", function () { if (mode) { stopPicking(); status(""); } });

  /* ---------- dialog ---------- */
  var editing = null;
  var draft = null;
  function openDialog(ctx, existing) {
    editing = existing || null;
    draft = ctx;
    var f = dialog.querySelector("form");
    dialog.querySelector("#audit-dlg-title").textContent = existing ? "Edit note" : "Flag an item";
    dialog.querySelector(".audit-loc").textContent = ctx.location + "  (" + (existing ? existing.route : route()) + ")";
    var ex = dialog.querySelector(".audit-excerpt-wrap");
    ex.hidden = !ctx.excerpt;
    dialog.querySelector(".audit-excerpt").textContent = ctx.excerpt || "";
    f.type.value = existing ? existing.type : TYPES[0];
    f.priority.value = existing ? existing.priority : "Medium";
    f.note.value = existing ? existing.note : "";
    f.suggestion.value = existing ? existing.suggestion : "";
    f.reviewer.value = existing ? existing.reviewer : load(KEY_NAME, "");
    dialog.hidden = false;
    setTimeout(function () { f.note.focus(); }, 20);
  }
  function closeDialog() { dialog.hidden = true; editing = null; draft = null; }

  dialog.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target;
    var note = f.note.value.trim();
    if (!note) { f.note.focus(); return; }
    save(KEY_NAME, f.reviewer.value.trim());
    if (editing) {
      editing.type = f.type.value; editing.priority = f.priority.value; editing.note = note;
      editing.suggestion = f.suggestion.value.trim(); editing.reviewer = f.reviewer.value.trim();
      editing.updated = new Date().toISOString();
    } else {
      items.push({
        id: uid(), created: new Date().toISOString(), status: "Open",
        route: route(), page: pageName(), location: draft.location, excerpt: draft.excerpt || "",
        type: f.type.value, priority: f.priority.value, note: note,
        suggestion: f.suggestion.value.trim(), reviewer: f.reviewer.value.trim()
      });
    }
    persist();
    closeDialog();
    status("Note saved.");
    setTimeout(function () { status(""); }, 2500);
  });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || (e.target.getAttribute && e.target.getAttribute("data-act") === "cancel")) closeDialog();
  });

  /* ---------- list drawer ---------- */
  function renderList() {
    var counts = { all: items.length, open: 0, resolved: 0 };
    items.forEach(function (i) { if (i.status === "Resolved") counts.resolved++; else counts.open++; });
    drawer.querySelector(".audit-filter").innerHTML = [["open", "Open"], ["resolved", "Resolved"], ["all", "All"]].map(function (f) {
      return '<button type="button" class="tab" role="tab" data-filter="' + f[0] + '" aria-selected="' + (filter === f[0]) + '">' + f[1] + " (" + counts[f[0]] + ")</button>";
    }).join("");
    var shown = items.filter(function (i) {
      return filter === "all" || (filter === "resolved" ? i.status === "Resolved" : i.status !== "Resolved");
    }).slice().sort(function (a, b) {
      return PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority) || (a.created < b.created ? 1 : -1);
    });
    var box = drawer.querySelector(".audit-items");
    if (!shown.length) { box.innerHTML = '<p class="audit-empty">' + (items.length ? "Nothing in this view." : "No notes yet. Use <strong>Flag an item</strong> to add one.") + "</p>"; return; }
    box.innerHTML = shown.map(function (i) {
      return '<article class="audit-item' + (i.status === "Resolved" ? " resolved" : "") + '" data-id="' + i.id + '">' +
        '<div class="audit-item-meta"><span class="audit-pri p-' + esc(i.priority).toLowerCase() + '">' + esc(i.priority) + '</span><span class="audit-type">' + esc(i.type) + "</span></div>" +
        '<div class="audit-item-loc">' + esc(i.location) + "</div>" +
        '<p class="audit-item-note">' + esc(i.note) + "</p>" +
        (i.suggestion ? '<p class="audit-item-sugg"><strong>Suggested:</strong> ' + esc(i.suggestion) + "</p>" : "") +
        (i.excerpt ? '<details><summary>What it said</summary><blockquote>' + esc(i.excerpt) + "</blockquote></details>" : "") +
        '<div class="audit-item-by">' + (i.reviewer ? esc(i.reviewer) + " · " : "") + esc(fmtDate(i.created)) + "</div>" +
        '<div class="audit-item-actions">' +
          '<button type="button" data-item="go">Go to page</button>' +
          '<button type="button" data-item="edit">Edit</button>' +
          '<button type="button" data-item="toggle">' + (i.status === "Resolved" ? "Reopen" : "Mark resolved") + "</button>" +
          '<button type="button" data-item="delete" class="danger">Delete</button>' +
        "</div></article>";
    }).join("");
  }

  drawer.addEventListener("click", function (e) {
    var t = e.target;
    if (t.getAttribute("data-filter")) { filter = t.getAttribute("data-filter"); renderList(); return; }
    var act = t.getAttribute("data-act");
    if (act === "close") { drawer.hidden = true; return; }
    if (act === "export-md") return download("framework-audit-" + today() + ".md", toMarkdown(), "text/markdown");
    if (act === "export-json") return download("framework-audit-" + today() + ".json", JSON.stringify({ exported: new Date().toISOString(), items: items }, null, 2), "application/json");
    if (act === "copy") return copyText(toMarkdown(), t);
    if (act === "import") return drawer.querySelector(".audit-file").click();
    if (act === "clear") {
      if (!items.length) return;
      if (confirm("Delete all " + items.length + " notes from this browser? Export first if you want to keep them. This can't be undone.")) { items = []; persist(); }
      return;
    }
    var itemAct = t.getAttribute("data-item");
    if (!itemAct) return;
    var art = t.closest(".audit-item");
    var item = items.filter(function (i) { return i.id === art.getAttribute("data-id"); })[0];
    if (!item) return;
    if (itemAct === "go") { drawer.hidden = true; location.hash = item.route; }
    else if (itemAct === "edit") openDialog({ location: item.location, excerpt: item.excerpt }, item);
    else if (itemAct === "toggle") { item.status = item.status === "Resolved" ? "Open" : "Resolved"; persist(); }
    else if (itemAct === "delete" && confirm("Delete this note?")) { items = items.filter(function (i) { return i !== item; }); persist(); }
  });

  drawer.querySelector(".audit-file").addEventListener("change", function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var data = JSON.parse(reader.result);
        var incoming = Array.isArray(data) ? data : data.items;
        if (!Array.isArray(incoming)) throw new Error("No notes found in that file.");
        var known = {};
        items.forEach(function (i) { known[i.id] = true; });
        var added = 0;
        incoming.forEach(function (i) { if (i && i.id && i.note && !known[i.id]) { items.push(i); added++; } });
        persist();
        alert(added + " note" + (added === 1 ? "" : "s") + " imported. " + (incoming.length - added) + " already in the list.");
      } catch (err) {
        alert("That file couldn't be imported: " + err.message);
      }
      e.target.value = "";
    };
    reader.readAsText(file);
  });

  /* ---------- export ---------- */
  function toMarkdown() {
    var site = location.href.split("#")[0];
    var open = items.filter(function (i) { return i.status !== "Resolved"; });
    var lines = [
      "# TGS Literacy and Numeracy Framework — audit report",
      "",
      "- Exported: " + fmtDate(new Date().toISOString()),
      "- Site: " + site,
      "- Notes: " + items.length + " (" + open.length + " open, " + (items.length - open.length) + " resolved)",
      "- Priority: " + PRIORITIES.map(function (p) { return p + " " + items.filter(function (i) { return i.priority === p; }).length; }).join(", "),
      ""
    ];
    var pages = [];
    items.forEach(function (i) { if (pages.indexOf(i.route) < 0) pages.push(i.route); });
    pages.forEach(function (r) {
      var group = items.filter(function (i) { return i.route === r; }).sort(function (a, b) { return PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority); });
      lines.push("## " + (group[0].page || "Page") + " — `" + r + "`", "");
      group.forEach(function (i, n) {
        lines.push("### " + (n + 1) + ". " + i.type + " (" + i.priority + (i.status === "Resolved" ? ", resolved" : "") + ")");
        lines.push("");
        lines.push("- **Location:** " + i.location);
        lines.push("- **Problem or recommendation:** " + i.note.replace(/\n+/g, " "));
        if (i.suggestion) lines.push("- **Suggested change:** " + i.suggestion.replace(/\n+/g, " "));
        if (i.excerpt) lines.push("- **What the page said:** “" + i.excerpt + "”");
        lines.push("- **Reviewer:** " + (i.reviewer || "not given") + " · " + fmtDate(i.created));
        lines.push("- **Note ID:** " + i.id);
        lines.push("");
      });
    });
    if (!items.length) lines.push("_No notes recorded._");
    return lines.join("\n");
  }

  function download(name, text, type) {
    var blob = new Blob([text], { type: type + ";charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 500);
  }

  function copyText(text, btn) {
    var done = function () { var o = btn.textContent; btn.textContent = "Copied"; setTimeout(function () { btn.textContent = o; }, 1800); };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, function () { fallbackCopy(text); done(); });
    } else { fallbackCopy(text); done(); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    ta.remove();
  }

  /* ---------- wiring ---------- */
  toggle.addEventListener("click", function () { setMode(!mode); });
  bar.addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]");
    if (!act) return;
    act = act.getAttribute("data-act");
    if (act === "pick") { if (picking) stopPicking(); else startPicking(); }
    else if (act === "page") openDialog({ location: pageName() + " › whole page", excerpt: "" });
    else if (act === "list") { drawer.hidden = !drawer.hidden; if (!drawer.hidden) renderList(); }
    else if (act === "exit") setMode(false);
  });

  // Testing hook (kept generic): lets a page script read the current list.
  window.TGSAudit = { list: function () { return items.slice(); }, report: toMarkdown };

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount); else mount();
})();
