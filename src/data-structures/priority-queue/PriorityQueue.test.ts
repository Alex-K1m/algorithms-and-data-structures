import PriorityQueue from './PriorityQueue';

describe('PriorityQueue', () => {
  it('creates an empty queue', () => {
    const queue = new PriorityQueue();

    expect(queue.isEmpty()).toBe(true);
    expect(queue.peek()).toBeUndefined();
  });

  it('queues a value with priority', () => {
    const queue = new PriorityQueue();

    expect(queue.isEmpty()).toBe(true);
    expect(queue.enqueue(20, 2).peek()).toBe(20);
    expect(queue.isEmpty()).toBe(false);
    expect(queue.enqueue(10, 1).peek()).toBe(10);
    expect(queue.enqueue(30, 3).peek()).toBe(10);
    expect(queue.enqueue(5).peek()).toBe(5);
  });

  it('dequeues a value according to priority', () => {
    const queue = new PriorityQueue()
      .enqueue(20, 2)
      .enqueue(10, 1)
      .enqueue(30, 3)
      .enqueue(40, 4)
      .enqueue(31, 3)
      .enqueue(0);

    expect(queue.dequeue()).toBe(0);
    expect(queue.dequeue()).toBe(20);
    expect(queue.dequeue()).toBe(31);
    expect(queue.dequeue()).toBe(30);
    expect(queue.dequeue()).toBe(10);
    expect(queue.dequeue()).toBe(40);
    expect(queue.dequeue()).toBeUndefined();
    expect(queue.isEmpty()).toBe(true);
  });

  it('updates priorities for existing values', () => {
    const queue = new PriorityQueue().enqueue(10, 1).enqueue(10, 1);

    expect(queue.dequeue()).toBe(10);
    expect(queue.isEmpty()).toBe(true);

    queue
      .enqueue(10, 1)
      .enqueue(20, 2)
      .enqueue(30, 3)
      .enqueue(40, 4)
      .enqueue(50, 5);

    expect(queue.changePriority(30, 0).dequeue()).toBe(30);
    expect(queue.changePriority(10, 6).dequeue()).toBe(20);
    expect(queue.changePriority(40, 7).dequeue()).toBe(50);
    expect(queue.peek()).toBe(10);
  });
});
