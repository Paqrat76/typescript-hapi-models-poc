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

import { Narrative } from '@src/fhir/data-types/complex/Narrative';
import { DataType, Extension } from '@src/fhir/base-models/core-fhir-models';
import { EnumCodeType } from '@src/fhir/data-types/primitive/EnumCodeType';
import { CodeType } from '@src/fhir/data-types/primitive/CodeType';
import { XhtmlType } from '@src/fhir/data-types/primitive/XhtmlType';
import { NarrativeStatusEnum } from '@src/fhir/code-systems/NarrativeStatusEnum';
import { InvalidCodeError } from '@src/fhir/errors/InvalidCodeError';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

describe('Narrative', () => {
  const VALID_CODE_GENERATED = `generated`;
  const VALID_CODE_GENERATED_TYPE = new CodeType(VALID_CODE_GENERATED);
  const VALID_CODE_ADDITIONAL = `additional`;
  const VALID_CODE_ADDITIONAL_TYPE_2 = new CodeType(VALID_CODE_ADDITIONAL);
  const UNSUPPORTED_ENUM_CODE = 'unsupporedEnumCode';
  const INVALID_CODE = ' invalid CodeType ';

  const VALID_XHTML = '<div xmlns="http://www.w3.org/1999/xhtml">text</div>';
  const VALID_XHTML_TYPE = new XhtmlType(VALID_XHTML);
  const VALID_XHTML_2 = ` any\tstring\r\nlike this that passes the regex `;
  const VALID_XHTML_TYPE_2 = new XhtmlType(VALID_XHTML_2);
  const INVALID_XHTML = '';

  const UNDEFINED_VALUE = undefined;

  let narrativeStatusEnum: NarrativeStatusEnum;
  beforeAll(() => {
    narrativeStatusEnum = new NarrativeStatusEnum();
  });

  it('should be properly instantiated as empty', () => {
    const testNarrative = new Narrative();
    expect(testNarrative).toBeDefined();
    expect(testNarrative).toBeInstanceOf(DataType);
    expect(testNarrative).toBeInstanceOf(Narrative);
    expect(testNarrative.constructor.name).toStrictEqual('Narrative');
    expect(testNarrative.fhirType()).toStrictEqual('Narrative');
    expect(testNarrative.isEmpty()).toBe(true);

    // inherited properties from Element
    expect(testNarrative.hasId()).toBe(false);
    expect(testNarrative.getId()).toBeUndefined();
    expect(testNarrative.hasExtension()).toBe(false);
    expect(testNarrative.getExtension()).toMatchObject([] as Extension[]);

    // Narrative properties
    expect(testNarrative.hasStatusEnumType()).toBe(false);
    expect(testNarrative.getStatusEnumType()).toBeUndefined();
    expect(testNarrative.hasStatusElement()).toBe(false);
    expect(testNarrative.getStatusElement()).toBeUndefined();
    expect(testNarrative.hasDivElement()).toBe(false);
    expect(testNarrative.getDivElement()).toBeUndefined();
    expect(testNarrative.hasStatus()).toBe(false);
    expect(testNarrative.getStatus()).toBeUndefined();
    expect(testNarrative.hasDiv()).toBe(false);
    expect(testNarrative.getDiv()).toBeUndefined();
  });

  it('should be properly initialized by primitive values', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    expect(testNarrative).toBeDefined();
    expect(testNarrative).toBeInstanceOf(DataType);
    expect(testNarrative).toBeInstanceOf(Narrative);
    expect(testNarrative.constructor.name).toStrictEqual('Narrative');
    expect(testNarrative.fhirType()).toStrictEqual('Narrative');
    expect(testNarrative.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testNarrative.hasId()).toBe(false);
    expect(testNarrative.getId()).toBeUndefined();
    expect(testNarrative.hasExtension()).toBe(false);
    expect(testNarrative.getExtension()).toMatchObject([] as Extension[]);

    // Narrative properties
    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML));
    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
  });

  it('should be properly initialized by PrimitiveType values', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED_TYPE, VALID_XHTML_TYPE);
    expect(testNarrative).toBeDefined();
    expect(testNarrative).toBeInstanceOf(DataType);
    expect(testNarrative).toBeInstanceOf(Narrative);
    expect(testNarrative.constructor.name).toStrictEqual('Narrative');
    expect(testNarrative.fhirType()).toStrictEqual('Narrative');
    expect(testNarrative.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testNarrative.hasId()).toBe(false);
    expect(testNarrative.getId()).toBeUndefined();
    expect(testNarrative.hasExtension()).toBe(false);
    expect(testNarrative.getExtension()).toMatchObject([] as Extension[]);

    // Period properties
    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML));

    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
  });

  it('should be properly initialized by EnumCodeType and PrimitiveType values', () => {
    const enumCodeType = new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum);
    const testNarrative = new Narrative(enumCodeType, VALID_XHTML_TYPE);
    expect(testNarrative).toBeDefined();
    expect(testNarrative).toBeInstanceOf(DataType);
    expect(testNarrative).toBeInstanceOf(Narrative);
    expect(testNarrative.constructor.name).toStrictEqual('Narrative');
    expect(testNarrative.fhirType()).toStrictEqual('Narrative');
    expect(testNarrative.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testNarrative.hasId()).toBe(false);
    expect(testNarrative.getId()).toBeUndefined();
    expect(testNarrative.hasExtension()).toBe(false);
    expect(testNarrative.getExtension()).toMatchObject([] as Extension[]);

    // Period properties
    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML));

    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
  });

  it('should throw InvalidCodeError when initialized with unsupported primitive Narrative.status value', () => {
    const t = () => {
      new Narrative(UNSUPPORTED_ENUM_CODE, VALID_XHTML);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
  });

  it('should throw InvalidCodeError when initialized with unsupported PrimitiveType Narrative.status value', () => {
    const t = () => {
      new Narrative(new CodeType(UNSUPPORTED_ENUM_CODE), VALID_XHTML);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
  });

  it('should throw InvalidCodeError when initialized with unsupported EnumCodeType Narrative.status value', () => {
    const t = () => {
      new Narrative(new EnumCodeType(UNSUPPORTED_ENUM_CODE, narrativeStatusEnum), VALID_XHTML);
    };
    expect(t).toThrow(InvalidCodeError);
    expect(t).toThrow(`Unknown NarrativeStatusEnum 'code' value '${UNSUPPORTED_ENUM_CODE}'`);
  });

  it('should throw PrimitiveTypeError when initialized with invalid primitive Narrative.status value', () => {
    const t = () => {
      new Narrative(INVALID_CODE, VALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_CODE}) for CodeType`);
  });

  it('should throw PrimitiveTypeError when initialized with invalid PrimitiveType Narrative.status value', () => {
    const t = () => {
      new Narrative(new CodeType(INVALID_CODE), VALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_CODE}) for CodeType`);
  });

  it('should throw PrimitiveTypeError when initialized with invalid EnumCodeType Narrative.status value', () => {
    const t = () => {
      new Narrative(new EnumCodeType(INVALID_CODE, narrativeStatusEnum), VALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_CODE}) for CodeType`);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Narrative.status value', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    const t = () => {
      testNarrative.setStatus(INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_CODE}) for CodeType`);
  });

  it('should throw PrimitiveTypeError when reset with invalid PrimitiveType Narrative.status value', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    const t = () => {
      testNarrative.setStatusElement(new CodeType(INVALID_CODE));
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_CODE}) for CodeType`);
  });

  it('should throw PrimitiveTypeError when reset with invalid EnumCodeType Narrative.status value', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    const t = () => {
      testNarrative.setStatueEnumType(new EnumCodeType(INVALID_CODE, narrativeStatusEnum));
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value (${INVALID_CODE}) for CodeType`);
  });

  it('should throw PrimitiveTypeError when initialized with invalid primitive Narrative.div value', () => {
    const t = () => {
      new Narrative(VALID_CODE_GENERATED, INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Narrative.div (${INVALID_XHTML})`);
  });

  it('should throw PrimitiveTypeError when initialized with invalid PrimitiveType Narrative.div value', () => {
    const t = () => {
      new Narrative(VALID_CODE_GENERATED, new XhtmlType(INVALID_XHTML));
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should be properly reset by modifying Narrative.status and Narrative.div with primitive values', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    expect(testNarrative).toBeDefined();
    expect(testNarrative.isEmpty()).toBe(false);

    testNarrative.setStatus(VALID_CODE_ADDITIONAL);
    testNarrative.setDiv(VALID_XHTML_2);

    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_ADDITIONAL));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML_2));
    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML_2);
  });

  it('should be properly reset by modifying Narrative.status and Narrative.div with PrimitiveType values', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    expect(testNarrative).toBeDefined();
    expect(testNarrative.isEmpty()).toBe(false);

    testNarrative.setStatusElement(VALID_CODE_ADDITIONAL_TYPE_2);
    testNarrative.setDivElement(VALID_XHTML_TYPE_2);

    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_ADDITIONAL));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML_2));
    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML_2);
  });

  it('should be properly reset by modifying Narrative.status with EnumCodeType and Narrative.div with PrimitiveType values', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    expect(testNarrative).toBeDefined();
    expect(testNarrative.isEmpty()).toBe(false);

    testNarrative.setStatueEnumType(new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum));
    testNarrative.setDivElement(VALID_XHTML_TYPE_2);

    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_ADDITIONAL, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_ADDITIONAL));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML_2));
    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_ADDITIONAL);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML_2);
  });

  it('should throw PrimitiveTypeError when reset with invalid primitive Narrative.div value', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    const t = () => {
      testNarrative.setDiv(INVALID_XHTML);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid Narrative.div value`);
  });

  it('should throw PrimitiveTypeError when reset with invalid PrimitiveType Narrative.div value', () => {
    const testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    const t = () => {
      testNarrative.setDivElement(new XhtmlType(INVALID_XHTML));
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for XhtmlType`);
  });

  it('should be properly reset by modifying Narrative.status and Narrative.div with undefined values', () => {
    let testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    expect(testNarrative).toBeDefined();
    expect(testNarrative.isEmpty()).toBe(false);

    testNarrative.setStatus(UNDEFINED_VALUE);
    testNarrative.setDiv(UNDEFINED_VALUE);

    expect(testNarrative.isEmpty()).toBe(true);
    expect(testNarrative.hasStatusEnumType()).toBe(false);
    expect(testNarrative.getStatusEnumType()).toBeUndefined();
    expect(testNarrative.hasStatusElement()).toBe(false);
    expect(testNarrative.getStatusElement()).toBeUndefined();
    expect(testNarrative.hasDivElement()).toBe(false);
    expect(testNarrative.getDivElement()).toBeUndefined();
    expect(testNarrative.hasStatus()).toBe(false);
    expect(testNarrative.getStatus()).toBeUndefined();
    expect(testNarrative.hasDiv()).toBe(false);
    expect(testNarrative.getDiv()).toBeUndefined();

    testNarrative = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    expect(testNarrative).toBeDefined();
    expect(testNarrative.isEmpty()).toBe(false);

    testNarrative.setStatusElement(UNDEFINED_VALUE);
    testNarrative.setDivElement(UNDEFINED_VALUE);

    expect(testNarrative.isEmpty()).toBe(true);
    expect(testNarrative.hasStatusEnumType()).toBe(false);
    expect(testNarrative.getStatusEnumType()).toBeUndefined();
    expect(testNarrative.hasStatusElement()).toBe(false);
    expect(testNarrative.getStatusElement()).toBeUndefined();
    expect(testNarrative.hasDivElement()).toBe(false);
    expect(testNarrative.getDivElement()).toBeUndefined();
    expect(testNarrative.hasStatus()).toBe(false);
    expect(testNarrative.getStatus()).toBeUndefined();
    expect(testNarrative.hasDiv()).toBe(false);
    expect(testNarrative.getDiv()).toBeUndefined();
  });

  it('should properly copy()', () => {
    const narrativeType = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
    const testNarrative = narrativeType.copy();

    expect(testNarrative).toBeDefined();
    expect(testNarrative).toBeInstanceOf(DataType);
    expect(testNarrative).toBeInstanceOf(Narrative);
    expect(testNarrative.constructor.name).toStrictEqual('Narrative');
    expect(testNarrative.fhirType()).toStrictEqual('Narrative');
    expect(testNarrative.isEmpty()).toBe(false);

    // inherited properties from Element
    expect(testNarrative.hasId()).toBe(false);
    expect(testNarrative.getId()).toBeUndefined();
    expect(testNarrative.hasExtension()).toBe(false);
    expect(testNarrative.getExtension()).toMatchObject([] as Extension[]);

    // Narrative properties
    expect(testNarrative.hasStatusEnumType()).toBe(true);
    expect(testNarrative.getStatusEnumType()).toMatchObject(
      new EnumCodeType(VALID_CODE_GENERATED, narrativeStatusEnum),
    );
    expect(testNarrative.hasStatusElement()).toBe(true);
    expect(testNarrative.getStatusElement()).toMatchObject(new CodeType(VALID_CODE_GENERATED));
    expect(testNarrative.hasDivElement()).toBe(true);
    expect(testNarrative.getDivElement()).toMatchObject(new XhtmlType(VALID_XHTML));
    expect(testNarrative.hasStatus()).toBe(true);
    expect(testNarrative.getStatus()).toStrictEqual(VALID_CODE_GENERATED);
    expect(testNarrative.hasDiv()).toBe(true);
    expect(testNarrative.getDiv()).toStrictEqual(VALID_XHTML);
  });
});
