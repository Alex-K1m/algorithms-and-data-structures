import { LinkedList } from '~/data-structures/linked-list/LinkedList';

export class Queue<T> implements Iterable<T> {
  #list: LinkedList<T>;

  constructor() {
    this.#list = new LinkedList();
  }

  isEmpty(): boolean {
    return this.#list.isEmpty();
  }

  enqueue(...values: T[]): this {
    this.#list.append(...values);
    return this;
  }

  dequeue(): T | undefined {
    const value = this.#list.head?.value;
    this.#list.deleteHead();
    return value;
  }

  peek(): T | undefined {
    return this.#list.head?.value;
  }

  [Symbol.toPrimitive](): string {
    return this.#list[Symbol.toPrimitive]();
  }

  *[Symbol.iterator](): Generator<T> {
    yield* this.#list[Symbol.iterator]();
  }
}
