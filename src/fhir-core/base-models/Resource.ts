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
 * This module contains the Resource core FHIR model along with other resource related functions.
 *
 * @privateRemarks
 * The FHIR ResourceType assertion contains a reference to the Resource data model that results
 * in a circular reference when it was in the type-guards.ts module. Therefore, the FHIR ResourceType
 * assertion function was moved into this module.
 *
 * The setFhirResourceJson/setFhirResourceListJson contains a reference to the Resource data model
 * that results in a circular reference when it was in the json-helpers.ts module. Therefore, these
 * functions were moved into this module.
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { Base } from '@src/fhir-core/base-models/Base';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { RESOURCE_TYPES, FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import {
  fhirCode,
  fhirCodeSchema,
  fhirId,
  fhirIdSchema,
  fhirUri,
  fhirUriSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { setFhirComplexJson, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { isEmpty as _isEmpty } from '@src/fhir-core/utility/common-util';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType, assertIsDefined, isDefined } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Abstract Resource Class
 *
 * @remarks
 * This is the base resource type for everything.
 *
 * This specification defines a series of different types of resource that can be used to exchange and/or store data in order to solve a wide range of healthcare related problems, both clinical and administrative. In addition, this specification defines several different ways of exchanging the resources.
 *
 * A resource is an entity that:
 * - has a known identity (a URL) by which it can be addressed
 * - identifies itself as one of the types of resource defined in this specification
 * - contains a set of structured data items as described by the definition of the resource type
 * - has an identified version that changes if the contents of the resource change.
 *
 * **FHIR Specification**
 * - **Short:** Base Resource.
 * - **Definition:** This is the base resource type for everything.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Resource
 *
 * @category Base Models
 * @see [FHIR Resource](http://hl7.org/fhir/StructureDefinition/Resource)
 */
export abstract class Resource extends Base implements IBase {
  protected constructor() {
    super();
  }

  /**
   * Parse the provided json to instantiate the data model.
   *
   * @remarks
   *
   * @param _sourceJson - JSON representing FHIR resource
   * @returns Data model or undefined
   *
   * @abstract
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public static parse(_sourceJson: JSON.Object): Resource | undefined {
    throw new Error(
      'parse() not implemented in abstract Resource - must be implemented in subclass of Resource/DomainResource',
    );
  }

  /**
   * @returns the FHIR resource type as defined by the FHIR specification
   */
  public abstract resourceType(): FhirResourceType;

  /**
   * Resource.id Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Logical id of this artifact
   * - **Definition:** The logical id of the resource, as used in the URL for the resource. Once assigned, this value never changes.
   * - **Comment:** The only time that a resource does not have an id is when it is being submitted to the server using a create operation.
   * - **FHIR Type:** `id`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private id?: IdType | undefined;

  /**
   * Resource.meta Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Metadata about the resource
   * - **Definition:** The metadata about the resource. This is content that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.
   * - **FHIR Type:** `Meta`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private meta?: Meta | undefined;

  /**
   * Resource.implicitRules Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A set of rules under which this content was created
   * - **Definition:** A reference to a set of rules that were followed when the resource was constructed, and which must be understood when processing the content. Often, this is a reference to an implementation guide that defines the special rules along with other profiles etc.
   * - **Comment:** Asserting this rule set restricts the content to be only understood by a limited set of trading partners. This inherently limits the usefulness of the data in the long term. However, the existing health eco-system is highly fractured, and not yet ready to define, collect, and exchange data in a generally computable sense. Wherever possible, implementers and/or specification writers should avoid using this element. Often, when used, the URL is a reference to an implementation guide that defines these special rules as part of it's narrative along with other profiles, value sets, etc.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This element is labeled as a modifier because the implicit rules may provide additional knowledge about the resource that modifies it's meaning or interpretation
   * - **isSummary:** true
   */
  private implicitRules?: UriType | undefined;

  /**
   * Resource.language Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Language of the resource content
   * - **Definition:** The base language in which the resource is written.
   * - **Comment:** Language is provided to support indexing and accessibility (typically, services such as text to speech use the language tag). The html language tag in the narrative applies  to the narrative. The language tag on the resource may be used to specify the language of other presentations generated from the data in the resource. Not all the content has to be in the base language. The Resource.language should not be assumed to apply to the narrative automatically. If a language is specified, it should it also be specified on the div element in the html (see rules in HTML5 for information about the relationship between xml:lang and the html lang attribute).
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private language?: CodeType | undefined;

  /**
   * @returns the `id` property value as a PrimitiveType
   */
  public getIdElement(): IdType {
    return this.id ?? new IdType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `id` property.
   *
   * @param element - the `id` value
   * @returns this
   */
  public setIdElement(element: IdType | undefined): this {
    const optErrMsg = `Invalid Resource.id; Provided value is not an instance of IdType.`;
    assertFhirType<IdType>(element, IdType, optErrMsg);
    this.id = element;
    return this;
  }

  /**
   * @returns `true` if the `id` property exists and has a value; `false` otherwise
   */
  public hasIdElement(): boolean {
    return isDefined<IdType>(this.id) && !this.id.isEmpty();
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
    this.id =
      value === undefined
        ? undefined
        : new IdType(parseFhirPrimitiveData(value, fhirIdSchema, `Invalid Resource.id (${value})`));
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
  public getMeta(): Meta {
    return this.meta ?? new Meta();
  }

  /**
   * Assigns the provided value to the `meta` property.
   *
   * @param value - the `meta` value
   * @returns this
   */
  public setMeta(value: Meta | undefined): this {
    const optErrMsg = `Invalid Resource.meta; Provided value is not an instance of Meta.`;
    assertFhirType<Meta>(value, Meta, optErrMsg);
    this.meta = value;
    return this;
  }

  /**
   * @returns `true` if the `meta` property exists and has a value; `false` otherwise
   */
  public hasMeta(): boolean {
    return isDefined<Meta>(this.meta) && !this.meta.isEmpty();
  }

  /**
   * @returns the `implicitRules` property value as a PrimitiveType
   */
  public getImplicitRulesElement(): UriType {
    return this.implicitRules ?? new UriType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `implicitRules` property.
   *
   * @param element - the `implicitRules` value
   * @returns this
   */
  public setImplicitRulesElement(element: UriType | undefined): this {
    const optErrMsg = `Invalid Resource.implicitRules; Provided value is not an instance of UriType.`;
    assertFhirType<UriType>(element, UriType, optErrMsg);
    this.implicitRules = element;
    return this;
  }

  /**
   * @returns `true` if the `implicitRules` property exists and has a value; `false` otherwise
   */
  public hasImplicitRulesElement(): boolean {
    return isDefined<UriType>(this.implicitRules) && !this.implicitRules.isEmpty();
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
    this.implicitRules =
      value === undefined
        ? undefined
        : new UriType(parseFhirPrimitiveData(value, fhirUriSchema, `Invalid Resource.implicitRules (${value})`));
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
  public getLanguageElement(): CodeType {
    return this.language ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `language` property.
   *
   * @param element - the `language` value
   * @returns this
   */
  public setLanguageElement(element: CodeType | undefined): this {
    const optErrMsg = `Invalid Resource.language; Provided value is not an instance of CodeType.`;
    assertFhirType<CodeType>(element, CodeType, optErrMsg);
    this.language = element;
    return this;
  }

  /**
   * @returns `true` if the `language` property exists and has a value; `false` otherwise
   */
  public hasLanguageElement(): boolean {
    return isDefined<CodeType>(this.language) && !this.language.isEmpty();
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
    this.language =
      value === undefined
        ? undefined
        : new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, `Invalid Resource.language (${value})`));
    return this;
  }

  /**
   * @returns `true` if the `language` property exists and has a value; `false` otherwise
   */
  public hasLanguage(): boolean {
    return this.hasLanguageElement();
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public abstract override fhirType(): string;

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public isEmpty(): boolean {
    return isElementEmpty(this.id, this.meta, this.implicitRules, this.language);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public abstract override copy(): Resource;

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected copyValues(dest: Resource): void {
    dest.id = this.id?.copy();
    dest.meta = this.meta?.copy();
    dest.implicitRules = this.implicitRules?.copy();
    dest.language = this.language?.copy();
  }

  /**
   * {@inheritDoc Base.isResource}
   */
  public override isResource(): boolean {
    return true;
  }

  /**
   * {@inheritDoc Base.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    const jsonObj = { resourceType: this.resourceType() } as JSON.Object;

    if (this.hasIdElement()) {
      setFhirPrimitiveJson<fhirId>(this.getIdElement(), 'id', jsonObj);
    }

    if (this.hasMeta()) {
      setFhirComplexJson(this.getMeta(), 'meta', jsonObj);
    }

    if (this.hasImplicitRulesElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getImplicitRulesElement(), 'implicitRules', jsonObj);
    }

    if (this.hasLanguageElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getLanguageElement(), 'language', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR ResourceType assertion for any FHIR resource class
 *
 * @param classInstance - class instance to evaluate
 * @param errorMessage - optional error message to override the default
 * @throws InvalidTypeError when ResourceType assertion is false
 *
 * @category Type Guards/Assertions
 */
export function assertFhirResourceType(
  classInstance: unknown,
  errorMessage?: string,
): asserts classInstance is Resource {
  if (!(classInstance instanceof Resource)) {
    const errMsg = errorMessage ?? `Provided instance is not an instance of Resource.`;
    throw new InvalidTypeError(errMsg);
  }
  if (!RESOURCE_TYPES.includes(classInstance.resourceType())) {
    const errMsg = errorMessage ?? `Provided instance (${classInstance.resourceType()}) is not a valid resource type.`;
    throw new InvalidTypeError(errMsg);
  }
}

/**
 * Transforms the provided FHIR Resource to its JSON representation and adds it to the provided JSON.Object.
 * Does nothing if the Resource's value is undefined.
 *
 * @param resource - FHIR Resource to transform
 * @param propName - the property name for the provided FHIR complex DataType
 * @param jsonObj - JSON.Object to which to add the transformed FHIR complex DataType
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirResourceJson(resource: Resource, propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<Resource>(resource, 'Provided resource is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assert(!_isEmpty(propName), 'Provided propName is empty');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');
  assertFhirResourceType(resource, 'Provided resource is not an instance of Resource');

  const resourceValue: JSON.Value | undefined = resource.toJSON();
  if (_isEmpty(resourceValue)) {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  jsonObj[propName] = resourceValue!;
}

/**
 * Transforms the provided array of FHIR Resource to their JSON representation and adds it to the provided
 * JSON.Object. Does nothing if the FHIR Resource's value is undefined.
 *
 * @param resources - array of FHIR Resources to transform (can be empty array)
 * @param propName - the property name for the provided FHIR complex DataTypes
 * @param jsonObj - JSON.Object to which to add the transformed FHIR complex DataTypes
 * @throws AssertionError for invalid parameters
 *
 * @category Utilities: JSON
 */
export function setFhirResourceListJson(resources: Resource[], propName: string, jsonObj: JSON.Object): void {
  assertIsDefined<Resource[]>(resources, 'Provided resources is undefined/null');
  assertIsDefined<string>(propName, 'Provided propName is undefined/null');
  assert(!_isEmpty(propName), 'Provided propName is empty');
  assertIsDefined<JSON.Object>(jsonObj, 'Provided jsonObj is undefined/null');

  const jsonArray: JSON.Array = [];
  for (const resource of resources) {
    assertFhirResourceType(resource, 'Provided resource is not an instance of Resource');
    const resourceValue: JSON.Value | undefined = resource.toJSON();
    if (!_isEmpty(resourceValue)) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      jsonArray.push(resourceValue!);
    }
  }
  if (jsonArray.length > 0) {
    jsonObj[propName] = jsonArray;
  }
}
