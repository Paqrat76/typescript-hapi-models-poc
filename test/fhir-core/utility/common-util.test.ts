/*
 * Copyright (c) 2024. Joe Paquette
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { AssertionError } from 'node:assert';
import { isBlank, isEmpty, isNonBlank, lowerFirst, upperFirst } from '@src/fhir-core/utility/common-util';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

describe('common-util', () => {
  const TEST_UNDEFINED = undefined;
  const TEST_NULL = null;
  const TEST_EMPTY = '';
  const TEST_BLANK = '   ';

  describe('isBlank', () => {
    it('should return true', () => {
      expect(isBlank(TEST_UNDEFINED)).toBe(true);
      expect(isBlank(TEST_NULL)).toBe(true);
      expect(isBlank(TEST_EMPTY)).toBe(true);
      expect(isBlank(TEST_BLANK)).toBe(true);
      expect(isBlank('\n')).toBe(true);
      expect(isBlank('\t')).toBe(true);
      expect(isBlank('\r\t')).toBe(true);
    });

    it('should return false', () => {
      expect(isBlank('non-blank string')).toBe(false);
      expect(isBlank('  non-blank string  ')).toBe(false);
    });
  });

  describe('isNonBlank', () => {
    it('should return true', () => {
      expect(isNonBlank('non-blank string')).toBe(true);
      expect(isNonBlank('  non-blank string  ')).toBe(true);
    });

    it('should return false', () => {
      expect(isNonBlank(TEST_UNDEFINED)).toBe(false);
      expect(isNonBlank(TEST_NULL)).toBe(false);
      expect(isNonBlank(TEST_EMPTY)).toBe(false);
      expect(isNonBlank(TEST_BLANK)).toBe(false);
      expect(isNonBlank('\n')).toBe(false);
      expect(isNonBlank('\t')).toBe(false);
      expect(isNonBlank('\r\t')).toBe(false);
    });
  });

  describe('upperFirst', () => {
    it('should throw errors for invalid arguments', () => {
      let t = () => {
        // @ts-expect-error: allow for testing
        upperFirst(TEST_UNDEFINED);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided value is undefined/null`);

      t = () => {
        // @ts-expect-error: allow for testing
        upperFirst(TEST_NULL);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided value is undefined/null`);

      t = () => {
        // @ts-expect-error: allow for testing
        upperFirst(123);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided value is not a string`);
    });

    it('should return expected upperFirst values', () => {
      expect(upperFirst('ABCDE')).toStrictEqual('ABCDE');
      expect(upperFirst('abcde')).toStrictEqual('Abcde');
      expect(upperFirst('1bcde')).toStrictEqual('1bcde');
    });
  });

  describe('lowerFirst', () => {
    it('should throw errors for invalid arguments', () => {
      let t = () => {
        // @ts-expect-error: allow for testing
        lowerFirst(TEST_UNDEFINED);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided value is undefined/null`);

      t = () => {
        // @ts-expect-error: allow for testing
        lowerFirst(TEST_NULL);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Provided value is undefined/null`);

      t = () => {
        // @ts-expect-error: allow for testing
        lowerFirst(123);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided value is not a string`);
    });

    it('should return expected upperFirst values', () => {
      expect(lowerFirst('ABCDE')).toStrictEqual('aBCDE');
      expect(lowerFirst('abcde')).toStrictEqual('abcde');
      expect(lowerFirst('1bcde')).toStrictEqual('1bcde');
    });
  });

  describe('isEmpty', () => {
    it('should return true', () => {
      expect(isEmpty(TEST_UNDEFINED)).toBe(true);
      expect(isEmpty(TEST_NULL)).toBe(true);
      expect(isEmpty([])).toBe(true);
      // eslint-disable-next-line @typescript-eslint/no-array-constructor
      expect(isEmpty(new Array())).toBe(true);
      expect(isEmpty(TEST_EMPTY)).toBe(true);
      expect(isEmpty(new Set())).toBe(true);
      expect(isEmpty(new Map())).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty(new StringType())).toBe(true);
    });

    it('should return false', () => {
      expect(isEmpty([1, 2, 3])).toBe(false);
      expect(isEmpty(TEST_BLANK)).toBe(false);
      expect(isEmpty('ABCDE')).toBe(false);
      expect(isEmpty(new Set(['ABCDE']))).toBe(false);
      expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
      expect(isEmpty(new StringType('ABCDE'))).toBe(false);

      expect(isEmpty(true)).toBe(false);
      expect(isEmpty(false)).toBe(false);
      expect(isEmpty(123)).toBe(false);
      expect(isEmpty(123.456)).toBe(false);
      expect(isEmpty(123n)).toBe(false);
      expect(isEmpty(BigInt(123))).toBe(false);
    });
  });
});
