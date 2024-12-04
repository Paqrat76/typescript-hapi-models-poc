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

import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

describe('Identifier Tests', () => {
  const VALID_CODE = `testCodeType`;
  const VALID_CODE_TYPE = new CodeType(VALID_CODE);
  const VALID_CODE_2 = `testCodeType2`;
  const VALID_CODE_TYPE_2 = new CodeType(VALID_CODE_2);
  const INVALID_CODE = ' invalid CodeType ';
  const INVALID_CODE_TYPE = new StringType(`Invalid CodeType`);

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';
  const INVALID_URI_TYPE = new StringType(`Invalid UriType`);

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);
  const INVALID_STRING = '';
  const INVALID_STRING_TYPE = new UriType(VALID_URI);

  const VALID_CODEABLECONCEPT_TEXT_1 = 'CodeableConcept text 1';
  const VALID_CODEABLECONCEPT_VALUE_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_VALUE_1.setText(VALID_CODEABLECONCEPT_TEXT_1);
  const INVALID_CODEABLECONCEPT_TYPE = new StringType(`Invalid CODEABLECONCEPT`);

  const VALID_CODEABLECONCEPT_TEXT_2 = 'CodeableConcept text 2';
  const VALID_CODEABLECONCEPT_VALUE_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_VALUE_2.setText(VALID_CODEABLECONCEPT_TEXT_2);

  const VALID_PERIOD_START_1 = '2017-01-01T00:00:00.000Z';
  const VALID_PERIOD_VALUE_1 = new Period();
  VALID_PERIOD_VALUE_1.setStart(VALID_PERIOD_START_1);
  const INVALID_PERIOD_TYPE = new StringType(`Invalid Period`);

  const VALID_PERIOD_START_2 = '2017-01-01T01:15:00.000Z';
  const VALID_PERIOD_VALUE_2 = new Period();
  VALID_PERIOD_VALUE_2.setStart(VALID_PERIOD_START_2);

  const VALID_REFERENCE_1 = 'Organization/13579';
  const VALID_REFERENCE_VALUE_1 = new Reference();
  VALID_REFERENCE_VALUE_1.setReference(VALID_REFERENCE_1);

  const VALID_REFERENCE_2 = 'Organization/24680';
  const VALID_REFERENCE_VALUE_2 = new Reference();
  VALID_REFERENCE_VALUE_2.setReference(VALID_REFERENCE_2);

  const INVALID_REFERENCE = 'Location/98765';
  const INVALID_REFERENCE_VALUE = new Reference();
  INVALID_REFERENCE_VALUE.setReference(INVALID_REFERENCE);

  const UNDEFINED_VALUE = undefined;

  describe('Core', () => {
    const expectedJson = {
      use: 'testCodeType',
      type: {
        text: 'CodeableConcept text 1',
      },
      system: 'testUriType',
      value: 'This is a valid string.',
      period: {
        start: '2017-01-01T00:00:00.000Z',
      },
      assigner: {
        reference: 'Organization/13579',
      },
    };

    it('should be properly instantiated as empty', () => {
      const testIdentifier = new Identifier();
      expect(testIdentifier).toBeDefined();
      expect(testIdentifier).toBeInstanceOf(DataType);
      expect(testIdentifier).toBeInstanceOf(Identifier);
      expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
      expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
      expect(testIdentifier.isEmpty()).toBe(true);
      expect(testIdentifier.isComplexDataType()).toBe(true);
      expect(testIdentifier.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(false);
      expect(testIdentifier.getUseElement()).toEqual(new CodeType());
      expect(testIdentifier.hasSystemElement()).toBe(false);
      expect(testIdentifier.getSystemElement()).toEqual(new UriType());
      expect(testIdentifier.hasValueElement()).toBe(false);
      expect(testIdentifier.getValueElement()).toEqual(new StringType());

      expect(testIdentifier.hasType()).toBe(false);
      expect(testIdentifier.getType()).toEqual(new CodeableConcept());
      expect(testIdentifier.hasPeriod()).toBe(false);
      expect(testIdentifier.getPeriod()).toEqual(new Period());
      expect(testIdentifier.hasAssigner()).toBe(false);
      expect(testIdentifier.getAssigner()).toEqual(new Reference());

      expect(testIdentifier.hasUse()).toBe(false);
      expect(testIdentifier.getUse()).toBeUndefined();
      expect(testIdentifier.hasSystem()).toBe(false);
      expect(testIdentifier.getSystem()).toBeUndefined();
      expect(testIdentifier.hasValue()).toBe(false);
      expect(testIdentifier.getValue()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const testIdentifier = new Identifier();
      testIdentifier.setUse(VALID_CODE);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_1);
      testIdentifier.setSystem(VALID_URI);
      testIdentifier.setValue(VALID_STRING);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_1);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier).toBeInstanceOf(DataType);
      expect(testIdentifier).toBeInstanceOf(Identifier);
      expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
      expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
      expect(testIdentifier.isEmpty()).toBe(false);
      expect(testIdentifier.isComplexDataType()).toBe(true);
      expect(testIdentifier.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_1);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_1);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING);

      // Reset to empty

      testIdentifier.setUse(UNDEFINED_VALUE);
      testIdentifier.setType(UNDEFINED_VALUE);
      testIdentifier.setSystem(UNDEFINED_VALUE);
      testIdentifier.setValue(UNDEFINED_VALUE);
      testIdentifier.setPeriod(UNDEFINED_VALUE);
      testIdentifier.setAssigner(UNDEFINED_VALUE);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier).toBeInstanceOf(DataType);
      expect(testIdentifier).toBeInstanceOf(Identifier);
      expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
      expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
      expect(testIdentifier.isEmpty()).toBe(true);
      expect(testIdentifier.isComplexDataType()).toBe(true);
      expect(testIdentifier.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(false);
      expect(testIdentifier.getUseElement()).toEqual(new CodeType());
      expect(testIdentifier.hasSystemElement()).toBe(false);
      expect(testIdentifier.getSystemElement()).toEqual(new UriType());
      expect(testIdentifier.hasValueElement()).toBe(false);
      expect(testIdentifier.getValueElement()).toEqual(new StringType());

      expect(testIdentifier.hasType()).toBe(false);
      expect(testIdentifier.getType()).toEqual(new CodeableConcept());
      expect(testIdentifier.hasPeriod()).toBe(false);
      expect(testIdentifier.getPeriod()).toEqual(new Period());
      expect(testIdentifier.hasAssigner()).toBe(false);
      expect(testIdentifier.getAssigner()).toEqual(new Reference());

      expect(testIdentifier.hasUse()).toBe(false);
      expect(testIdentifier.getUse()).toBeUndefined();
      expect(testIdentifier.hasSystem()).toBe(false);
      expect(testIdentifier.getSystem()).toBeUndefined();
      expect(testIdentifier.hasValue()).toBe(false);
      expect(testIdentifier.getValue()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testIdentifier = new Identifier();
      testIdentifier.setUse(VALID_CODE);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_1);
      testIdentifier.setSystem(VALID_URI);
      testIdentifier.setValue(VALID_STRING);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_1);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier).toBeInstanceOf(DataType);
      expect(testIdentifier).toBeInstanceOf(Identifier);
      expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
      expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
      expect(testIdentifier.isEmpty()).toBe(false);
      expect(testIdentifier.isComplexDataType()).toBe(true);
      expect(testIdentifier.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_1);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_1);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testIdentifier = new Identifier();
      testIdentifier.setUse(VALID_CODE);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_1);
      testIdentifier.setSystem(VALID_URI);
      testIdentifier.setValue(VALID_STRING);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_1);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_1);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_1);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING);

      // Reset

      testIdentifier.setUse(VALID_CODE_2);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_2);
      testIdentifier.setSystem(VALID_URI_2);
      testIdentifier.setValue(VALID_STRING_2);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_2);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_2);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE_2);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_2);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_2);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_2);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE_2);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING_2);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Identifier.use value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        testIdentifier.setUse(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Identifier.use (${INVALID_CODE})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Identifier.system value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        testIdentifier.setSystem(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Identifier.system (${INVALID_URI})`);
    });

    it('should throw PrimitiveTypeError when reset with invalid primitive Identifier.value value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        testIdentifier.setValue(INVALID_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Identifier.value (${INVALID_STRING})`);
    });

    it('should throw InvalidTypeError when reset with invalid Identifier.assigner reference value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        testIdentifier.setAssigner(INVALID_REFERENCE_VALUE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `ReferenceTargets decorator on setAssigner (Identifier.assigner) expects argument (${INVALID_REFERENCE}) to be a valid 'Reference' type`,
      );
    });

    // Tests using DataType elements

    it('should be properly instantiated with PrimitiveType values', () => {
      const testIdentifier = new Identifier();
      testIdentifier.setUseElement(VALID_CODE_TYPE);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_1);
      testIdentifier.setSystemElement(VALID_URI_TYPE);
      testIdentifier.setValueElement(VALID_STRING_TYPE);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_1);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier).toBeInstanceOf(DataType);
      expect(testIdentifier).toBeInstanceOf(Identifier);
      expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
      expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
      expect(testIdentifier.isEmpty()).toBe(false);
      expect(testIdentifier.isComplexDataType()).toBe(true);
      expect(testIdentifier.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_1);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_1);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING);
    });

    it('should be properly reset by modifying all properties with PrimitiveType values', () => {
      const testIdentifier = new Identifier();
      testIdentifier.setUseElement(VALID_CODE_TYPE);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_1);
      testIdentifier.setSystemElement(VALID_URI_TYPE);
      testIdentifier.setValueElement(VALID_STRING_TYPE);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_1);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_1);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_1);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING);

      // Reset

      testIdentifier.setUseElement(VALID_CODE_TYPE_2);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_2);
      testIdentifier.setSystemElement(VALID_URI_TYPE_2);
      testIdentifier.setValueElement(VALID_STRING_TYPE_2);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_2);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_2);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier.isEmpty()).toBe(false);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(false);
      expect(testIdentifier.getId()).toBeUndefined();
      expect(testIdentifier.hasExtension()).toBe(false);
      expect(testIdentifier.getExtension()).toEqual([] as Extension[]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE_2);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE_2);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(VALID_STRING_TYPE_2);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_2);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_2);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_2);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE_2);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING_2);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Identifier.use value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testIdentifier.setUseElement(INVALID_CODE_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Identifier.use; Provided element is not an instance of CodeType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Identifier.type value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testIdentifier.setType(INVALID_CODEABLECONCEPT_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Identifier.type; Provided element is not an instance of CodeableConcept.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Identifier.system value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testIdentifier.setSystemElement(INVALID_URI_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Identifier.system; Provided element is not an instance of UriType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Identifier.value value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testIdentifier.setValueElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Identifier.value; Provided element is not an instance of StringType.`);
    });

    it('should throw InvalidTypeError when reset with invalid PrimitiveType Identifier.period value', () => {
      const testIdentifier = new Identifier();
      const t = () => {
        // @ts-expect-error: allow invalid type for testing
        testIdentifier.setPeriod(INVALID_PERIOD_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Identifier.period; Provided element is not an instance of Period.`);
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const valueStr = 'value type string';
      const valueType = new StringType(valueStr);
      const valueId = 'V1357';
      valueType.setId(valueId);
      const valueExtension = new Extension('valueUrl', new StringType('value extension string value'));
      valueType.addExtension(valueExtension);

      const testIdentifier = new Identifier();
      const testId = 'id1234';
      testIdentifier.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testIdentifier.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testIdentifier.addExtension(testExtension2);

      testIdentifier.setUseElement(VALID_CODE_TYPE);
      testIdentifier.setType(VALID_CODEABLECONCEPT_VALUE_1);
      testIdentifier.setSystemElement(VALID_URI_TYPE);
      testIdentifier.setValueElement(valueType);
      testIdentifier.setPeriod(VALID_PERIOD_VALUE_1);
      testIdentifier.setAssigner(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier).toBeDefined();
      expect(testIdentifier).toBeInstanceOf(DataType);
      expect(testIdentifier).toBeInstanceOf(Identifier);
      expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
      expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
      expect(testIdentifier.isEmpty()).toBe(false);
      expect(testIdentifier.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testIdentifier.hasId()).toBe(true);
      expect(testIdentifier.getId()).toStrictEqual(testId);
      expect(testIdentifier.hasExtension()).toBe(true);
      expect(testIdentifier.getExtension()).toEqual([testExtension1, testExtension2]);

      // Reference properties
      expect(testIdentifier.hasUseElement()).toBe(true);
      expect(testIdentifier.getUseElement()).toEqual(VALID_CODE_TYPE);
      expect(testIdentifier.hasSystemElement()).toBe(true);
      expect(testIdentifier.getSystemElement()).toEqual(VALID_URI_TYPE);
      expect(testIdentifier.hasValueElement()).toBe(true);
      expect(testIdentifier.getValueElement()).toEqual(valueType);

      expect(testIdentifier.hasType()).toBe(true);
      expect(testIdentifier.getType()).toEqual(VALID_CODEABLECONCEPT_VALUE_1);
      expect(testIdentifier.hasPeriod()).toBe(true);
      expect(testIdentifier.getPeriod()).toEqual(VALID_PERIOD_VALUE_1);
      expect(testIdentifier.hasAssigner()).toBe(true);
      expect(testIdentifier.getAssigner()).toEqual(VALID_REFERENCE_VALUE_1);

      expect(testIdentifier.hasUse()).toBe(true);
      expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE);
      expect(testIdentifier.hasSystem()).toBe(true);
      expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI);
      expect(testIdentifier.hasValue()).toBe(true);
      expect(testIdentifier.getValue()).toStrictEqual(valueStr);

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
        use: 'testCodeType',
        type: {
          text: 'CodeableConcept text 1',
        },
        system: 'testUriType',
        value: 'value type string',
        _value: {
          id: 'V1357',
          extension: [
            {
              url: 'valueUrl',
              valueString: 'value extension string value',
            },
          ],
        },
        period: {
          start: '2017-01-01T00:00:00.000Z',
        },
        assigner: {
          reference: 'Organization/13579',
        },
      };
      expect(testIdentifier.toJSON()).toEqual(expectedJson);
    });
  });
});
