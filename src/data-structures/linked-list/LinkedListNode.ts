export class LinkedListNode<T> {
  #next: LinkedListNode<T> | null;

  constructor(
    public readonly value: T,
    next?: LinkedListNode<T>,
  ) {
    this.#next = next ?? null;
  }

  get next(): LinkedListNode<T> | undefined {
    return this.#next ?? undefined;
  }

  setNext(node: LinkedListNode<T> | null): LinkedListNode<T> | undefined {
    const ref = this.next;
    this.#next = node;
    return ref;
  }

  [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | number {
    return (hint === 'string' ? String : Number)(this.value);
  }
}
