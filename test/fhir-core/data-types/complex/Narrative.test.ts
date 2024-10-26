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

import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
// import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { NarrativeStatusEnum } from '@src/fhir-core/data-types/complex/code-systems/NarrativeStatusEnum';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('Narrative', () => {
  const VALID_CODE_GENERATED = `generated`;
  const VALID_CODE_GENERATED_TYPE = new CodeType(VALID_CODE_GENERATED);
  const VALID_CODE_ADDITIONAL = `additional`;
  const VALID_CODE_ADDITIONAL_TYPE_2 = new CodeType(VALID_CODE_ADDITIONAL);
  const UNSUPPORTED_ENUM_CODE = 'unsupporedEnumCode';
  const UNDEFINED_ENUM_CODE_VALUE = `undefined`;
  const INVALID_CODE = ' invalid CodeType ';

  const VALID_XHTML = '<div xmlns="http://www.w3.org/1999/xhtml">text</div>';
  const VALID_XHTML_TYPE = new XhtmlType(VALID_XHTML);
  const VALID_XHTML_2 = ` any\tstring\r\nlike this that passes the regex `;
  const VALID_XHTML_TYPE_2 = new XhtmlType(VALID_XHTML_2);
  const INVALID_XHTML = '';

  let narrativeStatusEnum: NarrativeStatusEnum;
  beforeAll(() => {
    narrativeStatusEnum = new NarrativeStatusEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      status: 'generated',
      div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
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
      expect(testNarrative.toJSON()).toBeUndefined();

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

    it('should be properly initialized by PrimitiveType values', () => {
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

    it('should be properly initialized by EnumCodeType and PrimitiveType values', () => {
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

    it('should throw InvalidCodeError when initialized with unsupported primitive Narrative.status value', () => {
      const t = () => {
        new Narrative(UNSUPPORTED_ENUM_CODE, VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Narrative.status (${UNSUPPORTED_ENUM_CODE})`);
    });

    it('should throw InvalidCodeError when initialized with unsupported PrimitiveType Narrative.status value', () => {
      let t = () => {
        new Narrative(new CodeType(UNSUPPORTED_ENUM_CODE), VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Narrative.status (${UNSUPPORTED_ENUM_CODE})`);

      t = () => {
        new Narrative(new CodeType(), VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Narrative.status (${UNDEFINED_ENUM_CODE_VALUE})`);
    });

    it('should throw InvalidCodeError when initialized with unsupported EnumCodeType Narrative.status value', () => {
      const t = () => {
        new Narrative(new EnumCodeType(UNSUPPORTED_ENUM_CODE, narrativeStatusEnum), VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw PrimitiveTypeError when initialized with invalid primitive Narrative.status value', () => {
      const t = () => {
        new Narrative(INVALID_CODE, VALID_XHTML);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Narrative.status (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when initialized with invalid PrimitiveType Narrative.status value', () => {
      const t = () => {
        new Narrative(new CodeType(INVALID_CODE), VALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when initialized with invalid EnumCodeType Narrative.status value', () => {
      const t = () => {
        new Narrative(new EnumCodeType(INVALID_CODE, narrativeStatusEnum), VALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Narrative.status value', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      const t = () => {
        testNarrative.setStatus(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid PrimitiveType Narrative.status value', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      const t = () => {
        testNarrative.setStatusElement(new CodeType(INVALID_CODE));
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid EnumCodeType Narrative.status value', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      const t = () => {
        testNarrative.setStatueEnumType(new EnumCodeType(INVALID_CODE, narrativeStatusEnum));
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when initialized with invalid primitive Narrative.div value', () => {
      const t = () => {
        new Narrative(VALID_CODE_GENERATED, INVALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Narrative.div`);
    });

    it('should throw PrimitiveTypeError when initialized with invalid PrimitiveType Narrative.div value', () => {
      const t = () => {
        new Narrative(VALID_CODE_GENERATED, new XhtmlType(INVALID_XHTML));
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for XhtmlType`);
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

    it('should be properly reset by modifying Narrative.status and Narrative.div with PrimitiveType values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

      testNarrative.setStatusElement(VALID_CODE_ADDITIONAL_TYPE_2);
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

    it('should be properly reset by modifying Narrative.status with EnumCodeType and Narrative.div with PrimitiveType values', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

      testNarrative.setStatueEnumType(new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum));
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

    it('should NOT reset by modifying Narrative.status and Narrative.div for primitive values with null', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

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

      // @ts-expect-error: allow null for testing
      testNarrative.setStatus(null);
      // @ts-expect-error: allow null for testing
      testNarrative.setDiv(null);

      // setting to null should result in NO changes

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

    it('should NOT reset by modifying Narrative.status and Narrative.div for PrimitiveType values with null', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

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

      // @ts-expect-error: allow null for testing
      testNarrative.setStatusElement(null);
      // @ts-expect-error: allow null for testing
      testNarrative.setDivElement(null);

      // setting to null should result in NO changes

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

    it('should NOT reset by modifying Narrative.status for EnumCodeType and Narrative.div for PrimitiveType values with null', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      expect(testNarrative).toBeDefined();
      expect(testNarrative.isEmpty()).toBe(false);

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

      // @ts-expect-error: allow null for testing
      testNarrative.setStatueEnumType(null);
      // @ts-expect-error: allow null for testing
      testNarrative.setDivElement(null);

      // setting to null should result in NO changes

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

    it('should throw PrimitiveTypeError when reset with invalid primitive Narrative.div value', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      const t = () => {
        testNarrative.setDiv(INVALID_XHTML);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Narrative.div`);
    });

    it('should throw PrimitiveTypeError when reset with invalid PrimitiveType Narrative.div value', () => {
      const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
      const t = () => {
        testNarrative.setDivElement(new XhtmlType(INVALID_XHTML));
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for XhtmlType`);
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
      expect(testNarrative.toJSON()).toBeUndefined();

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
  });

  describe('Serialization/Deserialization', () => {
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
