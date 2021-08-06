import LinkedList from './LinkedList.js';

describe('LinkedList', () => {
  it('creates a list', () => {
    const items = [1, 'str', true];
    const list = new LinkedList(items);

    expect(list.isEmpty()).toBe(false);
    expect(list.getHead().getValue()).toBe(1);
    expect(list.getLast().getValue()).toBe(true);
    expect(String(list)).toBe(String(items));
  });

  it('creates an empty list', () => {
    const list = new LinkedList();

    expect(list.isEmpty()).toBe(true);
    expect(list.getHead()).toBeNull();
    expect(list.getLast()).toBeNull();
    expect(String(list)).toBe('');
  });

  it.todo('prepend');
  it.todo('append');
  it.todo('delete');
  it.todo('delete head');
  it.todo('delete tail');
  it.todo('find');
  it.todo('iterable');
});
