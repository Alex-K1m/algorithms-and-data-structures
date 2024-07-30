import { Comparator, type CompareFn } from '~/utils/Comparator';

export class Search<T> {
  #compare: Comparator<T>;

  constructor(compareFn?: CompareFn<T>) {
    this.#compare = new Comparator(compareFn);
  }

  /**
   * @arg list must be sorted
   * @returns index, `null` if not found
   * @complexity O(log n)
   */
  binary(element: T, list: T[]): number | null {
    let low = 0;
    let high = list.length - 1;

    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      const current = list[mid] as T;

      if (this.#compare.equal(current, element)) return mid;
      else if (this.#compare.greater(current, element)) high = mid - 1;
      else low = mid + 1;
    }

    return null;
  }
}
