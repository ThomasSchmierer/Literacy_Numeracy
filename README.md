# TGS Literacy and Numeracy Framework — web app

A static website for the Toowoomba Grammar School Literacy and Numeracy Framework. It has five sections: Overview, Literacy, Numeracy, Progressions and Implementation. Every cell in the literacy and numeracy grids opens a classroom guide for that target.

There is no build step and nothing to install. It is plain HTML, CSS and JavaScript, so it runs on GitHub Pages as is, or straight from the folder.

## Files

| File | What it is | Edit it? |
|---|---|---|
| `index.html` | The page shell (header, navigation, footer) | Rarely |
| `styles.css` | All styling. Stage colours are at the top. | For look and feel |
| `app.js` | Pages, grids, routing | For layout changes |
| `audit.js` | Audit mode: flagging, the audit list, export and import | Rarely |
| `data/content.js` | **All the words:** targets, stage focus, lead methods, subject strategies, classroom ideas, routines, roles, next steps | **Yes, this is where content changes go** |
| `data/workbook.js` | Curriculum codes and subject evidence, **generated from the Excel workbook** | No. Regenerate it instead. |
| `tools/build-workbook-data.ps1` | Regenerates `data/workbook.js` from `Literacy Numeracy Progressions Alignment.xlsx` | Run after changing the workbook |
| `data/posters.js` | Classroom poster wording (student language) | Yes |
| `posters/` | Generated A4 PDFs of every poster | No. Rebuild with `tools/build-posters.ps1` |
| `tools/build-posters.ps1` | Renders every poster to PDF using Microsoft Edge | Run after content changes |
| `tools/serve.ps1` | Local preview server | — |

## Changing content

- **Wording of a target, method or subject strategy:** edit `data/content.js`. Text can use `**bold**` and `*italic*`. Inside a text string, use curly quotes “like this” rather than straight double quotes.
- **Curriculum codes or subject evidence:** change the Excel workbook, then run this from the app folder:

  ```
  powershell -ExecutionPolicy Bypass -File tools\build-workbook-data.ps1
  ```

  By default it reads the workbook from the folder one level up. The workbook can be open in Excel while you run it.

## Navigation

- **Home** (`#/`) is the landing page: a site map of every section and its parts, a "Find a target" picker, and shortcuts by subject.
- Each section (Overview, Literacy, Numeracy, Progressions, Implementation) has a **secondary bar** under the header listing its parts. It's defined once in `subnavItems()` in `app.js`, and the Home site map is built from the same list, so the two always match.

## Teaching moves

Six moves recur across every routine and classroom idea: **Model**, **Talk and listen**, **Practise**, **Write**, **Shared words** and **Check**. Each has a symbol that appears beside every routine and idea, on the guide pages and on the posters. Each move has its own page listing everywhere it's used.

They're defined in `data/content.js` under `moves`. Routines are tagged in `routineMoves` (by routine id), and classroom ideas in `ideaMoves` (by idea title). **If you rename a classroom idea, rename it in `ideaMoves` too**, or it will lose its symbols.

## Posters

Under **Implementation → Posters** there are two sets. Each poster is viewable in the app, can be printed from its page, and has a ready-made A4 PDF:

- **Classroom posters** (`data/posters.js`): one per shared practice, written in student language, all in the same design. Edit the wording in `data/posters.js`.
- **Subject examples** (also in `data/posters.js`, marked with `subject`): a shared practice applied in one subject and year level. They replace the original three infographics: Year 9 Science report writing, Year 7 Geography reading for meaning, and Year 5 Design and Technologies measurement. More can be added the same way.
- **Staff guides**: one per target (24). They are built automatically from `data/content.js`, so changing a target, idea or subject strategy updates its staff guide too.

The PDFs in `posters/` are generated, not edited by hand. After changing poster or target content, rebuild them (this needs Microsoft Edge, which comes with Windows):

```
powershell -ExecutionPolicy Bypass -File tools\build-posters.ps1
```

## Audit mode

For reviewing the site. Click **Audit mode** at the bottom of any page to show the audit bar:

- **Flag an item:** click it, then click any part of a page (a grid cell, a classroom idea, a heading, a table row). A form opens with the location and the current text filled in. Add the problem or recommendation, a suggested change, a type and a priority.
- **Note on this page:** a note about the page as a whole.
- **Audit list:** the hidden list of every note, with filters (Open, Resolved, All), and options to go to the page, edit a note, mark it resolved or delete it.
- **Export report (.md):** a structured report grouped by page, ready to review. **Export data (.json)** keeps the full list so it can be imported into another browser, for example to combine notes from several reviewers with **Import**.

Notes are saved in the browser you are using only. They are not sent anywhere and other people can't see them, so export the list to keep it or pass it on.

## Preview on your computer

Double-click `index.html`; it works straight from the folder. Or run the local server and open http://localhost:8080:

```
powershell -ExecutionPolicy Bypass -File tools\serve.ps1
```

## Publish on GitHub Pages (no Git needed)

1. Sign in at github.com and create a new repository (for example `tgs-literacy-numeracy`).
2. On the new repository's page, choose **uploading an existing file**. Drag in **everything inside this folder**: `index.html`, `styles.css`, `app.js`, `audit.js`, `README.md`, `.nojekyll`, and the `data`, `posters` and `tools` folders. Then **Commit changes**. (`.nojekyll` is a hidden file; if Windows hides it, it can be skipped.)
3. Go to **Settings → Pages**. Under *Build and deployment*, set **Source: Deploy from a branch**, **Branch: main**, folder **/ (root)**, then **Save**.
4. After a minute or two the site is live at `https://<your-username>.github.io/tgs-literacy-numeracy/`.

To update the site later, upload the changed files the same way. GitHub replaces files that have the same name.

**Visibility:** on a free GitHub account, Pages sites are public, so anyone with the link can read the site. The content is a draft framework for internal review. If it shouldn't be public yet, use a GitHub plan that supports private Pages, or keep sharing it as a folder until it's approved.
