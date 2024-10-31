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
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockTask } from '../../test-utils';

describe('DomainResource', () => {
  const VALID_XHTML = '<div xmlns="http://www.w3.org/1999/xhtml">text</div>';
  const VALID_NARRATIVE_1 = new Narrative(NarrativeStatusEnum.GENERATED.code, VALID_XHTML);
  const VALID_NARRATIVE_2 = new Narrative(NarrativeStatusEnum.ADDITIONAL.code, VALID_XHTML);
  const INVALID_NARRATIVE = new StringType('Invalid Narrative type');
  let VALID_RESOURCE_1: MockTask;
  let VALID_RESOURCE_2: MockTask;
  const VALID_EXTENSION_1 = new Extension('url1', new StringType('ext string1'));
  const VALID_EXTENSION_2 = new Extension('url2', new StringType('ext string2'));
  const VALID_EXTENSION_3 = new Extension('url3', new StringType('ext string3'));
  const UNDEFINED_VALUE = undefined;

  beforeAll(() => {
    VALID_RESOURCE_1 = new MockTask();
    VALID_RESOURCE_1.setId('Resource-1');
    VALID_RESOURCE_2 = new MockTask();
    VALID_RESOURCE_2.setId('Resource-2');
  });

  it('should be properly instantiated as empty', () => {
    const testDomainResource = new MockTask();
    expect(testDomainResource).toBeDefined();
    expect(testDomainResource).toBeInstanceOf(DomainResource);
    expect(testDomainResource).toBeInstanceOf(Resource);
    expect(testDomainResource).toBeInstanceOf(Base);
    expect(testDomainResource.constructor.name).toStrictEqual('MockTask');
    expect(testDomainResource.resourceType()).toStrictEqual('Task');
    expect(testDomainResource.fhirType()).toStrictEqual('MockTask');
    expect(testDomainResource.isResource()).toBe(true);
    expect(testDomainResource.isEmpty()).toBe(true);
    expect(testDomainResource.toJSON()).toBeUndefined();

    // Resource properties
    expect(testDomainResource.hasId()).toBe(false);
    expect(testDomainResource.getId()).toBeUndefined();
    expect(testDomainResource.hasMeta()).toBe(false);
    expect(testDomainResource.getMeta()).toEqual(new Meta());
    expect(testDomainResource.hasImplicitRules()).toBe(false);
    expect(testDomainResource.getImplicitRules()).toBeUndefined();
    expect(testDomainResource.hasLanguage()).toBe(false);
    expect(testDomainResource.getLanguage()).toBeUndefined();

    expect(testDomainResource.hasIdElement()).toBe(false);
    expect(testDomainResource.getIdElement()).toEqual(new IdType());
    expect(testDomainResource.hasImplicitRulesElement()).toBe(false);
    expect(testDomainResource.getImplicitRulesElement()).toEqual(new UriType());
    expect(testDomainResource.hasLanguageElement()).toBe(false);
    expect(testDomainResource.getLanguageElement()).toEqual(new CodeType());

    // DomainResources
    expect(testDomainResource.hasText()).toBe(false);
    expect(testDomainResource.getText()).toEqual(new Narrative(null, null));
    expect(testDomainResource.hasContained()).toBe(false);
    expect(testDomainResource.getContained()).toEqual([] as Resource[]);
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toEqual([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toEqual([] as Extension[]);
  });

  it('should be properly instantiated with all DomainResource properties', () => {
    const testDomainResource = new MockTask();
    testDomainResource.setText(VALID_NARRATIVE_1);
    testDomainResource.addContained(VALID_RESOURCE_1);
    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    testDomainResource.addModifierExtension(VALID_EXTENSION_3);

    expect(testDomainResource).toBeDefined();
    expect(testDomainResource).toBeInstanceOf(DomainResource);
    expect(testDomainResource).toBeInstanceOf(Resource);
    expect(testDomainResource).toBeInstanceOf(Base);
    expect(testDomainResource.constructor.name).toStrictEqual('MockTask');
    expect(testDomainResource.resourceType()).toStrictEqual('Task');
    expect(testDomainResource.fhirType()).toStrictEqual('MockTask');
    expect(testDomainResource.isResource()).toBe(true);
    expect(testDomainResource.isEmpty()).toBe(false);
    const expectedJson = {
      resourceType: 'Task',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
      },
      contained: [
        {
          resourceType: 'Task',
          id: 'Resource-1',
        },
      ],
      extension: [
        {
          url: 'url1',
          valueString: 'ext string1',
        },
      ],
      modifierExtension: [
        {
          url: 'url2',
          valueString: 'ext string2',
        },
        {
          url: 'url3',
          valueString: 'ext string3',
        },
      ],
    };
    expect(testDomainResource.toJSON()).toEqual(expectedJson);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toEqual(VALID_NARRATIVE_1);
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
    const testDomainResource = new MockTask();
    testDomainResource.setText(VALID_NARRATIVE_1);
    testDomainResource.setContained([VALID_RESOURCE_1]);
    testDomainResource.setExtension([VALID_EXTENSION_1]);
    testDomainResource.setModifierExtension([VALID_EXTENSION_2, VALID_EXTENSION_3]);

    expect(testDomainResource).toBeDefined();
    expect(testDomainResource.isEmpty()).toBe(false);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toEqual(VALID_NARRATIVE_1);
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
    const testDomainResource = new MockTask();
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
    expect(testDomainResource.getText()).toEqual(VALID_NARRATIVE_2);
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
    expect(testDomainResource.getText()).toEqual(new Narrative(null, null));
    expect(testDomainResource.hasContained()).toBe(false);
    expect(testDomainResource.getContained()).toEqual([] as Resource[]);
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toEqual([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toEqual([] as Extension[]);
  });

  it('should properly copy()', () => {
    const domainResource = new MockTask();
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
    expect(testDomainResource.constructor.name).toStrictEqual('MockTask');
    expect(testDomainResource.resourceType()).toStrictEqual('Task');
    expect(testDomainResource.fhirType()).toStrictEqual('MockTask');
    expect(testDomainResource.isResource()).toBe(true);
    expect(testDomainResource.isEmpty()).toBe(false);
    const expectedJson = {
      resourceType: 'Task',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
      },
      contained: [
        {
          resourceType: 'Task',
          id: 'Resource-1',
        },
      ],
      extension: [
        {
          url: 'url1',
          valueString: 'ext string1',
        },
      ],
      modifierExtension: [
        {
          url: 'url2',
          valueString: 'ext string2',
        },
        {
          url: 'url3',
          valueString: 'ext string3',
        },
      ],
    };
    expect(testDomainResource.toJSON()).toEqual(expectedJson);

    expect(testDomainResource.hasText()).toBe(true);
    expect(testDomainResource.getText()).toEqual(VALID_NARRATIVE_1);
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
    expect(testDomainResourceCopyEmpty.constructor.name).toStrictEqual('MockTask');
    expect(testDomainResourceCopyEmpty.resourceType()).toStrictEqual('Task');
    expect(testDomainResourceCopyEmpty.fhirType()).toStrictEqual('MockTask');
    expect(testDomainResource.isResource()).toBe(true);
    expect(testDomainResource.isEmpty()).toBe(true);
    expect(testDomainResource.toJSON()).toBeUndefined();

    expect(testDomainResource.hasText()).toBe(false);
    expect(testDomainResource.getText()).toEqual(new Narrative(null, null));
    expect(testDomainResource.hasContained()).toBe(false);
    expect(testDomainResource.getContained()).toEqual([] as Resource[]);
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toEqual([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toEqual([] as Extension[]);
  });

  it('should add instances to properties defined as arrays', () => {
    const testDomainResource = new MockTask();
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
    const testDomainResource = new MockTask();
    testDomainResource.addExtension(VALID_EXTENSION_1);
    testDomainResource.addModifierExtension(VALID_EXTENSION_2);

    expect(testDomainResource.hasExtension()).toBe(true);
    expect(testDomainResource.getExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_1]));
    expect(testDomainResource.hasModifierExtension()).toBe(true);
    expect(testDomainResource.getModifierExtension()).toEqual(expect.arrayContaining([VALID_EXTENSION_2]));

    testDomainResource.setExtension(UNDEFINED_VALUE);
    testDomainResource.setModifierExtension(UNDEFINED_VALUE);

    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtension()).toEqual([] as Extension[]);
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtension()).toEqual([] as Extension[]);
  });

  it('should properly verify has extensions work as expected with and without a provided URL', () => {
    const testDomainResource = new MockTask();
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
    const testDomainResource = new MockTask();
    expect(testDomainResource.hasExtension()).toBe(false);
    expect(testDomainResource.getExtensionByUrl('url1')).toBeUndefined();
    expect(testDomainResource.hasModifierExtension()).toBe(false);
    expect(testDomainResource.getModifierExtensionByUrl('url2')).toBeUndefined();

    testDomainResource.addExtension(VALID_EXTENSION_1);
    expect(testDomainResource.hasExtension('url1')).toBe(true);
    expect(testDomainResource.getExtensionByUrl('url1')).toEqual(VALID_EXTENSION_1);
    expect(testDomainResource.getExtensionByUrl('url2')).toBeUndefined();

    testDomainResource.addModifierExtension(VALID_EXTENSION_2);
    expect(testDomainResource.hasModifierExtension('url2')).toBe(true);
    expect(testDomainResource.getModifierExtensionByUrl('url2')).toEqual(VALID_EXTENSION_2);
    expect(testDomainResource.getModifierExtensionByUrl('url1')).toBeUndefined();
  });

  it('should properly remove extensions by URL as expected with a provided URL', () => {
    const testDomainResource = new MockTask();
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

  it('should throw InvalidTypeError for invalid Narrative type for DomainResource.setText()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.setText(INVALID_NARRATIVE);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid DomainResource.text; Provided value is not an instance of Narrative.`);
  });

  it('should throw InvalidTypeError for invalid Resource type for DomainResource.addContained()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.addContained(VALID_NARRATIVE_1);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid DomainResource.contained; Provided value is not a valid instance of Resource.`);
  });

  it('should throw InvalidTypeError for invalid Resource type for DomainResource.setContained()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.setContained([VALID_RESOURCE_1, VALID_NARRATIVE_1]);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `DomainResource.contained; Provided value array has an element that is not a valid instance of Resource.`,
    );
  });

  it('should throw InvalidTypeError for invalid Extension type for DomainResource.addExtension()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.addExtension(VALID_NARRATIVE_1);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid DomainResource.extension; Provided extension is not an instance of Extension.`);
  });

  it('should throw InvalidTypeError for invalid Extension type for DomainResource.setExtension()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.setExtension([VALID_EXTENSION_1, VALID_NARRATIVE_1]);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `nvalid DomainResource.extension; Provided extension array has an element that is not an instance of Extension.`,
    );
  });

  it('should throw InvalidTypeError for invalid Extension type for DomainResource.addModifierExtension()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.addModifierExtension(VALID_NARRATIVE_1);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid DomainResource.modifierExtension; Provided extension is not an instance of Extension.`);
  });

  it('should throw InvalidTypeError for invalid Extension type for DomainResource.setModifierExtension()', () => {
    const testDomainResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testDomainResource.setModifierExtension([VALID_EXTENSION_1, VALID_NARRATIVE_1]);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `Invalid DomainResource.modifierExtension; Provided extension array has an element that is not an instance of Extension.`,
    );
  });
});
