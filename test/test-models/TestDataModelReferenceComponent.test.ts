/*
 * Copyright (c) 2025. Joe Paquette
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
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { ConsentStateEnum } from '@src/test-models/code-systems/ConsentStateEnum';
import { TaskStatusEnum } from '@src/test-models/code-systems/TaskStatusEnum';
import { TestDataModelEnumCodeComponent, TestDataModelReferenceComponent } from '@src/test-models/TestDataModel';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('TestDataModelReferenceComponent', () => {
  const VALID_PERSON_REFERENCE_VALUE = 'Person/PER-13579';
  const VALID_PERSON_REFERENCE = new Reference();
  VALID_PERSON_REFERENCE.setReference(VALID_PERSON_REFERENCE_VALUE);
  const VALID_PERSON_REFERENCE_VALUE_2 = 'Person/PER-97531';
  const VALID_PERSON_REFERENCE_2 = new Reference();
  VALID_PERSON_REFERENCE_2.setReference(VALID_PERSON_REFERENCE_VALUE_2);

  const VALID_CONDITION_REFERENCE_VALUE = 'Condition/CON-24680';
  const VALID_CONDITION_REFERENCE = new Reference();
  VALID_CONDITION_REFERENCE.setReference(VALID_CONDITION_REFERENCE_VALUE);
  const VALID_CONDITION_REFERENCE_VALUE_2 = 'Condition/CON-8642';
  const VALID_CONDITION_REFERENCE_2 = new Reference();
  VALID_CONDITION_REFERENCE_2.setReference(VALID_CONDITION_REFERENCE_VALUE_2);

  const VALID_ANY_REFERENCE_VALUE = 'Encounter/ENC-97531';
  const VALID_ANY_REFERENCE_TYPE = 'Encounter';
  const VALID_ANY_REFERENCE = new Reference();
  VALID_ANY_REFERENCE.setReference(VALID_ANY_REFERENCE_VALUE);
  VALID_ANY_REFERENCE.setType(VALID_ANY_REFERENCE_TYPE);
  const VALID_ANY_REFERENCE_VALUE_2 = 'Condition/CON-98765';
  const VALID_ANY_REFERENCE_TYPE_2 = 'Condition';
  const VALID_ANY_REFERENCE_2 = new Reference();
  VALID_ANY_REFERENCE_2.setReference(VALID_ANY_REFERENCE_VALUE_2);
  VALID_ANY_REFERENCE_2.setType(VALID_ANY_REFERENCE_TYPE_2);

  const VALID_ORGANIZATION_REFERENCE_VALUE = 'Organization/ORG-86420';
  const VALID_ORGANIZATION_REFERENCE = new Reference();
  VALID_ORGANIZATION_REFERENCE.setReference(VALID_ORGANIZATION_REFERENCE_VALUE);
  const VALID_ORGANIZATION_REFERENCE_VALUE_2 = 'Organization/ORG-7531';
  const VALID_ORGANIZATION_REFERENCE_2 = new Reference();
  VALID_ORGANIZATION_REFERENCE_2.setReference(VALID_ORGANIZATION_REFERENCE_VALUE_2);

  const VALID_TASKSTATUS_REQUESTED = `requested`;
  const VALID_TASKSTATUS_ACCEPTED = `accepted`;
  const VALID_CONSENT_DRAFT = `draft`;
  const VALID_CONSENT_ACTIVE = `active`;

  let consentStateEnum: ConsentStateEnum;
  let taskStatusEnum: TaskStatusEnum;
  let testDataModelEnumCodeComponent: TestDataModelEnumCodeComponent;
  let testDataModelEnumCodeComponent_2: TestDataModelEnumCodeComponent;
  beforeAll(() => {
    consentStateEnum = new ConsentStateEnum();
    taskStatusEnum = new TaskStatusEnum();

    let enumCode11 = new EnumCodeType(VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
    let enumCode1x = new EnumCodeType(VALID_CONSENT_DRAFT, consentStateEnum);
    testDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);

    enumCode11 = new EnumCodeType(VALID_TASKSTATUS_ACCEPTED, taskStatusEnum);
    enumCode1x = new EnumCodeType(VALID_CONSENT_ACTIVE, consentStateEnum);
    testDataModelEnumCodeComponent_2 = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(TestDataModelReferenceComponent);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Element);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Base);
      expect(testTestDataModelReferenceComponent.constructor.name).toStrictEqual('TestDataModelReferenceComponent');
      expect(testTestDataModelReferenceComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11',
      );
      expect(testTestDataModelReferenceComponent.isEmpty()).toBe(true);
      const t = () => {
        testTestDataModelReferenceComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        'The following required properties do not exist: TestDataModel.backboneComplex01.backboneReference11.reference11, TestDataModel.backboneComplex01.backboneReference11.reference1x, TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(false);
      expect(testTestDataModelReferenceComponent.getId()).toBeUndefined();
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(false);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(new Reference());
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([] as Reference[]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference11()).toBeNull();
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([] as Reference[]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(false);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual(
        [] as TestDataModelEnumCodeComponent[],
      );
    });

    it('should be properly instantiated with required elements', () => {
      const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(
        VALID_PERSON_REFERENCE,
        [VALID_CONDITION_REFERENCE],
        [testDataModelEnumCodeComponent],
      );

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(TestDataModelReferenceComponent);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Element);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Base);
      expect(testTestDataModelReferenceComponent.constructor.name).toStrictEqual('TestDataModelReferenceComponent');
      expect(testTestDataModelReferenceComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11',
      );
      expect(testTestDataModelReferenceComponent.isEmpty()).toBe(false);
      expect(testTestDataModelReferenceComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(false);
      expect(testTestDataModelReferenceComponent.getId()).toBeUndefined();
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(false);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(new Reference());
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([] as Reference[]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference11()).toEqual(VALID_PERSON_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([VALID_CONDITION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual([testDataModelEnumCodeComponent]);
    });

    it('should properly copy()', () => {
      const testDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);

      testDataModelReferenceComponent.setId(VALID_ID);
      testDataModelReferenceComponent.setExtension([VALID_EXTENSION]);
      testDataModelReferenceComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testDataModelReferenceComponent.setReference01(VALID_ANY_REFERENCE);
      testDataModelReferenceComponent.setReference0x([VALID_ORGANIZATION_REFERENCE]);
      testDataModelReferenceComponent.setReference11(VALID_PERSON_REFERENCE);
      testDataModelReferenceComponent.setReference1x([VALID_CONDITION_REFERENCE]);
      testDataModelReferenceComponent.setBackboneEnumCode1x([testDataModelEnumCodeComponent]);

      let testTestDataModelReferenceComponent: TestDataModelReferenceComponent = testDataModelReferenceComponent.copy();

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(TestDataModelReferenceComponent);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Element);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Base);
      expect(testTestDataModelReferenceComponent.constructor.name).toStrictEqual('TestDataModelReferenceComponent');
      expect(testTestDataModelReferenceComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11',
      );
      expect(testTestDataModelReferenceComponent.isEmpty()).toBe(false);
      expect(testTestDataModelReferenceComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(true);
      expect(testTestDataModelReferenceComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(VALID_ANY_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([VALID_ORGANIZATION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference11()).toEqual(VALID_PERSON_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([VALID_CONDITION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual([testDataModelEnumCodeComponent]);

      // Reset to empty

      testDataModelReferenceComponent.setId(UNDEFINED_VALUE);
      testDataModelReferenceComponent.setExtension(UNDEFINED_VALUE);
      testDataModelReferenceComponent.setModifierExtension(UNDEFINED_VALUE);

      testDataModelReferenceComponent.setReference01(UNDEFINED_VALUE);
      testDataModelReferenceComponent.setReference0x(UNDEFINED_VALUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testDataModelReferenceComponent.setReference11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.backboneReference11.reference11 is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelReferenceComponent.setReference1x(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.backboneReference11.reference1x is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelReferenceComponent.setBackboneEnumCode1x(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x is required');

      testTestDataModelReferenceComponent = testDataModelReferenceComponent.copy();

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(false);
      expect(testTestDataModelReferenceComponent.getId()).toBeUndefined();
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(false);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(new Reference());
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(false);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([] as Reference[]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference11()).toEqual(VALID_PERSON_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([VALID_CONDITION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual([testDataModelEnumCodeComponent]);
    });

    it('should be properly reset by modifying/adding all properties', () => {
      const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);

      testTestDataModelReferenceComponent.setId(VALID_ID);
      testTestDataModelReferenceComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelReferenceComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelReferenceComponent.setReference01(VALID_ANY_REFERENCE);
      testTestDataModelReferenceComponent.setReference0x([VALID_ORGANIZATION_REFERENCE]);
      testTestDataModelReferenceComponent.setReference11(VALID_PERSON_REFERENCE);
      testTestDataModelReferenceComponent.setReference1x([VALID_CONDITION_REFERENCE]);
      testTestDataModelReferenceComponent.setBackboneEnumCode1x([testDataModelEnumCodeComponent]);

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent.isEmpty()).toBe(false);
      expect(testTestDataModelReferenceComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(true);
      expect(testTestDataModelReferenceComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(VALID_ANY_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([VALID_ORGANIZATION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference11()).toEqual(VALID_PERSON_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([VALID_CONDITION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual([testDataModelEnumCodeComponent]);

      // Reset

      testTestDataModelReferenceComponent.setId(VALID_ID_2);
      testTestDataModelReferenceComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelReferenceComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testTestDataModelReferenceComponent.setReference01(VALID_ANY_REFERENCE_2);
      testTestDataModelReferenceComponent.addReference0x(VALID_ORGANIZATION_REFERENCE_2);
      testTestDataModelReferenceComponent.setReference11(VALID_PERSON_REFERENCE_2);
      testTestDataModelReferenceComponent.addReference1x(VALID_CONDITION_REFERENCE_2);
      testTestDataModelReferenceComponent.addBackboneEnumCode1x(testDataModelEnumCodeComponent_2);

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent.isEmpty()).toBe(false);
      expect(testTestDataModelReferenceComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(true);
      expect(testTestDataModelReferenceComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(VALID_ANY_REFERENCE_2);
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([
        VALID_ORGANIZATION_REFERENCE,
        VALID_ORGANIZATION_REFERENCE_2,
      ]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference11()).toEqual(VALID_PERSON_REFERENCE_2);
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([
        VALID_CONDITION_REFERENCE,
        VALID_CONDITION_REFERENCE_2,
      ]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual([
        testDataModelEnumCodeComponent,
        testDataModelEnumCodeComponent_2,
      ]);
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
      reference01: {
        reference: 'Encounter/ENC-97531',
        type: 'Encounter',
      },
      reference0x: [
        {
          id: 'DT-1357',
          extension: [
            {
              url: 'datatypeUrl',
              valueString: 'datatype extension string value',
            },
          ],
          reference: 'Organization/ORG-86420',
        },
      ],
      reference11: {
        reference: 'Person/PER-13579',
      },
      reference1x: [
        {
          reference: 'Condition/CON-24680',
        },
      ],
      backboneEnumCode1x: [
        {
          enumCode11: 'requested',
          enumCode1x: ['draft'],
        },
      ],
    };
    const INVALID_JSON = {
      bogusField: 'bogus value',
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);

      const t = () => {
        testTestDataModelReferenceComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: TestDataModel.backboneComplex01.backboneReference11.reference11, TestDataModel.backboneComplex01.backboneReference11.reference1x, TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x`,
      );
    });

    it('should throw FhirError from parse() when JSON is missing required properties', () => {
      const t = () => {
        TestDataModelReferenceComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: TestDataModel.backboneComplex01.backboneReference11.reference11, TestDataModel.backboneComplex01.backboneReference11.reference1x, TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x`,
      );
    });

    it('should return undefined when deserialize with no json', () => {
      let testTestDataModelReferenceComponent: TestDataModelReferenceComponent | undefined = undefined;
      testTestDataModelReferenceComponent = TestDataModelReferenceComponent.parse({});
      expect(testTestDataModelReferenceComponent).toBeUndefined();

      testTestDataModelReferenceComponent = TestDataModelReferenceComponent.parse(null);
      expect(testTestDataModelReferenceComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testTestDataModelReferenceComponent = TestDataModelReferenceComponent.parse(undefined);
      expect(testTestDataModelReferenceComponent).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const validOrganizationReference0x: Reference = VALID_ORGANIZATION_REFERENCE.copy();
      validOrganizationReference0x.setId(DATATYPE_ID);
      validOrganizationReference0x.setExtension([DATATYPE_EXTENSION]);

      const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);

      testTestDataModelReferenceComponent.setId(VALID_ID);
      testTestDataModelReferenceComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelReferenceComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelReferenceComponent.setReference01(VALID_ANY_REFERENCE);
      testTestDataModelReferenceComponent.setReference0x([validOrganizationReference0x]);
      testTestDataModelReferenceComponent.setReference11(VALID_PERSON_REFERENCE);
      testTestDataModelReferenceComponent.setReference1x([VALID_CONDITION_REFERENCE]);
      testTestDataModelReferenceComponent.setBackboneEnumCode1x([testDataModelEnumCodeComponent]);

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(TestDataModelReferenceComponent);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Element);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Base);
      expect(testTestDataModelReferenceComponent.constructor.name).toStrictEqual('TestDataModelReferenceComponent');
      expect(testTestDataModelReferenceComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11',
      );
      expect(testTestDataModelReferenceComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testTestDataModelReferenceComponent.hasId()).toBe(true);
      expect(testTestDataModelReferenceComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelReferenceComponent.hasExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelReferenceComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelReferenceComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelReferenceComponent properties
      expect(testTestDataModelReferenceComponent.hasReference01()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference01()).toEqual(VALID_ANY_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference0x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference0x()).toEqual([validOrganizationReference0x]);
      expect(testTestDataModelReferenceComponent.hasReference11()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference11()).toEqual(VALID_PERSON_REFERENCE);
      expect(testTestDataModelReferenceComponent.hasReference1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getReference1x()).toEqual([VALID_CONDITION_REFERENCE]);
      expect(testTestDataModelReferenceComponent.hasBackboneEnumCode1x()).toBe(true);
      expect(testTestDataModelReferenceComponent.getBackboneEnumCode1x()).toEqual([testDataModelEnumCodeComponent]);

      expect(testTestDataModelReferenceComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return TestDataModelReferenceComponent for valid json', () => {
      const testTestDataModelReferenceComponent: TestDataModelReferenceComponent | undefined =
        TestDataModelReferenceComponent.parse(VALID_JSON);

      expect(testTestDataModelReferenceComponent).toBeDefined();
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(TestDataModelReferenceComponent);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Element);
      expect(testTestDataModelReferenceComponent).toBeInstanceOf(Base);
      expect(testTestDataModelReferenceComponent?.constructor.name).toStrictEqual('TestDataModelReferenceComponent');
      expect(testTestDataModelReferenceComponent?.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11',
      );
      expect(testTestDataModelReferenceComponent?.isEmpty()).toBe(false);
      expect(testTestDataModelReferenceComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    describe('constructor', () => {
      it('should throw appropriate errors when instantiated with an invalid required data elements', () => {
        let t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelReferenceComponent(INVALID_NON_STRING_TYPE, null, null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on setReference11 (TestDataModel.backboneComplex01.backboneReference11.reference11) expects a single argument to be type of 'Reference | undefined | null'`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelReferenceComponent(null, [INVALID_NON_STRING_TYPE], null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on setReference1x (TestDataModel.backboneComplex01.backboneReference11.reference1x) expects argument[0] to be type of 'Reference'`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelReferenceComponent(null, null, [INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x; Provided value array has an element that is not an instance of TestDataModelEnumCodeComponent.`,
        );
      });
    });

    describe('reference01', () => {
      it('should throw appropriate errors for an invalid Reference', () => {
        const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);
        const t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference01(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on setReference01 (TestDataModel.backboneComplex01.backboneReference11.reference01) expects a single argument to be type of 'Reference | undefined | null'`,
        );
      });
    });

    describe('reference0x', () => {
      it('should throw appropriate errors for an invalid Reference', () => {
        const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference0x([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on setReference0x (TestDataModel.backboneComplex01.backboneReference11.reference0x) expects argument[0] to be type of 'Reference'`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.addReference0x(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on addReference0x (TestDataModel.backboneComplex01.backboneReference11.reference0x) expects a single argument to be type of 'Reference | undefined | null'`,
        );
      });
    });

    describe('reference11', () => {
      it('should throw appropriate errors for an invalid Reference', () => {
        const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference11(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on setReference11 (TestDataModel.backboneComplex01.backboneReference11.reference11) expects a single argument to be type of 'Reference | undefined | null'`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11.reference11 is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11.reference11 is required`);
      });
    });

    describe('reference1x', () => {
      it('should throw appropriate errors for an invalid Reference', () => {
        const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference1x([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on setReference1x (TestDataModel.backboneComplex01.backboneReference11.reference1x) expects argument[0] to be type of 'Reference'`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.addReference1x(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `ReferenceTargets decorator on addReference1x (TestDataModel.backboneComplex01.backboneReference11.reference1x) expects a single argument to be type of 'Reference | undefined | null'`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference1x(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11.reference1x is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setReference1x(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11.reference1x is required`);
      });
    });

    describe('backboneEnumCode1x', () => {
      it('should throw appropriate errors for an invalid BackboneEnumCode', () => {
        const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setBackboneEnumCode1x([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x; Provided value array has an element that is not an instance of TestDataModelEnumCodeComponent.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.addBackboneEnumCode1x(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x; Provided element is not an instance of TestDataModelEnumCodeComponent.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setBackboneEnumCode1x(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelReferenceComponent.setBackboneEnumCode1x(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x is required`);
      });
    });
  });
});
