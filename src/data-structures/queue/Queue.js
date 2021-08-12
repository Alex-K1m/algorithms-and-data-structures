import LinkedList from '../linked-list/LinkedList.js';

export default class Queue {
  constructor() {
    // front remove
    // rear add
    this._list = new LinkedList();
  }

  isEmpty() {
    return this._list.isEmpty();
  }

  /** @arg {*} value */
  enqueue(value) {
    this._list.append(value);
    return this;
  }

  dequeue() {
    const value = this._list.isEmpty() ? undefined : this._list.head.value;
    this._list.deleteHead();
    return value;
  }

  peek() {
    return this._list.isEmpty() ? undefined : this._list.head.value;
  }

  [Symbol.toPrimitive]() {
    return this._list[Symbol.toPrimitive]();
  }

  *[Symbol.iterator]() {
    yield* this._list[Symbol.iterator]();
  }
}
