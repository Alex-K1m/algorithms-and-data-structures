import Comparator from '../../utils/Comparator';
import MaxHeap from './MaxHeap';

describe('Heap', () => {
  it('creates an empty heap', () => {
    const heap = new MaxHeap();

    expect(heap.size).toBe(0);
    expect(heap.peek()).toBeUndefined();
    expect(String(heap)).toBe('');
  });

  it('adds a new value', () => {
    const heap = new MaxHeap().add(10);

    expect(heap.size).toBe(1);
    expect(heap.peek()).toBe(10);
    expect(String(heap)).toBe('10');

    heap.add(5);

    expect(heap.size).toBe(2);
    expect(heap.peek()).toBe(10);
    expect(String(heap)).toBe('10,5');

    heap.add(15);

    expect(heap.peek()).toBe(15);
    expect(String(heap)).toBe('15,5,10');

    heap.add(12);

    expect(heap.peek()).toBe(15);
    expect(String(heap)).toBe('15,12,10,5');

    heap.add(20);

    expect(heap.peek()).toBe(20);
    expect(String(heap)).toBe('20,15,10,5,12');

    heap.add(5);

    expect(heap.peek()).toBe(20);
    expect(String(heap)).toBe('20,15,10,5,12,5');

    heap.add(17);

    expect(heap.size).toBe(7);
    expect(heap.peek()).toBe(20);
    expect(String(heap)).toBe('20,15,17,5,12,5,10');
  });

  it('extracts the root value', () => {
    const heap = new MaxHeap();

    expect(heap.poll()).toBeUndefined();

    heap.add(10);

    expect(heap.poll()).toBe(10);
    expect(heap.size).toBe(0);

    heap.add(15).add(10).add(5);

    expect(heap.poll()).toBe(15);
    expect(String(heap)).toBe('10,5');

    heap.add(9).add(3).add(2).add(1).add(4);

    expect(String(heap)).toBe('10,5,9,3,2,1,4');
    expect(heap.poll()).toBe(10);
    expect(String(heap)).toBe('5,4,9,3,2,1');

    expect(heap.poll()).toBe(5);
    expect(String(heap)).toBe('4,3,9,1,2');
  });

  it('deletes a value', () => {
    const heap = new MaxHeap()
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

    expect(String(heap)).toBe('10,8,6,7,6,4,5,3,2,1');
    expect(String(heap.delete(4))).toBe('10,8,6,7,6,1,5,3,2');
    expect(String(heap.delete(3))).toBe('10,8,6,7,6,1,5,2');
    expect(String(heap.delete(5))).toBe('10,8,6,7,6,1,2');
    expect(String(heap.delete(10))).toBe('8,7,6,2,6,1');
    expect(String(heap.delete(6))).toBe('8,7,1,2');
    expect(String(heap.delete(2))).toBe('8,7,1');
    expect(String(heap.delete(1))).toBe('8,7');
    expect(String(heap.delete(7))).toBe('8');
    expect(String(heap.delete(8))).toBe('');
  });

  it('works correcty with custom comparator', () => {
    type Tuple = [number];
    const comparator = new Comparator<Tuple>(([a], [b]) =>
      Comparator.defaultCompare(a, b),
    );
    const heap = new MaxHeap(comparator);
    heap.add([10]).add([5]).add([15]).add([12]).add([20]).add([5]);

    expect(String(heap)).toBe('20,15,10,5,12,5');
    expect(heap.peek()).toEqual([20]);
    expect(String(heap.add([25]))).toBe('25,15,20,5,12,5,10');
    expect(heap.poll()).toEqual([25]);
    expect(String(heap.delete([5]))).toBe('15,12,20,10');
  });
});
