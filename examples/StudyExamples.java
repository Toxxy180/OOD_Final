import java.util.*;

/** Standalone Java 17 reference examples, rewritten for revision.
 * Run: javac -encoding UTF-8 StudyExamples.java && java StudyExamples
 * Course interfaces differ between worksheets; these classes use their own consistent API.
 */
public class StudyExamples {
    interface Bag { void add(Object e); boolean remove(Object e); int size(); boolean contains(Object e); }
    static class ArrayBag implements Bag {
        protected Object[] data;
        protected int size;
        ArrayBag(int capacity) { if(capacity<0) throw new IllegalArgumentException(); data=new Object[capacity]; }
        void ensure(int required) { if(required>data.length) data=Arrays.copyOf(data,Math.max(required,2*data.length)); }
        public int size() { return size; }
        int indexOf(Object e) { for(int i=0;i<size;i++)if(data[i].equals(e))return i;return -1; }
        public boolean contains(Object e) { return indexOf(e)>=0; }
        public void add(Object e) { if(e==null)throw new IllegalArgumentException();ensure(size+1);data[size++]=e; }
        public boolean remove(Object e) { int i=indexOf(e);if(i<0)return false;data[i]=data[--size];data[size]=null;return true; }
        Object[] values() { return Arrays.copyOf(data,size); }
        int frequency(Object e) { int count=0;for(int i=0;i<size;i++)if(data[i].equals(e))count++;return count; }
        Object[] copyRange(int first,int last) { return first<0||first>last||last>=size?null:Arrays.copyOfRange(data,first,last+1); }
        void clear() { Arrays.fill(data,0,size,null);size=0; }
    }
    static class ArraySequence extends ArrayBag {
        ArraySequence(int c) { super(c); }
        void check(int i) { if(i<0||i>=size)throw new IndexOutOfBoundsException(); }
        Object get(int i) { check(i);return data[i]; }
        void set(int i,Object e) { check(i);if(e==null)throw new IllegalArgumentException();data[i]=e; }
        void add(int i,Object e) {
            if(i<0||i>size)throw new IndexOutOfBoundsException();
            if(e==null)throw new IllegalArgumentException();ensure(size+1);
            for(int j=size;j>i;j--)data[j]=data[j-1];data[i]=e;size++;
        }
        Object removeAt(int i) { check(i);Object e=data[i];for(int j=i+1;j<size;j++)data[j-1]=data[j];data[--size]=null;return e; }
        @Override public boolean remove(Object e) { int i=indexOf(e);if(i<0)return false;removeAt(i);return true; }
    }
    static class LinkedBag implements Bag {
        protected static class Node { Object element;Node next;Node(Object e,Node n){element=e;next=n;} }
        protected final Node header=new Node(null,null);
        protected int size;
        public int size(){return size;}
        public void add(Object e){if(e==null)throw new IllegalArgumentException();header.next=new Node(e,header.next);size++;}
        public boolean contains(Object e){for(Node p=header.next;p!=null;p=p.next)if(p.element.equals(e))return true;return false;}
        public boolean remove(Object e){Node p=header;while(p.next!=null&&!p.next.element.equals(e))p=p.next;if(p.next==null)return false;p.next=p.next.next;size--;return true;}
        int frequency(Object e){int c=0;for(Node p=header.next;p!=null;p=p.next)if(p.element.equals(e))c++;return c;}
    }
    static class LinkedSet extends LinkedBag {
        @Override public void add(Object e){
            if(e==null)throw new IllegalArgumentException();
            // Worksheet variant: write the insertion here, without super.add(e).
            if(!contains(e)){header.next=new Node(e,header.next);size++;}
        }
    }
    static class ArrayStack {
        private final ArraySequence list=new ArraySequence(0);
        void push(Object e){list.add(e);}
        int size(){return list.size();}
        Object peek(){if(size()==0)throw new NoSuchElementException();return list.get(size()-1);}
        Object pop(){Object e=peek();list.removeAt(size()-1);return e;}
    }
    static class RingQueue {
        private Object[] data;
        private int front,size;
        RingQueue(int capacity){if(capacity<0)throw new IllegalArgumentException();data=new Object[capacity];}
        void enqueue(Object e){
            if(e==null)throw new IllegalArgumentException();
            if(size==data.length){Object[] a=new Object[Math.max(1,2*data.length)];for(int i=0;i<size;i++)a[i]=data[(front+i)%data.length];data=a;front=0;}
            data[(front+size)%data.length]=e;size++;
        }
        Object peek(){if(size==0)throw new NoSuchElementException();return data[front];}
        Object dequeue(){Object e=peek();data[front]=null;front=(front+1)%data.length;size--;return e;}
    }
    static class MaxHeap {
        private int[] a;
        private int size;
        MaxHeap(int[] input){a=Arrays.copyOf(input,Math.max(1,input.length));size=input.length;for(int k=size/2-1;k>=0;k--)down(k);}
        void swap(int i,int j){int t=a[i];a[i]=a[j];a[j]=t;}
        void down(int k){int c;while((c=2*k+1)<size){if(c+1<size&&a[c+1]>a[c])c++;if(a[k]>=a[c])break;swap(k,c);k=c;}}
        void enqueue(int value){if(size==a.length)a=Arrays.copyOf(a,2*a.length);int k=size++;a[k]=value;while(k>0){int p=(k-1)/2;if(a[p]>=a[k])break;swap(p,k);k=p;}}
        int peek(){if(size==0)throw new NoSuchElementException();return a[0];}
        int dequeue(){int x=peek();a[0]=a[--size];if(size>1)down(0);return x;}
        int[] values(){return Arrays.copyOf(a,size);}
    }
    static boolean parentheses(String text){
        String open="{([",close="})]";Deque<Character>s=new ArrayDeque<>();
        for(char c:text.toCharArray()){if(open.indexOf(c)>=0)s.push(c);else{int k=close.indexOf(c);if(k>=0&&(s.isEmpty()||s.pop()!=open.charAt(k)))return false;}}
        return s.isEmpty();
    }
    static void traverse(int[] tree,int i,String order,List<Integer> output){
        if(i>=tree.length)return;
        if(order.equals("pre"))output.add(tree[i]);traverse(tree,2*i+1,order,output);
        if(order.equals("in"))output.add(tree[i]);traverse(tree,2*i+2,order,output);
        if(order.equals("post"))output.add(tree[i]);
    }
    static class HuffNode {
        final int frequency,serial;final String symbol;final HuffNode left,right;
        HuffNode(int f,int s,String label,HuffNode l,HuffNode r){frequency=f;serial=s;symbol=label;left=l;right=r;}
    }
    static Map<String,String> huffman(String[] symbols,int[] frequencies){
        if(symbols.length!=frequencies.length)throw new IllegalArgumentException();
        PriorityQueue<HuffNode> q=new PriorityQueue<>(Comparator.comparingInt((HuffNode x)->x.frequency).thenComparingInt(x->x.serial));
        int serial=0;Set<String> seen=new HashSet<>();
        for(int i=0;i<symbols.length;i++){if(frequencies[i]<=0||symbols[i]==null||!seen.add(symbols[i]))throw new IllegalArgumentException();q.add(new HuffNode(frequencies[i],serial++,symbols[i],null,null));}
        while(q.size()>1){HuffNode l=q.remove(),r=q.remove();q.add(new HuffNode(Math.addExact(l.frequency,r.frequency),serial++,null,l,r));}
        Map<String,String> codes=new TreeMap<>();if(!q.isEmpty())codes(q.remove(),"",codes);return codes;
    }
    static void codes(HuffNode node,String path,Map<String,String> out){if(node.symbol!=null){out.put(node.symbol,path.isEmpty()?"0":path);return;}codes(node.left,path+"0",out);codes(node.right,path+"1",out);}
    static void require(boolean ok,String description){if(!ok)throw new AssertionError(description);}
    public static void main(String[] args){
        ArrayBag bag=new ArrayBag(0);for(String x:new String[]{"A","B","C","D"})bag.add(x);bag.remove("B");
        require(Arrays.equals(bag.values(),new Object[]{"A","D","C"}),"unordered removal");
        require(Arrays.equals(bag.copyRange(0,1),new Object[]{"A","D"}),"inclusive copy");require(bag.copyRange(0,3)==null,"copy bounds");
        ArraySequence list=new ArraySequence(1);list.add("A");list.add("B");list.add("C");list.add(1,"X");list.removeAt(2);
        require(Arrays.equals(list.values(),new Object[]{"A","X","C"}),"ordered insertion/removal");
        LinkedSet set=new LinkedSet();for(String x:new String[]{"A","B","C","A","A"})set.add(x);set.remove("A");require(set.size()==2&&!set.contains("A"),"set override");
        ArrayStack stack=new ArrayStack();stack.push("A");stack.push("B");require(stack.peek().equals("B")&&stack.size()==2&&stack.pop().equals("B"),"stack peek/pop");
        RingQueue queue=new RingQueue(4);for(String x:new String[]{"A","B","C"})queue.enqueue(x);require(queue.dequeue().equals("A"),"FIFO head");for(String x:new String[]{"D","E","F"})queue.enqueue(x);for(String x:new String[]{"B","C","D","E","F"})require(queue.dequeue().equals(x),"wrap and resize");
        RingQueue zero=new RingQueue(0);zero.enqueue(1);require(zero.dequeue().equals(1),"zero capacity");
        MaxHeap heap=new MaxHeap(new int[]{23,24,12,1,8,65,27,46,15,7,18});
        require(Arrays.equals(heap.values(),new int[]{65,46,27,24,18,12,23,1,15,7,8}),"worksheet heapify");heap.enqueue(99);int previous=Integer.MAX_VALUE;while(heap.size>0){int x=heap.dequeue();require(x<=previous,"heap order");previous=x;}
        require(parentheses("{({[[[]]]})}{}[]{{}}")&&!parentheses("([)]")&&!parentheses("(()"),"parentheses");
        int[] tree={50,12,3,6,18,24,34,21,9,17,66,33,52,22};List<Integer> post=new ArrayList<>();traverse(tree,0,"post",post);
        require(post.equals(Arrays.asList(21,9,6,17,66,18,12,33,52,24,22,34,3,50)),"worksheet traversal");
        Map<String,String> codes=huffman(new String[]{"A","B","C","D","E","F"},new int[]{5,9,12,13,16,45});
        require(codes.equals(Map.of("A","1100","B","1101","C","100","D","101","E","111","F","0")),"Huffman example");
        System.out.println("PASS: array, list, linked set, stack, circular queue, heap, parentheses, traversal, Huffman");
        System.out.println("Postorder: "+post);System.out.println("Huffman: "+codes);
    }
}
