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

import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { QuantityComparatorEnum } from '@src/fhir-core/data-types/complex/code-systems/QuantityComparatorEnum';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

describe('Quantity', () => {
  const VALID_DECIMAL = 13.579;
  const VALID_DECIMAL_TYPE = new DecimalType(VALID_DECIMAL);
  const VALID_DECIMAL_2 = 24.68;
  const VALID_DECIMAL_TYPE_2 = new DecimalType(VALID_DECIMAL_2);
  const INVALID_DECIMAL = Number.MAX_VALUE;
  const INVALID_DECIMAL_TYPE = new StringType('invalid Decimal');

  const VALID_CODE_LESS_THAN = `<`;
  const VALID_CODE_LESS_THAN_TYPE = new CodeType(VALID_CODE_LESS_THAN);
  const VALID_CODE_GREATER_THAN = `>`;
  const VALID_CODE_GREATER_THAN_TYPE = new CodeType(VALID_CODE_GREATER_THAN);
  const VALID_CODE_AD = `ad`;
  const VALID_CODE_AD_TYPE = new CodeType(VALID_CODE_AD);
  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const INVALID_ENUM_CODE_TYPE = new StringType('invalid EnumCodeType');
  const INVALID_CODE_TYPE = new StringType('invalid CodeType');

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);
  const INVALID_STRING = '';
  const INVALID_STRING_TYPE = new CodeType(VALID_CODE_AD);

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';
  const INVALID_URI_TYPE = new StringType('invalid UriType');

  const VALID_CODE = `testCodeType`;
  const VALID_CODE_TYPE = new CodeType(VALID_CODE);
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_CODE_TYPE_2 = new CodeType(VALID_CODE_2);
  const INVALID_CODE = ' invalid CodeType ';

  const UNDEFINED_VALUE = undefined;

  let quantityComparatorEnum: QuantityComparatorEnum;
  beforeAll(() => {
    quantityComparatorEnum = new QuantityComparatorEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      value: 13.579,
      comparator: '<',
      unit: 'This is a valid string.',
      system: 'testUriType',
      code: 'testCodeType',
    };

    it('should be properly instantiated as empty', () => {
      const testQuantity = new Quantity();
      expect(testQuantity).toBeDefined();
      expect(testQuantity).toBeInstanceOf(DataType);
      expect(testQuantity).toBeInstanceOf(Quantity);
      expect(testQuantity.constructor.name).toStrictEqual('Quantity');
      expect(testQuantity.fhirType()).toStrictEqual('Quantity');
      expect(testQuantity.isEmpty()).toBe(true);
      expect(testQuantity.isComplexDataType()).toBe(true);
      expect(testQuantity.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testQuantity.hasId()).toBe(false);
      expect(testQuantity.getId()).toBeUndefined();
      expect(testQuantity.hasExtension()).toBe(false);
      expect(testQuantity.getExtension()).toEqual([] as Extension[]);

      // Quantity properties
      expect(testQuantity.hasComparatorEnumType()).toBe(false);
      expect(testQuantity.getComparatorEnumType()).toBeUndefined();

      expect(testQuantity.hasValueElement()).toBe(false);
      expect(testQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testQuantity.hasComparatorElement()).toBe(false);
      expect(testQuantity.getComparatorElement()).toBeUndefined();
      expect(testQuantity.hasUnitElement()).toBe(false);
      expect(testQuantity.getUnitElement()).toEqual(new StringType());
      expect(testQuantity.hasSystemElement()).toBe(false);
      expect(testQuantity.getSystemElement()).toEqual(new UriType());
      expect(testQuantity.hasCodeElement()).toBe(false);
      expect(testQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testQuantity.hasValue()).toBe(false);
      expect(testQuantity.getValue()).toBeUndefined();
      expect(testQuantity.hasComparator()).toBe(false);
      expect(testQuantity.getComparator()).toBeUndefined();
      expect(testQuantity.hasUnit()).toBe(false);
      expect(testQuantity.getUnit()).toBeUndefined();
      expect(testQuantity.hasSystem()).toBe(false);
      expect(testQuantity.getSystem()).toBeUndefined();
      expect(testQuantity.hasCode()).toBe(false);
      expect(testQuantity.getCode()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const quantityType = new Quantity();
      quantityType.setValue(VALID_DECIMAL);
      quantityType.setComparator(VALID_CODE_LESS_THAN);
      quantityType.setUnit(VALID_STRING);
      quantityType.setSystem(VALID_URI);
      quantityType.setCode(VALID_CODE);
      let testQuantity = quantityType.copy();

      expect(testQuantity).toBeDefined();
      expect(testQuantity).toBeInstanceOf(DataType);
      expect(testQuantity).toBeInstanceOf(Quantity);
      expect(testQuantity.constructor.name).toStrictEqual('Quantity');
      expect(testQuantity.fhirType()).toStrictEqual('Quantity');
      expect(testQuantity.isEmpty()).toBe(false);
      expect(testQuantity.isComplexDataType()).toBe(true);
      expect(testQuantity.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testQuantity.hasId()).toBe(false);
      expect(testQuantity.getId()).toBeUndefined();
      expect(testQuantity.hasExtension()).toBe(false);
      expect(testQuantity.getExtension()).toEqual([] as Extension[]);

      // Quantity properties
      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(
        new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
      );

      expect(testQuantity.hasValueElement()).toBe(true);
      expect(testQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
      expect(testQuantity.hasUnitElement()).toBe(true);
      expect(testQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testQuantity.hasSystemElement()).toBe(true);
      expect(testQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testQuantity.hasCodeElement()).toBe(true);
      expect(testQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testQuantity.hasValue()).toBe(true);
      expect(testQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_LESS_THAN);
      expect(testQuantity.hasUnit()).toBe(true);
      expect(testQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testQuantity.hasSystem()).toBe(true);
      expect(testQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testQuantity.hasCode()).toBe(true);
      expect(testQuantity.getCode()).toStrictEqual(VALID_CODE);

      // Reset to empty

      quantityType.setValueElement(UNDEFINED_VALUE);
      quantityType.setComparatorElement(UNDEFINED_VALUE);
      quantityType.setUnitElement(UNDEFINED_VALUE);
      quantityType.setSystemElement(UNDEFINED_VALUE);
      quantityType.setCodeElement(UNDEFINED_VALUE);
      testQuantity = quantityType.copy();

      expect(testQuantity).toBeDefined();
      expect(testQuantity).toBeInstanceOf(DataType);
      expect(testQuantity).toBeInstanceOf(Quantity);
      expect(testQuantity.constructor.name).toStrictEqual('Quantity');
      expect(testQuantity.fhirType()).toStrictEqual('Quantity');
      expect(testQuantity.isEmpty()).toBe(true);
      expect(testQuantity.isComplexDataType()).toBe(true);
      expect(testQuantity.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testQuantity.hasId()).toBe(false);
      expect(testQuantity.getId()).toBeUndefined();
      expect(testQuantity.hasExtension()).toBe(false);
      expect(testQuantity.getExtension()).toEqual([] as Extension[]);

      // Quantity properties
      expect(testQuantity.hasComparatorEnumType()).toBe(false);
      expect(testQuantity.getComparatorEnumType()).toBeUndefined();

      expect(testQuantity.hasValueElement()).toBe(false);
      expect(testQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testQuantity.hasComparatorElement()).toBe(false);
      expect(testQuantity.getComparatorElement()).toBeUndefined();
      expect(testQuantity.hasUnitElement()).toBe(false);
      expect(testQuantity.getUnitElement()).toEqual(new StringType());
      expect(testQuantity.hasSystemElement()).toBe(false);
      expect(testQuantity.getSystemElement()).toEqual(new UriType());
      expect(testQuantity.hasCodeElement()).toBe(false);
      expect(testQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testQuantity.hasValue()).toBe(false);
      expect(testQuantity.getValue()).toBeUndefined();
      expect(testQuantity.hasComparator()).toBe(false);
      expect(testQuantity.getComparator()).toBeUndefined();
      expect(testQuantity.hasUnit()).toBe(false);
      expect(testQuantity.getUnit()).toBeUndefined();
      expect(testQuantity.hasSystem()).toBe(false);
      expect(testQuantity.getSystem()).toBeUndefined();
      expect(testQuantity.hasCode()).toBe(false);
      expect(testQuantity.getCode()).toBeUndefined();
    });

    it('should properly handle comparator enum', () => {
      const testQuantity = new Quantity();

      testQuantity.setComparator(VALID_CODE_LESS_THAN);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_LESS_THAN);

      testQuantity.setComparatorElement(VALID_CODE_GREATER_THAN_TYPE);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_GREATER_THAN_TYPE);

      testQuantity.setComparatorEnumType(new EnumCodeType(VALID_CODE_AD_TYPE, quantityComparatorEnum));
      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(new EnumCodeType(VALID_CODE_AD, quantityComparatorEnum));

      testQuantity.setComparator(UNDEFINED_VALUE);
      expect(testQuantity.hasComparatorEnumType()).toBe(false);
      expect(testQuantity.getComparatorEnumType()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testQuantity = new Quantity();
      testQuantity.setValue(VALID_DECIMAL);
      testQuantity.setComparator(VALID_CODE_LESS_THAN);
      testQuantity.setUnit(VALID_STRING);
      testQuantity.setSystem(VALID_URI);
      testQuantity.setCode(VALID_CODE);

      expect(testQuantity).toBeDefined();
      expect(testQuantity).toBeInstanceOf(DataType);
      expect(testQuantity).toBeInstanceOf(Quantity);
      expect(testQuantity.constructor.name).toStrictEqual('Quantity');
      expect(testQuantity.fhirType()).toStrictEqual('Quantity');
      expect(testQuantity.isEmpty()).toBe(false);
      expect(testQuantity.isComplexDataType()).toBe(true);
      expect(testQuantity.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testQuantity.hasId()).toBe(false);
      expect(testQuantity.getId()).toBeUndefined();
      expect(testQuantity.hasExtension()).toBe(false);
      expect(testQuantity.getExtension()).toEqual([] as Extension[]);

      // Quantity properties
      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(
        new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
      );

      expect(testQuantity.hasValueElement()).toBe(true);
      expect(testQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
      expect(testQuantity.hasUnitElement()).toBe(true);
      expect(testQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testQuantity.hasSystemElement()).toBe(true);
      expect(testQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testQuantity.hasCodeElement()).toBe(true);
      expect(testQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testQuantity.hasValue()).toBe(true);
      expect(testQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_LESS_THAN);
      expect(testQuantity.hasUnit()).toBe(true);
      expect(testQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testQuantity.hasSystem()).toBe(true);
      expect(testQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testQuantity.hasCode()).toBe(true);
      expect(testQuantity.getCode()).toStrictEqual(VALID_CODE);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testQuantity = new Quantity();
      testQuantity.setValue(VALID_DECIMAL);
      testQuantity.setComparator(VALID_CODE_LESS_THAN);
      testQuantity.setUnit(VALID_STRING);
      testQuantity.setSystem(VALID_URI);
      testQuantity.setCode(VALID_CODE);

      expect(testQuantity).toBeDefined();
      expect(testQuantity.isEmpty()).toBe(false);

      testQuantity.setValue(VALID_DECIMAL_2);
      testQuantity.setComparator(VALID_CODE_GREATER_THAN);
      testQuantity.setUnit(VALID_STRING_2);
      testQuantity.setSystem(VALID_URI_2);
      testQuantity.setCode(VALID_CODE_2);

      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(
        new EnumCodeType(VALID_CODE_GREATER_THAN, quantityComparatorEnum),
      );

      expect(testQuantity.hasValueElement()).toBe(true);
      expect(testQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE_2);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_GREATER_THAN_TYPE);
      expect(testQuantity.hasUnitElement()).toBe(true);
      expect(testQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testQuantity.hasSystemElement()).toBe(true);
      expect(testQuantity.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testQuantity.hasCodeElement()).toBe(true);
      expect(testQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE_2);

      expect(testQuantity.hasValue()).toBe(true);
      expect(testQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_GREATER_THAN);
      expect(testQuantity.hasUnit()).toBe(true);
      expect(testQuantity.getUnit()).toStrictEqual(VALID_STRING_2);
      expect(testQuantity.hasSystem()).toBe(true);
      expect(testQuantity.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testQuantity.hasCode()).toBe(true);
      expect(testQuantity.getCode()).toStrictEqual(VALID_CODE_2);

      testQuantity.setValue(UNDEFINED_VALUE);
      testQuantity.setComparator(UNDEFINED_VALUE);
      testQuantity.setUnit(UNDEFINED_VALUE);
      testQuantity.setSystem(UNDEFINED_VALUE);
      testQuantity.setCode(UNDEFINED_VALUE);

      expect(testQuantity.hasComparatorEnumType()).toBe(false);
      expect(testQuantity.getComparatorEnumType()).toBeUndefined();

      expect(testQuantity.hasValueElement()).toBe(false);
      expect(testQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testQuantity.hasComparatorElement()).toBe(false);
      expect(testQuantity.getComparatorElement()).toBeUndefined();
      expect(testQuantity.hasUnitElement()).toBe(false);
      expect(testQuantity.getUnitElement()).toEqual(new StringType());
      expect(testQuantity.hasSystemElement()).toBe(false);
      expect(testQuantity.getSystemElement()).toEqual(new UriType());
      expect(testQuantity.hasCodeElement()).toBe(false);
      expect(testQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testQuantity.hasValue()).toBe(false);
      expect(testQuantity.getValue()).toBeUndefined();
      expect(testQuantity.hasComparator()).toBe(false);
      expect(testQuantity.getComparator()).toBeUndefined();
      expect(testQuantity.hasUnit()).toBe(false);
      expect(testQuantity.getUnit()).toBeUndefined();
      expect(testQuantity.hasSystem()).toBe(false);
      expect(testQuantity.getSystem()).toBeUndefined();
      expect(testQuantity.hasCode()).toBe(false);
      expect(testQuantity.getCode()).toBeUndefined();
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Quantity.value value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        testQuantity.setValue(INVALID_DECIMAL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Quantity.value (${String(INVALID_DECIMAL)})`);
    });

    it('should throw InvalidCodeError when reset with unsupported primitive Quantity.comparator value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        testQuantity.setComparator(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown QuantityComparatorEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Quantity.unit value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        testQuantity.setUnit(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Quantity.unit (${INVALID_STRING})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Quantity.system value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        testQuantity.setSystem(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Quantity.system (${INVALID_URI})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Quantity.code value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        testQuantity.setCode(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Quantity.code (${INVALID_CODE})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
      const testQuantity = new Quantity();
      testQuantity.setValueElement(VALID_DECIMAL_TYPE);
      testQuantity.setComparatorElement(VALID_CODE_LESS_THAN_TYPE);
      testQuantity.setUnitElement(VALID_STRING_TYPE);
      testQuantity.setSystemElement(VALID_URI_TYPE);
      testQuantity.setCodeElement(VALID_CODE_TYPE);

      expect(testQuantity).toBeDefined();
      expect(testQuantity).toBeInstanceOf(DataType);
      expect(testQuantity).toBeInstanceOf(Quantity);
      expect(testQuantity.constructor.name).toStrictEqual('Quantity');
      expect(testQuantity.fhirType()).toStrictEqual('Quantity');
      expect(testQuantity.isEmpty()).toBe(false);
      expect(testQuantity.isComplexDataType()).toBe(true);
      expect(testQuantity.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testQuantity.hasId()).toBe(false);
      expect(testQuantity.getId()).toBeUndefined();
      expect(testQuantity.hasExtension()).toBe(false);
      expect(testQuantity.getExtension()).toEqual([] as Extension[]);

      // Quantity properties
      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(
        new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
      );

      expect(testQuantity.hasValueElement()).toBe(true);
      expect(testQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
      expect(testQuantity.hasUnitElement()).toBe(true);
      expect(testQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testQuantity.hasSystemElement()).toBe(true);
      expect(testQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testQuantity.hasCodeElement()).toBe(true);
      expect(testQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testQuantity.hasValue()).toBe(true);
      expect(testQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_LESS_THAN);
      expect(testQuantity.hasUnit()).toBe(true);
      expect(testQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testQuantity.hasSystem()).toBe(true);
      expect(testQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testQuantity.hasCode()).toBe(true);
      expect(testQuantity.getCode()).toStrictEqual(VALID_CODE);
    });

    it('should be properly reset by modifying all properties with PrimitiveType values', () => {
      const testQuantity = new Quantity();
      testQuantity.setValueElement(VALID_DECIMAL_TYPE);
      testQuantity.setComparatorElement(VALID_CODE_LESS_THAN_TYPE);
      testQuantity.setUnitElement(VALID_STRING_TYPE);
      testQuantity.setSystemElement(VALID_URI_TYPE);
      testQuantity.setCodeElement(VALID_CODE_TYPE);

      expect(testQuantity).toBeDefined();
      expect(testQuantity.isEmpty()).toBe(false);

      testQuantity.setValueElement(VALID_DECIMAL_TYPE_2);
      testQuantity.setComparatorElement(VALID_CODE_GREATER_THAN_TYPE);
      testQuantity.setUnitElement(VALID_STRING_TYPE_2);
      testQuantity.setSystemElement(VALID_URI_TYPE_2);
      testQuantity.setCodeElement(VALID_CODE_TYPE_2);

      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(
        new EnumCodeType(VALID_CODE_GREATER_THAN, quantityComparatorEnum),
      );

      expect(testQuantity.hasValueElement()).toBe(true);
      expect(testQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE_2);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_GREATER_THAN_TYPE);
      expect(testQuantity.hasUnitElement()).toBe(true);
      expect(testQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testQuantity.hasSystemElement()).toBe(true);
      expect(testQuantity.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testQuantity.hasCodeElement()).toBe(true);
      expect(testQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE_2);

      expect(testQuantity.hasValue()).toBe(true);
      expect(testQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_GREATER_THAN);
      expect(testQuantity.hasUnit()).toBe(true);
      expect(testQuantity.getUnit()).toStrictEqual(VALID_STRING_2);
      expect(testQuantity.hasSystem()).toBe(true);
      expect(testQuantity.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testQuantity.hasCode()).toBe(true);
      expect(testQuantity.getCode()).toStrictEqual(VALID_CODE_2);

      testQuantity.setComparatorEnumType(new EnumCodeType(VALID_CODE_AD, quantityComparatorEnum));
      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(new EnumCodeType(VALID_CODE_AD, quantityComparatorEnum));
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Quantity.value value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testQuantity.setValueElement(INVALID_DECIMAL_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Quantity.value; Provided element is not an instance of DecimalType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Quantity.comparator value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testQuantity.setComparatorEnumType(INVALID_ENUM_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Quantity.comparator; Provided type is not an instance of QuantityComparatorEnum.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Quantity.comparator value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testQuantity.setComparatorElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Quantity.comparator; Provided element is not an instance of CodeType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Quantity.unit value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testQuantity.setUnitElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Quantity.unit; Provided element is not an instance of StringType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Quantity.system value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testQuantity.setSystemElement(INVALID_URI_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Quantity.system; Provided element is not an instance of UriType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Quantity.code value', () => {
      const testQuantity = new Quantity();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testQuantity.setCodeElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Quantity.code; Provided element is not an instance of CodeType.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const valueType = new DecimalType(VALID_DECIMAL_2);
      const valueId = 'V1357';
      const valueExtension = new Extension('valueUrl', new StringType('value extension string value'));
      valueType.setId(valueId);
      valueType.addExtension(valueExtension);

      const testQuantity = new Quantity();
      const testId = 'id1234';
      testQuantity.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testQuantity.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testQuantity.addExtension(testExtension2);

      testQuantity.setValueElement(valueType);
      testQuantity.setComparatorElement(VALID_CODE_LESS_THAN_TYPE);
      testQuantity.setUnitElement(VALID_STRING_TYPE);
      testQuantity.setSystemElement(VALID_URI_TYPE);
      testQuantity.setCodeElement(VALID_CODE_TYPE);

      expect(testQuantity).toBeDefined();
      expect(testQuantity).toBeInstanceOf(DataType);
      expect(testQuantity).toBeInstanceOf(Quantity);
      expect(testQuantity.constructor.name).toStrictEqual('Quantity');
      expect(testQuantity.fhirType()).toStrictEqual('Quantity');
      expect(testQuantity.isEmpty()).toBe(false);
      expect(testQuantity.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testQuantity.hasId()).toBe(true);
      expect(testQuantity.getId()).toStrictEqual(testId);
      expect(testQuantity.hasExtension()).toBe(true);
      expect(testQuantity.getExtension()).toEqual([testExtension1, testExtension2]);

      // Quantity properties
      expect(testQuantity.hasComparatorEnumType()).toBe(true);
      expect(testQuantity.getComparatorEnumType()).toEqual(
        new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
      );

      expect(testQuantity.hasValueElement()).toBe(true);
      expect(testQuantity.getValueElement()).toEqual(valueType);
      expect(testQuantity.hasComparatorElement()).toBe(true);
      expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
      expect(testQuantity.hasUnitElement()).toBe(true);
      expect(testQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testQuantity.hasSystemElement()).toBe(true);
      expect(testQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testQuantity.hasCodeElement()).toBe(true);
      expect(testQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testQuantity.hasValue()).toBe(true);
      expect(testQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testQuantity.hasComparator()).toBe(true);
      expect(testQuantity.getComparator()).toStrictEqual(VALID_CODE_LESS_THAN);
      expect(testQuantity.hasUnit()).toBe(true);
      expect(testQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testQuantity.hasSystem()).toBe(true);
      expect(testQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testQuantity.hasCode()).toBe(true);
      expect(testQuantity.getCode()).toStrictEqual(VALID_CODE);

      const expectedJson = {
        id: 'id1234',
        extension: [
          {
            url: 'testUrl1',
            valueString: 'base extension string value 1',
          },
          {
            url: 'testUrl2',
            valueString: 'base extension string value 2',
          },
        ],
        value: 24.68,
        _value: {
          id: 'V1357',
          extension: [
            {
              url: 'valueUrl',
              valueString: 'value extension string value',
            },
          ],
        },
        comparator: '<',
        unit: 'This is a valid string.',
        system: 'testUriType',
        code: 'testCodeType',
      };
      expect(testQuantity.toJSON()).toEqual(expectedJson);
    });
  });
});
