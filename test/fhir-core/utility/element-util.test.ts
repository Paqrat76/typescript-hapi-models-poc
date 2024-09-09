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
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { fhirUrl } from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty, validateUrl } from '@src/fhir-core/utility/element-util';

describe('element-util', () => {
  describe('isElementEmpty', () => {
    const TEST_UNDEFINED = undefined;
    const TEST_NULL = null;
    const TEST_BOOLEAN_TYPE_UNDEF = new BooleanType();
    const TEST_DATETIME_TYPE_UNDEF = new DateTimeType();
    const TEST_STRING_TYPE_UNDEF = new StringType();
    const TEST_URI_TYPE_UNDEF = new UriType();
    const TEST_URI_TYPE_UNDEF_ARRAY = [new UriType()];

    const TEST_BOOLEAN_TYPE = new BooleanType(true);
    const TEST_DATETIME_TYPE = new DateTimeType('2024-07-03');
    const TEST_STRING_TYPE = new StringType('stringValue');
    const TEST_URI_TYPE = new UriType('uriValue');
    const TEST_URI_TYPE_ARRAY = [new UriType('uriValue')];

    it('should return true for no elements', () => {
      let result = isElementEmpty(TEST_UNDEFINED);
      expect(result).toBe(true);

      result = isElementEmpty(TEST_NULL);
      expect(result).toBe(true);

      result = isElementEmpty([]);
      expect(result).toBe(true);
    });

    it('should return true for all undefined/null types', () => {
      let result = isElementEmpty(TEST_BOOLEAN_TYPE_UNDEF);
      expect(result).toBe(true);
      result = isElementEmpty(TEST_BOOLEAN_TYPE_UNDEF, TEST_DATETIME_TYPE_UNDEF);
      expect(result).toBe(true);
      result = isElementEmpty(TEST_BOOLEAN_TYPE_UNDEF, TEST_DATETIME_TYPE_UNDEF, TEST_STRING_TYPE_UNDEF);
      expect(result).toBe(true);
      result = isElementEmpty(
        TEST_BOOLEAN_TYPE_UNDEF,
        TEST_DATETIME_TYPE_UNDEF,
        TEST_STRING_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF,
      );
      expect(result).toBe(true);
      result = isElementEmpty(
        TEST_BOOLEAN_TYPE_UNDEF,
        TEST_DATETIME_TYPE_UNDEF,
        TEST_STRING_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF_ARRAY,
      );
      expect(result).toBe(true);
      result = isElementEmpty(
        TEST_BOOLEAN_TYPE_UNDEF,
        TEST_DATETIME_TYPE_UNDEF,
        TEST_STRING_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF_ARRAY,
        TEST_NULL,
      );
      expect(result).toBe(true);
    });

    it('should return false for at least one defined types', () => {
      const result = isElementEmpty(
        TEST_BOOLEAN_TYPE_UNDEF,
        TEST_DATETIME_TYPE_UNDEF,
        TEST_STRING_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF,
        TEST_URI_TYPE_UNDEF_ARRAY,
        TEST_NULL,
        TEST_STRING_TYPE,
      );
      expect(result).toBe(false);
    });

    it('should return false for all non-empty types', () => {
      let result = isElementEmpty(TEST_BOOLEAN_TYPE);
      expect(result).toBe(false);
      result = isElementEmpty(TEST_BOOLEAN_TYPE, TEST_DATETIME_TYPE);
      expect(result).toBe(false);
      result = isElementEmpty(TEST_BOOLEAN_TYPE, TEST_DATETIME_TYPE, TEST_STRING_TYPE);
      expect(result).toBe(false);
      result = isElementEmpty(TEST_BOOLEAN_TYPE, TEST_DATETIME_TYPE, TEST_STRING_TYPE, TEST_URI_TYPE);
      expect(result).toBe(false);
      result = isElementEmpty(
        TEST_BOOLEAN_TYPE,
        TEST_DATETIME_TYPE,
        TEST_STRING_TYPE,
        TEST_URI_TYPE,
        TEST_URI_TYPE_ARRAY,
      );
      expect(result).toBe(false);
    });

    it('should return false for array of non-empty types', () => {
      const result = isElementEmpty(TEST_URI_TYPE_ARRAY);
      expect(result).toBe(false);
    });
  });

  describe('validateUrl', () => {
    const VALID_URL = `testUrlType` as fhirUrl;
    const INVALID_URL = ' invalid Url ' as fhirUrl;
    const UNDEFINED_URL = undefined;

    it('should not throw errors for valid url', () => {
      validateUrl(VALID_URL);
      const t = () => {
        validateUrl(VALID_URL);
      };
      expect(t).not.toThrow();
    });

    it('should throw AssertionError for invalid URL', () => {
      const t = () => {
        validateUrl(INVALID_URL);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`The url must be a valid fhirUri`);
    });

    it('should throw AssertionError for undefined URL', () => {
      const t = () => {
        // @ts-expect-error: allow for testing
        validateUrl(UNDEFINED_URL);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`The url must be defined and cannot be blank`);
    });
  });
});
