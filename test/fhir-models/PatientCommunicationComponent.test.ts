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
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { PatientCommunicationComponent } from '@src/fhir-models/Patient';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_ID,
  VALID_MODIFIER_EXTENSION,
} from '../test-utils';

describe('PatientCommunicationComponent', () => {
  const LANG_SYSTEM = 'urn:ietf:bcp:47';
  const LANG_CODE_1 = 'en-US';
  const LANG_DISPLAY_1 = 'English (United States)';
  const LANG_CODE_2 = 'de-DE';
  const LANG_DISPLAY_2 = 'German (Germany)';

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testPatientCommunicationComponent = new PatientCommunicationComponent(null);

      expect(testPatientCommunicationComponent).toBeDefined();
      expect(testPatientCommunicationComponent).toBeInstanceOf(PatientCommunicationComponent);
      expect(testPatientCommunicationComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Element);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Base);
      expect(testPatientCommunicationComponent.constructor.name).toStrictEqual('PatientCommunicationComponent');
      expect(testPatientCommunicationComponent.fhirType()).toStrictEqual('Patient.communication');
      expect(testPatientCommunicationComponent.isEmpty()).toBe(true);
      const t = () => {
        testPatientCommunicationComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Patient.communication.language`);

      // inherited properties from BackboneElement
      expect(testPatientCommunicationComponent.hasId()).toBe(false);
      expect(testPatientCommunicationComponent.getId()).toBeUndefined();
      expect(testPatientCommunicationComponent.hasExtension()).toBe(false);
      expect(testPatientCommunicationComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientCommunicationComponent.hasModifierExtension()).toBe(false);
      expect(testPatientCommunicationComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(false);
      expect(testPatientCommunicationComponent.getLanguage()).toBeNull();
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType());
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferred()).toBeUndefined();
    });

    it('should properly copy() when initialized with null', () => {
      const patientCommunicationComponent = new PatientCommunicationComponent(null);

      const testPatientCommunicationComponent = patientCommunicationComponent.copy();
      expect(testPatientCommunicationComponent).toBeDefined();
      expect(testPatientCommunicationComponent).toBeInstanceOf(PatientCommunicationComponent);
      expect(testPatientCommunicationComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Element);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Base);
      expect(testPatientCommunicationComponent.constructor.name).toStrictEqual('PatientCommunicationComponent');
      expect(testPatientCommunicationComponent.fhirType()).toStrictEqual('Patient.communication');
      expect(testPatientCommunicationComponent.isEmpty()).toBe(true);
      const t = () => {
        testPatientCommunicationComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Patient.communication.language`);

      // inherited properties from BackboneElement
      expect(testPatientCommunicationComponent.hasId()).toBe(false);
      expect(testPatientCommunicationComponent.getId()).toBeUndefined();
      expect(testPatientCommunicationComponent.hasExtension()).toBe(false);
      expect(testPatientCommunicationComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientCommunicationComponent.hasModifierExtension()).toBe(false);
      expect(testPatientCommunicationComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(false);
      expect(testPatientCommunicationComponent.getLanguage()).toBeNull();
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType());
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferred()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const langCoding: Coding = new Coding();
      langCoding.setSystem(LANG_SYSTEM);
      langCoding.setCode(LANG_CODE_1);
      langCoding.setDisplay(LANG_DISPLAY_1);
      const language: CodeableConcept = new CodeableConcept();
      language.addCoding(langCoding);

      const patientCommunicationComponent = new PatientCommunicationComponent(language);
      patientCommunicationComponent.setPreferred(true);

      const testPatientCommunicationComponent = patientCommunicationComponent.copy();
      expect(testPatientCommunicationComponent).toBeDefined();
      expect(testPatientCommunicationComponent).toBeInstanceOf(PatientCommunicationComponent);
      expect(testPatientCommunicationComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Element);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Base);
      expect(testPatientCommunicationComponent.constructor.name).toStrictEqual('PatientCommunicationComponent');
      expect(testPatientCommunicationComponent.fhirType()).toStrictEqual('Patient.communication');
      expect(testPatientCommunicationComponent.isEmpty()).toBe(false);
      expect(testPatientCommunicationComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPatientCommunicationComponent.hasId()).toBe(false);
      expect(testPatientCommunicationComponent.getId()).toBeUndefined();
      expect(testPatientCommunicationComponent.hasExtension()).toBe(false);
      expect(testPatientCommunicationComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPatientCommunicationComponent.hasModifierExtension()).toBe(false);
      expect(testPatientCommunicationComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(true);
      expect(testPatientCommunicationComponent.getLanguage()).toEqual(language);
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(true);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType(true));
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(true);
      expect(testPatientCommunicationComponent.getPreferred()).toStrictEqual(true);
    });

    it('should be properly reset by modifying all properties', () => {
      const langCoding1: Coding = new Coding();
      langCoding1.setSystem(LANG_SYSTEM);
      langCoding1.setCode(LANG_CODE_1);
      langCoding1.setDisplay(LANG_DISPLAY_1);
      const language1: CodeableConcept = new CodeableConcept();
      language1.addCoding(langCoding1);

      const testPatientCommunicationComponent = new PatientCommunicationComponent(language1);
      expect(testPatientCommunicationComponent).toBeDefined();
      expect(testPatientCommunicationComponent.isEmpty()).toBe(false);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(true);
      expect(testPatientCommunicationComponent.getLanguage()).toEqual(language1);
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType());
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferred()).toBeUndefined();

      // Reset

      const langCoding2: Coding = new Coding();
      langCoding2.setSystem(LANG_SYSTEM);
      langCoding2.setCode(LANG_CODE_2);
      langCoding2.setDisplay(LANG_DISPLAY_2);
      const language2: CodeableConcept = new CodeableConcept();
      language2.addCoding(langCoding2);

      testPatientCommunicationComponent.setLanguage(language2);
      testPatientCommunicationComponent.setPreferredElement(new BooleanType(false));

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(true);
      expect(testPatientCommunicationComponent.getLanguage()).toEqual(language2);
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(true);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType(false));
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(true);
      expect(testPatientCommunicationComponent.getPreferred()).toStrictEqual(false);

      // Reset to empty

      // language is a required property so it cannot be reset to null/undefined
      testPatientCommunicationComponent.setPreferredElement(UNDEFINED_VALUE);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(true);
      expect(testPatientCommunicationComponent.getLanguage()).toEqual(language2);
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType());
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferred()).toBeUndefined();

      testPatientCommunicationComponent.setPreferred(UNDEFINED_VALUE);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(true);
      expect(testPatientCommunicationComponent.getLanguage()).toEqual(language2);
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType());
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(false);
      expect(testPatientCommunicationComponent.getPreferred()).toBeUndefined();
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
      language: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
        coding: [
          {
            system: 'urn:ietf:bcp:47',
            code: 'en-US',
            display: 'English (United States)',
          },
        ],
      },
      preferred: true,
    };
    const INVALID_JSON = {
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
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testPatientCommunicationComponent = new PatientCommunicationComponent(null);

      const t = () => {
        testPatientCommunicationComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Patient.communication.language`);
    });

    it('should properly create serialized content', () => {
      const langCoding: Coding = new Coding();
      langCoding.setSystem(LANG_SYSTEM);
      langCoding.setCode(LANG_CODE_1);
      langCoding.setDisplay(LANG_DISPLAY_1);
      const language: CodeableConcept = new CodeableConcept();
      language.addCoding(langCoding);
      language.setId(DATATYPE_ID);
      language.addExtension(DATATYPE_EXTENSION);

      const testPatientCommunicationComponent = new PatientCommunicationComponent(language);
      testPatientCommunicationComponent.setPreferred(true);
      testPatientCommunicationComponent.setId(VALID_ID);
      testPatientCommunicationComponent.setExtension([VALID_EXTENSION]);
      testPatientCommunicationComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);

      expect(testPatientCommunicationComponent).toBeDefined();
      expect(testPatientCommunicationComponent).toBeInstanceOf(PatientCommunicationComponent);
      expect(testPatientCommunicationComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Element);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Base);
      expect(testPatientCommunicationComponent.constructor.name).toStrictEqual('PatientCommunicationComponent');
      expect(testPatientCommunicationComponent.fhirType()).toStrictEqual('Patient.communication');
      expect(testPatientCommunicationComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testPatientCommunicationComponent.hasId()).toBe(true);
      expect(testPatientCommunicationComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPatientCommunicationComponent.hasExtension()).toBe(true);
      expect(testPatientCommunicationComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPatientCommunicationComponent.hasModifierExtension()).toBe(true);
      expect(testPatientCommunicationComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PatientLinkComponent properties
      expect(testPatientCommunicationComponent.hasLanguage()).toBe(true);
      expect(testPatientCommunicationComponent.getLanguage()).toEqual(language);
      expect(testPatientCommunicationComponent.hasPreferredElement()).toBe(true);
      expect(testPatientCommunicationComponent.getPreferredElement()).toEqual(new BooleanType(true));
      expect(testPatientCommunicationComponent.hasPreferred()).toBe(true);
      expect(testPatientCommunicationComponent.getPreferred()).toStrictEqual(true);

      expect(testPatientCommunicationComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPatientCommunicationComponent: PatientCommunicationComponent | undefined;
      testPatientCommunicationComponent = PatientCommunicationComponent.parse({});
      expect(testPatientCommunicationComponent).toBeUndefined();

      testPatientCommunicationComponent = PatientCommunicationComponent.parse(null);
      expect(testPatientCommunicationComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPatientCommunicationComponent = PatientCommunicationComponent.parse(undefined);
      expect(testPatientCommunicationComponent).toBeUndefined();
    });

    it('should throw FhirError from parse with missing required properties', () => {
      const t = () => {
        PatientCommunicationComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Patient.communication.language`,
      );
    });

    it('should return PatientCommunicationComponent for valid json', () => {
      const testPatientCommunicationComponent: PatientCommunicationComponent | undefined =
        PatientCommunicationComponent.parse(VALID_JSON);

      expect(testPatientCommunicationComponent).toBeDefined();
      expect(testPatientCommunicationComponent).toBeInstanceOf(PatientCommunicationComponent);
      expect(testPatientCommunicationComponent).toBeInstanceOf(BackboneElement);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Element);
      expect(testPatientCommunicationComponent).toBeInstanceOf(Base);
      expect(testPatientCommunicationComponent?.constructor.name).toStrictEqual('PatientCommunicationComponent');
      expect(testPatientCommunicationComponent?.fhirType()).toStrictEqual('Patient.communication');
      expect(testPatientCommunicationComponent?.isEmpty()).toBe(false);

      expect(testPatientCommunicationComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    it('should throw errors for invalid arguments', () => {
      const testPatientCommunicationComponent = new PatientCommunicationComponent(null);

      let t = () => {
        // @ts-expect-error: allow for testing
        testPatientCommunicationComponent.setLanguage(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Patient.communication.language; Provided element is not an instance of CodeableConcept.`,
      );

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientCommunicationComponent.setPreferred(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Patient.communication.preferred (12345)`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientCommunicationComponent.setPreferredElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Patient.communication.preferred; Provided element is not an instance of BooleanType.`);
    });

    it('should throw AssertionError for undefined/null arguments', () => {
      const testPatientCommunicationComponent = new PatientCommunicationComponent(null);

      let t = () => {
        // @ts-expect-error: allow for testing
        testPatientCommunicationComponent.setLanguage(UNDEFINED_VALUE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.communication.language is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPatientCommunicationComponent.setLanguage(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Patient.communication.language is required`);
    });
  });
});
