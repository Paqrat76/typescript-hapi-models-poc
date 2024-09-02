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
 * Instant Class
 *
 * @remarks
 * Base StructureDefinition for instant Type: An instant in time - known at least to the second
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type instant
 * - **Definition:** An instant in time - known at least to the second
 * - **Comment:** This is intended for where precisely observed times are required, typically system logs etc., and not human-reported times - for them, see date and dateTime (which can be as precise as instant, but is not required to be) below. Time zone is always required
 * - **FHIR Version:** 4.0.1
 *
 * @category Datatypes: Primitive
 * @see [FHIR instant](http://hl7.org/fhir/StructureDefinition/instant)
 */
export class InstantType extends PrimitiveType<fhirInstant> {
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

  protected override copyValues(dest: InstantType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirInstant | undefined): void {
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
  }
}
