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
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { PractitionerRoleNotAvailableComponent } from '@src/fhir-models/PractitionerRole';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  MockComplexDataType,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('PractitionerRoleNotAvailableComponent', () => {
  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

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

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);

      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(true);
      const t = () => {
        testPractitionerRoleNotAvailableComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: PractitionerRole.notAvailable.description`);

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleNotAvailableComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toBeNull();
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toBeNull();
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(new Period());
    });

    it('should be properly instantiated with a primitive', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(VALID_STRING);

      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleNotAvailableComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toEqual(VALID_STRING_TYPE);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(new Period());
    });

    it('should be properly instantiated with a DataType', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(VALID_STRING_TYPE);

      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleNotAvailableComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toEqual(VALID_STRING_TYPE);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(new Period());
    });

    it('should throw AssertionError when reset with null/undefined PractitionerRole.notAvailable.description value', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(VALID_STRING);
      let t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDescriptionElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`PractitionerRole.notAvailable.description is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDescription(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`PractitionerRole.notAvailable.description is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDescriptionElement(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`PractitionerRole.notAvailable.description is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDescription(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`PractitionerRole.notAvailable.description is required`);
    });

    it('should properly copy()', () => {
      const practitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);
      practitionerRoleNotAvailableComponent.setId(VALID_ID);
      practitionerRoleNotAvailableComponent.setExtension([VALID_EXTENSION]);
      practitionerRoleNotAvailableComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      practitionerRoleNotAvailableComponent.setDescription(VALID_STRING);
      practitionerRoleNotAvailableComponent.setDuring(VALID_PERIOD);

      let testPractitionerRoleNotAvailableComponent = practitionerRoleNotAvailableComponent.copy();
      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleNotAvailableComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toEqual(VALID_STRING_TYPE);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(VALID_PERIOD);

      // Reset to empty

      practitionerRoleNotAvailableComponent.setId(UNDEFINED_VALUE);
      practitionerRoleNotAvailableComponent.setExtension(UNDEFINED_VALUE);
      practitionerRoleNotAvailableComponent.setModifierExtension(UNDEFINED_VALUE);
      // Setting to null or undefined results in an AssertionError because this field is required
      // practitionerRoleNotAvailableComponent.setDescriptionElement(null);
      practitionerRoleNotAvailableComponent.setDuring(UNDEFINED_VALUE);

      testPractitionerRoleNotAvailableComponent = practitionerRoleNotAvailableComponent.copy();
      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleNotAvailableComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(new Period());
    });

    it('should be properly reset by modifying all properties', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);
      testPractitionerRoleNotAvailableComponent.setId(VALID_ID);
      testPractitionerRoleNotAvailableComponent.setExtension([VALID_EXTENSION]);
      testPractitionerRoleNotAvailableComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testPractitionerRoleNotAvailableComponent.setDescription(VALID_STRING);
      testPractitionerRoleNotAvailableComponent.setDuring(VALID_PERIOD);

      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toEqual(VALID_STRING_TYPE);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(VALID_PERIOD);

      // Reset

      testPractitionerRoleNotAvailableComponent.setId(VALID_ID_2);
      testPractitionerRoleNotAvailableComponent.setExtension([VALID_EXTENSION_2]);
      testPractitionerRoleNotAvailableComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      testPractitionerRoleNotAvailableComponent.setDescriptionElement(VALID_STRING_TYPE_2);
      testPractitionerRoleNotAvailableComponent.setDuring(VALID_PERIOD_2);

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING_2);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(VALID_PERIOD_2);
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
      description: 'This is a valid string.',
      _description: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
      },
      during: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON = {
      during: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON_MISSING_DESCRIPTION = {
      description: '',
      during: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };

    it('should properly create serialized content', () => {
      const descriptionType = new StringType(VALID_STRING);
      descriptionType.setId(DATATYPE_ID);
      descriptionType.addExtension(DATATYPE_EXTENSION);

      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(descriptionType);
      testPractitionerRoleNotAvailableComponent.setId(VALID_ID);
      testPractitionerRoleNotAvailableComponent.setExtension([VALID_EXTENSION]);
      testPractitionerRoleNotAvailableComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testPractitionerRoleNotAvailableComponent.setDuring(VALID_PERIOD);

      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleNotAvailableComponent.hasId()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleNotAvailableComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleNotAvailableComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleNotAvailableComponent properties
      expect(testPractitionerRoleNotAvailableComponent.hasDescription()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescription()).toStrictEqual(VALID_STRING);
      expect(testPractitionerRoleNotAvailableComponent.hasDescriptionElement()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDescriptionElement()).toMatchObject(descriptionType);
      expect(testPractitionerRoleNotAvailableComponent.hasDuring()).toBe(true);
      expect(testPractitionerRoleNotAvailableComponent.getDuring()).toEqual(VALID_PERIOD);

      expect(testPractitionerRoleNotAvailableComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);
      testPractitionerRoleNotAvailableComponent.setDuring(VALID_PERIOD);

      const t = () => {
        testPractitionerRoleNotAvailableComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: PractitionerRole.notAvailable.description`);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPractitionerRoleNotAvailableComponent: PractitionerRoleNotAvailableComponent | undefined = undefined;

      testPractitionerRoleNotAvailableComponent = PractitionerRoleNotAvailableComponent.parse({});
      expect(testPractitionerRoleNotAvailableComponent).toBeUndefined();

      testPractitionerRoleNotAvailableComponent = PractitionerRoleNotAvailableComponent.parse(null);
      expect(testPractitionerRoleNotAvailableComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPractitionerRoleNotAvailableComponent = PractitionerRoleNotAvailableComponent.parse(undefined);
      expect(testPractitionerRoleNotAvailableComponent).toBeUndefined();
    });

    it('should properly deserialize with valid json', () => {
      const testPractitionerRoleNotAvailableComponent = PractitionerRoleNotAvailableComponent.parse(VALID_JSON);

      expect(testPractitionerRoleNotAvailableComponent).toBeDefined();
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(PractitionerRoleNotAvailableComponent);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleNotAvailableComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleNotAvailableComponent?.constructor.name).toStrictEqual(
        'PractitionerRoleNotAvailableComponent',
      );
      expect(testPractitionerRoleNotAvailableComponent?.fhirType()).toStrictEqual('PractitionerRole.notAvailable');
      expect(testPractitionerRoleNotAvailableComponent?.isEmpty()).toBe(false);
      expect(testPractitionerRoleNotAvailableComponent?.toJSON()).toEqual(VALID_JSON);
    });

    it('should throw FhirError from parse with missing required properties', () => {
      const t = () => {
        PractitionerRoleNotAvailableComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: PractitionerRole.notAvailable.description`,
      );
    });

    it('should throw FhirError from parse with missing description', () => {
      const t = () => {
        PractitionerRoleNotAvailableComponent.parse(INVALID_JSON_MISSING_DESCRIPTION);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: PractitionerRole.notAvailable.description`,
      );
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError when setDescriptionElement() with invalid type', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDescriptionElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.notAvailable.description; Provided value is not an instance of StringType.`,
      );
    });

    it('should throw InvalidTypeError when setDescription() with invalid type', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDescription(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.notAvailable.description`);
    });

    it('should throw InvalidTypeError when setDuring() with invalid type', () => {
      const testPractitionerRoleNotAvailableComponent = new PractitionerRoleNotAvailableComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleNotAvailableComponent.setDuring(new MockComplexDataType());
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.notAvailable.during; Provided value is not an instance of Period.`);
    });
  });
});
