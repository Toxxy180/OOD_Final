/* Supplementary irregular binary trees. Child links, not label values, define order. */
(() => {
'use strict';
const S=window.Study,E=S.esc;
const n=(label,left=null,right=null)=>({label:String(label),left,right});
const sets=[
 {id:'reference',title:'01 · กิ่งไม่เท่ากันแบบในภาพ',hint:'ฝั่ง d ลงซ้ายสองชั้น ส่วน g ลงขวาสองชั้น',root:n('a',n('b',n('c'),n('d',n('e',n('f')))),n('g',null,n('h',null,n('i'))))},
 {id:'right-only',title:'02 · มีแต่ลูกขวา เลขเว้นช่วง',hint:'ลูกซ้ายไม่มีทุกปม เลขที่ไม่ได้วาดไม่ต้องเติม',root:n(42,null,n(7,null,n(90,null,n(18,null,n(63)))))},
 {id:'left-only',title:'03 · มีแต่ลูกซ้าย ค่าสลับสูงต่ำ',hint:'ลำดับค่าที่มากหรือน้อยไม่มีผลต่อวิธีเดิน',root:n(11,n(80,n(3,n(57,n(24)))))},
 {id:'zigzag',title:'04 · กิ่งซิกแซ็ก ขวา–ซ้าย–ขวา',hint:'อย่าเดาว่าปมที่อยู่ต่ำลงมาต้องเป็นลูกซ้ายเสมอ',root:n('K',null,n('B',n('Z',null,n('D',n('Q')))))},
 {id:'right-then-split',title:'05 · รากไม่มีลูกซ้าย แต่ข้างล่างแตกกิ่ง',hint:'ข้ามลูกซ้ายที่ไม่มี แล้วเดิน subtree ขวาทั้งก้อน',root:n(50,null,n(8,n(91,null,n(2)),n(17,n(64))))},
 {id:'left-then-split',title:'06 · รากไม่มีลูกขวา',hint:'มีหลายกิ่งใน subtree ซ้าย แม้รากมีลูกคนเดียว',root:n(6,n(40,n(13,null,n(72)),n(5,null,n(88))))},
 {id:'inside-branches',title:'07 · กิ่งสองข้างชี้เข้าด้านใน',hint:'ลูกซ้ายมีแต่ลูกขวา ส่วนลูกขวามีแต่ลูกซ้าย',root:n(35,n(9,null,n(60,n(14))),n(81,n(4,null,n(27))))},
 {id:'deep-left',title:'08 · ลึกด้านเดียว อีกข้างเป็นใบ',hint:'ต้องกลับขึ้นมาที่บรรพบุรุษให้ถูกหลังจบกิ่งลึก',root:n('M',n('C',n('X',null,n('F',n('R'))),n('H')),n('A'))},
 {id:'zero-negative',title:'09 · มีศูนย์และเลขติดลบ',hint:'0 เป็นค่าข้อมูลจริง มีปมอยู่ ไม่ได้หมายถึงว่าง',root:n(0,n(-12,null,n(44)),n(7,n(-3,n(19)),n(-28)))},
 {id:'uneven-forks',title:'10 · แตกกิ่งหลายจุด แต่ขาดคนละข้าง',hint:'เขียนคำตอบเป็น subtree ย่อยก่อน แล้วนำมาต่อกัน',root:n(73,n(16,n(95),n(2,null,n(48))),n(31,null,n(84,n(5),n(62))))},
 {id:'single',title:'11 · เหลือรากเพียงปมเดียว',hint:'กรณีฐานของ recursion: ไม่มีลูกให้เดินต่อ',root:n(99)},
 {id:'mixed-gaps',title:'12 · ตัวอักษรข้ามลำดับและกิ่งสลับ',hint:'A–Z ไม่จำเป็นต้องครบ และ Inorder ไม่จำเป็นต้องเรียงอักษร',root:n('T',n('G',null,n('Y',n('C'),n('P',n('V')))),n('E',n('N',null,n('J'))))}
];
const modes={pre:['Preorder','ตัวเอง → ซ้าย → ขวา'],in:['Inorder','ซ้าย → ตัวเอง → ขวา'],post:['Postorder','ซ้าย → ขวา → ตัวเอง'],level:['Level-order','ทีละระดับ จากซ้ายไปขวา']};
function walk(root,kind){
 const result=[];
 if(kind==='level'){const queue=root?[root]:[];for(let i=0;i<queue.length;i++){const node=queue[i];result.push(node);if(node.left)queue.push(node.left);if(node.right)queue.push(node.right);}return result;}
 const visit=node=>{if(!node)return;if(kind==='pre')result.push(node);visit(node.left);if(kind==='in')result.push(node);visit(node.right);if(kind==='post')result.push(node);};visit(root);return result;
}
function diagram(root,visited=[],expanded=false){
 const ordered=walk(root,'in'),points=new Map(),width=Math.max(360,ordered.length*58),levels=[];
 const place=(node,depth=0)=>{if(!node)return;points.set(node,{x:32+ordered.indexOf(node)*(width-64)/Math.max(1,ordered.length-1),y:38+depth*76});levels.push(depth);place(node.left,depth+1);place(node.right,depth+1);};place(root);
 if(ordered.length===1)points.get(root).x=width/2;
 const height=90+Math.max(...levels)*76;
 const edges=ordered.map(node=>['left','right'].map(side=>{const child=node[side];if(!child)return '';const p=points.get(node),c=points.get(child);return `<line x1="${p.x}" y1="${p.y}" x2="${c.x}" y2="${c.y}"/><text class="edge-label" x="${(p.x+c.x)/2+(side==='left'?-9:9)}" y="${(p.y+c.y)/2-5}">${side==='left'?'L':'R'}</text>`;}).join('')).join('');
 const nodes=ordered.map(node=>{const p=points.get(node),i=visited.indexOf(node),current=visited.at(-1)===node;return `<g class="ir-node ${i>=0?'visited':''} ${current?'current':''}"><circle cx="${p.x}" cy="${p.y}" r="22"/><text x="${p.x}" y="${p.y+6}">${E(node.label)}</text>${i>=0?`<text class="visit-number" x="${p.x+23}" y="${p.y-21}">${i+1}</text>`:''}</g>`;}).join('');
 return `<div class="ir-diagram"><svg style="min-width:${expanded?width:0}px" viewBox="0 0 ${width} ${height}" role="img" aria-label="ต้นไม้มีราก ${E(root.label)}; L คือลูกซ้าย R คือลูกขวา">${edges}${nodes}</svg></div>`;
}
const tokens=value=>String(value).trim().replace(/[\[\](),→]+/g,' ').split(/\s+/).filter(Boolean).map(v=>v.toUpperCase());
function matches(value,expected){const actual=tokens(value);return actual.length===expected.length&&actual.every((v,i)=>v===expected[i].toUpperCase());}
function mount(host){
 let index=0,mode='pre',step=0,status='',expanded=false,store={};
 try{store=JSON.parse(localStorage.getItem('ood-irregular-trees-v1'))||{};if(typeof store!=='object'||Array.isArray(store))store={};}catch{}
 const key=()=>`${sets[index].id}/${mode}`;
 const save=()=>{try{localStorage.setItem('ood-irregular-trees-v1',JSON.stringify(store));}catch{}};
 const solved=()=>sets.reduce((sum,set)=>sum+Object.keys(modes).filter(m=>{const e=store[`${set.id}/${m}`];return e?.checked&&!e.revealed&&matches(e.value,walk(set.root,m).map(x=>x.label));}).length,0);
 function paint(){
  const set=sets[index],order=walk(set.root,mode),entry=store[key()]||{},expected=order.map(x=>x.label),correct=matches(entry.value||'',expected);
  host.innerHTML=`<div class="page-intro"><h1 class="page-title">ต้นไม้ไม่สมมาตร ลองเดินให้ครบ</h1><p>12 รูป × 4 วิธี = 48 ข้อฝึกเพิ่มเติม · สร้างใหม่ตามแนวภาพที่คุณส่ง</p></div><aside class="note">เดินเฉพาะปมที่วาดไว้ กิ่งที่ไม่มีให้ข้าม เลขและตัวอักษรไม่จำเป็นต้องเรียงหรือครบชุด · L = ลูกซ้าย / R = ลูกขวา</aside><div class="filter-bar"><label>เลือกรูปต้นไม้<select id="ir-set">${sets.map((s,i)=>`<option value="${i}" ${i===index?'selected':''}>${s.title}</option>`).join('')}</select></label><label>วิธีที่ต้องตอบ<select id="ir-mode">${Object.entries(modes).map(([m,[name]])=>`<option value="${m}" ${m===mode?'selected':''}>${name}</option>`).join('')}</select></label><span class="meta" id="ir-score">ทำถูกด้วยตัวเอง ${solved()} / 48 ข้อ</span></div><section class="lab-stage"><div class="section-heading"><h2>${set.title}</h2><span class="meta">${order.length} ปม</span></div><p class="muted">${set.hint}</p><p><b>โจทย์:</b> จงเขียนลำดับ <b>${modes[mode][0]}</b> ของต้นไม้ในรูปให้ครบทุกปม</p><p class="small">กติกา: ${modes[mode][1]} · L / R บอกด้านของลูกตามรูป</p><button class="btn tiny" data-ir="zoom">${expanded?'ดูภาพเต็ม':'ขยายภาพ (เลื่อนแนวนอนได้)'}</button><div id="ir-picture">${diagram(set.root,order.slice(0,step),expanded)}</div><details class="ir-links"><summary>อ่านความสัมพันธ์พ่อ–ลูกเป็นข้อความ</summary>${S.ui.table(['ปม','ลูกซ้าย','ลูกขวา'],walk(set.root,'level').map(node=>[E(node.label),node.left?E(node.left.label):'ไม่มี',node.right?E(node.right.label):'ไม่มี']))}</details><label for="ir-answer">คำตอบ ${modes[mode][0]} — คั่นแต่ละค่าด้วยช่องว่าง จุลภาค หรือ →</label><input class="ir-answer" id="ir-answer" autocomplete="off" spellcheck="false" placeholder="พิมพ์ลำดับปมจากรูป" value="${E(entry.value||'')}"><div class="button-row"><button class="btn primary" data-ir="check">ตรวจคำตอบ</button><button class="btn" data-ir="reset">ทำข้อนี้ใหม่</button></div><div id="ir-feedback" aria-live="polite">${status?`<p>${E(status)}</p>`:entry.checked?`<div class="feedback ${correct?'':'wrong'}">${correct?'✓ ลำดับถูกต้องครบทุกปม':'ลำดับยังไม่ถูก ลองไล่ตามกติกาอีกครั้ง'}${entry.revealed?' · ข้อนี้เคยเปิดเฉลยแล้ว จึงไม่นับคะแนน':''}</div>`:''}</div><div class="ir-solution"><h3>เฉลยทีละปม</h3><p class="small muted">ปุ่มด้านล่างจะเปิดเฉลยและไม่นับคะแนนข้อนี้ จนกว่าจะทำข้อนี้ใหม่</p><div class="button-row"><button class="btn" data-ir="back" ${step===0?'disabled':''}>← ย้อนหนึ่งปม</button><button class="btn" data-ir="step" ${step===order.length?'disabled':''}>${step?'ปมถัดไป →':'เริ่มดูทีละปม →'}</button><button class="btn" data-ir="all">แสดงเฉลยทั้งหมด</button></div><p id="ir-sequence" role="status">${step?`บันทึกแล้ว ${step}/${order.length}: <b>${order.slice(0,step).map(x=>E(x.label)).join(' → ')}</b>`:'ยังไม่เปิดเฉลย'}</p><p class="small">${step?`ปมที่บันทึกล่าสุดคือ ${E(order[step-1].label)} · เลขเล็กบนรูปคือลำดับที่บันทึกตาม ${modes[mode][0]}`:'การเดินผ่านปมกับการบันทึกปมเป็นคนละจังหวะ โดยเฉพาะ Inorder และ Postorder'}</p></div><div class="footer-nav"><button class="btn" data-ir="prev" ${index===0?'disabled':''}>← รูปก่อนหน้า</button><a class="btn" href="#chapter/tree">ทบทวนหลักการ</a><button class="btn primary" data-ir="next" ${index===sets.length-1?'disabled':''}>รูปถัดไป →</button></div></section>`;
  host.querySelector('#ir-set').onchange=e=>{index=Number(e.target.value);step=0;status='';paint();};
  host.querySelector('#ir-mode').onchange=e=>{mode=e.target.value;step=0;status='';paint();};
  host.querySelector('#ir-answer').oninput=e=>{store[key()]={...store[key()],value:e.target.value,checked:false};status='';save();host.querySelector('#ir-feedback').textContent='';host.querySelector('#ir-score').textContent=`ทำถูกด้วยตัวเอง ${solved()} / 48 ข้อ`;};
  host.querySelectorAll('[data-ir]').forEach(button=>button.onclick=()=>{
   const action=button.dataset.ir;
   if(action==='check'){
    const entry=store[key()]||{};const actual=tokens(entry.value||'');
    if(!actual.length){status='พิมพ์คำตอบก่อน แล้วค่อยกดตรวจ';paint();return;}
    entry.checked=true;store[key()]=entry;status='';
    if(!matches(entry.value,expected)){const first=actual.findIndex((v,i)=>v!==expected[i]?.toUpperCase());status=`ยังไม่ถูก: ${actual.length!==expected.length?`ตอบมา ${actual.length} ค่า แต่รูปมี ${expected.length} ปม · `:''}เริ่มทบทวนตั้งแต่ตำแหน่ง ${first>=0?first+1:actual.length+1} แล้วลองใหม่`;}
   }else if(action==='zoom'){expanded=!expanded;}else if(action==='reset'){delete store[key()];step=0;status='';}
   else if(action==='prev'||action==='next'){index+=action==='next'?1:-1;step=0;status='';}
   else{if(action==='back')step=Math.max(0,step-1);else{step=action==='all'?order.length:Math.min(order.length,step+1);store[key()]={...store[key()],revealed:true};}status='';}
   save();paint();
  });
 }
 paint();
}
S.treePractice={sets,walk,diagram,matches,mount};
})();
