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

import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('IdType', () => {
  const VALID_ID = `testIdType`;
  const VALID_ID_2 = `testIdType2`;
  const INVALID_ID = ' invalid Uri ';

  it('should be properly instantiated as empty', () => {
    const testIdType = new IdType();
    expect(testIdType).toBeDefined();
    expect(testIdType).toBeInstanceOf(IdType);
    expect(testIdType).toBeInstanceOf(PrimitiveType);
    expect(testIdType.constructor.name).toStrictEqual('IdType');
    expect(testIdType.fhirType()).toStrictEqual('id');
    expect(testIdType.isEmpty()).toBe(true);
    expect(testIdType.isPrimitive()).toBe(true);
    expect(testIdType.isStringPrimitive()).toBe(true);
    expect(testIdType.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testIdType.hasId()).toBe(false);
    expect(testIdType.getId()).toBeUndefined();
    expect(testIdType.hasExtension()).toBe(false);
    expect(testIdType.getExtension()).toEqual([] as Extension[]);
    // primitive value properties
    expect(testIdType.hasValue()).toBe(false);
    expect(testIdType.getValue()).toBeUndefined();
    expect(testIdType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testIdType = new IdType(VALID_ID);
    const testId = 'id1234';
    testIdType.setId(testId);
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    testIdType.addExtension(testExtension);

    expect(testIdType).toBeDefined();
    expect(testIdType).toBeInstanceOf(IdType);
    expect(testIdType.constructor.name).toStrictEqual('IdType');
    expect(testIdType.fhirType()).toStrictEqual('id');
    expect(testIdType.isEmpty()).toBe(false);
    expect(testIdType.isPrimitive()).toBe(true);
    expect(testIdType.isStringPrimitive()).toBe(true);
    expect(testIdType.toJSON()).toStrictEqual(VALID_ID);
    expect(testIdType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testIdType.hasId()).toBe(true);
    expect(testIdType.getId()).toStrictEqual(testId);
    expect(testIdType.hasExtension()).toBe(true);
    expect(testIdType.getExtension()).toEqual([testExtension]);
    // primitive value properties
    expect(testIdType.hasValue()).toBe(true);
    expect(testIdType.getValue()).toBeDefined();
    expect(testIdType.getValue()).toStrictEqual(VALID_ID);
    expect(testIdType.getValueAsString()).toStrictEqual(VALID_ID);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new IdType(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for IdType (${INVALID_ID})`);
  });

  it('should be properly reset by setValue()', () => {
    const testIdType = new IdType(VALID_ID);
    expect(testIdType.isEmpty()).toBe(false);
    expect(testIdType.hasValue()).toBe(true);
    expect(testIdType.getValue()).toBeDefined();
    expect(testIdType.getValue()).toStrictEqual(VALID_ID);
    expect(testIdType.getValueAsString()).toStrictEqual(VALID_ID);

    testIdType.setValue(VALID_ID_2);
    expect(testIdType.isEmpty()).toBe(false);
    expect(testIdType.hasValue()).toBe(true);
    expect(testIdType.getValue()).toBeDefined();
    expect(testIdType.getValue()).toStrictEqual(VALID_ID_2);
    expect(testIdType.getValueAsString()).toStrictEqual(VALID_ID_2);

    testIdType.setValue();
    expect(testIdType.isEmpty()).toBe(true);
    expect(testIdType.hasValue()).toBe(false);
    expect(testIdType.getValue()).toBeUndefined();
    expect(testIdType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testIdType = new IdType();
    const t = () => {
      testIdType.setValue(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for IdType (${INVALID_ID})`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testIdType = new IdType(VALID_ID);
    testIdType.setValueAsString(VALID_ID_2);
    expect(testIdType.getValue()).toStrictEqual(VALID_ID_2);
    testIdType.setValueAsString();
    expect(testIdType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testIdType = new IdType();
    const t = () => {
      testIdType.setValueAsString(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for IdType (${INVALID_ID})`);
  });

  it('should properly encodeToString with correct values', () => {
    const testIdType = new IdType(VALID_ID);
    expect(testIdType.encodeToString(VALID_ID)).toStrictEqual(VALID_ID);
  });

  it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
    const testIdType = new IdType();
    const t = () => {
      testIdType.encodeToString(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for IdType (${INVALID_ID})`);
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testIdType = new IdType();
    expect(testIdType.parseToPrimitive(VALID_ID)).toStrictEqual(VALID_ID);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
    const testIdType = new IdType();
    const t = () => {
      testIdType.parseToPrimitive(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for IdType (${INVALID_ID})`);
  });

  it('should properly copy()', () => {
    const idType = new IdType(VALID_ID);
    const testIdType = idType.copy();
    expect(testIdType).toBeDefined();
    expect(testIdType).toBeInstanceOf(IdType);
    expect(testIdType.constructor.name).toStrictEqual('IdType');
    expect(testIdType.fhirType()).toStrictEqual('id');
    expect(testIdType.isEmpty()).toBe(false);
    expect(testIdType.isPrimitive()).toBe(true);
    expect(testIdType.isStringPrimitive()).toBe(true);
    expect(testIdType.toJSON()).toStrictEqual(VALID_ID);
    expect(testIdType.hasValue()).toBe(true);
    expect(testIdType.getValue()).toBeDefined();
    expect(testIdType.getValue()).toStrictEqual(VALID_ID);
    expect(testIdType.getValueAsString()).toStrictEqual(VALID_ID);
  });
});
