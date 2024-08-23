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

import { fhirInstant, fhirInstantSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive FHIR Datatype: instant
 *
 * @remarks
 * An instant in time in the format YYYY-MM-DDThh:mm:ss.sss+zz:zz. The time
 * SHALL be specified at least to the second and SHALL include a timezone offset.
 *
 * @category Datatypes: Primitive
 * @see [FHIR instant](https://hl7.org/fhir/R5/datatypes.html#instant)
 */
export class InstantType extends PrimitiveType<fhirInstant> {
  /**
   * @param value - the value of the primitive `fhirInstant`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirInstant) {
    super();
    this.setValue(value);
  }

  public override setValue(value?: fhirInstant): this {
    if (value !== undefined) {
      const parseResult = fhirInstantSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value (${value}) for InstantType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
    return this;
  }

  public encode(value: fhirInstant): string {
    const parseResult = fhirInstantSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for InstantType`, parseResult.error);
    }
  }

  public parse(value: string): fhirInstant {
    const parseResult = fhirInstantSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for InstantType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'instant';
  }

  public override copy(): InstantType {
    const dest = new InstantType();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: InstantType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }
}
