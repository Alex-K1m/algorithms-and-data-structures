import LinkedList from '../linked-list/LinkedList.js';
import HashTable from './HashTable.js';

describe('HashTable', () => {
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
    const hashTable = new HashTable(entries);
    hashTable._buckets = entries.map((entry) => new LinkedList([entry]));

    expect(String(emptyHashTable)).toBe('');
    expect(String(hashTable)).toBe(expected);
  });

  it.todo('creates a hash table from array of key-value pairs');
  it.todo('adds new pairs');
  it.todo('overwrites a value for existing key');
  it.todo('returns a value for a given key');
  it.todo('checks it contains a given key');
  it.todo('deletes pairs');
  it.todo('returns a list of all keys/values/entries?');
  it.todo('collisions');
});
