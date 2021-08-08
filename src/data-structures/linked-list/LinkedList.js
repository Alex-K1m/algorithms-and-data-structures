import LinkedListNode from './LinkedListNode.js';

export default class LinkedList {
  /** @arg {Array} array */
  constructor(array = []) {
    if (array.length === 0) {
      /** @type {LinkedListNode} */
      this.head = null;
      /** @type {LinkedListNode} */
      this.last = null;
      return;
    }

    this.last = new LinkedListNode(array[array.length - 1]);
    this.head = array
      .slice(0, -1)
      .reduceRight((next, value) => new LinkedListNode(value, next), this.last);
  }

  isEmpty() {
    return this.head === null;
  }

  [Symbol.toPrimitive]() {
    /**
     * @arg {LinkedListNode} node
     * @arg {Array} acc
     * @return {Array}
     */
    const iterate = (node, acc = []) =>
      node ? iterate(node.next, [...acc, node.value]) : acc;
    return iterate(this.head).join(',');
  }
}
