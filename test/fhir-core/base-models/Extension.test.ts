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
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

describe('Extension', () => {
  it('should be properly instantiated as empty', () => {
    const testUrl = null;
    const testExtension = new Extension(testUrl);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(true);
    expect(testExtension.toJSON()).toBeUndefined();

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toEqual([] as Extension[]);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(false);
    expect(testExtension.getUrl()).toBeNull();
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
    expect(testExtension.toJSON()).toBeUndefined();
  });

  it('should throw FhirError when instantiated with missing required properties', () => {
    const testId = 'id1234';
    const testUrl = null;
    const testExtension = new Extension(testUrl);
    testExtension.setId(testId);

    const t = () => {
      testExtension.toJSON();
    };
    expect(t).toThrow(FhirError);
    expect(t).toThrow(`The following required properties do not exist: Extension.url`);
  });

  it('should be properly instantiated', () => {
    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);

    const expectedJson = { url: 'testUrl' };
    expect(testExtension.toJSON()).toStrictEqual(expectedJson);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toEqual([] as Extension[]);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
  });

  it('should be properly instantiated with id and multiple extensions', () => {
    const testId = 'id1234';
    const testUrl1 = 'childUrl1';
    const testValue1 = new StringType('testString1');
    const testExtension1 = new Extension(testUrl1, testValue1);
    const testUrl2 = 'childUrl2';
    const testValue2 = new StringType('testString2');
    const testExtension2 = new Extension(testUrl2, testValue2);
    const childExtensions: Extension[] = [testExtension1, testExtension2];

    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    testExtension.setId(testId);
    testExtension.addExtension(testExtension1);
    testExtension.addExtension(testExtension2);

    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(true);
    expect(testExtension.getId()).toStrictEqual(testId);
    expect(testExtension.hasExtension()).toBe(true);
    expect(testExtension.getExtension()).toEqual(childExtensions);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();

    const expectedJson = {
      id: 'id1234',
      url: 'testUrl',
      extension: [
        { url: 'childUrl1', valueString: 'testString1' },
        { url: 'childUrl2', valueString: 'testString2' },
      ],
    };
    expect(testExtension.toJSON()).toStrictEqual(expectedJson);
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

    const expectedJson = { url: 'testUrl', valueString: 'testString' };
    expect(testExtension.toJSON()).toStrictEqual(expectedJson);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toEqual([] as Extension[]);
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
    const expectedJson1 = { url: 'testUrl1', valueString: 'testString1' };

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
    expect(testExtension.toJSON()).toStrictEqual(expectedJson1);

    const testUrl2 = 'testUrl2';
    testExtension.setUrl(testUrl2);
    const testValue2 = new StringType('testString2');
    testExtension.setValue(testValue2);
    const expectedJson2 = { url: 'testUrl2', valueString: 'testString2' };
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toStrictEqual(testValue2);
    expect(testExtension.toJSON()).toStrictEqual(expectedJson2);

    const testValue3 = undefined;
    testExtension.setValue(testValue3);
    const expectedJson3 = { url: 'testUrl2' };
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
    expect(testExtension.toJSON()).toStrictEqual(expectedJson3);
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

  it('should throw InvalidTypeError when modified with invalid data type for value', () => {
    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    expect(testExtension).toBeDefined();
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);

    const t = () => {
      const invalidValue = new XhtmlType();
      testExtension.setValue(invalidValue);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `OpenDataTypes decorator on setValue (Extension.value[x]) expects the 'value' argument type (xhtml) to be a supported DataType`,
    );
  });

  it('should be properly copied when instantiated without a value', () => {
    const testUrl = 'testUrl';
    const testExtension = new Extension(testUrl);
    const expectedJson = { url: 'testUrl' };
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
    expect(testExtension.toJSON()).toStrictEqual(expectedJson);

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
    expect(copiedExtension.toJSON()).toStrictEqual(expectedJson);
  });

  it('should be properly copied when instantiated with primitive value', () => {
    const testUrl = 'testUrl';
    const testValue = new StringType('testString');
    const testExtension = new Extension(testUrl, testValue);
    const expectedJson = { url: 'testUrl', valueString: 'testString' };
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
    expect(testExtension.toJSON()).toStrictEqual(expectedJson);

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
    expect(copiedExtension.toJSON()).toStrictEqual(expectedJson);
  });

  it('should be properly initialized with complex value', () => {
    const testUrl = 'testUrl';
    const testValue = new Period();
    testValue.setStart('2024-01-01T00:00:00Z');
    testValue.setEnd('2024-01-01T01:00:00Z');
    const testExtension = new Extension(testUrl, testValue);
    const expectedJson = {
      url: 'testUrl',
      valuePeriod: { start: '2024-01-01T00:00:00Z', end: '2024-01-01T01:00:00Z' },
    };
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);

    expect(testExtension.toJSON()).toStrictEqual(expectedJson);

    // inherited properties from Element
    expect(testExtension.hasId()).toBe(false);
    expect(testExtension.getId()).toBeUndefined();
    expect(testExtension.hasExtension()).toBe(false);
    expect(testExtension.getExtension()).toEqual([] as Extension[]);
    // Extension properties
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toEqual(testValue);
  });

  it('should be properly modified with new complex value', () => {
    const testUrl1 = 'testUrl1';
    const testValue1 = new Period();
    testValue1.setStart('2024-01-01T00:00:00Z');
    testValue1.setEnd('2024-01-01T01:00:00Z');
    const testExtension = new Extension(testUrl1, testValue1);
    const expectedJson1 = {
      url: 'testUrl1',
      valuePeriod: { start: '2024-01-01T00:00:00Z', end: '2024-01-01T01:00:00Z' },
    };
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl1);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toEqual(testValue1);
    expect(testExtension.toJSON()).toStrictEqual(expectedJson1);

    const testUrl2 = 'testUrl2';
    testExtension.setUrl(testUrl2);
    const testValue2 = new Period();
    testValue2.setStart('2024-02-02T00:00:00Z');
    testValue2.setEnd('2024-02-02T01:00:00Z');
    testExtension.setValue(testValue2);
    const expectedJson2 = {
      url: 'testUrl2',
      valuePeriod: { start: '2024-02-02T00:00:00Z', end: '2024-02-02T01:00:00Z' },
    };
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toEqual(testValue2);
    expect(testExtension.toJSON()).toStrictEqual(expectedJson2);

    const testValue3 = undefined;
    testExtension.setValue(testValue3);
    const expectedJson3 = { url: 'testUrl2' };
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl2);
    expect(testExtension.hasValue()).toBe(false);
    expect(testExtension.getValue()).toBeUndefined();
    expect(testExtension.toJSON()).toStrictEqual(expectedJson3);
  });

  it('should be properly copied when instantiated with complex value', () => {
    const testUrl = 'testUrl';
    const testValue = new Period();
    testValue.setStart('2024-01-01T00:00:00Z');
    testValue.setEnd('2024-01-01T01:00:00Z');
    const testExtension = new Extension(testUrl, testValue);
    const expectedJson1 = {
      url: 'testUrl',
      valuePeriod: { start: '2024-01-01T00:00:00Z', end: '2024-01-01T01:00:00Z' },
    };
    expect(testExtension).toBeDefined();
    expect(testExtension).toBeInstanceOf(Extension);
    expect(testExtension).toBeInstanceOf(Element);
    expect(testExtension.constructor.name).toStrictEqual('Extension');
    expect(testExtension.fhirType()).toStrictEqual('Extension');
    expect(testExtension.isEmpty()).toBe(false);
    expect(testExtension.hasUrl()).toBe(true);
    expect(testExtension.getUrl()).toStrictEqual(testUrl);
    expect(testExtension.hasValue()).toBe(true);
    expect(testExtension.getValue()).toEqual(testValue);
    expect(testExtension.toJSON()).toStrictEqual(expectedJson1);

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
    expect(copiedExtension.getValue()).toEqual(testValue);
    expect(copiedExtension.toJSON()).toStrictEqual(expectedJson1);
  });
});
