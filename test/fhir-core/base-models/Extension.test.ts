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

import { Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('Extension', () => {
  it('should be properly instantiated', () => {
    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toMatchObject([] as Extension[]);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
  });

  it('should be properly initialized with primitive value', () => {
    const testUrl = 'testUrl';
    const testValue = new StringType('testString');
    const testExtension = new Extension(testUrl, testValue);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toMatchObject([] as Extension[]);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toStrictEqual(testValue);
  });

  it('should throw PrimitiveTypeError when initialized invalid url value', () => {
    const t = () => {
      const testUrl = 123;
      // @ts-expect-error: allow non-boolean to test error handling
      new Extension(testUrl);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid Extension.url (123)');
  });

  it('should be properly modified with new primitive value', () => {
    const testUrl1 = 'testUrl1';
    const testValue1 = new StringType('testString1');
    const testExtension = new Extension(testUrl1, testValue1);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl1);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toStrictEqual(testValue1);

    const testUrl2 = 'testUrl2';
    testExtension.setUrl(testUrl2);
    const testValue2 = new StringType('testString2');
    testExtension.setValue(testValue2);
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toStrictEqual(testValue2);

    const testValue3 = undefined;
    testExtension.setValue(testValue3);
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
  });

  it('should throw PrimitiveTypeError when modified with invalid url value', () => {
    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    expect(testExtension).toBeDefined();
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);

    const t = () => {
      const testUrl1 = 123;
      // @ts-expect-error: allow non-boolean to test error handling
      testExtension.setUrl(testUrl1);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow('Invalid Extension.url (123)');
  });

  it('should be properly copied when instantiated without a value', () => {
    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();

    const copiedExtension = testExtension.copy();
    expect(copiedExtension).toBeDefined();
    expect(copiedExtension).toBeInstanceOf(Extension);
    expect(copiedExtension).toBeInstanceOf(Element);
    expect(copiedExtension.constructor.name).toStrictEqual('Extension');
    expect(copiedExtension.fhirType()).toStrictEqual('Extension');
    expect(copiedExtension.isEmpty()).toBe(false);
    expect(copiedExtension.hasUrl()).toBe(true);
    expect(copiedExtension.getUrl()).toStrictEqual(testUrl);
    expect(copiedExtension.hasValue()).toBe(false);
    expect(copiedExtension.getValue()).toBeUndefined();
  });

  it('should be properly copied when instantiated with primitive value', () => {
    const testUrl = 'testUrl';
    const testValue = new StringType('testString');
    const testExtension = new Extension(testUrl, testValue);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toStrictEqual(testValue);

    const copiedExtension = testExtension.copy();
    expect(copiedExtension).toBeDefined();
    expect(copiedExtension).toBeInstanceOf(Extension);
    expect(copiedExtension).toBeInstanceOf(Element);
    expect(copiedExtension.constructor.name).toStrictEqual('Extension');
    expect(copiedExtension.fhirType()).toStrictEqual('Extension');
    expect(copiedExtension.isEmpty()).toBe(false);
    expect(copiedExtension.hasUrl()).toBe(true);
    expect(copiedExtension.getUrl()).toStrictEqual(testUrl);
    expect(copiedExtension.hasValue()).toBe(true);
    expect(copiedExtension.getValue()).toStrictEqual(testValue);
  });

  it('should be properly initialized with complex value', () => {
    const testUrl = 'testUrl';
    const testValue = new Period();
    testValue.setStart('2024-01-01T00:00:00Z');
    testValue.setEnd('2024-01-01T01:00:00Z');
    const testExtension = new Extension(testUrl, testValue);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toMatchObject([] as Extension[]);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toMatchObject(testValue);
  });

  it('should be properly modified with new complex value', () => {
    const testUrl1 = 'testUrl1';
    const testValue1 = new Period();
    testValue1.setStart('2024-01-01T00:00:00Z');
    testValue1.setEnd('2024-01-01T01:00:00Z');
    const testExtension = new Extension(testUrl1, testValue1);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl1);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toMatchObject(testValue1);

    const testUrl2 = 'testUrl2';
    testExtension.setUrl(testUrl2);
    const testValue2 = new Period();
    testValue2.setStart('2024-02-02T00:00:00Z');
    testValue2.setEnd('2024-02-02T01:00:00Z');
    testExtension.setValue(testValue2);
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toMatchObject(testValue2);

    const testValue3 = undefined;
    testExtension.setValue(testValue3);
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
  });

  it('should be properly copied when instantiated with complex value', () => {
    const testUrl = 'testUrl';
    const testValue = new Period();
    testValue.setStart('2024-01-01T00:00:00Z');
    testValue.setEnd('2024-01-01T01:00:00Z');
    const testExtension = new Extension(testUrl, testValue);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toMatchObject(testValue);

    const copiedExtension = testExtension.copy();
    expect(copiedExtension).toBeDefined();
    expect(copiedExtension).toBeInstanceOf(Extension);
    expect(copiedExtension).toBeInstanceOf(Element);
    expect(copiedExtension.constructor.name).toStrictEqual('Extension');
    expect(copiedExtension.fhirType()).toStrictEqual('Extension');
    expect(copiedExtension.isEmpty()).toBe(false);
    expect(copiedExtension.hasUrl()).toBe(true);
    expect(copiedExtension.getUrl()).toStrictEqual(testUrl);
    expect(copiedExtension.hasValue()).toBe(true);
    expect(copiedExtension.getValue()).toMatchObject(testValue);
  });
});
