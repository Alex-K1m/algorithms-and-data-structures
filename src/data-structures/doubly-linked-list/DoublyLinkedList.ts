import DoublyLinkedListNode from './DoublyLinkedListNode';

function createList<T>(
  values: T[],
): [DoublyLinkedListNode<T>, DoublyLinkedListNode<T>] | [] {
  if (values.length < 1) return [];

  const lastNode = new DoublyLinkedListNode(values[values.length - 1]);
  const firstNode = values.slice(0, -1).reduceRight((next, value) => {
    const node = new DoublyLinkedListNode(value, next);
    next.setPrev(node);
    return node;
  }, lastNode);

  return [firstNode, lastNode];
}

export default class DoublyLinkedList<T> implements Iterable<T> {
  static createNode<T>(
    value: T,
    next?: DoublyLinkedListNode<T>,
    prev?: DoublyLinkedListNode<T>,
  ): DoublyLinkedListNode<T> {
    return new DoublyLinkedListNode(value, next, prev);
  }

  private _head: DoublyLinkedListNode<T> | null;

  private _last: typeof this._head;

  constructor(list: T[] | DoublyLinkedListNode<T> = []) {
    if (list instanceof DoublyLinkedListNode) {
      this._head = list;
      this._last = (function iterate(node): DoublyLinkedListNode<T> {
        return node.next ? iterate(node.next) : node;
      })(list);
      return;
    }

    const [head, last] = createList(list);
    this._head = head ?? null;
    this._last = last ?? null;
  }

  get head(): DoublyLinkedListNode<T> | undefined {
    return this._head ?? undefined;
  }

  get last(): DoublyLinkedListNode<T> | undefined {
    return this._last ?? undefined;
  }

  clear(): [
    DoublyLinkedListNode<T> | undefined,
    DoublyLinkedListNode<T> | undefined,
  ] {
    const head = this._head;
    const last = this._last;
    this._head = null;
    this._last = null;
    return [head ?? undefined, last ?? undefined];
  }

  isEmpty(): boolean {
    return this.head === undefined && this.last === undefined;
  }

  prepend(...values: T[]): this {
    if (values.length < 1) return this;

    const [newHead, lastNodeToPrepend] = createList(values);

    if (this.isEmpty()) this._last = lastNodeToPrepend!;
    lastNodeToPrepend?.setNext(this.head!);
    this.head?.setPrev(lastNodeToPrepend!);
    this._head = newHead!;

    return this;
  }

  append(...values: T[]): this {
    if (values.length < 1) return this;

    const [firstNodeToAppend, newLast] = createList(values);

    if (this.isEmpty()) this._head = firstNodeToAppend!;
    else {
      this._last!.setNext(firstNodeToAppend!);
      firstNodeToAppend?.setPrev(this.last!);
    }
    this._last = newLast!;

    return this;
  }

  private equals(arg: T | ((value: T) => boolean), value: T): boolean {
    return arg instanceof Function ? arg(value) : value === arg;
  }

  find(
    valueOrCb: T | ((value: T) => boolean),
  ): DoublyLinkedListNode<T> | undefined {
    const iterate = (
      node?: DoublyLinkedListNode<T>,
    ): DoublyLinkedListNode<T> | undefined => {
      if (!node) return undefined;
      return this.equals(valueOrCb, node.value) ? node : iterate(node?.next);
    };
    return iterate(this.head);
  }

  deleteHead(): DoublyLinkedListNode<T> | undefined {
    if (!this.head?.next) {
      return this.clear()[0];
    }

    const { head } = this;
    this._head = head.unlink()[1]!;
    this.head.setPrev(null);
    return head;
  }

  deleteLast(): DoublyLinkedListNode<T> | undefined {
    if (!this.last?.prev) {
      return this.clear()[1];
    }

    const { last } = this;
    this._last = last.unlink()[0]!;
    this.last.setNext(null);
    return last;
  }

  delete(value: T): DoublyLinkedList<T> {
    const variant = (() => {
      if (this.isEmpty()) return 'empty';
      if (this.head === this.last)
        return this.head?.value === value ? 'single' : 'noMatch';
      if (this.head?.value === value) return 'head';
      if (this.last?.value === value) return 'last';
      return 'between';
    })();

    const iterate = (node = this.head!.next!): void => {
      if (node === this.last) return;
      if (node?.value === value) {
        node?.prev?.setNext(node.next!);
        node?.next!.setPrev(node.prev!);
      }
      iterate(node?.next);
    };

    switch (variant) {
      case 'single':
        this.clear();
        return this;
      case 'head':
        // this.head = this.head.next;
        // this.head.prev = null;
        this.deleteHead();
        return this.delete(value);
      case 'last':
        // this.last = this.last.prev;
        // this.last.next = null;
        this.deleteLast();
        return this.delete(value);
      case 'between':
        iterate();
        return this;
      default:
        return this;
    }
  }

  [Symbol.toPrimitive](): string {
    const iterate = (node?: DoublyLinkedListNode<T>, acc: T[] = []): T[] =>
      node ? iterate(node.next, [...acc, node.value]) : acc;
    return iterate(this.head).join(',');
  }

  *[Symbol.iterator](): Generator<T> {
    function* iterate(node: DoublyLinkedListNode<T> | undefined): Generator<T> {
      if (!node) return;
      yield node.value;
      yield* iterate(node.next);
    }
    yield* iterate(this.head);
  }
}