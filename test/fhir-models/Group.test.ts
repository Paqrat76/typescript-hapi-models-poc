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
import { Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity, SimpleQuantity } from '@src/fhir-core/data-types/complex/Quantity-variations';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { GroupTypeEnum } from '@src/fhir-models/code-systems/GroupTypeEnum';
import { Group, GroupCharacteristicComponent, GroupMemberComponent } from '@src/fhir-models/Group';
import { PractitionerRole } from '@src/fhir-models/PractitionerRole';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  IMPLICIT_RULES_VALUE,
  IMPLICIT_RULES_VALUE_2,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  INVALID_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  LANGUAGE_VALUE,
  LANGUAGE_VALUE_2,
  MockCodeEnum,
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

  const VALID_REFERENCE_1 = 'Practitioner/13579';
  const VALID_REFERENCE_VALUE_1 = new Reference();
  VALID_REFERENCE_VALUE_1.setReference(VALID_REFERENCE_1);

  const VALID_REFERENCE_2 = 'Practitioner/24680';
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

  const VALID_CONTAINED = new PractitionerRole();
  VALID_CONTAINED.setId('#P1');
  VALID_CONTAINED.setActive(false);
  VALID_CONTAINED.addIdentifier(VALID_IDENTIFIER_1);
  VALID_CONTAINED.setPractitioner(VALID_REFERENCE_VALUE_1);

  const VALID_CONTAINED_2 = new PractitionerRole();
  VALID_CONTAINED_2.setId('#P2');
  VALID_CONTAINED_2.setActive(true);
  VALID_CONTAINED_2.addIdentifier(VALID_IDENTIFIER_2);
  VALID_CONTAINED_2.setPractitioner(VALID_REFERENCE_VALUE_2);

  const VALID_UNSIGNED_INT_1 = 13;
  const VALID_UNSIGNED_INT_2 = 15;

  let groupTypeEnum: GroupTypeEnum;
  let inValidTypeEnum: MockCodeEnum;
  beforeAll(() => {
    groupTypeEnum = new GroupTypeEnum();
    inValidTypeEnum = new MockCodeEnum();
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
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(true);
      const t = () => {
        testGroup.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Group.type, Group.actual`);

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toEqual(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toEqual(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toEqual(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toEqual([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toEqual([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toEqual([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toEqual([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType());
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
      expect(testGroup.getNameElement()).toEqual(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toEqual(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toEqual([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toEqual([] as GroupMemberComponent[]);
    });

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
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toEqual(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toEqual(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toEqual(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toEqual([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toEqual([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toEqual([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toEqual([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(false);
      expect(testGroup.getCode()).toEqual(new CodeableConcept());
      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toEqual(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toEqual(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toEqual([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toEqual([] as GroupMemberComponent[]);
    });

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
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toEqual(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toEqual(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toEqual(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toEqual([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toEqual([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toEqual([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toEqual([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toEqual(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasCode()).toBe(false);
      expect(testGroup.getCode()).toEqual(new CodeableConcept());
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toEqual(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toEqual([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toEqual([] as GroupMemberComponent[]);
    });

    it('should properly copy()', () => {
      const group = new Group(null, null);

      group.setId(VALID_ID);
      group.setMeta(VALID_META);
      group.setImplicitRules(IMPLICIT_RULES_VALUE);
      group.setLanguage(LANGUAGE_VALUE);
      group.setText(VALID_NARRATIVE);
      group.setContained([VALID_CONTAINED]);
      group.setExtension([VALID_EXTENSION]);
      group.setModifierExtension([VALID_MODIFIER_EXTENSION]);

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
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(true);
      expect(testGroup.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testGroup.hasId()).toBe(true);
      expect(testGroup.getId()).toStrictEqual(VALID_ID);
      expect(testGroup.hasMeta()).toBe(true);
      expect(testGroup.getMeta()).toEqual(VALID_META);
      expect(testGroup.hasImplicitRulesElement()).toBe(true);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testGroup.hasImplicitRules()).toBe(true);
      expect(testGroup.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testGroup.hasLanguageElement()).toBe(true);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testGroup.hasLanguage()).toBe(true);
      expect(testGroup.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testGroup.hasText()).toBe(true);
      expect(testGroup.getText()).toEqual(VALID_NARRATIVE);
      expect(testGroup.hasContained()).toBe(true);
      expect(testGroup.getContained()).toEqual([VALID_CONTAINED]);
      expect(testGroup.hasExtension()).toBe(true);
      expect(testGroup.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroup.hasModifierExtension()).toBe(true);
      expect(testGroup.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toEqual(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent1]);

      // Reset to undefined

      group.setId(UNDEFINED_VALUE);
      group.setMeta(UNDEFINED_VALUE);
      group.setImplicitRules(UNDEFINED_VALUE);
      group.setLanguage(UNDEFINED_VALUE);
      group.setText(UNDEFINED_VALUE);
      group.setContained(UNDEFINED_VALUE);
      group.setExtension(UNDEFINED_VALUE);
      group.setModifierExtension(UNDEFINED_VALUE);

      group.setIdentifier(UNDEFINED_VALUE);
      group.setActive(UNDEFINED_VALUE);
      // Setting to null or undefined results in an AssertionError because this field is required
      // group.setType(null);
      // Setting to null or undefined results in an AssertionError because this field is required
      // group.setActual(null);
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
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      // Setting to null from setter results in no change
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toEqual(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toEqual(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toEqual(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toEqual([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toEqual([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toEqual([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toEqual([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();

      // Setting type to null from setter results in no change
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);

      // Setting actual to null from setter results in no change
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);

      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toEqual(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toEqual(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toEqual([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toEqual([] as GroupMemberComponent[]);
    });

    it('should properly initialize property arrays when adding elements', () => {
      const testGroup = new Group(null, null);

      testGroup.addIdentifier(VALID_IDENTIFIER_1);
      testGroup.addIdentifier(VALID_IDENTIFIER_2);
      testGroup.addIdentifier(UNDEFINED_VALUE);
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toHaveLength(2);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_1, VALID_IDENTIFIER_2]);

      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );
      testGroup.addCharacteristic(groupCharacteristicComponent1);
      const groupCharacteristicComponent2 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_2,
        new BooleanType(VALID_BOOLEAN_TRUE),
        VALID_BOOLEAN_FALSE,
      );
      testGroup.addCharacteristic(groupCharacteristicComponent2);
      testGroup.addCharacteristic(UNDEFINED_VALUE);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toHaveLength(2);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent1, groupCharacteristicComponent2]);

      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroup.addMember(testGroupMemberComponent1);
      const testGroupMemberComponent2 = new GroupMemberComponent(VALID_REFERENCE_VALUE_2);
      testGroup.addMember(testGroupMemberComponent2);
      testGroup.addMember(UNDEFINED_VALUE);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toHaveLength(2);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent1, testGroupMemberComponent2]);
    });

    it('should be properly reset by modifying all properties with primitives', () => {
      const testGroup = new Group(null, null);

      testGroup.setId(VALID_ID);
      testGroup.setMeta(VALID_META);
      testGroup.setImplicitRules(IMPLICIT_RULES_VALUE);
      testGroup.setLanguage(LANGUAGE_VALUE);
      testGroup.setText(VALID_NARRATIVE);
      testGroup.setContained([VALID_CONTAINED]);
      testGroup.setExtension([VALID_EXTENSION]);
      testGroup.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testGroup.setIdentifier([VALID_IDENTIFIER_1]);
      testGroup.setActive(VALID_BOOLEAN_TRUE);
      testGroup.setType(VALID_CODE_PERSON);
      testGroup.setActual(VALID_BOOLEAN_TRUE);
      testGroup.setCode(VALID_CODEABLECONCEPT_1);
      testGroup.setName(VALID_STRING_1);
      testGroup.setQuantity(VALID_UNSIGNED_INT_1);
      testGroup.setManagingEntity(VALID_REFERENCE_VALUE_1);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_TRUE),
        VALID_BOOLEAN_TRUE,
      );
      testGroup.setCharacteristic([groupCharacteristicComponent1]);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroup.setMember([testGroupMemberComponent1]);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(true);
      expect(testGroup.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testGroup.hasId()).toBe(true);
      expect(testGroup.getId()).toStrictEqual(VALID_ID);
      expect(testGroup.hasMeta()).toBe(true);
      expect(testGroup.getMeta()).toEqual(VALID_META);
      expect(testGroup.hasImplicitRulesElement()).toBe(true);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testGroup.hasImplicitRules()).toBe(true);
      expect(testGroup.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testGroup.hasLanguageElement()).toBe(true);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testGroup.hasLanguage()).toBe(true);
      expect(testGroup.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testGroup.hasText()).toBe(true);
      expect(testGroup.getText()).toEqual(VALID_NARRATIVE);
      expect(testGroup.hasContained()).toBe(true);
      expect(testGroup.getContained()).toEqual([VALID_CONTAINED]);
      expect(testGroup.hasExtension()).toBe(true);
      expect(testGroup.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroup.hasModifierExtension()).toBe(true);
      expect(testGroup.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toEqual(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent1]);

      // Reset

      testGroup.setId(VALID_ID_2);
      testGroup.setMeta(VALID_META_2);
      testGroup.setImplicitRules(IMPLICIT_RULES_VALUE_2);
      testGroup.setLanguage(LANGUAGE_VALUE_2);
      testGroup.setText(VALID_NARRATIVE_2);
      testGroup.setContained([VALID_CONTAINED_2]);
      testGroup.setExtension([VALID_EXTENSION_2]);
      testGroup.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testGroup.setIdentifier([VALID_IDENTIFIER_2]);
      testGroup.setActiveElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroup.setTypeElement(new CodeType(VALID_CODE_DEVICE));
      testGroup.setActualElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroup.setCode(VALID_CODEABLECONCEPT_2);
      testGroup.setNameElement(new StringType(VALID_STRING_2));
      testGroup.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      testGroup.setManagingEntity(VALID_REFERENCE_VALUE_2);
      const groupCharacteristicComponent2 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_2,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_FALSE,
      );
      testGroup.setCharacteristic([groupCharacteristicComponent2]);
      const testGroupMemberComponent2 = new GroupMemberComponent(VALID_REFERENCE_VALUE_2);
      testGroup.setMember([testGroupMemberComponent2]);

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(true);
      expect(testGroup.getIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testGroup.hasId()).toBe(true);
      expect(testGroup.getId()).toStrictEqual(VALID_ID_2);
      expect(testGroup.hasMeta()).toBe(true);
      expect(testGroup.getMeta()).toEqual(VALID_META_2);
      expect(testGroup.hasImplicitRulesElement()).toBe(true);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE_2));
      expect(testGroup.hasImplicitRules()).toBe(true);
      expect(testGroup.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE_2);
      expect(testGroup.hasLanguageElement()).toBe(true);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE_2));
      expect(testGroup.hasLanguage()).toBe(true);
      expect(testGroup.getLanguage()).toStrictEqual(LANGUAGE_VALUE_2);
      expect(testGroup.hasText()).toBe(true);
      expect(testGroup.getText()).toEqual(VALID_NARRATIVE_2);
      expect(testGroup.hasContained()).toBe(true);
      expect(testGroup.getContained()).toEqual([VALID_CONTAINED_2]);
      expect(testGroup.hasExtension()).toBe(true);
      expect(testGroup.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testGroup.hasModifierExtension()).toBe(true);
      expect(testGroup.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_2]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toEqual(VALID_CODEABLECONCEPT_2);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toEqual(new StringType(VALID_STRING_2));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_2);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toEqual(VALID_REFERENCE_VALUE_2);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent2]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent2]);

      // Reset to undefined

      testGroup.setId(UNDEFINED_VALUE);
      testGroup.setMeta(UNDEFINED_VALUE);
      testGroup.setImplicitRules(UNDEFINED_VALUE);
      testGroup.setLanguage(UNDEFINED_VALUE);
      testGroup.setText(UNDEFINED_VALUE);
      testGroup.setContained(UNDEFINED_VALUE);
      testGroup.setExtension(UNDEFINED_VALUE);
      testGroup.setModifierExtension(UNDEFINED_VALUE);

      testGroup.setIdentifier(UNDEFINED_VALUE);
      testGroup.setActive(UNDEFINED_VALUE);
      // Setting to null or undefined results in an AssertionError because this field is required
      // testGroup.setType(null);
      // Setting to null or undefined results in an AssertionError because this field is required
      // testGroup.setActual(null);
      testGroup.setCode(UNDEFINED_VALUE);
      testGroup.setName(UNDEFINED_VALUE);
      testGroup.setQuantity(UNDEFINED_VALUE);
      testGroup.setManagingEntity(UNDEFINED_VALUE);
      testGroup.setCharacteristic(UNDEFINED_VALUE);
      testGroup.setMember(UNDEFINED_VALUE);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      // Setting to null from setter results in no change
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toEqual(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toEqual(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toEqual(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toEqual([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toEqual([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toEqual([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toEqual([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();

      // Setting type to null from setter results in no change
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);

      // Setting actual to null from setter results in no change
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);

      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toEqual(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toEqual(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toEqual([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toEqual([] as GroupMemberComponent[]);
    });

    it('should be properly reset by modifying all properties with DataTypes', () => {
      const testGroup = new Group(null, null);

      testGroup.setIdElement(VALID_ID_TYPE);
      testGroup.setMeta(VALID_META);
      testGroup.setImplicitRulesElement(new UriType(IMPLICIT_RULES_VALUE));
      testGroup.setLanguageElement(new CodeType(LANGUAGE_VALUE));
      testGroup.setText(VALID_NARRATIVE);
      testGroup.setContained([VALID_CONTAINED]);
      testGroup.setExtension([VALID_EXTENSION]);
      testGroup.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testGroup.setIdentifier([VALID_IDENTIFIER_1]);
      testGroup.setActiveElement(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroup.setTypeElement(new CodeType(VALID_CODE_PERSON));
      testGroup.setActualElement(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroup.setCode(VALID_CODEABLECONCEPT_1);
      testGroup.setNameElement(new StringType(VALID_STRING_1));
      testGroup.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      testGroup.setManagingEntity(VALID_REFERENCE_VALUE_1);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_TRUE),
        VALID_BOOLEAN_TRUE,
      );
      testGroup.setCharacteristic([groupCharacteristicComponent1]);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroup.setMember([testGroupMemberComponent1]);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(true);
      expect(testGroup.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testGroup.hasId()).toBe(true);
      expect(testGroup.getId()).toStrictEqual(VALID_ID);
      expect(testGroup.hasMeta()).toBe(true);
      expect(testGroup.getMeta()).toEqual(VALID_META);
      expect(testGroup.hasImplicitRulesElement()).toBe(true);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testGroup.hasImplicitRules()).toBe(true);
      expect(testGroup.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testGroup.hasLanguageElement()).toBe(true);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testGroup.hasLanguage()).toBe(true);
      expect(testGroup.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testGroup.hasText()).toBe(true);
      expect(testGroup.getText()).toEqual(VALID_NARRATIVE);
      expect(testGroup.hasContained()).toBe(true);
      expect(testGroup.getContained()).toEqual([VALID_CONTAINED]);
      expect(testGroup.hasExtension()).toBe(true);
      expect(testGroup.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroup.hasModifierExtension()).toBe(true);
      expect(testGroup.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toEqual(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent1]);

      // Reset

      testGroup.setIdElement(VALID_ID_TYPE_2);
      testGroup.setMeta(VALID_META_2);
      testGroup.setImplicitRulesElement(new UriType(IMPLICIT_RULES_VALUE_2));
      testGroup.setLanguageElement(new CodeType(LANGUAGE_VALUE_2));
      testGroup.setText(VALID_NARRATIVE_2);
      testGroup.setContained([VALID_CONTAINED_2]);
      testGroup.setExtension([VALID_EXTENSION_2]);
      testGroup.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testGroup.setIdentifier([VALID_IDENTIFIER_2]);
      testGroup.setActiveElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroup.setTypeElement(new CodeType(VALID_CODE_DEVICE));
      testGroup.setActualElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroup.setCode(VALID_CODEABLECONCEPT_2);
      testGroup.setNameElement(new StringType(VALID_STRING_2));
      testGroup.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      testGroup.setManagingEntity(VALID_REFERENCE_VALUE_2);
      const groupCharacteristicComponent2 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_2,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_FALSE,
      );
      testGroup.setCharacteristic([groupCharacteristicComponent2]);
      const testGroupMemberComponent2 = new GroupMemberComponent(VALID_REFERENCE_VALUE_2);
      testGroup.setMember([testGroupMemberComponent2]);

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(true);
      expect(testGroup.getIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testGroup.hasId()).toBe(true);
      expect(testGroup.getId()).toStrictEqual(VALID_ID_2);
      expect(testGroup.hasMeta()).toBe(true);
      expect(testGroup.getMeta()).toEqual(VALID_META_2);
      expect(testGroup.hasImplicitRulesElement()).toBe(true);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE_2));
      expect(testGroup.hasImplicitRules()).toBe(true);
      expect(testGroup.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE_2);
      expect(testGroup.hasLanguageElement()).toBe(true);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE_2));
      expect(testGroup.hasLanguage()).toBe(true);
      expect(testGroup.getLanguage()).toStrictEqual(LANGUAGE_VALUE_2);
      expect(testGroup.hasText()).toBe(true);
      expect(testGroup.getText()).toEqual(VALID_NARRATIVE_2);
      expect(testGroup.hasContained()).toBe(true);
      expect(testGroup.getContained()).toEqual([VALID_CONTAINED_2]);
      expect(testGroup.hasExtension()).toBe(true);
      expect(testGroup.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testGroup.hasModifierExtension()).toBe(true);
      expect(testGroup.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_2]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toEqual(VALID_CODEABLECONCEPT_2);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toEqual(new StringType(VALID_STRING_2));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_2);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType(VALID_UNSIGNED_INT_2));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_2);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toEqual(VALID_REFERENCE_VALUE_2);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent2]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent2]);

      // Reset to undefined

      testGroup.setIdElement(UNDEFINED_VALUE);
      testGroup.setMeta(UNDEFINED_VALUE);
      testGroup.setImplicitRulesElement(UNDEFINED_VALUE);
      testGroup.setLanguageElement(UNDEFINED_VALUE);
      testGroup.setText(UNDEFINED_VALUE);
      testGroup.setContained(UNDEFINED_VALUE);
      testGroup.setExtension(UNDEFINED_VALUE);
      testGroup.setModifierExtension(UNDEFINED_VALUE);

      testGroup.setIdentifier(UNDEFINED_VALUE);
      testGroup.setActiveElement(UNDEFINED_VALUE);
      // Setting to null or undefined results in an AssertionError because this field is required
      // testGroup.setTypeElement(null);
      // Setting to null or undefined results in an AssertionError because this field is required
      // testGroup.setActualElement(null);
      testGroup.setCode(UNDEFINED_VALUE);
      testGroup.setNameElement(UNDEFINED_VALUE);
      testGroup.setQuantityElement(UNDEFINED_VALUE);
      testGroup.setManagingEntity(UNDEFINED_VALUE);
      testGroup.setCharacteristic(UNDEFINED_VALUE);
      testGroup.setMember(UNDEFINED_VALUE);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      // Setting to null from setter results in no change
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testGroup.hasIdElement()).toBe(false);
      expect(testGroup.getIdElement()).toEqual(new IdType());
      expect(testGroup.hasId()).toBe(false);
      expect(testGroup.getId()).toBeUndefined();
      expect(testGroup.hasMeta()).toBe(false);
      expect(testGroup.getMeta()).toEqual(new Meta());
      expect(testGroup.hasImplicitRulesElement()).toBe(false);
      expect(testGroup.getImplicitRulesElement()).toEqual(new UriType());
      expect(testGroup.hasImplicitRules()).toBe(false);
      expect(testGroup.getImplicitRules()).toBeUndefined();
      expect(testGroup.hasLanguageElement()).toBe(false);
      expect(testGroup.getLanguageElement()).toEqual(new CodeType());
      expect(testGroup.hasLanguage()).toBe(false);
      expect(testGroup.getLanguage()).toBeUndefined();
      expect(testGroup.hasText()).toBe(false);
      expect(testGroup.getText()).toEqual(new Narrative(null, null));
      expect(testGroup.hasContained()).toBe(false);
      expect(testGroup.getContained()).toEqual([] as Resource[]);
      expect(testGroup.hasExtension()).toBe(false);
      expect(testGroup.getExtension()).toEqual([] as Extension[]);
      expect(testGroup.hasModifierExtension()).toBe(false);
      expect(testGroup.getModifierExtension()).toEqual([] as Extension[]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(false);
      expect(testGroup.getIdentifier()).toEqual([] as Identifier[]);
      expect(testGroup.hasActiveElement()).toBe(false);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType());
      expect(testGroup.hasActive()).toBe(false);
      expect(testGroup.getActive()).toBeUndefined();

      // Setting type to null from setter results in no change
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);

      // Setting actual to null from setter results in no change
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_FALSE);

      expect(testGroup.hasNameElement()).toBe(false);
      expect(testGroup.getNameElement()).toEqual(new StringType());
      expect(testGroup.hasName()).toBe(false);
      expect(testGroup.getName()).toBeUndefined();
      expect(testGroup.hasQuantityElement()).toBe(false);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType());
      expect(testGroup.hasQuantity()).toBe(false);
      expect(testGroup.getQuantity()).toBeUndefined();
      expect(testGroup.hasManagingEntity()).toBe(false);
      expect(testGroup.getManagingEntity()).toEqual(new Reference());
      expect(testGroup.hasCharacteristic()).toBe(false);
      expect(testGroup.getCharacteristic()).toEqual([] as GroupCharacteristicComponent[]);
      expect(testGroup.hasMember()).toBe(false);
      expect(testGroup.getMember()).toEqual([] as GroupMemberComponent[]);

      // setTypeEnumType() for coverage
      const enumType = new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum);
      testGroup.setTypeEnumType(enumType);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_DEVICE, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_DEVICE_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_DEVICE);
    });

    it('should throw AssertionError when reset with null/undefined Group.type value', () => {
      const testGroup = new Group(VALID_CODE_PERSON, VALID_BOOLEAN_TRUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setTypeEnumType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setTypeElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setType(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setTypeEnumType(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setTypeElement(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.type is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setType(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.type is required`);
    });

    it('should throw AssertionError when reset with null/undefined Group.actual value', () => {
      const testGroup = new Group(VALID_CODE_PERSON, VALID_BOOLEAN_TRUE);
      let t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActualElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.actual is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActual(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.actual is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActualElement(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.actual is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActual(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.actual is required`);
    });

    it('should throw InvalidCodeError when instantiated with invalid primitive values', () => {
      let t = () => {
        new Group(UNSUPPORTED_ENUM_CODE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type; Unknown GroupTypeEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);

      t = () => {
        new Group(UNDEFINED_ENUM_CODE_VALUE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type; Unknown GroupTypeEnum 'code' value '${UNDEFINED_ENUM_CODE_VALUE}'`);

      t = () => {
        new Group(INVALID_CODE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type; Invalid value for CodeType (${INVALID_CODE})`);

      t = () => {
        // @ts-expect-error: allow for testing
        new Group(null, INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.actual (${INVALID_BOOLEAN})`);
    });

    it('should throw InvalidCodeError when instantiated with invalid PrimitiveType values', () => {
      let t = () => {
        new Group(new EnumCodeType('generated', inValidTypeEnum), null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type; Invalid type parameter (MockCodeEnum); Should be GroupTypeEnum.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        new Group(new StringType('invalidCode'), null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type; Provided code value is not an instance of CodeType`);

      t = () => {
        new Group(INVALID_CODE, null);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Invalid Group.type; Invalid value for CodeType (${INVALID_CODE})`);

      t = () => {
        // @ts-expect-error: allow for testing
        new Group(null, INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.actual (${INVALID_BOOLEAN})`);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_MANAGING_ENTITY = '#P1';
    const VALID_MANAGING_ENTITY_VALUE = new Reference();
    VALID_MANAGING_ENTITY_VALUE.setReference(VALID_MANAGING_ENTITY);

    const VALID_JSON = {
      resourceType: 'Group',
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
          resourceType: 'PractitionerRole',
          id: '#P1',
          identifier: [
            {
              value: 'This is a valid string.',
            },
          ],
          active: false,
          practitioner: {
            reference: 'Practitioner/13579',
          },
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
      identifier: [
        {
          value: 'This is a valid string.',
        },
      ],
      active: true,
      type: 'person',
      actual: true,
      code: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
        text: 'This is a valid string.',
      },
      name: 'This is a valid string.',
      quantity: 13,
      managingEntity: {
        reference: '#P1',
      },
      characteristic: [
        {
          code: {
            text: 'This is a valid string.',
          },
          valueBoolean: false,
          exclude: true,
        },
      ],
      member: [
        {
          entity: {
            reference: 'Practitioner/13579',
          },
        },
      ],
    };
    const INVALID_JSON = {
      resourceType: 'Group',
      id: 'id12345',
    };
    const INVALID_JSON_MISSING_TYPE = {
      resourceType: 'Group',
      id: 'id12345',
      type: '',
      actual: true,
    };
    const INVALID_JSON_MISSING_ACTUAL = {
      resourceType: 'Group',
      id: 'id12345',
      type: 'person',
      actual: null,
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testGroup = new Group(null, null);
      testGroup.setName(VALID_STRING_1);

      const t = () => {
        testGroup.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Group.type, Group.actual`);
    });

    it('should properly create serialized content', () => {
      const altCode = VALID_CODEABLECONCEPT_1.copy();
      altCode.setId(DATATYPE_ID);
      altCode.addExtension(DATATYPE_EXTENSION);

      const testGroup = new Group(null, null);
      testGroup.setId(VALID_ID);
      testGroup.setMeta(VALID_META);
      testGroup.setImplicitRules(IMPLICIT_RULES_VALUE);
      testGroup.setLanguage(LANGUAGE_VALUE);
      testGroup.setText(VALID_NARRATIVE);
      testGroup.setContained([VALID_CONTAINED]);
      testGroup.setExtension([VALID_EXTENSION]);
      testGroup.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testGroup.setIdentifier([VALID_IDENTIFIER_1]);
      testGroup.setActiveElement(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroup.setTypeElement(VALID_CODE_PERSON_TYPE);
      testGroup.setActualElement(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroup.setCode(altCode);
      testGroup.setNameElement(new StringType(VALID_STRING_1));
      testGroup.setQuantityElement(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      testGroup.setManagingEntity(VALID_MANAGING_ENTITY_VALUE);
      const groupCharacteristicComponent1 = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        new BooleanType(VALID_BOOLEAN_TRUE),
      );
      testGroup.addCharacteristic(groupCharacteristicComponent1);
      const testGroupMemberComponent1 = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroup.addMember(testGroupMemberComponent1);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup.constructor.name).toStrictEqual('Group');
      expect(testGroup.resourceType()).toStrictEqual('Group');
      expect(testGroup.fhirType()).toStrictEqual('Group');
      expect(testGroup.isResource()).toBe(true);
      expect(testGroup.isEmpty()).toBe(false);
      expect(testGroup.toJSON()).toBeDefined();

      // inherited properties from DomainResource
      expect(testGroup.hasId()).toBe(true);
      expect(testGroup.getId()).toStrictEqual(VALID_ID);
      expect(testGroup.hasMeta()).toBe(true);
      expect(testGroup.getMeta()).toEqual(VALID_META);
      expect(testGroup.hasImplicitRules()).toBe(true);
      expect(testGroup.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testGroup.hasLanguage()).toBe(true);
      expect(testGroup.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testGroup.hasText()).toBe(true);
      expect(testGroup.getText()).toStrictEqual(VALID_NARRATIVE);
      expect(testGroup.hasContained()).toBe(true);
      expect(testGroup.getContained()).toEqual([VALID_CONTAINED]);
      expect(testGroup.hasExtension()).toBe(true);
      expect(testGroup.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroup.hasModifierExtension()).toBe(true);
      expect(testGroup.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Group properties
      expect(testGroup.hasIdentifier()).toBe(true);
      expect(testGroup.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testGroup.hasActiveElement()).toBe(true);
      expect(testGroup.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActive()).toBe(true);
      expect(testGroup.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasTypeEnumType()).toBe(true);
      expect(testGroup.getTypeEnumType()).toEqual(new EnumCodeType(VALID_CODE_PERSON, groupTypeEnum));
      expect(testGroup.hasTypeElement()).toBe(true);
      expect(testGroup.getTypeElement()).toMatchObject(VALID_CODE_PERSON_TYPE);
      expect(testGroup.hasType()).toBe(true);
      expect(testGroup.getType()).toStrictEqual(VALID_CODE_PERSON);
      expect(testGroup.hasActualElement()).toBe(true);
      expect(testGroup.getActualElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroup.hasActual()).toBe(true);
      expect(testGroup.getActual()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroup.hasCode()).toBe(true);
      expect(testGroup.getCode()).toEqual(altCode);
      expect(testGroup.hasNameElement()).toBe(true);
      expect(testGroup.getNameElement()).toEqual(new StringType(VALID_STRING_1));
      expect(testGroup.hasName()).toBe(true);
      expect(testGroup.getName()).toStrictEqual(VALID_STRING_1);
      expect(testGroup.hasQuantityElement()).toBe(true);
      expect(testGroup.getQuantityElement()).toEqual(new UnsignedIntType(VALID_UNSIGNED_INT_1));
      expect(testGroup.hasQuantity()).toBe(true);
      expect(testGroup.getQuantity()).toStrictEqual(VALID_UNSIGNED_INT_1);
      expect(testGroup.hasManagingEntity()).toBe(true);
      expect(testGroup.getManagingEntity()).toEqual(VALID_MANAGING_ENTITY_VALUE);
      expect(testGroup.hasCharacteristic()).toBe(true);
      expect(testGroup.getCharacteristic()).toEqual([groupCharacteristicComponent1]);
      expect(testGroup.hasMember()).toBe(true);
      expect(testGroup.getMember()).toEqual([testGroupMemberComponent1]);

      expect(testGroup.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testGroup: Group | undefined = undefined;
      testGroup = Group.parse({});
      expect(testGroup).toBeUndefined();

      // @ts-expect-error: allow for testing
      testGroup = Group.parse(null);
      expect(testGroup).toBeUndefined();

      // @ts-expect-error: allow for testing
      testGroup = Group.parse(undefined);
      expect(testGroup).toBeUndefined();
    });

    it('should throw FhirError from parse with missing required properties', () => {
      const t = () => {
        Group.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Group.type, Group.actual`,
      );
    });

    it('should throw FhirError from parse when type has missing value', () => {
      const t = () => {
        Group.parse(INVALID_JSON_MISSING_TYPE);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Group.type`);
    });

    it('should throw FhirError from parse when actual has missing value', () => {
      const t = () => {
        Group.parse(INVALID_JSON_MISSING_ACTUAL);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Group.actual`);
    });

    it('should return Group for valid json', () => {
      const testGroup: Group | undefined = Group.parse(VALID_JSON);

      expect(testGroup).toBeDefined();
      expect(testGroup).toBeInstanceOf(Group);
      expect(testGroup).toBeInstanceOf(DomainResource);
      expect(testGroup).toBeInstanceOf(Resource);
      expect(testGroup).toBeInstanceOf(Base);
      expect(testGroup?.constructor.name).toStrictEqual('Group');
      expect(testGroup?.resourceType()).toStrictEqual('Group');
      expect(testGroup?.fhirType()).toStrictEqual('Group');
      expect(testGroup?.isResource()).toBe(true);
      expect(testGroup?.isEmpty()).toBe(false);
      expect(testGroup?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for setIdentifier()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setIdentifier([VALID_IDENTIFIER_1, INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Group.identifier; Provided value array has an element that is not an instance of Identifier.`,
      );
    });

    it('should throw InvalidTypeError for addIdentifier()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.addIdentifier(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.identifier; Provided value is not an instance of Identifier.`);
    });

    it('should throw InvalidTypeError for setActiveElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActiveElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.active; Provided value is not an instance of BooleanType.`);
    });

    it('should throw PrimitiveTypeError when setActive() for invalid value', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActive(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.active (Invalid datatype)`);
    });

    it('should throw InvalidTypeError for setTypeEnumType()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setTypeEnumType(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.type; Provided type is not an instance of GroupTypeEnum.`);
    });

    it('should throw InvalidTypeError for setTypeElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setTypeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.type; Provided value is not an instance of CodeType.`);
    });

    it('should throw InvalidCodeError when setType() for invalid value', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        testGroup.setType(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown GroupTypeEnum 'code' value 'Invalid datatype'`);
    });

    it('should throw InvalidTypeError for setActualElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActualElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.actual; Provided value is not an instance of BooleanType.`);
    });

    it('should throw PrimitiveTypeError when setActual() for invalid value', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setActual(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.actual (Invalid datatype)`);
    });

    it('should throw InvalidTypeError for setCode()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setCode(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.code; Provided value is not an instance of CodeableConcept.`);
    });

    it('should throw InvalidTypeError for setNameElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setNameElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.name; Provided value is not an instance of StringType.`);
    });

    it('should throw PrimitiveTypeError when setName() for invalid value', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setName(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.name (12345)`);
    });

    it('should throw InvalidTypeError for setQuantityElement()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setQuantityElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.quantity; Provided value is not an instance of UnsignedIntType.`);
    });

    it('should throw PrimitiveTypeError when setQuantity() for invalid value', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setQuantity(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.quantity (Invalid datatype)`);
    });

    it('should throw InvalidTypeError when setManagingEntity() with invalid reference type', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        testGroup.setManagingEntity(INVALID_REFERENCE_VALUE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setManagingEntity (Group.managingEntity) expects argument (${INVALID_REFERENCE}) to be a valid 'Reference' type`,
      );
    });

    it('should throw InvalidTypeError for setCharacteristic()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setCharacteristic([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Group.characteristic; Provided value array has an element that is not an instance of GroupCharacteristicComponent.`,
      );
    });

    it('should throw InvalidTypeError for addCharacteristic()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.addCharacteristic(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Group.characteristic; Provided value is not an instance of GroupCharacteristicComponent.`,
      );
    });

    it('should throw InvalidTypeError for setMember()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.setMember([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Group.member; Provided value array has an element that is not an instance of GroupMemberComponent.`,
      );
    });

    it('should throw InvalidTypeError for addMember()', () => {
      const testGroup = new Group(null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroup.addMember(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.member; Provided value is not an instance of GroupMemberComponent.`);
    });
  });
});
