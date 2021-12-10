import LinkedListNode from './LinkedListNode';

function createList<T>(
  values: T[],
): [LinkedListNode<T>, LinkedListNode<T>] | [] {
  if (values.length < 1) return [];

  const lastNode = new LinkedListNode(values[values.length - 1]);
  const firstNode = values
    .slice(0, -1)
    .reduceRight((next, value) => new LinkedListNode(value, next), lastNode);

  return [firstNode, lastNode];
}

export default class LinkedList<T> implements Iterable<T> {
  private _head: LinkedListNode<T> | null;

  private _last: typeof this._head;

  constructor(list: T[] | LinkedListNode<T> = []) {
    if (list instanceof LinkedListNode) {
      this._head = list;
      this._last = (function iterate(node): LinkedListNode<T> {
        return node.next ? iterate(node.next) : node;
      })(list);
      return;
    }

    const [head, last] = createList(list);
    this._head = head ?? null;
    this._last = last ?? null;
  }

  get head(): LinkedListNode<T> | undefined {
    return this._head ?? undefined;
  }

  get last(): LinkedListNode<T> | undefined {
    return this._last ?? undefined;
  }

  clear(): [LinkedListNode<T> | undefined, LinkedListNode<T> | undefined] {
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
    this._head = newHead!;

    return this;
  }

  append(...values: T[]): this {
    if (values.length < 1) return this;

    const [firstNodeToAppend, newLast] = createList(values);

    if (this.isEmpty()) this._head = firstNodeToAppend!;
    else this._last!.setNext(firstNodeToAppend!);
    this._last = newLast!;

    return this;
  }

  private equals(arg: T | ((value: T) => boolean), value: T): boolean {
    return arg instanceof Function ? arg(value) : value === arg;
  }

  find(valueOrCb: T | ((value: T) => boolean)): LinkedListNode<T> | undefined {
    const iterate = (
      node?: LinkedListNode<T>,
    ): LinkedListNode<T> | undefined => {
      if (!node) return undefined;
      return this.equals(valueOrCb, node.value) ? node : iterate(node.next);
    };
    return iterate(this.head);
  }

  deleteHead(): this {
    if (this.isEmpty()) return this;

    if (this.head!.next) this._head = this.head!.next;
    else this.clear();

    return this;
  }

  deleteLast(): this {
    if (this.isEmpty()) return this;

    if (!this.head!.next) {
      this.clear();
      return this;
    }

    const iterate = (node: LinkedListNode<T>) => {
      if (node.next === this.last) {
        this._last = node;
        node.unlink();
        return;
      }
      iterate(node.next!);
    };
    iterate(this.head!);

    return this;
  }

  delete(valueOrCb: T | ((value: T | undefined) => boolean)): this {
    if (this.isEmpty()) return this;

    const equalsTo = (value: T): boolean => this.equals(valueOrCb, value);

    if (this.head === this.last) {
      if (equalsTo(this.head!.value)) {
        this.head?.unlink();
        this.clear();
      }
      return this;
    }

    if (equalsTo(this.head!.value)) {
      this.deleteHead();
      return this.delete(valueOrCb);
    }

    if (equalsTo(this.last!.value)) {
      this.deleteLast();
      return this.delete(valueOrCb);
    }

    const iterate = (prevNode: LinkedListNode<T>): void => {
      const currentNode = prevNode.next;
      if (currentNode === this.last) return;

      if (equalsTo(currentNode!.value)) {
        prevNode.setNext(currentNode!.next!);
        currentNode!.unlink();
        iterate(prevNode);
        return;
      }

      iterate(prevNode.next!);
    };

    iterate(this.head!);
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