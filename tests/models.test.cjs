const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const root=path.resolve(__dirname,'..');
const context=vm.createContext({window:{}});
for(const file of ['content.js','content-advanced.js','exercises.js','algorithms.js','teacher.js','teacher-truefalse.js'])vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context,{filename:file});
const S=context.window.Study,A=S.algorithms;
const plain=x=>JSON.parse(JSON.stringify(x));
const expected=[
 [55,36,52,14,8,25,21,11,5,7,1],
 [65,46,27,24,18,12,23,1,15,7,8],
 [84,46,57,35,21,25,12,11,3,17,8]
];
S.heapSets.forEach((s,i)=>assert.deepEqual(plain(A.heapify(s.values).a),expected[i]));
assert.deepEqual(plain(A.traversal(S.treeExercise,'pre').map(i=>S.treeExercise[i])),[50,12,6,21,9,18,17,66,3,24,33,52,34,22]);
assert.deepEqual(plain(A.traversal(S.treeExercise,'in').map(i=>S.treeExercise[i])),[21,6,9,12,17,18,66,50,33,24,52,3,22,34]);
assert.deepEqual(plain(A.traversal(S.treeExercise,'post').map(i=>S.treeExercise[i])),[21,9,6,17,66,18,12,33,52,24,22,34,3,50]);
for(const values of [[],[1],[4,4,4],[-7,2,-4,0,9,2],Array.from({length:31},(_,i)=>i)]){
 let heap=A.heapify(values).a;
 for(const v of [-99,100,4])heap=A.heapPush(heap,v).a;
 const result=[];while(heap.length){const next=A.heapPop(heap);result.push(next.value);heap=next.a;}
 assert.deepEqual(result,[...values,-99,100,4].sort((a,b)=>b-a));
}
assert.throws(()=>A.heapPop([]),/ว่าง/);
for(const capacity of [0,1,4,7]){
 const q=new A.CircularQueue(capacity),reference=[];
 for(let i=0;i<500;i++){
  if(i%3===2&&reference.length)assert.equal(q.dequeue(),reference.shift());
  else {q.enqueue(String(i));reference.push(String(i));}
  assert.deepEqual(plain(q.values()),reference);
  assert.equal(q.size,reference.length);
 }
 while(reference.length)assert.equal(q.dequeue(),reference.shift());
 assert.throws(()=>q.dequeue(),/ว่าง/);
}
assert.equal(S.chapters.length,9);
assert.equal(S.questions.length,148);
assert.equal(new Set(S.questions.map(q=>q.id)).size,148);
for(const q of S.questions){
 assert(S.chapters.some(c=>c.id===q.chapter));assert(q.explanation&&q.source);
 if(q.type==='choice')assert(q.correct>=0&&q.correct<q.choices.length);
 else assert(q.accepted.length>0);
}
console.log('PASS: 3 worksheet heaps; 3 traversals; heap duplicates/negative/empty cases; 2,000 queue operations; 148 question records.');
console.log('Sections:',S.chapters.reduce((n,c)=>n+c.sections.length,0),'main,',S.supplement.length,'supplement,',S.practice.length,'practice');

assert.equal(S.teacherLessons.length,7);
const teacher=S.questions.filter(q=>q.bank==='teacher');
assert.equal(teacher.length,99);
for(const q of teacher){assert(q.lesson>=1&&q.lesson<=7);assert(q.source.includes(S.teacherFiles[q.lesson-1]));}
assert.deepEqual(teacher.find(q=>q.id==='teacher-46').accepted[0].split(' ').map(Number),expected[0]);

const tf=S.questions.filter(q=>q.format==='truefalse');
assert.equal(tf.length,51);
assert.deepEqual(plain(S.trueFalseGroups.map(g=>g.items.length)),[15,6,6,7,4,4,9]);
// Visible answer marks on the six direct true/false first pages.
const marked={2:[1,0,1,0,0,1],3:[1,1,0,0,0,1],4:[0,1,1,0,0,0,0],5:[0,0,1,0],6:[1,0,1,0],7:[1,0,1,1,0,1,0,1,1]};
for(const [lesson,expected] of Object.entries(marked)) assert.deepEqual(plain(tf.filter(q=>q.lesson===Number(lesson)).map(q=>q.correct)),expected);
for(const q of tf){assert.deepEqual(plain(q.choices),['ถูก','ผิด']);assert(q.source.includes('หน้า PDF 1'));}
for(const c of S.teacherLessons)assert.match(c.sections[0].title,/ถูก–ผิด/);
