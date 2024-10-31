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
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockTask } from '../../test-utils';

describe('Resource', () => {
  const VALID_ID = `a-432.E-12345`;
  const VALID_ID_TYPE = new IdType(VALID_ID);
  const VALID_ID_2 = `ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz.0123456789`;
  const VALID_ID_TYPE_2 = new IdType(VALID_ID_2);
  const INVALID_ID = `a[432]!E{12345}`;

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';

  const VALID_CODE = `testCodeType`;
  const VALID_CODE_TYPE = new CodeType(VALID_CODE);
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_CODE_TYPE_2 = new CodeType(VALID_CODE_2);
  const INVALID_CODE = ' invalid CodeType ';

  const VALID_META = new Meta();
  VALID_META.setVersionId('v1');
  const VALID_META_2 = new Meta();
  VALID_META_2.setVersionId('v2');

  const UNDEFINED_VALUE = undefined;

  it('should be properly instantiated as empty', () => {
    const testResource = new MockTask();
    expect(testResource).toBeDefined();
    expect(testResource).toBeInstanceOf(Resource);
    expect(testResource).toBeInstanceOf(Base);
    expect(testResource.constructor.name).toStrictEqual('MockTask');
    expect(testResource.resourceType()).toStrictEqual('Task');
    expect(testResource.fhirType()).toStrictEqual('MockTask');
    expect(testResource.isResource()).toBe(true);
    expect(testResource.isEmpty()).toBe(true);
    expect(testResource.toJSON()).toBeUndefined();

    expect(testResource.hasId()).toBe(false);
    expect(testResource.getId()).toBeUndefined();
    expect(testResource.hasMeta()).toBe(false);
    expect(testResource.getMeta()).toEqual(new Meta());
    expect(testResource.hasImplicitRules()).toBe(false);
    expect(testResource.getImplicitRules()).toBeUndefined();
    expect(testResource.hasLanguage()).toBe(false);
    expect(testResource.getLanguage()).toBeUndefined();

    expect(testResource.hasIdElement()).toBe(false);
    expect(testResource.getIdElement()).toEqual(new IdType());
    expect(testResource.hasImplicitRulesElement()).toBe(false);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType());
    expect(testResource.hasLanguageElement()).toBe(false);
    expect(testResource.getLanguageElement()).toEqual(new CodeType());
  });

  it('should be properly instantiated with primitive values', () => {
    const testResource = new MockTask();
    testResource.setId(VALID_ID);
    testResource.setMeta(VALID_META);
    testResource.setImplicitRules(VALID_URI);
    testResource.setLanguage(VALID_CODE);

    expect(testResource).toBeDefined();
    expect(testResource).toBeInstanceOf(Resource);
    expect(testResource).toBeInstanceOf(Base);
    expect(testResource.constructor.name).toStrictEqual('MockTask');
    expect(testResource.resourceType()).toStrictEqual('Task');
    expect(testResource.fhirType()).toStrictEqual('MockTask');
    expect(testResource.isResource()).toBe(true);
    expect(testResource.isEmpty()).toBe(false);
    const expectedJson = {
      resourceType: 'Task',
      id: 'a-432.E-12345',
      meta: {
        versionId: 'v1',
      },
      implicitRules: 'testUriType',
      language: 'testCodeType',
    };
    expect(testResource.toJSON()).toEqual(expectedJson);

    expect(testResource.hasId()).toBe(true);
    expect(testResource.getId()).toStrictEqual(VALID_ID);
    expect(testResource.hasMeta()).toBe(true);
    expect(testResource.getMeta()).toEqual(VALID_META);
    expect(testResource.hasImplicitRules()).toBe(true);
    expect(testResource.getImplicitRules()).toStrictEqual(VALID_URI);
    expect(testResource.hasLanguage()).toBe(true);
    expect(testResource.getLanguage()).toStrictEqual(VALID_CODE);

    expect(testResource.hasIdElement()).toBe(true);
    expect(testResource.getIdElement()).toEqual(new IdType(VALID_ID));
    expect(testResource.hasImplicitRulesElement()).toBe(true);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType(VALID_URI));
    expect(testResource.hasLanguageElement()).toBe(true);
    expect(testResource.getLanguageElement()).toEqual(new CodeType(VALID_CODE));
  });

  it('should be properly reset by modifying all properties with primitive values', () => {
    const testResource = new MockTask();
    testResource.setId(VALID_ID);
    testResource.setMeta(VALID_META);
    testResource.setImplicitRules(VALID_URI);
    testResource.setLanguage(VALID_CODE);

    expect(testResource).toBeDefined();
    expect(testResource.isEmpty()).toBe(false);

    testResource.setId(VALID_ID_2);
    testResource.setMeta(VALID_META_2);
    testResource.setImplicitRules(VALID_URI_2);
    testResource.setLanguage(VALID_CODE_2);

    expect(testResource.hasId()).toBe(true);
    expect(testResource.getId()).toStrictEqual(VALID_ID_2);
    expect(testResource.hasMeta()).toBe(true);
    expect(testResource.getMeta()).toEqual(VALID_META_2);
    expect(testResource.hasImplicitRules()).toBe(true);
    expect(testResource.getImplicitRules()).toStrictEqual(VALID_URI_2);
    expect(testResource.hasLanguage()).toBe(true);
    expect(testResource.getLanguage()).toStrictEqual(VALID_CODE_2);

    expect(testResource.hasIdElement()).toBe(true);
    expect(testResource.getIdElement()).toEqual(new IdType(VALID_ID_2));
    expect(testResource.hasImplicitRulesElement()).toBe(true);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType(VALID_URI_2));
    expect(testResource.hasLanguageElement()).toBe(true);
    expect(testResource.getLanguageElement()).toEqual(new CodeType(VALID_CODE_2));

    testResource.setId(UNDEFINED_VALUE);
    testResource.setMeta(UNDEFINED_VALUE);
    testResource.setImplicitRules(UNDEFINED_VALUE);
    testResource.setLanguage(UNDEFINED_VALUE);

    expect(testResource.isEmpty()).toBe(true);

    expect(testResource.hasId()).toBe(false);
    expect(testResource.getId()).toBeUndefined();
    expect(testResource.hasMeta()).toBe(false);
    expect(testResource.getMeta()).toEqual(new Meta());
    expect(testResource.hasImplicitRules()).toBe(false);
    expect(testResource.getImplicitRules()).toBeUndefined();
    expect(testResource.hasLanguage()).toBe(false);
    expect(testResource.getLanguage()).toBeUndefined();

    expect(testResource.hasIdElement()).toBe(false);
    expect(testResource.getIdElement()).toEqual(new IdType());
    expect(testResource.hasImplicitRulesElement()).toBe(false);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType());
    expect(testResource.hasLanguageElement()).toBe(false);
    expect(testResource.getLanguageElement()).toEqual(new CodeType());
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Resource.id value', () => {
    const testResource = new MockTask();
    const t = () => {
      testResource.setId(INVALID_ID);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Resource.id (${INVALID_ID})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Resource.implicitRules value', () => {
    const testResource = new MockTask();
    const t = () => {
      testResource.setImplicitRules(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Resource.implicitRules (${INVALID_URI})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Resource.language value', () => {
    const testResource = new MockTask();
    const t = () => {
      testResource.setLanguage(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Resource.language (${INVALID_CODE})`);
  });

  it('should be properly instantiated with PrimitiveType values', () => {
    const testResource = new MockTask();
    testResource.setIdElement(VALID_ID_TYPE);
    testResource.setMeta(VALID_META);
    testResource.setImplicitRulesElement(VALID_URI_TYPE);
    testResource.setLanguageElement(VALID_CODE_TYPE);

    expect(testResource).toBeDefined();
    expect(testResource).toBeInstanceOf(Resource);
    expect(testResource).toBeInstanceOf(Base);
    expect(testResource.constructor.name).toStrictEqual('MockTask');
    expect(testResource.resourceType()).toStrictEqual('Task');
    expect(testResource.fhirType()).toStrictEqual('MockTask');
    expect(testResource.isResource()).toBe(true);
    expect(testResource.isEmpty()).toBe(false);
    const expectedJson = {
      resourceType: 'Task',
      id: 'a-432.E-12345',
      meta: {
        versionId: 'v1',
      },
      implicitRules: 'testUriType',
      language: 'testCodeType',
    };
    expect(testResource.toJSON()).toEqual(expectedJson);

    expect(testResource.hasId()).toBe(true);
    expect(testResource.getId()).toStrictEqual(VALID_ID);
    expect(testResource.hasMeta()).toBe(true);
    expect(testResource.getMeta()).toEqual(VALID_META);
    expect(testResource.hasImplicitRules()).toBe(true);
    expect(testResource.getImplicitRules()).toStrictEqual(VALID_URI);
    expect(testResource.hasLanguage()).toBe(true);
    expect(testResource.getLanguage()).toStrictEqual(VALID_CODE);

    expect(testResource.hasIdElement()).toBe(true);
    expect(testResource.getIdElement()).toEqual(new IdType(VALID_ID));
    expect(testResource.hasImplicitRulesElement()).toBe(true);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType(VALID_URI));
    expect(testResource.hasLanguageElement()).toBe(true);
    expect(testResource.getLanguageElement()).toEqual(new CodeType(VALID_CODE));
  });

  it('should be properly reset by modifying all properties with PrimitiveType values', () => {
    const testResource = new MockTask();
    testResource.setIdElement(VALID_ID_TYPE);
    testResource.setMeta(VALID_META);
    testResource.setImplicitRulesElement(VALID_URI_TYPE);
    testResource.setLanguageElement(VALID_CODE_TYPE);

    expect(testResource).toBeDefined();
    expect(testResource.isEmpty()).toBe(false);

    testResource.setIdElement(VALID_ID_TYPE_2);
    testResource.setMeta(VALID_META_2);
    testResource.setImplicitRulesElement(VALID_URI_TYPE_2);
    testResource.setLanguageElement(VALID_CODE_TYPE_2);

    expect(testResource.hasId()).toBe(true);
    expect(testResource.getId()).toStrictEqual(VALID_ID_2);
    expect(testResource.hasMeta()).toBe(true);
    expect(testResource.getMeta()).toEqual(VALID_META_2);
    expect(testResource.hasImplicitRules()).toBe(true);
    expect(testResource.getImplicitRules()).toStrictEqual(VALID_URI_2);
    expect(testResource.hasLanguage()).toBe(true);
    expect(testResource.getLanguage()).toStrictEqual(VALID_CODE_2);

    expect(testResource.hasIdElement()).toBe(true);
    expect(testResource.getIdElement()).toEqual(new IdType(VALID_ID_2));
    expect(testResource.hasImplicitRulesElement()).toBe(true);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType(VALID_URI_2));
    expect(testResource.hasLanguageElement()).toBe(true);
    expect(testResource.getLanguageElement()).toEqual(new CodeType(VALID_CODE_2));
  });

  it('should properly copy()', () => {
    const resource = new MockTask();
    resource.setId(VALID_ID);
    resource.setMeta(VALID_META);
    resource.setImplicitRules(VALID_URI);
    resource.setLanguage(VALID_CODE);

    const testResource = resource.copy();
    expect(testResource).toBeDefined();
    expect(testResource).toBeInstanceOf(Resource);
    expect(testResource).toBeInstanceOf(Base);
    expect(testResource.constructor.name).toStrictEqual('MockTask');
    expect(testResource.resourceType()).toStrictEqual('Task');
    expect(testResource.fhirType()).toStrictEqual('MockTask');
    expect(testResource.isResource()).toBe(true);
    expect(testResource.isEmpty()).toBe(false);
    const expectedJson = {
      resourceType: 'Task',
      id: 'a-432.E-12345',
      meta: {
        versionId: 'v1',
      },
      implicitRules: 'testUriType',
      language: 'testCodeType',
    };
    expect(testResource.toJSON()).toEqual(expectedJson);

    expect(testResource.hasId()).toBe(true);
    expect(testResource.getId()).toStrictEqual(VALID_ID);
    expect(testResource.hasMeta()).toBe(true);
    expect(testResource.getMeta()).toEqual(VALID_META);
    expect(testResource.hasImplicitRules()).toBe(true);
    expect(testResource.getImplicitRules()).toStrictEqual(VALID_URI);
    expect(testResource.hasLanguage()).toBe(true);
    expect(testResource.getLanguage()).toStrictEqual(VALID_CODE);

    expect(testResource.hasIdElement()).toBe(true);
    expect(testResource.getIdElement()).toEqual(new IdType(VALID_ID));
    expect(testResource.hasImplicitRulesElement()).toBe(true);
    expect(testResource.getImplicitRulesElement()).toEqual(new UriType(VALID_URI));
    expect(testResource.hasLanguageElement()).toBe(true);
    expect(testResource.getLanguageElement()).toEqual(new CodeType(VALID_CODE));
  });

  it('should throw InvalidTypeError for invalid IdType type for Resource.setIdElement()', () => {
    const testResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testResource.setIdElement(VALID_URI_TYPE);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid Resource.id; Provided value is not an instance of IdType.`);
  });

  it('should throw InvalidTypeError for invalid Meta type for Resource.setMeta()', () => {
    const testResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testResource.setMeta(VALID_URI_TYPE);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid Resource.meta; Provided value is not an instance of Meta.`);
  });

  it('should throw InvalidTypeError for invalid UriType type for Resource.setImplicitRulesElement()', () => {
    const testResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testResource.setImplicitRulesElement(VALID_ID_TYPE);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid Resource.implicitRules; Provided value is not an instance of UriType.`);
  });

  it('should throw InvalidTypeError for invalid CodeType type for Resource.setLanguageElement()', () => {
    const testResource = new MockTask();
    const t = () => {
      // @ts-expect-error: allow for testing
      testResource.setLanguageElement(VALID_ID_TYPE);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid Resource.language; Provided value is not an instance of CodeType.`);
  });
});
