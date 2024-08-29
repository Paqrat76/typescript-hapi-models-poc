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

import { Base } from '@src/fhir/base-models/Base';
import { IdType } from '@src/fhir/data-types/primitive/IdType';
import { UriType } from '@src/fhir/data-types/primitive/UriType';
import { CodeType } from '@src/fhir/data-types/primitive/CodeType';
import { Meta } from '@src/fhir/data-types/complex/Meta';
import {
  fhirCode,
  fhirCodeSchema,
  fhirId,
  fhirIdSchema,
  fhirUri,
  fhirUriSchema,
} from '@src/fhir/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir/utility/element-util';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Abstract Resource class
 *
 * @remarks
 * This is the base resource type ALL FHIR resources.
 *
 * This specification defines a series of different types of resource that can be used to exchange
 * and/or store data in order to solve a wide range of healthcare related problems, both clinical
 * and administrative. In addition, this specification defines several different ways of exchanging
 * the resources.
 *
 * A resource is an entity that:
 * - has a known identity (a URL) by which it can be addressed
 * - identifies itself as one of the types of resource defined in this specification
 * - contains a set of structured data items as described by the definition of the resource type
 * - has an identified version that changes if the contents of the resource change
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.Resource
 *
 * @category Base Models
 * @see [FHIR Base Resource Definitions](https://www.hl7.org/fhir/R4/resource.html)
 */
export abstract class Resource extends Base {
  protected constructor() {
    super();
  }

  /**
   * Logical id of this artifact
   *
   * @remarks
   * The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.
   * The only time that a resource does not have an id is when it is being submitted to the server using a create operation.
   */
  protected id?: IdType | undefined;

  /**
   * Metadata about the resource
   *
   * @remarks
   * This is content that is maintained by the infrastructure. Changes to the content might not always
   * be associated with version changes to the resource.
   */
  protected meta?: Meta | undefined;

  /**
   * A set of rules under which this content was created
   *
   * @remarks
   * A reference to a set of rules that were followed when the resource was constructed, and which
   * must be understood when processing the content. Often, this is a reference to an implementation
   * guide that defines the special rules along with other profiles etc.
   *
   * Asserting this rule set restricts the content to be only understood by a limited set of trading
   * partners. This inherently limits the usefulness of the data in the long term. However, the
   * existing health ecosystem is highly fractured, and not yet ready to define, collect, and
   * exchange data in a generally computable sense. Wherever possible, implementers and/or specification
   * writers should avoid using this element. Often, when used, the URL is a reference to an implementation
   * guide that defines these special rules as part of its narrative along with other profiles, value sets, etc.
   */
  protected implicitRules?: UriType | undefined;

  /**
   * Language of the resource content
   *
   * @remarks
   * Language is provided to support indexing and accessibility (typically, services such as text to
   * speech use the language tag). The html language tag in the narrative applies to the narrative.
   * The language tag on the resource may be used to specify the language of other presentations
   * generated from the data in the resource. Not all the content has to be in the base language.
   * The Resource.language should not be assumed to apply to the narrative automatically. If a
   * language is specified, it should it also be specified on the div element in the html (see
   * rules in HTML5 for information about the relationship between xml:lang and the html lang attribute).
   */
  protected language?: CodeType | undefined;

  /**
   * @returns the `id` property value as a PrimitiveType
   */
  public getIdElement(): IdType | undefined {
    return this.id;
  }

  /**
   * Assigns the provided PrimitiveType value to the `id` property.
   *
   * @param element - the `id` value
   * @returns this
   */
  public setIdElement(element: IdType | undefined): this {
    this.id = element;
    return this;
  }

  /**
   * @returns `true` if the `id` property exists and has a value; `false` otherwise
   */
  public hasIdElement(): boolean {
    return this.id !== undefined && !this.id.isEmpty();
  }

  /**
   * @returns the `id` property value as a primitive value
   */
  public getId(): fhirId | undefined {
    return this.id?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `id` property.
   *
   * @param value - the `id` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setId(value: fhirId | undefined): this {
    if (value === undefined) {
      this.id = undefined;
    } else {
      const parseResult = fhirIdSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Resource.id (${value})`, parseResult.error);
      }
      this.id = new IdType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `id` property exists and has a value; `false` otherwise
   */
  public hasId(): boolean {
    return this.hasIdElement();
  }

  /**
   * @returns the `meta` property value as a Meta
   */
  public getMeta(): Meta | undefined {
    return this.meta;
  }

  /**
   * Assigns the provided value to the `meta` property.
   *
   * @param value - the `meta` value
   * @returns this
   */
  public setMeta(value: Meta | undefined): this {
    this.meta = value;
    return this;
  }

  /**
   * @returns `true` if the `meta` property exists and has a value; `false` otherwise
   */
  public hasMeta(): boolean {
    return this.meta !== undefined && !this.meta.isEmpty();
  }

  /**
   * @returns the `implicitRules` property value as a PrimitiveType
   */
  public getImplicitRulesElement(): UriType | undefined {
    return this.implicitRules;
  }

  /**
   * Assigns the provided PrimitiveType value to the `implicitRules` property.
   *
   * @param element - the `implicitRules` value
   * @returns this
   */
  public setImplicitRulesElement(element: UriType | undefined): this {
    this.implicitRules = element;
    return this;
  }

  /**
   * @returns `true` if the `implicitRules` property exists and has a value; `false` otherwise
   */
  public hasImplicitRulesElement(): boolean {
    return this.implicitRules !== undefined && !this.implicitRules.isEmpty();
  }

  /**
   * @returns the `implicitRules` property value as a primitive value
   */
  public getImplicitRules(): fhirUri | undefined {
    return this.implicitRules?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `implicitRules` property.
   *
   * @param value - the `implicitRules` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setImplicitRules(value: fhirUri | undefined): this {
    if (value === undefined) {
      this.implicitRules = undefined;
    } else {
      const parseResult = fhirUriSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Resource.implicitRules (${value})`, parseResult.error);
      }
      this.implicitRules = new UriType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasImplicitRules(): boolean {
    return this.hasImplicitRulesElement();
  }

  /**
   * @returns the `language` property value as a PrimitiveType
   */
  public getLanguageElement(): CodeType | undefined {
    return this.language;
  }

  /**
   * Assigns the provided PrimitiveType value to the `language` property.
   *
   * @param element - the `language` value
   * @returns this
   */
  public setLanguageElement(element: CodeType | undefined): this {
    this.language = element;
    return this;
  }

  /**
   * @returns `true` if the `language` property exists and has a value; `false` otherwise
   */
  public hasLanguageElement(): boolean {
    return this.language !== undefined && !this.language.isEmpty();
  }

  /**
   * @returns the `language` property value as a primitive value
   */
  public getLanguage(): fhirCode | undefined {
    return this.language?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `language` property.
   *
   * @param value - the `language` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setLanguage(value: fhirCode | undefined): this {
    if (value === undefined) {
      this.language = undefined;
    } else {
      const parseResult = fhirCodeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Resource.language (${value})`, parseResult.error);
      }
      this.language = new CodeType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `language` property exists and has a value; `false` otherwise
   */
  public hasLanguage(): boolean {
    return this.hasLanguageElement();
  }

  /**
   * @returns the FHIR type defined in the FHIR standard
   */
  public fhirType(): string {
    return 'Resource';
  }

  /**
   * @returns `true` if the instance is empty; `false` otherwise
   */
  public isEmpty(): boolean {
    return isElementEmpty(this.id, this.meta, this.implicitRules, this.language);
  }

  /**
   * Creates a copy of the current instance.
   */
  public abstract override copy(): Resource;

  /**
   * Copies the current object instance's elements into the provided object.
   *
   * @param dest - the instance being copied
   * @protected
   */
  protected copyValues(dest: Resource): void {
    dest.id = this.id?.copy();
    dest.meta = this.meta?.copy();
    dest.implicitRules = this.implicitRules?.copy();
    dest.language = this.language?.copy();
  }
}