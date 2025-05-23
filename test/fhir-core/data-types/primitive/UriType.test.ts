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
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('UriType', () => {
  const VALID_URI = `testUriType`;
  const VALID_URI_2 = `testUriType2`;
  const INVALID_URI = ' invalid Uri ';

  it('should be properly instantiated as empty', () => {
    const testUriType = new UriType();
    expect(testUriType).toBeDefined();
    expect(testUriType).toBeInstanceOf(UriType);
    expect(testUriType).toBeInstanceOf(PrimitiveType);
    expect(testUriType.constructor.name).toStrictEqual('UriType');
    expect(testUriType.fhirType()).toStrictEqual('uri');
    expect(testUriType.isEmpty()).toBe(true);
    expect(testUriType.isPrimitive()).toBe(true);
    expect(testUriType.isStringPrimitive()).toBe(true);
    expect(testUriType.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testUriType.hasId()).toBe(false);
    expect(testUriType.getId()).toBeUndefined();
    expect(testUriType.hasExtension()).toBe(false);
    expect(testUriType.getExtension()).toEqual([] as Extension[]);
    // primitive value properties
    expect(testUriType.hasValue()).toBe(false);
    expect(testUriType.getValue()).toBeUndefined();
    expect(testUriType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testUriType = new UriType(VALID_URI);
    const testId = 'id1234';
    testUriType.setId(testId);
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    testUriType.addExtension(testExtension);

    expect(testUriType).toBeDefined();
    expect(testUriType).toBeInstanceOf(UriType);
    expect(testUriType.constructor.name).toStrictEqual('UriType');
    expect(testUriType.fhirType()).toStrictEqual('uri');
    expect(testUriType.isEmpty()).toBe(false);
    expect(testUriType.isPrimitive()).toBe(true);
    expect(testUriType.isStringPrimitive()).toBe(true);
    expect(testUriType.toJSON()).toStrictEqual(VALID_URI);
    expect(testUriType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testUriType.hasId()).toBe(true);
    expect(testUriType.getId()).toStrictEqual(testId);
    expect(testUriType.hasExtension()).toBe(true);
    expect(testUriType.getExtension()).toEqual([testExtension]);
    // primitive value properties
    expect(testUriType.hasValue()).toBe(true);
    expect(testUriType.getValue()).toBeDefined();
    expect(testUriType.getValue()).toStrictEqual(VALID_URI);
    expect(testUriType.getValueAsString()).toStrictEqual(VALID_URI);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new UriType(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for UriType (${INVALID_URI})`);
  });

  it('should be properly reset by setValue()', () => {
    const testUriType = new UriType(VALID_URI);
    expect(testUriType.isEmpty()).toBe(false);
    expect(testUriType.hasValue()).toBe(true);
    expect(testUriType.getValue()).toBeDefined();
    expect(testUriType.getValue()).toStrictEqual(VALID_URI);
    expect(testUriType.getValueAsString()).toStrictEqual(VALID_URI);

    testUriType.setValue(VALID_URI_2);
    expect(testUriType.isEmpty()).toBe(false);
    expect(testUriType.hasValue()).toBe(true);
    expect(testUriType.getValue()).toBeDefined();
    expect(testUriType.getValue()).toStrictEqual(VALID_URI_2);
    expect(testUriType.getValueAsString()).toStrictEqual(VALID_URI_2);

    testUriType.setValue();
    expect(testUriType.isEmpty()).toBe(true);
    expect(testUriType.hasValue()).toBe(false);
    expect(testUriType.getValue()).toBeUndefined();
    expect(testUriType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testUriType = new UriType();
    const t = () => {
      testUriType.setValue(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for UriType (${INVALID_URI})`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testUriType = new UriType(VALID_URI);
    testUriType.setValueAsString(VALID_URI_2);
    expect(testUriType.getValue()).toStrictEqual(VALID_URI_2);
    testUriType.setValueAsString();
    expect(testUriType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testUriType = new UriType();
    const t = () => {
      testUriType.setValueAsString(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for UriType (${INVALID_URI})`);
  });

  it('should properly encodeToString with correct values', () => {
    const testUriType = new UriType(VALID_URI);
    expect(testUriType.encodeToString(VALID_URI)).toStrictEqual(VALID_URI);
  });

  it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
    const testUriType = new UriType();
    const t = () => {
      testUriType.encodeToString(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for UriType (${INVALID_URI})`);
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testUriType = new UriType();
    expect(testUriType.parseToPrimitive(VALID_URI)).toStrictEqual(VALID_URI);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
    const testUriType = new UriType();
    const t = () => {
      testUriType.parseToPrimitive(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for UriType (${INVALID_URI})`);
  });

  it('should properly copy()', () => {
    const uriType = new UriType(VALID_URI);
    const testUriType = uriType.copy();
    expect(testUriType).toBeDefined();
    expect(testUriType).toBeInstanceOf(UriType);
    expect(testUriType.constructor.name).toStrictEqual('UriType');
    expect(testUriType.fhirType()).toStrictEqual('uri');
    expect(testUriType.isEmpty()).toBe(false);
    expect(testUriType.isPrimitive()).toBe(true);
    expect(testUriType.isStringPrimitive()).toBe(true);
    expect(testUriType.toJSON()).toStrictEqual(VALID_URI);
    expect(testUriType.hasValue()).toBe(true);
    expect(testUriType.getValue()).toBeDefined();
    expect(testUriType.getValue()).toStrictEqual(VALID_URI);
    expect(testUriType.getValueAsString()).toStrictEqual(VALID_URI);
  });
});
