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

import { TOO_BIG_STRING } from '../../../test-utils';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('StringType', () => {
  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_2 = 'This is another valid string!';
  const EMPTY_STRING = '';

  it('should be properly instantiated as empty', () => {
    const testStringType = new StringType();
    expect(testStringType).toBeDefined();
    expect(testStringType).toBeInstanceOf(StringType);
    expect(testStringType).toBeInstanceOf(PrimitiveType);
    expect(testStringType.constructor.name).toStrictEqual('StringType');
    expect(testStringType.fhirType()).toStrictEqual('string');
    expect(testStringType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testStringType.hasId()).toBe(false);
    expect(testStringType.getId()).toBeUndefined();
    expect(testStringType.hasExtension()).toBe(false);
    expect(testStringType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testStringType.hasValue()).toBe(false);
    expect(testStringType.getValue()).toBeUndefined();
    expect(testStringType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testStringType = new StringType(VALID_STRING);
    expect(testStringType).toBeDefined();
    expect(testStringType).toBeInstanceOf(StringType);
    expect(testStringType.constructor.name).toStrictEqual('StringType');
    expect(testStringType.fhirType()).toStrictEqual('string');
    expect(testStringType.isEmpty()).toBe(false);

    expect(testStringType.hasValue()).toBe(true);
    expect(testStringType.getValue()).toBeDefined();
    expect(testStringType.getValue()).toStrictEqual(VALID_STRING);
    expect(testStringType.getValueAsString()).toStrictEqual(VALID_STRING);
  });

  it('should throw PrimitiveTypeError when initialized with empty value', () => {
    const t = () => {
      new StringType(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should throw PrimitiveTypeError when initialized with too big value', () => {
    const t = () => {
      new StringType(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should be properly reset by setValue()', () => {
    const testStringType = new StringType(VALID_STRING);
    expect(testStringType.isEmpty()).toBe(false);
    expect(testStringType.hasValue()).toBe(true);
    expect(testStringType.getValue()).toBeDefined();
    expect(testStringType.getValue()).toStrictEqual(VALID_STRING);
    expect(testStringType.getValueAsString()).toStrictEqual(VALID_STRING);

    testStringType.setValue(VALID_STRING_2);
    expect(testStringType.isEmpty()).toBe(false);
    expect(testStringType.hasValue()).toBe(true);
    expect(testStringType.getValue()).toBeDefined();
    expect(testStringType.getValue()).toStrictEqual(VALID_STRING_2);
    expect(testStringType.getValueAsString()).toStrictEqual(VALID_STRING_2);

    testStringType.setValue();
    expect(testStringType.isEmpty()).toBe(true);
    expect(testStringType.hasValue()).toBe(false);
    expect(testStringType.getValue()).toBeUndefined();
    expect(testStringType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with empty value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.setValue(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should throw PrimitiveTypeError when setValue() with too big value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.setValue(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should properly setValueAsString() with correct values', () => {
    const testStringType = new StringType(VALID_STRING);
    testStringType.setValueAsString(VALID_STRING_2);
    expect(testStringType.getValue()).toStrictEqual(VALID_STRING_2);
    testStringType.setValueAsString();
    expect(testStringType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with empty value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.setValueAsString(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should throw PrimitiveTypeError when setValueAsString() with too big value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.setValueAsString(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should properly encode with correct values', () => {
    const testStringType = new StringType();
    expect(testStringType.encode(VALID_STRING)).toStrictEqual(VALID_STRING);
  });

  it('should throw PrimitiveTypeError when encode() with empty value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.encode(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should throw PrimitiveTypeError when encode() with too big value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.encode(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should properly parse with correct values', () => {
    const testStringType = new StringType();
    expect(testStringType.parse(VALID_STRING)).toStrictEqual(VALID_STRING);
  });

  it('should throw PrimitiveTypeError when parse() with empty value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.parse(EMPTY_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should throw PrimitiveTypeError when parse() with too big value', () => {
    const testStringType = new StringType();
    const t = () => {
      testStringType.parse(TOO_BIG_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid value for StringType');
  });

  it('should properly copy()', () => {
    const stringType = new StringType(VALID_STRING);
    const testStringType = stringType.copy();
    expect(testStringType).toBeDefined();
    expect(testStringType).toBeInstanceOf(StringType);
    expect(testStringType.constructor.name).toStrictEqual('StringType');
    expect(testStringType.fhirType()).toStrictEqual('string');
    expect(testStringType.isEmpty()).toBe(false);
    expect(testStringType.hasValue()).toBe(true);
    expect(testStringType.getValue()).toBeDefined();
    expect(testStringType.getValue()).toStrictEqual(VALID_STRING);
    expect(testStringType.getValueAsString()).toStrictEqual(VALID_STRING);
  });
});