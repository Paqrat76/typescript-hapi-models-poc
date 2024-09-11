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

import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';

describe('CodeType', () => {
  const VALID_CODE = `testCodeType`;
  const VALID_CODE_2 = `testCodeType2`;
  const INVALID_CODE = ' invalid CodeType ';

  it('should be properly instantiated as empty', () => {
    const testCodeType = new CodeType();
    expect(testCodeType).toBeDefined();
    expect(testCodeType).toBeInstanceOf(CodeType);
    expect(testCodeType).toBeInstanceOf(PrimitiveType);
    expect(testCodeType.constructor.name).toStrictEqual('CodeType');
    expect(testCodeType.fhirType()).toStrictEqual('code');
    expect(testCodeType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCodeType.hasId()).toBe(false);
    expect(testCodeType.getId()).toBeUndefined();
    expect(testCodeType.hasExtension()).toBe(false);
    expect(testCodeType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testCodeType.hasValue()).toBe(false);
    expect(testCodeType.getValue()).toBeUndefined();
    expect(testCodeType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testCodeType = new CodeType(VALID_CODE);
    expect(testCodeType).toBeDefined();
    expect(testCodeType).toBeInstanceOf(CodeType);
    expect(testCodeType.constructor.name).toStrictEqual('CodeType');
    expect(testCodeType.fhirType()).toStrictEqual('code');
    expect(testCodeType.isEmpty()).toBe(false);

    expect(testCodeType.hasValue()).toBe(true);
    expect(testCodeType.getValue()).toBeDefined();
    expect(testCodeType.getValue()).toStrictEqual(VALID_CODE);
    expect(testCodeType.getValueAsString()).toStrictEqual(VALID_CODE);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new CodeType(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });

  it('should be properly reset by setValue()', () => {
    const testCodeType = new CodeType(VALID_CODE);
    expect(testCodeType.isEmpty()).toBe(false);
    expect(testCodeType.hasValue()).toBe(true);
    expect(testCodeType.getValue()).toBeDefined();
    expect(testCodeType.getValue()).toStrictEqual(VALID_CODE);
    expect(testCodeType.getValueAsString()).toStrictEqual(VALID_CODE);

    testCodeType.setValue(VALID_CODE_2);
    expect(testCodeType.isEmpty()).toBe(false);
    expect(testCodeType.hasValue()).toBe(true);
    expect(testCodeType.getValue()).toBeDefined();
    expect(testCodeType.getValue()).toStrictEqual(VALID_CODE_2);
    expect(testCodeType.getValueAsString()).toStrictEqual(VALID_CODE_2);

    testCodeType.setValue();
    expect(testCodeType.isEmpty()).toBe(true);
    expect(testCodeType.hasValue()).toBe(false);
    expect(testCodeType.getValue()).toBeUndefined();
    expect(testCodeType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testCodeType = new CodeType();
    const t = () => {
      testCodeType.setValue(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testCodeType = new CodeType(VALID_CODE);
    testCodeType.setValueAsString(VALID_CODE_2);
    expect(testCodeType.getValue()).toStrictEqual(VALID_CODE_2);
    testCodeType.setValueAsString();
    expect(testCodeType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testCodeType = new CodeType();
    const t = () => {
      testCodeType.setValueAsString(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });

  it('should properly encodeToString with correct values', () => {
    const testCodeType = new CodeType(VALID_CODE);
    expect(testCodeType.encodeToString(VALID_CODE)).toStrictEqual(VALID_CODE);
  });

  it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
    const testCodeType = new CodeType();
    const t = () => {
      testCodeType.encodeToString(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testCodeType = new CodeType();
    expect(testCodeType.parseToPrimitive(VALID_CODE)).toStrictEqual(VALID_CODE);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
    const testCodeType = new CodeType();
    const t = () => {
      testCodeType.parseToPrimitive(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });

  it('should properly copy()', () => {
    const codeType = new CodeType(VALID_CODE);
    const testCodeType = codeType.copy();
    expect(testCodeType).toBeDefined();
    expect(testCodeType).toBeInstanceOf(CodeType);
    expect(testCodeType.constructor.name).toStrictEqual('CodeType');
    expect(testCodeType.fhirType()).toStrictEqual('code');
    expect(testCodeType.isEmpty()).toBe(false);
    expect(testCodeType.hasValue()).toBe(true);
    expect(testCodeType.getValue()).toBeDefined();
    expect(testCodeType.getValue()).toStrictEqual(VALID_CODE);
    expect(testCodeType.getValueAsString()).toStrictEqual(VALID_CODE);
  });
});
