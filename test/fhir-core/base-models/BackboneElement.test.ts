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
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';

describe('BackboneElement', () => {
  const testUrl = 'testUrl';
  const testValue = new StringType('testString');
  const testExtension = new Extension(testUrl, testValue);

  it('should be properly instantiated as empty', () => {
    const mockElement = new MockBackboneElement();
    expect(mockElement).toBeDefined();
    expect(mockElement).toBeInstanceOf(Element);
    expect(mockElement).toBeInstanceOf(Base);
    expect(mockElement.constructor.name).toStrictEqual('MockBackboneElement');
    expect(mockElement.fhirType()).toStrictEqual('BackboneElement');
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.getModifierExtension()).toMatchObject([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);
  });

  it('should correctly add an Extension', () => {
    const mockElement = new MockBackboneElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.hasModifierExtension(testUrl)).toBe(false);
    expect(mockElement.getModifierExtension()).toMatchObject([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addModifierExtension();
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.hasModifierExtension(testUrl)).toBe(false);
    expect(mockElement.getModifierExtension()).toMatchObject([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addModifierExtension(testExtension);
    expect(mockElement.hasModifierExtension()).toBe(true);
    expect(mockElement.hasModifierExtension(testUrl)).toBe(true);
    expect(mockElement.getModifierExtension()).toMatchObject([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
  });

  it('should correctly remove an Extension', () => {
    const mockElement = new MockBackboneElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.getModifierExtension()).toMatchObject([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addModifierExtension(testExtension);
    expect(mockElement.hasModifierExtension()).toBe(true);
    expect(mockElement.getModifierExtension()).toMatchObject([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);

    // no-op
    mockElement.removeModifierExtension('nonExistentUrl');
    expect(mockElement.hasModifierExtension()).toBe(true);
    expect(mockElement.getModifierExtension()).toMatchObject([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);

    mockElement.removeModifierExtension(testUrl);
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.getModifierExtension()).toHaveLength(0);
  });

  it('should correctly execute hasExtension()', () => {
    const mockElement = new MockBackboneElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.hasModifierExtension(testUrl)).toBe(false);
    expect(mockElement.getModifierExtension()).toMatchObject([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    mockElement.addModifierExtension(testExtension);
    expect(mockElement.hasModifierExtension()).toBe(true);
    expect(mockElement.hasModifierExtension(testUrl)).toBe(true);
    expect(mockElement.getModifierExtension()).toMatchObject([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
  });

  it('should correctly execute getExtensionByUrl()', () => {
    const mockElement = new MockBackboneElement();
    expect(mockElement).toBeDefined();
    expect(mockElement.hasModifierExtension()).toBe(false);
    expect(mockElement.getModifierExtension()).toMatchObject([] as Extension[]);
    expect(mockElement.isEmpty()).toBe(true);

    const undefExtensionPath1 = mockElement.getModifierExtensionByUrl('nonExistentUrl');
    expect(undefExtensionPath1).toBeUndefined();

    mockElement.addModifierExtension(testExtension);
    expect(mockElement.hasModifierExtension()).toBe(true);
    expect(mockElement.getModifierExtension()).toMatchObject([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);

    const undefExtensionPath2 = mockElement.getModifierExtensionByUrl('nonExistentUrl');
    expect(undefExtensionPath2).toBeUndefined();

    const returnedExtension = mockElement.getModifierExtensionByUrl(testUrl);
    expect(returnedExtension).toBeDefined();
    expect(returnedExtension).toMatchObject(testExtension);
  });

  it('should correctly execute copy()', () => {
    const mockElement = new MockBackboneElement();
    expect(mockElement).toBeDefined();
    // An actual BackboneElement will not be instantiated. The setters will be used to set modifierExtension
    mockElement.setModifierExtension([testExtension]);
    expect(mockElement.isEmpty()).toBe(false);
    expect(mockElement.hasModifierExtension()).toBe(true);
    expect(mockElement.getModifierExtension()).toMatchObject([testExtension]);

    const testElement = mockElement.copy();
    expect(testElement).toBeDefined();
    expect(testElement.isEmpty()).toBe(false);
    expect(testElement.hasModifierExtension()).toBe(true);
    expect(testElement.getModifierExtension()).toMatchObject([testExtension]);
  });
});

class MockBackboneElement extends BackboneElement {
  constructor(modifierExtension?: Extension[]) {
    super();
    if (modifierExtension !== undefined) {
      this.modifierExtension = modifierExtension;
    }
  }

  public copy(): MockBackboneElement {
    const dest = new MockBackboneElement();
    this.copyValues(dest);
    return dest;
  }
}
