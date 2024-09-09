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

import { DateType } from '@src/fhir-core/data-types/primitive/DateType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('DateType', () => {
  const VALID_DATE = `2015-02-07`;
  const VALID_DATE_2 = `2017-01-01`;
  const INVALID_DATE = `invalid date`;

  it('should be properly instantiated as empty', () => {
    const testDateType = new DateType();
    expect(testDateType).toBeDefined();
    expect(testDateType).toBeInstanceOf(DateType);
    expect(testDateType).toBeInstanceOf(PrimitiveType);
    expect(testDateType.constructor.name).toStrictEqual('DateType');
    expect(testDateType.fhirType()).toStrictEqual('date');
    expect(testDateType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testDateType.hasId()).toBe(false);
    expect(testDateType.getId()).toBeUndefined();
    expect(testDateType.hasExtension()).toBe(false);
    expect(testDateType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testDateType.hasValue()).toBe(false);
    expect(testDateType.getValue()).toBeUndefined();
    expect(testDateType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testDateType = new DateType(VALID_DATE);
    expect(testDateType).toBeDefined();
    expect(testDateType).toBeInstanceOf(DateType);
    expect(testDateType.constructor.name).toStrictEqual('DateType');
    expect(testDateType.fhirType()).toStrictEqual('date');
    expect(testDateType.isEmpty()).toBe(false);

    expect(testDateType.hasValue()).toBe(true);
    expect(testDateType.getValue()).toBeDefined();
    expect(testDateType.getValue()).toStrictEqual(VALID_DATE);
    expect(testDateType.getValueAsString()).toStrictEqual(VALID_DATE);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new DateType(INVALID_DATE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATE}) for DateType`);
  });

  it('should be properly reset by setValue()', () => {
    const testDateType = new DateType(VALID_DATE);
    expect(testDateType.isEmpty()).toBe(false);
    expect(testDateType.hasValue()).toBe(true);
    expect(testDateType.getValue()).toBeDefined();
    expect(testDateType.getValue()).toStrictEqual(VALID_DATE);
    expect(testDateType.getValueAsString()).toStrictEqual(VALID_DATE);

    testDateType.setValue(VALID_DATE_2);
    expect(testDateType.isEmpty()).toBe(false);
    expect(testDateType.hasValue()).toBe(true);
    expect(testDateType.getValue()).toBeDefined();
    expect(testDateType.getValue()).toStrictEqual(VALID_DATE_2);
    expect(testDateType.getValueAsString()).toStrictEqual(VALID_DATE_2);

    testDateType.setValue();
    expect(testDateType.isEmpty()).toBe(true);
    expect(testDateType.hasValue()).toBe(false);
    expect(testDateType.getValue()).toBeUndefined();
    expect(testDateType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testDateType = new DateType(VALID_DATE);
    const t = () => {
      testDateType.setValue(INVALID_DATE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATE}) for DateType`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testDateType = new DateType(VALID_DATE);
    testDateType.setValueAsString(VALID_DATE_2);
    expect(testDateType.getValue()).toStrictEqual(VALID_DATE_2);
    testDateType.setValueAsString();
    expect(testDateType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testDateType = new DateType();
    const t = () => {
      testDateType.setValueAsString(INVALID_DATE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATE}) for DateType`);
  });

  it('should properly encode with correct values', () => {
    const testDateType = new DateType();
    expect(testDateType.encode(VALID_DATE)).toStrictEqual(VALID_DATE);
  });

  it('should throw PrimitiveTypeError when encode() with invalid value', () => {
    const testDateType = new DateType();
    const t = () => {
      testDateType.encode(INVALID_DATE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATE}) for DateType`);
  });

  it('should properly parse with correct values', () => {
    const testDateType = new DateType();
    expect(testDateType.parse(VALID_DATE)).toStrictEqual(VALID_DATE);
  });

  it('should throw PrimitiveTypeError when parse() with invalid value', () => {
    const testDateType = new DateType();
    const t = () => {
      testDateType.parse(INVALID_DATE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_DATE}) for DateType`);
  });

  it('should properly copy()', () => {
    const dateType = new DateType(VALID_DATE);
    const testDateType = dateType.copy();
    expect(testDateType).toBeDefined();
    expect(testDateType).toBeInstanceOf(DateType);
    expect(testDateType.constructor.name).toStrictEqual('DateType');
    expect(testDateType.fhirType()).toStrictEqual('date');
    expect(testDateType.isEmpty()).toBe(false);
    expect(testDateType.hasValue()).toBe(true);
    expect(testDateType.getValue()).toBeDefined();
    expect(testDateType.getValue()).toStrictEqual(VALID_DATE);
    expect(testDateType.getValueAsString()).toStrictEqual(VALID_DATE);
  });
});
