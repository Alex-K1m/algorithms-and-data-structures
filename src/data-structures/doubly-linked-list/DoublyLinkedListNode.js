export default class DoublyLinkedListNode {
  /**
   * @arg {*} value
   * @arg {DoublyLinkedListNode} next
   * @arg {DoublyLinkedListNode} prev
   */
  constructor(value = null, next = null, prev = null) {
    this.value = value;
    this.next = next;
    this.prev = prev;
  }

  /** @arg {'string' | 'number' | 'default'} hint */
  [Symbol.toPrimitive](hint) {
    return (hint === 'string' ? String : Number)(this.value);
  }
}
