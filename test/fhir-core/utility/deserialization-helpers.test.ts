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

import {
  deserializeBase64BinaryType,
  deserializeBooleanType,
  deserializeCanonicalType,
  deserializeCodeType,
  deserializeDateTimeType,
  deserializeDateType,
  deserializeDecimalType,
  deserializeExtension,
  deserializeIdType,
  deserializeInstantType,
  deserializeInteger64Type,
  deserializeIntegerType,
  deserializeMarkdownType,
  deserializeOidType,
  deserializePositiveIntType,
  deserializeStringType,
  deserializeTimeType,
  deserializeUnsignedIntType,
  deserializeUriType,
  deserializeUrlType,
  deserializeUuidType,
  deserializeXhtmlType,
  deserializeCodeableConcept,
  deserializeCoding,
  deserializeIdentifier,
  deserializeMeta,
  deserializePeriod,
  deserializeQuantity,
  deserializeRange,
  deserializeReference,
  deserializeSimpleQuantity,
  deserializeNarrative,
} from '@src/fhir-core/utility/deserialization-helpers';
import { Extension } from '@src/fhir-core/base-models/core-fhir-models';
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
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  FHIR_MAX_INTEGER,
  FHIR_MAX_INTEGER64,
  FHIR_MIN_INTEGER,
  FHIR_MIN_INTEGER64,
  TOO_BIG_STRING,
} from '../../test-utils';

