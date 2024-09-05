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

import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { DataType, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

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
  const INVALID_STRING = '';

  const VALID_BOOLEAN_TYPE_FALSE = new BooleanType(false);
  const INVALID_BOOLEAN = 'invalidBoolean';
  const UNDEFINED_VALUE = undefined;

  it('should be properly instantiated as empty', () => {
    const testCoding = new Coding();
    expect(testCoding).toBeDefined();
    expect(testCoding).toBeInstanceOf(DataType);
    expect(testCoding).toBeInstanceOf(Coding);
    expect(testCoding.constructor.name).toStrictEqual('Coding');
    expect(testCoding.fhirType()).toStrictEqual('Coding');
    expect(testCoding.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCoding.hasId()).toBe(false);
    expect(testCoding.getId()).toBeUndefined();
    expect(testCoding.hasExtension()).toBe(false);
    expect(testCoding.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testCoding.hasSystemElement()).toBe(false);
    expect(testCoding.getSystemElement()).toMatchObject(new UriType());
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(false);
    expect(testCoding.getCodeElement()).toMatchObject(new CodeType());
    expect(testCoding.hasDisplayElement()).toBe(false);
    expect(testCoding.getDisplayElement()).toMatchObject(new StringType());
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

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
    let testCoding = codingType.copy();

    expect(testCoding).toBeDefined();
    expect(testCoding).toBeInstanceOf(DataType);
    expect(testCoding).toBeInstanceOf(Coding);
    expect(testCoding.constructor.name).toStrictEqual('Coding');
    expect(testCoding.fhirType()).toStrictEqual('Coding');
    expect(testCoding.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testCoding.hasId()).toBe(false);
    expect(testCoding.getId()).toBeUndefined();
    expect(testCoding.hasExtension()).toBe(false);
    expect(testCoding.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testCoding.hasSystemElement()).toBe(true);
    expect(testCoding.getSystemElement()).toMatchObject(new UriType(VALID_URI));
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(true);
    expect(testCoding.getCodeElement()).toMatchObject(new CodeType(VALID_CODE));
    expect(testCoding.hasDisplayElement()).toBe(true);
    expect(testCoding.getDisplayElement()).toMatchObject(new StringType(VALID_STRING));
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

    expect(testCoding.hasSystem()).toBe(true);
    expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
    expect(testCoding.hasVersion()).toBe(false);
    expect(testCoding.getVersion()).toBeUndefined();
    expect(testCoding.hasCode()).toBe(true);
    expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
    expect(testCoding.hasDisplay()).toBe(true);
    expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
    expect(testCoding.hasUserSelected()).toBe(false);
    expect(testCoding.getUserSelected()).toBeUndefined();

    // Reset to empty

    codingType.setSystemElement(UNDEFINED_VALUE);
    codingType.setCodeElement(UNDEFINED_VALUE);
    codingType.setDisplayElement(UNDEFINED_VALUE);
    testCoding = codingType.copy();

    expect(testCoding).toBeDefined();
    expect(testCoding).toBeInstanceOf(DataType);
    expect(testCoding).toBeInstanceOf(Coding);
    expect(testCoding.constructor.name).toStrictEqual('Coding');
    expect(testCoding.fhirType()).toStrictEqual('Coding');
    expect(testCoding.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testCoding.hasId()).toBe(false);
    expect(testCoding.getId()).toBeUndefined();
    expect(testCoding.hasExtension()).toBe(false);
    expect(testCoding.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testCoding.hasSystemElement()).toBe(false);
    expect(testCoding.getSystemElement()).toMatchObject(new UriType());
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(false);
    expect(testCoding.getCodeElement()).toMatchObject(new CodeType());
    expect(testCoding.hasDisplayElement()).toBe(false);
    expect(testCoding.getDisplayElement()).toMatchObject(new StringType());
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

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
    expect(testCoding).toBeDefined();
    expect(testCoding).toBeInstanceOf(DataType);
    expect(testCoding).toBeInstanceOf(Coding);
    expect(testCoding.constructor.name).toStrictEqual('Coding');
    expect(testCoding.fhirType()).toStrictEqual('Coding');
    expect(testCoding.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testCoding.hasId()).toBe(false);
    expect(testCoding.getId()).toBeUndefined();
    expect(testCoding.hasExtension()).toBe(false);
    expect(testCoding.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testCoding.hasSystemElement()).toBe(true);
    expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(true);
    expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
    expect(testCoding.hasDisplayElement()).toBe(true);
    expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE);
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

    expect(testCoding.hasSystem()).toBe(true);
    expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
    expect(testCoding.hasVersion()).toBe(false);
    expect(testCoding.getVersion()).toBeUndefined();
    expect(testCoding.hasCode()).toBe(true);
    expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
    expect(testCoding.hasDisplay()).toBe(true);
    expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
    expect(testCoding.hasUserSelected()).toBe(false);
    expect(testCoding.getUserSelected()).toBeUndefined();
  });

  it('should be properly reset by modifying all properties with primitive values', () => {
    const testCoding = new Coding();
    testCoding.setSystem(VALID_URI);
    testCoding.setCode(VALID_CODE);
    testCoding.setDisplay(VALID_STRING);
    expect(testCoding).toBeDefined();
    expect(testCoding.isEmpty()).toBe(false);

    testCoding.setSystem(VALID_URI_2);
    testCoding.setCode(VALID_CODE_2);
    testCoding.setDisplay(VALID_STRING_2);
    testCoding.setVersion(VALID_STRING_2);
    testCoding.setUserSelected(false);

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

    testCoding.setSystem(UNDEFINED_VALUE);
    testCoding.setCode(UNDEFINED_VALUE);
    testCoding.setDisplay(UNDEFINED_VALUE);
    testCoding.setVersion(UNDEFINED_VALUE);
    testCoding.setUserSelected(UNDEFINED_VALUE);

    expect(testCoding.hasSystemElement()).toBe(false);
    expect(testCoding.getSystemElement()).toMatchObject(new UriType());
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(false);
    expect(testCoding.getCodeElement()).toMatchObject(new CodeType());
    expect(testCoding.hasDisplayElement()).toBe(false);
    expect(testCoding.getDisplayElement()).toMatchObject(new StringType());
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

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

  it('should throw PrimitiveTypeError when reset with invalid primitive Coding.system value', () => {
    const testCoding = new Coding();
    const t = () => {
      testCoding.setSystem(INVALID_URI);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Coding.system (${INVALID_URI})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Coding.version value', () => {
    const testCoding = new Coding();
    const t = () => {
      testCoding.setVersion(INVALID_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Coding.version (${INVALID_STRING})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Coding.code value', () => {
    const testCoding = new Coding();
    const t = () => {
      testCoding.setCode(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Coding.code (${INVALID_CODE})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Coding.display value', () => {
    const testCoding = new Coding();
    const t = () => {
      testCoding.setDisplay(INVALID_STRING);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Coding.display (${INVALID_STRING})`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Coding.userSelected value', () => {
    const testCoding = new Coding();
    const t = () => {
      // @ts-expect-error: allow non-boolean to test error handling
      testCoding.setUserSelected(INVALID_BOOLEAN);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Coding.userSelected (${INVALID_BOOLEAN})`);
  });

  // Tests using DataType elements

  it('should be properly instantiated with PrimitiveType values', () => {
    const testCoding = new Coding();
    testCoding.setSystemElement(VALID_URI_TYPE);
    testCoding.setCodeElement(VALID_CODE_TYPE);
    testCoding.setDisplayElement(VALID_STRING_TYPE);
    expect(testCoding).toBeDefined();
    expect(testCoding).toBeInstanceOf(DataType);
    expect(testCoding).toBeInstanceOf(Coding);
    expect(testCoding.constructor.name).toStrictEqual('Coding');
    expect(testCoding.fhirType()).toStrictEqual('Coding');
    expect(testCoding.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testCoding.hasId()).toBe(false);
    expect(testCoding.getId()).toBeUndefined();
    expect(testCoding.hasExtension()).toBe(false);
    expect(testCoding.getExtension()).toMatchObject([] as Extension[]);

    // Coding properties
    expect(testCoding.hasSystemElement()).toBe(true);
    expect(testCoding.getSystemElement()).toStrictEqual(VALID_URI_TYPE);
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(true);
    expect(testCoding.getCodeElement()).toStrictEqual(VALID_CODE_TYPE);
    expect(testCoding.hasDisplayElement()).toBe(true);
    expect(testCoding.getDisplayElement()).toStrictEqual(VALID_STRING_TYPE);
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

    expect(testCoding.hasSystem()).toBe(true);
    expect(testCoding.getSystem()).toStrictEqual(VALID_URI);
    expect(testCoding.hasVersion()).toBe(false);
    expect(testCoding.getVersion()).toBeUndefined();
    expect(testCoding.hasCode()).toBe(true);
    expect(testCoding.getCode()).toStrictEqual(VALID_CODE);
    expect(testCoding.hasDisplay()).toBe(true);
    expect(testCoding.getDisplay()).toStrictEqual(VALID_STRING);
    expect(testCoding.hasUserSelected()).toBe(false);
    expect(testCoding.getUserSelected()).toBeUndefined();
  });

  it('should be properly reset by modifying all properties with PrimitiveType values', () => {
    const testCoding = new Coding();
    testCoding.setSystemElement(VALID_URI_TYPE);
    testCoding.setCodeElement(VALID_CODE_TYPE);
    testCoding.setDisplayElement(VALID_STRING_TYPE);
    expect(testCoding).toBeDefined();
    expect(testCoding.isEmpty()).toBe(false);

    testCoding.setSystemElement(VALID_URI_TYPE_2);
    testCoding.setCodeElement(VALID_CODE_TYPE_2);
    testCoding.setDisplayElement(VALID_STRING_TYPE_2);
    testCoding.setVersionElement(VALID_STRING_TYPE_2);
    testCoding.setUserSelectedElement(VALID_BOOLEAN_TYPE_FALSE);

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

    testCoding.setSystemElement(UNDEFINED_VALUE);
    testCoding.setCodeElement(UNDEFINED_VALUE);
    testCoding.setDisplayElement(UNDEFINED_VALUE);
    testCoding.setVersionElement(UNDEFINED_VALUE);
    testCoding.setUserSelectedElement(UNDEFINED_VALUE);

    expect(testCoding.hasSystemElement()).toBe(false);
    expect(testCoding.getSystemElement()).toMatchObject(new UriType());
    expect(testCoding.hasVersionElement()).toBe(false);
    expect(testCoding.getVersionElement()).toMatchObject(new StringType());
    expect(testCoding.hasCodeElement()).toBe(false);
    expect(testCoding.getCodeElement()).toMatchObject(new CodeType());
    expect(testCoding.hasDisplayElement()).toBe(false);
    expect(testCoding.getDisplayElement()).toMatchObject(new StringType());
    expect(testCoding.hasUserSelectedElement()).toBe(false);
    expect(testCoding.getUserSelectedElement()).toMatchObject(new BooleanType());

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
});
