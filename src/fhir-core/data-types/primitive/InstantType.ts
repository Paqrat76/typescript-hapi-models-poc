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
import {
  DateTimeOpts,
  getDateTimeObject,
  getDateTimeObjectAsUTC,
  getValueAsInstant,
} from '@src/fhir-core/utility/date-time-util';
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { DateTime } from 'luxon';
import { fhirInstant, fhirInstantSchema, InstantTypeImpl, parseFhirPrimitiveData } from './primitive-types';

/**
 * Instant Class
 *
 * @remarks
 * Base StructureDefinition for instant Type: An instant in time - known at least to the second
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type instant
 * - **Definition:** An instant in time - known at least to the second
 * - **Comment:** This is intended for where precisely observed times are required, typically system logs etc., and not human-reported times - for them, see date and dateTime (which can be as precise as instant, but is not required to be) below. Time zone is always required
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR instant](http://hl7.org/fhir/StructureDefinition/instant)
 */
export class InstantType extends PrimitiveType<fhirInstant> implements InstantTypeImpl {
  /**
   * @param value - the value of the primitive `fhirInstant`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirInstant) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirInstant): this {
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

  public setValueAsInstant(dt: DateTime | undefined): this {
    const newValue = getValueAsInstant(dt);
    this.assignValue(newValue);
    return this;
  }

  public encodeToString(value: fhirInstant): string {
    return parseFhirPrimitiveData(value, fhirInstantSchema, this.typeErrorMessage(value)).toString();
  }

  public parseToPrimitive(value: string): fhirInstant {
    return parseFhirPrimitiveData(value, fhirInstantSchema, this.typeErrorMessage(value));
  }

  public override fhirType(): string {
    return 'instant';
  }

  public override isDateTimePrimitive(): boolean {
    return true;
  }

  public override copy(): InstantType {
    const dest = new InstantType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: InstantType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirInstant | undefined): void {
    if (isDefined<fhirInstant>(value)) {
      super.setValue(parseFhirPrimitiveData(value, fhirInstantSchema, this.typeErrorMessage(value)));
    } else {
      super.setValue(undefined);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private typeErrorMessage(value: any): string {
    return `Invalid value for InstantType (${String(value)})`;
  }
}
