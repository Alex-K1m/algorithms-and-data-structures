export default class LinkedListNode<T> {
  constructor(public value: T, public next: LinkedListNode<T> | null = null) {}

  hasNext(): boolean {
    return this.next !== null;
  }

  [Symbol.toPrimitive](hint: Hint): string | number {
    return (hint === 'string' ? String : Number)(this.value);
  }
}
