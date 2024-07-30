import { Heap } from '~/data-structures/heap/Heap';
import type { CompareFn } from '~/utils/Comparator';

export class PriorityQueue<T = number> {
  #container: Heap<T>;

  #priorities = new Map<T, number>();

  constructor() {
    const compareFn: CompareFn<T> = (a, b) => {
      const priorityOfA = this.#priorities.get(a)!;
      const priorityOfB = this.#priorities.get(b)!;
      if (priorityOfA === priorityOfB) return 0;
      return priorityOfA < priorityOfB ? 1 : -1;
    };

    this.#container = new Heap(compareFn);
    this.#priorities = new Map();
  }

  isEmpty(): boolean {
    return this.#container.size === 0;
  }

  peek(): T {
    return this.#container.peek();
  }

  enqueue(value: T, priority = 0): this {
    if (this.#priorities.has(value)) {
      this.changePriority(value, priority);
    } else {
      this.#priorities.set(value, priority);
      this.#container.add(value);
    }
    return this;
  }

  dequeue(): T | undefined {
    const value = this.#container.poll();
    if (value) this.#priorities.delete(value);
    return value;
  }

  changePriority(value: T, priority: number): this {
    const currentPriority = this.#priorities.get(value);
    if (currentPriority === priority) return this;

    this.#container.delete(value);
    this.#priorities.set(value, priority);
    this.#container.add(value);

    return this;
  }
}
