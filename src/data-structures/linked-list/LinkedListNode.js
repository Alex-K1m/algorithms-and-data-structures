export default class LinkedListNode {
  /**
   * @arg {*} value
   * @arg {LinkedListNode} next
   */
  constructor(value = null, next = null) {
    this.value = value;
    this.next = next;
  }

  /** @arg {'string' | 'number' | 'default'} hint */
  [Symbol.toPrimitive](hint) {
    return (hint === 'string' ? String : Number)(this.value);
  }
}
