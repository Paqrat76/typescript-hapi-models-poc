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

import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { fhirCanonical } from '@src/fhir-core/data-types/primitive/primitive-types';

describe('CanonicalType', () => {
  const VALID_CANONICAL = `testCanonicalType` as fhirCanonical;
  const VALID_CANONICAL_2 = `testCanonicalType2` as fhirCanonical;
  const INVALID_CANONICAL = ' invalid Url ' as fhirCanonical;

  it('should be properly instantiated as empty', () => {
    const testCanonicalType = new CanonicalType();
    expect(testCanonicalType).toBeDefined();
    expect(testCanonicalType).toBeInstanceOf(CanonicalType);
    expect(testCanonicalType).toBeInstanceOf(PrimitiveType);
    expect(testCanonicalType.constructor.name).toStrictEqual('CanonicalType');
    expect(testCanonicalType.fhirType()).toStrictEqual('canonical');
    expect(testCanonicalType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCanonicalType.hasId()).toBe(false);
    expect(testCanonicalType.getId()).toBeUndefined();
    expect(testCanonicalType.hasExtension()).toBe(false);
    expect(testCanonicalType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testCanonicalType.hasValue()).toBe(false);
    expect(testCanonicalType.getValue()).toBeUndefined();
    expect(testCanonicalType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testCanonicalType = new CanonicalType(VALID_CANONICAL);
    expect(testCanonicalType).toBeDefined();
    expect(testCanonicalType).toBeInstanceOf(CanonicalType);
    expect(testCanonicalType.constructor.name).toStrictEqual('CanonicalType');
    expect(testCanonicalType.fhirType()).toStrictEqual('canonical');
    expect(testCanonicalType.isEmpty()).toBe(false);

    expect(testCanonicalType.hasValue()).toBe(true);
    expect(testCanonicalType.getValue()).toBeDefined();
    expect(testCanonicalType.getValue()).toStrictEqual(VALID_CANONICAL);
    expect(testCanonicalType.getValueAsString()).toStrictEqual(VALID_CANONICAL);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new CanonicalType(INVALID_CANONICAL);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CanonicalType (${INVALID_CANONICAL})`);
  });

  it('should be properly reset by setValue()', () => {
    const testCanonicalType = new CanonicalType(VALID_CANONICAL);
    expect(testCanonicalType.isEmpty()).toBe(false);
    expect(testCanonicalType.hasValue()).toBe(true);
    expect(testCanonicalType.getValue()).toBeDefined();
    expect(testCanonicalType.getValue()).toStrictEqual(VALID_CANONICAL);
    expect(testCanonicalType.getValueAsString()).toStrictEqual(VALID_CANONICAL);

    testCanonicalType.setValue(VALID_CANONICAL_2);
    expect(testCanonicalType.isEmpty()).toBe(false);
    expect(testCanonicalType.hasValue()).toBe(true);
    expect(testCanonicalType.getValue()).toBeDefined();
    expect(testCanonicalType.getValue()).toStrictEqual(VALID_CANONICAL_2);
    expect(testCanonicalType.getValueAsString()).toStrictEqual(VALID_CANONICAL_2);

    testCanonicalType.setValue();
    expect(testCanonicalType.isEmpty()).toBe(true);
    expect(testCanonicalType.hasValue()).toBe(false);
    expect(testCanonicalType.getValue()).toBeUndefined();
    expect(testCanonicalType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testCanonicalType = new CanonicalType();
    const t = () => {
      testCanonicalType.setValue(INVALID_CANONICAL);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CanonicalType (${INVALID_CANONICAL})`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testCanonicalType = new CanonicalType(VALID_CANONICAL);
    testCanonicalType.setValueAsString(VALID_CANONICAL_2);
    expect(testCanonicalType.getValue()).toStrictEqual(VALID_CANONICAL_2);
    testCanonicalType.setValueAsString();
    expect(testCanonicalType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testCanonicalType = new CanonicalType();
    const t = () => {
      testCanonicalType.setValueAsString(INVALID_CANONICAL);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CanonicalType (${INVALID_CANONICAL})`);
  });

  it('should properly encodeToString with correct values', () => {
    const testCanonicalType = new CanonicalType(VALID_CANONICAL);
    expect(testCanonicalType.encodeToString(VALID_CANONICAL)).toStrictEqual(VALID_CANONICAL);
  });

  it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
    const testCanonicalType = new CanonicalType();
    const t = () => {
      testCanonicalType.encodeToString(INVALID_CANONICAL);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CanonicalType (${INVALID_CANONICAL})`);
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testCanonicalType = new CanonicalType();
    expect(testCanonicalType.parseToPrimitive(VALID_CANONICAL)).toStrictEqual(VALID_CANONICAL);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
    const testCanonicalType = new CanonicalType();
    const t = () => {
      testCanonicalType.parseToPrimitive(INVALID_CANONICAL);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CanonicalType (${INVALID_CANONICAL})`);
  });

  it('should properly copy()', () => {
    const canonicalType = new CanonicalType(VALID_CANONICAL);
    const testCanonicalType = canonicalType.copy();
    expect(testCanonicalType).toBeDefined();
    expect(testCanonicalType).toBeInstanceOf(CanonicalType);
    expect(testCanonicalType.constructor.name).toStrictEqual('CanonicalType');
    expect(testCanonicalType.fhirType()).toStrictEqual('canonical');
    expect(testCanonicalType.isEmpty()).toBe(false);
    expect(testCanonicalType.hasValue()).toBe(true);
    expect(testCanonicalType.getValue()).toBeDefined();
    expect(testCanonicalType.getValue()).toStrictEqual(VALID_CANONICAL);
    expect(testCanonicalType.getValueAsString()).toStrictEqual(VALID_CANONICAL);
  });
});
