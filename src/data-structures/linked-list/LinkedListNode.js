export default class LinkedListNode {
  /**
   * @arg {*} value
   * @arg {LinkedListNode} next
   */
  constructor(value = null, next = null) {
    this._value = value;
    this._next = next;
  }

  getValue() {
    return this._value;
  }

  getNext() {
    return this._next === null ? undefined : this._next;
  }

  /** @arg {*} value */
  setValue(value) {
    return new LinkedListNode(value, this.getNext());
  }

  /** @arg {LinkedListNode} next */
  setNext(next) {
    return new LinkedListNode(this.getValue(), next);
  }

  /** @arg {'string' | 'number' | 'default'} hint */
  [Symbol.toPrimitive](hint) {
    return (hint === 'string' ? String : Number)(this._value);
  }
}
