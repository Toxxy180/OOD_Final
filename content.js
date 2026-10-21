/* Original study notes based on the supplied course files; PDF page references below. */
window.Study = {esc:s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])),chapters:[],questions:[]};
(() => {
const S=window.Study;
const code=s=>`<pre><code>${S.esc(s.trim())}</code></pre>`;
const table=(heads,rows)=>`<div class="table-scroll"><table><thead><tr>${heads.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const list=a=>`<ul>${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const note=s=>`<aside class="note">${s}</aside>`;
const answer=(q,a)=>`<details class="answer"><summary>${q}</summary><div>${a}</div></details>`;
const section=(title,html)=>({title,html});
S.ui={code,table,list,note,answer,section};
S.chapters.push({id:'oop',n:'00',title:'พื้นฐาน Java & OOP',subtitle:'เข้าใจสัญญา คลาส และตัวอ้างอิง ก่อนเริ่มโครงสร้างข้อมูล',minutes:25,focus:'extends · implements · reference',sources:['INTRO_69.pdf หน้า 2–13','COLLECTION_1_2n.pdf หน้า 24–31, 43–53','แบบฝึก Collection_1 หน้า 1–4; Collection_2 หน้า 1–2'],takeaway:'ชนิดที่เก็บบอกพฤติกรรม ส่วน Array / Linked / Tree บอกวิธีสร้าง — อ่าน interface ก่อนเติมโค้ด',sections:[
section('ภาพรวม: เลือกโครงสร้างให้เหมาะกับงาน',`<p>โครงสร้างข้อมูลคือวิธีจัดเก็บและจัดการข้อมูล อัลกอริทึมคือลำดับขั้นตอนแก้ปัญหา ต้องพิจารณาความถูกต้อง เวลา และหน่วยความจำ ไม่มีวิธีที่ดีที่สุดสำหรับทุกงาน</p>${table(['ชนิดที่เก็บ (ADT)','สัญญา','ตัวอย่างวิธีสร้าง'],[['Collection ในบทเรียน','ไม่รับประกันลำดับ เก็บซ้ำได้','ArrayCollection / LinkedCollection'],['Set','ไม่เก็บค่าซ้ำ','Array / Linked / Tree / Hash table'],['List','มีตำแหน่ง 0…size−1 เก็บซ้ำได้','ArrayList / SinglyLinkedList / LinkedList'],['Stack','LIFO: เข้าทีหลังออกก่อน','Array / List / Linked'],['Queue','FIFO: เข้าก่อนออกก่อน','Circular array / Linked'],['Priority Queue','ออกตามความสำคัญ','ArrayList / Binary Heap']])}${note('“มีลำดับ” ใน List หมายถึงมีตำแหน่ง ไม่ได้แปลว่าเรียงจากน้อยไปมาก และ Collection ในบทเรียนไม่ใช่รายละเอียดทั้งหมดของ java.util.Collection')}`),
section('Class, Interface, Object และ Constructor',`${list(['<b>class</b> คือแบบสร้างวัตถุ มี field เก็บสถานะและ method ให้บริการ; <b>object</b> คือสิ่งที่สร้างจาก new','<b>interface</b> กำหนดสัญญาที่เรียกได้ คลาสที่ไม่เป็น abstract ต้องทำ abstract methods ที่ยังไม่มี implementation ให้ครบ','<b>constructor</b> ชื่อเหมือนคลาส ไม่มีชนิดค่าคืน ใช้ตั้งสถานะเริ่มต้น ไม่ถูกสืบทอด และ interface ไม่มี constructor','<code>this.x</code> คือ field ของวัตถุปัจจุบัน; <code>super(...)</code> เรียก constructor แม่; <code>super.add(e)</code> เรียก implementation แม่','<code>static</code> เป็นสมาชิกระดับคลาส เรียกผ่านชื่อคลาสได้ ส่วน method ปกติใช้กับ instance'])}${code(`interface Bag {
    void add(Object e);
    int size();
}
class ArrayBag implements Bag {
    protected Object[] data;
    protected int size;
    ArrayBag(int capacity) { data = new Object[capacity]; }
    public void add(Object e) { data[size++] = e; }
    public int size() { return size; }
}
Bag b = new ArrayBag(10);
b.add("A"); // ใช้งาน implementation ของ ArrayBag`)}<p>ตัวอย่างย่อนี้สมมติว่ายังไม่เต็ม โค้ดใช้งานต้องตรวจความจุและข้อมูลด้วย</p>${note('interface ตัวอย่างในวิชามีแต่ abstract methods แต่ Java 8 ขึ้นไปมี default และ static methods ที่มี body ได้ จึงไม่ควรจำว่า interface “มีโค้ดไม่ได้ทุกกรณี” ดูเอกสาร Oracle ในหน้าอ้างอิง')}`),
section('การสืบทอดและระดับการเข้าถึง',`${table(['รูปแบบ','ความหมาย / จุดระวัง'],[['class B extends A','B สืบทอด A; มีแม่โดยตรงได้หนึ่งคลาส'],['class B implements I','ทำตามสัญญา I; implementation ของ abstract methods ต้องเป็น public'],['interface I extends J','interface เพิ่มสัญญาจาก interface; ไม่ใช้ implements'],['private','ลูกที่เป็นคลาสแยกเข้าถึง field แม่โดยตรงไม่ได้'],['protected','เข้าถึงใน package และ subclass ตามกฎ Java'],['override','signature เดิม เปลี่ยนพฤติกรรม; ลดระดับการเข้าถึงไม่ได้'],['overload','ชื่อเดิม พารามิเตอร์ต่าง เช่น remove(Object) กับ remove(int)']])}${code(`class ArrayBagPrint extends ArrayBag {
    ArrayBagPrint(int capacity) { super(capacity); }
    public void print() {
        for (int i = 0; i < size; i++) System.out.println(data[i]);
    }
}`)}<p>ถ้าแม่มีเฉพาะ constructor รับ int ลูกต้องส่งค่าให้ super(...); จะเรียก super() ที่ไม่มีไม่ได้ ตัวอย่างเว็บใช้ Java 17 และวาง super(...) เป็นคำสั่งแรก</p>`),
section('Reference, Object[] และ equals',`<p>Object[] เก็บ <b>reference</b> ไปยังวัตถุ การกำหนด b=a คัดลอก reference ทำให้ชี้วัตถุเดียวกัน ส่วน new Object[n] สร้างอาร์เรย์ใหม่ที่ทุกช่องเริ่มเป็น null</p>${list(['<code>==</code> กับ reference ตรวจวัตถุเดียวกัน; <code>equals</code> ตรวจความเท่ากันตามคลาส เช่น String เทียบเนื้อหา','Object[] รับวัตถุ; int เก็บผ่าน Integer เช่น a[0]=7 เกิด autoboxing ไม่ได้แปลว่าต้องเป็นชนิดเดียวกันทุกช่องเสมอ','คัดลอกช่อง array เป็น <b>shallow copy</b>: อาร์เรย์ใหม่แต่สมาชิกยังเป็น reference เดิม','x++ ใช้ค่าเดิมก่อนเพิ่ม; --x ลดก่อนใช้ ดังนั้น data[--size]=null ล้างช่องสุดท้ายเดิม','Java ส่งพารามิเตอร์แบบ pass-by-value สำหรับ object ค่าที่ส่งคือ reference แก้ field ได้ แต่กำหนดพารามิเตอร์ให้ชี้ใหม่ไม่เปลี่ยนตัวแปรผู้เรียก'])}${answer('งานเดิม: c1 มี A,C และ c2 มี B; c1.add(c2); c2.add(c1)',`<p>ได้ <b>c1.size()=3, c2.size()=2</b> เพราะเพิ่ม reference ตัวเดียว ไม่ได้รวมสมาชิก การพิมพ์ขึ้นกับ toString() ไม่ควรเดาเลข hash และถ้าเขียน toString แบบไล่ซ้อนวงจรนี้จะวนไม่จบ</p>`)}`),
section('15-puzzle: Queue + Set + prev',`<p>ใช้ Queue เก็บกระดานที่รอขยายเพื่อสำรวจแบบ BFS ใช้ Set เก็บสถานะที่เคยพบเพื่อไม่วนซ้ำ และ prev เชื่อมกระดานก่อนหน้าเพื่อย้อนหาคำตอบ เมื่อทุกก้าวมีต้นทุนเท่ากัน BFS ให้จำนวนก้าวสั้นที่สุด ทำเครื่องหมาย visited ตอนค้นพบและนำเข้า Queue</p><p>Queue กับ Set ทำหน้าที่คนละอย่าง จึงต้องใช้ร่วมกันถ้าต้องการ FIFO และไม่ซ้ำ การที่ HashSet เร็วในตัวอย่าง ไม่ได้หมายความว่าดีที่สุดสำหรับทุกปัญหา</p>`),
section('วิธีทำโจทย์เติมโค้ดบนกระดาษ',`<ol><li>อ่าน interface: ชื่อ พารามิเตอร์ และชนิดค่าคืน เช่น void remove กับ boolean removed เป็นคนละสัญญา</li><li>จด invariant เช่น 0 ≤ size ≤ data.length และข้อมูลจริงอยู่ช่วงใด</li><li>ตรวจกรณีว่าง เต็ม ตัวแรก ตัวท้าย ไม่พบ และข้อมูลซ้ำ</li><li>ไล่ทีละบรรทัด จด array / ลูกศร / size หลังเปลี่ยน</li><li>เช็ก return, ; และตัวเล็กตัวใหญ่ เช่น boolean ไม่ใช่ Boolean เมื่อสัญญากำหนด boolean</li></ol>${note('Collection, List, Stack, Queue, PriorityQueue ในเอกสารเป็น interface ที่เขียนเอง อย่าใช้ signature ของ java.util แทนโดยอัตโนมัติ')}`)
]});
S.chapters.push({id:'array',n:'01',title:'Collection & Array',subtitle:'สร้างที่เก็บเอง และไล่อาร์เรย์ให้ถูกทุกช่อง',minutes:40,focus:'add · remove · capacity · copyRange',sources:['COLLECTION_1_2n.pdf หน้า 25–60, 74–77','แบบฝึก Collection_1 หน้า 2–6; Collection_2 หน้า 2–9','หนังสือ บท 2 หน้าเนื้อหา 19–38'],takeaway:'size คือจำนวนจริง; length คือความจุ — Collection เอาตัวท้ายมาแทนตัวที่ลบได้ เพราะไม่สัญญาว่ารักษาลำดับ',sections:[
section('Invariant และบริการพื้นฐาน',`<p>ใช้ Object[] elementData และ int size ข้อมูลจริงอยู่ติดกัน index 0…size−1 เช่น [A,B,C,null,null] มี size=3 แต่ capacity=5</p>${code(`private Object[] elementData;
private int size;
public ArrayCollection(int cap) {
    if (cap < 0) throw new IllegalArgumentException();
    elementData = new Object[cap];
    size = 0;
}
public int size() { return size; }
public boolean isEmpty() { return size == 0; }
private int indexOf(Object e) {
    for (int i = 0; i < size; i++)
        if (elementData[i].equals(e)) return i;
    return -1;
}
public boolean contains(Object e) { return indexOf(e) != -1; }`)}<p>ตัวอย่างไม่รับ null จึงเรียก equals จากสมาชิกได้ หากอนุญาต null ต้องเปลี่ยนวิธีเปรียบเทียบ เช่น Objects.equals</p>`),
section('add และการขยายอาร์เรย์',`${code(`public void add(Object e) {
    if (e == null) throw new IllegalArgumentException();
    ensureCapacity(size + 1);
    elementData[size++] = e;
}
private void ensureCapacity(int required) {
    if (required > elementData.length) {
        int capacity = Math.max(required, 2 * elementData.length);
        Object[] a = new Object[capacity];
        for (int i = 0; i < size; i++) a[i] = elementData[i];
        elementData = a;
    }
}`)}<p>จอง 3 ช่องแล้วเพิ่ม A,B,C,E: ตอนเพิ่ม E ขยายเป็น 6, คัดลอก 3 ตัวเดิม, ใส่ E ที่ index 3, size=4. เป็นการเปลี่ยน reference ไปก้อนใหม่ ไม่ใช่ยืดอาร์เรย์เดิม</p>${note('แบบฝึก Collection_2 หน้า 3 บรรยาย “2 เท่า” แต่โค้ดใช้ 3*length ซึ่งขัดกัน เว็บยึด 2 เท่าตามคำบรรยายและสไลด์หน้า 56 ถ้าข้อสอบให้โค้ด 3*length ต้องไล่ตามโค้ดนั้น Math.max ยังช่วยกรณีความจุเริ่มเป็น 0')}`),
section('remove: ย้ายตัวท้ายมาแทน',`${code(`public boolean remove(Object e) {
    int i = indexOf(e);
    if (i == -1) return false;
    elementData[i] = elementData[--size];
    elementData[size] = null;
    return true;
}`)}<p>ตัวอย่างเลือกคืน boolean ถ้า interface กำหนด void ต้องปรับ return ให้ตรง ค้นหา O(n) แต่แทนที่เมื่อรู้ index แล้ว O(1)</p>${table(['คำสั่ง','ข้อมูลจริง','size'],[['เริ่ม','A B C D','4'],['remove(B)','A D C','3'],['remove(A)','C D','2'],['remove(X)','C D ไม่เปลี่ยน','2'],['remove(D)','C','1']])}${note('ห้ามนำวิธีนี้ไปใช้กับ List ที่ต้องรักษาลำดับ และล้างช่องท้ายเป็น null เพื่อไม่เก็บ reference ที่เลิกใช้')}`),
section('clear, frequency, addSet และ copyObjectRange',`${code(`public void clear() {
    for (int i = 0; i < size; i++) elementData[i] = null;
    size = 0;
}
public int frequency(Object e) {
    int count = 0;
    for (int i = 0; i < size; i++)
        if (elementData[i].equals(e)) count++;
    return count;
}
public void addSet(Object e) { if (!contains(e)) add(e); }
public Object[] copyObjectRange(int start, int stop) {
    if (start < 0 || start > stop || stop >= size) return null;
    Object[] a = new Object[stop - start + 1];
    for (int i = start; i <= stop; i++) a[i-start] = elementData[i];
    return a;
}`)}<p>ช่วงในใบงาน <b>รวมปลายทั้งสองด้าน</b> จึงยาว stop−start+1. frequency คือจำนวนครั้งที่พบ: ไม่พบ=0, พบหนึ่ง=1 คำว่า “ซ้ำ” ในโจทย์กำกวม จึงยึดการนับตามตัวอย่างใช้งาน</p>${answer('งานเดิม: [A,B,C,D] copy(0,2), copy(1,5), clear()',`<p>ได้ [A,B,C], null เพราะเกินขอบเขต และ size=0 ตามลำดับ clear ไม่จำเป็นต้องลด capacity</p>`)}${answer('งานเดิม: เติม E,F,G,H,I,J; addSet(E); copy(2,4); ลบ get(2) แล้ว get(4)',`<p>addSet ไม่เพิ่ม size จึงยัง 6; copy ได้ [G,H,I]. ลบ G แล้วย้าย J มาแทนเป็น [E,F,J,H,I]. get(4) ตอนนี้คือ I ลบแล้วเหลือ [E,F,J,H]. หากเพิ่ม E สองครั้ง frequency(E)=3 และ frequency(F)=1</p>`)}`),
section('แบบไม่เก็บ size และพิมพ์ 3 คอลัมน์',`<p>ถ้าไม่เก็บ size ต้องเดินจนพบ null หรือจบอาร์เรย์ โดยข้อมูลจริงติดกันและห้ามเก็บ null. size() กลายเป็น O(n) ถ้าเรียกซ้ำใน loop อาจเพิ่มต้นทุนเป็น O(n²)</p>${code(`public int size() {
    int n = 0;
    while (n < elementData.length && elementData[n] != null) n++;
    return n;
}
// สมมติสัญญาของ c มี get(int) แล้ว
for (int i = 0; i < c.size(); i++) {
    System.out.printf("%-16s", c.get(i));
    if ((i + 1) % 3 == 0) System.out.println();
}
if (c.size() % 3 != 0) System.out.println();`)}${note('Collection interface เดิมไม่มี get(int) หากพารามิเตอร์เป็น Collection จะเรียก c.get(i) ไม่ได้ ต้องเพิ่มบริการในสัญญาหรือใช้สัญญาที่มี toArray/get')}`),
section('เฉลยผลรัน Collection_1',`${table(['คำสั่งที่พิมพ์','ผล'],[['isEmpty ก่อนเพิ่ม','true'],['size หลัง KMITL,LADKRABANG,BANGKOK','3'],['ลบ LADKRABANG แล้ว contains KMITL','true'],['contains LADKRABANG','false'],['contains BANGKOK','true'],['ลบ KMITL แล้ว size','1'],['เพิ่ม THAILAND แล้ว size','2']])}<p>รวมผล <code>true, 3, true, false, true, 1, 2</code>. BANGKOK ย้ายมาแทน LADKRABANG ระหว่างลบ</p>`)
]});
S.chapters.push({id:'complexity',n:'02',title:'ประสิทธิภาพ',subtitle:'นับงานให้เป็น แยก worst case กับ amortized',minutes:20,focus:'O · Θ · loop · amortized',sources:['COLLECTION_1_2n.pdf หน้า 61–73','หนังสือ บท 3 หน้าเนื้อหา 39–54'],takeaway:'O คือขอบเขตบน; Θ คือขอบเขตแน่น — Θ(n) ไม่ใช่เวลาคงที่',sections:[
section('นิยามและลำดับการเติบโต',`<p>n คือขนาดข้อมูล T(n) คือจำนวนงานพื้นฐาน <b>O(g(n))</b> เป็นขอบเขตบน, <b>Ω(g(n))</b> เป็นขอบเขตล่าง, <b>Θ(g(n))</b> เป็นขอบเขตแน่นทั้งบนและล่าง ไม่ใช่เวลาจริงเป็นวินาที</p>${code('O(1) < O(log n) < O(n) < O(n log n) < O(n²) < O(2ⁿ) < O(n!)')}${list(['3n²+5n+7 มี tight bound Θ(n²) ตัดค่าคงที่และเทอมอันดับต่ำ','O ไม่จำเป็นต้องแน่น: Θ(n) ก็อยู่ใน O(n²) แต่ปกติตอบขอบเขตที่แน่นที่สุดเมื่อทำได้','best/average/worst case เป็นกรณีข้อมูล ไม่ใช่คำแทน O/Θ/Ω','Θ อ่านว่า Theta (ทีตา) ไม่ใช่ Zeta; เวลาคงที่เขียน Θ(1)'])}`),
section('อ่าน loop ให้ถูก',`${table(['รูปแบบ','เหตุผล','เวลา'],[['i=0; i&lt;n; i++','n รอบ','Θ(n)'],['i=1; i&lt;n; i*=2','1,2,4,8,…','Θ(log n)'],['n รอบ ซ้อน n รอบ','n×n','Θ(n²)'],['j=0…i−1 ภายใน i=0…n−1','0+1+…+(n−1)','Θ(n²)'],['loop n แล้ว loop n','n+n','Θ(n)'],['loop n ข้างในหารครึ่ง','n×log n','Θ(n log n)'],['new Object[n]','เตรียม n ช่อง','Θ(n) ในแบบจำลองที่ใช้เรียน']])}${note('เห็น for/while ไม่ได้แปลว่า O(n) ต้องดูขอบเขตและบริการที่เรียกภายใน เช่น loop n ครั้งที่เรียก get(i) บน linked list อาจเป็น O(n²)')}`),
section('เทียบต้นทุนของแต่ละ implementation',`${table(['โครงสร้าง','อ่าน / ค้น','เพิ่ม','ลบ'],[['ArrayCollection','get O(1), contains O(n)','ท้าย amortized O(1)','หา e O(n); แทนที่รู้ index O(1)'],['ArrayList','get/set O(1)','กลาง O(n), ท้าย amortized O(1)','กลาง/หัว O(n), ท้าย O(1)'],['Singly linked ไม่มี tail','ตาม index O(n)','หัว O(1), ท้าย O(n)','หลังปมที่รู้ O(1), ค้นก่อน O(n)'],['Doubly circular + header','ตาม index O(n)','หัว/ท้าย O(1)','หัว/ท้าย/ปมที่รู้ O(1)'],['ArrayStack','peek O(1)','amortized O(1)','O(1)'],['Circular ArrayQueue','peek O(1)','amortized O(1)','O(1)'],['Unsorted ArrayPQ','peek O(n)','amortized O(1)','O(n)'],['Binary Heap','peek O(1)','O(log n) ไม่รวม resize','O(log n)']])}<p>ต้นทุนขึ้นกับ implementation ไม่ใช่ชื่อ ADT อย่างเดียว</p>`),
section('ขยายสองเท่าและ amortized analysis',`<p>เพิ่มหนึ่งครั้งที่ต้อง resize อาจคัดลอก n ตัว จึง worst-case O(n) แต่เมื่อเพิ่มหลายครั้งและขยายสองเท่า งานคัดลอกสะสม 1+2+4+… เป็น O(n) ตามจำนวนการเพิ่มทั้งหมด จึง <b>amortized O(1) ต่อครั้ง</b> ไม่ได้บอกว่าทุกครั้ง O(1) ถ้าขยายทีละหนึ่ง งานรวมอาจเป็น Θ(n²)</p>${answer('ค้นแบบเส้นตรงเจอช่องแรก vs ไม่เจอเลย',`<p>เจอแรก Θ(1); ไม่เจอ Θ(n). ถ้าถาม worst case ของ contains ตอบ O(n)</p>`)}`),
section('พื้นที่และเงื่อนไขสำคัญ',`${list(['Array มีช่องสำรอง; Linked มีพื้นที่ next/prev และต้นทุน object ต่อปม','resize มีทั้งก้อนเก่าและใหม่ชั่วคราว แต่ยังใช้พื้นที่ O(n)','recursive traversal ใช้ stack O(h); ต้นไม้เอียงอาจ h=n−1','bottom-up heap construction เป็น Θ(n) เพราะปมส่วนใหญ่อยู่ใกล้ใบ ไม่จำเป็นต้อง Θ(n log n)','แยก “รู้ปมแล้ว” กับ “ต้องค้นปมก่อน” เพราะต้นทุนรวมต่างกัน'])}`)
]});
S.chapters.push({id:'linked',n:'03',title:'Linked Collection',subtitle:'คิดเป็นลูกศร แล้วค่อยเขียนโค้ด',minutes:35,focus:'Node · first · header · LinkedSet',sources:['COLLECTION_3(LINKED).pdf หน้า 5–53','แบบฝึก Collection _3 หน้า 1–6','หนังสือ บท 4 หน้าเนื้อหา 55–68'],takeaway:'p = p.next แค่เลื่อนตัวชี้; p.next = p.next.next ตัดปมถัดไปออกจากสายโซ่',sections:[
section('Node และการเพิ่มที่หัว',`<p>Node มี element และ next ไม่ได้มีตัวนับจำนวนปมในทุก Node. size อยู่ใน Collection</p>${code(`protected static class Node {
    Object element;
    Node next;
    Node(Object e, Node next) { this.element = e; this.next = next; }
}
private Node first;
public void add(Object e) {
    first = new Node(e, first);
    size++;
}`)}<div class="node-chain"><span>first</span><b>C</b><i>→</i><b>B</b><i>→</i><b>A</b><i>→</i><span>null</span></div><p>เพิ่ม A,B,C ที่หัว จะได้ C→B→A. new Node ใช้ first เดิมเป็น next ก่อนกำหนด first ให้ชี้ปมใหม่ โค้ดย่อนี้สมมติ e ไม่เป็น null</p>`),
section('ไม่มี header: แยกลบตัวแรก',`${code(`public void remove(Object e) {
    if (first == null) return;
    if (first.element.equals(e)) {
        first = first.next; size--; return;
    }
    Node p = first;
    while (p.next != null && !p.next.element.equals(e)) p = p.next;
    if (p.next != null) { p.next = p.next.next; size--; }
}`)}<p>p เป็นตัวก่อนปมที่จะลบ ถ้าลบตัวแรกไม่มีปมก่อนหน้า จึงต้องเปลี่ยน first ตรวจ null ก่อนอ่าน field เสมอ</p>`),
section('มี header: ลดกรณีพิเศษ',`<p>header เป็นปมช่วยที่ไม่ใช่ข้อมูลจริงและไม่รวมใน size แม้รายการว่างก็มี header; ว่างเมื่อ header.next==null</p>${code(`protected Node header = new Node(null, null);
protected int size;
public void add(Object e) {
    if (e == null) throw new IllegalArgumentException();
    header.next = new Node(e, header.next);
    ++size;
}
public void remove(Object e) {
    Node p = header;
    while (p.next != null && !p.next.element.equals(e)) p = p.next;
    if (p.next != null) { p.next = p.next.next; --size; }
}`)}<p>เริ่ม p=header ทำให้ตัวแรกก็มีปมก่อนหน้า ใช้สูตรลบเดียวกับตัวอื่น</p>`),
section('contains, frequency และ toArray',`${code(`public boolean contains(Object e) {
    for (Node p = header.next; p != null; p = p.next)
        if (p.element.equals(e)) return true;
    return false;
}
public int frequency(Object e) {
    int count = 0;
    for (Node p = header.next; p != null; p = p.next)
        if (p.element.equals(e)) count++;
    return count;
}
public Object[] toArray() {
    Object[] a = new Object[size];
    Node p = header.next;
    for (int i = 0; i < size; i++) { a[i] = p.element; p = p.next; }
    return a;
}`)}<p>frequency และ toArray เดินครบ Θ(n); contains ดีสุด Θ(1) แย่สุด Θ(n)</p>${answer('งานบท 3 ข้อ 3: first→D→C→B→A→null; node=first แล้วเลื่อน 4 ครั้ง',`<p>D → C → B → A → <b>null</b>. ถ้าทำครั้งที่ 5 จะเกิด NullPointerException ตัวรายการเดิมไม่เปลี่ยนเพราะเลื่อนเฉพาะตัวแปร node</p>`)}`),
section('LinkedSet และ override ตามโจทย์',`<p>แบบฝึกให้เขียน add ใหม่และห้ามเรียก super.add จึงตรวจซ้ำแล้วสร้าง Node เอง</p>${code(`class LinkedSet extends LinkedCollection implements Set {
    @Override public void add(Object e) {
        if (e == null) throw new IllegalArgumentException();
        if (!contains(e)) {
            header.next = new Node(e, header.next);
            ++size;
        }
    }
}`)}${note('ตัวอย่างนี้ต้องให้ header, size และ Node เข้าถึงจากลูกได้ เช่น protected ในแม่ ใบงานแสดง header เป็น private แต่ลูกใช้โดยตรง จึงคอมไพล์ไม่ได้ถ้าไม่ปรับสิทธิ์หรือเพิ่ม helper อย่าสร้าง header อีกตัวในลูกเพราะจะเป็นคนละรายการ')}${answer('งานเดิม: add A,B,C,A,A; contains A/B; remove A',`<p>size = <b>1,2,3,3,3</b>; contains A/B เป็น true ทั้งคู่ ลบ A แล้ว size=2, contains A=false, contains B=true เหลือ C→B</p>`)}`)
]});
S.chapters.push({id:'list',n:'04',title:'List',subtitle:'ลำดับต้องอยู่ครบ ทั้งแบบ Array และ Linked',minutes:40,focus:'index · shift · nodeAt · prev/next',sources:['LIST_4.pdf หน้า 7–44, 46–53','แบบฝึก List_4 หน้า 1–6','หนังสือ บท 5 หน้าเนื้อหา 69–100'],takeaway:'ArrayList แทรกเลื่อนจากท้ายไปหน้า ลบเลื่อนจากหน้าไปท้าย; LinkedList เปลี่ยนลูกศรแทนการย้ายข้อมูล',sections:[
section('สัญญาและขอบเขต index',`${table(['บริการ','ช่วงที่ใช้ได้','ผลต่อ size'],[['get(i),set(i,e),remove(i)','0 ≤ i &lt; size','get/set คงเดิม, remove ลด 1'],['add(i,e)','0 ≤ i ≤ size','เพิ่ม 1; i=size คือท้าย'],['indexOf(e)','ตำแหน่งแรกหรือ −1','คงเดิม'],['add(e)','เท่ากับ add(size,e)','เพิ่มท้าย']])}<p>List ซ้ำได้และรักษาลำดับ ห้ามย้ายท้ายมาแทนแบบ Collection</p>`),
section('ArrayList: แทรกและลบ',`${code(`public void add(int index, Object e) {
    if (index < 0 || index > size) throw new IndexOutOfBoundsException();
    ensureCapacity(size + 1);
    for (int i = size; i > index; i--) elementData[i] = elementData[i-1];
    elementData[index] = e;
    size++;
}
public void remove(int index) {
    if (index < 0 || index >= size) throw new IndexOutOfBoundsException();
    for (int i = index + 1; i < size; i++) elementData[i-1] = elementData[i];
    elementData[--size] = null;
}`)}${table(['แทรก X ที่ index 1','อาร์เรย์ capacity 5'],[['เริ่ม size=3','A B C null null'],['i=3','A B C C null'],['i=2','A B B C null'],['ใส่ X และ size++','A X B C null']])}<p>ถ้าแทรกโดยเลื่อนจากซ้ายไปขวา ข้อมูลที่ยังไม่อ่านจะถูกทับ</p>${answer('งานเดิม: add A,A,B,C; get(1); set(1,X); remove(1)',`<p>size หลังเพิ่ม = 1,2,3,4. get(1) เดิม=A; หลัง set=X; หลัง remove เหลือ [A,B,C] จึง get(1)=B, contains(B)=true, size=3</p>`)}`),
section('SinglyLinkedList: หาปมก่อนหน้า',`${code(`private Node nodeAt(int i) {
    Node p = header; // index -1 สำหรับใช้ภายใน
    for (int j = -1; j < i; j++) p = p.next;
    return p;
}
public void add(int i, Object e) {
    // ตรวจ 0 <= i <= size ก่อน
    Node p = nodeAt(i - 1);
    p.next = new Node(e, p.next); ++size;
}
public void remove(int i) {
    // ตรวจ 0 <= i < size ก่อน
    Node p = nodeAt(i - 1);
    p.next = p.next.next; --size;
}`)}<p>nodeAt(-1) ใช้ภายในเพื่อคืน header ไม่ใช่อนุญาต get(-1). เปลี่ยนลิงก์ O(1) แต่ค้นตาม index O(n) แม้ทำ singly list เป็นวงกลมก็ไม่ได้ทำให้ random access เป็น O(1)</p>`),
section('Doubly circular linked list + header',`<p>Node มี element, prev, next ว่างแล้วทั้งสองเส้นของ header ชี้กลับตัวเอง เดินจบเมื่อกลับถึง header ไม่ใช่ null</p>${code(`header = new Node(null, null, null);
header.prev = header.next = header;
// แทรกก่อน q; constructor รับ (element, prev, next)
Node p = q.prev;
Node x = new Node(e, p, q);
p.next = x;
q.prev = x;
size++;
// ลบ q ซึ่งต้องไม่ใช่ header
q.prev.next = q.next;
q.next.prev = q.prev;
size--;`)}${note('p.next = q.prev = x ให้สอง field เก็บ reference x เท่านั้น ไม่สร้างเส้นย้อนกลับอัตโนมัติ ต้องกำหนด x.prev และ x.next ผ่าน constructor หรือคำสั่งให้ครบ')}`),
section('removeFirst, removeLast และ removeRange',`<p>เมื่อมี doubly circular + header ลบแรกผ่าน header.next และท้ายผ่าน header.prev ได้ O(1) หลังตรวจว่าง. removeRange(a,b) ในงานรวม b จึงลบ b−a+1 ตัว</p>${code(`public void removeRange(int a, int b) {
    if (a < 0 || a > b || b >= size) throw new IndexOutOfBoundsException();
    int count = b - a + 1;
    for (int i = 0; i < count; i++) remove(a);
}`)}<p>ลบ a ซ้ำเพราะตัวถัดมาเลื่อนลง ถ้าเพิ่ม a จะข้ามข้อมูล โค้ดนี้ง่ายแต่อาจ O(n²) ถ้าค้นปมซ้ำ; วิธีหาขอบช่วงแล้วตัด/เดินลิงก์ทำได้ O(n) รวมค้นหา</p>${table(['งานเดิม','รายการ'],[['เริ่ม','A B C D E F'],['removeFirst','B C D E F'],['removeLast','B C D E'],['removeRange(1,2)','B E']])}`),
section('การประยุกต์: Sparse vector และ Polynomial',`<p>เวกเตอร์ศูนย์มาก เช่น [0,0,7,0,−2] เก็บเฉพาะ [(2,7),(4,−2)] เป็นคู่ index,value ประหยัดเมื่อ nonzero น้อย การบวกใช้สองรายการที่เรียง index แล้วเดินรวมตำแหน่งเดียวกัน ใช้ O(k+m) เมื่อมี k และ m รายการ</p><p>พหุนามเก็บ exponent,coefficient เช่น 3x²+5 เป็น [(2,3),(0,5)] รวม exponent เดียวกัน ตัดสัมประสิทธิ์ศูนย์ Sparse matrix เพิ่ม row,column,value. วิธีเก็บ Array หรือ Linked เลือกตามงานที่ใช้บ่อย</p>`)
]});
})();
