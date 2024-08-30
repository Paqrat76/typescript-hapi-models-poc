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

import { OidType } from '@src/fhir/data-types/primitive/OidType';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';
import { Extension, PrimitiveType } from '@src/fhir/base-models/core-fhir-models';

describe('OidType', () => {
  const VALID_OID = `urn:oid:1.2.3.4.5`;
  const VALID_OID_2 = `urn:oid:2.4.6.8.1`;
  const INVALID_OID = '1.3.5.7.9';

  it('should be properly instantiated as empty', () => {
    const testOidType = new OidType();
    expect(testOidType).toBeDefined();
    expect(testOidType).toBeInstanceOf(OidType);
    expect(testOidType).toBeInstanceOf(PrimitiveType);
    expect(testOidType.constructor.name).toStrictEqual('OidType');
    expect(testOidType.fhirType()).toStrictEqual('oid');
    expect(testOidType.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testOidType.hasId()).toBe(false);
    expect(testOidType.getId()).toBeUndefined();
    expect(testOidType.hasExtension()).toBe(false);
    expect(testOidType.getExtension()).toMatchObject([] as Extension[]);
    // primitive value properties
    expect(testOidType.hasValue()).toBe(false);
    expect(testOidType.getValue()).toBeUndefined();
    expect(testOidType.getValueAsString()).toBeUndefined();
  });

  it('should be properly initialized', () => {
    const testOidType = new OidType(VALID_OID);
    expect(testOidType).toBeDefined();
    expect(testOidType).toBeInstanceOf(OidType);
    expect(testOidType.constructor.name).toStrictEqual('OidType');
    expect(testOidType.fhirType()).toStrictEqual('oid');
    expect(testOidType.isEmpty()).toBe(false);

    expect(testOidType.hasValue()).toBe(true);
    expect(testOidType.getValue()).toBeDefined();
    expect(testOidType.getValue()).toStrictEqual(VALID_OID);
    expect(testOidType.getValueAsString()).toStrictEqual(VALID_OID);
  });

  it('should throw PrimitiveTypeError when initialized with invalid value', () => {
    const t = () => {
      new OidType(INVALID_OID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_OID}) for OidType`);
  });

  it('should be properly reset by setValue()', () => {
    const testOidType = new OidType(VALID_OID);
    expect(testOidType.isEmpty()).toBe(false);
    expect(testOidType.hasValue()).toBe(true);
    expect(testOidType.getValue()).toBeDefined();
    expect(testOidType.getValue()).toStrictEqual(VALID_OID);
    expect(testOidType.getValueAsString()).toStrictEqual(VALID_OID);

    testOidType.setValue(VALID_OID_2);
    expect(testOidType.isEmpty()).toBe(false);
    expect(testOidType.hasValue()).toBe(true);
    expect(testOidType.getValue()).toBeDefined();
    expect(testOidType.getValue()).toStrictEqual(VALID_OID_2);
    expect(testOidType.getValueAsString()).toStrictEqual(VALID_OID_2);

    testOidType.setValue();
    expect(testOidType.isEmpty()).toBe(true);
    expect(testOidType.hasValue()).toBe(false);
    expect(testOidType.getValue()).toBeUndefined();
    expect(testOidType.getValueAsString()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
    const testOidType = new OidType();
    const t = () => {
      testOidType.setValue(INVALID_OID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_OID}) for OidType`);
  });

  it('should properly setValueAsString() with correct values', () => {
    const testOidType = new OidType(VALID_OID);
    testOidType.setValueAsString(VALID_OID_2);
    expect(testOidType.getValue()).toStrictEqual(VALID_OID_2);
    testOidType.setValueAsString();
    expect(testOidType.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
    const testOidType = new OidType();
    const t = () => {
      testOidType.setValueAsString(INVALID_OID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_OID}) for OidType`);
  });

  it('should properly encode with correct values', () => {
    const testOidType = new OidType(VALID_OID);
    expect(testOidType.encode(VALID_OID)).toStrictEqual(VALID_OID);
  });

  it('should throw PrimitiveTypeError when encode() with invalid value', () => {
    const testOidType = new OidType();
    const t = () => {
      testOidType.encode(INVALID_OID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_OID}) for OidType`);
  });

  it('should properly parse with correct values', () => {
    const testOidType = new OidType();
    expect(testOidType.parse(VALID_OID)).toStrictEqual(VALID_OID);
  });

  it('should throw PrimitiveTypeError when parse() with invalid value', () => {
    const testOidType = new OidType();
    const t = () => {
      testOidType.parse(INVALID_OID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_OID}) for OidType`);
  });

  it('should properly copy()', () => {
    const oidType = new OidType(VALID_OID);
    const testOidType = oidType.copy();
    expect(testOidType).toBeDefined();
    expect(testOidType).toBeInstanceOf(OidType);
    expect(testOidType.constructor.name).toStrictEqual('OidType');
    expect(testOidType.fhirType()).toStrictEqual('oid');
    expect(testOidType.isEmpty()).toBe(false);
    expect(testOidType.hasValue()).toBe(true);
    expect(testOidType.getValue()).toBeDefined();
    expect(testOidType.getValue()).toStrictEqual(VALID_OID);
    expect(testOidType.getValueAsString()).toStrictEqual(VALID_OID);
  });
});
