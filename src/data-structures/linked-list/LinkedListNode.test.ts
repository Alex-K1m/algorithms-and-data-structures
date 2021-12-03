import LinkedListNode from './LinkedListNode';

describe('LinkedListNode', () => {
  it('creates 2 linked nodes', () => {
    const next = new LinkedListNode(1);
    const node = new LinkedListNode(0, next);

    expect(node.value).toBe(0);
    expect(node.next).toBe(next);
    expect(node.next?.value).toBe(1);
    expect(node.next?.next).toBeUndefined();
  });

  it('changes the next link', () => {
    const node = new LinkedListNode(0);
    const next = new LinkedListNode(1);
    const newNext = new LinkedListNode(2);

    expect(node.next).toBeUndefined();

    expect(node.unlink()).toBeUndefined();
    expect(node.next).toBeUndefined();

    expect(node.setNext(next)).toBeUndefined();
    expect(node.next).toBe(next);

    expect(node.setNext(newNext)).toBe(next);
    expect(node.next).toBe(newNext);

    expect(node.unlink()).toBe(newNext);
    expect(node.next).toBeUndefined();
  });

  it('converts to a primitive', () => {
    const intNode = new LinkedListNode(0);

    expect(String(intNode)).toBe('0');
    expect(Number(intNode)).toBe(0);

    const strNode = new LinkedListNode('str');

    expect(String(strNode)).toBe('str');
    expect(Number(strNode)).toBeNaN();
  });
});
