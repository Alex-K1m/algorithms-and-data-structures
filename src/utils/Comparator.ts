import { CompareFn } from './compareFns';

export default class Comparator<T> {
  constructor(private compare: CompareFn<T>) {}

  get fn() {
    return this.compare;
  }

  equal(a: T, b: T): boolean {
    return this.compare(a, b) === 0;
  }

  less(a: T, b: T): boolean {
    return this.compare(a, b) === -1;
  }

  lessOrEqual(a: T, b: T): boolean {
    return this.compare(a, b) < 1;
  }

  greater(a: T, b: T): boolean {
    return this.compare(a, b) === 1;
  }

  greaterOrEqual(a: T, b: T): boolean {
    return this.compare(a, b) > -1;
  }

  reverse(): this {
    const { compare } = this;
    this.compare = (a, b) => compare(b, a);
    return this;
  }
}
