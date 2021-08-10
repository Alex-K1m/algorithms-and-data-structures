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
    this.head = node;
    if (this.last === null) this.last = node;
    return this;
  }

  /** @arg {*} value */
  append(value) {
    const node = new DoublyLinkedListNode(value, null, this.last);
    if (this.last === null) this.head = node;
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
    if (this.head === null) return this;

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
    if (this.last === null) return this;

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
    const iterate = (
      node = this.head,
      prevNode = new DoublyLinkedListNode(),
    ) => {
      if (node === null) return;

      if (node.value === value) {
        // eslint-disable-next-line no-param-reassign
        prevNode.next = node.next;
        // eslint-disable-next-line no-param-reassign
        if (node.next !== null) node.next.prev = prevNode;

        if (node === this.head) {
          this.head = this.head.next;
          if (this.head !== null) this.head.prev = null;
        }

        if (this.head === null) this.last = null;

        if (node === this.last) {
          this.last = prevNode;
          this.last.next = null;
        }
      }
      iterate(node.next, node);
    };
    iterate();

    return this;
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
