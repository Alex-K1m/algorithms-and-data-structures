import Comparator, { CompareFn } from './Comparator';

describe('Comparator', () => {
  it('compares correctly with defaults', () => {
    const comparator = new Comparator();

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
    const comparator = new Comparator().reverse();

    expect(comparator.equal(1, 1)).toBe(true);
    expect(comparator.less(1, 0)).toBe(true);
    expect(comparator.greater(0, 1)).toBe(true);
  });

  it('compares correctly with a custom compare fn', () => {
    interface INode {
      value: number;
    }

    const nodeCompare: CompareFn<INode> = ({ value: a }, { value: b }) =>
      Comparator.defaultCompare(a, b);
    const nodeComparator = new Comparator(nodeCompare);

    expect(nodeComparator.equal({ value: 1 }, { value: 1 })).toBe(true);
    expect(nodeComparator.less({ value: 0 }, { value: 1 })).toBe(true);
    expect(nodeComparator.lessOrEqual({ value: 1 }, { value: 1 })).toBe(true);
    expect(nodeComparator.greater({ value: 1 }, { value: 0 })).toBe(true);
    expect(nodeComparator.greaterOrEqual({ value: 1 }, { value: 1 })).toBe(
      true,
    );
  });
});
