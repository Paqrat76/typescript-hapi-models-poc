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
import { Base } from '@src/fhir-core/base-models/Base';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { MockElement, MockTask } from '../../test-utils';

describe('Element', () => {
  const testId = 'testIdValue';
  const testUrl = 'testUrl';
  const testValue = new StringType('testString');
  const testExtension = new Extension(testUrl, testValue);
  const expectedJson = {
    id: 'testIdValue',
    extension: [{ url: 'testUrl', valueString: 'testString' }],
  };
  const INVALID_ID = '';

  it('should be properly instantiated as empty', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    expect(mockElement).toBeInstanceOf(Element);
    expect(mockElement).toBeInstanceOf(Base);
    expect(mockElement.constructor.name).toStrictEqual('MockElement');
    expect(mockElement.fhirType()).toStrictEqual('Element');
    expect(mockElement.hasId()).toBe(false);
    expect(mockElement.getId()).toBeUndefined();
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.getExtension()).toEqual([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);
    expect(mockElement.toJSON()).toBeUndefined();
  });

  it('should be properly instantiated', () => {
    const mockElement = new MockElement();
    mockElement.setId(testId);
    mockElement.addExtension(testExtension);
    expect(mockElement).toBeDefined();
    expect(mockElement).toBeInstanceOf(Element);
    expect(mockElement).toBeInstanceOf(Base);
    expect(mockElement.constructor.name).toStrictEqual('MockElement');
    expect(mockElement.fhirType()).toStrictEqual('Element');
    expect(mockElement.hasId()).toBe(true);
    expect(mockElement.getId()).toStrictEqual(testId);
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.hasExtension(testUrl)).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
    expect(mockElement.toJSON()).toEqual(expectedJson);
  });

  it('should be properly handle setting the id property', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasId()).toBe(false);
    expect(mockElement.getId()).toBeUndefined();
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.setId(undefined);
    expect(mockElement.hasId()).toBe(false);
    expect(mockElement.getId()).toBeUndefined();
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.setId(testId);
    expect(mockElement.hasId()).toBe(true);
    expect(mockElement.getId()).toStrictEqual(testId);
    expect(mockElement.isEmpty()).toBe(false);

    const t = () => {
      mockElement.setId('');
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Element.id ()`);
  });

  it('should correctly add an Extension', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.hasExtension(testUrl)).toBe(false);
    expect(mockElement.getExtension()).toEqual([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addExtension(undefined);
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.hasExtension(testUrl)).toBe(false);
    expect(mockElement.getExtension()).toEqual([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addExtension(testExtension);
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.hasExtension(testUrl)).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
  });

  it('should correctly remove an Extension', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.getExtension()).toEqual([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addExtension(testExtension);
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);

    // no-op
    mockElement.removeExtension('nonExistentUrl');
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);

    mockElement.removeExtension(testUrl);
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.getExtension()).toHaveLength(0);
  });

  it('should correctly execute hasExtension()', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.hasExtension(testUrl)).toBe(false);
    expect(mockElement.getExtension()).toEqual([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.setExtension([testExtension]);
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.hasExtension(testUrl)).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
  });

  it('should correctly execute getExtensionByUrl()', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasExtension()).toBe(false);
    expect(mockElement.getExtension()).toEqual([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    const undefExtensionPath1 = mockElement.getExtensionByUrl('nonExistentUrl');
    expect(undefExtensionPath1).toBeUndefined();

    mockElement.addExtension(testExtension);
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);

    const undefExtensionPath2 = mockElement.getExtensionByUrl('nonExistentUrl');
    expect(undefExtensionPath2).toBeUndefined();

    const returnedExtension = mockElement.getExtensionByUrl(testUrl);
    expect(returnedExtension).toBeDefined();
    expect(returnedExtension).toEqual(testExtension);
  });

  it('should correctly execute copy()', () => {
    const mockElement = new MockElement();
    expect(mockElement).toBeDefined();
    // An actual Element will not be instantiated. The setters will be used to set id and extension
    mockElement.setId(testId);
    mockElement.setExtension([testExtension]);
    expect(mockElement.hasId()).toBe(true);
    expect(mockElement.getId()).toStrictEqual(testId);
    expect(mockElement.hasExtension()).toBe(true);
    expect(mockElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
    expect(mockElement.toJSON()).toEqual(expectedJson);

    const testElement = mockElement.copy();
    expect(testElement).toBeDefined();
    expect(testElement.isEmpty()).toBe(false);
    expect(testElement.hasId()).toBe(true);
    expect(testElement.getId()).toStrictEqual(testId);
    expect(testElement.hasExtension()).toBe(true);
    expect(testElement.getExtension()).toEqual([testExtension]);
    expect(mockElement.toJSON()).toEqual(expectedJson);
  });

  it('should throw PrimitiveTypeError when setId() with invalid value', () => {
    const testElement = new MockElement();
    const t = () => {
      testElement.setId(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Element.id (${INVALID_ID})`);
  });

  it('should throw InvalidTypeError when setExtension() with invalid value', () => {
    const testElement = new MockElement();
    const INVALID_EXT = new MockTask();
    const t = () => {
      // @ts-expect-error: allow non-Extension for testing
      testElement.setExtension([INVALID_EXT]);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `Invalid Element.extension; Provided extension array has an element that is not an instance of Extension.`,
    );
  });

  it('should throw InvalidTypeError when addExtension() with invalid value', () => {
    const testElement = new MockElement();
    const INVALID_EXT = new MockTask();
    const t = () => {
      // @ts-expect-error: allow non-Extension for testing
      testElement.addExtension(INVALID_EXT);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid Element.extension; Provided extension is not an instance of Extension.`);
  });
});
