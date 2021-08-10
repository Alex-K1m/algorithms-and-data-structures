import DoublyLinkedListNode from './DoublyLinkedListNode.js';

describe('DoublyLinkedListNode', () => {
  it('creates a node', () => {
    const next = new DoublyLinkedListNode();
    const prev = new DoublyLinkedListNode();
    const node = new DoublyLinkedListNode(42, next, prev);

    expect(node.value).toBe(42);
    expect(node.next).toBe(next);
    expect(node.prev).toBe(prev);
  });

  it('sets default parameters', () => {
    const node = new DoublyLinkedListNode();

    expect(node.value).toBeNull();
    expect(node.next).toBeNull();
    expect(node.prev).toBeNull();
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
