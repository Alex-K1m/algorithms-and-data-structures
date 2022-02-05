import { compareNumbers, compareStringLengths } from '../../utils/compareFns';
import Sorter from './Sorter';

const shuffled = [3, 5, 4, -1, -4, 2, 0, 1, -2, -5, -3];
const sorted = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const reversed = sorted.slice().reverse();
const shuffledStrings = ['dd', 'aa', 'q', 'a', 'bbbb', 'ccc'];
const sortedStrings = ['q', 'a', 'dd', 'aa', 'ccc', 'bbbb'];

const allMethods = [
  'bubble',
  'selection',
  'insertion',
  'heap',
  'merge',
  'quick',
] as const;
const stableMethods = allMethods.filter((method) => method !== 'heap');

describe('Sorting algorithms work correctly', () => {
  test.each(allMethods.map((item) => [item]))('%s sort', (method) => {
    const sorter = new Sorter(compareNumbers);

    expect(sorter[method]([])).toEqual([]);
    expect(sorter[method]([1])).toEqual([1]);
    expect(sorter[method]([1, 1, 1])).toEqual([1, 1, 1]);
    expect(sorter[method](sorted)).toEqual(sorted);
    expect(sorter[method](reversed)).toEqual(sorted);
    expect(sorter[method](shuffled)).toEqual(sorted);
    expect(sorter.reverse()[method](shuffled)).toEqual(reversed);
  });
});

describe('Sorting algorithms are stable', () => {
  test.each(stableMethods.map((item) => [item]))('%s sort', (method) => {
    const strLengthsSorter = new Sorter(compareStringLengths);

    expect(strLengthsSorter[method](shuffledStrings)).toEqual(sortedStrings);
  });
});
