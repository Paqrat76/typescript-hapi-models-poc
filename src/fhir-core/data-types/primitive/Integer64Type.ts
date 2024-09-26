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
import { fhirInteger64, fhirInteger64Schema, parseFhirPrimitiveData } from './primitive-types';

/**
 * Integer64 Class
 *
 * @remarks
 * integer64 Type: A very large whole number
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type integer64
 * - **Definition:** A very large whole number
 * - **Comment:** Typically this is used for record counters (e.g. database keys)
 * - **FHIR Version:** 5.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR integer64](http://hl7.org/fhir/StructureDefinition/integer64)
 */
export class Integer64Type extends PrimitiveType<fhirInteger64> {
  /**
   * @param value - the value of the primitive `fhirInteger64`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirInteger64) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirInteger64): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirInteger64): string {
    return parseFhirPrimitiveData(value, fhirInteger64Schema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirInteger64 {
    return parseFhirPrimitiveData(value, fhirInteger64Schema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'integer64';
  }

  public override copy(): Integer64Type {
    const dest = new Integer64Type();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: Integer64Type): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirInteger64 | undefined): void {
    if (value !== undefined) {
      super.setValue(parseFhirPrimitiveData(value, fhirInteger64Schema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for Integer64Type (${String(value)})`;
  }
}
