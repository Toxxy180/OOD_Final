/* Extra fixDown drills. Only the three worksheet arrays come from existing course notes. */
(() => {
'use strict';
const S=window.Study,E=S.esc,{code,table,note}=S.ui;
const sets=[
 {id:'left',name:'เลือกลูกซ้าย',values:[10,50,40,20,30,35,5],k:0,why:'50 มากกว่า 40 จึงเลือกซ้ายก่อน แล้วเปรียบเทียบลูกใหม่ทุกชั้น'},
 {id:'right',name:'เลือกลูกขวา',values:[10,30,60,20,25,50,40],k:0,why:'ต้องเทียบลูกทั้งสองก่อน ขวามี 60 มากกว่า 30 จึงเลือกขวา'},
 {id:'deep',name:'ลงหลายชั้นและเปลี่ยนฝั่ง',values:[1,90,80,70,85,60,75,30,40,50,65,20,10,55,45],k:0,why:'เส้นทาง 0 → 1 → 4 → 10 ต้องเลือกใหม่ทุกชั้น ไม่ได้ลงฝั่งเดิมเสมอ'},
 {id:'one-child',name:'มีลูกซ้ายเพียงตัวเดียว',values:[90,80,10,70,60,50],k:2,why:'index 2 มีลูก index 5 แต่ไม่มี index 6 ต้องตรวจ c+1 < size ก่อนอ่านขวา'},
 {id:'ordered',name:'พ่อถูกตำแหน่งอยู่แล้ว',values:[90,80,70,50,40,60,30],k:0,why:'90 ≥ ลูกที่มากที่สุด 80 จึงหยุดได้ทันที แม้พ่อยังมีลูก'},
 {id:'tie',name:'ลูกสองข้างมีค่าเท่ากัน',values:[5,40,40,30,20,35,10],k:0,why:'โค้ดใช้ > เมื่อเทียบขวากับซ้าย จึงเลือกซ้ายเมื่อค่าเท่ากัน'},
 {id:'equal-parent',name:'พ่อเท่ากับลูกที่เลือก',values:[40,40,30,20,10],k:0,why:'max-heap อนุญาตพ่อเท่าลูก ถ้าลูกไม่ได้มากกว่าพ่อก็ไม่สลับ'},
 {id:'internal',name:'fixDown ที่ปมภายใน',values:[100,5,90,60,70,80,85,50,40,65,55],k:1,why:'เริ่มที่ k=1 และปรับเฉพาะ subtree นี้ ปมใน subtree ขวาของรากไม่เปลี่ยน'},
 {id:'negative',name:'ศูนย์และจำนวนติดลบ',values:[-20,0,-3,-5,-10,-7,-9],k:0,why:'เทียบค่าจริง ไม่ใช่ค่าสัมบูรณ์: 0 > -3 และ -5 > -10'},
 {id:'leaf',name:'เริ่มที่ใบ / heap ตัวเดียว',values:[42],k:0,why:'2*k+1 = 1 ไม่เล็กกว่า size จึงไม่เข้า while และไม่มีการสลับ'},
 ...S.heapSets.map((s,i)=>({id:`build-${i}`,name:`heapify · ${s.name}`,values:s.values,operation:'heapify',source:i===0?'ตรวจจากต้นฉบับ: แบบฝึกหัด_ครั้งที่7_เฉลย.pdf หน้า 2':'ชุดข้อมูลที่เว็บอ้างไว้เดิม: แบบฝึก BinaryHeap_8 หน้า 1–3 (ยังไม่ได้ตรวจไฟล์ต้นฉบับ)',why:'ทำ k=floor(n/2)−1 ย้อนถึง 0 เพื่อให้ subtree ของลูกเป็น heap ก่อนปรับพ่อ'})),
 ...[
  ['even','heapify · จำนวนคู่ / พ่อสุดท้ายมีลูกเดียว',[2,9,7,6,5,8]],
  ['full','heapify · เต็ม 3 ระดับ',[1,2,3,4,5,6,7]],
  ['incomplete','heapify · ระดับสุดท้ายไม่เต็ม',[12,3,17,8,34,25,1,19,6,40]],
  ['four-levels','heapify · เต็ม 4 ระดับ',[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15]],
  ['duplicates','heapify · ค่าซ้ำหลายตำแหน่ง',[4,9,9,4,2,9,2,9,4]],
  ['signed','heapify · ศูนย์และค่าติดลบ',[-8,0,-3,7,-10,2,-1,-5,4]]
 ].map(([id,name,values])=>({id:`build-${id}`,name,values,operation:'heapify',why:'เติมต้นไม้ตามระดับก่อน แล้ว fixDown จากพ่อสุดท้ายย้อนถึงราก ตามวิธีในเฉลยครั้งที่ 7 หน้า 2; ข้อมูลชุดนี้สร้างเพิ่ม'})),
 {id:'pop-right',name:'dequeue แล้วลงทางขวา',values:[60,13,50,5,12,4,40],operation:'pop',why:'คืน 60 แล้วย้ายตัวท้าย 40 ขึ้นราก ลด size ก่อน fixDown: ต้องเลือก 50 ไม่ใช่ 13'},
 {id:'pop-deep',name:'dequeue แล้วลงหลายชั้น',values:[100,90,80,70,60,50,40,30,20,10,5],operation:'pop',why:'คืน 100 ย้าย 5 ขึ้นราก แล้วไล่ลง 0 → 1 → 3 → 7 โดยช่องท้ายถูกนำออกแล้ว'},
 {id:'sort',name:'Heapsort · ลดขอบเขต heap',values:[4,10,3,5,1],operation:'sort',why:'สร้าง max-heap ก่อน จากนั้นสลับรากไปท้าย ลด n และ fixDown เฉพาะ prefix; ส่วนท้ายที่เรียงแล้วห้ามถูกดึงกลับ'},
 {id:'min-right',name:'Min-heap · เลือกลูกที่น้อยกว่า',values:[50,20,10,30,40,15,25],k:0,mode:'min',why:'กลับทิศการเทียบ: เลือกลูกที่น้อยกว่า และหยุดเมื่อพ่อ ≤ ลูกที่เลือก'},
 {id:'min-tie',name:'Min-heap · ค่าซ้ำและติดลบ',values:[5,-10,-10,-5,0,-3,2],k:0,mode:'min',why:'ลูกเท่ากันเลือกซ้ายตามโค้ด จากนั้น -5 น้อยกว่า 0 จึงลงซ้ายอีกครั้ง'}
].sort((a,b)=>(a.operation==='heapify'?0:1)-(b.operation==='heapify'?0:1));

function run(set) {
 const a=[...set.values],steps=[],mode=set.mode||'max';
 const push=(kind,message,n=a.length,active=[],extra={})=>steps.push({a:[...a],kind,message,n,active,...extra});
 const down=(k,n=a.length)=>S.algorithms.fixDown(a,k,n,steps,mode);
 const build=()=>{
  for(let k=Math.floor(a.length/2)-1;k>=0;k--){
   push('start',`เริ่ม fixDown(${k}) · subtree ของลูกพร้อมแล้ว`,a.length,[k],{k});down(k);
  }
 };
 push('initial',`ข้อมูลเริ่มต้น · ${mode==='min'?'min':'max'}-heap · index เริ่ม 0`);
 let removed;
 if(set.operation==='heapify')build();
 else if(set.operation==='pop'){
  removed=a[0];const last=a.pop();if(a.length)a[0]=last;
  push('remove',`dequeue คืน ${removed} · ย้าย ${last} ขึ้นราก และลด size เหลือ ${a.length}`,a.length,a.length?[0]:[]);
  if(a.length)down(0);
 }else if(set.operation==='sort'){
  build();
  for(let n=a.length-1;n>0;n--){
   [a[0],a[n]]=[a[n],a[0]];
   push('extract',`ส่งค่าสูงสุด ${a[n]} ไป index ${n} · ลดขอบเขต heap เหลือ [0, ${n})`,n,[0,n]);down(0,n);
  }
 }else{
  push('start',`เริ่ม fixDown(${set.k}) · subtree ของลูกเป็น heap อยู่แล้ว`,a.length,[set.k],{k:set.k});down(set.k);
 }
 push('done',set.operation==='sort'?'เสร็จ: เรียงน้อยไปมากในอาร์เรย์เดิม':`เสร็จ: ${mode}-heap รักษาเงื่อนไขพ่อ ${mode==='min'?'≤':'≥'} ลูก`,set.operation==='sort'?0:a.length);
 return {a,steps,removed};
}

function parseAnswer(raw){
 const text=raw.trim().replace(/^\[\s*/, '').replace(/\s*\]$/, '').trim();
 if(!text)return null;
 const parts=text.split(/[\s,→]+/);
 if(parts.some(p=>!/^[-+]?\d+$/.test(p)))return null;
 const a=parts.map(Number);return a.every(Number.isSafeInteger)?a:null;
}

const variants=[
 ['ต้นฉบับ · Object / Comparable (ครั้งที่ 7 หน้า 5–6)',`private void fixDown(int k) {
    int c;
    while ((c = 2*k + 1) < size) {
        if (c + 1 < size && greaterThan(c + 1, c)) c++;
        if (!greaterThan(c, k)) break;
        swap(k, c);
        k = c;
    }
}
boolean greaterThan(int i, int j) {
    Comparable e = (Comparable) elementData[i];
    return e.compareTo(elementData[j]) > 0;
}`],
 ['วนซ้ำ + swap · ระบุขอบเขต n สำหรับ Heapsort',`// index เริ่ม 0; n คือจำนวนสมาชิกในช่วง heap
private void fixDown(int k, int n) {
    while (2*k + 1 < n) {
        int c = 2*k + 1;
        if (c + 1 < n && a[c + 1] > a[c]) c++;
        if (a[k] >= a[c]) break;
        swap(k, c);
        k = c;
    }
}`],
 ['Recursive · เลือกลูกก่อน แล้วเรียกตัวเอง',`private void fixDownRecursive(int k, int n) {
    int c = 2*k + 1;
    if (c >= n) return;
    if (c + 1 < n && a[c + 1] > a[c]) c++;
    if (a[k] >= a[c]) return;
    swap(k, c);
    fixDownRecursive(c, n);
}`],
 ['Hole / เลื่อนลูกขึ้น · เก็บค่าพ่อไว้ก่อน',`private void fixDownHole(int k, int n) {
    int value = a[k]; // ต้องมี 0 <= k < n
    while (2*k + 1 < n) {
        int c = 2*k + 1;
        if (c + 1 < n && a[c + 1] > a[c]) c++;
        if (value >= a[c]) break;
        a[k] = a[c]; // เลื่อนลูกขึ้นมาเติมช่องว่าง
        k = c;
    }
    a[k] = value; // ใส่ค่าเดิมเมื่อได้ตำแหน่ง
}`],
 ['Min-heap · กลับเครื่องหมายสองจุด',`private void fixDownMin(int k, int n) {
    while (2*k + 1 < n) {
        int c = 2*k + 1;
        if (c + 1 < n && a[c + 1] < a[c]) c++;
        if (a[k] <= a[c]) break;
        swap(k, c);
        k = c;
    }
}`],
 ['Index เริ่ม 1 · เก็บสมาชิกใน a[1..n]',`private void fixDownOneBased(int k, int n) {
    while (2*k <= n) {
        int c = 2*k;
        if (c + 1 <= n && a[c + 1] > a[c]) c++;
        if (a[k] >= a[c]) break;
        swap(k, c);
        k = c;
    }
} // root=1, parent=k/2, heapify เริ่ม k=n/2`]
];

function mount(root,{treeSVG}){
 let index=0,step=0,raw='',feedback='',revealed=false,result=run(sets[index]);
 function paint(){
  const set=sets[index],current=result.steps[step],operation=set.operation||'fixDown';
  root.innerHTML=`<div class="topbar"><a href="#heap">← Binary Heap</a><span>ชุดฝึกเสริม ${sets.length} รูปแบบ</span></div>
   <div class="page-intro"><h1 class="page-title">Binary Heap · ฝึก fixDown</h1><p>อ่านต้นไม้ → เลือกลูก → เทียบกับพ่อ → สลับแล้วลงต่อ ฝึกทั้งการปรับปมเดียวและการนำไปใช้</p></div>
   <div class="fixdown-layout"><section class="lab-stage fixdown-stage" aria-label="โจทย์ fixDown">
   <div class="lab-controls"><label class="wide-label" for="fixdown-set">เลือกรูปแบบ <select id="fixdown-set">${sets.map((s,i)=>`<option value="${i}" ${i===index?'selected':''}>${i+1}. ${E(s.name)}</option>`).join('')}</select></label></div>
   <h2>${E(set.name)}</h2><p class="source-line">${E(set.source||'โจทย์สร้างเพิ่มสำหรับฝึกหลักการ ไม่ใช่โจทย์ต้นฉบับจากสไลด์')} · ภาพทุกชุดใช้ index เริ่ม 0</p>
   <p><b>คำสั่ง:</b> ${operation==='fixDown'?`ทำ fixDown(${set.k}) แบบ ${set.mode||'max'}-heap`:operation==='heapify'?'สร้าง max-heap ด้วย bottom-up fixDown จากพ่อสุดท้ายย้อนถึงราก':operation==='pop'?'dequeue ค่ามากสุด 1 ครั้ง แล้ว fixDown(0)':'เรียงน้อยไปมากด้วย Heapsort และ fixDown ในช่วง heap ที่เหลือ'}</p>
   <p class="heap-sequence">เริ่ม [${set.values.join(', ')}]</p>
   <form id="fixdown-answer"><label for="fixdown-input">ลองเติมอาร์เรย์${operation==='sort'?'ที่เรียงแล้ว':'สุดท้าย'}ก่อนเปิดเฉลย</label><input id="fixdown-input" type="text" autocomplete="off" placeholder="เช่น 50, 30, 40, …" value="${E(raw)}"><div class="button-row"><button class="btn primary" type="submit">ตรวจคำตอบ</button><button class="btn" type="button" data-fd="reset">เริ่มข้อนี้ใหม่</button></div></form>
   <div class="fixdown-feedback" role="status">${E(feedback)}</div>
   <div class="button-row fixdown-steps"><button class="btn tiny" data-fd="back" ${step===0?'disabled':''}>← ขั้นก่อน</button><span class="meta">ขั้น ${step+1} / ${result.steps.length}</span><button class="btn tiny" data-fd="next" ${step===result.steps.length-1?'disabled':''}>ขั้นถัดไป →</button><button class="btn tiny" data-fd="all">ดูผลสุดท้าย</button></div>
   <div class="lab-status" role="status">${E(current.message)}</div><p class="small muted">size ของช่วง heap = ${current.n}${current.k!==undefined?` · k = ${current.k}`:''}${current.c!==null&&current.c!==undefined?` · c = ${current.c}`:''} · สีเขียวคือปมที่กำลังพิจารณา${operation==='sort'?' · ช่อง “เรียงแล้ว” อยู่นอก heap':''}</p>
   <div class="array-view" role="group" aria-label="อาร์เรย์ในขั้นปัจจุบัน">${current.a.map((v,i)=>`<div class="array-cell ${current.active.includes(i)?'active':''} ${i>=current.n?'fixdown-sorted':''}"><small>${i}</small><b>${v}</b>${i>=current.n?'<small>เรียงแล้ว</small>':''}</div>`).join('')}</div>
   <p class="small muted fixdown-scroll-hint">เลื่อนอาร์เรย์และภาพต้นไม้ซ้าย–ขวาได้เมื่อหน้าจอแคบ</p><div class="tree-demo">${treeSVG(current.a.slice(0,current.n),current.active.filter(i=>i<current.n))}</div>
   ${revealed?`<details class="answer"><summary>เหตุผลและตารางเฉลยทุกขั้น</summary><div><p>${E(set.why)}</p>${result.removed===undefined?'':`<p>ค่าที่ dequeue คืน = <b>${result.removed}</b></p>`}<p>ผลสุดท้าย: <b>[${result.a.join(', ')}]</b></p>${table(['ขั้น','เหตุผล','Array'],result.steps.map((s,i)=>[i+1,E(s.message),s.a.join(', ')]))}</div></details>`:''}
   <div class="button-row"><button class="btn" data-fd="prev-case" ${index===0?'disabled':''}>← ข้อก่อน</button><button class="btn" data-fd="next-case" ${index===sets.length-1?'disabled':''}>ข้อถัดไป →</button></div></section>
   <aside class="article fixdown-guide"><h2>จำก่อนลงมือ</h2><ol><li>ลูกซ้าย c = 2*k+1 ต้องอยู่ในช่วง heap</li><li>ถ้ามีขวา เลือกลูกที่มากกว่า (max) หรือน้อยกว่า (min)</li><li>หยุดเมื่อพ่ออยู่ถูกลำดับแล้ว รวมกรณีเท่ากัน</li><li>ถ้าสลับ ให้ k = c แล้วกลับไปเลือกลูกใหม่</li></ol>${note('fixDown ปมเดียวสมมติว่า subtree ของลูกเป็น heap แล้ว ถ้าข้อมูลทั้งก้อนยังไม่เป็น heap ต้องทำ bottom-up ครบทุกพ่อ')}
   ${table(['งาน','จุดเริ่ม / ขอบเขต'],[['fixDown(k)','ปรับเส้นทางลงจาก k · O(log n) worst case'],['heapify','k=floor(n/2)−1 → 0 · Θ(n)'],['dequeue','ย้ายท้ายขึ้นราก ลด size แล้ว fixDown(0) · O(log n)'],['Heapsort','swap รากกับท้าย ลดขอบเขต แล้ว fixDown(0) · O(n log n)']])}<p class="small muted">ตรวจชุดข้อมูลและภาพคำตอบกับแบบฝึกหัด_ครั้งที่7_เฉลย.pdf หน้า 2 และโค้ดหน้า 5–6 แล้ว ตัวอย่างเสริมแสดงวิธีประยุกต์ ไม่ได้อ้างว่าทุกแบบปรากฏในเอกสาร</p></aside></div>
   <section class="article fixdown-variants"><h2>โค้ด fixDown หลายแบบ</h2><p>แบบแรกยึด Object / Comparable ตามเฉลยครั้งที่ 7 หน้า 5–6 แบบอื่นเป็นตัวอย่างเสริมสำหรับ int[] a ทั้งหมดเป็น method fragment ต้องประกอบกับ field และ swap ก่อนใช้ แบบวนซ้ำ, recursive และ hole ให้ผลเดียวกันเมื่อเลือกซ้ายกรณีค่าเท่ากัน</p>${variants.map(([title,source])=>`<details class="answer"><summary>${E(title)}</summary><div>${code(source)}</div></details>`).join('')}<p>แบบวนซ้ำและ hole ใช้พื้นที่เสริม O(1); recursive ใช้ call stack O(log n) ส่วนแบบ index เริ่ม 1 ต้องเปลี่ยนสูตรและขอบเขตทั้งชุด ภาพฝึกด้านบนใช้ index เริ่ม 0</p><p><a href="#chapter/heap">อ่านบท Priority Queue & Heap</a> · <a href="#teacher/7">เฉลยครั้งที่ 7</a> · <a href="#lab/heap">ตัวจำลอง enqueue / dequeue</a></p></section>`;
  root.querySelector('#fixdown-set').addEventListener('change',e=>choose(Number(e.target.value)));
  root.querySelector('#fixdown-input').addEventListener('input',e=>{raw=e.target.value;feedback='';root.querySelector('.fixdown-feedback').textContent='';});
  root.querySelector('#fixdown-answer').addEventListener('submit',e=>{
   e.preventDefault();const actual=parseAnswer(raw);
   if(!actual)feedback='กรอกจำนวนเต็ม คั่นด้วยจุลภาค ช่องว่าง หรือ →';
   else if(actual.length!==result.a.length)feedback=`ยังไม่ครบตามโจทย์: ต้องมี ${result.a.length} ค่า แต่ตอบมา ${actual.length} ค่า`;
   else{const wrong=actual.findIndex((v,i)=>v!==result.a[i]);if(wrong===-1){feedback='ถูกต้อง ✓ อาร์เรย์ตรงตามวิธีและกติกาของข้อนี้';revealed=true;}else feedback=`ยังไม่ตรงที่ index ${wrong} ลองไล่การเลือกลูกอีกครั้ง (ข้อนี้เลือกซ้ายเมื่อค่าเท่ากัน)`;}
   paint();
  });
 }
 function choose(next){index=next;step=0;raw='';feedback='';revealed=false;result=run(sets[index]);paint();}
 root.onclick=e=>{
  const button=e.target.closest('[data-fd]');if(!button||button.disabled)return;
  const action=button.dataset.fd;
  if(action==='prev-case'||action==='next-case'){choose(index+(action==='prev-case'?-1:1));return;}
  if(action==='reset'){choose(index);return;}
  if(action==='back')step=Math.max(0,step-1);
  else{step=action==='all'?result.steps.length-1:Math.min(step+1,result.steps.length-1);revealed=true;}
  paint();
 };
 paint();
}
S.heapPractice={sets,run,parseAnswer,variants,mount};
})();
