import Comparator from '../../utils/Comparator.js';
import Heap from '../heap/Heap.js';

export default class PriorityQueue {
  constructor() {
    const comparator = new Comparator((a, b) => {
      const aPriority = this._priorities.get(a);
      const bPriority = this._priorities.get(b);
      if (aPriority === bPriority) return 0;
      return aPriority < bPriority ? 1 : -1;
    });

    this._container = new Heap(comparator);
    this._priorities = new Map();
  }

  isEmpty() {
    return this._container.size === 0;
  }

  peek() {
    return this._container.peek();
  }

  /** @arg {*} value */
  enqueue(value, priority = 0) {
    if (this._priorities.has(value)) {
      this.changePriority(value, priority);
    } else {
      this._priorities.set(value, priority);
      this._container.add(value);
    }
    return this;
  }

  dequeue() {
    const value = this._container.poll();
    this._priorities.delete(value);
    return value;
  }

  /**
   * @arg {*} value
   * @arg {number} priority
   */
  changePriority(value, priority) {
    const currentPriority = this._priorities.get(value);
    if (currentPriority === priority) return this;

    this._container.delete(value);
    this._priorities.set(value, priority);
    this._container.add(value);

    return this;
  }
}
