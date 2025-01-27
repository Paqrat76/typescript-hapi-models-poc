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

import { PrimitiveType } from '@src/fhir-core/base-models/core-fhir-models';
import { isDefined } from '@src/fhir-core/utility/type-guards';
import { fhirMarkdown, fhirMarkdownSchema, parseFhirPrimitiveData } from './primitive-types';

/**
 * Markdown Class
 *
 * @remarks
 * Base StructureDefinition for markdown type: A string that may contain Github Flavored Markdown syntax for optional processing by a mark down presentation engine
 *
 * **FHIR Specification**
 * - **Short:** Primitive Type markdown
 * - **Definition:** A string that may contain Github Flavored Markdown syntax for optional processing by a mark down presentation engine
 * - **Comment:** Systems are not required to have markdown support, so the text should be readable without markdown processing. The markdown syntax is GFM - see https://github.github.com/gfm/
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @category Datatypes: Primitive
 * @see [FHIR markdown](http://hl7.org/fhir/StructureDefinition/markdown)
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

  public encodeToString(value: fhirMarkdown): string {
    return parseFhirPrimitiveData(value, fhirMarkdownSchema, this.typeErrorMessage()).toString();
  }

  public parseToPrimitive(value: string): fhirMarkdown {
    return parseFhirPrimitiveData(value, fhirMarkdownSchema, this.typeErrorMessage());
  }

  public override fhirType(): string {
    return 'markdown';
  }

  public override isStringPrimitive(): boolean {
    return true;
  }

  public override copy(): MarkdownType {
    const dest = new MarkdownType();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: MarkdownType): void {
    super.copyValues(dest);
    dest.setValueAsString(this.getValueAsString());
  }

  private assignValue(value: fhirMarkdown | undefined): void {
    if (isDefined<fhirMarkdown>(value)) {
      super.setValue(parseFhirPrimitiveData(value, fhirMarkdownSchema, this.typeErrorMessage()));
    } else {
      super.setValue(undefined);
    }
  }

  private typeErrorMessage(): string {
    return `Invalid value for MarkdownType`;
  }
}
