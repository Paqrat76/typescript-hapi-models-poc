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

import { Group, GroupCharacteristicComponent, GroupMemberComponent } from '@src/fhir-models/Group';
import { Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Base } from '@src/fhir-core/base-models/Base';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { GroupTypeEnum } from '@src/fhir-models/code-systems/GroupTypeEnum';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('Group', () => {
  const VALID_STRING_1 = 'This is a valid string.';
  const VALID_CODEABLECONCEPT_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_1.setText(VALID_STRING_1);
  const VALID_STRING_2 = 'This is another valid string.';
  const VALID_CODEABLECONCEPT_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_2.setText(VALID_STRING_2);

  const VALID_BOOLEAN_TRUE = true;
  const VALID_BOOLEAN_FALSE = false;
  const INVALID_BOOLEAN = 'invalidBoolean';
  const VALID_BOOLEAN_TYPE = new BooleanType(VALID_BOOLEAN_TRUE);

  const VALID_START_DATETIME_1 = `2017-01-01T00:00:00.000Z`;
  const VALID_END_DATETIME_1 = `2017-01-01T01:00:00.000Z`;
  const VALID_PERIOD_1 = new Period();
  VALID_PERIOD_1.setStart(VALID_START_DATETIME_1);
  VALID_PERIOD_1.setEnd(VALID_END_DATETIME_1);
  const VALID_START_DATETIME_2 = `2017-01-01T00:15:00.000Z`;
  const VALID_END_DATETIME_2 = `2017-01-01T01:15:00.000Z`;
  const VALID_PERIOD_2 = new Period();
  VALID_PERIOD_2.setStart(VALID_START_DATETIME_2);
  VALID_PERIOD_2.setEnd(VALID_END_DATETIME_2);

  const VALID_DECIMAL_1 = 13.579;
  const VALID_QUANTITY = new Quantity();
  VALID_QUANTITY.setValue(VALID_DECIMAL_1);

  const SIMPLE_QUANTITY_1 = new SimpleQuantity();
  SIMPLE_QUANTITY_1.setValue(VALID_DECIMAL_1);

  const VALID_DECIMAL_2 = 24.68;
  const SIMPLE_QUANTITY_2 = new SimpleQuantity();
  SIMPLE_QUANTITY_2.setValue(VALID_DECIMAL_2);

  const VALID_RANGE = new Range();
  VALID_RANGE.setLow(SIMPLE_QUANTITY_1);
  VALID_RANGE.setHigh(SIMPLE_QUANTITY_2);

  const VALID_REFERENCE_1 = 'Organization/13579';
  const VALID_REFERENCE_VALUE_1 = new Reference();
  VALID_REFERENCE_VALUE_1.setReference(VALID_REFERENCE_1);

  const VALID_REFERENCE_2 = 'Organization/24680';
  const VALID_REFERENCE_VALUE_2 = new Reference();
  VALID_REFERENCE_VALUE_2.setReference(VALID_REFERENCE_2);

  const VALID_REFERENCE_3 = 'Patient/98765';
  const VALID_REFERENCE_VALUE_3 = new Reference();
  VALID_REFERENCE_VALUE_3.setReference(VALID_REFERENCE_3);

  const INVALID_REFERENCE = 'Location/98765';
  const INVALID_REFERENCE_VALUE = new Reference();
  INVALID_REFERENCE_VALUE.setReference(INVALID_REFERENCE);

  const VALID_START_DATETIME = `2017-01-01T00:00:00.000Z`;
  const VALID_END_DATETIME = `2017-01-01T01:00:00.000Z`;
  const VALID_PERIOD = new Period();
  VALID_PERIOD.setStart(VALID_START_DATETIME);
  VALID_PERIOD.setEnd(VALID_END_DATETIME);

  const VALID_CODE_PERSON = `person`;
  const VALID_CODE_PERSON_TYPE = new CodeType(VALID_CODE_PERSON);
  const VALID_CODE_DEVICE = `device`;
  const VALID_CODE_DEVICE_TYPE = new CodeType(VALID_CODE_DEVICE);
  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const UNDEFINED_ENUM_CODE_VALUE = `undefined`;
  const INVALID_CODE = ' invalid CodeType ';

  const VALID_IDENTIFIER_1 = new Identifier();
  VALID_IDENTIFIER_1.setValue(VALID_STRING_1);
  const VALID_IDENTIFIER_2 = new Identifier();
  VALID_IDENTIFIER_2.setValue(VALID_STRING_2);

  const VALID_UNSIGNED_INT_1 = 13;
  const VALID_UNSIGNED_INT_2 = 15;
  const INVALID_UNSIGNED_INT = -1;

  const INVALID_STRING = '';
  const UNDEFINED_VALUE = undefined;

  let groupTypeEnum: GroupTypeEnum;
  beforeAll(() => {
    groupTypeEnum = new GroupTypeEnum();
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testGroup = new Group(null, null);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(true);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toMatchObject([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();
      expect(testGroup.hasTypeEnumType()).toBe(false);
      expect(testGroup.getTypeEnumType()).toBeNull();
      expect(testGroup.hasTypeElement()).toBe(false);
      expect(testGroup.getTypeElement()).toBeNull();
      expect(testGroup.hasType()).toBe(false);
      expect(testGroup.getType()).toBeNull();
      expect(testGroup.hasActualElement()).toBe(false);
      expect(testGroup.getActualElement()).toBeNull();
      expect(testGroup.hasActual()).toBe(false);
      expect(testGroup.getActual()).toBeNull();
      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toMatchObject(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toMatchObject(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toMatchObject([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toMatchObject([] as GroupMemberComponent[]);
    });

    it('should properly copy() undefined values', () => {
      const group = new Group(null, null);
      group.setIdentifier([VALID_IDENTIFIER_1]);
      group.setActive(VALID_BOOLEAN_TRUE);
      group.setType(VALID_CODE_PERSON);
      group.setActual(VALID_BOOLEAN_TRUE);
      group.setCode(VALID_CODEABLECONCEPT_1);
      group.setName(VALID_STRING_1);
      group.setQuantity(VALID_UNSIGNED_INT_1);
      group.setManagingEntity(VALID_REFERENCE_VALUE_1);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );
      group.setCharacteristic([groupCharacteristicComponent1]);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      group.setMember([testGroupMemberComponent1]);

      let testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1]);

      group.setIdentifier(UNDEFINED_VALUE);
      group.setActive(UNDEFINED_VALUE);
      // @ts-expect-error: allow null for testing
      group.setType(null);
      // @ts-expect-error: allow null for testing
      group.setActual(null);
      group.setCode(UNDEFINED_VALUE);
      group.setName(UNDEFINED_VALUE);
      group.setQuantity(UNDEFINED_VALUE);
      group.setManagingEntity(UNDEFINED_VALUE);
      group.setCharacteristic(UNDEFINED_VALUE);
      group.setMember(UNDEFINED_VALUE);

      testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toMatchObject([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();

      // Setting type to null from setter results in no change
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      // Setting actual to null from setter results in no change
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);

      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toMatchObject(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toMatchObject(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toMatchObject([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toMatchObject([] as GroupMemberComponent[]);
    });

    it('should properly initialize property arrays when adding elements', () => {
      const testGroup = new Group(null, null);

      testGroup.addIdentifier(VALID_IDENTIFIER_1);
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1]);

      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );
      testGroup.addCharacteristic(groupCharacteristicComponent1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([groupCharacteristicComponent1]);

      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroup.addMember(testGroupMemberComponent1);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1]);
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testGroup = new Group(VALID_CODE_PERSON, VALID_BOOLEAN_TRUE);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toMatchObject([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(false);
      expect(testGroup.getCode()).toMatchObject(new CodeableConcept());
      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toMatchObject(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toMatchObject(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toMatchObject([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toMatchObject([] as GroupMemberComponent[]);
    });

    it('should properly copy() using primitive values', () => {
      const group = new Group(null, null);
      group.setIdentifier([VALID_IDENTIFIER_1]);
      group.setActive(VALID_BOOLEAN_TRUE);
      group.setType(VALID_CODE_PERSON);
      group.setActual(VALID_BOOLEAN_TRUE);
      group.setCode(VALID_CODEABLECONCEPT_1);
      group.setName(VALID_STRING_1);
      group.setQuantity(VALID_UNSIGNED_INT_1);
      group.setManagingEntity(VALID_REFERENCE_VALUE_1);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );
      group.setCharacteristic([groupCharacteristicComponent1]);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      group.setMember([testGroupMemberComponent1]);

      let testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1]);

      group.addIdentifier(VALID_IDENTIFIER_2);
      group.setActive(VALID_BOOLEAN_FALSE);
      group.setType(VALID_CODE_DEVICE);
      group.setActual(VALID_BOOLEAN_FALSE);
      group.setCode(VALID_CODEABLECONCEPT_2);
      group.setName(VALID_STRING_2);
      group.setQuantity(VALID_UNSIGNED_INT_2);
      group.setManagingEntity(VALID_REFERENCE_VALUE_2);
      const groupCharacteristicComponent2 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_2,
        new BooleanType(VALID_BOOLEAN_TRUE),
        VALID_BOOLEAN_FALSE,
      );
      group.addCharacteristic(groupCharacteristicComponent2);
      const testGroupMemberComponent2 = new GroupMemberComponent(VALID_REFERENCE_VALUE_2);
      group.addMember(testGroupMemberComponent2);

      testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1, VALID_IDENTIFIER_2]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_2);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_2));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_2);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_2);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([
        groupCharacteristicComponent1,
        groupCharacteristicComponent2,
      ]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1, testGroupMemberComponent2]);
    });

    it('should throw InvalidCodeError when instantiated with invalid primitive values', () => {
      let t = () => {
        new Group(UNSUPPORTED_ENUM_CODE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type parameter: Unknown GroupTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        new Group(UNDEFINED_ENUM_CODE_VALUE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(
        `Invalid Group.type parameter: Unknown GroupTypeEnum 'code' value '${UNDEFINED_ENUM_CODE_VALUE}'`,
      );

      t = () => {
        new Group(INVALID_CODE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type parameter (${INVALID_CODE})`);

      t = () => {
        // @ts-expect-error: allow for testing
        new Group(null, INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.actual parameter (${INVALID_BOOLEAN})`);
    });

    // Tests using DataType elements

    it('should be properly initialized by PrimitiveType values', () => {
      const testGroup = new Group(VALID_CODE_PERSON_TYPE, VALID_BOOLEAN_TYPE);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toMatchObject([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toMatchObject(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasCode()).toBe(false);
      expect(testGroup.getCode()).toMatchObject(new CodeableConcept());
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toMatchObject(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toMatchObject([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toMatchObject([] as GroupMemberComponent[]);
    });

    it('should be properly initialized by EnumCodeType and PrimitiveType values', () => {
      const VALID_GROUP_ENUM_TYPE = new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum);
      const testGroup = new Group(VALID_GROUP_ENUM_TYPE, VALID_BOOLEAN_TYPE);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toMatchObject([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toMatchObject(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasCode()).toBe(false);
      expect(testGroup.getCode()).toMatchObject(new CodeableConcept());
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toMatchObject(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toMatchObject([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toMatchObject([] as GroupMemberComponent[]);
    });

    it('should properly copy() using PrimitiveType values', () => {
      const group = new Group(null, null);
      group.setIdentifier([VALID_IDENTIFIER_1]);
      group.setActiveElement(new BooleanType(VALID_BOOLEAN_TRUE));
      group.setTypeElement(VALID_CODE_PERSON_TYPE);
      group.setActualElement(new BooleanType(VALID_BOOLEAN_TRUE));
      group.setCode(VALID_CODEABLECONCEPT_1);
      group.setNameElement(new StringType(VALID_STRING_1));
      group.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      group.setManagingEntity(VALID_REFERENCE_VALUE_1);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        new BooleanType(VALID_BOOLEAN_TRUE),
      );
      group.setCharacteristic([groupCharacteristicComponent1]);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      group.setMember([testGroupMemberComponent1]);

      let testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1]);

      group.addIdentifier(VALID_IDENTIFIER_2);
      group.setActiveElement(new BooleanType(VALID_BOOLEAN_FALSE));
      group.setTypeElement(VALID_CODE_DEVICE_TYPE);
      group.setActualElement(new BooleanType(VALID_BOOLEAN_FALSE));
      group.setCode(VALID_CODEABLECONCEPT_2);
      group.setNameElement(new StringType(VALID_STRING_2));
      group.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      group.setManagingEntity(VALID_REFERENCE_VALUE_2);
      const groupCharacteristicComponent2 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_2,
        new BooleanType(VALID_BOOLEAN_TRUE),
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      group.addCharacteristic(groupCharacteristicComponent2);
      const testGroupMemberComponent2 = new GroupMemberComponent(VALID_REFERENCE_VALUE_2);
      group.addMember(testGroupMemberComponent2);

      testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1, VALID_IDENTIFIER_2]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_2);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_2));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_2);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_2);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([
        groupCharacteristicComponent1,
        groupCharacteristicComponent2,
      ]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1, testGroupMemberComponent2]);
    });

    it('should properly copy() using EnumCodeType and PrimitiveType values', () => {
      const VALID_GROUP_ENUM_TYPE_1 = new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum);
      const VALID_GROUP_ENUM_TYPE_2 = new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum);

      const group = new Group(null, null);
      group.setIdentifier([VALID_IDENTIFIER_1]);
      group.setActiveElement(new BooleanType(VALID_BOOLEAN_TRUE));
      group.setTypeEnumType(VALID_GROUP_ENUM_TYPE_1);
      group.setActualElement(new BooleanType(VALID_BOOLEAN_TRUE));
      group.setCode(VALID_CODEABLECONCEPT_1);
      group.setNameElement(new StringType(VALID_STRING_1));
      group.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      group.setManagingEntity(VALID_REFERENCE_VALUE_1);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        new BooleanType(VALID_BOOLEAN_TRUE),
      );
      group.setCharacteristic([groupCharacteristicComponent1]);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      group.setMember([testGroupMemberComponent1]);

      let testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(VALID_GROUP_ENUM_TYPE_1);
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1]);

      group.addIdentifier(VALID_IDENTIFIER_2);
      group.setActiveElement(new BooleanType(VALID_BOOLEAN_FALSE));
      group.setTypeEnumType(VALID_GROUP_ENUM_TYPE_2);
      group.setActualElement(new BooleanType(VALID_BOOLEAN_FALSE));
      group.setCode(VALID_CODEABLECONCEPT_2);
      group.setNameElement(new StringType(VALID_STRING_2));
      group.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      group.setManagingEntity(VALID_REFERENCE_VALUE_2);
      const groupCharacteristicComponent2 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_2,
        new BooleanType(VALID_BOOLEAN_TRUE),
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      group.addCharacteristic(groupCharacteristicComponent2);
      const testGroupMemberComponent2 = new GroupMemberComponent(VALID_REFERENCE_VALUE_2);
      group.addMember(testGroupMemberComponent2);

      testGroup = group.copy();

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toMatchObject(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toMatchObject(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toMatchObject(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toMatchObject(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();

      // inherited properties from DomainResource
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toMatchObject(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toMatchObject([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toMatchObject([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toMatchObject([VALID_IDENTIFIER_1, VALID_IDENTIFIER_2]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toMatchObject(VALID_GROUP_ENUM_TYPE_2);
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toMatchObject(VALID_CODEABLECONCEPT_2);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toMatchObject(new StringType(VALID_STRING_2));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_2);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toMatchObject(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toMatchObject(VALID_REFERENCE_VALUE_2);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toMatchObject([
        groupCharacteristicComponent1,
        groupCharacteristicComponent2,
      ]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toMatchObject([testGroupMemberComponent1, testGroupMemberComponent2]);
    });

    it('should throw PrimitiveTypeError when setters invoked with invalid primitive values', () => {
      const group = new Group(null, null);
      let t = () => {
        // @ts-expect-error: allow for testing
        group.setActive(INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.active (${String(INVALID_BOOLEAN)})`);

      t = () => {
        // @ts-expect-error: allow for testing
        group.setActual(INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.actual (${String(INVALID_BOOLEAN)})`);

      t = () => {
        group.setName(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.name (${INVALID_STRING})`);

      t = () => {
        group.setQuantity(INVALID_UNSIGNED_INT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.quantity (${String(INVALID_UNSIGNED_INT)})`);
    });

    it('should throw InvalidTypeError when setManagingEntity() with invalid reference type', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        testGroup.setManagingEntity(INVALID_REFERENCE_VALUE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`setManagingEntity: 'value' argument (${INVALID_REFERENCE}) is not for a valid resource type`);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for Group.setIdentifier()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidIdentifier = new Period();
        // @ts-expect-error: allow for testing
        testGroup.setIdentifier([VALID_IDENTIFIER_1, invalidIdentifier]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setIdentifier(): At least one provided array item is not an instance of Identifier.`);
    });

    it('should throw InvalidTypeError for Group.addIdentifier()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidIdentifier = new Period();
        // @ts-expect-error: allow for testing
        testGroup.addIdentifier(invalidIdentifier);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.addIdentifier(): The provided argument is not an instance of Identifier.`);
    });

    it('should throw InvalidTypeError for Group.setActiveElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidBooleanType = new StringType();
        // @ts-expect-error: allow for testing
        testGroup.setActiveElement(invalidBooleanType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setActiveElement(): The provided argument is not an instance of BooleanType.`);
    });

    it('should throw InvalidTypeError for Group.setTypeEnumType()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidEnumCodeType = new StringType();
        // @ts-expect-error: allow for testing
        testGroup.setTypeEnumType(invalidEnumCodeType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setTypeEnumType(): Provided type is not an instance of EnumCodeType.`);
    });

    it('should throw InvalidTypeError for Group.setTypeElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidEnumCodeType = new StringType();
        // @ts-expect-error: allow for testing
        testGroup.setTypeElement(invalidEnumCodeType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setTypeElement(): The provided argument is not an instance of CodeType.`);
    });

    it('should throw InvalidTypeError for Group.setActualElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidBooleanType = new StringType();
        // @ts-expect-error: allow for testing
        testGroup.setActualElement(invalidBooleanType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setActualElement(): The provided argument is not an instance of BooleanType.`);
    });

    it('should throw InvalidTypeError for Group.setCode()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidCodeableConcept = new StringType();
        // @ts-expect-error: allow for testing
        testGroup.setCode(invalidCodeableConcept);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setCode(): The provided argument is not an instance of CodeableConcept.`);
    });

    it('should throw InvalidTypeError for Group.setNameElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidStringType = new BooleanType();
        // @ts-expect-error: allow for testing
        testGroup.setNameElement(invalidStringType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setNameElement(): The provided argument is not an instance of StringType.`);
    });

    it('should throw InvalidTypeError for Group.setQuantityElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidUnsignedIntType = new StringType();
        // @ts-expect-error: allow for testing
        testGroup.setQuantityElement(invalidUnsignedIntType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.setQuantityElement(): The provided argument is not an instance of UnsignedIntType.`);
    });

    it('should throw InvalidTypeError for Group.setCharacteristic()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const validGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        const invalidGroupCharacteristicComponent = new Period();
        // @ts-expect-error: allow for testing
        testGroup.setCharacteristic([validGroupCharacteristicComponent, invalidGroupCharacteristicComponent]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Group.setCharacteristic(): At least one provided array item is not an instance of GroupCharacteristicComponent.`,
      );
    });

    it('should throw InvalidTypeError for Group.addCharacteristic()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidGroupCharacteristicComponent = new Period();
        // @ts-expect-error: allow for testing
        testGroup.addCharacteristic(invalidGroupCharacteristicComponent);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Group.addCharacteristic(): The provided argument is not an instance of GroupCharacteristicComponent.`,
      );
    });

    it('should throw InvalidTypeError for Group.setMember()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const validGroupMemberComponent = new GroupMemberComponent(null);
        const invalidGroupMemberComponent = new Period();
        // @ts-expect-error: allow for testing
        testGroup.setMember([validGroupMemberComponent, invalidGroupMemberComponent]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Group.setMember(): At least one provided array item is not an instance of GroupMemberComponent.`,
      );
    });

    it('should throw InvalidTypeError for Group.addMember()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        const invalidGroupMemberComponent = new Period();
        // @ts-expect-error: allow for testing
        testGroup.addMember(invalidGroupMemberComponent);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Group.addMember(): The provided argument is not an instance of GroupMemberComponent.`);
    });
  });
});
