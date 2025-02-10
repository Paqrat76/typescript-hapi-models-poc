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

import { DateTime } from 'luxon';
import { Extension } from '../../src/fhir-core/base-models/core-fhir-models';
import { IdentifierUseEnum } from '../../src/fhir-core/data-types/code-systems/IdentiferUseEnum';
import { Address } from '../../src/fhir-core/data-types/complex/Address';
import { CodeableConcept } from '../../src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '../../src/fhir-core/data-types/complex/Coding';
import { ContactPoint } from '../../src/fhir-core/data-types/complex/ContactPoint';
import { HumanName } from '../../src/fhir-core/data-types/complex/HumanName';
import { Period } from '../../src/fhir-core/data-types/complex/Period';
import { Identifier, Reference } from '../../src/fhir-core/data-types/complex/Reference-Identifier';
import { StringType } from '../../src/fhir-core/data-types/primitive/StringType';
import { getDateTimeObject, getValueAsDateOnly } from '../../src/fhir-core/utility/date-time-util';
import { AdministrativeGenderEnum } from '../../src/fhir-models/code-systems/AdministrativeGenderEnum';
import { Patient, PatientLinkComponent } from '../../src/fhir-models/Patient';
import { PractitionerRole, PractitionerRoleNotAvailableComponent } from '../../src/fhir-models/PractitionerRole';

/**
 * Functional testing to demonstrate implementation of features inspired by HAPI FHIR such as convenience methods and,
 * where appropriate, the ability to use fluent chained methods.
 *
 * - [Working With Resources](https://hapifhir.io/hapi-fhir/docs/model/working_with_resources.html)
 * - [Resource References](https://hapifhir.io/hapi-fhir/docs/model/references.html)
 * - [Profiles and Extensions](https://hapifhir.io/hapi-fhir/docs/model/profiles_and_extensions.html)
 */
