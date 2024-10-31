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
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { QuantityComparatorEnum } from '@src/fhir-core/data-types/complex/code-systems/QuantityComparatorEnum';

describe('SimpleQuantity', () => {
  const VALID_DECIMAL = 13.579;
  const VALID_DECIMAL_TYPE = new DecimalType(VALID_DECIMAL);
  const VALID_DECIMAL_2 = 24.68;
  const VALID_DECIMAL_TYPE_2 = new DecimalType(VALID_DECIMAL_2);

  const VALID_CODE_LESS_THAN = `<`;
  const VALID_CODE_LESS_THAN_TYPE = new CodeType(VALID_CODE_LESS_THAN);

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);

  const VALID_CODE = `testCodeType`;
  const VALID_CODE_TYPE = new CodeType(VALID_CODE);
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_CODE_TYPE_2 = new CodeType(VALID_CODE_2);

  const UNDEFINED_VALUE = undefined;

  let quantityComparatorEnum: QuantityComparatorEnum;
  beforeAll(() => {
    quantityComparatorEnum = new QuantityComparatorEnum();
  });

  describe('Core', () => {
    const expectedJson = {
      value: 13.579,
      unit: 'This is a valid string.',
      system: 'testUriType',
      code: 'testCodeType',
    };

    it('should be properly instantiated as empty', () => {
      const testSimpleQuantity = new SimpleQuantity();
      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
      expect(testSimpleQuantity).toBeInstanceOf(Quantity);
      expect(testSimpleQuantity).toBeInstanceOf(SimpleQuantity);
      expect(testSimpleQuantity.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.isEmpty()).toBe(true);
      expect(testSimpleQuantity.isComplexDataType()).toBe(true);
      expect(testSimpleQuantity.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testSimpleQuantity.hasId()).toBe(false);
      expect(testSimpleQuantity.getId()).toBeUndefined();
      expect(testSimpleQuantity.hasExtension()).toBe(false);
      expect(testSimpleQuantity.getExtension()).toEqual([] as Extension[]);

      // Quantity properties
      expect(testSimpleQuantity.hasComparatorEnumType()).toBe(false);
      expect(testSimpleQuantity.getComparatorEnumType()).toBeUndefined();

      expect(testSimpleQuantity.hasValueElement()).toBe(false);
      expect(testSimpleQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testSimpleQuantity.hasComparatorElement()).toBe(false);
      expect(testSimpleQuantity.getComparatorElement()).toBeUndefined();
      expect(testSimpleQuantity.hasUnitElement()).toBe(false);
      expect(testSimpleQuantity.getUnitElement()).toEqual(new StringType());
      expect(testSimpleQuantity.hasSystemElement()).toBe(false);
      expect(testSimpleQuantity.getSystemElement()).toEqual(new UriType());
      expect(testSimpleQuantity.hasCodeElement()).toBe(false);
      expect(testSimpleQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testSimpleQuantity.hasValue()).toBe(false);
      expect(testSimpleQuantity.getValue()).toBeUndefined();
      expect(testSimpleQuantity.hasComparator()).toBe(false);
      expect(testSimpleQuantity.getComparator()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(false);
      expect(testSimpleQuantity.getUnit()).toBeUndefined();
      expect(testSimpleQuantity.hasSystem()).toBe(false);
      expect(testSimpleQuantity.getSystem()).toBeUndefined();
      expect(testSimpleQuantity.hasCode()).toBe(false);
      expect(testSimpleQuantity.getCode()).toBeUndefined();
    });

    it('should properly handle comparator enum', () => {
      const testSimpleQuantity = new SimpleQuantity();

      testSimpleQuantity.setComparator(UNDEFINED_VALUE);
      expect(testSimpleQuantity.hasComparator()).toBe(false);
      expect(testSimpleQuantity.getComparator()).toBeUndefined();

      testSimpleQuantity.setComparatorElement(UNDEFINED_VALUE);
      expect(testSimpleQuantity.hasComparatorElement()).toBe(false);
      expect(testSimpleQuantity.getComparatorElement()).toBeUndefined();

      testSimpleQuantity.setComparatorEnumType(UNDEFINED_VALUE);
      expect(testSimpleQuantity.hasComparatorEnumType()).toBe(false);
      expect(testSimpleQuantity.getComparatorEnumType()).toBeUndefined();
    });

    it('should throw AssertionError when reset with primitive Quantity.comparator value', () => {
      const testSimpleQuantity = new SimpleQuantity();
      const t = () => {
        testSimpleQuantity.setComparator(VALID_CODE_LESS_THAN);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`SimpleQuantity does not support the 'comparator' element.`);
    });

    it('should throw AssertionError when reset with PrimitiveType Quantity.comparator value', () => {
      const testSimpleQuantity = new SimpleQuantity();
      const t = () => {
        testSimpleQuantity.setComparatorElement(VALID_CODE_LESS_THAN_TYPE);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`SimpleQuantity does not support the 'comparator' element.`);
    });

    it('should throw AssertionError when reset with PrimitiveType Quantity.comparator value', () => {
      const testSimpleQuantity = new SimpleQuantity();
      const t = () => {
        testSimpleQuantity.setComparatorEnumType(new EnumCodeType(VALID_CODE_LESS_THAN, quantityComparatorEnum));
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`SimpleQuantity does not support the 'comparator' element.`);
    });

    it('should properly copy()', () => {
      const simpleQuantityType = new SimpleQuantity();
      simpleQuantityType.setValue(VALID_DECIMAL);
      simpleQuantityType.setUnit(VALID_STRING);
      simpleQuantityType.setSystem(VALID_URI);
      simpleQuantityType.setCode(VALID_CODE);
      let testSimpleQuantity = simpleQuantityType.copy();

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
      expect(testSimpleQuantity).toBeInstanceOf(Quantity);
      expect(testSimpleQuantity).toBeInstanceOf(SimpleQuantity);
      expect(testSimpleQuantity.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.isEmpty()).toBe(false);
      expect(testSimpleQuantity.isComplexDataType()).toBe(true);
      expect(testSimpleQuantity.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testSimpleQuantity.hasId()).toBe(false);
      expect(testSimpleQuantity.getId()).toBeUndefined();
      expect(testSimpleQuantity.hasExtension()).toBe(false);
      expect(testSimpleQuantity.getExtension()).toEqual([] as Extension[]);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasComparatorEnumType()).toBe(false);
      expect(testSimpleQuantity.getComparatorEnumType()).toBeUndefined();

      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testSimpleQuantity.hasComparatorElement()).toBe(false);
      expect(testSimpleQuantity.getComparatorElement()).toBeUndefined();
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testSimpleQuantity.hasComparator()).toBe(false);
      expect(testSimpleQuantity.getComparator()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE);

      simpleQuantityType.setValueElement(VALID_DECIMAL_TYPE_2);
      simpleQuantityType.setUnitElement(VALID_STRING_TYPE_2);
      simpleQuantityType.setSystemElement(VALID_URI_TYPE_2);
      simpleQuantityType.setCodeElement(VALID_CODE_TYPE_2);
      testSimpleQuantity = simpleQuantityType.copy();

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
      expect(testSimpleQuantity).toBeInstanceOf(Quantity);
      expect(testSimpleQuantity).toBeInstanceOf(SimpleQuantity);
      expect(testSimpleQuantity.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testSimpleQuantity.hasId()).toBe(false);
      expect(testSimpleQuantity.getId()).toBeUndefined();
      expect(testSimpleQuantity.hasExtension()).toBe(false);
      expect(testSimpleQuantity.getExtension()).toEqual([] as Extension[]);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasComparatorEnumType()).toBe(false);
      expect(testSimpleQuantity.getComparatorEnumType()).toBeUndefined();

      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE_2);
      expect(testSimpleQuantity.hasComparatorElement()).toBe(false);
      expect(testSimpleQuantity.getComparatorElement()).toBeUndefined();
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE_2);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testSimpleQuantity.hasComparator()).toBe(false);
      expect(testSimpleQuantity.getComparator()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING_2);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE_2);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const valueType = new DecimalType(VALID_DECIMAL_2);
      const valueId = 'V1357';
      const valueExtension = new Extension('valueUrl', new StringType('value extension string value'));
      valueType.setId(valueId);
      valueType.addExtension(valueExtension);

      const simpleQuantityType = new SimpleQuantity();
      const testId = 'id1234';
      simpleQuantityType.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      simpleQuantityType.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      simpleQuantityType.addExtension(testExtension2);

      simpleQuantityType.setValueElement(valueType);
      simpleQuantityType.setUnitElement(VALID_STRING_TYPE);
      simpleQuantityType.setSystemElement(VALID_URI_TYPE);
      simpleQuantityType.setCodeElement(VALID_CODE_TYPE);

      expect(simpleQuantityType).toBeDefined();
      expect(simpleQuantityType).toBeInstanceOf(DataType);
      expect(simpleQuantityType).toBeInstanceOf(Quantity);
      expect(simpleQuantityType.constructor.name).toStrictEqual('SimpleQuantity');
      expect(simpleQuantityType.fhirType()).toStrictEqual('SimpleQuantity');
      expect(simpleQuantityType.isEmpty()).toBe(false);
      expect(simpleQuantityType.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(simpleQuantityType.hasId()).toBe(true);
      expect(simpleQuantityType.getId()).toStrictEqual(testId);
      expect(simpleQuantityType.hasExtension()).toBe(true);
      expect(simpleQuantityType.getExtension()).toEqual([testExtension1, testExtension2]);

      // Quantity properties
      expect(simpleQuantityType.hasComparatorEnumType()).toBe(false);
      expect(simpleQuantityType.getComparatorEnumType()).toBeUndefined();

      expect(simpleQuantityType.hasValueElement()).toBe(true);
      expect(simpleQuantityType.getValueElement()).toEqual(valueType);
      expect(simpleQuantityType.hasComparatorElement()).toBe(false);
      expect(simpleQuantityType.getComparatorElement()).toBeUndefined();
      expect(simpleQuantityType.hasUnitElement()).toBe(true);
      expect(simpleQuantityType.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(simpleQuantityType.hasSystemElement()).toBe(true);
      expect(simpleQuantityType.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(simpleQuantityType.hasCodeElement()).toBe(true);
      expect(simpleQuantityType.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(simpleQuantityType.hasValue()).toBe(true);
      expect(simpleQuantityType.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(simpleQuantityType.hasComparator()).toBe(false);
      expect(simpleQuantityType.getComparator()).toBeUndefined();
      expect(simpleQuantityType.hasUnit()).toBe(true);
      expect(simpleQuantityType.getUnit()).toStrictEqual(VALID_STRING);
      expect(simpleQuantityType.hasSystem()).toBe(true);
      expect(simpleQuantityType.getSystem()).toStrictEqual(VALID_URI);
      expect(simpleQuantityType.hasCode()).toBe(true);
      expect(simpleQuantityType.getCode()).toStrictEqual(VALID_CODE);

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
        unit: 'This is a valid string.',
        system: 'testUriType',
        code: 'testCodeType',
      };
      expect(simpleQuantityType.toJSON()).toEqual(expectedJson);
    });
  });
});
