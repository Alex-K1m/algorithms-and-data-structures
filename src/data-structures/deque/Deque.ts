import DoublyLinkedList from '../doubly-linked-list/DoublyLinkedList';

export default class Deque<T> implements Iterable<T> {
  private container: DoublyLinkedList<T>;

  constructor() {
    this.container = new DoublyLinkedList();
  }

  isEmpty(): boolean {
    return this.container.isEmpty();
  }

  addFront(...values: T[]): this {
    this.container.prepend(...values);
    return this;
  }

  addBack(...values: T[]): this {
    this.container.append(...values);
    return this;
  }

  removeFront(): T | undefined {
    const front = this.container.head?.value;
    this.container.deleteHead();
    return front;
  }

  removeBack(): T | undefined {
    const back = this.container.last?.value;
    this.container.deleteLast();
    return back;
  }

  peekFront(): T | undefined {
    return this.container.head?.value;
  }

  peekBack(): T | undefined {
    return this.container.last?.value;
  }

  [Symbol.toPrimitive](): string {
    return String(this.container);
  }

  *[Symbol.iterator](): Generator<T> {
    yield* this.container[Symbol.iterator]();
  }
}
