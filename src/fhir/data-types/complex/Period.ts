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
import { DataType } from '@src/fhir/base-models/core-fhir-models';
import { IBase } from '@src/fhir/base-models/IBase';
import { DateTimeType } from '@src/fhir/data-types/primitive/DateTimeType';
import { fhirDateTime, fhirDateTimeSchema } from '@src/fhir/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir/utility/element-util';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Complex FHIR Datatype: Period
 *
 * @remarks
 * A time period defined by a start and end date/time.
 *
 * A period specifies a range of times. The context of use will specify whether the entire range applies (e.g. "the patient was an inpatient of the hospital for this time range") or one value from the period applies (e.g. "give to the patient between 2 and 4 pm on 24-Jun 2013").
 *
 * If the start element is missing, the start of the period is not known. If the end element is missing, it means that the period is ongoing. Alternatively, this may be represented by having an explicit end in the future, in which case this means the period is expected/planned to end at the specified time.
 *
 * The end value includes any matching date/time. For example, the period 2011-05-23 to 2011-05-27 includes all the times from the start of the 23rd May through to the end of the 27th of May.
 *
 * @category Datatypes: Complex
 * @see [FHIR Period](https://hl7.org/fhir/R5/datatypes.html#period)
 */
export class Period extends DataType implements IBase {
  /**
   * @param start - Starting dateTime with inclusive boundary
   * @param end - End dateTime with inclusive boundary, if not ongoing
   */
  constructor(start?: DateTimeType | fhirDateTime, end?: DateTimeType | fhirDateTime) {
    super();
    if (start) {
      if (start instanceof DateTimeType) {
        this.start = start;
      } else {
        const parseResult = fhirDateTimeSchema.safeParse(start);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Period.start (${start})`, parseResult.error);
        }
        this.start = new DateTimeType(parseResult.data);
      }
    }
    if (end) {
      if (end instanceof DateTimeType) {
        this.end = end;
      } else {
        const parseResult = fhirDateTimeSchema.safeParse(end);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Period.end (${end})`, parseResult.error);
        }
        this.end = new DateTimeType(parseResult.data);
      }
    }
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
  }

  /**
   * The start of the period. The boundary is inclusive.
   *
   * @remarks
   * If the start element is missing, the meaning is that the low boundary is not known.
   */
  protected start: DateTimeType | undefined;

  /**
   * The end of the Period with inclusive boundary, if not ongoing.
   *
   * @remarks
   * The end of the period. If the end of the period is missing, it means no end
   * was known or planned at the time the instance was created. The start may be
   * in the past, and the end date in the future, which means that period is
   * expected/planned to end at that time.
   *
   * If the end of the period is missing, it means that the period is ongoing.
   */
  protected end: DateTimeType | undefined;

  /**
   * @returns the `start` property value as a PrimitiveType
   */
  public getStartElement(): DateTimeType | undefined {
    return this.start;
  }

  /**
   * Assigns the provided PrimitiveType value to the `start` property.
   *
   * @param element - the `start` value
   * @returns this
   */
  public setStartElement(element: DateTimeType | undefined): this {
    this.start = element;
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
    return this;
  }

  /**
   * @returns `true` if the `start` property exists and has a value; `false` otherwise
   */
  public hasStartElement(): boolean {
    return this.start !== undefined && !this.start.isEmpty();
  }

  /**
   * @returns the `start` property value as a primitive value
   */
  public getStart(): fhirDateTime | undefined {
    return this.start?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `start` property.
   *
   * @param value - the `start` value
   * @returns this
   */
  public setStart(value: fhirDateTime | undefined): this {
    if (!value) {
      this.start = undefined;
    } else {
      const parseResult = fhirDateTimeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Period.start (${value})`, parseResult.error);
      }
      this.start = new DateTimeType(parseResult.data);
    }
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
    return this;
  }

  /**
   * @returns `true` if the `start` property exists and has a value; `false` otherwise
   */
  public hasStart(): boolean {
    return this.hasStartElement();
  }

  /**
   * @returns the `end` property value as a PrimitiveType
   */
  public getEndElement(): DateTimeType | undefined {
    return this.end;
  }

  /**
   * Assigns the provided PrimitiveType value to the `end` property.
   *
   * @param element - the `end` value
   * @returns this
   */
  public setEndElement(element: DateTimeType | undefined): this {
    this.end = element;
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
    return this;
  }

  /**
   * @returns `true` if the `end` property exists and has a value; `false` otherwise
   */
  public hasEndElement(): boolean {
    return this.end !== undefined && !this.end.isEmpty();
  }

  /**
   * @returns the `end` property value as a primitive value
   */
  public getEnd(): fhirDateTime | undefined {
    return this.end?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `end` property.
   *
   * @param value - the `end` value
   * @returns this
   */
  public setEnd(value: fhirDateTime | undefined): this {
    if (!value) {
      this.end = undefined;
    } else {
      const parseResult = fhirDateTimeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Period.end (${value})`, parseResult.error);
      }
      this.end = new DateTimeType(parseResult.data);
    }
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
    return this;
  }

  /**
   * @returns `true` if the `end` property exists and has a value; `false` otherwise
   */
  public hasEnd(): boolean {
    return this.hasEndElement();
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'Period';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.start, this.end);
  }

  /**
   * {@inheritDoc DataType.copy}
   */
  public override copy(): Period {
    const dest = new Period();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Element.copyValues}
   */
  public override copyValues(dest: Period): void {
    super.copyValues(dest);
    dest.start = this.start?.copy();
    dest.end = this.end?.copy();
  }

  /**
   * Validates that the `start` property value is less than or equal to `end` property value.
   *
   * @remarks
   * If either the `start` property or the `end` property is `undefined`, the validate return `true`.
   *
   * @returns `true` if `start` is less than or equal to `end`; `false` otherwise
   * @private
   */
  private validateStartBeforeEnd(): boolean {
    if (this.start === undefined || this.start.isEmpty() || this.end === undefined || this.end.isEmpty()) {
      // Return true if start and/or end do not exist.
      // Return a real validation result only if both start AND end exist!
      return true;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const startDateTime = DateTime.fromISO(this.getStart()!);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const endDateTime = DateTime.fromISO(this.getEnd()!);
    return startDateTime <= endDateTime;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns */
