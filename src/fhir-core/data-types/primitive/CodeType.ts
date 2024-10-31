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

import { IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { fhirCode, fhirCodeSchema, parseFhirPrimitiveData } from './primitive-types';
import { Class } from '@src/fhir-core/utility/type-guards';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

/**
 * This module contains the CodeType and EnumCodeType classes along with the related assertEnumCodeType()
 * function.
 *
 * @privateRemarks
 * The assertEnumCodeType() function contains a reference to the EnumCodeType data model that results
 * in a circular reference when it was in the core-fhir-models.ts module. Therefore, it was moved into
 * this module.
 *
 * @module
 */

/**
 * Code Class
 *
 * @remarks
 * Base StructureDefinition for code type: A string which has at least one character and no leading or trailing whitespace and where there is no whitespace other than single spaces in the contents
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type code
 * - **Definition:** A string which has at least one character and no leading or trailing whitespace and where there is no whitespace other than single spaces in the contents
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR code](http://hl7.org/fhir/StructureDefinition/code)
 */
export class CodeType extends PrimitiveType<fhirCode> {
  /**
   * @param value - the value of the primitive `fhirCode`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirCode) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirCode): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirCode): string {
    return parseFhirPrimitiveData(value, fhirCodeSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirCode {
    return parseFhirPrimitiveData(value, fhirCodeSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'code';
  }

  public override isStringPrimitive(): boolean {
    return true;
  }

  public override copy(): CodeType {
    const dest = new CodeType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: CodeType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirCode | undefined): void {
    if (value !== undefined) {
      super.setValue(parseFhirPrimitiveData(value, fhirCodeSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for CodeType (${String(value)})`;
  }
}

/**
 * EnumCode Class
 *
 * @remarks
 * Extends {@link CodeType} to include the code system enumeration and the full FHIR definition of each `code` value.
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type code
 * - **Definition:** A string which has at least one character and no leading or trailing whitespace and where there is no whitespace other than single spaces in the contents
 * - **FHIR Version:** N/A
 *
 * @category Datatypes: Primitive
 * @see [FHIR code](http://hl7.org/fhir/StructureDefinition/code)
 */
export class EnumCodeType extends CodeType {
  private codeEnum: IFhirCodeEnum;
  private fhirCodeObject: IFhirCodeDefinition;

  constructor(code: fhirCode | CodeType, codeSource: IFhirCodeEnum) {
    let fhirCode: fhirCode | undefined;
    if (code instanceof CodeType) {
      fhirCode = code.getValue();
      super(fhirCode);
      this.initElementProps(code);
    } else {
      fhirCode = code;
      super(fhirCode);
    }
    this.codeEnum = codeSource;
    // fromCode() will throw InvalidCodeError if the provided code is undefined or is unknown
    this.fhirCodeObject = this.codeEnum.fromCode(fhirCode);
  }

  private initElementProps(codeType: CodeType) {
    if (codeType.hasId()) {
      this.id = codeType.getId();
    }
    if (codeType.hasExtension()) {
      this.extension = codeType.getExtension();
    }
  }

  public enumSource(): string {
    return this.codeEnum.constructor.name;
  }

  public get fhirCodeEnumeration(): IFhirCodeDefinition[] {
    return this.codeEnum.values();
  }

  public get fhirCode(): IFhirCodeDefinition {
    return this.fhirCodeObject;
  }

  public override setValue(value?: fhirCode): this {
    super.setValue(value);
    this.fhirCodeObject = this.codeEnum.fromCode(value);
    return this;
  }

  public override isEmpty(): boolean {
    return super.isEmpty();
  }

  public override fhirType(): string {
    return 'code';
  }

  public override copy(): EnumCodeType {
    const dest = new EnumCodeType(this.fhirCode.code, this.codeEnum);
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: EnumCodeType): void {
    super.copyValues(dest);
  }
}

/**
 * EnumCodeType assertion for any EnumCodeType class
 *
 * @param type - class instance to evaluate
 * @param enumCodeType - class name for evaluation
 * @param errorMessagePrefix - optional error message prefix for the error mesage
 * @throws InvalidTypeError when EnumCodeType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertEnumCodeType<T>(
  type: unknown,
  enumCodeType: Class<T>,
  errorMessagePrefix?: string,
): asserts type is T {
  const prefix = errorMessagePrefix ? `${errorMessagePrefix}; ` : '';
  if (type instanceof EnumCodeType) {
    if (type.enumSource() !== enumCodeType.name) {
      const errMsg = `${prefix}Invalid type parameter (${type.enumSource()}); Should be ${enumCodeType.name}.`;
      throw new InvalidCodeError(errMsg);
    }
  } else {
    const errMsg = `${prefix}Provided type is not an instance of ${enumCodeType.name}.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * Returns an instance of EnumCodeType for the provided constructor arguments.
 *
 * @param code - code value expressed as EnumCodeType | CodeType | fhirCode | null
 * @param enumCodeType - code type enumeration class
 * @param typeEnum - instance of type enumeration class (allowed code values)
 * @param property - FHIR data model property (<class name>.<property name>)
 * @returns instance of EnumCodeType
 * @throws InvalidCodeError or InvalidTypeError
 *
 * @category Utilities
 */
export function constructorCodeValueAsEnumCodeType<T>(
  code: EnumCodeType | CodeType | fhirCode | null,
  enumCodeType: Class<T>,
  typeEnum: IFhirCodeEnum,
  property: string,
): EnumCodeType | null {
  let codeValue: EnumCodeType | null = null;
  if (code instanceof EnumCodeType) {
    const errMsgPrefix = `Invalid ${property}`;
    assertEnumCodeType<T>(code, enumCodeType, errMsgPrefix);
    codeValue = code;
  } else {
    try {
      if (code !== null) {
        codeValue = new EnumCodeType(code, typeEnum);
      }
    } catch (err) {
      let errMsg: string;
      if (err instanceof PrimitiveTypeError) {
        // Error from parseFhirPrimitiveData(...) in CodeType.assignValue()
        const errorCause = err.getDetails()[0];
        if (errorCause?.includes('received object')) {
          errMsg = `Invalid ${property}; Provided code value is not an instance of CodeType`;
        } else {
          errMsg = `Invalid ${property}; ${err.message}`;
        }
      } else if (err instanceof InvalidCodeError) {
        errMsg = `Invalid ${property}; ${err.message}`;
      } else {
        errMsg = `Invalid ${property}; Unexpected error`;
      }
      throw new InvalidCodeError(errMsg, err as Error);
    }
  }
  return codeValue;
}
