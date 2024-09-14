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
import { assertFhirType, assertIsDefined, FhirTypeGuard } from '@src/fhir-core/utility/type-guards';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockCodeEnum, MockTask } from '../../test-utils';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';

describe('type-guards', () => {
  describe('assertIsDefined', () => {
    it('should not throw AssertionError for defined instance', () => {
      const value = new StringType();
      const t = () => {
        assertIsDefined(value);
      };
      expect(t).not.toThrow(AssertionError);
    });

    it('should throw AssertionError for undefined instance', () => {
      const value = undefined;
      const t = () => {
        assertIsDefined(value);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Value is undefined.`);
    });

    it('should throw AssertionError for null instance', () => {
      const value = null;
      const t = () => {
        assertIsDefined(value);
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`Value is null.`);
    });

    it('should throw AssertionError for null instance with override error message', () => {
      const value = null;
      const t = () => {
        assertIsDefined(value, 'The provided value is null.');
      };
      expect(t).toThrow(AssertionError);
      expect(t).toThrow(`The provided value is null.`);
    });
  });

  describe('FhirTypeGuard/assertFhirType', () => {
    it('should return true for undefined type instance', () => {
      const primitiveType = undefined;
      expect(FhirTypeGuard(primitiveType, StringType)).toBe(true);
    });

    it('should return true for null type instance', () => {
      const primitiveType = null;
      expect(FhirTypeGuard(primitiveType, StringType)).toBe(true);
    });

    it('should return true for valid primitive type instance', () => {
      const primitiveType = new StringType();
      expect(FhirTypeGuard(primitiveType, StringType)).toBe(true);
    });

    it('should return true for valid EnumCodeType type instance', () => {
      const enumType = new EnumCodeType('generated', new MockCodeEnum());
      expect(FhirTypeGuard(enumType, EnumCodeType)).toBe(true);
    });

    it('should return true for valid complex type instance', () => {
      const complexType = new Period();
      expect(FhirTypeGuard(complexType, Period)).toBe(true);
    });

    it('should return true for valid resource instance', () => {
      const resourceType = new MockTask();
      expect(FhirTypeGuard(resourceType, MockTask)).toBe(true);
    });

    it('should return false for invalid instance', () => {
      const stringValue = 'test stringValue';
      expect(FhirTypeGuard(stringValue, Period)).toBe(false);
    });

    it('should not throw InvalidTypeError for undefined type instance', () => {
      const primitiveType = undefined;
      const t = () => {
        assertFhirType(primitiveType, StringType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should not throw InvalidTypeError for null type instance', () => {
      const primitiveType = null;
      const t = () => {
        assertFhirType(primitiveType, StringType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should not throw InvalidTypeError for valid type instance', () => {
      const primitiveType = new StringType();
      const t = () => {
        assertFhirType(primitiveType, StringType);
      };
      expect(t).not.toThrow(InvalidTypeError);
    });

    it('should throw InvalidTypeError for invalid type instance', () => {
      const stringValue = 'test stringValue';
      const t = () => {
        assertFhirType(stringValue, Period);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Provided instance is not an instance of Period.`);
    });

    it('should throw InvalidTypeError for invalid type instance with error message override', () => {
      const stringValue = 'test stringValue';
      const t = () => {
        assertFhirType(stringValue, Period, 'The stringValue instance is not an instance of Period.');
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`The stringValue instance is not an instance of Period.`);
    });
  });
});
