/* Practice mode, 150-question timed exam simulator, module tabs (content | post-lesson quiz) */
(()=>{
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)],A=()=>document.getElementById('app'),L='abcd',ST='dlq_exam';
const shuf=a=>{a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const fmt=s=>String(s/60|0).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
const ld=()=>{try{return JSON.parse(localStorage.getItem(ST))}catch(e){return null}};
const sv=s=>{try{s?localStorage.setItem(ST,JSON.stringify(s)):localStorage.removeItem(ST)}catch(e){}};
const bank=()=>{const seen=new Set(),out=[],add=(q,m)=>{if(!seen.has(q.q)){seen.add(q.q);out.push({q:q.q,c:q.c,a:q.a,e:q.e||'',m})}};
  M.forEach(m=>m.quiz.forEach(q=>add(q,m.id)));(window.BANK||[]).forEach(q=>add(q,q.m));return out};
const prep=q=>{const o=shuf(q.c.map((t,i)=>[t,i===q.a]));return{...q,c:o.map(x=>x[0]),a:o.findIndex(x=>x[1])}};
const qHTML=(q,i,sel,rev)=>`<div class="xq"><div class="xm">M.${q.m} · ข้อ ${i+1}</div><p class="xtx">${q.q}</p>${q.c.map((t,j)=>`<button type="button" class="xo${rev?(j===q.a?' ok':j===sel?' bad':''):(j===sel?' sel':'')}" data-j="${j}"${rev?' disabled':''}><b>${L[j]}</b><span>${t}</span></button>`).join('')}${rev&&q.e?`<p class="xe">${q.e}</p>`:''}</div>`;
let tick=null;

/* ---------- Practice ---------- */
function practiceHome(){const b=bank();A().onclick=null;
  A().innerHTML=`<div class="xw"><div class="eyebrow">Practice</div><h1 class="title">ฝึกทำข้อสอบตามโมดูล</h1><p class="hint">เลือกโมดูลและจำนวนข้อ เฉลยพร้อมเหตุผลขึ้นทันทีหลังตอบ · คลังตอนนี้ ${b.length} ข้อ</p><form class="xform" id="pf"><label>โมดูล<select name="m"><option value="0">ทุกโมดูล</option>${M.map(m=>`<option value="${m.id}">M.${m.id} ${m.th} (${b.filter(q=>q.m===m.id).length})</option>`).join('')}</select></label><label>จำนวนข้อ<select name="n">${[10,20,40,60].map(n=>`<option>${n}</option>`).join('')}</select></label><button class="btn" type="submit">เริ่มฝึก</button></form></div>`;
  $('#pf').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target),m=+f.get('m');
    practice({qs:shuf(b.filter(q=>!m||q.m===m)).slice(0,+f.get('n')).map(prep),i:0,sel:{}})}}
function practice(p){const q=p.qs[p.i];
  if(!q){const c=p.qs.filter((x,i)=>p.sel[i]===x.a).length;
    A().innerHTML=`<div class="xw"><h1 class="title">ผลการฝึก</h1><div class="xscore"><big>${c} / ${p.qs.length}</big></div><button class="btn" id="again">ฝึกอีกรอบ</button></div>`;
    A().onclick=e=>{if(e.target.id==='again')practiceHome()};return}
  const rev=p.i in p.sel;
  A().innerHTML=`<div class="xw"><p class="hint">ข้อ ${p.i+1} จาก ${p.qs.length}</p><div class="xcard">${qHTML(q,p.i,p.sel[p.i],rev)}${rev?`<div class="xnav"><span></span><button class="btn" id="nx">${p.i+1<p.qs.length?'ข้อต่อไป →':'ดูผล'}</button></div>`:''}</div></div>`;
  A().onclick=e=>{const o=e.target.closest('.xo');
    if(o&&!rev){p.sel[p.i]=+o.dataset.j;practice(p)}else if(e.target.id==='nx'){p.i++;practice(p)}}}

