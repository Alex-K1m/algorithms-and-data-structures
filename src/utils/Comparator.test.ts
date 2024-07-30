import { Comparator, compareNumbers, compareTuples } from './Comparator';

describe('Comparator', () => {
  it('compares numbers correctly', () => {
    const comparator = new Comparator(compareNumbers);

    expect(comparator.fn).toBe(compareNumbers);

    expect(comparator.equal(1, 1)).toBe(true);
    expect(comparator.equal(0, 1)).toBe(false);

    expect(comparator.less(0, 1)).toBe(true);
    expect(comparator.less(1, 1)).toBe(false);
    expect(comparator.less(1, 0)).toBe(false);

    expect(comparator.lessOrEqual(0, 1)).toBe(true);
    expect(comparator.lessOrEqual(1, 1)).toBe(true);
    expect(comparator.lessOrEqual(1, 0)).toBe(false);

    expect(comparator.greater(1, 0)).toBe(true);
    expect(comparator.greater(1, 1)).toBe(false);
    expect(comparator.greater(0, 1)).toBe(false);

    expect(comparator.greaterOrEqual(1, 0)).toBe(true);
    expect(comparator.greaterOrEqual(1, 1)).toBe(true);
    expect(comparator.greaterOrEqual(0, 1)).toBe(false);
  });

  it('compares correctly after reverse', () => {
    const comparator = new Comparator(compareNumbers).reverse();

    expect(comparator.equal(1, 1)).toBe(true);
    expect(comparator.less(1, 0)).toBe(true);
    expect(comparator.greater(0, 1)).toBe(true);
  });

  it('compares correctly with a custom compare fn', () => {
    const nodeComparator = new Comparator(compareTuples);

    expect(nodeComparator.equal([1], [1])).toBe(true);
    expect(nodeComparator.less([0], [1])).toBe(true);
    expect(nodeComparator.lessOrEqual([1], [1])).toBe(true);
    expect(nodeComparator.greater([1], [0])).toBe(true);
    expect(nodeComparator.greaterOrEqual([1], [1])).toBe(true);
  });
});
