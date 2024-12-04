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

import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('XhtmlType', () => {
  const VALID_XHTML = `<div xmlns="http://www.w3.org/1999/xhtml">text</div>`;
  const VALID_XHTML_2 = `any\tstring\r\nlike this that passes the regex `;
  const INVALID_XHTML = '';
  const testExtension = new Extension('testUrl', new StringType('extension string value'));

  it('should be properly instantiated as empty', () => {
    const testXhtmlType = new XhtmlType();
    expect(testXhtmlType).toBeDefined();
    expect(testXhtmlType).toBeInstanceOf(XhtmlType);
    expect(testXhtmlType).toBeInstanceOf(PrimitiveType);
    expect(testXhtmlType.constructor.name).toStrictEqual('XhtmlType');
    expect(testXhtmlType.fhirType()).toStrictEqual('xhtml');
    expect(testXhtmlType.isEmpty()).toBe(true);
    expect(testXhtmlType.isPrimitive()).toBe(true);
    expect(testXhtmlType.isStringPrimitive()).toBe(true);
    expect(testXhtmlType.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testXhtmlType.hasId()).toBe(false);
    expect(testXhtmlType.getId()).toBeUndefined();
    expect(testXhtmlType.hasExtension()).toBe(false);
    expect(testXhtmlType.getExtension()).toEqual([] as Extension[]);
    // primitive value properties
    expect(testXhtmlType.hasValue()).toBe(false);
    expect(testXhtmlType.getValue()).toBeUndefined();
    expect(testXhtmlType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    const testId = 'id1234';
    testXhtmlType.setId(testId);

    expect(testXhtmlType).toBeDefined();
    expect(testXhtmlType).toBeInstanceOf(XhtmlType);
    expect(testXhtmlType.constructor.name).toStrictEqual('XhtmlType');
    expect(testXhtmlType.fhirType()).toStrictEqual('xhtml');
    expect(testXhtmlType.isEmpty()).toBe(false);
    expect(testXhtmlType.isPrimitive()).toBe(true);
    expect(testXhtmlType.isStringPrimitive()).toBe(true);
    expect(testXhtmlType.toJSON()).toStrictEqual(VALID_XHTML);
    expect(testXhtmlType.toSiblingJSON()).toEqual({ id: 'id1234' });

    // inherited properties from Element
    expect(testXhtmlType.hasId()).toBe(true);
    expect(testXhtmlType.getId()).toStrictEqual(testId);
    expect(testXhtmlType.hasExtension()).toBe(false);
    expect(testXhtmlType.getExtension()).toStrictEqual([]);
    // primitive value properties
    expect(testXhtmlType.hasValue()).toBe(true);
    expect(testXhtmlType.getValue()).toBeDefined();
    expect(testXhtmlType.getValue()).toStrictEqual(VALID_XHTML);
    expect(testXhtmlType.getValueAsString()).toStrictEqual(VALID_XHTML);
  });

  it('should be properly handle setExtension() and addExtension()', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    expect(testXhtmlType.isEmpty()).toBe(false);
    expect(testXhtmlType.hasValue()).toBe(true);
    expect(testXhtmlType.getValue()).toBeDefined();
    expect(testXhtmlType.getValue()).toStrictEqual(VALID_XHTML);
    expect(testXhtmlType.getValueAsString()).toStrictEqual(VALID_XHTML);

    expect(testXhtmlType.hasExtension()).toBe(false);
    expect(testXhtmlType.getExtension()).toEqual([] as Extension[]);

    testXhtmlType.setExtension(undefined);
    expect(testXhtmlType.hasExtension()).toBe(false);
    expect(testXhtmlType.getExtension()).toEqual([] as Extension[]);

    testXhtmlType.addExtension(undefined);
    expect(testXhtmlType.hasExtension()).toBe(false);
    expect(testXhtmlType.getExtension()).toEqual([] as Extension[]);
  });

  it('should throw TypeError when attempting to setExtension()', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    const t = () => {
      testXhtmlType.setExtension([testExtension]);
    };
    expect(t).toThrow(FhirError);
    expect(t).toThrow(`According to the FHIR specification, Extensions are not permitted on the xhtml type`);
  });

  it('should throw TypeError when attempting to addExtension()', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    const t = () => {
      testXhtmlType.addExtension(testExtension);
    };
    expect(t).toThrow(FhirError);
    expect(t).toThrow(`According to the FHIR specification, Extensions are not permitted on the xhtml type`);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new XhtmlType(INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should be properly reset by setValue()', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    expect(testXhtmlType.isEmpty()).toBe(false);
    expect(testXhtmlType.hasValue()).toBe(true);
    expect(testXhtmlType.getValue()).toBeDefined();
    expect(testXhtmlType.getValue()).toStrictEqual(VALID_XHTML);
    expect(testXhtmlType.getValueAsString()).toStrictEqual(VALID_XHTML);

    testXhtmlType.setValue(VALID_XHTML_2);
    expect(testXhtmlType.isEmpty()).toBe(false);
    expect(testXhtmlType.hasValue()).toBe(true);
    expect(testXhtmlType.getValue()).toBeDefined();
    expect(testXhtmlType.getValue()).toStrictEqual(VALID_XHTML_2);
    expect(testXhtmlType.getValueAsString()).toStrictEqual(VALID_XHTML_2);

    testXhtmlType.setValue();
    expect(testXhtmlType.isEmpty()).toBe(true);
    expect(testXhtmlType.hasValue()).toBe(false);
    expect(testXhtmlType.getValue()).toBeUndefined();
    expect(testXhtmlType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testXhtmlType = new XhtmlType();
    const t = () => {
      testXhtmlType.setValue(INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    testXhtmlType.setValueAsString(VALID_XHTML_2);
    expect(testXhtmlType.getValue()).toStrictEqual(VALID_XHTML_2);
    testXhtmlType.setValueAsString();
    expect(testXhtmlType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testXhtmlType = new XhtmlType();
    const t = () => {
      testXhtmlType.setValueAsString(INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should properly encodeToString with correct values', () => {
    const testXhtmlType = new XhtmlType(VALID_XHTML);
    expect(testXhtmlType.encodeToString(VALID_XHTML)).toStrictEqual(VALID_XHTML);
  });

  it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
    const testXhtmlType = new XhtmlType();
    const t = () => {
      testXhtmlType.encodeToString(INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should properly parseToPrimitive with correct values', () => {
    const testXhtmlType = new XhtmlType();
    expect(testXhtmlType.parseToPrimitive(VALID_XHTML)).toStrictEqual(VALID_XHTML);
  });

  it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
    const testXhtmlType = new XhtmlType();
    const t = () => {
      testXhtmlType.parseToPrimitive(INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should properly copy()', () => {
    const xhtmlType = new XhtmlType(VALID_XHTML);
    const testXhtmlType = xhtmlType.copy();
    expect(testXhtmlType).toBeDefined();
    expect(testXhtmlType).toBeInstanceOf(XhtmlType);
    expect(testXhtmlType.constructor.name).toStrictEqual('XhtmlType');
    expect(testXhtmlType.fhirType()).toStrictEqual('xhtml');
    expect(testXhtmlType.isEmpty()).toBe(false);
    expect(testXhtmlType.isPrimitive()).toBe(true);
    expect(testXhtmlType.isStringPrimitive()).toBe(true);
    expect(testXhtmlType.toJSON()).toStrictEqual(VALID_XHTML);
    expect(testXhtmlType.hasValue()).toBe(true);
    expect(testXhtmlType.getValue()).toBeDefined();
    expect(testXhtmlType.getValue()).toStrictEqual(VALID_XHTML);
    expect(testXhtmlType.getValueAsString()).toStrictEqual(VALID_XHTML);
  });
});
