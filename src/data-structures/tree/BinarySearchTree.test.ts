import { compareNumbers, compareTuples } from '../../utils/compareFns';
import BinarySearchTree from './BinarySearchTree';
import BinarySearchTreeNode from './BinarySearchTreeNode';

const createTree = (...values: number[]) => {
  const tree = new BinarySearchTree(compareNumbers);
  values.forEach((value) => tree.insert(value));
  return tree;
};

describe('BinarySearchTree', () => {
  it('creates an emtpy tree', () => {
    const root = createTree()['root'];

    expect(root?.value).toBeUndefined();
    expect(root?.parent).toBeUndefined();
    expect(root?.left).toBeUndefined();
    expect(root?.right).toBeUndefined();
  });

  it('inserts a value in a tree', () => {
    const tree = createTree(2, 1, 4);
    const root = tree['root'];

    expect(root?.value).toBe(2);
    expect(root?.left?.value).toBe(1);
    expect(root?.right?.value).toBe(4);
    expect(root?.left?.parent).toBe(root);
    expect(root?.right?.parent).toBe(root);

    // 2
    // 1   4
    // 0 - 3 5
    tree.insert(0).insert(5).insert(3);

    expect(root?.left?.left?.value).toBe(0);
    expect(root?.left?.left?.parent).toBe(root?.left);

    expect(root?.right?.left?.value).toBe(3);
    expect(root?.right?.left?.parent).toBe(root?.right);

    expect(root?.right?.right?.value).toBe(5);
    expect(root?.right?.right?.parent).toBe(root?.right);
  });

  it('checks for a value in a tree', () => {
    const tree = createTree(2, 1, 4, 0, 3);

    expect(tree.contains(2)).toBe(true);
    expect(tree.contains(1)).toBe(true);
    expect(tree.contains(4)).toBe(true);
    expect(tree.contains(0)).toBe(true);
    expect(tree.contains(3)).toBe(true);

    expect(tree.contains(5)).toBe(false);
    expect(tree.contains(-1)).toBe(false);
  });

  it('is iterable', () => {
    expect([...createTree(2, 1, 4, 0, 3)]).toEqual([0, 1, 2, 3, 4]);
    expect([...createTree()]).toEqual([]);
  });

  it('uses a custom compare function', () => {
    const root = new BinarySearchTree(compareTuples)
      .insert([2])
      .insert([1])
      .insert([4])
      .insert([0])
      .insert([3])['root'];

    expect(root?.value).toEqual([2]);
    expect(root?.left?.value).toEqual([1]);
    expect(root?.right?.value).toEqual([4]);
    expect(root?.left?.left?.value).toEqual([0]);
    expect(root?.right?.left?.value).toEqual([3]);
  });

  it('finds a node by value', () => {
    const tree = createTree(2, 1, 4, 0, 3);
    const nodeFor2 = tree.find(2);

    expect(nodeFor2).toBeInstanceOf(BinarySearchTreeNode);
    expect(nodeFor2?.value).toBe(2);
    expect(nodeFor2?.parent).toBeUndefined();
    expect(nodeFor2?.left?.value).toBe(1);
    expect(nodeFor2?.right?.value).toBe(4);

    const nodeFor4 = tree.find(4);

    expect(nodeFor4).toBeInstanceOf(BinarySearchTreeNode);
    expect(nodeFor4?.value).toBe(4);
    expect(nodeFor4?.parent).toBe(tree['root']);
    expect(nodeFor4?.left?.value).toBe(3);
    expect(nodeFor4?.right).toBeUndefined();

    const nodeFor0 = tree.find(0);

    expect(nodeFor0).toBeInstanceOf(BinarySearchTreeNode);
    expect(nodeFor0?.value).toBe(0);
    expect(nodeFor0?.parent).toBe(tree['root']?.left);
    expect(nodeFor0?.left).toBeUndefined();
    expect(nodeFor0?.right).toBeUndefined();

    const actualFor5 = tree.find(5);

    expect(actualFor5).toBeUndefined();

    expect(createTree().find(1)).toBeUndefined();
  });

  it('finds minimum and maximum', () => {
    const tree = createTree(2, 1, 4, 0, 3);
    const singleNode = createTree(1);
    const empty = createTree();

    expect(tree.findMin()).toBeInstanceOf(BinarySearchTreeNode);
    expect(tree.findMin()?.value).toBe(0);

    expect(tree.findMax()).toBeInstanceOf(BinarySearchTreeNode);
    expect(tree.findMax()?.value).toBe(4);

    expect(singleNode.findMin()?.value).toBe(1);
    expect(singleNode.findMin()).toBe(singleNode.findMax());

    expect(empty.findMin()).toBeUndefined();
    expect(empty.findMax()).toBeUndefined();
  });

  it('removes a node by value', () => {
    const tree = createTree(3, 1, 5, 0, 2, 4, 6);
    // the root node could change during a remove op, so use tree['root']

    tree.remove(3);

    expect(tree['root']?.value).toBe(4);
    expect(tree['root']?.left?.value).toBe(1);
    expect(tree['root']?.right?.value).toBe(5);
    expect(tree['root']?.parent).toBeUndefined();
    expect(tree['root']?.right?.left).toBeUndefined();
    // 4
    // 1   5
    // 0 2   6

    tree.remove(1);

    expect(tree['root']?.left?.value).toBe(2);
    expect(tree['root']?.left?.left?.value).toBe(0);
    expect(tree['root']?.left?.right).toBeUndefined();
    expect(tree['root']?.left?.parent).toBe(tree['root']);
    // 4
    // 2   5
    // 0     6

    tree.remove(4);

    expect(tree['root']?.value).toBe(5);
    expect(tree['root']?.left?.value).toBe(2);
    expect(tree['root']?.right?.value).toBe(6);
    expect(tree['root']?.parent).toBeUndefined();
    expect(tree['root']?.right?.parent).toBe(tree['root']);
    // 5
    // 2   6
    // 0

    tree.remove(2);

    expect(tree['root']?.left?.value).toBe(0);
    expect(tree['root']?.left?.left).toBeUndefined();
    expect(tree['root']?.left?.right).toBeUndefined();
    expect(tree['root']?.left?.parent).toBe(tree['root']);
    // 5
    // 0   6

    tree.remove(6);

    expect(tree['root']?.right).toBeUndefined();
    // 5
    // 0

    tree.remove(5);

    expect(tree['root']?.value).toBe(0);
    expect(tree['root']?.left).toBeUndefined();
    expect(tree['root']?.right).toBeUndefined();
    expect(tree['root']?.parent).toBeUndefined();
    // 0

    tree.insert(1).remove(0);

    expect(tree['root']?.value).toBe(1);

    tree.remove(-1);

    expect(tree['root']?.value).toBe(1);
    expect(tree['root']?.left).toBeUndefined();
    expect(tree['root']?.right).toBeUndefined();
    expect(tree['root']?.parent).toBeUndefined();

    tree.remove(1);

    expect(tree['root']?.value).toBeUndefined();
  });
});
