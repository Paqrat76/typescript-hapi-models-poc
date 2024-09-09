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

import { FHIR_MIN_INTEGER64, FHIR_MAX_INTEGER64 } from '../../../test-utils';
import { Integer64Type } from '@src/fhir-core/data-types/primitive/Integer64Type';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('Integer64Type', () => {
  const VALID_INTEGER64 = BigInt(FHIR_MIN_INTEGER64);
  const VALID_INTEGER64_2 = 0n;
  const VALID_INTEGER64_3 = BigInt(FHIR_MAX_INTEGER64);
  const INVALID_INTEGER64 = BigInt(FHIR_MAX_INTEGER64) + 1n;

  it('should be properly instantiated as empty', () => {
    const testInteger64Type = new Integer64Type();
    expect(testInteger64Type).toBeDefined();
    expect(testInteger64Type).toBeInstanceOf(Integer64Type);
    expect(testInteger64Type).toBeInstanceOf(PrimitiveType);
    expect(testInteger64Type.constructor.name).toStrictEqual('Integer64Type');
    expect(testInteger64Type.fhirType()).toStrictEqual('integer64');
    expect(testInteger64Type.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testInteger64Type.hasId()).toBe(false);
    expect(testInteger64Type.getId()).toBeUndefined();
    expect(testInteger64Type.hasExtension()).toBe(false);
    expect(testInteger64Type.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testInteger64Type.hasValue()).toBe(false);
    expect(testInteger64Type.getValue()).toBeUndefined();
    expect(testInteger64Type.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testInteger64Type = new Integer64Type(VALID_INTEGER64);
    expect(testInteger64Type).toBeDefined();
    expect(testInteger64Type).toBeInstanceOf(Integer64Type);
    expect(testInteger64Type.constructor.name).toStrictEqual('Integer64Type');
    expect(testInteger64Type.fhirType()).toStrictEqual('integer64');
    expect(testInteger64Type.isEmpty()).toBe(false);

    expect(testInteger64Type.hasValue()).toBe(true);
    expect(testInteger64Type.getValue()).toBeDefined();
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64);
    expect(testInteger64Type.getValueAsString()).toStrictEqual(VALID_INTEGER64.toString());
  });

  it('should throw PrimitiveTypeError when initialized with an invalid integer', () => {
    const t = () => {
      new Integer64Type(INVALID_INTEGER64);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for Integer64Type');
  });

  it('should be properly reset by setValue()', () => {
    const testInteger64Type = new Integer64Type(VALID_INTEGER64);
    expect(testInteger64Type.isEmpty()).toBe(false);
    expect(testInteger64Type.hasValue()).toBe(true);
    expect(testInteger64Type.getValue()).toBeDefined();
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64);
    expect(testInteger64Type.getValueAsString()).toStrictEqual(VALID_INTEGER64.toString());

    testInteger64Type.setValue(VALID_INTEGER64_2);
    expect(testInteger64Type.isEmpty()).toBe(false);
    expect(testInteger64Type.hasValue()).toBe(true);
    expect(testInteger64Type.getValue()).toBeDefined();
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64_2);
    expect(testInteger64Type.getValueAsString()).toStrictEqual(VALID_INTEGER64_2.toString());

    testInteger64Type.setValue(VALID_INTEGER64_3);
    expect(testInteger64Type.isEmpty()).toBe(false);
    expect(testInteger64Type.hasValue()).toBe(true);
    expect(testInteger64Type.getValue()).toBeDefined();
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64_3);
    expect(testInteger64Type.getValueAsString()).toStrictEqual(VALID_INTEGER64_3.toString());

    testInteger64Type.setValue();
    expect(testInteger64Type.isEmpty()).toBe(true);
    expect(testInteger64Type.hasValue()).toBe(false);
    expect(testInteger64Type.getValue()).toBeUndefined();
    expect(testInteger64Type.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with an invalid value', () => {
    const testInteger64Type = new Integer64Type();
    const t = () => {
      testInteger64Type.setValue(INVALID_INTEGER64);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for Integer64Type');
  });

  it('should properly setValueAsString() with correct values', () => {
    const testInteger64Type = new Integer64Type(VALID_INTEGER64);
    testInteger64Type.setValueAsString(VALID_INTEGER64_2.toString());
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64_2);
    testInteger64Type.setValueAsString(VALID_INTEGER64_3.toString());
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64_3);
    testInteger64Type.setValueAsString();
    expect(testInteger64Type.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with an invalid value', () => {
    const testInteger64Type = new Integer64Type();
    const t = () => {
      testInteger64Type.setValueAsString(INVALID_INTEGER64.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for Integer64Type');
  });

  it('should properly encode with correct values', () => {
    const testInteger64Type = new Integer64Type();
    expect(testInteger64Type.encode(VALID_INTEGER64)).toStrictEqual(VALID_INTEGER64.toString());
  });

  it('should throw PrimitiveTypeError when encode() with an invalid value', () => {
    const testInteger64Type = new Integer64Type();
    const t = () => {
      testInteger64Type.encode(INVALID_INTEGER64);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for Integer64Type');
  });

  it('should properly parse with correct values', () => {
    const testInteger64Type = new Integer64Type();
    expect(testInteger64Type.parse(VALID_INTEGER64.toString())).toStrictEqual(VALID_INTEGER64);
  });

  it('should throw PrimitiveTypeError when parse() with an invalid value', () => {
    const testInteger64Type = new Integer64Type();
    const t = () => {
      testInteger64Type.parse(INVALID_INTEGER64.toString());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for Integer64Type');
  });

  it('should properly copy()', () => {
    const integerType = new Integer64Type(VALID_INTEGER64);
    const testInteger64Type = integerType.copy();
    expect(testInteger64Type).toBeDefined();
    expect(testInteger64Type).toBeInstanceOf(Integer64Type);
    expect(testInteger64Type.constructor.name).toStrictEqual('Integer64Type');
    expect(testInteger64Type.fhirType()).toStrictEqual('integer64');
    expect(testInteger64Type.isEmpty()).toBe(false);
    expect(testInteger64Type.hasValue()).toBe(true);
    expect(testInteger64Type.getValue()).toBeDefined();
    expect(testInteger64Type.getValue()).toStrictEqual(VALID_INTEGER64);
    expect(testInteger64Type.getValueAsString()).toStrictEqual(VALID_INTEGER64.toString());
  });
});