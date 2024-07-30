export class DoublyLinkedListNode<T> {
  #prev: DoublyLinkedListNode<T> | null;

  #next: DoublyLinkedListNode<T> | null;

  constructor(
    public readonly value: T,
    next?: DoublyLinkedListNode<T>,
    prev?: DoublyLinkedListNode<T>,
  ) {
    this.#next = next ?? null;
    this.#prev = prev ?? null;
  }

  get next(): DoublyLinkedListNode<T> | undefined {
    return this.#next ?? undefined;
  }

  get prev(): DoublyLinkedListNode<T> | undefined {
    return this.#prev ?? undefined;
  }

  setNext(
    node: DoublyLinkedListNode<T> | null,
  ): DoublyLinkedListNode<T> | undefined {
    const ref = this.next;
    this.#next = node;
    return ref;
  }

  setPrev(
    node: DoublyLinkedListNode<T> | null,
  ): DoublyLinkedListNode<T> | undefined {
    const ref = this.prev;
    this.#prev = node;
    return ref;
  }

  [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | number {
    return (hint === 'string' ? String : Number)(this.value);
  }
}
