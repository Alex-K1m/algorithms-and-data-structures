import BinarySearchTreeNode from './BinarySearchTreeNode';

test('BinarySearchTreeNode methods work correctly', () => {
  const node = new BinarySearchTreeNode(1);
  const relative = new BinarySearchTreeNode(0);

  expect(node.value).toBe(1);
  expect(node.parent).toBeUndefined();
  expect(node.left).toBeUndefined();
  expect(node.right).toBeUndefined();

  expect(node.setValue(2).value).toBe(2);

  expect(node.setParent(relative).parent).toBe(relative);
  expect(node.setParent(null).parent).toBeUndefined();
  expect(node.setLeft(relative).left).toBe(relative);
  expect(node.getChildrenNumber()).toBe(1);
  expect(node.setRight(relative).right).toBe(relative);
  expect(node.getChildrenNumber()).toBe(2);
  expect(node.setLeft(null).left).toBeUndefined();
  expect(node.setRight(null).right).toBeUndefined();
  expect(node.getChildrenNumber()).toBe(0);

  expect(node.setLink('left', relative).left).toBe(relative);
  expect(node.setLink(relative, null).left).toBeUndefined();
  expect(
    node.setLink(relative, new BinarySearchTreeNode(2)).parent,
  ).toBeUndefined();
  expect(node.left).toBeUndefined();
  expect(node.right).toBeUndefined();
});
