import DoublyLinkedListNode from './DoublyLinkedListNode';

describe('DoublyLinkedListNode', () => {
  it('creates a node', () => {
    const next = new DoublyLinkedListNode(1);
    const prev = new DoublyLinkedListNode(0);
    const node = new DoublyLinkedListNode(42, next, prev);

    expect(node.value).toBe(42);
    expect(node.next).toBe(next);
    expect(node.prev).toBe(prev);
  });

  it('sets default parameters', () => {
    const node = new DoublyLinkedListNode(1);

    expect(node.value).toBeDefined();
    expect(node.next).toBeUndefined();
    expect(node.prev).toBeUndefined();
  });

  it('modifies the prev & next links', () => {
    const node = new DoublyLinkedListNode(1);
    const prev = new DoublyLinkedListNode(0);
    const next = new DoublyLinkedListNode(2);

    expect(node.setPrev(prev)).toBeUndefined();
    expect(node.prev).toBe(prev);

    expect(node.setNext(next)).toBeUndefined();
    expect(node.next).toBe(next);

    expect(node.setPrev(null)).toBe(prev);
    expect(node.setNext(null)).toBe(next);
    expect(node.prev).toBeUndefined();
    expect(node.next).toBeUndefined();
  });

  it('converts to a primitive', () => {
    const intNode = new DoublyLinkedListNode(42);

    expect(String(intNode)).toBe('42');
    expect(Number(intNode)).toBe(42);

    const strNode = new DoublyLinkedListNode('str');

    expect(String(strNode)).toBe('str');
    expect(Number(strNode)).toBeNaN();
  });
});
