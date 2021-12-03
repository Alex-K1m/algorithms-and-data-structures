import LinkedListNode from './LinkedListNode';

export default class LinkedList<T> implements Iterable<T> {
  head: LinkedListNode<T> | null;

  last: typeof this.head;

  constructor(list?: T[] | LinkedListNode<T>) {
    if (list instanceof LinkedListNode) {
      this.head = list;
      this.last = (function iterate(node = list): LinkedListNode<T> {
        return node.next?.hasNext() ? iterate(node.next) : node;
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

    this.head = null;
    this.last = null;
  }

  isEmpty(): boolean {
    return this.head === null;
  }

  prepend(value: T): this {
    const node = new LinkedListNode(value, this.head);

    if (this.isEmpty()) this.last = node;
    this.head = node;

    return this;
  }

  append(value: T): this {
    const node = new LinkedListNode(value);

    if (this.isEmpty()) this.head = node;
    else this.last!.next = node;
    this.last = node;

    return this;
  }

  find(value: T): LinkedListNode<T> | null;
  find(callback: (value: T) => boolean): LinkedListNode<T> | null;
  find(arg: T | ((value: T) => boolean)): LinkedListNode<T> | null {
    const iterate = (node = this.head): LinkedListNode<T> | null => {
      if (!node) return null;

      const equals =
        arg instanceof Function ? arg(node.value) : node.value === arg;
      return equals ? node : iterate(node.next);
    };

    return iterate();
  }

  deleteHead(): this {
    if (this.isEmpty()) return this;

    if (this.head!.hasNext()) this.head = this.head!.next;
    else {
      this.head = null;
      this.last = null;
    }

    return this;
  }

  deleteLast(): this {
    if (this.isEmpty()) return this;

    if (!this.head!.hasNext()) {
      this.head = null;
      this.last = null;
      return this;
    }

    const iterate = (node = this.head) => {
      if (node!.next === this.last) {
        this.last = node;
        this.last!.next = null;
        return;
      }
      iterate(node!.next);
    };
    iterate();

    return this;
  }

  delete(value: T): this;
  delete(callback: (value: T) => boolean): this;
  delete(arg: T | ((value: T) => boolean)): this {
    const iterate = (
      node = this.head,
      prevNode = new LinkedListNode<unknown>(null) as LinkedListNode<T>,
    ) => {
      if (node === null) return;

      const equals =
        arg instanceof Function ? arg(node.value) : node.value === arg;

      if (equals) {
        // eslint-disable-next-line no-param-reassign
        prevNode.next = node.next;

        if (node === this.head) this.head = this.head.next;

        if (this.isEmpty()) this.last = null;

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

  [Symbol.toPrimitive](): string {
    const iterate = (node = this.head, acc: T[] = []): T[] =>
      node ? iterate(node.next, [...acc, node.value]) : acc;
    return iterate().join(',');
  }

  *[Symbol.iterator](): Generator<T> {
    function* iterate(node: LinkedListNode<T> | null): Generator<T> {
      if (node === null) return;
      yield node.value;
      yield* iterate(node.next);
    }
    yield* iterate(this.head);
  }
}
