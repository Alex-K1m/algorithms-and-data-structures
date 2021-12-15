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

  prepend(value: T): this {
    const node = new DoublyLinkedListNode(value, this.head);
    if (this.isEmpty()) this._last = node;
    else this.head?.setPrev(node);
    this._head = node;
    return this;
  }

  append(value: T): this {
    const node = new DoublyLinkedListNode(value, undefined, this.last);
    if (this.isEmpty()) this._head = node;
    else this.last?.setNext(node);
    this._last = node;
    return this;
  }

  find(value: T): DoublyLinkedListNode<T> | undefined {
    const iterate = (node = this.head): DoublyLinkedListNode<T> | undefined =>
      node && node.value === value ? node : iterate(node?.next);
    return iterate();
  }

  deleteHead(): this {
    if (this.isEmpty()) return this;

    if (this.head?.next) {
      this._head = this.head.next;
      this.head.setPrev(null);
    } else {
      this.clear();
    }

    return this;
  }

  deleteLast(): this {
    if (this.isEmpty()) return this;

    if (this.head?.next) {
      this._last = this.last!.prev!;
      this._last?.setNext(null);
    } else {
      this.clear();
    }

    return this;
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
