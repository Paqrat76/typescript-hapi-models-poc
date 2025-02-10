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

import { Extension, PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
//import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { MockCodeEnum } from '../../../test-utils';

describe('EnumCodeType', () => {
  const VALID_CODE = `generated`;
  const VALID_CODE_2 = `additional`;
  const INVALID_CODE = ' invalid CodeType ';
  const UNDEFINED_CODE = undefined;

  it('should be properly instantiated with a fhirCode', () => {
    const testEnumCodeType = new EnumCodeType(VALID_CODE, new MockCodeEnum());
    expect(testEnumCodeType).toBeDefined();
    expect(testEnumCodeType).toBeInstanceOf(EnumCodeType);
    expect(testEnumCodeType).toBeInstanceOf(CodeType);
    expect(testEnumCodeType).toBeInstanceOf(PrimitiveType);
    expect(testEnumCodeType.constructor.name).toStrictEqual('EnumCodeType');
    expect(testEnumCodeType.enumSource()).toStrictEqual('MockCodeEnum');
    expect(testEnumCodeType.fhirType()).toStrictEqual('code');
    expect(testEnumCodeType.isEmpty()).toBe(false);
    expect(testEnumCodeType.isPrimitive()).toBe(true);
    expect(testEnumCodeType.isStringPrimitive()).toBe(true);
    expect(testEnumCodeType.toJSON()).toStrictEqual(VALID_CODE);

    // inherited properties from Element
    expect(testEnumCodeType.hasId()).toBe(false);
    expect(testEnumCodeType.getId()).toBeUndefined();
    expect(testEnumCodeType.hasExtension()).toBe(false);
    expect(testEnumCodeType.getExtension()).toEqual([] as Extension[]);

    // primitive value properties
    expect(testEnumCodeType.hasValue()).toBe(true);
    expect(testEnumCodeType.getValue()).toStrictEqual(VALID_CODE);
    expect(testEnumCodeType.getValueAsString()).toStrictEqual(VALID_CODE);

    expect(testEnumCodeType.fhirCodeEnumeration).toHaveLength(4);
    const expectedEnums = [
      MockCodeEnum.GENERATED,
      MockCodeEnum.EXTENSIONS,
      MockCodeEnum.ADDITIONAL,
      MockCodeEnum.EMPTY,
    ];
    expect(testEnumCodeType.fhirCodeEnumeration).toEqual(expect.arrayContaining(expectedEnums));
    expect(testEnumCodeType.fhirCode).toEqual(MockCodeEnum.GENERATED);
  });

  it('should be properly instantiated with a CodeType', () => {
    const testEnumCodeType = new EnumCodeType(new CodeType(VALID_CODE_2), new MockCodeEnum());
    expect(testEnumCodeType).toBeDefined();
    expect(testEnumCodeType).toBeInstanceOf(EnumCodeType);
    expect(testEnumCodeType).toBeInstanceOf(CodeType);
    expect(testEnumCodeType).toBeInstanceOf(PrimitiveType);
    expect(testEnumCodeType.constructor.name).toStrictEqual('EnumCodeType');
    expect(testEnumCodeType.enumSource()).toStrictEqual('MockCodeEnum');
    expect(testEnumCodeType.fhirType()).toStrictEqual('code');
    expect(testEnumCodeType.isEmpty()).toBe(false);
    expect(testEnumCodeType.isPrimitive()).toBe(true);
    expect(testEnumCodeType.isStringPrimitive()).toBe(true);
    expect(testEnumCodeType.toJSON()).toStrictEqual(VALID_CODE_2);

    // inherited properties from Element
    expect(testEnumCodeType.hasId()).toBe(false);
    expect(testEnumCodeType.getId()).toBeUndefined();
    expect(testEnumCodeType.hasExtension()).toBe(false);
    expect(testEnumCodeType.getExtension()).toEqual([] as Extension[]);

    // primitive value properties
    expect(testEnumCodeType.hasValue()).toBe(true);
    expect(testEnumCodeType.getValue()).toStrictEqual(VALID_CODE_2);
    expect(testEnumCodeType.getValueAsString()).toStrictEqual(VALID_CODE_2);

    expect(testEnumCodeType.fhirCodeEnumeration).toHaveLength(4);
    const expectedEnums = [
      MockCodeEnum.GENERATED,
      MockCodeEnum.EXTENSIONS,
      MockCodeEnum.ADDITIONAL,
      MockCodeEnum.EMPTY,
    ];
    expect(testEnumCodeType.fhirCodeEnumeration).toEqual(expect.arrayContaining(expectedEnums));
    expect(testEnumCodeType.fhirCode).toEqual(MockCodeEnum.ADDITIONAL);
  });

  it('should be properly instantiated with a CodeType having both id and extension', () => {
    const codeType = new CodeType(VALID_CODE_2);
    codeType.setId('id1234');
    const testExtension = new Extension('testUrl', new StringType('extension string value'));
    codeType.addExtension(testExtension);

    const testEnumCodeType = new EnumCodeType(codeType, new MockCodeEnum());
    expect(testEnumCodeType).toBeDefined();
    expect(testEnumCodeType).toBeInstanceOf(EnumCodeType);
    expect(testEnumCodeType).toBeInstanceOf(CodeType);
    expect(testEnumCodeType).toBeInstanceOf(PrimitiveType);
    expect(testEnumCodeType.constructor.name).toStrictEqual('EnumCodeType');
    expect(testEnumCodeType.enumSource()).toStrictEqual('MockCodeEnum');
    expect(testEnumCodeType.fhirType()).toStrictEqual('code');
    expect(testEnumCodeType.isEmpty()).toBe(false);
    expect(testEnumCodeType.isPrimitive()).toBe(true);
    expect(testEnumCodeType.isStringPrimitive()).toBe(true);
    expect(testEnumCodeType.toJSON()).toStrictEqual(VALID_CODE_2);
    expect(testEnumCodeType.toSiblingJSON()).toEqual({
      id: 'id1234',
      extension: [
        {
          url: 'testUrl',
          valueString: 'extension string value',
        },
      ],
    });

    // inherited properties from Element
    expect(testEnumCodeType.hasId()).toBe(true);
    expect(testEnumCodeType.getId()).toStrictEqual('id1234');
    expect(testEnumCodeType.hasExtension()).toBe(true);
    expect(testEnumCodeType.getExtension()).toEqual([testExtension]);

    // primitive value properties
    expect(testEnumCodeType.hasValue()).toBe(true);
    expect(testEnumCodeType.getValue()).toStrictEqual(VALID_CODE_2);
    expect(testEnumCodeType.getValueAsString()).toStrictEqual(VALID_CODE_2);

    expect(testEnumCodeType.fhirCodeEnumeration).toHaveLength(4);
    const expectedEnums = [
      MockCodeEnum.GENERATED,
      MockCodeEnum.EXTENSIONS,
      MockCodeEnum.ADDITIONAL,
      MockCodeEnum.EMPTY,
    ];
    expect(testEnumCodeType.fhirCodeEnumeration).toEqual(expect.arrayContaining(expectedEnums));
    expect(testEnumCodeType.fhirCode).toEqual(MockCodeEnum.ADDITIONAL);
  });

  it('should throw PrimitiveTypeError from super constructor when initialized with invalid value', () => {
    const t = () => {
      new EnumCodeType(INVALID_CODE, new MockCodeEnum());
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });

  it('should throw InvalidCodeError from super constructor when initialized with empty CodeType', () => {
    const t = () => {
      new EnumCodeType(new CodeType(), new MockCodeEnum());
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`The provided 'code' value is undefined`);
  });

  it('should be properly reset by setValue()', () => {
    const testEnumCodeType = new EnumCodeType(VALID_CODE, new MockCodeEnum());
    expect(testEnumCodeType.isEmpty()).toBe(false);
    expect(testEnumCodeType.hasValue()).toBe(true);
    expect(testEnumCodeType.getValue()).toBeDefined();
    expect(testEnumCodeType.getValue()).toStrictEqual(VALID_CODE);
    expect(testEnumCodeType.getValueAsString()).toStrictEqual(VALID_CODE);
    expect(testEnumCodeType.fhirCode).toEqual(MockCodeEnum.GENERATED);

    testEnumCodeType.setValue(VALID_CODE_2);
    expect(testEnumCodeType.isEmpty()).toBe(false);
    expect(testEnumCodeType.hasValue()).toBe(true);
    expect(testEnumCodeType.getValue()).toBeDefined();
    expect(testEnumCodeType.getValue()).toStrictEqual(VALID_CODE_2);
    expect(testEnumCodeType.getValueAsString()).toStrictEqual(VALID_CODE_2);
    expect(testEnumCodeType.fhirCode).toEqual(MockCodeEnum.ADDITIONAL);

    let t = () => {
      testEnumCodeType.setValue(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType ( invalid CodeType )`);

    t = () => {
      testEnumCodeType.setValue(UNDEFINED_CODE);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`The provided 'code' value is undefined`);
  });

  it('should properly copy()', () => {
    const enumCodeType = new EnumCodeType(VALID_CODE, new MockCodeEnum());
    const testEnumCodeType = enumCodeType.copy();

    expect(testEnumCodeType).toBeDefined();
    expect(testEnumCodeType).toBeInstanceOf(EnumCodeType);
    expect(testEnumCodeType).toBeInstanceOf(CodeType);
    expect(testEnumCodeType).toBeInstanceOf(PrimitiveType);
    expect(testEnumCodeType.constructor.name).toStrictEqual('EnumCodeType');
    expect(testEnumCodeType.enumSource()).toStrictEqual('MockCodeEnum');
    expect(testEnumCodeType.fhirType()).toStrictEqual('code');
    expect(testEnumCodeType.isEmpty()).toBe(false);
    expect(testEnumCodeType.isPrimitive()).toBe(true);
    expect(testEnumCodeType.isStringPrimitive()).toBe(true);
    expect(testEnumCodeType.toJSON()).toStrictEqual(VALID_CODE);

    // inherited properties from Element
    expect(testEnumCodeType.hasId()).toBe(false);
    expect(testEnumCodeType.getId()).toBeUndefined();
    expect(testEnumCodeType.hasExtension()).toBe(false);
    expect(testEnumCodeType.getExtension()).toEqual([] as Extension[]);

    // primitive value properties
    expect(testEnumCodeType.hasValue()).toBe(true);
    expect(testEnumCodeType.getValue()).toStrictEqual(VALID_CODE);
    expect(testEnumCodeType.getValueAsString()).toStrictEqual(VALID_CODE);

    expect(testEnumCodeType.fhirCodeEnumeration).toHaveLength(4);
    const expectedEnums = [
      MockCodeEnum.GENERATED,
      MockCodeEnum.EXTENSIONS,
      MockCodeEnum.ADDITIONAL,
      MockCodeEnum.EMPTY,
    ];
    expect(testEnumCodeType.fhirCodeEnumeration).toEqual(expect.arrayContaining(expectedEnums));
    expect(testEnumCodeType.fhirCode).toEqual(MockCodeEnum.GENERATED);
  });
});
