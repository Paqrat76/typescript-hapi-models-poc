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
import { Resource } from '@src/fhir-core/base-models/Resource';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { Parameters, ParametersParameterComponent } from '@src/fhir-models/Parameters';
import { Patient } from '@src/fhir-models/Patient';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  IMPLICIT_RULES_VALUE,
  LANGUAGE_VALUE,
  MockBackboneElement,
  UNDEFINED_VALUE,
  VALID_ID,
  VALID_META,
} from '../test-utils';

describe('Parameters', () => {
  const VALID_NAME = 'testParameter';
  const VALID_SUB_NAME1 = 'subParameter1';
  const VALID_SUB_NAME2 = 'subParameter2';
  const VALUE_X_STRING = 'value[x] string value';
  const VALID_RESOURCE = new Patient();
  VALID_RESOURCE.setId('P123');
  VALID_RESOURCE.addName(new HumanName().setText('Patient name text'));

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

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testParameters = new Parameters();

      expect(testParameters).toBeDefined();
      expect(testParameters).toBeInstanceOf(Parameters);
      expect(testParameters).toBeInstanceOf(Resource);
      expect(testParameters).toBeInstanceOf(Base);
      expect(testParameters.constructor.name).toStrictEqual('Parameters');
      expect(testParameters.fhirType()).toStrictEqual('Parameters');
      expect(testParameters.isEmpty()).toBe(true);
      expect(testParameters.toJSON()).toBeUndefined();

      // inherited properties from Resource
      expect(testParameters.hasIdElement()).toBe(false);
      expect(testParameters.getIdElement()).toEqual(new IdType());
      expect(testParameters.hasId()).toBe(false);
      expect(testParameters.getId()).toBeUndefined();
      expect(testParameters.hasMeta()).toBe(false);
      expect(testParameters.getMeta()).toEqual(new Meta());
      expect(testParameters.hasImplicitRulesElement()).toBe(false);
      expect(testParameters.getImplicitRulesElement()).toEqual(new UriType());
      expect(testParameters.hasImplicitRules()).toBe(false);
      expect(testParameters.getImplicitRules()).toBeUndefined();
      expect(testParameters.hasLanguageElement()).toBe(false);
      expect(testParameters.getLanguageElement()).toEqual(new CodeType());
      expect(testParameters.hasLanguage()).toBe(false);
      expect(testParameters.getLanguage()).toBeUndefined();

      // Parameters properties
      expect(testParameters.hasParameter()).toBe(false);
      expect(testParameters.getParameter()).toEqual([] as ParametersParameterComponent[]);
    });

    it('should properly copy()', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(VALID_NAME);
      // NOTE: Rule: A parameter must have one and only one of (value, resource, part)
      // Ignoring for testing purposes
      testParametersParameterComponent.setValue(new StringType(VALUE_X_STRING));
      testParametersParameterComponent.setResource(VALID_RESOURCE);
      testParametersParameterComponent.setPart([VALID_PART1, VALID_PART2]);

      const parameters = new Parameters();
      parameters.setId(VALID_ID);
      parameters.setMeta(VALID_META);
      parameters.setImplicitRules(IMPLICIT_RULES_VALUE);
      parameters.setLanguage(LANGUAGE_VALUE);
      parameters.addParameter(testParametersParameterComponent);

      let testParameters: Parameters = parameters.copy();

      expect(testParameters).toBeDefined();
      expect(testParameters).toBeInstanceOf(Parameters);
      expect(testParameters).toBeInstanceOf(Resource);
      expect(testParameters).toBeInstanceOf(Base);
      expect(testParameters.constructor.name).toStrictEqual('Parameters');
      expect(testParameters.fhirType()).toStrictEqual('Parameters');
      expect(testParameters.isEmpty()).toBe(false);
      expect(testParameters.toJSON()).toBeDefined();

      // inherited properties from Resource
      expect(testParameters.hasIdElement()).toBe(true);
      expect(testParameters.getIdElement()).toEqual(new IdType(VALID_ID));
      expect(testParameters.hasId()).toBe(true);
      expect(testParameters.getId()).toStrictEqual(VALID_ID);
      expect(testParameters.hasMeta()).toBe(true);
      expect(testParameters.getMeta()).toEqual(VALID_META);
      expect(testParameters.hasImplicitRulesElement()).toBe(true);
      expect(testParameters.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testParameters.hasImplicitRules()).toBe(true);
      expect(testParameters.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testParameters.hasLanguageElement()).toBe(true);
      expect(testParameters.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testParameters.hasLanguage()).toBe(true);
      expect(testParameters.getLanguage()).toStrictEqual(LANGUAGE_VALUE);

      // Parameters properties
      expect(testParameters.hasParameter()).toBe(true);
      expect(testParameters.getParameter()).toEqual([testParametersParameterComponent]);

      // Reset to empty

      parameters.setId(UNDEFINED_VALUE);
      parameters.setMeta(UNDEFINED_VALUE);
      parameters.setImplicitRules(UNDEFINED_VALUE);
      parameters.setLanguage(UNDEFINED_VALUE);
      parameters.setParameter(UNDEFINED_VALUE);

      testParameters = parameters.copy();

      // inherited properties from Resource
      expect(testParameters.hasIdElement()).toBe(false);
      expect(testParameters.getIdElement()).toEqual(new IdType());
      expect(testParameters.hasId()).toBe(false);
      expect(testParameters.getId()).toBeUndefined();
      expect(testParameters.hasMeta()).toBe(false);
      expect(testParameters.getMeta()).toEqual(new Meta());
      expect(testParameters.hasImplicitRulesElement()).toBe(false);
      expect(testParameters.getImplicitRulesElement()).toEqual(new UriType());
      expect(testParameters.hasImplicitRules()).toBe(false);
      expect(testParameters.getImplicitRules()).toBeUndefined();
      expect(testParameters.hasLanguageElement()).toBe(false);
      expect(testParameters.getLanguageElement()).toEqual(new CodeType());
      expect(testParameters.hasLanguage()).toBe(false);
      expect(testParameters.getLanguage()).toBeUndefined();

      // Parameters properties
      expect(testParameters.hasParameter()).toBe(false);
      expect(testParameters.getParameter()).toEqual([] as ParametersParameterComponent[]);
    });
  });

  describe('Serialization/Deserialization', () => {
    // NOTE: Parameters.parameter definition requires one of value[x] / resource / part; but to facilitate testing,
    //       we are including all three properties.
    const VALID_JSON = {
      resourceType: 'Parameters',
      id: 'id12345',
      meta: {
        versionId: 'VID-1972',
      },
      implicitRules: 'implicitRules',
      language: 'en-US',
      parameter: [
        {
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
        },
      ],
    };

    it('should return undefined when deserialize with no json', () => {
      let testParameters: Parameters | undefined = undefined;
      testParameters = Parameters.parse({});
      expect(testParameters).toBeUndefined();

      // @ts-expect-error: allow for testing
      testParameters = Parameters.parse(null);
      expect(testParameters).toBeUndefined();

      // @ts-expect-error: allow for testing
      testParameters = Parameters.parse(undefined);
      expect(testParameters).toBeUndefined();
    });

    it('should properly create serialized content', () => {
      const testParametersParameterComponent = new ParametersParameterComponent(VALID_NAME);
      // NOTE: Rule: A parameter must have one and only one of (value, resource, part)
      // Ignoring for testing purposes
      testParametersParameterComponent.setValue(new StringType(VALUE_X_STRING));
      testParametersParameterComponent.setResource(VALID_RESOURCE);
      testParametersParameterComponent.setPart([VALID_PART1, VALID_PART2]);

      const testParameters = new Parameters();
      testParameters.setId(VALID_ID);
      testParameters.setMeta(VALID_META);
      testParameters.setImplicitRules(IMPLICIT_RULES_VALUE);
      testParameters.setLanguage(LANGUAGE_VALUE);
      testParameters.setParameter([testParametersParameterComponent]);

      expect(testParameters).toBeDefined();
      expect(testParameters).toBeInstanceOf(Parameters);
      expect(testParameters).toBeInstanceOf(Resource);
      expect(testParameters).toBeInstanceOf(Base);
      expect(testParameters.constructor.name).toStrictEqual('Parameters');
      expect(testParameters.fhirType()).toStrictEqual('Parameters');
      expect(testParameters.isEmpty()).toBe(false);

      // inherited properties from Resource
      expect(testParameters.hasIdElement()).toBe(true);
      expect(testParameters.getIdElement()).toEqual(new IdType(VALID_ID));
      expect(testParameters.hasId()).toBe(true);
      expect(testParameters.getId()).toStrictEqual(VALID_ID);
      expect(testParameters.hasMeta()).toBe(true);
      expect(testParameters.getMeta()).toEqual(VALID_META);
      expect(testParameters.hasImplicitRulesElement()).toBe(true);
      expect(testParameters.getImplicitRulesElement()).toEqual(new UriType(IMPLICIT_RULES_VALUE));
      expect(testParameters.hasImplicitRules()).toBe(true);
      expect(testParameters.getImplicitRules()).toStrictEqual(IMPLICIT_RULES_VALUE);
      expect(testParameters.hasLanguageElement()).toBe(true);
      expect(testParameters.getLanguageElement()).toEqual(new CodeType(LANGUAGE_VALUE));
      expect(testParameters.hasLanguage()).toBe(true);
      expect(testParameters.getLanguage()).toStrictEqual(LANGUAGE_VALUE);

      // Parameters properties
      expect(testParameters.hasParameter()).toBe(true);
      expect(testParameters.getParameter()).toEqual([testParametersParameterComponent]);

      expect(testParameters.toJSON()).toEqual(VALID_JSON);
    });

    it('should return ParametersParameterComponent for valid json', () => {
      const testParameters: Parameters | undefined = Parameters.parse(VALID_JSON);
      expect(testParameters).toBeDefined();
      expect(testParameters).toBeInstanceOf(Parameters);
      expect(testParameters).toBeInstanceOf(Resource);
      expect(testParameters).toBeInstanceOf(Base);
      expect(testParameters?.constructor.name).toStrictEqual('Parameters');
      expect(testParameters?.fhirType()).toStrictEqual('Parameters');
      expect(testParameters?.isEmpty()).toBe(false);
      expect(testParameters?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for setPart()', () => {
      const testParameters = new Parameters();
      const invalidBackboneElement = new MockBackboneElement();
      const t = () => {
        // @ts-expect-error: allow for testing
        testParameters.setParameter([invalidBackboneElement]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid Parameters.parameter; Provided value array has an element that is not an instance of ParametersParameterComponent.`,
      );
    });

    it('should throw InvalidTypeError for addPart()', () => {
      const testParameters = new Parameters();
      const invalidBackboneElement = new MockBackboneElement();
      const t = () => {
        // @ts-expect-error: allow for testing
        testParameters.addParameter(invalidBackboneElement);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided element is not an instance of ParametersParameterComponent.`);
    });
  });
});
