import Comparator from '../../utils/Comparator';
import type { CompareFn } from '../../utils/compareFns';
import BinarySearchTreeNode from './BinarySearchTreeNode';

export default class BinarySearchTree<T> implements Iterable<T> {
  private compare: Comparator<T>;

  private root: BinarySearchTreeNode<T> | null;

  constructor(compareFn: CompareFn<T>, node?: BinarySearchTreeNode<T>) {
    this.compare = new Comparator(compareFn);
    this.root = node ?? null;
  }

  static createNode<T>(value: T): BinarySearchTreeNode<T> {
    return new BinarySearchTreeNode(value);
  }

  insert(value: T): this {
    if (!this.root) {
      this.root = BinarySearchTree.createNode(value);
      return this;
    }

    const iter = (node: BinarySearchTreeNode<T>): void => {
      const side = this.compare.less(value, node.value) ? 'left' : 'right';
      const child = node[side];

      if (child) iter(child);
      else {
        const nodeToInsert = BinarySearchTree.createNode(value);
        nodeToInsert.setParent(node);
        node.setLink(side, nodeToInsert);
      }
    };

    iter(this.root);
    return this;
  }

  find(value: T): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return undefined;

    const iter = (
      node: BinarySearchTreeNode<T>,
    ): BinarySearchTreeNode<T> | undefined => {
      if (this.compare.equal(value, node.value)) return node;

      const child = this.compare.less(value, node.value)
        ? node.left
        : node.right;
      return child ? iter(child) : undefined;
    };

    return iter(this.root);
  }

  findMin(): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return undefined;

    const iter = (node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> =>
      !node.left ? node : iter(node.left);

    return iter(this.root);
  }

  findMax(): BinarySearchTreeNode<T> | undefined {
    if (!this.root) return undefined;

    const iter = (node: BinarySearchTreeNode<T>): BinarySearchTreeNode<T> =>
      !node.right ? node : iter(node.right);

    return iter(this.root);
  }

  contains(value: T): boolean {
    return !!this.find(value);
  }

  remove(value: T): this {
    /** Node to remove */
    const node = this.find(value);

    if (!node) return this;

    if (this.root!.getChildrenNumber() === 0) {
      this.root = null;
      return this;
    }

    switch (node.getChildrenNumber()) {
      case 0: {
        const { parent } = node as { parent: BinarySearchTreeNode<T> };

        parent.setLink(node, null);
        node.setParent(null);

        break;
      }

      case 1: {
        const child = (node.left ?? node.right) as BinarySearchTreeNode<T>;

        node.parent?.setLink(node, child);
        child.setParent(node.parent ?? null);
        if (!node.parent) this.root = child;
        node.setParent(null).setLeft(null).setRight(null);

        break;
      }

      case 2: {
        /** Node with the next bigger value */
        const nextNode = new BinarySearchTree(
          this.compare.fn,
          node.right,
        ).findMin() as BinarySearchTreeNode<T>;

        if (!this.compare.equal(nextNode.value, node.right!.value)) {
          this.remove(nextNode.value);
          node.setValue(nextNode.value);
          break;
        }

        // nextNode === node.right, this also means there's no node.right.left
        node.setValue(nextNode.value);
        node.setRight(nextNode.right ?? null);
        node.right?.setParent(node);
        nextNode.setParent(null).setRight(null);
        break;
      }
      // no default
    }

    return this;
  }

  *[Symbol.iterator](): Generator<T> {
    if (!this.root) return;

    function* iter(node: BinarySearchTreeNode<T>): Generator<T> {
      if (node.left) yield* iter(node.left);
      yield node.value;
      if (node.right) yield* iter(node.right);
    }

    yield* iter(this.root);
  }
}
