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

import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { FHIR_MIN_INTEGER, FHIR_MAX_INTEGER } from '../../../test-utils';

describe('IntegerType', () => {
  const VALID_INTEGER = FHIR_MIN_INTEGER;
  const VALID_INTEGER_2 = 0;
  const VALID_INTEGER_3 = FHIR_MAX_INTEGER;
  const INVALID_INTEGER = FHIR_MAX_INTEGER + 1;

  it('should be properly instantiated as empty', () => {
    const testIntegerType = new IntegerType();
    expect(testIntegerType).toBeDefined();
    expect(testIntegerType).toBeInstanceOf(IntegerType);
    expect(testIntegerType).toBeInstanceOf(PrimitiveType);
    expect(testIntegerType.constructor.name).toStrictEqual('IntegerType');
    expect(testIntegerType.fhirType()).toStrictEqual('integer');
    expect(testIntegerType.isEmpty()).toBe(true);
    expect(testIntegerType.isPrimitive()).toBe(true);
    expect(testIntegerType.isNumberPrimitive()).toBe(true);
    expect(testIntegerType.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testIntegerType.hasId()).toBe(false);
    expect(testIntegerType.getId()).toBeUndefined();
    expect(testIntegerType.hasExtension()).toBe(false);
    expect(testIntegerType.getExtension()).toEqual([] as Extension[]);
    // primitive value properties
    expect(testIntegerType.hasValue()).toBe(false);
    expect(testIntegerType.getValue()).toBeUndefined();
    expect(testIntegerType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testIntegerType = new IntegerType(VALID_INTEGER);
    const testId = 'id1234';
    testIntegerType.setId(testId);
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    testIntegerType.addExtension(testExtension);

    expect(testIntegerType).toBeDefined();
    expect(testIntegerType).toBeInstanceOf(IntegerType);
    expect(testIntegerType.constructor.name).toStrictEqual('IntegerType');
    expect(testIntegerType.fhirType()).toStrictEqual('integer');
    expect(testIntegerType.isEmpty()).toBe(false);
    expect(testIntegerType.isPrimitive()).toBe(true);
    expect(testIntegerType.isNumberPrimitive()).toBe(true);
    expect(testIntegerType.toJSON()).toStrictEqual(VALID_INTEGER);
    expect(testIntegerType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testIntegerType.hasId()).toBe(true);
    expect(testIntegerType.getId()).toStrictEqual(testId);
    expect(testIntegerType.hasExtension()).toBe(true);
    expect(testIntegerType.getExtension()).toEqual([testExtension]);
    // primitive value properties
    expect(testIntegerType.hasValue()).toBe(true);
    expect(testIntegerType.getValue()).toBeDefined();
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testIntegerType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());
  });

  it('should throw PrimitiveTypeError when initialized with an invalid integer', () => {
    const t = () => {
      new IntegerType(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for IntegerType');
  });

  it('should be properly reset by setValue()', () => {
    const testIntegerType = new IntegerType(VALID_INTEGER);
    expect(testIntegerType.isEmpty()).toBe(false);
    expect(testIntegerType.hasValue()).toBe(true);
    expect(testIntegerType.getValue()).toBeDefined();
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testIntegerType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());

    testIntegerType.setValue(VALID_INTEGER_2);
    expect(testIntegerType.isEmpty()).toBe(false);
    expect(testIntegerType.hasValue()).toBe(true);
    expect(testIntegerType.getValue()).toBeDefined();
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER_2);
    expect(testIntegerType.getValueAsString()).toStrictEqual(VALID_INTEGER_2.toString());

    testIntegerType.setValue(VALID_INTEGER_3);
    expect(testIntegerType.isEmpty()).toBe(false);
    expect(testIntegerType.hasValue()).toBe(true);
    expect(testIntegerType.getValue()).toBeDefined();
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER_3);
    expect(testIntegerType.getValueAsString()).toStrictEqual(VALID_INTEGER_3.toString());

    testIntegerType.setValue();
    expect(testIntegerType.isEmpty()).toBe(true);
    expect(testIntegerType.hasValue()).toBe(false);
    expect(testIntegerType.getValue()).toBeUndefined();
    expect(testIntegerType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with an invalid value', () => {
    const testIntegerType = new IntegerType();
    const t = () => {
      testIntegerType.setValue(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for IntegerType');
  });

  it('should properly setValueAsString() with correct values', () => {
    const testIntegerType = new IntegerType(VALID_INTEGER);
    testIntegerType.setValueAsString(VALID_INTEGER_2.toString());
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER_2);
    testIntegerType.setValueAsString(VALID_INTEGER_3.toString());
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER_3);
    testIntegerType.setValueAsString();
    expect(testIntegerType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with an invalid value', () => {
    const testIntegerType = new IntegerType();
    const t = () => {
      testIntegerType.setValueAsString(INVALID_INTEGER.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for IntegerType');
  });

  it('should properly encodeToString with correct values', () => {
    const testIntegerType = new IntegerType();
    expect(testIntegerType.encodeToString(VALID_INTEGER)).toStrictEqual(VALID_INTEGER.toString());
  });

  it('should throw PrimitiveTypeError when encodeToString() with an invalid value', () => {
    const testIntegerType = new IntegerType();
    const t = () => {
      testIntegerType.encodeToString(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for IntegerType');
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testIntegerType = new IntegerType();
    expect(testIntegerType.parseToPrimitive(VALID_INTEGER.toString())).toStrictEqual(VALID_INTEGER);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with an invalid value', () => {
    const testIntegerType = new IntegerType();
    const t = () => {
      testIntegerType.parseToPrimitive(INVALID_INTEGER.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for IntegerType');
  });

  it('should properly copy()', () => {
    const integerType = new IntegerType(VALID_INTEGER);
    const testIntegerType = integerType.copy();
    expect(testIntegerType).toBeDefined();
    expect(testIntegerType).toBeInstanceOf(IntegerType);
    expect(testIntegerType.constructor.name).toStrictEqual('IntegerType');
    expect(testIntegerType.fhirType()).toStrictEqual('integer');
    expect(testIntegerType.isEmpty()).toBe(false);
    expect(testIntegerType.isPrimitive()).toBe(true);
    expect(testIntegerType.isNumberPrimitive()).toBe(true);
    expect(testIntegerType.toJSON()).toStrictEqual(VALID_INTEGER);
    expect(testIntegerType.hasValue()).toBe(true);
    expect(testIntegerType.getValue()).toBeDefined();
    expect(testIntegerType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testIntegerType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());
  });
});
