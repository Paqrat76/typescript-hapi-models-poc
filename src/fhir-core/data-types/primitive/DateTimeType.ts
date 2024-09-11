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
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { fhirDateTime, fhirDateTimeSchema } from './primitive-types';

/**
 * DateTime Class
 *
 * @remarks
 * Base StructureDefinition for dateTime Type: A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a time zone SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored. Dates SHALL be valid dates.
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type dateTime
 * - **Definition:** A date, date-time or partial date (e.g. just year or year + month).  If hours and minutes are specified, a time zone SHALL be populated. The format is a union of the schema types gYear, gYearMonth, date and dateTime. Seconds must be provided due to schema type constraints but may be zero-filled and may be ignored. Dates SHALL be valid dates.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR dateTime](http://hl7.org/fhir/StructureDefinition/dateTime)
 */
export class DateTimeType extends PrimitiveType<fhirDateTime> {
  /**
   * @param value - the value of the primitive `fhirDateTime`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirDateTime) {
    super();
    this.assignValue(value);
  }

  /**
   * Parses the provided value and returns the desired FHIR primitive value.
   *
   * @param value - value to be parsed
   * @param errMessage - optional error message to override the default
   * @returns the FHIR primitive value
   * @throws PrimitiveTypeError for invalid value
   */
  static parse(value: string, errMessage?: string): fhirDateTime {
    const parseResult = fhirDateTimeSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      const errMsg = errMessage ?? `Invalid value for DateTimeType (${String(value)})`;
      throw new PrimitiveTypeError(errMsg, parseResult.error);
    }
  }

  public override setValue(value?: fhirDateTime): this {
    this.assignValue(value);
    return this;
  }

  public encodeToString(value: fhirDateTime): string {
    return DateTimeType.parse(value).toString();
  }

  public parseToPrimitive(value: string): fhirDateTime {
    return DateTimeType.parse(value);
  }

  public override fhirType(): string {
    return 'dateTime';
  }

  public override copy(): DateTimeType {
    const dest = new DateTimeType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: DateTimeType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirDateTime | undefined): void {
    if (value !== undefined) {
      super.setValue(DateTimeType.parse(value));
    } else {
      super.setValue(undefined);
    }
  }
}
