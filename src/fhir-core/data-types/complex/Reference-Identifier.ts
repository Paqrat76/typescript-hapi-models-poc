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
 * This module contains the Resource and Identifier FHIR models and the ReferenceType decorator.
 *
 * @remarks
 * In TypeScript, having each of these models and the decorator in separate files results in circular
 * dependencies that cannot be resolved by typical strategies such as extracting common elements into
 * a sharable module. Therefore, these modules are collected into this single file. This preserves the
 * correct model representations with their correct dependencies without introducing circular dependencies.
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { DataType, setFhirPrimitiveJson, setFhirComplexJson } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import {
  fhirCode,
  fhirCodeSchema,
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { RESOURCE_TYPES, FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { assertFhirType, FhirTypeGuard, isDefined } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Reference Class
 *
 * @remarks
 * Base StructureDefinition for Reference Type: A reference from one resource to another.
 *
 * **FHIR Specification**
 * - **Short:** A reference from one resource to another
 * - **Definition:** A reference from one resource to another.
 * - **Comment:** References SHALL be a reference to an actual FHIR resource, and SHALL be resolveable (allowing for access control, temporary unavailability, etc.). Resolution can be either by retrieval from the URL, or, where applicable by resource type, by treating an absolute reference as a canonical URL and looking it up in a local registry/repository.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Reference
 *
 * @category Datatypes: Complex
 * @see [FHIR Reference](http://hl7.org/fhir/StructureDefinition/Reference)
 */
export class Reference extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Reference.reference Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Literal reference, Relative, internal or absolute URL
   * - **Definition:** A reference to a location at which the other resource is found. The reference may be a relative reference, in which case it is relative to the service base URL, or an absolute URL that resolves to the location where the resource is found. The reference may be version specific or not. If the reference is not to a FHIR RESTful server, then it should be assumed to be version specific. Internal fragment references (start with '#') refer to contained resources.
   * - **Comment:** Using absolute URLs provides a stable scalable approach suitable for a cloud/web context, while using relative/logical references provides a flexible approach suitable for use when trading across closed eco-system boundaries.   Absolute URLs do not need to point to a FHIR RESTful server, though this is the preferred approach. If the URL conforms to the structure "/[type]/[id]" then it should be assumed that the reference is to a FHIR RESTful server.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private reference?: StringType | undefined;

  /**
   * Reference.type Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Type the reference refers to (e.g. "Patient")
   * - **Definition:** The expected type of the target of the reference. If both Reference.type and Reference.reference are populated and Reference.reference is a FHIR URL, both SHALL be consistent. The type is the Canonical URL of Resource Definition that is the type this reference refers to. References are URLs that are relative to http://hl7.org/fhir/StructureDefinition/ e.g. "Patient" is a reference to http://hl7.org/fhir/StructureDefinition/Patient. Absolute URLs are only allowed for logical models (and can only be used in references in logical models, not resources).
   * - **Comment:** This element is used to indicate the type of  the target of the reference. This may be used which ever of the other elements are populated (or not). In some cases, the type of the target may be determined by inspection of the reference (e.g. a RESTful URL) or by resolving the target of the reference; if both the type and a reference is provided, the reference SHALL resolve to a resource of the same type as that specified.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private type?: UriType | undefined;

  /**
   * Reference.identifier Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Logical reference, when literal reference is not known
   * - **Definition:** An identifier for the target resource. This is used when there is no way to reference the other resource directly, either because the entity it represents is not available through a FHIR server, or because there is no way for the author of the resource to convert a known identifier to an actual location. There is no requirement that a Reference.identifier point to something that is actually exposed as a FHIR instance, but it SHALL point to a business concept that would be expected to be exposed as a FHIR instance, and that instance would need to be of a FHIR resource type allowed by the reference.
   * - **Comment:** When an identifier is provided in place of a reference, any system processing the reference will only be able to resolve the identifier to a reference if it understands the business context in which the identifier is used. Sometimes this is global (e.g. a national identifier) but often it is not. For this reason, none of the useful mechanisms described for working with references (e.g. chaining, includes) are possible, nor should servers be expected to be able resolve the reference. Servers may accept an identifier based reference untouched, resolve it, and/or reject it - see CapabilityStatement.rest.resource.referencePolicy. When both an identifier and a literal reference are provided, the literal reference is preferred. Applications processing the resource are allowed - but not required - to check that the identifier matches the literal reference. Applications converting a logical reference to a literal reference may choose to leave the logical reference present, or remove it. Reference is intended to point to a structure that can potentially be expressed as a FHIR resource, though there is no need for it to exist as an actual FHIR resource instance - except in as much as an application wishes to actual find the target of the reference. The content referred to be the identifier must meet the logical constraints implied by any limitations on what resource types are permitted for the reference.  For example, it would not be legitimate to send the identifier for a drug prescription if the type were Reference(Observation|DiagnosticReport).  One of the use-cases for Reference.identifier is the situation where no FHIR representation exists (where the type is Reference (Any).
   * - **FHIR Type:** `Identifier`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private identifier?: Identifier | undefined;

  /**
   * Reference.display Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Text alternative for the resource
   * - **Definition:** Plain text narrative that identifies the resource in addition to the resource reference.
   * - **Comment:** This is generally not the same as the Resource.text of the referenced resource.  The purpose is to identify what's being referenced, not to fully describe it.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private display?: StringType | undefined;

  /**
   * @returns the `reference` property value as a PrimitiveType
   */
  public getReferenceElement(): StringType {
    return this.reference ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `reference` property.
   *
   * @param element - the `reference` value
   * @returns this
   */
  public setReferenceElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Reference.reference; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.reference = element;
    } else {
      this.reference = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `reference` property exists and has a value; `false` otherwise
   */
  public hasReferenceElement(): boolean {
    return this.reference !== undefined && !this.reference.isEmpty();
  }

  /**
   * @returns the `reference` property value as a primitive value
   */
  public getReference(): fhirString | undefined {
    return this.reference?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `reference` property.
   *
   * @param value - the `reference` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setReference(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Reference.reference (${String(value)})`;
      this.reference = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.reference = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `reference` property exists and has a value; `false` otherwise
   */
  public hasReference(): boolean {
    return this.hasReferenceElement();
  }

  /**
   * @returns the `type` property value as a PrimitiveType
   */
  public getTypeElement(): UriType {
    return this.type ?? new UriType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `type` property.
   *
   * @param element - the `type` value
   * @returns this
   */
  public setTypeElement(element: UriType | undefined): this {
    if (isDefined<UriType | undefined>(element)) {
      const optErrMsg = `Invalid Reference.type; Provided element is not an instance of UriType.`;
      assertFhirType<UriType>(element, UriType, optErrMsg);
      this.type = element;
    } else {
      this.type = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasTypeElement(): boolean {
    return this.type !== undefined && !this.type.isEmpty();
  }

  /**
   * @returns the `type` property value as a primitive value
   */
  public getType(): fhirUri | undefined {
    return this.type?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `type` property.
   *
   * @param value - the `type` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setType(value: fhirUri | undefined): this {
    if (isDefined<fhirUri | undefined>(value)) {
      const optErrMsg = `Invalid Reference.type (${String(value)})`;
      this.type = new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    } else {
      this.type = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasType(): boolean {
    return this.hasTypeElement();
  }

  /**
   * @returns the `identifier` property value as a Identifier object
   */
  public getIdentifier(): Identifier {
    return this.identifier ?? new Identifier();
  }

  /**
   * Assigns the provided Identifier object value to the `identifier` property.
   *
   * @param value - the `identifier` object value
   * @returns this
   */
  public setIdentifier(value: Identifier | undefined): this {
    if (isDefined<Identifier | undefined>(value)) {
      const optErrMsg = `Invalid Reference.identifier; Provided value is not an instance of Identifier.`;
      assertFhirType<Identifier>(value, Identifier, optErrMsg);
      this.identifier = value;
    } else {
      this.identifier = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `identifier` property exists and has a value; `false` otherwise
   */
  public hasIdentifier(): boolean {
    return this.identifier !== undefined && !this.identifier.isEmpty();
  }

  /**
   * @returns the `display` property value as a PrimitiveType
   */
  public getDisplayElement(): StringType {
    return this.display ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `display` property.
   *
   * @param element - the `display` value
   * @returns this
   */
  public setDisplayElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Reference.display; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.display = element;
    } else {
      this.display = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `display` property exists and has a value; `false` otherwise
   */
  public hasDisplayElement(): boolean {
    return this.display !== undefined && !this.display.isEmpty();
  }

  /**
   * @returns the `display` property value as a primitive value
   */
  public getDisplay(): fhirString | undefined {
    return this.display?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `display` property.
   *
   * @param value - the `display` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setDisplay(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Reference.display (${String(value)})`;
      this.display = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.display = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `display` property exists and has a value; `false` otherwise
   */
  public hasDisplay(): boolean {
    return this.hasDisplayElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Reference';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.reference, this.type, this.identifier, this.display);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Reference {
    const dest = new Reference();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Reference): void {
    super.copyValues(dest);
    dest.reference = this.reference?.copy();
    dest.type = this.type?.copy();
    dest.identifier = this.identifier?.copy();
    dest.display = this.display?.copy();
  }

  /**
   * {@inheritDoc IBase.isComplexDataType}
   */
  public override isComplexDataType(): boolean {
    return true;
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

    if (this.hasReferenceElement()) {
      setFhirPrimitiveJson<fhirString>(this.getReferenceElement(), 'reference', jsonObj);
    }

    if (this.hasTypeElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getTypeElement(), 'type', jsonObj);
    }

    if (this.hasIdentifier()) {
      setFhirComplexJson(this.getIdentifier(), 'identifier', jsonObj);
    }

    if (this.hasDisplayElement()) {
      setFhirPrimitiveJson<fhirString>(this.getDisplayElement(), 'display', jsonObj);
    }

    return jsonObj;
  }
}

/**
 * Identifier Class
 *
 * @remarks
 * Base StructureDefinition for Identifier Type: An identifier - identifies some entity uniquely and unambiguously. Typically this is used for business identifiers.
 *
 * **FHIR Specification**
 * - **Short:** An identifier intended for computation
 * - **Definition:** An identifier - identifies some entity uniquely and unambiguously. Typically this is used for business identifiers.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Identifier
 *
 * @category Datatypes: Complex
 * @see [FHIR Identifier](http://hl7.org/fhir/StructureDefinition/Identifier)
 */
export class Identifier extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Identifier.use Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** usual | official | temp | secondary | old (If known)
   * - **Definition:** The purpose of this identifier.
   * - **Comment:** Applications can assume that an identifier is permanent unless it explicitly says that it is temporary.
   * - **Requirements:** Allows the appropriate identifier for a particular context of use to be selected from among a set of identifiers.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This is labeled as "Is Modifier" because applications should not mistake a temporary id for a permanent one.
   * - **isSummary:** true
   */
  private use?: CodeType | undefined;

  /**
   * Identifier.type Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Description of identifier
   * - **Definition:** A coded type for the identifier that can be used to determine which identifier to use for a specific purpose.
   * - **Comment:** This element deals only with general categories of identifiers.  It SHOULD not be used for codes that correspond 1..1 with the Identifier.system. Some identifiers may fall into multiple categories due to common usage.   Where the system is known, a type is unnecessary because the type is always part of the system definition. However systems often need to handle identifiers where the system is not known. There is not a 1:1 relationship between type and system, since many different systems have the same type.
   * - **Requirements:** Allows users to make use of identifiers when the identifier system is not known.
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private type?: CodeableConcept | undefined;

  /**
   * Identifier.system Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The namespace for the identifier value
   * - **Definition:** Establishes the namespace for the value - that is, a URL that describes a set values that are unique.
   * - **Comment:** Identifier.system is always case sensitive.
   * - **Requirements:** There are many sets  of identifiers.  To perform matching of two identifiers, we need to know what set we're dealing with. The system identifies a particular set of unique identifiers.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private system?: UriType | undefined;

  /**
   * Identifier.value Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The value that is unique
   * - **Definition:** The portion of the identifier typically relevant to the user and which is unique within the context of the system.
   * - **Comment:** If the value is a full URI, then the system SHALL be urn:ietf:rfc:3986.  The value's primary purpose is computational mapping.  As a result, it may be normalized for comparison purposes (e.g. removing non-significant whitespace, dashes, etc.)  A value formatted for human display can be conveyed using the [Rendered Value extension](https://hl7.org/fhir/R4/extension-rendered-value.html). Identifier.value is to be treated as case sensitive unless knowledge of the Identifier.system allows the processer to be confident that non-case-sensitive processing is safe.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private value?: StringType | undefined;

  /**
   * Identifier.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Time period when id is/was valid for use
   * - **Definition:** Time period during which identifier is/was valid for use.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private period?: Period | undefined;

  /**
   * Identifier.assigner Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Organization that issued id (may be just text)
   * - **Definition:** Organization that issued/manages the identifier.
   * - **Comment:** The Identifier.assigner may omit the .reference element and only contain a .display element reflecting the name or other textual information about the assigning organization.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: ['http://hl7.org/fhir/StructureDefinition/Organization']
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private assigner?: Reference | undefined;

  /**
   * @returns the `use` property value as a PrimitiveType
   */
  public getUseElement(): CodeType {
    return this.use ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `use` property.
   *
   * @param element - the `use` value
   * @returns this
   */
  public setUseElement(element: CodeType | undefined): this {
    if (isDefined<CodeType | undefined>(element)) {
      const optErrMsg = `Invalid Identifier.use; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.use = element;
    } else {
      this.use = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `use` property exists and has a value; `false` otherwise
   */
  public hasUseElement(): boolean {
    return this.use !== undefined && !this.use.isEmpty();
  }

  /**
   * @returns the `use` property value as a primitive value
   */
  public getUse(): fhirCode | undefined {
    return this.use?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `use` property.
   *
   * @param value - the `use` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setUse(value: fhirCode | undefined): this {
    if (isDefined<fhirCode | undefined>(value)) {
      const optErrMsg = `Invalid Identifier.use (${String(value)})`;
      this.use = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.use = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `use` property exists and has a value; `false` otherwise
   */
  public hasUse(): boolean {
    return this.hasUseElement();
  }

  /**
   * @returns the `type` property value as a CodeableConcept object
   */
  public getType(): CodeableConcept {
    return this.type ?? new CodeableConcept();
  }

  /**
   * Assigns the provided CodeableConcept object value to the `type` property.
   *
   * @param value - the `type` array value
   * @returns this
   */
  public setType(value: CodeableConcept | undefined): this {
    if (isDefined<CodeableConcept | undefined>(value)) {
      const optErrMsg = `Invalid Identifier.type; Provided element is not an instance of CodeableConcept.`;
      assertFhirType<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.type = value;
    } else {
      this.type = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasType(): boolean {
    return this.type !== undefined && !this.type.isEmpty();
  }

  /**
   * @returns the `system` property value as a PrimitiveType
   */
  public getSystemElement(): UriType {
    return this.system ?? new UriType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `system` property.
   *
   * @param element - the `system` value
   * @returns this
   */
  public setSystemElement(element: UriType | undefined): this {
    if (isDefined<UriType | undefined>(element)) {
      const optErrMsg = `Invalid Identifier.system; Provided element is not an instance of UriType.`;
      assertFhirType<UriType>(element, UriType, optErrMsg);
      this.system = element;
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystemElement(): boolean {
    return this.system !== undefined && !this.system.isEmpty();
  }

  /**
   * @returns the `system` property value as a primitive value
   */
  public getSystem(): fhirUri | undefined {
    return this.system?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `system` property.
   *
   * @param value - the `system` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setSystem(value: fhirUri | undefined): this {
    if (isDefined<fhirUri | undefined>(value)) {
      const optErrMsg = `Invalid Identifier.system (${String(value)})`;
      this.system = new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    } else {
      this.system = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystem(): boolean {
    return this.hasSystemElement();
  }

  /**
   * @returns the `value` property value as a PrimitiveType
   */
  public getValueElement(): StringType {
    return this.value ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `value` property.
   *
   * @param element - the `value` value
   * @returns this
   */
  public setValueElement(element: StringType | undefined): this {
    if (isDefined<StringType | undefined>(element)) {
      const optErrMsg = `Invalid Identifier.value; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.value = element;
    } else {
      this.value = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValueElement(): boolean {
    return this.value !== undefined && !this.value.isEmpty();
  }

  /**
   * @returns the `value` property value as a primitive value
   */
  public getValue(): fhirString | undefined {
    return this.value?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `value` property.
   *
   * @param value - the `value` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setValue(value: fhirString | undefined): this {
    if (isDefined<fhirString | undefined>(value)) {
      const optErrMsg = `Invalid Identifier.value (${String(value)})`;
      this.value = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.value = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return this.hasValueElement();
  }

  /**
   * @returns the `period` property value as a Period object
   */
  public getPeriod(): Period {
    return this.period ?? new Period();
  }

  /**
   * Assigns the provided Period object value to the `period` property.
   *
   * @param value - the `period` object value
   * @returns this
   */
  public setPeriod(value: Period | undefined): this {
    if (isDefined<Period | undefined>(value)) {
      const optErrMsg = `Invalid Identifier.period; Provided element is not an instance of Period.`;
      assertFhirType<Period>(value, Period, optErrMsg);
      this.period = value;
    } else {
      this.period = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `period` property exists and has a value; `false` otherwise
   */
  public hasPeriod(): boolean {
    return this.period !== undefined && !this.period.isEmpty();
  }

  /**
   * @returns the `assigner` property value as a Reference object
   */
  public getAssigner(): Reference {
    return this.assigner ?? new Reference();
  }

  /**
   * Assigns the provided Reference object value to the `assigner` property.
   *
   * @decorator `@ReferenceTargets(['Organization'])`
   *
   * @param value - the `assigner` object value
   * @returns this
   */
  @ReferenceTargets('Identifier.assigner', ['Organization'])
  public setAssigner(value: Reference | undefined): this {
    if (isDefined<Reference | undefined>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.assigner = value;
    } else {
      this.assigner = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `assigner` property exists and has a value; `false` otherwise
   */
  public hasAssigner(): boolean {
    return this.assigner !== undefined && !this.assigner.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Identifier';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.use, this.type, this.system, this.value, this.period, this.assigner);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Identifier {
    const dest = new Identifier();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Identifier): void {
    super.copyValues(dest);
    dest.use = this.use?.copy();
    dest.type = this.type?.copy();
    dest.system = this.system?.copy();
    dest.value = this.value?.copy();
    dest.period = this.period?.copy();
    dest.assigner = this.assigner?.copy();
  }

  /**
   * {@inheritDoc IBase.isComplexDataType}
   */
  public override isComplexDataType(): boolean {
    return true;
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

    if (this.hasUseElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getUseElement(), 'use', jsonObj);
    }

    if (this.hasType()) {
      setFhirComplexJson(this.getType(), 'type', jsonObj);
    }

    if (this.hasSystemElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getSystemElement(), 'system', jsonObj);
    }

    if (this.hasValueElement()) {
      setFhirPrimitiveJson<fhirString>(this.getValueElement(), 'value', jsonObj);
    }

    if (this.hasPeriod()) {
      setFhirComplexJson(this.getPeriod(), 'period', jsonObj);
    }

    if (this.hasAssigner()) {
      setFhirComplexJson(this.getAssigner(), 'assigner', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Factory function for ReferenceTargets decorator.
 *
 * @remarks
 * This decorator validates the provided Reference.reference value for relative or absolute
 * references are only for the defined ElementDefinition's 'targetProfile' value(s).
 *
 * @param sourceField - source field name
 * @param referenceTargets - FhirResourceType array of target references.
 *                           An empty array is allowed and represents "Any" resource.
 * @returns ReferenceTargets decorator
 * @throws AssertionError for invalid uses
 * @throws InvalidTypeError for actual reference type do not agree with the specified ReferenceTargets
 *
 * @category Decorators
 */
export function ReferenceTargets(sourceField: string, referenceTargets: FhirResourceType[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    return function (this: This, ...args: Args): Return {
      const methodName = String(context.name);
      assert(args.length === 1, `ReferenceTargets decorator on ${methodName} (${sourceField}) expects one argument`);

      // If nothing is provided to the originalMethod, there is nothing to check
      if (args[0] === undefined || args[0] === null) {
        return originalMethod.call(this, ...args);
      }

      const isAnyResource = referenceTargets.length === 0;
      if (!isAnyResource) {
        // Verify referenceTargets contain valid, non-duplicate values
        const referenceTargetSet = new Set(referenceTargets);
        assert(
          referenceTargets.length === referenceTargetSet.size,
          `ReferenceTargets decorator on ${methodName} (${sourceField}) contains duplicate referenceTargets`,
        );
        assert(
          referenceTargets.every((refTarget) => RESOURCE_TYPES.includes(refTarget)),
          `ReferenceTargets decorator on ${methodName} (${sourceField}) contains invalid referenceTargets`,
        );
      }

      if (Array.isArray(args[0])) {
        args[0].forEach((argItem, idx) => {
          assert(
            FhirTypeGuard(argItem, Reference),
            `ReferenceTargets decorator on ${methodName} (${sourceField}) expects argument[${String(idx)}] to be type of 'Reference'`,
          );
          validateReferenceArg(referenceTargets, argItem, isAnyResource, sourceField, methodName, idx);
        });
      } else {
        assert(
          FhirTypeGuard(args[0], Reference),
          `ReferenceTargets decorator on ${methodName} (${sourceField}) expects a single argument to be type of 'Reference | undefined | null'`,
        );
        validateReferenceArg(referenceTargets, args[0], isAnyResource, sourceField, methodName);
      }

      // Since the calls to validateArg(...) above did not throw an error, allow the originalMethod to be executed.
      return originalMethod.call(this, ...args);
    };
  };
}

/**
 * Validate the Reference value throwing an InvalidTypeError if it is not valid. Only used by the
 * ReferenceTargets decorator function.
 *
 * @param referenceTargets - FhirResourceType array of target references.
 * @param argValue - Argument value from original decorated function
 * @param isAnyResource - true if referenceTargets array is empty
 * @param sourceField - source field name
 * @param methodName - Decorated method's name
 * @param arrayIndex - Argument for Reference[] index value; undefined for non-array
 * @throws InvalidTypeError if Reference.reference exists with an invalid value
 */
function validateReferenceArg(
  referenceTargets: FhirResourceType[],
  argValue: Reference,
  isAnyResource: boolean,
  sourceField: string,
  methodName: string,
  arrayIndex?: number,
) {
  // Return the original function if there is nothing for this decorator to do:
  // - referenceTargets array is empty (isAnyResource) - implies "Any" resource
  // - Decorator should only be used on a methods defined as:
  //   `public set[PropertyName](value: Reference | undefined): this`
  //   `public set[PropertyName](value: Reference[] | undefined): this`
  //   `public add[PropertyName](value: Reference | undefined): this`
  // - The value of type Reference should have the Reference.reference property set
  // - The referenceTargets array should have at least one valid FhirResourceType value
  // - Reference is to a "contained" resource - reference value begins with "#"

  const argValueReference = argValue.getReference();
  const isReferenceNotApplicable = argValueReference === undefined ? true : argValueReference.startsWith('#');
  if (isAnyResource || !(methodName.startsWith('set') || methodName.startsWith('add')) || isReferenceNotApplicable) {
    return;
  }

  // NOTE: If isAnyResource is true, this function already returned above; therefore, referenceTargets used below
  //       has values to validate against.

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const referenceValue = argValue.getReference()!;
  // referenceValue (Reference.reference) valid examples:
  // - Organization/1234
  // - https://somedomain.com/path/Organization/1234
  const isValidReference = referenceTargets.some((refTarget) => referenceValue.includes(`${refTarget}/`));

  if (!isValidReference) {
    const arrayIndexStr = arrayIndex === undefined ? '' : `[${String(arrayIndex)}]`;
    throw new InvalidTypeError(
      `ReferenceTargets decorator on ${methodName} (${sourceField}) expects argument${arrayIndexStr} (${referenceValue}) to be a valid 'Reference' type`,
    );
  }
}
