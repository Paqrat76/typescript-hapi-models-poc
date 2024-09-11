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

import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('CodeableConcept', () => {
  const VALID_URI = `testUriType`;
  const VALID_URI_2 = `testUriType2`;

  const VALID_CODE = `testCodeType`;
  const VALID_CODE_2 = `testCodeType2`;

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);
  const INVALID_STRING = '';

  const VALID_CODING = new Coding();
  VALID_CODING.setSystem(VALID_URI);
  VALID_CODING.setCode(VALID_CODE);
  VALID_CODING.setDisplay(VALID_STRING);
  const VALID_CODING_2 = new Coding();
  VALID_CODING_2.setSystem(VALID_URI_2);
  VALID_CODING_2.setCode(VALID_CODE_2);
  VALID_CODING_2.setDisplay(VALID_STRING_2);

  const UNDEFINED_VALUE = undefined;

  it('should be properly instantiated as empty', () => {
    const testCodeableConcept = new CodeableConcept();
    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept).toBeInstanceOf(DataType);
    expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
    expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(false);
    expect(testCodeableConcept.getCoding()).toMatchObject([] as Coding[]);
    expect(testCodeableConcept.hasTextElement()).toBe(false);
    expect(testCodeableConcept.getTextElement()).toMatchObject(new StringType());
    expect(testCodeableConcept.hasText()).toBe(false);
    expect(testCodeableConcept.getText()).toBeUndefined();
  });

  it('should be properly instantiated with valid primitive values', () => {
    const testCodeableConcept = new CodeableConcept();
    testCodeableConcept.setCoding([VALID_CODING, VALID_CODING_2]);
    testCodeableConcept.setText(VALID_STRING);

    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept).toBeInstanceOf(DataType);
    expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
    expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(true);
    expect(testCodeableConcept.getCoding()).toHaveLength(2);
    expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([VALID_CODING, VALID_CODING_2]));
    expect(testCodeableConcept.hasTextElement()).toBe(true);
    expect(testCodeableConcept.getTextElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testCodeableConcept.hasText()).toBe(true);
    expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);
  });

  it('should be properly instantiated with valid PrimitiveType values', () => {
    const testCodeableConcept = new CodeableConcept();
    testCodeableConcept.setCoding([VALID_CODING, VALID_CODING_2]);
    testCodeableConcept.setTextElement(VALID_STRING_TYPE);

    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept).toBeInstanceOf(DataType);
    expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
    expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(true);
    expect(testCodeableConcept.getCoding()).toHaveLength(2);
    expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([VALID_CODING, VALID_CODING_2]));
    expect(testCodeableConcept.hasTextElement()).toBe(true);
    expect(testCodeableConcept.getTextElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testCodeableConcept.hasText()).toBe(true);
    expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);
  });

  it('should throw PrimitiveTypeError when initialized with invalid primitive text value', () => {
    const testCodeableConcept = new CodeableConcept();
    const t = () => {
      testCodeableConcept.setText(INVALID_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid CodeableConcept.text`);
  });

  it('should be properly reset by modifying all properties with primitive values', () => {
    const testCodeableConcept = new CodeableConcept();

    testCodeableConcept.setCoding([VALID_CODING]);
    testCodeableConcept.setText(VALID_STRING);
    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept.isEmpty()).toBe(false);
    expect(testCodeableConcept.hasCoding()).toBe(true);
    expect(testCodeableConcept.getCoding()).toEqual([VALID_CODING]);
    expect(testCodeableConcept.hasTextElement()).toBe(true);
    expect(testCodeableConcept.getTextElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testCodeableConcept.hasText()).toBe(true);
    expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);

    testCodeableConcept.setCoding([VALID_CODING_2]);
    testCodeableConcept.setTextElement(VALID_STRING_TYPE_2);
    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept.isEmpty()).toBe(false);
    expect(testCodeableConcept.hasCoding()).toBe(true);
    expect(testCodeableConcept.getCoding()).toEqual([VALID_CODING_2]);
    expect(testCodeableConcept.hasTextElement()).toBe(true);
    expect(testCodeableConcept.getTextElement()).toMatchObject(VALID_STRING_TYPE_2);
    expect(testCodeableConcept.hasText()).toBe(true);
    expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING_2);
  });

  it('should be properly reset by modifying all properties with undefined values', () => {
    // undefined - primitive text
    let testCodeableConcept = new CodeableConcept();
    testCodeableConcept.addCoding(UNDEFINED_VALUE);
    testCodeableConcept.setText(UNDEFINED_VALUE);
    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(false);
    expect(testCodeableConcept.getCoding()).toMatchObject([] as Coding[]);
    expect(testCodeableConcept.hasTextElement()).toBe(false);
    expect(testCodeableConcept.getTextElement()).toMatchObject(new StringType());
    expect(testCodeableConcept.hasText()).toBe(false);
    expect(testCodeableConcept.getText()).toBeUndefined();

    // undefined - PrimitiveType text
    testCodeableConcept = new CodeableConcept();
    testCodeableConcept.setCoding(UNDEFINED_VALUE);
    testCodeableConcept.setTextElement(UNDEFINED_VALUE);
    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(false);
    expect(testCodeableConcept.getCoding()).toMatchObject([] as Coding[]);
    expect(testCodeableConcept.hasTextElement()).toBe(false);
    expect(testCodeableConcept.getTextElement()).toMatchObject(new StringType());
    expect(testCodeableConcept.hasText()).toBe(false);
    expect(testCodeableConcept.getText()).toBeUndefined();
  });

  it('should properly copy()', () => {
    let codeableConceptType = new CodeableConcept();
    codeableConceptType.addCoding(VALID_CODING);
    codeableConceptType.addCoding(VALID_CODING_2);
    codeableConceptType.setText(VALID_STRING);
    let testCodeableConcept = codeableConceptType.copy();

    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept).toBeInstanceOf(DataType);
    expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
    expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(true);
    expect(testCodeableConcept.getCoding()).toHaveLength(2);
    expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([VALID_CODING, VALID_CODING_2]));
    expect(testCodeableConcept.hasTextElement()).toBe(true);
    expect(testCodeableConcept.getTextElement()).toMatchObject(VALID_STRING_TYPE);
    expect(testCodeableConcept.hasText()).toBe(true);
    expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);

    // copy empty
    codeableConceptType = new CodeableConcept();
    testCodeableConcept = codeableConceptType.copy();
    expect(testCodeableConcept).toBeDefined();
    expect(testCodeableConcept).toBeInstanceOf(DataType);
    expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
    expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
    expect(testCodeableConcept.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCodeableConcept.hasId()).toBe(false);
    expect(testCodeableConcept.getId()).toBeUndefined();
    expect(testCodeableConcept.hasExtension()).toBe(false);
    expect(testCodeableConcept.getExtension()).toMatchObject([] as Extension[]);

    // CodeableConcept properties
    expect(testCodeableConcept.hasCoding()).toBe(false);
    expect(testCodeableConcept.getCoding()).toMatchObject([] as Coding[]);
    expect(testCodeableConcept.hasTextElement()).toBe(false);
    expect(testCodeableConcept.getTextElement()).toMatchObject(new StringType());
    expect(testCodeableConcept.hasText()).toBe(false);
    expect(testCodeableConcept.getText()).toBeUndefined();
  });
});
