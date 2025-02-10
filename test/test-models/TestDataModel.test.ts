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
import { Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { ConsentStateEnum } from '@src/test-models/code-systems/ConsentStateEnum';
import { TaskStatusEnum } from '@src/test-models/code-systems/TaskStatusEnum';
import {
  TestDataModel,
  TestDataModelComplexComponent,
  TestDataModelEnumCodeComponent,
  TestDataModelPrimitiveComponent,
  TestDataModelReferenceComponent,
} from '@src/test-models/TestDataModel';
import { TestData } from '../test-data';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  IMPLICIT_RULES_VALUE,
  IMPLICIT_RULES_VALUE_2,
  INVALID_NON_STRING_TYPE,
  LANGUAGE_VALUE,
  LANGUAGE_VALUE_2,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_ID_TYPE,
  VALID_ID_TYPE_2,
  VALID_META,
  VALID_META_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
  VALID_NARRATIVE,
  VALID_NARRATIVE_2,
} from '../test-utils';

describe('TestDataModel', () => {
  const CONTAINED_PERSON_ID = '#SMP-1';
  const CONTAINED_PERSON_REFERENCE = new Reference();
  CONTAINED_PERSON_REFERENCE.setReference(`Person/${CONTAINED_PERSON_ID}`);

  let testTestDataModelPrimitiveComponent: TestDataModelPrimitiveComponent;
  let testTestDataModelPrimitiveComponent_2: TestDataModelPrimitiveComponent;
  let testTestDataModelComplexComponent: TestDataModelComplexComponent;
  let testTestDataModelComplexComponent_2: TestDataModelComplexComponent;
  beforeAll(() => {
    const consentStateEnum = new ConsentStateEnum();
    const taskStatusEnum = new TaskStatusEnum();

    let enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_REQUESTED, taskStatusEnum);
    let enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_DRAFT, consentStateEnum);
    const testDataModelEnumCodeComponent = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);
    const testTestDataModelReferenceComponent = new TestDataModelReferenceComponent(
      CONTAINED_PERSON_REFERENCE,
      [TestData.VALID_CONDITION_REFERENCE],
      [testDataModelEnumCodeComponent],
    );
    testTestDataModelComplexComponent = new TestDataModelComplexComponent(
      TestData.VALID_PERIOD,
      [TestData.VALID_ATTACHMENT],
      TestData.VALID_DECIMAL_TYPE,
      testTestDataModelReferenceComponent,
    );

    enumCode11 = new EnumCodeType(TestData.VALID_TASKSTATUS_ACCEPTED, taskStatusEnum);
    enumCode1x = new EnumCodeType(TestData.VALID_CONSENT_ACTIVE, consentStateEnum);
    const testDataModelEnumCodeComponent_2 = new TestDataModelEnumCodeComponent(enumCode11, [enumCode1x]);
    const testTestDataModelReferenceComponent_2 = new TestDataModelReferenceComponent(
      TestData.VALID_PERSON_REFERENCE_2,
      [TestData.VALID_CONDITION_REFERENCE_2],
      [testDataModelEnumCodeComponent_2],
    );
    testTestDataModelComplexComponent_2 = new TestDataModelComplexComponent(
      TestData.VALID_PERIOD_2,
      [TestData.VALID_ATTACHMENT_2],
      TestData.VALID_DECIMAL_TYPE_2,
      testTestDataModelReferenceComponent_2,
    );

    testTestDataModelPrimitiveComponent = new TestDataModelPrimitiveComponent(
      TestData.VALID_BOOLEAN_TRUE,
      [TestData.VALID_STRING],
      TestData.VALID_URI_TYPE,
    );
    testTestDataModelPrimitiveComponent_2 = new TestDataModelPrimitiveComponent(
      TestData.VALID_BOOLEAN_FALSE,
      [TestData.VALID_STRING_2],
      TestData.VALID_URI_TYPE_2,
    );
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testTestDataModel = new TestDataModel();

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(true);
      expect(testTestDataModel.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(false);
      expect(testTestDataModel.getIdElement()).toEqual(new IdType());
      expect(testTestDataModel.hasId()).toBe(false);
      expect(testTestDataModel.getId()).toBeUndefined();
      expect(testTestDataModel.hasMeta()).toBe(false);
      expect(testTestDataModel.getMeta()).toEqual(new Meta());
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(false);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType());
      expect(testTestDataModel.hasImplicitRules()).toBe(false);
      expect(testTestDataModel.getImplicitRules()).toBeUndefined();
      expect(testTestDataModel.hasLanguageElement()).toBe(false);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType());
      expect(testTestDataModel.hasLanguage()).toBe(false);
      expect(testTestDataModel.getLanguage()).toBeUndefined();
      expect(testTestDataModel.hasText()).toBe(false);
      expect(testTestDataModel.getText()).toEqual(new Narrative(null, null));
      expect(testTestDataModel.hasContained()).toBe(false);
      expect(testTestDataModel.getContained()).toEqual([] as Resource[]);
      expect(testTestDataModel.hasExtension()).toBe(false);
      expect(testTestDataModel.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModel.hasModifierExtension()).toBe(false);
      expect(testTestDataModel.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(false);
      expect(testTestDataModel.getChoice01()).toBeUndefined();
      expect(testTestDataModel.hasOpen01()).toBe(false);
      expect(testTestDataModel.getOpen01()).toBeUndefined();
      expect(testTestDataModel.hasResource01()).toBe(false);
      expect(testTestDataModel.getResource01()).toBeUndefined();
      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([] as TestDataModelPrimitiveComponent[]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(false);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(
        new TestDataModelComplexComponent(null, null, null, null),
      );
    });

    it('should properly copy()', () => {
      const testDataModel = new TestDataModel();

      testDataModel.setId(VALID_ID);
      testDataModel.setMeta(VALID_META);
      testDataModel.setImplicitRules(IMPLICIT_RULES_VALUE);
      testDataModel.setLanguage(LANGUAGE_VALUE);
      testDataModel.setText(VALID_NARRATIVE);
      testDataModel.setContained([TestData.SIMPLE_PERSON_MODEL]);
      testDataModel.setExtension([VALID_EXTENSION]);
      testDataModel.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testDataModel.setChoice01(TestData.VALID_QUANTITY);
      testDataModel.setOpen01(TestData.VALID_IDENTIFIER);
      testDataModel.setResource01(TestData.VALID_MOCK_TASK);
      testDataModel.setBackbonePrimitive0x([testTestDataModelPrimitiveComponent]);
      testDataModel.setBackboneComplex01(testTestDataModelComplexComponent);

      let testTestDataModel: TestDataModel = testDataModel.copy();

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(false);
      expect(testTestDataModel.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(true);
      expect(testTestDataModel.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testTestDataModel.hasId()).toBe(true);
      expect(testTestDataModel.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModel.hasMeta()).toBe(true);
      expect(testTestDataModel.getMeta()).toEqual(VALID_META);
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(true);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testTestDataModel.hasImplicitRules()).toBe(true);
      expect(testTestDataModel.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testTestDataModel.hasLanguageElement()).toBe(true);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testTestDataModel.hasLanguage()).toBe(true);
      expect(testTestDataModel.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testTestDataModel.hasText()).toBe(true);
      expect(testTestDataModel.getText()).toEqual(VALID_NARRATIVE);
      expect(testTestDataModel.hasContained()).toBe(true);
      expect(testTestDataModel.getContained()).toEqual([TestData.SIMPLE_PERSON_MODEL]);
      expect(testTestDataModel.hasExtension()).toBe(true);
      expect(testTestDataModel.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModel.hasModifierExtension()).toBe(true);
      expect(testTestDataModel.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(true);
      expect(testTestDataModel.getChoice01()).toEqual(TestData.VALID_QUANTITY);
      expect(testTestDataModel.hasOpen01()).toBe(true);
      expect(testTestDataModel.getOpen01()).toEqual(TestData.VALID_IDENTIFIER);
      expect(testTestDataModel.hasResource01()).toBe(true);
      expect(testTestDataModel.getResource01()).toEqual(TestData.VALID_MOCK_TASK);

      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([testTestDataModelPrimitiveComponent]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(true);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(testTestDataModelComplexComponent);

      // Reset to undefined

      testDataModel.setId(UNDEFINED_VALUE);
      testDataModel.setMeta(UNDEFINED_VALUE);
      testDataModel.setImplicitRules(UNDEFINED_VALUE);
      testDataModel.setLanguage(UNDEFINED_VALUE);
      testDataModel.setText(UNDEFINED_VALUE);
      testDataModel.setContained(UNDEFINED_VALUE);
      testDataModel.setExtension(UNDEFINED_VALUE);
      testDataModel.setModifierExtension(UNDEFINED_VALUE);

      testDataModel.setChoice01(UNDEFINED_VALUE);
      testDataModel.setOpen01(UNDEFINED_VALUE);
      testDataModel.setResource01(UNDEFINED_VALUE);
      testDataModel.setBackbonePrimitive0x(UNDEFINED_VALUE);
      testDataModel.setBackboneComplex01(UNDEFINED_VALUE);

      testTestDataModel = testDataModel.copy();

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(true);
      expect(testTestDataModel.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(false);
      expect(testTestDataModel.getIdElement()).toEqual(new IdType());
      expect(testTestDataModel.hasId()).toBe(false);
      expect(testTestDataModel.getId()).toBeUndefined();
      expect(testTestDataModel.hasMeta()).toBe(false);
      expect(testTestDataModel.getMeta()).toEqual(new Meta());
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(false);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType());
      expect(testTestDataModel.hasImplicitRules()).toBe(false);
      expect(testTestDataModel.getImplicitRules()).toBeUndefined();
      expect(testTestDataModel.hasLanguageElement()).toBe(false);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType());
      expect(testTestDataModel.hasLanguage()).toBe(false);
      expect(testTestDataModel.getLanguage()).toBeUndefined();
      expect(testTestDataModel.hasText()).toBe(false);
      expect(testTestDataModel.getText()).toEqual(new Narrative(null, null));
      expect(testTestDataModel.hasContained()).toBe(false);
      expect(testTestDataModel.getContained()).toEqual([] as Resource[]);
      expect(testTestDataModel.hasExtension()).toBe(false);
      expect(testTestDataModel.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModel.hasModifierExtension()).toBe(false);
      expect(testTestDataModel.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(false);
      expect(testTestDataModel.getChoice01()).toBeUndefined();
      expect(testTestDataModel.hasOpen01()).toBe(false);
      expect(testTestDataModel.getOpen01()).toBeUndefined();
      expect(testTestDataModel.hasResource01()).toBe(false);
      expect(testTestDataModel.getResource01()).toBeUndefined();
      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([] as TestDataModelPrimitiveComponent[]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(false);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(
        new TestDataModelComplexComponent(null, null, null, null),
      );
    });

    it('should be properly reset by modifying/adding all properties', () => {
      const testTestDataModel = new TestDataModel();

      testTestDataModel.setId(VALID_ID);
      testTestDataModel.setMeta(VALID_META);
      testTestDataModel.setImplicitRules(IMPLICIT_RULES_VALUE);
      testTestDataModel.setLanguage(LANGUAGE_VALUE);
      testTestDataModel.setText(VALID_NARRATIVE);
      testTestDataModel.setContained([TestData.SIMPLE_PERSON_MODEL]);
      testTestDataModel.setExtension([VALID_EXTENSION]);
      testTestDataModel.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModel.setChoice01(TestData.VALID_QUANTITY);
      testTestDataModel.setOpen01(TestData.VALID_IDENTIFIER);
      testTestDataModel.setResource01(TestData.VALID_MOCK_TASK);
      testTestDataModel.setBackbonePrimitive0x([testTestDataModelPrimitiveComponent]);
      testTestDataModel.setBackboneComplex01(testTestDataModelComplexComponent);

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(false);
      expect(testTestDataModel.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(true);
      expect(testTestDataModel.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testTestDataModel.hasId()).toBe(true);
      expect(testTestDataModel.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModel.hasMeta()).toBe(true);
      expect(testTestDataModel.getMeta()).toEqual(VALID_META);
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(true);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testTestDataModel.hasImplicitRules()).toBe(true);
      expect(testTestDataModel.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testTestDataModel.hasLanguageElement()).toBe(true);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testTestDataModel.hasLanguage()).toBe(true);
      expect(testTestDataModel.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testTestDataModel.hasText()).toBe(true);
      expect(testTestDataModel.getText()).toEqual(VALID_NARRATIVE);
      expect(testTestDataModel.hasContained()).toBe(true);
      expect(testTestDataModel.getContained()).toEqual([TestData.SIMPLE_PERSON_MODEL]);
      expect(testTestDataModel.hasExtension()).toBe(true);
      expect(testTestDataModel.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModel.hasModifierExtension()).toBe(true);
      expect(testTestDataModel.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(true);
      expect(testTestDataModel.getChoice01()).toEqual(TestData.VALID_QUANTITY);
      expect(testTestDataModel.hasOpen01()).toBe(true);
      expect(testTestDataModel.getOpen01()).toEqual(TestData.VALID_IDENTIFIER);
      expect(testTestDataModel.hasResource01()).toBe(true);
      expect(testTestDataModel.getResource01()).toEqual(TestData.VALID_MOCK_TASK);
      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([testTestDataModelPrimitiveComponent]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(true);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(testTestDataModelComplexComponent);

      // Reset

      testTestDataModel.setId(VALID_ID_2);
      testTestDataModel.setMeta(VALID_META_2);
      testTestDataModel.setImplicitRules(IMPLICIT_RULES_VALUE_2);
      testTestDataModel.setLanguage(LANGUAGE_VALUE_2);
      testTestDataModel.setText(VALID_NARRATIVE_2);
      testTestDataModel.setContained([TestData.SIMPLE_PERSON_MODEL_2]);
      testTestDataModel.setExtension([VALID_EXTENSION_2]);
      testTestDataModel.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testTestDataModel.setChoice01(TestData.VALID_QUANTITY);
      testTestDataModel.setOpen01(TestData.VALID_PERIOD);
      testTestDataModel.setResource01(TestData.VALID_MOCK_TASK_2);
      testTestDataModel.addBackbonePrimitive0x(testTestDataModelPrimitiveComponent_2);
      testTestDataModel.setBackboneComplex01(testTestDataModelComplexComponent_2);

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(false);
      expect(testTestDataModel.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(true);
      expect(testTestDataModel.getIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testTestDataModel.hasId()).toBe(true);
      expect(testTestDataModel.getId()).toStrictEqual(VALID_ID_2);
      expect(testTestDataModel.hasMeta()).toBe(true);
      expect(testTestDataModel.getMeta()).toEqual(VALID_META_2);
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(true);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE_2));
      expect(testTestDataModel.hasImplicitRules()).toBe(true);
      expect(testTestDataModel.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE_2);
      expect(testTestDataModel.hasLanguageElement()).toBe(true);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE_2));
      expect(testTestDataModel.hasLanguage()).toBe(true);
      expect(testTestDataModel.getLanguage()).toStrictEqual(LANGUAGE_VALUE_2);
      expect(testTestDataModel.hasText()).toBe(true);
      expect(testTestDataModel.getText()).toEqual(VALID_NARRATIVE_2);
      expect(testTestDataModel.hasContained()).toBe(true);
      expect(testTestDataModel.getContained()).toEqual([TestData.SIMPLE_PERSON_MODEL_2]);
      expect(testTestDataModel.hasExtension()).toBe(true);
      expect(testTestDataModel.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testTestDataModel.hasModifierExtension()).toBe(true);
      expect(testTestDataModel.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(true);
      expect(testTestDataModel.getChoice01()).toEqual(TestData.VALID_QUANTITY);
      expect(testTestDataModel.hasOpen01()).toBe(true);
      expect(testTestDataModel.getOpen01()).toEqual(TestData.VALID_PERIOD);
      expect(testTestDataModel.hasResource01()).toBe(true);
      expect(testTestDataModel.getResource01()).toEqual(TestData.VALID_MOCK_TASK_2);
      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([
        testTestDataModelPrimitiveComponent,
        testTestDataModelPrimitiveComponent_2,
      ]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(true);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(testTestDataModelComplexComponent_2);

      // Reset to undefined

      testTestDataModel.setId(UNDEFINED_VALUE);
      testTestDataModel.setMeta(UNDEFINED_VALUE);
      testTestDataModel.setImplicitRules(UNDEFINED_VALUE);
      testTestDataModel.setLanguage(UNDEFINED_VALUE);
      testTestDataModel.setText(UNDEFINED_VALUE);
      testTestDataModel.setContained(UNDEFINED_VALUE);
      testTestDataModel.setExtension(UNDEFINED_VALUE);
      testTestDataModel.setModifierExtension(UNDEFINED_VALUE);

      testTestDataModel.setChoice01(UNDEFINED_VALUE);
      testTestDataModel.setOpen01(UNDEFINED_VALUE);
      testTestDataModel.setResource01(UNDEFINED_VALUE);
      testTestDataModel.setBackbonePrimitive0x(UNDEFINED_VALUE);
      testTestDataModel.setBackboneComplex01(UNDEFINED_VALUE);

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(true);
      expect(testTestDataModel.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(false);
      expect(testTestDataModel.getIdElement()).toEqual(new IdType());
      expect(testTestDataModel.hasId()).toBe(false);
      expect(testTestDataModel.getId()).toBeUndefined();
      expect(testTestDataModel.hasMeta()).toBe(false);
      expect(testTestDataModel.getMeta()).toEqual(new Meta());
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(false);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType());
      expect(testTestDataModel.hasImplicitRules()).toBe(false);
      expect(testTestDataModel.getImplicitRules()).toBeUndefined();
      expect(testTestDataModel.hasLanguageElement()).toBe(false);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType());
      expect(testTestDataModel.hasLanguage()).toBe(false);
      expect(testTestDataModel.getLanguage()).toBeUndefined();
      expect(testTestDataModel.hasText()).toBe(false);
      expect(testTestDataModel.getText()).toEqual(new Narrative(null, null));
      expect(testTestDataModel.hasContained()).toBe(false);
      expect(testTestDataModel.getContained()).toEqual([] as Resource[]);
      expect(testTestDataModel.hasExtension()).toBe(false);
      expect(testTestDataModel.getExtension()).toEqual([] as Extension[]);
      expect(testTestDataModel.hasModifierExtension()).toBe(false);
      expect(testTestDataModel.getModifierExtension()).toEqual([] as Extension[]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(false);
      expect(testTestDataModel.getChoice01()).toBeUndefined();
      expect(testTestDataModel.hasOpen01()).toBe(false);
      expect(testTestDataModel.getOpen01()).toBeUndefined();
      expect(testTestDataModel.hasResource01()).toBe(false);
      expect(testTestDataModel.getResource01()).toBeUndefined();
      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(false);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([] as TestDataModelPrimitiveComponent[]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(false);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(
        new TestDataModelComplexComponent(null, null, null, null),
      );
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      resourceType: 'Basic',
      id: 'id12345',
      meta: {
        versionId: 'VID-1972',
      },
      implicitRules: 'implicitRules',
      language: 'en-US',
      text: {
        status: 'generated',
        div: '<div xmlns="http://www.w3.org/1999/xhtml">text</div>',
      },
      contained: [
        {
          resourceType: 'Person',
          id: '#SMP-1',
          identifier: {
            system: 'http://sample/system/one',
            value: 'This is a valid string.',
          },
          name: {
            family: 'Surname',
            given: ['First', 'Middle'],
            prefix: ['Mr.'],
            suffix: ['Sr.'],
          },
          address: {
            use: 'home',
            type: 'postal',
            line: ['1234 Main ST', 'APT 15A'],
            city: 'Nashua',
            state: 'NH',
            postalCode: '03064',
            country: 'US',
          },
          phone: '888-555-1234',
        },
      ],
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
      choice01Quantity: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
        value: 128.1978,
      },
      open01Identifier: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
        system: 'http://sample/system/one',
        value: 'This is a valid string.',
      },
      resource01: {
        resourceType: 'Person',
        id: 'SMP-987',
        identifier: {
          system: 'http://sample/system/two',
          value: 'This is another valid string.',
        },
        name: {
          family: 'LastName',
          given: ['First2', 'Middle2'],
          prefix: ['Ms.'],
          suffix: ['MD'],
        },
        address: {
          use: 'work',
          type: 'postal',
          line: ['4321 Central ST'],
          city: 'Renton',
          state: 'WA',
          postalCode: '98058',
          country: 'US',
        },
        phone: '888-555-9876',
      },
      backbonePrimitive0x: [
        {
          primitive11: true,
          primitive1x: ['This is a valid string.'],
          choice11Uri: 'validUri',
        },
      ],
      backboneComplex01: {
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
        backboneReference11: {
          reference11: {
            reference: 'Person/#SMP-1',
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
      },
    };

    it('should return undefined when deserialize with no json', () => {
      let testTestDataModel: TestDataModel | undefined = undefined;
      testTestDataModel = TestDataModel.parse({});
      expect(testTestDataModel).toBeUndefined();

      // @ts-expect-error: allow for testing
      testTestDataModel = TestDataModel.parse(null);
      expect(testTestDataModel).toBeUndefined();

      // @ts-expect-error: allow for testing
      testTestDataModel = TestDataModel.parse(undefined);
      expect(testTestDataModel).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const choice01 = TestData.VALID_QUANTITY.copy();
      choice01.setId(DATATYPE_ID);
      choice01.addExtension(DATATYPE_EXTENSION);

      const open01 = TestData.VALID_IDENTIFIER.copy();
      open01.setId(DATATYPE_ID);
      open01.addExtension(DATATYPE_EXTENSION);

      const containedPerson = TestData.SIMPLE_PERSON_MODEL.copy();
      containedPerson.setId(CONTAINED_PERSON_ID);

      const testTestDataModel = new TestDataModel();

      testTestDataModel.setId(VALID_ID);
      testTestDataModel.setMeta(VALID_META);
      testTestDataModel.setImplicitRules(IMPLICIT_RULES_VALUE);
      testTestDataModel.setLanguage(LANGUAGE_VALUE);
      testTestDataModel.setText(VALID_NARRATIVE);
      testTestDataModel.setContained([containedPerson]);
      testTestDataModel.setExtension([VALID_EXTENSION]);
      testTestDataModel.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testTestDataModel.setChoice01(choice01);
      testTestDataModel.setOpen01(open01);
      testTestDataModel.setResource01(TestData.SIMPLE_PERSON_MODEL_2);
      testTestDataModel.setBackbonePrimitive0x([testTestDataModelPrimitiveComponent]);
      testTestDataModel.setBackboneComplex01(testTestDataModelComplexComponent);

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel.isEmpty()).toBe(false);

      // inherited properties from Resource/DomainResource
      expect(testTestDataModel.hasIdElement()).toBe(true);
      expect(testTestDataModel.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testTestDataModel.hasId()).toBe(true);
      expect(testTestDataModel.getId()).toStrictEqual(VALID_ID);
      expect(testTestDataModel.hasMeta()).toBe(true);
      expect(testTestDataModel.getMeta()).toEqual(VALID_META);
      expect(testTestDataModel.hasImplicitRulesElement()).toBe(true);
      expect(testTestDataModel.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testTestDataModel.hasImplicitRules()).toBe(true);
      expect(testTestDataModel.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testTestDataModel.hasLanguageElement()).toBe(true);
      expect(testTestDataModel.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testTestDataModel.hasLanguage()).toBe(true);
      expect(testTestDataModel.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testTestDataModel.hasText()).toBe(true);
      expect(testTestDataModel.getText()).toEqual(VALID_NARRATIVE);
      expect(testTestDataModel.hasContained()).toBe(true);
      expect(testTestDataModel.getContained()).toEqual([containedPerson]);
      expect(testTestDataModel.hasExtension()).toBe(true);
      expect(testTestDataModel.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testTestDataModel.hasModifierExtension()).toBe(true);
      expect(testTestDataModel.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // TestDataModel properties
      expect(testTestDataModel.hasChoice01()).toBe(true);
      expect(testTestDataModel.getChoice01()).toEqual(choice01);
      expect(testTestDataModel.hasOpen01()).toBe(true);
      expect(testTestDataModel.getOpen01()).toEqual(open01);
      expect(testTestDataModel.hasResource01()).toBe(true);
      expect(testTestDataModel.getResource01()).toEqual(TestData.SIMPLE_PERSON_MODEL_2);
      expect(testTestDataModel.hasBackbonePrimitive0x()).toBe(true);
      expect(testTestDataModel.getBackbonePrimitive0x()).toEqual([testTestDataModelPrimitiveComponent]);
      expect(testTestDataModel.hasBackboneComplex01()).toBe(true);
      expect(testTestDataModel.getBackboneComplex01()).toEqual(testTestDataModelComplexComponent);

      expect(testTestDataModel.toJSON()).toEqual(VALID_JSON);
    });

    it('should return TestDataModel for valid json', () => {
      const testTestDataModel: TestDataModel | undefined = TestDataModel.parse(VALID_JSON);

      expect(testTestDataModel).toBeDefined();
      expect(testTestDataModel).toBeInstanceOf(TestDataModel);
      expect(testTestDataModel).toBeInstanceOf(DomainResource);
      expect(testTestDataModel).toBeInstanceOf(Resource);
      expect(testTestDataModel).toBeInstanceOf(Base);
      expect(testTestDataModel?.constructor.name).toStrictEqual('TestDataModel');
      expect(testTestDataModel?.resourceType()).toStrictEqual('Basic');
      expect(testTestDataModel?.fhirType()).toStrictEqual('TestDataModel');
      expect(testTestDataModel?.isEmpty()).toBe(false);
      expect(testTestDataModel?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    it('should throw InvalidTypeError for setChoice01()', () => {
      const testTestDataModel = new TestDataModel();
      const t = () => {
        testTestDataModel.setChoice01(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ChoiceDataTypes decorator on setChoice01 (TestDataModel.choice01[x]) expects the 'value' argument type (string) to be a supported DataType`,
      );
    });

    it('should throw InvalidTypeError for setOpen01()', () => {
      const testTestDataModel = new TestDataModel();
      const t = () => {
        testTestDataModel.setOpen01(VALID_NARRATIVE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `OpenDataTypes decorator on setOpen01 (TestDataModel.open01[x]) expects the 'value' argument type (Narrative) to be a supported DataType`,
      );
    });

    it('should throw InvalidTypeError for setResource01()', () => {
      const testTestDataModel = new TestDataModel();
      const t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModel.setResource01(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid TestDataModel.resource01; Provided element is not an instance of Resource.`);
    });

    it('should throw InvalidTypeError for setBackbonePrimitive0x()', () => {
      const testTestDataModel = new TestDataModel();
      const t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModel.setBackbonePrimitive0x([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid TestDataModel.backbonePrimitive0x; Provided value array has an element that is not an instance of TestDataModelPrimitiveComponent.`,
      );
    });

    it('should throw InvalidTypeError for addBackbonePrimitive0x()', () => {
      const testTestDataModel = new TestDataModel();
      const t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModel.addBackbonePrimitive0x(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid TestDataModel.backbonePrimitive0x; Provided element is not an instance of TestDataModelPrimitiveComponent.`,
      );
    });

    it('should throw InvalidTypeError for setBackboneComplex01()', () => {
      const testTestDataModel = new TestDataModel();
      const t = () => {
        // @ts-expect-error: allow for testing
        testTestDataModel.setBackboneComplex01(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid TestDataModel.backboneComplex01; Provided element is not an instance of TestDataModelComplexComponent.`,
      );
    });
  });
});
