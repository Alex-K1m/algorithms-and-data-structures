import { CompareFn } from '../../utils/Comparator';
import BinarySearchTreeNode from './BinarySearchTreeNode';

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
    expect(node.left?.value).toBe(1);
    expect(node.right?.value).toBe(4);
    expect(node.left?.parent).toBe(node);
    expect(node.right?.parent).toBe(node);

    // 2
    // 1   4
    // 0 - 3 5
    node.insert(0).insert(5).insert(3);

    expect(node.left?.left?.value).toBe(0);
    expect(node.left?.left?.parent).toBe(node.left);

    expect(node.right?.left?.value).toBe(3);
    expect(node.right?.left?.parent).toBe(node.right);

    expect(node.right?.right?.value).toBe(5);
    expect(node.right?.right?.parent).toBe(node.right);
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

  it('uses custom compare function', () => {
    type Node = { value: number };
    const compareFn: CompareFn<Node> = ({ value: a }, { value: b }) => {
      if (a === b) return 0;
      return a > b ? 1 : -1;
    };
    const node = new BinarySearchTreeNode({ value: 2 } as Node, compareFn)
      .insert({ value: 1 })
      .insert({ value: 4 })
      .insert({ value: 0 })
      .insert({ value: 3 });

    expect(node.value).toEqual({ value: 2 });
    expect(node.left?.value).toEqual({ value: 1 });
    expect(node.right?.value).toEqual({ value: 4 });
    expect(node.left?.left?.value).toEqual({ value: 0 });
    expect(node.right?.left?.value).toEqual({ value: 3 });
  });

  it('finds a node by value', () => {
    const node = new BinarySearchTreeNode(2)
      .insert(1)
      .insert(4)
      .insert(0)
      .insert(3);
    const nodeFor2 = node.find(2);

    expect(nodeFor2).toBeInstanceOf(BinarySearchTreeNode);
    expect(nodeFor2?.value).toBe(2);
    expect(nodeFor2?.parent).toBeNull();
    expect(nodeFor2?.left?.value).toBe(1);
    expect(nodeFor2?.right?.value).toBe(4);

    const nodeFor4 = node.find(4);

    expect(nodeFor4).toBeInstanceOf(BinarySearchTreeNode);
    expect(nodeFor4?.value).toBe(4);
    expect(nodeFor4?.parent).toBe(node);
    expect(nodeFor4?.left?.value).toBe(3);
    expect(nodeFor4?.right).toBeNull();

    const nodeFor0 = node.find(0);

    expect(nodeFor0).toBeInstanceOf(BinarySearchTreeNode);
    expect(nodeFor0?.value).toBe(0);
    expect(nodeFor0?.parent).toBe(node.left);
    expect(nodeFor0?.left).toBeNull();
    expect(nodeFor0?.right).toBeNull();

    const actualFor5 = node.find(5);

    expect(actualFor5).toBeUndefined();
  });

  it('finds minimum and maximum', () => {
    const node = new BinarySearchTreeNode(2)
      .insert(1)
      .insert(4)
      .insert(0)
      .insert(3);
    const singleNode = new BinarySearchTreeNode(1);

    expect(node.findMin()).toBeInstanceOf(BinarySearchTreeNode);
    expect(node.findMin().value).toBe(0);

    expect(node.findMax()).toBeInstanceOf(BinarySearchTreeNode);
    expect(node.findMax().value).toBe(4);

    expect(singleNode.findMin().value).toBe(1);
    expect(singleNode.findMin()).toBe(singleNode.findMax());
  });

  it('shows the number of children', () => {
    const node = new BinarySearchTreeNode(2).insert(1).insert(4).insert(0);

    expect(node.getChildrenNumber()).toBe(2);
    expect(node.left?.getChildrenNumber()).toBe(1);
    expect(node.right?.getChildrenNumber()).toBe(0);
  });

  it("shows if it's left or right node of its parent", () => {
    const node = new BinarySearchTreeNode(2).insert(1).insert(4);

    expect(node.side).toBeNull();
    expect(node.left?.side).toBe('left');
    expect(node.right?.side).toBe('right');
  });

  it('sets a child node', () => {
    const nodeA = new BinarySearchTreeNode(1);
    const nodeB = new BinarySearchTreeNode(3);
    const nodeC = new BinarySearchTreeNode(2);

    expect(nodeA.setRight(nodeB).right).toBe(nodeB);
    expect(nodeB.parent).toBe(nodeA);

    expect(nodeB.setLeft(nodeC).left).toBe(nodeC);
    expect(nodeC.parent).toBe(nodeB);

    expect(nodeA.setRight(null).right).toBeNull();
    expect(nodeB.parent).toBeNull();
  });

  it('removes a node by value', () => {
    const node = new BinarySearchTreeNode(3)
      .insert(1)
      .insert(5)
      .insert(0)
      .insert(2)
      .insert(4)
      .insert(6);

    expect(node.remove(3).value).toBe(4);
    expect(node.left?.value).toBe(1);
    expect(node.right?.value).toBe(5);
    expect(node.parent).toBeNull();
    expect(node.right?.left).toBeNull();
    // 4
    // 1   5
    // 0 2   6

    expect(node.remove(1).left?.value).toBe(2);
    expect(node.left?.left?.value).toBe(0);
    expect(node.left?.right).toBeNull();
    expect(node.left?.parent).toBe(node);
    // 4
    // 2   5
    // 0     6

    expect(node.remove(4).value).toBe(5);
    expect(node.left?.value).toBe(2);
    expect(node.right?.value).toBe(6);
    expect(node.parent).toBeNull();
    expect(node.right?.parent).toBe(node);
    // 5
    // 2   6
    // 0

    expect(node.remove(2).left?.value).toBe(0);
    expect(node.left?.left).toBeNull();
    expect(node.left?.right).toBeNull();
    expect(node.left?.parent).toBe(node);
    // 5
    // 0   6

    expect(node.remove(6).right).toBeNull();
    // 5
    // 0

    expect(node.remove(5).value).toBe(0);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
    expect(node.parent).toBeNull();
    // 0

    expect(node.insert(1).remove(0).value).toBe(1);

    expect(node.remove(-1).value).toBe(1);
    expect(node.left).toBeNull();
    expect(node.right).toBeNull();
    expect(node.parent).toBeNull();
  });
});
