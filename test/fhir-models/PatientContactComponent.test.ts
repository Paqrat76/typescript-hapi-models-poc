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

import { AssertionError } from 'node:assert';
import { PatientContactComponent } from '../../src/fhir-models/Patient';
import { Base } from '@src/fhir-core/base-models/Base';
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { AdministrativeGenderEnum } from '../../src/fhir-models/code-systems/AdministrativeGenderEnum';
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  MockCodeEnum,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_ID,
  VALID_MODIFIER_EXTENSION,
} from '../test-utils';

describe('PatientContactComponent', () => {
  const VALID_URI = `testUriType`;
  const VALID_URI_2 = `testUriType2`;
  const VALID_CODE = `testCodeType`;
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_2 = 'This is another valid string!';

  const VALID_CODING = new Coding();
  VALID_CODING.setSystem(VALID_URI);
  VALID_CODING.setCode(VALID_CODE);
  VALID_CODING.setDisplay(VALID_STRING);
  const VALID_CODING_2 = new Coding();
  VALID_CODING_2.setSystem(VALID_URI_2);
  VALID_CODING_2.setCode(VALID_CODE_2);
  VALID_CODING_2.setDisplay(VALID_STRING_2);
  const VALID_CODEABLECONCEPT = new CodeableConcept();
  VALID_CODEABLECONCEPT.addCoding(VALID_CODING);
  const VALID_CODEABLECONCEPT_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_2.addCoding(VALID_CODING_2);

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
  VALID_CONTACTPOINT.setValue(VALID_STRING);
  VALID_CONTACTPOINT.setUse(VALID_USE_HOME);
  const VALID_CONTACTPOINT_2 = new ContactPoint();
  VALID_CONTACTPOINT_2.setSystem(VALID_SYSTEM_EMAIL);
  VALID_CONTACTPOINT_2.setValue(VALID_STRING_2);
  VALID_CONTACTPOINT_2.setUse(VALID_USE_WORK);

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

  const VALID_GENDER_MALE = 'male';
  const VALID_GENDER_FEMALE = 'female';
  const VALID_GENDER_OTHER = 'other';
  const INVALID_GENDER = 'invalidCode';

  const VALID_REFERENCE_ORGANIZATION_VALUE = 'Organization/12345';
  const VALID_REFERENCE_ORGANIZATION = new Reference();
  VALID_REFERENCE_ORGANIZATION.setReference(VALID_REFERENCE_ORGANIZATION_VALUE);
  const VALID_REFERENCE_ORGANIZATION_VALUE_2 = 'Organization/67890';
  const VALID_REFERENCE_ORGANIZATION_2 = new Reference();
  VALID_REFERENCE_ORGANIZATION_2.setReference(VALID_REFERENCE_ORGANIZATION_VALUE_2);
  const INVALID_REFERENCE_ORGANIZATION_VALUE = 'Location/9876';
  const INVALID_REFERENCE_ORGANIZATION = new Reference();
  INVALID_REFERENCE_ORGANIZATION.setReference(INVALID_REFERENCE_ORGANIZATION_VALUE);

  const VALID_START_DATETIME = `2017-01-01T00:00:00.000Z`;
  const VALID_START_DATETIME_2 = `2017-01-01T00:15:00.000Z`;
  const VALID_END_DATETIME = `2017-01-01T01:00:00.000Z`;
  const VALID_END_DATETIME_2 = `2017-01-01T01:15:00.000Z`;
  const VALID_PERIOD = new Period();
  VALID_PERIOD.setStart(VALID_START_DATETIME);
  VALID_PERIOD.setEnd(VALID_END_DATETIME);
  const VALID_PERIOD_2 = new Period();
  VALID_PERIOD_2.setStart(VALID_START_DATETIME_2);
  VALID_PERIOD_2.setEnd(VALID_END_DATETIME_2);

  let administrativeGenderEnum: AdministrativeGenderEnum;
  let maleEnumCode: EnumCodeType;
  let femaleEnumCode: EnumCodeType;
  let otherEnumCode: EnumCodeType;
  let inValidTypeEnum: MockCodeEnum;
  beforeAll(() => {
    administrativeGenderEnum = new AdministrativeGenderEnum();
    maleEnumCode = new EnumCodeType(VALID_GENDER_MALE, administrativeGenderEnum);
    femaleEnumCode = new EnumCodeType(VALID_GENDER_FEMALE, administrativeGenderEnum);
    otherEnumCode = new EnumCodeType(VALID_GENDER_OTHER, administrativeGenderEnum);
    inValidTypeEnum = new MockCodeEnum();
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testPatientContactComponent = new PatientContactComponent();

      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent).toBeInstanceOf(PatientContactComponent);
      expect(testPatientContactComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientContactComponent).toBeInstanceOf(Element);
      expect(testPatientContactComponent).toBeInstanceOf(Base);
      expect(testPatientContactComponent.constructor.name).toStrictEqual('PatientContactComponent');
      expect(testPatientContactComponent.fhirType()).toStrictEqual('Patient.contact');
      expect(testPatientContactComponent.isEmpty()).toBe(true);
      expect(testPatientContactComponent.toJSON()).toBeUndefined();

      // inherited properties from BackboneElement
      expect(testPatientContactComponent.hasId()).toBe(false);
      expect(testPatientContactComponent.getId()).toBeUndefined();
      expect(testPatientContactComponent.hasExtension()).toBe(false);
      expect(testPatientContactComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientContactComponent.hasModifierExtension()).toBe(false);
      expect(testPatientContactComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientContactComponent properties
      expect(testPatientContactComponent.hasRelationship()).toBe(false);
      expect(testPatientContactComponent.getRelationship()).toEqual([] as CodeableConcept[]);
      expect(testPatientContactComponent.hasName()).toBe(false);
      expect(testPatientContactComponent.getName()).toEqual(new HumanName());
      expect(testPatientContactComponent.hasTelecom()).toBe(false);
      expect(testPatientContactComponent.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPatientContactComponent.hasAddress()).toBe(false);
      expect(testPatientContactComponent.getAddress()).toEqual(new Address());
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(false);
      expect(testPatientContactComponent.getGenderEnumType()).toBeUndefined();
      expect(testPatientContactComponent.hasGenderElement()).toBe(false);
      expect(testPatientContactComponent.getGenderElement()).toBeUndefined();
      expect(testPatientContactComponent.hasGender()).toBe(false);
      expect(testPatientContactComponent.getGender()).toBeUndefined();
      expect(testPatientContactComponent.hasOrganization()).toBe(false);
      expect(testPatientContactComponent.getOrganization()).toEqual(new Reference());
      expect(testPatientContactComponent.hasPeriod()).toBe(false);
      expect(testPatientContactComponent.getPeriod()).toEqual(new Period());
    });

    it('should properly copy()', () => {
      const patientContactComponent = new PatientContactComponent();
      patientContactComponent.setId(VALID_ID);
      patientContactComponent.setExtension([VALID_EXTENSION]);
      patientContactComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      patientContactComponent.setRelationship([VALID_CODEABLECONCEPT]);
      patientContactComponent.setName(VALID_HUMAN_NAME);
      patientContactComponent.setTelecom([VALID_CONTACTPOINT]);
      patientContactComponent.setAddress(VALID_ADDRESS);
      patientContactComponent.setGenderEnumType(maleEnumCode);
      patientContactComponent.setOrganization(VALID_REFERENCE_ORGANIZATION);
      patientContactComponent.setPeriod(VALID_PERIOD);

      let testPatientContactComponent = patientContactComponent.copy();
      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent).toBeInstanceOf(PatientContactComponent);
      expect(testPatientContactComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientContactComponent).toBeInstanceOf(Element);
      expect(testPatientContactComponent).toBeInstanceOf(Base);
      expect(testPatientContactComponent.constructor.name).toStrictEqual('PatientContactComponent');
      expect(testPatientContactComponent.fhirType()).toStrictEqual('Patient.contact');
      expect(testPatientContactComponent.isEmpty()).toBe(false);
      expect(testPatientContactComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPatientContactComponent.hasId()).toBe(true);
      expect(testPatientContactComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPatientContactComponent.hasExtension()).toBe(true);
      expect(testPatientContactComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatientContactComponent.hasModifierExtension()).toBe(true);
      expect(testPatientContactComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PatientContactComponent properties
      expect(testPatientContactComponent.hasRelationship()).toBe(true);
      expect(testPatientContactComponent.getRelationship()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPatientContactComponent.hasName()).toBe(true);
      expect(testPatientContactComponent.getName()).toEqual(VALID_HUMAN_NAME);
      expect(testPatientContactComponent.hasTelecom()).toBe(true);
      expect(testPatientContactComponent.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPatientContactComponent.hasAddress()).toBe(true);
      expect(testPatientContactComponent.getAddress()).toEqual(VALID_ADDRESS);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_MALE);
      expect(testPatientContactComponent.hasOrganization()).toBe(true);
      expect(testPatientContactComponent.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPatientContactComponent.hasPeriod()).toBe(true);
      expect(testPatientContactComponent.getPeriod()).toEqual(VALID_PERIOD);

      // Reset to empty

      patientContactComponent.setId(UNDEFINED_VALUE);
      patientContactComponent.setExtension(UNDEFINED_VALUE);
      patientContactComponent.setModifierExtension(UNDEFINED_VALUE);

      patientContactComponent.setRelationship(UNDEFINED_VALUE);
      patientContactComponent.setName(UNDEFINED_VALUE);
      patientContactComponent.setTelecom(UNDEFINED_VALUE);
      patientContactComponent.setAddress(UNDEFINED_VALUE);
      patientContactComponent.setGenderEnumType(UNDEFINED_VALUE);
      patientContactComponent.setOrganization(UNDEFINED_VALUE);
      patientContactComponent.setPeriod(UNDEFINED_VALUE);

      testPatientContactComponent = patientContactComponent.copy();

      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent).toBeInstanceOf(PatientContactComponent);
      expect(testPatientContactComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientContactComponent).toBeInstanceOf(Element);
      expect(testPatientContactComponent).toBeInstanceOf(Base);
      expect(testPatientContactComponent.constructor.name).toStrictEqual('PatientContactComponent');
      expect(testPatientContactComponent.fhirType()).toStrictEqual('Patient.contact');
      expect(testPatientContactComponent.isEmpty()).toBe(true);
      expect(testPatientContactComponent.toJSON()).toBeUndefined();

      // inherited properties from BackboneElement
      expect(testPatientContactComponent.hasId()).toBe(false);
      expect(testPatientContactComponent.getId()).toBeUndefined();
      expect(testPatientContactComponent.hasExtension()).toBe(false);
      expect(testPatientContactComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientContactComponent.hasModifierExtension()).toBe(false);
      expect(testPatientContactComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientContactComponent properties
      expect(testPatientContactComponent.hasRelationship()).toBe(false);
      expect(testPatientContactComponent.getRelationship()).toEqual([] as CodeableConcept[]);
      expect(testPatientContactComponent.hasName()).toBe(false);
      expect(testPatientContactComponent.getName()).toEqual(new HumanName());
      expect(testPatientContactComponent.hasTelecom()).toBe(false);
      expect(testPatientContactComponent.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPatientContactComponent.hasAddress()).toBe(false);
      expect(testPatientContactComponent.getAddress()).toEqual(new Address());
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(false);
      expect(testPatientContactComponent.getGenderEnumType()).toBeUndefined();
      expect(testPatientContactComponent.hasGenderElement()).toBe(false);
      expect(testPatientContactComponent.getGenderElement()).toBeUndefined();
      expect(testPatientContactComponent.hasGender()).toBe(false);
      expect(testPatientContactComponent.getGender()).toBeUndefined();
      expect(testPatientContactComponent.hasOrganization()).toBe(false);
      expect(testPatientContactComponent.getOrganization()).toEqual(new Reference());
      expect(testPatientContactComponent.hasPeriod()).toBe(false);
      expect(testPatientContactComponent.getPeriod()).toEqual(new Period());
    });

    it('should be properly reset by modifying all properties', () => {
      const testPatientContactComponent = new PatientContactComponent();
      testPatientContactComponent.setRelationship([VALID_CODEABLECONCEPT]);
      testPatientContactComponent.setName(VALID_HUMAN_NAME);
      testPatientContactComponent.setTelecom([VALID_CONTACTPOINT]);
      testPatientContactComponent.setAddress(VALID_ADDRESS);
      testPatientContactComponent.setGenderEnumType(maleEnumCode);
      testPatientContactComponent.setOrganization(VALID_REFERENCE_ORGANIZATION);
      testPatientContactComponent.setPeriod(VALID_PERIOD);

      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testPatientContactComponent.hasId()).toBe(false);
      expect(testPatientContactComponent.getId()).toBeUndefined();
      expect(testPatientContactComponent.hasExtension()).toBe(false);
      expect(testPatientContactComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientContactComponent.hasModifierExtension()).toBe(false);
      expect(testPatientContactComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientContactComponent properties
      expect(testPatientContactComponent.hasRelationship()).toBe(true);
      expect(testPatientContactComponent.getRelationship()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPatientContactComponent.hasName()).toBe(true);
      expect(testPatientContactComponent.getName()).toEqual(VALID_HUMAN_NAME);
      expect(testPatientContactComponent.hasTelecom()).toBe(true);
      expect(testPatientContactComponent.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPatientContactComponent.hasAddress()).toBe(true);
      expect(testPatientContactComponent.getAddress()).toEqual(VALID_ADDRESS);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_MALE);
      expect(testPatientContactComponent.hasOrganization()).toBe(true);
      expect(testPatientContactComponent.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPatientContactComponent.hasPeriod()).toBe(true);
      expect(testPatientContactComponent.getPeriod()).toEqual(VALID_PERIOD);

      // Reset

      testPatientContactComponent.setId(VALID_ID);
      testPatientContactComponent.setExtension([VALID_EXTENSION]);
      testPatientContactComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testPatientContactComponent.setRelationship([VALID_CODEABLECONCEPT_2]);
      testPatientContactComponent.setName(VALID_HUMAN_NAME_2);
      testPatientContactComponent.setTelecom([VALID_CONTACTPOINT_2]);
      testPatientContactComponent.setAddress(VALID_ADDRESS_2);
      testPatientContactComponent.setGenderEnumType(femaleEnumCode);
      testPatientContactComponent.setOrganization(VALID_REFERENCE_ORGANIZATION_2);
      testPatientContactComponent.setPeriod(VALID_PERIOD_2);

      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testPatientContactComponent.hasId()).toBe(true);
      expect(testPatientContactComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPatientContactComponent.hasExtension()).toBe(true);
      expect(testPatientContactComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatientContactComponent.hasModifierExtension()).toBe(true);
      expect(testPatientContactComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PatientContactComponent properties
      expect(testPatientContactComponent.hasRelationship()).toBe(true);
      expect(testPatientContactComponent.getRelationship()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPatientContactComponent.hasName()).toBe(true);
      expect(testPatientContactComponent.getName()).toEqual(VALID_HUMAN_NAME_2);
      expect(testPatientContactComponent.hasTelecom()).toBe(true);
      expect(testPatientContactComponent.getTelecom()).toEqual([VALID_CONTACTPOINT_2]);
      expect(testPatientContactComponent.hasAddress()).toBe(true);
      expect(testPatientContactComponent.getAddress()).toEqual(VALID_ADDRESS_2);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(femaleEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(femaleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_FEMALE);
      expect(testPatientContactComponent.hasOrganization()).toBe(true);
      expect(testPatientContactComponent.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION_2);
      expect(testPatientContactComponent.hasPeriod()).toBe(true);
      expect(testPatientContactComponent.getPeriod()).toEqual(VALID_PERIOD_2);
    });

    it('should properly handle gender enum', () => {
      let testPatientContactComponent = new PatientContactComponent();

      testPatientContactComponent.setGenderEnumType(maleEnumCode);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_MALE);

      testPatientContactComponent.setGenderEnumType(UNDEFINED_VALUE);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(false);
      expect(testPatientContactComponent.getGenderEnumType()).toBeUndefined();
      expect(testPatientContactComponent.hasGenderElement()).toBe(false);
      expect(testPatientContactComponent.getGenderElement()).toBeUndefined();
      expect(testPatientContactComponent.hasGender()).toBe(false);
      expect(testPatientContactComponent.getGender()).toBeUndefined();

      testPatientContactComponent.setGenderElement(femaleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(femaleEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(femaleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_FEMALE);

      testPatientContactComponent.setGenderElement(UNDEFINED_VALUE);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(false);
      expect(testPatientContactComponent.getGenderEnumType()).toBeUndefined();
      expect(testPatientContactComponent.hasGenderElement()).toBe(false);
      expect(testPatientContactComponent.getGenderElement()).toBeUndefined();
      expect(testPatientContactComponent.hasGender()).toBe(false);
      expect(testPatientContactComponent.getGender()).toBeUndefined();

      testPatientContactComponent.setGender(VALID_GENDER_OTHER);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(otherEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(otherEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_OTHER);

      testPatientContactComponent.setGender(UNDEFINED_VALUE);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(false);
      expect(testPatientContactComponent.getGenderEnumType()).toBeUndefined();
      expect(testPatientContactComponent.hasGenderElement()).toBe(false);
      expect(testPatientContactComponent.getGenderElement()).toBeUndefined();
      expect(testPatientContactComponent.hasGender()).toBe(false);
      expect(testPatientContactComponent.getGender()).toBeUndefined();

      testPatientContactComponent = new PatientContactComponent();

      let t = () => {
        testPatientContactComponent.setGenderEnumType(new EnumCodeType(INVALID_GENDER, administrativeGenderEnum));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value '${INVALID_GENDER}'`);

      t = () => {
        testPatientContactComponent.setGenderElement(new CodeType(INVALID_GENDER));
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value '${INVALID_GENDER}'`);

      t = () => {
        testPatientContactComponent.setGender(INVALID_GENDER);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value '${INVALID_GENDER}'`);
    });

    it('should properly initialize property arrays when adding elements', () => {
      const testPatientContactComponent = new PatientContactComponent();

      testPatientContactComponent.addRelationship(VALID_CODEABLECONCEPT);
      testPatientContactComponent.addRelationship(VALID_CODEABLECONCEPT_2);
      testPatientContactComponent.addRelationship(UNDEFINED_VALUE);
      expect(testPatientContactComponent.hasRelationship()).toBe(true);
      expect(testPatientContactComponent.getRelationship()).toHaveLength(2);
      expect(testPatientContactComponent.getRelationship()).toEqual([VALID_CODEABLECONCEPT, VALID_CODEABLECONCEPT_2]);

      testPatientContactComponent.addTelecom(VALID_CONTACTPOINT);
      testPatientContactComponent.addTelecom(VALID_CONTACTPOINT_2);
      testPatientContactComponent.addTelecom(UNDEFINED_VALUE);
      expect(testPatientContactComponent.hasTelecom()).toBe(true);
      expect(testPatientContactComponent.getTelecom()).toHaveLength(2);
      expect(testPatientContactComponent.getTelecom()).toEqual([VALID_CONTACTPOINT, VALID_CONTACTPOINT_2]);
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
      relationship: [
        {
          id: 'DT-1357',
          extension: [
            {
              url: 'datatypeUrl',
              valueString: 'datatype extension string value',
            },
          ],
          coding: [
            {
              system: 'testUriType',
              code: 'testCodeType',
              display: 'This is a valid string.',
            },
          ],
        },
      ],
      name: {
        family: 'Surname',
        given: ['First', 'Middle'],
        prefix: ['Mr.'],
        suffix: ['Sr.'],
      },
      telecom: [
        {
          system: 'phone',
          value: 'This is a valid string.',
          use: 'home',
        },
      ],
      address: {
        use: 'home',
        type: 'postal',
        line: ['1234 Main ST', 'APT 15A'],
        city: 'Nashua',
        state: 'NH',
        postalCode: '03064',
        country: 'US',
      },
      gender: 'male',
      organization: {
        reference: 'Organization/12345',
      },
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };

    it('should properly create serialized content', () => {
      const relationship = VALID_CODEABLECONCEPT.copy();
      relationship.setId(DATATYPE_ID);
      relationship.addExtension(DATATYPE_EXTENSION);

      const testPatientContactComponent = new PatientContactComponent();
      testPatientContactComponent.setId(VALID_ID);
      testPatientContactComponent.setExtension([VALID_EXTENSION]);
      testPatientContactComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testPatientContactComponent.setRelationship([relationship]);
      testPatientContactComponent.setName(VALID_HUMAN_NAME);
      testPatientContactComponent.setTelecom([VALID_CONTACTPOINT]);
      testPatientContactComponent.setAddress(VALID_ADDRESS);
      testPatientContactComponent.setGenderEnumType(maleEnumCode);
      testPatientContactComponent.setOrganization(VALID_REFERENCE_ORGANIZATION);
      testPatientContactComponent.setPeriod(VALID_PERIOD);

      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent).toBeInstanceOf(PatientContactComponent);
      expect(testPatientContactComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientContactComponent).toBeInstanceOf(Element);
      expect(testPatientContactComponent).toBeInstanceOf(Base);
      expect(testPatientContactComponent.constructor.name).toStrictEqual('PatientContactComponent');
      expect(testPatientContactComponent.fhirType()).toStrictEqual('Patient.contact');
      expect(testPatientContactComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testPatientContactComponent.hasId()).toBe(true);
      expect(testPatientContactComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPatientContactComponent.hasExtension()).toBe(true);
      expect(testPatientContactComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatientContactComponent.hasModifierExtension()).toBe(true);
      expect(testPatientContactComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PatientContactComponent properties
      expect(testPatientContactComponent.hasRelationship()).toBe(true);
      expect(testPatientContactComponent.getRelationship()).toEqual([relationship]);
      expect(testPatientContactComponent.hasName()).toBe(true);
      expect(testPatientContactComponent.getName()).toEqual(VALID_HUMAN_NAME);
      expect(testPatientContactComponent.hasTelecom()).toBe(true);
      expect(testPatientContactComponent.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPatientContactComponent.hasAddress()).toBe(true);
      expect(testPatientContactComponent.getAddress()).toEqual(VALID_ADDRESS);
      expect(testPatientContactComponent.hasGenderEnumType()).toBe(true);
      expect(testPatientContactComponent.getGenderEnumType()).toEqual(maleEnumCode);
      expect(testPatientContactComponent.hasGenderElement()).toBe(true);
      expect(testPatientContactComponent.getGenderElement()).toEqual(maleEnumCode as CodeType);
      expect(testPatientContactComponent.hasGender()).toBe(true);
      expect(testPatientContactComponent.getGender()).toStrictEqual(VALID_GENDER_MALE);
      expect(testPatientContactComponent.hasOrganization()).toBe(true);
      expect(testPatientContactComponent.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPatientContactComponent.hasPeriod()).toBe(true);
      expect(testPatientContactComponent.getPeriod()).toEqual(VALID_PERIOD);

      expect(testPatientContactComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPatientContactComponent: PatientContactComponent | undefined;
      testPatientContactComponent = PatientContactComponent.parse({});
      expect(testPatientContactComponent).toBeUndefined();

      testPatientContactComponent = PatientContactComponent.parse(null);
      expect(testPatientContactComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPatientContactComponent = PatientContactComponent.parse(undefined);
      expect(testPatientContactComponent).toBeUndefined();
    });

    it('should return GroupMemberComponent for valid json', () => {
      const testPatientContactComponent: PatientContactComponent | undefined =
        PatientContactComponent.parse(VALID_JSON);

      expect(testPatientContactComponent).toBeDefined();
      expect(testPatientContactComponent).toBeInstanceOf(PatientContactComponent);
      expect(testPatientContactComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientContactComponent).toBeInstanceOf(Element);
      expect(testPatientContactComponent).toBeInstanceOf(Base);
      expect(testPatientContactComponent?.constructor.name).toStrictEqual('PatientContactComponent');
      expect(testPatientContactComponent?.fhirType()).toStrictEqual('Patient.contact');
      expect(testPatientContactComponent?.isEmpty()).toBe(false);

      expect(testPatientContactComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    it('should throw errors for invalid arguments', () => {
      const testPatientContactComponent = new PatientContactComponent();

      let t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setRelationship([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.contact.relationship; Provided value array has an element that is not an instance of CodeableConcept.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.addRelationship(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.contact.relationship; Provided element is not an instance of CodeableConcept.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setName(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.contact.name; Provided element is not an instance of HumanName.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setTelecom([INVALID_NON_STRING_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.contact.telecom; Provided value array has an element that is not an instance of ContactPoint.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.addTelecom(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.contact.telecom; Provided element is not an instance of ContactPoint.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setAddress(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.contact.address; Provided element is not an instance of Address.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setGenderEnumType(inValidTypeEnum);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.contact.gender; Provided type is not an instance of AdministrativeGenderEnum.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setGenderEnumType(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.contact.gender; Provided type is not an instance of AdministrativeGenderEnum.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setGenderElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.contact.gender; Provided element is not an instance of CodeType.`);

      t = () => {
        testPatientContactComponent.setGender(INVALID_GENDER);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown AdministrativeGenderEnum 'code' value 'invalidCode'`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setGender(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Patient.contact.gender; Provided value is not an instance of fhirCode.`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setOrganization(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOrganization (Patient.contact.organization) expects a single argument to be type of 'Reference | undefined | null'`,
      );

      t = () => {
        testPatientContactComponent.setOrganization(INVALID_REFERENCE_ORGANIZATION);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOrganization (Patient.contact.organization) expects argument (Location/9876) to be a valid 'Reference' type`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientContactComponent.setPeriod(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.contact.period; Provided element is not an instance of Period.`);
    });
  });
});
