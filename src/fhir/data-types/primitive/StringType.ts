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

import { fhirString, fhirStringSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * String Class
 *
 * @remarks
 * Base StructureDefinition for string Type: A sequence of Unicode characters
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type string
 * - **Definition:** A sequence of Unicode characters
 * - **Comment:** Note that FHIR strings SHALL NOT exceed 1MB in size
 * - **FHIR Version:** 4.0.1
 *
 * @category Datatypes: Primitive
 * @see [FHIR string](http://hl7.org/fhir/StructureDefinition/string)
 */
export class StringType extends PrimitiveType<fhirString> {
  /**
   * @param value - the value of the primitive `fhirString`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirString) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirString): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirString): string {
    const parseResult = fhirStringSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for StringType`, parseResult.error);
    }
  }

  public parse(value: string): fhirString {
    const parseResult = fhirStringSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for StringType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'string';
  }

  public override copy(): StringType {
    const dest = new StringType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: StringType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirString | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirStringSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for StringType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
