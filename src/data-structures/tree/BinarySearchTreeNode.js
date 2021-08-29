import Comparator from '../../utils/Comparator.js';

export default class BinarySearchTreeNode {
  /**
   * @arg {*} value
   * @arg {(a: *, b: *) => -1 | 0 | 1} [compareFn]
   */
  constructor(value, compareFn) {
    this.value = value;
    this.compare = new Comparator(compareFn);

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

  /** @arg {*} value */
  insert(value) {
    const child = this.compare.less(value, this.value) ? 'left' : 'right';

    if (this[child]) this[child].insert(value);
    else this.setChild(child, new BinarySearchTreeNode(value));

    return this;
  }

  /** @arg {*} value */
  contains(value) {
    if (this.compare.equal(value, this.value)) return true;

    const child = this.compare.less(value, this.value) ? 'left' : 'right';
    return this[child] ? this[child].contains(value) : false;
  }

  *[Symbol.iterator]() {
    if (this.left) yield* this.left[Symbol.iterator]();
    yield this.value;
    if (this.right) yield* this.right[Symbol.iterator]();
  }
}
