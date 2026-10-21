/* Shared deterministic models power both the worked answers and the labs. */
(() => {
const S=window.Study;
function fixDown(a,k,n=a.length,trace) {
    while (2*k+1 < n) {
        let c=2*k+1;
        if (c+1<n && a[c+1]>a[c]) c++;
        if (a[k]>=a[c]) break;
        [a[k],a[c]]=[a[c],a[k]];
        if(trace) trace.push({a:[...a],message:`สลับ index ${k} กับลูกที่มากกว่า index ${c}`});
        k=c;
    }
}
function heapify(input) {
    const a=[...input],steps=[{a:[...a],message:'ข้อมูลเริ่มต้น ยังไม่ปรับ'}];
    for(let k=Math.floor(a.length/2)-1;k>=0;k--) {
        fixDown(a,k);
        steps.push({a:[...a],message:`หลัง fixDown(${k})`});
    }
    return {a,steps};
}
function heapPush(input,value) {
    const a=[...input,value],steps=[{a:[...a],message:`เพิ่ม ${value} ที่ท้าย index ${a.length-1}`}];
    let k=a.length-1;
    while(k>0) {
        const p=Math.floor((k-1)/2);
        if(a[p]>=a[k])break;
        [a[p],a[k]]=[a[k],a[p]];
        steps.push({a:[...a],message:`fixUp: สลับ index ${k} กับพ่อ ${p}`});k=p;
    }
    return {a,steps};
}
function heapPop(input) {
    if(!input.length)throw new Error('Heap ว่าง ไม่สามารถ dequeue ได้');
    const a=[...input],value=a[0],last=a.pop();
    if(a.length)a[0]=last;
    const steps=[{a:[...a],message:`นำ ${value} ออก แล้วย้ายตัวท้ายขึ้นราก`}];
    fixDown(a,0,a.length,steps);
    return {a,value,steps};
}
function traversal(a,kind) {
    const result=[];
    const walk=i=>{
        if(i>=a.length || a[i]===null)return;
        if(kind==='pre')result.push(i);
        walk(2*i+1);
        if(kind==='in')result.push(i);
        walk(2*i+2);
        if(kind==='post')result.push(i);
    };
    if(kind==='level')return a.map((_,i)=>i).filter(i=>a[i]!==null);
    walk(0);return result;
}
class CircularQueue {
    constructor(capacity=4){this.data=Array(capacity).fill(null);this.front=0;this.size=0;}
    enqueue(value){
        let resized=false;
        if(this.size===this.data.length){
            const a=Array(Math.max(1,2*this.data.length)).fill(null);
            this.values().forEach((x,i)=>a[i]=x);this.data=a;this.front=0;resized=true;
        }
        const index=(this.front+this.size)%this.data.length;
        this.data[index]=value;this.size++;
        return `${resized?'ขยายอาร์เรย์และ reset front=0; ':''}ใส่ ${value} ที่ index ${index}`;
    }
    dequeue(){if(!this.size)throw new Error('Queue ว่าง ไม่สามารถ dequeue ได้');const x=this.data[this.front];this.data[this.front]=null;this.front=(this.front+1)%this.data.length;this.size--;return x;}
    values(){return Array.from({length:this.size},(_,i)=>this.data[(this.front+i)%this.data.length]);}
}
S.algorithms={fixDown,heapify,heapPush,heapPop,traversal,CircularQueue};
S.heapSets=[
    {name:'Queue2_7 ข้อ 3',values:[55,14,52,11,1,25,21,36,5,7,8]},
    {name:'BinaryHeap_8 ข้อ 1 ก',values:[23,24,12,1,8,65,27,46,15,7,18]},
    {name:'BinaryHeap_8 ข้อ 1 ข',values:[3,21,12,11,84,25,57,46,35,17,8]}
];
S.treeExercise=[50,12,3,6,18,24,34,21,9,17,66,33,52,22];
})();
