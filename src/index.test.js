import greet from './index.js';

test('dummmy test', () => {
  expect(greet()).toBe('Hello world!');
  expect(greet('Alex')).toBe('Hello Alex!');
});
