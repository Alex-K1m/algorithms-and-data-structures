export type CompareFn<T> = (a: T, b: T) => -1 | 0 | 1;

export const compareNumbers: CompareFn<number> = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

export const compareStringLengths: CompareFn<string> = (
  { length: a },
  { length: b },
) => compareNumbers(a, b);

export const compareTuples: CompareFn<[number]> = ([a], [b]) =>
  compareNumbers(a, b);

export class Comparator<T = number> {
  #compare: CompareFn<T>;

  constructor(compare: CompareFn<T> = compareNumbers as CompareFn<unknown>) {
    this.#compare = compare;
  }

  get fn() {
    return this.#compare;
  }

  equal(a: T, b: T): boolean {
    return this.#compare(a, b) === 0;
  }

  less(a: T, b: T): boolean {
    return this.#compare(a, b) === -1;
  }

  lessOrEqual(a: T, b: T): boolean {
    return this.#compare(a, b) < 1;
  }

  greater(a: T, b: T): boolean {
    return this.#compare(a, b) === 1;
  }

  greaterOrEqual(a: T, b: T): boolean {
    return this.#compare(a, b) > -1;
  }

  reverse(): this {
    const compare = this.#compare;
    this.#compare = (a, b) => compare(b, a);
    return this;
  }
}
