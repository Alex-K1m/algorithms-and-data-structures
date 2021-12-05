import LinkedListNode from './LinkedListNode';

export default class LinkedList<T> implements Iterable<T> {
  private _head: LinkedListNode<T> | null;

  private _last: typeof this._head;

  constructor(list?: T[] | LinkedListNode<T>) {
    if (list instanceof LinkedListNode) {
      this._head = list;
      this._last = (function iterate(node): LinkedListNode<T> {
        return node.next ? iterate(node.next) : node;
      })(list);
      return;
    }

    if (Array.isArray(list) && list.length > 0) {
      this._last = new LinkedListNode(list[list.length - 1]);
      this._head = list
        .slice(0, -1)
        .reduceRight(
          (next, value) => new LinkedListNode(value, next),
          this._last,
        );
      return;
    }

    this._head = null;
    this._last = null;
  }

  get head(): LinkedListNode<T> | undefined {
    return this._head ?? undefined;
  }

  get last(): LinkedListNode<T> | undefined {
    return this._last ?? undefined;
  }

  isEmpty(): boolean {
    return this.head === undefined && this.last === undefined;
  }

  prepend(value: T): this {
    const node = new LinkedListNode(value, this.head);

    if (this.isEmpty()) this._last = node;
    this._head = node;

    return this;
  }

  append(value: T): this {
    const node = new LinkedListNode(value);

    if (this.isEmpty()) this._head = node;
    else this._last!.setNext(node);
    this._last = node;

    return this;
  }

  find(value: T): LinkedListNode<T> | null;
  find(callback: (value: T) => boolean): LinkedListNode<T> | null;
  find(arg: T | ((value: T) => boolean)): LinkedListNode<T> | null {
    const iterate = (
      node: LinkedListNode<T> | undefined,
    ): LinkedListNode<T> | null => {
      if (!node) return null;

      const equals =
        arg instanceof Function ? arg(node.value) : node.value === arg;
      return equals ? node : iterate(node.next);
    };

    return iterate(this.head);
  }

  deleteHead(): this {
    if (this.isEmpty()) return this;

    if (this._head!.next) this._head = this._head!.next;
    else {
      this._head = null;
      this._last = null;
    }

    return this;
  }

  deleteLast(): this {
    if (this.isEmpty()) return this;

    if (!this._head!.next) {
      this._head = null;
      this._last = null;
      return this;
    }

    const iterate = (node: LinkedListNode<T> | undefined) => {
      if (node!.next === this._last) {
        this._last = node ?? null;
        this._last!.unlink();
        return;
      }
      iterate(node!.next);
    };
    iterate(this.head);

    return this;
  }

  delete(value: T): this;
  delete(callback: (value: T | undefined) => boolean): this;
  delete(arg: T | ((value: T | undefined) => boolean)): this {
    const iterate = (
      node: LinkedListNode<T> | undefined,
      prevNode = new LinkedListNode<unknown>(null) as LinkedListNode<T>,
    ) => {
      if (node === null) return;

      const equals =
        arg instanceof Function ? arg(node?.value) : node?.value === arg;

      if (equals) {
        if (node?.next) prevNode.setNext(node!.next);
        else prevNode.unlink();

        if (node === this._head) this._head = this._head.next ?? null;

        if (this.isEmpty()) this._last = null;

        if (node === this._last) {
          this._last = prevNode;
          this._last.unlink();
        }
      }
      iterate(node?.next, node);
    };
    iterate(this.head);

    return this;
  }

  [Symbol.toPrimitive](): string {
    const iterate = (node?: LinkedListNode<T>, acc: T[] = []): T[] =>
      node ? iterate(node.next, [...acc, node.value]) : acc;
    return iterate(this.head).join(',');
  }

  *[Symbol.iterator](): Generator<T> {
    function* iterate(node: LinkedListNode<T> | undefined): Generator<T> {
      if (!node) return;
      yield node.value;
      yield* iterate(node.next);
    }
    yield* iterate(this.head);
  }
}
