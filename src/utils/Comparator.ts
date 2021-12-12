export type CompareFn<T> = (a: T, b: T) => -1 | 0 | 1;

export default class Comparator<T = number> {
  constructor(private compare: CompareFn<T> = Comparator.defaultCompare) {}

  static defaultCompare: CompareFn<any> = (a, b) => {
    if (a === b) return 0;
    return a > b ? 1 : -1;
  };

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
