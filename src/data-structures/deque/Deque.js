import DoublyLinkedList from '../doubly-linked-list/DoublyLinkedList.js';

export default class Deque {
  constructor() {
    this._container = new DoublyLinkedList();
  }

  isEmpty() {
    return this._container.isEmpty();
  }

  /** @arg {*} value */
  addFront(value) {
    this._container.prepend(value);
    return this;
  }

  /** @arg {*} value */
  addBack(value) {
    this._container.append(value);
    return this;
  }

  removeFront() {
    const front = this._container.head?.value;
    this._container.deleteHead();
    return front;
  }

  removeBack() {
    const back = this._container.last?.value;
    this._container.deleteLast();
    return back;
  }

  peekFront() {
    return this._container.head?.value;
  }

  peekBack() {
    return this._container.last?.value;
  }

  [Symbol.toPrimitive]() {
    return String(this._container);
  }

  *[Symbol.iterator]() {
    yield* this._container[Symbol.iterator]();
  }
}
