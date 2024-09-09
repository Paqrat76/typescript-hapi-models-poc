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

import { fhirDate, fhirDateSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

/**
 * Date Class
 *
 * @remarks
 * Base StructureDefinition for date Type: A date or partial date (e.g. just year or year + month). There is no time zone. The format is a union of the schema types gYear, gYearMonth and date. Dates SHALL be valid dates.
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type date
 * - **Definition:** A date or partial date (e.g. just year or year + month). There is no time zone. The format is a union of the schema types gYear, gYearMonth and date. Dates SHALL be valid dates.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR date](http://hl7.org/fhir/StructureDefinition/date)
 */
export class DateType extends PrimitiveType<fhirDate> {
  /**
   * @param value - the value of the primitive `fhirDate`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirDate) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirDate): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirDate): string {
    const parseResult = fhirDateSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for DateType`, parseResult.error);
    }
  }

  public parse(value: string): fhirDate {
    const parseResult = fhirDateSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for DateType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'date';
  }

  public override copy(): DateType {
    const dest = new DateType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: DateType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirDate | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirDateSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value (${value}) for DateType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}