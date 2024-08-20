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

import { fhirDateTime, fhirDateTimeSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive type "dateTime" in FHIR:
 */
export class DateTimeType extends PrimitiveType<fhirDateTime> {
  constructor(value?: fhirDateTime) {
    super();
    this.setValue(value);
  }

  public override setValue(value?: fhirDateTime): this {
    if (value !== undefined) {
      const parseResult = fhirDateTimeSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value (${value}) for DateTimeType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
    return this;
  }

  public encode(value: fhirDateTime): string {
    const parseResult = fhirDateTimeSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for DateTimeType`, parseResult.error);
    }
  }

  public parse(value: string): fhirDateTime {
    const parseResult = fhirDateTimeSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for DateTimeType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'dateTime';
  }

  public override copy(): DateTimeType {
    const dest = new DateTimeType();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: DateTimeType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }
}
