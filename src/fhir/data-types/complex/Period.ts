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

export class Period extends DataType implements IBase {
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
   */
  // @Child(name = "start", type = { DateTimeType.class }, order = 0, min = 0, max = 1, modifier = false, summary = true)
  // @Description(shortDefinition = "Starting time with inclusive boundary", formalDefinition = "The start of the period. The boundary is inclusive.")
  protected start: DateTimeType | undefined;

  /**
   * The end of the period. If the end of the period is missing, it means no end
   * was known or planned at the time the instance was created. The start may be
   * in the past, and the end date in the future, which means that period is
   * expected/planned to end at that time.
   */
  // @Child(name = "end", type = { DateTimeType.class }, order = 1, min = 0, max = 1, modifier = false, summary = true)
  // @Description(shortDefinition = "End time with inclusive boundary, if not ongoing", formalDefinition = "The end of the period. If the end of the period is missing, it means no end was known or planned at the time the instance was created. The start may be in the past, and the end date in the future, which means that period is expected/planned to end at that time.")
  protected end: DateTimeType | undefined;

  public getStartElement(): DateTimeType | undefined {
    return this.start;
  }

  public setStartElement(element: DateTimeType | undefined): this {
    this.start = element;
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
    return this;
  }

  public hasStartElement(): boolean {
    return this.start !== undefined && !this.start.isEmpty();
  }

  public getStart(): fhirDateTime | undefined {
    return this.start?.getValue();
  }

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

  public hasStart(): boolean {
    return this.hasStartElement();
  }

  public getEndElement(): DateTimeType | undefined {
    return this.end;
  }

  public setEndElement(element: DateTimeType | undefined): this {
    this.end = element;
    if (!this.validateStartBeforeEnd()) {
      throw new TypeError('Invalid Period; Period.start is not before or the same as Period.end');
    }
    return this;
  }

  public hasEndElement(): boolean {
    return this.end !== undefined && !this.end.isEmpty();
  }

  public getEnd(): fhirDateTime | undefined {
    return this.end?.getValue();
  }

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

  public hasEnd(): boolean {
    return this.hasEndElement();
  }

  public override fhirType(): string {
    return 'Period';
  }

  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.start, this.end);
  }

  public override copy(): Period {
    const dest = new Period();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: Period): void {
    super.copyValues(dest);
    dest.start = this.start?.copy();
    dest.end = this.end?.copy();
  }

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