/* ---------- Exam simulator ---------- */
const compose=()=>{const b=bank(),tot=M.reduce((s,m)=>s+m.n,0);let qs=M.flatMap(m=>shuf(b.filter(q=>q.m===m.id)).slice(0,m.n));const u=new Set(qs.map(q=>q.q));qs=qs.concat(shuf(b.filter(q=>!u.has(q.q))).slice(0,Math.max(0,tot-qs.length)));return qs.sort((x,y)=>x.m-y.m).map(prep)};
function examHome(){const b=bank(),tot=M.reduce((s,m)=>s+m.n,0),have=Math.min(tot,b.length),short=M.filter(m=>b.filter(q=>q.m===m.id).length<m.n).map(m=>'M.'+m.id),mins=Math.round(have*180/tot),s0=ld();
  let resume='';if(s0){const l=Math.round((s0.end-Date.now())/1000);resume=s0.done?`<button class="btn ghost" id="last">ดูผลครั้งก่อน</button>`:`<button class="btn" id="cont">ทำต่อ (${l>0?'เหลือ '+fmt(l):'หมดเวลาแล้ว'})</button>`}
  A().innerHTML=`<div class="xw"><div class="eyebrow">Exam simulator</div><h1 class="title">จำลองสนามสอบจริง</h1>
  <div class="stats"><span class="pill"><b>${tot}</b> ข้อ</span><span class="pill"><b>180</b> นาที</span><span class="pill"><b>13</b> โมดูล</span></div>
  ${have<tot?`<div class="note"><b>คลังข้อสอบมี ${have}/${tot} ข้อ</b> จึงจัดชุดสอบ ${have} ข้อ และปรับเวลาเป็น ${mins} นาที · เติมคลังด้วย <code>tools/import_docs.py</code> เพื่อให้ครบ ${tot} ข้อ</div>`:''}
  ${short.length&&have>=tot?`<p class="hint">โมดูล ${short.join(', ')} มีโจทย์ไม่ครบตามสัดส่วนจริง ระบบจึงเติมจากโมดูลอื่นให้ครบ ${tot} ข้อ</p>`:''}
  <ul><li>ข้อสอบเรียงตามโมดูล สุ่มข้อและสลับตัวเลือกทุกครั้ง ไม่เฉลยระหว่างทำ</li><li>นาฬิกาเดินต่อแม้ปิดหน้าเว็บ และกลับมาทำต่อได้</li><li>ติดธงข้อที่ไม่แน่ใจ แล้วย้อนกลับมาทบทวนผ่านแผงข้อสอบ</li></ul>
  <div class="tw"><table class="cmp"><thead><tr><th>โมดูล</th><th>ข้อสอบจริง</th><th>ในคลัง</th></tr></thead><tbody>${M.map(m=>`<tr><th scope="row">M.${m.id} ${m.th}</th><td>${m.n}</td><td>${b.filter(q=>q.m===m.id).length}</td></tr>`).join('')}</tbody></table></div>
  <div class="xnav" style="justify-content:flex-start;gap:10px"><button class="btn" id="go">เริ่มจับเวลา</button>${resume}</div></div>`;
  A().onclick=e=>{const id=e.target.id;
    if(id==='go'){if(s0&&!s0.done&&!confirm('มีข้อสอบที่ค้างอยู่ จะเริ่มใหม่และทิ้งชุดเดิมหรือไม่?'))return;const qs=compose();run({qs,ans:{},flag:{},i:0,end:Date.now()+mins*60000,mins,done:false})}
    else if(id==='cont')s0.end-Date.now()>0?run(s0):finish(s0);else if(id==='last')result(s0)}}
function run(s){clearInterval(tick);const left=()=>Math.max(0,Math.round((s.end-Date.now())/1000));
  const draw=()=>{const q=s.qs[s.i],n=Object.keys(s.ans).length;
    A().innerHTML=`<div class="xw"><div class="xbar"><div><b>จำลองสอบจริง</b><span class="xs">ตอบแล้ว ${n}/${s.qs.length} · ติดธง ${Object.keys(s.flag).length}</span></div><div class="xt" id="tm">${fmt(left())}</div><button class="btn" id="sub">ส่งข้อสอบ</button></div>
    <div class="xg"><div class="xcard">${qHTML(q,s.i,s.ans[s.i],false)}<div class="xnav"><button class="btn ghost" id="pv"${s.i?'':' disabled'}>← ก่อนหน้า</button><button class="btn ghost" id="fl">${s.flag[s.i]?'ยกเลิกธง':'ติดธง'}</button><button class="btn" id="nx"${s.i<s.qs.length-1?'':' disabled'}>ถัดไป →</button></div></div>
    <aside class="xp"><div class="xph">แผงข้อสอบ</div><div class="xpg">${s.qs.map((x,k)=>`<button type="button" data-k="${k}" class="${s.ans[k]!=null?'a':''}${s.flag[k]?' f':''}${k===s.i?' c':''}">${k+1}</button>`).join('')}</div><p class="xlg"><i class="a"></i>ตอบแล้ว<i class="f"></i>ติดธง<i class="c"></i>ปัจจุบัน</p></aside></div></div>`};
  draw();tick=setInterval(()=>{const l=left(),t=$('#tm');if(t){t.textContent=fmt(l);t.classList.toggle('low',l<600)}if(!l)finish(s)},1000);
  A().onclick=e=>{const o=e.target.closest('.xo'),k=e.target.closest('[data-k]'),id=(e.target.closest('button')||{}).id;
    if(o)s.ans[s.i]=+o.dataset.j;else if(k)s.i=+k.dataset.k;else if(id==='pv')s.i--;else if(id==='nx')s.i++;
    else if(id==='fl'){s.flag[s.i]?delete s.flag[s.i]:s.flag[s.i]=1}
    else if(id==='sub'){const u=s.qs.length-Object.keys(s.ans).length;if(confirm(u?`ยังไม่ได้ตอบ ${u} ข้อ ส่งข้อสอบเลยหรือไม่?`:'ส่งข้อสอบหรือไม่?'))finish(s);return}else return;
    sv(s);draw()}}
