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

import { DateTimeType } from '@src/fhir/data-types/primitive/DateTimeType';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

describe('DateTimeType', () => {
  const VALID_DATETIME = `2015-02-07T13:28:17-05:00`;
  const VALID_DATETIME_2 = `2017-01-01T00:00:00.000Z`;
  const INVALID_DATETIME = `invalid date time`;

  it('should be properly instantiated as empty', () => {
    const testDateTimeType = new DateTimeType();
    expect(testDateTimeType).toBeDefined();
    expect(testDateTimeType).toBeInstanceOf(DateTimeType);
    expect(testDateTimeType.constructor.name).toStrictEqual('DateTimeType');
    expect(testDateTimeType.fhirType()).toStrictEqual('dateTime');
    expect(testDateTimeType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testDateTimeType.hasId()).toBe(false);
    expect(testDateTimeType.getId()).toBeUndefined();
    expect(testDateTimeType.hasExtension()).toBe(false);
    expect(testDateTimeType.getExtension()).toBeUndefined();
    // primitive value properties
    expect(testDateTimeType.hasValue()).toBe(false);
    expect(testDateTimeType.getValue()).toBeUndefined();
    expect(testDateTimeType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testDateTimeType = new DateTimeType(VALID_DATETIME);
    expect(testDateTimeType).toBeDefined();
    expect(testDateTimeType).toBeInstanceOf(DateTimeType);
    expect(testDateTimeType.constructor.name).toStrictEqual('DateTimeType');
    expect(testDateTimeType.fhirType()).toStrictEqual('dateTime');
    expect(testDateTimeType.isEmpty()).toBe(false);

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
    expect(t).toThrow(`Invalid value (${INVALID_DATETIME}) for DateTimeType`);
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
    expect(t).toThrow(`Invalid value (${INVALID_DATETIME}) for DateTimeType`);
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
    expect(t).toThrow(`Invalid value (${INVALID_DATETIME}) for DateTimeType`);
  });

  it('should properly encode with correct values', () => {
    const testDateTimeType = new DateTimeType();
    expect(testDateTimeType.encode(VALID_DATETIME)).toStrictEqual(VALID_DATETIME);
  });

  it('should throw PrimitiveTypeError when encode() with invalid value', () => {
    const testDateTimeType = new DateTimeType();
    const t = () => {
      testDateTimeType.encode(INVALID_DATETIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATETIME}) for DateTimeType`);
  });

  it('should properly parse with correct values', () => {
    const testDateTimeType = new DateTimeType();
    expect(testDateTimeType.parse(VALID_DATETIME)).toStrictEqual(VALID_DATETIME);
  });

  it('should throw PrimitiveTypeError when parse() with invalid value', () => {
    const testDateTimeType = new DateTimeType();
    const t = () => {
      testDateTimeType.parse(INVALID_DATETIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATETIME}) for DateTimeType`);
  });

  it('should properly copy()', () => {
    const uriType = new DateTimeType(VALID_DATETIME);
    const testDateTimeType = uriType.copy();
    expect(testDateTimeType).toBeDefined();
    expect(testDateTimeType).toBeInstanceOf(DateTimeType);
    expect(testDateTimeType.constructor.name).toStrictEqual('DateTimeType');
    expect(testDateTimeType.fhirType()).toStrictEqual('dateTime');
    expect(testDateTimeType.isEmpty()).toBe(false);
    expect(testDateTimeType.hasValue()).toBe(true);
    expect(testDateTimeType.getValue()).toBeDefined();
    expect(testDateTimeType.getValue()).toStrictEqual(VALID_DATETIME);
    expect(testDateTimeType.getValueAsString()).toStrictEqual(VALID_DATETIME);
  });
});
