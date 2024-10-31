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
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { SimpleQuantity } from '@src/fhir-core/data-types/complex/SimpleQuantity';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

describe('Range', () => {
  const VALID_DECIMAL = 13.579;
  const VALID_STRING = 'This is a valid string.';
  const VALID_URI = `testUriType`;
  const VALID_CODE = `testCodeType`;

  const SIMPLE_QUANTITY_1 = new SimpleQuantity();
  SIMPLE_QUANTITY_1.setValue(VALID_DECIMAL);
  SIMPLE_QUANTITY_1.setUnit(VALID_STRING);
  SIMPLE_QUANTITY_1.setSystem(VALID_URI);
  SIMPLE_QUANTITY_1.setCode(VALID_CODE);

  const VALID_DECIMAL_2 = 24.68;
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_URI_2 = `testUriType2`;
  const VALID_CODE_2 = `testCodeType2`;

  const SIMPLE_QUANTITY_2 = new SimpleQuantity();
  SIMPLE_QUANTITY_2.setValue(VALID_DECIMAL_2);
  SIMPLE_QUANTITY_2.setUnit(VALID_STRING_2);
  SIMPLE_QUANTITY_2.setSystem(VALID_URI_2);
  SIMPLE_QUANTITY_2.setCode(VALID_CODE_2);

  const UNDEFINED_VALUE = undefined;
  const INVALID_SIMPLE_QUANTITY = new StringType('Invalid SimpleQuantity');

  describe('Core', () => {
    const expectedJson1 = {
      low: {
        value: 13.579,
        unit: 'This is a valid string.',
        system: 'testUriType',
        code: 'testCodeType',
      },
      high: {
        value: 24.68,
        unit: 'This is another valid string!',
        system: 'testUriType2',
        code: 'testCodeType2',
      },
    };
    const expectedJson2 = {
      low: {
        value: 24.68,
        unit: 'This is another valid string!',
        system: 'testUriType2',
        code: 'testCodeType2',
      },
      high: {
        value: 13.579,
        unit: 'This is a valid string.',
        system: 'testUriType',
        code: 'testCodeType',
      },
    };

    it('should be properly instantiated as empty', () => {
      const testRange = new Range();
      expect(testRange).toBeDefined();
      expect(testRange).toBeInstanceOf(DataType);
      expect(testRange).toBeInstanceOf(Range);
      expect(testRange.constructor.name).toStrictEqual('Range');
      expect(testRange.fhirType()).toStrictEqual('Range');
      expect(testRange.isEmpty()).toBe(true);
      expect(testRange.isComplexDataType()).toBe(true);
      expect(testRange.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testRange.hasId()).toBe(false);
      expect(testRange.getId()).toBeUndefined();
      expect(testRange.hasExtension()).toBe(false);
      expect(testRange.getExtension()).toEqual([] as Extension[]);

      // Range properties
      expect(testRange.hasLow()).toBe(false);
      expect(testRange.getLow()).toEqual(new SimpleQuantity());
      expect(testRange.hasHigh()).toBe(false);
      expect(testRange.getHigh()).toEqual(new SimpleQuantity());
    });

    it('should properly copy()', () => {
      const rangeType = new Range();
      rangeType.setLow(SIMPLE_QUANTITY_1);
      rangeType.setHigh(SIMPLE_QUANTITY_2);
      let testRange = rangeType.copy();

      expect(testRange).toBeDefined();
      expect(testRange).toBeInstanceOf(DataType);
      expect(testRange).toBeInstanceOf(Range);
      expect(testRange.constructor.name).toStrictEqual('Range');
      expect(testRange.fhirType()).toStrictEqual('Range');
      expect(testRange.isEmpty()).toBe(false);
      expect(testRange.isComplexDataType()).toBe(true);
      expect(testRange.toJSON()).toEqual(expectedJson1);

      // inherited properties from Element
      expect(testRange.hasId()).toBe(false);
      expect(testRange.getId()).toBeUndefined();
      expect(testRange.hasExtension()).toBe(false);
      expect(testRange.getExtension()).toEqual([] as Extension[]);

      // Range properties
      expect(testRange.hasLow()).toBe(true);
      expect(testRange.getLow()).toEqual(SIMPLE_QUANTITY_1);
      expect(testRange.hasHigh()).toBe(true);
      expect(testRange.getHigh()).toEqual(SIMPLE_QUANTITY_2);

      rangeType.setLow(SIMPLE_QUANTITY_2);
      rangeType.setHigh(SIMPLE_QUANTITY_1);
      testRange = rangeType.copy();

      expect(testRange).toBeDefined();
      expect(testRange).toBeInstanceOf(DataType);
      expect(testRange).toBeInstanceOf(Range);
      expect(testRange.constructor.name).toStrictEqual('Range');
      expect(testRange.fhirType()).toStrictEqual('Range');
      expect(testRange.isEmpty()).toBe(false);
      expect(testRange.isComplexDataType()).toBe(true);
      expect(testRange.toJSON()).toEqual(expectedJson2);

      // inherited properties from Element
      expect(testRange.hasId()).toBe(false);
      expect(testRange.getId()).toBeUndefined();
      expect(testRange.hasExtension()).toBe(false);
      expect(testRange.getExtension()).toEqual([] as Extension[]);

      // Range properties
      expect(testRange.hasLow()).toBe(true);
      expect(testRange.getLow()).toEqual(SIMPLE_QUANTITY_2);
      expect(testRange.hasHigh()).toBe(true);
      expect(testRange.getHigh()).toEqual(SIMPLE_QUANTITY_1);

      rangeType.setLow(UNDEFINED_VALUE);
      rangeType.setHigh(UNDEFINED_VALUE);
      testRange = rangeType.copy();

      expect(testRange).toBeDefined();
      expect(testRange).toBeInstanceOf(DataType);
      expect(testRange).toBeInstanceOf(Range);
      expect(testRange.constructor.name).toStrictEqual('Range');
      expect(testRange.fhirType()).toStrictEqual('Range');
      expect(testRange.isEmpty()).toBe(true);
      expect(testRange.isComplexDataType()).toBe(true);
      expect(testRange.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testRange.hasId()).toBe(false);
      expect(testRange.getId()).toBeUndefined();
      expect(testRange.hasExtension()).toBe(false);
      expect(testRange.getExtension()).toEqual([] as Extension[]);

      // Range properties
      expect(testRange.hasLow()).toBe(false);
      expect(testRange.getLow()).toEqual(new SimpleQuantity());
      expect(testRange.hasHigh()).toBe(false);
      expect(testRange.getHigh()).toEqual(new SimpleQuantity());
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Range.low value', () => {
      const testRange = new Range();
      const t = () => {
        // @ts-expect-error: ignore invalid type for test
        testRange.setLow(INVALID_SIMPLE_QUANTITY);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Range.low; Provided value is not an instance of SimpleQuantity.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Range.high value', () => {
      const testRange = new Range();
      const t = () => {
        // @ts-expect-error: ignore invalid type for test
        testRange.setHigh(INVALID_SIMPLE_QUANTITY);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Range.high; Provided value is not an instance of SimpleQuantity.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const lowType = new SimpleQuantity();
      lowType.setValue(VALID_DECIMAL);
      lowType.setUnit(VALID_STRING);
      lowType.setSystem(VALID_URI);
      lowType.setCode(VALID_CODE);

      const lowId = 'L1357';
      const lowExtension = new Extension('lowUrl', new StringType('low extension string value'));
      lowType.setId(lowId);
      lowType.addExtension(lowExtension);

      const testRange = new Range();
      const testId = 'id1234';
      testRange.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testRange.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testRange.addExtension(testExtension2);

      testRange.setLow(lowType);
      testRange.setHigh(SIMPLE_QUANTITY_2);

      expect(testRange).toBeDefined();
      expect(testRange).toBeInstanceOf(DataType);
      expect(testRange).toBeInstanceOf(Range);
      expect(testRange.constructor.name).toStrictEqual('Range');
      expect(testRange.fhirType()).toStrictEqual('Range');
      expect(testRange.isEmpty()).toBe(false);
      expect(testRange.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testRange.hasId()).toBe(true);
      expect(testRange.getId()).toStrictEqual(testId);
      expect(testRange.hasExtension()).toBe(true);
      expect(testRange.getExtension()).toEqual([testExtension1, testExtension2]);

      // Range properties
      expect(testRange.hasLow()).toBe(true);
      expect(testRange.getLow()).toEqual(lowType);
      expect(testRange.hasHigh()).toBe(true);
      expect(testRange.getHigh()).toEqual(SIMPLE_QUANTITY_2);

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
        low: {
          id: 'L1357',
          extension: [
            {
              url: 'lowUrl',
              valueString: 'low extension string value',
            },
          ],
          value: 13.579,
          unit: 'This is a valid string.',
          system: 'testUriType',
          code: 'testCodeType',
        },
        high: {
          value: 24.68,
          unit: 'This is another valid string!',
          system: 'testUriType2',
          code: 'testCodeType2',
        },
      };
      expect(testRange.toJSON()).toEqual(expectedJson);
    });
  });
});
