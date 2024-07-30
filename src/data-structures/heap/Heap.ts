import { Comparator, type CompareFn } from '../../utils/Comparator';

export default class Heap<T> {
  private container: T[] = [];

  private compare: Comparator<T>;

  constructor(compareFn: CompareFn<T>) {
    this.compare = new Comparator(compareFn);
  }

  private getParentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private getChildrenIndexes(
    index: number,
  ): [number | undefined, number | undefined] {
    const leftChildIndex = index * 2 + 1;
    const rightChildIndex = leftChildIndex + 1;

    if (leftChildIndex >= this.size) return [undefined, undefined];

    if (rightChildIndex >= this.size) return [leftChildIndex, undefined];

    return [leftChildIndex, rightChildIndex];
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
      const [leftChildIndex, rightChildIndex] = this.getChildrenIndexes(index);
      const value = this.container[index];

      if (!leftChildIndex) return;

      const [childIndex, child] = (() => {
        const leftChild = this.container[leftChildIndex];
        if (!rightChildIndex) return [leftChildIndex, leftChild];

        const rightChild = this.container[rightChildIndex];

        return this.compare.greater(leftChild, rightChild)
          ? [leftChildIndex, leftChild]
          : [rightChildIndex, rightChild];
      })();

      if (this.compare.greater(child, value)) {
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
