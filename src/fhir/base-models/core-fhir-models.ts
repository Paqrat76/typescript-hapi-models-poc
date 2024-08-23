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

/**
 * This module contains the non-Resource core FHIR models. The FHIR specification defines
 * the Element type from which all other non-Resource types extend. Its definition includes
 * the FHIR Extension type. From a programming perspective, this introduces circular dependencies
 * because all of these types inherit from Element or one of its child types, and they all
 * include an element of a list of Extension types.
 *
 * In TypeScript, having each of these models in separate files results in circular dependencies
 * that cannot be resolved by typical strategies such as extracting common elements into a sharable
 * module. Therefore, these modules, plus the Extension model, are collected into this single file.
 * This preserves the correct model representations with their correct inheritance without
 * introducing circular dependencies.
 *
 * @see [FHIR Type Framework](https://hl7.org/fhir/R5/types.html)
 *
 * @module
 */

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

import { strict as assert } from 'assert';
import { isEmpty as _isEmpty } from 'lodash';
import { Base } from './Base';
import { IBase } from './IBase';
import { fhirString, fhirStringSchema, fhirUri, fhirUriSchema } from '@src/fhir/data-types/primitive/primitive-types';
import { isNonBlank } from '@src/fhir/utility/common-util';
import { isElementEmpty } from '@src/fhir/utility/element-util';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/**
 * Base interface to specify `extension` specific methods used by
 * Element and Resource.
 *
 * @category Base Models
 */
export interface IBaseExtension {
  /**
   * Returns the array of `extension` values
   */
  getExtension(): Extension[] | undefined;

  /**
   * Assigns the provided array of Extension values to the `extension` property.
   *
   * @param extension - array of Extensions
   */
  setExtension(extension: Extension[] | undefined): this;

  /**
   * Determines if the `extension` property exists.
   *
   * @remarks If the url is provided, determines if an Extension having
   * the provided url exists. If the url is not provided, determines
   * if the `extension` property exists and has any values.
   *
   * @param url - the url that identifies a specific Extension
   * @throws AssertionError for invalid url
   */
  hasExtension(url?: fhirUri): boolean;

  /**
   * Returns the Extension having the provided url.
   *
   * @param url - the url that identifies a specific Extension
   * @throws AssertionError for invalid url
   */
  getExtensionByUrl(url: fhirUri): Extension | undefined;

  /**
   * Adds the provided Extension to the `extension` property array.
   *
   * @param extension - the Extension value to add to the `extension` property array
   */
  addExtension(extension?: Extension): this;

  /**
   * Removes the Extension having the provided url from the `extension` property array.
   *
   * @param url - the url that identifies a specific Extension to remove
   * @throws AssertionError for invalid url
   */
  removeExtension(url: fhirUri): void;
}

/**
 * Base interface to specify `modifierExtension` specific methods used by
 * BackboneElement and BackboneType.
 *
 * @category Base Models
 */
export interface IBaseModifierExtension {
  /**
   * Returns the array of `modifierExtension` values
   */
  getModifierExtension(): Extension[] | undefined;

  /**
   * Assigns the provided array of Extension values to the `modifierExtension` property.
   *
   * @param extension - array of Extensions
   */
  setModifierExtension(extension: Extension[] | undefined): this;

  /**
   * Determines if the `modifierExtension` property exists.
   *
   * @remarks If the url is provided, determines if an Extension having
   * the provided url exists. If the url is not provided, determines
   * if the `modifierExtension` property exists and has any values.
   *
   * @param url - the url that identifies a specific Extension
   * @throws AssertionError for invalid url
   */
  hasModifierExtension(url?: fhirUri): boolean;

  /**
   * Returns the Extension having the provided url.
   *
   * @param url - the url that identifies a specific Extension
   * @throws AssertionError for invalid url
   */
  getModifierExtensionByUrl(url: fhirUri): Extension | undefined;

  /**
   * Adds the provided Extension to the `modifierExtension` property array.
   *
   * @param extension - the Extension value to add to the `modifierExtension` property array
   */
  addModifierExtension(extension?: Extension): this;

