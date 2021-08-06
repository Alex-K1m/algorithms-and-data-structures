import LinkedListNode from './LinkedListNode.js';

export default class LinkedList {
  /** @arg {Array} array */
  constructor(array = []) {
    if (array.length === 0) {
      /** @type {LinkedListNode} */
      this._head = null;
      /** @type {LinkedListNode} */
      this._last = null;
      return;
    }

    this._last = new LinkedListNode(array[array.length - 1]);
    this._head = array
      .slice(0, -1)
      .reduceRight(
        (next, value) => new LinkedListNode(value, next),
        this._last,
      );
  }

  getHead() {
    return this._head;
  }

  getLast() {
    return this._last;
  }

  isEmpty() {
    return this._head === null;
  }

  [Symbol.toPrimitive]() {
    /**
     * @arg {LinkedListNode} node
     * @arg {Array} acc
     * @return {Array}
     */
    const iterate = (node, acc = []) =>
      node ? iterate(node.getNext(), [...acc, node.getValue()]) : acc;
    return iterate(this.getHead()).join(',');
  }
}
