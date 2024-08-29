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

import { fhirCode } from './primitive-types';
import { CodeType } from '@src/fhir/data-types/primitive/CodeType';
import { IBaseFhirCode, IFhirCodeEnum } from '@src/fhir/base-models/core-fhir-codes';

/**
 * Extended Primitive FHIR Datatype: code
 *
 * @remarks
 * Extends {@link CodeType} to include the code system enumeration and the full FHIR definition
 * of the code value.
 *
 * @category Datatypes: Primitive
 * @see [FHIR code](https://hl7.org/fhir/R5/datatypes.html#code)
 */
export class EnumCodeType extends CodeType {
  private codeEnum: IFhirCodeEnum;
  private fhirCodeObject: IBaseFhirCode;

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

  public get fhirCodeEnumeration(): IBaseFhirCode[] {
    return this.codeEnum.values();
  }

  public get fhirCode(): IBaseFhirCode {
    return this.fhirCodeObject;
  }

  public override setValue(value?: fhirCode): this {
    super.setValue(value);
    this.fhirCodeObject = this.codeEnum.fromCode(value);
    return this;
  }

  public override isEmpty(): boolean {
    return super.isEmpty() && this.codeEnum.values().length === 0;
  }

  public override fhirType(): string {
    return 'code';
  }

  public override copy(): EnumCodeType {
    const dest = new EnumCodeType(this.fhirCode.code, this.codeEnum);
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: EnumCodeType): void {
    super.copyValues(dest);
  }
}
