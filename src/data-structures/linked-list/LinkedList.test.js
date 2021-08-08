import LinkedList from './LinkedList.js';
import LinkedListNode from './LinkedListNode.js';

describe('LinkedList', () => {
  it('creates a list from array', () => {
    const items = [1, 'str', true];
    const list = new LinkedList(items);

    expect(list.isEmpty()).toBe(false);
    expect(list.head.value).toBe(1);
    expect(list.last.value).toBe(true);
    expect(String(list)).toBe(String(items));
  });

  it('creates a list from node', () => {
    const node = new LinkedList([1, 2, 3]).head;
    const list = new LinkedList(node);

    expect(list.head).toBe(node);
    expect(String(list)).toBe('1,2,3');
  });

  it('creates an empty list', () => {
    const list = new LinkedList();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
    expect(String(list)).toBe('');
  });

  it('prepends a value', () => {
    const list = new LinkedList([1, 2]).prepend(0);

    expect(list.head.value).toBe(0);
    expect(String(list)).toBe('0,1,2');
  });

  it('appends a value', () => {
    const list = new LinkedList([1, 2]).append(3);

    expect(list.last.value).toBe(3);
    expect(String(list)).toBe('1,2,3');
  });

  it('is iterable', () => {
    const values = [1, false, null, 'str', { key: 42 }];
    const list = new LinkedList(values);

    expect(Array.from(list)).toEqual(values);
  });

  it('finds a node by value', () => {
    const actual = new LinkedList([1, 2, 3]).find(2);

    expect(actual).toBeInstanceOf(LinkedListNode);
    expect(actual.value).toBe(2);
  });

  it('deletes head', () => {
    const list = new LinkedList([1, 2, 3]).deleteHead();

    expect(list.head.value).toBe(2);
    expect(String(list)).toBe('2,3');
  });

  it('deletes last', () => {
    const list = new LinkedList([1, 2, 3]).deleteLast();

    expect(list.last.value).toBe(2);
    expect(String(list)).toBe('1,2');
  });

  it('deletes a node by value', () => {
    const list = new LinkedList([1, 2, 3]).delete(2);

    expect(String(list)).toBe('1,3');
  });

  it.todo('edge cases when a list is empty');
});
