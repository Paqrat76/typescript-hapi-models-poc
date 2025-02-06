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
import { TestDataModelEnumCodeComponent, TestDataModelPrimitiveComponent } from '@src/test-models/TestDataModel';
import { Base } from '@src/fhir-core/base-models/Base';
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { TaskCodeEnum } from '@src/test-models/code-systems/TaskCodeEnum';
import { ContributorTypeEnum } from '@src/test-models/code-systems/ContributorTypeEnum';
import { TaskStatusEnum } from '@src/test-models/code-systems/TaskStatusEnum';
import { ConsentStateEnum } from '@src/test-models/code-systems/ConsentStateEnum';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { TestData } from '../test-data';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_CODE_TYPE,
  INVALID_CODE_VALUE,
  INVALID_NON_STRING_TYPE,
  MockCodeEnum,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('TestDataModelEnumCodeComponent', () => {
  const VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT = new TestDataModelPrimitiveComponent(null, null, null);
  VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT.setPrimitive11(TestData.VALID_BOOLEAN_TRUE);
  VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT.setPrimitive1x([TestData.VALID_STRING]);
  VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT.setChoice11(TestData.VALID_URI_TYPE);

  const VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2 = new TestDataModelPrimitiveComponent(null, null, null);
  VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2.setPrimitive11(TestData.VALID_BOOLEAN_FALSE);
  VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2.setPrimitive1x([TestData.VALID_STRING_2]);
  VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2.setChoice11(TestData.VALID_URI_TYPE_2);

  let consentStateEnum: ConsentStateEnum;
  let contributorTypeEnum: ContributorTypeEnum;
  let taskCodeEnum: TaskCodeEnum;
  let taskStatusEnum: TaskStatusEnum;
  beforeAll(() => {
    consentStateEnum = new ConsentStateEnum();
    contributorTypeEnum = new ContributorTypeEnum();
    taskCodeEnum = new TaskCodeEnum();
    taskStatusEnum = new TaskStatusEnum();
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(true);
      const t = () => {
        testTestDataModelEnumCodeComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        'The following required properties do not exist: TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11, TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x',
      );

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getId()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toBeNull();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toBeNull();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toBeNull();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([] as fhirCode[]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should be properly instantiated with a EnumCodeType', () => {
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getId()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);

      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should be properly instantiated with a CodeType', () => {
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED_TYPE, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT_TYPE, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(
        TestData.VALID_TASKSTATUS_REQUESTED_TYPE,
        [TestData.VALID_CONSENT_DRAFT_TYPE],
      );

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getId()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);

      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should be properly instantiated with a fhirCode', () => {
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(
        TestData.VALID_TASKSTATUS_REQUESTED,
        [TestData.VALID_CONSENT_DRAFT],
      );

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getId()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);

      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should properly copy()', () => {
      const enumCode01 = new EnumCodeType(TestData.VALID_TASKCODE_APPROVE, taskCodeEnum);
      const enumCode0x = new EnumCodeType(TestData.VALID_CONTRIBUTOR_AUTHOR, contributorTypeEnum);
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);

      const testDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
      testDataModelEnumCodeComponent.setId(VALID_ID);
      testDataModelEnumCodeComponent.setExtension([VALID_EXTENSION]);
      testDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testDataModelEnumCodeComponent.setEnumCode01EnumType(enumCode01);
      testDataModelEnumCodeComponent.setEnumCode0xEnumType([enumCode0x]);
      testDataModelEnumCodeComponent.setEnumCode11EnumType(enumCode11);
      testDataModelEnumCodeComponent.setEnumCode1xEnumType([enumCode1x]);
      testDataModelEnumCodeComponent.setBackbonePrimitive0x([VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT]);

      let testTestDataModelEnumCodeComponent = testDataModelEnumCodeComponent.copy();

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_APPROVE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([enumCode0x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([TestData.VALID_CONTRIBUTOR_AUTHOR]);

      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);

      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
      ]);

      // Reset to empty

      testDataModelEnumCodeComponent.setId(UNDEFINED_VALUE);
      testDataModelEnumCodeComponent.setExtension(UNDEFINED_VALUE);
      testDataModelEnumCodeComponent.setModifierExtension(UNDEFINED_VALUE);

      testDataModelEnumCodeComponent.setEnumCode01EnumType(UNDEFINED_VALUE);
      testDataModelEnumCodeComponent.setEnumCode0xEnumType(UNDEFINED_VALUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testDataModelEnumCodeComponent.setEnumCode11EnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required',
      );
      t = () => {
        // @ts-expect-error: allow for testing
        testDataModelEnumCodeComponent.setEnumCode1xEnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required',
      );
      testDataModelEnumCodeComponent.setBackbonePrimitive0x(UNDEFINED_VALUE);

      testTestDataModelEnumCodeComponent = testDataModelEnumCodeComponent.copy();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getId()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      // Cannot reset required fields to null/undefined
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);

      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should be properly reset by modifying/adding all EnumCodeType properties', () => {
      const enumCode01 = new EnumCodeType(TestData.VALID_TASKCODE_APPROVE, taskCodeEnum);
      const enumCode0x = new EnumCodeType(TestData.VALID_CONTRIBUTOR_AUTHOR, contributorTypeEnum);
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
      testTestDataModelEnumCodeComponent.setId(VALID_ID);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelEnumCodeComponent.setEnumCode01EnumType(enumCode01);
      testTestDataModelEnumCodeComponent.setEnumCode0xEnumType([enumCode0x]);
      testTestDataModelEnumCodeComponent.setEnumCode11EnumType(enumCode11);
      testTestDataModelEnumCodeComponent.setEnumCode1xEnumType([enumCode1x]);
      testTestDataModelEnumCodeComponent.setBackbonePrimitive0x([VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT]);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_APPROVE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([enumCode0x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([TestData.VALID_CONTRIBUTOR_AUTHOR]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
      ]);

      // Reset

      testTestDataModelEnumCodeComponent.setId(VALID_ID_2);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      const enumCode01_2 = new EnumCodeType(TestData.VALID_TASKCODE_FULFILL, taskCodeEnum);
      const enumCode0x_2 = new EnumCodeType(TestData.VALID_CONTRIBUTOR_REVIEWER, contributorTypeEnum);
      const enumCode11_2 = new EnumCodeType(TestData.VALID_TASKSTATUS_ACCEPTED, taskStatusEnum);
      const enumCode1x_2 = new EnumCodeType(TestData.VALID_CONSENT_ACTIVE, consentStateEnum);

      testTestDataModelEnumCodeComponent.setEnumCode01EnumType(enumCode01_2);
      testTestDataModelEnumCodeComponent.addEnumCode0xEnumType(enumCode0x_2);
      testTestDataModelEnumCodeComponent.setEnumCode11EnumType(enumCode11_2);
      testTestDataModelEnumCodeComponent.addEnumCode1xEnumType(enumCode1x_2);
      testTestDataModelEnumCodeComponent.addBackbonePrimitive0x(VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01_2);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01_2 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_FULFILL);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x, enumCode0x_2]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([
        enumCode0x as CodeType,
        enumCode0x_2 as CodeType,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([
        TestData.VALID_CONTRIBUTOR_AUTHOR,
        TestData.VALID_CONTRIBUTOR_REVIEWER,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11_2);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11_2 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_ACCEPTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x, enumCode1x_2]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([
        enumCode1x as CodeType,
        enumCode1x_2 as CodeType,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([
        TestData.VALID_CONSENT_DRAFT,
        TestData.VALID_CONSENT_ACTIVE,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2,
      ]);

      // Reset to empty

      testTestDataModelEnumCodeComponent.setEnumCode01EnumType(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();

      testTestDataModelEnumCodeComponent.setEnumCode0xEnumType(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      let t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModelEnumCodeComponent.setEnumCode11EnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required',
      );
      t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModelEnumCodeComponent.setEnumCode1xEnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required',
      );

      testTestDataModelEnumCodeComponent.setBackbonePrimitive0x(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should be properly reset by modifying/adding all CodeType properties', () => {
      const enumCode01 = new EnumCodeType(TestData.VALID_TASKCODE_APPROVE_TYPE, taskCodeEnum);
      const enumCode0x = new EnumCodeType(TestData.VALID_CONTRIBUTOR_AUTHOR_TYPE, contributorTypeEnum);
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED_TYPE, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT_TYPE, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
      testTestDataModelEnumCodeComponent.setId(VALID_ID);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelEnumCodeComponent.setEnumCode01Element(TestData.VALID_TASKCODE_APPROVE_TYPE);
      testTestDataModelEnumCodeComponent.setEnumCode0xElement([TestData.VALID_CONTRIBUTOR_AUTHOR_TYPE]);
      testTestDataModelEnumCodeComponent.setEnumCode11Element(TestData.VALID_TASKSTATUS_REQUESTED_TYPE);
      testTestDataModelEnumCodeComponent.setEnumCode1xElement([TestData.VALID_CONSENT_DRAFT_TYPE]);
      testTestDataModelEnumCodeComponent.setBackbonePrimitive0x([VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT]);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_APPROVE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([enumCode0x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([TestData.VALID_CONTRIBUTOR_AUTHOR]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
      ]);

      // Reset

      testTestDataModelEnumCodeComponent.setId(VALID_ID_2);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      const enumCode01_2 = new EnumCodeType(TestData.VALID_TASKCODE_FULFILL_TYPE, taskCodeEnum);
      const enumCode0x_2 = new EnumCodeType(TestData.VALID_CONTRIBUTOR_REVIEWER_TYPE, contributorTypeEnum);
      const enumCode11_2 = new EnumCodeType(TestData.VALID_TASKSTATUS_ACCEPTED_TYPE, taskStatusEnum);
      const enumCode1x_2 = new EnumCodeType(TestData.VALID_CONSENT_ACTIVE_TYPE, consentStateEnum);

      testTestDataModelEnumCodeComponent.setEnumCode01Element(TestData.VALID_TASKCODE_FULFILL_TYPE);
      testTestDataModelEnumCodeComponent.addEnumCode0xElement(TestData.VALID_CONTRIBUTOR_REVIEWER_TYPE);
      testTestDataModelEnumCodeComponent.setEnumCode11Element(TestData.VALID_TASKSTATUS_ACCEPTED_TYPE);
      testTestDataModelEnumCodeComponent.addEnumCode1xElement(TestData.VALID_CONSENT_ACTIVE_TYPE);
      testTestDataModelEnumCodeComponent.addBackbonePrimitive0x(VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01_2);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01_2 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_FULFILL);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x, enumCode0x_2]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([
        enumCode0x as CodeType,
        enumCode0x_2 as CodeType,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([
        TestData.VALID_CONTRIBUTOR_AUTHOR,
        TestData.VALID_CONTRIBUTOR_REVIEWER,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11_2);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11_2 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_ACCEPTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x, enumCode1x_2]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([
        enumCode1x as CodeType,
        enumCode1x_2 as CodeType,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([
        TestData.VALID_CONSENT_DRAFT,
        TestData.VALID_CONSENT_ACTIVE,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2,
      ]);

      // Reset to empty

      testTestDataModelEnumCodeComponent.setEnumCode01Element(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();

      testTestDataModelEnumCodeComponent.setEnumCode0xElement(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      let t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModelEnumCodeComponent.setEnumCode11Element(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required',
      );
      t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModelEnumCodeComponent.setEnumCode1xElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required',
      );

      testTestDataModelEnumCodeComponent.setBackbonePrimitive0x(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
    });

    it('should be properly reset by modifying/adding all fhirCode properties', () => {
      const enumCode01 = new EnumCodeType(TestData.VALID_TASKCODE_APPROVE, taskCodeEnum);
      const enumCode0x = new EnumCodeType(TestData.VALID_CONTRIBUTOR_AUTHOR, contributorTypeEnum);
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
      testTestDataModelEnumCodeComponent.setId(VALID_ID);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelEnumCodeComponent.setEnumCode01(TestData.VALID_TASKCODE_APPROVE);
      testTestDataModelEnumCodeComponent.setEnumCode0x([TestData.VALID_CONTRIBUTOR_AUTHOR]);
      testTestDataModelEnumCodeComponent.setEnumCode11(TestData.VALID_TASKSTATUS_REQUESTED);
      testTestDataModelEnumCodeComponent.setEnumCode1x([TestData.VALID_CONSENT_DRAFT]);
      testTestDataModelEnumCodeComponent.setBackbonePrimitive0x([VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT]);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_APPROVE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([enumCode0x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([TestData.VALID_CONTRIBUTOR_AUTHOR]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
      ]);

      // Reset

      testTestDataModelEnumCodeComponent.setId(VALID_ID_2);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION_2]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      const enumCode01_2 = new EnumCodeType(TestData.VALID_TASKCODE_FULFILL, taskCodeEnum);
      const enumCode0x_2 = new EnumCodeType(TestData.VALID_CONTRIBUTOR_REVIEWER, contributorTypeEnum);
      const enumCode11_2 = new EnumCodeType(TestData.VALID_TASKSTATUS_ACCEPTED, taskStatusEnum);
      const enumCode1x_2 = new EnumCodeType(TestData.VALID_CONSENT_ACTIVE, consentStateEnum);

      testTestDataModelEnumCodeComponent.setEnumCode01(TestData.VALID_TASKCODE_FULFILL);
      testTestDataModelEnumCodeComponent.addEnumCode0x(TestData.VALID_CONTRIBUTOR_REVIEWER);
      testTestDataModelEnumCodeComponent.setEnumCode11(TestData.VALID_TASKSTATUS_ACCEPTED);
      testTestDataModelEnumCodeComponent.addEnumCode1x(TestData.VALID_CONSENT_ACTIVE);
      testTestDataModelEnumCodeComponent.addBackbonePrimitive0x(VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01_2);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01_2 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_FULFILL);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x, enumCode0x_2]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([
        enumCode0x as CodeType,
        enumCode0x_2 as CodeType,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([
        TestData.VALID_CONTRIBUTOR_AUTHOR,
        TestData.VALID_CONTRIBUTOR_REVIEWER,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11_2);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11_2 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_ACCEPTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x, enumCode1x_2]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([
        enumCode1x as CodeType,
        enumCode1x_2 as CodeType,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([
        TestData.VALID_CONSENT_DRAFT,
        TestData.VALID_CONSENT_ACTIVE,
      ]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2,
      ]);

      // Reset to empty

      testTestDataModelEnumCodeComponent.setEnumCode01(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toBeUndefined();
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toBeUndefined();

      testTestDataModelEnumCodeComponent.setEnumCode0x(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([] as EnumCodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([] as CodeType[]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([] as fhirCode[]);

      let t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModelEnumCodeComponent.setEnumCode11(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required',
      );
      t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModelEnumCodeComponent.setEnumCode1x(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required',
      );

      testTestDataModelEnumCodeComponent.setBackbonePrimitive0x(UNDEFINED_VALUE);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual(
        [] as TestDataModelPrimitiveComponent[],
      );
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
      enumCode01: 'approve',
      _enumCode01: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
      },
      enumCode0x: ['author'],
      enumCode11: 'requested',
      enumCode1x: ['draft'],
      backbonePrimitive0x: [
        {
          primitive11: true,
          primitive1x: ['This is a valid string.'],
          choice11Uri: 'validUri',
        },
        {
          primitive11: false,
          primitive1x: ['This is another valid string.'],
          choice11Uri: 'validUri2',
        },
      ],
    };
    const INVALID_JSON = {
      bogusField: 'bogus value',
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);

      const t = () => {
        testTestDataModelEnumCodeComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11, TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x`,
      );
    });

    it('should throw FhirError from parse() when JSON is missing required properties', () => {
      const t = () => {
        TestDataModelEnumCodeComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11, TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x`,
      );
    });

    it('should return undefined when deserialize with no json', () => {
      let testTestDataModelEnumCodeComponent: TestDataModelEnumCodeComponent | undefined = undefined;
      testTestDataModelEnumCodeComponent = TestDataModelEnumCodeComponent.parse({});
      expect(testTestDataModelEnumCodeComponent).toBeUndefined();

      testTestDataModelEnumCodeComponent = TestDataModelEnumCodeComponent.parse(null);
      expect(testTestDataModelEnumCodeComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testTestDataModelEnumCodeComponent = TestDataModelEnumCodeComponent.parse(undefined);
      expect(testTestDataModelEnumCodeComponent).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const enumCode01 = new EnumCodeType(TestData.VALID_TASKCODE_APPROVE, taskCodeEnum);
      enumCode01.setId(DATATYPE_ID);
      enumCode01.setExtension([DATATYPE_EXTENSION]);
      const enumCode0x = new EnumCodeType(TestData.VALID_CONTRIBUTOR_AUTHOR, contributorTypeEnum);
      const enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
      const enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);

      const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
      testTestDataModelEnumCodeComponent.setId(VALID_ID);
      testTestDataModelEnumCodeComponent.setExtension([VALID_EXTENSION]);
      testTestDataModelEnumCodeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModelEnumCodeComponent.setEnumCode01EnumType(enumCode01);
      testTestDataModelEnumCodeComponent.setEnumCode0xEnumType([enumCode0x]);
      testTestDataModelEnumCodeComponent.setEnumCode11EnumType(enumCode11);
      testTestDataModelEnumCodeComponent.setEnumCode1xEnumType([enumCode1x]);
      testTestDataModelEnumCodeComponent.addBackbonePrimitive0x(VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT);
      testTestDataModelEnumCodeComponent.addBackbonePrimitive0x(VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testTestDataModelEnumCodeComponent.hasId()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModelEnumCodeComponent.hasExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModelEnumCodeComponent.hasModifierExtension()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModelEnumCodeComponent properties
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01EnumType()).toEqual(enumCode01);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01Element()).toEqual(enumCode01 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode01()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode01()).toStrictEqual(TestData.VALID_TASKCODE_APPROVE);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xEnumType()).toEqual([enumCode0x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0xElement()).toEqual([enumCode0x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode0x()).toEqual([TestData.VALID_CONTRIBUTOR_AUTHOR]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11EnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11EnumType()).toEqual(enumCode11);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11Element()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11Element()).toEqual(enumCode11 as CodeType);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode11()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode11()).toStrictEqual(TestData.VALID_TASKSTATUS_REQUESTED);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xEnumType()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xEnumType()).toEqual([enumCode1x]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1xElement()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1xElement()).toEqual([enumCode1x as CodeType]);
      expect(testTestDataModelEnumCodeComponent.hasEnumCode1x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getEnumCode1x()).toEqual([TestData.VALID_CONSENT_DRAFT]);
      expect(testTestDataModelEnumCodeComponent.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModelEnumCodeComponent.getBackbonePrimitive0x()).toEqual([
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT,
        VALID_TEST_DATA_MODEL_PRIMITIVE_COMPONENT_2,
      ]);

      expect(testTestDataModelEnumCodeComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return ParametersParameterComponent for valid json', () => {
      const testTestDataModelEnumCodeComponent: TestDataModelEnumCodeComponent | undefined =
        TestDataModelEnumCodeComponent.parse(VALID_JSON);

      expect(testTestDataModelEnumCodeComponent).toBeDefined();
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(TestDataModelEnumCodeComponent);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(BackboneElement);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Element);
      expect(testTestDataModelEnumCodeComponent).toBeInstanceOf(Base);
      expect(testTestDataModelEnumCodeComponent?.constructor.name).toStrictEqual('TestDataModelEnumCodeComponent');
      expect(testTestDataModelEnumCodeComponent?.fhirType()).toStrictEqual(
        'TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x',
      );
      expect(testTestDataModelEnumCodeComponent?.isEmpty()).toBe(false);
      expect(testTestDataModelEnumCodeComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    const INCORRECT_CODE_VALUE = 'invalidCodeValue';
    const INCORRECT_CODE_TYPE = new CodeType(INCORRECT_CODE_VALUE);

    let inValidTypeEnum: MockCodeEnum;
    let invalidEnum: EnumCodeType;
    beforeAll(() => {
      inValidTypeEnum = new MockCodeEnum();
      invalidEnum = new EnumCodeType('generated', inValidTypeEnum);
    });

    describe('constructor', () => {
      it('should throw appropriate errors when instantiated with an invalid EnumCodeType', () => {
        let t = () => {
          new TestDataModelEnumCodeComponent(invalidEnum, null);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Invalid type parameter (MockCodeEnum); Should be TaskStatusEnum.`,
        );

        t = () => {
          new TestDataModelEnumCodeComponent(null, [invalidEnum]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Errors: Invalid type parameter (MockCodeEnum); Should be ConsentStateEnum.`,
        );
      });

      it('should throw appropriate errors when instantiated with an invalid CodeType', () => {
        let t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelEnumCodeComponent(INVALID_CODE_TYPE, null);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Provided code value is not an instance of CodeType`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          new TestDataModelEnumCodeComponent(null, [INVALID_CODE_TYPE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Errors: Provided code value is not an instance of CodeType`,
        );

        t = () => {
          new TestDataModelEnumCodeComponent(INCORRECT_CODE_TYPE, null);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Unknown TaskStatusEnum 'code' value 'invalidCodeValue'`,
        );

        t = () => {
          new TestDataModelEnumCodeComponent(null, [INCORRECT_CODE_TYPE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Errors: Unknown ConsentStateEnum 'code' value 'invalidCodeValue'`,
        );
      });

      it('should throw appropriate errors when instantiated with an invalid fhirCode', () => {
        let t = () => {
          new TestDataModelEnumCodeComponent(INVALID_CODE_VALUE, null);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Invalid value for CodeType ( Invalid code )`,
        );

        t = () => {
          new TestDataModelEnumCodeComponent(null, [INVALID_CODE_VALUE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Errors: Invalid value for CodeType ( Invalid code )`,
        );

        t = () => {
          new TestDataModelEnumCodeComponent(INCORRECT_CODE_VALUE, null);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Unknown TaskStatusEnum 'code' value 'invalidCodeValue'`,
        );

        t = () => {
          new TestDataModelEnumCodeComponent(null, [INCORRECT_CODE_VALUE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Errors: Unknown ConsentStateEnum 'code' value 'invalidCodeValue'`,
        );
      });
    });

    describe('enumCode01', () => {
      it('should throw appropriate errors for an invalid EnumCodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        const t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode01EnumType(invalidEnum);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode01; Invalid type parameter (MockCodeEnum); Should be TaskCodeEnum.`,
        );
      });

      it('should throw appropriate errors for an invalid CodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode01Element(INVALID_CODE_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode01; Provided element is not an instance of CodeType.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode01Element(INCORRECT_CODE_TYPE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown TaskCodeEnum 'code' value 'invalidCodeValue'`);
      });

      it('should throw appropriate errors for an invalid fhirCode', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode01(INVALID_CODE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode01; Provided value is not an instance of fhirCode.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode01(INCORRECT_CODE_VALUE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown TaskCodeEnum 'code' value 'invalidCodeValue'`);
      });
    });

    describe('enumCode0x', () => {
      it('should throw appropriate errors for an invalid EnumCodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode0xEnumType([invalidEnum]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided instance array has an element that is not an instance of ContributorTypeEnum.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode0xEnumType(invalidEnum);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Invalid type parameter (MockCodeEnum); Should be ContributorTypeEnum.`,
        );
      });

      it('should throw appropriate errors for an invalid CodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode0xElement([INVALID_CODE_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided element array has an element that is not an instance of CodeType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.addEnumCode0xElement(INVALID_CODE_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided element is not an instance of CodeType.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode0xElement([INCORRECT_CODE_TYPE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ContributorTypeEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode0xElement(INCORRECT_CODE_TYPE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ContributorTypeEnum 'code' value 'invalidCodeValue'`);
      });

      it('should throw appropriate errors for an invalid fhirCode', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode0x([INVALID_CODE_VALUE]);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided value is not an instance of fhirCode.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode0x(INVALID_CODE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode0x; Provided value is not an instance of fhirCode.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode0x([INCORRECT_CODE_VALUE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ContributorTypeEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode0x(INCORRECT_CODE_VALUE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ContributorTypeEnum 'code' value 'invalidCodeValue`);
      });
    });

    describe('enumCode11', () => {
      it('should throw appropriate errors for an invalid EnumCodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode11EnumType(invalidEnum);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Invalid type parameter (MockCodeEnum); Should be TaskStatusEnum.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11EnumType(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11EnumType(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
        );
      });

      it('should throw appropriate errors for an invalid CodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11Element(INVALID_CODE_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11; Provided value is not an instance of CodeType.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode11Element(INCORRECT_CODE_TYPE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown TaskStatusEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11Element(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11EnumType(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
        );
      });

      it('should throw appropriate errors for an invalid fhirCode', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode11(INVALID_CODE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 ( Invalid code )`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode11(INCORRECT_CODE_VALUE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown TaskStatusEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode11(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode11 is required`,
        );
      });
    });

    describe('enumCode1x', () => {
      it('should throw appropriate errors for an invalid EnumCodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode1xEnumType([invalidEnum]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided instance array has an element that is not an instance of ConsentStateEnum.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode1xEnumType(invalidEnum);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x); Invalid type parameter (MockCodeEnum); Should be ConsentStateEnum.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1xEnumType(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1xEnumType(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
        );
      });

      it('should throw appropriate errors for an invalid CodeType', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1xElement([INVALID_CODE_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided element array has an element that is not an instance of CodeType.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.addEnumCode1xElement(INVALID_CODE_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided element is not an instance of CodeType.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode1xElement([INCORRECT_CODE_TYPE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ConsentStateEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode1xElement(INCORRECT_CODE_TYPE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ConsentStateEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1xElement(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1xElement(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
        );
      });

      it('should throw appropriate errors for an invalid fhirCode', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode1x([INVALID_CODE_VALUE]);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided value is not an instance of fhirCode.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode1x(INVALID_CODE_VALUE);
        };
        expect(t).toThrow(PrimitiveTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x; Provided value is not an instance of fhirCode.`,
        );

        t = () => {
          testTestDataModelEnumCodeComponent.setEnumCode1x([INCORRECT_CODE_VALUE]);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ConsentStateEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          testTestDataModelEnumCodeComponent.addEnumCode1x(INCORRECT_CODE_VALUE);
        };
        expect(t).toThrow(InvalidCodeError);
        expect(t).toThrow(`Unknown ConsentStateEnum 'code' value 'invalidCodeValue'`);

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1x(undefined);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setEnumCode1x(null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(
          `TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.enumCode1x is required`,
        );
      });
    });

    describe('backbonePrimitive0x', () => {
      it('should throw appropriate errors for an invalid TestDataModelPrimitiveComponent', () => {
        const testTestDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(null, null);
        let t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.setBackbonePrimitive0x([INVALID_NON_STRING_TYPE]);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.backbonePrimitive0x; Provided value array has an element that is not an instance of TestDataModelPrimitiveComponent.`,
        );

        t = () => {
          // @ts-expect-error: allow for testing
          testTestDataModelEnumCodeComponent.addBackbonePrimitive0x(INVALID_NON_STRING_TYPE);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `Invalid TestDataModel.backboneComplex01.backboneReference11.backboneEnumCode1x.backbonePrimitive0x; Provided element is not an instance of TestDataModelPrimitiveComponent.`,
        );
      });
    });
  });
});
