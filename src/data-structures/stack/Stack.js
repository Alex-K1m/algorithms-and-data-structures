import LinkedList from '../linked-list/LinkedList.js';

export default class Stack {
  constructor() {
    this._list = new LinkedList();
  }

  isEmpty() {
    return this._list.isEmpty();
  }

  peek() {
    return this._list.isEmpty() ? undefined : this._list.head.value;
  }

  /** @arg {*} value */
  push(value) {
    this._list.prepend(value);
    return this;
  }

  pop() {
    const value = this._list.isEmpty() ? undefined : this._list.head.value;
    this._list.deleteHead();
    return value;
  }

  [Symbol.toPrimitive]() {
    return String(this._list);
  }

  *[Symbol.iterator]() {
    yield* this._list[Symbol.iterator]();
  }
}
