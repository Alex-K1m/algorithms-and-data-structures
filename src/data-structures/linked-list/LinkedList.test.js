import LinkedList from './LinkedList.js';

describe('LinkedList', () => {
  it('creates a list from array', () => {
    const items = [1, 'str', true];
    const list = new LinkedList(items);

    expect(list.isEmpty()).toBe(false);
    expect(list.head.value).toBe(1);
    expect(list.last.value).toBe(true);
    expect(String(list)).toBe(String(items));
  });

  it('creates an empty list', () => {
    const list = new LinkedList();

    expect(list.isEmpty()).toBe(true);
    expect(list.head).toBeNull();
    expect(list.last).toBeNull();
    expect(String(list)).toBe('');
  });

  it.todo('creates a list from node');
  it.todo('delete');
  it.todo('delete head');
  it.todo('delete tail');
  it.todo('find');
  it.todo('edge cases when a list is empty');
});
