export default class NonComparisonSorter<T> {
  constructor(private iteratee: (item: T) => number) {}

  /** The original algorithm is different */
  counting(array: T[]): T[] {
    const values = array.map((item) => this.iteratee(item));
    const isValid = values.every((attr) => Number.isSafeInteger(attr));

    if (!isValid)
      throw new Error('The counting sort only works with integer attributes');

    const sorted: T[] = [];
    const min = Math.min(...values);
    const max = Math.max(...values);

    const frequencies = array.reduce((acc, item) => {
      const value = this.iteratee(item);
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
}
