import { LinkedList } from './LinkedList';

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
    const list = new LinkedList(node);
    const singleNode = LinkedList.createNode('single');
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

  it.each([[[1, 2, 3]], [[1]], [[]]])('clears a list %#', (values) => {
    const list = new LinkedList(values);
    const { head, last } = list;
    const [prevHead, prevLast] = list.clear();

    expect(prevHead).toBe(head);
    expect(prevLast).toBe(last);
    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
  });

  it('prepends a value', () => {
    const list = new LinkedList([1, 2]).prepend();

    expect(String(list)).toBe('1,2');

    list.prepend(0);

    expect(list.head?.value).toBe(0);
    expect(list.head?.next?.value).toBe(1);
    expect(String(list)).toBe('0,1,2');

    list.prepend(-2, -1);

    expect(list.head?.value).toBe(-2);
    expect(list.head?.next?.value).toBe(-1);
    expect(String(list)).toBe('-2,-1,0,1,2');

    const singleValueList = new LinkedList<number>().prepend(0);

    expect(singleValueList.head?.value).toBe(0);
    expect(singleValueList.head?.next).toBeUndefined();
    expect(singleValueList.head).toBe(singleValueList.last);
    expect(String(singleValueList)).toBe('0');
  });

  it('appends a value', () => {
    const list = new LinkedList([1, 2]).append();

    expect(String(list)).toBe('1,2');

    list.append(3);

    expect(list.last?.value).toBe(3);
    expect(list.last?.next).toBeUndefined();
    expect(String(list)).toBe('1,2,3');

    list.append(4, 5);

    expect(list.last?.value).toBe(5);
    expect(list.last?.next).toBeUndefined();
    expect(String(list)).toBe('1,2,3,4,5');

    const singleValueList = new LinkedList<number>().append(0);

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

    expect(actual?.value).toBe(2);
    expect(actual?.next?.value).toBe(3);

    expect(list.find(4)).toBeUndefined();

    expect(list.find((value) => value % 2 === 0)?.value).toBe(2);
  });

  it('deletes head', () => {
    const list = new LinkedList([1, 2]);
    const deletedNode = list.deleteHead();

    expect(list.head?.value).toBe(2);
    expect(list.head?.next).toBeUndefined();
    expect(list.head).toBe(list.last);
    expect(deletedNode?.value).toBe(1);
    expect(deletedNode?.next).toBeUndefined();

    expect(list.deleteHead()?.value).toBe(2);
    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();

    expect(list.deleteHead()).toBeUndefined();
    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();
  });

  it('deletes last', () => {
    const list = new LinkedList([1, 2, 3]);
    const deletedNode = list.deleteLast();

    expect(list.last?.value).toBe(2);
    expect(list.last?.next).toBeUndefined();
    expect(String(list)).toBe('1,2');
    expect(deletedNode?.value).toBe(3);
    expect(deletedNode?.next).toBeUndefined();

    expect(list.deleteLast()?.value).toBe(2);
    expect(list.last?.value).toBe(1);
    expect(list.head).toBe(list.last);

    expect(list.deleteLast()?.value).toBe(1);
    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeUndefined();
    expect(list.last).toBeUndefined();

    expect(list.deleteLast()?.value).toBeUndefined();
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

    list.delete(0);
    expect(list.isEmpty()).toBe(true);
  });
});
