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

import { TimeType } from '@src/fhir-core/data-types/primitive/TimeType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('TimeType', () => {
  const VALID_TIME = `13:28:17`;
  const VALID_TIME_2 = `00:00:00`;
  const INVALID_TIME = `invalid time`;

  it('should be properly instantiated as empty', () => {
    const testTimeType = new TimeType();
    expect(testTimeType).toBeDefined();
    expect(testTimeType).toBeInstanceOf(TimeType);
    expect(testTimeType).toBeInstanceOf(PrimitiveType);
    expect(testTimeType.constructor.name).toStrictEqual('TimeType');
    expect(testTimeType.fhirType()).toStrictEqual('time');
    expect(testTimeType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testTimeType.hasId()).toBe(false);
    expect(testTimeType.getId()).toBeUndefined();
    expect(testTimeType.hasExtension()).toBe(false);
    expect(testTimeType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testTimeType.hasValue()).toBe(false);
    expect(testTimeType.getValue()).toBeUndefined();
    expect(testTimeType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testTimeType = new TimeType(VALID_TIME);
    expect(testTimeType).toBeDefined();
    expect(testTimeType).toBeInstanceOf(TimeType);
    expect(testTimeType.constructor.name).toStrictEqual('TimeType');
    expect(testTimeType.fhirType()).toStrictEqual('time');
    expect(testTimeType.isEmpty()).toBe(false);

    expect(testTimeType.hasValue()).toBe(true);
    expect(testTimeType.getValue()).toBeDefined();
    expect(testTimeType.getValue()).toStrictEqual(VALID_TIME);
    expect(testTimeType.getValueAsString()).toStrictEqual(VALID_TIME);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new TimeType(INVALID_TIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_TIME}) for TimeType`);
  });

  it('should be properly reset by setValue()', () => {
    const testTimeType = new TimeType(VALID_TIME);
    expect(testTimeType.isEmpty()).toBe(false);
    expect(testTimeType.hasValue()).toBe(true);
    expect(testTimeType.getValue()).toBeDefined();
    expect(testTimeType.getValue()).toStrictEqual(VALID_TIME);
    expect(testTimeType.getValueAsString()).toStrictEqual(VALID_TIME);

    testTimeType.setValue(VALID_TIME_2);
    expect(testTimeType.isEmpty()).toBe(false);
    expect(testTimeType.hasValue()).toBe(true);
    expect(testTimeType.getValue()).toBeDefined();
    expect(testTimeType.getValue()).toStrictEqual(VALID_TIME_2);
    expect(testTimeType.getValueAsString()).toStrictEqual(VALID_TIME_2);

    testTimeType.setValue();
    expect(testTimeType.isEmpty()).toBe(true);
    expect(testTimeType.hasValue()).toBe(false);
    expect(testTimeType.getValue()).toBeUndefined();
    expect(testTimeType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testTimeType = new TimeType(VALID_TIME);
    const t = () => {
      testTimeType.setValue(INVALID_TIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_TIME}) for TimeType`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testTimeType = new TimeType(VALID_TIME);
    testTimeType.setValueAsString(VALID_TIME_2);
    expect(testTimeType.getValue()).toStrictEqual(VALID_TIME_2);
    testTimeType.setValueAsString();
    expect(testTimeType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testTimeType = new TimeType();
    const t = () => {
      testTimeType.setValueAsString(INVALID_TIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_TIME}) for TimeType`);
  });

  it('should properly encode with correct values', () => {
    const testTimeType = new TimeType();
    expect(testTimeType.encode(VALID_TIME)).toStrictEqual(VALID_TIME);
  });

  it('should throw PrimitiveTypeError when encode() with invalid value', () => {
    const testTimeType = new TimeType();
    const t = () => {
      testTimeType.encode(INVALID_TIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_TIME}) for TimeType`);
  });

  it('should properly parse with correct values', () => {
    const testTimeType = new TimeType();
    expect(testTimeType.parse(VALID_TIME)).toStrictEqual(VALID_TIME);
  });

  it('should throw PrimitiveTypeError when parse() with invalid value', () => {
    const testTimeType = new TimeType();
    const t = () => {
      testTimeType.parse(INVALID_TIME);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_TIME}) for TimeType`);
  });

  it('should properly copy()', () => {
    const timeType = new TimeType(VALID_TIME);
    const testTimeType = timeType.copy();
    expect(testTimeType).toBeDefined();
    expect(testTimeType).toBeInstanceOf(TimeType);
    expect(testTimeType.constructor.name).toStrictEqual('TimeType');
    expect(testTimeType.fhirType()).toStrictEqual('time');
    expect(testTimeType.isEmpty()).toBe(false);
    expect(testTimeType.hasValue()).toBe(true);
    expect(testTimeType.getValue()).toBeDefined();
    expect(testTimeType.getValue()).toStrictEqual(VALID_TIME);
    expect(testTimeType.getValueAsString()).toStrictEqual(VALID_TIME);
  });
});
