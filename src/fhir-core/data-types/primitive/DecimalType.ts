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
import { fhirDecimal, fhirDecimalSchema, parseFhirPrimitiveData } from './primitive-types';

/**
 * Decimal Class
 *
 * @remarks
 * Base StructureDefinition for decimal Type: A rational number with implicit precision
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type decimal
 * - **Definition:** A rational number with implicit precision
 * - **Comment:** Do not use an IEEE type floating point type, instead use something that works like a true decimal, with inbuilt precision (e.g. Java BigInteger)
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR decimal](http://hl7.org/fhir/StructureDefinition/decimal)
 */
export class DecimalType extends PrimitiveType<fhirDecimal> {
  /**
   * @param value - the value of the primitive `fhirDecimal`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirDecimal) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirDecimal): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirDecimal): string {
    return parseFhirPrimitiveData(value, fhirDecimalSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirDecimal {
    return parseFhirPrimitiveData(value, fhirDecimalSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'decimal';
  }

  public override isNumberPrimitive(): boolean {
    return true;
  }

  public override copy(): DecimalType {
    const dest = new DecimalType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: DecimalType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirDecimal | undefined): void {
    if (isDefined<fhirDecimal>(value)) {
      super.setValue(parseFhirPrimitiveData(value, fhirDecimalSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for DecimalType (${String(value)})`;
  }
}
