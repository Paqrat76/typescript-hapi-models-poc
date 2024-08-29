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

import { fhirMarkdown, fhirMarkdownSchema } from './primitive-types';
import { PrimitiveType } from '@src/fhir/base-models/core-fhir-models';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Primitive FHIR Datatype: markdown
 *
 * @remarks
 * A FHIR string that may contain Markdown syntax for optional processing by
 * a markdown presentation engine, in the [GFM extension](https://github.github.com/gfm/)
 * of CommonMark format.
 *
 * @category Datatypes: Primitive
 * @see [FHIR markdown](https://hl7.org/fhir/R5/datatypes.html#markdown)
 */
export class MarkdownType extends PrimitiveType<fhirMarkdown> {
  /**
   * @param value - the value of the primitive `fhirMarkdown`
   * @throws PrimitiveTypeError for invalid value
   */
  constructor(value?: fhirMarkdown) {
    super();
    this.assignValue(value);
  }

  public override setValue(value?: fhirMarkdown): this {
    this.assignValue(value);
    return this;
  }

  public encode(value: fhirMarkdown): string {
    const parseResult = fhirMarkdownSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data.toString();
    } else {
      throw new PrimitiveTypeError(`Invalid value for MarkdownType`, parseResult.error);
    }
  }

  public parse(value: string): fhirMarkdown {
    const parseResult = fhirMarkdownSchema.safeParse(value);
    if (parseResult.success) {
      return parseResult.data;
    } else {
      throw new PrimitiveTypeError(`Invalid value for MarkdownType`, parseResult.error);
    }
  }

  public override fhirType(): string {
    return 'markdown';
  }

  public override copy(): MarkdownType {
    const dest = new MarkdownType();
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: MarkdownType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirMarkdown | undefined): void {
    if (value !== undefined) {
      const parseResult = fhirMarkdownSchema.safeParse(value);
      if (parseResult.success) {
        super.setValue(parseResult.data);
      } else {
        throw new PrimitiveTypeError(`Invalid value for MarkdownType`, parseResult.error);
      }
    } else {
      super.setValue(undefined);
    }
  }
}
