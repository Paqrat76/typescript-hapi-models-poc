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

import { FHIR_MAX_INTEGER } from '../../../test-utils';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('UnsignedIntType', () => {
  const VALID_INTEGER = 0;
  const VALID_INTEGER_2 = FHIR_MAX_INTEGER;
  const INVALID_INTEGER = -1;

  it('should be properly instantiated as empty', () => {
    const testUnsignedIntType = new UnsignedIntType();
    expect(testUnsignedIntType).toBeDefined();
    expect(testUnsignedIntType).toBeInstanceOf(UnsignedIntType);
    expect(testUnsignedIntType).toBeInstanceOf(PrimitiveType);
    expect(testUnsignedIntType.constructor.name).toStrictEqual('UnsignedIntType');
    expect(testUnsignedIntType.fhirType()).toStrictEqual('unsignedInt');
    expect(testUnsignedIntType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testUnsignedIntType.hasId()).toBe(false);
    expect(testUnsignedIntType.getId()).toBeUndefined();
    expect(testUnsignedIntType.hasExtension()).toBe(false);
    expect(testUnsignedIntType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testUnsignedIntType.hasValue()).toBe(false);
    expect(testUnsignedIntType.getValue()).toBeUndefined();
    expect(testUnsignedIntType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testUnsignedIntType = new UnsignedIntType(VALID_INTEGER);
    expect(testUnsignedIntType).toBeDefined();
    expect(testUnsignedIntType).toBeInstanceOf(UnsignedIntType);
    expect(testUnsignedIntType.constructor.name).toStrictEqual('UnsignedIntType');
    expect(testUnsignedIntType.fhirType()).toStrictEqual('unsignedInt');
    expect(testUnsignedIntType.isEmpty()).toBe(false);

    expect(testUnsignedIntType.hasValue()).toBe(true);
    expect(testUnsignedIntType.getValue()).toBeDefined();
    expect(testUnsignedIntType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testUnsignedIntType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());
  });

  it('should throw PrimitiveTypeError when initialized with an invalid integer', () => {
    const t = () => {
      new UnsignedIntType(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for UnsignedIntType');
  });

  it('should be properly reset by setValue()', () => {
    const testUnsignedIntType = new UnsignedIntType(VALID_INTEGER);
    expect(testUnsignedIntType.isEmpty()).toBe(false);
    expect(testUnsignedIntType.hasValue()).toBe(true);
    expect(testUnsignedIntType.getValue()).toBeDefined();
    expect(testUnsignedIntType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testUnsignedIntType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());

    testUnsignedIntType.setValue(VALID_INTEGER_2);
    expect(testUnsignedIntType.isEmpty()).toBe(false);
    expect(testUnsignedIntType.hasValue()).toBe(true);
    expect(testUnsignedIntType.getValue()).toBeDefined();
    expect(testUnsignedIntType.getValue()).toStrictEqual(VALID_INTEGER_2);
    expect(testUnsignedIntType.getValueAsString()).toStrictEqual(VALID_INTEGER_2.toString());

    testUnsignedIntType.setValue();
    expect(testUnsignedIntType.isEmpty()).toBe(true);
    expect(testUnsignedIntType.hasValue()).toBe(false);
    expect(testUnsignedIntType.getValue()).toBeUndefined();
    expect(testUnsignedIntType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with an invalid value', () => {
    const testUnsignedIntType = new UnsignedIntType();
    const t = () => {
      testUnsignedIntType.setValue(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for UnsignedIntType');
  });

  it('should properly setValueAsString() with correct values', () => {
    const testUnsignedIntType = new UnsignedIntType(VALID_INTEGER);
    testUnsignedIntType.setValueAsString(VALID_INTEGER_2.toString());
    expect(testUnsignedIntType.getValue()).toStrictEqual(VALID_INTEGER_2);
    testUnsignedIntType.setValueAsString();
    expect(testUnsignedIntType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with an invalid value', () => {
    const testUnsignedIntType = new UnsignedIntType();
    const t = () => {
      testUnsignedIntType.setValueAsString(INVALID_INTEGER.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for UnsignedIntType');
  });

  it('should properly encodeToString with correct values', () => {
    const testUnsignedIntType = new UnsignedIntType();
    expect(testUnsignedIntType.encodeToString(VALID_INTEGER)).toStrictEqual(VALID_INTEGER.toString());
  });

  it('should throw PrimitiveTypeError when encodeToString() with an invalid value', () => {
    const testUnsignedIntType = new UnsignedIntType();
    const t = () => {
      testUnsignedIntType.encodeToString(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for UnsignedIntType');
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testUnsignedIntType = new UnsignedIntType();
    expect(testUnsignedIntType.parseToPrimitive(VALID_INTEGER.toString())).toStrictEqual(VALID_INTEGER);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with an invalid value', () => {
    const testUnsignedIntType = new UnsignedIntType();
    const t = () => {
      testUnsignedIntType.parseToPrimitive(INVALID_INTEGER.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for UnsignedIntType');
  });

  it('should properly copy()', () => {
    const unsignedIntType = new UnsignedIntType(VALID_INTEGER);
    const testUnsignedIntType = unsignedIntType.copy();
    expect(testUnsignedIntType).toBeDefined();
    expect(testUnsignedIntType).toBeInstanceOf(UnsignedIntType);
    expect(testUnsignedIntType.constructor.name).toStrictEqual('UnsignedIntType');
    expect(testUnsignedIntType.fhirType()).toStrictEqual('unsignedInt');
    expect(testUnsignedIntType.isEmpty()).toBe(false);
    expect(testUnsignedIntType.hasValue()).toBe(true);
    expect(testUnsignedIntType.getValue()).toBeDefined();
    expect(testUnsignedIntType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testUnsignedIntType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());
  });
});
