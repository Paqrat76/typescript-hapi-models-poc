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

import { DateTime } from 'luxon';
import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import {
  DateTimeOpts,
  getDateTimeObject,
  getDateTimeObjectAsUTC,
  getValueAsDateOnly,
  getValueAsDateTime,
  getValueAsInstant,
  getValueAsYear,
  getValueAsYearMonth,
} from '@src/fhir-core/utility/date-time-util';
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { DateTimeTypeImpl, fhirDateTime, fhirDateTimeSchema, parseFhirPrimitiveData } from './primitive-types';

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
export class DateTimeType extends PrimitiveType<fhirDateTime> implements DateTimeTypeImpl {
  /**
   * @param value - the value of the primitive `fhirDateTime`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirDateTime) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirDateTime): this {
    this.assignValue(value);
    return this;
  }

  public getValueAsDateTime(opts?: DateTimeOpts): DateTime | undefined {
    const currValue = this.getValue();
    return getDateTimeObject(currValue, opts);
  }

  public getValueAsDateTimeUTC(): DateTime | undefined {
    const currValue = this.getValue();
    return getDateTimeObjectAsUTC(currValue);
  }

  public setValueAsYear(dt: DateTime | undefined): this {
    const newValue = getValueAsYear(dt);
    this.assignValue(newValue);
    return this;
  }

  public setValueAsYearMonth(dt: DateTime | undefined): this {
    const newValue = getValueAsYearMonth(dt);
    this.assignValue(newValue);
    return this;
  }

  public setValueAsDateOnly(dt: DateTime | undefined): this {
    const newValue = getValueAsDateOnly(dt);
    this.assignValue(newValue);
    return this;
  }

  public setValueAsDateTime(dt: DateTime | undefined): this {
    const newValue = getValueAsDateTime(dt);
    this.assignValue(newValue);
    return this;
  }

  public setValueAsInstant(dt: DateTime | undefined): this {
    const newValue = getValueAsInstant(dt);
    this.assignValue(newValue);
    return this;
  }

  public encodeToString(value: fhirDateTime): string {
    return parseFhirPrimitiveData(value, fhirDateTimeSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirDateTime {
    return parseFhirPrimitiveData(value, fhirDateTimeSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'dateTime';
  }

  public override isDateTimePrimitive(): boolean {
    return true;
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
    if (isDefined<fhirDateTime>(value)) {
      super.setValue(parseFhirPrimitiveData(value, fhirDateTimeSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for DateTimeType (${String(value)})`;
  }
}
