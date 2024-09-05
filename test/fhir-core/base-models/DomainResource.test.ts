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
import { Resource } from '@src/fhir-core/base-models/Resource';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { NarrativeStatusEnum } from '@src/fhir-core/data-types/complex/code-systems/NarrativeStatusEnum';
import { Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { beforeAll } from '@jest/globals';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';

describe('DomainResource', () => {
  const VALID_XHTML = '<div xmlns="http://www.w3.org/1999/xhtml">text</div>';
  const VALID_NARRATIVE_1 = new Narrative(NarrativeStatusEnum.GENERATED.code, VALID_XHTML);
  const VALID_NARRATIVE_2 = new Narrative(NarrativeStatusEnum.ADDITIONAL.code, VALID_XHTML);
  let VALID_RESOURCE_1: MockResource;
  let VALID_RESOURCE_2: MockResource;
  const VALID_EXTENSION_1 = new Extension('url1', new StringType('ext string1'));
  const VALID_EXTENSION_2 = new Extension('url2', new StringType('ext string2'));
  const VALID_EXTENSION_3 = new Extension('url3', new StringType('ext string3'));
  const UNDEFINED_VALUE = undefined;

  beforeAll(() => {
    VALID_RESOURCE_1 = new MockResource();
    VALID_RESOURCE_1.setId('Resource-1');
    VALID_RESOURCE_2 = new MockResource();
    VALID_RESOURCE_2.setId('Resource-2');
  });

  it('should be properly instantiated as empty', () => {
    const testDomainResource = new MockDomainResource();
    expect(testDomainResource).toBeDefined();
    expect(testDomainResource).toBeInstanceOf(DomainResource);
    expect(testDomainResource).toBeInstanceOf(Resource);
    expect(testDomainResource).toBeInstanceOf(Base);
    expect(testDomainResource.constructor.name).toStrictEqual('MockDomainResource');
    expect(testDomainResource.resourceType()).toStrictEqual('MockDomainResource');
    expect(testDomainResource.fhirType()).toStrictEqual('DomainResource');
    expect(testDomainResource.isEmpty()).toBe(true);

    // Resource properties
    expect(testDomainResource.hasId()).toBe(false);
    expect(testDomainResource.getId()).toBeUndefined();
    expect(testDomainResource.hasMeta()).toBe(false);
    expect(testDomainResource.getMeta()).toMatchObject(new Meta());
    expect(testDomainResource.hasImplicitRules()).toBe(false);
    expect(testDomainResource.getImplicitRules()).toBeUndefined();
    expect(testDomainResource.hasLanguage()).toBe(false);
    expect(testDomainResource.getLanguage()).toBeUndefined();

    expect(testDomainResource.hasIdElement()).toBe(false);
    expect(testDomainResource.getIdElement()).toMatchObject(new IdType());
    expect(testDomainResource.hasImplicitRulesElement()).toBe(false);
    expect(testDomainResource.getImplicitRulesElement()).toMatchObject(new UriType());
    expect(testDomainResource.hasLanguageElement()).toBe(false);
    expect(testDomainResource.getLanguageElement()).toMatchObject(new CodeType());

    // DomainResources
    expect(testDomainResource.hasText()).toBe(false);
    expect(testDomainResource.getText()).toMatchObject(new Narrative(null, null));
    expect(testDomainResource.hasContained()).toBe(false);
    expect(testDomainResource.getContained()).toMatchObject([] as Resource[]);
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toMatchObject([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toMatchObject([] as Extension[]);
  });

  it('should be properly instantiated with all DomainResource properties', () => {
    const testDomainResource = new MockDomainResource();
    testDomainResource.setText(VALID_NARRATIVE_1);
    testDomainResource.addContained(VALID_RESOURCE_1);
    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    testDomainResource.addModifierExtension(VALID_EXTENSION_3);

    expect(testDomainResource).toBeDefined();
    expect(testDomainResource.isEmpty()).toBe(false);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toMatchObject(VALID_NARRATIVE_1);
    expect(testDomainResource.hasContained()).toBe(true);
    expect(testDomainResource.getContained()).toHaveLength(1);
    expect(testDomainResource.getContained()).toEqual(expect.arrayContaining([VALID_RESOURCE_1]));
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toHaveLength(1);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toHaveLength(2);
    expect(testDomainResource.getModifierExtension()).toEqual(
      expect.arrayContaining([VALID_EXTENSION_2, VALID_EXTENSION_3]),
    );
  });

  it('should be properly reset by modifying all properties with valid values', () => {
    const testDomainResource = new MockDomainResource();
    testDomainResource.setText(VALID_NARRATIVE_1);
    testDomainResource.setContained([VALID_RESOURCE_1]);
    testDomainResource.setExtension([VALID_EXTENSION_1]);
    testDomainResource.setModifierExtension([VALID_EXTENSION_2, VALID_EXTENSION_3]);

    expect(testDomainResource).toBeDefined();
    expect(testDomainResource.isEmpty()).toBe(false);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toMatchObject(VALID_NARRATIVE_1);
    expect(testDomainResource.hasContained()).toBe(true);
    expect(testDomainResource.getContained()).toHaveLength(1);
    expect(testDomainResource.getContained()).toEqual(expect.arrayContaining([VALID_RESOURCE_1]));
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toHaveLength(1);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toHaveLength(2);
    expect(testDomainResource.getModifierExtension()).toEqual(
      expect.arrayContaining([VALID_EXTENSION_2, VALID_EXTENSION_3]),
    );
  });

  it('should be properly reset by modifying all properties with different values', () => {
    const testDomainResource = new MockDomainResource();
    testDomainResource.setText(VALID_NARRATIVE_1);
    testDomainResource.addContained(VALID_RESOURCE_1);
    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    testDomainResource.addModifierExtension(VALID_EXTENSION_3);

    expect(testDomainResource).toBeDefined();
    expect(testDomainResource.isEmpty()).toBe(false);

    testDomainResource.setText(VALID_NARRATIVE_2);
    testDomainResource.setContained([VALID_RESOURCE_2]);
    testDomainResource.setExtension([VALID_EXTENSION_2, VALID_EXTENSION_3]);
    testDomainResource.setModifierExtension([VALID_EXTENSION_1]);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toMatchObject(VALID_NARRATIVE_2);
    expect(testDomainResource.hasContained()).toBe(true);
    expect(testDomainResource.getContained()).toHaveLength(1);
    expect(testDomainResource.getContained()).toEqual(expect.arrayContaining([VALID_RESOURCE_2]));
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toHaveLength(2);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_2, VALID_EXTENSION_3]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toHaveLength(1);
    expect(testDomainResource.getModifierExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));

    testDomainResource.setText(UNDEFINED_VALUE);
    testDomainResource.setContained(UNDEFINED_VALUE);
    testDomainResource.setExtension(UNDEFINED_VALUE);
    testDomainResource.setModifierExtension(UNDEFINED_VALUE);

    expect(testDomainResource.hasText()).toBe(false);
    expect(testDomainResource.getText()).toMatchObject(new Narrative(null, null));
    expect(testDomainResource.hasContained()).toBe(false);
    expect(testDomainResource.getContained()).toMatchObject([] as Resource[]);
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toMatchObject([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toMatchObject([] as Extension[]);
  });

  it('should properly copy()', () => {
    const domainResource = new MockDomainResource();
    domainResource.setText(VALID_NARRATIVE_1);
    domainResource.addContained(VALID_RESOURCE_1);
    domainResource.addExtension(VALID_EXTENSION_1);
    domainResource.addModifierExtension(VALID_EXTENSION_2);
    domainResource.addModifierExtension(VALID_EXTENSION_3);

    const testDomainResource = domainResource.copy();
    expect(testDomainResource).toBeDefined();
    expect(testDomainResource).toBeInstanceOf(DomainResource);
    expect(testDomainResource).toBeInstanceOf(Resource);
    expect(testDomainResource).toBeInstanceOf(Base);
    expect(testDomainResource.constructor.name).toStrictEqual('MockDomainResource');
    expect(testDomainResource.resourceType()).toStrictEqual('MockDomainResource');
    expect(testDomainResource.fhirType()).toStrictEqual('DomainResource');
    expect(testDomainResource.isEmpty()).toBe(false);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toMatchObject(VALID_NARRATIVE_1);
    expect(testDomainResource.hasContained()).toBe(true);
    expect(testDomainResource.getContained()).toHaveLength(1);
    expect(testDomainResource.getContained()).toEqual(expect.arrayContaining([VALID_RESOURCE_1]));
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toHaveLength(1);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toHaveLength(2);
    expect(testDomainResource.getModifierExtension()).toEqual(
      expect.arrayContaining([VALID_EXTENSION_2, VALID_EXTENSION_3]),
    );

    testDomainResource.setText(UNDEFINED_VALUE);
    testDomainResource.setContained(UNDEFINED_VALUE);
    testDomainResource.setExtension(UNDEFINED_VALUE);
    testDomainResource.setModifierExtension(UNDEFINED_VALUE);

    const testDomainResourceCopyEmpty = testDomainResource.copy();
    expect(testDomainResourceCopyEmpty).toBeDefined();
    expect(testDomainResourceCopyEmpty).toBeInstanceOf(DomainResource);
    expect(testDomainResourceCopyEmpty).toBeInstanceOf(Resource);
    expect(testDomainResourceCopyEmpty).toBeInstanceOf(Base);
    expect(testDomainResourceCopyEmpty.constructor.name).toStrictEqual('MockDomainResource');
    expect(testDomainResourceCopyEmpty.resourceType()).toStrictEqual('MockDomainResource');
    expect(testDomainResourceCopyEmpty.fhirType()).toStrictEqual('DomainResource');
    expect(testDomainResourceCopyEmpty.isEmpty()).toBe(true);

    expect(testDomainResource.hasText()).toBe(false);
    expect(testDomainResource.getText()).toMatchObject(new Narrative(null, null));
    expect(testDomainResource.hasContained()).toBe(false);
    expect(testDomainResource.getContained()).toMatchObject([] as Resource[]);
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toMatchObject([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toMatchObject([] as Extension[]);
  });

  it('should add instances to properties defined as arrays', () => {
    const testDomainResource = new MockDomainResource();
    testDomainResource.addContained(VALID_RESOURCE_1);
    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addModifierExtension(VALID_EXTENSION_2);

    expect(testDomainResource.hasContained()).toBe(true);
    expect(testDomainResource.getContained()).toEqual(expect.arrayContaining([VALID_RESOURCE_1]));
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_2]));

    // Adding undefined does not change anything
    testDomainResource.addContained(UNDEFINED_VALUE);
    testDomainResource.addExtension(UNDEFINED_VALUE);
    testDomainResource.addModifierExtension(UNDEFINED_VALUE);

    expect(testDomainResource.hasContained()).toBe(true);
    expect(testDomainResource.getContained()).toEqual(expect.arrayContaining([VALID_RESOURCE_1]));
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_2]));
  });

  it('should properly set an extension with undefined argument', () => {
    const testDomainResource = new MockDomainResource();
    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addModifierExtension(VALID_EXTENSION_2);

    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_2]));

    testDomainResource.setExtension(UNDEFINED_VALUE);
    testDomainResource.setModifierExtension(UNDEFINED_VALUE);

    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toMatchObject([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toMatchObject([] as Extension[]);
  });

  it('should properly verify has extensions work as expected with and without a provided URL', () => {
    const testDomainResource = new MockDomainResource();
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.hasModifierExtension()).toBe(false);

    testDomainResource.addExtension(VALID_EXTENSION_1);
    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.hasExtension('url1')).toBe(true);
    expect(testDomainResource.hasExtension('url2')).toBe(false);

    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.hasModifierExtension('url2')).toBe(true);
    expect(testDomainResource.hasModifierExtension('url1')).toBe(false);

    // Reset with empty arrays
    testDomainResource.setExtension([]);
    expect(testDomainResource.hasExtension()).toBe(false);
    testDomainResource.setModifierExtension([]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
  });

  it('should properly get extensions by URL as expected with a provided URL', () => {
    const testDomainResource = new MockDomainResource();
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtensionByUrl('url1')).toBeUndefined();
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtensionByUrl('url2')).toBeUndefined();

    testDomainResource.addExtension(VALID_EXTENSION_1);
    expect(testDomainResource.hasExtension('url1')).toBe(true);
    expect(testDomainResource.getExtensionByUrl('url1')).toMatchObject(VALID_EXTENSION_1);
    expect(testDomainResource.getExtensionByUrl('url2')).toBeUndefined();

    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    expect(testDomainResource.hasModifierExtension('url2')).toBe(true);
    expect(testDomainResource.getModifierExtensionByUrl('url2')).toMatchObject(VALID_EXTENSION_2);
    expect(testDomainResource.getModifierExtensionByUrl('url1')).toBeUndefined();
  });

  it('should properly remove extensions by URL as expected with a provided URL', () => {
    const testDomainResource = new MockDomainResource();
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.hasModifierExtension()).toBe(false);

    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addExtension(VALID_EXTENSION_3);
    expect(testDomainResource.hasExtension('url1')).toBe(true);
    expect(testDomainResource.hasExtension('url3')).toBe(true);
    testDomainResource.removeExtension('url1');
    expect(testDomainResource.hasExtension('url1')).toBe(false);
    expect(testDomainResource.hasExtension('url3')).toBe(true);

    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    testDomainResource.addModifierExtension(VALID_EXTENSION_3);
    expect(testDomainResource.hasModifierExtension('url2')).toBe(true);
    expect(testDomainResource.hasModifierExtension('url3')).toBe(true);
    testDomainResource.removeModifierExtension('url2');
    expect(testDomainResource.hasModifierExtension('url2')).toBe(false);
    expect(testDomainResource.hasModifierExtension('url3')).toBe(true);
  });
});

class MockDomainResource extends DomainResource {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  resourceType(): string {
    return 'MockDomainResource';
  }

  public copy(): MockDomainResource {
    const dest = new MockDomainResource();
    this.copyValues(dest);
    return dest;
  }
}

class MockResource extends Resource {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  resourceType(): string {
    return 'MockResource';
  }

  public copy(): MockResource {
    const dest = new MockResource();
    this.copyValues(dest);
    return dest;
  }
}
