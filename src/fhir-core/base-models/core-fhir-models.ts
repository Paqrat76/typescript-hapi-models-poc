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
 * This module contains the core FHIR models.
 *
 * @remarks
 * The FHIR specification defines the Element type from which all other non-Resource types extend.
 * Its definition includes the FHIR Extension type. From a programming perspective, this introduces
 * circular dependencies because all of these types inherit from Element or one of its child types,
 * and they all include an element of a list of Extension types.
 *
 * In TypeScript, having each of these models in separate files results in circular dependencies
 * that cannot be resolved by typical strategies such as extracting common elements into a sharable
 * module. Therefore, these modules are collected into this single file. This preserves the correct
 * model representations with their correct inheritance without introducing circular dependencies.
 *
 * @see [FHIR Type Framework](https://hl7.org/fhir/R5/types.html)
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { Base } from './Base';
import { IBase } from './IBase';
import { REQUIRED_PROPERTIES_DO_NOT_EXIST } from '@src/fhir-core/constants';
import {
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { OPEN_DATA_TYPES } from '@src/fhir-core/data-types/FhirDataType';
import { isEmpty, upperFirst } from '@src/fhir-core/utility/common-util';
import { copyListValues, isElementEmpty, validateUrl } from '@src/fhir-core/utility/fhir-util';
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  isDefined,
  isDefinedList,
} from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { FhirError } from '@src/fhir-core/errors/FhirError';

//region Core Models

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

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
  getExtension: () => Extension[] | undefined;

  /**
   * Assigns the provided array of Extension values to the `extension` property.
   *
   * @param extension - array of Extensions
   */
  setExtension: (extension: Extension[] | undefined) => this;

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
  hasExtension: (url?: fhirUri) => boolean;

  /**
   * Returns the Extension having the provided url.
   *
   * @param url - the url that identifies a specific Extension
   * @throws AssertionError for invalid url
   */
  getExtensionByUrl: (url: fhirUri) => Extension | undefined;

  /**
   * Adds the provided Extension to the `extension` property array.
   *
   * @param extension - the Extension value to add to the `extension` property array
   */
  addExtension: (extension: Extension | undefined) => this;

  /**
   * Removes the Extension having the provided url from the `extension` property array.
   *
   * @param url - the url that identifies a specific Extension to remove
   * @throws AssertionError for invalid url
   */
  removeExtension: (url: fhirUri) => void;
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
  getModifierExtension: () => Extension[] | undefined;

  /**
   * Assigns the provided array of Extension values to the `modifierExtension` property.
   *
   * @param extension - array of Extensions
   */
  setModifierExtension: (extension: Extension[] | undefined) => this;

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
  hasModifierExtension: (url?: fhirUri) => boolean;

  /**
   * Returns the Extension having the provided url.
   *
   * @param url - the url that identifies a specific Extension
   * @throws AssertionError for invalid url
   */
  getModifierExtensionByUrl: (url: fhirUri) => Extension | undefined;

  /**
   * Adds the provided Extension to the `modifierExtension` property array.
   *
   * @param extension - the Extension value to add to the `modifierExtension` property array
   */
  addModifierExtension: (extension: Extension | undefined) => this;

  /**
   * Removes the Extension having the provided url from the `modifierExtension` property array.
   *
   * @param url - the url that identifies a specific Extension to remove
   * @throws AssertionError for invalid url
   */
  removeModifierExtension: (url: fhirUri) => void;
}

/**
 * Abstract Element Class
 *
 * @remarks
 * Base StructureDefinition for Element Type: Base definition for all elements in a resource.
 *
 * There are 3 kinds of descendant types that specialize Element:
 * - Primitive datatypes, that add a primitive value property of the specified type
 * - Complex datatypes, that add their own children (all of which are also elements)
 * - BackboneElement, a specialization that adds modifierExtension, which is the super-type of all the element types defined in resource definitions (e.g. Patient.contact)
 *
 * **FHIR Specification**
 *  - **Short:** Base for all elements
 *  - **Definition:** Base definition for all elements in a resource.
 *  - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Element
 *
 * @category Base Models
 * @see [FHIR Element](http://hl7.org/fhir/StructureDefinition/Element)
 */
export abstract class Element extends Base implements IBase, IBaseExtension {
  protected constructor() {
    super();
  }

  /**
   * Element.id Element
   *
   * @remarks
   * **FHIR Specification**
   *  - **Short:** Unique id for inter-element referencing
   *  - **Definition:** Unique id for the element within a resource (for internal references). This may be any string value that does not contain spaces.
   *  - **FHIR Type:** `string`
   *  - **Cardinality:** 0..1
   *  - **isModifier:** false
   *  - **isSummary:** false
   */
  private id?: fhirString | undefined;

