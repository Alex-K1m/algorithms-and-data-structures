import Deque from './Deque.js';

describe('Deque', () => {
  it('creates an empty deque', () => {
    const deque = new Deque();

    expect(deque.isEmpty()).toBe(true);
    expect(String(deque)).toBe('');
  });

  it('adds a value to the front', () => {
    const deque = new Deque().addFront(1).addFront(2).addFront(3);

    expect(deque.isEmpty()).toBe(false);
    expect(String(deque)).toBe('3,2,1');
  });

  it('adds a value to the back', () => {
    const deque = new Deque().addBack(1).addBack(2).addBack(3);

    expect(deque.isEmpty()).toBe(false);
    expect(String(deque)).toBe('1,2,3');
  });

  it('removes a value from the front', () => {
    const deque = new Deque().addFront(1).addFront(2).addFront(3);

    expect(deque.removeFront()).toBe(3);
    expect(deque.removeFront()).toBe(2);
    expect(deque.removeFront()).toBe(1);
    expect(deque.isEmpty()).toBe(true);
    expect(deque.removeFront()).toBeUndefined();
  });

  it('removes a value from the back', () => {
    const deque = new Deque().addFront(1).addFront(2).addFront(3);

    expect(deque.removeBack()).toBe(1);
    expect(deque.removeBack()).toBe(2);
    expect(deque.removeBack()).toBe(3);
    expect(deque.isEmpty()).toBe(true);
    expect(deque.removeBack()).toBeUndefined();
  });

  it('peeks front', () => {
    const deque = new Deque();

    expect(deque.peekFront()).toBeUndefined();
    expect(deque.addFront(1).peekFront()).toBe(1);
    expect(deque.addFront(2).peekFront()).toBe(2);
  });

  it('peeks back', () => {
    const deque = new Deque();

    expect(deque.peekBack()).toBeUndefined();
    expect(deque.addBack(1).peekBack()).toBe(1);
    expect(deque.addBack(2).peekBack()).toBe(2);
  });

  it('is iterable', () => {
    expect([...new Deque().addFront(1).addBack(2)]).toEqual([1, 2]);
  });
});
