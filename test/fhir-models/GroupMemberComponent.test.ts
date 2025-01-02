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
import { GroupMemberComponent } from '@src/fhir-models/Group';
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Base } from '@src/fhir-core/base-models/Base';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('GroupMemberComponent', () => {
  const VALID_STRING_1 = 'This is a valid string.';
  const VALID_CODEABLECONCEPT_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_1.setText(VALID_STRING_1);
  const VALID_STRING_2 = 'This is another valid string.';
  const VALID_CODEABLECONCEPT_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_2.setText(VALID_STRING_2);

  const VALID_BOOLEAN_TRUE = true;
  const VALID_BOOLEAN_FALSE = false;

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

  const VALID_REFERENCE_2 = 'PractitionerRole/24680';
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

  const VALID_IDENTIFIER_1 = new Identifier();
  VALID_IDENTIFIER_1.setValue(VALID_STRING_1);
  const VALID_IDENTIFIER_2 = new Identifier();
  VALID_IDENTIFIER_2.setValue(VALID_STRING_2);

  describe('Base Tests', () => {
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
      const t = () => {
        testGroupMemberComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Group.member.entity`);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(false);
      expect(testGroupMemberComponent.getEntity()).toBeNull();
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toEqual(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should throw AssertionError when reset with null/undefined GroupMemberComponent.entity value', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      let t = () => {
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setEntity(null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.member.entity is required`);

      t = () => {
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setEntity(undefined);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Group.member.entity is required`);
    });

    it('should be properly instantiated with valid values', () => {
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
      expect(testGroupMemberComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toEqual(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const groupMemberComponent = new GroupMemberComponent(null);
      groupMemberComponent.setId(VALID_ID);
      groupMemberComponent.setExtension([VALID_EXTENSION]);
      groupMemberComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
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
      expect(testGroupMemberComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(true);
      expect(testGroupMemberComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupMemberComponent.hasExtension()).toBe(true);
      expect(testGroupMemberComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(true);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toEqual(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // Reset to empty

      groupMemberComponent.setId(UNDEFINED_VALUE);
      groupMemberComponent.setExtension(UNDEFINED_VALUE);
      groupMemberComponent.setModifierExtension(UNDEFINED_VALUE);
      // Setting to null or undefined results in an AssertionError because this field is required
      // groupMemberComponent.setEntity(null);
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
      expect(testGroupMemberComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_3); // no change from null arg
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toEqual(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should be properly reset by modifying all properties with primitives', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      testGroupMemberComponent.setId(VALID_ID);
      testGroupMemberComponent.setExtension([VALID_EXTENSION]);
      testGroupMemberComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_TRUE);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);
      expect(testGroupMemberComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(true);
      expect(testGroupMemberComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupMemberComponent.hasExtension()).toBe(true);
      expect(testGroupMemberComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(true);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toEqual(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // Reset

      testGroupMemberComponent.setId(VALID_ID_2);
      testGroupMemberComponent.setExtension([VALID_EXTENSION_2]);
      testGroupMemberComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(VALID_PERIOD_2);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_FALSE);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(true);
      expect(testGroupMemberComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testGroupMemberComponent.hasExtension()).toBe(true);
      expect(testGroupMemberComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(true);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toEqual(VALID_PERIOD_2);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_FALSE);

      // Reset as empty

      testGroupMemberComponent.setId(UNDEFINED_VALUE);
      testGroupMemberComponent.setExtension(UNDEFINED_VALUE);
      testGroupMemberComponent.setModifierExtension(UNDEFINED_VALUE);
      // Following field is required and will throw an error is set to "empty"
      //testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(UNDEFINED_VALUE);
      testGroupMemberComponent.setInactive(UNDEFINED_VALUE);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toEqual(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should be properly reset by modifying all properties with DataTypes', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      testGroupMemberComponent.setId(VALID_ID);
      testGroupMemberComponent.setExtension([VALID_EXTENSION]);
      testGroupMemberComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);
      expect(testGroupMemberComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(true);
      expect(testGroupMemberComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupMemberComponent.hasExtension()).toBe(true);
      expect(testGroupMemberComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(true);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toEqual(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // Reset

      testGroupMemberComponent.setId(VALID_ID_2);
      testGroupMemberComponent.setExtension([VALID_EXTENSION_2]);
      testGroupMemberComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(VALID_PERIOD_2);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_FALSE));

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(true);
      expect(testGroupMemberComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testGroupMemberComponent.hasExtension()).toBe(true);
      expect(testGroupMemberComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(true);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toEqual(VALID_PERIOD_2);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_FALSE);

      // Reset as empty

      testGroupMemberComponent.setId(UNDEFINED_VALUE);
      testGroupMemberComponent.setExtension(UNDEFINED_VALUE);
      testGroupMemberComponent.setModifierExtension(UNDEFINED_VALUE);
      // Following field is required and will throw an error is set to "empty"
      //testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(UNDEFINED_VALUE);
      testGroupMemberComponent.setInactiveElement(UNDEFINED_VALUE);

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toEqual(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
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
      entity: {
        reference: 'Practitioner/13579',
      },
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
      inactive: true,
    };
    const INVALID_JSON = {
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
      inactive: true,
    };
    const INVALID_JSON_MISSING_ENTITY = {
      entity: {},
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
      inactive: true,
    };

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);

      const t = () => {
        testGroupMemberComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties do not exist: Group.member.entity`);
    });

    it('should properly create serialized content', () => {
      const periodType = VALID_PERIOD.copy();
      periodType.setId(DATATYPE_ID);
      periodType.addExtension(DATATYPE_EXTENSION);

      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setId(VALID_ID);
      testGroupMemberComponent.setExtension([VALID_EXTENSION]);
      testGroupMemberComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testGroupMemberComponent.setPeriod(periodType);
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
      expect(testGroupMemberComponent.hasId()).toBe(true);
      expect(testGroupMemberComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupMemberComponent.hasExtension()).toBe(true);
      expect(testGroupMemberComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(true);
      expect(testGroupMemberComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toEqual(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toEqual(periodType);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      expect(testGroupMemberComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testGroupMemberComponent: GroupMemberComponent | undefined = undefined;
      testGroupMemberComponent = GroupMemberComponent.parse({});
      expect(testGroupMemberComponent).toBeUndefined();

      testGroupMemberComponent = GroupMemberComponent.parse(null);
      expect(testGroupMemberComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testGroupMemberComponent = GroupMemberComponent.parse(undefined);
      expect(testGroupMemberComponent).toBeUndefined();
    });

    it('should throw FhirError from parse with missing required properties', () => {
      const t = () => {
        GroupMemberComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Group.member.entity`);
    });

    it('should throw FhirError from parse with missing entity', () => {
      const t = () => {
        GroupMemberComponent.parse(INVALID_JSON_MISSING_ENTITY);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The following required properties must be included in the provided JSON: Group.member.entity`);
    });

    it('should return GroupMemberComponent for valid json', () => {
      const testGroupMemberComponent: GroupMemberComponent | undefined = GroupMemberComponent.parse(VALID_JSON);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent).toBeInstanceOf(GroupMemberComponent);
      expect(testGroupMemberComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupMemberComponent).toBeInstanceOf(Element);
      expect(testGroupMemberComponent).toBeInstanceOf(Base);
      expect(testGroupMemberComponent?.constructor.name).toStrictEqual('GroupMemberComponent');
      expect(testGroupMemberComponent?.fhirType()).toStrictEqual('Group.member');
      expect(testGroupMemberComponent?.isEmpty()).toBe(false);
      expect(testGroupMemberComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for setEntity()', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      const t = () => {
        testGroupMemberComponent.setEntity(INVALID_REFERENCE_VALUE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setEntity (Group.member.entity) expects argument (${INVALID_REFERENCE}) to be a valid 'Reference' type`,
      );
    });

    it('should throw InvalidTypeError for setPeriod()', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      const t = () => {
        const invalidPeriod = new StringType();
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setPeriod(invalidPeriod);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.member.period; Provided value is not an instance of Period.`);
    });

    it('should throw InvalidTypeError for setInactiveElement()', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setInactiveElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.member.inactive; Provided element is not an instance of BooleanType.`);
    });

    it('should throw PrimitiveTypeError for setInactive()', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setInactive(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.member.inactive (Invalid datatype)`);
    });
  });
});
