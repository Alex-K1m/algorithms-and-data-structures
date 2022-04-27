import { compareNumbers, compareStringLengths } from '../../utils/compareFns';
import Sorter from './Sorter';

const shuffled = [6, 8, 7, 3, 1, 9, 0, 5, 2, 4];
const sorted = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
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
    const shuffledPositiveInts = [6, 8, 7, 3, 1, 9, 0, 5, 2, 4];
    const sortedPositiveInts = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const reversedPositiveInts = sortedPositiveInts.slice().reverse();
    const sorter = new Sorter(compareNumbers);

    expect(sorter.counting([])).toEqual([]);
    expect(sorter.counting([1])).toEqual([1]);
    expect(sorter.counting([1, 1, 1])).toEqual([1, 1, 1]);
    expect(sorter.counting(sortedPositiveInts)).toEqual(sortedPositiveInts);
    expect(sorter.counting(reversedPositiveInts)).toEqual(sortedPositiveInts);
    expect(sorter.counting(shuffledPositiveInts)).toEqual(sortedPositiveInts);
  });
});

describe('Sorting algorithms are stable', () => {
  test.each(stableMethods.map((item) => [item]))('%s sort', (method) => {
    const strLengthsSorter = new Sorter(compareStringLengths);

    expect(strLengthsSorter[method](shuffledStrings)).toEqual(sortedStrings);
  });
});
