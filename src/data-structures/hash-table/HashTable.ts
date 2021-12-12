/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */

import LinkedList from '../linked-list/LinkedList';

export type Pair = [string, any];

export default class HashTable {
  private buckets: Array<LinkedList<Pair>>;

  constructor() {
    this.buckets = Array.from({ length: 10 }, () => new LinkedList());
  }

  _hash(key: string): number {
    const sumOfCodes = [...key]
      .map((char) => char.charCodeAt(0))
      .reduce((sum, code) => sum + code);
    return sumOfCodes % this.buckets.length;
  }

  set(key: string, value: any): this {
    const bucket = this.buckets[this._hash(key)];
    const node = bucket.find((pair) => pair[0] === key);

    if (node) node.value[1] = value;
    else bucket.prepend([key, value]);

    return this;
  }

  get(key: string): any {
    const bucket = this.buckets[this._hash(key)];
    const node = bucket.find((pair) => pair[0] === key);
    return node?.value[1];
  }

  has(key: string): boolean {
    return !!this.get(key);
  }

  delete(key: string): this {
    const bucket = this.buckets[this._hash(key)];
    bucket.delete((pair) => pair?.[0] === key);
    return this;
  }

  // TODO get key/value/entries

  [Symbol.toPrimitive](): string {
    const items = this.buckets
      .flatMap((list) => [...list])
      .map(([key, value]) => `  ${key} => ${value}`)
      .join('\n');

    if (!items.includes('=>')) return ''; // check this._keys instead

    return `HashTable {\n${items}\n}`;
  }
}