describe('deserialization-helpers', () => {
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

  describe('deserializeExtension', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeExtension({});
      expect(testType).toBeUndefined();

      testType = deserializeExtension(undefined);
      expect(testType).toBeUndefined();

      // @ts-expect-error: allow for testing
      testType = deserializeExtension(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const INVALID_EXTENSION_JSON = {
        extension: [
          {
            id: 'extId',
            valueString: 'extension string value',
          },
        ],
      };

      const t = () => {
        deserializeExtension(INVALID_EXTENSION_JSON);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Extension.url is a required data element`);
    });
  });

  describe('deserializeBase64BinaryType', () => {
    const VALID_BASE64BINARY = `dGVzdEJhc2U2NEJpbmFyeQ==`;
    const INVALID_BASE64BINARY = 'invalidBase64Binary';

    it('should return undefined for empty json', () => {
      let testType = deserializeBase64BinaryType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeBase64BinaryType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeBase64BinaryType(null);
      expect(testType).toBeUndefined();
    });

    it('should return Base64BinaryType for valid json', () => {
      const testType = deserializeBase64BinaryType(VALID_BASE64BINARY);
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
      const testType = deserializeBase64BinaryType(VALID_BASE64BINARY, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeBase64BinaryType(VALID_BASE64BINARY, SIBLING_JSON_COMPLEX);
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
        deserializeBase64BinaryType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for Base64BinaryType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeBase64BinaryType(INVALID_BASE64BINARY);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for Base64BinaryType`);
    });
  });

  describe('deserializeBooleanType', () => {
    const INVALID_BOOLEAN = 'invalidBoolean';

    it('should return undefined for empty json', () => {
      let testType = deserializeBooleanType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeBooleanType(null);
      expect(testType).toBeUndefined();
    });

    it('should return BooleanType for valid json', () => {
      const testType = deserializeBooleanType(true);
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
      const testType = deserializeBooleanType(false, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeBooleanType(false, SIBLING_JSON_COMPLEX);
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
        deserializeBooleanType(INVALID_BOOLEAN);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for BooleanType is not a boolean`);
    });
  });

  describe('deserializeCanonicalType', () => {
    const VALID_CANONICAL = `testCanonicalType`;
    const INVALID_CANONICAL = ' invalid Url ';

    it('should return undefined for empty json', () => {
      let testType = deserializeCanonicalType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeCanonicalType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeCanonicalType(null);
      expect(testType).toBeUndefined();
    });

    it('should return CanonicalType for valid json', () => {
      const testType = deserializeCanonicalType(VALID_CANONICAL);
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
      const testType = deserializeCanonicalType(VALID_CANONICAL, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeCanonicalType(VALID_CANONICAL, SIBLING_JSON_COMPLEX);
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
        deserializeCanonicalType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for CanonicalType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeCanonicalType(INVALID_CANONICAL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CanonicalType`);
    });
  });

  describe('deserializeCodeType', () => {
    const VALID_CODE = `testCodeType`;
    const INVALID_CODE = ' invalid CodeType ';

    it('should return undefined for empty json', () => {
      let testType = deserializeCodeType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeCodeType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeCodeType(null);
      expect(testType).toBeUndefined();
    });

    it('should return CodeType for valid json', () => {
      const testType = deserializeCodeType(VALID_CODE);
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
      const testType = deserializeCodeType(VALID_CODE, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeCodeType(VALID_CODE, SIBLING_JSON_COMPLEX);
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
        deserializeCodeType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for CodeType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeCodeType(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CodeType`);
    });
  });

  describe('deserializeDateTimeType', () => {
    const VALID_DATETIME = `2015-02-07T13:28:17.239+02:00`;
    const INVALID_DATETIME = `invalid date time`;

    it('should return undefined for empty json', () => {
      let testType = deserializeDateTimeType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeDateTimeType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeDateTimeType(null);
      expect(testType).toBeUndefined();
    });

    it('should return DateTimeType for valid json', () => {
      const testType = deserializeDateTimeType(VALID_DATETIME);
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
      const testType = deserializeDateTimeType(VALID_DATETIME, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeDateTimeType(VALID_DATETIME, SIBLING_JSON_COMPLEX);
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
        deserializeDateTimeType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for DateTimeType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeDateTimeType(INVALID_DATETIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateTimeType`);
    });
  });

  describe('deserializeDateType', () => {
    const VALID_DATE = `2015-02-07`;
    const INVALID_DATE = `invalid date`;

    it('should return undefined for empty json', () => {
      let testType = deserializeDateType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeDateType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeDateType(null);
      expect(testType).toBeUndefined();
    });

    it('should return DateType for valid json', () => {
      const testType = deserializeDateType(VALID_DATE);
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
      const testType = deserializeDateType(VALID_DATE, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeDateType(VALID_DATE, SIBLING_JSON_COMPLEX);
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
        deserializeDateType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for DateType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeDateType(INVALID_DATE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DateType`);
    });
  });

  describe('deserializeDecimalType', () => {
    const VALID_DECIMAL = -1234.56789;
    const INVALID_DECIMAL = Number.MAX_VALUE;

    it('should return undefined for empty json', () => {
      let testType = deserializeDecimalType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeDecimalType(null);
      expect(testType).toBeUndefined();
    });

    it('should return DecimalType for valid json', () => {
      const testType = deserializeDecimalType(VALID_DECIMAL);
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
      const testType = deserializeDecimalType(VALID_DECIMAL, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeDecimalType(VALID_DECIMAL, SIBLING_JSON_COMPLEX);
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
        deserializeDecimalType('abc');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for DecimalType is not a number`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeDecimalType(INVALID_DECIMAL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for DecimalType`);
    });
  });

  describe('deserializeIdType', () => {
    const VALID_ID = `testIdType`;
    const INVALID_ID = ' invalid Uri ';

    it('should return undefined for empty json', () => {
      let testType = deserializeIdType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeIdType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeIdType(null);
      expect(testType).toBeUndefined();
    });

    it('should return IdType for valid json', () => {
      const testType = deserializeIdType(VALID_ID);
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
      const testType = deserializeIdType(VALID_ID, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeIdType(VALID_ID, SIBLING_JSON_COMPLEX);
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
        deserializeIdType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for IdType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeIdType(INVALID_ID);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for IdType`);
    });
  });

  describe('deserializeInstantType', () => {
    const VALID_INSTANT = `2015-02-07T13:28:17.239+02:00`;
    const INVALID_INSTANT = `invalid instant`;

    it('should return undefined for empty json', () => {
      let testType = deserializeInstantType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeInstantType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeInstantType(null);
      expect(testType).toBeUndefined();
    });

    it('should return InstantType for valid json', () => {
      const testType = deserializeInstantType(VALID_INSTANT);
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
      const testType = deserializeInstantType(VALID_INSTANT, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeInstantType(VALID_INSTANT, SIBLING_JSON_COMPLEX);
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
        deserializeInstantType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for InstantType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeInstantType(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType`);
    });
  });

  describe('deserializeInteger64Type', () => {
    const VALID_INTEGER64 = BigInt(FHIR_MIN_INTEGER64);
    const INVALID_INTEGER64 = BigInt(FHIR_MAX_INTEGER64) + 1n;
    const VALID_INTEGER64_JSON = String(VALID_INTEGER64);
    const INVALID_INTEGER64_JSON = String(INVALID_INTEGER64);

    it('should return undefined for empty json', () => {
      let testType = deserializeInteger64Type(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeInteger64Type(null);
      expect(testType).toBeUndefined();
    });

    it('should return Integer64Type for valid json', () => {
      const testType = deserializeInteger64Type(VALID_INTEGER64_JSON);
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
      const testType = deserializeInteger64Type(VALID_INTEGER64_JSON, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeInteger64Type(VALID_INTEGER64_JSON, SIBLING_JSON_COMPLEX);
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
        deserializeInteger64Type(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for Integer64Type is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeInteger64Type(INVALID_INTEGER64_JSON);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for Integer64Type`);
    });
  });

  describe('deserializeIntegerType', () => {
    const VALID_INTEGER = FHIR_MIN_INTEGER;
    const INVALID_INTEGER = FHIR_MAX_INTEGER + 1;

    it('should return undefined for empty json', () => {
      let testType = deserializeIntegerType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeIntegerType(null);
      expect(testType).toBeUndefined();
    });

    it('should return IntegerType for valid json', () => {
      const testType = deserializeIntegerType(VALID_INTEGER);
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
      const testType = deserializeIntegerType(VALID_INTEGER, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeIntegerType(VALID_INTEGER, SIBLING_JSON_COMPLEX);
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
        deserializeIntegerType('abc');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for IntegerType is not a number`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeIntegerType(INVALID_INTEGER);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for IntegerType`);
    });
  });

  describe('deserializeMarkdownType', () => {
    const VALID_MARKDOWN = 'This is a **valid** _string_.';
    const INVALID_MARKDOWN = TOO_BIG_STRING;

    it('should return undefined for empty json', () => {
      let testType = deserializeMarkdownType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeMarkdownType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeMarkdownType(null);
      expect(testType).toBeUndefined();
    });

    it('should return MarkdownType for valid json', () => {
      const testType = deserializeMarkdownType(VALID_MARKDOWN);
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
      const testType = deserializeMarkdownType(VALID_MARKDOWN, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeMarkdownType(VALID_MARKDOWN, SIBLING_JSON_COMPLEX);
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
        deserializeMarkdownType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for MarkdownType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeMarkdownType(INVALID_MARKDOWN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for MarkdownType`);
    });
  });

  describe('deserializeOidType', () => {
    const VALID_OID = `urn:oid:1.2.3.4.5`;
    const INVALID_OID = '1.3.5.7.9';

    it('should return undefined for empty json', () => {
      let testType = deserializeOidType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeOidType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeOidType(null);
      expect(testType).toBeUndefined();
    });

    it('should return OidType for valid json', () => {
      const testType = deserializeOidType(VALID_OID);
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
      const testType = deserializeOidType(VALID_OID, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeOidType(VALID_OID, SIBLING_JSON_COMPLEX);
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
        deserializeOidType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for OidType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeOidType(INVALID_OID);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for OidType`);
    });
  });

  describe('deserializePositiveIntType', () => {
    const VALID_INTEGER = 1;
    const INVALID_INTEGER = 0;

    it('should return undefined for empty json', () => {
      let testType = deserializePositiveIntType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializePositiveIntType(null);
      expect(testType).toBeUndefined();
    });

    it('should return PositiveIntType for valid json', () => {
      const testType = deserializePositiveIntType(VALID_INTEGER);
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
      const testType = deserializePositiveIntType(VALID_INTEGER, SIBLING_JSON_SIMPLE);
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
      const testType = deserializePositiveIntType(VALID_INTEGER, SIBLING_JSON_COMPLEX);
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
        deserializePositiveIntType('abc');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for PositiveIntType is not a number`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializePositiveIntType(INVALID_INTEGER);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for PositiveIntType`);
    });
  });

  describe('deserializeStringType', () => {
    const VALID_STRING = 'This is a valid string.';
    const INVALID_STRING = TOO_BIG_STRING;

    it('should return undefined for empty json', () => {
      let testType = deserializeStringType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeStringType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeStringType(null);
      expect(testType).toBeUndefined();
    });

    it('should return StringType for valid json', () => {
      const testType = deserializeStringType(VALID_STRING);
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
      const testType = deserializeStringType(VALID_STRING, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeStringType(VALID_STRING, SIBLING_JSON_COMPLEX);
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
        deserializeStringType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for StringType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeStringType(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for StringType`);
    });
  });

  describe('deserializeTimeType', () => {
    const VALID_TIME = `13:28:17`;
    const INVALID_TIME = `invalid time`;

    it('should return undefined for empty json', () => {
      let testType = deserializeTimeType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeTimeType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeTimeType(null);
      expect(testType).toBeUndefined();
    });

    it('should return TimeType for valid json', () => {
      const testType = deserializeTimeType(VALID_TIME);
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
      const testType = deserializeTimeType(VALID_TIME, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeTimeType(VALID_TIME, SIBLING_JSON_COMPLEX);
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
        deserializeTimeType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for TimeType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeTimeType(INVALID_TIME);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for TimeType`);
    });
  });

  describe('deserializeUnsignedIntType', () => {
    const VALID_INTEGER = 0;
    const INVALID_INTEGER = -1;

    it('should return undefined for empty json', () => {
      let testType = deserializeUnsignedIntType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeUnsignedIntType(null);
      expect(testType).toBeUndefined();
    });

    it('should return UnsignedIntType for valid json', () => {
      const testType = deserializeUnsignedIntType(VALID_INTEGER);
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
      const testType = deserializeUnsignedIntType(VALID_INTEGER, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeUnsignedIntType(VALID_INTEGER, SIBLING_JSON_COMPLEX);
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
        deserializeUnsignedIntType('abc');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for UnsignedIntType is not a number`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeUnsignedIntType(INVALID_INTEGER);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for UnsignedIntType`);
    });
  });

  describe('deserializeUriType', () => {
    const VALID_URI = `testUriType`;
    const INVALID_URI = ' invalid Uri ';

    it('should return undefined for empty json', () => {
      let testType = deserializeUriType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeUriType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeUriType(null);
      expect(testType).toBeUndefined();
    });

    it('should return UriType for valid json', () => {
      const testType = deserializeUriType(VALID_URI);
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
      const testType = deserializeUriType(VALID_URI, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeUriType(VALID_URI, SIBLING_JSON_COMPLEX);
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
        deserializeUriType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for UriType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeUriType(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for UriType`);
    });
  });

  describe('deserializeUrlType', () => {
    const VALID_URL = `testUrlType`;
    const INVALID_URL = ' invalid Url ';

    it('should return undefined for empty json', () => {
      let testType = deserializeUrlType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeUrlType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeUrlType(null);
      expect(testType).toBeUndefined();
    });

    it('should return UrlType for valid json', () => {
      const testType = deserializeUrlType(VALID_URL);
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
      const testType = deserializeUrlType(VALID_URL, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeUrlType(VALID_URL, SIBLING_JSON_COMPLEX);
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
        deserializeUrlType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for UrlType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeUrlType(INVALID_URL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for UrlType`);
    });
  });

  describe('deserializeUuidType', () => {
    const VALID_UUID = `urn:uuid:c757873d-ec9a-4326-a141-556f43239520`;
    const INVALID_UUID = '6AD7EDAD-8F73-4A43-9CCB-8D72679FFD9C';

    it('should return undefined for empty json', () => {
      let testType = deserializeUuidType(EMPTY_STRING);
      expect(testType).toBeUndefined();

      testType = deserializeUuidType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeUuidType(null);
      expect(testType).toBeUndefined();
    });

    it('should return UuidType for valid json', () => {
      const testType = deserializeUuidType(VALID_UUID);
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
      const testType = deserializeUuidType(VALID_UUID, SIBLING_JSON_SIMPLE);
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
      const testType = deserializeUuidType(VALID_UUID, SIBLING_JSON_COMPLEX);
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
        deserializeUuidType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for UuidType is not a string`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeUuidType(INVALID_UUID);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for UuidType`);
    });
  });

  describe('deserializeXhtmlType', () => {
    const VALID_XHTML = `<div xmlns="http://www.w3.org/1999/xhtml">text</div>`;
    const INVALID_XHTML = '';

    it('should return undefined for empty json', () => {
      let testType = deserializeXhtmlType(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeXhtmlType(null);
      expect(testType).toBeUndefined();
    });

    it('should return XhtmlType for valid json', () => {
      const testType = deserializeXhtmlType(VALID_XHTML);
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
        deserializeXhtmlType(123);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`json argument for XhtmlType is not a string`);
    });

    it('should throw TypeError for adding an extension', () => {
      const t = () => {
        deserializeXhtmlType(VALID_XHTML, SIBLING_JSON_SIMPLE);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`According to the FHIR specification, Extensions are not permitted on the xhtml type`);
    });

    it('should throw PrimitiveTypeError for invalid json value', () => {
      const t = () => {
        deserializeXhtmlType(INVALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for XhtmlType`);
    });
  });

  describe('deserializeCodeableConcept', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeCodeableConcept({});
      expect(testType).toBeUndefined();

      testType = deserializeCodeableConcept(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeCodeableConcept(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeCodeableConcept('NOT AN OBJECT');
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

      const testType: CodeableConcept | undefined = deserializeCodeableConcept(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(CodeableConcept);
      expect(testType?.constructor.name).toStrictEqual('CodeableConcept');
      expect(testType?.fhirType()).toStrictEqual('CodeableConcept');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeCoding', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeCoding({});
      expect(testType).toBeUndefined();

      testType = deserializeCoding(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeCoding(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeCoding('NOT AN OBJECT');
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

      const testType: Coding | undefined = deserializeCoding(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Coding);
      expect(testType?.constructor.name).toStrictEqual('Coding');
      expect(testType?.fhirType()).toStrictEqual('Coding');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeIdentifier', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeIdentifier({});
      expect(testType).toBeUndefined();

      testType = deserializeIdentifier(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeIdentifier(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeIdentifier('NOT AN OBJECT');
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

      const testType: Identifier | undefined = deserializeIdentifier(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Identifier);
      expect(testType?.constructor.name).toStrictEqual('Identifier');
      expect(testType?.fhirType()).toStrictEqual('Identifier');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeMeta', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeMeta({});
      expect(testType).toBeUndefined();

      testType = deserializeMeta(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeMeta(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeMeta('NOT AN OBJECT');
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

      const testType: Meta | undefined = deserializeMeta(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Meta);
      expect(testType?.constructor.name).toStrictEqual('Meta');
      expect(testType?.fhirType()).toStrictEqual('Meta');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeNarrative', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeNarrative({});
      expect(testType).toBeUndefined();

      testType = deserializeNarrative(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeNarrative(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeNarrative('NOT AN OBJECT');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Narrative JSON is not a JSON object.`);
    });

    it('should throw TypeError for including Extension on div (xhtml) field', () => {
      const INVALID_JSON = {
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
        deserializeNarrative(INVALID_JSON);
      };
      expect(t).toThrow(TypeError);
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

      const testType: Narrative | undefined = deserializeNarrative(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Narrative);
      expect(testType?.constructor.name).toStrictEqual('Narrative');
      expect(testType?.fhirType()).toStrictEqual('Narrative');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializePeriod', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializePeriod({});
      expect(testType).toBeUndefined();

      testType = deserializePeriod(undefined);
      expect(testType).toBeUndefined();

      testType = deserializePeriod(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializePeriod('NOT AN OBJECT');
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

      const testType: Period | undefined = deserializePeriod(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Period);
      expect(testType?.constructor.name).toStrictEqual('Period');
      expect(testType?.fhirType()).toStrictEqual('Period');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeQuantity', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeQuantity({});
      expect(testType).toBeUndefined();

      testType = deserializeQuantity(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeQuantity(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeQuantity('NOT AN OBJECT');
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

      const testType: Quantity | undefined = deserializeQuantity(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Quantity);
      expect(testType?.constructor.name).toStrictEqual('Quantity');
      expect(testType?.fhirType()).toStrictEqual('Quantity');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeRange', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeRange({});
      expect(testType).toBeUndefined();

      testType = deserializeRange(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeRange(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeRange('NOT AN OBJECT');
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

      const testType: Range | undefined = deserializeRange(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Range);
      expect(testType?.constructor.name).toStrictEqual('Range');
      expect(testType?.fhirType()).toStrictEqual('Range');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeReference', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeReference({});
      expect(testType).toBeUndefined();

      testType = deserializeReference(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeReference(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeReference('NOT AN OBJECT');
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

      const testType: Reference | undefined = deserializeReference(VALID_JSON);
      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Reference);
      expect(testType?.constructor.name).toStrictEqual('Reference');
      expect(testType?.fhirType()).toStrictEqual('Reference');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('deserializeSimpleQuantity', () => {
    it('should return undefined for empty json', () => {
      let testType = deserializeSimpleQuantity({});
      expect(testType).toBeUndefined();

      testType = deserializeSimpleQuantity(undefined);
      expect(testType).toBeUndefined();

      testType = deserializeSimpleQuantity(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        deserializeSimpleQuantity('NOT AN OBJECT');
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

      const testType: SimpleQuantity | undefined = deserializeSimpleQuantity(VALID_JSON);
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
