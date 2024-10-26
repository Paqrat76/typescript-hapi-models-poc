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

import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('BooleanType', () => {
  const INVALID_BOOLEAN = 'invalidBoolean';

  it('should be properly instantiated as empty', () => {
    const testBooleanType = new BooleanType();
    expect(testBooleanType).toBeDefined();
    expect(testBooleanType).toBeInstanceOf(BooleanType);
    expect(testBooleanType).toBeInstanceOf(PrimitiveType);
    expect(testBooleanType.constructor.name).toStrictEqual('BooleanType');
    expect(testBooleanType.fhirType()).toStrictEqual('boolean');
    expect(testBooleanType.isEmpty()).toBe(true);
    expect(testBooleanType.isPrimitive()).toBe(true);
    expect(testBooleanType.isBooleanPrimitive()).toBe(true);
    expect(testBooleanType.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testBooleanType.hasId()).toBe(false);
    expect(testBooleanType.getId()).toBeUndefined();
    expect(testBooleanType.hasExtension()).toBe(false);
    expect(testBooleanType.getExtension()).toEqual([] as Extension[]);
    // primitive value properties
    expect(testBooleanType.hasValue()).toBe(false);
    expect(testBooleanType.getValue()).toBeUndefined();
    expect(testBooleanType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized as true', () => {
    const testBooleanType = new BooleanType(true);
    const testId = 'id1234';
    testBooleanType.setId(testId);
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    testBooleanType.addExtension(testExtension);

    expect(testBooleanType).toBeDefined();
    expect(testBooleanType).toBeInstanceOf(BooleanType);
    expect(testBooleanType.constructor.name).toStrictEqual('BooleanType');
    expect(testBooleanType.fhirType()).toStrictEqual('boolean');
    expect(testBooleanType.isEmpty()).toBe(false);
    expect(testBooleanType.isPrimitive()).toBe(true);
    expect(testBooleanType.isBooleanPrimitive()).toBe(true);
    expect(testBooleanType.toJSON()).toBe(true);
    expect(testBooleanType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testBooleanType.hasId()).toBe(true);
    expect(testBooleanType.getId()).toStrictEqual(testId);
    expect(testBooleanType.hasExtension()).toBe(true);
    expect(testBooleanType.getExtension()).toEqual([testExtension]);
    // primitive value properties
    expect(testBooleanType.hasValue()).toBe(true);
    expect(testBooleanType.getValue()).toBeDefined();
    expect(testBooleanType.getValue()).toBe(true);
    expect(testBooleanType.getValueAsString()).toStrictEqual('true');
  });

  it('should be properly initialized as false', () => {
    const testBooleanType = new BooleanType(false);
    const testId = 'id1234';
    testBooleanType.setId(testId);
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    testBooleanType.addExtension(testExtension);

    expect(testBooleanType).toBeDefined();
    expect(testBooleanType).toBeInstanceOf(BooleanType);
    expect(testBooleanType.constructor.name).toStrictEqual('BooleanType');
    expect(testBooleanType.fhirType()).toStrictEqual('boolean');
    expect(testBooleanType.isEmpty()).toBe(false);
    expect(testBooleanType.isPrimitive()).toBe(true);
    expect(testBooleanType.isBooleanPrimitive()).toBe(true);
    expect(testBooleanType.toJSON()).toBe(false);
    expect(testBooleanType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testBooleanType.hasId()).toBe(true);
    expect(testBooleanType.getId()).toStrictEqual(testId);
    expect(testBooleanType.hasExtension()).toBe(true);
    expect(testBooleanType.getExtension()).toEqual([testExtension]);
    // primitive value properties
    expect(testBooleanType.hasValue()).toBe(true);
    expect(testBooleanType.getValue()).toBeDefined();
    expect(testBooleanType.getValue()).toBe(false);
    expect(testBooleanType.getValueAsString()).toStrictEqual('false');
  });

  it('should throw PrimitiveTypeError when initialized with non-boolean value', () => {
    const t = () => {
      // @ts-expect-error: allow non-boolean to test error handling
      new BooleanType(INVALID_BOOLEAN);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for BooleanType');
  });

  it('should be properly reset by setValue()', () => {
    const testBooleanType = new BooleanType(true);
    expect(testBooleanType.isEmpty()).toBe(false);
    expect(testBooleanType.hasValue()).toBe(true);
    expect(testBooleanType.getValue()).toBeDefined();
    expect(testBooleanType.getValue()).toBe(true);
    expect(testBooleanType.getValueAsString()).toStrictEqual('true');
    expect(testBooleanType.toJSON()).toBe(true);

    testBooleanType.setValue(false);
    expect(testBooleanType.isEmpty()).toBe(false);
    expect(testBooleanType.hasValue()).toBe(true);
    expect(testBooleanType.getValue()).toBeDefined();
    expect(testBooleanType.getValue()).toBe(false);
    expect(testBooleanType.getValueAsString()).toStrictEqual('false');
    expect(testBooleanType.toJSON()).toBe(false);

    testBooleanType.setValue();
    expect(testBooleanType.isEmpty()).toBe(true);
    expect(testBooleanType.hasValue()).toBe(false);
    expect(testBooleanType.getValue()).toBeUndefined();
    expect(testBooleanType.getValueAsString()).toBeUndefined();
    expect(testBooleanType.toJSON()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with non-boolean value', () => {
    const testBooleanType = new BooleanType();
    const t = () => {
      // @ts-expect-error: allow non-boolean to test error handling
      testBooleanType.setValue(INVALID_BOOLEAN);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for BooleanType');
  });

  it('should properly setValueAsString() with correct values', () => {
    // NOTE: setValueAsString() uses parseToPrimitive() tested below
    const testBooleanType = new BooleanType();
    testBooleanType.setValueAsString('true');
    expect(testBooleanType.getValue()).toBe(true);
    testBooleanType.setValueAsString('false');
    expect(testBooleanType.getValue()).toBe(false);
    testBooleanType.setValueAsString();
    expect(testBooleanType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with non-boolean value', () => {
    const testBooleanType = new BooleanType();
    const t = () => {
      testBooleanType.setValueAsString(INVALID_BOOLEAN);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for BooleanType (${INVALID_BOOLEAN})`);
  });

  it('should properly encodeToString with correct values', () => {
    const testBooleanType = new BooleanType();
    expect(testBooleanType.encodeToString(true)).toStrictEqual('true');
    expect(testBooleanType.encodeToString(false)).toStrictEqual('false');
  });

  it('should throw PrimitiveTypeError when encodeToString() with non-boolean value', () => {
    const testBooleanType = new BooleanType();
    const t = () => {
      // @ts-expect-error: allow non-boolean to test error handling
      testBooleanType.encodeToString(INVALID_BOOLEAN);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for BooleanType');
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testBooleanType = new BooleanType();
    expect(testBooleanType.parseToPrimitive('true')).toBe(true);
    expect(testBooleanType.parseToPrimitive('TRUE')).toBe(true);
    expect(testBooleanType.parseToPrimitive(' TrUe ')).toBe(true);
    expect(testBooleanType.parseToPrimitive('false')).toBe(false);
    expect(testBooleanType.parseToPrimitive('FALSE')).toBe(false);
    expect(testBooleanType.parseToPrimitive(' FaLsE ')).toBe(false);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with non-boolean value', () => {
    const testBooleanType = new BooleanType();
    const t = () => {
      testBooleanType.parseToPrimitive(INVALID_BOOLEAN);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for BooleanType');
  });

  it('should properly copy()', () => {
    let booleanType = new BooleanType(true);
    let testBooleanType = booleanType.copy();
    expect(testBooleanType).toBeDefined();
    expect(testBooleanType).toBeInstanceOf(BooleanType);
    expect(testBooleanType.constructor.name).toStrictEqual('BooleanType');
    expect(testBooleanType.fhirType()).toStrictEqual('boolean');
    expect(testBooleanType.isEmpty()).toBe(false);
    expect(testBooleanType.isPrimitive()).toBe(true);
    expect(testBooleanType.isBooleanPrimitive()).toBe(true);
    expect(testBooleanType.toJSON()).toBe(true);
    expect(testBooleanType.hasValue()).toBe(true);
    expect(testBooleanType.getValue()).toBeDefined();
    expect(testBooleanType.getValue()).toBe(true);
    expect(testBooleanType.getValueAsString()).toStrictEqual('true');

    booleanType = new BooleanType(false);
    testBooleanType = booleanType.copy();
    expect(testBooleanType).toBeDefined();
    expect(testBooleanType).toBeInstanceOf(BooleanType);
    expect(testBooleanType.constructor.name).toStrictEqual('BooleanType');
    expect(testBooleanType.fhirType()).toStrictEqual('boolean');
    expect(testBooleanType.isEmpty()).toBe(false);
    expect(testBooleanType.isPrimitive()).toBe(true);
    expect(testBooleanType.isBooleanPrimitive()).toBe(true);
    expect(testBooleanType.toJSON()).toBe(false);
    expect(testBooleanType.hasValue()).toBe(true);
    expect(testBooleanType.getValue()).toBeDefined();
    expect(testBooleanType.getValue()).toBe(false);
    expect(testBooleanType.getValueAsString()).toStrictEqual('false');
  });
});
