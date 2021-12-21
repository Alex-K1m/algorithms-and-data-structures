export default class DoublyLinkedListNode<T> {
  private _prev: DoublyLinkedListNode<T> | null;

  private _next: DoublyLinkedListNode<T> | null;

  constructor(
    public readonly value: T,
    next?: DoublyLinkedListNode<T>,
    prev?: DoublyLinkedListNode<T>,
  ) {
    this._next = next ?? null;
    this._prev = prev ?? null;
  }

  get next(): DoublyLinkedListNode<T> | undefined {
    return this._next ?? undefined;
  }

  get prev(): DoublyLinkedListNode<T> | undefined {
    return this._prev ?? undefined;
  }

  setNext(
    node: DoublyLinkedListNode<T> | null,
  ): DoublyLinkedListNode<T> | undefined {
    const ref = this.next;
    this._next = node;
    return ref;
  }

  setPrev(
    node: DoublyLinkedListNode<T> | null,
  ): DoublyLinkedListNode<T> | undefined {
    const ref = this.prev;
    this._prev = node;
    return ref;
  }

  [Symbol.toPrimitive](hint: 'string' | 'number' | 'default'): string | number {
    return (hint === 'string' ? String : Number)(this.value);
  }
}
