import Sorter from './NonComparisonSorter';

const shuffled = [3, 5, 4, -1, -4, 2, 0, 1, -2, -5, -3];
const sorted = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
const reversed = sorted.slice().reverse();
const shuffled2 = [1324, 5, -24, -1, 983, -9326, -561, 49, 0, -79, 831];
const sorted2 = [-9326, -561, -79, -24, -1, 0, 5, 49, 831, 983, 1324];
const reversed2 = sorted2.slice().reverse();
const shuffledStrings = ['dd', 'aa', 'q', 'a', 'bbbb', 'ccc'];
const sortedStrings = ['q', 'a', 'dd', 'aa', 'ccc', 'bbbb'];

test('counting sort', () => {
  const sorter = new Sorter((n: number) => n);
  const strLengthsSorter = new Sorter((str: string) => str.length);

  expect(sorter.counting([])).toEqual([]);
  expect(sorter.counting([1])).toEqual([1]);
  expect(sorter.counting([1, 1, 1])).toEqual([1, 1, 1]);
  expect(sorter.counting(sorted)).toEqual(sorted);
  expect(sorter.counting(reversed)).toEqual(sorted);
  expect(sorter.counting(shuffled)).toEqual(sorted);

  expect(() => sorter.counting([1.1, 1])).toThrow();

  expect(strLengthsSorter.counting(shuffledStrings)).toEqual(sortedStrings);
});

test('radix sort', () => {
  const sorter = new Sorter((n: number) => n);

  expect(sorter.radix([])).toEqual([]);
  expect(sorter.radix([1])).toEqual([1]);
  expect(sorter.radix([1, 1, 1])).toEqual([1, 1, 1]);
  expect(sorter.radix(sorted2)).toEqual(sorted2);
  expect(sorter.radix(reversed2)).toEqual(sorted2);
  expect(sorter.radix(shuffled2)).toEqual(sorted2);

  expect(() => sorter.radix([1.1, 1])).toThrow();
});
