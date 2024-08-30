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

import { UuidType } from '@src/fhir/data-types/primitive/UuidType';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir/base-models/core-fhir-models';

describe('UuidType', () => {
  const VALID_UUID = `urn:uuid:c757873d-ec9a-4326-a141-556f43239520`;
  const VALID_UUID_2 = `urn:uuid:fbdec4f9-350b-46e7-a71b-185d44bfdbe0`;
  const INVALID_UUID = '6AD7EDAD-8F73-4A43-9CCB-8D72679FFD9C';

  it('should be properly instantiated as empty', () => {
    const testUuidType = new UuidType();
    expect(testUuidType).toBeDefined();
    expect(testUuidType).toBeInstanceOf(UuidType);
    expect(testUuidType).toBeInstanceOf(PrimitiveType);
    expect(testUuidType.constructor.name).toStrictEqual('UuidType');
    expect(testUuidType.fhirType()).toStrictEqual('uuid');
    expect(testUuidType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testUuidType.hasId()).toBe(false);
    expect(testUuidType.getId()).toBeUndefined();
    expect(testUuidType.hasExtension()).toBe(false);
    expect(testUuidType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testUuidType.hasValue()).toBe(false);
    expect(testUuidType.getValue()).toBeUndefined();
    expect(testUuidType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testUuidType = new UuidType(VALID_UUID);
    expect(testUuidType).toBeDefined();
    expect(testUuidType).toBeInstanceOf(UuidType);
    expect(testUuidType.constructor.name).toStrictEqual('UuidType');
    expect(testUuidType.fhirType()).toStrictEqual('uuid');
    expect(testUuidType.isEmpty()).toBe(false);

    expect(testUuidType.hasValue()).toBe(true);
    expect(testUuidType.getValue()).toBeDefined();
    expect(testUuidType.getValue()).toStrictEqual(VALID_UUID);
    expect(testUuidType.getValueAsString()).toStrictEqual(VALID_UUID);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new UuidType(INVALID_UUID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_UUID}) for UuidType`);
  });

  it('should be properly reset by setValue()', () => {
    const testUuidType = new UuidType(VALID_UUID);
    expect(testUuidType.isEmpty()).toBe(false);
    expect(testUuidType.hasValue()).toBe(true);
    expect(testUuidType.getValue()).toBeDefined();
    expect(testUuidType.getValue()).toStrictEqual(VALID_UUID);
    expect(testUuidType.getValueAsString()).toStrictEqual(VALID_UUID);

    testUuidType.setValue(VALID_UUID_2);
    expect(testUuidType.isEmpty()).toBe(false);
    expect(testUuidType.hasValue()).toBe(true);
    expect(testUuidType.getValue()).toBeDefined();
    expect(testUuidType.getValue()).toStrictEqual(VALID_UUID_2);
    expect(testUuidType.getValueAsString()).toStrictEqual(VALID_UUID_2);

    testUuidType.setValue();
    expect(testUuidType.isEmpty()).toBe(true);
    expect(testUuidType.hasValue()).toBe(false);
    expect(testUuidType.getValue()).toBeUndefined();
    expect(testUuidType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testUuidType = new UuidType();
    const t = () => {
      testUuidType.setValue(INVALID_UUID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_UUID}) for UuidType`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testUuidType = new UuidType(VALID_UUID);
    testUuidType.setValueAsString(VALID_UUID_2);
    expect(testUuidType.getValue()).toStrictEqual(VALID_UUID_2);
    testUuidType.setValueAsString();
    expect(testUuidType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testUuidType = new UuidType();
    const t = () => {
      testUuidType.setValueAsString(INVALID_UUID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_UUID}) for UuidType`);
  });

  it('should properly encode with correct values', () => {
    const testUuidType = new UuidType(VALID_UUID);
    expect(testUuidType.encode(VALID_UUID)).toStrictEqual(VALID_UUID);
  });

  it('should throw PrimitiveTypeError when encode() with invalid value', () => {
    const testUuidType = new UuidType();
    const t = () => {
      testUuidType.encode(INVALID_UUID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_UUID}) for UuidType`);
  });

  it('should properly parse with correct values', () => {
    const testUuidType = new UuidType();
    expect(testUuidType.parse(VALID_UUID)).toStrictEqual(VALID_UUID);
  });

  it('should throw PrimitiveTypeError when parse() with invalid value', () => {
    const testUuidType = new UuidType();
    const t = () => {
      testUuidType.parse(INVALID_UUID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_UUID}) for UuidType`);
  });

  it('should properly copy()', () => {
    const uuidType = new UuidType(VALID_UUID);
    const testUuidType = uuidType.copy();
    expect(testUuidType).toBeDefined();
    expect(testUuidType).toBeInstanceOf(UuidType);
    expect(testUuidType.constructor.name).toStrictEqual('UuidType');
    expect(testUuidType.fhirType()).toStrictEqual('uuid');
    expect(testUuidType.isEmpty()).toBe(false);
    expect(testUuidType.hasValue()).toBe(true);
    expect(testUuidType.getValue()).toBeDefined();
    expect(testUuidType.getValue()).toStrictEqual(VALID_UUID);
    expect(testUuidType.getValueAsString()).toStrictEqual(VALID_UUID);
  });
});
