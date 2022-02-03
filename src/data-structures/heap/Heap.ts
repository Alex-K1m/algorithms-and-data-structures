import Comparator from '../../utils/Comparator';
import { CompareFn } from '../../utils/compareFns';

export default class Heap<T> {
  private container: T[] = [];

  private compare: Comparator<T>;

  constructor(compareFn: CompareFn<T>) {
    this.compare = new Comparator(compareFn);
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getChildIndex(index: number): number {
    const childIndex = index * 2 + 1;
    return childIndex < this.size ? childIndex : -1;
  }

  private swap(index1: number, index2: number): void {
    const arr = this.container;
    [arr[index2], arr[index1]] = [arr[index1], arr[index2]];
  }

  private heapifyUp(startIndex = this.size - 1): void {
    const iterate = (index: number): void => {
      const parentIndex = this.getParentIndex(index);
      if (parentIndex === -1) return;

      const value = this.container[index];
      const parentValue = this.container[parentIndex];

      if (this.compare.greater(value, parentValue)) {
        this.swap(index, parentIndex);
      }

      iterate(parentIndex);
    };

    iterate(startIndex);
  }

  private heapifyDown(startIndex = 0): void {
    const iterate = (index: number): void => {
      const childIndex = this.getChildIndex(index);
      if (childIndex === -1) return;

      const value = this.container[index];
      const childValue = this.container[childIndex];

      if (this.compare.greater(childValue, value)) {
        this.swap(index, childIndex);
      }

      iterate(childIndex);
    };

    iterate(startIndex);
  }

  peek(): T {
    return this.container[0];
  }

  add(...values: T[]): this {
    if (values.length < 1) return this;
    this.container.push(values[0]);
    this.heapifyUp();
    return this.add(...values.slice(1));
  }

  poll(): T | undefined {
    if (this.size <= 1) return this.container.pop();

    const rootValue = this.container[0];
    this.container[0] = this.container.pop()!;
    this.heapifyDown();

    return rootValue;
  }

  delete(value: T): this {
    const index = this.container.findIndex((val) =>
      this.compare.equal(val, value),
    );
    if (index === -1) return this;

    this.swap(index, this.size - 1);
    this.container.pop();

    const newValue = this.container[index];
    const parentIndex = this.getParentIndex(index);
    const parentValue = this.container[parentIndex];

    if (parentIndex === -1 || this.compare.greater(parentValue, newValue))
      this.heapifyDown(index);
    else this.heapifyUp(index);

    return this.delete(value);
  }

  get size(): number {
    return this.container.length;
  }

  [Symbol.toPrimitive](): string {
    return this.container.toString();
  }
}
