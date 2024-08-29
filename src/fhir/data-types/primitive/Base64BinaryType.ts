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

import { fhirBase64Binary, fhirBase64BinarySchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive FHIR Datatype: base64Binary
 *
 * @remarks
 * A stream of bytes, base64 encoded (RFC 4648).
 *
 * `base64Binary` content does not include any whitespace or line feeds, but reading applications
 *  should ignore whitespace characters (per RFC 4648).
 *
 * @category Datatypes: Primitive
 * @see [FHIR base64Binary](https://hl7.org/fhir/R5/datatypes.html#base64Binary)
 */
export class Base64BinaryType extends PrimitiveType<fhirBase64Binary> {
  /**
   * @param value - the value of the primitive `fhirBase64Binary`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirBase64Binary) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirBase64Binary): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirBase64Binary): string {
    const parseResult = fhirBase64BinarySchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for Base64BinaryType`, parseResult.error);
    }
  }

  public parse(value: string): fhirBase64Binary {
    const parseResult = fhirBase64BinarySchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for Base64BinaryType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'base64Binary';
  }

  public override copy(): Base64BinaryType {
    const dest = new Base64BinaryType();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: Base64BinaryType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirBase64Binary | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirBase64BinarySchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for Base64BinaryType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
