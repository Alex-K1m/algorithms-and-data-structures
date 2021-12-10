import LinkedList from '../linked-list/LinkedList';

export default class Stack<T> implements Iterable<T> {
  constructor(private list: LinkedList<T> = new LinkedList()) {}

  isEmpty(): boolean {
    return this.list.isEmpty();
  }

  peek(): T | undefined {
    return this.list.head?.value;
  }

  push(...values: T[]): this {
    this.list.prepend(...values.reverse());
    return this;
  }

  pop(): T | undefined {
    const value = this.list.head?.value;
    this.list.deleteHead();
    return value;
  }

  [Symbol.toPrimitive](): string {
    return String(this.list);
  }

  *[Symbol.iterator](): Generator<T> {
    yield* this.list[Symbol.iterator]();
  }
}