  /**
   * Element.extension Element
   *
   * @remarks
   * **FHIR Specification**
   *  - **Short:** Additional content defined by implementations
   *  - **Definition:** May be used to represent additional information that is not part of the basic definition of the element. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.
   *  - **Comment:** There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.
   *  - **FHIR Type:** `Extension`
   *  - **Cardinality:** 0..*
   *  - **isModifier:** false
   *  - **isSummary:** false
   */
  private extension?: Extension[] | undefined;

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
    this.id =
      value === undefined
        ? undefined
        : parseFhirPrimitiveData(value, fhirStringSchema, `Invalid Element.id (${value})`);
    return this;
  }

  /**
   * @returns `true` if `id` exists and has a value; `false` otherwise
   */
  public hasId(): boolean {
    return !isEmpty(this.id);
  }

  /**
   * {@inheritDoc IBaseExtension.getExtension}
   */
  public getExtension(): Extension[] {
    return this.extension ?? ([] as Extension[]);
  }

  /**
   * {@inheritDoc IBaseExtension.setExtension}
   */
  public setExtension(extension: Extension[] | undefined): this {
    const optErrMsg = `Invalid Element.extension; Provided extension array has an element that is not an instance of Extension.`;
    assertFhirTypeList<Extension>(extension, Extension, optErrMsg);
    this.extension = extension;
    return this;
  }

  /**
   * {@inheritDoc IBaseExtension.hasExtension}
   */
  public hasExtension(url?: fhirUri): boolean {
    if (url !== undefined) {
      validateUrl(url);
      return this.getExtension().some((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return this.existsExtension();
  }

  /**
   * {@inheritDoc IBaseExtension.getExtensionByUrl}
   */
  public getExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasExtension()) {
      const results = this.getExtension().filter((ext) => ext.getUrl() && ext.getUrl() === url);
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
  public addExtension(extension: Extension | undefined): this {
    if (isDefined<Extension>(extension)) {
      const optErrMsg = `Invalid Element.extension; Provided extension is not an instance of Extension.`;
      assertFhirType<Extension>(extension, Extension, optErrMsg);
      this.initExtension();
      // @ts-expect-error: initExtension() ensures this.extension exists
      this.extension.push(extension);
    }
    return this;
  }

  /**
   * {@inheritDoc IBaseExtension.removeExtension}
   */
  public removeExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasExtension()) {
      const results = this.getExtension().filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setExtension(results);
    }
  }

  /**
   * Ensures the `extension` property exists and if not initializes it to an empty array.
   */
  private initExtension(): void {
    if (!this.hasExtension()) {
      this.extension = [] as Extension[];
    }
  }

  /**
   * Determines if `extension` property exists, and if so, determines if the `extension` array is empty.
   *
   * @returns `true` if the `extension` property array exists and has at least one element; false otherwise
   */
  private existsExtension(): boolean {
    return isDefinedList<Extension>(this.extension) && this.extension.some((item: Extension) => !item.isEmpty());
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Element';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return !this.hasId() && !this.hasExtension();
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
    const extensionList = copyListValues<Extension>(this.extension);
    dest.extension = extensionList.length === 0 ? undefined : extensionList;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (!this.hasId() && !this.hasExtension()) {
      return undefined;
    }

    const jsonObj: JSON.Object = {};

    if (this.hasId()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonObj['id'] = this.getId()!;
    }

    if (this.hasExtension()) {
      setFhirExtensionJson(this.getExtension(), jsonObj);
    }

    return jsonObj;
  }
}

/**
 * Abstract BackboneElement Class
 *
 * @remarks
 * Base StructureDefinition for BackboneElement Type: Base definition for all elements that are defined inside a resource - but not those in a data type.
 *
 * **FHIR Specification**
 *  - **Short:** Base for elements defined inside a resource
 *  - **Definition:** Base definition for all elements that are defined inside a resource - but not those in a data type.
 *  - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.BackboneElement
 *
 * @category Base Models
 * @see [FHIR BackboneElement](http://hl7.org/fhir/StructureDefinition/BackboneElement)
 */
