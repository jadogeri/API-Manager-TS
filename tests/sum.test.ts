// test/math.test.ts
import { sum } from './sum';

describe('sum function', () => {
  test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('adds negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  test('adds zero correctly', () => {
    expect(sum(5, 0)).toBe(5);
  });
});