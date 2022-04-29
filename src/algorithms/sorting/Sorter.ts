import Heap from '../../data-structures/heap/Heap';
import Comparator from '../../utils/Comparator';
import { CompareFn } from '../../utils/compareFns';

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

  insertion(array: T[]): T[] {
    const clone = array.slice();

    for (let index = 1; index < clone.length; index += 1) {
      let i = index;

      while (i > 0 && this.compare.greater(clone[i - 1], clone[i])) {
        [clone[i - 1], clone[i]] = [clone[i], clone[i - 1]];
        i -= 1;
      }
    }

    return clone;
  }

  heap(array: T[]): T[] {
    const maxHeap = new Heap(this.compare.fn).add(...array);
    return Array.from({ length: maxHeap.size })
      .map(() => maxHeap.poll()!)
      .reverse();
  }

  merge(array: T[]): T[] {
    if (array.length <= 1) return array;

    const middleIndex = Math.floor(array.length / 2);
    const left = array.slice(0, middleIndex);
    const right = array.slice(middleIndex);

    const sortedLeft = this.merge(left);
    const sortedRight = this.merge(right);

    return this.mergeSortedArrays(sortedLeft, sortedRight);
  }

  private mergeSortedArrays(left: T[], right: T[]): T[] {
    let leftIndex = 0;
    let rightIndex = 0;
    const result = [];

    while (leftIndex < left.length && rightIndex < right.length) {
      if (this.compare.lessOrEqual(left[leftIndex], right[rightIndex])) {
        result.push(left[leftIndex]);
        leftIndex += 1;
      } else {
        result.push(right[rightIndex]);
        rightIndex += 1;
      }
    }

    return [...result, ...left.slice(leftIndex), ...right.slice(rightIndex)];
  }

  quick(array: T[]): T[] {
    if (array.length <= 1) return array;

    const [pivot] = array;
    const left: T[] = [];
    const center: T[] = [];
    const right: T[] = [];

    array.forEach((item) => {
      if (this.compare.less(item, pivot)) left.push(item);
      if (this.compare.equal(item, pivot)) center.push(item);
      if (this.compare.greater(item, pivot)) right.push(item);
    });

    const sortedLeft = this.quick(left);
    const sortedRight = this.quick(right);

    return [...sortedLeft, ...center, ...sortedRight];
  }

  shell(array: T[]): T[] {
    const clone = array.slice();
    let gap = clone.length;

    do {
      gap = Math.floor(gap / 2);

      for (let index = 0; index < clone.length - gap; index += 1) {
        let i = index;

        while (i >= 0 && this.compare.greater(clone[i], clone[i + gap])) {
          [clone[i], clone[i + gap]] = [clone[i + gap], clone[i]];
          i -= gap;
        }
      }
    } while (gap > 1);

    return clone;
  }

  static counting<K>(array: K[], iteratee: (item: K) => number): K[] {
    const values = array.map(iteratee);
    const isValid = values.every((value) => Number.isSafeInteger(value));

    if (!isValid)
      throw new Error('The iteratee should return only integer values');

    const sorted: K[] = [];
    const min = Math.min(...values);
    const max = Math.max(...values);

    const frequencies = array.reduce((acc, item, i) => {
      const value = values[i];
      if (acc[value]) acc[value].push(item);
      else acc[value] = [item];
      return acc;
    }, {} as Record<number, K[]>);

    for (let value = min; value <= max; value += 1) {
      const items = frequencies[value] ?? [];
      sorted.push(...items);
    }

    return sorted;
  }

  static radix(array: number[]): number[] {
    const isValid = array.every((item) => Number.isSafeInteger(item));

    if (!isValid) throw new Error('The radix sort only works with integers');

    const max = Math.max(...array);
    const maxDigits = String(Math.abs(max)).length;

    return Array.from({ length: maxDigits })
      .map((_, i) => i + 1)
      .reduce(
        (partiallySorted, digit) =>
          Sorter.counting<number>(partiallySorted, (n) =>
            Math.trunc((n % 10 ** digit) / 10 ** (digit - 1)),
          ),
        array,
      );
  }
}
