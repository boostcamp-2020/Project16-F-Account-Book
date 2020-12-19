import * as ValidatorCore from '.';

describe('Validator Core Tests', () => {
  it('isNumber() tests', () => {
    expect(ValidatorCore.isNumber('2020')).toBe(true);
    expect(ValidatorCore.isNumber(2020)).toBe(true);
    expect(ValidatorCore.isNumber(0)).toBe(true);
    expect(ValidatorCore.isNumber('string1')).toBe(false);
    expect(ValidatorCore.isNumber(null)).toBe(false);
    expect(ValidatorCore.isNumber(undefined)).toBe(false);
  });

  it('notNull() tests', () => {
    expect(ValidatorCore.notNull('2020')).toBe(true);
    expect(ValidatorCore.notNull(2020)).toBe(true);
    expect(ValidatorCore.notNull('string')).toBe(true);
    expect(ValidatorCore.notNull(0)).toBe(true);
    expect(ValidatorCore.notNull(null)).toBe(false);
    expect(ValidatorCore.notNull(undefined)).toBe(false);
  });

  it('nonZero() tests', () => {
    expect(ValidatorCore.nonZero('2020')).toBe(true);
    expect(ValidatorCore.nonZero(2020)).toBe(true);
    expect(ValidatorCore.nonZero(0)).toBe(false);
    expect(ValidatorCore.nonZero('string')).toBe(false);
    expect(ValidatorCore.nonZero(null)).toBe(false);
    expect(ValidatorCore.nonZero(undefined)).toBe(false);
  });

  it('isDateString() tests', () => {
    expect(ValidatorCore.isDateString('2020-12-31')).toBe(true);
    expect(ValidatorCore.isDateString('2020-1-1')).toBe(true);
    expect(ValidatorCore.isDateString('202-1-1')).toBe(false);
    expect(ValidatorCore.isDateString('2020-13-31')).toBe(false);
    expect(ValidatorCore.isDateString('string')).toBe(false);
    expect(ValidatorCore.isDateString('string-string-string')).toBe(false);
    expect(ValidatorCore.isDateString(undefined)).toBe(false);
  });

  it('isBoolean() tests', () => {
    expect(ValidatorCore.isBoolean(true)).toBe(true);
    expect(ValidatorCore.isBoolean(false)).toBe(true);
    expect(ValidatorCore.isBoolean('true')).toBe(true);
    expect(ValidatorCore.isBoolean('false')).toBe(true);
    expect(ValidatorCore.isBoolean(1)).toBe(false);
    expect(ValidatorCore.isBoolean(0)).toBe(false);
    expect(ValidatorCore.isBoolean('string')).toBe(false);
    expect(ValidatorCore.isBoolean(null)).toBe(false);
    expect(ValidatorCore.isBoolean(undefined)).toBe(false);
  });
});