  /**
   * Removes the Extension having the provided url from the `modifierExtension` property array.
   *
   * @param url - the url that identifies a specific Extension to remove
   * @throws AssertionError for invalid url
   */
  removeModifierExtension(url: fhirUri): void;
}

/**
 * Abstract Element class.
 *
 * The base definition for all elements contained inside a resource. All elements,
 * whether defined as a Datatype (including primitive) or as part of a resource
 * structure, have this base content:
 * - An internal id
 * - Extensions
 *
 * There are 3 kinds of descendant types that specialize Element:
 * - Primitive datatypes, that add a primitive value property of the specified type
 * - Complex datatypes, that add their own children (all of which are also elements)
 * - BackboneElement, a specialization that adds modifierExtension, which is the
 *   super-type of all the element types defined in resource definitions (e.g. Patient.contact)
 *
 * Note that resources themselves all specialize the base type Resource.
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.Element
 *
 * @category Base Models
 * @see [FHIR Element](https://hl7.org/fhir/R5/types.html#Element)
 */
export abstract class Element extends Base implements IBase, IBaseExtension {
  protected constructor() {
    super();
  }

  /**
   * Unique id for the element within a resource (for internal references). This
   * may be any string value that does not contain spaces.
   */
  protected id?: fhirString | undefined;

  /**
   * May be used to represent additional information that is not part of the basic
   * definition of the element. To make the use of extensions safe and manageable,
   * there is a strict set of governance applied to the definition and use of
   * extensions. Though any implementer can define an extension, there is a set of
   * requirements that SHALL be met as part of the definition of the extension.
   */
  protected extension?: Extension[] | undefined;

  /**
   * @returns the `id` property value
   */
  public getId(): fhirString | undefined {
    return this.id;
  }

