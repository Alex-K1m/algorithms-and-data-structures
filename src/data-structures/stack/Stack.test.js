import Stack from './Stack.js';

describe('Stack', () => {
  it('creates an empty stack', () => {
    const stack = new Stack();

    expect(stack.isEmpty()).toBe(true);
    expect(String(stack)).toBe('');
  });

  it('adds a value', () => {
    const stack = new Stack().push(1).push('str').push(true);

    expect(stack.isEmpty()).toBe(false);
    expect(String(stack)).toBe('true,str,1');
  });

  it('removes and returns a value from the top', () => {
    const stack = new Stack().push(1).push(2);

    expect(stack.pop()).toBe(2);
    expect(String(stack)).toBe('1');

    expect(stack.pop()).toBe(1);
    expect(String(stack)).toBe('');

    expect(stack.pop()).toBeUndefined();
  });

  it('returns a value from the top', () => {
    const stack = new Stack().push(1).push(2);

    expect(stack.peek()).toBe(2);
    expect(stack.peek()).toBe(2);

    stack.pop();

    expect(stack.peek()).toBe(1);

    stack.pop();

    expect(stack.peek()).toBeUndefined();
  });

  it('is iterable', () => {
    const stack = new Stack().push(1).push(2).push(3);

    expect([...stack]).toEqual([3, 2, 1]);
  });
});
