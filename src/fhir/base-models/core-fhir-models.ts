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

import { strict as assert } from 'assert';
import { isEmpty as _isEmpty } from 'lodash';
import { Base } from './Base';
import { IBase } from './IBase';
import { fhirString, fhirStringSchema, fhirUri, fhirUriSchema } from '@src/fhir/data-types/primitive/primitive-types';
import { isNonBlank } from '@src/fhir/utility/common-util';
import { isElementEmpty } from '@src/fhir/utility/element-util';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

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
 * @see {@link https://hl7.org/fhir/R5/types.html|FHIR Type Framework}
 */

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
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.Element
 *
 * @see {@link https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model/Element.java|HAPI FHIR Element}
 * @see {@link https://hl7.org/fhir/R5/types.html#Element|FHIR Element}
 */
export abstract class Element extends Base implements IBase {
  protected constructor() {
    super();
  }

  /**
   * Unique id for the element within a resource (for internal references). This
   * may be any string value that does not contain spaces.
   */
  //@Child(name = "id", type = { StringType.class }, order = 0, min = 0, max = 1, modifier = false, summary = false)
  //@Description(shortDefinition = "Unique id for inter-element referencing", formalDefinition = "Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.")
  protected id?: fhirString | undefined;

  /**
   * May be used to represent additional information that is not part of the basic
   * definition of the element. To make the use of extensions safe and manageable,
   * there is a strict set of governance applied to the definition and use of
   * extensions. Though any implementer can define an extension, there is a set of
   * requirements that SHALL be met as part of the definition of the extension.
   */
  // @Child(name = "extension", type = {
  //   Extension.class }, order = 1, min = 0, max = Child.MAX_UNLIMITED, modifier = false, summary = false)
  // @Description(shortDefinition = "Additional content defined by implementations", formalDefinition = "May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.")
  protected extension?: Extension[] | undefined;

  public getId(): fhirString | undefined {
    return this.id;
  }

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

  public hasId(): boolean {
    return !_isEmpty(this.id);
  }

  public getExtension(): Extension[] | undefined {
    return this.extension;
  }

  public setExtension(extension: Extension[] | undefined): this {
    this.extension = extension;
    return this;
  }

  public hasExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getExtensionsByUrl(url).length > 0;
    }
    return this.existsExtension();
  }

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

  public addExtension(extension?: Extension): this {
    if (!extension) {
      return this;
    }
    this.initExtension();
    // @ts-expect-error: initExtension() ensures this.extension exists
    this.extension.push(extension);
    return this;
  }

  public removeExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getExtension()!.filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setExtension(results);
    }
  }

  private initExtension(): void {
    if (!this.extension) {
      this.extension = [] as Extension[];
    }
  }

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

  private getExtensionsByUrl(url: fhirUri): Extension[] {
    validateUrl(url);
    if (this.hasExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.getExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return [] as Extension[];
  }

  public override fhirType(): string {
    return 'Element';
  }

  public override isEmpty(): boolean {
    return !this.hasId() && isElementEmpty(this.extension);
  }

  public abstract override copy(): Element;

  public override copyValues(dest: Element): void {
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

interface IBaseModifierExtension {
  getModifierExtension(): Extension[] | undefined;

  setModifierExtension(modifierExtension: Extension[] | undefined): this;

  hasModifierExtension(url?: fhirUri): boolean;

  getModifierExtensionByUrl(url: fhirUri): Extension | undefined;

  addModifierExtension(modifierExtension?: Extension): this;

  removeModifierExtension(url: fhirUri): void;
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
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.BackboneElement
 *
 * @see {@link https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model/BackboneElement.java|HAPI FHIR BackboneElement}
 * @see {@link https://hl7.org/fhir/R5/types.html#BackboneElement|FHIR BackboneElement}
 */
export abstract class BackboneElement extends Element implements IBase, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
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
   */
  // @Child(name = "modifierExtension", type = {
  //   Extension.class }, order = 0, min = 0, max = Child.MAX_UNLIMITED, modifier = true, summary = true)
  // @Description(shortDefinition = "Extensions that cannot be ignored even if unrecognized", formalDefinition = "May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.\n\nModifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).")
  protected modifierExtension?: Extension[] | undefined;

  public getModifierExtension(): Extension[] | undefined {
    return this.modifierExtension;
  }

  public setModifierExtension(modifierExtension: Extension[] | undefined): this {
    this.modifierExtension = modifierExtension;
    return this;
  }

  public hasModifierExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getModifierExtensionsByUrl(url).length > 0;
    }
    return this.existsModifierExtension();
  }

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

  public addModifierExtension(modifierExtension?: Extension): this {
    if (!modifierExtension) {
      return this;
    }
    this.initModifierExtension();
    // @ts-expect-error: initModifierExtension() ensures this.modifierExtension exists
    this.modifierExtension.push(modifierExtension);
    return this;
  }

  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getModifierExtension()!.filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  private initModifierExtension(): void {
    if (!this.modifierExtension) {
      this.modifierExtension = [] as Extension[];
    }
  }

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

  private getModifierExtensionsByUrl(url: fhirUri): Extension[] {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.getModifierExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return [] as Extension[];
  }

  public override fhirType(): string {
    return 'BackboneElement';
  }

  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.modifierExtension);
  }

  public abstract override copy(): BackboneElement;

  public override copyValues(dest: BackboneElement): void {
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
 * @see {@link PrimitiveType}
 * @see {@link https://hl7.org/fhir/R5/types.html#DataType|FHIR DataType}
 * @see {@link https://hl7.org/fhir/R5/datatypes.html#primitive|FHIR Primitives}
 * @see {@link https://hl7.org/fhir/R5/datatypes.html#complex|FHIR Complex Types}
 * @see {@link https://hl7.org/fhir/R5/metadatatypes.html|FHIR MetaData Types}
 * @see {@link https://hl7.org/fhir/R5/datatypes.html#other|FHIR Special Purpose Types}
 */
export abstract class DataType extends Element implements IBase {
  protected constructor() {
    super();
  }

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
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.BackboneType
 *
 * @see {@link https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model/BackboneType.java|HAPI FHIR BackboneType}
 * @see {@link https://hl7.org/fhir/R5/types.html#BackboneType|FHIR BackboneType}
 */
export abstract class BackboneType extends DataType implements IBase, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
   * May be used to represent additional information that is not part of the basic
   * definition of the element, and that modifies the understanding of the element
   * that contains it. Usually modifier elements provide negation or
   * qualification. In order to make the use of extensions safe and manageable,
   * there is a strict set of governance applied to the definition and use of
   * extensions. Though any implementer is allowed to define an extension, there
   * is a set of requirements that SHALL be met as part of the definition of the
   * extension. Applications processing a resource are required to check for
   * modifier extensions.
   */
  // @Child(name = "modifierExtension", type = {
  //   Extension.class }, order = 0, min = 0, max = Child.MAX_UNLIMITED, modifier = true, summary = true)
  // @Description(shortDefinition = "Extensions that cannot be ignored", formalDefinition = "May be used to represent additional information that is not part of the basic definition of the element, and that modifies the understanding of the element that contains it. Usually modifier elements provide negation or qualification. In order to make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions.")
  protected modifierExtension?: Extension[] | undefined;

  public getModifierExtension(): Extension[] | undefined {
    return this.modifierExtension;
  }

  public setModifierExtension(modifierExtension: Extension[] | undefined): this {
    this.modifierExtension = modifierExtension;
    return this;
  }

  public hasModifierExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getModifierExtensionsByUrl(url).length > 0;
    }
    return this.existsModifierExtension();
  }

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

  public addModifierExtension(modifierExtension?: Extension): this {
    if (!modifierExtension) {
      return this;
    }
    this.initModifierExtension();
    // @ts-expect-error: initModifierExtension() ensures this.modifierExtension exists
    this.modifierExtension.push(modifierExtension);
    return this;
  }

  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const results = this.getModifierExtension()!.filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  private initModifierExtension(): void {
    if (!this.modifierExtension) {
      this.modifierExtension = [] as Extension[];
    }
  }

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

  private getModifierExtensionsByUrl(url: fhirUri): Extension[] {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return this.getModifierExtension()!.filter((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return [] as Extension[];
  }

  public override fhirType(): string {
    return 'BackboneType';
  }

  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.modifierExtension);
  }

  public abstract override copy(): BackboneType;

  public override copyValues(dest: BackboneType): void {
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
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.PrimitiveType
 *
 * @see {@link https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model/PrimitiveType.java|HAPI FHIR PrimitiveType}
 * @see {@link https://hl7.org/fhir/R5/types.html#PrimitiveType|FHIR PrimitiveType}
 * @see {@link https://hl7.org/fhir/R5/datatypes.html#primitive|FHIR Primitives}
 */
export abstract class PrimitiveType<T> extends DataType implements IBase {
  protected constructor() {
    super();
  }

  private myCoercedValue: T | undefined;
  private myStringValue: string | undefined;

  public getValue(): T | undefined {
    return this.myCoercedValue;
  }

  public setValue(value?: T): this {
    this.myCoercedValue = value ?? undefined;
    this.updateStringValue();
    return this;
  }

  public hasValue(): boolean {
    return !!this.myCoercedValue;
  }

  public getValueAsString(): string | undefined {
    return this.myStringValue;
  }

  public setValueAsString(value?: string): void {
    this.myStringValue = value;
    if (value !== undefined) {
      this.myCoercedValue = this.parse(value);
    } else {
      this.myCoercedValue = undefined;
    }
  }

  private updateStringValue(): void {
    if (this.myCoercedValue !== undefined) {
      this.myStringValue = this.encode(this.myCoercedValue);
    } else {
      this.myStringValue = undefined;
    }
  }

  public abstract encode(value: T): string;

  public abstract parse(value: string): T;

  public override isEmpty(): boolean {
    return !this.hasValue();
  }

  public abstract override copy(): PrimitiveType<T>;

  public override copyValues(dest: PrimitiveType<T>): void {
    super.copyValues(dest);
  }
}

/**
 * Optional Extension Element.
 *
 * Every resource or datatype element may include one or more "extension" child elements.
 * The extension is either simple or complex. Simple extensions have only a value and no
 * nested extensions. Complex extensions contain one or more nested extensions and no value.
 * An extension can not have both a value and nested extensions.
 *
 * Loosely based on HAPI FHIR org.hl7.fhir.r4.model.Extension
 *
 * @see {@link https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model/Extension.java|HAPI FHIR Extension}
 * @see {@link https://hl7.org/fhir/R5/extensibility.html|FHIR Extensibility}
 */
export class Extension extends Element implements IBase {
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
   * Source of the definition for the extension code - a logical name or a URL.
   */
  //@Child(name = "url", type = { UriType.class }, order = 0, min = 1, max = 1, modifier = false, summary = false)
  //@Description(shortDefinition = "identifies the meaning of the extension", formalDefinition = "Source of the definition for the extension code - a logical name or a URL.")
  protected url: fhirUri;

  /**
   * Value of extension - must be one of a constrained set of the data types (see
   * [Extensibility](extensibility.html) for a list).
   */
  //@Child(name = "value", type = {}, order = 1, min = 0, max = 1, modifier = false, summary = false)
  //@Description(shortDefinition = "Value of extension", formalDefinition = "Value of extension - must be one of a constrained set of the data types (see [Extensibility](extensibility.html) for a list).")
  protected value?: DataType | undefined;

  public getUrl(): fhirUri {
    return this.url;
  }

  public setUrl(value: fhirUri): this {
    const parseResult = fhirUriSchema.safeParse(value);
    if (!parseResult.success) {
      throw new PrimitiveTypeError(`Invalid Extension.url (${value})`, parseResult.error);
    }
    this.url = parseResult.data;
    return this;
  }

  public hasUrl(): boolean {
    return !_isEmpty(this.url);
  }

  public getValue(): DataType | undefined {
    return this.value;
  }

  public setValue(value: DataType | undefined): this {
    this.value = value;
    return this;
  }

  public hasValue(): boolean {
    return this.value !== undefined && !this.value.isEmpty();
  }

  public override fhirType(): string {
    return 'Extension';
  }

  public override isEmpty() {
    return super.isEmpty() && isElementEmpty(this.value) && !this.hasUrl();
  }

  public override copy(): Extension {
    const dest = new Extension(this.url);
    this.copyValues(dest);
    return dest;
  }

  public override copyValues(dest: Extension): void {
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
