import HashTable, { Pair } from './HashTable';

describe('HashTable', () => {
  const pairs: Pair[] = [
    ['a', 'str'],
    ['b', 42],
    ['k', true],
    ['l', null],
  ]; // hashes are 7, 8, 7, 8

  let filledHashTable: HashTable;

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
    expect(hashTable._hash('ab')).toBe(5);
  });

  it('converts to string', () => {
    const entries: Pair[] = [
      ['key', 42],
      ['hash', 'map'],
      ['bool', true],
    ]; // hashes are 9, 0, 8
    const expected = [
      'HashTable {',
      '  hash => map',
      '  bool => true',
      '  key => 42',
      '}',
    ].join('\n');

    const emptyHashTable = new HashTable();
    const hashTable = new HashTable()
      .set(...entries[0])
      .set(...entries[1])
      .set(...entries[2]);

    expect(String(emptyHashTable)).toBe('');
    expect(String(hashTable)).toBe(expected);
  });

  it('adds new pairs and handles collisions', () => {
    const hashTable = filledHashTable;
    const expected = [
      'HashTable {',
      '  k => true',
      '  a => str',
      '  l => null',
      '  b => 42',
      '}',
    ].join('\n');

    expect(String(hashTable)).toBe(expected);
  });

  it('overwrites a value for existing key', () => {
    const hashTable = filledHashTable;
    const expected = [
      'HashTable {',
      '  k => 13',
      '  a => str',
      '  l => null',
      '  b => 42',
      '}',
    ].join('\n');

    hashTable.set('k', 13);

    expect(hashTable.get('k')).toBe(13);
    expect(String(hashTable)).toBe(expected);
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
