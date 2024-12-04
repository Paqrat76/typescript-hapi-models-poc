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

import { AssertionError } from 'node:assert';
import {
  assertFhirResourceTypeJson,
  getPrimitiveTypeJson,
  getPrimitiveTypeListJson,
  parseExtension,
  processElementJson,
  processBackboneElementJson,
  processResourceJson,
  processDomainResourceJson,
  parseBase64BinaryType,
  parseBooleanType,
  parseCanonicalType,
  parseCodeType,
  parseDateTimeType,
  parseDateType,
  parseDecimalType,
  parseIdType,
  parseInstantType,
  parseInteger64Type,
  parseIntegerType,
  parseMarkdownType,
  parseOidType,
  parsePositiveIntType,
  parseStringType,
  parseTimeType,
  parseUnsignedIntType,
  parseUriType,
  parseUrlType,
  parseUuidType,
  parseXhtmlType,
  parsePolymorphicDataType,
  parseCodeableConcept,
  parseCoding,
  parseContactPoint,
  parseIdentifier,
  parseMeta,
  parseNarrative,
  parsePeriod,
  parseQuantity,
  parseRange,
  parseReference,
  parseSimpleQuantity,
  PrimitiveTypeJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { BackboneElement, DataType, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { DateType } from '@src/fhir-core/data-types/primitive/DateType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { Integer64Type } from '@src/fhir-core/data-types/primitive/Integer64Type';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { MarkdownType } from '@src/fhir-core/data-types/primitive/MarkdownType';
import { OidType } from '@src/fhir-core/data-types/primitive/OidType';
import { PositiveIntType } from '@src/fhir-core/data-types/primitive/PositiveIntType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { TimeType } from '@src/fhir-core/data-types/primitive/TimeType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { UrlType } from '@src/fhir-core/data-types/primitive/UrlType';
import { UuidType } from '@src/fhir-core/data-types/primitive/UuidType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  FHIR_MAX_INTEGER,
  FHIR_MAX_INTEGER64,
  FHIR_MIN_INTEGER,
  FHIR_MIN_INTEGER64,
  MockBackboneElement,
  MockElement,
  MockResource,
  MockTask,
  TOO_BIG_STRING,
} from '../../test-utils';

describe('fhir-parsers', () => {
  const EMPTY_STRING = '';
  const SIBLING_JSON_SIMPLE = {
    id: 'id1234',
    extension: [
      {
        id: 'extId',
        url: 'testUrl',
        valueString: 'extension string value',
      },
    ],
  };
  const EXPECTED_EXTENSION_SIMPLE = new Extension('testUrl', new StringType('extension string value'));
  EXPECTED_EXTENSION_SIMPLE.setId('extId');

  const SIBLING_JSON_COMPLEX = {
    extension: [
      {
        url: 'testUrl',
        extension: [
          {
            id: 'childId1',
            url: 'childUrl1',
            valueString: 'child extension string value 1',
          },
          {
            url: 'childUrl2',
            valueString: 'child extension string value 2',
          },
        ],
      },
    ],
  };
  const EXPECTED_EXTENSION_COMPLEX = new Extension('testUrl');
  const EXPECTED_EXTENSION_CHILD_1 = new Extension('childUrl1', new StringType('child extension string value 1'));
  EXPECTED_EXTENSION_CHILD_1.setId('childId1');
  const EXPECTED_EXTENSION_CHILD_2 = new Extension('childUrl2', new StringType('child extension string value 2'));
  EXPECTED_EXTENSION_COMPLEX.setExtension([EXPECTED_EXTENSION_CHILD_1, EXPECTED_EXTENSION_CHILD_2]);

  describe('Core Parsers', () => {
    describe('parseExtension', () => {
      it('should return undefined for empty json', () => {
        let testType = parseExtension({});
        expect(testType).toBeUndefined();

        testType = parseExtension(undefined);
        expect(testType).toBeUndefined();

        // @ts-expect-error: allow for testing
        testType = parseExtension(null);
        expect(testType).toBeUndefined();
      });

      it('should throw FhirError for invalid json type', () => {
        const INVALID_EXTENSION_JSON = {
          extension: [
            {
              id: 'extId',
              valueString: 'extension string value',
            },
          ],
        };

        const t = () => {
          parseExtension(INVALID_EXTENSION_JSON);
        };
        expect(t).toThrow(FhirError);
        expect(t).toThrow(`The following required properties must be included in the provided JSON: Extension.url`);
      });
    });

    describe('parseElement', () => {
      let instance: Element;
      beforeEach(() => {
        instance = new MockElement();
      });

      it('should return undefined for empty json', () => {
        processElementJson(instance, {});
        expect(instance.isEmpty()).toBe(true);

        processElementJson(instance, undefined);
        expect(instance.isEmpty()).toBe(true);

        processElementJson(instance, null);
        expect(instance.isEmpty()).toBe(true);
      });

      it('should return correct instance for valid json', () => {
        const VALID_JSON = {
          id: 'idBE123',
          extension: [
            {
              url: 'validUrl1',
              valueString: 'This is a valid string 1',
            },
          ],
        };

        processElementJson(instance, VALID_JSON);
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(MockElement);
        expect(instance.constructor.name).toStrictEqual('MockElement');
        expect(instance.fhirType()).toStrictEqual('Element');
        expect(instance.isEmpty()).toBe(false);
        expect(instance.toJSON()).toEqual(VALID_JSON);
      });

      it('should throw TypeError for invalid json type', () => {
        const INVALID_JSON = {
          id: 123,
        };

        const t = () => {
          processElementJson(instance, INVALID_JSON);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`MockElement.id is not a string.`);
      });
    });

    describe('parseBackboneElement', () => {
      let instance: BackboneElement;
      beforeEach(() => {
        instance = new MockBackboneElement();
      });

      it('should return undefined for empty json', () => {
        processBackboneElementJson(instance, {});
        expect(instance.isEmpty()).toBe(true);

        processBackboneElementJson(instance, undefined);
        expect(instance.isEmpty()).toBe(true);

        processBackboneElementJson(instance, null);
        expect(instance.isEmpty()).toBe(true);
      });

      it('should return correct instance for valid json', () => {
        const VALID_JSON = {
          id: 'idBE123',
          extension: [
            {
              url: 'validUrl1',
              valueString: 'This is a valid string 1',
            },
          ],
          modifierExtension: [
            {
              url: 'validUrl2',
              valueString: 'This is a valid string 2',
            },
          ],
        };

        processBackboneElementJson(instance, VALID_JSON);
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(MockBackboneElement);
        expect(instance.constructor.name).toStrictEqual('MockBackboneElement');
        expect(instance.fhirType()).toStrictEqual('BackboneElement');
        expect(instance.isEmpty()).toBe(false);
        expect(instance.toJSON()).toEqual(VALID_JSON);
      });

      it('should throw TypeError for invalid json type', () => {
        const INVALID_JSON = {
          id: 123,
        };

        const t = () => {
          processBackboneElementJson(instance, INVALID_JSON);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`MockBackboneElement.id is not a string.`);
      });
    });

    describe('parseResource', () => {
      let instance: MockResource;
      beforeEach(() => {
        instance = new MockResource();
      });

      it('should return undefined for empty json', () => {
        processResourceJson(instance, {});
        expect(instance.isEmpty()).toBe(true);

        processResourceJson(instance, undefined);
        expect(instance.isEmpty()).toBe(true);

        processResourceJson(instance, null);
        expect(instance.isEmpty()).toBe(true);
      });

      it('should return correct instance for valid json', () => {
        const VALID_JSON = {
          resourceType: 'Resource',
          id: 'idR123',
          meta: {
            versionId: 'v1',
            lastUpdated: '2017-01-01T00:00:00.000Z',
            source: 'sourceUri',
            profile: ['profileCanonical'],
            security: [
              {
                system: 'securitySystem',
                code: 'securityCode',
              },
            ],
            tag: [
              {
                system: 'tagSystem',
                code: 'tagCode',
              },
            ],
          },
          implicitRules: 'validImplicitUrl',
          language: 'en-US',
        };

        processResourceJson(instance, VALID_JSON);
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(MockResource);
        expect(instance.constructor.name).toStrictEqual('MockResource');
        expect(instance.resourceType()).toStrictEqual('Resource');
        expect(instance.fhirType()).toStrictEqual('MockResource');
        expect(instance.isEmpty()).toBe(false);
        expect(instance.toJSON()).toEqual(VALID_JSON);
      });

      it('should throw TypeError for invalid json type', () => {
        const INVALID_JSON = {
          resourceType: 'Resource',
          id: 12345,
        };

        const t = () => {
          processResourceJson(instance, INVALID_JSON);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`MockResource.id is not a string.`);
      });
    });

    describe('parseDomainResource', () => {
      let instance: MockTask;
      beforeEach(() => {
        instance = new MockTask();
      });

      it('should return undefined for empty json', () => {
        processDomainResourceJson(instance, {});
        expect(instance.isEmpty()).toBe(true);

        processDomainResourceJson(instance, undefined);
        expect(instance.isEmpty()).toBe(true);

        processDomainResourceJson(instance, null);
        expect(instance.isEmpty()).toBe(true);
      });

      it('should return correct instance for valid json', () => {
        const VALID_JSON = {
          resourceType: 'Task',
          id: 'idR123',
          meta: {
            versionId: 'v1',
            lastUpdated: '2017-01-01T00:00:00.000Z',
            source: 'sourceUri',
            profile: ['profileCanonical'],
            security: [
              {
                system: 'securitySystem',
                code: 'securityCode',
              },
            ],
            tag: [
              {
                system: 'tagSystem',
                code: 'tagCode',
              },
            ],
          },
          implicitRules: 'validImplicitUrl',
          language: 'en-US',
          text: {
            status: 'generated',
            div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
          },
          extension: [
            {
              url: 'extUrl',
              valueString: 'Extension string value',
            },
          ],
          modifierExtension: [
            {
              url: 'modExtUrl',
              valueString: 'ModifierExtension string value',
            },
          ],
        };

        processDomainResourceJson(instance, VALID_JSON);
        expect(instance).toBeDefined();
        expect(instance).toBeInstanceOf(MockTask);
        expect(instance.constructor.name).toStrictEqual('MockTask');
        expect(instance.resourceType()).toStrictEqual('Task');
        expect(instance.fhirType()).toStrictEqual('MockTask');
        expect(instance.isEmpty()).toBe(false);
        expect(instance.toJSON()).toEqual(VALID_JSON);
      });

      it('should throw TypeError for invalid json type', () => {
        const INVALID_JSON = {
          resourceType: 'Task',
          id: 12345,
        };

        const t = () => {
          processDomainResourceJson(instance, INVALID_JSON);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`MockTask.id is not a string.`);
      });
    });
  });

  describe('Helpers', () => {
    describe('assertFhirResourceTypeJson', () => {
      it('should throw AssertionError for missing arguments', () => {
        let t = () => {
          // @ts-expect-error: allow for testing
          assertFhirResourceTypeJson(null, 'Task');
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`The dataJsonObj argument is required.`);

        t = () => {
          // @ts-expect-error: allow for testing
          assertFhirResourceTypeJson({}, null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`The fhirResourceType argument is required.`);
      });

      it('should throw AssertionError for dataJsonObj argument provided as non-JSON object', () => {
        const t = () => {
          // @ts-expect-error: allow for testing
          assertFhirResourceTypeJson([], 'Task');
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`The provided JSON does not represent a JSON object.`);
      });

      it('should throw InvalidTypeError for invalid FHIR resourceType', () => {
        const t = () => {
          assertFhirResourceTypeJson({ resourceType: 'Basic', id: '123' }, 'Task');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Invalid JSON 'resourceType' ('Basic') value; Should be 'Task'.`);
      });

      it('should throw InvalidTypeError for missing FHIR resourceType', () => {
        const t = () => {
          assertFhirResourceTypeJson({ id: '123' }, 'Task');
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`The provided JSON does not represent a FHIR Resource (missing 'resourceType' element).`);
      });
    });
  });

  describe('Primitive Datatype Parsers', () => {
    describe('getPrimitiveTypeJson/getPrimitiveTypeListJson', () => {
      it('should return PrimitiveTypeJson with undefined properties for empty json', () => {
        const sourceField = 'sourceField';
        const primitiveFieldName = 'primitiveFieldName';
        const jsonType = 'string';
        const expected = { dtJson: undefined, dtSiblingJson: undefined };

        let testType: PrimitiveTypeJson = getPrimitiveTypeJson({}, sourceField, primitiveFieldName, jsonType);
        expect(testType).toEqual(expected);

        // @ts-expect-error: allow for testing
        testType = getPrimitiveTypeJson(undefined, sourceField, primitiveFieldName, jsonType);
        expect(testType).toEqual(expected);

        // @ts-expect-error: allow for testing
        testType = getPrimitiveTypeJson(null, sourceField, primitiveFieldName, jsonType);
        expect(testType).toEqual(expected);
      });

      it('should return empty array for empty json', () => {
        const sourceField = 'sourceField';
        const primitiveFieldName = 'primitiveFieldName';
        const jsonType = 'string';

        let testType: PrimitiveTypeJson[] = getPrimitiveTypeListJson({}, sourceField, primitiveFieldName, jsonType);
        expect(testType).toHaveLength(0);

        // @ts-expect-error: allow for testing
        testType = getPrimitiveTypeListJson(undefined, sourceField, primitiveFieldName, jsonType);
        expect(testType).toHaveLength(0);

        // @ts-expect-error: allow for testing
        testType = getPrimitiveTypeListJson(null, sourceField, primitiveFieldName, jsonType);
        expect(testType).toHaveLength(0);
      });
    });

    describe('parseBase64BinaryType', () => {
      const VALID_BASE64BINARY = `dGVzdEJhc2U2NEJpbmFyeQ==`;
      const INVALID_BASE64BINARY = 'invalidBase64Binary';

      it('should return undefined for empty json', () => {
        let testType = parseBase64BinaryType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseBase64BinaryType(undefined);
        expect(testType).toBeUndefined();

        testType = parseBase64BinaryType(null);
        expect(testType).toBeUndefined();
      });

      it('should return Base64BinaryType for valid json', () => {
        const testType = parseBase64BinaryType(VALID_BASE64BINARY);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Base64BinaryType);
        expect(testType?.constructor.name).toStrictEqual('Base64BinaryType');
        expect(testType?.fhirType()).toStrictEqual('base64Binary');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_BASE64BINARY);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return Base64BinaryType for valid json with simple siblingJson', () => {
        const testType = parseBase64BinaryType(VALID_BASE64BINARY, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Base64BinaryType);
        expect(testType?.constructor.name).toStrictEqual('Base64BinaryType');
        expect(testType?.fhirType()).toStrictEqual('base64Binary');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_BASE64BINARY);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return Base64BinaryType for valid json with complex siblingJson', () => {
        const testType = parseBase64BinaryType(VALID_BASE64BINARY, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Base64BinaryType);
        expect(testType?.constructor.name).toStrictEqual('Base64BinaryType');
        expect(testType?.fhirType()).toStrictEqual('base64Binary');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_BASE64BINARY);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseBase64BinaryType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for Base64BinaryType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseBase64BinaryType(INVALID_BASE64BINARY);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for Base64BinaryType`);
      });
    });

    describe('parseBooleanType', () => {
      const INVALID_BOOLEAN = 'invalidBoolean';

      it('should return undefined for empty json', () => {
        let testType = parseBooleanType(undefined);
        expect(testType).toBeUndefined();

        testType = parseBooleanType(null);
        expect(testType).toBeUndefined();
      });

      it('should return BooleanType for valid json', () => {
        const testType = parseBooleanType(true);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(BooleanType);
        expect(testType?.constructor.name).toStrictEqual('BooleanType');
        expect(testType?.fhirType()).toStrictEqual('boolean');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isBooleanPrimitive()).toBe(true);
        expect(testType?.getValue()).toBe(true);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return BooleanType for valid json with simple siblingJson', () => {
        const testType = parseBooleanType(false, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(BooleanType);
        expect(testType?.constructor.name).toStrictEqual('BooleanType');
        expect(testType?.fhirType()).toStrictEqual('boolean');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isBooleanPrimitive()).toBe(true);
        expect(testType?.getValue()).toBe(false);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return BooleanType for valid json with complex siblingJson', () => {
        const testType = parseBooleanType(false, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(BooleanType);
        expect(testType?.constructor.name).toStrictEqual('BooleanType');
        expect(testType?.fhirType()).toStrictEqual('boolean');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isBooleanPrimitive()).toBe(true);
        expect(testType?.getValue()).toBe(false);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseBooleanType(INVALID_BOOLEAN);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for BooleanType is not a boolean`);
      });
    });

    describe('parseCanonicalType', () => {
      const VALID_CANONICAL = `testCanonicalType`;
      const INVALID_CANONICAL = ' invalid Url ';

      it('should return undefined for empty json', () => {
        let testType = parseCanonicalType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseCanonicalType(undefined);
        expect(testType).toBeUndefined();

        testType = parseCanonicalType(null);
        expect(testType).toBeUndefined();
      });

      it('should return CanonicalType for valid json', () => {
        const testType = parseCanonicalType(VALID_CANONICAL);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CanonicalType);
        expect(testType?.constructor.name).toStrictEqual('CanonicalType');
        expect(testType?.fhirType()).toStrictEqual('canonical');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_CANONICAL);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return CanonicalType for valid json with simple siblingJson', () => {
        const testType = parseCanonicalType(VALID_CANONICAL, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CanonicalType);
        expect(testType?.constructor.name).toStrictEqual('CanonicalType');
        expect(testType?.fhirType()).toStrictEqual('canonical');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_CANONICAL);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return CanonicalType for valid json with complex siblingJson', () => {
        const testType = parseCanonicalType(VALID_CANONICAL, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CanonicalType);
        expect(testType?.constructor.name).toStrictEqual('CanonicalType');
        expect(testType?.fhirType()).toStrictEqual('canonical');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_CANONICAL);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseCanonicalType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for CanonicalType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseCanonicalType(INVALID_CANONICAL);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for CanonicalType`);
      });
    });

    describe('parseCodeType', () => {
      const VALID_CODE = `testCodeType`;
      const INVALID_CODE = ' invalid CodeType ';

      it('should return undefined for empty json', () => {
        let testType = parseCodeType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseCodeType(undefined);
        expect(testType).toBeUndefined();

        testType = parseCodeType(null);
        expect(testType).toBeUndefined();
      });

      it('should return CodeType for valid json', () => {
        const testType = parseCodeType(VALID_CODE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CodeType);
        expect(testType?.constructor.name).toStrictEqual('CodeType');
        expect(testType?.fhirType()).toStrictEqual('code');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_CODE);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return CodeType for valid json with simple siblingJson', () => {
        const testType = parseCodeType(VALID_CODE, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CodeType);
        expect(testType?.constructor.name).toStrictEqual('CodeType');
        expect(testType?.fhirType()).toStrictEqual('code');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_CODE);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return CodeType for valid json with complex siblingJson', () => {
        const testType = parseCodeType(VALID_CODE, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CodeType);
        expect(testType?.constructor.name).toStrictEqual('CodeType');
        expect(testType?.fhirType()).toStrictEqual('code');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_CODE);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseCodeType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for CodeType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseCodeType(INVALID_CODE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for CodeType`);
      });
    });

    describe('parseDateTimeType', () => {
      const VALID_DATETIME = `2015-02-07T13:28:17.239+02:00`;
      const INVALID_DATETIME = `invalid date time`;

      it('should return undefined for empty json', () => {
        let testType = parseDateTimeType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseDateTimeType(undefined);
        expect(testType).toBeUndefined();

        testType = parseDateTimeType(null);
        expect(testType).toBeUndefined();
      });

      it('should return DateTimeType for valid json', () => {
        const testType = parseDateTimeType(VALID_DATETIME);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DateTimeType);
        expect(testType?.constructor.name).toStrictEqual('DateTimeType');
        expect(testType?.fhirType()).toStrictEqual('dateTime');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DATETIME);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return DateTimeType for valid json with simple siblingJson', () => {
        const testType = parseDateTimeType(VALID_DATETIME, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DateTimeType);
        expect(testType?.constructor.name).toStrictEqual('DateTimeType');
        expect(testType?.fhirType()).toStrictEqual('dateTime');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DATETIME);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return DateTimeType for valid json with complex siblingJson', () => {
        const testType = parseDateTimeType(VALID_DATETIME, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DateTimeType);
        expect(testType?.constructor.name).toStrictEqual('DateTimeType');
        expect(testType?.fhirType()).toStrictEqual('dateTime');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DATETIME);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseDateTimeType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for DateTimeType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseDateTimeType(INVALID_DATETIME);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for DateTimeType`);
      });
    });

    describe('parseDateType', () => {
      const VALID_DATE = `2015-02-07`;
      const INVALID_DATE = `invalid date`;

      it('should return undefined for empty json', () => {
        let testType = parseDateType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseDateType(undefined);
        expect(testType).toBeUndefined();

        testType = parseDateType(null);
        expect(testType).toBeUndefined();
      });

      it('should return DateType for valid json', () => {
        const testType = parseDateType(VALID_DATE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DateType);
        expect(testType?.constructor.name).toStrictEqual('DateType');
        expect(testType?.fhirType()).toStrictEqual('date');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DATE);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return DateType for valid json with simple siblingJson', () => {
        const testType = parseDateType(VALID_DATE, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DateType);
        expect(testType?.constructor.name).toStrictEqual('DateType');
        expect(testType?.fhirType()).toStrictEqual('date');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DATE);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return DateType for valid json with complex siblingJson', () => {
        const testType = parseDateType(VALID_DATE, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DateType);
        expect(testType?.constructor.name).toStrictEqual('DateType');
        expect(testType?.fhirType()).toStrictEqual('date');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DATE);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseDateType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for DateType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseDateType(INVALID_DATE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for DateType`);
      });
    });

    describe('parseDecimalType', () => {
      const VALID_DECIMAL = -1234.56789;
      const INVALID_DECIMAL = Number.MAX_VALUE;

      it('should return undefined for empty json', () => {
        let testType = parseDecimalType(undefined);
        expect(testType).toBeUndefined();

        testType = parseDecimalType(null);
        expect(testType).toBeUndefined();
      });

      it('should return DecimalType for valid json', () => {
        const testType = parseDecimalType(VALID_DECIMAL);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DecimalType);
        expect(testType?.constructor.name).toStrictEqual('DecimalType');
        expect(testType?.fhirType()).toStrictEqual('decimal');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DECIMAL);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return DecimalType for valid json with simple siblingJson', () => {
        const testType = parseDecimalType(VALID_DECIMAL, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DecimalType);
        expect(testType?.constructor.name).toStrictEqual('DecimalType');
        expect(testType?.fhirType()).toStrictEqual('decimal');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DECIMAL);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return DecimalType for valid json with complex siblingJson', () => {
        const testType = parseDecimalType(VALID_DECIMAL, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(DecimalType);
        expect(testType?.constructor.name).toStrictEqual('DecimalType');
        expect(testType?.fhirType()).toStrictEqual('decimal');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_DECIMAL);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseDecimalType('abc');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for DecimalType is not a number`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseDecimalType(INVALID_DECIMAL);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for DecimalType`);
      });
    });

    describe('parseIdType', () => {
      const VALID_ID = `testIdType`;
      const INVALID_ID = ' invalid Uri ';

      it('should return undefined for empty json', () => {
        let testType = parseIdType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseIdType(undefined);
        expect(testType).toBeUndefined();

        testType = parseIdType(null);
        expect(testType).toBeUndefined();
      });

      it('should return IdType for valid json', () => {
        const testType = parseIdType(VALID_ID);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(IdType);
        expect(testType?.constructor.name).toStrictEqual('IdType');
        expect(testType?.fhirType()).toStrictEqual('id');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_ID);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return IdType for valid json with simple siblingJson', () => {
        const testType = parseIdType(VALID_ID, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(IdType);
        expect(testType?.constructor.name).toStrictEqual('IdType');
        expect(testType?.fhirType()).toStrictEqual('id');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_ID);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return IdType for valid json with complex siblingJson', () => {
        const testType = parseIdType(VALID_ID, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(IdType);
        expect(testType?.constructor.name).toStrictEqual('IdType');
        expect(testType?.fhirType()).toStrictEqual('id');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_ID);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseIdType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for IdType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseIdType(INVALID_ID);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for IdType`);
      });
    });

    describe('parseInstantType', () => {
      const VALID_INSTANT = `2015-02-07T13:28:17.239+02:00`;
      const INVALID_INSTANT = `invalid instant`;

      it('should return undefined for empty json', () => {
        let testType = parseInstantType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseInstantType(undefined);
        expect(testType).toBeUndefined();

        testType = parseInstantType(null);
        expect(testType).toBeUndefined();
      });

      it('should return InstantType for valid json', () => {
        const testType = parseInstantType(VALID_INSTANT);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(InstantType);
        expect(testType?.constructor.name).toStrictEqual('InstantType');
        expect(testType?.fhirType()).toStrictEqual('instant');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INSTANT);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return InstantType for valid json with simple siblingJson', () => {
        const testType = parseInstantType(VALID_INSTANT, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(InstantType);
        expect(testType?.constructor.name).toStrictEqual('InstantType');
        expect(testType?.fhirType()).toStrictEqual('instant');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INSTANT);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return InstantType for valid json with complex siblingJson', () => {
        const testType = parseInstantType(VALID_INSTANT, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(InstantType);
        expect(testType?.constructor.name).toStrictEqual('InstantType');
        expect(testType?.fhirType()).toStrictEqual('instant');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isDateTimePrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INSTANT);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseInstantType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for InstantType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseInstantType(INVALID_INSTANT);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for InstantType`);
      });
    });

    describe('parseInteger64Type', () => {
      const VALID_INTEGER64 = BigInt(FHIR_MIN_INTEGER64);
      const INVALID_INTEGER64 = BigInt(FHIR_MAX_INTEGER64) + 1n;
      const VALID_INTEGER64_JSON = String(VALID_INTEGER64);
      const INVALID_INTEGER64_JSON = String(INVALID_INTEGER64);

      it('should return undefined for empty json', () => {
        let testType = parseInteger64Type(undefined);
        expect(testType).toBeUndefined();

        testType = parseInteger64Type(null);
        expect(testType).toBeUndefined();
      });

      it('should return Integer64Type for valid json', () => {
        const testType = parseInteger64Type(VALID_INTEGER64_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Integer64Type);
        expect(testType?.constructor.name).toStrictEqual('Integer64Type');
        expect(testType?.fhirType()).toStrictEqual('integer64');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isBigIntPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER64);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return Integer64Type for valid json with simple siblingJson', () => {
        const testType = parseInteger64Type(VALID_INTEGER64_JSON, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Integer64Type);
        expect(testType?.constructor.name).toStrictEqual('Integer64Type');
        expect(testType?.fhirType()).toStrictEqual('integer64');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isBigIntPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER64);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return Integer64Type for valid json with complex siblingJson', () => {
        const testType = parseInteger64Type(VALID_INTEGER64_JSON, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Integer64Type);
        expect(testType?.constructor.name).toStrictEqual('Integer64Type');
        expect(testType?.fhirType()).toStrictEqual('integer64');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isBigIntPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER64);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseInteger64Type(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for Integer64Type is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseInteger64Type(INVALID_INTEGER64_JSON);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for Integer64Type`);
      });
    });

    describe('parseIntegerType', () => {
      const VALID_INTEGER = FHIR_MIN_INTEGER;
      const INVALID_INTEGER = FHIR_MAX_INTEGER + 1;

      it('should return undefined for empty json', () => {
        let testType = parseIntegerType(undefined);
        expect(testType).toBeUndefined();

        testType = parseIntegerType(null);
        expect(testType).toBeUndefined();
      });

      it('should return IntegerType for valid json', () => {
        const testType = parseIntegerType(VALID_INTEGER);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(IntegerType);
        expect(testType?.constructor.name).toStrictEqual('IntegerType');
        expect(testType?.fhirType()).toStrictEqual('integer');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return IntegerType for valid json with simple siblingJson', () => {
        const testType = parseIntegerType(VALID_INTEGER, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(IntegerType);
        expect(testType?.constructor.name).toStrictEqual('IntegerType');
        expect(testType?.fhirType()).toStrictEqual('integer');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return IntegerType for valid json with complex siblingJson', () => {
        const testType = parseIntegerType(VALID_INTEGER, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(IntegerType);
        expect(testType?.constructor.name).toStrictEqual('IntegerType');
        expect(testType?.fhirType()).toStrictEqual('integer');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseIntegerType('abc');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for IntegerType is not a number`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseIntegerType(INVALID_INTEGER);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for IntegerType`);
      });
    });

    describe('parseMarkdownType', () => {
      const VALID_MARKDOWN = 'This is a **valid** _string_.';
      const INVALID_MARKDOWN = TOO_BIG_STRING;

      it('should return undefined for empty json', () => {
        let testType = parseMarkdownType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseMarkdownType(undefined);
        expect(testType).toBeUndefined();

        testType = parseMarkdownType(null);
        expect(testType).toBeUndefined();
      });

      it('should return MarkdownType for valid json', () => {
        const testType = parseMarkdownType(VALID_MARKDOWN);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(MarkdownType);
        expect(testType?.constructor.name).toStrictEqual('MarkdownType');
        expect(testType?.fhirType()).toStrictEqual('markdown');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_MARKDOWN);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return MarkdownType for valid json with simple siblingJson', () => {
        const testType = parseMarkdownType(VALID_MARKDOWN, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(MarkdownType);
        expect(testType?.constructor.name).toStrictEqual('MarkdownType');
        expect(testType?.fhirType()).toStrictEqual('markdown');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_MARKDOWN);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return MarkdownType for valid json with complex siblingJson', () => {
        const testType = parseMarkdownType(VALID_MARKDOWN, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(MarkdownType);
        expect(testType?.constructor.name).toStrictEqual('MarkdownType');
        expect(testType?.fhirType()).toStrictEqual('markdown');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_MARKDOWN);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseMarkdownType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for MarkdownType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseMarkdownType(INVALID_MARKDOWN);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for MarkdownType`);
      });
    });

    describe('parseOidType', () => {
      const VALID_OID = `urn:oid:1.2.3.4.5`;
      const INVALID_OID = '1.3.5.7.9';

      it('should return undefined for empty json', () => {
        let testType = parseOidType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseOidType(undefined);
        expect(testType).toBeUndefined();

        testType = parseOidType(null);
        expect(testType).toBeUndefined();
      });

      it('should return OidType for valid json', () => {
        const testType = parseOidType(VALID_OID);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(OidType);
        expect(testType?.constructor.name).toStrictEqual('OidType');
        expect(testType?.fhirType()).toStrictEqual('oid');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_OID);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return OidType for valid json with simple siblingJson', () => {
        const testType = parseOidType(VALID_OID, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(OidType);
        expect(testType?.constructor.name).toStrictEqual('OidType');
        expect(testType?.fhirType()).toStrictEqual('oid');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_OID);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return OidType for valid json with complex siblingJson', () => {
        const testType = parseOidType(VALID_OID, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(OidType);
        expect(testType?.constructor.name).toStrictEqual('OidType');
        expect(testType?.fhirType()).toStrictEqual('oid');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_OID);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseOidType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for OidType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseOidType(INVALID_OID);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for OidType`);
      });
    });

    describe('parsePositiveIntType', () => {
      const VALID_INTEGER = 1;
      const INVALID_INTEGER = 0;

      it('should return undefined for empty json', () => {
        let testType = parsePositiveIntType(undefined);
        expect(testType).toBeUndefined();

        testType = parsePositiveIntType(null);
        expect(testType).toBeUndefined();
      });

      it('should return PositiveIntType for valid json', () => {
        const testType = parsePositiveIntType(VALID_INTEGER);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(PositiveIntType);
        expect(testType?.constructor.name).toStrictEqual('PositiveIntType');
        expect(testType?.fhirType()).toStrictEqual('positiveInt');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return PositiveIntType for valid json with simple siblingJson', () => {
        const testType = parsePositiveIntType(VALID_INTEGER, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(PositiveIntType);
        expect(testType?.constructor.name).toStrictEqual('PositiveIntType');
        expect(testType?.fhirType()).toStrictEqual('positiveInt');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return PositiveIntType for valid json with complex siblingJson', () => {
        const testType = parsePositiveIntType(VALID_INTEGER, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(PositiveIntType);
        expect(testType?.constructor.name).toStrictEqual('PositiveIntType');
        expect(testType?.fhirType()).toStrictEqual('positiveInt');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parsePositiveIntType('abc');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for PositiveIntType is not a number`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parsePositiveIntType(INVALID_INTEGER);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for PositiveIntType`);
      });
    });

    describe('parseStringType', () => {
      const VALID_STRING = 'This is a valid string.';
      const INVALID_STRING = TOO_BIG_STRING;

      it('should return undefined for empty json', () => {
        let testType = parseStringType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseStringType(undefined);
        expect(testType).toBeUndefined();

        testType = parseStringType(null);
        expect(testType).toBeUndefined();
      });

      it('should return StringType for valid json', () => {
        const testType = parseStringType(VALID_STRING);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(StringType);
        expect(testType?.constructor.name).toStrictEqual('StringType');
        expect(testType?.fhirType()).toStrictEqual('string');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_STRING);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return StringType for valid json with simple siblingJson', () => {
        const testType = parseStringType(VALID_STRING, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(StringType);
        expect(testType?.constructor.name).toStrictEqual('StringType');
        expect(testType?.fhirType()).toStrictEqual('string');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_STRING);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return StringType for valid json with complex siblingJson', () => {
        const testType = parseStringType(VALID_STRING, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(StringType);
        expect(testType?.constructor.name).toStrictEqual('StringType');
        expect(testType?.fhirType()).toStrictEqual('string');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_STRING);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseStringType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for StringType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseStringType(INVALID_STRING);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for StringType`);
      });
    });

    describe('parseTimeType', () => {
      const VALID_TIME = `13:28:17`;
      const INVALID_TIME = `invalid time`;

      it('should return undefined for empty json', () => {
        let testType = parseTimeType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseTimeType(undefined);
        expect(testType).toBeUndefined();

        testType = parseTimeType(null);
        expect(testType).toBeUndefined();
      });

      it('should return TimeType for valid json', () => {
        const testType = parseTimeType(VALID_TIME);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(TimeType);
        expect(testType?.constructor.name).toStrictEqual('TimeType');
        expect(testType?.fhirType()).toStrictEqual('time');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_TIME);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return TimeType for valid json with simple siblingJson', () => {
        const testType = parseTimeType(VALID_TIME, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(TimeType);
        expect(testType?.constructor.name).toStrictEqual('TimeType');
        expect(testType?.fhirType()).toStrictEqual('time');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_TIME);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return TimeType for valid json with complex siblingJson', () => {
        const testType = parseTimeType(VALID_TIME, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(TimeType);
        expect(testType?.constructor.name).toStrictEqual('TimeType');
        expect(testType?.fhirType()).toStrictEqual('time');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_TIME);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseTimeType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for TimeType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseTimeType(INVALID_TIME);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for TimeType`);
      });
    });

    describe('parseUnsignedIntType', () => {
      const VALID_INTEGER = 0;
      const INVALID_INTEGER = -1;

      it('should return undefined for empty json', () => {
        let testType = parseUnsignedIntType(undefined);
        expect(testType).toBeUndefined();

        testType = parseUnsignedIntType(null);
        expect(testType).toBeUndefined();
      });

      it('should return UnsignedIntType for valid json', () => {
        const testType = parseUnsignedIntType(VALID_INTEGER);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UnsignedIntType);
        expect(testType?.constructor.name).toStrictEqual('UnsignedIntType');
        expect(testType?.fhirType()).toStrictEqual('unsignedInt');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return UnsignedIntType for valid json with simple siblingJson', () => {
        const testType = parseUnsignedIntType(VALID_INTEGER, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UnsignedIntType);
        expect(testType?.constructor.name).toStrictEqual('UnsignedIntType');
        expect(testType?.fhirType()).toStrictEqual('unsignedInt');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return UnsignedIntType for valid json with complex siblingJson', () => {
        const testType = parseUnsignedIntType(VALID_INTEGER, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UnsignedIntType);
        expect(testType?.constructor.name).toStrictEqual('UnsignedIntType');
        expect(testType?.fhirType()).toStrictEqual('unsignedInt');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isNumberPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_INTEGER);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseUnsignedIntType('abc');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for UnsignedIntType is not a number`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseUnsignedIntType(INVALID_INTEGER);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for UnsignedIntType`);
      });
    });

    describe('parseUriType', () => {
      const VALID_URI = `testUriType`;
      const INVALID_URI = ' invalid Uri ';

      it('should return undefined for empty json', () => {
        let testType = parseUriType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseUriType(undefined);
        expect(testType).toBeUndefined();

        testType = parseUriType(null);
        expect(testType).toBeUndefined();
      });

      it('should return UriType for valid json', () => {
        const testType = parseUriType(VALID_URI);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UriType);
        expect(testType?.constructor.name).toStrictEqual('UriType');
        expect(testType?.fhirType()).toStrictEqual('uri');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_URI);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return UriType for valid json with simple siblingJson', () => {
        const testType = parseUriType(VALID_URI, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UriType);
        expect(testType?.constructor.name).toStrictEqual('UriType');
        expect(testType?.fhirType()).toStrictEqual('uri');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_URI);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return UriType for valid json with complex siblingJson', () => {
        const testType = parseUriType(VALID_URI, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UriType);
        expect(testType?.constructor.name).toStrictEqual('UriType');
        expect(testType?.fhirType()).toStrictEqual('uri');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_URI);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseUriType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for UriType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseUriType(INVALID_URI);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for UriType`);
      });
    });

    describe('parseUrlType', () => {
      const VALID_URL = `testUrlType`;
      const INVALID_URL = ' invalid Url ';

      it('should return undefined for empty json', () => {
        let testType = parseUrlType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseUrlType(undefined);
        expect(testType).toBeUndefined();

        testType = parseUrlType(null);
        expect(testType).toBeUndefined();
      });

      it('should return UrlType for valid json', () => {
        const testType = parseUrlType(VALID_URL);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UrlType);
        expect(testType?.constructor.name).toStrictEqual('UrlType');
        expect(testType?.fhirType()).toStrictEqual('url');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_URL);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return UrlType for valid json with simple siblingJson', () => {
        const testType = parseUrlType(VALID_URL, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UrlType);
        expect(testType?.constructor.name).toStrictEqual('UrlType');
        expect(testType?.fhirType()).toStrictEqual('url');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_URL);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return UrlType for valid json with complex siblingJson', () => {
        const testType = parseUrlType(VALID_URL, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UrlType);
        expect(testType?.constructor.name).toStrictEqual('UrlType');
        expect(testType?.fhirType()).toStrictEqual('url');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_URL);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseUrlType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for UrlType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseUrlType(INVALID_URL);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for UrlType`);
      });
    });

    describe('parseUuidType', () => {
      const VALID_UUID = `urn:uuid:c757873d-ec9a-4326-a141-556f43239520`;
      const INVALID_UUID = '6AD7EDAD-8F73-4A43-9CCB-8D72679FFD9C';

      it('should return undefined for empty json', () => {
        let testType = parseUuidType(EMPTY_STRING);
        expect(testType).toBeUndefined();

        testType = parseUuidType(undefined);
        expect(testType).toBeUndefined();

        testType = parseUuidType(null);
        expect(testType).toBeUndefined();
      });

      it('should return UuidType for valid json', () => {
        const testType = parseUuidType(VALID_UUID);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UuidType);
        expect(testType?.constructor.name).toStrictEqual('UuidType');
        expect(testType?.fhirType()).toStrictEqual('uuid');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_UUID);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should return UuidType for valid json with simple siblingJson', () => {
        const testType = parseUuidType(VALID_UUID, SIBLING_JSON_SIMPLE);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UuidType);
        expect(testType?.constructor.name).toStrictEqual('UuidType');
        expect(testType?.fhirType()).toStrictEqual('uuid');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_UUID);
        expect(testType?.getId()).toStrictEqual('id1234');
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_SIMPLE]);
      });

      it('should return UuidType for valid json with complex siblingJson', () => {
        const testType = parseUuidType(VALID_UUID, SIBLING_JSON_COMPLEX);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(UuidType);
        expect(testType?.constructor.name).toStrictEqual('UuidType');
        expect(testType?.fhirType()).toStrictEqual('uuid');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_UUID);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.getExtension()).toStrictEqual([EXPECTED_EXTENSION_COMPLEX]);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseUuidType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for UuidType is not a string`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseUuidType(INVALID_UUID);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for UuidType`);
      });
    });

    describe('parseXhtmlType', () => {
      const VALID_XHTML = `<div xmlns="http://www.w3.org/1999/xhtml">text</div>`;
      const INVALID_XHTML = ' cannot start with whitespace';

      it('should return undefined for empty json', () => {
        let testType = parseXhtmlType(undefined);
        expect(testType).toBeUndefined();

        testType = parseXhtmlType(null);
        expect(testType).toBeUndefined();
      });

      it('should return XhtmlType for valid json', () => {
        const testType = parseXhtmlType(VALID_XHTML);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(XhtmlType);
        expect(testType?.constructor.name).toStrictEqual('XhtmlType');
        expect(testType?.fhirType()).toStrictEqual('xhtml');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isPrimitive()).toBe(true);
        expect(testType?.isStringPrimitive()).toBe(true);
        expect(testType?.getValue()).toStrictEqual(VALID_XHTML);
        expect(testType?.hasId()).toBe(false);
        expect(testType?.hasExtension()).toBe(false);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseXhtmlType(123);
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`json argument for XhtmlType is not a string`);
      });

      it('should throw TypeError for adding an extension', () => {
        const t = () => {
          parseXhtmlType(VALID_XHTML, SIBLING_JSON_SIMPLE);
        };
        expect(t).toThrow(FhirError);
        expect(t).toThrow(`According to the FHIR specification, Extensions are not permitted on the xhtml type`);
      });

      it('should throw PrimitiveTypeError for invalid json value', () => {
        const t = () => {
          parseXhtmlType(INVALID_XHTML);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(`Invalid value for XhtmlType`);
      });
    });
  });

  describe('Complex Datatype Parsers', () => {
    describe('parsePolymorphicDataType', () => {
      it('should return undefined for empty json', () => {
        const sourceField = 'sourceField';
        const fieldName = 'fieldName';

        let testType: DataType | undefined = parsePolymorphicDataType({}, sourceField, fieldName, null);
        expect(testType).toBeUndefined();

        // @ts-expect-error: allow for testing
        testType = parsePolymorphicDataType(undefined, sourceField, fieldName, null);
        expect(testType).toBeUndefined();

        // @ts-expect-error: allow for testing
        testType = parsePolymorphicDataType(null, sourceField, fieldName, null);
        expect(testType).toBeUndefined();
      });
    });

    describe('parseCodeableConcept', () => {
      it('should return undefined for empty json', () => {
        let testType = parseCodeableConcept({});
        expect(testType).toBeUndefined();

        testType = parseCodeableConcept(undefined);
        expect(testType).toBeUndefined();

        testType = parseCodeableConcept(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseCodeableConcept('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`CodeableConcept JSON is not a JSON object.`);
      });

      it('should return CodeableConcept for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          coding: [
            {
              id: 'S-1357',
              extension: [
                {
                  url: 'simpleUrl',
                  valueString: 'simple extension string value',
                },
              ],
              system: 'systemValue1',
              version: 'versionValue1',
              code: 'codeValue1',
              display: 'displayValue1',
              userSelected: false,
            },
            {
              system: 'systemValue2',
              version: 'versionValue2',
              code: 'codeValue2',
              display: 'displayValue2',
              userSelected: true,
            },
          ],
          text: 'textValue',
          _text: {
            extension: [
              {
                id: 'C-2468',
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
        };

        const testType: CodeableConcept | undefined = parseCodeableConcept(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(CodeableConcept);
        expect(testType?.constructor.name).toStrictEqual('CodeableConcept');
        expect(testType?.fhirType()).toStrictEqual('CodeableConcept');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseCoding', () => {
      it('should return undefined for empty json', () => {
        let testType = parseCoding({});
        expect(testType).toBeUndefined();

        testType = parseCoding(undefined);
        expect(testType).toBeUndefined();

        testType = parseCoding(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseCoding('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Coding JSON is not a JSON object.`);
      });

      it('should return Coding for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          system: 'systemValue',
          _system: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          version: 'versionValue',
          code: 'codeValue',
          display: 'displayValue',
          _display: {
            extension: [
              {
                id: 'C-2468',
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          userSelected: false,
        };

        const testType: Coding | undefined = parseCoding(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Coding);
        expect(testType?.constructor.name).toStrictEqual('Coding');
        expect(testType?.fhirType()).toStrictEqual('Coding');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseContactPoint', () => {
      it('should return undefined for empty json', () => {
        let testType = parseContactPoint({});
        expect(testType).toBeUndefined();

        testType = parseContactPoint(undefined);
        expect(testType).toBeUndefined();

        testType = parseContactPoint(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseContactPoint('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`ContactPoint JSON is not a JSON object.`);
      });

      it('should return ContactPoint for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          system: 'phone',
          _system: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          value: 'ContactPoint Value',
          use: 'home',
          rank: 1,
          _rank: {
            extension: [
              {
                id: 'C-2468',
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          period: {
            start: '2017-01-01T00:00:00.000Z',
          },
        };

        const testType: ContactPoint | undefined = parseContactPoint(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(ContactPoint);
        expect(testType?.constructor.name).toStrictEqual('ContactPoint');
        expect(testType?.fhirType()).toStrictEqual('ContactPoint');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseIdentifier', () => {
      it('should return undefined for empty json', () => {
        let testType = parseIdentifier({});
        expect(testType).toBeUndefined();

        testType = parseIdentifier(undefined);
        expect(testType).toBeUndefined();

        testType = parseIdentifier(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseIdentifier('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Identifier JSON is not a JSON object.`);
      });

      it('should return Identifier for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          use: 'testCodeType',
          type: {
            extension: [
              {
                url: 'simpleUrl3A',
                valueString: 'simple extension string value 3A',
              },
              {
                url: 'simpleUrl3B',
                valueString: 'simple extension string value 3B',
              },
            ],
            text: 'CodeableConcept text 1',
          },
          system: 'testUriType',
          _system: {
            id: 'C-2468',
            extension: [
              {
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          value: 'value type string',
          _value: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          period: {
            start: '2017-01-01T00:00:00.000Z',
          },
          assigner: {
            reference: 'Organization/13579',
            display: 'Valid display string',
          },
        };

        const testType: Identifier | undefined = parseIdentifier(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Identifier);
        expect(testType?.constructor.name).toStrictEqual('Identifier');
        expect(testType?.fhirType()).toStrictEqual('Identifier');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseMeta', () => {
      it('should return undefined for empty json', () => {
        let testType = parseMeta({});
        expect(testType).toBeUndefined();

        testType = parseMeta(undefined);
        expect(testType).toBeUndefined();

        testType = parseMeta(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseMeta('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Meta JSON is not a JSON object.`);
      });

      it('should return Meta for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          versionId: 'a-432.E-12345',
          lastUpdated: '2015-02-07T13:28:17.239+02:00',
          source: 'testUriType1',
          _source: {
            id: 'C-2468',
            extension: [
              {
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          profile: ['testCanonical1', 'testCanonical2', 'testCanonical3'],
          _profile: [
            {
              id: 'S-1357',
              extension: [
                {
                  url: 'simpleUrl',
                  valueString: 'simple extension string value',
                },
              ],
            },
            null,
            {
              extension: [
                {
                  url: 'simpleUrl3A',
                  valueString: 'simple extension string value 3A',
                },
                {
                  url: 'simpleUrl3B',
                  valueString: 'simple extension string value 3B',
                },
              ],
            },
          ],
          security: [
            {
              system: 'testSystemSecurity',
              code: 'testCodeSecurity',
              display: 'testDisplaySecurity',
            },
          ],
          tag: [
            {
              system: 'testSystemTag',
              code: 'testCodeTag',
              display: 'testDisplayTag',
            },
          ],
        };

        const testType: Meta | undefined = parseMeta(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Meta);
        expect(testType?.constructor.name).toStrictEqual('Meta');
        expect(testType?.fhirType()).toStrictEqual('Meta');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseNarrative', () => {
      it('should return undefined for empty json', () => {
        let testType = parseNarrative({});
        expect(testType).toBeUndefined();

        testType = parseNarrative(undefined);
        expect(testType).toBeUndefined();

        testType = parseNarrative(null);
        expect(testType).toBeUndefined();
      });

      it('should throw FhirError for missing required fields', () => {
        const INVALID_JSON = { bogus: true };

        const t = () => {
          parseNarrative(INVALID_JSON);
        };
        expect(t).toThrow(FhirError);
        expect(t).toThrow(
          `The following required properties must be included in the provided JSON: Narrative.status, Narrative.div`,
        );
      });

      it('should throw FhirError for missing status', () => {
        const INVALID_JSON = { status: '', div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>' };

        const t = () => {
          parseNarrative(INVALID_JSON);
        };
        expect(t).toThrow(FhirError);
        expect(t).toThrow(`The following required properties must be included in the provided JSON: Narrative.status`);
      });

      it('should throw FhirError for missing div', () => {
        const INVALID_JSON = { status: 'generated', div: '' };

        const t = () => {
          parseNarrative(INVALID_JSON);
        };
        expect(t).toThrow(FhirError);
        expect(t).toThrow(`The following required properties must be included in the provided JSON: Narrative.div`);
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseNarrative('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Narrative JSON is not a JSON object.`);
      });

      it('should throw FhirError for including Extension on div (xhtml) field', () => {
        const INVALID_JSON = {
          status: 'generated',
          div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
          _div: {
            extension: [
              {
                url: 'statusUrl',
                valueString: 'status extension string value',
              },
            ],
          },
        };

        const t = () => {
          parseNarrative(INVALID_JSON);
        };
        expect(t).toThrow(FhirError);
        expect(t).toThrow(`According to the FHIR specification, Extensions are not permitted on the xhtml type`);
      });

      it('should return Narrative for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          status: 'additional',
          _status: {
            id: 'C-2468',
            extension: [
              {
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
          _div: {
            id: 'S-1357',
          },
        };

        const testType: Narrative | undefined = parseNarrative(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Narrative);
        expect(testType?.constructor.name).toStrictEqual('Narrative');
        expect(testType?.fhirType()).toStrictEqual('Narrative');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parsePeriod', () => {
      it('should return undefined for empty json', () => {
        let testType = parsePeriod({});
        expect(testType).toBeUndefined();

        testType = parsePeriod(undefined);
        expect(testType).toBeUndefined();

        testType = parsePeriod(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parsePeriod('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Period JSON is not a JSON object.`);
      });

      it('should return Period for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          start: '2017-01-01T00:00:00.000Z',
          _start: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          end: '2017-01-01T01:00:00.000Z',
          _end: {
            extension: [
              {
                id: 'C-2468',
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
        };

        const testType: Period | undefined = parsePeriod(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Period);
        expect(testType?.constructor.name).toStrictEqual('Period');
        expect(testType?.fhirType()).toStrictEqual('Period');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseQuantity', () => {
      it('should return undefined for empty json', () => {
        let testType = parseQuantity({});
        expect(testType).toBeUndefined();

        testType = parseQuantity(undefined);
        expect(testType).toBeUndefined();

        testType = parseQuantity(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseQuantity('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Quantity JSON is not a JSON object.`);
      });

      it('should return Quantity for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          value: 123.4567,
          _value: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          comparator: '>=',
          _comparator: {
            extension: [
              {
                id: 'C-2468',
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          unit: 'unitValue',
          system: 'systemValue',
          code: 'codeValue',
        };

        const testType: Quantity | undefined = parseQuantity(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Quantity);
        expect(testType?.constructor.name).toStrictEqual('Quantity');
        expect(testType?.fhirType()).toStrictEqual('Quantity');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseRange', () => {
      it('should return undefined for empty json', () => {
        let testType = parseRange({});
        expect(testType).toBeUndefined();

        testType = parseRange(undefined);
        expect(testType).toBeUndefined();

        testType = parseRange(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseRange('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Range JSON is not a JSON object.`);
      });

      it('should return Range for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          low: {
            value: 123.4567,
            _value: {
              id: 'S-1357',
              extension: [
                {
                  url: 'simpleUrl',
                  valueString: 'simple extension string value',
                },
              ],
            },
            unit: 'unitValue',
            _unit: {
              extension: [
                {
                  id: 'C-2468',
                  url: 'complexUrl',
                  extension: [
                    {
                      url: 'complexChildUrl1',
                      valueString: 'complex child extension string value 1',
                    },
                    {
                      url: 'complexChildUrl2',
                      valueString: 'complex child extension string value 2',
                    },
                  ],
                },
              ],
            },
            system: 'systemValue',
            code: 'codeValue',
          },
          high: {
            value: 234.5678,
            unit: 'unitValue',
            system: 'systemValue',
            code: 'codeValue',
          },
        };

        const testType: Range | undefined = parseRange(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Range);
        expect(testType?.constructor.name).toStrictEqual('Range');
        expect(testType?.fhirType()).toStrictEqual('Range');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseReference', () => {
      it('should return undefined for empty json', () => {
        let testType = parseReference({});
        expect(testType).toBeUndefined();

        testType = parseReference(undefined);
        expect(testType).toBeUndefined();

        testType = parseReference(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseReference('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`Reference JSON is not a JSON object.`);
      });

      it('should return Reference for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          reference: 'Patient/24680',
          _reference: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          type: 'testTypeUri',
          _type: {
            id: 'C-2468',
            extension: [
              {
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          identifier: {
            use: 'validCode',
            type: {
              text: 'This is valid string',
            },
            system: 'testIdentifierUri',
            value: 'Identifier value 1',
            period: {
              start: '2017-01-01T00:00:00.000Z',
            },
            assigner: {
              reference: 'Organization/12345',
            },
          },
          display: 'This is another valid string!',
        };

        const testType: Reference | undefined = parseReference(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(Reference);
        expect(testType?.constructor.name).toStrictEqual('Reference');
        expect(testType?.fhirType()).toStrictEqual('Reference');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });

    describe('parseSimpleQuantity', () => {
      it('should return undefined for empty json', () => {
        let testType = parseSimpleQuantity({});
        expect(testType).toBeUndefined();

        testType = parseSimpleQuantity(undefined);
        expect(testType).toBeUndefined();

        testType = parseSimpleQuantity(null);
        expect(testType).toBeUndefined();
      });

      it('should throw TypeError for invalid json type', () => {
        const t = () => {
          parseSimpleQuantity('NOT AN OBJECT');
        };
        expect(t).toThrow(TypeError);
        expect(t).toThrow(`SimpleQuantity JSON is not a JSON object.`);
      });

      it('should return SimpleQuantity for valid json', () => {
        const VALID_JSON = {
          id: 'id1234',
          extension: [
            {
              url: 'testUrl1',
              valueString: 'base extension string value 1',
            },
            {
              url: 'testUrl2',
              valueString: 'base extension string value 2',
            },
          ],
          value: 123.4567,
          _value: {
            id: 'S-1357',
            extension: [
              {
                url: 'simpleUrl',
                valueString: 'simple extension string value',
              },
            ],
          },
          unit: 'unitValue',
          _unit: {
            extension: [
              {
                id: 'C-2468',
                url: 'complexUrl',
                extension: [
                  {
                    url: 'complexChildUrl1',
                    valueString: 'complex child extension string value 1',
                  },
                  {
                    url: 'complexChildUrl2',
                    valueString: 'complex child extension string value 2',
                  },
                ],
              },
            ],
          },
          system: 'systemValue',
          code: 'codeValue',
        };

        const testType: SimpleQuantity | undefined = parseSimpleQuantity(VALID_JSON);
        expect(testType).toBeDefined();
        expect(testType).toBeInstanceOf(SimpleQuantity);
        expect(testType?.constructor.name).toStrictEqual('SimpleQuantity');
        expect(testType?.fhirType()).toStrictEqual('SimpleQuantity');
        expect(testType?.isEmpty()).toBe(false);
        expect(testType?.isComplexDataType()).toBe(true);
        expect(testType?.toJSON()).toEqual(VALID_JSON);
      });
    });
  });
});