function finish(s){clearInterval(tick);tick=null;s.done=true;s.end=Math.min(s.end,Date.now());sv(s);result(s)}
function result(s){const c=s.qs.filter((q,i)=>s.ans[i]===q.a).length,pct=Math.round(c/s.qs.length*100),by={};
  s.qs.forEach((q,i)=>{const r=by[q.m]=by[q.m]||{c:0,t:0};r.t++;if(s.ans[i]===q.a)r.c++});
  const st=(q,i)=>s.ans[i]==null?'skip':s.ans[i]===q.a?'ok':'bad',used=Math.round((s.end-(s.end-s.mins*60000))/1000);
  A().innerHTML=`<div class="xw"><div class="eyebrow">ผลสอบจำลอง</div><div class="xscore"><big>${c} / ${s.qs.length}</big> <span class="pill"><b>${pct}%</b></span> <span class="pill">เป้าหมายฝึกซ้อม ≥ 70%</span></div>
  <h2 class="sec">คะแนนรายโมดูล</h2>${Object.keys(by).map(m=>{const r=by[m];return`<div class="xmb"><span>M.${m}</span><span><s style="width:${r.c/r.t*100}%"></s></span><span>${r.c}/${r.t}</span></div>`}).join('')}
  <h2 class="sec">ทบทวนข้อสอบ</h2><div class="xnav" style="justify-content:flex-start;gap:8px"><button class="btn ghost" data-f="">ทั้งหมด</button><button class="btn ghost" data-f="bad">ผิด</button><button class="btn ghost" data-f="skip">ไม่ได้ตอบ</button><button class="btn" id="redo">สอบใหม่</button></div>
  <div style="margin-top:14px">${s.qs.map((q,i)=>`<div class="xri" data-s="${st(q,i)}">${qHTML(q,i,s.ans[i],true)}</div>`).join('')}</div></div>`;
  A().onclick=e=>{const f=e.target.dataset.f;if(f!=null)$$('.xri').forEach(x=>x.hidden=f&&x.dataset.s!==f);else if(e.target.id==='redo'){sv(null);examHome()}}}

/* ---------- Module tabs: content | post-lesson quiz ---------- */
function tabs(){const m=/^m(\d+)$/.test(location.hash.slice(1))&&M[+location.hash.slice(2)-1],ap=A();if(!m||$('.xtabs',ap))return;
  const h=$$('h2.sec',ap).find(x=>x.textContent.startsWith('แบบฝึกหัด')),note=$('.note',ap),pager=$('.pager',ap);if(!h||!note||!pager)return;
  const extra=bank().filter(q=>q.m===m.id&&!m.quiz.some(x=>x.q===q.q)).slice(0,10),qs=m.quiz.concat(extra);
  $('.quiz',ap).outerHTML=quizHTML('m'+m.id,qs);h.textContent='ข้อสอบหลังเรียน M.'+m.id;
  const c=document.createElement('div'),z=document.createElement('div'),bar=document.createElement('div');z.hidden=true;
  for(let n=note.nextSibling;n&&n!==h;){const x=n.nextSibling;c.appendChild(n);n=x}
  for(let n=h;n&&n!==pager;){const x=n.nextSibling;z.appendChild(n);n=x}
  bar.className='xtabs';bar.innerHTML=`<button type="button" class="on">เนื้อหา</button><button type="button">ข้อสอบหลังเรียน (${qs.length} ข้อ)</button>`;
  bar.onclick=e=>{const i=$$('button',bar).indexOf(e.target.closest('button'));if(i<0)return;$$('button',bar).forEach((b,k)=>b.classList.toggle('on',k===i));c.hidden=i===1;z.hidden=i===0;window.scrollTo(0,bar.offsetTop-8)};
  pager.before(bar,c,z)}

/* ---------- Routing / nav ---------- */
function nav(h){const n=document.getElementById('nav');if(!n||$('[data-x]',n))return;
  n.insertAdjacentHTML('beforeend',`<div class="sep"></div><a class="ni" data-x href="#practice"><span class="nn">ฝึก</span><span class="nt">ฝึกทำตามโมดูล</span></a><a class="ni" data-x href="#exam"><span class="nn">จริง</span><span class="nt">จำลองสอบจริง 150 ข้อ</span></a>`);
  if(h==='practice'||h==='exam'){$$('.ni',n).forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+h))}}
function route(){const h=location.hash.slice(1);
  if(h!=='exam'&&tick){clearInterval(tick);tick=null}
  if(h==='practice')practiceHome();else if(h==='exam')examHome();
  else if((h===''||h==='home')&&!$('.xcta'))A().insertAdjacentHTML('afterbegin','<div class="xcta"><a class="btn" href="#exam">จำลองสอบจริง 150 ข้อ · 180 นาที</a><a class="btn ghost" href="#practice">ฝึกทำตามโมดูล</a></div>');
  else tabs();
  nav(h)}
addEventListener('hashchange',route);route();
})();
