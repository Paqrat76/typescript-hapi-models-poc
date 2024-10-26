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
import { GroupCharacteristicComponent } from '@src/fhir-models/Group';
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
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { MockFhirModel } from '../test-utils';

describe('GroupCharacteristicComponent', () => {
  const VALID_STRING_1 = 'This is a valid string.';
  const VALID_CODEABLECONCEPT_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_1.setText(VALID_STRING_1);
  const VALID_STRING_2 = 'This is another valid string.';
  const VALID_CODEABLECONCEPT_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_2.setText(VALID_STRING_2);

  const VALID_BOOLEAN_TRUE = true;
  const VALID_BOOLEAN_FALSE = false;
  const INVALID_BOOLEAN = 'invalidBoolean';
  const VALID_BOOLEAN_TYPE = new BooleanType(VALID_BOOLEAN_TRUE);

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
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(true);
      expect(testGroupCharacteristicComponent.toJSON()).toBeUndefined();

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(false);
      expect(testGroupCharacteristicComponent.getCode()).toBeNull();
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
      expect(testGroupCharacteristicComponent.getValue()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueQuantity()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueRange()).toBeNull();
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);
      expect(testGroupCharacteristicComponent.getValueReference()).toBeNull();

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(false);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toBeNull();
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(false);
      expect(testGroupCharacteristicComponent.getExclude()).toBeNull();
    });

    it('should properly copy()', () => {
      const groupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );
      groupCharacteristicComponent.setPeriod(VALID_PERIOD_1);
      let testGroupCharacteristicComponent = groupCharacteristicComponent.copy();

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      const expectedJson = {
        code: {
          text: 'This is a valid string.',
        },
        exclude: true,
        period: {
          start: '2017-01-01T00:00:00.000Z',
          end: '2017-01-01T01:00:00.000Z',
        },
        valueBoolean: false,
      };
      expect(testGroupCharacteristicComponent.toJSON()).toEqual(expectedJson);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setCode(null);
      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setValue(null);
      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setExcludeElement(null);
      groupCharacteristicComponent.setPeriod(UNDEFINED_VALUE);
      // NOTE: code, value, and exclude should not change with reassignment to null
      testGroupCharacteristicComponent = groupCharacteristicComponent.copy();

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      const expectedJson1 = {
        code: {
          text: 'This is a valid string.',
        },
        exclude: true,
        valueBoolean: false,
      };
      expect(testGroupCharacteristicComponent.toJSON()).toEqual(expectedJson1);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      // @ts-expect-error: allow null for testing
      groupCharacteristicComponent.setExclude(null);
      testGroupCharacteristicComponent = groupCharacteristicComponent.copy();

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    describe('Group.characteristic.value[x] Elements', () => {
      it('should be properly instantiated as null value[x] type', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueBooleanType()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueQuantity()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueRange()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueReference()).toBeNull();
      });

      it('should throw InvalidTypeError when instantiated with an invalid value[x] type', () => {
        const mockModel = new MockFhirModel();
        const t = () => {
          // @ts-expect-error: allow non-boolean to test error handling
          new GroupCharacteristicComponent(null, mockModel, null);
        };
        expect(t).toThrow(AssertionError);
        expect(t).toThrow(`Decorator expects setValue to have one argument with type of 'DataType | undefined | null'`);
      });

      it('should throw InvalidTypeError when set with an invalid value[x] type', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();

        const testValue = new StringType('test string');
        const t = () => {
          testGroupCharacteristicComponent.setValue(testValue);
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(`setValue: 'value' argument type (${testValue.fhirType()}) is not for a supported DataType`);
      });

      it('should properly handle value[x] as CodeableConcept', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_CODEABLECONCEPT_1);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_CODEABLECONCEPT_1);
        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueCodeableConcept()).toEqual(VALID_CODEABLECONCEPT_1);

        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_CODEABLECONCEPT_1.fhirType()}`,
        );
      });

      it('should properly handle value[x] as BooleanType', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueBooleanType()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_BOOLEAN_TYPE);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_BOOLEAN_TYPE);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(VALID_BOOLEAN_TYPE);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_BOOLEAN_TYPE.fhirType()}`,
        );
      });

      it('should properly handle value[x] as Quantity', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueQuantity()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_QUANTITY);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_QUANTITY);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueQuantity()).toEqual(VALID_QUANTITY);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_QUANTITY.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_QUANTITY.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_QUANTITY.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_QUANTITY.fhirType()}`,
        );
      });

      it('should properly handle value[x] as Range', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueRange()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_RANGE);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_RANGE);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueRange()).toEqual(VALID_RANGE);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_RANGE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_RANGE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_RANGE.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueReference();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${VALID_RANGE.fhirType()}`,
        );
      });

      it('should properly handle value[x] as Reference', () => {
        const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(false);
        expect(testGroupCharacteristicComponent.getValue()).toBeNull();
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);
        expect(testGroupCharacteristicComponent.getValueReference()).toBeNull();

        testGroupCharacteristicComponent.setValue(VALID_REFERENCE_VALUE_1);
        expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
        expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_REFERENCE_VALUE_1);
        expect(testGroupCharacteristicComponent.hasValueReference()).toBe(true);
        expect(testGroupCharacteristicComponent.getValueReference()).toEqual(VALID_REFERENCE_VALUE_1);

        expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
        expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);

        let t = () => {
          testGroupCharacteristicComponent.getValueCodeableConcept();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueBooleanType();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueQuantity();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );

        t = () => {
          testGroupCharacteristicComponent.getValueRange();
        };
        expect(t).toThrow(InvalidTypeError);
        expect(t).toThrow(
          `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${VALID_REFERENCE_VALUE_1.fhirType()}`,
        );
      });
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        VALID_BOOLEAN_TRUE,
      );

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      const expectedsJson = {
        code: {
          text: 'This is a valid string.',
        },
        exclude: true,
        valueBoolean: false,
      };
      expect(testGroupCharacteristicComponent.toJSON()).toEqual(expectedsJson);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying primitive properties with primitive values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_1);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setExclude(VALID_BOOLEAN_TRUE);
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_2);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setExclude(VALID_BOOLEAN_FALSE);
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_2);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });

    it('should throw PrimitiveTypeError when instantiated with non-boolean value', () => {
      const t = () => {
        // @ts-expect-error: allow non-boolean to test error handling
        new GroupCharacteristicComponent(null, null, INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid GroupCharacteristicComponent.exclude parameter (${INVALID_BOOLEAN})`);
    });

    it('should throw PrimitiveTypeError when setExclude() with non-boolean value', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        // @ts-expect-error: allow non-boolean to test error handling
        testGroupCharacteristicComponent.setExclude(INVALID_BOOLEAN);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid GroupCharacteristicComponent.exclude (${INVALID_BOOLEAN})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        new BooleanType(VALID_BOOLEAN_TRUE),
      );

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      const expectedsJson = {
        code: {
          text: 'This is a valid string.',
        },
        exclude: true,
        valueBoolean: false,
      };
      expect(testGroupCharacteristicComponent.toJSON()).toEqual(expectedsJson);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(false);
      expect(testGroupCharacteristicComponent.getId()).toBeUndefined();
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([] as Extension[]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(false);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([] as Extension[]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
    });

    it('should be properly reset by modifying primitive properties with PrimitiveType values', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_1);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setExcludeElement(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);

      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_2);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setExcludeElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);

      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_2);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_2);

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueBooleanType()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_FALSE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_FALSE);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for GroupCharacteristicComponent.setCode()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        const invalidCodeableConcept = new StringType();
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setCode(invalidCodeableConcept);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `GroupCharacteristicComponent.setCode(): The provided argument is not an instance of CodeableConcept.`,
      );
    });

    it('should throw InvalidTypeError for GroupCharacteristicComponent.setExcludeElement()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        const invalidBooleanType = new StringType();
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setExcludeElement(invalidBooleanType);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `GroupCharacteristicComponent.setExcludeElement(): The provided argument is not an instance of BooleanType.`,
      );
    });

    it('should throw InvalidTypeError for GroupCharacteristicComponent.setPeriod()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        const invalidPeriod = new StringType();
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setPeriod(invalidPeriod);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `GroupCharacteristicComponent.setPeriod(): The provided argument is not an instance of Period.`,
      );
    });
  });
});
