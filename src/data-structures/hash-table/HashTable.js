import LinkedList from '../linked-list/LinkedList.js';

export default class HashTable {
  /** @arg {[string, *][]} entries */
  constructor(entries = []) {
    this._buckets = Array.from({ length: 10 }, () => new LinkedList());
    this._keys = entries.map(([key]) => key);
  }

  /** @arg {string} key */
  _hash(key) {
    const sumOfCodes = [...key]
      .map((char) => char.charCodeAt(0))
      .reduce((sum, code) => sum + code);
    return sumOfCodes % this._buckets.length;
  }

  /**
   * @arg {string} key
   * @arg {*} value
   */
  set() {}

  /** @arg {string} key */
  get() {}

  /** @arg {string} key */
  has() {}

  /** @arg {string} key */
  delete() {}

  // getKeys, values, entries?

  [Symbol.toPrimitive]() {
    const items = this._buckets
      .flatMap((list) => [...list])
      .map(([key, value]) => `  ${key} => ${value}`)
      .join('\n');

    if (!items.includes('=>')) return ''; // check this._keys instead

    return `HashTable {\n${items}\n}`;
  }
}
