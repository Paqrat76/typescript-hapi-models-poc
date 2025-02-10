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
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/Quantity-variations';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { INVALID_NON_STRING_TYPE, INVALID_STRING_TYPE, UNDEFINED_VALUE } from '../../../test-utils';

describe('SimpleQuantity', () => {
  const VALID_DECIMAL = 13.579;
  const VALID_DECIMAL_TYPE = new DecimalType(VALID_DECIMAL);
  const VALID_DECIMAL_2 = 24.68;
  const VALID_DECIMAL_TYPE_2 = new DecimalType(VALID_DECIMAL_2);
  const INVALID_DECIMAL = Number.MAX_VALUE;

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

  describe('Core', () => {
    it('should be properly instantiated as empty', () => {
      const testSimpleQuantity = new SimpleQuantity();
      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
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

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(false);
      expect(testSimpleQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testSimpleQuantity.hasUnitElement()).toBe(false);
      expect(testSimpleQuantity.getUnitElement()).toEqual(new StringType());
      expect(testSimpleQuantity.hasSystemElement()).toBe(false);
      expect(testSimpleQuantity.getSystemElement()).toEqual(new UriType());
      expect(testSimpleQuantity.hasCodeElement()).toBe(false);
      expect(testSimpleQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testSimpleQuantity.hasValue()).toBe(false);
      expect(testSimpleQuantity.getValue()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(false);
      expect(testSimpleQuantity.getUnit()).toBeUndefined();
      expect(testSimpleQuantity.hasSystem()).toBe(false);
      expect(testSimpleQuantity.getSystem()).toBeUndefined();
      expect(testSimpleQuantity.hasCode()).toBe(false);
      expect(testSimpleQuantity.getCode()).toBeUndefined();
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
      expect(testSimpleQuantity).toBeInstanceOf(SimpleQuantity);
      expect(testSimpleQuantity.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.isEmpty()).toBe(false);
      expect(testSimpleQuantity.isComplexDataType()).toBe(true);
      expect(testSimpleQuantity.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testSimpleQuantity.hasId()).toBe(false);
      expect(testSimpleQuantity.getId()).toBeUndefined();
      expect(testSimpleQuantity.hasExtension()).toBe(false);
      expect(testSimpleQuantity.getExtension()).toEqual([] as Extension[]);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE);

      // Reset

      simpleQuantityType.setValueElement(VALID_DECIMAL_TYPE_2);
      simpleQuantityType.setUnitElement(VALID_STRING_TYPE_2);
      simpleQuantityType.setSystemElement(VALID_URI_TYPE_2);
      simpleQuantityType.setCodeElement(VALID_CODE_TYPE_2);
      testSimpleQuantity = simpleQuantityType.copy();

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
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
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE_2);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE_2);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING_2);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE_2);

      // Reset to empty

      simpleQuantityType.setValueElement(UNDEFINED_VALUE);
      simpleQuantityType.setUnitElement(UNDEFINED_VALUE);
      simpleQuantityType.setSystemElement(UNDEFINED_VALUE);
      simpleQuantityType.setCodeElement(UNDEFINED_VALUE);

      testSimpleQuantity = simpleQuantityType.copy();
      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
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

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(false);
      expect(testSimpleQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testSimpleQuantity.hasUnitElement()).toBe(false);
      expect(testSimpleQuantity.getUnitElement()).toEqual(new StringType());
      expect(testSimpleQuantity.hasSystemElement()).toBe(false);
      expect(testSimpleQuantity.getSystemElement()).toEqual(new UriType());
      expect(testSimpleQuantity.hasCodeElement()).toBe(false);
      expect(testSimpleQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testSimpleQuantity.hasValue()).toBe(false);
      expect(testSimpleQuantity.getValue()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(false);
      expect(testSimpleQuantity.getUnit()).toBeUndefined();
      expect(testSimpleQuantity.hasSystem()).toBe(false);
      expect(testSimpleQuantity.getSystem()).toBeUndefined();
      expect(testSimpleQuantity.hasCode()).toBe(false);
      expect(testSimpleQuantity.getCode()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testSimpleQuantity = new SimpleQuantity();
      testSimpleQuantity.setValue(VALID_DECIMAL);
      testSimpleQuantity.setUnit(VALID_STRING);
      testSimpleQuantity.setSystem(VALID_URI);
      testSimpleQuantity.setCode(VALID_CODE);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
      expect(testSimpleQuantity).toBeInstanceOf(SimpleQuantity);
      expect(testSimpleQuantity.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.isEmpty()).toBe(false);
      expect(testSimpleQuantity.isComplexDataType()).toBe(true);
      expect(testSimpleQuantity.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testSimpleQuantity.hasId()).toBe(false);
      expect(testSimpleQuantity.getId()).toBeUndefined();
      expect(testSimpleQuantity.hasExtension()).toBe(false);
      expect(testSimpleQuantity.getExtension()).toEqual([] as Extension[]);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testSimpleQuantity = new SimpleQuantity();
      testSimpleQuantity.setValue(VALID_DECIMAL);
      testSimpleQuantity.setUnit(VALID_STRING);
      testSimpleQuantity.setSystem(VALID_URI);
      testSimpleQuantity.setCode(VALID_CODE);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity.isEmpty()).toBe(false);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE);

      // Reset

      testSimpleQuantity.setValue(VALID_DECIMAL_2);
      testSimpleQuantity.setUnit(VALID_STRING_2);
      testSimpleQuantity.setSystem(VALID_URI_2);
      testSimpleQuantity.setCode(VALID_CODE_2);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity.isEmpty()).toBe(false);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE_2);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE_2);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING_2);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE_2);

      // Reset as empty

      testSimpleQuantity.setValue(UNDEFINED_VALUE);
      testSimpleQuantity.setUnit(UNDEFINED_VALUE);
      testSimpleQuantity.setSystem(UNDEFINED_VALUE);
      testSimpleQuantity.setCode(UNDEFINED_VALUE);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity.isEmpty()).toBe(true);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(false);
      expect(testSimpleQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testSimpleQuantity.hasUnitElement()).toBe(false);
      expect(testSimpleQuantity.getUnitElement()).toEqual(new StringType());
      expect(testSimpleQuantity.hasSystemElement()).toBe(false);
      expect(testSimpleQuantity.getSystemElement()).toEqual(new UriType());
      expect(testSimpleQuantity.hasCodeElement()).toBe(false);
      expect(testSimpleQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testSimpleQuantity.hasValue()).toBe(false);
      expect(testSimpleQuantity.getValue()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(false);
      expect(testSimpleQuantity.getUnit()).toBeUndefined();
      expect(testSimpleQuantity.hasSystem()).toBe(false);
      expect(testSimpleQuantity.getSystem()).toBeUndefined();
      expect(testSimpleQuantity.hasCode()).toBe(false);
      expect(testSimpleQuantity.getCode()).toBeUndefined();
    });

    it('should throw errors for invalid primitive values', () => {
      const testSimpleQuantity = new SimpleQuantity();

      let t = () => {
        testSimpleQuantity.setValue(INVALID_DECIMAL);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.value (${String(INVALID_DECIMAL)})`);

      t = () => {
        testSimpleQuantity.setUnit(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.unit (${INVALID_STRING})`);

      t = () => {
        testSimpleQuantity.setSystem(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.system (${INVALID_URI})`);

      t = () => {
        testSimpleQuantity.setCode(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.code (${INVALID_CODE})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testSimpleQuantity = new SimpleQuantity();
      testSimpleQuantity.setValueElement(VALID_DECIMAL_TYPE);
      testSimpleQuantity.setUnitElement(VALID_STRING_TYPE);
      testSimpleQuantity.setSystemElement(VALID_URI_TYPE);
      testSimpleQuantity.setCodeElement(VALID_CODE_TYPE);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity).toBeInstanceOf(DataType);
      expect(testSimpleQuantity).toBeInstanceOf(SimpleQuantity);
      expect(testSimpleQuantity.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testSimpleQuantity.isEmpty()).toBe(false);
      expect(testSimpleQuantity.isComplexDataType()).toBe(true);
      expect(testSimpleQuantity.toJSON()).toBeDefined();

      // inherited properties from Element
      expect(testSimpleQuantity.hasId()).toBe(false);
      expect(testSimpleQuantity.getId()).toBeUndefined();
      expect(testSimpleQuantity.hasExtension()).toBe(false);
      expect(testSimpleQuantity.getExtension()).toEqual([] as Extension[]);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testSimpleQuantity = new SimpleQuantity();
      testSimpleQuantity.setValueElement(VALID_DECIMAL_TYPE);
      testSimpleQuantity.setUnitElement(VALID_STRING_TYPE);
      testSimpleQuantity.setSystemElement(VALID_URI_TYPE);
      testSimpleQuantity.setCodeElement(VALID_CODE_TYPE);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity.isEmpty()).toBe(false);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE);

      // Reset

      testSimpleQuantity.setValueElement(VALID_DECIMAL_TYPE_2);
      testSimpleQuantity.setUnitElement(VALID_STRING_TYPE_2);
      testSimpleQuantity.setSystemElement(VALID_URI_TYPE_2);
      testSimpleQuantity.setCodeElement(VALID_CODE_TYPE_2);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity.isEmpty()).toBe(false);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(true);
      expect(testSimpleQuantity.getValueElement()).toEqual(VALID_DECIMAL_TYPE_2);
      expect(testSimpleQuantity.hasUnitElement()).toBe(true);
      expect(testSimpleQuantity.getUnitElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testSimpleQuantity.hasSystemElement()).toBe(true);
      expect(testSimpleQuantity.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testSimpleQuantity.hasCodeElement()).toBe(true);
      expect(testSimpleQuantity.getCodeElement()).toEqual(VALID_CODE_TYPE_2);

      expect(testSimpleQuantity.hasValue()).toBe(true);
      expect(testSimpleQuantity.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(testSimpleQuantity.hasUnit()).toBe(true);
      expect(testSimpleQuantity.getUnit()).toStrictEqual(VALID_STRING_2);
      expect(testSimpleQuantity.hasSystem()).toBe(true);
      expect(testSimpleQuantity.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testSimpleQuantity.hasCode()).toBe(true);
      expect(testSimpleQuantity.getCode()).toStrictEqual(VALID_CODE_2);

      // Reset as empty

      testSimpleQuantity.setValueElement(UNDEFINED_VALUE);
      testSimpleQuantity.setUnitElement(UNDEFINED_VALUE);
      testSimpleQuantity.setSystemElement(UNDEFINED_VALUE);
      testSimpleQuantity.setCodeElement(UNDEFINED_VALUE);

      expect(testSimpleQuantity).toBeDefined();
      expect(testSimpleQuantity.isEmpty()).toBe(true);

      // SimpleQuantity properties
      expect(testSimpleQuantity.hasValueElement()).toBe(false);
      expect(testSimpleQuantity.getValueElement()).toEqual(new DecimalType());
      expect(testSimpleQuantity.hasUnitElement()).toBe(false);
      expect(testSimpleQuantity.getUnitElement()).toEqual(new StringType());
      expect(testSimpleQuantity.hasSystemElement()).toBe(false);
      expect(testSimpleQuantity.getSystemElement()).toEqual(new UriType());
      expect(testSimpleQuantity.hasCodeElement()).toBe(false);
      expect(testSimpleQuantity.getCodeElement()).toEqual(new CodeType());

      expect(testSimpleQuantity.hasValue()).toBe(false);
      expect(testSimpleQuantity.getValue()).toBeUndefined();
      expect(testSimpleQuantity.hasUnit()).toBe(false);
      expect(testSimpleQuantity.getUnit()).toBeUndefined();
      expect(testSimpleQuantity.hasSystem()).toBe(false);
      expect(testSimpleQuantity.getSystem()).toBeUndefined();
      expect(testSimpleQuantity.hasCode()).toBe(false);
      expect(testSimpleQuantity.getCode()).toBeUndefined();
    });

    it('should throw errors for invalid DataType values', () => {
      const testSimpleQuantity = new SimpleQuantity();

      let t = () => {
        // @ts-expect-error: allow invalid type for testing
        testSimpleQuantity.setValueElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.value; Provided element is not an instance of DecimalType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        testSimpleQuantity.setUnitElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.unit; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        testSimpleQuantity.setSystemElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.system; Provided element is not an instance of UriType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for testing
        testSimpleQuantity.setCodeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid SimpleQuantity.code; Provided element is not an instance of CodeType.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
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

    it('should return undefined for empty json', () => {
      let testType = SimpleQuantity.parse({});
      expect(testType).toBeUndefined();

      // @ts-expect-error: allow for testing
      testType = SimpleQuantity.parse(undefined);
      expect(testType).toBeUndefined();

      testType = SimpleQuantity.parse(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        SimpleQuantity.parse('NOT AN OBJECT');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`SimpleQuantity JSON is not a JSON object.`);
    });

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
      expect(simpleQuantityType).toBeInstanceOf(SimpleQuantity);
      expect(simpleQuantityType.constructor.name).toStrictEqual('SimpleQuantity');
      expect(simpleQuantityType.fhirType()).toStrictEqual('SimpleQuantity');
      expect(simpleQuantityType.isEmpty()).toBe(false);
      expect(simpleQuantityType.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(simpleQuantityType.hasId()).toBe(true);
      expect(simpleQuantityType.getId()).toStrictEqual(testId);
      expect(simpleQuantityType.hasExtension()).toBe(true);
      expect(simpleQuantityType.getExtension()).toEqual([testExtension1, testExtension2]);

      // SimpleQuantity properties
      expect(simpleQuantityType.hasValueElement()).toBe(true);
      expect(simpleQuantityType.getValueElement()).toEqual(valueType);
      expect(simpleQuantityType.hasUnitElement()).toBe(true);
      expect(simpleQuantityType.getUnitElement()).toEqual(VALID_STRING_TYPE);
      expect(simpleQuantityType.hasSystemElement()).toBe(true);
      expect(simpleQuantityType.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(simpleQuantityType.hasCodeElement()).toBe(true);
      expect(simpleQuantityType.getCodeElement()).toEqual(VALID_CODE_TYPE);

      expect(simpleQuantityType.hasValue()).toBe(true);
      expect(simpleQuantityType.getValue()).toStrictEqual(VALID_DECIMAL_2);
      expect(simpleQuantityType.hasUnit()).toBe(true);
      expect(simpleQuantityType.getUnit()).toStrictEqual(VALID_STRING);
      expect(simpleQuantityType.hasSystem()).toBe(true);
      expect(simpleQuantityType.getSystem()).toStrictEqual(VALID_URI);
      expect(simpleQuantityType.hasCode()).toBe(true);
      expect(simpleQuantityType.getCode()).toStrictEqual(VALID_CODE);

      expect(simpleQuantityType.toJSON()).toEqual(VALID_JSON);
    });

    it('should return SimpleQuantity for valid json', () => {
      const testType: SimpleQuantity | undefined = SimpleQuantity.parse(VALID_JSON);

      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(SimpleQuantity);
      expect(testType?.constructor.name).toStrictEqual('SimpleQuantity');
      expect(testType?.fhirType()).toStrictEqual('SimpleQuantity');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });
});
