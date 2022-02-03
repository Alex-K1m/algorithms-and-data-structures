export type CompareFn<T> = (a: T, b: T) => -1 | 0 | 1;

export const compareNumbers: CompareFn<number> = (a, b) => {
  if (a === b) return 0;
  return a > b ? 1 : -1;
};

export const compareStringLengths: CompareFn<string> = (
  { length: a },
  { length: b },
) => compareNumbers(a, b);

export const compareTuples: CompareFn<[number]> = ([a], [b]) =>
  compareNumbers(a, b);
