export default class Comparator {
  /** @arg {(a: *, b: *) => -1 | 0 | 1} compareFn */
  constructor(compareFn = Comparator.defaultCompareFn) {
    this._compare = compareFn;
  }

  /**
   * @arg {number | string | boolean} a
   * @arg {number | string | boolean} b
   */
  static defaultCompareFn(a, b) {
    if (a === b) return 0;
    return a > b ? 1 : -1;
  }

  equal(a, b) {
    return this._compare(a, b) === 0;
  }

  less(a, b) {
    return this._compare(a, b) === -1;
  }

  lessOrEqual(a, b) {
    return this._compare(a, b) < 1;
  }

  greater(a, b) {
    return this._compare(a, b) === 1;
  }

  greaterOrEqual(a, b) {
    return this._compare(a, b) > -1;
  }

  reverse() {
    const { _compare } = this;
    this._compare = (a, b) => _compare(b, a);
    return this;
  }
}
