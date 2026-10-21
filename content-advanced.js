(() => {
const S=window.Study,{code,table,list,note,answer,section}=S.ui;
S.chapters.push({id:'stack',n:'05',title:'Stack',subtitle:'เข้าทีหลัง ออกก่อน — จากอาร์เรย์ถึงวงเล็บและ recursion',minutes:30,focus:'push · pop · peek · parentheses',sources:['STACK_5.pdf หน้า 4–41','แบบฝึก Stakc_5 หน้า 1–11','หนังสือ บท 6 หน้าเนื้อหา 101–116'],takeaway:'peek ดูแต่ไม่ลบ; pop คืนค่าแล้วลบ; top ของ ArrayStack คือ index size−1',sections:[
section('LIFO และ ArrayStack',`<p>Stack เพิ่มและนำออกด้านเดียว เรียกด้านนั้นว่า top. push A,B,C แล้ว pop จะได้ C,B,A ตามลำดับ ว่างแล้ว peek/pop ต้องทำตามสัญญา ในตัวอย่างใช้ NoSuchElementException</p>${code(`public void push(Object e) {
    ensureCapacity(size + 1);
    elementData[size++] = e;
}
public Object peek() {
    if (size == 0) throw new java.util.NoSuchElementException();
    return elementData[size - 1];
}
public Object pop() {
    Object e = peek();
    elementData[--size] = null;
    return e;
}`)}<p>ใช้ ensureCapacity แบบบท Array. peek/pop O(1), push ปกติ O(1), ตอนขยาย O(n), amortized O(1). ถ้า pop ลด size แต่ไม่ล้าง null ผลลำดับยังถูก แต่ array ยังถือ reference ที่ไม่ใช้งาน</p>`),
section('เฉลย trace จากแบบฝึก Stack',`${table(['คำสั่ง','ผลคืน / พิมพ์','ข้อมูลจากล่างไปบน','size'],[['push A,B,C,E','—','A B C E','4'],['peek()','E','A B C E','4'],['pop()','E (ไม่พิมพ์)','A B C','3'],['peek()','C','A B C','3'],['pop()','C','A B','2'],['pop()','B','A','1'],['size()','1','A','1'],['push F; peek()','F','A F','2'],['size()','2','A F','2']])}<p>ค่าที่ println แสดงตามงาน: <b>E, C, C, B, 1, F, 2</b>. อย่าเผลอลบตอน peek และอย่านับ pop ที่ไม่ได้พิมพ์เป็นบรรทัดผลลัพธ์</p>`),
section('ArrayListStack กับ sLinkStack',`${code(`class ArrayListStack extends ArrayList implements Stack {
    ArrayListStack(int capacity) { super(capacity); }
    public void push(Object e) { add(size(), e); }
    public Object peek() {
        if (isEmpty()) throw new java.util.NoSuchElementException();
        return get(size() - 1);
    }
    public Object pop() {
        Object e = peek(); remove(size() - 1); return e;
    }
}`)}<p>ใช้ท้าย ArrayList เพราะเพิ่ม/ลบท้ายไม่ต้องเลื่อน ส่วน singly linked ถ้าทำ push/peek/pop ที่ <b>หัว</b> สามารถ O(1) ทุกบริการได้</p>${code(`// Stack แบบ linked ที่ทำงานด้านหัว
public void push(Object e) { header.next = new Node(e, header.next); size++; }
public Object peek() {
    if (size == 0) throw new java.util.NoSuchElementException();
    return header.next.element;
}
public Object pop() {
    Object e = peek(); header.next = header.next.next; size--; return e;
}`)}${note('สไลด์หน้า 40 และงาน sLinkStack เลือกท้ายของ singly list ผ่าน add(size,e), nodeAt(size−1), remove(size−1) จึงเดินลิสต์ O(n). ผล LIFO เหมือนกัน แต่ต้นทุนต่างจากเวอร์ชันทำที่หัว อย่าตอบว่า linked stack ทุกแบบ O(1) โดยไม่ดูโค้ด')}`),
section('ตรวจวงเล็บ: ครบจำนวนยังไม่พอ',`<p>เจอวงเล็บเปิดให้ push; เจอวงเล็บปิด ต้องมีตัวเปิดบน top และชนิดตรงกัน จากนั้น pop. จบข้อความต้อง stack ว่าง</p>${code(`static boolean checkParentheses(String text) {
    String open = "{([", close = "})]";
    java.util.ArrayDeque<Character> stack = new java.util.ArrayDeque<>();
    for (char c : text.toCharArray()) {
        if (open.indexOf(c) >= 0) stack.push(c);
        else {
            int k = close.indexOf(c);
            if (k >= 0 && (stack.isEmpty() || stack.pop() != open.charAt(k)))
                return false;
        }
    }
    return stack.isEmpty();
}`)}<p>นี่เป็นเวอร์ชันรันได้ด้วยไลบรารี Java; หลักการตรงกับ ArrayStack ในงาน</p>${table(['ข้อความ','ผล','เหตุผล'],[['{({[[[]]]})}{}[]{{}}','true / OK','ตัวอย่างงาน จับคู่ครบ'],['([)]','false','จำนวนเท่าแต่ชนิดบน top ไม่ตรง'],['())','false','ปิดเกิน เปิดหมดก่อน'],['(()','false','จบแล้วยังมีเปิดค้าง'],['a+(b*c)','true','ข้ามอักขระที่ไม่ใช่วงเล็บ']])}`),
section('Call stack และ recursion',`<p>เรียก method จะสร้าง stack frame เก็บพารามิเตอร์ local variables และจุดกลับ เมื่อ method จบ frame ถูกนำออกแบบ LIFO. ในตัวอย่าง main→a(3,2)→b(1) จะจบ b ก่อนกลับ a แล้วกลับ main ไปเรียก b(5) ต่อ; int 3/2 ได้ 1 ไม่ใช่ 1.5</p><p>recursion ต้องมี base case และขยับเข้าหา base case ถ้าเรียกตัวเองไม่สิ้นสุด เช่น main(args) ใน main จะสะสม frame จน StackOverflowError. การ ++x ภายใน b(int x) ไม่ได้เปลี่ยนตัวแปรของผู้เรียก</p>`),
section('Postfix และลำดับ operand',`<p>อ่าน postfix จากซ้ายไปขวา ตัวเลขให้ push เจอ operator ให้ pop ขวาก่อน แล้ว pop ซ้าย คำนวณ left op right แล้ว push ผลกลับ จบต้องเหลือค่าเดียว</p>${table(['token ของ 8 3 - 2 *','stack (ล่าง→บน)'],[['8','8'],['3','8, 3'],['−','5 เพราะ 8−3'],['2','5, 2'],['*','10']])}${note('การแปลง infix เป็น postfix ใช้ stack เก็บ operator ตาม precedence / associativity และวงเล็บ เช่น (A+B)*C → A B + C *. สำหรับ − และ / ห้ามสลับซ้ายกับขวา')}`)
]});
S.chapters.push({id:'queue',n:'06',title:'Queue',subtitle:'รักษาลำดับ FIFO และเข้าใจการวนของ front',minutes:35,focus:'enqueue · dequeue · modulo · BFS',sources:['QUEUE_6.pdf หน้า 4–32','แบบฝึก Queue_6 หน้า 1–5','หนังสือ บท 7 หน้าเนื้อหา 117–134'],takeaway:'ตำแหน่งเพิ่ม = (front+size)%capacity; ลบแล้ว front=(front+1)%capacity — ไม่ต้องเลื่อนข้อมูล',sections:[
section('FIFO และ Queue ที่สร้างจาก List',`<p>enqueue เพิ่มท้าย dequeue เอาหัวออก peek ดูหัวไม่ลบ เพิ่ม A,B,C แล้วนำออกได้ A,B,C. ArrayListQueue ใช้ list.add(list.size(),e), list.get(0), list.remove(0) ทำงานถูกแต่ลบหัวต้องเลื่อน O(n)</p>${code(`public Object dequeue() {
    Object e = peek();
    list.remove(0);
    return e;
}`)}<p>เปลี่ยนไปใช้ doubly circular LinkedList + header จะเพิ่มท้ายและลบหัว O(1) แต่เสียพื้นที่ลิงก์เพิ่ม นี่คือตัวอย่าง composition/delegation: Queue มี List อยู่ภายในแล้วส่งงานให้ List ทำ</p>`),
section('Circular array: สูตรสำคัญ',`<p>เก็บ front เป็น index หัว และ size เป็นจำนวนข้อมูลจริง ไม่สับสนกับตำแหน่งท้าย ความจุ C=elementData.length. มี size จึงแยกว่างกับเต็มได้: size=0 ว่าง, size=C เต็ม</p>${code(`public void enqueue(Object e) {
    ensureCapacity(size + 1);
    int back = (front + size) % elementData.length;
    elementData[back] = e;
    size++;
}
public Object peek() {
    if (size == 0) throw new java.util.NoSuchElementException();
    return elementData[front];
}
public Object dequeue() {
    Object e = peek();
    elementData[front] = null;
    front = (front + 1) % elementData.length;
    size--;
    return e;
}`)}<p>ตำแหน่งสมาชิกเชิงตรรกะลำดับ i คือ (front+i)%C. ค่าใน array จาก index 0 อาจไม่ใช่ลำดับบริการของ Queue</p>`),
section('ไล่การวน: อาร์เรย์จริง vs ลำดับคิว',`${table(['คำสั่ง (C=4)','array index 0,1,2,3','front','size','ลำดับ FIFO'],[['เริ่ม','· · · ·','0','0','ว่าง'],['enqueue A,B,C','A B C ·','0','3','A B C'],['dequeue → A','· B C ·','1','2','B C'],['enqueue D','· B C D','1','3','B C D'],['enqueue E','E B C D','1','4','B C D E'],['dequeue → B','E · C D','2','3','C D E']])}<p>จุด · หมายถึง null. เมื่อเต็มแล้วเพิ่มอีกต้อง resize ก่อนใช้ modulo ไม่ใช่เขียนทับหัว</p>`),
section('resize คิวที่วนแล้ว',`${code(`private void ensureCapacity(int required) {
    int oldCapacity = elementData.length;
    if (required > oldCapacity) {
        Object[] a = new Object[Math.max(required, 2 * oldCapacity)];
        for (int i = 0; i < size; i++)
            a[i] = elementData[(front + i) % oldCapacity];
        elementData = a;
        front = 0;
    }
}`)}<p>จาก [E,B,C,D], front=1,size=4 ขยายแล้วต้องได้ [B,C,D,E,null,…], front=0. คัดลอกตรง index เดิมจะทำให้ลำดับคิวผิด หากความจุเดิมเป็น 0 จะไม่มีรอบ loop เพราะ size=0 จึงไม่ modulo ด้วยศูนย์</p>`),
section('BFS / Lee: หาเส้นทางสั้นสุดในตาราง',`<ol><li>กำหนดต้นทางเป็น 0 แล้ว enqueue</li><li>dequeue ช่อง p ออกมาขยายเพื่อนบ้าน 4 ทิศ</li><li>รับเฉพาะช่องในขอบเขต เป็นช่องว่าง และยังไม่เคยเยี่ยม</li><li>ใส่ระยะของ p+1 แล้ว enqueue ทันที</li><li>ทำจนถึงปลายทางหรือคิวว่าง</li></ol>${code(`static void expand(Queue q, int r, int c, int k) {
    if (r < 0 || r >= map.length || c < 0 || c >= map[r].length
            || map[r][c] != SPACE) return;
    map[r][c] = k + 1;
    q.enqueue(new Pos(r, c));
}`)}<p>ในใบงาน SPACE=−1, BLOCK=−9. ค่า target คือจำนวนก้าวสั้นที่สุดเมื่อทุกก้าวหนักเท่ากัน หากยัง −1 แปลว่าไปไม่ถึง ย้อนทางได้โดยเลือกเพื่อนบ้านค่าลดทีละ 1 หรือเก็บ predecessor</p>${note('งานให้สุ่ม map ด้วย Math.random() จึงไม่มีผลเลขชุดเดียวสำหรับทั้ง 3 ครั้งรัน อย่าจำภาพผลรันเป็นคำตอบตายตัว ใช้เงื่อนไขการขยายและระยะตรวจความถูกต้อง')}`),
section('ตัวอย่าง BFS ที่ตรวจเองได้',`${code(`S  .  .
#  #  .
.  .  T

ระยะเมื่อสำรวจจนจบ:
0  1  2
#  #  3
6  5  4`)}<p>S=(0,0), T=(2,2) ระยะสั้นสุด 4 ก้าว ถ้าหยุดเมื่อ dequeue T ตามโค้ดในงาน ช่องด้านล่างซ้ายอาจยังไม่ถูกเติม: ความต่างเกิดจากเงื่อนไขหยุด ไม่ใช่ระยะเป้าหมายผิด BFS ทั่วไปใช้ O(V+E), ตาราง R×C ใช้ O(RC)</p><p>การใช้ Queue อื่นในหนังสือ: radix sort แจกข้อมูลตามหลักลง bucket ที่เป็นคิวแล้วเก็บกลับ โดยรักษาลำดับภายใน bucket; blocking queue เพิ่มเงื่อนไขรอเมื่อว่างหรือเต็ม</p>`)
]});
S.chapters.push({id:'heap',n:'07',title:'Priority Queue & Heap',subtitle:'อ่านต้นไม้จากอาร์เรย์ แล้วปรับขึ้น–ลงอย่างมีเหตุผล',minutes:45,focus:'maxIndex · fixUp · fixDown · heapify',sources:['QUEUE_7.pdf หน้า 2–44','แบบฝึก Queue2_7 หน้า 1–8','แบบฝึก BinaryHeap_8 หน้า 1–3','หนังสือ บท 8 หน้าเนื้อหา 135–164'],takeaway:'Max-heap ต้องเป็น complete binary tree และพ่อ ≥ ลูก; fixDown เลือกลูกที่มากกว่าเสมอ',sections:[
section('Priority Queue ต่างจาก Queue',`<p>Queue ปกติเลือกผู้มาก่อน ส่วน Priority Queue เลือกตาม priority. บทนี้เริ่มที่ <b>max-priority</b> จึงเอาค่ามากสุดก่อน ไม่จำเป็นต้อง FIFO เมื่อ priority เท่ากัน ยกเว้นออกแบบ tie-break เพิ่ม</p>${table(['วิธีสร้าง','enqueue','peek','dequeue'],[['ArrayList ไม่เรียง','amortized O(1)','O(n) สแกน maxIndex','O(n)'],['ArrayList เรียง ให้ max อยู่ท้าย','O(n) แทรก','O(1)','O(1)'],['Binary max-heap','O(log n) ไม่รวม resize','O(1)','O(log n)']])}${code(`int max = 0;
for (int i = 1; i < list.size(); i++) {
    Comparable e = (Comparable) list.get(i);
    if (e.compareTo(list.get(max)) >= 0) max = i;
}
return max;`)}<p>ต้องตรวจว่างก่อน max=0. compareTo ให้ค่าลบ/ศูนย์/บวก ไม่จำเป็นต้อง −1/0/1. งานเดิม enqueue 5,3,99: maxIndex=2; peek=99; dequeue=99,5,3. ใช้ >= ทำให้ค่ามากสุดที่เสมอกันเลือกตัวหลังสุดในรายการนี้</p>${note('java.util.PriorityQueue ของ Java ใช้ค่าน้อยสุดเป็นหัวตามธรรมชาติ ต่างจาก max-heap ที่เขียนในวิชานี้ ต้องอ่าน comparator/greaterThan ก่อนเสมอ')}`),
section('Complete tree และสูตร index',`${table(['สิ่งที่หา (index เริ่ม 0)','สูตร'],[['root','0'],['ลูกซ้ายของ i','2*i+1'],['ลูกขวาของ i','2*i+2'],['พ่อของ i เมื่อ i&gt;0','(i−1)/2 หารจำนวนเต็ม'],['พ่อคนสุดท้าย เมื่อ n≥2','floor(n/2)−1'],['มีลูกหรือไม่','index ลูก &lt; size'],['ความสูง complete tree เมื่อ n&gt;0','floor(log₂ n) นับเส้นเชื่อม']])}<p>complete หมายถึงเต็มทุกระดับยกเว้นระดับสุดท้าย ซึ่งเติมจากซ้ายไปขวาได้ไม่ครบ ไม่ได้แปลว่าพ่อทุกตัวมีลูกสองตัว และ max-heap มี parent≥child (ค่าซ้ำได้) แต่พี่น้องไม่จำเป็นต้องเรียงกัน</p>${answer('งานเดิม [13,50,40,5,12,4] โดยยังไม่ปรับ',`<p>root=13; height=2; ลูกของ 13 คือ 50,40; ลูกของ 50 คือ 5,12; ลูกซ้ายของ 40 คือ 4 และไม่มีลูกขวา; พ่อของ 12 คือ 50 ไม่ใช่ 13. โครงรูป complete แต่ยังไม่เป็น max-heap เพราะ 13&lt;50</p>`)}`),
section('enqueue และ fixUp',`${code(`public void enqueue(Object e) {
    ensureCapacity(size + 1);
    elementData[size] = e;
    fixUp(size++);
}
private void fixUp(int k) {
    while (k > 0) {
        int p = (k - 1) / 2;
        if (!greaterThan(k, p)) break;
        swap(k, p);
        k = p;
    }
}`)}<p>เพิ่มท้ายเพื่อรักษา complete shape แล้วสลับขึ้นถ้าลูกมากกว่าพ่อ เช่น [50,13,40,5,12,4] เพิ่ม 60: [50,13,40,5,12,4,60] → [50,13,60,5,12,4,40] → [60,13,50,5,12,4,40]</p>`),
section('dequeue และ fixDown',`${code(`public Object dequeue() {
    Object max = peek();
    elementData[0] = elementData[--size];
    elementData[size] = null;
    if (size > 1) fixDown(0);
    return max;
}
private void fixDown(int k) {
    int c;
    while ((c = 2*k + 1) < size) {
        if (c + 1 < size && greaterThan(c + 1, c)) c++;
        if (!greaterThan(c, k)) break;
        swap(k, c);
        k = c;
    }
}`)}<p>เก็บ root เป็นผลตอบ นำตัวท้ายขึ้น root แล้วปรับลงโดยเลือกลูกที่มากกว่า ถ้าเลือกลูกเล็กอาจยังผิดกับลูกอีกข้าง [60,13,50,5,12,4,40] ลบ 60: [40,13,50,5,12,4] → [50,13,40,5,12,4]</p><p>Min-heap กลับทิศเปรียบเทียบ เลือกลูกน้อยกว่า และยกค่าน้อยสุดไว้ root; หากคลาสแม่เรียก greaterThan ผ่าน method ลูกสามารถ override ให้ความหมาย priority กลับด้าน โดยการเข้าถึง method ต้องอนุญาต</p>`),
section('สร้าง heap ทั้งก้อน: bottom-up',`${code(`for (int k = size / 2 - 1; k >= 0; k--) fixDown(k);`)}<p>เริ่มพ่อสุดท้ายย้อนมาหาราก เพราะ subtree ของลูกต้องเป็น heap ก่อนปรับพ่อ ใบไม่ต้องปรับ ใช้ Θ(n). ถ้า enqueue ทีละตัวใช้ O(n log n) worst case และอาจได้อาร์เรย์ heap คนละแบบที่ถูกทั้งคู่ ถ้าข้อสอบกำหนด fixDown ต้องใช้วิธีนั้น</p><p>หน้า <a href="#practice">เฉลยงานเดิม</a> และ <a href="#lab">ทดลองโครงสร้าง</a> แสดงทุกขั้นของ 3 ชุดจริง:</p>${list(['55,14,52,11,1,25,21,36,5,7,8 — งาน Queue2_7','23,24,12,1,8,65,27,46,15,7,18 — งาน BinaryHeap_8 ข้อ ก','3,21,12,11,84,25,57,46,35,17,8 — งาน BinaryHeap_8 ข้อ ข'])}`),
section('Heap sort และการประยุกต์',`<p>สร้าง max-heap แล้ว swap root กับตัวท้ายของช่วง heap ลดขอบเขตลงหนึ่งแล้ว fixDown(0) ทำซ้ำ สุดท้ายเรียง <b>น้อยไปมาก</b> ในอาร์เรย์เดิม ใช้ O(n log n), auxiliary space O(1) ถ้าเขียนวนซ้ำ และไม่ stable โดยทั่วไป</p><p>แยกกับ dequeue ออกใส่รายการใหม่: max-heap จะคืน <b>มากไปน้อย</b>. หาค่าอันดับ k ทำ dequeue k ครั้งหลัง heapify ใช้ O(n+k log n). งานต้นทุนน้อยสุดและ Huffman เลือก min-priority; การหาทางตามต้นทุนต้องพิจารณาเงื่อนไขน้ำหนัก ไม่ใช้กฎ FIFO แทนโดยไม่ตรวจ</p>`)
]});
S.chapters.push({id:'tree',n:'08',title:'Binary Tree & Huffman',subtitle:'แวะผ่านทุกปม สร้างต้นไม้นิพจน์ และเข้ารหัสข้อมูล',minutes:45,focus:'pre/in/post · expression tree · Huffman',sources:['BinaryTREE_8.pdf หน้า 1–59','แบบฝึก BinaryHeap_8 หน้า 4','หนังสือ บท 9 หน้าเนื้อหา 165–196'],takeaway:'Pre = NLR, In = LNR, Post = LRN; Huffman รวมต้นไม้สองก้อนที่มีความถี่น้อยที่สุดซ้ำจนเหลือหนึ่ง',sections:[
section('Binary Tree, Heap และ BST ไม่เหมือนกัน',`${table(['ชนิด','กฎโครงสร้าง','กฎข้อมูล'],[['Binary tree','ลูกซ้าย/ขวาอย่างละไม่เกิน 1','ไม่มีเงื่อนไขเรียงโดยตัวมันเอง'],['Binary heap','complete binary tree','พ่อ ≥ ลูก (max) หรือ ≤ ลูก (min)'],['Binary search tree (BST)','ไม่จำเป็นต้อง complete','ซ้าย &lt; ปม &lt; ขวาในกรณี key ไม่ซ้ำ']])}<p>root คือราก, leaf คือปมไม่มีลูก, sibling คือพี่น้องพ่อเดียวกัน, subtree คือต้นไม้ย่อย ความลึกนับเส้นจาก root ถึงปม; ความสูงปมคือเส้นทางยาวที่สุดจากปมถึงใบ ในบทนี้ root เดี่ยวสูง 0 และต้นไม้ว่างสูง −1</p>`),
section('Traversal: จังหวะที่เยี่ยมราก',`${code(`void preorder(Node r) {
    if (r == null) return;
    visit(r); preorder(r.left); preorder(r.right);
}
void inorder(Node r) {
    if (r == null) return;
    inorder(r.left); visit(r); inorder(r.right);
}
void postorder(Node r) {
    if (r == null) return;
    postorder(r.left); postorder(r.right); visit(r);
}`)}<div class="tree-demo" data-tree="A,B,C,D,E,F,G"></div>${table(['วิธี','ลำดับของรูป (ราก A, ซ้าย B, ขวา C)','จำ'],[['Preorder','A B D E C F G','N L R รากก่อน'],['Inorder','D B E A F C G','L N R รากกลาง'],['Postorder','D E B F G C A','L R N รากหลัง'],['Level-order','A B C D E F G','ใช้ Queue ไล่ทีละระดับ']])}<p>ทุกแบบเยี่ยม n ปมใช้ Θ(n). Inorder เรียงจากน้อยไปมากได้เมื่อเป็น BST ไม่ใช่ Binary tree หรือ heap ทั่วไป</p>`),
section('บริการพื้นฐานแบบ recursion',`${code(`int numNodes(Node r) {
    return r == null ? 0 : 1 + numNodes(r.left) + numNodes(r.right);
}
int height(Node r) {
    return r == null ? -1 : 1 + Math.max(height(r.left), height(r.right));
}
int numLeaves(Node r) {
    if (r == null) return 0;
    if (r.left == null && r.right == null) return 1;
    return numLeaves(r.left) + numLeaves(r.right);
}
Node copy(Node r) {
    return r == null ? null : new Node(r.element, copy(r.left), copy(r.right));
}`)}<p>copy สร้าง Node ใหม่แต่ถ้า element เป็น reference ก็ยังใช้สมาชิกเดิม ไม่ใช่ deep copy ของวัตถุทุกระดับ. ทั้งสี่บริการใช้ O(n) และ recursion stack O(h)</p>`),
section('เฉลย traversal จากงานจริง',`<p>เติมอาร์เรย์นี้ลงต้นไม้ตามระดับจากซ้ายไปขวา <b>ไม่ใช่แทรกแบบ BST</b>:</p>${code('50 12 3 6 18 24 34 21 9 17 66 33 52 22')}<div class="tree-demo" data-tree="50,12,3,6,18,24,34,21,9,17,66,33,52,22"></div><div data-traversal-exercise></div><p>เฉลยในเว็บคำนวณจากต้นไม้ใหม่ เพื่อไม่ใช้ค่าที่เขียนด้วยมือในใบงานเป็นหลักฐานว่าถูก</p>`),
section('Expression tree: ใบเป็น operand',`<p>โหนดภายในเก็บ operator ใบเก็บ operand เช่น 5+y*4 มี root เป็น +, ซ้าย 5, ขวา * ที่มีลูก y และ 4. Preorder ให้ prefix, Inorder ให้ infix, Postorder ให้ postfix</p>${table(['รูปแบบ','ผล'],[['Prefix','+ 5 * y 4'],['Infix ที่แสดงโครงสร้างครบ','(5 + (y * 4))'],['Postfix','5 y 4 * +']])}<p>Inorder ที่ไม่เติมวงเล็บอาจเสียความหมายของนิพจน์ เช่น (a+b)*c ต้องคงวงเล็บเมื่อนำไปอ่าน</p>${code(`// สร้างต้นไม้จาก postfix: token เป็น operand หรือ binary operator
if (isOperand(token)) stack.push(new Node(token, null, null));
else {
    Node right = stack.pop();
    Node left = stack.pop();
    stack.push(new Node(token, left, right));
}`)}<p>pop ขวาก่อนซ้าย; เจอ operator ต้องมีอย่างน้อย 2 ต้น และเมื่อจบต้องเหลือ 1 ต้น การประเมินค่าทำ postorder เพราะต้องได้ผลลูกก่อนคำนวณพ่อ</p>`),
section('Huffman coding ทีละขั้น',`<p>สร้างใบให้แต่ละสัญลักษณ์พร้อมความถี่ นำเข้า min-priority queue แล้วดึง <b>สองก้อนน้อยที่สุด</b> ออกรวมเป็นพ่อความถี่ผลบวกและใส่กลับ ทำ n−1 ครั้งสำหรับ n สัญลักษณ์ที่มีความถี่บวก สุดท้ายเหลือรากเดียว</p>${table(['ตัวอย่าง A:5, B:9, C:12, D:13, E:16, F:45','ผลรวม'],[['รวม A5 + B9','14'],['รวม C12 + D13','25'],['รวม 14 + E16','30'],['รวม 25 + 30','55'],['รวม F45 + 55','100']])}<p>กำหนดลูกที่ดึงก่อนเป็นซ้าย=0 อีกก้อนเป็นขวา=1 ได้ F=0, C=100, D=101, A=1100, B=1101, E=111. ความยาวถ่วงน้ำหนัก = 5×4+9×4+12×3+13×3+16×3+45×1 = <b>224 บิต</b> สำหรับข้อมูลรวม 100 ตัว ไม่นับตารางรหัส</p>${note('รหัสอาจต่างกันถ้าสลับซ้ายขวาหรือ tie-break ความถี่เท่ากัน แต่ยังถูกและมีต้นทุนเท่ากัน ต้องตรวจ prefix-free: ไม่มีรหัสตัวหนึ่งเป็นคำนำหน้าของอีกตัว')}`),
section('เติม HuffmanTree และการสืบทอด',`${code(`public class HuffmanTree extends BinaryTree implements Comparable {
    public int compareTo(Object obj) {
        return Integer.compare(freq(), ((HuffmanTree) obj).freq());
    }
    public static HuffmanTree coding(int[] f) {
        // ตัวอย่างตามสไลด์: f ไม่ว่างและทุกตัวเป็นความถี่บวก
        BinaryMinHeap h = new BinaryMinHeap(f.length);
        for (int x : f) h.enqueue(new HuffmanTree(x, null, null));
        while (h.size() > 1) {
            HuffmanTree a = (HuffmanTree) h.dequeue();
            HuffmanTree b = (HuffmanTree) h.dequeue();
            h.enqueue(new HuffmanTree(a.freq() + b.freq(), a.root, b.root));
        }
        return (HuffmanTree) h.dequeue();
    }
}`)}<p>โค้ดข้างบนเป็นส่วนของคลาส ต้องมี BinaryTree, BinaryMinHeap และ constructor ประกอบตามสไลด์ Integer.compare เลี่ยง overflow จากการลบความถี่ การพิมพ์รหัสเดินลงซ้ายต่อ 0 ขวาต่อ 1 แล้วพิมพ์เมื่อเป็นใบ</p>${list(['HuffmanTree <b>extends BinaryTree</b> และ <b>implements Comparable</b>','BinaryMinHeap extends BinaryHeap; BinaryHeap implements PriorityQueue; PriorityQueue extends Queue','coding เป็น static จึงเรียก HuffmanTree.coding(f) ได้โดยไม่สร้าง object ก่อน','root / Node ที่ลูกใช้ต้องเข้าถึงได้ตาม visibility; comparable ใช้สั่ง priority ไม่ได้ทำให้เป็น tree เอง','สร้างด้วย heap ใช้ O(n log n). ข้อมูลว่างต้องจัดการแยก; กรณีสัญลักษณ์เดียวอาจกำหนดรหัส 0 ตาม convention แทนสตริงว่าง'])}`)
]});
S.supplement=[
section('ขอบเขตภาคเสริมจากหนังสือ',`<p>สไลด์และงานที่ได้รับจบที่ Binary Tree/Huffman. หัวข้อต่อไปนี้อยู่ในหนังสือ แต่ไม่มีสไลด์หรือใบงานแยกในโฟลเดอร์ จึงจัดไว้ทบทวนเสริม <b>ไม่ถือเป็นหลักฐานว่าออกสอบ</b> เลขหน้าในภาคนี้เป็นเลขหน้าเนื้อหาที่พิมพ์ในหนังสือ</p><p>หนังสือยังมีตัวอย่างเสริมภายในบทต้น ๆ ได้แก่ disjoint sets สร้างเขาวงกต, self-organizing list, sparse matrix, radix sort, least-cost search, logic simulation และ expression-tree differentiation สรุปหลักการไว้ด้านล่าง</p>`),
section('บท 10: BST, AVL และต้นไม้ค้นหา (หน้า 197–246)',`<p>BST เก็บ key ซ้ายเล็กกว่า ปม และขวาใหญ่กว่า (เมื่อไม่ซ้ำ) ค้น/เพิ่มใช้ O(h), ต้นไม้สมดุล h=O(log n) แต่เอียงได้ O(n). หาน้อยสุดเดินซ้าย หามากสุดเดินขวา Inorder ให้ลำดับเรียง</p>${list(['ลบใบ: ตัดลิงก์; ลบปมลูกเดียว: ให้พ่อชี้ลูกแทน; ลบปมสองลูก: ใช้ inorder successor (น้อยสุดของขวา) หรือ predecessor (มากสุดของซ้าย) แล้วลบปมทดแทน','AVL จำกัดความต่างสูงซ้าย–ขวาไม่เกิน 1 ปรับสูงและหมุนเมื่อเสียสมดุล: LL หมุนขวา, RR หมุนซ้าย, LR ซ้ายที่ลูกแล้วขวาที่พ่อ, RL กลับกัน','AVL search/insert/delete O(log n); rotation เปลี่ยนลิงก์จำนวนคงที่และรักษาลำดับ inorder','Map เก็บคู่ key,value; Set ห้าม key ซ้ำ; Collection อาจเพิ่ม count เพื่อเก็บซ้ำ เลือกพฤติกรรมให้ตรงสัญญา','Splay หมุนปมที่เข้าถึงขึ้นราก: amortized O(log n), ครั้งเดียวอาจ O(n)','2–3–4 tree มีหลาย key ต่อปมและความลึกใบเท่ากัน; red-black tree ใช้สีรักษาความสูง O(log n)','Treap มีทั้งกฎ BST ตาม key และ heap ตาม priority สุ่ม; skip list ใช้หลายระดับลิงก์ให้ค้น expected O(log n)'])}${note('อย่านำกฎ BST ไปวาดโจทย์ array→binary tree ในงานบท 8 โจทย์นั้นเติมตามระดับ ไม่ได้ insert key ตามลำดับ')}`),
section('บท 11: Hash table (หน้า 247–282)',`<p>hash function แปลง key เป็น index ตาราง ความจุ m และสมาชิก n ให้ load factor α=n/m. Collision คือ key ต่างกันลงช่องเดียวกัน ไม่ใช่ข้อมูลซ้ำ</p>${table(['วิธี','การชน / การลบ','จุดระวัง'],[['Separate chaining','แต่ละ bucket เก็บรายการ; ลบจากรายการได้','expected O(1+α), worst O(n)'],['Linear probing','ตรวจ (h+i)%m','primary clustering; ลบต้องมี tombstone'],['Quadratic probing','ตรวจ (h+c₁i+c₂i²)%m','ความครอบคลุมขึ้นกับ m และค่าคงที่'],['Double hashing','ตรวจ (h₁+i*h₂)%m','step ต้องไม่เป็น 0 และควร coprime กับ m']])}<p>ตัวอย่าง m=7, h=k%7 ใส่ 10,17,24 ด้วย linear probing จะลง 3,4,5. ถ้าลบ 17 แล้วทำช่อง 4 เป็น empty จริง การค้น 24 อาจหยุดผิด ต้องใช้ tombstone หรือจัดการกลุ่มใหม่</p><p>Resize ต้อง <b>rehash</b> เพราะ index ขึ้นกับ m. key ที่ equals กันต้อง hashCode เท่ากัน แต่ hashCode เท่ากันไม่จำเป็นต้อง equals. อย่าแก้ field ของ key ที่มีผลกับ hash ระหว่างเก็บ</p>`),
section('บท 12: Iterator (หน้า 283–300)',`<p>Iterator แยกวิธีเดินข้อมูลออกจาก representation ผู้ใช้เรียก hasNext และ next โดยไม่ต้องรู้ว่าเก็บ Array, Linked หรือ Tree. hasNext ตรวจแต่ไม่เลื่อน; next คืนตัวถัดไปแล้วเลื่อน และหมดแล้ว throw NoSuchElementException</p>${code(`java.util.Iterator<String> it = list.iterator();
while (it.hasNext()) System.out.println(it.next());`)}<p>Array iterator เก็บ cursor; linked iterator เก็บ Node ถัดไป; tree inorder iterator ใช้ stack เก็บเส้นทางซ้าย; hash iterator เดิน bucket และสมาชิกภายใน Fail-fast ตรวจ modCount กับ expectedModCount เพื่อจับ structural change ระหว่าง iteration แต่ไม่ใช่กลไกความปลอดภัยสำหรับหลาย thread</p><p>Iterator.remove ลบตัวล่าสุดที่ next คืนมา ทำได้เมื่อ implementation รองรับและตามสถานะที่กำหนด ไม่ใช่ลบตัวถัดไป; enhanced for ใช้ Iterable/Iterator สำหรับ collection</p>`),
section('บท 13: Sorting (หน้า 301–336)',`${table(['อัลกอริทึม','หลักการ','เวลา worst case','stable โดยทั่วไป'],[['Selection','เลือกน้อยสุดจากส่วนที่เหลือไปไว้หน้า','O(n²)','ไม่'],['Bubble','สลับคู่ติดกันที่ผิดลำดับ','O(n²); best O(n) ถ้ามี early stop','ใช่ เมื่อไม่สลับค่าที่เท่ากัน'],['Insertion','แทรกตัวถัดไปใน prefix ที่เรียงแล้ว','O(n²); best O(n)','ใช่ เมื่อเลื่อนเฉพาะค่ามากกว่า'],['Shell','insertion ตามช่วง gap แล้วลด gap','ขึ้นกับ gap sequence','ไม่'],['Merge','แบ่งครึ่ง เรียงลูก แล้วผสาน','O(n log n), พื้นที่ O(n) สำหรับ array','ใช่ ถ้าเท่ากันเลือกจากซ้ายก่อน'],['Heap','max-heap แล้วส่ง root ไปท้าย','O(n log n), auxiliary O(1)','ไม่'],['Quick','partition รอบ pivot แล้วเรียงส่วนย่อย','O(n²); expected O(n log n)','ไม่']])}<p>stable รักษาลำดับเดิมของข้อมูลที่ key เท่ากัน ไม่ได้หมายถึงผลเรียงถูกกว่า. Quicksort ที่ pivot ไม่ดีอาจแบ่ง 0 กับ n−1; randomized pivot ช่วยเชิงคาดหมายแต่ไม่ลบ worst case. ขอบเขตล่าง Ω(n log n) ใช้กับ comparison sorting ทั่วไป ไม่ได้ห้าม counting/radix ที่อาศัยโครงสร้าง key</p>${answer('Insertion sort [5,2,4,1] ทีละรอบ',`<p>[2,5,4,1] → [2,4,5,1] → [1,2,4,5]. ในแต่ละรอบส่วนซ้ายของตำแหน่งปัจจุบันเรียงแล้ว</p>`)}`),
section('ตัวอย่างเสริมในบท 1–9 ที่ควรรู้ความหมาย',`${list(['<b>Disjoint sets / union-find (บท 1):</b> find หาตัวแทนกลุ่ม; union รวมกลุ่ม ถ้าสองช่องของเขาวงกตอยู่คนละกลุ่มจึงทุบกำแพงแล้วรวม ช่วยเลี่ยงวงจร','<b>Self-organizing list (บท 5):</b> ย้ายรายการที่ใช้บ่อยขึ้นหน้าเพื่อลดการค้นโดยเฉลี่ยตามรูปแบบการใช้งาน ไม่ได้รับประกันทุกการค้น O(1)','<b>Sparse matrix (บท 5):</b> เก็บเฉพาะ row,column,value ที่ไม่เป็นศูนย์ แล้วรวมรายการพิกัดเดียวกันเมื่อบวก','<b>Radix sort (บท 7):</b> แจกลงคิวตามหลักจากหลักต่ำไปสูง เก็บกลับตามลำดับ bucket โดยแต่ละ pass ต้อง stable; เวลา O(d(n+b)) เมื่อ d หลัก b ฐาน','<b>Least-cost search (บท 8):</b> เลือกสถานะต้นทุนสะสมน้อยสุดด้วย min-priority queue พร้อมบันทึกต้นทุนที่ดีที่สุดและจัดการ visited ตามอัลกอริทึม','<b>Logic simulation (บท 8):</b> คิวเหตุการณ์เรียงตามเวลาที่จะเกิด ดึงเหตุการณ์เร็วสุด อัปเดตสัญญาณแล้วจัดเหตุการณ์ถัดไป','<b>อนุพันธ์ด้วย expression tree (บท 9):</b> ใบค่าคงที่→0, ตัวแปร x→1, ผลบวกแยกอนุพันธ์แต่ละลูก, ผลคูณใช้ u′v+uv′ แล้วลดรูป เช่น x+0→x, x*1→x; ต้องระวัง domain เมื่อยุบสมการ'])}`)
];
})();
