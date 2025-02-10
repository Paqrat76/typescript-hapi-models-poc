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
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('Base64BinaryType', () => {
  const VALID_BASE64BINARY = `dGVzdEJhc2U2NEJpbmFyeQ==`; // from "testBase64Binary"
  const VALID_BASE64BINARY_2 = `dGVzdEJhc2U2NEJpbmFyeTI=`; // from "testBase64Binary2"
  const INVALID_BASE64BINARY = 'invalidBase64Binary';

  it('should be properly instantiated as empty', () => {
    const testBase64BinaryType = new Base64BinaryType();
    expect(testBase64BinaryType).toBeDefined();
    expect(testBase64BinaryType).toBeInstanceOf(Base64BinaryType);
    expect(testBase64BinaryType).toBeInstanceOf(PrimitiveType);
    expect(testBase64BinaryType.constructor.name).toStrictEqual('Base64BinaryType');
    expect(testBase64BinaryType.fhirType()).toStrictEqual('base64Binary');
    expect(testBase64BinaryType.isEmpty()).toBe(true);
    expect(testBase64BinaryType.isPrimitive()).toBe(true);
    expect(testBase64BinaryType.isStringPrimitive()).toBe(true);
    expect(testBase64BinaryType.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testBase64BinaryType.hasId()).toBe(false);
    expect(testBase64BinaryType.getId()).toBeUndefined();
    expect(testBase64BinaryType.hasExtension()).toBe(false);
    expect(testBase64BinaryType.getExtension()).toEqual([] as Extension[]);
    // primitive value properties
    expect(testBase64BinaryType.hasValue()).toBe(false);
    expect(testBase64BinaryType.getValue()).toBeUndefined();
    expect(testBase64BinaryType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testBase64BinaryType = new Base64BinaryType(VALID_BASE64BINARY);
    const testId = 'id1234';
    testBase64BinaryType.setId(testId);
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    testBase64BinaryType.addExtension(testExtension);

    expect(testBase64BinaryType).toBeDefined();
    expect(testBase64BinaryType).toBeInstanceOf(Base64BinaryType);
    expect(testBase64BinaryType.constructor.name).toStrictEqual('Base64BinaryType');
    expect(testBase64BinaryType.fhirType()).toStrictEqual('base64Binary');
    expect(testBase64BinaryType.isEmpty()).toBe(false);
    expect(testBase64BinaryType.isPrimitive()).toBe(true);
    expect(testBase64BinaryType.isStringPrimitive()).toBe(true);
    expect(testBase64BinaryType.toJSON()).toStrictEqual(VALID_BASE64BINARY);
    expect(testBase64BinaryType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testBase64BinaryType.hasId()).toBe(true);
    expect(testBase64BinaryType.getId()).toStrictEqual(testId);
    expect(testBase64BinaryType.hasExtension()).toBe(true);
    expect(testBase64BinaryType.getExtension()).toEqual([testExtension]);
    // primitive value properties
    expect(testBase64BinaryType.hasValue()).toBe(true);
    expect(testBase64BinaryType.getValue()).toBeDefined();
    expect(testBase64BinaryType.getValue()).toStrictEqual(VALID_BASE64BINARY);
    expect(testBase64BinaryType.getValueAsString()).toStrictEqual(VALID_BASE64BINARY);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new Base64BinaryType(INVALID_BASE64BINARY);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for Base64BinaryType`);
  });

  it('should be properly reset by setValue()', () => {
    const testBase64BinaryType = new Base64BinaryType(VALID_BASE64BINARY);
    expect(testBase64BinaryType.isEmpty()).toBe(false);
    expect(testBase64BinaryType.hasValue()).toBe(true);
    expect(testBase64BinaryType.getValue()).toBeDefined();
    expect(testBase64BinaryType.getValue()).toStrictEqual(VALID_BASE64BINARY);
    expect(testBase64BinaryType.getValueAsString()).toStrictEqual(VALID_BASE64BINARY);
    expect(testBase64BinaryType.isPrimitive()).toBe(true);
    expect(testBase64BinaryType.isStringPrimitive()).toBe(true);
    expect(testBase64BinaryType.toJSON()).toStrictEqual(VALID_BASE64BINARY);

    testBase64BinaryType.setValue(VALID_BASE64BINARY_2);
    expect(testBase64BinaryType.isEmpty()).toBe(false);
    expect(testBase64BinaryType.hasValue()).toBe(true);
    expect(testBase64BinaryType.getValue()).toBeDefined();
    expect(testBase64BinaryType.getValue()).toStrictEqual(VALID_BASE64BINARY_2);
    expect(testBase64BinaryType.getValueAsString()).toStrictEqual(VALID_BASE64BINARY_2);
    expect(testBase64BinaryType.toJSON()).toStrictEqual(VALID_BASE64BINARY_2);

    testBase64BinaryType.setValue();
    expect(testBase64BinaryType.isEmpty()).toBe(true);
    expect(testBase64BinaryType.hasValue()).toBe(false);
    expect(testBase64BinaryType.getValue()).toBeUndefined();
    expect(testBase64BinaryType.getValueAsString()).toBeUndefined();
    expect(testBase64BinaryType.toJSON()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testBase64BinaryType = new Base64BinaryType();
    const t = () => {
      testBase64BinaryType.setValue(INVALID_BASE64BINARY);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for Base64BinaryType`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testBase64BinaryType = new Base64BinaryType(VALID_BASE64BINARY);
    testBase64BinaryType.setValueAsString(VALID_BASE64BINARY_2);
    expect(testBase64BinaryType.getValue()).toStrictEqual(VALID_BASE64BINARY_2);
    testBase64BinaryType.setValueAsString();
    expect(testBase64BinaryType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testBase64BinaryType = new Base64BinaryType();
    const t = () => {
      testBase64BinaryType.setValueAsString(INVALID_BASE64BINARY);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for Base64BinaryType`);
  });

  it('should properly encodeToString() with correct values', () => {
    const testBase64BinaryType = new Base64BinaryType(VALID_BASE64BINARY);
    expect(testBase64BinaryType.encodeToString(VALID_BASE64BINARY)).toStrictEqual(VALID_BASE64BINARY);
  });

  it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
    const testBase64BinaryType = new Base64BinaryType();
    const t = () => {
      testBase64BinaryType.encodeToString(INVALID_BASE64BINARY);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for Base64BinaryType`);
  });

  it('should properly parseToPrimitive() with correct values', () => {
    const testBase64BinaryType = new Base64BinaryType();
    expect(testBase64BinaryType.parseToPrimitive(VALID_BASE64BINARY)).toStrictEqual(VALID_BASE64BINARY);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
    const testBase64BinaryType = new Base64BinaryType();
    const t = () => {
      testBase64BinaryType.parseToPrimitive(INVALID_BASE64BINARY);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for Base64BinaryType`);
  });

  it('should properly copy()', () => {
    const base64BinaryType = new Base64BinaryType(VALID_BASE64BINARY);
    const testBase64BinaryType = base64BinaryType.copy();
    expect(testBase64BinaryType).toBeDefined();
    expect(testBase64BinaryType).toBeInstanceOf(Base64BinaryType);
    expect(testBase64BinaryType.constructor.name).toStrictEqual('Base64BinaryType');
    expect(testBase64BinaryType.fhirType()).toStrictEqual('base64Binary');
    expect(testBase64BinaryType.isEmpty()).toBe(false);
    expect(testBase64BinaryType.isPrimitive()).toBe(true);
    expect(testBase64BinaryType.isStringPrimitive()).toBe(true);
    expect(testBase64BinaryType.toJSON()).toStrictEqual(VALID_BASE64BINARY);
    expect(testBase64BinaryType.hasValue()).toBe(true);
    expect(testBase64BinaryType.getValue()).toBeDefined();
    expect(testBase64BinaryType.getValue()).toStrictEqual(VALID_BASE64BINARY);
    expect(testBase64BinaryType.getValueAsString()).toStrictEqual(VALID_BASE64BINARY);
  });
});
