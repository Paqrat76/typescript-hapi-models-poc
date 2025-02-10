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
import { Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { LinkTypeEnum } from '@src/fhir-models/code-systems/LinkTypeEnum';
import { PatientLinkComponent } from '@src/fhir-models/Patient';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  MockCodeEnum,
  VALID_EXTENSION,
  VALID_ID,
  VALID_MODIFIER_EXTENSION,
} from '../test-utils';

describe('PatientLinkComponent', () => {
  const VALID_REFERENCE_1 = 'Patient/13579';
  const VALID_REFERENCE_TYPE_1 = new Reference();
  VALID_REFERENCE_TYPE_1.setReference(VALID_REFERENCE_1);

  const VALID_REFERENCE_2 = 'RelatedPerson/24680';
  const VALID_REFERENCE_TYPE_2 = new Reference();
  VALID_REFERENCE_TYPE_2.setReference(VALID_REFERENCE_2);

  const INVALID_REFERENCE = 'Task/123';
  const INVALID_REFERENCE_TYPE = new Reference();
  INVALID_REFERENCE_TYPE.setReference(INVALID_REFERENCE);

  const VALID_CODE_REPLACES = `replaces`;
  const VALID_CODE_REFER = `refer`;
  const VALID_CODE_SEEALSO = `seealso`;
  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const UNSUPPORTED_ENUM_CODE_TYPE = new CodeType(UNSUPPORTED_ENUM_CODE);

  let linkTypeEnum: LinkTypeEnum;
  let inValidTypeEnum: MockCodeEnum;
  beforeAll(() => {
    linkTypeEnum = new LinkTypeEnum();
    inValidTypeEnum = new MockCodeEnum();
  });

  describe('Base Tests', () => {
    let enumCodeReplaces: EnumCodeType;
    let enumCodeRefer: EnumCodeType;
    let enumCodeSeeAlso: EnumCodeType;
    beforeAll(() => {
      enumCodeReplaces = new EnumCodeType(VALID_CODE_REPLACES, linkTypeEnum);
      enumCodeRefer = new EnumCodeType(VALID_CODE_REFER, linkTypeEnum);
      enumCodeSeeAlso = new EnumCodeType(VALID_CODE_SEEALSO, linkTypeEnum);
    });

    it('should be properly instantiated as empty', () => {
      const testPatientLinkComponent = new PatientLinkComponent(null, null);

      expect(testPatientLinkComponent).toBeDefined();
      expect(testPatientLinkComponent).toBeInstanceOf(PatientLinkComponent);
      expect(testPatientLinkComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientLinkComponent).toBeInstanceOf(Element);
      expect(testPatientLinkComponent).toBeInstanceOf(Base);
      expect(testPatientLinkComponent.constructor.name).toStrictEqual('PatientLinkComponent');
      expect(testPatientLinkComponent.fhirType()).toStrictEqual('Patient.link');
      expect(testPatientLinkComponent.isEmpty()).toBe(true);
      const t = () => {
        testPatientLinkComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Patient.link.other, Patient.link.type`);

      // inherited properties from BackboneElement
      expect(testPatientLinkComponent.hasId()).toBe(false);
      expect(testPatientLinkComponent.getId()).toBeUndefined();
      expect(testPatientLinkComponent.hasExtension()).toBe(false);
      expect(testPatientLinkComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientLinkComponent.hasModifierExtension()).toBe(false);
      expect(testPatientLinkComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientLinkComponent properties
      expect(testPatientLinkComponent.hasOther()).toBe(false);
      expect(testPatientLinkComponent.getOther()).toBeNull();
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(false);
      expect(testPatientLinkComponent.getTypeEnumType()).toBeNull();
      expect(testPatientLinkComponent.hasTypeElement()).toBe(false);
      expect(testPatientLinkComponent.getTypeElement()).toBeNull();
      expect(testPatientLinkComponent.hasType()).toBe(false);
      expect(testPatientLinkComponent.getType()).toBeNull();
    });

    it('should properly copy() when initialized with null', () => {
      const patientLinkComponent = new PatientLinkComponent(null, null);

      const testPatientLinkComponent = patientLinkComponent.copy();
      expect(testPatientLinkComponent).toBeDefined();
      expect(testPatientLinkComponent).toBeInstanceOf(PatientLinkComponent);
      expect(testPatientLinkComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientLinkComponent).toBeInstanceOf(Element);
      expect(testPatientLinkComponent).toBeInstanceOf(Base);
      expect(testPatientLinkComponent.constructor.name).toStrictEqual('PatientLinkComponent');
      expect(testPatientLinkComponent.fhirType()).toStrictEqual('Patient.link');
      expect(testPatientLinkComponent.isEmpty()).toBe(true);
      const t = () => {
        testPatientLinkComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Patient.link.other, Patient.link.type`);

      // inherited properties from BackboneElement
      expect(testPatientLinkComponent.hasId()).toBe(false);
      expect(testPatientLinkComponent.getId()).toBeUndefined();
      expect(testPatientLinkComponent.hasExtension()).toBe(false);
      expect(testPatientLinkComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientLinkComponent.hasModifierExtension()).toBe(false);
      expect(testPatientLinkComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientLinkComponent properties
      expect(testPatientLinkComponent.hasOther()).toBe(false);
      expect(testPatientLinkComponent.getOther()).toBeNull();
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(false);
      expect(testPatientLinkComponent.getTypeEnumType()).toBeNull();
      expect(testPatientLinkComponent.hasTypeElement()).toBe(false);
      expect(testPatientLinkComponent.getTypeElement()).toBeNull();
      expect(testPatientLinkComponent.hasType()).toBe(false);
      expect(testPatientLinkComponent.getType()).toBeNull();
    });

    it('should properly copy()', () => {
      const enumCodeReplaces = new EnumCodeType(VALID_CODE_REPLACES, linkTypeEnum);
      const patientLinkComponent = new PatientLinkComponent(VALID_REFERENCE_TYPE_1, enumCodeReplaces);

      const testPatientLinkComponent = patientLinkComponent.copy();
      expect(testPatientLinkComponent).toBeDefined();
      expect(testPatientLinkComponent).toBeInstanceOf(PatientLinkComponent);
      expect(testPatientLinkComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientLinkComponent).toBeInstanceOf(Element);
      expect(testPatientLinkComponent).toBeInstanceOf(Base);
      expect(testPatientLinkComponent.constructor.name).toStrictEqual('PatientLinkComponent');
      expect(testPatientLinkComponent.fhirType()).toStrictEqual('Patient.link');
      expect(testPatientLinkComponent.isEmpty()).toBe(false);
      expect(testPatientLinkComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPatientLinkComponent.hasId()).toBe(false);
      expect(testPatientLinkComponent.getId()).toBeUndefined();
      expect(testPatientLinkComponent.hasExtension()).toBe(false);
      expect(testPatientLinkComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientLinkComponent.hasModifierExtension()).toBe(false);
      expect(testPatientLinkComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientLinkComponent properties
      expect(testPatientLinkComponent.hasOther()).toBe(true);
      expect(testPatientLinkComponent.getOther()).toEqual(VALID_REFERENCE_TYPE_1);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeReplaces);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeReplaces as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_REPLACES);
    });

    it('should properly handle type enum', () => {
      let testPatientLinkComponent = new PatientLinkComponent(null, enumCodeReplaces);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeReplaces);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeReplaces as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_REPLACES);

      testPatientLinkComponent = new PatientLinkComponent(null, new CodeType(VALID_CODE_REFER));
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeRefer);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeRefer as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_REFER);

      testPatientLinkComponent = new PatientLinkComponent(null, VALID_CODE_SEEALSO);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeSeeAlso);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeSeeAlso as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_SEEALSO);

      testPatientLinkComponent = new PatientLinkComponent(null, null);

      testPatientLinkComponent.setTypeEnumType(enumCodeReplaces);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeReplaces);

      testPatientLinkComponent.setTypeElement(new CodeType(VALID_CODE_REFER));
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeRefer as CodeType);

      testPatientLinkComponent.setType(VALID_CODE_SEEALSO);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_SEEALSO);

      testPatientLinkComponent = new PatientLinkComponent(null, null);

      let t = () => {
        testPatientLinkComponent.setTypeEnumType(new EnumCodeType(UNSUPPORTED_ENUM_CODE, linkTypeEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown LinkTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testPatientLinkComponent.setTypeElement(UNSUPPORTED_ENUM_CODE_TYPE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown LinkTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        testPatientLinkComponent.setType(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown LinkTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should be properly reset by modifying all properties', () => {
      const testPatientLinkComponent = new PatientLinkComponent(VALID_REFERENCE_TYPE_1, VALID_CODE_REPLACES);
      expect(testPatientLinkComponent).toBeDefined();
      expect(testPatientLinkComponent.isEmpty()).toBe(false);

      expect(testPatientLinkComponent.hasOther()).toBe(true);
      expect(testPatientLinkComponent.getOther()).toEqual(VALID_REFERENCE_TYPE_1);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeReplaces);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeReplaces as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_REPLACES);

      // Reset

      testPatientLinkComponent.setOther(VALID_REFERENCE_TYPE_2);
      testPatientLinkComponent.setType(VALID_CODE_REFER);

      expect(testPatientLinkComponent.hasOther()).toBe(true);
      expect(testPatientLinkComponent.getOther()).toEqual(VALID_REFERENCE_TYPE_2);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeRefer);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeRefer as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_REFER);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      id: 'id12345',
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
      other: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
        reference: 'Patient/13579',
      },
      type: 'replaces',
    };
    const INVALID_JSON = {
      id: 'id12345',
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

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testPatientLinkComponent = new PatientLinkComponent(null, null);

      const t = () => {
        testPatientLinkComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Patient.link.other, Patient.link.type`);
    });

    it('should properly create serialized content', () => {
      const reference: Reference = VALID_REFERENCE_TYPE_1.copy();
      reference.setId(DATATYPE_ID);
      reference.addExtension(DATATYPE_EXTENSION);

      const testPatientLinkComponent = new PatientLinkComponent(reference, VALID_CODE_REPLACES);
      testPatientLinkComponent.setId(VALID_ID);
      testPatientLinkComponent.setExtension([VALID_EXTENSION]);
      testPatientLinkComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      expect(testPatientLinkComponent).toBeDefined();
      expect(testPatientLinkComponent).toBeInstanceOf(PatientLinkComponent);
      expect(testPatientLinkComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientLinkComponent).toBeInstanceOf(Element);
      expect(testPatientLinkComponent).toBeInstanceOf(Base);
      expect(testPatientLinkComponent.constructor.name).toStrictEqual('PatientLinkComponent');
      expect(testPatientLinkComponent.fhirType()).toStrictEqual('Patient.link');
      expect(testPatientLinkComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testPatientLinkComponent.hasId()).toBe(true);
      expect(testPatientLinkComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPatientLinkComponent.hasExtension()).toBe(true);
      expect(testPatientLinkComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatientLinkComponent.hasModifierExtension()).toBe(true);
      expect(testPatientLinkComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PatientLinkComponent properties
      const enumCodeReplaces = new EnumCodeType(VALID_CODE_REPLACES, linkTypeEnum);
      expect(testPatientLinkComponent.hasOther()).toBe(true);
      expect(testPatientLinkComponent.getOther()).toEqual(reference);
      expect(testPatientLinkComponent.hasTypeEnumType()).toBe(true);
      expect(testPatientLinkComponent.getTypeEnumType()).toEqual(enumCodeReplaces);
      expect(testPatientLinkComponent.hasTypeElement()).toBe(true);
      expect(testPatientLinkComponent.getTypeElement()).toEqual(enumCodeReplaces as CodeType);
      expect(testPatientLinkComponent.hasType()).toBe(true);
      expect(testPatientLinkComponent.getType()).toStrictEqual(VALID_CODE_REPLACES);

      expect(testPatientLinkComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPatientLinkComponent: PatientLinkComponent | undefined;
      testPatientLinkComponent = PatientLinkComponent.parse({});
      expect(testPatientLinkComponent).toBeUndefined();

      testPatientLinkComponent = PatientLinkComponent.parse(null);
      expect(testPatientLinkComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPatientLinkComponent = PatientLinkComponent.parse(undefined);
      expect(testPatientLinkComponent).toBeUndefined();
    });

    it('should throw FhirError from parse with missing required properties', () => {
      const t = () => {
        PatientLinkComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Patient.link.other, Patient.link.type`,
      );
    });

    it('should return GroupMemberComponent for valid json', () => {
      const testPatientLinkComponent: PatientLinkComponent | undefined = PatientLinkComponent.parse(VALID_JSON);

      expect(testPatientLinkComponent).toBeDefined();
      expect(testPatientLinkComponent).toBeInstanceOf(PatientLinkComponent);
      expect(testPatientLinkComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientLinkComponent).toBeInstanceOf(Element);
      expect(testPatientLinkComponent).toBeInstanceOf(Base);
      expect(testPatientLinkComponent?.constructor.name).toStrictEqual('PatientLinkComponent');
      expect(testPatientLinkComponent?.fhirType()).toStrictEqual('Patient.link');
      expect(testPatientLinkComponent?.isEmpty()).toBe(false);

      expect(testPatientLinkComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    it('should throw errors for invalid arguments', () => {
      const testPatientLinkComponent = new PatientLinkComponent(null, null);

      let t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setTypeEnumType(inValidTypeEnum);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.link.type; Provided type is not an instance of LinkTypeEnum.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setTypeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.link.type; Provided value is not an instance of CodeType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setType(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Patient.link.type (${String(INVALID_STRING_TYPE_VALUE)})`);

      t = () => {
        testPatientLinkComponent.setOther(INVALID_REFERENCE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOther (Patient.link.other) expects argument (Task/123) to be a valid 'Reference' type`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setOther(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOther (Patient.link.other) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });

    it('should throw AssertionError for undefined/null arguments', () => {
      const testPatientLinkComponent = new PatientLinkComponent(null, null);

      let t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setTypeEnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setTypeElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setOther(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.other is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setTypeEnumType(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setTypeElement(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setType(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientLinkComponent.setOther(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.link.other is required`);
    });
  });
});
