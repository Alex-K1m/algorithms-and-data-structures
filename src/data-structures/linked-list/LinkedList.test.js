import LinkedList from './LinkedList.js';
import LinkedListNode from './LinkedListNode.js';

describe('LinkedList', () => {
  it('creates a list from array', () => {
    const items = [1, 'str', true];
    const list = new LinkedList(items);
    const singleValueList = new LinkedList([1]);

    expect(list.isEmpty()).toBe(false);
    expect(list.head.value).toBe(1);
    expect(list.last.value).toBe(true);
    expect(String(list)).toBe(String(items));
    expect(list.head.next.value).toBe('str');
    expect(list.last.next).toBeNull();

    expect(singleValueList.head).toBe(singleValueList.last);
    expect(singleValueList.head.next).toBeNull();
  });

  it('creates a list from node', () => {
    const node = new LinkedList([1, 2, 3]).head;
    const list = new LinkedList(node);
    const singleNode = new LinkedListNode(1);
    const singleValueList = new LinkedList(singleNode);

    expect(list.isEmpty()).toBe(false);
    expect(list.head).toBe(node);
    expect(String(list)).toBe('1,2,3');
    expect(singleValueList.head).toBe(singleValueList.last);
  });

  it('creates an empty list', () => {
    const list = new LinkedList();
    const listFromArray = new LinkedList([]);

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
    expect(String(list)).toBe('');
    expect(listFromArray.isEmpty()).toBe(true);
  });

  it('prepends a value', () => {
    const list = new LinkedList([1, 2]).prepend(0);
    const singleValueList = new LinkedList().prepend(0);

    expect(list.head.value).toBe(0);
    expect(list.head.next.value).toBe(1);
    expect(String(list)).toBe('0,1,2');

    expect(singleValueList.head.value).toBe(0);
    expect(singleValueList.head.next).toBeNull();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('appends a value', () => {
    const list = new LinkedList([1, 2]).append(3);
    const singleValueList = new LinkedList().append(0);

    expect(list.last.value).toBe(3);
    expect(list.last.next).toBeNull();
    expect(String(list)).toBe('1,2,3');

    expect(singleValueList.head.value).toBe(0);
    expect(singleValueList.last.next).toBeNull();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('is iterable', () => {
    const values = [1, false, null, 'str', { key: 42 }];
    const list = new LinkedList(values);

    expect(Array.from(list)).toEqual(values);
  });

  it('finds a node by value', () => {
    const list = new LinkedList([1, 2, 3]);
    const actual = list.find(2);

    expect(actual).toBeInstanceOf(LinkedListNode);
    expect(actual.value).toBe(2);
    expect(actual.next.value).toBe(3);

    expect(list.find(4)).toBeNull();

    expect(list.find((val) => typeof val === 'number').value).toBe(1);
  });

  it('deletes head', () => {
    const list = new LinkedList([1, 2]).deleteHead();

    expect(list.head.value).toBe(2);
    expect(list.head.next).toBeNull();
    expect(list.head).toBe(list.last);

    list.deleteHead();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();

    list.deleteHead();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
  });

  it('deletes last', () => {
    const list = new LinkedList([1, 2, 3]).deleteLast();

    expect(list.last.value).toBe(2);
    expect(list.last.next).toBeNull();
    expect(String(list)).toBe('1,2');

    list.deleteLast();

    expect(list.last.value).toBe(1);
    expect(list.head).toBe(list.last);

    list.deleteLast();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();

    list.deleteLast();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
  });

  it('deletes nodes by value', () => {
    const list = new LinkedList([1, 2, 3, 2, 4]).delete(2);

    expect(String(list)).toBe('1,3,4');
    expect(list.head.value).toBe(1);
    expect(list.head.next.value).toBe(3);
    expect(list.last.value).toBe(4);

    list.delete(1);

    expect(list.head.value).toBe(3);
    expect(list.head.next.value).toBe(4);
    expect(String(list)).toBe('3,4');

    list.delete(4);

    expect(list.last.value).toBe(3);
    expect(list.last.next).toBeNull();
    expect(String(list)).toBe('3');

    list.delete(5);

    expect(String(list)).toBe('3');

    list.delete(3);

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
  });
});
