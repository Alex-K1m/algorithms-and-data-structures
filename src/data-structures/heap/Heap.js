export default class Heap {
  /** @arg {{ type?: 'max' | 'min' }} options */
  constructor({ type = 'max' } = {}) {
    // TODO type
    this._compare = (val1, val2) =>
      type === 'min' ? val1 < val2 : val1 > val2;
    /** @type {number[]} */
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

  _heapifyUp(startIndex = this._container.length - 1) {
    const iterate = (index) => {
      if (index === -1) return;

      const value = this._container[index];
      const parentIndex = this._getParentIndex(index);
      const parentValue = this._container[parentIndex];

      if (this._compare(value, parentValue)) {
        this._swap(index, parentIndex);
      }

      iterate(parentIndex);
    };

    iterate(startIndex);
  }

  _heapifyDown(startIndex = 0) {
    const iterate = (index) => {
      if (index === -1) return;

      const value = this._container[index];
      const childIndex = this._getChildIndex(index);
      const childValue = this._container[childIndex];

      if (this._compare(childValue, value)) {
        this._swap(index, childIndex);
      }

      iterate(childIndex);
    };

    iterate(startIndex);
  }

  peek() {
    return this._container[0];
  }

  /** @arg {number} value */
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
   * @arg {number} value
   * @return {this}
   */
  delete(value) {
    const index = this._container.findIndex((val) => val === value);
    if (index === -1) return this;

    this._swap(index, this.size - 1);
    this._container.pop();

    const newValue = this._container[index];
    const parentIndex = this._getParentIndex(index);
    const parentValue = this._container[parentIndex];

    if (parentIndex === -1 || this._compare(parentValue, newValue))
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
