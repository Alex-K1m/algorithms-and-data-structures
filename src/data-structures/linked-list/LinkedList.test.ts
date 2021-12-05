import LinkedList from './LinkedList';
import LinkedListNode from './LinkedListNode';

describe('LinkedList', () => {
  it('creates a list from array', () => {
    const items = [1, 2, 3];
    const list = new LinkedList(items);
    const singleValueList = new LinkedList(['single']);

    expect(list.isEmpty()).toBe(false);
    expect(list.head?.value).toBe(1);
    expect(list.last?.value).toBe(3);
    expect(String(list)).toBe(String(items));
    expect(list.head?.next?.value).toBe(2);
    expect(list.last?.next).toBeUndefined();

    expect(singleValueList.head).toBe(singleValueList.last);
    expect(singleValueList.head?.next).toBeUndefined();
  });

  it('creates a list from node', () => {
    const node = new LinkedList([1, 2, 3]).head;
    const list = new LinkedList(node as LinkedListNode<number>);
    const singleNode = new LinkedListNode('single');
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
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
    expect(String(list)).toBe('');
    expect(listFromArray.isEmpty()).toBe(true);
  });

  it('prepends a value', () => {
    const list = new LinkedList([1, 2]).prepend(0);
    const singleValueList = new LinkedList<number>().prepend(0);

    expect(list.head?.value).toBe(0);
    expect(list.head?.next?.value).toBe(1);
    expect(String(list)).toBe('0,1,2');

    expect(singleValueList.head?.value).toBe(0);
    expect(singleValueList.head?.next).toBeUndefined();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('appends a value', () => {
    const list = new LinkedList([1, 2]).append(3);
    const singleValueList = new LinkedList<number>().append(0);

    expect(list.last?.value).toBe(3);
    expect(list.last?.next).toBeUndefined();
    expect(String(list)).toBe('1,2,3');

    expect(singleValueList.head?.value).toBe(0);
    expect(singleValueList.last?.next).toBeUndefined();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('is iterable', () => {
    const values = [1, 2, 3, 4];
    const list = new LinkedList(values);

    expect(Array.from(list)).toEqual(values);
  });

  it('finds a node by value', () => {
    const list = new LinkedList([1, 2, 3]);
    const actual = list.find(2);

    expect(actual).toBeInstanceOf(LinkedListNode);
    expect(actual?.value).toBe(2);
    expect(actual?.next?.value).toBe(3);

    expect(list.find(4)).toBeNull();

    expect(list.find((value) => value % 2 === 0)?.value).toBe(2);
  });

  it('deletes head', () => {
    const list = new LinkedList([1, 2]).deleteHead();

    expect(list.head?.value).toBe(2);
    expect(list.head?.next).toBeUndefined();
    expect(list.head).toBe(list.last);

    list.deleteHead();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();

    list.deleteHead();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
  });

  it('deletes last', () => {
    const list = new LinkedList([1, 2, 3]).deleteLast();

    expect(list.last?.value).toBe(2);
    expect(list.last?.next).toBeUndefined();
    expect(String(list)).toBe('1,2');

    list.deleteLast();

    expect(list.last?.value).toBe(1);
    expect(list.head).toBe(list.last);

    list.deleteLast();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();

    list.deleteLast();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
  });

  it('deletes nodes by value', () => {
    const list = new LinkedList([1, 2, 3, 2, 4]).delete(2);

    expect(String(list)).toBe('1,3,4');
    expect(list.head?.value).toBe(1);
    expect(list.head?.next?.value).toBe(3);
    expect(list.last?.value).toBe(4);

    list.delete(1);

    expect(list.head?.value).toBe(3);
    expect(list.head?.next?.value).toBe(4);
    expect(String(list)).toBe('3,4');

    list.delete((val) => val === 4);

    expect(list.last?.value).toBe(3);
    expect(list.last?.next).toBeUndefined();
    expect(String(list)).toBe('3');

    list.delete(5);

    expect(String(list)).toBe('3');

    list.delete(3);

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
  });
});
