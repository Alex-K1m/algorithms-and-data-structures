import LinkedList from '../linked-list/LinkedList.js';

export default class HashTable {
  constructor() {
    this._buckets = Array.from({ length: 10 }, () => new LinkedList());
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
  set(key, value) {
    const bucket = this._buckets[this._hash(key)];
    const node = bucket.find((pair) => pair[0] === key);

    if (node) node.value[1] = value;
    else bucket.prepend([key, value]);

    return this;
  }

  /** @arg {string} key */
  get(key) {
    const bucket = this._buckets[this._hash(key)];
    const node = bucket.find((pair) => pair[0] === key);
    return node?.value[1];
  }

  /** @arg {string} key */
  has(key) {
    const bucket = this._buckets[this._hash(key)];
    const node = bucket.find((pair) => pair[0] === key);
    return !!node;
  }

  /** @arg {string} key */
  delete(key) {
    const bucket = this._buckets[this._hash(key)];
    bucket.delete((pair) => pair[0] === key);
    return this;
  }

  // TODO get key/value/entries

  [Symbol.toPrimitive]() {
    const items = this._buckets
      .flatMap((list) => [...list])
      .map(([key, value]) => `  ${key} => ${value}`)
      .join('\n');

    if (!items.includes('=>')) return ''; // check this._keys instead

    return `HashTable {\n${items}\n}`;
  }
}
