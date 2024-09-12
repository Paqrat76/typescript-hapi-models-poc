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
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
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
import { MockFhirModel } from '../test-utils';

describe('Group Suite', () => {
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
  const UNSUPPORTED_ENUM_CODE = 'unsupporedEnumCode';
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

  describe('Group', () => {
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

    it('should properly initial property arrays when adding elements', () => {
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

  describe('GroupCharacteristicComponent', () => {
    it('should be properly instantiated as empty', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(true);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(false);
      expect(testGroupCharacteristicComponent.getCode()).toBeNull();
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
      expect(testGroupCharacteristicComponent.getValue()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueQuantity()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueRange()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueReference()).toBeNull();

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(false);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toBeNull();
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(false);
      expect(testGroupCharacteristicComponent.getExclude()).toBeNull();
    });

    it('should properly copy()', () => {
      const groupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );
      groupCharacteristicComponent.setPeriod(VALID_PERIOD_1);
      let testGroupCharacteristicComponent = groupCharacteristicComponent.copy();

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setCode(null);
      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setValue(null);
      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setExcludeElement(null);
      groupCharacteristicComponent.setPeriod(UNDEFINED_VALUE);
      // NOTE: code, value, and exclude should not change with reassignment to null
      testGroupCharacteristicComponent = groupCharacteristicComponent.copy();

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setExclude(null);
      testGroupCharacteristicComponent = groupCharacteristicComponent.copy();

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    describe('Group.characteristic.value[x] Elements', () => {
      it('should be properly instantiated as null value[x] type', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueBooleanType()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueQuantity()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueRange()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueReference()).toBeNull();
      });

      it('should throw InvalidTypeError when instantiated with an invalid value[x] type', () => {
        const mockModel = new MockFhirModel();
        const t = () => {
          // @ts-expect-error: allow non-boolean to test error handling
          new GroupCharacteristicComponent(null, mockModel, null);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`Invalid DataType for Group.characteristic.value[x]: ${mockModel.fhirType()}`);
      });

      it('should properly handle value[x] as CodeableConcept', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_CODEABLECONCEPT_1);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toMatchObject(VALID_CODEABLECONCEPT_1);
        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toMatchObject(VALID_CODEABLECONCEPT_1);

        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );
      });

      it('should properly handle value[x] as BooleanType', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueBooleanType()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_BOOLEAN_TYPE);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toMatchObject(VALID_BOOLEAN_TYPE);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(VALID_BOOLEAN_TYPE);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );
      });

      it('should properly handle value[x] as Quantity', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueQuantity()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_QUANTITY);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toMatchObject(VALID_QUANTITY);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueQuantity()).toMatchObject(VALID_QUANTITY);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_QUANTITY.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_QUANTITY.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_QUANTITY.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_QUANTITY.fhirType()}`,
        );
      });

      it('should properly handle value[x] as Range', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueRange()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_RANGE);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toMatchObject(VALID_RANGE);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueRange()).toMatchObject(VALID_RANGE);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_RANGE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_RANGE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_RANGE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_RANGE.fhirType()}`,
        );
      });

      it('should properly handle value[x] as Reference', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueReference()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_REFERENCE_VALUE_1);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toMatchObject(VALID_REFERENCE_VALUE_1);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueReference()).toMatchObject(VALID_REFERENCE_VALUE_1);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );
      });
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying primitive properties with primitive values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_1);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setExclude(VALID_BOOLEAN_TRUE);
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_2);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setExclude(VALID_BOOLEAN_FALSE);
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_2);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });

    it('should throw PrimitiveTypeError when instantiated with non-boolean value', () => {
      const t = () => {
        // @ts-expect-error: allow non-boolean to test error handling
        new GroupCharacteristicComponent(null, null, INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid GroupCharacteristicComponent.exclude parameter (${INVALID_BOOLEAN})`);
    });

    it('should throw PrimitiveTypeError when setExclude() with non-boolean value', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        // @ts-expect-error: allow non-boolean to test error handling
        testGroupCharacteristicComponent.setExclude(INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid GroupCharacteristicComponent.exclude (${INVALID_BOOLEAN})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        new BooleanType(VALID_BOOLEAN_TRUE),
      );

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying primitive properties with PrimitiveType values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_1);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setExcludeElement(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(
        new BooleanType(VALID_BOOLEAN_FALSE),
      );
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_2);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setExcludeElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toMatchObject(VALID_CODEABLECONCEPT_2);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toMatchObject(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });
  });

  describe('GroupMemberComponent', () => {
    it('should be properly instantiated as empty', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent.isEmpty()).toBe(true);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(false);
      expect(testGroupMemberComponent.getEntity()).toBeNull();
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should be properly instantiated', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const groupMemberComponent = new GroupMemberComponent(null);
      groupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      groupMemberComponent.setPeriod(VALID_PERIOD);
      groupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));
      let testGroupMemberComponent = groupMemberComponent.copy();

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // @ts-expect-error: allow for test - verify null will result in no change to entity!
      groupMemberComponent.setEntity(null);
      groupMemberComponent.setPeriod(UNDEFINED_VALUE);
      groupMemberComponent.setInactiveElement(UNDEFINED_VALUE);
      testGroupMemberComponent = groupMemberComponent.copy();

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3); // no change from null arg
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();

      groupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      groupMemberComponent.setPeriod(VALID_PERIOD);
      groupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));

      testGroupMemberComponent = groupMemberComponent.copy();

      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      groupMemberComponent.setInactive(UNDEFINED_VALUE);
      testGroupMemberComponent = groupMemberComponent.copy();

      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_TRUE);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_TRUE);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(VALID_PERIOD_2);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_FALSE);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD_2);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });

    it('should throw InvalidTypeError when setEntity() with invalid reference type', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      const t = () => {
        testGroupMemberComponent.setEntity(INVALID_REFERENCE_VALUE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`setEntity: 'value' argument (${INVALID_REFERENCE}) is not for a valid resource type`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying all properties with PrimitiveType values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(VALID_PERIOD_2);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_FALSE));

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD_2);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });
  });
});
