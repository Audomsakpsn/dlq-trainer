/* Helpers + SVG figures */

/* ===== helpers ===== */
const tbl=(h,r)=>`<div class="tw"><table class="cmp"><thead><tr>${h.map(x=>`<th>${x}</th>`).join('')}</tr></thead><tbody>${r.map(a=>`<tr>${a.map((x,i)=>i?`<td>${x}</td>`:`<th scope="row">${x}</th>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const cards=l=>`<div class="grid">${l.map(([t,b,tag])=>`<div class="card"><h4>${tag?`<span class="tag hot">${tag}</span>`:''}${t}</h4><p>${b}</p></div>`).join('')}</div>`;
const key=k=>k.split('+').map(x=>`<kbd>${x}</kbd>`).join('+');
const keys=l=>`<div class="keys">${l.map(([k,d])=>`<div class="keyrow"><span>${key(k)}</span><span>${d}</span></div>`).join('')}</div>`;
const steps=l=>`<ol class="steps">${l.map(s=>`<li>${s}</li>`).join('')}</ol>`;
const fig=(svg,cap)=>`<figure class="fig" style="margin:14px 0">${svg}${cap?`<figcaption>${cap}</figcaption>`:''}</figure>`;
const sec=(h,b,hint)=>({h,b,hint});
function ribbon(id,tabs){
  return `<div class="rib" data-rib="${id}"><div class="ribtabs" role="tablist">${tabs.map((t,i)=>`<button type="button" role="tab" class="rt${i?'':' on'}" data-t="${i}">${t[0]}</button>`).join('')}</div>`+
  tabs.map((t,i)=>`<div class="ribbody" data-p="${i}"${i?' hidden':''}>${t[2]?`<p class="ribnote">${t[2]}</p>`:''}<div class="ribgroups">${t[1].map(([g,items])=>`<div class="rg"><div class="rgi">${items.map(x=>x[0]==='*'?`<span class="chip hot">${x.slice(1)}</span>`:`<span class="chip">${x}</span>`).join('')}</div><div class="rgn">${g}</div></div>`).join('')}</div></div>`).join('')+`</div><p class="cap">แถบสีเหลือง = คำสั่งที่ข้อสอบมักถาม · กดชื่อแท็บเพื่อดูว่าแต่ละแท็บมีอะไร</p>`;
}

/* ===== SVG figures ===== */
const portsSVG=(()=>{
  const jack=(c)=>cx=>`<circle cx="${cx}" cy="54" r="15" fill="${c}"/><circle cx="${cx}" cy="54" r="5.5" class="svg-bg"/>`;
  const items=[
    ['USB-A',['เมาส์ คีย์บอร์ด','แฟลชไดรฟ์'],cx=>`<rect class="svg-box" x="${cx-22}" y="42" width="44" height="24" rx="3"/><rect class="svg-fill" x="${cx-16}" y="50" width="32" height="5"/>`],
    ['USB-C',['ชาร์จ + ข้อมูล','เสียบได้สองด้าน'],cx=>`<rect class="svg-box" x="${cx-20}" y="45" width="40" height="18" rx="9"/><rect class="svg-fill" x="${cx-13}" y="52" width="26" height="4" rx="2"/>`],
    ['HDMI',['ภาพ + เสียง','ทีวี/โปรเจกเตอร์'],cx=>`<path class="svg-box" d="M${cx-24} 44H${cx+24}V58L${cx+16} 66H${cx-16}L${cx-24} 58Z"/>`],
    ['VGA',['ภาพอย่างเดียว','ไม่มีเสียง'],cx=>`<path class="svg-box" d="M${cx-24} 44H${cx+24}L${cx+18} 66H${cx-18}Z"/>`+[-12,0,12].map(d=>`<circle class="svg-fill" cx="${cx+d}" cy="52" r="2"/><circle class="svg-fill" cx="${cx+d+6}" cy="59" r="2"/>`).join('')],
    ['LAN',['สายอินเทอร์เน็ต','RJ-45 เสถียร'],cx=>`<rect class="svg-box" x="${cx-17}" y="40" width="34" height="28" rx="3"/><rect class="svg-bg" x="${cx-6}" y="40" width="12" height="7"/>`+[-9,-3,3,9].map(d=>`<line class="svg-ln" x1="${cx+d}" y1="54" x2="${cx+d}" y2="64"/>`).join('')],
    ['เขียว',['ลำโพง / หูฟัง','(Audio Out)'],jack('#2DB36F')],
    ['ชมพู',['ไมโครโฟน','(Mic In)'],jack('#E65AA0')],
    ['ฟ้า',['Line In','ต่อเครื่องเสียงอื่น'],jack('#3B82F6')]
  ];
  return `<svg viewBox="0 0 720 150" role="img" aria-label="ช่องเชื่อมต่อบนเครื่องคอมพิวเตอร์">`+items.map((it,i)=>{const cx=45+90*i;return `<g>${it[2](cx)}<text class="svg-t" x="${cx}" y="92" text-anchor="middle" font-size="13" font-weight="600">${it[0]}</text><text class="svg-m" x="${cx}" y="110" text-anchor="middle" font-size="10.5">${it[1][0]}</text><text class="svg-m" x="${cx}" y="124" text-anchor="middle" font-size="10.5">${it[1][1]}</text></g>`}).join('')+`</svg>`;
})();

const urlSVG=`<svg viewBox="0 0 660 165" role="img" aria-label="ส่วนประกอบของ URL">
<rect class="svg-box" x="8" y="8" width="644" height="46" rx="23"/>
<path class="svg-fill" d="M38 24v-3a6 6 0 0112 0v3h2v12H36V24zm4 0h4v-3a2 2 0 00-4 0z"/>
<text class="svg-mono" x="70" y="38" font-size="18" textLength="86" lengthAdjust="spacingAndGlyphs">https://</text>
<text class="svg-mono" x="156" y="38" font-size="18" textLength="43" lengthAdjust="spacingAndGlyphs">www.</text>
<text class="svg-mono" x="199" y="38" font-size="18" textLength="54" lengthAdjust="spacingAndGlyphs">chula</text>
<text class="svg-mono" x="253" y="38" font-size="18" textLength="65" lengthAdjust="spacingAndGlyphs">.ac.th</text>
<text class="svg-mono" x="318" y="38" font-size="18" textLength="140" lengthAdjust="spacingAndGlyphs">/th/admission</text>
<g class="svg-lead"><path d="M70 62v6h86v-6M156 62v6h43v-6M199 62v6h54v-6M253 62v6h65v-6M318 62v6h140v-6"/>
<path d="M113 68v26M177 68v62M226 68v26M285 68v62M388 68v26"/></g>
<text class="svg-t" x="113" y="108" text-anchor="middle" font-size="12.5" font-weight="600">โปรโตคอล</text>
<text class="svg-m" x="113" y="122" text-anchor="middle" font-size="11">s = Secure (เข้ารหัส)</text>
<text class="svg-t" x="177" y="146" text-anchor="middle" font-size="12.5" font-weight="600">ซับโดเมน</text>
<text class="svg-t" x="226" y="108" text-anchor="middle" font-size="12.5" font-weight="600">ชื่อโดเมน</text>
<text class="svg-t" x="285" y="146" text-anchor="middle" font-size="12.5" font-weight="600">โดเมนระดับบน</text>
<text class="svg-m" x="285" y="160" text-anchor="middle" font-size="11">ac = สถาบันการศึกษา · th = ไทย</text>
<text class="svg-t" x="388" y="108" text-anchor="middle" font-size="12.5" font-weight="600">พาธ (หน้าที่เปิด)</text>
</svg>`;

const winSVG=`<svg viewBox="0 0 640 230" role="img" aria-label="หน้าต่างโปรแกรมและแถบงาน Windows">
<rect class="svg-box" x="10" y="8" width="620" height="162" rx="8"/>
<path class="svg-s2" d="M10 16a8 8 0 018-8h604a8 8 0 018 8v26H10z"/>
<text class="svg-t" x="26" y="31" font-size="13" font-weight="600">เอกสาร1 - Word</text>
<g class="svg-t" font-size="16" text-anchor="middle"><text x="498" y="33">—</text><text x="548" y="33">☐</text><text x="598" y="33">✕</text></g>
<g class="svg-lead"><path d="M498 42v22M548 42v38M598 42v54"/></g>
<text class="svg-t" x="498" y="78" text-anchor="middle" font-size="12" font-weight="600">Minimize</text>
<text class="svg-m" x="498" y="92" text-anchor="middle" font-size="11">ย่อลงแถบงาน</text>
<text class="svg-t" x="548" y="94" text-anchor="middle" font-size="12" font-weight="600">Maximize / Restore</text>
<text class="svg-m" x="548" y="108" text-anchor="middle" font-size="11">ขยายเต็มจอ / คืนขนาด</text>
<text class="svg-t" x="598" y="110" text-anchor="middle" font-size="12" font-weight="600">Close</text>
<text class="svg-m" x="598" y="124" text-anchor="middle" font-size="11">ปิดหน้าต่าง</text>
<rect class="svg-s2" x="10" y="190" width="620" height="32" rx="6"/>
<rect class="svg-ac" x="20" y="198" width="16" height="16" rx="3"/>
<text class="svg-m" x="44" y="210" font-size="11.5">Start · ค้นหา · แอปที่ปักหมุด/เปิดอยู่</text>
<text class="svg-m" x="420" y="210" font-size="11.5">ลำโพง · Wi-Fi · แบตเตอรี่ · นาฬิกา</text>
<rect class="svg-hl" x="622" y="190" width="8" height="32" rx="3"/>
<g class="svg-lead"><path d="M620 190v-14"/></g>
<text class="svg-t" x="618" y="170" text-anchor="end" font-size="12" font-weight="600" transform="translate(0,0)">มุมขวาสุด = Show desktop (แสดงเดสก์ท็อป)</text>
</svg>`;

const excelSVG=(()=>{
  const cw=120,rh=26,x0=36,y0=128;const cols='ABCDE';
  const data=[['สินค้า','ราคา','จำนวน','รวม'],['ปากกา','15','10','150'],['สมุด','30','5','150'],['ยางลบ','8','20','160'],['ไม้บรรทัด','12','10','120']];
  let s=`<svg viewBox="0 0 660 352" role="img" aria-label="ส่วนประกอบหน้าต่าง Excel">`;
  s+=`<rect class="svg-box" x="4" y="4" width="652" height="344" rx="8"/><path class="svg-s2" d="M4 12a8 8 0 018-8h636a8 8 0 018 8v50H4z"/>`;
  s+=['File','Home','Insert','Page Layout','Formulas','Data','Review','View'].map((t,i)=>`<text class="svg-t" x="${16+i*74}" y="24" font-size="11.5" ${i===1?'font-weight="700"':''}>${t}</text>`).join('');
  s+=`<rect class="svg-box" x="10" y="70" width="80" height="24" rx="4"/><text class="svg-mono" x="50" y="87" text-anchor="middle" font-size="13">D3</text>`;
  s+=`<text class="svg-m" x="100" y="88" font-size="13" font-style="italic">fx</text><rect class="svg-box" x="120" y="70" width="530" height="24" rx="4"/><text class="svg-mono" x="130" y="87" font-size="13">=B3*C3</text>`;
  s+=`<rect class="svg-s2" x="${x0-26}" y="106" width="${5*cw+26}" height="22"/>`;
  [...cols].forEach((c,i)=>{s+=`<text class="svg-t" x="${x0+i*cw+cw/2}" y="122" text-anchor="middle" font-size="12" ${c==='D'?'font-weight="700"':''}>${c}</text>`});
  for(let r=0;r<6;r++){const y=y0+r*rh;s+=`<rect class="svg-s2" x="10" y="${y}" width="26" height="${rh}"/><text class="svg-t" x="23" y="${y+17}" text-anchor="middle" font-size="12" ${r===2?'font-weight="700"':''}>${r+1}</text>`;}
  for(let r=0;r<=6;r++)s+=`<line class="svg-ln" x1="10" y1="${y0+r*rh}" x2="${x0+5*cw}" y2="${y0+r*rh}"/>`;
  for(let c=0;c<=5;c++)s+=`<line class="svg-ln" x1="${x0+c*cw}" y1="106" x2="${x0+c*cw}" y2="${y0+6*rh}"/>`;
  data.forEach((row,r)=>row.forEach((v,c)=>{const num=/^\d+$/.test(v);s+=`<text class="svg-t" x="${num?x0+c*cw+cw-8:x0+c*cw+8}" y="${y0+r*rh+17}" ${num?'text-anchor="end"':''} font-size="12.5" ${r===0?'font-weight="700"':''}>${v}</text>`}));
  s+=`<rect class="svg-acs" x="${x0+3*cw}" y="${y0+2*rh}" width="${cw}" height="${rh}"/><rect class="svg-ac" x="${x0+4*cw-5}" y="${y0+3*rh-5}" width="7" height="7"/>`;
  s+=`<rect class="svg-s2" x="4" y="290" width="652" height="26"/><rect class="svg-box" x="14" y="292" width="64" height="22" rx="4"/><text class="svg-t" x="46" y="307" text-anchor="middle" font-size="12" font-weight="600">Sheet1</text><text class="svg-m" x="98" y="307" font-size="12">Sheet2</text><text class="svg-ac" x="146" y="308" font-size="16">+</text>`;
  s+=`<path class="svg-s2" d="M4 320h652v20a8 8 0 01-8 8H12a8 8 0 01-8-8z"/><text class="svg-m" x="14" y="338" font-size="11.5">Ready</text><text class="svg-t" x="330" y="338" text-anchor="middle" font-size="11.5">Average: 150   Count: 3   Sum: 450</text><text class="svg-m" x="640" y="338" text-anchor="end" font-size="11.5">− ——●—— +  100%</text>`;
  const badge=(n,x,y)=>`<circle class="svg-hl" cx="${x}" cy="${y}" r="10"/><text class="svg-hlt" x="${x}" y="${y+4}" text-anchor="middle">${n}</text>`;
  s+=badge(1,640,18)+badge(2,50,62)+badge(3,360,62)+badge(4,646,117)+badge(5,23,271)+badge(6,516,180)+badge(7,190,303)+badge(8,110,334);
  return s+`</svg>`;
})();

/* ===== module data M1-M7 ===== */