export abstract class BackboneElement extends Element implements IBase, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
   * BackboneElement.modifierExtension Element
   *
   * @remarks
   * **FHIR Specification**
   *  - **Short:** Extensions that cannot be ignored even if unrecognized
   *  - **Definition:** May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions. Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).
   *  - **Comment:** There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.
   *  - **Requirements:** Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](https://hl7.org/fhir/R4/extensibility.html#modifierExtension).
   *  - **FHIR Type:** `Extension`
   *  - **Cardinality:** 0..*
   *  - **isModifier:** true
   *  - **isModifierReason:** Modifier extensions are expected to modify the meaning or interpretation of the element that contains them
   *  - **isSummary:** true
   */
  private modifierExtension?: Extension[] | undefined;

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtension}
   */
  public getModifierExtension(): Extension[] {
    return this.modifierExtension ?? ([] as Extension[]);
  }

  /**
   * {@inheritDoc IBaseModifierExtension.setModifierExtension}
   */
  public setModifierExtension(modifierExtension: Extension[] | undefined): this {
    const optErrMsg = `Invalid BackboneElement.modifierExtension; Provided extension array has an element that is not an instance of Extension.`;
    assertFhirTypeList<Extension>(modifierExtension, Extension, optErrMsg);
    this.modifierExtension = modifierExtension;
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.hasModifierExtension}
   */
  public hasModifierExtension(url?: fhirUri): boolean {
    if (url !== undefined) {
      validateUrl(url);
      return this.getModifierExtension().some((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return this.existsModifierExtension();
  }

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtensionByUrl}
   */
  public getModifierExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      const results = this.getModifierExtension().filter((ext) => ext.getUrl() && ext.getUrl() === url);
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
  public addModifierExtension(extension: Extension | undefined): this {
    if (isDefined<Extension>(extension)) {
      const optErrMsg = `Invalid BackboneElement.modifierExtension; Provided extension is not an instance of Extension.`;
      assertFhirType<Extension>(extension, Extension, optErrMsg);
      this.initModifierExtension();
      // @ts-expect-error: initModifierExtension() ensures this.modifierExtension exists
      this.modifierExtension.push(extension);
    }
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.removeModifierExtension}
   */
  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      const results = this.getModifierExtension().filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  /**
   * Ensures the `modifierExtension` property exists and if not initializes it to an empty array.
   */
  private initModifierExtension(): void {
    if (!this.hasModifierExtension()) {
      this.modifierExtension = [] as Extension[];
    }
  }

  /**
   * Determines if `modifierExtension` property exists, and if not, determines if the `modifierExtension`
   * array is empty.
   *
   * @returns `true` if the `modifierExtension` exists and has at least one element; false otherwise
   */
  private existsModifierExtension(): boolean {
    return (
      this.modifierExtension !== undefined &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension.some((item: Extension) => !item.isEmpty())
    );
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'BackboneElement';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.modifierExtension);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public abstract override copy(): BackboneElement;

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: BackboneElement): void {
    super.copyValues(dest);
    const modifierExtensionList = copyListValues<Extension>(this.modifierExtension);
    dest.modifierExtension = modifierExtensionList.length === 0 ? undefined : modifierExtensionList;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    if (this.hasModifierExtension()) {
      setFhirExtensionJson(this.getModifierExtension(), jsonObj, true);
    }

    return jsonObj;
  }
}

/**
 * Abstract DataType Class
 *
 * @remarks
 * DataType Type: The base class for all re-useable types defined as part of the FHIR Specification.
 *
 * **FHIR Specification**
 * - **Short:** Reuseable Types
 * - **Definition:** The base class for all re-useable types defined as part of the FHIR Specification.
 * - **FHIR Version:** 5.0.0; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.DataType
 *
 * @category Base Models
 * @see [FHIR DataType](http://hl7.org/fhir/StructureDefinition/DataType)
 */
export abstract class DataType extends Element implements IBase {
  protected constructor() {
    super();
  }

  /**
   * {@inheritDoc Base.copy}
   */
  abstract override copy(): DataType;
}

/**
 * Abstract BackboneType Class
 *
 * @remarks
 * BackboneType Type: Base definition for the few data types that are allowed to carry modifier extensions.
 *
 * **FHIR Specification**
 *  - **Short:** Base for datatypes that can carry modifier extensions
 *  - **Definition:** Base definition for the few data types that are allowed to carry modifier extensions.
 *  - **FHIR Version:** 5.0.0; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.BackboneType
 *
 * @category Base Models
 * @see [FHIR BackboneType](http://hl7.org/fhir/StructureDefinition/BackboneType)
 */
