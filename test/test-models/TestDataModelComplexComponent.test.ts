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

import { AssertionError } from 'node:assert';
import {
  TestDataModelComplexComponent,
  TestDataModelEnumCodeComponent,
  TestDataModelReferenceComponent,
} from '@src/test-models/TestDataModel';
import { Base } from '@src/fhir-core/base-models/Base';
import { BackboneElement, DataType, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { ConsentStateEnum } from '@src/test-models/code-systems/ConsentStateEnum';
import { TaskStatusEnum } from '@src/test-models/code-systems/TaskStatusEnum';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { TestData } from '../test-data';
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
  VALID_NARRATIVE,
} from '../test-utils';

describe('TestDataModelComplexComponent', () => {
  let consentStateEnum: ConsentStateEnum;
  let taskStatusEnum: TaskStatusEnum;
  let testDataModelEnumCodeComponent: TestDataModelEnumCodeComponent;
  let testDataModelEnumCodeComponent_2: TestDataModelEnumCodeComponent;
  let testTestDataModelReferenceComponent: TestDataModelReferenceComponent;
  let testTestDataModelReferenceComponent_2: TestDataModelReferenceComponent;
  beforeAll(() => {
    consentStateEnum = new ConsentStateEnum();
    taskStatusEnum = new TaskStatusEnum();

    let enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
    let enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);
    testDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);
    testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(
      TestData.VALID_PERSON_REFERENCE,
      [TestData.VALID_CONDITION_REFERENCE],
      [testDataModelEnumCodeComponent],
    );

    enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_ACCEPTED, taskStatusEnum);
    enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_ACTIVE, consentStateEnum);
    testDataModelEnumCodeComponent_2 = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);
    testTestDataModelReferenceComponent_2 = new TestDataModelReferenceComponent(
      TestData.VALID_PERSON_REFERENCE_2,
      [TestData.VALID_CONDITION_REFERENCE_2],
      [testDataModelEnumCodeComponent_2],
    );
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent).toBeInstanceOf(TestDataModelComplexComponent);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Element);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Base);
      expect(testTestDataModelComplexComponent.constructor.name).toStrictEqual('TestDataModelComplexComponent');
      expect(testTestDataModelComplexComponent.fhirType()).toStrictEqual('TestDataModel.backboneComplex01');
      expect(testTestDataModelComplexComponent.isEmpty()).toBe(true);
      const t = () => {
        testTestDataModelComplexComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        'The following required properties do not exist: TestDataModel.backboneComplex01.complex11, TestDataModel.backboneComplex01.complex1x, TestDataModel.backboneComplex01.open11[x], TestDataModel.backboneComplex01.backboneReference11',
      );

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(false);
      expect(testTestDataModelComplexComponent.getId()).toBeUndefined();
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(false);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(new HumanName());
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([] as Address[]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex11()).toBeNull();
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([] as Attachment[]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(false);
      expect(testTestDataModelComplexComponent.getOpen11()).toBeNull();
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(false);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toBeNull();
    });

    it('should be properly instantiated with required elements', () => {
      const testTestDataModelComplexComponent = new TestDataModelComplexComponent(
        TestData.VALID_PERIOD,
        [TestData.VALID_ATTACHMENT],
        TestData.VALID_DECIMAL_TYPE,
        testTestDataModelReferenceComponent,
      );

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent).toBeInstanceOf(TestDataModelComplexComponent);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Element);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Base);
      expect(testTestDataModelComplexComponent.constructor.name).toStrictEqual('TestDataModelComplexComponent');
      expect(testTestDataModelComplexComponent.fhirType()).toStrictEqual('TestDataModel.backboneComplex01');
      expect(testTestDataModelComplexComponent.isEmpty()).toBe(false);
      expect(testTestDataModelComplexComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(false);
      expect(testTestDataModelComplexComponent.getId()).toBeUndefined();
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(false);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(new HumanName());
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([] as Address[]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex11()).toEqual(TestData.VALID_PERIOD);
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([TestData.VALID_ATTACHMENT]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(true);
      expect(testTestDataModelComplexComponent.getOpen11()).toEqual(TestData.VALID_DECIMAL_TYPE);
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(true);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toEqual(testTestDataModelReferenceComponent);
    });

    it('should properly copy()', () => {
      const testDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);

      testDataModelComplexComponent.setId(VALID_ID);
      testDataModelComplexComponent.setExtension([VALID_EXTENSION]);
      testDataModelComplexComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testDataModelComplexComponent.setComplex01(TestData.VALID_HUMAN_NAME);
      testDataModelComplexComponent.setComplex0x([TestData.VALID_ADDRESS]);
      testDataModelComplexComponent.setComplex11(TestData.VALID_PERIOD);
      testDataModelComplexComponent.setComplex1x([TestData.VALID_ATTACHMENT]);
      testDataModelComplexComponent.setOpen11(TestData.VALID_DECIMAL_TYPE);
      testDataModelComplexComponent.setBackboneReference11(testTestDataModelReferenceComponent);

      let testTestDataModelComplexComponent: TestDataModelComplexComponent = testDataModelComplexComponent.copy();

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent).toBeInstanceOf(TestDataModelComplexComponent);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Element);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Base);
      expect(testTestDataModelComplexComponent.constructor.name).toStrictEqual('TestDataModelComplexComponent');
      expect(testTestDataModelComplexComponent.fhirType()).toStrictEqual('TestDataModel.backboneComplex01');
      expect(testTestDataModelComplexComponent.isEmpty()).toBe(false);
      expect(testTestDataModelComplexComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(true);
      expect(testTestDataModelComplexComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(TestData.VALID_HUMAN_NAME);
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([TestData.VALID_ADDRESS]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex11()).toEqual(TestData.VALID_PERIOD);
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([TestData.VALID_ATTACHMENT]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(true);
      expect(testTestDataModelComplexComponent.getOpen11()).toEqual(TestData.VALID_DECIMAL_TYPE);
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(true);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toEqual(testTestDataModelReferenceComponent);

      // Reset to empty

      testDataModelComplexComponent.setId(UNDEFINED_VALUE);
      testDataModelComplexComponent.setExtension(UNDEFINED_VALUE);
      testDataModelComplexComponent.setModifierExtension(UNDEFINED_VALUE);

      testDataModelComplexComponent.setComplex01(UNDEFINED_VALUE);
      testDataModelComplexComponent.setComplex0x(UNDEFINED_VALUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testDataModelComplexComponent.setComplex11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.complex11 is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelComplexComponent.setComplex1x(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.complex1x is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelComplexComponent.setOpen11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.open11[x] is required');
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelComplexComponent.setBackboneReference11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow('TestDataModel.backboneComplex01.backboneReference11 is required');

      testTestDataModelComplexComponent = testDataModelComplexComponent.copy();

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(false);
      expect(testTestDataModelComplexComponent.getId()).toBeUndefined();
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(false);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(new HumanName());
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(false);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([] as Address[]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex11()).toEqual(TestData.VALID_PERIOD);
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([TestData.VALID_ATTACHMENT]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(true);
      expect(testTestDataModelComplexComponent.getOpen11()).toEqual(TestData.VALID_DECIMAL_TYPE);
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(true);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toEqual(testTestDataModelReferenceComponent);
    });

    it('should be properly reset by modifying/adding all properties', () => {
      const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);

      testTestDataModelComplexComponent.setId(VALID_ID);
      testTestDataModelComplexComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelComplexComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelComplexComponent.setComplex01(TestData.VALID_HUMAN_NAME);
      testTestDataModelComplexComponent.setComplex0x([TestData.VALID_ADDRESS]);
      testTestDataModelComplexComponent.setComplex11(TestData.VALID_PERIOD);
      testTestDataModelComplexComponent.setComplex1x([TestData.VALID_ATTACHMENT]);
      testTestDataModelComplexComponent.setOpen11(TestData.VALID_DECIMAL_TYPE);
      testTestDataModelComplexComponent.setBackboneReference11(testTestDataModelReferenceComponent);

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent).toBeInstanceOf(TestDataModelComplexComponent);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Element);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Base);
      expect(testTestDataModelComplexComponent.constructor.name).toStrictEqual('TestDataModelComplexComponent');
      expect(testTestDataModelComplexComponent.fhirType()).toStrictEqual('TestDataModel.backboneComplex01');
      expect(testTestDataModelComplexComponent.isEmpty()).toBe(false);
      expect(testTestDataModelComplexComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(true);
      expect(testTestDataModelComplexComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(TestData.VALID_HUMAN_NAME);
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([TestData.VALID_ADDRESS]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex11()).toEqual(TestData.VALID_PERIOD);
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([TestData.VALID_ATTACHMENT]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(true);
      expect(testTestDataModelComplexComponent.getOpen11()).toEqual(TestData.VALID_DECIMAL_TYPE);
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(true);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toEqual(testTestDataModelReferenceComponent);

      // Reset

      testTestDataModelComplexComponent.setId(VALID_ID_2);
      testTestDataModelComplexComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelComplexComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testTestDataModelComplexComponent.setComplex01(TestData.VALID_HUMAN_NAME_2);
      testTestDataModelComplexComponent.addComplex0x(TestData.VALID_ADDRESS_2);
      testTestDataModelComplexComponent.setComplex11(TestData.VALID_PERIOD_2);
      testTestDataModelComplexComponent.addComplex1x(TestData.VALID_ATTACHMENT_2);
      testTestDataModelComplexComponent.setOpen11(TestData.VALID_DECIMAL_TYPE_2);
      testTestDataModelComplexComponent.setBackboneReference11(testTestDataModelReferenceComponent_2);

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent.isEmpty()).toBe(false);
      expect(testTestDataModelComplexComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(true);
      expect(testTestDataModelComplexComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(TestData.VALID_HUMAN_NAME_2);
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([
        TestData.VALID_ADDRESS,
        TestData.VALID_ADDRESS_2,
      ]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex11()).toEqual(TestData.VALID_PERIOD_2);
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([
        TestData.VALID_ATTACHMENT,
        TestData.VALID_ATTACHMENT_2,
      ]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(true);
      expect(testTestDataModelComplexComponent.getOpen11()).toEqual(TestData.VALID_DECIMAL_TYPE_2);
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(true);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toEqual(testTestDataModelReferenceComponent_2);
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
      complex01: {
        family: 'Surname',
        given: ['First', 'Middle'],
        prefix: ['Mr.'],
        suffix: ['Sr.'],
      },
      complex0x: [
        {
          use: 'home',
          type: 'postal',
          line: ['1234 Main ST', 'APT 15A'],
          city: 'Nashua',
          state: 'NH',
          postalCode: '03064',
          country: 'US',
        },
      ],
      complex11: {
        start: '2024-03-15T00:00:00.000Z',
        end: '2024-07-03T01:00:00.000Z',
      },
      complex1x: [
        {
          contentType: 'testCodeType',
          url: 'testUrlType',
          size: 697276,
          hash: '0f60168295bc9d6b0535feaf0975a63532959834',
          title: 'This is a valid string.',
        },
      ],
      open11Decimal: 128.1978,
      _open11Decimal: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
      },
      backboneReference11: {
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
      },
    };
    const INVALID_JSON = {
      bogusField: 'bogus value',
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
      const t = () => {
        testTestDataModelComplexComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: TestDataModel.backboneComplex01.complex11, TestDataModel.backboneComplex01.complex1x, TestDataModel.backboneComplex01.open11[x], TestDataModel.backboneComplex01.backboneReference11`,
      );
    });

    it('should throw FhirError from parse() when JSON is missing required properties', () => {
      const t = () => {
        TestDataModelComplexComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: TestDataModel.backboneComplex01.complex11, TestDataModel.backboneComplex01.complex1x, TestDataModel.backboneComplex01.open11[x], TestDataModel.backboneComplex01.backboneReference11`,
      );
    });

    it('should return undefined when deserialize with no json', () => {
      let testTestDataModelComplexComponent: TestDataModelComplexComponent | undefined = undefined;
      testTestDataModelComplexComponent = TestDataModelComplexComponent.parse({});
      expect(testTestDataModelComplexComponent).toBeUndefined();

      testTestDataModelComplexComponent = TestDataModelComplexComponent.parse(null);
      expect(testTestDataModelComplexComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testTestDataModelComplexComponent = TestDataModelComplexComponent.parse(undefined);
      expect(testTestDataModelComplexComponent).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const open11: DataType = TestData.VALID_DECIMAL_TYPE.copy();
      open11.setId(DATATYPE_ID);
      open11.setExtension([DATATYPE_EXTENSION]);

      const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);

      testTestDataModelComplexComponent.setId(VALID_ID);
      testTestDataModelComplexComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelComplexComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelComplexComponent.setComplex01(TestData.VALID_HUMAN_NAME);
      testTestDataModelComplexComponent.setComplex0x([TestData.VALID_ADDRESS]);
      testTestDataModelComplexComponent.setComplex11(TestData.VALID_PERIOD);
      testTestDataModelComplexComponent.setComplex1x([TestData.VALID_ATTACHMENT]);
      testTestDataModelComplexComponent.setOpen11(open11);
      testTestDataModelComplexComponent.setBackboneReference11(testTestDataModelReferenceComponent);

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent).toBeInstanceOf(TestDataModelComplexComponent);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Element);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Base);
      expect(testTestDataModelComplexComponent.constructor.name).toStrictEqual('TestDataModelComplexComponent');
      expect(testTestDataModelComplexComponent.fhirType()).toStrictEqual('TestDataModel.backboneComplex01');
      expect(testTestDataModelComplexComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testTestDataModelComplexComponent.hasId()).toBe(true);
      expect(testTestDataModelComplexComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelComplexComponent.hasExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelComplexComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelComplexComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelComplexComponent properties
      expect(testTestDataModelComplexComponent.hasComplex01()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex01()).toEqual(TestData.VALID_HUMAN_NAME);
      expect(testTestDataModelComplexComponent.hasComplex0x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex0x()).toEqual([TestData.VALID_ADDRESS]);
      expect(testTestDataModelComplexComponent.hasComplex11()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex11()).toEqual(TestData.VALID_PERIOD);
      expect(testTestDataModelComplexComponent.hasComplex1x()).toBe(true);
      expect(testTestDataModelComplexComponent.getComplex1x()).toEqual([TestData.VALID_ATTACHMENT]);
      expect(testTestDataModelComplexComponent.hasOpen11()).toBe(true);
      expect(testTestDataModelComplexComponent.getOpen11()).toEqual(open11);
      expect(testTestDataModelComplexComponent.hasBackboneReference11()).toBe(true);
      expect(testTestDataModelComplexComponent.getBackboneReference11()).toEqual(testTestDataModelReferenceComponent);

      expect(testTestDataModelComplexComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return TestDataModelComplexComponent for valid json', () => {
      const testTestDataModelComplexComponent: TestDataModelComplexComponent | undefined =
        TestDataModelComplexComponent.parse(VALID_JSON);

      expect(testTestDataModelComplexComponent).toBeDefined();
      expect(testTestDataModelComplexComponent).toBeInstanceOf(TestDataModelComplexComponent);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Element);
      expect(testTestDataModelComplexComponent).toBeInstanceOf(Base);
      expect(testTestDataModelComplexComponent?.constructor.name).toStrictEqual('TestDataModelComplexComponent');
      expect(testTestDataModelComplexComponent?.fhirType()).toStrictEqual('TestDataModel.backboneComplex01');
      expect(testTestDataModelComplexComponent?.isEmpty()).toBe(false);
      expect(testTestDataModelComplexComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    describe('constructor', () => {
      it('should throw appropriate errors when instantiated with an invalid required data elements', () => {
        let t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelComplexComponent(INVALID_NON_STRING_TYPE, null, null, null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex11; Provided element is not an instance of Period.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelComplexComponent(null, [INVALID_NON_STRING_TYPE], null, null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex1x; Provided value array has an element that is not an instance of Attachment.`,
        );

        t = () => {
          new TestDataModelComplexComponent(null, null, VALID_NARRATIVE, null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `OpenDataTypes decorator on setOpen11 (TestDataModel.backboneComplex01.open11[x]) expects the 'value' argument type (Narrative) to be a supported DataType`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelComplexComponent(null, null, null, INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11; Provided element is not an instance of TestDataModelReferenceComponent.`,
        );
      });
    });

    describe('complex01', () => {
      it('should throw appropriate errors for an invalid HumanName', () => {
        const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
        const t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex01(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex01; Provided element is not an instance of HumanName.`,
        );
      });
    });

    describe('complex0x', () => {
      it('should throw appropriate errors for an invalid Address', () => {
        const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex0x([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex0x; Provided value array has an element that is not an instance of Address.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.addComplex0x(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex0x; Provided element is not an instance of Address.`,
        );
      });
    });

    describe('complex11', () => {
      it('should throw appropriate errors for an invalid Period', () => {
        const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex11(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex11; Provided element is not an instance of Period.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.complex11 is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.complex11 is required`);
      });
    });

    describe('complex1x', () => {
      it('should throw appropriate errors for an invalid Attachment', () => {
        const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex1x([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex1x; Provided value array has an element that is not an instance of Attachment.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.addComplex1x(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.complex1x; Provided element is not an instance of Attachment.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex1x(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.complex1x is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setComplex1x(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.complex1x is required`);
      });
    });

    describe('open11', () => {
      it('should throw appropriate errors for an invalid open DataType', () => {
        const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
        let t = () => {
          testTestDataModelComplexComponent.setOpen11(VALID_NARRATIVE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `OpenDataTypes decorator on setOpen11 (TestDataModel.backboneComplex01.open11[x]) expects the 'value' argument type (Narrative) to be a supported DataType`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setOpen11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.open11[x] is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setOpen11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.open11[x] is required`);
      });
    });

    describe('backboneReference11', () => {
      it('should throw appropriate errors for an invalid BackboneReference', () => {
        const testTestDataModelComplexComponent = new TestDataModelComplexComponent(null, null, null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setBackboneReference11(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11; Provided element is not an instance of TestDataModelReferenceComponent.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setBackboneReference11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11 is required`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelComplexComponent.setBackboneReference11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`TestDataModel.backboneComplex01.backboneReference11 is required`);
      });
    });
  });
});
