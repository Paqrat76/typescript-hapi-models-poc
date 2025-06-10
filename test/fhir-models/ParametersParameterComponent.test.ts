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
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { ParametersParameterComponent } from '@src/fhir-models/Parameters';
import { Patient } from '@src/fhir-models/Patient';
import { AssertionError } from 'node:assert';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_STRING_TYPE,
  INVALID_STRING_TYPE_VALUE,
  MockBackboneElement,
  MockFhirModel,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('ParametersParameterComponent', () => {
  const VALID_NAME = 'testParameter';
  const VALID_SUB_NAME1 = 'subParameter1';
  const VALID_SUB_NAME2 = 'subParameter2';
  const VALUE_X_STRING = 'value[x] string value';
  const VALID_RESOURCE = new Patient();
  VALID_RESOURCE.setId('P123');
  VALID_RESOURCE.addName(new HumanName().setText('Patient name text'));

  const VALID_NAME_2 = 'testParameter';
  const VALID_SUB_NAME_21 = 'subParameter2-1';
  const VALID_SUB_NAME_22 = 'subParameter2-2';
  const VALUE_X_STRING_2 = 'value[x] string value 2';
  const VALID_RESOURCE_2 = new Patient();
  VALID_RESOURCE_2.setId('P456');
  VALID_RESOURCE_2.addName(new HumanName().setText('Patient name text 2'));

  const VALID_START_DATETIME = `2017-01-01T00:00:00.000Z`;
  const VALID_END_DATETIME = `2017-01-01T01:00:00.000Z`;
  const VALID_PERIOD = new Period();
  VALID_PERIOD.setStart(VALID_START_DATETIME);
  VALID_PERIOD.setEnd(VALID_END_DATETIME);
  VALID_PERIOD.setId(DATATYPE_ID);
  VALID_PERIOD.addExtension(DATATYPE_EXTENSION);

  const VALID_START_DATETIME_2 = `2017-01-02T00:00:00.000Z`;
  const VALID_END_DATETIME_2 = `2017-01-02T01:00:00.000Z`;
  const VALID_PERIOD_2 = new Period();
  VALID_PERIOD_2.setStart(VALID_START_DATETIME_2);
  VALID_PERIOD_2.setEnd(VALID_END_DATETIME_2);

  const VALID_PART1 = new ParametersParameterComponent(VALID_SUB_NAME1);
  VALID_PART1.setValue(new IntegerType(1976));
  const VALID_PART2 = new ParametersParameterComponent(VALID_SUB_NAME2);
  VALID_PART2.setValue(VALID_PERIOD);

  const VALID_PART_21 = new ParametersParameterComponent(VALID_SUB_NAME_21);
  VALID_PART_21.setValue(new IntegerType(2012));
  const VALID_PART_22 = new ParametersParameterComponent(VALID_SUB_NAME_22);
  VALID_PART_22.setValue(VALID_PERIOD_2);

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent.isEmpty()).toBe(true);
      const t = () => {
        testParametersParameterComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow('The following required properties do not exist: Parameters.parameter.name');

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(false);
      expect(testParametersParameterComponent.getId()).toBeUndefined();
      expect(testParametersParameterComponent.hasExtension()).toBe(false);
      expect(testParametersParameterComponent.getExtension()).toEqual([] as Extension[]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(false);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([] as Extension[]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasNameElement()).toBe(false);
      expect(testParametersParameterComponent.getNameElement()).toBeNull();
      expect(testParametersParameterComponent.hasName()).toBe(false);
      expect(testParametersParameterComponent.getName()).toBeNull();
      expect(testParametersParameterComponent.hasValue()).toBe(false);
      expect(testParametersParameterComponent.getValue()).toBeUndefined();
      expect(testParametersParameterComponent.hasResource()).toBe(false);
      expect(testParametersParameterComponent.getResource()).toBeUndefined();
      expect(testParametersParameterComponent.hasPart()).toBe(false);
      expect(testParametersParameterComponent.getPart()).toEqual([] as ParametersParameterComponent[]);
    });

    it('should be properly instantiated with a PrimitiveType', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(new StringType(VALID_NAME));

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent.isEmpty()).toBe(false);
      expect(testParametersParameterComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(false);
      expect(testParametersParameterComponent.getId()).toBeUndefined();
      expect(testParametersParameterComponent.hasExtension()).toBe(false);
      expect(testParametersParameterComponent.getExtension()).toEqual([] as Extension[]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(false);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([] as Extension[]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasNameElement()).toBe(true);
      expect(testParametersParameterComponent.getNameElement()).toEqual(new StringType(VALID_NAME));
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME);
      expect(testParametersParameterComponent.hasValue()).toBe(false);
      expect(testParametersParameterComponent.getValue()).toBeUndefined();
      expect(testParametersParameterComponent.hasResource()).toBe(false);
      expect(testParametersParameterComponent.getResource()).toBeUndefined();
      expect(testParametersParameterComponent.hasPart()).toBe(false);
      expect(testParametersParameterComponent.getPart()).toEqual([] as ParametersParameterComponent[]);
    });

    it('should be properly instantiated with a primitive', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(VALID_NAME);

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent.isEmpty()).toBe(false);
      expect(testParametersParameterComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(false);
      expect(testParametersParameterComponent.getId()).toBeUndefined();
      expect(testParametersParameterComponent.hasExtension()).toBe(false);
      expect(testParametersParameterComponent.getExtension()).toEqual([] as Extension[]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(false);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([] as Extension[]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasNameElement()).toBe(true);
      expect(testParametersParameterComponent.getNameElement()).toEqual(new StringType(VALID_NAME));
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME);
      expect(testParametersParameterComponent.hasValue()).toBe(false);
      expect(testParametersParameterComponent.getValue()).toBeUndefined();
      expect(testParametersParameterComponent.hasResource()).toBe(false);
      expect(testParametersParameterComponent.getResource()).toBeUndefined();
      expect(testParametersParameterComponent.hasPart()).toBe(false);
      expect(testParametersParameterComponent.getPart()).toEqual([] as ParametersParameterComponent[]);
    });

    it('should properly copy()', () => {
      const parametersParameterComponent = new ParametersParameterComponent(null);
      parametersParameterComponent.setId(VALID_ID);
      parametersParameterComponent.setExtension([VALID_EXTENSION]);
      parametersParameterComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      // NOTE: Rule: A parameter must have one and only one of (value, resource, part)
      // Ignoring for testing purposes
      parametersParameterComponent.setName(VALID_NAME);
      parametersParameterComponent.setValue(new StringType(VALUE_X_STRING));
      parametersParameterComponent.setResource(VALID_RESOURCE);
      parametersParameterComponent.addPart(VALID_PART1);
      parametersParameterComponent.addPart(VALID_PART2);

      let testParametersParameterComponent = parametersParameterComponent.copy();

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent.isEmpty()).toBe(false);
      expect(testParametersParameterComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(true);
      expect(testParametersParameterComponent.getId()).toStrictEqual(VALID_ID);
      expect(testParametersParameterComponent.hasExtension()).toBe(true);
      expect(testParametersParameterComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(true);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME);
      expect(testParametersParameterComponent.hasValue()).toBe(true);
      expect(testParametersParameterComponent.getValue()).toEqual(new StringType(VALUE_X_STRING));
      expect(testParametersParameterComponent.hasResource()).toBe(true);
      expect(testParametersParameterComponent.getResource()).toEqual(VALID_RESOURCE);
      expect(testParametersParameterComponent.hasPart()).toBe(true);
      expect(testParametersParameterComponent.getPart()).toEqual([VALID_PART1, VALID_PART2]);

      // Reset to empty

      parametersParameterComponent.setId(UNDEFINED_VALUE);
      parametersParameterComponent.setExtension(UNDEFINED_VALUE);
      parametersParameterComponent.setModifierExtension(UNDEFINED_VALUE);
      // Setting to null or undefined results in an AssertionError because this field is required
      // parametersParameterComponent.setName(null);
      parametersParameterComponent.setValue(UNDEFINED_VALUE);
      parametersParameterComponent.setResource(UNDEFINED_VALUE);
      parametersParameterComponent.setPart(UNDEFINED_VALUE);

      testParametersParameterComponent = parametersParameterComponent.copy();

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent.isEmpty()).toBe(false);
      expect(testParametersParameterComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(false);
      expect(testParametersParameterComponent.getId()).toBeUndefined();
      expect(testParametersParameterComponent.hasExtension()).toBe(false);
      expect(testParametersParameterComponent.getExtension()).toEqual([] as Extension[]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(false);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([] as Extension[]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasNameElement()).toBe(true);
      expect(testParametersParameterComponent.getNameElement()).toEqual(new StringType(VALID_NAME));
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME);
      expect(testParametersParameterComponent.hasValue()).toBe(false);
      expect(testParametersParameterComponent.getValue()).toBeUndefined();
      expect(testParametersParameterComponent.hasResource()).toBe(false);
      expect(testParametersParameterComponent.getResource()).toBeUndefined();
      expect(testParametersParameterComponent.hasPart()).toBe(false);
      expect(testParametersParameterComponent.getPart()).toEqual([] as ParametersParameterComponent[]);
    });

    it('should be properly reset by modifying all properties', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      testParametersParameterComponent.setId(VALID_ID);
      testParametersParameterComponent.setExtension([VALID_EXTENSION]);
      testParametersParameterComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      // NOTE: Rule: A parameter must have one and only one of (value, resource, part)
      // Ignoring for testing purposes
      testParametersParameterComponent.setName(VALID_NAME);
      testParametersParameterComponent.setValue(new StringType(VALUE_X_STRING));
      testParametersParameterComponent.setResource(VALID_RESOURCE);
      testParametersParameterComponent.setPart([VALID_PART1, VALID_PART2]);

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent.isEmpty()).toBe(false);
      expect(testParametersParameterComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(true);
      expect(testParametersParameterComponent.getId()).toStrictEqual(VALID_ID);
      expect(testParametersParameterComponent.hasExtension()).toBe(true);
      expect(testParametersParameterComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(true);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasNameElement()).toBe(true);
      expect(testParametersParameterComponent.getNameElement()).toStrictEqual(new StringType(VALID_NAME));
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME);
      expect(testParametersParameterComponent.hasValue()).toBe(true);
      expect(testParametersParameterComponent.getValue()).toEqual(new StringType(VALUE_X_STRING));
      expect(testParametersParameterComponent.hasResource()).toBe(true);
      expect(testParametersParameterComponent.getResource()).toEqual(VALID_RESOURCE);
      expect(testParametersParameterComponent.hasPart()).toBe(true);
      expect(testParametersParameterComponent.getPart()).toEqual([VALID_PART1, VALID_PART2]);

      // Reset

      testParametersParameterComponent.setId(VALID_ID_2);
      testParametersParameterComponent.setExtension([VALID_EXTENSION_2]);
      testParametersParameterComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      // NOTE: Rule: A parameter must have one and only one of (value, resource, part)
      // Ignoring for testing purposes
      testParametersParameterComponent.setNameElement(new StringType(VALID_NAME_2));
      testParametersParameterComponent.setValue(new StringType(VALUE_X_STRING_2));
      testParametersParameterComponent.setResource(VALID_RESOURCE_2);
      testParametersParameterComponent.setPart([VALID_PART_21, VALID_PART_22]);

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent.isEmpty()).toBe(false);
      expect(testParametersParameterComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(true);
      expect(testParametersParameterComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testParametersParameterComponent.hasExtension()).toBe(true);
      expect(testParametersParameterComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(true);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasNameElement()).toBe(true);
      expect(testParametersParameterComponent.getNameElement()).toStrictEqual(new StringType(VALID_NAME_2));
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME_2);
      expect(testParametersParameterComponent.hasValue()).toBe(true);
      expect(testParametersParameterComponent.getValue()).toEqual(new StringType(VALUE_X_STRING_2));
      expect(testParametersParameterComponent.hasResource()).toBe(true);
      expect(testParametersParameterComponent.getResource()).toEqual(VALID_RESOURCE_2);
      expect(testParametersParameterComponent.hasPart()).toBe(true);
      expect(testParametersParameterComponent.getPart()).toEqual([VALID_PART_21, VALID_PART_22]);
    });
  });

  describe('Serialization/Deserialization', () => {
    // NOTE: Parameters.parameter definition requires one of value[x] / resource / part; but to facilitate testing,
    //       we are including all three properties.
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
      name: 'testParameter',
      valueString: 'value[x] string value',
      resource: {
        resourceType: 'Patient',
        id: 'P123',
        name: [
          {
            text: 'Patient name text',
          },
        ],
      },
      part: [
        {
          name: 'subParameter1',
          valueInteger: 1976,
        },
        {
          name: 'subParameter2',
          valuePeriod: {
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
        },
      ],
    };
    const INVALID_JSON = {
      valueString: 'value[x] string value',
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);

      const t = () => {
        testParametersParameterComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Parameters.parameter.name`);
    });

    it('should throw FhirError from parse() when JSON is missing required properties', () => {
      const t = () => {
        ParametersParameterComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Parameters.parameter.name`,
      );
    });

    it('should return undefined when deserialize with no json', () => {
      let testParametersParameterComponent: ParametersParameterComponent | undefined = undefined;
      testParametersParameterComponent = ParametersParameterComponent.parse({});
      expect(testParametersParameterComponent).toBeUndefined();

      testParametersParameterComponent = ParametersParameterComponent.parse(null);
      expect(testParametersParameterComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testParametersParameterComponent = ParametersParameterComponent.parse(undefined);
      expect(testParametersParameterComponent).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      testParametersParameterComponent.setId(VALID_ID);
      testParametersParameterComponent.addExtension(VALID_EXTENSION);
      testParametersParameterComponent.addModifierExtension(VALID_MODIFIER_EXTENSION);

      // NOTE: Rule: A parameter must have one and only one of (value, resource, part)
      // Ignoring for testing purposes
      testParametersParameterComponent.setName(VALID_NAME);
      testParametersParameterComponent.setValue(new StringType(VALUE_X_STRING));
      testParametersParameterComponent.setResource(VALID_RESOURCE);
      testParametersParameterComponent.addPart(VALID_PART1);
      testParametersParameterComponent.addPart(VALID_PART2);

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent.isEmpty()).toBe(false);

      // inherited properties from BackboneElement
      expect(testParametersParameterComponent.hasId()).toBe(true);
      expect(testParametersParameterComponent.getId()).toStrictEqual(VALID_ID);
      expect(testParametersParameterComponent.hasExtension()).toBe(true);
      expect(testParametersParameterComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testParametersParameterComponent.hasModifierExtension()).toBe(true);
      expect(testParametersParameterComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // ParametersParameterComponent properties
      expect(testParametersParameterComponent.hasName()).toBe(true);
      expect(testParametersParameterComponent.getName()).toStrictEqual(VALID_NAME);
      expect(testParametersParameterComponent.hasValue()).toBe(true);
      expect(testParametersParameterComponent.getValue()).toEqual(new StringType(VALUE_X_STRING));
      expect(testParametersParameterComponent.hasResource()).toBe(true);
      expect(testParametersParameterComponent.getResource()).toEqual(VALID_RESOURCE);
      expect(testParametersParameterComponent.hasPart()).toBe(true);
      expect(testParametersParameterComponent.getPart()).toEqual([VALID_PART1, VALID_PART2]);

      expect(testParametersParameterComponent.toJSON()).toEqual(VALID_JSON);
    });

    // Skip for now because PARSABLE_DATATYPE_MAP populates 'HumanName' and 'Period' as undefined in fhir-parsers.ts
    it.skip('should return ParametersParameterComponent for valid json', () => {
      const testParametersParameterComponent: ParametersParameterComponent | undefined =
        ParametersParameterComponent.parse(VALID_JSON);

      expect(testParametersParameterComponent).toBeDefined();
      expect(testParametersParameterComponent).toBeInstanceOf(ParametersParameterComponent);
      expect(testParametersParameterComponent).toBeInstanceOf(BackboneElement);
      expect(testParametersParameterComponent).toBeInstanceOf(Element);
      expect(testParametersParameterComponent).toBeInstanceOf(Base);
      expect(testParametersParameterComponent?.constructor.name).toStrictEqual('ParametersParameterComponent');
      expect(testParametersParameterComponent?.fhirType()).toStrictEqual('Parameters.parameter');
      expect(testParametersParameterComponent?.isEmpty()).toBe(false);
      expect(testParametersParameterComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError when instantiated with an invalid StringType', () => {
      const t = () => {
        // @ts-expect-error: allow for testing
        new ParametersParameterComponent(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Parameters.parameter.name; Provided value is not an instance of StringType.`);
    });

    it('should throw InvalidTypeError when instantiated with an invalid fhirString', () => {
      const t = () => {
        // @ts-expect-error: allow for testing
        new ParametersParameterComponent(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Parameters.parameter.name (12345)`);
    });

    it('should throw InvalidTypeError for setNameElement()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setNameElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Parameters.parameter.name; Provided value is not an instance of StringType.`);
    });

    it('should throw InvalidTypeError for setName()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setName(INVALID_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Parameters.parameter.name (12345)`);
    });

    it('should throw AssertionError when reset with null/undefined setNameElement() value', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      let t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setNameElement(UNDEFINED_VALUE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Parameters.parameter.name is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setNameElement(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Parameters.parameter.name is required`);
    });

    it('should throw AssertionError when reset with null/undefined setName() value', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      let t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setName(UNDEFINED_VALUE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Parameters.parameter.name is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setName(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Parameters.parameter.name is required`);
    });

    it('should throw InvalidTypeError for setValue()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      const testValue = new XhtmlType();
      const t = () => {
        testParametersParameterComponent.setValue(testValue);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `OpenDataTypes decorator on setValue (Parameters.parameter.value[x]) expects the 'value' argument type (xhtml) to be a supported DataType`,
      );
    });

    it('should throw InvalidTypeError for setResource()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      const invalidResource = new MockFhirModel();
      const t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setResource(invalidResource);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Parameters.parameter.resource; Provided element is not an instance of Resource.`);
    });

    it('should throw InvalidTypeError for setPart()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      const invalidBackboneElement = new MockBackboneElement();
      const t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.setPart([invalidBackboneElement]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Parameters.parameter.part; Provided value array has an element that is not an instance of ParametersParameterComponent.`,
      );
    });

    it('should throw InvalidTypeError for addPart()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(null);
      const invalidBackboneElement = new MockBackboneElement();
      const t = () => {
        // @ts-expect-error: allow for testing
        testParametersParameterComponent.addPart(invalidBackboneElement);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Parameters.parameter.part; Provided element is not an instance of ParametersParameterComponent.`,
      );
    });
  });
});