export abstract class BackboneType extends DataType implements IBase, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
   * BackboneType.modifierExtension Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Extensions that cannot be ignored even if unrecognized
   * - **Definition:** May be used to represent additional information that is not part of the basic definition of the element and that modifies the understanding of the element in which it is contained and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and managable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions. Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).
   * - **Comment:** There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.
   * - **Requirements:** Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](https://hl7.org/fhir/R4/extensibility.html#modifierExtension).
   * - **FHIR Type:** `Extension`
   * - **Cardinality:** 0..*
   * - **isModifier:** true
   * - **isModifierReason:** Modifier extensions are expected to modify the meaning or interpretation of the element that contains them
   * - **isSummary:** true
   */
  private modifierExtension?: Extension[] | undefined;

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtension}
   */
  public getModifierExtension(): Extension[] {
    return this.modifierExtension ?? ([] as Extension[]);
  }

  /**
   * {@inheritDoc IBaseModifierExtension.setModifierExtension}
   */
  public setModifierExtension(modifierExtension: Extension[] | undefined): this {
    const optErrMsg = `Invalid BackboneType.modifierExtension; Provided extension array has an element that is not an instance of Extension.`;
    assertFhirTypeList<Extension>(modifierExtension, Extension, optErrMsg);
    this.modifierExtension = modifierExtension;
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.hasModifierExtension}
   */
  public hasModifierExtension(url?: fhirUri): boolean {
    if (url !== undefined) {
      validateUrl(url);
      return this.getModifierExtension().some((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return this.existsModifierExtension();
  }

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtensionByUrl}
   */
  public getModifierExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      const results = this.getModifierExtension().filter((ext) => ext.getUrl() && ext.getUrl() === url);
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
  public addModifierExtension(extension: Extension | undefined): this {
    if (isDefined<Extension>(extension)) {
      const optErrMsg = `Invalid BackboneType.modifierExtension; Provided extension is not an instance of Extension.`;
      assertFhirType<Extension>(extension, Extension, optErrMsg);
      this.initModifierExtension();
      // @ts-expect-error: initModifierExtension() ensures this.modifierExtension exists
      this.modifierExtension.push(extension);
    }
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.removeModifierExtension}
   */
  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      const results = this.getModifierExtension().filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  /**
   * Ensures the `modifierExtension` exists and if not initializes it to an empty array.
   */
  private initModifierExtension(): void {
    if (!this.hasModifierExtension()) {
      this.modifierExtension = [] as Extension[];
    }
  }

  /**
   * Determines if `modifierExtension` property exists, and if not, determines if the `modifierExtension`
   * array is empty.
   *
   * @returns `true` if the `modifierExtension` property exists and has at least one element; false otherwise
   */
  private existsModifierExtension(): boolean {
    return (
      this.modifierExtension !== undefined &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension.some((item: Extension) => !item.isEmpty())
    );
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'BackboneType';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.modifierExtension);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public abstract override copy(): BackboneType;

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: BackboneType): void {
    super.copyValues(dest);
    const modifierExtensionList = copyListValues<Extension>(this.modifierExtension);
    dest.modifierExtension = modifierExtensionList.length === 0 ? undefined : modifierExtensionList;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    if (this.hasModifierExtension()) {
      setFhirExtensionJson(this.getModifierExtension(), jsonObj, true);
    }

    return jsonObj;
  }
}

/**
 * Abstract PrimitiveType Class
 *
 * @remarks
 * PrimitiveType Type: The base type for all re-useable types defined that have a simple property.
 *
 * **FHIR Specification**
 * - **Short:** Parent type for DataTypes with a simple value
 * - **Definition:** The base type for all re-useable types defined that have a simple property.
 * - **FHIR Version:** 5.0.0; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.PrimitiveType
 *
 * @category Base Models
 * @typeParam T - the primitive type
 * @see [FHIR PrimitiveType](http://hl7.org/fhir/StructureDefinition/PrimitiveType)
 */
export abstract class PrimitiveType<T> extends DataType implements IBase {
  protected constructor() {
    super();
    this.coercedValue = undefined;
    this.stringValue = undefined;
  }

  /**
   * T - primitive type defined in primitive-types.ts
   */
  private coercedValue: T | undefined;

  /**
   * `string` representation of T
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
      this.coercedValue = this.parseToPrimitive(value);
    } else {
      this.coercedValue = undefined;
    }
  }

  /**
   * Updates this.stringValue based on the current this.coercedValue.
   *
   * @throws PrimitiveTypeError for invalid value
   */
  private updateStringValue(): void {
    if (this.coercedValue !== undefined) {
      this.stringValue = this.encodeToString(this.coercedValue);
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
  public abstract encodeToString(value: T): string;

  /**
   * Parses the provided `string` value and coerces it into the generic T value.
   *
   * @param value - the `string` representation of the generic T value
   * @returns the generic T value
   * @throws PrimitiveTypeError for invalid value
   */
  public abstract parseToPrimitive(value: string): T;

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return !this.hasValue();
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public abstract override copy(): PrimitiveType<T>;

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: PrimitiveType<T>): void {
    super.copyValues(dest);
  }

  /**
   * {@inheritDoc IBase.isPrimitive}
   */
  public override isPrimitive(): boolean {
    return true;
  }

  /**
   * @returns the primitive data type's JSON value containing the actual primitive's value
   *
   * @see [Representations - JSON](https://hl7.org/fhir/R5/datatypes.html#representations)
   * @see {@link PrimitiveType.toSiblingJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    return this.hasValue() ? (this.getValue() as JSON.Value) : undefined;
  }

  /**
   * @returns the primitive data type's sibling JSON value containing the `id` and/or `extension` properties
   *
   * @see [Representations - JSON](https://hl7.org/fhir/R5/datatypes.html#representations)
   * @see {@link PrimitiveType.toJSON}
   */
  public toSiblingJSON(): JSON.Value | undefined {
    // from the parent Element
    return super.toJSON();
  }
}

/**
 * Extension Class
 *
 * @remarks
 * Base StructureDefinition for Extension Type: Optional Extension Element - found in all resources.
 *
 * **FHIR Specification**
 * - **Short:** Optional Extensions Element
 * - **Definition:** Optional Extension Element - found in all resources.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Extension
 *
 * @category Base Models
 * @see [FHIR Extension](http://hl7.org/fhir/StructureDefinition/Extension)
 * @see [FHIR Extensibility](https://hl7.org/fhir/R4/extensibility.html)
 */
export class Extension extends Element implements IBase {
  /**
   * @param url - Source of the definition for the Extension - a logical name or a URL.
   * @param value - Value of Extension
   * @throws PrimitiveTypeError for invalid url
   */
  constructor(url: fhirUri | null, value?: DataType) {
    super();

    if (url === null) {
      this.url = null;
    } else {
      this.url = parseFhirPrimitiveData(url, fhirUriSchema, `Invalid Extension.url (${url})`);
    }

    this.setValue(value);
  }

