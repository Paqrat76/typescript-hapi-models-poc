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

import { GroupMemberComponent } from '@src/fhir-models/Group';
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Base } from '@src/fhir-core/base-models/Base';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';

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

  const VALID_REFERENCE_1 = 'Organization/13579';
  const VALID_REFERENCE_VALUE_1 = new Reference();
  VALID_REFERENCE_VALUE_1.setReference(VALID_REFERENCE_1);

  const VALID_REFERENCE_2 = 'Organization/24680';
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

  const UNDEFINED_VALUE = undefined;

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

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(false);
      expect(testGroupMemberComponent.getEntity()).toBeNull();
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should be properly instantiated', () => {
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
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const groupMemberComponent = new GroupMemberComponent(null);
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

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // @ts-expect-error: allow for test - verify null will result in no change to entity!
      groupMemberComponent.setEntity(null);
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

      // inherited properties from BackboneElement
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3); // no change from null arg
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();

      groupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      groupMemberComponent.setPeriod(VALID_PERIOD);
      groupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));

      testGroupMemberComponent = groupMemberComponent.copy();

      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      groupMemberComponent.setInactive(UNDEFINED_VALUE);
      testGroupMemberComponent = groupMemberComponent.copy();

      expect(testGroupMemberComponent.hasInactiveElement()).toBe(false);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType());
      expect(testGroupMemberComponent.hasInactive()).toBe(false);
      expect(testGroupMemberComponent.getInactive()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_TRUE);

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
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_TRUE);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(VALID_PERIOD_2);
      testGroupMemberComponent.setInactive(VALID_BOOLEAN_FALSE);

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD_2);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });

    it('should throw InvalidTypeError when setEntity() with invalid reference type', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      const t = () => {
        testGroupMemberComponent.setEntity(INVALID_REFERENCE_VALUE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`setEntity: 'value' argument (${INVALID_REFERENCE}) is not for a valid resource type`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
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
      expect(testGroupMemberComponent.hasId()).toBe(false);
      expect(testGroupMemberComponent.getId()).toBeUndefined();
      expect(testGroupMemberComponent.hasExtension()).toBe(false);
      expect(testGroupMemberComponent.getExtension()).toMatchObject([] as Extension[]);
      expect(testGroupMemberComponent.hasModifierExtension()).toBe(false);
      expect(testGroupMemberComponent.getModifierExtension()).toMatchObject([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(false);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(new Period());
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying all properties with PrimitiveType values', () => {
      const testGroupMemberComponent = new GroupMemberComponent(VALID_REFERENCE_VALUE_1);
      testGroupMemberComponent.setPeriod(VALID_PERIOD);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_TRUE));

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_1);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupMemberComponent.setEntity(VALID_REFERENCE_VALUE_3);
      testGroupMemberComponent.setPeriod(VALID_PERIOD_2);
      testGroupMemberComponent.setInactiveElement(new BooleanType(VALID_BOOLEAN_FALSE));

      expect(testGroupMemberComponent).toBeDefined();
      expect(testGroupMemberComponent.isEmpty()).toBe(false);

      // GroupMemberComponent properties
      expect(testGroupMemberComponent.hasEntity()).toBe(true);
      expect(testGroupMemberComponent.getEntity()).toMatchObject(VALID_REFERENCE_VALUE_3);
      expect(testGroupMemberComponent.hasPeriod()).toBe(true);
      expect(testGroupMemberComponent.getPeriod()).toMatchObject(VALID_PERIOD_2);
      expect(testGroupMemberComponent.hasInactiveElement()).toBe(true);
      expect(testGroupMemberComponent.getInactiveElement()).toMatchObject(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupMemberComponent.hasInactive()).toBe(true);
      expect(testGroupMemberComponent.getInactive()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for GroupMemberComponent.setPeriod()', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      const t = () => {
        const invalidPeriod = new StringType();
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setPeriod(invalidPeriod);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`GroupMemberComponent.setPeriod(): The provided argument is not an instance of Period.`);
    });

    it('should throw InvalidTypeError for GroupMemberComponent.setInactiveElement()', () => {
      const testGroupMemberComponent = new GroupMemberComponent(null);
      const t = () => {
        const invalidBooleanType = new StringType();
        // @ts-expect-error: allow for testing
        testGroupMemberComponent.setInactiveElement(invalidBooleanType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `GroupMemberComponent.setInactiveElement(): The provided argument is not an instance of BooleanType.`,
      );
    });
  });
});
