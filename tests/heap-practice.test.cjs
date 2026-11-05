const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({window:{}});
for(const file of ['content.js','algorithms.js','heap-practice.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',file),'utf8'),ctx,{filename:file});
const H=ctx.window.Study.heapPractice, A=ctx.window.Study.algorithms,plain=x=>JSON.parse(JSON.stringify(x));
const expected={
 'build-0':[55,36,52,14,8,25,21,11,5,7,1],
 'build-1':[65,46,27,24,18,12,23,1,15,7,8],
 'build-2':[84,46,57,35,21,25,12,11,3,17,8],
 left:[50,30,40,20,10,35,5],right:[60,30,50,20,25,10,40],
 deep:[90,85,80,70,65,60,75,30,40,50,1,20,10,55,45],
 'one-child':[90,80,50,70,60,10],ordered:[90,80,70,50,40,60,30],
 tie:[40,30,40,5,20,35,10],'equal-parent':[40,40,30,20,10],
 internal:[100,70,90,60,65,80,85,50,40,5,55],negative:[0,-5,-3,-20,-10,-7,-9],leaf:[42],
 'pop-right':[50,13,40,5,12,4],'pop-deep':[90,70,80,30,60,50,40,5,20,10],
 sort:[1,3,4,5,10],'min-right':[10,20,15,30,40,50,25],'min-tie':[-10,-5,-10,5,0,-3,2]
};
assert.equal(H.sets.length,24);assert.equal(new Set(H.sets.map(s=>s.id)).size,24);
for(const set of H.sets){
 const original=plain(set.values),r=H.run(set),better=(x,y)=>set.mode==='min'?x<y:x>y;
 assert.deepEqual(plain(set.values),original,'run must not mutate source');
 if(expected[set.id])assert.deepEqual(plain(r.a),expected[set.id],set.id);
 const sorted=x=>[...x].sort((a,b)=>a-b);
 assert.deepEqual(sorted([...plain(r.a),...(r.removed===undefined?[]:[r.removed])]),sorted(original),set.id+' preserves members');
 if(set.operation!=='sort')for(let i=1;i<r.a.length;i++)assert(!better(r.a[i],r.a[Math.floor((i-1)/2)]),set.id+' heap order');
 if(set.operation==='heapify'){
  assert.deepEqual(plain(r.a),plain(A.heapify(set.values).a));
  assert.deepEqual(Array.from(r.steps.filter(s=>s.kind==='start'),s=>s.k),Array.from({length:Math.floor(original.length/2)},(_,i)=>Math.floor(original.length/2)-1-i));
 }
 r.steps.forEach((s,i)=>{
  assert(s.n>=0&&s.n<=s.a.length);assert(s.active.every(j=>j>=0&&j<s.a.length));
  if(s.kind==='choose'){
   const left=2*s.k+1,right=left+1;
   assert(left<s.n);assert.equal(s.c,right<s.n&&better(s.a[right],s.a[left])?right:left);
  }
  if(s.kind==='swap'){
   assert(s.c<s.n&&s.k<s.n);const before=r.steps[i-1].a;
   assert(better(before[s.c],before[s.k]));assert.equal(s.a[s.k],before[s.c]);assert.equal(s.a[s.c],before[s.k]);
   for(let j=0;j<s.a.length;j++)if(j!==s.k&&j!==s.c)assert.equal(s.a[j],before[j]);
  }
  if(set.operation==='sort'){
   const suffix=s.a.slice(s.n);assert.deepEqual(plain(suffix),sorted(suffix),'sorted suffix');
   if(suffix.length&&s.n)assert(Math.max(...s.a.slice(0,s.n))<=suffix[0],'suffix excluded from heap');
  }
 });
}
for(const id of ['ordered','equal-parent','leaf'])assert(!H.run(H.sets.find(s=>s.id===id)).steps.some(s=>s.kind==='swap'));
assert.deepEqual(Array.from(H.run(H.sets.find(s=>s.id==='deep')).steps.filter(s=>s.kind==='swap'),s=>[s.k,s.c]),[[0,1],[1,4],[4,10]]);
// Explicit boundary test: a huge value in the sorted suffix must not enter the heap.
const bounded=[1,8,6,7,5,999],trace=[];A.fixDown(bounded,0,5,trace);
assert.deepEqual(bounded,[8,7,6,1,5,999]);assert(trace.every(s=>s.a[5]===999));
assert.deepEqual(plain(H.parseAnswer('[ 50, -3, 0 ]')),[50,-3,0]);
assert.deepEqual(plain(H.parseAnswer('50 → -3 → 0')),[50,-3,0]);
for(const invalid of ['', '[]','1.5,2','1e2,3','1,2,','NaN','Infinity','9007199254740992'])assert.equal(H.parseAnswer(invalid),null,invalid);
console.log('PASS: 24 fixDown cases; worksheet answers; max/min order; ties; single-child/leaf; exact swap paths; heapify order; dequeue; heapsort boundaries; trace snapshots; answer parsing.');
