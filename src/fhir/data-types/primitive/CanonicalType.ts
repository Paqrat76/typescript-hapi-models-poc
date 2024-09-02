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

import { fhirCanonical, fhirCanonicalSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Canonical Class
 *
 * @remarks
 * Base StructureDefinition for canonical type: A URI that is a reference to a canonical URL on a FHIR resource
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type canonical
 * - **Definition:** A URI that is a reference to a canonical URL on a FHIR resource
 * - **FHIR Version:** 4.0.1
 *
 * @category Datatypes: Primitive
 * @see [FHIR canonical](http://hl7.org/fhir/StructureDefinition/canonical)
 */
export class CanonicalType extends PrimitiveType<fhirCanonical> {
  /**
   * @param value - the value of the primitive `fhirCanonical`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirCanonical) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirCanonical): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirCanonical): string {
    const parseResult = fhirCanonicalSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for CanonicalType`, parseResult.error);
    }
  }

  public parse(value: string): fhirCanonical {
    const parseResult = fhirCanonicalSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value (${value}) for CanonicalType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'canonical';
  }

  public override copy(): CanonicalType {
    const dest = new CanonicalType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: CanonicalType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirCanonical | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirCanonicalSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value (${value}) for CanonicalType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
