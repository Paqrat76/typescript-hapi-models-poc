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
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { QuantityComparatorEnum } from '@src/fhir-core/data-types/complex/code-systems/QuantityComparatorEnum';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';

describe('Quantity', () => {
  const VALID_DECIMAL = 13.579;
  const VALID_DECIMAL_TYPE = new DecimalType(VALID_DECIMAL);
  const VALID_DECIMAL_2 = 24.68;
  const VALID_DECIMAL_TYPE_2 = new DecimalType(VALID_DECIMAL_2);
  const INVALID_DECIMAL = Number.MAX_VALUE;

  const VALID_CODE_LESS_THAN = `<`;
  const VALID_CODE_LESS_THAN_TYPE = new CodeType(VALID_CODE_LESS_THAN);
  const VALID_CODE_GREATER_THAN = `>`;
  const VALID_CODE_GREATER_THAN_TYPE = new CodeType(VALID_CODE_GREATER_THAN);
  const VALID_CODE_AD = `ad`;
  const VALID_CODE_AD_TYPE = new CodeType(VALID_CODE_AD);
  const UNSUPPORTED_ENUM_CODE = 'unsupporedEnumCode';

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);
  const INVALID_STRING = '';

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';

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

  it('should be properly instantiated as empty', () => {
    const testQuantity = new Quantity();
    expect(testQuantity).toBeDefined();
    expect(testQuantity).toBeInstanceOf(DataType);
    expect(testQuantity).toBeInstanceOf(Quantity);
    expect(testQuantity.constructor.name).toStrictEqual('Quantity');
    expect(testQuantity.fhirType()).toStrictEqual('Quantity');
    expect(testQuantity.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testQuantity.hasId()).toBe(false);
    expect(testQuantity.getId()).toBeUndefined();
    expect(testQuantity.hasExtension()).toBe(false);
    expect(testQuantity.getExtension()).toMatchObject([] as Extension[]);

    // Quantity properties
    expect(testQuantity.hasComparatorEnumType()).toBe(false);
    expect(testQuantity.getComparatorEnumType()).toBeUndefined();

    expect(testQuantity.hasValueElement()).toBe(false);
    expect(testQuantity.getValueElement()).toMatchObject(new DecimalType());
    expect(testQuantity.hasComparatorElement()).toBe(false);
    expect(testQuantity.getComparatorElement()).toBeUndefined();
    expect(testQuantity.hasUnitElement()).toBe(false);
    expect(testQuantity.getUnitElement()).toMatchObject(new StringType());
    expect(testQuantity.hasSystemElement()).toBe(false);
    expect(testQuantity.getSystemElement()).toMatchObject(new UriType());
    expect(testQuantity.hasCodeElement()).toBe(false);
    expect(testQuantity.getCodeElement()).toMatchObject(new CodeType());

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

    // inherited properties from Element
    expect(testQuantity.hasId()).toBe(false);
    expect(testQuantity.getId()).toBeUndefined();
    expect(testQuantity.hasExtension()).toBe(false);
    expect(testQuantity.getExtension()).toMatchObject([] as Extension[]);

    // Quantity properties
    expect(testQuantity.hasComparatorEnumType()).toBe(true);
    expect(testQuantity.getComparatorEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
    );

    expect(testQuantity.hasValueElement()).toBe(true);
    expect(testQuantity.getValueElement()).toMatchObject(VALID_DECIMAL_TYPE);
    expect(testQuantity.hasComparatorElement()).toBe(true);
    expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
    expect(testQuantity.hasUnitElement()).toBe(true);
    expect(testQuantity.getUnitElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testQuantity.hasSystemElement()).toBe(true);
    expect(testQuantity.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testQuantity.hasCodeElement()).toBe(true);
    expect(testQuantity.getCodeElement()).toMatchObject(VALID_CODE_TYPE);

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

    // inherited properties from Element
    expect(testQuantity.hasId()).toBe(false);
    expect(testQuantity.getId()).toBeUndefined();
    expect(testQuantity.hasExtension()).toBe(false);
    expect(testQuantity.getExtension()).toMatchObject([] as Extension[]);

    // Quantity properties
    expect(testQuantity.hasComparatorEnumType()).toBe(false);
    expect(testQuantity.getComparatorEnumType()).toBeUndefined();

    expect(testQuantity.hasValueElement()).toBe(false);
    expect(testQuantity.getValueElement()).toMatchObject(new DecimalType());
    expect(testQuantity.hasComparatorElement()).toBe(false);
    expect(testQuantity.getComparatorElement()).toBeUndefined();
    expect(testQuantity.hasUnitElement()).toBe(false);
    expect(testQuantity.getUnitElement()).toMatchObject(new StringType());
    expect(testQuantity.hasSystemElement()).toBe(false);
    expect(testQuantity.getSystemElement()).toMatchObject(new UriType());
    expect(testQuantity.hasCodeElement()).toBe(false);
    expect(testQuantity.getCodeElement()).toMatchObject(new CodeType());

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
    expect(testQuantity.getComparatorEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_AD, quantityComparatorEnum));

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

    // inherited properties from Element
    expect(testQuantity.hasId()).toBe(false);
    expect(testQuantity.getId()).toBeUndefined();
    expect(testQuantity.hasExtension()).toBe(false);
    expect(testQuantity.getExtension()).toMatchObject([] as Extension[]);

    // Quantity properties
    expect(testQuantity.hasComparatorEnumType()).toBe(true);
    expect(testQuantity.getComparatorEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
    );

    expect(testQuantity.hasValueElement()).toBe(true);
    expect(testQuantity.getValueElement()).toMatchObject(VALID_DECIMAL_TYPE);
    expect(testQuantity.hasComparatorElement()).toBe(true);
    expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
    expect(testQuantity.hasUnitElement()).toBe(true);
    expect(testQuantity.getUnitElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testQuantity.hasSystemElement()).toBe(true);
    expect(testQuantity.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testQuantity.hasCodeElement()).toBe(true);
    expect(testQuantity.getCodeElement()).toMatchObject(VALID_CODE_TYPE);

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
    expect(testQuantity.getComparatorEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_GREATER_THAN, quantityComparatorEnum),
    );

    expect(testQuantity.hasValueElement()).toBe(true);
    expect(testQuantity.getValueElement()).toMatchObject(VALID_DECIMAL_TYPE_2);
    expect(testQuantity.hasComparatorElement()).toBe(true);
    expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_GREATER_THAN_TYPE);
    expect(testQuantity.hasUnitElement()).toBe(true);
    expect(testQuantity.getUnitElement()).toMatchObject(VALID_STRING_TYPE_2);
    expect(testQuantity.hasSystemElement()).toBe(true);
    expect(testQuantity.getSystemElement()).toMatchObject(VALID_URI_TYPE_2);
    expect(testQuantity.hasCodeElement()).toBe(true);
    expect(testQuantity.getCodeElement()).toMatchObject(VALID_CODE_TYPE_2);

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
    expect(testQuantity.getValueElement()).toMatchObject(new DecimalType());
    expect(testQuantity.hasComparatorElement()).toBe(false);
    expect(testQuantity.getComparatorElement()).toBeUndefined();
    expect(testQuantity.hasUnitElement()).toBe(false);
    expect(testQuantity.getUnitElement()).toMatchObject(new StringType());
    expect(testQuantity.hasSystemElement()).toBe(false);
    expect(testQuantity.getSystemElement()).toMatchObject(new UriType());
    expect(testQuantity.hasCodeElement()).toBe(false);
    expect(testQuantity.getCodeElement()).toMatchObject(new CodeType());

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

    // inherited properties from Element
    expect(testQuantity.hasId()).toBe(false);
    expect(testQuantity.getId()).toBeUndefined();
    expect(testQuantity.hasExtension()).toBe(false);
    expect(testQuantity.getExtension()).toMatchObject([] as Extension[]);

    // Quantity properties
    expect(testQuantity.hasComparatorEnumType()).toBe(true);
    expect(testQuantity.getComparatorEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum),
    );

    expect(testQuantity.hasValueElement()).toBe(true);
    expect(testQuantity.getValueElement()).toMatchObject(VALID_DECIMAL_TYPE);
    expect(testQuantity.hasComparatorElement()).toBe(true);
    expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_LESS_THAN_TYPE);
    expect(testQuantity.hasUnitElement()).toBe(true);
    expect(testQuantity.getUnitElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testQuantity.hasSystemElement()).toBe(true);
    expect(testQuantity.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testQuantity.hasCodeElement()).toBe(true);
    expect(testQuantity.getCodeElement()).toMatchObject(VALID_CODE_TYPE);

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
    expect(testQuantity.getComparatorEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_GREATER_THAN, quantityComparatorEnum),
    );

    expect(testQuantity.hasValueElement()).toBe(true);
    expect(testQuantity.getValueElement()).toMatchObject(VALID_DECIMAL_TYPE_2);
    expect(testQuantity.hasComparatorElement()).toBe(true);
    expect(testQuantity.getComparatorElement()).toMatchObject(VALID_CODE_GREATER_THAN_TYPE);
    expect(testQuantity.hasUnitElement()).toBe(true);
    expect(testQuantity.getUnitElement()).toMatchObject(VALID_STRING_TYPE_2);
    expect(testQuantity.hasSystemElement()).toBe(true);
    expect(testQuantity.getSystemElement()).toMatchObject(VALID_URI_TYPE_2);
    expect(testQuantity.hasCodeElement()).toBe(true);
    expect(testQuantity.getCodeElement()).toMatchObject(VALID_CODE_TYPE_2);

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
    expect(testQuantity.getComparatorEnumType()).toMatchObject(new EnumCodeType(VALID_CODE_AD, quantityComparatorEnum));
  });
});
