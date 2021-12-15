import DoublyLinkedList from './DoublyLinkedList';

describe('DoublyLinkedList', () => {
  it('creates a list from array', () => {
    const items = [1, 2, 3];
    const list = new DoublyLinkedList(items);
    const singleValueList = new DoublyLinkedList([1]);

    expect(list.isEmpty()).toBe(false);
    expect(list.head?.value).toBe(1);
    expect(list.last?.value).toBe(3);
    expect(String(list)).toBe(String(items));
    expect(list.head?.next?.value).toBe(2);
    expect(list.head?.prev).toBeUndefined();
    expect(list.last?.next).toBeUndefined();
    expect(list.last?.prev?.value).toBe(2);

    expect(singleValueList.head).toBe(singleValueList.last);
    expect(singleValueList.head?.next).toBeUndefined();
    expect(singleValueList.head?.prev).toBeUndefined();
  });

  it('creates a list from node', () => {
    const node = new DoublyLinkedList([1, 2, 3]).head;
    const list = new DoublyLinkedList(node);
    const singleNode = DoublyLinkedList.createNode(1);
    const singleValueList = new DoublyLinkedList(singleNode);

    expect(list.isEmpty()).toBe(false);
    expect(list.head).toBe(node);
    expect(String(list)).toBe('1,2,3');
    expect(singleValueList.head).toBe(singleValueList.last);
  });

  it('creates an empty list', () => {
    const list = new DoublyLinkedList();
    const listFromArray = new DoublyLinkedList([]);

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
    expect(String(list)).toBe('');
    expect(listFromArray.isEmpty()).toBe(true);
  });

  it('prepends a value', () => {
    const list = new DoublyLinkedList([1, 2]).prepend();

    expect(String(list)).toBe('1,2');

    list.prepend(0);

    expect(list.head?.value).toBe(0);
    expect(list.head?.prev).toBeUndefined();
    expect(list.head?.next?.value).toBe(1);
    expect(list.head?.next?.prev?.value).toBe(0);
    expect(String(list)).toBe('0,1,2');

    list.prepend(-2, -1);

    expect(list.head?.value).toBe(-2);
    expect(list.head?.next?.value).toBe(-1);
    expect(list.head?.next?.next?.prev?.value).toBe(-1);
    expect(String(list)).toBe('-2,-1,0,1,2');

    const singleValueList = new DoublyLinkedList<number>().prepend(0);

    expect(singleValueList.head?.value).toBe(0);
    expect(singleValueList.head?.next).toBeUndefined();
    expect(singleValueList.head?.prev).toBeUndefined();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('appends a value', () => {
    const list = new DoublyLinkedList([1, 2]).append();

    expect(String(list)).toBe('1,2');

    list.append(3);

    expect(list.last?.value).toBe(3);
    expect(list.last?.next).toBeUndefined();
    expect(list.last?.prev?.value).toBe(2);
    expect(list.last?.prev?.next?.value).toBe(3);
    expect(String(list)).toBe('1,2,3');

    list.append(4, 5);

    expect(list.last?.value).toBe(5);
    expect(list.last?.next).toBeUndefined();
    expect(list.last?.prev?.prev?.next?.value).toBe(4);
    expect(String(list)).toBe('1,2,3,4,5');

    const singleValueList = new DoublyLinkedList<number>().append(0);

    expect(singleValueList.head?.value).toBe(0);
    expect(singleValueList.last?.next).toBeUndefined();
    expect(singleValueList.last?.prev).toBeUndefined();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('is iterable', () => {
    const values = [1, 2, 3];
    const list = new DoublyLinkedList(values);

    expect(Array.from(list)).toEqual(values);
  });

  it('finds a node by value', () => {
    const actual = new DoublyLinkedList([1, 2, 3]).find(2);

    expect(actual?.value).toBe(2);
    expect(actual?.next?.value).toBe(3);
    expect(actual?.prev?.value).toBe(1);
  });

  it('deletes head', () => {
    const list = new DoublyLinkedList([1, 2]).deleteHead();

    expect(list.head?.value).toBe(2);
    expect(list.head?.next).toBeUndefined();
    expect(list.head?.prev).toBeUndefined();
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
    const list = new DoublyLinkedList([1, 2, 3]).deleteLast();

    expect(list.last?.value).toBe(2);
    expect(list.last?.next).toBeUndefined();
    expect(list.last?.prev?.value).toBe(1);
    expect(String(list)).toBe('1,2');

    list.deleteLast();

    expect(list.last?.value).toBe(1);
    expect(list.head).toBe(list.last);
    expect(list.last?.prev).toBeUndefined();
    expect(list.last?.next).toBeUndefined();

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
    const list = new DoublyLinkedList([1, 2, 3, 2, 4]).delete(2);
    const emptyList = new DoublyLinkedList().delete(1);

    expect(String(list)).toBe('1,3,4');
    expect(list.head?.value).toBe(1);
    expect(list.head?.next?.value).toBe(3);
    expect(list.head?.prev).toBeUndefined();
    expect(list.last?.value).toBe(4);
    expect(list.last?.next).toBeUndefined();
    expect(list.last?.prev?.value).toBe(3);

    list.delete(1);

    expect(list.head?.value).toBe(3);
    expect(list.head?.next?.value).toBe(4);
    expect(list.head?.prev).toBeUndefined();
    expect(String(list)).toBe('3,4');

    list.delete(4);

    expect(list.last?.value).toBe(3);
    expect(list.last?.next).toBeUndefined();
    expect(list.last?.prev).toBeUndefined();
    expect(String(list)).toBe('3');

    list.delete(5);

    expect(String(list)).toBe('3');

    list.delete(3);

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();

    expect(emptyList.isEmpty()).toBe(true);
  });
});
