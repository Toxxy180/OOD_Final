# OOD Study Room

เว็บสรุปภาษาไทยสำหรับทบทวน Java OOP และโครงสร้างข้อมูลก่อนสอบ อ้างอิงสไลด์ 8 ไฟล์ แบบฝึกหัด 8 ไฟล์ หนังสือประกอบ และแนวโจทย์ที่ได้รับ

- 9 บทหลัก: Java/OOP, Collection & Array, Complexity, Linked Collection, List, Stack, Queue, Priority Queue & Heap, Binary Tree & Huffman
- เฉลยงานเดิม รวม heapify 3 ชุดและ traversal ชุดจริง คำนวณใหม่จากอัลกอริทึม
- ข้อฝึก 49 ข้อ: ปรนัย เติมโค้ด และไล่ผล พร้อมคำอธิบายทุกข้อ
- ตัวจำลอง 7 รูปแบบ พร้อมค้นหา บันทึกความคืบหน้า จับเวลาฝึก และรูปแบบพิมพ์
- ภาคเสริมจากหนังสือ: BST/AVL, Hash table, Iterator, Sorting พร้อมระบุว่าไม่มีสไลด์แยกมายืนยันขอบเขตสอบ

## เปิดใช้งาน

เปิด `index.html` ได้โดยตรง หรือรัน static server เช่น `python -m http.server 4173` แล้วเปิด `http://localhost:4173` ไม่ต้องติดตั้ง npm packages และไม่มี API key หรือบริการภายนอก

GitHub Pages ใช้ branch `main` ที่ root `/` เป็นแหล่งเผยแพร่ เว็บไซต์ใช้ relative asset URLs และ hash routing จึงรองรับ project path `/OOD_Final/` และเปิดลิงก์ย่อยโดยตรงได้

## ข้อมูลและความคืบหน้า

ความคืบหน้าและคำตอบเก็บด้วย localStorage ของเบราว์เซอร์ ไม่ส่งข้อมูลผู้เรียนไป server เวลาอ่านเป็นค่าประมาณเพื่อจัดตารางทบทวน ไม่ใช่ข้อมูลจากอาจารย์ ข้อฝึกเป็นการเรียบเรียงใหม่ ไม่ใช่ข้อสอบจริง

เอกสาร PDF ต้นฉบับเก็บไว้ใน workspace และถูก exclude จาก Git repository เว็บไซต์ระบุชื่อและหน้าไว้ในแต่ละบทและหน้าแหล่งอ้างอิง ข้อมูลในใบงานที่ขัดกัน เช่น resize 2/3 เท่า, private header และคำอธิบาย Theta ได้แยกอธิบายก่อนนำไปใช้

## โครงสร้างไฟล์

- `content.js`, `content-advanced.js`: สรุปและแหล่งอ้างอิง
- `exercises.js`: ข้อฝึกพร้อมเฉลยและคำอธิบายงานเดิม
- `algorithms.js`: โมเดล heap, tree traversal, circular queue ที่ใช้ร่วมกับตัวจำลอง
- `app.js`, `styles.css`, `index.html`: การแสดงผล การนำทาง และ responsive layout
- `examples/StudyExamples.java`: ตัวอย่าง Java 17 แบบรันได้ รวมการตรวจผลตัวอย่างสำคัญ
- `tests/models.test.cjs`: ตรวจ algorithm และชุดข้อมูลจริง โดยใช้ Node.js built-ins เท่านั้น

## ตรวจการทำงาน

```sh
node tests/models.test.cjs
javac -encoding UTF-8 -d <temporary-directory> examples/StudyExamples.java
java -cp <temporary-directory> StudyExamples
```

โค้ดสั้นในบทเรียนบางส่วนเป็น method fragment เพื่อทบทวนการเติมคำ ต้องประกอบกับ field, constructor และ interface ที่ตรงกันก่อนคอมไพล์ ไฟล์ Java แยกใช้ชื่อคลาส/API ภายในที่สอดคล้องกันเพื่อรันตรวจหลักการได้ทันที

ต้นฉบับการสอน: สไลด์ของ รศ.ดร.อรรถสิทธิ์ หล่าสกุล ซึ่งอ้างอิงงานของ รศ.ดร.สมชาย ประสิทธิ์จูตระกูล และหนังสือ *โครงสร้างข้อมูล ฉบับวาจาจาวา* เว็บไซต์เป็นบันทึกสรุปที่เรียบเรียงใหม่พร้อมตัวอย่าง ไม่ใช่เอกสารทางการของรายวิชา
