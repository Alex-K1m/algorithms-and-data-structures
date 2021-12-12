import LinkedList from '../linked-list/LinkedList';

export default class Queue<T> implements Iterable<T> {
  private list: LinkedList<T>;

  constructor() {
    this.list = new LinkedList();
  }

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  enqueue(value: T): this {
    this.list.append(value);
    return this;
  }

  dequeue(): T | undefined {
    const value = this.list.head?.value;
    this.list.deleteHead();
    return value;
  }

  peek(): T | undefined {
    return this.list.head?.value;
  }

  [Symbol.toPrimitive](): string {
    return this.list[Symbol.toPrimitive]();
  }

  *[Symbol.iterator](): Generator<T> {
    yield* this.list[Symbol.iterator]();
  }
}
