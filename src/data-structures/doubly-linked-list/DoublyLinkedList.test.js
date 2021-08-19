import DoublyLinkedList from './DoublyLinkedList.js';
import DoublyLinkedListNode from './DoublyLinkedListNode.js';

describe('DoublyLinkedList', () => {
  it('creates a list from array', () => {
    const items = [1, 'str', true];
    const list = new DoublyLinkedList(items);
    const singleValueList = new DoublyLinkedList([1]);

    expect(list.isEmpty()).toBe(false);
    expect(list.head.value).toBe(1);
    expect(list.last.value).toBe(true);
    expect(String(list)).toBe(String(items));
    expect(list.head.next.value).toBe('str');
    expect(list.head.prev).toBeNull();
    expect(list.last.next).toBeNull();
    expect(list.last.prev.value).toBe('str');

    expect(singleValueList.head).toBe(singleValueList.last);
    expect(singleValueList.head.next).toBeNull();
    expect(singleValueList.head.prev).toBeNull();
  });

  it('creates a list from node', () => {
    const node = new DoublyLinkedList([1, 2, 3]).head;
    const list = new DoublyLinkedList(node);
    const singleNode = new DoublyLinkedListNode(1);
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
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
    expect(String(list)).toBe('');
    expect(listFromArray.isEmpty()).toBe(true);
  });

  it('prepends a value', () => {
    const list = new DoublyLinkedList([1, 2]).prepend(0);
    const singleValueList = new DoublyLinkedList().prepend(0);

    expect(list.head.value).toBe(0);
    expect(list.head.next.value).toBe(1);
    expect(list.head.prev).toBeNull();
    expect(list.head.next.prev).toBe(list.head);
    expect(String(list)).toBe('0,1,2');

    expect(singleValueList.head.value).toBe(0);
    expect(singleValueList.head.next).toBeNull();
    expect(singleValueList.head.prev).toBeNull();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('appends a value', () => {
    const list = new DoublyLinkedList([1, 2]).append(3);
    const singleValueList = new DoublyLinkedList().append(0);

    expect(list.last.value).toBe(3);
    expect(list.last.next).toBeNull();
    expect(list.last.prev.value).toBe(2);
    expect(String(list)).toBe('1,2,3');

    expect(singleValueList.head.value).toBe(0);
    expect(singleValueList.head.prev).toBeNull();
    expect(singleValueList.head.next).toBeNull();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('is iterable', () => {
    const values = [1, false, null, 'str', { key: 42 }];
    const list = new DoublyLinkedList(values);

    expect(Array.from(list)).toEqual(values);
  });

  it('finds a node by value', () => {
    const actual = new DoublyLinkedList([1, 2, 3]).find(2);

    expect(actual).toBeInstanceOf(DoublyLinkedListNode);
    expect(actual.value).toBe(2);
    expect(actual.next.value).toBe(3);
    expect(actual.prev.value).toBe(1);
  });

  it('deletes head', () => {
    const list = new DoublyLinkedList([1, 2]).deleteHead();

    expect(list.head.value).toBe(2);
    expect(list.head.next).toBeNull();
    expect(list.head.prev).toBeNull();
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
    const list = new DoublyLinkedList([1, 2, 3]).deleteLast();

    expect(list.last.value).toBe(2);
    expect(list.last.next).toBeNull();
    expect(list.last.prev.value).toBe(1);
    expect(String(list)).toBe('1,2');

    list.deleteLast();

    expect(list.last.value).toBe(1);
    expect(list.head).toBe(list.last);
    expect(list.last.prev).toBeNull();
    expect(list.last.next).toBeNull();

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
    const list = new DoublyLinkedList([1, 2, 3, 2, 4]).delete(2);
    const emptyList = new DoublyLinkedList().delete(1);

    expect(String(list)).toBe('1,3,4');
    expect(list.head.value).toBe(1);
    expect(list.head.next.value).toBe(3);
    expect(list.head.prev).toBeNull();
    expect(list.last.value).toBe(4);
    expect(list.last.next).toBeNull();
    expect(list.last.prev.value).toBe(3);

    list.delete(1);

    expect(list.head.value).toBe(3);
    expect(list.head.next.value).toBe(4);
    expect(list.head.prev).toBeNull();
    expect(String(list)).toBe('3,4');

    list.delete(4);

    expect(list.last.value).toBe(3);
    expect(list.last.next).toBeNull();
    expect(list.last.prev).toBeNull();
    expect(String(list)).toBe('3');

    list.delete(5);

    expect(String(list)).toBe('3');

    list.delete(3);

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();

    expect(emptyList.isEmpty()).toBe(true);
  });
});
