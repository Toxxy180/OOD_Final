const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const ctx=vm.createContext({window:{}});
for(const f of ['content.js','tree-practice.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),ctx);
const T=ctx.window.Study.treePractice;
const labels=(i,m)=>Array.from(T.walk(T.sets[i].root,m),n=>n.label);
assert.equal(T.sets.length,12);
assert.deepEqual(labels(0,'pre'),'a b c d e f g h i'.split(' '));
assert.deepEqual(labels(0,'in'),'c b f e d a g h i'.split(' '));
assert.deepEqual(labels(0,'post'),'c f e d b i h g a'.split(' '));
assert.deepEqual(labels(0,'level'),'a b g c d h e i f'.split(' '));
assert.deepEqual(labels(1,'in'),['42','7','90','18','63']);
assert.deepEqual(labels(1,'post'),['63','18','90','7','42']);
assert.deepEqual(labels(3,'in'),'K Z Q D B'.split(' '));
assert.deepEqual(labels(3,'post'),'Q D Z B K'.split(' '));
for(let i=0;i<T.sets.length;i++){
 const ids=new Set(),visit=n=>{if(!n)return;assert(!ids.has(n));ids.add(n);visit(n.left);visit(n.right);};visit(T.sets[i].root);
 for(const mode of ['pre','in','post','level']){const seq=T.walk(T.sets[i].root,mode);assert.equal(seq.length,ids.size);assert.equal(new Set(seq).size,ids.size);assert(seq.every(n=>ids.has(n)));}
 assert.equal(new Set(labels(i,'pre')).size,ids.size);
 const svg=T.diagram(T.sets[i].root);assert(!svg.includes('NaN'));assert(!svg.includes('undefined'));
}
assert(labels(8,'pre').includes('0'));assert(labels(8,'in').includes('-28'));
assert(T.matches('c,b,f,e,d,a,g,h,i',labels(0,'in')));
assert(T.matches('C → B → F → E → D → A → G → H → I',labels(0,'in')));
assert(!T.matches('c b f e d a g h',labels(0,'in')));
assert(!T.matches('a b c d e f g h i',labels(0,'in')));
console.log('PASS: 12 valid irregular trees; independent reference/chain/zigzag answers; all 48 traversals visit each node once; zero and negatives; answer parsing; SVG coordinates.');
