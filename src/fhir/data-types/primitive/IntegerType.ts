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

import { fhirInteger, fhirIntegerSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive FHIR Datatype: integer
 *
 * @remarks
 * A signed integer in the range −2,147,483,648..2,147,483,647 (32-bit).
 *
 * @category Datatypes: Primitive
 * @see [FHIR integer](https://hl7.org/fhir/R5/datatypes.html#integer)
 */
export class IntegerType extends PrimitiveType<fhirInteger> {
  /**
   * @param value - the value of the primitive `fhirInteger`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirInteger) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirInteger): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirInteger): string {
    const parseResult = fhirIntegerSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for IntegerType`, parseResult.error);
    }
  }

  public parse(value: string): fhirInteger {
    const valueNumber = Number.parseInt(value);
    const parseResult = fhirIntegerSchema.safeParse(valueNumber);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for IntegerType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'integer';
  }

  public override copy(): IntegerType {
    const dest = new IntegerType();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: IntegerType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirInteger | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirIntegerSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for IntegerType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
