export default class BinarySearchTreeNode {
  /** @arg {number} value */
  constructor(value) {
    this.value = value;

    /** @type {BinarySearchTreeNode} */
    this.parent = null;
    /** @type {BinarySearchTreeNode} */
    this.left = null;
    /** @type {BinarySearchTreeNode} */
    this.right = null;
  }

  /**
   * @arg {'left' | 'right'} child
   * @arg {BinarySearchTreeNode} node
   */
  setChild(child, node) {
    if (this[child]) this[child].parent = null;
    this[child] = node;
    if (this[child]) this[child].parent = this;

    return this;
  }

  /** @arg {number} value */
  insert(value) {
    const child = value < this.value ? 'left' : 'right';

    if (this[child]) this[child].insert(value);
    else this.setChild(child, new BinarySearchTreeNode(value));

    return this;
  }

  /** @arg {number} value */
  contains(value) {
    if (value === this.value) return true;

    const child = value < this.value ? 'left' : 'right';
    return this[child] ? this[child].contains(value) : false;
  }

  *[Symbol.iterator]() {
    if (this.left) yield* this.left[Symbol.iterator]();
    yield this.value;
    if (this.right) yield* this.right[Symbol.iterator]();
  }
}
