import LinkedListNode from './LinkedListNode.js';

export default class LinkedList {
  /** @arg {Array | LinkedListNode} [list] */
  constructor(list) {
    if (list instanceof LinkedListNode) {
      this.head = list;
      this.last = (function iterate(node = list) {
        return node.next === null ? node : iterate(node.next);
      })();
      return;
    }

    if (Array.isArray(list) && list.length > 0) {
      this.last = new LinkedListNode(list[list.length - 1]);
      this.head = list
        .slice(0, -1)
        .reduceRight(
          (next, value) => new LinkedListNode(value, next),
          this.last,
        );
      return;
    }

    /** @type {LinkedListNode} */
    this.head = null;
    /** @type {LinkedListNode} */
    this.last = null;
  }

  isEmpty() {
    return this.head === null;
  }

  /** @arg {*} value */
  prepend(value) {
    const node = new LinkedListNode(value, this.head);
    this.head = node;
    if (this.last === null) this.last = node;
    return this;
  }

  /** @arg {*} value */
  append(value) {
    const node = new LinkedListNode(value);
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
    } else this.head = this.head.next;

    return this;
  }

  deleteLast() {
    if (this.last === null) return this;

    if (this.head.next === null) {
      this.head = null;
      this.last = null;
      return this;
    }

    const iterate = (node = this.head) => {
      if (node.next === this.last) {
        this.last = node;
        this.last.next = null;
        return;
      }
      iterate(node.next);
    };
    iterate();

    return this;
  }

  /** @arg {*} value */
  delete(value) {
    const iterate = (node = this.head, prevNode = new LinkedListNode()) => {
      if (node === null) return;

      if (node.value === value) {
        // eslint-disable-next-line no-param-reassign
        prevNode.next = node.next;

        if (node === this.head) this.head = this.head.next;

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
     * @arg {LinkedListNode} node
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