  /**
   * Extension.url Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** identifies the meaning of the extension
   * - **Definition:** Source of the definition for the extension code - a logical name or a URL.
   * - **Comment:** The definition may point directly to a computable or human-readable definition of the extensibility codes, or it may be a logical URI as declared in some other specification. The definition SHALL be a URI for the Structure Definition defining the extension.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private url: fhirUri | null;

  /**
   * Extension.value[x] Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Value of extension
   * - **Definition:** Value of extension - must be one of a constrained set of the data types.
   * - **FHIR Types:**
   *   - Refer to [Open Type Element](https://hl7.org/fhir/R4/datatypes.html#open)
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private value?: DataType | undefined;

  /**
   * @returns the `url` property value
   */
  public getUrl(): fhirUri | null {
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
    if (isDefined<fhirUri>(value)) {
      this.url = parseFhirPrimitiveData(value, fhirUriSchema, `Invalid Extension.url (${value})`);
    }
    return this;
  }

  /**
   * @returns `true` if the `url` property exists and has a value; `false` otherwise
   */
  public hasUrl(): boolean {
    return !isEmpty(this.url);
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
   * @decorator `@OpenDataTypes()`
   *
   * @param value - the `value` value
   * @returns this
   */
  @OpenDataTypes('Extension.value[x]')
  public setValue(value: DataType | undefined): this {
    if (isDefined<DataType>(value)) {
      // assertFhirType<DataType>(value, DataType) unnecessary because @OpenDataTypes decorator ensures proper type/value
      this.value = value;
    } else {
      this.value = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return isDefined<DataType>(this.value) && !this.value.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Extension';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty() {
    return super.isEmpty() && isElementEmpty(this.value) && !this.hasUrl();
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Extension {
    const dest = new Extension(this.url);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Extension): void {
    super.copyValues(dest);
    dest.url = this.url;
    dest.value = this.value ? this.value.copy() : undefined;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }

    const jsonObj: JSON.Object = {};

    // Extension extends Element containing the id and extensions properties. The id property
    // is rarely used in an Extension but since it is permissible, include it if it exists.
    // The child extensions, if they exist, are handled below.
    if (this.hasId()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonObj['id'] = this.getId()!;
    }

    // The url is a mandatory attribute / property so it should always exist.
    if (this.hasUrl()) {
      jsonObj['url'] = this.getUrl();
    } else {
      throw new FhirError(`${REQUIRED_PROPERTIES_DO_NOT_EXIST} Extension.url`);
    }

    // An extension SHALL have either a value (i.e. a value[x] element) or sub-extensions, but not both.
    // If present, the value[x] element SHALL have content (value attribute or other elements)
    if (this.hasValue()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getValue()!, 'value', jsonObj);
    } else if (this.hasExtension()) {
      setFhirExtensionJson(this.getExtension(), jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns */

//endregion

// region FHIR JSON Helpers

/**
 * FHIR JSON Helpers
 *
 * @privateRemarks
 * Due to TypeScript circular references, the following JSON helpers are included in this and other modules.
 * Other JSON helpers are included in fhir-core/utility/json-helpers.ts
 */

/**
 * Transforms the provided FHIR DataType to its JSON representation and adds it to the provided JSON.Object.
 * Does nothing if the FHIR DataType's value is undefined.
 *
 * @param value - Polymorphic DataType value
 * @param propName - the property name for the provided FHIR DataType
 * @param jsonObj - JSON.Object to which to add the transformed FHIR DataType
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setPolymorphicValueJson(value: DataType, propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<DataType>(value, 'Provided value is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assertFhirDataType(value, 'Provided value is not an instance of DataType');

  const xPos = propName.toLowerCase().indexOf('[x]');
  const valuePrefix = propName.toLowerCase().endsWith('[x]') ? propName.substring(0, xPos) : propName;
  const fhirType = value.fhirType();
  const valueKeyName = `${valuePrefix}${upperFirst(fhirType)}`;

  const json: JSON.Value | undefined = value.toJSON();
  if (json === null) {
    jsonObj[valueKeyName] = null;
  } else if (typeof json === 'boolean') {
    jsonObj[valueKeyName] = json;
  } else if (typeof json === 'number') {
    jsonObj[valueKeyName] = json;
  } else if (!isEmpty(json)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    jsonObj[valueKeyName] = json!;
  }
}

/**
 * Transforms the provided FHIR Extensions to their JSON representations and adds them to the provided JSON.Object.
 * Does nothing if the individual FHIR Extensions are undefined.
 *
 * @param extensions - FHIR Extensions to be transformed (can be empty array)
 * @param jsonObj - JSON.Object to which to add the transformed Extensions
 * @param isModifierExtension - optional boolean (default: `false`); sets JSON object key name to `modifierExtension` if true; otherwise `extension`
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirExtensionJson(extensions: Extension[], jsonObj: JSON.Object, isModifierExtension = false): void {
  assertIsDefined<Extension[]>(extensions, 'Provided extensions is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');

  const jsonExtension = [] as JSON.Array;
  for (const extension of extensions) {
    assertFhirType<Extension>(extension, Extension, 'Provided item in extensions is not an instance of Extension');
    const extJson = extension.toJSON();
    if (!isEmpty(extJson)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonExtension.push(extJson!);
    }
  }

  if (jsonExtension.length > 0) {
    const propName = isModifierExtension ? 'modifierExtension' : 'extension';
    jsonObj[propName] = jsonExtension;
  }
}

/**
 * Transforms the provided FHIR primitive DataType to its JSON representation and adds it to the provided JSON.Object.
 * Does nothing if the FHIR primitive DataType's value is undefined.
 *
 * @typeParam T - the FHIR primitive type
 * @param ptElement - FHIR primitive DataType to transform
 * @param propName - the property name for the provided FHIR primitive DataType
 * @param jsonObj - JSON.Object to which to add the transformed FHIR primitive DataType
 * @throws AssertionError for invalid parameters
 *
 * @see [JSON representation of primitive elements](https://hl7.org/fhir/R4/json.html#primitive)
 * @category Utilities: JSON
 */
export function setFhirPrimitiveJson<T>(ptElement: PrimitiveType<T>, propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<PrimitiveType<T>>(ptElement, 'Provided ptElement is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');
  assertFhirPrimitiveType<T>(ptElement, 'Provided ptElement is not an instance of PrimitiveType');

  const primitiveValue: JSON.Value | undefined = ptElement.toJSON();
  if (primitiveValue === undefined) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jsonObj[propName] = primitiveValue!;

  const siblingJson: JSON.Value | undefined = ptElement.toSiblingJSON();
  if (!isEmpty(siblingJson)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    jsonObj[`_${propName}`] = siblingJson!;
  }
}

/**
 * Transforms the provided array of FHIR primitive DataType to their JSON representation and adds it to the provided
 * JSON.Object. Does nothing if the FHIR primitive DataType's value is undefined.
 *
 * @typeParam T - the FHIR primitive type
 * @param ptElements - array of FHIR primitive DataTypes to transform (can be empty array)
 * @param propName - the property name for the provided FHIR complex DataTypes
 * @param jsonObj - JSON.Object to which to add the transformed FHIR complex DataTypes
 * @throws AssertionError for invalid parameters
 *
 * @see [JSON representation of primitive elements](https://hl7.org/fhir/R4/json.html#primitive)
 * @category Utilities: JSON
 */
export function setFhirPrimitiveListJson<T>(
  ptElements: PrimitiveType<T>[],
  propName: string,
  jsonObj: JSON.Object,
): void {
  assertIsDefined<PrimitiveType<T>[]>(ptElements, 'Provided ptElements is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');

  const jsonArray: JSON.Array = [];
  const siblingArray: JSON.Array = [];
  for (const ptElement of ptElements) {
    assertFhirPrimitiveType<T>(ptElement, 'Provided item in ptElements is not an instance of PrimitiveType');
    const primitiveValue: JSON.Value | undefined = ptElement.toJSON();
    if (isEmpty(primitiveValue)) {
      jsonArray.push(null);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonArray.push(primitiveValue!);
    }

    const siblingJson: JSON.Value | undefined = ptElement.toSiblingJSON();
    if (isEmpty(siblingJson)) {
      siblingArray.push(null);
    } else {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      siblingArray.push(siblingJson!);
    }
  }

  if (jsonArray.length > 0) {
    // Add primitive content if and only if there is at least one non-null data element
    const nonNullArray = jsonArray.filter((value) => value !== null);
    if (nonNullArray.length > 0) {
      jsonObj[propName] = jsonArray;
    }
  }
  if (siblingArray.length > 0) {
    // Add sibling content if and only if there is at least one non-null data element
    const nonNullArray = siblingArray.filter((value) => value !== null);
    if (nonNullArray.length > 0) {
      jsonObj[`_${propName}`] = siblingArray;
    }
  }
}

/**
 * Transforms the provided FHIR complex DataType to its JSON representation and adds it to the provided JSON.Object.
 * Does nothing if the FHIR complex DataType's value is undefined.
 *
 * @param cElement - FHIR complex DataType to transform
 * @param propName - the property name for the provided FHIR complex DataType
 * @param jsonObj - JSON.Object to which to add the transformed FHIR complex DataType
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirComplexJson(cElement: DataType, propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<DataType>(cElement, 'Provided cElement is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');
  assertFhirDataType(cElement, 'Provided cElement is not an instance of DataType');

  const complexValue: JSON.Value | undefined = cElement.toJSON();
  if (isEmpty(complexValue)) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jsonObj[propName] = complexValue!;
}

/**
 * Transforms the provided array of FHIR complex DataType to their JSON representation and adds it to the provided
 * JSON.Object. Does nothing if the FHIR complex DataType's value is undefined.
 *
 * @param cElements - array of FHIR complex DataTypes to transform (can be empty array)
 * @param propName - the property name for the provided FHIR complex DataTypes
 * @param jsonObj - JSON.Object to which to add the transformed FHIR complex DataTypes
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirComplexListJson(cElements: DataType[], propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<DataType[]>(cElements, 'Provided cElements is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');

  const jsonArray: JSON.Array = [];
  for (const cElement of cElements) {
    assertFhirDataType(cElement, 'Provided item in cElements is not an instance of DataType');
    const complexValue: JSON.Value | undefined = cElement.toJSON();
    if (!isEmpty(complexValue)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonArray.push(complexValue!);
    }
  }
  if (jsonArray.length > 0) {
    jsonObj[propName] = jsonArray;
  }
}

/**
 * Transforms the provided FHIR BackboneElement to its JSON representation and adds it to the provided JSON.Object.
 * Does nothing if the FHIR BackboneElement's value is undefined.
 *
 * @param bElement - FHIR BackboneElement to transform
 * @param propName - the property name for the provided FHIR BackboneElement
 * @param jsonObj - JSON.Object to which to add the transformed FHIR BackboneElement
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirBackboneElementJson(bElement: BackboneElement, propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<BackboneElement>(bElement, 'Provided bElement is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');
  assertFhirBackboneElement(bElement, 'Provided bElement is not an instance of BackboneElement');

  const backboneValue: JSON.Value | undefined = bElement.toJSON();
  if (isEmpty(backboneValue)) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jsonObj[propName] = backboneValue!;
}

/**
 * Transforms the provided array of FHIR BackboneElement to their JSON representation and adds it to the provided
 * JSON.Object. Does nothing if the FHIR BackboneElement's value is undefined.
 *
 * @param bElements - array of FHIR BackboneElements to transform (can be empty array)
 * @param propName - the property name for the provided FHIR BackboneElements
 * @param jsonObj - JSON.Object to which to add the transformed FHIR BackboneElements
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirBackboneElementListJson(
  bElements: BackboneElement[],
  propName: string,
  jsonObj: JSON.Object,
): void {
  assertIsDefined<BackboneElement[]>(bElements, 'Provided bElements is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');

  const jsonArray: JSON.Array = [];
  for (const bElement of bElements) {
    assertFhirBackboneElement(bElement, 'Provided bElement is not an instance of BackboneElement');
    const backboneValue: JSON.Value | undefined = bElement.toJSON();
    if (!isEmpty(backboneValue)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonArray.push(backboneValue!);
    }
  }
  if (jsonArray.length > 0) {
    jsonObj[propName] = jsonArray;
  }
}

/**
 * Transforms the provided FHIR BackboneType to its JSON representation and adds it to the provided JSON.Object.
 * Does nothing if the FHIR BackboneElement's value is undefined.
 *
 * @param bType - FHIR BackboneType to transform
 * @param propName - the property name for the provided FHIR BackboneType
 * @param jsonObj - JSON.Object to which to add the transformed FHIR BackboneType
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirBackboneTypeJson(bType: BackboneType, propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<BackboneType>(bType, 'Provided bType is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');
  assertFhirBackboneType(bType, 'Provided bType is not an instance of BackboneType');

  const backboneValue: JSON.Value | undefined = bType.toJSON();
  if (isEmpty(backboneValue)) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jsonObj[propName] = backboneValue!;
}

/**
 * Transforms the provided array of FHIR BackboneType to their JSON representation and adds it to the provided
 * JSON.Object. Does nothing if the FHIR BackboneType's value is undefined.
 *
 * @param bTypes - array of FHIR BackboneType to transform (can be empty array)
 * @param propName - the property name for the provided FHIR BackboneTypes
 * @param jsonObj - JSON.Object to which to add the transformed FHIR BackboneTypes
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirBackboneTypeListJson(bTypes: BackboneType[], propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<BackboneType[]>(bTypes, 'Provided bTypes is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assert(!isEmpty(propName), 'Provided propName is empty');

  const jsonArray: JSON.Array = [];
  for (const bType of bTypes) {
    assertFhirBackboneType(bType, 'Provided bType is not an instance of BackboneType');
    const backboneValue: JSON.Value | undefined = bType.toJSON();
    if (!isEmpty(backboneValue)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonArray.push(backboneValue!);
    }
  }
  if (jsonArray.length > 0) {
    jsonObj[propName] = jsonArray;
  }
}

//endregion

// region TypeScript Decorators

/**
 * TypeScript Decorators
 *
 * @privateRemarks
 * Due to TypeScript circular references, the following decorator definitions are included in this module.
 * Other decorator definitions are included in fhir-core/utility/decorators.ts
 */

/**
 * Factory function for OpenDataTypes decorator for open data type "set" methods
 *
 * @remarks
 * This decorator validates the data type of the provided "set" method argument against the list
 * of the FhirOpenDataType. The FhirOpenDataType are expressed as FHIR primitive and/or
 * complex data type names. These values are available in each data type class as `instance.fhirType()`.
 * FhirOpenDataTypes are used in the following places: ElementDefinition, Extension, Parameters, Task,
 * and Transport (R5).
 *
 * @privateRemarks
 * The OpenDataTypesMeta() decorator exists in fhir-core/utility/decorators.ts
 *
 * @param sourceField - source field name
 * @returns OpenDataTypes decorator
 * @throws AssertionError for invalid uses
 * @throws InvalidTypeError for actual data type does not agree with the specified FhirOpenDataType
 *
 * @category Decorators
 */
export function OpenDataTypes(sourceField: string) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    return function (this: This, ...args: Args): Return {
      const methodName = String(context.name);
      assert(
        args.length === 1 && (args[0] === undefined || args[0] === null || args[0] instanceof DataType),
        `OpenDataTypes decorator on ${methodName} (${sourceField}) expects a single argument to be type of 'DataType | undefined | null'`,
      );
      // undefined supports optional argument
      const value = args[0] as DataType | undefined | null;

      // Return the original function if there is nothing for this decorator to do:
      // - Decorator should only be used on a method defined as:
      //   `public set[PropertyName](value: DataType | undefined): this`
      // - value is undefined
      if (!methodName.startsWith('set') || value === undefined || value === null) {
        return originalMethod.call(this, ...args);
      }

      const isValidOpenDataType = OPEN_DATA_TYPES.some((datatype) => value.fhirType() === datatype);

      if (!isValidOpenDataType) {
        throw new InvalidTypeError(
          `OpenDataTypes decorator on ${methodName} (${sourceField}) expects the 'value' argument type (${value.fhirType()}) to be a supported DataType`,
        );
      }

      return originalMethod.call(this, ...args);
    };
  };
}

//endregion

// region TypeScript Type Assertions

/**
 * TypeScript Type Assertions
 *
 * @privateRemarks
 * Due to TypeScript circular references, the following type assertion definitions are included in this module.
 * Other type assertion definitions are included in fhir-core/utility/type-guards.ts
 */

/**
 * FHIR BackboneElement assertion for any FHIR data type class
 *
 * @param classInstance - class instance to evaluate
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when BackboneElement assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirBackboneElement(
  classInstance: unknown,
  errorMessage?: string,
): asserts classInstance is BackboneElement {
  if (!(classInstance instanceof BackboneElement)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of BackboneElement.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * FHIR BackboneType assertion for any FHIR data type class
 *
 * @param classInstance - class instance to evaluate
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when BackboneType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirBackboneType(
  classInstance: unknown,
  errorMessage?: string,
): asserts classInstance is BackboneType {
  if (!(classInstance instanceof BackboneType)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of BackboneType.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * FHIR DataType assertion for any FHIR data type class
 *
 * @param classInstance - class instance to evaluate
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when DataType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirDataType(classInstance: unknown, errorMessage?: string): asserts classInstance is DataType {
  if (!(classInstance instanceof DataType)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of DataType.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * FHIR DataType assertion for any FHIR primitive type class
 *
 * @typeParam T - the FHIR primitive type
 * @param classInstance - class instance to evaluate
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when DataType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirPrimitiveType<T>(
  classInstance: unknown,
  errorMessage?: string,
): asserts classInstance is PrimitiveType<T> {
  if (!(classInstance instanceof PrimitiveType)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of PrimitiveType.`;
    throw new InvalidTypeError(errMsg);
  }
}

// endregion
