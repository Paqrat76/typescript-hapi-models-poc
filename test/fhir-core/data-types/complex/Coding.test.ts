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
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { fhirBoolean } from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import {
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  INVALID_STRING_TYPE,
  TOO_BIG_STRING,
  UNDEFINED_VALUE,
} from '../../../test-utils';

describe('Coding', () => {
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

  const VALID_STRING = 'This is a valid string.';
  const VALID_STRING_TYPE = new StringType(VALID_STRING);
  const VALID_STRING_2 = 'This is another valid string!';
  const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  const VALID_VERSION = 'validVersion';
  const VALID_VERSION_TYPE = new StringType(VALID_VERSION);

  const VALID_BOOLEAN_FALSE = false as fhirBoolean;
  const VALID_BOOLEAN_TYPE_FALSE = new BooleanType(VALID_BOOLEAN_FALSE);
  const VALID_BOOLEAN_TRUE = true as fhirBoolean;
  const VALID_BOOLEAN_TYPE_TRUE = new BooleanType(VALID_BOOLEAN_TRUE);

  describe('Core', () => {
    const expectedJson = {
      system: VALID_URI,
      version: VALID_VERSION,
      code: VALID_CODE,
      display: VALID_STRING,
      userSelected: VALID_BOOLEAN_FALSE,
    };

    it('should be properly instantiated as empty', () => {
      const testCoding = new Coding();
      expect(testCoding).toBeDefined();
      expect(testCoding).toBeInstanceOf(DataType);
      expect(testCoding).toBeInstanceOf(Coding);
      expect(testCoding.constructor.name).toStrictEqual('Coding');
      expect(testCoding.fhirType()).toStrictEqual('Coding');
      expect(testCoding.isEmpty()).toBe(true);
      expect(testCoding.isComplexDataType()).toBe(true);
      expect(testCoding.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testCoding.hasId()).toBe(false);
      expect(testCoding.getId()).toBeUndefined();
      expect(testCoding.hasExtension()).toBe(false);
      expect(testCoding.getExtension()).toEqual([] as Extension[]);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(false);
      expect(testCoding.getSystemElement()).toEqual(new UriType());
      expect(testCoding.hasVersionElement()).toBe(false);
      expect(testCoding.getVersionElement()).toEqual(new StringType());
      expect(testCoding.hasCodeElement()).toBe(false);
      expect(testCoding.getCodeElement()).toEqual(new CodeType());
      expect(testCoding.hasDisplayElement()).toBe(false);
      expect(testCoding.getDisplayElement()).toEqual(new StringType());
      expect(testCoding.hasUserSelectedElement()).toBe(false);
      expect(testCoding.getUserSelectedElement()).toEqual(new BooleanType());

      expect(testCoding.hasSystem()).toBe(false);
      expect(testCoding.getSystem()).toBeUndefined();
      expect(testCoding.hasVersion()).toBe(false);
      expect(testCoding.getVersion()).toBeUndefined();
      expect(testCoding.hasCode()).toBe(false);
      expect(testCoding.getCode()).toBeUndefined();
      expect(testCoding.hasDisplay()).toBe(false);
      expect(testCoding.getDisplay()).toBeUndefined();
      expect(testCoding.hasUserSelected()).toBe(false);
      expect(testCoding.getUserSelected()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const codingType = new Coding();
      codingType.setSystem(VALID_URI);
      codingType.setCode(VALID_CODE);
      codingType.setDisplay(VALID_STRING);
      codingType.setVersion(VALID_VERSION);
      codingType.setUserSelected(VALID_BOOLEAN_FALSE);

      let testCoding = codingType.copy();
      expect(testCoding).toBeDefined();
      expect(testCoding).toBeInstanceOf(DataType);
      expect(testCoding).toBeInstanceOf(Coding);
      expect(testCoding.constructor.name).toStrictEqual('Coding');
      expect(testCoding.fhirType()).toStrictEqual('Coding');
      expect(testCoding.isEmpty()).toBe(false);
      expect(testCoding.isComplexDataType()).toBe(true);
      expect(testCoding.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testCoding.hasId()).toBe(false);
      expect(testCoding.getId()).toBeUndefined();
      expect(testCoding.hasExtension()).toBe(false);
      expect(testCoding.getExtension()).toEqual([] as Extension[]);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toEqual(new UriType(VALID_URI));
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toEqual(new StringType(VALID_VERSION));
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toEqual(new CodeType(VALID_CODE));
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toEqual(new StringType(VALID_STRING));
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toEqual(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_VERSION);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(VALID_BOOLEAN_FALSE);

      // Reset to empty

      codingType.setSystem(UNDEFINED_VALUE);
      codingType.setCode(UNDEFINED_VALUE);
      codingType.setDisplay(UNDEFINED_VALUE);
      codingType.setVersion(UNDEFINED_VALUE);
      codingType.setUserSelected(UNDEFINED_VALUE);

      testCoding = codingType.copy();
      expect(testCoding).toBeDefined();
      expect(testCoding).toBeInstanceOf(DataType);
      expect(testCoding).toBeInstanceOf(Coding);
      expect(testCoding.constructor.name).toStrictEqual('Coding');
      expect(testCoding.fhirType()).toStrictEqual('Coding');
      expect(testCoding.isEmpty()).toBe(true);
      expect(testCoding.isComplexDataType()).toBe(true);
      expect(testCoding.toJSON()).toBeUndefined();

      // inherited properties from Element
      expect(testCoding.hasId()).toBe(false);
      expect(testCoding.getId()).toBeUndefined();
      expect(testCoding.hasExtension()).toBe(false);
      expect(testCoding.getExtension()).toEqual([] as Extension[]);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(false);
      expect(testCoding.getSystemElement()).toEqual(new UriType());
      expect(testCoding.hasVersionElement()).toBe(false);
      expect(testCoding.getVersionElement()).toEqual(new StringType());
      expect(testCoding.hasCodeElement()).toBe(false);
      expect(testCoding.getCodeElement()).toEqual(new CodeType());
      expect(testCoding.hasDisplayElement()).toBe(false);
      expect(testCoding.getDisplayElement()).toEqual(new StringType());
      expect(testCoding.hasUserSelectedElement()).toBe(false);
      expect(testCoding.getUserSelectedElement()).toEqual(new BooleanType());

      expect(testCoding.hasSystem()).toBe(false);
      expect(testCoding.getSystem()).toBeUndefined();
      expect(testCoding.hasVersion()).toBe(false);
      expect(testCoding.getVersion()).toBeUndefined();
      expect(testCoding.hasCode()).toBe(false);
      expect(testCoding.getCode()).toBeUndefined();
      expect(testCoding.hasDisplay()).toBe(false);
      expect(testCoding.getDisplay()).toBeUndefined();
      expect(testCoding.hasUserSelected()).toBe(false);
      expect(testCoding.getUserSelected()).toBeUndefined();
    });

    // Tests using primitives

    it('should be properly instantiated with primitive values', () => {
      const testCoding = new Coding();
      testCoding.setSystem(VALID_URI);
      testCoding.setCode(VALID_CODE);
      testCoding.setDisplay(VALID_STRING);
      testCoding.setVersion(VALID_VERSION);
      testCoding.setUserSelected(VALID_BOOLEAN_FALSE);

      expect(testCoding).toBeDefined();
      expect(testCoding).toBeInstanceOf(DataType);
      expect(testCoding).toBeInstanceOf(Coding);
      expect(testCoding.constructor.name).toStrictEqual('Coding');
      expect(testCoding.fhirType()).toStrictEqual('Coding');
      expect(testCoding.isEmpty()).toBe(false);
      expect(testCoding.isComplexDataType()).toBe(true);
      expect(testCoding.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testCoding.hasId()).toBe(false);
      expect(testCoding.getId()).toBeUndefined();
      expect(testCoding.hasExtension()).toBe(false);
      expect(testCoding.getExtension()).toEqual([] as Extension[]);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toEqual(new StringType(VALID_VERSION));
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toEqual(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_VERSION);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(VALID_BOOLEAN_FALSE);
    });

    it('should be properly reset by modifying all properties with primitive values', () => {
      const testCoding = new Coding();
      testCoding.setSystem(VALID_URI);
      testCoding.setCode(VALID_CODE);
      testCoding.setDisplay(VALID_STRING);
      testCoding.setVersion(VALID_VERSION);
      testCoding.setUserSelected(VALID_BOOLEAN_FALSE);

      expect(testCoding).toBeDefined();
      expect(testCoding.isEmpty()).toBe(false);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toEqual(new StringType(VALID_VERSION));
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toEqual(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_VERSION);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(VALID_BOOLEAN_FALSE);

      // Reset

      testCoding.setSystem(VALID_URI_2);
      testCoding.setCode(VALID_CODE_2);
      testCoding.setDisplay(VALID_STRING_2);
      testCoding.setVersion(VALID_STRING_2);
      testCoding.setUserSelected(VALID_BOOLEAN_TRUE);

      expect(testCoding).toBeDefined();
      expect(testCoding.isEmpty()).toBe(false);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE_2);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toStrictEqual(VALID_STRING_TYPE_2);
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE_2);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toStrictEqual(VALID_BOOLEAN_TYPE_TRUE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_STRING_2);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE_2);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING_2);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(VALID_BOOLEAN_TRUE);

      // Reset to empty

      testCoding.setSystem(UNDEFINED_VALUE);
      testCoding.setCode(UNDEFINED_VALUE);
      testCoding.setDisplay(UNDEFINED_VALUE);
      testCoding.setVersion(UNDEFINED_VALUE);
      testCoding.setUserSelected(UNDEFINED_VALUE);

      expect(testCoding).toBeDefined();
      expect(testCoding.isEmpty()).toBe(true);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(false);
      expect(testCoding.getSystemElement()).toEqual(new UriType());
      expect(testCoding.hasVersionElement()).toBe(false);
      expect(testCoding.getVersionElement()).toEqual(new StringType());
      expect(testCoding.hasCodeElement()).toBe(false);
      expect(testCoding.getCodeElement()).toEqual(new CodeType());
      expect(testCoding.hasDisplayElement()).toBe(false);
      expect(testCoding.getDisplayElement()).toEqual(new StringType());
      expect(testCoding.hasUserSelectedElement()).toBe(false);
      expect(testCoding.getUserSelectedElement()).toEqual(new BooleanType());

      expect(testCoding.hasSystem()).toBe(false);
      expect(testCoding.getSystem()).toBeUndefined();
      expect(testCoding.hasVersion()).toBe(false);
      expect(testCoding.getVersion()).toBeUndefined();
      expect(testCoding.hasCode()).toBe(false);
      expect(testCoding.getCode()).toBeUndefined();
      expect(testCoding.hasDisplay()).toBe(false);
      expect(testCoding.getDisplay()).toBeUndefined();
      expect(testCoding.hasUserSelected()).toBe(false);
      expect(testCoding.getUserSelected()).toBeUndefined();
    });

    it('should throw errors for invalid primitive values', () => {
      const testCoding = new Coding();

      let t = () => {
        testCoding.setSystem(INVALID_URI);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Coding.system (${INVALID_URI})`);

      t = () => {
        testCoding.setVersion(TOO_BIG_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Coding.version (${TOO_BIG_STRING})`);

      t = () => {
        testCoding.setCode(INVALID_CODE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Coding.code (${INVALID_CODE})`);

      t = () => {
        testCoding.setDisplay(TOO_BIG_STRING);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Coding.display (${TOO_BIG_STRING})`);

      t = () => {
        // @ts-expect-error: allow non-boolean to test error handling
        testCoding.setUserSelected(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid Coding.userSelected (${INVALID_NON_STRING_TYPE_VALUE})`);
    });

    // Tests using DataType elements

    it('should be properly instantiated with DataType values', () => {
      const testCoding = new Coding();
      testCoding.setSystemElement(VALID_URI_TYPE);
      testCoding.setCodeElement(VALID_CODE_TYPE);
      testCoding.setDisplayElement(VALID_STRING_TYPE);
      testCoding.setVersionElement(VALID_VERSION_TYPE);
      testCoding.setUserSelectedElement(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding).toBeDefined();
      expect(testCoding).toBeInstanceOf(DataType);
      expect(testCoding).toBeInstanceOf(Coding);
      expect(testCoding.constructor.name).toStrictEqual('Coding');
      expect(testCoding.fhirType()).toStrictEqual('Coding');
      expect(testCoding.isEmpty()).toBe(false);
      expect(testCoding.isComplexDataType()).toBe(true);
      expect(testCoding.toJSON()).toEqual(expectedJson);

      // inherited properties from Element
      expect(testCoding.hasId()).toBe(false);
      expect(testCoding.getId()).toBeUndefined();
      expect(testCoding.hasExtension()).toBe(false);
      expect(testCoding.getExtension()).toEqual([] as Extension[]);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toEqual(new StringType(VALID_VERSION));
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toEqual(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_VERSION);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(VALID_BOOLEAN_FALSE);
    });

    it('should be properly reset by modifying all properties with DataType values', () => {
      const testCoding = new Coding();
      testCoding.setSystemElement(VALID_URI_TYPE);
      testCoding.setCodeElement(VALID_CODE_TYPE);
      testCoding.setDisplayElement(VALID_STRING_TYPE);
      testCoding.setVersionElement(VALID_VERSION_TYPE);
      testCoding.setUserSelectedElement(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding).toBeDefined();
      expect(testCoding.isEmpty()).toBe(false);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toEqual(new StringType(VALID_VERSION));
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toEqual(new BooleanType(false));

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_VERSION);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(false);

      // Reset

      testCoding.setSystemElement(VALID_URI_TYPE_2);
      testCoding.setCodeElement(VALID_CODE_TYPE_2);
      testCoding.setDisplayElement(VALID_STRING_TYPE_2);
      testCoding.setVersionElement(VALID_STRING_TYPE_2);
      testCoding.setUserSelectedElement(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding).toBeDefined();
      expect(testCoding.isEmpty()).toBe(false);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE_2);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toStrictEqual(VALID_STRING_TYPE_2);
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE_2);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE_2);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toStrictEqual(VALID_BOOLEAN_TYPE_FALSE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI_2);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_STRING_2);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE_2);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING_2);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(false);

      // Reset to empty

      testCoding.setSystemElement(UNDEFINED_VALUE);
      testCoding.setCodeElement(UNDEFINED_VALUE);
      testCoding.setDisplayElement(UNDEFINED_VALUE);
      testCoding.setVersionElement(UNDEFINED_VALUE);
      testCoding.setUserSelectedElement(UNDEFINED_VALUE);

      expect(testCoding).toBeDefined();
      expect(testCoding.isEmpty()).toBe(true);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(false);
      expect(testCoding.getSystemElement()).toEqual(new UriType());
      expect(testCoding.hasVersionElement()).toBe(false);
      expect(testCoding.getVersionElement()).toEqual(new StringType());
      expect(testCoding.hasCodeElement()).toBe(false);
      expect(testCoding.getCodeElement()).toEqual(new CodeType());
      expect(testCoding.hasDisplayElement()).toBe(false);
      expect(testCoding.getDisplayElement()).toEqual(new StringType());
      expect(testCoding.hasUserSelectedElement()).toBe(false);
      expect(testCoding.getUserSelectedElement()).toEqual(new BooleanType());

      expect(testCoding.hasSystem()).toBe(false);
      expect(testCoding.getSystem()).toBeUndefined();
      expect(testCoding.hasVersion()).toBe(false);
      expect(testCoding.getVersion()).toBeUndefined();
      expect(testCoding.hasCode()).toBe(false);
      expect(testCoding.getCode()).toBeUndefined();
      expect(testCoding.hasDisplay()).toBe(false);
      expect(testCoding.getDisplay()).toBeUndefined();
      expect(testCoding.hasUserSelected()).toBe(false);
      expect(testCoding.getUserSelected()).toBeUndefined();
    });

    it('should throw errors for invalid DataType values', () => {
      const testCoding = new Coding();

      let t = () => {
        // @ts-expect-error: allow invalid type for test
        testCoding.setSystemElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Coding.system; Provided element is not an instance of UriType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for test
        testCoding.setVersionElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Coding.version; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for test
        testCoding.setCodeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Coding.code; Provided element is not an instance of CodeType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for test
        testCoding.setDisplayElement(INVALID_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Coding.display; Provided element is not an instance of StringType.`);

      t = () => {
        // @ts-expect-error: allow invalid type for test
        testCoding.setUserSelectedElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(`Invalid Coding.userSelected; Provided element is not an instance of BooleanType.`);
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
      system: 'testUriType',
      version: 'validVersion',
      code: 'testCodeType',
      display: 'This is a valid string.',
      _display: {
        id: 'D1357',
        extension: [
          {
            url: 'displayUrl',
            valueString: 'display extension string value',
          },
        ],
      },
      userSelected: true,
    };

    it('should return undefined for empty json', () => {
      let testType = Coding.parse({});
      expect(testType).toBeUndefined();

      // @ts-expect-error:allow for testing
      testType = Coding.parse(undefined);
      expect(testType).toBeUndefined();

      testType = Coding.parse(null);
      expect(testType).toBeUndefined();
    });

    it('should throw TypeError for invalid json type', () => {
      const t = () => {
        Coding.parse('NOT AN OBJECT');
      };
      expect(t).toThrow(TypeError);
      expect(t).toThrow(`Coding JSON is not a JSON object.`);
    });

    it('should properly create serialized content', () => {
      const testCoding = new Coding();
      const testId = 'id1234';
      testCoding.setId(testId);
      const testExtension1 = new Extension('testUrl1', new StringType('base extension string value 1'));
      testCoding.addExtension(testExtension1);
      const testExtension2 = new Extension('testUrl2', new StringType('base extension string value 2'));
      testCoding.addExtension(testExtension2);

      const displayType = new StringType(VALID_STRING);
      const displayId = 'D1357';
      const displayExtension = new Extension('displayUrl', new StringType('display extension string value'));
      displayType.setId(displayId);
      displayType.addExtension(displayExtension);

      testCoding.setSystemElement(VALID_URI_TYPE);
      testCoding.setVersionElement(VALID_VERSION_TYPE);
      testCoding.setCodeElement(VALID_CODE_TYPE);
      testCoding.setDisplayElement(displayType);
      testCoding.setUserSelectedElement(VALID_BOOLEAN_TYPE_TRUE);

      expect(testCoding).toBeDefined();
      expect(testCoding).toBeInstanceOf(DataType);
      expect(testCoding).toBeInstanceOf(Coding);
      expect(testCoding.constructor.name).toStrictEqual('Coding');
      expect(testCoding.fhirType()).toStrictEqual('Coding');
      expect(testCoding.isEmpty()).toBe(false);
      expect(testCoding.isComplexDataType()).toBe(true);

      // inherited properties from Element
      expect(testCoding.hasId()).toBe(true);
      expect(testCoding.getId()).toStrictEqual(testId);
      expect(testCoding.hasExtension()).toBe(true);
      expect(testCoding.getExtension()).toEqual([testExtension1, testExtension2]);

      // Coding properties
      expect(testCoding.hasSystemElement()).toBe(true);
      expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
      expect(testCoding.hasVersionElement()).toBe(true);
      expect(testCoding.getVersionElement()).toEqual(VALID_VERSION_TYPE);
      expect(testCoding.hasCodeElement()).toBe(true);
      expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
      expect(testCoding.hasDisplayElement()).toBe(true);
      expect(testCoding.getDisplayElement()).toStrictEqual(displayType);
      expect(testCoding.hasUserSelectedElement()).toBe(true);
      expect(testCoding.getUserSelectedElement()).toEqual(VALID_BOOLEAN_TYPE_TRUE);

      expect(testCoding.hasSystem()).toBe(true);
      expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
      expect(testCoding.hasVersion()).toBe(true);
      expect(testCoding.getVersion()).toStrictEqual(VALID_VERSION);
      expect(testCoding.hasCode()).toBe(true);
      expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
      expect(testCoding.hasDisplay()).toBe(true);
      expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
      expect(testCoding.hasUserSelected()).toBe(true);
      expect(testCoding.getUserSelected()).toBe(VALID_BOOLEAN_TRUE);

      expect(testCoding.toJSON()).toEqual(VALID_JSON);
    });

    it('should return Coding for valid json', () => {
      const testType: Coding | undefined = Coding.parse(VALID_JSON);

      expect(testType).toBeDefined();
      expect(testType).toBeInstanceOf(Coding);
      expect(testType?.constructor.name).toStrictEqual('Coding');
      expect(testType?.fhirType()).toStrictEqual('Coding');
      expect(testType?.isEmpty()).toBe(false);
      expect(testType?.isComplexDataType()).toBe(true);
      expect(testType?.toJSON()).toEqual(VALID_JSON);
    });
  });
});
