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

import { DataType } from '@src/fhir/base-models/core-fhir-models';
import { IBase } from '@src/fhir/base-models/IBase';
import { CodeType } from '@src/fhir/data-types/primitive/CodeType';
import { EnumCodeType } from '@src/fhir/data-types/primitive/EnumCodeType';
import { NarrativeStatusEnum } from '@src/fhir/code-systems/NarrativeStatusEnum';
import { XhtmlType } from '@src/fhir/data-types/primitive/XhtmlType';
import { fhirCode, fhirXhtml, fhirXhtmlSchema } from '@src/fhir/data-types/primitive/primitive-types';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';
import { isElementEmpty } from '@src/fhir/utility/element-util';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Complex FHIR Datatype: Narrative
 *
 * @remarks
 * A human-readable summary of the resource conveying the essential clinical and
 * business information for the resource.
 *
 * @category Datatypes: Complex
 * @see [FHIR Narrative](https://www.hl7.org/fhir/R4/narrative.html)
 * @see [FHIR Styling the XHTML](https://www.hl7.org/fhir/R4/narrative.html#css)
 * @see [FHIR Clinical Safety Concerns](https://www.hl7.org/fhir/R4/narrative.html#safety)
 */
export class Narrative extends DataType implements IBase {
  /**
   * @param status - The status of the narrative
   * @param div - The actual narrative content, a stripped down version of XHTML
   */
  constructor(status?: EnumCodeType | CodeType | fhirCode, div?: XhtmlType | fhirXhtml) {
    super();

    this.narrativeStatusEnum = new NarrativeStatusEnum();

    if (status !== undefined) {
      if (status instanceof EnumCodeType) {
        this.status = status;
      } else {
        this.status = new EnumCodeType(status, this.narrativeStatusEnum);
      }
    }

    if (div !== undefined) {
      if (div instanceof XhtmlType) {
        this.div = div;
      } else {
        const parseResult = fhirXhtmlSchema.safeParse(div);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Narrative.div (${div})`, parseResult.error);
        }
        this.div = new XhtmlType(parseResult.data);
      }
    }
  }

  private readonly narrativeStatusEnum: NarrativeStatusEnum;

  /**
   * The status of the narrative
   *
   * @remarks
   * The status defines whether it's entirely generated (from just the defined data or
   * the extensions too), or whether a human authored it, and it may contain additional data.
   */
  protected status?: EnumCodeType | undefined;

  /**
   * The actual narrative content, a stripped down version of XHTML.
   *
   * @remarks
   * The contents of the html element are an XHTML fragment containing only the basic html
   * formatting elements described in chapters 7-11 and 15 of the HTML 4.0 standard, `<a>` elements
   * (either name or href), images and internally contained stylesheets. The XHTML content
   * SHALL NOT contain a head, a body, external stylesheet references, scripts, forms,
   * base/link/xlink, frames, iframes and objects.
   */
  protected div?: XhtmlType | undefined;

  /**
   * @returns the `status` property value as a EnumCodeType
   */
  public getStatusEnumType(): EnumCodeType | undefined {
    return this.status;
  }

  /**
   * Assigns the provided EnumCodeType value to the `status` property.
   *
   * @param enumType - the `status` value
   * @returns this
   */
  public setStatueEnumType(enumType: EnumCodeType | undefined): this {
    this.status = enumType;
    return this;
  }

  /**
   * @returns `true` if the `status` property exists and has a value; `false` otherwise
   */
  public hasStatusEnumType(): boolean {
    return this.status !== undefined && !this.status.isEmpty() && this.status.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `status` property value as a PrimitiveType
   */
  public getStatusElement(): CodeType | undefined {
    return this.status === undefined ? undefined : (this.status as CodeType);
  }

  /**
   * Assigns the provided PrimitiveType value to the `status` property.
   *
   * @param element - the `status` value
   * @returns this
   */
  public setStatusElement(element: CodeType | undefined): this {
    this.status = element === undefined ? undefined : new EnumCodeType(element, this.narrativeStatusEnum);
    return this;
  }

  /**
   * @returns `true` if the `status` property exists and has a value; `false` otherwise
   */
  public hasStatusElement(): boolean {
    return this.hasStatusEnumType();
  }

  /**
   * @returns the `status` property value as a primitive value
   */
  public getStatus(): fhirCode | undefined {
    return this.status?.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `status` property.
   *
   * @param value - the `status` value
   * @returns this
   * @throws TypeError for invalid `status` (NarrativeStatusCode) code
   */
  public setStatus(value: fhirCode | undefined): this {
    this.status = value === undefined ? undefined : new EnumCodeType(value, this.narrativeStatusEnum);
    return this;
  }

  /**
   * @returns `true` if the `status` property exists and has a value; `false` otherwise
   */
  public hasStatus(): boolean {
    return this.hasStatusEnumType();
  }

  /**
   * @returns the `div` property value as a PrimitiveType
   */
  public getDivElement(): XhtmlType | undefined {
    return this.div;
  }

  /**
   * Assigns the provided PrimitiveType value to the `div` property.
   *
   * @param element - the `div` value
   * @returns this
   */
  public setDivElement(element: XhtmlType | undefined): this {
    this.div = element;
    return this;
  }

  /**
   * @returns `true` if the `div` property exists and has a value; `false` otherwise
   */
  public hasDivElement(): boolean {
    return this.div !== undefined && !this.div.isEmpty();
  }

  /**
   * @returns the `div` property value as a primitive value
   */
  public getDiv(): fhirXhtml | undefined {
    return this.div?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `div` property.
   *
   * @param value - the `div` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setDiv(value: fhirXhtml | undefined): this {
    if (value === undefined) {
      this.div = undefined;
    } else {
      const parseResult = fhirXhtmlSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Narrative.div value`, parseResult.error);
      }
      this.div = new XhtmlType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `div` property exists and has a value; `false` otherwise
   */
  public hasDiv(): boolean {
    return this.hasDivElement();
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'Narrative';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.status, this.div);
  }

  /**
   * {@inheritDoc DataType.copy}
   */
  public override copy(): Narrative {
    const dest = new Narrative();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Element.copyValues}
   */
  public override copyValues(dest: Narrative): void {
    super.copyValues(dest);
    dest.status = this.status?.copy();
    dest.div = this.div?.copy();
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
