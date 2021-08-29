import BinarySearchTreeNode from './BinarySearchTreeNode.js';

describe('BinarySearchTreeNode', () => {
  it('creates an emtpy node', () => {
    const node = new BinarySearchTreeNode(1);

    expect(node.value).toBe(1);
    expect(node.parent).toBeNull();
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
  });

  it('inserts a value in a tree', () => {
    const node = new BinarySearchTreeNode(2).insert(1).insert(4);

    expect(node.value).toBe(2);
    expect(node.left).toBeInstanceOf(BinarySearchTreeNode);
    expect(node.right).toBeInstanceOf(BinarySearchTreeNode);
    expect(node.left.value).toBe(1);
    expect(node.right.value).toBe(4);
    expect(node.left.parent).toBe(node);
    expect(node.right.parent).toBe(node);

    // 2
    // 1   4
    // 0 - 3 5
    node.insert(0).insert(5).insert(3);

    expect(node.left.left.value).toBe(0);
    expect(node.left.left.parent).toBe(node.left);

    expect(node.right.left.value).toBe(3);
    expect(node.right.left.parent).toBe(node.right);

    expect(node.right.right.value).toBe(5);
    expect(node.right.right.parent).toBe(node.right);
  });

  it('checks for a value in a tree', () => {
    const node = new BinarySearchTreeNode(2)
      .insert(1)
      .insert(4)
      .insert(0)
      .insert(3);

    expect(node.contains(2)).toBe(true);
    expect(node.contains(1)).toBe(true);
    expect(node.contains(4)).toBe(true);
    expect(node.contains(0)).toBe(true);
    expect(node.contains(3)).toBe(true);

    expect(node.contains(5)).toBe(false);
    expect(node.contains(-1)).toBe(false);
  });

  it('is iterable', () => {
    const node = new BinarySearchTreeNode(2)
      .insert(1)
      .insert(4)
      .insert(0)
      .insert(3);

    expect([...node]).toEqual([0, 1, 2, 3, 4]);
  });
});
