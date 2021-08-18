import Comparator from '../../utils/Comparator.js';
import Heap from './Heap.js';

describe('Heap', () => {
  it('creates an empty heap', () => {
    const heap = new Heap();

    expect(heap.size).toBe(0);
    expect(heap.peek()).toBeUndefined();
    expect(String(heap)).toBe('');
  });

  it('adds a new value', () => {
    const maxHeap = new Heap().add(10);
    const minHeap = new Heap('min').add(10).add(15).add(5);

    expect(maxHeap.size).toBe(1);
    expect(maxHeap.peek()).toBe(10);
    expect(String(maxHeap)).toBe('10');

    maxHeap.add(5);

    expect(maxHeap.size).toBe(2);
    expect(maxHeap.peek()).toBe(10);
    expect(String(maxHeap)).toBe('10,5');

    maxHeap.add(15);

    expect(maxHeap.peek()).toBe(15);
    expect(String(maxHeap)).toBe('15,5,10');

    maxHeap.add(12);

    expect(maxHeap.peek()).toBe(15);
    expect(String(maxHeap)).toBe('15,12,10,5');

    maxHeap.add(20);

    expect(maxHeap.peek()).toBe(20);
    expect(String(maxHeap)).toBe('20,15,10,5,12');

    maxHeap.add(5);

    expect(maxHeap.peek()).toBe(20);
    expect(String(maxHeap)).toBe('20,15,10,5,12,5');

    maxHeap.add(17);

    expect(maxHeap.size).toBe(7);
    expect(maxHeap.peek()).toBe(20);
    expect(String(maxHeap)).toBe('20,15,17,5,12,5,10');

    expect(minHeap.peek()).toBe(5);
    expect(String(minHeap)).toBe('5,15,10');

    minHeap.add(8);

    expect(minHeap.peek()).toBe(5);
    expect(String(minHeap)).toBe('5,8,10,15');

    minHeap.add(3);

    expect(minHeap.size).toBe(5);
    expect(minHeap.peek()).toBe(3);
    expect(String(minHeap)).toBe('3,5,10,15,8');
  });

  it('extracts the root value', () => {
    const maxHeap = new Heap();
    const minHeap = new Heap('min').add(5).add(10).add(15);

    expect(maxHeap.poll()).toBeUndefined();

    maxHeap.add(10);

    expect(maxHeap.poll()).toBe(10);
    expect(maxHeap.size).toBe(0);

    maxHeap.add(15).add(10).add(5);

    expect(maxHeap.poll()).toBe(15);
    expect(String(maxHeap)).toBe('10,5');

    maxHeap.add(9).add(3).add(2).add(1).add(4);

    expect(String(maxHeap)).toBe('10,5,9,3,2,1,4');
    expect(maxHeap.poll()).toBe(10);
    expect(String(maxHeap)).toBe('5,4,9,3,2,1');

    expect(maxHeap.poll()).toBe(5);
    expect(String(maxHeap)).toBe('4,3,9,1,2');

    expect(minHeap.poll()).toBe(5);
    expect(String(minHeap)).toBe('10,15');
  });

  it('deletes a value', () => {
    const maxHeap = new Heap()
      .add(3)
      .add(10)
      .add(5)
      .add(6)
      .add(7)
      .add(4)
      .add(6)
      .add(8)
      .add(2)
      .add(1);

    expect(String(maxHeap)).toBe('10,8,6,7,6,4,5,3,2,1');
    expect(String(maxHeap.delete(4))).toBe('10,8,6,7,6,1,5,3,2');
    expect(String(maxHeap.delete(3))).toBe('10,8,6,7,6,1,5,2');
    expect(String(maxHeap.delete(5))).toBe('10,8,6,7,6,1,2');
    expect(String(maxHeap.delete(10))).toBe('8,7,6,2,6,1');
    expect(String(maxHeap.delete(6))).toBe('8,7,1,2');
    expect(String(maxHeap.delete(2))).toBe('8,7,1');
    expect(String(maxHeap.delete(1))).toBe('8,7');
    expect(String(maxHeap.delete(7))).toBe('8');
    expect(String(maxHeap.delete(8))).toBe('');
  });

  it('works correcty with custom comparator', () => {
    const comparator = new Comparator((a, b) => {
      if (a[0] === b[0]) return 0;
      return a[0] > b[0] ? 1 : -1;
    });
    const maxHeap = new Heap(comparator);
    maxHeap.add([10]).add([5]).add([15]).add([12]).add([20]).add([5]);

    expect(String(maxHeap)).toBe('20,15,10,5,12,5');
    expect(maxHeap.peek()).toEqual([20]);
    expect(String(maxHeap.add([25]))).toBe('25,15,20,5,12,5,10');
    expect(maxHeap.poll()).toEqual([25]);
    expect(String(maxHeap.delete([5]))).toBe('15,12,20,10');
  });
});
