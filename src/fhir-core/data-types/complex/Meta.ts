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

import {
  DataType,
  setFhirComplexListJson,
  setFhirPrimitiveJson,
  setFhirPrimitiveListJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import {
  fhirCanonical,
  fhirCanonicalSchema,
  fhirId,
  fhirIdSchema,
  fhirInstant,
  fhirInstantSchema,
  fhirUri,
  fhirUriSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType, assertFhirTypeList, isDefined } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Meta Class
 *
 * @remarks
 * Base StructureDefinition for Meta Type: The metadata about a resource. This is content in the resource that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.
 *
 * **FHIR Specification**
 * - **Short:** Metadata about a resource
 * - **Definition:** The metadata about a resource. This is content in the resource that is maintained by the infrastructure. Changes to the content might not always be associated with version changes to the resource.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Meta
 *
 * @category Datatypes: Complex
 * @see [FHIR Meta](http://hl7.org/fhir/StructureDefinition/Meta)
 */
export class Meta extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Meta.versionId Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Version specific identifier
   * - **Definition:** The version specific identifier, as it appears in the version portion of the URL. This value changes when the resource is created, updated, or deleted.
   * - **Comment:** The server assigns this value, and ignores what the client specifies, except in the case that the server is imposing version integrity on updates/deletes.
   * - **FHIR Type:** `id`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private versionId?: IdType | undefined;

  /**
   * Meta.lastUpdated Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** When the resource version last changed
   * - **Definition:** When the resource last changed - e.g. when the version changed.
   * - **Comment:** This value is always populated except when the resource is first being created. The server / resource manager sets this value; what a client provides is irrelevant. This is equivalent to the HTTP Last-Modified and SHOULD have the same value on a [read](https://hl7.org/fhir/R4/http.html#read) interaction.
   * - **FHIR Type:** `instant`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private lastUpdated?: InstantType | undefined;

  /**
   * Meta.source Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Identifies where the resource comes from
   * - **Definition:** A uri that identifies the source system of the resource. This provides a minimal amount of [Provenance](https://hl7.org/fhir/R4/provenance.html) information that can be used to track or differentiate the source of information in the resource. The source may identify another FHIR server, document, message, database, etc.
   * - **Comment:** In the provenance resource, this corresponds to Provenance.entity.what[x]. The exact use of the source (and the implied Provenance.entity.role) is left to implementer discretion. Only one nominated source is allowed; for additional provenance details, a full Provenance resource should be used. This element can be used to indicate where the current master source of a resource that has a canonical URL if the resource is no longer hosted at the canonical URL.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private source?: UriType | undefined;

  /**
   * Meta.profile Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Profiles this resource claims to conform to
   * - **Definition:** A list of profiles (references to [StructureDefinition](https://hl7.org/fhir/R4/structuredefinition.html) resources) that this resource claims to conform to. The URL is a reference to [StructureDefinition.url](https://hl7.org/fhir/R4/structuredefinition-definitions.html#StructureDefinition.url).
   * - **Comment:** It is up to the server and/or other infrastructure of policy to determine whether/how these claims are verified and/or updated over time.  The list of profile URLs is a set.
   * - **FHIR Type:** `canonical`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private profile?: CanonicalType[] | undefined;

  /**
   * Meta.security Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Security Labels applied to this resource
   * - **Definition:** Security labels applied to this resource. These tags connect specific resources to the overall security policy and infrastructure.
   * - **Comment:** The security labels can be updated without changing the stated version of the resource. The list of security labels is a set. Uniqueness is based the system/code, and version and display are ignored.
   * - **FHIR Type:** `Coding`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private security?: Coding[] | undefined;

  /**
   * Meta.tag Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Tags applied to this resource
   * - **Definition:** Tags applied to this resource. Tags are intended to be used to identify and relate resources to process and workflow, and applications are not required to consider the tags when interpreting the meaning of a resource.
   * - **Comment:** The tags can be updated without changing the stated version of the resource. The list of tags is a set. Uniqueness is based the system/code, and version and display are ignored.
   * - **FHIR Type:** `Coding`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private tag?: Coding[] | undefined;

  /**
   * @returns the `versionId` property value as a PrimitiveType
   */
  public getVersionIdElement(): IdType {
    return this.versionId ?? new IdType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `versionId` property.
   *
   * @param element - the `versionId` value
   * @returns this
   */
  public setVersionIdElement(element: IdType | undefined): this {
    const optErrMsg = `Invalid Meta.versionId; Provided element is not an instance of IdType.`;
    assertFhirType<IdType>(element, IdType, optErrMsg);
    this.versionId = element;
    return this;
  }

  /**
   * @returns `true` if the `versionId` property exists and has a value; `false` otherwise
   */
  public hasVersionIdElement(): boolean {
    return this.versionId !== undefined && !this.versionId.isEmpty();
  }

  /**
   * @returns the `versionId` property value as a primitive value
   */
  public getVersionId(): fhirId | undefined {
    return this.versionId?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `versionId` property.
   *
   * @param value - the `versionId` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setVersionId(value: fhirId | undefined): this {
    const optErrMsg = `Invalid Meta.versionId (${String(value)})`;
    this.versionId =
      value === undefined ? undefined : new IdType(parseFhirPrimitiveData(value, fhirIdSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `versionId` property exists and has a value; `false` otherwise
   */
  public hasVersionId(): boolean {
    return this.hasVersionIdElement();
  }

  /**
   * @returns the `lastUpdated` property value as a PrimitiveType
   */
  public getLastUpdatedElement(): InstantType {
    return this.lastUpdated ?? new InstantType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `lastUpdated` property.
   *
   * @param element - the `lastUpdated` value
   * @returns this
   */
  public setLastUpdatedElement(element: InstantType | undefined): this {
    const optErrMsg = `Invalid Meta.lastUpdated; Provided element is not an instance of InstantType.`;
    assertFhirType<InstantType>(element, InstantType, optErrMsg);
    this.lastUpdated = element;
    return this;
  }

  /**
   * @returns `true` if the `lastUpdated` property exists and has a value; `false` otherwise
   */
  public hasLastUpdatedElement(): boolean {
    return this.lastUpdated !== undefined && !this.lastUpdated.isEmpty();
  }

  /**
   * @returns the `lastUpdated` property value as a primitive value
   */
  public getLastUpdated(): fhirInstant | undefined {
    return this.lastUpdated?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `lastUpdated` property.
   *
   * @param value - the `lastUpdated` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setLastUpdated(value: fhirInstant | undefined): this {
    const optErrMsg = `Invalid Meta.lastUpdated (${String(value)})`;
    this.lastUpdated =
      value === undefined ? undefined : new InstantType(parseFhirPrimitiveData(value, fhirInstantSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `lastUpdated` property exists and has a value; `false` otherwise
   */
  public hasLastUpdated(): boolean {
    return this.hasLastUpdatedElement();
  }

  /**
   * @returns the `source` property value as a PrimitiveType
   */
  public getSourceElement(): UriType {
    return this.source ?? new UriType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `source` property.
   *
   * @param element - the `source` value
   * @returns this
   */
  public setSourceElement(element: UriType | undefined): this {
    const optErrMsg = `Invalid Meta.source; Provided element is not an instance of UriType.`;
    assertFhirType<UriType>(element, UriType, optErrMsg);
    this.source = element;
    return this;
  }

  /**
   * @returns `true` if the `source` property exists and has a value; `false` otherwise
   */
  public hasSourceElement(): boolean {
    return this.source !== undefined && !this.source.isEmpty();
  }

  /**
   * @returns the `source` property value as a primitive value
   */
  public getSource(): fhirUri | undefined {
    return this.source?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `source` property.
   *
   * @param value - the `source` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setSource(value: fhirUri | undefined): this {
    const optErrMsg = `Invalid Meta.source (${String(value)})`;
    this.source =
      value === undefined ? undefined : new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `source` property exists and has a value; `false` otherwise
   */
  public hasSource(): boolean {
    return this.hasSourceElement();
  }

  /**
   * @returns the `profile` property value as a PrimitiveType array
   */
  public getProfileElement(): CanonicalType[] {
    return this.profile ?? ([] as CanonicalType[]);
  }

  /**
   * Assigns the provided PrimitiveType array value to the `profile` property.
   *
   * @param element - the `profile` array value
   * @returns this
   */
  public setProfileElement(element: CanonicalType[] | undefined): this {
    const optErrMsg = `Invalid Meta.profile; Provided element array has an element that is not an instance of CanonicalType.`;
    assertFhirTypeList<CanonicalType>(element, CanonicalType, optErrMsg);
    this.profile = element;
    return this;
  }

  /**
   * Add the provided PrimitiveType value to the `profile` array property.
   *
   * @param value - the `profile` value
   * @returns this
   */
  public addProfileElement(value: CanonicalType | undefined): this {
    if (isDefined<CanonicalType | undefined>(value)) {
      const optErrMsg = `Invalid Meta.profile; Provided element is not an instance of CanonicalType.`;
      assertFhirType<CanonicalType>(value, CanonicalType, optErrMsg);
      this.initProfile();
      this.profile?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `profile` property exists and has a value; `false` otherwise
   */
  public hasProfileElement(): boolean {
    return (
      this.profile !== undefined &&
      this.profile.length > 0 &&
      this.profile.some((item: CanonicalType) => !item.isEmpty())
    );
  }

  /**
   * @returns the `profile` property value as a primitive value array
   */
  public getProfile(): fhirCanonical[] {
    this.initProfile();
    const profileValues = [] as fhirCanonical[];
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    for (const profile of this.profile!) {
      const value = profile.getValue();
      if (value !== undefined) {
        profileValues.push(value);
      }
    }
    return profileValues;
  }

  /**
   * Assigns the provided primitive value array to the `profile` property.
   *
   * @param value - the `profile` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setProfile(value: fhirCanonical[] | undefined): this {
    if (value !== undefined) {
      const profileElements = [] as CanonicalType[];
      for (const profileValue of value) {
        const optErrMsg = `Invalid Meta.profile array item (${String(profileValue)})`;
        const element = new CanonicalType(parseFhirPrimitiveData(profileValue, fhirCanonicalSchema, optErrMsg));
        profileElements.push(element);
      }
      this.profile = profileElements;
    } else {
      this.profile = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `profile` array property.
   *
   * @param value - the `profile` value
   * @returns this
   */
  public addProfile(value: fhirCanonical | undefined): this {
    if (isDefined<fhirCanonical | undefined>(value)) {
      const optErrMsg = `Invalid Meta.profile array item (${String(value)})`;
      const element = new CanonicalType(parseFhirPrimitiveData(value, fhirCanonicalSchema, optErrMsg));
      this.addProfileElement(element);
    }
    return this;
  }

  /**
   * @returns `true` if the `profile` property exists and has a value; `false` otherwise
   */
  public hasProfile(): boolean {
    return this.hasProfileElement();
  }

  /**
   * Initialize the profile property
   */
  private initProfile(): void {
    if (this.profile === undefined) {
      this.profile = [] as CanonicalType[];
    }
  }

  /**
   * @returns the `security` property value as a Coding array
   */
  public getSecurity(): Coding[] {
    return this.security ?? ([] as Coding[]);
  }

  /**
   * Assigns the provided Coding array value to the `security` property.
   *
   * @param value - the `security` array value
   * @returns this
   */
  public setSecurity(value: Coding[] | undefined): this {
    const optErrMsg = `Invalid Meta.security; Provided value array has an element that is not an instance of Coding.`;
    assertFhirTypeList<Coding>(value, Coding, optErrMsg);
    this.security = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `security` array property.
   *
   * @param value - the `security` value
   * @returns this
   */
  public addSecurity(value: Coding | undefined): this {
    if (isDefined<Coding | undefined>(value)) {
      const optErrMsg = `Invalid Meta.security; Provided value is not an instance of CodeType.`;
      assertFhirType<Coding>(value, Coding, optErrMsg);
      this.initSecurity();
      this.security?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `security` property exists and has a value; `false` otherwise
   */
  public hasSecurity(): boolean {
    return (
      this.security !== undefined && this.security.length > 0 && this.security.some((item: Coding) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `security` property
   */
  private initSecurity(): void {
    if (this.security === undefined) {
      this.security = [] as Coding[];
    }
  }

  /**
   * @returns the `tag` property value as a Coding array
   */
  public getTag(): Coding[] {
    return this.tag ?? ([] as Coding[]);
  }

  /**
   * Assigns the provided Coding array value to the `tag` property.
   *
   * @param value - the `tag` array value
   * @returns this
   */
  public setTag(value: Coding[] | undefined): this {
    const optErrMsg = `Invalid Meta.tag; Provided value array has an element that is not an instance of Coding.`;
    assertFhirTypeList<Coding>(value, Coding, optErrMsg);
    this.tag = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `tag` array property.
   *
   * @param value - the `tag` value
   * @returns this
   */
  public addTag(value: Coding | undefined): this {
    if (isDefined<Coding | undefined>(value)) {
      const optErrMsg = `Invalid Meta.tag; Provided value is not an instance of CodeType.`;
      assertFhirType<Coding>(value, Coding, optErrMsg);
      this.initTag();
      this.tag?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `tag` property exists and has a value; `false` otherwise
   */
  public hasTag(): boolean {
    return this.tag !== undefined && this.tag.length > 0 && this.tag.some((item: Coding) => !item.isEmpty());
  }

  /**
   * Initialize the `tag` property
   */
  private initTag(): void {
    if (this.tag === undefined) {
      this.tag = [] as Coding[];
    }
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Meta';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.versionId, this.lastUpdated, this.source, this.profile, this.security, this.tag)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Meta {
    const dest = new Meta();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Meta): void {
    super.copyValues(dest);
    dest.versionId = this.versionId?.copy();
    dest.lastUpdated = this.lastUpdated?.copy();
    dest.source = this.source?.copy();
    if (this.profile !== undefined) {
      dest.profile = [] as CanonicalType[];
      for (const profile of this.profile) {
        dest.profile.push(profile.copy());
      }
    } else {
      dest.profile = undefined;
    }
    if (this.security !== undefined) {
      dest.security = [] as Coding[];
      for (const security of this.security) {
        dest.security.push(security.copy());
      }
    } else {
      dest.security = undefined;
    }
    if (this.tag !== undefined) {
      dest.tag = [] as Coding[];
      for (const tag of this.tag) {
        dest.tag.push(tag.copy());
      }
    } else {
      dest.tag = undefined;
    }
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

    if (this.hasVersionIdElement()) {
      setFhirPrimitiveJson<fhirId>(this.getVersionIdElement(), 'versionId', jsonObj);
    }

    if (this.hasLastUpdatedElement()) {
      setFhirPrimitiveJson<fhirInstant>(this.getLastUpdatedElement(), 'lastUpdated', jsonObj);
    }

    if (this.hasSourceElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getSourceElement(), 'source', jsonObj);
    }

    if (this.hasProfileElement()) {
      setFhirPrimitiveListJson<fhirCanonical>(this.getProfileElement(), 'profile', jsonObj);
    }

    if (this.hasSecurity()) {
      setFhirComplexListJson(this.getSecurity(), 'security', jsonObj);
    }

    if (this.hasTag()) {
      setFhirComplexListJson(this.getTag(), 'tag', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
