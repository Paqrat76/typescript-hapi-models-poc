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

import { fhirDecimal, fhirDecimalSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive FHIR Datatype: decimal
 *
 * @remarks
 * Rational numbers that have a decimal  representation. Decimals in FHIR
 * cannot have more than 18 digits and a decimal point.
 *
 * @category Datatypes: Primitive
 * @see [FHIR decimal](https://hl7.org/fhir/R5/datatypes.html#decimal)
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

  public encode(value: fhirDecimal): string {
    const parseResult = fhirDecimalSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for DecimalType`, parseResult.error);
    }
  }

  public parse(value: string): fhirDecimal {
    const valueNumber = Number.parseFloat(value);
    if (Number.isNaN(valueNumber)) {
      throw new TypeError(`Invalid value (${value}) is not a number`);
    }
    const parseResult = fhirDecimalSchema.safeParse(valueNumber);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for DecimalType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'decimal';
  }

  public override copy(): DecimalType {
    const dest = new DecimalType();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: DecimalType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }
  private assignValue(value: fhirDecimal | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirDecimalSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for DecimalType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
