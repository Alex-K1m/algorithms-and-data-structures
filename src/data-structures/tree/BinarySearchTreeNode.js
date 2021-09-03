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
   * @arg {'left' | 'right'} side
   * @arg {BinarySearchTreeNode} node
   */
  setChild(side, node) {
    if (this[side]) this[side].parent = null;
    this[side] = node;
    if (node) this[side].parent = this;

    return this;
  }

  /** @arg {BinarySearchTreeNode} node */
  setLeft(node) {
    return this.setChild('left', node);
  }

  /** @arg {BinarySearchTreeNode} node */
  setRight(node) {
    return this.setChild('right', node);
  }

  /** @arg {*} value */
  insert(value) {
    const side = this.compare.less(value, this.value) ? 'left' : 'right';

    if (this[side]) this[side].insert(value);
    else this.setChild(side, new BinarySearchTreeNode(value));

    return this;
  }

  /**
   * @arg {*} value
   * @return {boolean}
   */
  contains(value) {
    return !!this.find(value);
  }

  /**
   * @arg {*} value
   * @return {BinarySearchTreeNode | undefined}
   */
  find(value) {
    if (this.compare.equal(value, this.value)) return this;

    const side = this.compare.less(value, this.value) ? 'left' : 'right';
    return this[side] ? this[side].find(value) : undefined;
  }

  /** @return {BinarySearchTreeNode} */
  findMin() {
    if (!this.left) return this;
    return this.left.findMin();
  }

  /** @return {BinarySearchTreeNode} */
  findMax() {
    if (!this.right) return this;
    return this.right.findMax();
  }

  getChildrenNumber() {
    return Number(!!this.left) + Number(!!this.right);
  }

  get side() {
    if (this.parent?.left === this) return 'left';
    if (this.parent?.right === this) return 'right';
    return null;
  }

  *[Symbol.iterator]() {
    if (this.left) yield* this.left[Symbol.iterator]();
    yield this.value;
    if (this.right) yield* this.right[Symbol.iterator]();
  }
}
