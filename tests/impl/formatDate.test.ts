import {expect, describe, it} from 'vitest'
import {formatDate} from "../../src/composables/formatDate";


describe('formatDate Unit Tests', () => {
  it('formatDate formats date correctly', () => {
    const date1 = '2022-12-31';
    const expected1 = '12.31.2022';
    const result1 = formatDate(date1)

    const date2 = '2024-01-01'
    const expected2 = '01.01.2024';
    const result2 = formatDate(date2);

    expect(result1).toBe(expected1);
    expect(result2).toBe(expected2);
  });

  it('formatDate returns empty string for invalid date', () => {
    const invalidDate = 'invalid-date';
    const result = formatDate(invalidDate);
    expect(result).toBe('');
  })
});
