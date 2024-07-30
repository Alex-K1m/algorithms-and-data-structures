import { Search } from './Search';

describe('Searching algorithms work correctly', () => {
  test.each([
    [1, [], null],
    [1, [0], null],
    [0, [1, 2, 3, 4, 5], null],
    [1, [1], 0],
    [2, [1, 2], 1],
    [7, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 6],
    [10, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 9],
  ])('binary search %#', (element, list, result) => {
    const search = new Search();
    expect(search.binary(element, list)).toEqual(result);
  });
});
