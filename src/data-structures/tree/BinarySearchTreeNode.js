export default class BinarySearchTreeNode {
  /** @arg {number} value */
  constructor(value) {
    this.value = value;

    /** @type {BinarySearchTreeNode} */
    this.left = null;
    /** @type {BinarySearchTreeNode} */
    this.right = null;
  }

  /** @arg {number} value */
  insert(value) {
    const node = value < this.value ? 'left' : 'right';

    if (this[node]) this[node].insert(value);
    else this[node] = new BinarySearchTreeNode(value);

    return this;
  }

  /** @arg {number} value */
  contains(value) {
    if (value === this.value) return true;

    const node = value < this.value ? 'left' : 'right';
    return this[node] ? this[node].contains(value) : false;
  }

  *[Symbol.iterator]() {
    if (this.left) yield* this.left[Symbol.iterator]();
    yield this.value;
    if (this.right) yield* this.right[Symbol.iterator]();
  }
}
