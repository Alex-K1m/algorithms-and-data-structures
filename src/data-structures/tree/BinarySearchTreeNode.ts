import Comparator, { CompareFn } from '../../utils/Comparator';

export default class BinarySearchTreeNode<T> implements Iterable<T> {
  private compare: Comparator<T>;

  parent: BinarySearchTreeNode<T> | null = null;

  left: BinarySearchTreeNode<T> | null = null;

  right: BinarySearchTreeNode<T> | null = null;

  constructor(public value: T, compareFn?: CompareFn<T>) {
    this.compare = new Comparator(compareFn);
  }

  private setChild(
    side: 'left' | 'right',
    node: BinarySearchTreeNode<T> | null,
  ): this {
    if (this[side]?.parent) this[side]!.parent = null;
    this[side] = node;
    if (node) this[side]!.parent = this;

    return this;
  }

  setLeft(node: BinarySearchTreeNode<T> | null): this {
    return this.setChild('left', node);
  }

  setRight(node: BinarySearchTreeNode<T> | null): this {
    return this.setChild('right', node);
  }

  insert(value: T): this {
    const side = this.compare.less(value, this.value) ? 'left' : 'right';

    if (this[side]) this[side]!.insert(value);
    else this.setChild(side, new BinarySearchTreeNode(value));

    return this;
  }

  contains(value: T): boolean {
    return !!this.find(value);
  }

  find(value: T): BinarySearchTreeNode<T> | undefined {
    if (this.compare.equal(value, this.value)) return this;

    const side = this.compare.less(value, this.value) ? 'left' : 'right';
    return this[side] ? this[side]!.find(value) : undefined;
  }

  findMin(): BinarySearchTreeNode<T> {
    if (!this.left) return this;
    return this.left.findMin();
  }

  findMax(): BinarySearchTreeNode<T> {
    if (!this.right) return this;
    return this.right.findMax();
  }

  getChildrenNumber(): number {
    return Number(!!this.left) + Number(!!this.right);
  }

  get side(): 'left' | 'right' | null {
    if (this.parent?.left === this) return 'left';
    if (this.parent?.right === this) return 'right';
    return null;
  }

  remove(value: T): this {
    /** Node to remove */
    const node = this.find(value);

    if (!node || this.getChildrenNumber() === 0) return this;

    switch (node.getChildrenNumber()) {
      case 0: {
        node.parent?.setChild(node.side!, null);
        break;
      }

      case 1: {
        const child = node[node.left ? 'left' : 'right']!;

        if (node.parent) {
          node.parent.setChild(node.side!, child);
        } else {
          node.value = child.value;
          node.setLeft(child.left).setRight(child.right);
        }

        break;
      }

      case 2: {
        /** Node with the next bigger value */
        const nextNode = node.right!.findMin();

        if (!this.compare.equal(nextNode.value, node.right!.value)) {
          this.remove(nextNode.value);
          node.value = nextNode.value;
          break;
        }

        // nextNode === node.right, this also means there's no node.right.left
        if (node.parent) {
          node.parent.setChild(node.side!, nextNode);
          nextNode.setLeft(node.left);
        } else {
          node.value = nextNode.value;
          node.setRight(nextNode.right);
        }

        break;
      }

      // no default
    }

    return this;
  }

  *[Symbol.iterator](): Generator<T> {
    if (this.left) yield* this.left[Symbol.iterator]();
    yield this.value;
    if (this.right) yield* this.right[Symbol.iterator]();
  }
}
