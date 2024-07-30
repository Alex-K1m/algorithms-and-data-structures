import { LinkedListNode } from './LinkedListNode';

function createList<T>(
  values: T[],
): [first: LinkedListNode<T>, last: LinkedListNode<T>] | [] {
  if (values.length < 1) return [];

  const lastNode = new LinkedListNode(values[values.length - 1] as T);
  const firstNode = values
    .slice(0, -1)
    .reduceRight((next, value) => new LinkedListNode(value, next), lastNode);

  return [firstNode, lastNode];
}

export class LinkedList<T> implements Iterable<T> {
  static createNode<T>(value: T, next?: LinkedListNode<T>): LinkedListNode<T> {
    return new LinkedListNode(value, next);
  }

  #head: LinkedListNode<T> | null;

  #last: LinkedListNode<T> | null;

  constructor(list: T[] | LinkedListNode<T> = []) {
    if (list instanceof LinkedListNode) {
      this.#head = list;
      this.#last = (function iterate(node): LinkedListNode<T> {
        return node.next ? iterate(node.next) : node;
      })(list);
      return;
    }

    const [head, last] = createList(list);
    this.#head = head ?? null;
    this.#last = last ?? null;
  }

  get head(): LinkedListNode<T> | undefined {
    return this.#head ?? undefined;
  }

  get last(): LinkedListNode<T> | undefined {
    return this.#last ?? undefined;
  }

  clear(): [LinkedListNode<T> | undefined, LinkedListNode<T> | undefined] {
    const head = this.#head;
    const last = this.#last;
    this.#head = null;
    this.#last = null;
    return [head ?? undefined, last ?? undefined];
  }

  isEmpty(): this is { head: undefined; last: undefined } {
    return this.head === undefined || this.last === undefined;
  }

  prepend(...values: T[]): this {
    if (values.length < 1) return this;

    const [newHead, lastNodeToPrepend] = createList(values) as [
      LinkedListNode<T>,
      LinkedListNode<T>,
    ];

    if (this.isEmpty()) this.#last = lastNodeToPrepend;
    lastNodeToPrepend.setNext(this.head ?? null);
    this.#head = newHead;

    return this;
  }

  append(...values: T[]): this {
    if (values.length < 1) return this;

    const [firstNodeToAppend, newLast] = createList(values) as [
      LinkedListNode<T>,
      LinkedListNode<T>,
    ];

    if (!this.last) this.#head = firstNodeToAppend;
    else this.last.setNext(firstNodeToAppend);
    this.#last = newLast;

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

  deleteHead(): LinkedListNode<T> | undefined {
    if (!this.head?.next) return this.clear()[0];

    const { head } = this;
    this.#head = head.setNext(null) ?? null;
    return head;
  }

  deleteLast(): LinkedListNode<T> | undefined {
    if (!this.head?.next) return this.clear()[1];

    const iterate = (
      node: LinkedListNode<T>,
    ): LinkedListNode<T> | undefined => {
      if (node.next === this.last) {
        this.#last = node;
        return node.setNext(null);
      }
      return iterate(node.next!);
    };
    return iterate(this.head);
  }

  delete(valueOrCb: T | ((value: T | undefined) => boolean)): this {
    if (this.head === undefined || this.last === undefined) return this;

    const equalsTo = (value: T): boolean => this.equals(valueOrCb, value);

    if (this.head === this.last) {
      if (equalsTo(this.head.value)) {
        this.head.setNext(null);
        this.clear();
      }
      return this;
    }

    if (equalsTo(this.head.value)) {
      this.deleteHead();
      return this.delete(valueOrCb);
    }

    if (equalsTo(this.last.value)) {
      this.deleteLast();
      return this.delete(valueOrCb);
    }

    const iterate = (prevNode: LinkedListNode<T>): void => {
      const currentNode = prevNode.next as LinkedListNode<T>;
      if (currentNode === this.last) return;

      if (equalsTo(currentNode.value)) {
        prevNode.setNext(currentNode.next ?? null);
        currentNode.setNext(null);
        iterate(prevNode);
        return;
      }

      iterate(currentNode);
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
