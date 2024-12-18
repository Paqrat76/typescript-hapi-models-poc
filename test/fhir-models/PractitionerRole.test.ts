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
import {
  PractitionerRole,
  PractitionerRoleAvailableTimeComponent,
  PractitionerRoleNotAvailableComponent,
} from '@src/fhir-models/PractitionerRole';
import { Base } from '@src/fhir-core/base-models/Base';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  IMPLICIT_RULES_VALUE,
  IMPLICIT_RULES_VALUE_2,
  INVALID_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  LANGUAGE_VALUE,
  LANGUAGE_VALUE_2,
  MockComplexDataType,
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

describe('PractitionerRole', () => {
  const VALID_IDENTIFIER_VALUE = 'Identifier value 1';
  const IDENTIFIER_TYPE = new Identifier();
  IDENTIFIER_TYPE.setValue(VALID_IDENTIFIER_VALUE);
  const VALID_IDENTIFIER_VALUE_2 = 'Identifier value 2';
  const IDENTIFIER_TYPE_2 = new Identifier();
  IDENTIFIER_TYPE_2.setValue(VALID_IDENTIFIER_VALUE_2);

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

  const VALID_REFERENCE_PRACTITIONER_VALUE = 'Practitioner/12345';
  const VALID_REFERENCE_PRACTITIONER = new Reference();
  VALID_REFERENCE_PRACTITIONER.setReference(VALID_REFERENCE_PRACTITIONER_VALUE);
  const VALID_REFERENCE_PRACTITIONER_VALUE_2 = 'Practitioner/54321';
  const VALID_REFERENCE_PRACTITIONER_2 = new Reference();
  VALID_REFERENCE_PRACTITIONER_2.setReference(VALID_REFERENCE_PRACTITIONER_VALUE_2);

  const VALID_REFERENCE_ORGANIZATION_VALUE = 'Organization/67890';
  const VALID_REFERENCE_ORGANIZATION = new Reference();
  VALID_REFERENCE_ORGANIZATION.setReference(VALID_REFERENCE_ORGANIZATION_VALUE);
  const VALID_REFERENCE_ORGANIZATION_VALUE_2 = 'Organization/09876';
  const VALID_REFERENCE_ORGANIZATION_2 = new Reference();
  VALID_REFERENCE_ORGANIZATION_2.setReference(VALID_REFERENCE_ORGANIZATION_VALUE_2);

  const VALID_REFERENCE_LOCATION_VALUE = 'Location/135';
  const VALID_REFERENCE_LOCATION = new Reference();
  VALID_REFERENCE_LOCATION.setReference(VALID_REFERENCE_LOCATION_VALUE);
  const VALID_REFERENCE_LOCATION_VALUE_2 = 'Location/531';
  const VALID_REFERENCE_LOCATION_2 = new Reference();
  VALID_REFERENCE_LOCATION_2.setReference(VALID_REFERENCE_LOCATION_VALUE_2);

  const VALID_REFERENCE_HEALTHCARE_SERVICE_VALUE = 'HealthcareService/246';
  const VALID_REFERENCE_HEALTHCARE_SERVICE = new Reference();
  VALID_REFERENCE_HEALTHCARE_SERVICE.setReference(VALID_REFERENCE_HEALTHCARE_SERVICE_VALUE);
  const VALID_REFERENCE_HEALTHCARE_SERVICE_VALUE_2 = 'HealthcareService/642';
  const VALID_REFERENCE_HEALTHCARE_SERVICE_2 = new Reference();
  VALID_REFERENCE_HEALTHCARE_SERVICE_2.setReference(VALID_REFERENCE_HEALTHCARE_SERVICE_VALUE_2);

  const VALID_REFERENCE_ENDPOINT_VALUE = 'Endpoint/987';
  const VALID_REFERENCE_ENDPOINT = new Reference();
  VALID_REFERENCE_ENDPOINT.setReference(VALID_REFERENCE_ENDPOINT_VALUE);
  const VALID_REFERENCE_ENDPOINT_VALUE_2 = 'Endpoint/789';
  const VALID_REFERENCE_ENDPOINT_2 = new Reference();
  VALID_REFERENCE_ENDPOINT_2.setReference(VALID_REFERENCE_ENDPOINT_VALUE_2);

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

  const VALID_DOW_MON = `mon`;
  const VALID_DOW_FRI = `fri`;
  const VALID_START_TIME = `08:00:00`;
  const VALID_END_TIME = `17:00:00`;
  const VALID_START_TIME_2 = `09:00:00`;
  const VALID_END_TIME_2 = `15:00:00`;
  const VALID_AVAILABLE_TIME = new PractitionerRoleAvailableTimeComponent();
  VALID_AVAILABLE_TIME.addDaysOfWeek(VALID_DOW_MON);
  VALID_AVAILABLE_TIME.setAllDay(false);
  VALID_AVAILABLE_TIME.setAvailableStartTime(VALID_START_TIME);
  VALID_AVAILABLE_TIME.setAvailableEndTime(VALID_END_TIME);
  const VALID_AVAILABLE_TIME_2 = new PractitionerRoleAvailableTimeComponent();
  VALID_AVAILABLE_TIME_2.addDaysOfWeek(VALID_DOW_FRI);
  VALID_AVAILABLE_TIME_2.setAllDay(false);
  VALID_AVAILABLE_TIME_2.setAvailableStartTime(VALID_START_TIME_2);
  VALID_AVAILABLE_TIME_2.setAvailableEndTime(VALID_END_TIME_2);

  const VALID_NOT_AVAILABLE = new PractitionerRoleNotAvailableComponent(VALID_STRING);
  VALID_NOT_AVAILABLE.setDuring(VALID_PERIOD);
  const VALID_NOT_AVAILABLE_2 = new PractitionerRoleNotAvailableComponent(VALID_STRING_2);
  VALID_NOT_AVAILABLE_2.setDuring(VALID_PERIOD_2);

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testPractitionerRole = new PractitionerRole();

      expect(testPractitionerRole).toBeDefined();
      expect(testPractitionerRole).toBeInstanceOf(PractitionerRole);
      expect(testPractitionerRole).toBeInstanceOf(DomainResource);
      expect(testPractitionerRole).toBeInstanceOf(Resource);
      expect(testPractitionerRole).toBeInstanceOf(Base);
      expect(testPractitionerRole.constructor.name).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.fhirType()).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.isEmpty()).toBe(true);
      expect(testPractitionerRole.toJSON()).toBeUndefined();

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(false);
      expect(testPractitionerRole.getIdElement()).toEqual(new IdType());
      expect(testPractitionerRole.hasId()).toBe(false);
      expect(testPractitionerRole.getId()).toBeUndefined();
      expect(testPractitionerRole.hasMeta()).toBe(false);
      expect(testPractitionerRole.getMeta()).toEqual(new Meta());
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(false);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPractitionerRole.hasImplicitRules()).toBe(false);
      expect(testPractitionerRole.getImplicitRules()).toBeUndefined();
      expect(testPractitionerRole.hasLanguageElement()).toBe(false);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType());
      expect(testPractitionerRole.hasLanguage()).toBe(false);
      expect(testPractitionerRole.getLanguage()).toBeUndefined();
      expect(testPractitionerRole.hasText()).toBe(false);
      expect(testPractitionerRole.getText()).toEqual(new Narrative(null, null));
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(false);
      expect(testPractitionerRole.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(false);
      expect(testPractitionerRole.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRole properties
      expect(testPractitionerRole.hasIdentifier()).toBe(false);
      expect(testPractitionerRole.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPractitionerRole.hasActiveElement()).toBe(false);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType());
      expect(testPractitionerRole.hasActive()).toBe(false);
      expect(testPractitionerRole.getActive()).toBeUndefined();
      expect(testPractitionerRole.hasPeriod()).toBe(false);
      expect(testPractitionerRole.getPeriod()).toEqual(new Period());
      expect(testPractitionerRole.hasPractitioner()).toBe(false);
      expect(testPractitionerRole.getPractitioner()).toEqual(new Reference());
      expect(testPractitionerRole.hasOrganization()).toBe(false);
      expect(testPractitionerRole.getOrganization()).toEqual(new Reference());
      expect(testPractitionerRole.hasCode()).toBe(false);
      expect(testPractitionerRole.getCode()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasSpecialty()).toBe(false);
      expect(testPractitionerRole.getSpecialty()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasLocation()).toBe(false);
      expect(testPractitionerRole.getLocation()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(false);
      expect(testPractitionerRole.getHealthcareService()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasTelecom()).toBe(false);
      expect(testPractitionerRole.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(false);
      expect(testPractitionerRole.getAvailableTime()).toEqual([] as PractitionerRoleAvailableTimeComponent[]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(false);
      expect(testPractitionerRole.getNotAvailable()).toEqual([] as PractitionerRoleNotAvailableComponent[]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType());
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptions()).toBeUndefined();
      expect(testPractitionerRole.hasEndpoint()).toBe(false);
      expect(testPractitionerRole.getEndpoint()).toEqual([] as Reference[]);
    });

    it('should properly copy()', () => {
      const practitionerRole = new PractitionerRole();

      practitionerRole.setId(VALID_ID);
      practitionerRole.setMeta(VALID_META);
      practitionerRole.setImplicitRules(IMPLICIT_RULES_VALUE);
      practitionerRole.setLanguage(LANGUAGE_VALUE);
      practitionerRole.setText(VALID_NARRATIVE);
      practitionerRole.setContained(undefined); // Do not have valid resource data model to use
      practitionerRole.setExtension([VALID_EXTENSION]);
      practitionerRole.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      practitionerRole.setIdentifier([IDENTIFIER_TYPE]);
      practitionerRole.setActive(true);
      practitionerRole.setPeriod(VALID_PERIOD);
      practitionerRole.setPractitioner(VALID_REFERENCE_PRACTITIONER);
      practitionerRole.setOrganization(VALID_REFERENCE_ORGANIZATION);
      practitionerRole.setCode([VALID_CODEABLECONCEPT]);
      practitionerRole.setSpecialty([VALID_CODEABLECONCEPT_2]);
      practitionerRole.setLocation([VALID_REFERENCE_LOCATION]);
      practitionerRole.setHealthcareService([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      practitionerRole.setTelecom([VALID_CONTACTPOINT]);
      practitionerRole.setAvailableTime([VALID_AVAILABLE_TIME]);
      practitionerRole.setNotAvailable([VALID_NOT_AVAILABLE]);
      practitionerRole.setAvailabilityExceptions(VALID_STRING);
      practitionerRole.setEndpoint([VALID_REFERENCE_ENDPOINT]);

      let testPractitionerRole = practitionerRole.copy();
      expect(testPractitionerRole).toBeDefined();
      expect(testPractitionerRole).toBeInstanceOf(PractitionerRole);
      expect(testPractitionerRole).toBeInstanceOf(DomainResource);
      expect(testPractitionerRole).toBeInstanceOf(Resource);
      expect(testPractitionerRole).toBeInstanceOf(Base);
      expect(testPractitionerRole.constructor.name).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.fhirType()).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.isEmpty()).toBe(false);
      expect(testPractitionerRole.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(true);
      expect(testPractitionerRole.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPractitionerRole.hasId()).toBe(true);
      expect(testPractitionerRole.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRole.hasMeta()).toBe(true);
      expect(testPractitionerRole.getMeta()).toEqual(VALID_META);
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(true);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPractitionerRole.hasImplicitRules()).toBe(true);
      expect(testPractitionerRole.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPractitionerRole.hasLanguageElement()).toBe(true);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPractitionerRole.hasLanguage()).toBe(true);
      expect(testPractitionerRole.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPractitionerRole.hasText()).toBe(true);
      expect(testPractitionerRole.getText()).toEqual(VALID_NARRATIVE);
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(true);
      expect(testPractitionerRole.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(true);
      expect(testPractitionerRole.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRole.hasIdentifier()).toBe(true);
      expect(testPractitionerRole.getIdentifier()).toEqual([IDENTIFIER_TYPE]);
      expect(testPractitionerRole.hasActiveElement()).toBe(true);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType(true));
      expect(testPractitionerRole.hasActive()).toBe(true);
      expect(testPractitionerRole.getActive()).toBe(true);
      expect(testPractitionerRole.hasPeriod()).toBe(true);
      expect(testPractitionerRole.getPeriod()).toEqual(VALID_PERIOD);
      expect(testPractitionerRole.hasPractitioner()).toBe(true);
      expect(testPractitionerRole.getPractitioner()).toEqual(VALID_REFERENCE_PRACTITIONER);
      expect(testPractitionerRole.hasOrganization()).toBe(true);
      expect(testPractitionerRole.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPractitionerRole.hasCode()).toBe(true);
      expect(testPractitionerRole.getCode()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPractitionerRole.hasSpecialty()).toBe(true);
      expect(testPractitionerRole.getSpecialty()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPractitionerRole.hasLocation()).toBe(true);
      expect(testPractitionerRole.getLocation()).toEqual([VALID_REFERENCE_LOCATION]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(true);
      expect(testPractitionerRole.getHealthcareService()).toEqual([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      expect(testPractitionerRole.hasTelecom()).toBe(true);
      expect(testPractitionerRole.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(true);
      expect(testPractitionerRole.getAvailableTime()).toEqual([VALID_AVAILABLE_TIME]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(true);
      expect(testPractitionerRole.getNotAvailable()).toEqual([VALID_NOT_AVAILABLE]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType(VALID_STRING));
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptions()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRole.hasEndpoint()).toBe(true);
      expect(testPractitionerRole.getEndpoint()).toEqual([VALID_REFERENCE_ENDPOINT]);

      // Reset to undefined

      practitionerRole.setId(UNDEFINED_VALUE);
      practitionerRole.setMeta(UNDEFINED_VALUE);
      practitionerRole.setImplicitRules(UNDEFINED_VALUE);
      practitionerRole.setLanguage(UNDEFINED_VALUE);
      practitionerRole.setText(UNDEFINED_VALUE);
      practitionerRole.setContained(UNDEFINED_VALUE);
      practitionerRole.setExtension(UNDEFINED_VALUE);
      practitionerRole.setModifierExtension(UNDEFINED_VALUE);
      practitionerRole.setIdentifier(UNDEFINED_VALUE);
      practitionerRole.setActive(UNDEFINED_VALUE);
      practitionerRole.setPeriod(UNDEFINED_VALUE);
      practitionerRole.setPractitioner(UNDEFINED_VALUE);
      practitionerRole.setOrganization(UNDEFINED_VALUE);
      practitionerRole.setCode(UNDEFINED_VALUE);
      practitionerRole.setSpecialty(UNDEFINED_VALUE);
      practitionerRole.setLocation(UNDEFINED_VALUE);
      practitionerRole.setHealthcareService(UNDEFINED_VALUE);
      practitionerRole.setTelecom(UNDEFINED_VALUE);
      practitionerRole.setAvailableTime(UNDEFINED_VALUE);
      practitionerRole.setNotAvailable(UNDEFINED_VALUE);
      practitionerRole.setAvailabilityExceptions(UNDEFINED_VALUE);
      practitionerRole.setEndpoint(UNDEFINED_VALUE);

      testPractitionerRole = practitionerRole.copy();
      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(false);
      expect(testPractitionerRole.getIdElement()).toEqual(new IdType());
      expect(testPractitionerRole.hasId()).toBe(false);
      expect(testPractitionerRole.getId()).toBeUndefined();
      expect(testPractitionerRole.hasMeta()).toBe(false);
      expect(testPractitionerRole.getMeta()).toEqual(new Meta());
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(false);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPractitionerRole.hasImplicitRules()).toBe(false);
      expect(testPractitionerRole.getImplicitRules()).toBeUndefined();
      expect(testPractitionerRole.hasLanguageElement()).toBe(false);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType());
      expect(testPractitionerRole.hasLanguage()).toBe(false);
      expect(testPractitionerRole.getLanguage()).toBeUndefined();
      expect(testPractitionerRole.hasText()).toBe(false);
      expect(testPractitionerRole.getText()).toEqual(new Narrative(null, null));
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(false);
      expect(testPractitionerRole.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(false);
      expect(testPractitionerRole.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRole properties
      expect(testPractitionerRole.hasIdentifier()).toBe(false);
      expect(testPractitionerRole.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPractitionerRole.hasActiveElement()).toBe(false);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType());
      expect(testPractitionerRole.hasActive()).toBe(false);
      expect(testPractitionerRole.getActive()).toBeUndefined();
      expect(testPractitionerRole.hasPeriod()).toBe(false);
      expect(testPractitionerRole.getPeriod()).toEqual(new Period());
      expect(testPractitionerRole.hasPractitioner()).toBe(false);
      expect(testPractitionerRole.getPractitioner()).toEqual(new Reference());
      expect(testPractitionerRole.hasOrganization()).toBe(false);
      expect(testPractitionerRole.getOrganization()).toEqual(new Reference());
      expect(testPractitionerRole.hasCode()).toBe(false);
      expect(testPractitionerRole.getCode()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasSpecialty()).toBe(false);
      expect(testPractitionerRole.getSpecialty()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasLocation()).toBe(false);
      expect(testPractitionerRole.getLocation()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(false);
      expect(testPractitionerRole.getHealthcareService()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasTelecom()).toBe(false);
      expect(testPractitionerRole.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(false);
      expect(testPractitionerRole.getAvailableTime()).toEqual([] as PractitionerRoleAvailableTimeComponent[]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(false);
      expect(testPractitionerRole.getNotAvailable()).toEqual([] as PractitionerRoleNotAvailableComponent[]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType());
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptions()).toBeUndefined();
      expect(testPractitionerRole.hasEndpoint()).toBe(false);
      expect(testPractitionerRole.getEndpoint()).toEqual([] as Reference[]);
    });

    it('should be properly reset by modifying all properties with primitives', () => {
      const testPractitionerRole = new PractitionerRole();

      testPractitionerRole.setId(VALID_ID);
      testPractitionerRole.setMeta(VALID_META);
      testPractitionerRole.setImplicitRules(IMPLICIT_RULES_VALUE);
      testPractitionerRole.setLanguage(LANGUAGE_VALUE);
      testPractitionerRole.setText(VALID_NARRATIVE);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension([VALID_EXTENSION]);
      testPractitionerRole.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testPractitionerRole.setIdentifier([IDENTIFIER_TYPE]);
      testPractitionerRole.setActive(true);
      testPractitionerRole.setPeriod(VALID_PERIOD);
      testPractitionerRole.setPractitioner(VALID_REFERENCE_PRACTITIONER);
      testPractitionerRole.setOrganization(VALID_REFERENCE_ORGANIZATION);
      testPractitionerRole.setCode([VALID_CODEABLECONCEPT]);
      testPractitionerRole.setSpecialty([VALID_CODEABLECONCEPT_2]);
      testPractitionerRole.setLocation([VALID_REFERENCE_LOCATION]);
      testPractitionerRole.setHealthcareService([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      testPractitionerRole.setTelecom([VALID_CONTACTPOINT]);
      testPractitionerRole.setAvailableTime([VALID_AVAILABLE_TIME]);
      testPractitionerRole.setNotAvailable([VALID_NOT_AVAILABLE]);
      testPractitionerRole.setAvailabilityExceptions(VALID_STRING);
      testPractitionerRole.setEndpoint([VALID_REFERENCE_ENDPOINT]);

      expect(testPractitionerRole).toBeDefined();
      expect(testPractitionerRole).toBeInstanceOf(PractitionerRole);
      expect(testPractitionerRole).toBeInstanceOf(DomainResource);
      expect(testPractitionerRole).toBeInstanceOf(Resource);
      expect(testPractitionerRole).toBeInstanceOf(Base);
      expect(testPractitionerRole.constructor.name).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.fhirType()).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.isEmpty()).toBe(false);
      expect(testPractitionerRole.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(true);
      expect(testPractitionerRole.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPractitionerRole.hasId()).toBe(true);
      expect(testPractitionerRole.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRole.hasMeta()).toBe(true);
      expect(testPractitionerRole.getMeta()).toEqual(VALID_META);
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(true);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPractitionerRole.hasImplicitRules()).toBe(true);
      expect(testPractitionerRole.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPractitionerRole.hasLanguageElement()).toBe(true);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPractitionerRole.hasLanguage()).toBe(true);
      expect(testPractitionerRole.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPractitionerRole.hasText()).toBe(true);
      expect(testPractitionerRole.getText()).toEqual(VALID_NARRATIVE);
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(true);
      expect(testPractitionerRole.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(true);
      expect(testPractitionerRole.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRole.hasIdentifier()).toBe(true);
      expect(testPractitionerRole.getIdentifier()).toEqual([IDENTIFIER_TYPE]);
      expect(testPractitionerRole.hasActiveElement()).toBe(true);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType(true));
      expect(testPractitionerRole.hasActive()).toBe(true);
      expect(testPractitionerRole.getActive()).toBe(true);
      expect(testPractitionerRole.hasPeriod()).toBe(true);
      expect(testPractitionerRole.getPeriod()).toEqual(VALID_PERIOD);
      expect(testPractitionerRole.hasPractitioner()).toBe(true);
      expect(testPractitionerRole.getPractitioner()).toEqual(VALID_REFERENCE_PRACTITIONER);
      expect(testPractitionerRole.hasOrganization()).toBe(true);
      expect(testPractitionerRole.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPractitionerRole.hasCode()).toBe(true);
      expect(testPractitionerRole.getCode()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPractitionerRole.hasSpecialty()).toBe(true);
      expect(testPractitionerRole.getSpecialty()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPractitionerRole.hasLocation()).toBe(true);
      expect(testPractitionerRole.getLocation()).toEqual([VALID_REFERENCE_LOCATION]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(true);
      expect(testPractitionerRole.getHealthcareService()).toEqual([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      expect(testPractitionerRole.hasTelecom()).toBe(true);
      expect(testPractitionerRole.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(true);
      expect(testPractitionerRole.getAvailableTime()).toEqual([VALID_AVAILABLE_TIME]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(true);
      expect(testPractitionerRole.getNotAvailable()).toEqual([VALID_NOT_AVAILABLE]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType(VALID_STRING));
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptions()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRole.hasEndpoint()).toBe(true);
      expect(testPractitionerRole.getEndpoint()).toEqual([VALID_REFERENCE_ENDPOINT]);

      // Reset

      testPractitionerRole.setId(VALID_ID_2);
      testPractitionerRole.setMeta(VALID_META_2);
      testPractitionerRole.setImplicitRules(IMPLICIT_RULES_VALUE_2);
      testPractitionerRole.setLanguage(LANGUAGE_VALUE_2);
      testPractitionerRole.setText(VALID_NARRATIVE_2);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension([VALID_EXTENSION_2]);
      testPractitionerRole.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testPractitionerRole.setIdentifier(UNDEFINED_VALUE);
      testPractitionerRole.addIdentifier(IDENTIFIER_TYPE_2);
      testPractitionerRole.setActive(false);
      testPractitionerRole.setPeriod(VALID_PERIOD_2);
      testPractitionerRole.setPractitioner(VALID_REFERENCE_PRACTITIONER_2);
      testPractitionerRole.setOrganization(VALID_REFERENCE_ORGANIZATION_2);
      testPractitionerRole.setCode(UNDEFINED_VALUE);
      testPractitionerRole.addCode(VALID_CODEABLECONCEPT_2);
      testPractitionerRole.setSpecialty(UNDEFINED_VALUE);
      testPractitionerRole.addSpecialty(VALID_CODEABLECONCEPT);
      testPractitionerRole.setLocation(UNDEFINED_VALUE);
      testPractitionerRole.addLocation(VALID_REFERENCE_LOCATION_2);
      testPractitionerRole.setHealthcareService(UNDEFINED_VALUE);
      testPractitionerRole.addHealthcareService(VALID_REFERENCE_HEALTHCARE_SERVICE_2);
      testPractitionerRole.setTelecom(UNDEFINED_VALUE);
      testPractitionerRole.addTelecom(VALID_CONTACTPOINT_2);
      testPractitionerRole.setAvailableTime(UNDEFINED_VALUE);
      testPractitionerRole.addAvailableTime(VALID_AVAILABLE_TIME_2);
      testPractitionerRole.setNotAvailable(UNDEFINED_VALUE);
      testPractitionerRole.addNotAvailable(VALID_NOT_AVAILABLE_2);
      testPractitionerRole.setAvailabilityExceptions(VALID_STRING_2);
      testPractitionerRole.setEndpoint(UNDEFINED_VALUE);
      testPractitionerRole.addEndpoint(VALID_REFERENCE_ENDPOINT_2);

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(true);
      expect(testPractitionerRole.getIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testPractitionerRole.hasId()).toBe(true);
      expect(testPractitionerRole.getId()).toStrictEqual(VALID_ID_2);
      expect(testPractitionerRole.hasMeta()).toBe(true);
      expect(testPractitionerRole.getMeta()).toEqual(VALID_META_2);
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(true);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE_2));
      expect(testPractitionerRole.hasImplicitRules()).toBe(true);
      expect(testPractitionerRole.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE_2);
      expect(testPractitionerRole.hasLanguageElement()).toBe(true);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE_2));
      expect(testPractitionerRole.hasLanguage()).toBe(true);
      expect(testPractitionerRole.getLanguage()).toStrictEqual(LANGUAGE_VALUE_2);
      expect(testPractitionerRole.hasText()).toBe(true);
      expect(testPractitionerRole.getText()).toEqual(VALID_NARRATIVE_2);
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(true);
      expect(testPractitionerRole.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(true);
      expect(testPractitionerRole.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRole.hasIdentifier()).toBe(true);
      expect(testPractitionerRole.getIdentifier()).toEqual([IDENTIFIER_TYPE_2]);
      expect(testPractitionerRole.hasActiveElement()).toBe(true);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType(false));
      expect(testPractitionerRole.hasActive()).toBe(true);
      expect(testPractitionerRole.getActive()).toBe(false);
      expect(testPractitionerRole.hasPeriod()).toBe(true);
      expect(testPractitionerRole.getPeriod()).toEqual(VALID_PERIOD_2);
      expect(testPractitionerRole.hasPractitioner()).toBe(true);
      expect(testPractitionerRole.getPractitioner()).toEqual(VALID_REFERENCE_PRACTITIONER_2);
      expect(testPractitionerRole.hasOrganization()).toBe(true);
      expect(testPractitionerRole.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION_2);
      expect(testPractitionerRole.hasCode()).toBe(true);
      expect(testPractitionerRole.getCode()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPractitionerRole.hasSpecialty()).toBe(true);
      expect(testPractitionerRole.getSpecialty()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPractitionerRole.hasLocation()).toBe(true);
      expect(testPractitionerRole.getLocation()).toEqual([VALID_REFERENCE_LOCATION_2]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(true);
      expect(testPractitionerRole.getHealthcareService()).toEqual([VALID_REFERENCE_HEALTHCARE_SERVICE_2]);
      expect(testPractitionerRole.hasTelecom()).toBe(true);
      expect(testPractitionerRole.getTelecom()).toEqual([VALID_CONTACTPOINT_2]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(true);
      expect(testPractitionerRole.getAvailableTime()).toEqual([VALID_AVAILABLE_TIME_2]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(true);
      expect(testPractitionerRole.getNotAvailable()).toEqual([VALID_NOT_AVAILABLE_2]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType(VALID_STRING_2));
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptions()).toStrictEqual(VALID_STRING_2);
      expect(testPractitionerRole.hasEndpoint()).toBe(true);
      expect(testPractitionerRole.getEndpoint()).toEqual([VALID_REFERENCE_ENDPOINT_2]);

      // Reset as empty

      testPractitionerRole.setId(UNDEFINED_VALUE);
      testPractitionerRole.setMeta(UNDEFINED_VALUE);
      testPractitionerRole.setImplicitRules(UNDEFINED_VALUE);
      testPractitionerRole.setLanguage(UNDEFINED_VALUE);
      testPractitionerRole.setText(UNDEFINED_VALUE);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension(UNDEFINED_VALUE);
      testPractitionerRole.setModifierExtension(UNDEFINED_VALUE);

      testPractitionerRole.setIdentifier(UNDEFINED_VALUE);
      testPractitionerRole.setActive(UNDEFINED_VALUE);
      testPractitionerRole.setPeriod(UNDEFINED_VALUE);
      testPractitionerRole.setPractitioner(UNDEFINED_VALUE);
      testPractitionerRole.setOrganization(UNDEFINED_VALUE);
      testPractitionerRole.setCode(UNDEFINED_VALUE);
      testPractitionerRole.setSpecialty(UNDEFINED_VALUE);
      testPractitionerRole.setLocation(UNDEFINED_VALUE);
      testPractitionerRole.setHealthcareService(UNDEFINED_VALUE);
      testPractitionerRole.setTelecom(UNDEFINED_VALUE);
      testPractitionerRole.setAvailableTime(UNDEFINED_VALUE);
      testPractitionerRole.setNotAvailable(UNDEFINED_VALUE);
      testPractitionerRole.setAvailabilityExceptions(UNDEFINED_VALUE);
      testPractitionerRole.setEndpoint(UNDEFINED_VALUE);

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(false);
      expect(testPractitionerRole.getIdElement()).toEqual(new IdType());
      expect(testPractitionerRole.hasId()).toBe(false);
      expect(testPractitionerRole.getId()).toBeUndefined();
      expect(testPractitionerRole.hasMeta()).toBe(false);
      expect(testPractitionerRole.getMeta()).toEqual(new Meta());
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(false);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPractitionerRole.hasImplicitRules()).toBe(false);
      expect(testPractitionerRole.getImplicitRules()).toBeUndefined();
      expect(testPractitionerRole.hasLanguageElement()).toBe(false);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType());
      expect(testPractitionerRole.hasLanguage()).toBe(false);
      expect(testPractitionerRole.getLanguage()).toBeUndefined();
      expect(testPractitionerRole.hasText()).toBe(false);
      expect(testPractitionerRole.getText()).toEqual(new Narrative(null, null));
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(false);
      expect(testPractitionerRole.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(false);
      expect(testPractitionerRole.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRole properties
      expect(testPractitionerRole.hasIdentifier()).toBe(false);
      expect(testPractitionerRole.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPractitionerRole.hasActiveElement()).toBe(false);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType());
      expect(testPractitionerRole.hasActive()).toBe(false);
      expect(testPractitionerRole.getActive()).toBeUndefined();
      expect(testPractitionerRole.hasPeriod()).toBe(false);
      expect(testPractitionerRole.getPeriod()).toEqual(new Period());
      expect(testPractitionerRole.hasPractitioner()).toBe(false);
      expect(testPractitionerRole.getPractitioner()).toEqual(new Reference());
      expect(testPractitionerRole.hasOrganization()).toBe(false);
      expect(testPractitionerRole.getOrganization()).toEqual(new Reference());
      expect(testPractitionerRole.hasCode()).toBe(false);
      expect(testPractitionerRole.getCode()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasSpecialty()).toBe(false);
      expect(testPractitionerRole.getSpecialty()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasLocation()).toBe(false);
      expect(testPractitionerRole.getLocation()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(false);
      expect(testPractitionerRole.getHealthcareService()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasTelecom()).toBe(false);
      expect(testPractitionerRole.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(false);
      expect(testPractitionerRole.getAvailableTime()).toEqual([] as PractitionerRoleAvailableTimeComponent[]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(false);
      expect(testPractitionerRole.getNotAvailable()).toEqual([] as PractitionerRoleNotAvailableComponent[]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType());
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptions()).toBeUndefined();
      expect(testPractitionerRole.hasEndpoint()).toBe(false);
      expect(testPractitionerRole.getEndpoint()).toEqual([] as Reference[]);
    });

    it('should be properly reset by modifying all properties with DataTypes', () => {
      const testPractitionerRole = new PractitionerRole();

      testPractitionerRole.setIdElement(VALID_ID_TYPE);
      testPractitionerRole.setMeta(VALID_META);
      testPractitionerRole.setImplicitRulesElement(new UriType(IMPLICIT_RULES_VALUE));
      testPractitionerRole.setLanguageElement(new CodeType(LANGUAGE_VALUE));
      testPractitionerRole.setText(VALID_NARRATIVE);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension([VALID_EXTENSION]);
      testPractitionerRole.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testPractitionerRole.setIdentifier([IDENTIFIER_TYPE]);
      testPractitionerRole.setActiveElement(new BooleanType(true));
      testPractitionerRole.setPeriod(VALID_PERIOD);
      testPractitionerRole.setPractitioner(VALID_REFERENCE_PRACTITIONER);
      testPractitionerRole.setOrganization(VALID_REFERENCE_ORGANIZATION);
      testPractitionerRole.setCode([VALID_CODEABLECONCEPT]);
      testPractitionerRole.setSpecialty([VALID_CODEABLECONCEPT_2]);
      testPractitionerRole.setLocation([VALID_REFERENCE_LOCATION]);
      testPractitionerRole.setHealthcareService([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      testPractitionerRole.setTelecom([VALID_CONTACTPOINT]);
      testPractitionerRole.setAvailableTime([VALID_AVAILABLE_TIME]);
      testPractitionerRole.setNotAvailable([VALID_NOT_AVAILABLE]);
      testPractitionerRole.setAvailabilityExceptionsElement(new StringType(VALID_STRING));
      testPractitionerRole.setEndpoint([VALID_REFERENCE_ENDPOINT]);

      expect(testPractitionerRole).toBeDefined();
      expect(testPractitionerRole).toBeInstanceOf(PractitionerRole);
      expect(testPractitionerRole).toBeInstanceOf(DomainResource);
      expect(testPractitionerRole).toBeInstanceOf(Resource);
      expect(testPractitionerRole).toBeInstanceOf(Base);
      expect(testPractitionerRole.constructor.name).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.fhirType()).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.isEmpty()).toBe(false);
      expect(testPractitionerRole.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(true);
      expect(testPractitionerRole.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPractitionerRole.hasId()).toBe(true);
      expect(testPractitionerRole.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRole.hasMeta()).toBe(true);
      expect(testPractitionerRole.getMeta()).toEqual(VALID_META);
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(true);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPractitionerRole.hasImplicitRules()).toBe(true);
      expect(testPractitionerRole.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPractitionerRole.hasLanguageElement()).toBe(true);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPractitionerRole.hasLanguage()).toBe(true);
      expect(testPractitionerRole.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPractitionerRole.hasText()).toBe(true);
      expect(testPractitionerRole.getText()).toEqual(VALID_NARRATIVE);
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(true);
      expect(testPractitionerRole.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(true);
      expect(testPractitionerRole.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRole.hasIdentifier()).toBe(true);
      expect(testPractitionerRole.getIdentifier()).toEqual([IDENTIFIER_TYPE]);
      expect(testPractitionerRole.hasActiveElement()).toBe(true);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType(true));
      expect(testPractitionerRole.hasActive()).toBe(true);
      expect(testPractitionerRole.getActive()).toBe(true);
      expect(testPractitionerRole.hasPeriod()).toBe(true);
      expect(testPractitionerRole.getPeriod()).toEqual(VALID_PERIOD);
      expect(testPractitionerRole.hasPractitioner()).toBe(true);
      expect(testPractitionerRole.getPractitioner()).toEqual(VALID_REFERENCE_PRACTITIONER);
      expect(testPractitionerRole.hasOrganization()).toBe(true);
      expect(testPractitionerRole.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPractitionerRole.hasCode()).toBe(true);
      expect(testPractitionerRole.getCode()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPractitionerRole.hasSpecialty()).toBe(true);
      expect(testPractitionerRole.getSpecialty()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPractitionerRole.hasLocation()).toBe(true);
      expect(testPractitionerRole.getLocation()).toEqual([VALID_REFERENCE_LOCATION]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(true);
      expect(testPractitionerRole.getHealthcareService()).toEqual([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      expect(testPractitionerRole.hasTelecom()).toBe(true);
      expect(testPractitionerRole.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(true);
      expect(testPractitionerRole.getAvailableTime()).toEqual([VALID_AVAILABLE_TIME]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(true);
      expect(testPractitionerRole.getNotAvailable()).toEqual([VALID_NOT_AVAILABLE]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType(VALID_STRING));
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptions()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRole.hasEndpoint()).toBe(true);
      expect(testPractitionerRole.getEndpoint()).toEqual([VALID_REFERENCE_ENDPOINT]);

      // Reset

      testPractitionerRole.setIdElement(VALID_ID_TYPE_2);
      testPractitionerRole.setMeta(VALID_META_2);
      testPractitionerRole.setImplicitRulesElement(new UriType(IMPLICIT_RULES_VALUE_2));
      testPractitionerRole.setLanguageElement(new CodeType(LANGUAGE_VALUE_2));
      testPractitionerRole.setText(VALID_NARRATIVE_2);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension([VALID_EXTENSION_2]);
      testPractitionerRole.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);

      testPractitionerRole.setIdentifier(UNDEFINED_VALUE);
      testPractitionerRole.addIdentifier(IDENTIFIER_TYPE_2);
      testPractitionerRole.setActiveElement(new BooleanType(false));
      testPractitionerRole.setPeriod(VALID_PERIOD_2);
      testPractitionerRole.setPractitioner(VALID_REFERENCE_PRACTITIONER_2);
      testPractitionerRole.setOrganization(VALID_REFERENCE_ORGANIZATION_2);
      testPractitionerRole.setCode(UNDEFINED_VALUE);
      testPractitionerRole.addCode(VALID_CODEABLECONCEPT_2);
      testPractitionerRole.setSpecialty(UNDEFINED_VALUE);
      testPractitionerRole.addSpecialty(VALID_CODEABLECONCEPT);
      testPractitionerRole.setLocation(UNDEFINED_VALUE);
      testPractitionerRole.addLocation(VALID_REFERENCE_LOCATION_2);
      testPractitionerRole.setHealthcareService(UNDEFINED_VALUE);
      testPractitionerRole.addHealthcareService(VALID_REFERENCE_HEALTHCARE_SERVICE_2);
      testPractitionerRole.setTelecom(UNDEFINED_VALUE);
      testPractitionerRole.addTelecom(VALID_CONTACTPOINT_2);
      testPractitionerRole.setAvailableTime(UNDEFINED_VALUE);
      testPractitionerRole.addAvailableTime(VALID_AVAILABLE_TIME_2);
      testPractitionerRole.setNotAvailable(UNDEFINED_VALUE);
      testPractitionerRole.addNotAvailable(VALID_NOT_AVAILABLE_2);
      testPractitionerRole.setAvailabilityExceptionsElement(new StringType(VALID_STRING_2));
      testPractitionerRole.setEndpoint(UNDEFINED_VALUE);
      testPractitionerRole.addEndpoint(VALID_REFERENCE_ENDPOINT_2);

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(true);
      expect(testPractitionerRole.getIdElement()).toEqual(VALID_ID_TYPE_2);
      expect(testPractitionerRole.hasId()).toBe(true);
      expect(testPractitionerRole.getId()).toStrictEqual(VALID_ID_2);
      expect(testPractitionerRole.hasMeta()).toBe(true);
      expect(testPractitionerRole.getMeta()).toEqual(VALID_META_2);
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(true);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE_2));
      expect(testPractitionerRole.hasImplicitRules()).toBe(true);
      expect(testPractitionerRole.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE_2);
      expect(testPractitionerRole.hasLanguageElement()).toBe(true);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE_2));
      expect(testPractitionerRole.hasLanguage()).toBe(true);
      expect(testPractitionerRole.getLanguage()).toStrictEqual(LANGUAGE_VALUE_2);
      expect(testPractitionerRole.hasText()).toBe(true);
      expect(testPractitionerRole.getText()).toEqual(VALID_NARRATIVE_2);
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(true);
      expect(testPractitionerRole.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(true);
      expect(testPractitionerRole.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRole.hasIdentifier()).toBe(true);
      expect(testPractitionerRole.getIdentifier()).toEqual([IDENTIFIER_TYPE_2]);
      expect(testPractitionerRole.hasActiveElement()).toBe(true);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType(false));
      expect(testPractitionerRole.hasActive()).toBe(true);
      expect(testPractitionerRole.getActive()).toBe(false);
      expect(testPractitionerRole.hasPeriod()).toBe(true);
      expect(testPractitionerRole.getPeriod()).toEqual(VALID_PERIOD_2);
      expect(testPractitionerRole.hasPractitioner()).toBe(true);
      expect(testPractitionerRole.getPractitioner()).toEqual(VALID_REFERENCE_PRACTITIONER_2);
      expect(testPractitionerRole.hasOrganization()).toBe(true);
      expect(testPractitionerRole.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION_2);
      expect(testPractitionerRole.hasCode()).toBe(true);
      expect(testPractitionerRole.getCode()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPractitionerRole.hasSpecialty()).toBe(true);
      expect(testPractitionerRole.getSpecialty()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPractitionerRole.hasLocation()).toBe(true);
      expect(testPractitionerRole.getLocation()).toEqual([VALID_REFERENCE_LOCATION_2]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(true);
      expect(testPractitionerRole.getHealthcareService()).toEqual([VALID_REFERENCE_HEALTHCARE_SERVICE_2]);
      expect(testPractitionerRole.hasTelecom()).toBe(true);
      expect(testPractitionerRole.getTelecom()).toEqual([VALID_CONTACTPOINT_2]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(true);
      expect(testPractitionerRole.getAvailableTime()).toEqual([VALID_AVAILABLE_TIME_2]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(true);
      expect(testPractitionerRole.getNotAvailable()).toEqual([VALID_NOT_AVAILABLE_2]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType(VALID_STRING_2));
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptions()).toStrictEqual(VALID_STRING_2);
      expect(testPractitionerRole.hasEndpoint()).toBe(true);
      expect(testPractitionerRole.getEndpoint()).toEqual([VALID_REFERENCE_ENDPOINT_2]);

      // Reset as empty

      testPractitionerRole.setIdElement(UNDEFINED_VALUE);
      testPractitionerRole.setMeta(UNDEFINED_VALUE);
      testPractitionerRole.setImplicitRulesElement(UNDEFINED_VALUE);
      testPractitionerRole.setLanguageElement(UNDEFINED_VALUE);
      testPractitionerRole.setText(UNDEFINED_VALUE);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension(UNDEFINED_VALUE);
      testPractitionerRole.setModifierExtension(UNDEFINED_VALUE);

      testPractitionerRole.setIdentifier(UNDEFINED_VALUE);
      testPractitionerRole.setActiveElement(UNDEFINED_VALUE);
      testPractitionerRole.setPeriod(UNDEFINED_VALUE);
      testPractitionerRole.setPractitioner(UNDEFINED_VALUE);
      testPractitionerRole.setOrganization(UNDEFINED_VALUE);
      testPractitionerRole.setCode(UNDEFINED_VALUE);
      testPractitionerRole.setSpecialty(UNDEFINED_VALUE);
      testPractitionerRole.setLocation(UNDEFINED_VALUE);
      testPractitionerRole.setHealthcareService(UNDEFINED_VALUE);
      testPractitionerRole.setTelecom(UNDEFINED_VALUE);
      testPractitionerRole.setAvailableTime(UNDEFINED_VALUE);
      testPractitionerRole.setNotAvailable(UNDEFINED_VALUE);
      testPractitionerRole.setAvailabilityExceptionsElement(UNDEFINED_VALUE);
      testPractitionerRole.setEndpoint(UNDEFINED_VALUE);

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(false);
      expect(testPractitionerRole.getIdElement()).toEqual(new IdType());
      expect(testPractitionerRole.hasId()).toBe(false);
      expect(testPractitionerRole.getId()).toBeUndefined();
      expect(testPractitionerRole.hasMeta()).toBe(false);
      expect(testPractitionerRole.getMeta()).toEqual(new Meta());
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(false);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType());
      expect(testPractitionerRole.hasImplicitRules()).toBe(false);
      expect(testPractitionerRole.getImplicitRules()).toBeUndefined();
      expect(testPractitionerRole.hasLanguageElement()).toBe(false);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType());
      expect(testPractitionerRole.hasLanguage()).toBe(false);
      expect(testPractitionerRole.getLanguage()).toBeUndefined();
      expect(testPractitionerRole.hasText()).toBe(false);
      expect(testPractitionerRole.getText()).toEqual(new Narrative(null, null));
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(false);
      expect(testPractitionerRole.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(false);
      expect(testPractitionerRole.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRole properties
      expect(testPractitionerRole.hasIdentifier()).toBe(false);
      expect(testPractitionerRole.getIdentifier()).toEqual([] as Identifier[]);
      expect(testPractitionerRole.hasActiveElement()).toBe(false);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType());
      expect(testPractitionerRole.hasActive()).toBe(false);
      expect(testPractitionerRole.getActive()).toBeUndefined();
      expect(testPractitionerRole.hasPeriod()).toBe(false);
      expect(testPractitionerRole.getPeriod()).toEqual(new Period());
      expect(testPractitionerRole.hasPractitioner()).toBe(false);
      expect(testPractitionerRole.getPractitioner()).toEqual(new Reference());
      expect(testPractitionerRole.hasOrganization()).toBe(false);
      expect(testPractitionerRole.getOrganization()).toEqual(new Reference());
      expect(testPractitionerRole.hasCode()).toBe(false);
      expect(testPractitionerRole.getCode()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasSpecialty()).toBe(false);
      expect(testPractitionerRole.getSpecialty()).toEqual([] as CodeableConcept[]);
      expect(testPractitionerRole.hasLocation()).toBe(false);
      expect(testPractitionerRole.getLocation()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(false);
      expect(testPractitionerRole.getHealthcareService()).toEqual([] as Reference[]);
      expect(testPractitionerRole.hasTelecom()).toBe(false);
      expect(testPractitionerRole.getTelecom()).toEqual([] as ContactPoint[]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(false);
      expect(testPractitionerRole.getAvailableTime()).toEqual([] as PractitionerRoleAvailableTimeComponent[]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(false);
      expect(testPractitionerRole.getNotAvailable()).toEqual([] as PractitionerRoleNotAvailableComponent[]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType());
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(false);
      expect(testPractitionerRole.getAvailabilityExceptions()).toBeUndefined();
      expect(testPractitionerRole.hasEndpoint()).toBe(false);
      expect(testPractitionerRole.getEndpoint()).toEqual([] as Reference[]);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      resourceType: 'PractitionerRole',
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
          value: 'Identifier value 1',
        },
      ],
      active: true,
      period: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
      practitioner: {
        reference: 'Practitioner/12345',
      },
      organization: {
        reference: 'Organization/67890',
      },
      code: [
        {
          coding: [
            {
              system: 'testUriType',
              code: 'testCodeType',
              display: 'This is a valid string.',
            },
          ],
        },
      ],
      specialty: [
        {
          coding: [
            {
              system: 'testUriType2',
              code: 'testCodeType2',
              display: 'This is another valid string!',
            },
          ],
        },
      ],
      location: [
        {
          reference: 'Location/135',
        },
      ],
      healthcareService: [
        {
          reference: 'HealthcareService/246',
        },
      ],
      telecom: [
        {
          system: 'phone',
          value: 'This is a valid string.',
          use: 'home',
        },
      ],
      availableTime: [
        {
          daysOfWeek: ['mon'],
          allDay: false,
          availableStartTime: '08:00:00',
          availableEndTime: '17:00:00',
        },
      ],
      notAvailable: [
        {
          description: 'This is a valid string.',
          during: {
            start: '2017-01-01T00:00:00.000Z',
            end: '2017-01-01T01:00:00.000Z',
          },
        },
      ],
      availabilityExceptions: 'This is a valid string.',
      endpoint: [
        {
          reference: 'Endpoint/987',
        },
      ],
    };

    it('should properly create serialized content', () => {
      const altPeriod = VALID_PERIOD.copy();
      altPeriod.setId(DATATYPE_ID);
      altPeriod.addExtension(DATATYPE_EXTENSION);

      const testPractitionerRole = new PractitionerRole();
      testPractitionerRole.setId(VALID_ID);
      testPractitionerRole.setMeta(VALID_META);
      testPractitionerRole.setImplicitRules(IMPLICIT_RULES_VALUE);
      testPractitionerRole.setLanguage(LANGUAGE_VALUE);
      testPractitionerRole.setText(VALID_NARRATIVE);
      testPractitionerRole.setContained(undefined); // Do not have valid resource data model to use
      testPractitionerRole.setExtension([VALID_EXTENSION]);
      testPractitionerRole.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      testPractitionerRole.setIdentifier([IDENTIFIER_TYPE]);
      testPractitionerRole.setActive(true);
      testPractitionerRole.setPeriod(altPeriod);
      testPractitionerRole.setPractitioner(VALID_REFERENCE_PRACTITIONER);
      testPractitionerRole.setOrganization(VALID_REFERENCE_ORGANIZATION);
      testPractitionerRole.setCode([VALID_CODEABLECONCEPT]);
      testPractitionerRole.setSpecialty([VALID_CODEABLECONCEPT_2]);
      testPractitionerRole.setLocation([VALID_REFERENCE_LOCATION]);
      testPractitionerRole.setHealthcareService([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      testPractitionerRole.setTelecom([VALID_CONTACTPOINT]);
      testPractitionerRole.setAvailableTime([VALID_AVAILABLE_TIME]);
      testPractitionerRole.setNotAvailable([VALID_NOT_AVAILABLE]);
      testPractitionerRole.setAvailabilityExceptions(VALID_STRING);
      testPractitionerRole.setEndpoint([VALID_REFERENCE_ENDPOINT]);

      expect(testPractitionerRole).toBeDefined();
      expect(testPractitionerRole).toBeInstanceOf(PractitionerRole);
      expect(testPractitionerRole).toBeInstanceOf(DomainResource);
      expect(testPractitionerRole).toBeInstanceOf(Resource);
      expect(testPractitionerRole).toBeInstanceOf(Base);
      expect(testPractitionerRole.constructor.name).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.fhirType()).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole.isEmpty()).toBe(false);
      expect(testPractitionerRole.toJSON()).toBeDefined();

      // inherited properties from Resource/DomainResource
      expect(testPractitionerRole.hasIdElement()).toBe(true);
      expect(testPractitionerRole.getIdElement()).toEqual(VALID_ID_TYPE);
      expect(testPractitionerRole.hasId()).toBe(true);
      expect(testPractitionerRole.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRole.hasMeta()).toBe(true);
      expect(testPractitionerRole.getMeta()).toEqual(VALID_META);
      expect(testPractitionerRole.hasImplicitRulesElement()).toBe(true);
      expect(testPractitionerRole.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testPractitionerRole.hasImplicitRules()).toBe(true);
      expect(testPractitionerRole.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testPractitionerRole.hasLanguageElement()).toBe(true);
      expect(testPractitionerRole.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testPractitionerRole.hasLanguage()).toBe(true);
      expect(testPractitionerRole.getLanguage()).toStrictEqual(LANGUAGE_VALUE);
      expect(testPractitionerRole.hasText()).toBe(true);
      expect(testPractitionerRole.getText()).toEqual(VALID_NARRATIVE);
      expect(testPractitionerRole.hasContained()).toBe(false);
      expect(testPractitionerRole.getContained()).toEqual([] as Resource[]);
      expect(testPractitionerRole.hasExtension()).toBe(true);
      expect(testPractitionerRole.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRole.hasModifierExtension()).toBe(true);
      expect(testPractitionerRole.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRole.hasIdentifier()).toBe(true);
      expect(testPractitionerRole.getIdentifier()).toEqual([IDENTIFIER_TYPE]);
      expect(testPractitionerRole.hasActiveElement()).toBe(true);
      expect(testPractitionerRole.getActiveElement()).toEqual(new BooleanType(true));
      expect(testPractitionerRole.hasActive()).toBe(true);
      expect(testPractitionerRole.getActive()).toBe(true);
      expect(testPractitionerRole.hasPeriod()).toBe(true);
      expect(testPractitionerRole.getPeriod()).toEqual(altPeriod);
      expect(testPractitionerRole.hasPractitioner()).toBe(true);
      expect(testPractitionerRole.getPractitioner()).toEqual(VALID_REFERENCE_PRACTITIONER);
      expect(testPractitionerRole.hasOrganization()).toBe(true);
      expect(testPractitionerRole.getOrganization()).toEqual(VALID_REFERENCE_ORGANIZATION);
      expect(testPractitionerRole.hasCode()).toBe(true);
      expect(testPractitionerRole.getCode()).toEqual([VALID_CODEABLECONCEPT]);
      expect(testPractitionerRole.hasSpecialty()).toBe(true);
      expect(testPractitionerRole.getSpecialty()).toEqual([VALID_CODEABLECONCEPT_2]);
      expect(testPractitionerRole.hasLocation()).toBe(true);
      expect(testPractitionerRole.getLocation()).toEqual([VALID_REFERENCE_LOCATION]);
      expect(testPractitionerRole.hasHealthcareService()).toBe(true);
      expect(testPractitionerRole.getHealthcareService()).toEqual([VALID_REFERENCE_HEALTHCARE_SERVICE]);
      expect(testPractitionerRole.hasTelecom()).toBe(true);
      expect(testPractitionerRole.getTelecom()).toEqual([VALID_CONTACTPOINT]);
      expect(testPractitionerRole.hasAvailableTime()).toBe(true);
      expect(testPractitionerRole.getAvailableTime()).toEqual([VALID_AVAILABLE_TIME]);
      expect(testPractitionerRole.hasNotAvailable()).toBe(true);
      expect(testPractitionerRole.getNotAvailable()).toEqual([VALID_NOT_AVAILABLE]);
      expect(testPractitionerRole.hasAvailabilityExceptionsElement()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptionsElement()).toEqual(new StringType(VALID_STRING));
      expect(testPractitionerRole.hasAvailabilityExceptions()).toBe(true);
      expect(testPractitionerRole.getAvailabilityExceptions()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRole.hasEndpoint()).toBe(true);
      expect(testPractitionerRole.getEndpoint()).toEqual([VALID_REFERENCE_ENDPOINT]);

      expect(testPractitionerRole.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPractitionerRole: PractitionerRole | undefined = undefined;

      testPractitionerRole = PractitionerRole.parse({});
      expect(testPractitionerRole).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPractitionerRole = PractitionerRole.parse(null);
      expect(testPractitionerRole).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPractitionerRole = PractitionerRole.parse(undefined);
      expect(testPractitionerRole).toBeUndefined();
    });

    it('should properly deserialize with valid json', () => {
      const testPractitionerRole = PractitionerRole.parse(VALID_JSON);

      expect(testPractitionerRole).toBeDefined();
      expect(testPractitionerRole).toBeInstanceOf(PractitionerRole);
      expect(testPractitionerRole).toBeInstanceOf(DomainResource);
      expect(testPractitionerRole).toBeInstanceOf(Resource);
      expect(testPractitionerRole).toBeInstanceOf(Base);
      expect(testPractitionerRole?.constructor.name).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole?.fhirType()).toStrictEqual('PractitionerRole');
      expect(testPractitionerRole?.isEmpty()).toBe(false);
      expect(testPractitionerRole?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    it('should throw InvalidTypeError when setIdentifier for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setIdentifier([new MockComplexDataType()]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.identifier; Provided value array has an element that is not an instance of Identifier.`,
      );
    });

    it('should throw InvalidTypeError when addIdentifier for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addIdentifier(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.identifier; Provided value is not an instance of Identifier.`);
    });

    it('should throw InvalidTypeError when setActiveElement for invalid type', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setActiveElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.active; Provided value is not an instance of BooleanType.`);
    });

    it('should throw PrimitiveTypeError when setActive for invalid value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setActive(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.active (Invalid datatype)`);
    });

    it('should throw InvalidTypeError when setPeriod for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setPeriod(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.period; Provided value is not an instance of Period.`);
    });

    it('should throw AssertionError when setPractitioner for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setPractitioner(new MockComplexDataType());
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setPractitioner (PractitionerRole.practitioner) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });

    it('should throw AssertionError when setOrganization for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setOrganization(new MockComplexDataType());
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setOrganization (PractitionerRole.organization) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });

    it('should throw InvalidTypeError when setCode for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setCode([new MockComplexDataType()]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.code; Provided value array has an element that is not an instance of CodeableConcept.`,
      );
    });

    it('should throw InvalidTypeError when addCode for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addCode(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.code; Provided value is not an instance of CodeableConcept.`);
    });

    it('should throw InvalidTypeError when setSpecialty for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setSpecialty([new MockComplexDataType()]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.specialty; Provided value array has an element that is not an instance of CodeableConcept.`,
      );
    });

    it('should throw InvalidTypeError when addSpecialty for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addSpecialty(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.specialty; Provided value is not an instance of CodeableConcept.`);
    });

    it('should throw AssertionError when setLocation for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setLocation([new MockComplexDataType()]);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setLocation (PractitionerRole.location) expects argument[0] to be type of 'Reference'`,
      );
    });

    it('should throw AssertionError when addLocation for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addLocation(new MockComplexDataType());
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on addLocation (PractitionerRole.location) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });

    it('should throw AssertionError when setHealthcareService for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setHealthcareService([new MockComplexDataType()]);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setHealthcareService (PractitionerRole.healthcareService) expects argument[0] to be type of 'Reference'`,
      );
    });

    it('should throw AssertionError when addHealthcareService for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addHealthcareService(new MockComplexDataType());
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on addHealthcareService (PractitionerRole.healthcareService) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });

    it('should throw InvalidTypeError when setTelecom for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setTelecom([new MockComplexDataType()]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.telecom; Provided value array has an element that is not an instance of ContactPoint.`,
      );
    });

    it('should throw InvalidTypeError when addTelecom for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addTelecom(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.telecom; Provided value is not an instance of ContactPoint.`);
    });

    it('should throw InvalidTypeError when setAvailableTime for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setAvailableTime([new MockComplexDataType()]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime; Provided value array has an element that is not an instance of PractitionerRoleAvailableTimeComponent.`,
      );
    });

    it('should throw InvalidTypeError when addAvailableTime for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addAvailableTime(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime; Provided element is not an instance of PractitionerRoleAvailableTimeComponent.`,
      );
    });

    it('should throw InvalidTypeError when setNotAvailable for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setNotAvailable([new MockComplexDataType()]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.notAvailable; Provided value array has an element that is not an instance of PractitionerRoleNotAvailableComponent.`,
      );
    });

    it('should throw InvalidTypeError when addNotAvailable for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addNotAvailable(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.notAvailable; Provided element is not an instance of PractitionerRoleNotAvailableComponent.`,
      );
    });

    it('should throw InvalidTypeError when setAvailabilityExceptionsElement for invalid type', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setAvailabilityExceptionsElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availabilityExceptions; Provided element is not an instance of StringType.`,
      );
    });

    it('should throw PrimitiveTypeError when setAvailabilityExceptions for invalid value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setAvailabilityExceptions(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.availabilityExceptions`);
    });

    it('should throw AssertionError when setEndpoint for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.setEndpoint([new MockComplexDataType()]);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setEndpoint (PractitionerRole.endpoint) expects argument[0] to be type of 'Reference'`,
      );
    });

    it('should throw AssertionError when addEndpoint for invalid type value', () => {
      const practitionerRole = new PractitionerRole();
      const t = () => {
        // @ts-expect-error: allow for testing
        practitionerRole.addEndpoint(new MockComplexDataType());
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ReferenceTargets decorator on addEndpoint (PractitionerRole.endpoint) expects a single argument to be type of 'Reference | undefined | null'`,
      );
    });
  });
});
