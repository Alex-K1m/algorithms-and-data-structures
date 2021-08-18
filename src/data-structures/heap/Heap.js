import Comparator from '../../utils/Comparator.js';

export default class Heap {
  /** @arg {'max' | 'min' | Comparator} compare */
  constructor(compare = 'max') {
    this._compare = (() => {
      if (compare === 'max') return new Comparator();
      if (compare === 'min') return new Comparator().reverse();
      return compare;
    })();

    this._container = [];
  }

  /** @arg {number} index */
  _getParentIndex(index) {
    return Math.floor((index - 1) / 2);
  }

  /** @arg {number} index */
  _getChildIndex(index) {
    const childIndex = index * 2 + 1;
    return childIndex < this.size ? childIndex : -1;
  }

  /**
   * @arg {number} index1
   * @arg {number} index2
   */
  _swap(index1, index2) {
    const arr = this._container;
    [arr[index2], arr[index1]] = [arr[index1], arr[index2]];
  }

  _heapifyUp(startIndex = this.size - 1) {
    const iterate = (index) => {
      const parentIndex = this._getParentIndex(index);
      if (parentIndex === -1) return;

      const value = this._container[index];
      const parentValue = this._container[parentIndex];

      if (this._compare.greater(value, parentValue)) {
        this._swap(index, parentIndex);
      }

      iterate(parentIndex);
    };

    iterate(startIndex);
  }

  _heapifyDown(startIndex = 0) {
    const iterate = (index) => {
      const childIndex = this._getChildIndex(index);
      if (childIndex === -1) return;

      const value = this._container[index];
      const childValue = this._container[childIndex];

      if (this._compare.greater(childValue, value)) {
        this._swap(index, childIndex);
      }

      iterate(childIndex);
    };

    iterate(startIndex);
  }

  peek() {
    return this._container[0];
  }

  /** @arg {*} value */
  add(value) {
    this._container.push(value);
    this._heapifyUp();
    return this;
  }

  poll() {
    if (this.size <= 1) return this._container.pop();

    const rootValue = this._container[0];
    this._container[0] = this._container.pop();
    this._heapifyDown();

    return rootValue;
  }

  /**
   * @arg {*} value
   * @return {this}
   */
  delete(value) {
    const index = this._container.findIndex((val) =>
      this._compare.equal(val, value),
    );
    if (index === -1) return this;

    this._swap(index, this.size - 1);
    this._container.pop();

    const newValue = this._container[index];
    const parentIndex = this._getParentIndex(index);
    const parentValue = this._container[parentIndex];

    if (parentIndex === -1 || this._compare.greater(parentValue, newValue))
      this._heapifyDown(index);
    else this._heapifyUp(index);

    return this.delete(value);
  }

  get size() {
    return this._container.length;
  }

  [Symbol.toPrimitive]() {
    return this._container.toString();
  }
}
