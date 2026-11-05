/* First-page checkbox questions, checked against the visible teacher answer marks. */
(() => {
'use strict';
const S=window.Study,{code,table,answer,section,note}=S.ui;
const groups=[
{lesson:1,items:[
['ข้อใดต่อไปนี้เป็นวิธีสร้างที่เก็บข้อมูล ให้กากเครื่องหมายกากบาทในช่องว่างนั้น ๆ',[1,4,5],'เฉลยเลือก Array, Tree และ List โดยคำว่า List ในบริบทวิธีสร้างหมายถึงการโยงปม (linked list) ให้แยกจาก List ที่เป็น ADT','ข้อ 2'],
['หากต้องการที่เก็บข้อมูลแบบ FIFO และมีการยอมให้เก็บได้เฉพาะข้อมูลที่ต่างกันเท่านั้น นักศึกษาจะเลือกใช้ที่เก็บข้อมูลแบบใดร่วมกับแบบใด',[0,6],'เฉลยเลือก Queue ร่วมกับ Set: Queue กำหนดเข้าก่อนออกก่อน และ Set กำหนดไม่ให้สมาชิกซ้ำ','ข้อ 3'],
['การสร้างที่เก็บข้อมูล เช่น Set ในตัวอย่างแก้ไขปัญหาของ 15-puzzle คือ คลาส ArraySet() นั้น สามารถจะสร้างได้โดยหลายวิธีสร้าง ซึ่งจากตัวอย่างปัญหานั้น สรุปได้ว่า วิธีของ HashSet จะให้ผลดีที่สุด นักศึกษาคิดว่าวิธีนี้จะทำงานได้ดีกับทุกปัญหาอื่น ๆ ด้วยเช่นกัน ใช่หรือไม่ใช่',false,'เฉลยตอบ “ไม่ใช่” ประสิทธิภาพขึ้นกับชนิดงาน การดำเนินการ ข้อมูล และค่าใช้จ่ายของแต่ละ implementation','ข้อ 4']
]},
{lesson:2,items:[
['interface Collection ที่นักศึกษาได้เรียนผ่านมายังขาด Constructor method',false,'ตามเฉลย: ผิด เพราะ interface ไม่มี constructor ตามรูปแบบของมัน จึงไม่ใช่ส่วนที่ขาดและต้องเติม constructor อยู่ในคลาสที่สร้าง object'],
['interface Collection เป็นเพียงรูปแบบของคลาสเท่านั้น ไม่สามารถนำไปสร้างเป็น Object ได้',true,'ตามบริบทเฉลย: ถูก คือสร้าง instance ของ interface โดยตรงไม่ได้ ต้องมีคลาสที่ implements แล้วสร้าง instance ของคลาสนั้น; anonymous class ก็เป็นการสร้างคลาสที่ implements เช่นกัน'],
['interface Collection สามารถเพิ่ม methods ที่มีรายละเอียดการทำงานด้วยก็ได้',false,'ตามเครื่องหมายในเฉลย: ผิด โดยอิง interface ตัวอย่างที่ประกาศเฉพาะหัว method. ข้อควรแยก: Java ตั้งแต่ 8 มี default/static methods ที่มี body ได้ ดังนั้นถ้าถามกฎ Java รุ่นใหม่โดยทั่วไป ข้อความนี้ทำได้ คะแนนชุดนี้ยึดเครื่องหมายของอาจารย์'],
['interface Collection จะใช้เพื่อสร้างเป็นคลาสอื่นโดยใช้คำว่า implements หลังชื่อคลาสนั้น ๆ',true,'คลาสใช้ implements Collection เพื่อประกาศว่าจะทำตามสัญญาของ interface; extends ใช้กับการสืบทอดคลาส หรือ interface สืบทอด interface'],
['คลาส ArrayCollection ที่เรียนมา ส่วน field ชื่อ elementData จะเป็น Array ที่เก็บตัวชี้ไปยัง Object',true,'Object[] เก็บ reference ที่อ้างถึง object ในแต่ละช่อง ไม่ได้คัดลอก object ทั้งก้อนมาใส่ช่อง'],
['คลาส ArrayCollection ที่ส่วน field ชื่อ size จะเป็นตัวแปรที่เก็บขนาดของ elementData ทั้งหมด',false,'size คือจำนวนสมาชิกจริง ส่วน elementData.length คือความจุของอาร์เรย์ เช่น มีข้อมูล 3 ตัวในอาร์เรย์ 10 ช่อง → size=3 และ length=10']
]},
{lesson:3,items:[
['การสร้างที่เก็บข้อมูลแบบ Collection โดยใช้วิธีแบบการโยง (linked) จะเขียนโปรแกรมได้ง่ายและเปลืองเนื้อที่เก็บข้อมูลเปล่า (null) มากกว่าใช้วิธีแบบ Array',false,'ตามเฉลย: ผิด linked สร้างปมตามจำนวนข้อมูลและไม่ต้องจองช่องว่างเผื่อแบบ Array แต่มีค่าใช้จ่ายสำหรับ reference และแต่ละ object จึงไม่ได้หมายความว่า linked ใช้หน่วยความจำน้อยกว่าเสมอ'],
['วิธีเก็บแบบการโยงปมนั้น แต่ละปมจะประกอบด้วยตัวชี้ข้อมูล (อ็อบเจ็กต์) และตัวนับจำนวนปม',false,'LinkedNode ในงานมี element และ next; ตัวนับ size อยู่ใน LinkedCollection ไม่ใช่ทุก Node'],
['การโยงแบบไม่มีปมหัว (Head node) เมทโธด isEmpty() สามารถตรวจได้ด้วย first == null',true,'แบบไม่มี header ถ้า first ไม่อ้างถึงปมใด แปลว่าไม่มีสมาชิก ต้นฉบับสะกด isEmtry/fist แต่ในโค้ดต้องใช้ชื่อ isEmpty/first ให้ตรง declaration'],
['การโยงแบบไม่มีปมหัว คำสั่ง first = new LinkedNode(e, first); คือการเพิ่มปมใหม่ที่ปมแรก',true,'สร้างปม e โดยให้ next ชี้ตัวแรกเดิม แล้วให้ first ชี้ปมใหม่ จึงเพิ่มที่หัว ต้องเพิ่ม size ในขั้นตอนของ method ด้วย'],
['การโยงแบบมีปมหัว คำสั่ง p.next = p.next.next; คือการลบปมถัดจากปมที่ p อ้างอิงอยู่',true,'เมื่อ p และ p.next มีอยู่ คำสั่งโยงข้ามปมถัดไปออกจากสายโซ่ แต่ยังต้องลด size ตามการออกแบบ'],
['การโยงแบบมีปมหัว คำสั่ง p = p.next; เป็นการลบปมที่ p อ้างอิง',false,'เป็นการเลื่อนตัวแปร p ไปอ้างถึงปมถัดไป ไม่ได้แก้ next ของปมในโครงสร้าง จึงไม่ได้ลบปม']
]},
{lesson:4,items:[
['ที่เก็บข้อมูลแบบ List นี้ สิ่งที่เพิ่มมาชัดเจนคือความสามารถระบุตำแหน่งที่เก็บข้อมูลได้',true,'List มีการทำงานตามตำแหน่ง เช่น get(index), set(index,e), add(index,e) และ remove(index)'],
['List หากสร้างด้วยวิธี Array แล้ว ตัวแปร size คือใช้บอกจำนวนช่องทั้งหมดของอาร์เรย์',false,'size บอกสมาชิกจริง ไม่ใช่ความจุ; ความจุอ่านจาก elementData.length'],
['List หากสร้างด้วยวิธี Singly linked แล้ว สามารถเพิ่มประสิทธิภาพในการอ้างถึงได้ด้วยโครงสร้างวน (circular) ดังรูป',false,'ตามเฉลย: ผิด รูปแสดง first → A → B → A การวนกลับไม่ทำให้เข้าถึงตาม index ได้ทันที ยังต้องไล่ next จึงไม่ได้เพิ่มประสิทธิภาพการเข้าถึงตามที่กล่าว'],
['List หากสร้างด้วยการโยงคู่แบบมีปมหัว ก็จะให้ประสิทธิภาพดีเรื่องการเข้าถึงข้อมูล แต่ต้องเสียพื้นที่หน่วยความจำเพิ่มเพื่อเก็บตัวชี้โยงรวมสองตัวต่อหนึ่งปม',true,'ตามเฉลย: ถูก โดยเพิ่ม prev ทำให้เดินย้อนกลับได้ และ implementation ที่เลือกเดินจากหัวหรือท้ายอาจลดจำนวนปมที่ผ่าน แต่การเข้าถึงตาม index ยังเป็น O(n) ไม่ใช่ O(1)'],
['List ที่สร้างด้วยการโยงคู่ เมื่อ new ด้วย constructor ที่กำหนด จะได้ header ซึ่ง prev และ next ชี้กลับตัวเองตามรูป',true,'constructor สร้าง sentinel หนึ่งปมแล้วกำหนด header.prev = header.next = header จึงได้ doubly circular list ว่าง และ size=0'],
['คำสั่ง header.prev = header; คือ ตัวชี้ header.prev จะชี้ไปที่ header.next',true,'ตามเฉลย: ถูกในรูปสถานะรายการว่าง ซึ่ง header.next อ้างถึง header อยู่แล้ว จึงชี้ถึงปมเดียวกัน แต่ความหมายตรง ๆ ของคำสั่งคือ prev อ้างถึงปม header ไม่ใช่อ้างถึง field next และข้อความนี้ไม่จริงทั่วไปเมื่อมีสมาชิก'],
['ตัวอย่าง List ในโปรแกรม sparse vector แสดงว่าสามารถจัดการได้อย่างมีประสิทธิภาพ แม้สร้างด้วย Array พื้นฐาน โดยจัดเก็บเป็นคู่ข้อมูลแทนเก็บเลขศูนย์ทุกตัว',true,'เก็บเฉพาะคู่ (ตำแหน่ง, ค่าที่ไม่เป็นศูนย์) ช่วยลดข้อมูลที่ต้องจัดเก็บและประมวลผลเมื่อเวกเตอร์มีศูนย์มาก ประโยชน์ขึ้นกับสัดส่วนข้อมูลที่ไม่เป็นศูนย์']
]},
{lesson:5,items:[
['ที่เก็บข้อมูลแบบ Stack มีลักษณะ First In Last Out หรือ Last In First Out',true,'FILO และ LIFO อธิบายกติกาเดียวกัน เช่น push A,B,C แล้ว pop ได้ C ก่อน'],
['คำสั่ง push() ของ Stack ที่เรียนมาจะเปลืองเวลาเมื่อมีการจองพื้นที่เพิ่มจากเดิม เป็น O(n)',true,'ครั้งที่ต้องขยายอาร์เรย์จะคัดลอกข้อมูล n ตัว จึงใช้ Θ(n) ในครั้งนั้น; push ที่ไม่ขยายใช้ Θ(1)'],
['ตัวแปร size ในคลาส ArrayStack มีไว้เก็บจำนวนช่องทั้งหมดที่จองพื้นที่ไว้ใช้',false,'size คือจำนวนสมาชิกใน Stack ปัจจุบัน ส่วนจำนวนช่องที่จองคือ elementData.length'],
['pop() ที่เขียนเป็น Object e = peek(); size--; return e; ยังทำงานได้ แต่มีหน่วยความจำค้างแม้ pop แล้ว',true,'ผลนำออกและ size ยังถูกต้อง เพราะ peek ตรวจว่างให้ก่อน แต่ reference ของสมาชิกยังอยู่ในช่องพ้น size จึงอาจทำให้ object ยังถูกอ้างถึง ควรล้าง elementData[--size] = null']
]},
{lesson:6,items:[
['ที่เก็บข้อมูลแบบ Queue มีลักษณะ First In Last Out หรือ Last In First Out',false,'Queue ปกติเป็น FIFO: เข้าก่อนออกก่อน ส่วน FILO/LIFO เป็น Stack'],
['enqueue(Object e) ของ ArrayQueue จะใส่ e ที่ตำแหน่ง (front+size) % elementData.length',true,'front เป็นหัวคิว และ size คือจำนวนสมาชิก จึงได้ตำแหน่งท้ายถัดไปแบบวนรอบ ต้องเตรียมความจุให้พอก่อนคำนวณ/ใส่'],
['ตัวแปร size ในคลาส ArrayQueue มีไว้เก็บจำนวนช่องทั้งหมดที่จองพื้นที่ไว้ใช้',false,'size คือจำนวนสมาชิกจริง ไม่ใช่ capacity ของอาร์เรย์'],
['เมื่อ dequeue() ของ ArrayQueue เสร็จแล้ว front จะถูกเลื่อนไปที่ (front+1) % elementData.length',true,'หลังนำหัวเดิมออก หัวใหม่คือช่องถัดไป ถ้าข้ามท้ายอาร์เรย์ modulo จะทำให้กลับไป index 0']
]},
{lesson:7,items:[
['รากคือ 40',false,'ต้องอ่านอาร์เรย์เดิมตามโจทย์ รากคือ index 0 ซึ่งมีค่า 13 ไม่ใช่ 40'],
['ฮีปนี้เป็นต้นไม้ที่สูง 2',true,'เมื่อวัดความสูงเป็นจำนวนเส้นเชื่อม เส้นทางยาวสุดจากรากถึงใบมี 2 เส้น หรือมี 3 ระดับ'],
['13 ไม่มีลูกขวา',false,'13 อยู่ index 0 มีลูกขวาที่ index 2 คือ 40'],
['40 ไม่มีลูกซ้าย',false,'40 อยู่ index 2 มีลูกซ้ายที่ index 5 คือ 4'],
['40 ไม่มีลูกขวา',true,'ลูกขวาของ index 2 คือ index 6 แต่ข้อมูลมีเพียง index 0–5 จึงไม่มีลูกขวา'],
['ปมพ่อของ 12 คือ 13',false,'12 อยู่ index 4 พ่อคือ floor((4−1)/2)=1 ซึ่งมีค่า 50'],
['ปมพ่อของ 40 คือ 13',true,'40 อยู่ index 2 พ่อคือ floor((2−1)/2)=0 ซึ่งมีค่า 13'],
['Priority Queue ที่ใช้ Array List จะต้องเสียเวลาในบางเมทโธด เช่น peek() อย่างน้อยเป็นเวลา O(n log n)',false,'ตามเฉลย: ผิด ArrayPQ ในใบงานใช้ maxIndex สแกนสมาชิก n ตัว จึงใช้ Θ(n) สำหรับ peek ไม่จำเป็นต้องเรียงข้อมูล O(n log n) และคำว่า “อย่างน้อย” ควรสื่อขอบเขตล่างด้วย Ω'],
['Priority Queue ที่ใช้ Binary Heap มีเวลา peek() เป็น O(n)',false,'ตามเครื่องหมายในเฉลย: ผิด เพราะอ่านรากได้โดยตรง จึงใช้ขอบเขตแน่น Θ(1) และโดยทั่วไปตอบ O(1). ทางคณิตศาสตร์ O(n) เป็นขอบเขตบนที่หลวมของงานคงที่ได้ จึงต้องแยกถ้อยคำกำกวมนี้จากเวลาที่แน่นของ peek']
]}
];
// Complete statements; spelling/spacing normalized from the supplied PDFs.
const originalStatements={"2": ["interface Collection ที่นักศึกษาได้เรียนผ่านมายังขาด Constructor method", "interface Collection เป็นเพียงรูปแบบของคลาสเท่านั้น ไม่สามารถนำไปสร้างเป็น Object ได้", "interface Collection สามารถเพิ่ม methods ที่มีรายละเอียดการทำงานด้วยก็ได้", "interface Collection จะใช้เพื่อสร้างเป็นคลาสอื่นโดยใช้คำว่า implements หลังชื่อคลาสนั้นๆ", "คลาส ArrayCollection ที่เรียนมา ส่วน field ชื่อ elementData จะเป็น Array ที่เก็บตัวชี้ไปยัง Object", "คลาส ArrayCollection ที่ส่วน field ชื่อ size จะเป็นตัวแปรที่เก็บขนาดของ elementData ทั้งหมด"], "3": ["การสร้างที่เก็บข้อมูลแบบ Collection โดยใช้วิธีแบบการโยง (linked) จะเขียนโปรแกรมได้ง่ายและ เปลืองเนื้อที่ๆเก็บข้อมูลเปล่า (null) มากกว่าใช้วิธีแบบ Array", "วิธีเก็บแบบการโยงปมนั้น แต่ละปมจะประกอบด้วย ตัวชี้ข้อมูล (อ็อปเจ็ก) และตัวนับจำนวนปม", "การโยงแบบไม่มีปมหัว (Head node) เมทโธด isEmpty( ); สามารถตรวจที่ได้ด้วย first == null;", "การโยงแบบไม่มีปมหัว คำสั่ง first = new LinkedNode(e,first); คือการเพิ่มปมใหม่ที่ปมแรก", "การโยงแบบมีปมหัว คำสั่ง p.next = p.next.next; คือการลบปมถัดจากปมที่ p อ้างอิงอยู่", "การโยงแบบมีปมหัว คำสั่ง p = p.next; เป็นการลบปมที่ p อ้างอิง"], "4": ["ที่เก็บข้อมูลแบบ List นี้สิ่งที่เพิ่มมาชัดเจนคือความสามารถระบุตำแหน่งที่เก็บข้อมูลได้นั่นเอง", "List หากสร้างด้วยวิธี Array แล้ว ตัวแปร size คือใช้บอกจำนวนช่องทั้งหมดของ อาเรย์", "List หากสร้างด้วยวิธี Singly linked แล้ว สามารถเพิ่มประสิทธิภาพในการอ้างถึงได้ด้วยโครงสร้าง วน (circular) ดังรูป", "List หากสร้างด้วยการโยงคู่แบบมีปมหัว ก็จะให้ประสิทธิภาพดีเรื่องการเข้าถึงข้อมูล (Object) แต่ก็ ต้องเสียพื้นที่หน่วยความจำเพิ่มเพื่อเก็บตัวชี้โยงอีกตัวรวมเป็นสองตัวชี้โยงต่อหนึ่งปม (Node)", "List สร้างด้วยการโยงคู่แล้ว เช่น คลาส LinkedList ที่เรียนผ่านมา เมื่อเรานำคลาสนี้มาสร้าง อ็อป เจ็กด้วยคำสั่ง new เราก็จะได้โครงสร้างของ อ็อปเจ็กดังรูปทันที จาก contructor ข้างล่างนี้", "คำสั่ง header.prev = header; คือ ตัวชี้ header.prev จะชี้ไปที่ header.next นั่นเอง", "ตัวอย่างการใช้งาน List ในโปรแกรมประมวลผล เวกเตอร์มากเลขศูนย์ (sparse vector) นั้น แสดง ให้เห็นว่า เราสามารถจัดการกับเวกเตอร์นี้ได้อย่างมีประสิทธิภาพ แม้ว่าเราจะเลือกการสร้างแบบใช้ Array พื้นฐานก็ตาม โดยเฉพาะในการจัดเก็บข้อมูลให้อยู่ในรูปแบบคู่ข้อมูลแทนเก็บทุกจำนวนเลขศูนย์"], "5": ["ที่เก็บข้อมูลแบบ Stack มีลักษณะการเก็บแบบ First In Last Out หรือ Last In First Out", "คำสั่ง push( ); ของ Stack ที่เรียนมา จะเปลืองเวลาเมื่อมีการจองพื้นที่เพิ่มจากเดิม เป็น O(n)", "ตัวแปร size; ในคลาส ArrayStack ที่เรียนมานั้น มีไว้เพื่อเก็บจำนวนช่องทั้งหมดที่จองพื้นที่ไว้ใช้", "คำสั่ง pop( ); ในคลาส ArrayStack นั้น หากเขียนใหม่เป็นดังต่อไปนี้ โปรแกรมก็ยังสามารถทำงาน ได้เช่นกัน เพียงแต่ จะมีหน่วยความจำที่ค้างอยู่ แม้มีการ pop( ); ข้อมูลแล้วก็ตาม", "elementData; private int size; public ArrayStack(int cap) { elementData = new Object[cap]; } public boolean isEmpty(){"], "6": ["ที่เก็บข้อมูลแบบ Queue มีลักษณะการเก็บแบบ First In Last Out หรือ Last In First Out", "คำสั่ง enqueue(Object e ); ของ ArrayQueue ที่เรียนมาจะใส่ e ในอาเรย์ตำแหน่งที่คำนวณ ได้คือ (front+size) % elementData.length;", "ตัวแปร size; ในคลาส ArrayQueue ที่เรียนมานั้น มีไว้เพื่อเก็บจำนวนช่องทั้งหมดที่จองพื้นที่ไว้ใช้", "คำสั่ง dequeue( ); ในคลาส ArrayQueue นั้น เมื่อกระทำเสร็จแล้วตัวชี้ front จะถูกลื่อนให้ไปชี้ ที่ (front+1) % elementData.length;"], "7": ["รากคือ 40", "ฮีปนี้เป็นต้นไม้ที่สูง 2", "13 ไม่มีลูกขวา", "40 ไม่มีลูกซ้าย", "40 ไม่มีลูกขวา", "ปมพ่อของ 12 คือ 13", "ปมพ่อของ 40 คือ 13", "หากเราสร้าง Priority Queue โดยใช้ที่เก็บแบบ Array List นั้นสามารถทำได้เช่นกัน แต่จะต้อง เสียเวลาทำงานในบางเมทโธด เช่น peek( ); อย่างน้อยเป็นเวลา O(n log n)", "หากเราสร้าง Priority Queue โดยใช้ที่เก็บแบบ Binary Heap แล้ว เวลา peek( ) จะเป็น O(n)"]};
for(const g of groups) if(originalStatements[g.lesson]) g.items.forEach((item,i)=>item[0]=originalStatements[g.lesson][i]);
function diagram(circular){
 const drawing=circular?`<path d="M140 105H205"/><path d="M300 105H360"/><path d="M455 105H490V45H240V80"/><rect x="205" y="80" width="95" height="50"/><rect x="360" y="80" width="95" height="50"/><text x="48" y="100">size = 2</text><text x="50" y="125">first</text><text x="235" y="112">A | next</text><text x="390" y="112">B | next</text>`:`<path d="M155 110H225"/><path d="M330 85H400V35H270V80"/><path d="M330 125H420V175H270V140"/><rect x="225" y="80" width="105" height="60"/><text x="55" y="102">size = 0</text><text x="55" y="128">header</text><text x="242" y="115">header</text><text x="345" y="65">next</text><text x="345" y="160">prev</text>`;
 return `<figure class="worksheet-figure"><svg viewBox="0 0 540 200" role="img" aria-label="${circular?'size 2: first ชี้ A; A.next ชี้ B; B.next ชี้ A':'รายการว่าง size 0 มี header หนึ่งปม next และ prev วนกลับมาที่ header'}"><defs><marker id="worksheet-arrow-${circular?'circle':'header'}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0 0L10 5L0 10z" fill="#b2c8ad"/></marker></defs><g class="worksheet-diagram" style="--diagram-arrow:url(#worksheet-arrow-${circular?'circle':'header'})">${drawing}</g></svg><figcaption>รูปประกอบตามโครงสร้างในโจทย์</figcaption></figure>`;
}
const headerCode=code('public LinkedList() {\n    header = new LinkedNode(null, null, null);\n    header.prev = header.next = header;\n}');
function attachment(n,i){
 if(n===4&&i===2)return diagram(true);
 if(n===4&&i===4)return headerCode+diagram(false);
 if(n===4&&i===5)return '<p class="small">พิจารณาสถานะหลัง constructor ในข้อก่อนหน้า:</p>'+headerCode+diagram(false);
 if(n===5&&i===3)return code('public Object pop() {\n    Object e = peek();\n    size--;\n    return e;\n}');
 return '';
}
S.trueFalseGroups=groups;
for(const group of groups){
 const lesson=S.teacherLessons.find(c=>c.id===group.lesson);
 const questions=group.items.map(([prompt,correct,explanation,label],i)=>{
  const multiple=Array.isArray(correct);
  const context=group.lesson===7&&i<7?'<div class="worksheet-context"><b>โจทย์กำหนด:</b> ให้อาร์เรย์เป็นฮีปเก็บข้อมูล 13, 50, 40, 5, 12, 4 <b>(ไม่ต้องปรับให้ถูกต้อง)</b></div>':'';
  const q={id:group.lesson===1?`worksheet-1-${i+2}`:`tf-${group.lesson}-${String(i+1).padStart(2,'0')}`,bank:'teacher',format:'truefalse',lesson:group.lesson,chapter:lesson.chapter,type:multiple?'multiple':'choice',prompt:S.esc(prompt),context,attachments:attachment(group.lesson,i),choices:multiple?['Queue','Array','Stack','Collection','Tree','List','Set']:group.lesson===1?['ใช่','ไม่ใช่']:['ถูก','ผิด'],correct:multiple?correct:correct?0:1,explanation,source:`${S.teacherFiles[group.lesson-1]} · หน้า PDF 1 · ${label||'ข้อ 1 ข้อย่อย '+(i+1)}`};
  S.questions.push(q);return q;
 });
 lesson.sections.unshift(section('โจทย์ต้นใบงาน: ถูก–ผิดและเลือกคำตอบ',`<p class="source-line">${S.teacherFiles[group.lesson-1]} · หน้า PDF 1 · ${questions.length} ข้อ</p><p>โจทย์เต็มพร้อมข้อมูล รูปและโค้ดที่อ้างถึง ตอบได้บนเว็บทันที คะแนนยึดเครื่องหมายเฉลยอาจารย์ และมีข้อสังเกตประกอบในเฉลย</p><a class="btn primary" href="#quiz/truefalse/lesson-${group.lesson}">เริ่มทำโจทย์บทนี้ →</a>${questions.map((q,i)=>`<section class="worksheet-reading"><p class="meta">${q.source}</p>${q.context}<h3>${q.prompt}</h3>${q.attachments}<p>${q.type==='multiple'?'เลือกได้มากกว่าหนึ่งข้อ: ':''}${q.choices.map(S.esc).join(' / ')}</p>${answer('ดูเฉลย',`<p><b>${q.type==='multiple'?q.correct.map(j=>q.choices[j]).join(', '):q.choices[q.correct]}</b></p><p>${q.explanation}</p>`)}</section>`).join('')}`));
}
})();
