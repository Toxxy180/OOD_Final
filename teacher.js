/* Rewritten revision notes grounded in the seven supplied teacher solution PDFs. */
(() => {
const S=window.Study,{code,table,note,answer,section}=S.ui;
const files=['แบบฝึกหัด_ครั้งที่1_เฉลย.pdf','แบบฝึกหัด_ครั้งที่2_เฉลย.pdf','แบบฝึกหัด_ครั้งที่3_เฉลย.pdf','แบบฝึกหัด_ครั้งที่4_เฉลย.pdf','แบบฝึกหัด_ครั้งที่5n_เฉลย.pdf','แบบฝึกหัด_ครั้งที่6_เฉลย.pdf','แบบฝึกหัด_ครั้งที่7_เฉลย.pdf'];
S.teacherFiles=files;
const source=(n,p)=>`${files[n-1]} · หน้า PDF ${p}`;
const sec=(n,p,title,html)=>section(title,`<p class="source-line">${source(n,p)}</p>${html}`);
S.teacherLessons=[
{id:1,title:'Collection & Array',pages:7,chapter:'array',focus:'สัญญา interface · add / remove · size',sections:[
sec(1,'1–2','Choice: เลือกโครงสร้างให้ตรงพฤติกรรม',table(['ชนิด','หลักที่ต้องตอบได้'],[['Collection','ในแบบเรียนนี้ไม่รับประกันลำดับ และเก็บซ้ำได้'],['Set','ไม่เก็บค่าซ้ำ'],['List','อ้างอิงตำแหน่งได้ เก็บซ้ำได้'],['Stack','LIFO / FILO'],['Queue','FIFO / LILO']])+note('จุดตรวจแก้: ครั้งที่ 1 หน้า 1 พิมพ์ว่า Set เก็บซ้ำได้ แต่ครั้งที่ 2 addSet และครั้งที่ 3 LinkedSet ตรวจซ้ำก่อนเพิ่ม จึงใช้ “Set ไม่เก็บซ้ำ” เป็นหลักในการฝึก ส่วน List ที่ระบุเป็นวิธีสร้าง ให้แยก List (ADT) กับ linked list (วิธีโยงปม) ตามบริบทโจทย์')),
sec(1,'2–3','เติมโค้ด: เพิ่มท้ายและลบด้วยตัวท้าย',code(`// ภายใน ArrayCollection; สมมติว่ามีความจุพอ
public void add(Object e) {
    if (e == null) throw new IllegalArgumentException();
    elementData[size++] = e;
}
public void remove(Object e) {
    int i = indexOf(e);
    if (i != -1) {
        elementData[i] = elementData[--size];
        elementData[size] = null;
    }
}`)+'<p>ต้องลด size ก่อนอ่านสมาชิกท้ายเดิม แล้วล้างช่องที่พ้นช่วงข้อมูลจริง การลบนี้ไม่รักษาลำดับ</p>'),
sec(1,'3–4','ไล่ผลโปรแกรมในเฉลย',answer('ดูผลพิมพ์ทั้ง 7 ค่า',code('true, 3, true, false, true, 1, 2'))+'<p>เพิ่ม KMITL, LADKRABANG, BANGKOK แล้วลบ LADKRABANG → เหลือ KMITL, BANGKOK; ลบ KMITL → เหลือ 1 ตัว; เพิ่ม THAILAND → 2 ตัว</p>'),
sec(1,'4–7','ถ้าโจทย์ห้ามมี field size', '<p>เมื่อกำหนดให้สมาชิกที่ใช้เรียงติดกันและไม่รับ null ให้นับจนพบ null หรือสุดความจุ แล้วใช้จำนวนนี้แทน size ในทุก method การถามขนาดจึงอาจใช้ Θ(n) แทน Θ(1) และต้องรักษาเงื่อนไข “ไม่มีช่องว่างคั่นสมาชิก” หลังลบ</p>')
]},
{id:2,title:'Array methods & Inheritance',pages:13,chapter:'array',focus:'fixedCapacity · addSet · copyObjectRange · frequency',sections:[
sec(2,'1–3','Choice และการเก็บ reference','<p>interface ไม่มี constructor และสร้าง instance โดยตรงไม่ได้; คลาสใช้ implements ส่วนการสืบทอดคลาสใช้ extends ตัวแปร size คือจำนวนสมาชิกจริง ไม่ใช่ความจุ</p><p>c1 มี A,C; c2 มี B; c1.add(c2); c2.add(c1) → size เป็น 3 และ 2 เพราะเพิ่ม reference ทีละก้อน ค่ารหัสต่อท้ายชื่อคลาสเมื่อพิมพ์ object ไม่ใช่ค่าคงที่ที่ต้องท่อง</p>'+note('ใน Java รุ่นใหม่ interface มี default/static method ที่มี body ได้ จึงต้องอ่านว่าคำถามกล่าวถึง interface ตัวอย่างในวิชาหรือกฎของ Java ทั้งหมด')),
sec(2,'3–4','เติมโค้ด: ขยายอาร์เรย์และกันข้อมูลซ้ำ',code(`private void fixedCapacity() {
    if (size + 1 > elementData.length) {
        int s = Math.max(size + 1, 2 * elementData.length);
        Object[] arr = new Object[s];
        for (int i = 0; i < size; i++) arr[i] = elementData[i];
        elementData = arr;
    }
}
public void addSet(Object e) {
    if (e == null) throw new IllegalArgumentException();
    if (!contains(e)) {
        fixedCapacity();
        elementData[size++] = e;
    }
}`)+note('ปรับเพื่อให้รันปลอดภัย: เรียก fixedCapacity ก่อนเพิ่มใน addSet ด้วย โค้ดสั้นหน้า 4 ไม่ได้แสดงการขยายไว้')),
sec(2,'4, 12–13','ช่วงรวมปลายทั้งสอง และ frequency',code(`public Object[] copyObjectRange(int from, int to) {
    if (from < 0 || to >= size() || from > to) return null;
    Object[] out = new Object[to - from + 1];
    for (int i = from; i <= to; i++) out[i - from] = get(i);
    return out;
}
public int frequency(Object e) {
    int count = 0;
    for (int i = 0; i < size(); i++)
        if (get(i).equals(e)) count++;
    return count;
}`)+'<p>copyObjectRange คืนอาร์เรย์ใหม่ที่มี reference ของสมาชิกเดิม เป็น shallow copy ส่วน frequency นับทุก occurrence: พบ 1 ตัวก็คืน 1 ไม่ใช่ 0</p>'),
sec(2,'11','removed: คืนค่าว่าลบสำเร็จหรือไม่',code(`public boolean removed(Object e) {
    for (int i = 0; i < size; i++) {
        if (elementData[i].equals(e)) {
            elementData[i] = elementData[size-1];
            elementData[size-1] = null;
            size--;
            return true;
        }
    }
    return false;
}`)+'<p>ชื่อในใบงานครั้งที่ 2 คือ removed และคืน boolean ต่างจาก remove แบบ void ในครั้งที่ 1 ลบเพียงตัวแรกที่พบ; ไม่พบต้องคืน false โดยไม่เปลี่ยน size</p>'+code(`private int indexOf(Object e) {
    for (int i = 0; i < size; i++)
        if (elementData[i].equals(e)) return i;
    return -1;
}
public boolean contains(Object e) { return indexOf(e) != -1; }
public int size() { return size; }
public boolean isEmpty() { return size == 0; }
public Object get(int index) {
    if (index < 0 || index >= size) throw new IndexOutOfBoundsException();
    return elementData[index];
}`)),
sec(2,'10–12','clear และ constructor ของคลาสลูก',code(`public void clear() {
    for (int i = 0; i < size; i++) elementData[i] = null;
    size = 0;
}
// ใน constructor ของ ArrayCollection_print(int initialCapacity)
super(initialCapacity);`))
]},
{id:3,title:'Linked Collection & Set',pages:6,chapter:'linked',focus:'first / header · เปลี่ยน next · override add',sections:[
sec(3,'1–2','Choice: แยกการเดินออกจากการแก้ลิงก์',table(['คำสั่ง','ผล'],[['p = p.next','เลื่อน reference p'],['p.next = p.next.next','ข้ามปมถัดไปออกจากสายโซ่'],['first = new LinkedNode(e, first)','เพิ่มหน้าตัวแรกเดิม'],['first == null','ว่าง สำหรับแบบไม่มี header']])+'<p>Node เก็บ element และ next; ตัวนับจำนวนอยู่ที่ collection ไม่จำเป็นต้องอยู่ทุก Node</p>'),
sec(3,'2','เติมโค้ด: ลบแบบไม่มี header',code(`public void remove(Object e) {
    if (first == null) return;
    if (first.element.equals(e)) {
        first = first.next;
        --size;
    } else {
        LinkedNode p = first;
        while (p.next != null && !p.next.element.equals(e)) p = p.next;
        if (p.next != null) {
            p.next = p.next.next;
            --size;
        }
    }
}`)),
sec(3,'3','frequency แบบมี header',code(`int count = 0;
LinkedNode node = header.next;
while (node != null) {
    if (node.element.equals(e)) count++;
    node = node.next;
}
return count;`)),
sec(3,'4–6','LinkedSet: เขียน add ใหม่ตามโจทย์',code(`// คลาสแม่ต้องเปิดสิทธิ์ header, size และชนิด LinkedNode ให้ลูกใช้ได้
public class LinkedSet extends LinkedCollection implements Set {
    public void add(Object e) {
        if (!contains(e)) {
            header.next = new LinkedNode(e, header.next);
            ++size;
        }
    }
}`)+note('จุดตรวจแก้: หน้า 4 ประกาศ header เป็น private แต่หน้า 5 ลูกเข้าถึงโดยตรง โค้ดคลาสแยกนี้จะคอมไพล์ไม่ผ่าน ต้องเปลี่ยนเป็น protected หรือออกแบบ helper ที่เหมาะสม ห้ามประกาศ header ใหม่ซ้อนในลูก')+answer('ผล add A,B,C,A,A แล้ว remove A','<p>size หลังเพิ่ม: 1, 2, 3, 3, 3; contains A/B = true/true; หลังลบ A: size=2, contains A/B = false/true</p>'))
]},
{id:4,title:'List: Array และ Linked',pages:6,chapter:'list',focus:'เลื่อนข้อมูล · nodeAt(i−1) · removeRange',sections:[
sec(4,'1–3','ArrayList: แทรกขวา ลบซ้าย',code(`// add(index,e): หลังตรวจ index และ ensureCapacity(size+1)
for (int i = size; i > index; i--) elementData[i] = elementData[i-1];
elementData[index] = e;
size++;
// remove(index): หลังตรวจ index
for (int i = index+1; i < size; i++) elementData[i-1] = elementData[i];
elementData[--size] = null;`)+answer('ผลทดสอบ A,A,B,C; set(1,X); remove(1)','<p>size: 1,2,3,4; get(1) ก่อน set = A, หลัง set = X, หลัง remove = B; contains B = true; size สุดท้าย = 3</p>')),
sec(4,'4–5','SinglyLinkedList: หาปมก่อนหน้า',code(`private LinkedNode nodeAt(int i) {
    LinkedNode p = header;
    for (int j = -1; j < i; j++) p = p.next;
    return p;
}
// add(i,e)
LinkedNode p = nodeAt(i-1);
p.next = new LinkedNode(e, p.next);
++size;
// remove(i)
removeAfter(nodeAt(i-1));`)),
sec(4,'1, 5–6','Doubly circular: header และการลบช่วง',code(`// รายการว่าง
header.prev = header.next = header;
// removeNode(p): p เป็นปมข้อมูล ไม่ใช่ header
p.prev.next = p.next;
p.next.prev = p.prev;
--size;
// removeRange(a,b): ตรวจ 0 <= a <= b < size ก่อน
int count = b-a+1;
for (int i = 0; i < count; i++) removeNode(nodeAt(a));`)+note('removeRange ต้องลบตำแหน่ง a ซ้ำ เพราะสมาชิกถัดไปเลื่อนมาแทนในลำดับ ห้ามเพิ่ม a ไปพร้อมกับการลบ')),
sec(4,'6','ไล่ผลลบช่วงจากงานจริง',table(['คำสั่ง','รายการ'],[['เริ่ม','A B C D E F'],['removeFirst()','B C D E F'],['removeLast()','B C D E'],['removeRange(1,2)','B E']]))
]},
{id:5,title:'Stack & Parentheses',pages:13,chapter:'stack',focus:'push / pop / peek · วงเล็บ · สืบทอด List',sections:[
sec(5,'1–3','ArrayStack: ตำแหน่ง top',code(`public Object peek() {
    if (isEmpty()) throw new NoSuchElementException();
    return elementData[size-1];
}
public Object pop() {
    Object e = peek();
    elementData[--size] = null;
    return e;
}`)+'<p>push เพิ่มที่ elementData[size++] หลังขยายเมื่อเต็ม การขยายคัดลอก n ตัวใช้ Θ(n) ในครั้งนั้น; pop ที่ลด size อย่างเดียวให้ผลเชิงลำดับเหมือนเดิม แต่ reference ในช่องท้ายยังค้างอยู่</p>'+note('โค้ดขยายเป็น 2*size ในเฉลยเหมาะกับ capacity เริ่มต้นเป็นบวก หากอนุญาต capacity=0 ให้ใช้ Math.max(1,2*size)')),
sec(5,'2–3','ไล่ผล push A,B,C,E และ pop',answer('ดูผลทั้งหมด',code('peek E → peek C → pop C → pop B → size 1 → peek F → size 2'))),
sec(5,'3–4','จับคู่วงเล็บด้วย Stack',code(`String open = "{([", close = "})]";
// พบวงเล็บเปิด: push(token)
// พบวงเล็บปิด:
int k = close.indexOf(token);
if (k >= 0 && (ask.isEmpty() ||
    !open.substring(k,k+1).equals(ask.pop()))) return false;
// หลังอ่านครบ
return ask.isEmpty();`)+note('ต้องตรวจ empty ก่อน pop โดยใช้ short-circuit || และต้องเช็ก empty อีกครั้งตอนจบ เช่น “((” ยังไม่สมบูรณ์')+'<p>สตริงในงาน {({[[[]]]})}{}[]{{}} จับคู่ครบ จึงได้ OK</p>'),
sec(5,'8–12','สร้าง Stack จาก List',code(`// ArrayListStack extends ArrayList implements Stack
// constructor: super(initialCapacity)
public void push(Object item) { add(item); }
public Object peek() {
    if (isEmpty()) throw new IllegalStateException();
    return get(size()-1);
}
public Object pop() {
    Object item = peek();
    remove(size()-1);
    return item;
}`)+'<p>แบบ singly linked ที่วาง top ไว้ท้ายและเข้าผ่าน nodeAt ต้องเดินลิสต์ จึงใช้ Θ(n) สำหรับเข้าถึงท้าย อย่าสรุปว่า Stack ทุก implementation ใช้ O(1) ทุก method</p>')
]},
{id:6,title:'Queue & Lee / BFS',pages:5,chapter:'queue',focus:'FIFO · front วนรอบ · Queue จาก List',sections:[
sec(6,'1','Choice: สูตร Circular Queue',table(['จุดที่ถาม','คำตอบ'],[['ลำดับนำออก','FIFO'],['ตำแหน่ง enqueue','(front + size) % elementData.length'],['front หลัง dequeue','(front + 1) % elementData.length'],['size','จำนวนสมาชิก ไม่ใช่ความจุ']])),
sec(6,'1–2','ArrayListQueue: เพิ่มท้าย เอาออกหน้า',code(`public void enqueue(Object e) { list.add(list.size(), e); }
public Object peek() {
    if (isEmpty()) throw new IllegalStateException();
    return list.get(0);
}
public Object dequeue() {
    Object e = peek();
    list.remove(0);
    return e;
}`)+'<p>การลบ index 0 ของ ArrayList ต้องเลื่อนสมาชิกตามมา จึงเป็น Θ(n); circular array ใช้ front เพื่อหลีกเลี่ยงการเลื่อน</p>'),
sec(6,'3','Lee: ทำไมต้องใช้ Queue','<p>นำ source เข้าคิว จากนั้น dequeue มาขยายเพื่อนบ้านทีละชั้น เมื่อพบช่อง SPACE ให้บันทึกระยะ k+1 ก่อน enqueue เพื่อไม่เข้าคิวซ้ำ ลำดับในโปรแกรมคือ ลง → ขึ้น → ขวา → ซ้าย</p>'+code('map[r][c] = k + 1;\nq.enqueue(new Pos(r,c));')),
sec(6,'3–5','อ่านผลรันและขอบเขต','<p>ตรวจ r,c ไม่ให้ออกนอกอาร์เรย์และ map[r][c] ต้องเป็น SPACE ก่อนขยาย โปรแกรมสุ่มกำแพงด้วย Math.random() จึงไม่มีคำตอบตารางตายตัวสำหรับการรันทั้ง 3 ครั้ง กรณีปลายทางไปไม่ถึงจะยังเป็น SPACE</p>')
]},
{id:7,title:'Priority Queue & Binary Heap',pages:7,chapter:'heap',focus:'Array ↔ Tree · fixUp / fixDown · heapify · dequeue',sections:[
sec(7,'1','อ่านโครงสร้างก่อนปรับ Heap','<p>โจทย์กำหนด [13,50,40,5,12,4] และสั่งว่า “ไม่ต้องปรับให้ถูกต้อง” จึงต้องอ่านตำแหน่งเดิม: ราก 13; ความสูง 2 เมื่อวัดเป็นจำนวนเส้นเชื่อม; พ่อของ 12 คือ 50; พ่อของ 40 คือ 13; 40 มีลูกซ้าย 4 แต่ไม่มีลูกขวา</p>'+note('จุดกำกวม: peek ของ binary heap มีขอบเขตแน่น Θ(1) ส่วน O(n) เป็นขอบเขตบนที่หลวมได้ทางคณิตศาสตร์ หากถามประสิทธิภาพให้ตอบ Θ(1) หรือ O(1) ตามรูปแบบที่กำหนด')),
sec(7,'2','Heapify: ชุดเฉลยอาจารย์', '<p>เริ่ม [55,14,52,11,1,25,21,36,5,7,8] ทำ fixDown จากพ่อสุดท้าย index 4 ย้อนถึง 0</p>'+table(['หลังทำ','Array'],[['fixDown(4)','55 14 52 11 8 25 21 36 5 7 1'],['fixDown(3)','55 14 52 36 8 25 21 11 5 7 1'],['fixDown(2)','55 14 52 36 8 25 21 11 5 7 1'],['fixDown(1)','55 36 52 14 8 25 21 11 5 7 1'],['fixDown(0)','55 36 52 14 8 25 21 11 5 7 1']])+'<p>ผลสุดท้ายตรงกับเฉลยหน้า 2; สถานะระหว่างทางในตารางคำนวณเพิ่มเพื่อฝึกไล่ด้วยมือ</p><a class="btn primary" href="#lab/heap">ทดลองชุดนี้ทีละขั้น →</a>'),
sec(7,'3–4','ArrayPQ: scan หาค่ามากที่สุด',code(`int max = 0;
for (int i = 1; i < list.size(); i++) {
    Comparable d = (Comparable) list.get(i);
    if (d.compareTo(list.get(max)) >= 0) max = i;
}
return max;`)+ '<p>ต้องตรวจว่างก่อนเริ่ม; >= ทำให้เลือกตัวหลังเมื่อเท่ากัน peek คืน list.get(maxIndex()); dequeue จำค่าแล้ว remove(max) สำหรับข้อมูล 5,3,99 ได้ maxIndex=2, peek=99 และ dequeue เป็น 99,5,3</p>'),
sec(7,'5','enqueue และ fixUp',code(`public void enqueue(Object e) {
    ensureCapacity(size+1);
    elementData[size] = e;
    fixUp(size++);
}
private void fixUp(int k) {
    while (k > 0) {
        int p = (k-1)/2;
        if (!greaterThan(k,p)) break;
        swap(k,p);
        k = p;
    }
}`)+'<p>post-increment ส่ง index เดิมเข้า fixUp แล้วเพิ่ม size; หยุดเมื่อถึงรากหรือไม่มากกว่าพ่อ โดย greaterThan(i,j) ใช้ compareTo > 0</p>'),
sec(7,'6','dequeue และ fixDown',code(`public Object dequeue() {
    Object max = peek();
    elementData[0] = elementData[--size];
    elementData[size] = null;
    if (size > 1) fixDown(0);
    return max;
}
private void fixDown(int k) {
    int c;
    while ((c = 2*k+1) < size) {
        if (c+1 < size && greaterThan(c+1,c)) c++;
        if (!greaterThan(c,k)) break;
        swap(k,c);
        k = c;
    }
}`)+'<p>เช็กว่ามีลูกขวาก่อนเปรียบเทียบ แล้วเลือกลูกที่มากกว่าเสมอ การย้ายตัวท้ายขึ้นรากรักษารูปร่าง complete binary tree ส่วน fixDown คืนเงื่อนไขพ่อ ≥ ลูก</p>'),
sec(7,'5–6','ส่วนประกอบที่เหลือของคลาส BinaryHeap',code(`// ใช้ร่วมกับ enqueue, fixUp, dequeue, fixDown ด้านบน
private Object[] elementData;
private int size;
public BinaryHeap(int cap) { elementData = new Object[cap]; }
public boolean isEmpty() { return size == 0; }
public int size() { return size; }
public Object peek() {
    if (isEmpty()) throw new NoSuchElementException();
    return elementData[0];
}
boolean greaterThan(int i, int j) {
    Comparable e = (Comparable) elementData[i];
    return e.compareTo(elementData[j]) > 0;
}
void swap(int i, int j) {
    Object t = elementData[i];
    elementData[i] = elementData[j];
    elementData[j] = t;
}
private void ensureCapacity(int capacity) {
    if (capacity > elementData.length) {
        int s = Math.max(capacity, 2*elementData.length);
        Object[] arr = new Object[s];
        for (int i = 0; i < size; i++) arr[i] = elementData[i];
        elementData = arr;
    }
}`)+'<p>Object ที่นำเข้า Heap ต้องเปรียบเทียบกันได้ผ่าน Comparable; compareTo > 0 หมายถึงค่าฝั่งซ้ายมากกว่า ไม่ใช่ตรวจด้วย == 1 เสมอไป การขยายคัดลอก size ตัว ไม่คัดลอกถึง capacity ใหม่</p>'),
sec(7,'5–7','สิ่งที่ต้องทำให้ได้ในข้อสอบ',table(['ทักษะ','หลักคิด'],[['Array ↔ Tree','ราก 0, ซ้าย 2i+1, ขวา 2i+2, พ่อ floor((i−1)/2) เมื่อ i>0'],['Complete','เติมระดับบนให้เต็มก่อน ระดับสุดท้ายชิดซ้าย'],['enqueue','เพิ่มท้าย แล้ว fixUp; Θ(log n) worst case หากไม่รวม resize'],['dequeue','คืนราก ใช้ตัวท้ายแทน แล้ว fixDown; O(log n)'],['peek','Θ(1)'],['heapify','เริ่ม floor(n/2)−1 ลงถึง 0; Θ(n)'],['Heapsort (เสริมจากสไลด์)','max-heap สลับรากไปท้าย ลดขอบเขตแล้ว fixDown → เรียงน้อยไปมาก O(n log n)']])+'<p>แบบทดสอบจากเฉลย enqueue 5,3,99 → heap [99,3,5]; peek=99; dequeue 99,5,3. ต้องระบุว่าจะสร้างด้วย heapify หรือ enqueue ทีละตัว เพราะอาร์เรย์ผลลัพธ์อาจต่างกันได้</p>'+code('// heapify เสริมเพื่อไล่โจทย์หน้า 2: ข้อมูลอยู่ใน elementData แล้ว\nfor (int k = size/2-1; k >= 0; k--) fixDown(k);')+'<p>Queue ปกติเลือกตัวที่เข้าก่อน ส่วน Priority Queue เลือกตามลำดับความสำคัญ ในคลาสนี้คือค่ามากสุด; Priority Queue ไม่ได้หมายถึง max-heap เสมอไป ต้องอ่าน ordering ที่โจทย์กำหนด</p><a href="#chapter/heap">อ่านหลักการ Heap และ Heapsort เพิ่มเติม →</a>')
]}
];
// New questions preserve source provenance; they are adapted practice, not actual exam questions.
const q=(id,n,p,ch,prompt,choices,correct,explanation)=>S.questions.push({id:'teacher-'+id,bank:'teacher',lesson:n,chapter:ch,type:'choice',prompt,choices,correct,explanation,source:'ดัดแปลงจาก '+source(n,p)});
const t=(id,n,p,ch,prompt,accepted,explanation,mode='code')=>S.questions.push({id:'teacher-'+id,bank:'teacher',lesson:n,chapter:ch,type:'text',prompt,accepted,explanation,mode,source:'ฝึกเติมตาม '+source(n,p)});
q('01',1,'1','oop','FIFO และไม่เก็บค่าซ้ำ ควรใช้คู่ใด?',['Queue + Set','Stack + Set','Queue + Stack','List + Heap'],0,'Queue จัดลำดับนำออก ส่วน Set ตรวจการซ้ำ');
q('02',1,'1','array','Set ควรเพิ่มสมาชิกที่มีค่าเท่ากันซ้ำหรือไม่?',['เพิ่มซ้ำได้เสมอ','ไม่เพิ่มซ้ำ'],1,'ใช้หลัก Set และโค้ด addSet/LinkedSet ในครั้งที่ 2–3; ประโยคครั้งที่ 1 พิมพ์คลาดเคลื่อน');
t('03',1,'2','oop',code('class ArrayCollection ____ Collection { }'),['implements'],'คลาสทำตาม interface ใช้ implements');
t('04',1,'2','array',code('elementData[i] = elementData[____]; // ลบด้วยตัวท้าย'),['--size'],'ลด size ก่อนเพื่อให้ได้ index ตัวท้ายเดิม');
t('05',1,'3','array',code('return indexOf(e) ____ -1; // contains'),['!='],'พบเมื่อ index ไม่ใช่ -1');
t('06',1,'3–4','array','เพิ่ม KMITL,LADKRABANG,BANGKOK แล้วลบ LADKRABANG และ KMITL เหลือ size เท่าใด?',['1'],'เหลือ BANGKOK ตัวเดียว','sequence');
q('07',2,'1','array','field size บอกอะไร?',['ความจุทั้งหมด','จำนวนสมาชิกจริง','index ช่องท้ายเสมอ','จำนวน null'],1,'ความจุคือ elementData.length');
t('08',2,'2','array','c1 มี A,C และ c2 มี B; c1.add(c2); c2.add(c1); size ของ c1,c2?',['3 2'],'เพิ่ม reference หนึ่งตัวต่อคำสั่ง','sequence');
t('09',2,'3','array',code('int s = Math.max(size+1, ____ * elementData.length);'),['2'],'เฉลยอาจารย์ขยายสองเท่าและต้องพอสำหรับ size+1');
t('10',2,'3','array',code('// หลังคัดลอกเสร็จ\nelementData = ____;'),['arr'],'เปลี่ยน reference ไปอาร์เรย์ใหม่');
t('11',2,'12','array',code('Object[] out = new Object[to-from+____];'),['1'],'รวมทั้ง from และ to');
t('12',2,'12','array',code('out[____] = get(i); // i เริ่มที่ from'),['i-from'],'ดัชนีปลายทางเริ่ม 0');
t('13',2,'12','oop',code('public ArrayCollection_print(int c) { ____(c); }'),['super'],'เรียก constructor ของคลาสแม่');
q('14',3,'1','linked','p = p.next ทำอะไร?',['ลบปมถัดไป','เลื่อนตัวชี้ p','เพิ่มปม','ลด size'],1,'คำสั่งนี้ไม่ได้เปลี่ยน next ในโครงสร้าง');
t('15',3,'2','linked',code('first = new LinkedNode(e, ____);'),['first'],'ให้ปมใหม่ต่อกับตัวแรกเดิม');
t('16',3,'2','linked',code('if (first.element.equals(e)) first = ____;'),['first.next'],'เลื่อนตัวแรกข้ามปมที่จะลบ');
t('17',3,'2','linked',code('p.next = ____; // ลบปมถัดไป'),['p.next.next'],'เปลี่ยนสายโยงให้ข้ามหนึ่งปม');
t('18',3,'3','linked',code('LinkedNode node = ____; // frequency แบบมี header'),['header.next'],'เริ่มนับที่ปมข้อมูลตัวแรก');
q('19',3,'4–5','oop','แม่ประกาศ header เป็น private แล้วลูกคลาสแยกใช้ header.next โดยตรงได้ไหม?',['ได้เพราะ extends','ไม่ได้ ต้องปรับการเข้าถึง'],1,'เป็นจุดที่ต้องแก้จากโค้ดเฉลย ใช้ protected หรือ helper ตามการออกแบบ');
t('20',3,'6','linked','add A,B,C,A,A ใน LinkedSet ให้ size หลังแต่ละครั้งเป็นเท่าใด?',['1 2 3 3 3'],'contains ป้องกัน A ที่ซ้ำ','sequence');
t('21',4,'2','list',code('for (int i=size; i>index; i--) elementData[i]=elementData[____];'),['i-1'],'แทรกต้องเลื่อนจากท้ายไปหน้า');
t('22',4,'3','list',code('for (int i=index+1; i<size; i++) elementData[____]=elementData[i];'),['i-1'],'ลบแล้วเลื่อนช่องหลังกลับมาหนึ่งตำแหน่ง');
t('23',4,'4','list',code('LinkedNode p = nodeAt(____); // เพิ่มก่อน index i'),['i-1'],'ต้องมี reference ของปมก่อนหน้า');
t('24',4,'6','list',code('int count = ____; // removeRange(a,b) รวมปลายทั้งสอง'),['b-a+1'],'นับสมาชิกช่วงปิด');
t('25',4,'6','list','A B C D E F → removeFirst → removeLast → removeRange(1,2) เหลืออะไร?',['B E'],'หลังสองคำสั่งแรกเหลือ B C D E แล้วลบ C,D','sequence');
q('26',5,'1','stack','push ที่ต้องขยายและคัดลอก n ตัว ใช้เวลาในครั้งนั้นเท่าใด?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n²)'],2,'คัดลอกสมาชิก n ตัว');
t('27',5,'2','stack',code('return elementData[____]; // peek'),['size-1'],'top คือสมาชิกตัวท้าย');
t('28',5,'2','stack',code('elementData[____] = null; // pop หลังจำค่าจาก peek'),['--size'],'ลดขนาดพร้อมล้างช่องเก่า');
t('29',5,'3–4','stack',code('return ask.____(); // checkParentheses เมื่ออ่านครบ'),['isEmpty'],'ต้องไม่มีวงเล็บเปิดค้าง');
t('30',5,'8','stack',code('Object item = get(size()-1);\nremove(____);\nreturn item;'),['size()-1'],'ArrayListStack เอาข้อมูลท้ายออก');
q('31',6,'1','queue','Queue ปกติใช้ลำดับใด?',['LIFO','FIFO','มากสุดก่อน','น้อยสุดก่อน'],1,'เข้าก่อนออกก่อน');
t('32',6,'1','queue',code('int index = (front+size) ____ elementData.length;'),['%'],'modulo ทำให้ตำแหน่งวนรอบ');
t('33',6,'1','queue',code('front = (____) % elementData.length; // หลัง dequeue'),['front+1'],'เลื่อน front หนึ่งตำแหน่ง');
t('34',6,'1–2','queue',code('Object e = peek(); list.remove(____); return e;'),['0'],'ArrayListQueue เอาหัวรายการออก');
q('35',6,'3–5','queue','ทำไมรัน Lee 3 ครั้งจึงได้แผนที่ต่างกัน?',['Queue สุ่มลำดับ','โปรแกรมสุ่มกำแพง','size ไม่คงที่จึงผิด','BFS ไม่กำหนดระยะ'],1,'Math.random() ใช้สร้างแผนที่ก่อนค้นหา');
q('36',7,'1','heap','อาร์เรย์เดิม [13,50,40,5,12,4] โดยห้ามปรับ: พ่อของ 12 คืออะไร?',['13','50','40','5'],1,'12 อยู่ index 4 พ่อ index 1 คือ 50');
q('37',7,'1','heap','จากอาร์เรย์เดิม 40 มีลูกอะไร?',['ไม่มีลูก','ลูกซ้าย 4 ไม่มีลูกขวา','ลูกขวา 4','ลูกซ้าย 5 ขวา 12'],1,'40 อยู่ index 2 ลูกซ้าย index 5 ลูกขวา index 6 ไม่มี');
q('38',7,'5','heap','เวลา peek ของ BinaryHeap ที่เก็บราก index 0 มีขอบเขตแน่นเท่าใด?',['Θ(1)','Θ(log n)','Θ(n)','Θ(n log n)'],0,'อ่านรากโดยไม่ค้นหา');
t('39',7,'5','heap',code('int p = ____; // พ่อของ k เมื่อ k>0'),['(k-1)/2'],'Java หารจำนวนเต็ม','code');
t('40',7,'5','heap',code('swap(k,p);\nk = ____; // fixUp'),['p'],'ไล่ขึ้นตามพ่อหลังสลับ');
t('41',7,'6','heap',code('while ((c = ____) < size) { /* fixDown */ }'),['2*k+1'],'เริ่มพิจารณาลูกซ้าย');
t('42',7,'6','heap',code('if(c+1 < size && greaterThan(____,c)) c++;'),['c+1'],'เลือกขวาเมื่อขวามากกว่าซ้าย');
t('43',7,'6','heap',code('if (!greaterThan(c,____)) break;'),['k'],'หยุดเมื่อลูกที่มากที่สุดไม่มากกว่าพ่อ');
t('44',7,'6','heap',code('elementData[0] = elementData[____]; // dequeue'),['--size'],'ย้ายสมาชิกท้ายเดิมมาแทนราก');
t('45',7,'2','heap','n=11 ต้องเริ่ม bottom-up fixDown ที่ index ใด?',['4'],'floor(11/2)-1 = 4','sequence');
t('46',7,'2','heap','เติม Array สุดท้ายของ heapify [55,14,52,11,1,25,21,36,5,7,8]',['55 36 52 14 8 25 21 11 5 7 1'],'ตรงเฉลยหน้า 2: ทำ index 4,3,2,1,0','sequence');
t('47',7,'7','heap','enqueue 5,3,99; peek แล้ว dequeue 3 ครั้ง ได้ค่าที่คืนตามลำดับใด?',['99 99 5 3'],'peek ไม่ลบ จากนั้นนำออกมากไปน้อย','sequence');
q('48',7,'3','heap','maxIndex ใช้ compareTo >= 0 เมื่อพบค่ามากสุดเท่ากันหลายตัว จะเลือกตัวไหน?',['ตัวแรก','ตัวหลังสุดที่พบ','สุ่ม','เกิด error'],1,'เมื่อเท่ากันก็ปรับ max เป็น i ใหม่');
})();
