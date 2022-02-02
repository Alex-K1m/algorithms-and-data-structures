import Comparator, { CompareFn } from '../../utils/Comparator';

export default class Sorter<T> {
  private compare: Comparator<T>;

  constructor(compareFn: CompareFn<T>) {
    this.compare = new Comparator(compareFn);
  }

  reverse(): this {
    this.compare.reverse();
    return this;
  }

  bubble(array: T[]): T[] {
    const clone = array.slice();
    let swapped = false;

    for (let i = 0; i < clone.length - 1; i += 1) {
      swapped = false;

      for (let j = 0; j < clone.length - 1; j += 1) {
        if (this.compare.greater(clone[j], clone[j + 1])) {
          [clone[j], clone[j + 1]] = [clone[j + 1], clone[j]];
          swapped = true;
        }
      }

      if (!swapped) return clone;
    }

    return clone;
  }

  selection(array: T[]): T[] {
    const clone = array.slice();

    for (let i = 0; i < clone.length - 1; i += 1) {
      let indexOfMin = i;

      for (let j = i + 1; j < clone.length; j += 1) {
        if (this.compare.greater(clone[indexOfMin], clone[j])) {
          indexOfMin = j;
        }
      }

      [clone[i], clone[indexOfMin]] = [clone[indexOfMin], clone[i]];
    }

    return clone;
  }
}
