import DoublyLinkedListNode from './DoublyLinkedListNode.js';

export default class DoublyLinkedList {
  /** @arg {Array | DoublyLinkedListNode} [list] */
  constructor(list) {
    if (list instanceof DoublyLinkedListNode) {
      this.head = list;
      this.last = (function iterate(node = list) {
        return node.next === null ? node : iterate(node.next);
      })();
      return;
    }

    if (Array.isArray(list) && list.length > 0) {
      this.last = new DoublyLinkedListNode(list[list.length - 1]);
      this.head = list.slice(0, -1).reduceRight((next, value) => {
        const node = new DoublyLinkedListNode(value, next);
        // eslint-disable-next-line no-param-reassign
        next.prev = node;
        return node;
      }, this.last);
      return;
    }

    /** @type {DoublyLinkedListNode} */
    this.head = null;
    /** @type {DoublyLinkedListNode} */
    this.last = null;
  }

  isEmpty() {
    return this.head === null;
  }

  /** @arg {*} value */
  prepend(value) {
    const node = new DoublyLinkedListNode(value, this.head);
    if (this.isEmpty()) this.last = node;
    this.head = node;
    return this;
  }

  /** @arg {*} value */
  append(value) {
    const node = new DoublyLinkedListNode(value, null, this.last);
    if (this.isEmpty()) this.head = node;
    else this.last.next = node;
    this.last = node;
    return this;
  }

  /** @arg {*} value */
  find(value) {
    const iterate = (node = this.head) =>
      node && node.value === value ? node : iterate(node.next);
    return iterate();
  }

  deleteHead() {
    if (this.isEmpty()) return this;

    if (this.head.next === null) {
      this.head = null;
      this.last = null;
    } else {
      this.head = this.head.next;
      this.head.prev = null;
    }

    return this;
  }

  deleteLast() {
    if (this.isEmpty()) return this;

    if (this.head.next === null) {
      this.head = null;
      this.last = null;
    } else {
      this.last = this.last.prev;
      this.last.next = null;
    }

    return this;
  }

  /** @arg {*} value */
  delete(value) {
    const variant = (() => {
      if (this.isEmpty()) return 'empty';
      if (this.head === this.last)
        return this.head.value === value ? 'single' : 'noMatch';
      if (this.head.value === value) return 'head';
      if (this.last.value === value) return 'last';
      return 'between';
    })();

    const iterate = (node = this.head.next) => {
      if (node === this.last) return;
      if (node.value === value) {
        // eslint-disable-next-line no-param-reassign
        node.prev.next = node.next;
        // eslint-disable-next-line no-param-reassign
        node.next.prev = node.prev;
      }
      iterate(node.next);
    };

    switch (variant) {
      case 'single':
        this.head = null;
        this.last = null;
        return this;
      case 'head':
        this.head = this.head.next;
        this.head.prev = null;
        return this.delete(value);
      case 'last':
        this.last = this.last.prev;
        this.last.next = null;
        return this.delete(value);
      case 'between':
        iterate();
        return this;
      default:
        return this;
    }
  }

  [Symbol.toPrimitive]() {
    /**
     * @arg {DoublyLinkedListNode} node
     * @arg {Array} acc
     * @return {Array}
     */
    const iterate = (node, acc = []) =>
      node ? iterate(node.next, [...acc, node.value]) : acc;
    return iterate(this.head).join(',');
  }

  *[Symbol.iterator]() {
    const self = this;
    function* iterate(node = self.head) {
      if (!node) return;
      yield node.value;
      yield* iterate(node.next);
    }
    yield* iterate();
  }
}
