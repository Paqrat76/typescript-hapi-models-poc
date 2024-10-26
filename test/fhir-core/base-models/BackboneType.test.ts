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

import { Base } from '@src/fhir-core/base-models/Base';
import { Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { MockBackboneType } from '../../test-utils';

describe('BackboneType', () => {
  const testUrl = 'testUrl';
  const testValue = new StringType('testString');
  const testExtension = new Extension(testUrl, testValue);

  it('should be properly instantiated as empty', () => {
    const mockType = new MockBackboneType();
    expect(mockType).toBeDefined();
    expect(mockType).toBeInstanceOf(Element);
    expect(mockType).toBeInstanceOf(Base);
    expect(mockType.constructor.name).toStrictEqual('MockBackboneType');
    expect(mockType.fhirType()).toStrictEqual('BackboneType');
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.getModifierExtension()).toEqual([] as Extension[]);
    expect(mockType.isEmpty()).toBe(true);
    expect(mockType.toJSON()).toBeUndefined();
  });

  it('should correctly add an Extension', () => {
    const mockType = new MockBackboneType();
    expect(mockType).toBeDefined();
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.hasModifierExtension(testUrl)).toBe(false);
    expect(mockType.getModifierExtension()).toEqual([] as Extension[]);
    expect(mockType.isEmpty()).toBe(true);
    expect(mockType.toJSON()).toBeUndefined();

    mockType.addModifierExtension();
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.hasModifierExtension(testUrl)).toBe(false);
    expect(mockType.getModifierExtension()).toEqual([] as Extension[]);
    expect(mockType.isEmpty()).toBe(true);
    expect(mockType.toJSON()).toBeUndefined();

    mockType.addModifierExtension(testExtension);
    expect(mockType.hasModifierExtension()).toBe(true);
    expect(mockType.hasModifierExtension(testUrl)).toBe(true);
    expect(mockType.getModifierExtension()).toEqual([testExtension]);
    expect(mockType.isEmpty()).toBe(false);
    const expectedJson = {
      modifierExtension: [
        {
          url: 'testUrl',
          valueString: 'testString',
        },
      ],
    };
    expect(mockType.toJSON()).toEqual(expectedJson);
  });

  it('should correctly remove an Extension', () => {
    const mockType = new MockBackboneType();
    expect(mockType).toBeDefined();
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.getModifierExtension()).toEqual([] as Extension[]);
    expect(mockType.isEmpty()).toBe(true);

    mockType.addModifierExtension(testExtension);
    expect(mockType.hasModifierExtension()).toBe(true);
    expect(mockType.getModifierExtension()).toEqual([testExtension]);
    expect(mockType.isEmpty()).toBe(false);

    // no-op
    mockType.removeModifierExtension('nonExistentUrl');
    expect(mockType.hasModifierExtension()).toBe(true);
    expect(mockType.getModifierExtension()).toEqual([testExtension]);
    expect(mockType.isEmpty()).toBe(false);

    mockType.removeModifierExtension(testUrl);
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.getModifierExtension()).toHaveLength(0);
  });

  it('should correctly execute hasExtension()', () => {
    const mockType = new MockBackboneType();
    expect(mockType).toBeDefined();
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.hasModifierExtension(testUrl)).toBe(false);
    expect(mockType.getModifierExtension()).toEqual([] as Extension[]);
    expect(mockType.isEmpty()).toBe(true);

    mockType.addModifierExtension(testExtension);
    expect(mockType.hasModifierExtension()).toBe(true);
    expect(mockType.hasModifierExtension(testUrl)).toBe(true);
    expect(mockType.getModifierExtension()).toEqual([testExtension]);
    expect(mockType.isEmpty()).toBe(false);
  });

  it('should correctly execute getExtensionByUrl()', () => {
    const mockType = new MockBackboneType();
    expect(mockType).toBeDefined();
    expect(mockType.hasModifierExtension()).toBe(false);
    expect(mockType.getModifierExtension()).toEqual([] as Extension[]);
    expect(mockType.isEmpty()).toBe(true);

    const undefExtensionPath1 = mockType.getModifierExtensionByUrl('nonExistentUrl');
    expect(undefExtensionPath1).toBeUndefined();

    mockType.addModifierExtension(testExtension);
    expect(mockType.hasModifierExtension()).toBe(true);
    expect(mockType.getModifierExtension()).toEqual([testExtension]);
    expect(mockType.isEmpty()).toBe(false);

    const undefExtensionPath2 = mockType.getModifierExtensionByUrl('nonExistentUrl');
    expect(undefExtensionPath2).toBeUndefined();

    const returnedExtension = mockType.getModifierExtensionByUrl(testUrl);
    expect(returnedExtension).toBeDefined();
    expect(returnedExtension).toEqual(testExtension);
  });

  it('should correctly execute copy()', () => {
    const expectedJson = {
      modifierExtension: [
        {
          url: 'testUrl',
          valueString: 'testString',
        },
      ],
    };

    const mockType = new MockBackboneType();
    expect(mockType).toBeDefined();
    // An actual BackboneElement will not be instantiated. The setters will be used to set modifierExtension
    mockType.setModifierExtension([testExtension]);
    expect(mockType.isEmpty()).toBe(false);
    expect(mockType.hasModifierExtension()).toBe(true);
    expect(mockType.getModifierExtension()).toEqual([testExtension]);
    expect(mockType.toJSON()).toEqual(expectedJson);

    const testType = mockType.copy();
    expect(testType).toBeDefined();
    expect(testType.isEmpty()).toBe(false);
    expect(testType.hasModifierExtension()).toBe(true);
    expect(testType.getModifierExtension()).toEqual([testExtension]);
    expect(testType.toJSON()).toEqual(expectedJson);
  });
});
