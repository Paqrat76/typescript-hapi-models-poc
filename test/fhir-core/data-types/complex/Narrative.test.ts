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
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { NarrativeStatusEnum } from '@src/fhir-core/data-types/code-systems/NarrativeStatusEnum';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { INVALID_NON_STRING_TYPE } from '../../../test-utils';

describe('Narrative', () => {
  const VALID_CODE_GENERATED = `generated`;
  const VALID_CODE_GENERATED_TYPE = new CodeType(VALID_CODE_GENERATED);
  const VALID_CODE_ADDITIONAL = `additional`;
  const VALID_CODE_ADDITIONAL_TYPE = new CodeType(VALID_CODE_ADDITIONAL);
  const VALID_CODE_EMPTY = `empty`;
  const VALID_CODE_EMPTY_TYPE = new CodeType(VALID_CODE_EMPTY);
  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const UNSUPPORTED_ENUM_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);
  const INVALID_CODE = ' invalid fhirCode ';
  const INVALID_ENUM_CODE_TYPE = new StringType('invalid EnumCodeType');

  const VALID_XHTML = '<div xmlns="http://www.w3.org/1999/xhtml">text</div>';
  const VALID_XHTML_TYPE = new XhtmlType(VALID_XHTML);
  const VALID_XHTML_2 = `any\tstring\r\nlike this that passes the regex `;
  const VALID_XHTML_TYPE_2 = new XhtmlType(VALID_XHTML_2);
  const INVALID_XHTML = ' cannot start with whitespace';

  let narrativeStatusEnum: NarrativeStatusEnum;
  beforeAll(() => {
    narrativeStatusEnum = new NarrativeStatusEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      status: VALID_CODE_GENERATED,
      div: VALID_XHTML,
    };

    it(`should be properly instantiated as empty`, () => {
      const testNarrative = new Narrative(null, null);
      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(true);
      expect(testNarrative.isComplexDataType()).toBe(true);
      const t = () => {
        testNarrative.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Narrative.status, Narrative.div`);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(false);
      expect(testNarrative.getId()).toBeUndefined();
      expect(testNarrative.hasExtension()).toBe(false);
      expect(testNarrative.getExtension()).toEqual([] as Extension[]);

      // Narrative properties
      expect(testNarrative.hasStatusEnumType()).toBe(false);
      expect(testNarrative.getStatusEnumType()).toBeNull();
      expect(testNarrative.hasStatusElement()).toBe(false);
      expect(testNarrative.getStatusElement()).toBeNull();
      expect(testNarrative.hasDivElement()).toBe(false);
      expect(testNarrative.getDivElement()).toBeNull();
      expect(testNarrative.hasStatus()).toBe(false);
      expect(testNarrative.getStatus()).toBeNull();
      expect(testNarrative.hasDiv()).toBe(false);
      expect(testNarrative.getDiv()).toBeNull();
    });

    it('should properly copy()', () => {
      const narrativeType = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);

      const testNarrative = narrativeType.copy();
      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(false);
      expect(testNarrative.isComplexDataType()).toBe(true);
      expect(testNarrative.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(false);
      expect(testNarrative.getId()).toBeUndefined();
      expect(testNarrative.hasExtension()).toBe(false);
      expect(testNarrative.getExtension()).toEqual([] as Extension[]);

      // Narrative properties
      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum));
      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML));
      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
    });

    it('should properly copy() when initialized with null', () => {
      const narrativeType = new Narrative(null, null);
      const testNarrative = narrativeType.copy();

      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(true);
      expect(testNarrative.isComplexDataType()).toBe(true);
      const t = () => {
        testNarrative.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Narrative.status, Narrative.div`);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(false);
      expect(testNarrative.getId()).toBeUndefined();
      expect(testNarrative.hasExtension()).toBe(false);
      expect(testNarrative.getExtension()).toEqual([] as Extension[]);

      // Narrative properties
      expect(testNarrative.hasStatusEnumType()).toBe(false);
      expect(testNarrative.getStatusEnumType()).toBeNull();
      expect(testNarrative.hasStatusElement()).toBe(false);
      expect(testNarrative.getStatusElement()).toBeNull();
      expect(testNarrative.hasDivElement()).toBe(false);
      expect(testNarrative.getDivElement()).toBeNull();
      expect(testNarrative.hasStatus()).toBe(false);
      expect(testNarrative.getStatus()).toBeNull();
      expect(testNarrative.hasDiv()).toBe(false);
      expect(testNarrative.getDiv()).toBeNull();
    });

    it('should properly handle status enum', () => {
      const testNarrative = new Narrative(null, null);

      testNarrative.setStatus(VALID_CODE_GENERATED);
      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);

      testNarrative.setStatusElement(VALID_CODE_ADDITIONAL_TYPE);
      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(VALID_CODE_ADDITIONAL_TYPE);

      testNarrative.setStatusEnumType(new EnumCodeType(VALID_CODE_EMPTY, narrativeStatusEnum));
      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_EMPTY_TYPE, narrativeStatusEnum));

      let t = () => {
        testNarrative.setStatus(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testNarrative.setStatusElement(UNSUPPORTED_ENUM_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testNarrative.setStatusEnumType(new EnumCodeType(UNSUPPORTED_ENUM_CODE, narrativeStatusEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setStatus(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.status is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setStatusElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.status is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setStatusEnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.status is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setStatus(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.status is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setStatusElement(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.status is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setStatusEnumType(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.status is required`);
    });

    // Tests using primitives

    it('should be properly initialized by primitive values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(false);
      expect(testNarrative.isComplexDataType()).toBe(true);
      expect(testNarrative.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(false);
      expect(testNarrative.getId()).toBeUndefined();
      expect(testNarrative.hasExtension()).toBe(false);
      expect(testNarrative.getExtension()).toEqual([] as Extension[]);

      // Narrative properties
      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum));

      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
    });

    it('should be properly reset by modifying Narrative.status and Narrative.div with primitive values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

      testNarrative.setStatus(VALID_CODE_ADDITIONAL);
      testNarrative.setDiv(VALID_XHTML_2);

      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum));

      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_ADDITIONAL));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML_2));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML_2);
    });

    it('should throw errors for invalid primitive values', () => {
      let t = () => {
        new Narrative(UNSUPPORTED_ENUM_CODE, VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Narrative.status; Unknown NarrativeStatusEnum 'code' value 'unsupportedEnumCode'`);

      t = () => {
        new Narrative(INVALID_CODE, VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Narrative.status; Invalid value for CodeType ( invalid fhirCode )`);

      t = () => {
        new Narrative(VALID_CODE_GENERATED, INVALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Narrative.div (invalid value provided)`);

      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);

      t = () => {
        testNarrative.setDiv(INVALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Narrative.div (invalid value provided)`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setDiv(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.div is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setDiv(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.div is required`);
    });

    // Tests using DataType elements

    it('should be properly initialized by DataType values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED_TYPE, VALID_XHTML_TYPE);
      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(false);
      expect(testNarrative.isComplexDataType()).toBe(true);
      expect(testNarrative.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(false);
      expect(testNarrative.getId()).toBeUndefined();
      expect(testNarrative.hasExtension()).toBe(false);
      expect(testNarrative.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum));

      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
    });

    it('should be properly initialized by EnumCodeType and DataType values', () => {
      const enumCodeType = new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum);
      const testNarrative = new Narrative(enumCodeType, VALID_XHTML_TYPE);
      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(false);
      expect(testNarrative.isComplexDataType()).toBe(true);
      expect(testNarrative.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(false);
      expect(testNarrative.getId()).toBeUndefined();
      expect(testNarrative.hasExtension()).toBe(false);
      expect(testNarrative.getExtension()).toEqual([] as Extension[]);

      // Period properties
      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum));

      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
    });

    it('should be properly reset by modifying Narrative.status and Narrative.div with DataType values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

      testNarrative.setStatusElement(VALID_CODE_ADDITIONAL_TYPE);
      testNarrative.setDivElement(VALID_XHTML_TYPE_2);

      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum));

      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_ADDITIONAL));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML_2));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML_2);
    });

    it('should be properly reset by modifying Narrative.status with EnumCodeType and Narrative.div with DataType values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

      testNarrative.setStatusEnumType(new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum));
      testNarrative.setDivElement(VALID_XHTML_TYPE_2);

      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum));

      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_ADDITIONAL));
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML_2));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML_2);
    });

    it('should throw errors for invalid DataType values', () => {
      let t = () => {
        new Narrative(new CodeType(UNSUPPORTED_ENUM_CODE), VALID_XHTML_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        new Narrative(new CodeType(), VALID_XHTML_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`The provided 'code' value is undefined`);

      t = () => {
        new Narrative(new EnumCodeType(UNSUPPORTED_ENUM_CODE, narrativeStatusEnum), VALID_XHTML_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        new Narrative(new EnumCodeType(new CodeType(), narrativeStatusEnum), VALID_XHTML_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`The provided 'code' value is undefined`);

      t = () => {
        // @ts-expect-error: allow for testing
        new Narrative(VALID_CODE_GENERATED_TYPE, INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Narrative.div; Provided element is not an instance of XhtmlType`);

      const testNarrative = new Narrative(VALID_CODE_GENERATED_TYPE, VALID_XHTML_TYPE);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setDivElement(INVALID_ENUM_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Narrative.div; Provided element is not an instance of XhtmlType`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setDivElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.div is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testNarrative.setDivElement(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Narrative.div is required`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testId = 'id1234';
      const testNarrative = new Narrative(null, null);
      testNarrative.setId(testId);

      const t = () => {
        testNarrative.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Narrative.status, Narrative.div`);
    });

    it('should properly create serialized content', () => {
      const statusType = new CodeType(VALID_CODE_ADDITIONAL);
      const statusId = 'S1357';
      const statusExtension = new Extension('statusUrl', new StringType('status extension string value'));
      statusType.setId(statusId);
      statusType.addExtension(statusExtension);

      const testNarrative = new Narrative(statusType, VALID_XHTML_TYPE);
      const testId = 'id1234';
      testNarrative.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testNarrative.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testNarrative.addExtension(testExtension2);

      expect(testNarrative).toBeDefined();
      expect(testNarrative).toBeInstanceOf(DataType);
      expect(testNarrative).toBeInstanceOf(Narrative);
      expect(testNarrative.constructor.name).toStrictEqual('Narrative');
      expect(testNarrative.fhirType()).toStrictEqual('Narrative');
      expect(testNarrative.isEmpty()).toBe(false);
      expect(testNarrative.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testNarrative.hasId()).toBe(true);
      expect(testNarrative.getId()).toStrictEqual(testId);
      expect(testNarrative.hasExtension()).toBe(true);
      expect(testNarrative.getExtension()).toEqual([testExtension1, testExtension2]);

      // Period properties
      expect(testNarrative.hasStatusEnumType()).toBe(true);
      expect(testNarrative.getStatusEnumType()).toEqual(new EnumCodeType(statusType, narrativeStatusEnum));
      expect(testNarrative.hasStatusElement()).toBe(true);
      expect(testNarrative.getStatusElement()).toMatchObject(statusType);
      expect(testNarrative.hasDivElement()).toBe(true);
      expect(testNarrative.getDivElement()).toEqual(new XhtmlType(VALID_XHTML));

      expect(testNarrative.hasStatus()).toBe(true);
      expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
      expect(testNarrative.hasDiv()).toBe(true);
      expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);

      const expectedJson = {
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
          id: 'S1357',
          extension: [
            {
              url: 'statusUrl',
              valueString: 'status extension string value',
            },
          ],
        },
        div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
      };
      expect(testNarrative.toJSON()).toEqual(expectedJson);
    });
  });
});
