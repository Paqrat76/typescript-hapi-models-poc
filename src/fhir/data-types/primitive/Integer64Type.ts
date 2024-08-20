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

import { fhirInteger64, fhirInteger64Schema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive type "integer64" in FHIR (added in R5): A signed integer in the range
 * -9,223,372,036,854,775,808 to +9,223,372,036,854,775,807 (64-bit).
 *
 * @see {@link https://hl7.org/fhir/R5/datatypes.html#integer64|integer64}
 */
export class Integer64Type extends PrimitiveType<fhirInteger64> {
  constructor(value?: fhirInteger64) {
    super();
    this.setValue(value);
  }

  public override setValue(value?: fhirInteger64): this {
    if (value !== undefined) {
      const parseResult = fhirInteger64Schema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for Integer64Type`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
    return this;
  }

  public encode(value: fhirInteger64): string {
    const parseResult = fhirInteger64Schema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for Integer64Type`, parseResult.error);
    }
  }

  public parse(value: string): fhirInteger64 {
    const valueNumber = BigInt(value);
    const parseResult = fhirInteger64Schema.safeParse(valueNumber);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for Integer64Type`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'integer64';
  }

  public override copy(): Integer64Type {
    const dest = new Integer64Type();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: Integer64Type): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }
}
