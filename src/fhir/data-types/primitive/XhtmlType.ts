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

import { fhirXhtml, fhirXhtmlSchema } from './primitive-types';
import { Extension, PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Xhtml Class
 *
 * @remarks
 * Base StructureDefinition for xhtml Type
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type xhtml
 * - **Definition:** XHTML
 * - **FHIR Version:** 4.0.1
 *
 * @category Datatypes: Primitive
 * @see [FHIR xhtml](http://hl7.org/fhir/StructureDefinition/xhtml)
 */
export class XhtmlType extends PrimitiveType<fhirXhtml> {
  /**
   * @param value - the value of the primitive `fhirXhtml`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirXhtml) {
    super();
    this.assignValue(value);
    this.assignExtension(undefined);
  }

  public override setExtension(extension: Extension[] | undefined): this {
    this.assignExtension(extension);
    return this;
  }

  public override addExtension(extension?: Extension): this {
    if (extension !== undefined) {
      throw new TypeError('According to the FHIR specification, Extensions are not permitted on the xhtml type');
    }
    this.extension = undefined;
    return this;
  }

  public override setValue(value?: fhirXhtml): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirXhtml): string {
    const parseResult = fhirXhtmlSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for XhtmlType`, parseResult.error);
    }
  }

  public parse(value: string): fhirXhtml {
    const parseResult = fhirXhtmlSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for XhtmlType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'xhtml';
  }

  public override copy(): XhtmlType {
    const dest = new XhtmlType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: XhtmlType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirXhtml | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirXhtmlSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for XhtmlType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }

  private assignExtension(extension: Extension[] | undefined): void {
    if (extension !== undefined) {
      throw new TypeError('According to the FHIR specification, Extensions are not permitted on the xhtml type');
    }
    this.extension = undefined;
  }
}
