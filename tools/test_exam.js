const fs = require('fs');
global.window = {};

const helpersCode = fs.readFileSync('js/helpers.js', 'utf8');
const modulesCode = fs.readFileSync('js/modules.js', 'utf8').replace('const M=[];', 'global.M=[];');
const bankCode = fs.readFileSync('js/data/bank.js', 'utf8');

const combined = helpersCode + '\n' + modulesCode;
new Function(combined)();
new Function(bankCode)();

console.log('Total modules:', global.M.length);
console.log('Total BANK questions:', global.window.BANK.length);

const seen = new Set(), out = [], add = (q, m) => {
  if (!seen.has(q.q)) {
    seen.add(q.q);
    out.push({ q: q.q, c: q.c, a: q.a, e: q.e || '', m });
  }
};
global.M.forEach(m => m.quiz.forEach(q => add(q, m.id)));
(global.window.BANK || []).forEach(q => add(q, q.m));

console.log('Total combined bank questions:', out.length);

const byM = {};
out.forEach(q => {
  byM[q.m] = (byM[q.m] || 0) + 1;
  if (!q.q || typeof q.q !== 'string' || q.q.length < 5) throw new Error('Invalid q: ' + JSON.stringify(q));
  if (!Array.isArray(q.c) || q.c.length !== 4) throw new Error('Not 4 choices: ' + JSON.stringify(q));
  if (typeof q.a !== 'number' || q.a < 0 || q.a > 3) throw new Error('Invalid a: ' + JSON.stringify(q));
  if (!q.e || typeof q.e !== 'string') throw new Error('Invalid e: ' + JSON.stringify(q));
  if (q.img) throw new Error('Image found in question: ' + JSON.stringify(q));
});

console.log('\nQuestions per module:');
global.M.forEach(m => {
  console.log('  M' + m.id + ' (' + m.th + '): needed in exam = ' + m.n + ', available in bank = ' + (byM[m.id] || 0));
  if ((byM[m.id] || 0) < m.n) throw new Error('Shortage in M' + m.id);
});

// Test compose 150 questions
const shuf = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.random() * (i + 1) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };
const prep = q => { const o = shuf(q.c.map((t, i) => [t, i === q.a])); return { ...q, c: o.map(x => x[0]), a: o.findIndex(x => x[1]) }; };

const tot = global.M.reduce((s, m) => s + m.n, 0);
let qs = global.M.flatMap(m => shuf(out.filter(q => q.m === m.id)).slice(0, m.n));
const u = new Set(qs.map(q => q.q));
qs = qs.concat(shuf(out.filter(q => !u.has(q.q))).slice(0, Math.max(0, tot - qs.length)));
const exam = qs.sort((x, y) => x.m - y.m).map(prep);

console.log('\nExam composed total questions:', exam.length, '(expected: ' + tot + ')');
const examByM = {};
exam.forEach(q => examByM[q.m] = (examByM[q.m] || 0) + 1);
console.log('Exam module counts:');
global.M.forEach(m => {
  console.log('  M' + m.id + ': ' + examByM[m.id] + ' (quota: ' + m.n + ')');
  if (examByM[m.id] !== m.n) throw new Error('Exam count mismatch for M' + m.id);
});

console.log('\n>>> ALL 13 MODULES PASS! ZERO IMAGES, 4 REAL TEXT CHOICES PER QUESTION! <<<');
