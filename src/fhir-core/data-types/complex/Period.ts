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
import { IBase } from '@src/fhir-core/base-models/IBase';
import { DataType, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import {
  fhirDateTime,
  fhirDateTimeSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { assertFhirType, isDefined } from '@src/fhir-core/utility/type-guards';
import { FhirError } from '@src/fhir-core/errors/FhirError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Period Class
 *
 * @remarks
 * Base StructureDefinition for Period Type: A time period defined by a start and end date and optionally time.
 *
 * **FHIR Specification**
 * - **Short:** Time range defined by start and end date/time
 * - **Definition:** A time period defined by a start and end date and optionally time.
 * - **Comment:** A Period specifies a range of time; the context of use will specify whether the entire range applies (e.g. "the patient was an inpatient of the hospital for this time range") or one value from the range applies (e.g. "give to the patient between these two times"). Period is not used for a duration (a measure of elapsed time).
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Period
 *
 * @category Datatypes: Complex
 * @see [FHIR Period](http://hl7.org/fhir/StructureDefinition/Period)
 */
export class Period extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Period.start Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Starting time with inclusive boundary
   * - **Definition:** The start of the period. The boundary is inclusive.
   * - **Comment:** If the low element is missing, the meaning is that the low boundary is not known.
   * - **FHIR Type:** `dateTime`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private start: DateTimeType | undefined;

  /**
   * Period.end Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** End time with inclusive boundary, if not ongoing
   * - **Definition:**
   * - **Comment:** The high value includes any matching date/time. i.e. 2012-02-03T10:00:00 is in a period that has an end value of 2012-02-03.
   * - **FHIR Type:** `dateTime`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private end: DateTimeType | undefined;

  /**
   * @returns the `start` property value as a PrimitiveType
   */
  public getStartElement(): DateTimeType {
    return this.start ?? new DateTimeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `start` property.
   *
   * @param element - the `start` value
   * @returns this
   * @throws FhirError when Period.start > Period.end
   */
  public setStartElement(element: DateTimeType | undefined): this {
    if (isDefined<DateTimeType>(element)) {
      const optErrMsg = `Invalid Period.start; Provided element is not an instance of DateTimeType.`;
      assertFhirType<DateTimeType>(element, DateTimeType, optErrMsg);
      this.start = element;
      if (!this.validateStartBeforeEnd()) {
        throw new FhirError('Invalid Period; Period.start is not before or the same as Period.end');
      }
    } else {
      this.start = undefined;
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
   * @throws PrimitiveTypeError for invalid primitive types
   * @throws FhirError when Period.start > Period.end
   */
  public setStart(value: fhirDateTime | undefined): this {
    if (isDefined<fhirDateTime>(value)) {
      const optErrMsg = `Invalid Period.start (${String(value)})`;
      this.start = new DateTimeType(parseFhirPrimitiveData(value, fhirDateTimeSchema, optErrMsg));
      if (!this.validateStartBeforeEnd()) {
        throw new FhirError('Invalid Period; Period.start is not before or the same as Period.end');
      }
    } else {
      this.start = undefined;
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
  public getEndElement(): DateTimeType {
    return this.end ?? new DateTimeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `end` property.
   *
   * @param element - the `end` value
   * @returns this
   * @throws FhirError when Period.start > Period.end
   */
  public setEndElement(element: DateTimeType | undefined): this {
    if (isDefined<DateTimeType>(element)) {
      const optErrMsg = `Invalid Period.end; Provided element is not an instance of DateTimeType.`;
      assertFhirType<DateTimeType>(element, DateTimeType, optErrMsg);
      this.end = element;
      if (!this.validateStartBeforeEnd()) {
        throw new FhirError('Invalid Period; Period.start is not before or the same as Period.end');
      }
    } else {
      this.end = undefined;
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
   * @throws PrimitiveTypeError for invalid primitive types
   * @throws FhirError when Period.start > Period.end
   */
  public setEnd(value: fhirDateTime | undefined): this {
    if (isDefined<fhirDateTime>(value)) {
      const optErrMsg = `Invalid Period.end (${String(value)})`;
      this.end = new DateTimeType(parseFhirPrimitiveData(value, fhirDateTimeSchema, optErrMsg));
      if (!this.validateStartBeforeEnd()) {
        throw new FhirError('Invalid Period; Period.start is not before or the same as Period.end');
      }
    } else {
      this.end = undefined;
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
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Period';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.start, this.end);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Period {
    const dest = new Period();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Period): void {
    super.copyValues(dest);
    dest.start = this.start?.copy();
    dest.end = this.end?.copy();
  }

  /**
   * {@inheritDoc IBase.isComplexDataType}
   */
  public override isComplexDataType(): boolean {
    return true;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    if (this.hasStartElement()) {
      setFhirPrimitiveJson<fhirDateTime>(this.getStartElement(), 'start', jsonObj);
    }

    if (this.hasEndElement()) {
      setFhirPrimitiveJson<fhirDateTime>(this.getEndElement(), 'end', jsonObj);
    }

    return jsonObj;
  }

  /**
   * Validates that the `start` property value is less than or equal to `end` property value.
   *
   * @remarks
   * If either the `start` property or the `end` property is `undefined`, the validate return `true`.
   *
   * @returns `true` if `start` is less than or equal to `end`; `false` otherwise
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
