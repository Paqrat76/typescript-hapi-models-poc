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

import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { fhirCode, fhirCodeSchema, parseFhirPrimitiveData } from './primitive-types';

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
