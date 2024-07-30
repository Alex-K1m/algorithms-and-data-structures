import { LinkedList } from '~/data-structures/linked-list/LinkedList';

export class Stack<T> implements Iterable<T> {
  #list: LinkedList<T>;

  constructor(list: LinkedList<T> = new LinkedList()) {
    this.#list = list;
  }

  isEmpty(): boolean {
    return this.#list.isEmpty();
  }

  peek(): T | undefined {
    return this.#list.head?.value;
  }

  push(...values: T[]): this {
    this.#list.prepend(...values.reverse());
    return this;
  }

  pop(): T | undefined {
    const value = this.#list.head?.value;
    this.#list.deleteHead();
    return value;
  }

  [Symbol.toPrimitive](): string {
    return String(this.#list);
  }

  *[Symbol.iterator](): Generator<T> {
    yield* this.#list[Symbol.iterator]();
  }
}