describe('Functional Model Demo', () => {
  it('should properly define FHIR data models using helpers and method chaining', () => {
    /*
     * Create PractitionerRole for use as a `contained` resource
     */
    const practitionerRole: PractitionerRole = new PractitionerRole().setId('#123').setActive(true);

    practitionerRole.addIdentifier(
      new Identifier().setSystem('http://system/medical/role').setValue('PCP').setUse(IdentifierUseEnum.OFFICIAL.code),
    );

    practitionerRole
      .setPeriod(new Period().setStart('2025-01-01T00:00:00Z'))
      .setPractitioner(new Reference().setReference('Practitioner/DR-123'))
      .setOrganization(new Reference().setReference('Organization/O-246'));

    practitionerRole
      .setCode([
        new CodeableConcept().addCoding(
          new Coding().setSystem('http://snomed.info/sct').setCode('62247001').setDisplay('Family medicine specialist'),
        ),
      ])
      .setSpecialty([
        new CodeableConcept().addCoding(
          new Coding().setSystem('http://snomed.info/sct').setCode('419772000').setDisplay('Family practice'),
        ),
      ]);

    practitionerRole.setNotAvailable([
      new PractitionerRoleNotAvailableComponent('Hospital on-call').setDuring(
        new Period().setStart('2025-03-15T06:00:00Z').setEnd('2025-03-17T06:00:00Z'),
      ),
      new PractitionerRoleNotAvailableComponent('Hospital on-call').setDuring(
        new Period().setStart('2025-03-22T06:00:00Z').setEnd('2025-03-24T06:00:00Z'),
      ),
    ]);

    const expectedPractitionerRoleJson = {
      resourceType: 'PractitionerRole',
      id: '#123',
      identifier: [
        {
          use: 'official',
          system: 'http://system/medical/role',
          value: 'PCP',
        },
      ],
      active: true,
      period: {
        start: '2025-01-01T00:00:00Z',
      },
      practitioner: {
        reference: 'Practitioner/DR-123',
      },
      organization: {
        reference: 'Organization/O-246',
      },
      code: [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '62247001',
              display: 'Family medicine specialist',
            },
          ],
        },
      ],
      specialty: [
        {
          coding: [
            {
              system: 'http://snomed.info/sct',
              code: '419772000',
              display: 'Family practice',
            },
          ],
        },
      ],
      notAvailable: [
        {
          description: 'Hospital on-call',
          during: {
            start: '2025-03-15T06:00:00Z',
            end: '2025-03-17T06:00:00Z',
          },
        },
        {
          description: 'Hospital on-call',
          during: {
            start: '2025-03-22T06:00:00Z',
            end: '2025-03-24T06:00:00Z',
          },
        },
      ],
    };
    expect(practitionerRole.toJSON()).toEqual(expectedPractitionerRoleJson);

    /*
     * Create Patient to include a `contained` PractitionerRole resource and extensions
     */
    const patient: Patient = new Patient().setId('P-70324');

    patient.addContained(practitionerRole);
    patient.addExtension(
      new Extension('http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName', new StringType('Cooper')),
    );

    patient
      .addName(new HumanName().setText('MS Alice Jones'))
      .addAddress(new Address().setUse('home').setType('both').setText('1234 Main ST Nashua NH 03060'))
      .addTelecom(new ContactPoint().setUse('mobile').setSystem('phone').setValue('603-555-7531'));

    if (patient.hasTelecom()) {
      const telecom: ContactPoint[] = patient.getTelecom();
      if (telecom.length === 1 && telecom[0] !== undefined) {
        telecom[0].addExtension(
          new Extension('http://hl7.org/fhir/StructureDefinition/contactpoint-country', new StringType('1')),
        );
      }
    }

    patient.setActive(true).setGender(AdministrativeGenderEnum.FEMALE.code);

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const birthDateObject: DateTime = getDateTimeObject('1978-04-01')!;
    patient.setBirthDate(getValueAsDateOnly(birthDateObject));

    patient
      .addGeneralPractitioner(new Reference().setReference('PractitionerRole/#123'))
      .addLink(new PatientLinkComponent(new Reference().setReference('RelatedPerson/RP-8642'), 'seealso'));

    const expectedPatientJson = {
      resourceType: 'Patient',
      id: 'P-70324',
      contained: [expectedPractitionerRoleJson],
      extension: [
        {
          url: 'http://hl7.org/fhir/StructureDefinition/patient-mothersMaidenName',
          valueString: 'Cooper',
        },
      ],
      active: true,
      name: [
        {
          text: 'MS Alice Jones',
        },
      ],
      telecom: [
        {
          extension: [
            {
              url: 'http://hl7.org/fhir/StructureDefinition/contactpoint-country',
              valueString: '1',
            },
          ],
          system: 'phone',
          value: '603-555-7531',
          use: 'mobile',
        },
      ],
      gender: 'female',
      birthDate: '1978-04-01',
      address: [
        {
          use: 'home',
          type: 'both',
          text: '1234 Main ST Nashua NH 03060',
        },
      ],
      generalPractitioner: [
        {
          reference: 'PractitionerRole/#123',
        },
      ],
      link: [
        {
          other: {
            reference: 'RelatedPerson/RP-8642',
          },
          type: 'seealso',
        },
      ],
    };
    expect(patient.toJSON()).toEqual(expectedPatientJson);

    /*
     * Demonstrate use of Luxon Date/Time Library
     */
    if (patient.hasBirthDate()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dt: DateTime = getDateTimeObject(patient.getBirthDate())!; // '1978-04-01';
      expect(dt.isValid).toBe(true);
      expect(dt.year).toStrictEqual(1978);
      expect(dt.quarter).toStrictEqual(2);
      expect(dt.month).toStrictEqual(4);
      expect(dt.day).toStrictEqual(1);
      expect(dt.isInLeapYear).toBe(false);
      expect(dt.isInDST).toBe(false); // Apr 30, 1978 - Daylight Saving Time Started
      expect(dt.toISODate()).toStrictEqual('1978-04-01');
      expect(dt.toJSON()).toStrictEqual('1978-04-01T00:00:00.000-05:00');
    }
  });
});
