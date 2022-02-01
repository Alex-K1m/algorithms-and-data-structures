import { CompareFn } from '../../utils/Comparator';
import Sorter from './Sorter';

const compareNumbers: CompareFn<number> = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const compareStringLengths: CompareFn<string> = (
  { length: a },
  { length: b },
) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

const shuffled = [3, 5, 4, -1, -4, 2, 0, 1, -2, -5, -3];
const sorted = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const reversed = sorted.slice().reverse();
const shuffledStrings = ['dd', 'aa', 'q', 'a', 'bbbb', 'ccc'];
const sortedStrings = ['q', 'a', 'dd', 'aa', 'ccc', 'bbbb'];

test('bubble sort works correctly & is stable', () => {
  const sorter = new Sorter(compareNumbers);
  const strLengthsSorter = new Sorter(compareStringLengths);

  expect(sorter.bubble([])).toEqual([]);
  expect(sorter.bubble([1])).toEqual([1]);
  expect(sorter.bubble([1, 1, 1])).toEqual([1, 1, 1]);
  expect(sorter.bubble(sorted)).toEqual(sorted);
  expect(sorter.bubble(reversed)).toEqual(sorted);
  expect(sorter.bubble(shuffled)).toEqual(sorted);
  expect(sorter.reverse().bubble(shuffled)).toEqual(reversed);
  expect(strLengthsSorter.bubble(shuffledStrings)).toEqual(sortedStrings);
});
