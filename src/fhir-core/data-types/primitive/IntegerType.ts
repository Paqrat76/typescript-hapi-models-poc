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
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { fhirInteger, fhirIntegerSchema, parseFhirPrimitiveData } from './primitive-types';

/**
 * Integer Class
 *
 * @remarks
 * Base StructureDefinition for integer Type: A whole number
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type integer
 * - **Definition:** A whole number
 * - **Comment:** 32 bit number; for values larger than this, use decimal
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR integer](http://hl7.org/fhir/StructureDefinition/integer)
 */
export class IntegerType extends PrimitiveType<fhirInteger> {
  /**
   * @param value - the value of the primitive `fhirInteger`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirInteger) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirInteger): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirInteger): string {
    return parseFhirPrimitiveData(value, fhirIntegerSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirInteger {
    return parseFhirPrimitiveData(value, fhirIntegerSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'integer';
  }

  public override isNumberPrimitive(): boolean {
    return true;
  }

  public override copy(): IntegerType {
    const dest = new IntegerType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: IntegerType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirInteger | undefined): void {
    if (isDefined<fhirInteger | undefined>(value)) {
      super.setValue(parseFhirPrimitiveData(value, fhirIntegerSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for IntegerType (${String(value)})`;
  }
}
