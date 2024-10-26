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

  describe('Core', () => {
    const expectedJson = {
      coding: [
        {
          code: 'testCodeType',
          display: 'This is a valid string.',
          system: 'testUriType',
        },
        {
          code: 'testCodeType2',
          display: 'This is another valid string!',
          system: 'testUriType2',
        },
      ],
      text: 'This is a valid string.',
    };

    it('should be properly instantiated as empty', () => {
      const testCodeableConcept = new CodeableConcept();
      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept).toBeInstanceOf(DataType);
      expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
      expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.isEmpty()).toBe(true);
      expect(testCodeableConcept.isComplexDataType()).toBe(true);
      expect(testCodeableConcept.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(false);
      expect(testCodeableConcept.getCoding()).toEqual([] as Coding[]);
      expect(testCodeableConcept.hasTextElement()).toBe(false);
      expect(testCodeableConcept.getTextElement()).toEqual(new StringType());
      expect(testCodeableConcept.hasText()).toBe(false);
      expect(testCodeableConcept.getText()).toBeUndefined();
    });

    it('should be properly instantiated with addCoding', () => {
      const testCodeableConcept = new CodeableConcept();
      testCodeableConcept.addCoding(VALID_CODING);
      testCodeableConcept.addCoding(VALID_CODING_2);
      testCodeableConcept.setText(VALID_STRING);

      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept).toBeInstanceOf(DataType);
      expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
      expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.isEmpty()).toBe(false);
      expect(testCodeableConcept.isComplexDataType()).toBe(true);
      expect(testCodeableConcept.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(true);
      expect(testCodeableConcept.getCoding()).toHaveLength(2);
      expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([VALID_CODING, VALID_CODING_2]));
      expect(testCodeableConcept.hasTextElement()).toBe(true);
      expect(testCodeableConcept.getTextElement()).toEqual(VALID_STRING_TYPE);
      expect(testCodeableConcept.hasText()).toBe(true);
      expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);
    });

    it('should be properly instantiated with setCoding', () => {
      const testCodeableConcept = new CodeableConcept();
      testCodeableConcept.setCoding([VALID_CODING, VALID_CODING_2]);
      testCodeableConcept.setTextElement(VALID_STRING_TYPE);

      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept).toBeInstanceOf(DataType);
      expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
      expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.isEmpty()).toBe(false);
      expect(testCodeableConcept.isComplexDataType()).toBe(true);
      expect(testCodeableConcept.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(true);
      expect(testCodeableConcept.getCoding()).toHaveLength(2);
      expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([VALID_CODING, VALID_CODING_2]));
      expect(testCodeableConcept.hasTextElement()).toBe(true);
      expect(testCodeableConcept.getTextElement()).toEqual(VALID_STRING_TYPE);
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

    it('should be properly reset by modifying all properties', () => {
      const testCodeableConcept = new CodeableConcept();

      testCodeableConcept.setCoding([VALID_CODING]);
      testCodeableConcept.setText(VALID_STRING);
      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept.isEmpty()).toBe(false);
      expect(testCodeableConcept.hasCoding()).toBe(true);
      expect(testCodeableConcept.getCoding()).toEqual([VALID_CODING]);
      expect(testCodeableConcept.hasTextElement()).toBe(true);
      expect(testCodeableConcept.getTextElement()).toEqual(VALID_STRING_TYPE);
      expect(testCodeableConcept.hasText()).toBe(true);
      expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);

      testCodeableConcept.setCoding([VALID_CODING_2]);
      testCodeableConcept.setTextElement(VALID_STRING_TYPE_2);
      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept.isEmpty()).toBe(false);
      expect(testCodeableConcept.hasCoding()).toBe(true);
      expect(testCodeableConcept.getCoding()).toEqual([VALID_CODING_2]);
      expect(testCodeableConcept.hasTextElement()).toBe(true);
      expect(testCodeableConcept.getTextElement()).toEqual(VALID_STRING_TYPE_2);
      expect(testCodeableConcept.hasText()).toBe(true);
      expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING_2);
    });

    it('should be properly reset by modifying all properties with undefined values', () => {
      // undefined - primitive text
      const testCodeableConcept = new CodeableConcept();
      testCodeableConcept.addCoding(UNDEFINED_VALUE);
      testCodeableConcept.setText(UNDEFINED_VALUE);
      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept.isEmpty()).toBe(true);
      expect(testCodeableConcept.isComplexDataType()).toBe(true);
      expect(testCodeableConcept.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(false);
      expect(testCodeableConcept.getCoding()).toEqual([] as Coding[]);
      expect(testCodeableConcept.hasTextElement()).toBe(false);
      expect(testCodeableConcept.getTextElement()).toEqual(new StringType());
      expect(testCodeableConcept.hasText()).toBe(false);
      expect(testCodeableConcept.getText()).toBeUndefined();

      // undefined - PrimitiveType text
      testCodeableConcept.setCoding(UNDEFINED_VALUE);
      testCodeableConcept.setTextElement(UNDEFINED_VALUE);
      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept.isEmpty()).toBe(true);

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(false);
      expect(testCodeableConcept.getCoding()).toEqual([] as Coding[]);
      expect(testCodeableConcept.hasTextElement()).toBe(false);
      expect(testCodeableConcept.getTextElement()).toEqual(new StringType());
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
      expect(testCodeableConcept.isComplexDataType()).toBe(true);
      expect(testCodeableConcept.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(true);
      expect(testCodeableConcept.getCoding()).toHaveLength(2);
      expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([VALID_CODING, VALID_CODING_2]));
      expect(testCodeableConcept.hasTextElement()).toBe(true);
      expect(testCodeableConcept.getTextElement()).toEqual(VALID_STRING_TYPE);
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
      expect(testCodeableConcept.isComplexDataType()).toBe(true);
      expect(testCodeableConcept.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(false);
      expect(testCodeableConcept.getId()).toBeUndefined();
      expect(testCodeableConcept.hasExtension()).toBe(false);
      expect(testCodeableConcept.getExtension()).toEqual([] as Extension[]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(false);
      expect(testCodeableConcept.getCoding()).toEqual([] as Coding[]);
      expect(testCodeableConcept.hasTextElement()).toBe(false);
      expect(testCodeableConcept.getTextElement()).toEqual(new StringType());
      expect(testCodeableConcept.hasText()).toBe(false);
      expect(testCodeableConcept.getText()).toBeUndefined();
    });
  });

  describe('Serialization/Deserialization', () => {
    it('should properly create serialized content', () => {
      const testCodeableConcept = new CodeableConcept();
      const testId = 'id1234';
      testCodeableConcept.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testCodeableConcept.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testCodeableConcept.addExtension(testExtension2);

      const coding1 = new Coding();
      coding1.setSystem(VALID_URI);
      coding1.setCode(VALID_CODE);
      coding1.setDisplay(VALID_STRING);
      const coding1Id = 'S1357';
      const coding1Extension = new Extension('coding1Url', new StringType('coding1 extension string value'));
      coding1.setId(coding1Id);
      coding1.addExtension(coding1Extension);

      const coding2 = new Coding();
      coding2.setSystem(VALID_URI_2);
      coding2.setCode(VALID_CODE_2);
      coding2.setDisplay(VALID_STRING_2);

      testCodeableConcept.setCoding([coding1, coding2]);
      testCodeableConcept.setTextElement(VALID_STRING_TYPE);

      expect(testCodeableConcept).toBeDefined();
      expect(testCodeableConcept).toBeInstanceOf(DataType);
      expect(testCodeableConcept).toBeInstanceOf(CodeableConcept);
      expect(testCodeableConcept.constructor.name).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.fhirType()).toStrictEqual('CodeableConcept');
      expect(testCodeableConcept.isEmpty()).toBe(false);
      expect(testCodeableConcept.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testCodeableConcept.hasId()).toBe(true);
      expect(testCodeableConcept.getId()).toStrictEqual(testId);
      expect(testCodeableConcept.hasExtension()).toBe(true);
      expect(testCodeableConcept.getExtension()).toEqual([testExtension1, testExtension2]);

      // CodeableConcept properties
      expect(testCodeableConcept.hasCoding()).toBe(true);
      expect(testCodeableConcept.getCoding()).toHaveLength(2);
      expect(testCodeableConcept.getCoding()).toEqual(expect.arrayContaining([coding1, coding2]));
      expect(testCodeableConcept.hasTextElement()).toBe(true);
      expect(testCodeableConcept.getTextElement()).toEqual(VALID_STRING_TYPE);
      expect(testCodeableConcept.hasText()).toBe(true);
      expect(testCodeableConcept.getText()).toStrictEqual(VALID_STRING);

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
        coding: [
          {
            id: 'S1357',
            extension: [
              {
                url: 'coding1Url',
                valueString: 'coding1 extension string value',
              },
            ],
            system: 'testUriType',
            code: 'testCodeType',
            display: 'This is a valid string.',
          },
          {
            system: 'testUriType2',
            code: 'testCodeType2',
            display: 'This is another valid string!',
          },
        ],
        text: 'This is a valid string.',
      };
      expect(testCodeableConcept.toJSON()).toEqual(expectedJson);
    });
  });
});
