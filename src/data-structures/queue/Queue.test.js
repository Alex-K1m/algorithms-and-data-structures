import Queue from './Queue.js';

describe('Queue', () => {
  it('creates an empty queue', () => {
    const queue = new Queue();

    expect(queue.isEmpty()).toBe(true);
    expect(String(queue)).toBe('');
  });

  it('add a value to the rear', () => {
    const queue = new Queue().enqueue(1).enqueue('str').enqueue(true);

    expect(queue.isEmpty()).toBe(false);
    expect(String(queue)).toBe('1,str,true');
  });

  it('removes a value from the front', () => {
    const queue = new Queue().enqueue(1).enqueue(2);

    expect(queue.dequeue()).toBe(1);
    expect(String(queue)).toBe('2');

    expect(queue.dequeue()).toBe(2);
    expect(String(queue)).toBe('');

    expect(queue.dequeue()).toBeUndefined();
  });

  it('returns a value from the front', () => {
    const queue = new Queue().enqueue(1).enqueue(2);

    expect(queue.peek()).toBe(1);
    expect(queue.peek()).toBe(1);

    queue.dequeue();

    expect(queue.peek()).toBe(2);

    queue.dequeue();

    expect(queue.peek()).toBeUndefined();
  });

  it('is iterable', () => {
    const queue = new Queue().enqueue(1).enqueue(2).enqueue(3);

    expect([...queue]).toEqual([1, 2, 3]);
  });
});
