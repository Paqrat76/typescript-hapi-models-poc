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

import { DateTime } from 'luxon';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('InstantType', () => {
  const VALID_INSTANT = `2015-02-07T13:28:17.239+02:00`;
  const VALID_INSTANT_UTC = `2015-02-07T11:28:17.239Z`;
  const VALID_INSTANT_2 = `2017-01-01T00:00:00Z`;
  const INVALID_INSTANT = `invalid instant`;

  describe('PrimitiveType<fhirInstant>', () => {
    it('should be properly instantiated as empty', () => {
      const testInstantType = new InstantType();
      expect(testInstantType).toBeDefined();
      expect(testInstantType).toBeInstanceOf(InstantType);
      expect(testInstantType).toBeInstanceOf(PrimitiveType);
      expect(testInstantType.constructor.name).toStrictEqual('InstantType');
      expect(testInstantType.fhirType()).toStrictEqual('instant');
      expect(testInstantType.isEmpty()).toBe(true);

      // inherited properties from Element
      expect(testInstantType.hasId()).toBe(false);
      expect(testInstantType.getId()).toBeUndefined();
      expect(testInstantType.hasExtension()).toBe(false);
      expect(testInstantType.getExtension()).toMatchObject([] as Extension[]);
      // primitive value properties
      expect(testInstantType.hasValue()).toBe(false);
      expect(testInstantType.getValue()).toBeUndefined();
      expect(testInstantType.getValueAsString()).toBeUndefined();
    });

    it('should be properly initialized', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      expect(testInstantType).toBeDefined();
      expect(testInstantType).toBeInstanceOf(InstantType);
      expect(testInstantType.constructor.name).toStrictEqual('InstantType');
      expect(testInstantType.fhirType()).toStrictEqual('instant');
      expect(testInstantType.isEmpty()).toBe(false);

      expect(testInstantType.hasValue()).toBe(true);
      expect(testInstantType.getValue()).toBeDefined();
      expect(testInstantType.getValue()).toStrictEqual(VALID_INSTANT);
      expect(testInstantType.getValueAsString()).toStrictEqual(VALID_INSTANT);
    });

    it('should throw PrimitiveTypeError when initialized with invalid value', () => {
      const t = () => {
        new InstantType(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType (${INVALID_INSTANT})`);
    });

    it('should be properly reset by setValue()', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      expect(testInstantType.isEmpty()).toBe(false);
      expect(testInstantType.hasValue()).toBe(true);
      expect(testInstantType.getValue()).toBeDefined();
      expect(testInstantType.getValue()).toStrictEqual(VALID_INSTANT);
      expect(testInstantType.getValueAsString()).toStrictEqual(VALID_INSTANT);

      testInstantType.setValue(VALID_INSTANT_2);
      expect(testInstantType.isEmpty()).toBe(false);
      expect(testInstantType.hasValue()).toBe(true);
      expect(testInstantType.getValue()).toBeDefined();
      expect(testInstantType.getValue()).toStrictEqual(VALID_INSTANT_2);
      expect(testInstantType.getValueAsString()).toStrictEqual(VALID_INSTANT_2);

      testInstantType.setValue();
      expect(testInstantType.isEmpty()).toBe(true);
      expect(testInstantType.hasValue()).toBe(false);
      expect(testInstantType.getValue()).toBeUndefined();
      expect(testInstantType.getValueAsString()).toBeUndefined();
    });

    it('should throw PrimitiveTypeError when setValue() with invalid value', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      const t = () => {
        testInstantType.setValue(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType (${INVALID_INSTANT})`);
    });

    it('should properly setValueAsString() with correct values', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      testInstantType.setValueAsString(VALID_INSTANT_2);
      expect(testInstantType.getValue()).toStrictEqual(VALID_INSTANT_2);
      testInstantType.setValueAsString();
      expect(testInstantType.getValue()).toBeUndefined();
    });

    it('should throw PrimitiveTypeError when setValueAsString() with invalid value', () => {
      const testInstantType = new InstantType();
      const t = () => {
        testInstantType.setValueAsString(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType (${INVALID_INSTANT})`);
    });

    it('should properly encodeToString with correct values', () => {
      const testInstantType = new InstantType();
      expect(testInstantType.encodeToString(VALID_INSTANT)).toStrictEqual(VALID_INSTANT);
    });

    it('should throw PrimitiveTypeError when encodeToString() with invalid value', () => {
      const testInstantType = new InstantType();
      const t = () => {
        testInstantType.encodeToString(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType (${INVALID_INSTANT})`);
    });

    it('should properly parseToPrimitive with correct values', () => {
      const testInstantType = new InstantType();
      expect(testInstantType.parseToPrimitive(VALID_INSTANT)).toStrictEqual(VALID_INSTANT);
    });

    it('should throw PrimitiveTypeError when parseToPrimitive() with invalid value', () => {
      const testInstantType = new InstantType();
      const t = () => {
        testInstantType.parseToPrimitive(INVALID_INSTANT);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid value for InstantType (${INVALID_INSTANT})`);
    });

    it('should properly copy()', () => {
      const instantType = new InstantType(VALID_INSTANT);
      const testInstantType = instantType.copy();
      expect(testInstantType).toBeDefined();
      expect(testInstantType).toBeInstanceOf(InstantType);
      expect(testInstantType.constructor.name).toStrictEqual('InstantType');
      expect(testInstantType.fhirType()).toStrictEqual('instant');
      expect(testInstantType.isEmpty()).toBe(false);
      expect(testInstantType.hasValue()).toBe(true);
      expect(testInstantType.getValue()).toBeDefined();
      expect(testInstantType.getValue()).toStrictEqual(VALID_INSTANT);
      expect(testInstantType.getValueAsString()).toStrictEqual(VALID_INSTANT);
    });
  });

  describe('InstantTypeImpl', () => {
    it('should return undefined from getValueAsDateTime when instantiated as empty', () => {
      const testInstantType = new InstantType();
      const dtObj = testInstantType.getValueAsDateTime();
      expect(dtObj).toBeUndefined();
    });

    it('should return valid DateTime object from getValueAsDateTime when instantiated with valid ISO 8601 string', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      const dtObj = testInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(dtObj).toBeDefined();
      expect(dtObj?.isValid).toBe(true);
      expect(dtObj?.toISO()).toStrictEqual(VALID_INSTANT_UTC);
    });

    it('should return undefined from getValueAsDateTimeUTC when instantiated as empty', () => {
      const testInstantType = new InstantType();
      const dtObj = testInstantType.getValueAsDateTimeUTC();
      expect(dtObj).toBeUndefined();
    });

    it('should return valid DateTime object from getValueAsDateTimeUTC when instantiated with valid ISO 8601 string', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      const dtObj = testInstantType.getValueAsDateTimeUTC();
      expect(dtObj).toBeDefined();
      expect(dtObj?.isValid).toBe(true);
      expect(dtObj?.toISO()).toStrictEqual(VALID_INSTANT_UTC);
    });

    it('should properly set the value with a undefined', () => {
      const testInstantType = new InstantType(VALID_INSTANT);
      testInstantType.setValueAsInstant(undefined);
      expect(testInstantType.getValue()).toBeUndefined();
    });

    it('should properly set the value with a valid DataTime object', () => {
      const sourceInstantType = new InstantType(VALID_INSTANT);
      const testDtObj: DateTime | undefined = sourceInstantType.getValueAsDateTime({ zone: 'utc' });
      expect(testDtObj).toBeDefined();
      expect(testDtObj?.isValid).toBe(true);
      expect(testDtObj?.toISO()).toStrictEqual(VALID_INSTANT_UTC);

      const testInstantType = new InstantType();
      testInstantType.setValueAsInstant(testDtObj);
      expect(testInstantType.getValue()).toStrictEqual(VALID_INSTANT_UTC);
    });
  });
});
