# DLQ Trainer — ติวสอบคอม 13 โมดูล
Static site (no build step): open `index.html`.
- `index.html` structure · `css/style.css` base theme · `css/exam.css` practice/exam UI
- `js/helpers.js` renderers + SVG · `js/modules.js` content + post-lesson quiz data · `js/app.js` routing/quiz
- `js/data/bank.js` extra question bank · `js/exam.js` practice, timed exam (150 q / 180 min), module tabs
- `tools/import_docs.py` Markdown practice sets → `js/data/bank.js`

## Question bank
- Built-in: 68 module questions (`js/modules.js`) + 296 image questions from the guide PDF (`js/data/bank-pdf.js`, images in `img/pdf/`).
- Add text questions: `python3 tools/import_docs.py set1.md set2.md > js/data/bank.js`.

## Publish
```
git remote add origin https://github.com/<user>/<repo>.git
git push -u origin main   # then Settings > Pages > Source: GitHub Actions
```
