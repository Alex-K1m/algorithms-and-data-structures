import LinkedListNode from './LinkedListNode.js';

describe('LinkedListNode', () => {
  it('creates a node', () => {
    const next = new LinkedListNode();
    const node = new LinkedListNode(42, next);

    expect(node.value).toBe(42);
    expect(node.next).toBe(next);
  });

  it('sets default parameters', () => {
    const node = new LinkedListNode();

    expect(node.value).toBeNull();
    expect(node.next).toBeNull();
  });

  it('converts to a primitive', () => {
    const intNode = new LinkedListNode(42);

    expect(String(intNode)).toBe('42');
    expect(Number(intNode)).toBe(42);

    const strNode = new LinkedListNode('str');

    expect(String(strNode)).toBe('str');
    expect(Number(strNode)).toBeNaN();
  });
});
