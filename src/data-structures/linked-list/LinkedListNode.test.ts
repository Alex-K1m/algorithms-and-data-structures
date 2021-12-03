import LinkedListNode from './LinkedListNode';

describe('LinkedListNode', () => {
  it('creates 2 linked nodes', () => {
    const next = new LinkedListNode(1);
    const node = new LinkedListNode(0, next);

    expect(node.value).toBe(0);
    expect(node.next).toBe(next);
    expect(node.hasNext()).toBe(true);
    expect(node.next?.value).toBe(1);
    expect(node.next?.next).toBeNull();
    expect(node.next?.hasNext()).toBe(false);
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
