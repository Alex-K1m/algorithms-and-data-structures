import MinHeap from './MinHeap';

describe('Heap', () => {
  it('adds a new value', () => {
    const heap = new MinHeap().add(10).add(15).add(5);

    expect(heap.peek()).toBe(5);
    expect(String(heap)).toBe('5,15,10');

    heap.add(8);

    expect(heap.peek()).toBe(5);
    expect(String(heap)).toBe('5,8,10,15');

    heap.add(3);

    expect(heap.size).toBe(5);
    expect(heap.peek()).toBe(3);
    expect(String(heap)).toBe('3,5,10,15,8');
  });

  it('extracts the root value', () => {
    const heap = new MinHeap().add(5).add(10).add(15);

    expect(heap.poll()).toBe(5);
    expect(String(heap)).toBe('10,15');
  });
});
