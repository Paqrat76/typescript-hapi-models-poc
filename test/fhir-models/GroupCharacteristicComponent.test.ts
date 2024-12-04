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
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  MockFhirModel,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('GroupCharacteristicComponent', () => {
  const VALID_STRING_1 = 'This is a valid string.';
  const VALID_CODEABLECONCEPT_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_1.setText(VALID_STRING_1);
  const VALID_STRING_2 = 'This is another valid string.';
  const VALID_CODEABLECONCEPT_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_2.setText(VALID_STRING_2);

  const VALID_BOOLEAN_TRUE = true;
  const VALID_BOOLEAN_FALSE = false;
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
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());
    });

    it('should be properly instantiated with a primitive', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        VALID_RANGE,
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
      expect(testGroupCharacteristicComponent.toJSON()).toBeDefined();

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

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_RANGE);
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueRange()).toEqual(VALID_RANGE);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(new BooleanType(VALID_BOOLEAN_TRUE));
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());
    });

    it('should be properly instantiated with a PrimitiveType', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        VALID_RANGE,
        VALID_BOOLEAN_TYPE,
      );

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      expect(testGroupCharacteristicComponent.toJSON()).toBeDefined();

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

      expect(testGroupCharacteristicComponent.hasValue()).toBe(true);
      expect(testGroupCharacteristicComponent.getValue()).toEqual(VALID_RANGE);
      expect(testGroupCharacteristicComponent.hasValueBooleanType()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueCodeableConcept()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueQuantity()).toBe(false);
      expect(testGroupCharacteristicComponent.hasValueRange()).toBe(true);
      expect(testGroupCharacteristicComponent.getValueRange()).toEqual(VALID_RANGE);
      expect(testGroupCharacteristicComponent.hasValueReference()).toBe(false);

      expect(testGroupCharacteristicComponent.hasExcludeElement()).toBe(true);
      expect(testGroupCharacteristicComponent.getExcludeElement()).toEqual(VALID_BOOLEAN_TYPE);
      expect(testGroupCharacteristicComponent.hasExclude()).toBe(true);
      expect(testGroupCharacteristicComponent.getExclude()).toStrictEqual(VALID_BOOLEAN_TRUE);
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());
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

    it('should properly copy()', () => {
      const groupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      groupCharacteristicComponent.setId(VALID_ID);
      groupCharacteristicComponent.setExtension([VALID_EXTENSION]);
      groupCharacteristicComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      groupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_1);
      groupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_FALSE));
      groupCharacteristicComponent.setExclude(VALID_BOOLEAN_TRUE);
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
      expect(testGroupCharacteristicComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(true);
      expect(testGroupCharacteristicComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);

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
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_1);

      // Reset to empty

      groupCharacteristicComponent.setId(UNDEFINED_VALUE);
      groupCharacteristicComponent.setExtension(UNDEFINED_VALUE);
      groupCharacteristicComponent.setModifierExtension(UNDEFINED_VALUE);
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
      expect(testGroupCharacteristicComponent.toJSON()).toBeDefined();

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
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(false);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(new Period());
    });

    it('should be properly reset by modifying all properties', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      testGroupCharacteristicComponent.setId(VALID_ID);
      testGroupCharacteristicComponent.setExtension([VALID_EXTENSION]);
      testGroupCharacteristicComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_1);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setExclude(VALID_BOOLEAN_TRUE);
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_1);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      expect(testGroupCharacteristicComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(true);
      expect(testGroupCharacteristicComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);

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
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_1);

      // Reset

      testGroupCharacteristicComponent.setId(VALID_ID_2);
      testGroupCharacteristicComponent.setExtension([VALID_EXTENSION_2]);
      testGroupCharacteristicComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      testGroupCharacteristicComponent.setCode(VALID_CODEABLECONCEPT_2);
      testGroupCharacteristicComponent.setValue(new BooleanType(VALID_BOOLEAN_TRUE));
      testGroupCharacteristicComponent.setExcludeElement(new BooleanType(VALID_BOOLEAN_FALSE));
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD_2);

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(true);
      expect(testGroupCharacteristicComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_2);

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
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(VALID_PERIOD_2);
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
      code: {
        text: 'This is a valid string.',
      },
      valueBoolean: false,
      exclude: true,
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
    };
    const INVALID_JSON = {
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON_MISSING_CODE = {
      code: {},
      valueBoolean: false,
      exclude: true,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON_MISSING_EXCLUDE = {
      code: {
        text: 'This is a valid string.',
      },
      valueBoolean: false,
      exclude: null,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };

    const INVALID_JSON_1 = {
      code: {
        text: 'This is a valid string.',
      },
      value: 'invalid value[x]',
      exclude: true,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON_2 = {
      code: {
        text: 'This is a valid string.',
      },
      valueBoolean: false,
      valueCodeableConcept: { text: 'invalid value[x] - multiple values' },
      exclude: true,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON_3 = {
      code: {
        text: 'This is a valid string.',
      },
      valueXxxx: 'invalid value[x]',
      exclude: true,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };
    const INVALID_JSON_4 = {
      code: {
        text: 'This is a valid string.',
      },
      valueBoolean: 123,
      exclude: true,
      period: {
        start: '2017-01-01T00:00:00.000Z',
        end: '2017-01-01T01:00:00.000Z',
      },
    };

    it('should properly create serialized content', () => {
      const periodType = VALID_PERIOD.copy();
      periodType.setId(DATATYPE_ID);
      periodType.addExtension(DATATYPE_EXTENSION);

      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(
        VALID_CODEABLECONCEPT_1,
        new BooleanType(VALID_BOOLEAN_FALSE),
        new BooleanType(VALID_BOOLEAN_TRUE),
      );
      testGroupCharacteristicComponent.setId(VALID_ID);
      testGroupCharacteristicComponent.setExtension([VALID_EXTENSION]);
      testGroupCharacteristicComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testGroupCharacteristicComponent.setPeriod(periodType);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent.isEmpty()).toBe(false);
      expect(testGroupCharacteristicComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testGroupCharacteristicComponent.hasId()).toBe(true);
      expect(testGroupCharacteristicComponent.getId()).toStrictEqual(VALID_ID);
      expect(testGroupCharacteristicComponent.hasExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testGroupCharacteristicComponent.hasModifierExtension()).toBe(true);
      expect(testGroupCharacteristicComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // GroupMemberComponent properties
      expect(testGroupCharacteristicComponent.hasCode()).toBe(true);
      expect(testGroupCharacteristicComponent.getCode()).toEqual(VALID_CODEABLECONCEPT_1);

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
      expect(testGroupCharacteristicComponent.hasPeriod()).toBe(true);
      expect(testGroupCharacteristicComponent.getPeriod()).toEqual(periodType);

      expect(testGroupCharacteristicComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should throw FhirError from toJSON() when instantiated with missing required properties', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      testGroupCharacteristicComponent.setPeriod(VALID_PERIOD);

      const t = () => {
        testGroupCharacteristicComponent.toJSON();
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties do not exist: Group.characteristic.code, Group.characteristic.value[x], Group.characteristic.exclude`,
      );
    });

    it('should return undefined when deserialize with no json', () => {
      let testGroupCharacteristicComponent: GroupCharacteristicComponent | undefined = undefined;
      testGroupCharacteristicComponent = GroupCharacteristicComponent.parse({});
      expect(testGroupCharacteristicComponent).toBeUndefined();

      testGroupCharacteristicComponent = GroupCharacteristicComponent.parse(null);
      expect(testGroupCharacteristicComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testGroupCharacteristicComponent = GroupCharacteristicComponent.parse(undefined);
      expect(testGroupCharacteristicComponent).toBeUndefined();
    });

    it('should properly deserialize with valid json', () => {
      const testGroupCharacteristicComponent: GroupCharacteristicComponent | undefined =
        GroupCharacteristicComponent.parse(VALID_JSON);

      expect(testGroupCharacteristicComponent).toBeDefined();
      expect(testGroupCharacteristicComponent).toBeInstanceOf(GroupCharacteristicComponent);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(BackboneElement);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Element);
      expect(testGroupCharacteristicComponent).toBeInstanceOf(Base);
      expect(testGroupCharacteristicComponent?.constructor.name).toStrictEqual('GroupCharacteristicComponent');
      expect(testGroupCharacteristicComponent?.fhirType()).toStrictEqual('Group.characteristic');
      expect(testGroupCharacteristicComponent?.isEmpty()).toBe(false);
      expect(testGroupCharacteristicComponent?.toJSON()).toEqual(VALID_JSON);
    });

    it('should throw FhirError from parse with missing required properties', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Group.characteristic.code, Group.characteristic.value[x], Group.characteristic.exclude`,
      );
    });

    it('should throw FhirError from parse with missing code', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON_MISSING_CODE);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Group.characteristic.code`,
      );
    });

    it('should throw FhirError from parse with missing exclude', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON_MISSING_EXCLUDE);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Group.characteristic.exclude`,
      );
    });

    it('should throw FhirError when deserialize with invalid json - only "value" property', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON_1);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(`The value[x] property cannot be represented by "value".`);
    });

    it('should throw FhirError when deserialize with invalid json - multiple "value" properties', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON_2);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The value[x] property must have only one representation. Has multiple value[x] representations: valueBoolean, valueCodeableConcept`,
      );
    });

    it('should throw FhirError when deserialize with invalid json - invalid "value" property', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON_3);
      };
      expect(t).toThrow(FhirError);
      expect(t).toThrow(
        `The following required properties must be included in the provided JSON: Group.characteristic.value[x]`,
      );
    });

    it('should throw TypeError when deserialize with invalid json - invalid "value[x]" property value', () => {
      const t = () => {
        GroupCharacteristicComponent.parse(INVALID_JSON_4);
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(
        `Failed to parse Group.characteristic.value[x]: json argument for BooleanType is not a boolean.`,
      );
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError for setCode()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setCode(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.characteristic.code; Provided value is not an instance of CodeableConcept.`);
    });

    it('should throw InvalidTypeError when instantiated with an invalid value[x] type', () => {
      const mockModel = new MockFhirModel();
      const t = () => {
        // @ts-expect-error: allow non-boolean to test error handling
        new GroupCharacteristicComponent(null, mockModel, null);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(
        `ChoiceDataTypes decorator on setValue (Group.characteristic.value[x]) expects a single argument to be type of 'DataType | undefined | null'`,
      );
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
      expect(t).toThrow(
        `ChoiceDataTypes decorator on setValue (Group.characteristic.value[x]) expects the 'value' argument type (${testValue.fhirType()}) to be a supported DataType`,
      );
    });

    it('should throw InvalidTypeError for setExcludeElement()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setExcludeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.characteristic.exclude; Provided value is not an instance of BooleanType.`);
    });

    it('should throw PrimitiveTypeError for setExclude()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setExclude(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Group.characteristic.exclude (Invalid datatype)`);
    });

    it('should throw InvalidTypeError for setPeriod()', () => {
      const testGroupCharacteristicComponent = new GroupCharacteristicComponent(null, null, null);
      const t = () => {
        // @ts-expect-error: allow for testing
        testGroupCharacteristicComponent.setPeriod(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Group.characteristic.period; Provided value is not an instance of Period.`);
    });
  });
});
