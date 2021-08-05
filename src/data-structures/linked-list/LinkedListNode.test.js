import LinkedListNode from './LinkedListNode.js';

describe('LinkedListNode', () => {
  it('creates a node', () => {
    const next = new LinkedListNode();
    const node = new LinkedListNode(42, next);

    expect(node.getValue()).toBe(42);
    expect(node.getNext()).toBe(next);
  });

  it('sets default parameters', () => {
    const node = new LinkedListNode();

    expect(node.getValue()).toBeNull();
    expect(node.getNext()).toBeNull();
  });

  it('returns a new node on set value/next', () => {
    const next = new LinkedListNode();
    const node = new LinkedListNode('current', next);
    const nodeWithNewValue = node.setValue('new');

    expect(node.getValue()).toBe('current');
    expect(nodeWithNewValue.getValue()).toBe('new');

    const newNext = new LinkedListNode();
    const nodeWithNewNext = nodeWithNewValue.setNext(newNext);

    expect(nodeWithNewValue.getNext()).toBe(next);
    expect(nodeWithNewNext.getNext()).toBe(newNext);
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
