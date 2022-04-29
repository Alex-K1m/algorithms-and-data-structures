export default class NonComparisonSorter<T> {
  constructor(private iteratee: (item: T) => number) {}

  /** The original algorithm is different */
  counting(array: T[], iteratee?: (item: T) => number): T[] {
    const values = array.map((item) => (iteratee ?? this.iteratee)(item));
    const isValid = values.every((attr) => Number.isSafeInteger(attr));

    if (!isValid)
      throw new Error('The iteratee should return only integer values');

    const sorted: T[] = [];
    const min = Math.min(...values);
    const max = Math.max(...values);

    const frequencies = array.reduce((acc, item) => {
      const value = (iteratee ?? this.iteratee)(item);
      if (acc[value]) acc[value].push(item);
      else acc[value] = [item];
      return acc;
    }, {} as Record<number, T[]>);

    for (let value = min; value <= max; value += 1) {
      const items = frequencies[value] ?? [];
      sorted.push(...items);
    }

    return sorted;
  }

  radix(array: number[]): number[] {
    const isValid = array.every((item) => Number.isSafeInteger(item));

    if (!isValid) throw new Error('The radix sort only works with integers');

    const max = Math.max(...array);
    const maxDigits = String(Math.abs(max)).length;
    const sorter = new NonComparisonSorter((n: number): number => n % 10);
    let sorted = array;

    for (let i = 1; i <= maxDigits; i += 1) {
      sorted = sorter.counting(sorted, (n) =>
        Math.trunc((n % 10 ** i) / 10 ** (i - 1)),
      );
    }

    return sorted;
  }
}
