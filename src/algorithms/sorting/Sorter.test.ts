import { compareNumbers, compareStringLengths } from '../../utils/compareFns';
import Sorter from './Sorter';

const shuffled = [1324, 5, -24, -1, 983, -9326, -561, 49, 0, -79, 831];
const sorted = [-9326, -561, -79, -24, -1, 0, 5, 49, 831, 983, 1324];
const reversed = sorted.slice().reverse();
const shuffledStrings = ['dd', 'aa', 'q', 'a', 'bbbb', 'ccc'];
const sortedStrings = ['q', 'a', 'dd', 'aa', 'ccc', 'bbbb'];

const stableMethods = [
  'bubble',
  'selection',
  'insertion',
  'merge',
  'quick',
] as const;
const unstableMethods = ['heap', 'shell'] as const;

describe('Sorting algorithms work correctly', () => {
  test.each([...stableMethods, ...unstableMethods].map((item) => [item]))(
    '%s sort',
    (method) => {
      const sorter = new Sorter(compareNumbers);

      expect(sorter[method]([])).toEqual([]);
      expect(sorter[method]([1])).toEqual([1]);
      expect(sorter[method]([1, 1, 1])).toEqual([1, 1, 1]);
      expect(sorter[method](sorted)).toEqual(sorted);
      expect(sorter[method](reversed)).toEqual(sorted);
      expect(sorter[method](shuffled)).toEqual(sorted);
      expect(sorter.reverse()[method](shuffled)).toEqual(reversed);
    },
  );

  test('counting sort', () => {
    const countingSort = (array: number[]) => Sorter.counting(array, (n) => n);

    expect(countingSort([])).toEqual([]);
    expect(countingSort([1])).toEqual([1]);
    expect(countingSort([1, 1, 1])).toEqual([1, 1, 1]);
    expect(countingSort(sorted)).toEqual(sorted);
    expect(countingSort(reversed)).toEqual(sorted);
    expect(countingSort(shuffled)).toEqual(sorted);

    expect(() => countingSort([1.1, 1])).toThrow();
  });

  test('radix sort', () => {
    expect(Sorter.radix([])).toEqual([]);
    expect(Sorter.radix([1])).toEqual([1]);
    expect(Sorter.radix([1, 1, 1])).toEqual([1, 1, 1]);
    expect(Sorter.radix(sorted)).toEqual(sorted);
    expect(Sorter.radix(reversed)).toEqual(sorted);
    expect(Sorter.radix(shuffled)).toEqual(sorted);

    expect(() => Sorter.radix([1.1, 1])).toThrow();
  });
});

describe('Sorting algorithms are stable', () => {
  test.each(stableMethods.map((item) => [item]))('%s sort', (method) => {
    const strLengthsSorter = new Sorter(compareStringLengths);

    expect(strLengthsSorter[method](shuffledStrings)).toEqual(sortedStrings);
  });

  test('counting sort', () => {
    const strLengthsCountingSort = (array: string[]) =>
      Sorter.counting(array, (str) => str.length);

    expect(strLengthsCountingSort(shuffledStrings)).toEqual(sortedStrings);
  });
});