  /**
   * Assigns the provided value to the `id` property.
   *
   * @param value - the `id` value
   * @returns this
   * @throws PrimitiveTypeError for invalid value
   */
  public setId(value: fhirString | undefined): this {
    if (value === undefined) {
      this.id = undefined;
    } else {
      const parseResult = fhirStringSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Element.id (${value})`, parseResult.error);
      }
      this.id = parseResult.data;
    }
    return this;
  }

  /**
   * @returns `true` if `id` exists and has a value; `false` otherwise
   */
  public hasId(): boolean {
    return !_isEmpty(this.id);
  }

  /**
   * {@inheritDoc IBaseExtension.getExtension}
   */
  public getExtension(): Extension[] | undefined {
    return this.extension;
  }

  /**
   * {@inheritDoc IBaseExtension.setExtension}
   */
  public setExtension(extension: Extension[] | undefined): this {
    this.extension = extension;
    return this;
  }

  /**
   * {@inheritDoc IBaseExtension.hasExtension}
   */
  public hasExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getExtensionsByUrl(url).length > 0;
    }
    return this.existsExtension();
  }

  /**
   * {@inheritDoc IBaseExtension.getExtensionByUrl}
   */
  public getExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
      if (results.length === 0) {
        return undefined;
      }
      assert(results.length === 1, `The url (${url}) must have only one match`);
      return results[0];
    }
    return undefined;
  }

  /**
   * {@inheritDoc IBaseExtension.addExtension}
   */
  public addExtension(extension?: Extension): this {
    if (!extension) {
      return this;
    }
    this.initExtension();
    // @ts-expect-error: initExtension() ensures this.extension exists
    this.extension.push(extension);
    return this;
  }

  /**
   * {@inheritDoc IBaseExtension.removeExtension}
   */
  public removeExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getExtension()!.filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setExtension(results);
    }
  }

  /**
   * Ensures the `extension` property exists and if not initializes it to an empty array.
   *
   * @private
   */
  private initExtension(): void {
    if (!this.extension) {
      this.extension = [] as Extension[];
    }
  }

  /**
   * Determines if `extension` property exists, and if so, determines if the `extension` array is empty.
   *
   * @returns `true` if the `extension` property array exists and has at least one element; false otherwise
   * @private
   */
  private existsExtension(): boolean {
    if (this.extension) {
      for (const item of this.extension) {
        if (!item.isEmpty()) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  /**
   * Returns all Extensions having the provided url or if the url does not exist,
   * returns an empty array.
   *
   * @param url - the url that identifies a specific Extension
   * @returns an array of Extensions having the provided url or an empty array
   * @private
   */
  private getExtensionsByUrl(url: fhirUri): Extension[] {
    validateUrl(url);
    if (this.hasExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.getExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return [] as Extension[];
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'Element';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    return !this.hasId() && isElementEmpty(this.extension);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public abstract override copy(): Element;

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Element): void {
    dest.id = this.id ? String(this.id) : undefined;
    if (this.extension !== undefined) {
      dest.extension = [] as Extension[];
      for (const extension of this.extension) {
        dest.extension.push(extension.copy());
      }
    } else {
      dest.extension = undefined;
    }
  }
}

/**
 * Abstract BackboneElement class.
 *
 * The base definition for complex elements defined as part of a resource definition - that is,
 * elements that have children that are defined in the resource. Datatype elements do not use
 * this type. For instance, Patient.contact is an element that is defined as part of the patient
 * resource, so it automatically has the type BackboneElement.
 *
 * Note that the descendant types of BackboneElement are all declared implicitly as part of the
 * definitions of the resources.
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.BackboneElement
 *
 * @category Base Models
 * @see [FHIR BackboneElement](https://hl7.org/fhir/R5/types.html#BackboneElement)
 */
export abstract class BackboneElement extends Element implements IBase, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
   * Extensions that cannot be ignored even if unrecognized.
   *
   * May be used to represent additional information that is not part of the basic
   * definition of the element and that modifies the understanding of the element
   * in which it is contained and/or the understanding of the containing element's
   * descendants. Usually modifier elements provide negation or qualification. To
   * make the use of extensions safe and manageable, there is a strict set of
   * governance applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements that
   * SHALL be met as part of the definition of the extension. Applications
   * processing a resource are required to check for modifier extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on Resource
   * or DomainResource (including cannot change the meaning of modifierExtension
   * itself).
   *
   * @protected
   */
  protected modifierExtension?: Extension[] | undefined;

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtension}
   */
  public getModifierExtension(): Extension[] | undefined {
    return this.modifierExtension;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.setModifierExtension}
   */
  public setModifierExtension(modifierExtension: Extension[] | undefined): this {
    this.modifierExtension = modifierExtension;
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.hasModifierExtension}
   */
  public hasModifierExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getModifierExtensionsByUrl(url).length > 0;
    }
    return this.existsModifierExtension();
  }

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtensionByUrl}
   */
  public getModifierExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getModifierExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
      if (results.length === 0) {
        return undefined;
      }
      assert(results.length === 1, `The url (${url}) must have only one match`);
      return results[0];
    }
    return undefined;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.addModifierExtension}
   */
  public addModifierExtension(modifierExtension?: Extension): this {
    if (!modifierExtension) {
      return this;
    }
    this.initModifierExtension();
    // @ts-expect-error: initModifierExtension() ensures this.modifierExtension exists
    this.modifierExtension.push(modifierExtension);
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.removeModifierExtension}
   */
  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getModifierExtension()!.filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  /**
   * Ensures the `modifierExtension` property exists and if not initializes it to an empty array.
   *
   * @private
   */
  private initModifierExtension(): void {
    if (!this.modifierExtension) {
      this.modifierExtension = [] as Extension[];
    }
  }

  /**
   * Determines if `modifierExtension` property exists, and if not, determines if the `modifierExtension`
   * array is empty.
   *
   * @returns `true` if the `modifierExtension` exists and has at least one element; false otherwise
   * @private
   */
  private existsModifierExtension(): boolean {
    if (this.modifierExtension) {
      for (const item of this.modifierExtension) {
        if (!item.isEmpty()) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  /**
   * Returns all Extensions having the provided url or if the url does not exist,
   * returns an empty array.
   *
   * @param url - the url that identifies a specific Extension
   * @returns an array of Extensions having the provided url or an empty array
   * @private
   */
  private getModifierExtensionsByUrl(url: fhirUri): Extension[] {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.getModifierExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return [] as Extension[];
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'BackboneElement';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.modifierExtension);
  }

  /**
   * {@inheritDoc Element.copy}
   */
  public abstract override copy(): BackboneElement;

  /**
   * {@inheritDoc Element.copyValues}
   */
  protected override copyValues(dest: BackboneElement): void {
    super.copyValues(dest);
    if (this.modifierExtension) {
      dest.modifierExtension = [] as Extension[];
      for (const modifierExtension of this.modifierExtension) {
        dest.modifierExtension.push(modifierExtension.copy());
      }
    }
  }
}

/**
 * Abstract DataType class.
 *
 * The base definition for the usable types defined by the FHIR Specification.
 * Base class for all FHIR related datatypes including both PrimitiveType and complex datatypes.
 *
 * @category Base Models
 * @see [FHIR DataType](https://hl7.org/fhir/R5/types.html#DataType)
 * @see [FHIR Primitives](https://hl7.org/fhir/R5/datatypes.html#primitive)
 * @see [FHIR Complex Types](https://hl7.org/fhir/R5/datatypes.html#complex)
 * @see [FHIR MetaData Types](https://hl7.org/fhir/R5/metadatatypes.html)
 * @see [FHIR Special Purpose Types](https://hl7.org/fhir/R5/datatypes.html#other)
 */
export abstract class DataType extends Element implements IBase {
  protected constructor() {
    super();
  }

  /**
   * {@inheritDoc Element.copy}
   */
  abstract override copy(): DataType;
}

/**
 * Abstract BackboneType class.
 *
 *  The base definition for the few datatypes that allow modifier extensions:
 *  - Timing
 *  - Dosage
 *  - ElementDefinition
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.BackboneType
 *
 * @category Base Models
 * @see [FHIR BackboneType](https://hl7.org/fhir/R5/types.html#BackboneType)
 */
export abstract class BackboneType extends DataType implements IBase, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
   * Extensions that cannot be ignored even if unrecognized.
   *
   * May be used to represent additional information that is not part of the basic
   * definition of the element and that modifies the understanding of the element
   * in which it is contained and/or the understanding of the containing element's
   * descendants. Usually modifier elements provide negation or qualification. To
   * make the use of extensions safe and manageable, there is a strict set of
   * governance applied to the definition and use of extensions. Though any
   * implementer can define an extension, there is a set of requirements that
   * SHALL be met as part of the definition of the extension. Applications
   * processing a resource are required to check for modifier extensions.
   *
   * Modifier extensions SHALL NOT change the meaning of any elements on Resource
   * or DomainResource (including cannot change the meaning of modifierExtension
   * itself).
   *
   * @protected
   */
  protected modifierExtension?: Extension[] | undefined;

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtension}
   */
  public getModifierExtension(): Extension[] | undefined {
    return this.modifierExtension;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.setModifierExtension}
   */
  public setModifierExtension(modifierExtension: Extension[] | undefined): this {
    this.modifierExtension = modifierExtension;
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.hasModifierExtension}
   */
  public hasModifierExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getModifierExtensionsByUrl(url).length > 0;
    }
    return this.existsModifierExtension();
  }

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtensionByUrl}
   */
  public getModifierExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getModifierExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
      if (results.length === 0) {
        return undefined;
      }
      assert(results.length === 1, `The url (${url}) must have only one match`);
      return results[0];
    }
    return undefined;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.addModifierExtension}
   */
  public addModifierExtension(modifierExtension?: Extension): this {
    if (!modifierExtension) {
      return this;
    }
    this.initModifierExtension();
    // @ts-expect-error: initModifierExtension() ensures this.modifierExtension exists
    this.modifierExtension.push(modifierExtension);
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.removeModifierExtension}
   */
  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getModifierExtension()!.filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  /**
   * Ensures the `modifierExtension` exists and if not initializes it to an empty array.
   *
   * @private
   */
  private initModifierExtension(): void {
    if (!this.modifierExtension) {
      this.modifierExtension = [] as Extension[];
    }
  }

  /**
   * Determines if `modifierExtension` property exists, and if not, determines if the `modifierExtension`
   * array is empty.
   *
   * @returns `true` if the `modifierExtension` property exists and has at least one element; false otherwise
   * @private
   */
  private existsModifierExtension(): boolean {
    if (this.modifierExtension) {
      for (const item of this.modifierExtension) {
        if (!item.isEmpty()) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

  /**
   * Returns all Extensions having the provided url or if the url does not exist,
   * returns an empty array.
   *
   * @param url - the url that identifies a specific Extension
   * @returns an array of Extensions having the provided url or an empty array
   * @private
   */
  private getModifierExtensionsByUrl(url: fhirUri): Extension[] {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.getModifierExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return [] as Extension[];
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'BackboneType';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.modifierExtension);
  }

  /**
   * {@inheritDoc DataType.copy}
   */
  public abstract override copy(): BackboneType;

  /**
   * {@inheritDoc Element.copyValues}
   */
  protected override copyValues(dest: BackboneType): void {
    super.copyValues(dest);
    if (this.modifierExtension) {
      dest.modifierExtension = [] as Extension[];
      for (const modifierExtension of this.modifierExtension) {
        dest.modifierExtension.push(modifierExtension.copy());
      }
    }
  }
}

/**
 * Abstract PrimitiveType generic class.
 *
 * The base type for all re-usable types defined that have a simple property.
 * Contains common functionality shared by all FHIR primitive datatypes.
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.PrimitiveType
 *
 * @category Base Models
 * @template T - the primitive type
 * @see [FHIR PrimitiveType](https://hl7.org/fhir/R5/types.html#PrimitiveType)
 * @see [FHIR Primitives](https://hl7.org/fhir/R5/datatypes.html#primitive)
 */
export abstract class PrimitiveType<T> extends DataType implements IBase {
  protected constructor() {
    super();
    this.coercedValue = undefined;
    this.stringValue = undefined;
  }

  /**
   * T - primitive type defined in primitive-types.ts
   *
   * @private
   */
  private coercedValue: T | undefined;

  /**
   * `string` representation of T
   *
   * @private
   */
  private stringValue: string | undefined;

  /**
   * @returns the generic T property value
   */
  public getValue(): T | undefined {
    return this.coercedValue;
  }

  /**
   * Assigns the provided `value`.
   *
   * @param value - the generic T value
   * @returns this
   * @throws PrimitiveTypeError for invalid value
   */
  public setValue(value?: T): this {
    this.coercedValue = value ?? undefined;
    this.updateStringValue();
    return this;
  }

  /**
   * @returns `true` if the generic T value exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return this.coercedValue !== undefined;
  }

  /**
   * @returns the generic T property value as a `string`
   */
  public getValueAsString(): string | undefined {
    return this.stringValue;
  }

  /**
   * Assigns the provided value and coerces it to the T type.
   *
   * @param value - the `string` value of the primitive type
   * @throws PrimitiveTypeError for invalid value
   */
  public setValueAsString(value?: string): void {
    this.stringValue = value;
    if (value !== undefined) {
      this.coercedValue = this.parse(value);
    } else {
      this.coercedValue = undefined;
    }
  }

  /**
   * Updates this.stringValue based on the current this.coercedValue.
   *
   * @private
   * @throws PrimitiveTypeError for invalid value
   */
  private updateStringValue(): void {
    if (this.coercedValue !== undefined) {
      this.stringValue = this.encode(this.coercedValue);
    } else {
      this.stringValue = undefined;
    }
  }

  /**
   * Encodes the provided generic T value as a `string`.
   *
   * @param value - the generic T value
   * @returns the `string` representation of T
   * @throws PrimitiveTypeError for invalid value
   */
  public abstract encode(value: T): string;

  /**
   * Parses the provided `string` value and coerces it into the generic T value.
   *
   * @param value - the `string` representation of the generic T value
   * @returns the generic T value
   * @throws PrimitiveTypeError for invalid value
   */
  public abstract parse(value: string): T;

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return !this.hasValue();
  }

  /**
   * {@inheritDoc DataType.copy}
   */
  public abstract override copy(): PrimitiveType<T>;

  /**
   * {@inheritDoc Element.copyValues}
   */
  protected override copyValues(dest: PrimitiveType<T>): void {
    super.copyValues(dest);
  }
}

/**
 * Optional Extension Element.
 *
 * Every resource or datatype element may include one or more Extension child elements.
 * The Extension is either simple or complex. Simple Extensions have only a value and no
 * nested Extensions. Complex Extensions contain one or more nested Extensions and no value.
 * An Extension can not have both a value and nested extensions.
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.Extension
 *
 * @category Base Models
 * @see [FHIR Extensibility](https://hl7.org/fhir/R5/extensibility.html)
 */
export class Extension extends Element implements IBase {
  /**
   * @param url - Source of the definition for the Extension - a logical name or a URL.
   * @param value - Value of Extension
   * @throws PrimitiveTypeError for invalid url
   */
  constructor(url: fhirUri, value?: DataType) {
    super();

    const parseResult = fhirUriSchema.safeParse(url);
    if (!parseResult.success) {
      throw new PrimitiveTypeError(`Invalid Extension.url (${url})`, parseResult.error);
    }
    this.url = parseResult.data;

    if (value) {
      this.value = value;
    }
  }

  /**
   * Source of the definition for the Extension - a logical name or a URL.
   */
  protected url: fhirUri;

  /**
   * Value of Extension
   *
   * @remarks
   * Must be one of a constrained set of FHIR data types (see
   * [Extensibility](https://hl7.org/fhir/R5/datatypes.html#open) for a list).
   */
  protected value?: DataType | undefined;

  /**
   * @returns the `url` property value
   */
  public getUrl(): fhirUri {
    return this.url;
  }

  /**
   * Assigns the provided value to the `url` property.
   *
   * @param value - the url value
   * @returns this
   * @throws AssertionError for invalid value
   */
  public setUrl(value: fhirUri): this {
    const parseResult = fhirUriSchema.safeParse(value);
    if (!parseResult.success) {
      throw new PrimitiveTypeError(`Invalid Extension.url (${value})`, parseResult.error);
    }
    this.url = parseResult.data;
    return this;
  }

  /**
   * @returns `true` if the `url` property exists and has a value; `false` otherwise
   */
  public hasUrl(): boolean {
    return !_isEmpty(this.url);
  }

  /**
   * @returns the `value` property value
   */
  public getValue(): DataType | undefined {
    return this.value;
  }

  /**
   * Assigns the provided value to the `value` property.
   *
   * @param value - the `value` value
   * @returns this
   */
  public setValue(value: DataType | undefined): this {
    this.value = value;
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return this.value !== undefined && !this.value.isEmpty();
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'Extension';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty() {
    return super.isEmpty() && isElementEmpty(this.value) && !this.hasUrl();
  }

  /**
   * {@inheritDoc Element.copy}
   */
  public override copy(): Extension {
    const dest = new Extension(this.url);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Element.copyValues}
   */
  protected override copyValues(dest: Extension): void {
    super.copyValues(dest);
    dest.url = this.url;
    dest.value = this.value ? this.value.copy() : undefined;
  }
}

/**
 * Validate the provided url. The url must be a non-blank valid fhirUri.
 *
 * @param url - url to test
 * @throws AssertionError for invalid url
 * @private
 */
function validateUrl(url: string) {
  assert(isNonBlank(url), 'The url must be defined and cannot be blank');
  const parseResult = fhirUriSchema.safeParse(url);
  assert(parseResult.success, 'url must be a valid fhirUri');
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns */
