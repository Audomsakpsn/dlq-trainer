/* Core app: routing, nav, quiz, home */
const store={get(){try{return JSON.parse(localStorage.getItem('dlq')||'{}')}catch(e){return {}}},set(v){try{localStorage.setItem('dlq',JSON.stringify(v))}catch(e){}}};
const QZ={};
function quizHTML(id,qs,showMod){
  QZ[id]={qs,ans:{}};
  return `<div class="quiz" data-quiz="${id}">`+qs.map((q,i)=>`<div class="q" data-i="${i}"><p class="qt"><span class="qn">${i+1}</span>${showMod&&q.m?`<span class="tag">${q.m}</span>`:''}${q.img?`<img class="xi" loading="lazy" alt="โจทย์" src="${q.img}">`:q.q}</p><div class="opts">${q.c.map((c,j)=>`<button type="button" class="opt" data-j="${j}"><span class="ol">${'กขคง'[j]}</span><span>${q.img?'เลือกข้อ '+c:c}</span></button>`).join('')}</div><div class="ex" hidden></div></div>`).join('')+`<div class="qsum" hidden></div></div>`;
}
const total=M.reduce((s,m)=>s+m.n,0);
function navHTML(cur){
  return `<a class="brand" href="#home">ติวสอบคอม<br><span style="font-size:13px;font-weight:500;color:var(--muted)">13 โมดูล · ${total} ข้อ</span></a>`+
  `<a class="ni${cur==='home'?' on':''}" href="#home"><span class="nn">ภาพรวม</span></a><div class="sep"></div>`+
  M.map(m=>`<a class="ni${cur==='m'+m.id?' on':''}" href="#m${m.id}"><span class="nn">M.${m.id}</span><span class="nt">${m.th}</span></a>`).join('')+
  `<div class="sep"></div><a class="ni${cur==='mock'?' on':''}" href="#mock"><span class="nn">สุ่ม</span><span class="nt">ฝึกทำข้อสอบรวม</span></a>`;
}
function progressTxt(m){const p=store.get()['m'+m.id];return p?`ทำล่าสุด ${p.c}/${p.t} ข้อ`:'ยังไม่ได้ทำแบบฝึกหัด'}
function homeHTML(){
  const mx=12;
  return `<section class="hero"><div class="eyebrow">Digital literacy exam prep</div><h1 class="title">ติวสอบคอม 13 โมดูล</h1>
  <p class="lead">รวมสรุปเนื้อหา ภาพประกอบ ตารางเปรียบเทียบ และแบบฝึกหัด เรียบเรียงจากไกด์ข้อสอบและรีวิวที่เคยสอบ เลือกโมดูลจากรายการด้านข้างหรือการ์ดด้านล่างได้เลย</p>
  <div class="stats"><span class="pill"><b>${total}</b> ข้อสอบจริง</span><span class="pill"><b>13</b> โมดูล</span><span class="pill"><b>${M.reduce((s,m)=>s+m.quiz.length,0)}</b> ข้อฝึกทำ</span></div></section>
  <h2 class="sec">ข้อสอบแต่ละโมดูลออกกี่ข้อ</h2><p class="hint">จากภาพจำนวนข้อสอบที่แนบมา แถบเทาคือโมดูลที่ออก 10 ข้อ กดที่แถวเพื่อเปิดโมดูลนั้น</p>
  <div class="bars">${M.map(m=>`<a class="bar${m.n<12?' low':''}" href="#m${m.id}"><span class="bl"><i>M.${m.id}</i>${m.th}</span><span class="bt"><s style="width:${m.n/mx*100}%"></s></span><span class="bv">${m.n}</span></a>`).join('')}</div>
  <h2 class="sec">เลือกโมดูล</h2><div class="mods">${M.map(m=>`<a class="mod" href="#m${m.id}"><span class="mi">M.${m.id}</span><span class="mt"><b>${m.th}</b><span>${m.en} · ${progressTxt(m)}</span></span><span class="mq">${m.n} ข้อ</span></a>`).join('')}</div>
  <h2 class="sec">ลำดับที่แนะนำ</h2>${cards([
  ['1. กลุ่ม Office (M.5–M.7)','คลังโจทย์ในไกด์ใหญ่ที่สุด (Word 100, Excel 113, PowerPoint 72) เน้นจำเมนู แท็บ และคีย์ลัด'],
  ['2. กลุ่มพื้นฐาน (M.1–M.4)','อ่านเร็วแต่ต้องจำศัพท์ ช่องเชื่อมต่อ ชนิดเบราว์เซอร์ Zoom Meeting/Webinar และคีย์ลัด Windows'],
  ['3. กลุ่มความรู้ทั่วไป (M.8–M.13)','เว็บหางาน (M.11) และความหมาย Digital Footprint (M.12) ส่วน M.8–M.10 และ M.13 ไม่มีรีวิว']])}
  <div class="note"><b>ที่มาของเนื้อหา:</b> ไฟล์ไกด์ที่แนบมามีโจทย์เป็นรูปภาพ ข้อความที่อ่านได้มีเพียงหัวข้อแบบทดสอบและเลขข้อ ตัวเลขคลังโจทย์ในหน้านี้นับจากเลขข้อเหล่านั้น เนื้อหาในแต่ละโมดูลเรียบเรียงจากรีวิวร่วมกับหลักสูตรมาตรฐาน ส่วน M.8–M.10 และ M.13 ไม่มีรีวิวหรือโจทย์ที่อ่านได้ จึงเป็นเนื้อหามาตรฐานทั่วไป ควรเทียบกับสื่อของมหาวิทยาลัยอีกครั้ง โดยเฉพาะชื่อเว็บไซต์และเมนูที่เปลี่ยนตามเวอร์ชัน</div>
  <p><a class="btn" href="#mock">สุ่มทำข้อสอบรวม 20 ข้อ</a></p>`;
}
function modHTML(m){
  const mx=Math.max(1,...m.topics.map(t=>t[1]));
  const prev=M[m.id-2],next=M[m.id];
  return `<div class="mhead"><span class="mi">M.${m.id}</span><div><div class="eyebrow">${m.en}</div><h1 class="title" style="margin:2px 0 6px">${m.th}</h1><div class="stats" style="margin:0"><span class="pill"><b>${m.n}</b> ข้อสอบจริง</span><span class="pill">คลังในไกด์ <b>${m.bank||'-'}</b> ข้อ</span></div><p class="src" style="margin:8px 0 0">ที่มา: ${m.src}</p></div></div>
  <div class="note"><b>รีวิว:</b> ${m.rv}</div>
  ${m.topics.length?`<h2 class="sec" style="margin-top:28px">หัวข้อในคลังโจทย์ของไกด์</h2><p class="hint">จำนวนโจทย์แยกตามหัวข้อแบบทดสอบ ยิ่งยาวยิ่งมีโจทย์ฝึกเยอะ</p><div class="bars">${m.topics.map(t=>`<div class="bar" style="cursor:default"><span class="bl" style="white-space:normal">${t[0]}</span><span class="bt"><s style="width:${t[1]/mx*100}%"></s></span><span class="bv">${t[1]}</span></div>`).join('')}</div>`:''}
  ${m.sections.map(s=>`<h2 class="sec">${s.h}</h2>${s.hint?`<p class="hint">${s.hint}</p>`:''}${s.b}`).join('')}
  <h2 class="sec">แบบฝึกหัด M.${m.id}</h2><p class="hint">กดเลือกคำตอบเพื่อดูเฉลยและเหตุผลทันที</p>${quizHTML('m'+m.id,m.quiz)}
  <div class="pager">${prev?`<a class="btn ghost" href="#m${prev.id}">← M.${prev.id} ${prev.th}</a>`:'<span></span>'}${next?`<a class="btn" href="#m${next.id}">M.${next.id} ${next.th} →</a>`:`<a class="btn" href="#mock">ฝึกทำข้อสอบรวม →</a>`}</div>`;
}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function mockHTML(){
  const all=[];M.forEach(m=>m.quiz.forEach(q=>all.push(Object.assign({},q,{m:'M.'+m.id,mid:m.id}))));
  const qs=shuffle(all).slice(0,20);
  return `<div class="eyebrow">Mock exam</div><h1 class="title">สุ่มข้อสอบรวม 20 ข้อ</h1><p class="lead">สุ่มจากแบบฝึกหัดทุกโมดูล เมื่อทำครบจะสรุปว่าโมดูลไหนควรกลับไปอ่านซ้ำ</p>${quizHTML('mock',qs,true)}`;
}
function render(){
  const h=(location.hash||'#home').slice(1);
  const app=document.getElementById('app');
  let cur='home';
  if(h==='mock'){cur='mock';app.innerHTML=mockHTML()}
  else if(/^m\d+$/.test(h)&&M[+h.slice(1)-1]){cur=h;app.innerHTML=modHTML(M[+h.slice(1)-1])}
  else{app.innerHTML=homeHTML()}
  document.getElementById('nav').innerHTML=navHTML(cur);
  window.scrollTo(0,0);
}
function summarize(box,id){
  const S=QZ[id];const n=S.qs.length;let c=0;const wrong={};
  S.qs.forEach((q,i)=>{if(S.ans[i]===q.a)c++;else if(q.m)wrong[q.m]=(wrong[q.m]||0)+1});
  const sum=box.querySelector('.qsum');sum.hidden=false;
  let extra='';
  if(id==='mock'){const w=Object.keys(wrong);extra=w.length?`<p>ควรกลับไปทบทวน: <b>${w.join(', ')}</b></p>`:'<p>ถูกครบทุกข้อ</p>'}
  sum.innerHTML=`<big>${c} / ${n}</big><span>${c===n?'ถูกครบทุกข้อ':c>=n*0.7?'ผ่านเกณฑ์ที่น่าพอใจ ทบทวนข้อที่พลาดอีกนิด':'ลองกลับไปอ่านสรุปด้านบนแล้วทำซ้ำอีกรอบ'}</span>${extra}<button type="button" class="btn ghost qreset" data-id="${id}">ทำใหม่</button>`;
  if(/^m\d+$/.test(id)){const s=store.get();s[id]={c,t:n};store.set(s)}
}
document.addEventListener('click',e=>{
  const o=e.target.closest('.opt');
  if(o){
    const box=o.closest('.quiz'),qe=o.closest('.q'),id=box.dataset.quiz,i=+qe.dataset.i,j=+o.dataset.j,S=QZ[id];
    if(i in S.ans)return;S.ans[i]=j;const q=S.qs[i];
    qe.querySelectorAll('.opt').forEach((b,k)=>{b.disabled=true;if(k===q.a)b.classList.add('ok');else if(k===j)b.classList.add('bad')});
    const ex=qe.querySelector('.ex');ex.hidden=false;ex.innerHTML=`<b>${j===q.a?'ถูกต้อง':'ยังไม่ถูก'}</b> ${q.e}`;
    if(Object.keys(S.ans).length===S.qs.length)summarize(box,id);
    return;
  }
  const r=e.target.closest('.qreset');
  if(r){const id=r.dataset.id;if(id==='mock'){render();return}const box=r.closest('.quiz');box.outerHTML=quizHTML(id,QZ[id].qs);return}
  const t=e.target.closest('.rt');
  if(t){const rib=t.closest('.rib'),k=t.dataset.t;rib.querySelectorAll('.rt').forEach(b=>b.classList.toggle('on',b===t));rib.querySelectorAll('.ribbody').forEach(p=>p.hidden=p.dataset.p!==k);return}
  const z=e.target.closest('.zc');
  if(z){document.querySelectorAll('.zc').forEach(b=>b.classList.toggle('on',b===z));const zr=document.getElementById('zres');zr.hidden=false;zr.textContent=z.dataset.r;return}
  const g=e.target.closest('.cg');
  if(g){const row=g.closest('.cgr'),it=clsItems[+g.dataset.i];if(row.dataset.done)return;row.dataset.done='1';const okk=g.dataset.g===it[1];
    g.classList.add(okk?'ok':'bad');
    if(!okk){row.querySelector(`.cg[data-g="${it[1]}"]`).classList.add('ok')}
    return}
});
window.addEventListener('hashchange',render);
render();
