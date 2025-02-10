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
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { DateType } from '@src/fhir-core/data-types/primitive/DateType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { AdministrativeGenderEnum } from '@src/fhir-models/code-systems/AdministrativeGenderEnum';
import {
  Patient,
  PatientCommunicationComponent,
  PatientContactComponent,
  PatientLinkComponent,
} from '@src/fhir-models/Patient';
import { PractitionerRole } from '@src/fhir-models/PractitionerRole';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  IMPLICIT_RULES_VALUE,
  IMPLICIT_RULES_VALUE_2,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  INVALID_STRING,
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

describe('Patient', () => {
  const VALID_STRING_1 = 'This is a valid string.';
  const VALID_CODEABLECONCEPT_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_1.setText(VALID_STRING_1);
  const VALID_STRING_2 = 'This is another valid string.';
  const VALID_CODEABLECONCEPT_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_2.setText(VALID_STRING_2);

  const VALID_IDENTIFIER_1 = new Identifier();
  VALID_IDENTIFIER_1.setValue(VALID_STRING_1);
  const VALID_IDENTIFIER_2 = new Identifier();
  VALID_IDENTIFIER_2.setValue(VALID_STRING_2);

  const VALID_REFERENCE_1 = 'Practitioner/13579';
  const VALID_REFERENCE_TYPE_1 = new Reference();
  VALID_REFERENCE_TYPE_1.setReference(VALID_REFERENCE_1);
  const VALID_REFERENCE_2 = 'Practitioner/24680';
  const VALID_REFERENCE_TYPE_2 = new Reference();
  VALID_REFERENCE_TYPE_2.setReference(VALID_REFERENCE_2);

  const VALID_CONTAINED = new PractitionerRole();
  VALID_CONTAINED.setId('#PR1');
  VALID_CONTAINED.setActive(false);
  VALID_CONTAINED.addIdentifier(VALID_IDENTIFIER_1);
  VALID_CONTAINED.setPractitioner(VALID_REFERENCE_TYPE_1);
  const VALID_CONTAINED_2 = new PractitionerRole();
  VALID_CONTAINED_2.setId('#PR2');
  VALID_CONTAINED_2.setActive(true);
  VALID_CONTAINED_2.addIdentifier(VALID_IDENTIFIER_2);
  VALID_CONTAINED_2.setPractitioner(VALID_REFERENCE_TYPE_2);

  const VALID_BOOLEAN_TRUE = true;
  const VALID_BOOLEAN_FALSE = false;
  // const VALID_BOOLEAN_TYPE_TRUE = new BooleanType(VALID_BOOLEAN_TRUE);
  const VALID_BOOLEAN_TYPE_FALSE = new BooleanType(VALID_BOOLEAN_FALSE);
  // const INVALID_BOOLEAN = 'invalidBoolean';

  const VALID_FAMILY = 'Surname';
  const VALID_FAMILY_2 = 'LastName';
  const VALID_FIRST_NAME = 'First';
  const VALID_FIRST_NAME_2 = 'First2';
  const VALID_MIDDLE_NAME = 'Middle';
  const VALID_MIDDLE_NAME_2 = 'Middle2';
  const VALID_PREFIX = 'Mr.';
  const VALID_PREFIX_2 = 'Ms.';
  const VALID_SUFFIX = 'Sr.';
  const VALID_SUFFIX_2 = 'MD';
  const VALID_HUMAN_NAME = new HumanName();
  VALID_HUMAN_NAME.setFamily(VALID_FAMILY);
  VALID_HUMAN_NAME.setGiven([VALID_FIRST_NAME, VALID_MIDDLE_NAME]);
  VALID_HUMAN_NAME.addPrefix(VALID_PREFIX);
  VALID_HUMAN_NAME.addSuffix(VALID_SUFFIX);
  const VALID_HUMAN_NAME_2 = new HumanName();
  VALID_HUMAN_NAME_2.setFamily(VALID_FAMILY_2);
  VALID_HUMAN_NAME_2.setGiven([VALID_FIRST_NAME_2, VALID_MIDDLE_NAME_2]);
  VALID_HUMAN_NAME_2.addPrefix(VALID_PREFIX_2);
  VALID_HUMAN_NAME_2.addSuffix(VALID_SUFFIX_2);

  const VALID_SYSTEM_PHONE = `phone`;
  const VALID_SYSTEM_EMAIL = `email`;
  const VALID_USE_HOME = `home`;
  const VALID_USE_WORK = `work`;
  const VALID_CONTACTPOINT = new ContactPoint();
  VALID_CONTACTPOINT.setSystem(VALID_SYSTEM_PHONE);
  VALID_CONTACTPOINT.setValue(VALID_STRING_1);
  VALID_CONTACTPOINT.setUse(VALID_USE_HOME);
  const VALID_CONTACTPOINT_2 = new ContactPoint();
  VALID_CONTACTPOINT_2.setSystem(VALID_SYSTEM_EMAIL);
  VALID_CONTACTPOINT_2.setValue(VALID_STRING_2);
  VALID_CONTACTPOINT_2.setUse(VALID_USE_WORK);

  const VALID_GENDER_MALE = 'male';
  const VALID_GENDER_FEMALE = 'female';
  const VALID_GENDER_OTHER = 'other';
  const INVALID_GENDER = 'invalidCode';

  const VALID_DATE = '1978-01-28';
  const VALID_DATE_TYPE = new DateType(VALID_DATE);
  const VALID_DATE_2 = '1980-07-21';
  const VALID_DATE_TYPE_2 = new DateType(VALID_DATE_2);

  const VALID_DATETIME = `2017-01-01T00:00:00.000Z`;
  const VALID_DATETIME_TYPE = new DateTimeType(VALID_DATETIME);

  const VALID_INTEGER = 2;
  const VALID_INTEGER_TYPE = new IntegerType(VALID_INTEGER);

  const VALID_TYPE_POSTAL = `postal`;
  const VALID_LINE_A = '1234 Main ST';
  const VALID_LINE_A_2 = '4321 Central ST';
  const VALID_LINE_B = 'APT 15A';
  const VALID_CITY = 'Nashua';
  const VALID_CITY_2 = 'Renton';
  const VALID_STATE = 'NH';
  const VALID_STATE_2 = 'WA';
  const VALID_POSTAL = '03064';
  const VALID_POSTAL_2 = '98058';
  const VALID_COUNTRY = 'US';
  const VALID_ADDRESS = new Address();
  VALID_ADDRESS.setUse(VALID_USE_HOME);
  VALID_ADDRESS.setType(VALID_TYPE_POSTAL);
  VALID_ADDRESS.setLine([VALID_LINE_A, VALID_LINE_B]);
  VALID_ADDRESS.setCity(VALID_CITY);
  VALID_ADDRESS.setState(VALID_STATE);
  VALID_ADDRESS.setPostalCode(VALID_POSTAL);
  VALID_ADDRESS.setCountry(VALID_COUNTRY);
  const VALID_ADDRESS_2 = new Address();
  VALID_ADDRESS_2.setUse(VALID_USE_HOME);
  VALID_ADDRESS_2.setType(VALID_TYPE_POSTAL);
  VALID_ADDRESS_2.setLine([VALID_LINE_A_2]);
  VALID_ADDRESS_2.setCity(VALID_CITY_2);
  VALID_ADDRESS_2.setState(VALID_STATE_2);
  VALID_ADDRESS_2.setPostalCode(VALID_POSTAL_2);
  VALID_ADDRESS_2.setCountry(VALID_COUNTRY);

  const VALID_CODE = `testCodeType`;
  const VALID_URL = `testUrlType`;
  const VALID_UNSIGNED_INT = 697276;
  const VALID_BASE64BINARY_HASH = `0f60168295bc9d6b0535feaf0975a63532959834`;
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_URL_2 = `testUrlType2`;
  const VALID_UNSIGNED_INT_2 = 767269;
  const VALID_BASE64BINARY_HASH_2 = `0f60168295bc9d6b0535feaf0975a63532959845`;
  const VALID_ATTACHMENT = new Attachment();
  VALID_ATTACHMENT.setContentType(VALID_CODE);
  VALID_ATTACHMENT.setUrl(VALID_URL);
  VALID_ATTACHMENT.setSize(VALID_UNSIGNED_INT);
  VALID_ATTACHMENT.setHash(VALID_BASE64BINARY_HASH);
  VALID_ATTACHMENT.setTitle(VALID_STRING_1);
  const VALID_ATTACHMENT_2 = new Attachment();
  VALID_ATTACHMENT_2.setContentType(VALID_CODE_2);
  VALID_ATTACHMENT_2.setUrl(VALID_URL_2);
  VALID_ATTACHMENT_2.setSize(VALID_UNSIGNED_INT_2);
  VALID_ATTACHMENT_2.setHash(VALID_BASE64BINARY_HASH_2);
  VALID_ATTACHMENT_2.setTitle(VALID_STRING_2);

  const VALID_REFERENCE_PRACTITIONER = 'Practitioner/13579';
  const VALID_REFERENCE_TYPE_PRACTITIONER = new Reference();
  VALID_REFERENCE_TYPE_PRACTITIONER.setReference(VALID_REFERENCE_PRACTITIONER);
  const VALID_REFERENCE_PRACTITIONER_2 = 'Practitioner/24680';
  const VALID_REFERENCE_TYPE_PRACTITIONER_2 = new Reference();
  VALID_REFERENCE_TYPE_PRACTITIONER_2.setReference(VALID_REFERENCE_PRACTITIONER_2);

  const VALID_REFERENCE_ORGANIZATION = 'Organization/123';
  const VALID_REFERENCE_TYPE_ORGANIZATION = new Reference();
  VALID_REFERENCE_TYPE_ORGANIZATION.setReference(VALID_REFERENCE_ORGANIZATION);
  const VALID_REFERENCE_ORGANIZATION_2 = 'Organization/456';
  const VALID_REFERENCE_TYPE_ORGANIZATION_2 = new Reference();
  VALID_REFERENCE_TYPE_ORGANIZATION_2.setReference(VALID_REFERENCE_ORGANIZATION_2);

  const INVALID_REFERENCE = 'Basic/123';
  const INVALID_REFERENCE_TYPE = new Reference();
  INVALID_REFERENCE_TYPE.setReference(INVALID_REFERENCE);

  let administrativeGenderEnum: AdministrativeGenderEnum;
  let maleEnumCode: EnumCodeType;
  let femaleEnumCode: EnumCodeType;
  let otherEnumCode: EnumCodeType;
  // let inValidTypeEnum: MockCodeEnum;
  beforeAll(() => {
    administrativeGenderEnum = new AdministrativeGenderEnum();
    maleEnumCode = new EnumCodeType(VALID_GENDER_MALE, administrativeGenderEnum);
    femaleEnumCode = new EnumCodeType(VALID_GENDER_FEMALE, administrativeGenderEnum);
    otherEnumCode = new EnumCodeType(VALID_GENDER_OTHER, administrativeGenderEnum);
    // inValidTypeEnum = new MockCodeEnum();
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testPatient = new Patient();

      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(true);
      expect(testPatient.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(false);
      expect(testPatient.getIdElement()).toEqual(new IdType());
      expect(testPatient.hasId()).toBe(false);
      expect(testPatient.getId()).toBeUndefined();
      expect(testPatient.hasMeta()).toBe(false);
      expect(testPatient.getMeta()).toEqual(new Meta());
      expect(testPatient.hasImplicitRulesElement()).toBe(false);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPatient.hasImplicitRules()).toBe(false);
      expect(testPatient.getImplicitRules()).toBeUndefined();
      expect(testPatient.hasLanguageElement()).toBe(false);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType());
      expect(testPatient.hasLanguage()).toBe(false);
      expect(testPatient.getLanguage()).toBeUndefined();
      expect(testPatient.hasText()).toBe(false);
      expect(testPatient.getText()).toEqual(new Narrative(null, null));
      expect(testPatient.hasContained()).toBe(false);
      expect(testPatient.getContained()).toEqual([] as Resource[]);
      expect(testPatient.hasExtension()).toBe(false);
      expect(testPatient.getExtension()).toEqual([] as Extension[]);
      expect(testPatient.hasModifierExtension()).toBe(false);
      expect(testPatient.getModifierExtension()).toEqual([] as Extension[]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(false);
      expect(testPatient.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPatient.hasActiveElement()).toBe(false);
      expect(testPatient.getActiveElement()).toEqual(new BooleanType());
      expect(testPatient.hasActive()).toBe(false);
      expect(testPatient.getActive()).toBeUndefined();
      expect(testPatient.hasName()).toBe(false);
      expect(testPatient.getName()).toEqual([] as HumanName[]);
      expect(testPatient.hasTelecom()).toBe(false);
      expect(testPatient.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPatient.hasGenderEnumType()).toBe(false);
      expect(testPatient.getGenderEnumType()).toBeUndefined();
      expect(testPatient.hasGenderElement()).toBe(false);
      expect(testPatient.getGenderElement()).toBeUndefined();
      expect(testPatient.hasGender()).toBe(false);
      expect(testPatient.getGender()).toBeUndefined();
      expect(testPatient.hasBirthDateElement()).toBe(false);
      expect(testPatient.getBirthDateElement()).toEqual(new DateType());
      expect(testPatient.hasBirthDate()).toBe(false);
      expect(testPatient.getBirthDate()).toBeUndefined();
      expect(testPatient.hasDeceased()).toBe(false);
      expect(testPatient.getDeceased()).toBeUndefined();
      expect(testPatient.hasDeceasedBooleanType()).toBe(false);
      expect(testPatient.getDeceasedBooleanType()).toBeUndefined();
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      expect(testPatient.getDeceasedDateTimeType()).toBeUndefined();
      expect(testPatient.hasAddress()).toBe(false);
      expect(testPatient.getAddress()).toEqual([] as Address[]);
      expect(testPatient.hasMaritalStatus()).toBe(false);
      expect(testPatient.getMaritalStatus()).toEqual(new CodeableConcept());
      expect(testPatient.hasMultipleBirth()).toBe(false);
      expect(testPatient.getMultipleBirth()).toBeUndefined();
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      expect(testPatient.getMultipleBirthBooleanType()).toBeUndefined();
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      expect(testPatient.getMultipleBirthIntegerType()).toBeUndefined();
      expect(testPatient.hasPhoto()).toBe(false);
      expect(testPatient.getPhoto()).toEqual([] as Attachment[]);
      expect(testPatient.hasContact()).toBe(false);
      expect(testPatient.getContact()).toEqual([] as PatientContactComponent[]);
      expect(testPatient.hasCommunication()).toBe(false);
      expect(testPatient.getCommunication()).toEqual([] as PatientCommunicationComponent[]);
      expect(testPatient.hasGeneralPractitioner()).toBe(false);
      expect(testPatient.getGeneralPractitioner()).toEqual([] as Reference[]);
      expect(testPatient.hasManagingOrganization()).toBe(false);
      expect(testPatient.getManagingOrganization()).toEqual(new Reference());
      expect(testPatient.hasLink()).toBe(false);
      expect(testPatient.getLink()).toEqual([] as PatientLinkComponent[]);
    });

    it('should properly copy()', () => {
      const patient = new Patient();

      patient.setId(VALID_ID);
      patient.setMeta(VALID_META);
      patient.setImplicitRules(IMPLICIT_RULES_VALUE);
      patient.setLanguage(LANGUAGE_VALUE);
      patient.setText(VALID_NARRATIVE);
      patient.setContained([VALID_CONTAINED]);
      patient.setExtension([VALID_EXTENSION]);
      patient.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      patient.setIdentifier([VALID_IDENTIFIER_1]);
      patient.setActive(VALID_BOOLEAN_TRUE);
      patient.setName([VALID_HUMAN_NAME]);
      patient.setTelecom([VALID_CONTACTPOINT]);
      patient.setGenderEnumType(maleEnumCode);
      patient.setBirthDate(VALID_DATE);
      patient.setDeceased(VALID_BOOLEAN_TYPE_FALSE);
      patient.setAddress([VALID_ADDRESS]);
      patient.setMaritalStatus(VALID_CODEABLECONCEPT_1);
      patient.setMultipleBirth(VALID_BOOLEAN_TYPE_FALSE);
      patient.setPhoto([VALID_ATTACHMENT]);
      const patientContactComponent = getTestPatientContactComponent('1');
      patient.setContact([patientContactComponent]);
      const patientCommunicationComponent = getTestPatientCommunicationComponent('en-US');
      patient.setCommunication([patientCommunicationComponent]);
      patient.setGeneralPractitioner([VALID_REFERENCE_TYPE_PRACTITIONER]);
      patient.setManagingOrganization(VALID_REFERENCE_TYPE_ORGANIZATION);
      const patientLinkComponent = getTestPatientLinkComponent('2');
      patient.setLink([patientLinkComponent]);

      let testPatient = patient.copy();
      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(false);
      expect(testPatient.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(true);
      expect(testPatient.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPatient.hasId()).toBe(true);
      expect(testPatient.getId()).toStrictEqual(VALID_ID);
      expect(testPatient.hasMeta()).toBe(true);
      expect(testPatient.getMeta()).toEqual(VALID_META);
      expect(testPatient.hasImplicitRulesElement()).toBe(true);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPatient.hasImplicitRules()).toBe(true);
      expect(testPatient.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPatient.hasLanguageElement()).toBe(true);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPatient.hasLanguage()).toBe(true);
      expect(testPatient.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPatient.hasText()).toBe(true);
      expect(testPatient.getText()).toEqual(VALID_NARRATIVE);
      expect(testPatient.hasContained()).toBe(true);
      expect(testPatient.getContained()).toEqual([VALID_CONTAINED]);
      expect(testPatient.hasExtension()).toBe(true);
      expect(testPatient.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatient.hasModifierExtension()).toBe(true);
      expect(testPatient.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(true);
      expect(testPatient.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testPatient.hasActiveElement()).toBe(true);
      expect(testPatient.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testPatient.hasActive()).toBe(true);
      expect(testPatient.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testPatient.hasName()).toBe(true);
      expect(testPatient.getName()).toEqual([VALID_HUMAN_NAME]);
      expect(testPatient.hasTelecom()).toBe(true);
      expect(testPatient.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_MALE);
      expect(testPatient.hasBirthDateElement()).toBe(true);
      expect(testPatient.getBirthDateElement()).toEqual(VALID_DATE_TYPE);
      expect(testPatient.hasBirthDate()).toBe(true);
      expect(testPatient.getBirthDate()).toStrictEqual(VALID_DATE);
      expect(testPatient.hasDeceased()).toBe(true);
      expect(testPatient.getDeceased()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedBooleanType()).toBe(true);
      expect(testPatient.getDeceasedBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      let t = () => {
        testPatient.getDeceasedDateTimeType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.deceased[x]: Expected DateTimeType but encountered boolean`);
      expect(testPatient.hasAddress()).toBe(true);
      expect(testPatient.getAddress()).toEqual([VALID_ADDRESS]);
      expect(testPatient.hasMaritalStatus()).toBe(true);
      expect(testPatient.getMaritalStatus()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testPatient.hasMultipleBirth()).toBe(true);
      expect(testPatient.getMultipleBirth()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(true);
      expect(testPatient.getMultipleBirthBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      t = () => {
        testPatient.getMultipleBirthIntegerType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.multipleBirth[x]: Expected IntegerType but encountered boolean`);
      expect(testPatient.hasPhoto()).toBe(true);
      expect(testPatient.getPhoto()).toEqual([VALID_ATTACHMENT]);
      expect(testPatient.hasContact()).toBe(true);
      expect(testPatient.getContact()).toEqual([patientContactComponent]);
      expect(testPatient.hasCommunication()).toBe(true);
      expect(testPatient.getCommunication()).toEqual([patientCommunicationComponent]);
      expect(testPatient.hasGeneralPractitioner()).toBe(true);
      expect(testPatient.getGeneralPractitioner()).toEqual([VALID_REFERENCE_TYPE_PRACTITIONER]);
      expect(testPatient.hasManagingOrganization()).toBe(true);
      expect(testPatient.getManagingOrganization()).toEqual(VALID_REFERENCE_TYPE_ORGANIZATION);
      expect(testPatient.hasLink()).toBe(true);
      expect(testPatient.getLink()).toEqual([patientLinkComponent]);

      // Reset to empty

      patient.setId(UNDEFINED_VALUE);
      patient.setMeta(UNDEFINED_VALUE);
      patient.setImplicitRules(UNDEFINED_VALUE);
      patient.setLanguage(UNDEFINED_VALUE);
      patient.setText(UNDEFINED_VALUE);
      patient.setContained(UNDEFINED_VALUE);
      patient.setExtension(UNDEFINED_VALUE);
      patient.setModifierExtension(UNDEFINED_VALUE);

      patient.setIdentifier(UNDEFINED_VALUE);
      patient.setActive(UNDEFINED_VALUE);
      patient.setName(UNDEFINED_VALUE);
      patient.setTelecom(UNDEFINED_VALUE);
      patient.setGenderEnumType(UNDEFINED_VALUE);
      patient.setBirthDate(UNDEFINED_VALUE);
      patient.setDeceased(UNDEFINED_VALUE);
      patient.setAddress(UNDEFINED_VALUE);
      patient.setMaritalStatus(UNDEFINED_VALUE);
      patient.setMultipleBirth(UNDEFINED_VALUE);
      patient.setPhoto(UNDEFINED_VALUE);
      patient.setContact(UNDEFINED_VALUE);
      patient.setCommunication(UNDEFINED_VALUE);
      patient.setGeneralPractitioner(UNDEFINED_VALUE);
      patient.setManagingOrganization(UNDEFINED_VALUE);
      patient.setLink(UNDEFINED_VALUE);

      testPatient = patient.copy();
      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(true);
      expect(testPatient.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(false);
      expect(testPatient.getIdElement()).toEqual(new IdType());
      expect(testPatient.hasId()).toBe(false);
      expect(testPatient.getId()).toBeUndefined();
      expect(testPatient.hasMeta()).toBe(false);
      expect(testPatient.getMeta()).toEqual(new Meta());
      expect(testPatient.hasImplicitRulesElement()).toBe(false);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPatient.hasImplicitRules()).toBe(false);
      expect(testPatient.getImplicitRules()).toBeUndefined();
      expect(testPatient.hasLanguageElement()).toBe(false);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType());
      expect(testPatient.hasLanguage()).toBe(false);
      expect(testPatient.getLanguage()).toBeUndefined();
      expect(testPatient.hasText()).toBe(false);
      expect(testPatient.getText()).toEqual(new Narrative(null, null));
      expect(testPatient.hasContained()).toBe(false);
      expect(testPatient.getContained()).toEqual([] as Resource[]);
      expect(testPatient.hasExtension()).toBe(false);
      expect(testPatient.getExtension()).toEqual([] as Extension[]);
      expect(testPatient.hasModifierExtension()).toBe(false);
      expect(testPatient.getModifierExtension()).toEqual([] as Extension[]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(false);
      expect(testPatient.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPatient.hasActiveElement()).toBe(false);
      expect(testPatient.getActiveElement()).toEqual(new BooleanType());
      expect(testPatient.hasActive()).toBe(false);
      expect(testPatient.getActive()).toBeUndefined();
      expect(testPatient.hasName()).toBe(false);
      expect(testPatient.getName()).toEqual([] as HumanName[]);
      expect(testPatient.hasTelecom()).toBe(false);
      expect(testPatient.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPatient.hasGenderEnumType()).toBe(false);
      expect(testPatient.getGenderEnumType()).toBeUndefined();
      expect(testPatient.hasGenderElement()).toBe(false);
      expect(testPatient.getGenderElement()).toBeUndefined();
      expect(testPatient.hasGender()).toBe(false);
      expect(testPatient.getGender()).toBeUndefined();
      expect(testPatient.hasBirthDateElement()).toBe(false);
      expect(testPatient.getBirthDateElement()).toEqual(new DateType());
      expect(testPatient.hasBirthDate()).toBe(false);
      expect(testPatient.getBirthDate()).toBeUndefined();
      expect(testPatient.hasDeceased()).toBe(false);
      expect(testPatient.getDeceased()).toBeUndefined();
      expect(testPatient.hasDeceasedBooleanType()).toBe(false);
      expect(testPatient.getDeceasedBooleanType()).toBeUndefined();
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      expect(testPatient.getDeceasedDateTimeType()).toBeUndefined();
      expect(testPatient.hasAddress()).toBe(false);
      expect(testPatient.getAddress()).toEqual([] as Address[]);
      expect(testPatient.hasMaritalStatus()).toBe(false);
      expect(testPatient.getMaritalStatus()).toEqual(new CodeableConcept());
      expect(testPatient.hasMultipleBirth()).toBe(false);
      expect(testPatient.getMultipleBirth()).toBeUndefined();
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      expect(testPatient.getMultipleBirthBooleanType()).toBeUndefined();
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      expect(testPatient.getMultipleBirthIntegerType()).toBeUndefined();
      expect(testPatient.hasPhoto()).toBe(false);
      expect(testPatient.getPhoto()).toEqual([] as Attachment[]);
      expect(testPatient.hasContact()).toBe(false);
      expect(testPatient.getContact()).toEqual([] as PatientContactComponent[]);
      expect(testPatient.hasCommunication()).toBe(false);
      expect(testPatient.getCommunication()).toEqual([] as PatientCommunicationComponent[]);
      expect(testPatient.hasGeneralPractitioner()).toBe(false);
      expect(testPatient.getGeneralPractitioner()).toEqual([] as Reference[]);
      expect(testPatient.hasManagingOrganization()).toBe(false);
      expect(testPatient.getManagingOrganization()).toEqual(new Reference());
      expect(testPatient.hasLink()).toBe(false);
      expect(testPatient.getLink()).toEqual([] as PatientLinkComponent[]);
    });

    it('should be properly reset by modifying all properties', () => {
      const testPatient = new Patient();

      testPatient.setId(VALID_ID);
      testPatient.setMeta(VALID_META);
      testPatient.setImplicitRules(IMPLICIT_RULES_VALUE);
      testPatient.setLanguage(LANGUAGE_VALUE);
      testPatient.setText(VALID_NARRATIVE);
      testPatient.setContained([VALID_CONTAINED]);
      testPatient.setExtension([VALID_EXTENSION]);
      testPatient.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testPatient.setIdentifier([VALID_IDENTIFIER_1]);
      testPatient.setActive(VALID_BOOLEAN_TRUE);
      testPatient.setName([VALID_HUMAN_NAME]);
      testPatient.setTelecom([VALID_CONTACTPOINT]);
      testPatient.setGenderEnumType(maleEnumCode);
      testPatient.setBirthDate(VALID_DATE);
      testPatient.setDeceased(VALID_BOOLEAN_TYPE_FALSE);
      testPatient.setAddress([VALID_ADDRESS]);
      testPatient.setMaritalStatus(VALID_CODEABLECONCEPT_1);
      testPatient.setMultipleBirth(VALID_BOOLEAN_TYPE_FALSE);
      testPatient.setPhoto([VALID_ATTACHMENT]);
      let patientContactComponent = getTestPatientContactComponent('1');
      testPatient.setContact([patientContactComponent]);
      let patientCommunicationComponent = getTestPatientCommunicationComponent('en-US');
      testPatient.setCommunication([patientCommunicationComponent]);
      testPatient.setGeneralPractitioner([VALID_REFERENCE_TYPE_PRACTITIONER]);
      testPatient.setManagingOrganization(VALID_REFERENCE_TYPE_ORGANIZATION);
      let patientLinkComponent = getTestPatientLinkComponent('1');
      testPatient.setLink([patientLinkComponent]);

      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(false);
      expect(testPatient.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(true);
      expect(testPatient.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPatient.hasId()).toBe(true);
      expect(testPatient.getId()).toStrictEqual(VALID_ID);
      expect(testPatient.hasMeta()).toBe(true);
      expect(testPatient.getMeta()).toEqual(VALID_META);
      expect(testPatient.hasImplicitRulesElement()).toBe(true);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPatient.hasImplicitRules()).toBe(true);
      expect(testPatient.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPatient.hasLanguageElement()).toBe(true);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPatient.hasLanguage()).toBe(true);
      expect(testPatient.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPatient.hasText()).toBe(true);
      expect(testPatient.getText()).toEqual(VALID_NARRATIVE);
      expect(testPatient.hasContained()).toBe(true);
      expect(testPatient.getContained()).toEqual([VALID_CONTAINED]);
      expect(testPatient.hasExtension()).toBe(true);
      expect(testPatient.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatient.hasModifierExtension()).toBe(true);
      expect(testPatient.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(true);
      expect(testPatient.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testPatient.hasActiveElement()).toBe(true);
      expect(testPatient.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testPatient.hasActive()).toBe(true);
      expect(testPatient.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testPatient.hasName()).toBe(true);
      expect(testPatient.getName()).toEqual([VALID_HUMAN_NAME]);
      expect(testPatient.hasTelecom()).toBe(true);
      expect(testPatient.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_MALE);
      expect(testPatient.hasBirthDateElement()).toBe(true);
      expect(testPatient.getBirthDateElement()).toEqual(VALID_DATE_TYPE);
      expect(testPatient.hasBirthDate()).toBe(true);
      expect(testPatient.getBirthDate()).toStrictEqual(VALID_DATE);
      expect(testPatient.hasDeceased()).toBe(true);
      expect(testPatient.getDeceased()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedBooleanType()).toBe(true);
      expect(testPatient.getDeceasedBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      let t = () => {
        testPatient.getDeceasedDateTimeType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.deceased[x]: Expected DateTimeType but encountered boolean`);
      expect(testPatient.hasAddress()).toBe(true);
      expect(testPatient.getAddress()).toEqual([VALID_ADDRESS]);
      expect(testPatient.hasMaritalStatus()).toBe(true);
      expect(testPatient.getMaritalStatus()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testPatient.hasMultipleBirth()).toBe(true);
      expect(testPatient.getMultipleBirth()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(true);
      expect(testPatient.getMultipleBirthBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      t = () => {
        testPatient.getMultipleBirthIntegerType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.multipleBirth[x]: Expected IntegerType but encountered boolean`);
      expect(testPatient.hasPhoto()).toBe(true);
      expect(testPatient.getPhoto()).toEqual([VALID_ATTACHMENT]);
      expect(testPatient.hasContact()).toBe(true);
      expect(testPatient.getContact()).toEqual([patientContactComponent]);
      expect(testPatient.hasCommunication()).toBe(true);
      expect(testPatient.getCommunication()).toEqual([patientCommunicationComponent]);
      expect(testPatient.hasGeneralPractitioner()).toBe(true);
      expect(testPatient.getGeneralPractitioner()).toEqual([VALID_REFERENCE_TYPE_PRACTITIONER]);
      expect(testPatient.hasManagingOrganization()).toBe(true);
      expect(testPatient.getManagingOrganization()).toEqual(VALID_REFERENCE_TYPE_ORGANIZATION);
      expect(testPatient.hasLink()).toBe(true);
      expect(testPatient.getLink()).toEqual([patientLinkComponent]);

      // Reset

      testPatient.setId(VALID_ID_2);
      testPatient.setMeta(VALID_META_2);
      testPatient.setImplicitRules(IMPLICIT_RULES_VALUE_2);
      testPatient.setLanguage(LANGUAGE_VALUE_2);
      testPatient.setText(VALID_NARRATIVE_2);
      testPatient.setContained([VALID_CONTAINED_2]);
      testPatient.setExtension([VALID_EXTENSION_2]);
      testPatient.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testPatient.setIdentifier([VALID_IDENTIFIER_2]);
      testPatient.setActiveElement(VALID_BOOLEAN_TYPE_FALSE);
      testPatient.setName([VALID_HUMAN_NAME_2]);
      testPatient.setTelecom([VALID_CONTACTPOINT_2]);
      testPatient.setGenderEnumType(femaleEnumCode);
      testPatient.setBirthDateElement(VALID_DATE_TYPE_2);
      testPatient.setDeceased(VALID_DATETIME_TYPE);
      testPatient.setAddress([VALID_ADDRESS_2]);
      testPatient.setMaritalStatus(VALID_CODEABLECONCEPT_2);
      testPatient.setMultipleBirth(VALID_INTEGER_TYPE);
      testPatient.setPhoto([VALID_ATTACHMENT_2]);
      patientContactComponent = getTestPatientContactComponent('2');
      testPatient.setContact([patientContactComponent]);
      patientCommunicationComponent = getTestPatientCommunicationComponent('en-UK');
      testPatient.setCommunication([patientCommunicationComponent]);
      testPatient.setGeneralPractitioner([VALID_REFERENCE_TYPE_PRACTITIONER_2]);
      testPatient.setManagingOrganization(VALID_REFERENCE_TYPE_ORGANIZATION_2);
      patientLinkComponent = getTestPatientLinkComponent('2');
      testPatient.setLink([patientLinkComponent]);

      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(false);
      expect(testPatient.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(true);
      expect(testPatient.getIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testPatient.hasId()).toBe(true);
      expect(testPatient.getId()).toStrictEqual(VALID_ID_2);
      expect(testPatient.hasMeta()).toBe(true);
      expect(testPatient.getMeta()).toEqual(VALID_META_2);
      expect(testPatient.hasImplicitRulesElement()).toBe(true);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE_2));
      expect(testPatient.hasImplicitRules()).toBe(true);
      expect(testPatient.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE_2);
      expect(testPatient.hasLanguageElement()).toBe(true);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE_2));
      expect(testPatient.hasLanguage()).toBe(true);
      expect(testPatient.getLanguage()).toStrictEqual(LANGUAGE_VALUE_2);
      expect(testPatient.hasText()).toBe(true);
      expect(testPatient.getText()).toEqual(VALID_NARRATIVE_2);
      expect(testPatient.hasContained()).toBe(true);
      expect(testPatient.getContained()).toEqual([VALID_CONTAINED_2]);
      expect(testPatient.hasExtension()).toBe(true);
      expect(testPatient.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testPatient.hasModifierExtension()).toBe(true);
      expect(testPatient.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(true);
      expect(testPatient.getIdentifier()).toEqual([VALID_IDENTIFIER_2]);
      expect(testPatient.hasActiveElement()).toBe(true);
      expect(testPatient.getActiveElement()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasActive()).toBe(true);
      expect(testPatient.getActive()).toStrictEqual(VALID_BOOLEAN_FALSE);
      expect(testPatient.hasName()).toBe(true);
      expect(testPatient.getName()).toEqual([VALID_HUMAN_NAME_2]);
      expect(testPatient.hasTelecom()).toBe(true);
      expect(testPatient.getTelecom()).toEqual([VALID_CONTACTPOINT_2]);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(femaleEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(femaleEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_FEMALE);
      expect(testPatient.hasBirthDateElement()).toBe(true);
      expect(testPatient.getBirthDateElement()).toEqual(VALID_DATE_TYPE_2);
      expect(testPatient.hasBirthDate()).toBe(true);
      expect(testPatient.getBirthDate()).toStrictEqual(VALID_DATE_2);
      expect(testPatient.hasDeceased()).toBe(true);
      expect(testPatient.getDeceased()).toEqual(VALID_DATETIME_TYPE);
      expect(testPatient.hasDeceasedBooleanType()).toBe(false);
      t = () => {
        testPatient.getDeceasedBooleanType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.deceased[x]: Expected BooleanType but encountered dateTime`);
      expect(testPatient.hasDeceasedDateTimeType()).toBe(true);
      expect(testPatient.getDeceasedDateTimeType()).toEqual(VALID_DATETIME_TYPE);
      expect(testPatient.hasAddress()).toBe(true);
      expect(testPatient.getAddress()).toEqual([VALID_ADDRESS_2]);
      expect(testPatient.hasMaritalStatus()).toBe(true);
      expect(testPatient.getMaritalStatus()).toEqual(VALID_CODEABLECONCEPT_2);
      expect(testPatient.hasMultipleBirth()).toBe(true);
      expect(testPatient.getMultipleBirth()).toEqual(VALID_INTEGER_TYPE);
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      t = () => {
        testPatient.getMultipleBirthBooleanType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.multipleBirth[x]: Expected BooleanType but encountered integer`);
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(true);
      expect(testPatient.getMultipleBirthIntegerType()).toEqual(VALID_INTEGER_TYPE);
      expect(testPatient.hasPhoto()).toBe(true);
      expect(testPatient.getPhoto()).toEqual([VALID_ATTACHMENT_2]);
      expect(testPatient.hasContact()).toBe(true);
      expect(testPatient.getContact()).toEqual([patientContactComponent]);
      expect(testPatient.hasCommunication()).toBe(true);
      expect(testPatient.getCommunication()).toEqual([patientCommunicationComponent]);
      expect(testPatient.hasGeneralPractitioner()).toBe(true);
      expect(testPatient.getGeneralPractitioner()).toEqual([VALID_REFERENCE_TYPE_PRACTITIONER_2]);
      expect(testPatient.hasManagingOrganization()).toBe(true);
      expect(testPatient.getManagingOrganization()).toEqual(VALID_REFERENCE_TYPE_ORGANIZATION_2);
      expect(testPatient.hasLink()).toBe(true);
      expect(testPatient.getLink()).toEqual([patientLinkComponent]);

      // Reset to empty

      testPatient.setId(UNDEFINED_VALUE);
      testPatient.setMeta(UNDEFINED_VALUE);
      testPatient.setImplicitRules(UNDEFINED_VALUE);
      testPatient.setLanguage(UNDEFINED_VALUE);
      testPatient.setText(UNDEFINED_VALUE);
      testPatient.setContained(UNDEFINED_VALUE);
      testPatient.setExtension(UNDEFINED_VALUE);
      testPatient.setModifierExtension(UNDEFINED_VALUE);

      testPatient.setIdentifier(UNDEFINED_VALUE);
      testPatient.setActiveElement(UNDEFINED_VALUE);
      testPatient.setName(UNDEFINED_VALUE);
      testPatient.setTelecom(UNDEFINED_VALUE);
      testPatient.setGenderEnumType(UNDEFINED_VALUE);
      testPatient.setBirthDateElement(UNDEFINED_VALUE);
      testPatient.setDeceased(UNDEFINED_VALUE);
      testPatient.setAddress(UNDEFINED_VALUE);
      testPatient.setMaritalStatus(UNDEFINED_VALUE);
      testPatient.setMultipleBirth(UNDEFINED_VALUE);
      testPatient.setPhoto(UNDEFINED_VALUE);
      testPatient.setContact(UNDEFINED_VALUE);
      testPatient.setCommunication(UNDEFINED_VALUE);
      testPatient.setGeneralPractitioner(UNDEFINED_VALUE);
      testPatient.setManagingOrganization(UNDEFINED_VALUE);
      testPatient.setLink(UNDEFINED_VALUE);

      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(true);
      expect(testPatient.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(false);
      expect(testPatient.getIdElement()).toEqual(new IdType());
      expect(testPatient.hasId()).toBe(false);
      expect(testPatient.getId()).toBeUndefined();
      expect(testPatient.hasMeta()).toBe(false);
      expect(testPatient.getMeta()).toEqual(new Meta());
      expect(testPatient.hasImplicitRulesElement()).toBe(false);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPatient.hasImplicitRules()).toBe(false);
      expect(testPatient.getImplicitRules()).toBeUndefined();
      expect(testPatient.hasLanguageElement()).toBe(false);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType());
      expect(testPatient.hasLanguage()).toBe(false);
      expect(testPatient.getLanguage()).toBeUndefined();
      expect(testPatient.hasText()).toBe(false);
      expect(testPatient.getText()).toEqual(new Narrative(null, null));
      expect(testPatient.hasContained()).toBe(false);
      expect(testPatient.getContained()).toEqual([] as Resource[]);
      expect(testPatient.hasExtension()).toBe(false);
      expect(testPatient.getExtension()).toEqual([] as Extension[]);
      expect(testPatient.hasModifierExtension()).toBe(false);
      expect(testPatient.getModifierExtension()).toEqual([] as Extension[]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(false);
      expect(testPatient.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPatient.hasActiveElement()).toBe(false);
      expect(testPatient.getActiveElement()).toEqual(new BooleanType());
      expect(testPatient.hasActive()).toBe(false);
      expect(testPatient.getActive()).toBeUndefined();
      expect(testPatient.hasName()).toBe(false);
      expect(testPatient.getName()).toEqual([] as HumanName[]);
      expect(testPatient.hasTelecom()).toBe(false);
      expect(testPatient.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPatient.hasGenderEnumType()).toBe(false);
      expect(testPatient.getGenderEnumType()).toBeUndefined();
      expect(testPatient.hasGenderElement()).toBe(false);
      expect(testPatient.getGenderElement()).toBeUndefined();
      expect(testPatient.hasGender()).toBe(false);
      expect(testPatient.getGender()).toBeUndefined();
      expect(testPatient.hasBirthDateElement()).toBe(false);
      expect(testPatient.getBirthDateElement()).toEqual(new DateType());
      expect(testPatient.hasBirthDate()).toBe(false);
      expect(testPatient.getBirthDate()).toBeUndefined();
      expect(testPatient.hasDeceased()).toBe(false);
      expect(testPatient.getDeceased()).toBeUndefined();
      expect(testPatient.hasDeceasedBooleanType()).toBe(false);
      expect(testPatient.getDeceasedBooleanType()).toBeUndefined();
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      expect(testPatient.getDeceasedDateTimeType()).toBeUndefined();
      expect(testPatient.hasAddress()).toBe(false);
      expect(testPatient.getAddress()).toEqual([] as Address[]);
      expect(testPatient.hasMaritalStatus()).toBe(false);
      expect(testPatient.getMaritalStatus()).toEqual(new CodeableConcept());
      expect(testPatient.hasMultipleBirth()).toBe(false);
      expect(testPatient.getMultipleBirth()).toBeUndefined();
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      expect(testPatient.getMultipleBirthBooleanType()).toBeUndefined();
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      expect(testPatient.getMultipleBirthIntegerType()).toBeUndefined();
      expect(testPatient.hasPhoto()).toBe(false);
      expect(testPatient.getPhoto()).toEqual([] as Attachment[]);
      expect(testPatient.hasContact()).toBe(false);
      expect(testPatient.getContact()).toEqual([] as PatientContactComponent[]);
      expect(testPatient.hasCommunication()).toBe(false);
      expect(testPatient.getCommunication()).toEqual([] as PatientCommunicationComponent[]);
      expect(testPatient.hasGeneralPractitioner()).toBe(false);
      expect(testPatient.getGeneralPractitioner()).toEqual([] as Reference[]);
      expect(testPatient.hasManagingOrganization()).toBe(false);
      expect(testPatient.getManagingOrganization()).toEqual(new Reference());
      expect(testPatient.hasLink()).toBe(false);
      expect(testPatient.getLink()).toEqual([] as PatientLinkComponent[]);
    });

    it('should properly handle property arrays when adding elements', () => {
      const testPatient = new Patient();

      testPatient.addIdentifier(VALID_IDENTIFIER_1);
      testPatient.addIdentifier(VALID_IDENTIFIER_2);
      testPatient.addIdentifier(UNDEFINED_VALUE);
      expect(testPatient.hasIdentifier()).toBe(true);
      expect(testPatient.getIdentifier()).toHaveLength(2);
      expect(testPatient.getIdentifier()).toEqual([VALID_IDENTIFIER_1, VALID_IDENTIFIER_2]);

      testPatient.addName(VALID_HUMAN_NAME);
      testPatient.addName(VALID_HUMAN_NAME_2);
      testPatient.addName(UNDEFINED_VALUE);
      expect(testPatient.hasName()).toBe(true);
      expect(testPatient.getName()).toHaveLength(2);
      expect(testPatient.getName()).toEqual([VALID_HUMAN_NAME, VALID_HUMAN_NAME_2]);

      testPatient.addTelecom(VALID_CONTACTPOINT);
      testPatient.addTelecom(VALID_CONTACTPOINT_2);
      testPatient.addTelecom(UNDEFINED_VALUE);
      expect(testPatient.hasTelecom()).toBe(true);
      expect(testPatient.getTelecom()).toHaveLength(2);
      expect(testPatient.getTelecom()).toEqual([VALID_CONTACTPOINT, VALID_CONTACTPOINT_2]);

      testPatient.addAddress(VALID_ADDRESS);
      testPatient.addAddress(VALID_ADDRESS_2);
      testPatient.addAddress(UNDEFINED_VALUE);
      expect(testPatient.hasAddress()).toBe(true);
      expect(testPatient.getAddress()).toHaveLength(2);
      expect(testPatient.getAddress()).toEqual([VALID_ADDRESS, VALID_ADDRESS_2]);

      testPatient.addPhoto(VALID_ATTACHMENT);
      testPatient.addPhoto(VALID_ATTACHMENT_2);
      testPatient.addPhoto(UNDEFINED_VALUE);
      expect(testPatient.hasPhoto()).toBe(true);
      expect(testPatient.getPhoto()).toHaveLength(2);
      expect(testPatient.getPhoto()).toEqual([VALID_ATTACHMENT, VALID_ATTACHMENT_2]);

      const contact1 = getTestPatientContactComponent('1');
      const contact2 = getTestPatientContactComponent('2');
      testPatient.addContact(contact1);
      testPatient.addContact(contact2);
      testPatient.addContact(UNDEFINED_VALUE);
      expect(testPatient.hasContact()).toBe(true);
      expect(testPatient.getContact()).toHaveLength(2);
      expect(testPatient.getContact()).toEqual([contact1, contact2]);

      const communication1 = getTestPatientCommunicationComponent('en-US');
      const communication2 = getTestPatientCommunicationComponent('en-UK');
      testPatient.addCommunication(communication1);
      testPatient.addCommunication(communication2);
      testPatient.addCommunication(UNDEFINED_VALUE);
      expect(testPatient.hasCommunication()).toBe(true);
      expect(testPatient.getCommunication()).toHaveLength(2);
      expect(testPatient.getCommunication()).toEqual([communication1, communication2]);

      testPatient.addGeneralPractitioner(VALID_REFERENCE_TYPE_PRACTITIONER);
      testPatient.addGeneralPractitioner(VALID_REFERENCE_TYPE_PRACTITIONER_2);
      testPatient.addGeneralPractitioner(UNDEFINED_VALUE);
      expect(testPatient.hasGeneralPractitioner()).toBe(true);
      expect(testPatient.getGeneralPractitioner()).toHaveLength(2);
      expect(testPatient.getGeneralPractitioner()).toEqual([
        VALID_REFERENCE_TYPE_PRACTITIONER,
        VALID_REFERENCE_TYPE_PRACTITIONER_2,
      ]);

      const link1 = getTestPatientLinkComponent('1');
      const link2 = getTestPatientLinkComponent('2');
      testPatient.addLink(link1);
      testPatient.addLink(link2);
      testPatient.addLink(UNDEFINED_VALUE);
      expect(testPatient.hasLink()).toBe(true);
      expect(testPatient.getLink()).toHaveLength(2);
      expect(testPatient.getLink()).toEqual([link1, link2]);
    });

    it('should properly handle gender enum', () => {
      let testPatient = new Patient();

      testPatient.setGenderEnumType(maleEnumCode);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_MALE);

      testPatient.setGenderEnumType(UNDEFINED_VALUE);
      expect(testPatient.hasGenderEnumType()).toBe(false);
      expect(testPatient.getGenderEnumType()).toBeUndefined();
      expect(testPatient.hasGenderElement()).toBe(false);
      expect(testPatient.getGenderElement()).toBeUndefined();
      expect(testPatient.hasGender()).toBe(false);
      expect(testPatient.getGender()).toBeUndefined();

      testPatient.setGenderElement(femaleEnumCode as CodeType);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(femaleEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(femaleEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_FEMALE);

      testPatient.setGenderElement(UNDEFINED_VALUE);
      expect(testPatient.hasGenderEnumType()).toBe(false);
      expect(testPatient.getGenderEnumType()).toBeUndefined();
      expect(testPatient.hasGenderElement()).toBe(false);
      expect(testPatient.getGenderElement()).toBeUndefined();
      expect(testPatient.hasGender()).toBe(false);
      expect(testPatient.getGender()).toBeUndefined();

      testPatient.setGender(VALID_GENDER_OTHER);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(otherEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(otherEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_OTHER);

      testPatient.setGender(UNDEFINED_VALUE);
      expect(testPatient.hasGenderEnumType()).toBe(false);
      expect(testPatient.getGenderEnumType()).toBeUndefined();
      expect(testPatient.hasGenderElement()).toBe(false);
      expect(testPatient.getGenderElement()).toBeUndefined();
      expect(testPatient.hasGender()).toBe(false);
      expect(testPatient.getGender()).toBeUndefined();

      testPatient = new Patient();

      let t = () => {
        testPatient.setGenderEnumType(new EnumCodeType(INVALID_GENDER, administrativeGenderEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value '${INVALID_GENDER}'`);

      t = () => {
        testPatient.setGenderElement(new CodeType(INVALID_GENDER));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value '${INVALID_GENDER}'`);

      t = () => {
        testPatient.setGender(INVALID_GENDER);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value '${INVALID_GENDER}'`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setGenderEnumType(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.gender; Provided type is not an instance of AdministrativeGenderEnum.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setGenderElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.gender; Provided element is not an instance of CodeType.`);

      t = () => {
        testPatient.setGender(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Patient.gender; Provided value is not an instance of fhirCode.`);
    });

    it('should properly handle reference properties', () => {
      const testPatient = new Patient();

      testPatient.setGeneralPractitioner([VALID_REFERENCE_TYPE_ORGANIZATION, VALID_REFERENCE_TYPE_PRACTITIONER]);
      expect(testPatient.hasGeneralPractitioner()).toBe(true);
      expect(testPatient.getGeneralPractitioner()).toHaveLength(2);
      expect(testPatient.getGeneralPractitioner()).toEqual([
        VALID_REFERENCE_TYPE_ORGANIZATION,
        VALID_REFERENCE_TYPE_PRACTITIONER,
      ]);

      testPatient.setGeneralPractitioner(UNDEFINED_VALUE);
      expect(testPatient.hasGeneralPractitioner()).toBe(false);

      let t = () => {
        testPatient.setGeneralPractitioner([INVALID_REFERENCE_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setGeneralPractitioner (Patient.generalPractitioner) expects argument[0] (Basic/123) to be a valid 'Reference' type`,
      );

      t = () => {
        testPatient.addGeneralPractitioner(INVALID_REFERENCE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on addGeneralPractitioner (Patient.generalPractitioner) expects argument (Basic/123) to be a valid 'Reference' type`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setGeneralPractitioner([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setGeneralPractitioner (Patient.generalPractitioner) expects argument[0] to be type of 'Reference'`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addGeneralPractitioner(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on addGeneralPractitioner (Patient.generalPractitioner) expects a single argument to be type of 'Reference | undefined | null'`,
      );

      testPatient.setManagingOrganization(VALID_REFERENCE_TYPE_ORGANIZATION);
      expect(testPatient.hasManagingOrganization()).toBe(true);
      expect(testPatient.getManagingOrganization()).toEqual(VALID_REFERENCE_TYPE_ORGANIZATION);

      testPatient.setManagingOrganization(UNDEFINED_VALUE);
      expect(testPatient.hasManagingOrganization()).toBe(false);

      t = () => {
        testPatient.setManagingOrganization(INVALID_REFERENCE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setManagingOrganization (Patient.managingOrganization) expects argument (Basic/123) to be a valid 'Reference' type`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setManagingOrganization(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setManagingOrganization (Patient.managingOrganization) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });

    it('should properly handle polymorphic properties', () => {
      const testPatient = new Patient();

      testPatient.setDeceased(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceased()).toBe(true);
      expect(testPatient.getDeceased()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedBooleanType()).toBe(true);
      expect(testPatient.getDeceasedBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      let t = () => {
        testPatient.getDeceasedDateTimeType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.deceased[x]: Expected DateTimeType but encountered boolean`);

      testPatient.setDeceased(VALID_DATETIME_TYPE);
      expect(testPatient.hasDeceased()).toBe(true);
      expect(testPatient.getDeceased()).toEqual(VALID_DATETIME_TYPE);
      expect(testPatient.hasDeceasedBooleanType()).toBe(false);
      t = () => {
        testPatient.getDeceasedBooleanType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.deceased[x]: Expected BooleanType but encountered dateTime`);
      expect(testPatient.hasDeceasedDateTimeType()).toBe(true);
      expect(testPatient.getDeceasedDateTimeType()).toEqual(VALID_DATETIME_TYPE);

      testPatient.setDeceased(UNDEFINED_VALUE);
      expect(testPatient.hasDeceased()).toBe(false);
      expect(testPatient.getDeceased()).toBeUndefined();
      expect(testPatient.hasDeceasedBooleanType()).toBe(false);
      expect(testPatient.getDeceasedBooleanType()).toBeUndefined();
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      expect(testPatient.getDeceasedDateTimeType()).toBeUndefined();

      t = () => {
        testPatient.setDeceased(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ChoiceDataTypes decorator on setDeceased (Patient.deceased[x]) expects the 'value' argument type (string) to be a supported DataType`,
      );

      testPatient.setMultipleBirth(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirth()).toBe(true);
      expect(testPatient.getMultipleBirth()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(true);
      expect(testPatient.getMultipleBirthBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      t = () => {
        testPatient.getMultipleBirthIntegerType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.multipleBirth[x]: Expected IntegerType but encountered boolean`);

      testPatient.setMultipleBirth(VALID_INTEGER_TYPE);
      expect(testPatient.hasMultipleBirth()).toBe(true);
      expect(testPatient.getMultipleBirth()).toEqual(VALID_INTEGER_TYPE);
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      t = () => {
        testPatient.getMultipleBirthBooleanType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.multipleBirth[x]: Expected BooleanType but encountered integer`);
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(true);
      expect(testPatient.getMultipleBirthIntegerType()).toEqual(VALID_INTEGER_TYPE);

      testPatient.setMultipleBirth(UNDEFINED_VALUE);
      expect(testPatient.hasMultipleBirth()).toBe(false);
      expect(testPatient.getMultipleBirth()).toBeUndefined();
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      expect(testPatient.getMultipleBirthBooleanType()).toBeUndefined();
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(false);
      expect(testPatient.getMultipleBirthIntegerType()).toBeUndefined();

      t = () => {
        testPatient.setMultipleBirth(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ChoiceDataTypes decorator on setMultipleBirth (Patient.multipleBirth[x]) expects the 'value' argument type (string) to be a supported DataType`,
      );
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      resourceType: 'Patient',
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
          id: '#PR1',
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
      name: [
        {
          family: 'Surname',
          given: ['First', 'Middle'],
          prefix: ['Mr.'],
          suffix: ['Sr.'],
        },
      ],
      telecom: [
        {
          id: 'DT-1357',
          extension: [
            {
              url: 'datatypeUrl',
              valueString: 'datatype extension string value',
            },
          ],
          system: 'phone',
          value: 'This is a valid string.',
          use: 'home',
        },
      ],
      gender: 'male',
      birthDate: '1978-01-28',
      deceasedBoolean: false,
      address: [
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
      maritalStatus: {
        text: 'This is a valid string.',
      },
      multipleBirthInteger: 2,
      photo: [
        {
          contentType: 'testCodeType',
          url: 'testUrlType',
          size: 697276,
          hash: '0f60168295bc9d6b0535feaf0975a63532959834',
          title: 'This is a valid string.',
        },
      ],
      contact: [
        {
          relationship: [
            {
              text: 'relationship unknown 1',
            },
          ],
          name: {
            family: 'Surname1',
            given: ['Firstname1', 'Middlename1'],
            prefix: ['Mr.'],
          },
          telecom: [
            {
              system: 'phone',
              value: '888-555-1234 1',
              use: 'home',
            },
          ],
          address: {
            use: 'home',
            type: 'both',
            line: ['1234 Main Street', 'APT 1'],
            city: 'Nashua',
            state: 'NH',
            postalCode: '03064',
          },
          gender: 'male',
          organization: {
            reference: 'Organization/123451',
          },
          period: {
            start: '2013-11-21T00:00:00.000Z',
          },
        },
      ],
      communication: [
        {
          language: {
            coding: [
              {
                system: 'urn:ietf:bcp:47',
                code: 'en-US',
              },
            ],
          },
          preferred: true,
        },
      ],
      generalPractitioner: [
        {
          reference: 'Practitioner/13579',
        },
      ],
      managingOrganization: {
        reference: 'Organization/123',
      },
      link: [
        {
          other: {
            reference: 'Patient/987651',
          },
          type: 'replaces',
        },
      ],
    };

    it('should properly create serialized content', () => {
      const altContactPoint = VALID_CONTACTPOINT.copy();
      altContactPoint.setId(DATATYPE_ID);
      altContactPoint.addExtension(DATATYPE_EXTENSION);

      const testPatient = new Patient();

      testPatient.setId(VALID_ID);
      testPatient.setMeta(VALID_META);
      testPatient.setImplicitRules(IMPLICIT_RULES_VALUE);
      testPatient.setLanguage(LANGUAGE_VALUE);
      testPatient.setText(VALID_NARRATIVE);
      testPatient.setContained([VALID_CONTAINED]);
      testPatient.setExtension([VALID_EXTENSION]);
      testPatient.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testPatient.setIdentifier([VALID_IDENTIFIER_1]);
      testPatient.setActive(VALID_BOOLEAN_TRUE);
      testPatient.setName([VALID_HUMAN_NAME]);
      testPatient.setTelecom([altContactPoint]);
      testPatient.setGenderEnumType(maleEnumCode);
      testPatient.setBirthDate(VALID_DATE);
      testPatient.setDeceased(VALID_BOOLEAN_TYPE_FALSE);
      testPatient.setAddress([VALID_ADDRESS]);
      testPatient.setMaritalStatus(VALID_CODEABLECONCEPT_1);
      testPatient.setMultipleBirth(VALID_INTEGER_TYPE);
      testPatient.setPhoto([VALID_ATTACHMENT]);
      const patientContactComponent = getTestPatientContactComponent('1');
      testPatient.setContact([patientContactComponent]);
      const patientCommunicationComponent = getTestPatientCommunicationComponent('en-US');
      testPatient.setCommunication([patientCommunicationComponent]);
      testPatient.setGeneralPractitioner([VALID_REFERENCE_TYPE_PRACTITIONER]);
      testPatient.setManagingOrganization(VALID_REFERENCE_TYPE_ORGANIZATION);
      const patientLinkComponent = getTestPatientLinkComponent('1');
      testPatient.setLink([patientLinkComponent]);

      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient.constructor.name).toStrictEqual('Patient');
      expect(testPatient.fhirType()).toStrictEqual('Patient');
      expect(testPatient.isEmpty()).toBe(false);

      // inherited properties from Resource/DomainResource
      expect(testPatient.hasIdElement()).toBe(true);
      expect(testPatient.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPatient.hasId()).toBe(true);
      expect(testPatient.getId()).toStrictEqual(VALID_ID);
      expect(testPatient.hasMeta()).toBe(true);
      expect(testPatient.getMeta()).toEqual(VALID_META);
      expect(testPatient.hasImplicitRulesElement()).toBe(true);
      expect(testPatient.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPatient.hasImplicitRules()).toBe(true);
      expect(testPatient.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPatient.hasLanguageElement()).toBe(true);
      expect(testPatient.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPatient.hasLanguage()).toBe(true);
      expect(testPatient.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPatient.hasText()).toBe(true);
      expect(testPatient.getText()).toEqual(VALID_NARRATIVE);
      expect(testPatient.hasContained()).toBe(true);
      expect(testPatient.getContained()).toEqual([VALID_CONTAINED]);
      expect(testPatient.hasExtension()).toBe(true);
      expect(testPatient.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatient.hasModifierExtension()).toBe(true);
      expect(testPatient.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // Patient properties
      expect(testPatient.hasIdentifier()).toBe(true);
      expect(testPatient.getIdentifier()).toEqual([VALID_IDENTIFIER_1]);
      expect(testPatient.hasActiveElement()).toBe(true);
      expect(testPatient.getActiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testPatient.hasActive()).toBe(true);
      expect(testPatient.getActive()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testPatient.hasName()).toBe(true);
      expect(testPatient.getName()).toEqual([VALID_HUMAN_NAME]);
      expect(testPatient.hasTelecom()).toBe(true);
      expect(testPatient.getTelecom()).toEqual([altContactPoint]);
      expect(testPatient.hasGenderEnumType()).toBe(true);
      expect(testPatient.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatient.hasGenderElement()).toBe(true);
      expect(testPatient.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatient.hasGender()).toBe(true);
      expect(testPatient.getGender()).toStrictEqual(VALID_GENDER_MALE);
      expect(testPatient.hasBirthDateElement()).toBe(true);
      expect(testPatient.getBirthDateElement()).toEqual(VALID_DATE_TYPE);
      expect(testPatient.hasBirthDate()).toBe(true);
      expect(testPatient.getBirthDate()).toStrictEqual(VALID_DATE);
      expect(testPatient.hasDeceased()).toBe(true);
      expect(testPatient.getDeceased()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedBooleanType()).toBe(true);
      expect(testPatient.getDeceasedBooleanType()).toEqual(VALID_BOOLEAN_TYPE_FALSE);
      expect(testPatient.hasDeceasedDateTimeType()).toBe(false);
      let t = () => {
        testPatient.getDeceasedDateTimeType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.deceased[x]: Expected DateTimeType but encountered boolean`);
      expect(testPatient.hasAddress()).toBe(true);
      expect(testPatient.getAddress()).toEqual([VALID_ADDRESS]);
      expect(testPatient.hasMaritalStatus()).toBe(true);
      expect(testPatient.getMaritalStatus()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testPatient.hasMultipleBirth()).toBe(true);
      expect(testPatient.getMultipleBirth()).toEqual(VALID_INTEGER_TYPE);
      expect(testPatient.hasMultipleBirthBooleanType()).toBe(false);
      t = () => {
        testPatient.getMultipleBirthBooleanType();
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`DataType mismatch for Patient.multipleBirth[x]: Expected BooleanType but encountered integer`);
      expect(testPatient.hasMultipleBirthIntegerType()).toBe(true);
      expect(testPatient.getMultipleBirthIntegerType()).toEqual(VALID_INTEGER_TYPE);
      expect(testPatient.hasPhoto()).toBe(true);
      expect(testPatient.getPhoto()).toEqual([VALID_ATTACHMENT]);
      expect(testPatient.hasContact()).toBe(true);
      expect(testPatient.getContact()).toEqual([patientContactComponent]);
      expect(testPatient.hasCommunication()).toBe(true);
      expect(testPatient.getCommunication()).toEqual([patientCommunicationComponent]);
      expect(testPatient.hasGeneralPractitioner()).toBe(true);
      expect(testPatient.getGeneralPractitioner()).toEqual([VALID_REFERENCE_TYPE_PRACTITIONER]);
      expect(testPatient.hasManagingOrganization()).toBe(true);
      expect(testPatient.getManagingOrganization()).toEqual(VALID_REFERENCE_TYPE_ORGANIZATION);
      expect(testPatient.hasLink()).toBe(true);
      expect(testPatient.getLink()).toEqual([patientLinkComponent]);

      expect(testPatient.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPatient: Patient | undefined = undefined;
      testPatient = Patient.parse({});
      expect(testPatient).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPatient = Patient.parse(null);
      expect(testPatient).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPatient = Patient.parse(undefined);
      expect(testPatient).toBeUndefined();
    });

    it('should return Patient for valid json', () => {
      const testPatient: Patient | undefined = Patient.parse(VALID_JSON);

      expect(testPatient).toBeDefined();
      expect(testPatient).toBeInstanceOf(Patient);
      expect(testPatient).toBeInstanceOf(DomainResource);
      expect(testPatient).toBeInstanceOf(Resource);
      expect(testPatient).toBeInstanceOf(Base);
      expect(testPatient?.constructor.name).toStrictEqual('Patient');
      expect(testPatient?.fhirType()).toStrictEqual('Patient');
      expect(testPatient?.isEmpty()).toBe(false);
      expect(testPatient?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    it('should throw errors for invalid arguments', () => {
      const testPatient = new Patient();

      let t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setIdentifier([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.identifier; Provided value array has an element that is not an instance of Identifier.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addIdentifier(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.identifier; Provided element is not an instance of Identifier.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setActiveElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.active; Provided element is not an instance of BooleanType.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setActive(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Patient.active (Invalid datatype)`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setName([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.name; Provided value array has an element that is not an instance of HumanName.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addName(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.name; Provided element is not an instance of HumanName.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setTelecom([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.telecom; Provided value array has an element that is not an instance of ContactPoint.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addTelecom(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.telecom; Provided element is not an instance of ContactPoint.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setBirthDateElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.birthDate; Provided element is not an instance of DateType.`);

      t = () => {
        testPatient.setBirthDate(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Patient.birthDate (Invalid datatype)`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setAddress([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.address; Provided value array has an element that is not an instance of Address.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addAddress(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.address; Provided element is not an instance of Address.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setMaritalStatus(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.maritalStatus; Provided element is not an instance of CodeableConcept.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setPhoto([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.photo; Provided value array has an element that is not an instance of Attachment.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addPhoto(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.photo; Provided element is not an instance of Attachment.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setContact([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.contact; Provided value array has an element that is not an instance of PatientContactComponent.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addContact(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.contact; Provided element is not an instance of PatientContactComponent.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setCommunication([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.communication; Provided value array has an element that is not an instance of PatientCommunicationComponent.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addCommunication(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.communication; Provided element is not an instance of PatientCommunicationComponent.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.setLink([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.link; Provided value array has an element that is not an instance of PatientLinkComponent.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatient.addLink(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.link; Provided element is not an instance of PatientLinkComponent.`);
    });
  });
});

function getTestPatientContactComponent(id: string): PatientContactComponent {
  const VALID_CODEABLECONCEPT = new CodeableConcept();
  VALID_CODEABLECONCEPT.setText(`relationship unknown ${id}`);
  const VALID_HUMAN_NAME = new HumanName();
  VALID_HUMAN_NAME.setFamily(`Surname${id}`);
  VALID_HUMAN_NAME.setGiven([`Firstname${id}`, `Middlename${id}`]);
  VALID_HUMAN_NAME.addPrefix('Mr.');
  const VALID_CONTACTPOINT = new ContactPoint();
  VALID_CONTACTPOINT.setSystem('phone');
  VALID_CONTACTPOINT.setValue(`888-555-1234 ${id}`);
  VALID_CONTACTPOINT.setUse('home');
  const VALID_ADDRESS = new Address();
  VALID_ADDRESS.setUse('home');
  VALID_ADDRESS.setType('both');
  VALID_ADDRESS.setLine(['1234 Main Street', `APT ${id}`]);
  VALID_ADDRESS.setCity('Nashua');
  VALID_ADDRESS.setState('NH');
  VALID_ADDRESS.setPostalCode('03064');
  const VALID_REFERENCE_ORGANIZATION = new Reference();
  VALID_REFERENCE_ORGANIZATION.setReference(`Organization/12345${id}`);
  const VALID_PERIOD = new Period();
  VALID_PERIOD.setStart('2013-11-21T00:00:00.000Z');

  const patientContactComponent = new PatientContactComponent();
  patientContactComponent.setRelationship([VALID_CODEABLECONCEPT]);
  patientContactComponent.setName(VALID_HUMAN_NAME);
  patientContactComponent.setTelecom([VALID_CONTACTPOINT]);
  patientContactComponent.setAddress(VALID_ADDRESS);
  patientContactComponent.setGender('male');
  patientContactComponent.setOrganization(VALID_REFERENCE_ORGANIZATION);
  patientContactComponent.setPeriod(VALID_PERIOD);

  return patientContactComponent;
}

function getTestPatientCommunicationComponent(langCode: string): PatientCommunicationComponent {
  const langCoding: Coding = new Coding();
  langCoding.setSystem('urn:ietf:bcp:47');
  langCoding.setCode(langCode);
  const language: CodeableConcept = new CodeableConcept();
  language.addCoding(langCoding);

  const patientCommunicationComponent = new PatientCommunicationComponent(language);
  patientCommunicationComponent.setPreferred(langCode === 'en-US');

  return patientCommunicationComponent;
}

function getTestPatientLinkComponent(id: string): PatientLinkComponent {
  const VALID_REFERENCE_PATIENT = new Reference();
  VALID_REFERENCE_PATIENT.setReference(`Patient/98765${id}`);
  return new PatientLinkComponent(VALID_REFERENCE_PATIENT, 'replaces');
}
