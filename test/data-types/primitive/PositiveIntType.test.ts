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

import { FHIR_MAX_INTEGER } from '../../test-utils';
import { PositiveIntType } from '@src/fhir/data-types/primitive/PositiveIntType';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';

describe('PositiveIntType', () => {
  const VALID_INTEGER = 1;
  const VALID_INTEGER_2 = FHIR_MAX_INTEGER;
  const INVALID_INTEGER = 0;

  it('should be properly instantiated as empty', () => {
    const testPositiveIntType = new PositiveIntType();
    expect(testPositiveIntType).toBeDefined();
    expect(testPositiveIntType).toBeInstanceOf(PositiveIntType);
    expect(testPositiveIntType).toBeInstanceOf(PrimitiveType);
    expect(testPositiveIntType.constructor.name).toStrictEqual('PositiveIntType');
    expect(testPositiveIntType.fhirType()).toStrictEqual('positiveInt');
    expect(testPositiveIntType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testPositiveIntType.hasId()).toBe(false);
    expect(testPositiveIntType.getId()).toBeUndefined();
    expect(testPositiveIntType.hasExtension()).toBe(false);
    expect(testPositiveIntType.getExtension()).toBeUndefined();
    // primitive value properties
    expect(testPositiveIntType.hasValue()).toBe(false);
    expect(testPositiveIntType.getValue()).toBeUndefined();
    expect(testPositiveIntType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testPositiveIntType = new PositiveIntType(VALID_INTEGER);
    expect(testPositiveIntType).toBeDefined();
    expect(testPositiveIntType).toBeInstanceOf(PositiveIntType);
    expect(testPositiveIntType.constructor.name).toStrictEqual('PositiveIntType');
    expect(testPositiveIntType.fhirType()).toStrictEqual('positiveInt');
    expect(testPositiveIntType.isEmpty()).toBe(false);

    expect(testPositiveIntType.hasValue()).toBe(true);
    expect(testPositiveIntType.getValue()).toBeDefined();
    expect(testPositiveIntType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testPositiveIntType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());
  });

  it('should throw PrimitiveTypeError when initialized with an invalid integer', () => {
    const t = () => {
      new PositiveIntType(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for PositiveIntType');
  });

  it('should be properly reset by setValue()', () => {
    const testPositiveIntType = new PositiveIntType(VALID_INTEGER);
    expect(testPositiveIntType.isEmpty()).toBe(false);
    expect(testPositiveIntType.hasValue()).toBe(true);
    expect(testPositiveIntType.getValue()).toBeDefined();
    expect(testPositiveIntType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testPositiveIntType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());

    testPositiveIntType.setValue(VALID_INTEGER_2);
    expect(testPositiveIntType.isEmpty()).toBe(false);
    expect(testPositiveIntType.hasValue()).toBe(true);
    expect(testPositiveIntType.getValue()).toBeDefined();
    expect(testPositiveIntType.getValue()).toStrictEqual(VALID_INTEGER_2);
    expect(testPositiveIntType.getValueAsString()).toStrictEqual(VALID_INTEGER_2.toString());

    testPositiveIntType.setValue();
    expect(testPositiveIntType.isEmpty()).toBe(true);
    expect(testPositiveIntType.hasValue()).toBe(false);
    expect(testPositiveIntType.getValue()).toBeUndefined();
    expect(testPositiveIntType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with an invalid value', () => {
    const testPositiveIntType = new PositiveIntType();
    const t = () => {
      testPositiveIntType.setValue(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for PositiveIntType');
  });

  it('should properly setValueAsString() with correct values', () => {
    const testPositiveIntType = new PositiveIntType(VALID_INTEGER);
    testPositiveIntType.setValueAsString(VALID_INTEGER_2.toString());
    expect(testPositiveIntType.getValue()).toStrictEqual(VALID_INTEGER_2);
    testPositiveIntType.setValueAsString();
    expect(testPositiveIntType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with an invalid value', () => {
    const testPositiveIntType = new PositiveIntType();
    const t = () => {
      testPositiveIntType.setValueAsString(INVALID_INTEGER.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for PositiveIntType');
  });

  it('should properly encode with correct values', () => {
    const testPositiveIntType = new PositiveIntType();
    expect(testPositiveIntType.encode(VALID_INTEGER)).toStrictEqual(VALID_INTEGER.toString());
  });

  it('should throw PrimitiveTypeError when encode() with an invalid value', () => {
    const testPositiveIntType = new PositiveIntType();
    const t = () => {
      testPositiveIntType.encode(INVALID_INTEGER);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for PositiveIntType');
  });

  it('should properly parse with correct values', () => {
    const testPositiveIntType = new PositiveIntType();
    expect(testPositiveIntType.parse(VALID_INTEGER.toString())).toStrictEqual(VALID_INTEGER);
  });

  it('should throw PrimitiveTypeError when parse() with an invalid value', () => {
    const testPositiveIntType = new PositiveIntType();
    const t = () => {
      testPositiveIntType.parse(INVALID_INTEGER.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for PositiveIntType');
  });

  it('should properly copy()', () => {
    const positiveIntType = new PositiveIntType(VALID_INTEGER);
    const testPositiveIntType = positiveIntType.copy();
    expect(testPositiveIntType).toBeDefined();
    expect(testPositiveIntType).toBeInstanceOf(PositiveIntType);
    expect(testPositiveIntType.constructor.name).toStrictEqual('PositiveIntType');
    expect(testPositiveIntType.fhirType()).toStrictEqual('positiveInt');
    expect(testPositiveIntType.isEmpty()).toBe(false);
    expect(testPositiveIntType.hasValue()).toBe(true);
    expect(testPositiveIntType.getValue()).toBeDefined();
    expect(testPositiveIntType.getValue()).toStrictEqual(VALID_INTEGER);
    expect(testPositiveIntType.getValueAsString()).toStrictEqual(VALID_INTEGER.toString());
  });
});
