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

import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { DateTime } from 'luxon';

describe('DateTimeType', () => {
  const VALID_DATETIME = `2015-02-07T13:28:17.239+02:00`;
  const VALID_DATETIME_UTC = `2015-02-07T11:28:17.239Z`;
  const VALID_DATETIME_2 = `2017-01-01T00:00:00.000Z`;
  const INVALID_DATETIME = `invalid date time`;

  describe('PrimitiveType<fhirDateTime>', () => {
    it('should be properly instantiated as empty', () => {
      const testDateTimeType = new DateTimeType();
      expect(testDateTimeType).toBeDefined();
      expect(testDateTimeType).toBeInstanceOf(DateTimeType);
      expect(testDateTimeType).toBeInstanceOf(PrimitiveType);
      expect(testDateTimeType.constructor.name).toStrictEqual('DateTimeType');
      expect(testDateTimeType.fhirType()).toStrictEqual('dateTime');
      expect(testDateTimeType.isEmpty()).toBe(true);
      expect(testDateTimeType.isPrimitive()).toBe(true);
      expect(testDateTimeType.isDateTimePrimitive()).toBe(true);
      expect(testDateTimeType.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testDateTimeType.hasId()).toBe(false);
      expect(testDateTimeType.getId()).toBeUndefined();
      expect(testDateTimeType.hasExtension()).toBe(false);
      expect(testDateTimeType.getExtension()).toEqual([] as Extension[]);
      // primitive value properties
      expect(testDateTimeType.hasValue()).toBe(false);
      expect(testDateTimeType.getValue()).toBeUndefined();
      expect(testDateTimeType.getValueAsString()).toBeUndefined();
    });

    it('should be properly initialized', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      const testId = 'id1234';
      testDateTimeType.setId(testId);
      const testExtension = new Extension('testUrl', new StringType('extension string value'));
      testDateTimeType.addExtension(testExtension);

      expect(testDateTimeType).toBeDefined();
      expect(testDateTimeType).toBeInstanceOf(DateTimeType);
      expect(testDateTimeType.constructor.name).toStrictEqual('DateTimeType');
      expect(testDateTimeType.fhirType()).toStrictEqual('dateTime');
      expect(testDateTimeType.isEmpty()).toBe(false);
      expect(testDateTimeType.isPrimitive()).toBe(true);
      expect(testDateTimeType.isDateTimePrimitive()).toBe(true);
      expect(testDateTimeType.toJSON()).toStrictEqual(VALID_DATETIME);
      expect(testDateTimeType.toSiblingJSON()).toEqual({
        id: 'id1234',
        extension: [
          {
            url: 'testUrl',
            valueString: 'extension string value',
          },
        ],
      });

      // inherited properties from Element
      expect(testDateTimeType.hasId()).toBe(true);
      expect(testDateTimeType.getId()).toStrictEqual(testId);
      expect(testDateTimeType.hasExtension()).toBe(true);
      expect(testDateTimeType.getExtension()).toEqual([testExtension]);
      // primitive value properties
      expect(testDateTimeType.hasValue()).toBe(true);
      expect(testDateTimeType.getValue()).toBeDefined();
      expect(testDateTimeType.getValue()).toStrictEqual(VALID_DATETIME);
      expect(testDateTimeType.getValueAsString()).toStrictEqual(VALID_DATETIME);
    });

    it('should throw PrimitiveTypeError when initialized with invalid value', () => {
      const t = () => {
        new DateTimeType(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateTimeType (${INVALID_DATETIME})`);
    });

    it('should be properly reset by setValue()', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      expect(testDateTimeType.isEmpty()).toBe(false);
      expect(testDateTimeType.hasValue()).toBe(true);
      expect(testDateTimeType.getValue()).toBeDefined();
      expect(testDateTimeType.getValue()).toStrictEqual(VALID_DATETIME);
      expect(testDateTimeType.getValueAsString()).toStrictEqual(VALID_DATETIME);

      testDateTimeType.setValue(VALID_DATETIME_2);
      expect(testDateTimeType.isEmpty()).toBe(false);
      expect(testDateTimeType.hasValue()).toBe(true);
      expect(testDateTimeType.getValue()).toBeDefined();
      expect(testDateTimeType.getValue()).toStrictEqual(VALID_DATETIME_2);
      expect(testDateTimeType.getValueAsString()).toStrictEqual(VALID_DATETIME_2);

      testDateTimeType.setValue();
      expect(testDateTimeType.isEmpty()).toBe(true);
      expect(testDateTimeType.hasValue()).toBe(false);
      expect(testDateTimeType.getValue()).toBeUndefined();
      expect(testDateTimeType.getValueAsString()).toBeUndefined();
    });

    it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      const t = () => {
        testDateTimeType.setValue(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateTimeType (${INVALID_DATETIME})`);
    });

    it('should properly setValueAsString() with correct values', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      testDateTimeType.setValueAsString(VALID_DATETIME_2);
      expect(testDateTimeType.getValue()).toStrictEqual(VALID_DATETIME_2);
      testDateTimeType.setValueAsString();
      expect(testDateTimeType.getValue()).toBeUndefined();
    });

    it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
      const testDateTimeType = new DateTimeType();
      const t = () => {
        testDateTimeType.setValueAsString(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateTimeType (${INVALID_DATETIME})`);
    });

    it('should properly encodeToString with correct values', () => {
      const testDateTimeType = new DateTimeType();
      expect(testDateTimeType.encodeToString(VALID_DATETIME)).toStrictEqual(VALID_DATETIME);
    });

    it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
      const testDateTimeType = new DateTimeType();
      const t = () => {
        testDateTimeType.encodeToString(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateTimeType (${INVALID_DATETIME})`);
    });

    it('should properly parseToPrimitive with correct values', () => {
      const testDateTimeType = new DateTimeType();
      expect(testDateTimeType.parseToPrimitive(VALID_DATETIME)).toStrictEqual(VALID_DATETIME);
    });

    it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
      const testDateTimeType = new DateTimeType();
      const t = () => {
        testDateTimeType.parseToPrimitive(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateTimeType (${INVALID_DATETIME})`);
    });

    it('should properly copy()', () => {
      const dateTimeType = new DateTimeType(VALID_DATETIME);
      const testDateTimeType = dateTimeType.copy();
      expect(testDateTimeType).toBeDefined();
      expect(testDateTimeType).toBeInstanceOf(DateTimeType);
      expect(testDateTimeType.constructor.name).toStrictEqual('DateTimeType');
      expect(testDateTimeType.fhirType()).toStrictEqual('dateTime');
      expect(testDateTimeType.isEmpty()).toBe(false);
      expect(testDateTimeType.isPrimitive()).toBe(true);
      expect(testDateTimeType.isDateTimePrimitive()).toBe(true);
      expect(testDateTimeType.toJSON()).toStrictEqual(VALID_DATETIME);
      expect(testDateTimeType.hasValue()).toBe(true);
      expect(testDateTimeType.getValue()).toBeDefined();
      expect(testDateTimeType.getValue()).toStrictEqual(VALID_DATETIME);
      expect(testDateTimeType.getValueAsString()).toStrictEqual(VALID_DATETIME);
    });
  });

  describe('DateTimeTypeImpl', () => {
    it('should return undefined from getValueAsDateTime when instantiated as empty', () => {
      const testDateTimeType = new DateTimeType();
      const dtObj = testDateTimeType.getValueAsDateTime();
      expect(dtObj).toBeUndefined();
    });

    it('should return valid DateTime object from getValueAsDateTime when instantiated with valid ISO 8601 string', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      const dtObj = testDateTimeType.getValueAsDateTime({ zone: 'utc' });
      expect(dtObj).toBeDefined();
      expect(dtObj?.isValid).toBe(true);
      expect(dtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);
    });

    it('should return undefined from getValueAsDateTimeUTC when instantiated as empty', () => {
      const testDateTimeType = new DateTimeType();
      const dtObj = testDateTimeType.getValueAsDateTimeUTC();
      expect(dtObj).toBeUndefined();
    });

    it('should return valid DateTime object from getValueAsDateTimeUTC when instantiated with valid ISO 8601 string', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      const dtObj = testDateTimeType.getValueAsDateTimeUTC();
      expect(dtObj).toBeDefined();
      expect(dtObj?.isValid).toBe(true);
      expect(dtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);
    });

    it('should properly setValueAsYear with a undefined', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      testDateTimeType.setValueAsYear(undefined);
      expect(testDateTimeType.getValue()).toBeUndefined();
    });

    it('should properly setValueAsYear with a valid DataTime object', () => {
      const sourceInstantType = new DateTimeType(VALID_DATETIME);
      const testDtObj: DateTime | undefined = sourceInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(testDtObj).toBeDefined();
      expect(testDtObj?.isValid).toBe(true);
      expect(testDtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);

      const testDateTimeType = new DateTimeType();
      testDateTimeType.setValueAsYear(testDtObj);
      expect(testDateTimeType.getValue()).toStrictEqual('2015');
    });

    it('should properly setValueAsYearMonth with a undefined', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      testDateTimeType.setValueAsYearMonth(undefined);
      expect(testDateTimeType.getValue()).toBeUndefined();
    });

    it('should properly setValueAsYearMonth with a valid DataTime object', () => {
      const sourceInstantType = new DateTimeType(VALID_DATETIME);
      const testDtObj: DateTime | undefined = sourceInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(testDtObj).toBeDefined();
      expect(testDtObj?.isValid).toBe(true);
      expect(testDtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);

      const testDateTimeType = new DateTimeType();
      testDateTimeType.setValueAsYearMonth(testDtObj);
      expect(testDateTimeType.getValue()).toStrictEqual('2015-02');
    });

    it('should properly setValueAsDateOnly with a undefined', () => {
      const testDateTimeType = new DateTimeType(VALID_DATETIME);
      testDateTimeType.setValueAsDateOnly(undefined);
      expect(testDateTimeType.getValue()).toBeUndefined();
    });

    it('should properly setValueAsDateOnly with a valid DataTime object', () => {
      const sourceInstantType = new DateTimeType(VALID_DATETIME);
      const testDtObj: DateTime | undefined = sourceInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(testDtObj).toBeDefined();
      expect(testDtObj?.isValid).toBe(true);
      expect(testDtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);

      const testDateTimeType = new DateTimeType();
      testDateTimeType.setValueAsDateOnly(testDtObj);
      expect(testDateTimeType.getValue()).toStrictEqual('2015-02-07');
    });

    it('should properly setValueAsDateTime with a undefined', () => {
      const testInstantType = new DateTimeType(VALID_DATETIME);
      testInstantType.setValueAsDateTime(undefined);
      expect(testInstantType.getValue()).toBeUndefined();
    });

    it('should properly setValueAsDateTime with a valid DataTime object', () => {
      const sourceInstantType = new DateTimeType(VALID_DATETIME);
      const testDtObj: DateTime | undefined = sourceInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(testDtObj).toBeDefined();
      expect(testDtObj?.isValid).toBe(true);
      expect(testDtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);

      const testInstantType = new DateTimeType();
      testInstantType.setValueAsDateTime(testDtObj);
      expect(testInstantType.getValue()).toStrictEqual(VALID_DATETIME_UTC);
    });

    it('should properly setValueAsInstant with a undefined', () => {
      const testInstantType = new DateTimeType(VALID_DATETIME);
      testInstantType.setValueAsInstant(undefined);
      expect(testInstantType.getValue()).toBeUndefined();
    });

    it('should properly setValueAsInstant with a valid DataTime object', () => {
      const sourceInstantType = new DateTimeType(VALID_DATETIME);
      const testDtObj: DateTime | undefined = sourceInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(testDtObj).toBeDefined();
      expect(testDtObj?.isValid).toBe(true);
      expect(testDtObj?.toISO()).toStrictEqual(VALID_DATETIME_UTC);

      const testInstantType = new DateTimeType();
      testInstantType.setValueAsInstant(testDtObj);
      expect(testInstantType.getValue()).toStrictEqual(VALID_DATETIME_UTC);
    });
  });
});
