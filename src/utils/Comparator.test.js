import Comparator from './Comparator.js';

describe('Comparator', () => {
  describe('works correctly with default compare fn', () => {
    test.each`
      a        | b        | expected
      ${1}     | ${1}     | ${true}
      ${0}     | ${1}     | ${false}
      ${'abc'} | ${'abc'} | ${true}
      ${'abc'} | ${'ab'}  | ${false}
      ${true}  | ${true}  | ${true}
      ${true}  | ${false} | ${false}
    `('equal: case $#', ({ a, b, expected }) => {
      const comparator = new Comparator();
      expect(comparator.equal(a, b)).toBe(expected);
    });

    test.each`
      a        | b        | expected
      ${2}     | ${1}     | ${true}
      ${1}     | ${1}     | ${false}
      ${'abc'} | ${'ab'}  | ${true}
      ${'abc'} | ${'abc'} | ${false}
      ${true}  | ${false} | ${true}
      ${true}  | ${true}  | ${false}
    `('greater: case $#', ({ a, b, expected }) => {
      const comparator = new Comparator();
      expect(comparator.greater(a, b)).toBe(expected);
    });

    test.each`
      a        | b        | expected
      ${1}     | ${1}     | ${true}
      ${0}     | ${1}     | ${false}
      ${'abc'} | ${'abc'} | ${true}
      ${'ab'}  | ${'abc'} | ${false}
      ${true}  | ${true}  | ${true}
      ${false} | ${true}  | ${false}
    `('greaterOrEqual: case $#', ({ a, b, expected }) => {
      const comparator = new Comparator();
      expect(comparator.greaterOrEqual(a, b)).toBe(expected);
    });

    test.each`
      a        | b        | expected
      ${0}     | ${1}     | ${true}
      ${1}     | ${1}     | ${false}
      ${'ab'}  | ${'abc'} | ${true}
      ${'abc'} | ${'abc'} | ${false}
      ${false} | ${true}  | ${true}
      ${true}  | ${true}  | ${false}
    `('less: case $#', ({ a, b, expected }) => {
      const comparator = new Comparator();
      expect(comparator.less(a, b)).toBe(expected);
    });

    test.each`
      a        | b        | expected
      ${1}     | ${1}     | ${true}
      ${1}     | ${0}     | ${false}
      ${'abc'} | ${'abc'} | ${true}
      ${'abc'} | ${'ab'}  | ${false}
      ${true}  | ${true}  | ${true}
      ${true}  | ${false} | ${false}
    `('lessOrEqual: case $#', ({ a, b, expected }) => {
      const comparator = new Comparator();
      expect(comparator.lessOrEqual(a, b)).toBe(expected);
    });

    test.each`
      a        | b        | expected
      ${2}     | ${1}     | ${false}
      ${1}     | ${2}     | ${true}
      ${'abc'} | ${'ab'}  | ${false}
      ${'ab'}  | ${'abc'} | ${true}
      ${true}  | ${false} | ${false}
      ${false} | ${true}  | ${true}
    `('reverse: case $#', ({ a, b, expected }) => {
      const comparator = new Comparator().reverse();
      expect(comparator.greater(a, b)).toBe(expected);
    });
  });

  it('works correctly with a custom compare fn', () => {
    const comparator = new Comparator((a, b) => {
      if (a.value === b.value) return 0;
      return a.value > b.value ? 1 : -1;
    });

    expect(comparator.equal({ value: 1 }, { value: 1 })).toBe(true);
    expect(comparator.equal({ value: 0 }, { value: 1 })).toBe(false);
    expect(comparator.greater({ value: 1 }, { value: 0 })).toBe(true);
    expect(comparator.greater({ value: 1 }, { value: 1 })).toBe(false);
    expect(comparator.greaterOrEqual({ value: 1 }, { value: 1 })).toBe(true);
    expect(comparator.less({ value: 0 }, { value: 1 })).toBe(true);
    expect(comparator.reverse().greater({ value: 1 }, { value: 0 })).toBe(
      false,
    );
  });
});
