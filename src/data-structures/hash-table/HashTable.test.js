import LinkedList from '../linked-list/LinkedList.js';
import HashTable from './HashTable.js';

describe('HashTable', () => {
  /** @type {[string, *][]} */
  const pairs = [
    ['a', 'str'],
    ['b', 42],
    ['k', true],
    ['l', null],
  ];

  /** @type {HashTable} */
  let filledHashTable;

  beforeEach(() => {
    filledHashTable = new HashTable()
      .set(...pairs[0])
      .set(...pairs[1])
      .set(...pairs[2])
      .set(...pairs[3]);
  });

  it('generates proper hashes for keys', () => {
    const hashTable = new HashTable();

    expect(hashTable._hash('a')).toBe(7);
    expect(hashTable._hash('b')).toBe(8);
    expect(hashTable._hash('k')).toBe(7);
    expect(hashTable._hash('l')).toBe(8);
  });

  it('converts to string', () => {
    /** @type {[string, *][]} */
    const entries = [
      ['key', 42],
      ['hash', 'map'],
      ['bool', true],
    ];
    const expected = [
      'HashTable {',
      '  key => 42',
      '  hash => map',
      '  bool => true',
      '}',
    ].join('\n');

    const emptyHashTable = new HashTable();
    const hashTable = new HashTable();
    hashTable._buckets = entries.map((entry) => new LinkedList([entry]));

    expect(String(emptyHashTable)).toBe('');
    expect(String(hashTable)).toBe(expected);
  });

  describe('adds new pairs and handles collisions', () => {
    test.each(pairs)('case %#', (key, value) => {
      const hashTable = filledHashTable;
      const index = hashTable._hash(key);
      const node = hashTable._buckets[index].find(
        ([savedKey]) => savedKey === key,
      );

      expect(node).not.toBeNull();
      expect(node.value).toEqual([key, value]);
    });
  });

  it('overwrites a value for existing key', () => {
    const hashTable = filledHashTable;
    const index = hashTable._hash('k');
    const { head } = hashTable._buckets[index];

    expect(head.value).toEqual(['k', true]);

    hashTable.set('k', 13);
    const headAfterSet = hashTable._buckets[index].head;

    expect(headAfterSet).toBe(head);
    expect(head.value).toEqual(['k', 13]);
  });

  it('returns a value for a given key', () => {
    const hashTable = filledHashTable;

    expect(hashTable.get('a')).toBe('str');
    expect(hashTable.get('b')).toBe(42);
    expect(hashTable.get('c')).toBeUndefined();
    expect(hashTable.get('l')).toBeNull();
  });

  it('checks if contains a given key', () => {
    const hashTable = filledHashTable;

    expect(hashTable.has('a')).toBe(true);
    expect(hashTable.has('b')).toBe(true);
    expect(hashTable.has('c')).toBe(false);
  });

  it('deletes pairs', () => {
    const hashTable = filledHashTable;
    hashTable.delete('a').delete('l');

    expect(hashTable.has('a')).toBe(false);
    expect(hashTable.has('b')).toBe(true);
    expect(hashTable.has('k')).toBe(true);
    expect(hashTable.has('l')).toBe(false);
  });
});
