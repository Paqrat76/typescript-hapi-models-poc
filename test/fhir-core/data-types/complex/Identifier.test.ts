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

  const VALID_URI = `testUriType`;
  const VALID_URI_TYPE = new UriType(VALID_URI);
  const VALID_URI_2 = `testUriType2`;
  const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);
  const INVALID_URI = ' invalid Uri ';

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);
  const INVALID_STRING = '';

  const VALID_CODEABLECONCEPT_TEXT_1 = 'CodeableConcept text 1';
  const VALID_CODEABLECONCEPT_VALUE_1 = new CodeableConcept();
  VALID_CODEABLECONCEPT_VALUE_1.setText(VALID_CODEABLECONCEPT_TEXT_1);

  const VALID_CODEABLECONCEPT_TEXT_2 = 'CodeableConcept text 2';
  const VALID_CODEABLECONCEPT_VALUE_2 = new CodeableConcept();
  VALID_CODEABLECONCEPT_VALUE_2.setText(VALID_CODEABLECONCEPT_TEXT_2);

  const VALID_PERIOD_START_1 = '2017-01-01T00:00:00.000Z';
  const VALID_PERIOD_VALUE_1 = new Period();
  VALID_PERIOD_VALUE_1.setStart(VALID_PERIOD_START_1);

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

  it('should be properly instantiated as empty', () => {
    const testIdentifier = new Identifier();
    expect(testIdentifier).toBeDefined();
    expect(testIdentifier).toBeInstanceOf(DataType);
    expect(testIdentifier).toBeInstanceOf(Identifier);
    expect(testIdentifier.constructor.name).toStrictEqual('Identifier');
    expect(testIdentifier.fhirType()).toStrictEqual('Identifier');
    expect(testIdentifier.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testIdentifier.hasId()).toBe(false);
    expect(testIdentifier.getId()).toBeUndefined();
    expect(testIdentifier.hasExtension()).toBe(false);
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(false);
    expect(testIdentifier.getUseElement()).toMatchObject(new CodeType());
    expect(testIdentifier.hasSystemElement()).toBe(false);
    expect(testIdentifier.getSystemElement()).toMatchObject(new UriType());
    expect(testIdentifier.hasValueElement()).toBe(false);
    expect(testIdentifier.getValueElement()).toMatchObject(new StringType());

    expect(testIdentifier.hasType()).toBe(false);
    expect(testIdentifier.getType()).toMatchObject(new CodeableConcept());
    expect(testIdentifier.hasPeriod()).toBe(false);
    expect(testIdentifier.getPeriod()).toMatchObject(new Period());
    expect(testIdentifier.hasAssigner()).toBe(false);
    expect(testIdentifier.getAssigner()).toMatchObject(new Reference());

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

    // inherited properties from Element
    expect(testIdentifier.hasId()).toBe(false);
    expect(testIdentifier.getId()).toBeUndefined();
    expect(testIdentifier.hasExtension()).toBe(false);
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_1);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_1);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_1);

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

    // inherited properties from Element
    expect(testIdentifier.hasId()).toBe(false);
    expect(testIdentifier.getId()).toBeUndefined();
    expect(testIdentifier.hasExtension()).toBe(false);
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(false);
    expect(testIdentifier.getUseElement()).toMatchObject(new CodeType());
    expect(testIdentifier.hasSystemElement()).toBe(false);
    expect(testIdentifier.getSystemElement()).toMatchObject(new UriType());
    expect(testIdentifier.hasValueElement()).toBe(false);
    expect(testIdentifier.getValueElement()).toMatchObject(new StringType());

    expect(testIdentifier.hasType()).toBe(false);
    expect(testIdentifier.getType()).toMatchObject(new CodeableConcept());
    expect(testIdentifier.hasPeriod()).toBe(false);
    expect(testIdentifier.getPeriod()).toMatchObject(new Period());
    expect(testIdentifier.hasAssigner()).toBe(false);
    expect(testIdentifier.getAssigner()).toMatchObject(new Reference());

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

    // inherited properties from Element
    expect(testIdentifier.hasId()).toBe(false);
    expect(testIdentifier.getId()).toBeUndefined();
    expect(testIdentifier.hasExtension()).toBe(false);
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_1);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_1);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_1);

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
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_1);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_1);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_1);

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
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE_2);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE_2);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE_2);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_2);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_2);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_2);

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

  it('should throw InvalidTypeError when reset with invalid Identifier.assigner reference type', () => {
    const testIdentifier = new Identifier();
    const t = () => {
      testIdentifier.setAssigner(INVALID_REFERENCE_VALUE);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`setAssigner: 'value' argument (${INVALID_REFERENCE}) is not for a valid resource type`);
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

    // inherited properties from Element
    expect(testIdentifier.hasId()).toBe(false);
    expect(testIdentifier.getId()).toBeUndefined();
    expect(testIdentifier.hasExtension()).toBe(false);
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_1);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_1);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_1);

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
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_1);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_1);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_1);

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
    expect(testIdentifier.getExtension()).toMatchObject([] as Extension[]);

    // Reference properties
    expect(testIdentifier.hasUseElement()).toBe(true);
    expect(testIdentifier.getUseElement()).toMatchObject(VALID_CODE_TYPE_2);
    expect(testIdentifier.hasSystemElement()).toBe(true);
    expect(testIdentifier.getSystemElement()).toMatchObject(VALID_URI_TYPE_2);
    expect(testIdentifier.hasValueElement()).toBe(true);
    expect(testIdentifier.getValueElement()).toMatchObject(VALID_STRING_TYPE_2);

    expect(testIdentifier.hasType()).toBe(true);
    expect(testIdentifier.getType()).toMatchObject(VALID_CODEABLECONCEPT_VALUE_2);
    expect(testIdentifier.hasPeriod()).toBe(true);
    expect(testIdentifier.getPeriod()).toMatchObject(VALID_PERIOD_VALUE_2);
    expect(testIdentifier.hasAssigner()).toBe(true);
    expect(testIdentifier.getAssigner()).toMatchObject(VALID_REFERENCE_VALUE_2);

    expect(testIdentifier.hasUse()).toBe(true);
    expect(testIdentifier.getUse()).toStrictEqual(VALID_CODE_2);
    expect(testIdentifier.hasSystem()).toBe(true);
    expect(testIdentifier.getSystem()).toStrictEqual(VALID_URI_2);
    expect(testIdentifier.hasValue()).toBe(true);
    expect(testIdentifier.getValue()).toStrictEqual(VALID_STRING_2);
  });
});
