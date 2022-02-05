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
}
