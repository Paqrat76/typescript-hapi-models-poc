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

import { strict as assert } from 'node:assert';
import { isEmpty } from 'lodash';
import { DataType } from '@src/fhir/base-models/core-fhir-models';
import { IBase } from '@src/fhir/base-models/IBase';
import { CanonicalType } from '@src/fhir/data-types/primitive/CanonicalType';
import { Coding } from '@src/fhir/data-types/complex/Coding';
import { IdType } from '@src/fhir/data-types/primitive/IdType';
import { InstantType } from '@src/fhir/data-types/primitive/InstantType';
import { UriType } from '@src/fhir/data-types/primitive/UriType';
import {
  fhirCanonical,
  fhirCanonicalSchema,
  fhirId,
  fhirIdSchema,
  fhirInstant,
  fhirInstantSchema,
  fhirUri,
  fhirUriSchema,
} from '@src/fhir/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir/utility/element-util';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Complex FHIR Datatype: Meta
 *
 * @remarks
 * Each resource contains an element "meta", of type "Meta", which is a set of metadata that provides
 * technical and workflow context to the resource. The metadata items are all optional, though some
 * or all of them may be required in particular implementations or contexts of use.
 *
 * @category Datatypes: Complex
 * @see [FHIR Meta](https://www.hl7.org/fhir/R4/resource.html#Meta)
 */
export class Meta extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Version specific identifier
   *
   * @remarks
   * The version specific identifier, as it appears in the version portion of the URL. This value
   * changes when the resource is created, updated, or deleted.
   */
  protected versionId?: IdType | undefined;
  /**
   * When the resource version last changed
   *
   * @remarks
   * When the resource last changed - e.g. when the version changed.
   */
  protected lastUpdated?: InstantType | undefined;
  /**
   * Identifies where the resource comes from
   *
   * @remarks
   * An uri that identifies the source system of the resource. This provides a minimal amount of
   * Provenance information that can be used to track or differentiate the source of information
   * in the resource. The source may identify another FHIR server, document, message, database, etc.
   */
  protected source?: UriType | undefined;
  /**
   * Profiles this resource claims to conform to
   *
   * @remarks
   * A list of profiles (references to StructureDefinition resources) that this resource claims to
   * conform to. The URL is a reference to StructureDefinition.url.
   */
  protected profile?: CanonicalType[] | undefined;
  /**
   * Security Labels applied to this resource
   *
   * @remarks
   * Security labels applied to this resource. These tags connect specific resources to the overall
   * security policy and infrastructure.
   *
   * The security labels can be updated without changing the stated version of the resource. The list
   * of security labels is a set. Uniqueness is based the system/code, and version and display are ignored.
   */
  protected security?: Coding[] | undefined;
  /**
   * Tags applied to this resource
   *
   * @remarks
   * Tags applied to this resource. Tags are intended to be used to identify and relate resources
   * to process and workflow, and applications are not required to consider the tags when interpreting
   * the meaning of a resource.
   *
   * The tags can be updated without changing the stated version of the resource. The list of tags is a set.
   * Uniqueness is based the system/code, and version and display are ignored.
   */
  protected tag?: Coding[] | undefined;

  /**
   * @returns the `versionId` property value as a PrimitiveType
   */
  public getVersionIdElement(): IdType | undefined {
    return this.versionId;
  }

  /**
   * Assigns the provided PrimitiveType value to the `versionId` property.
   *
   * @param element - the `versionId` value
   * @returns this
   */
  public setVersionIdElement(element: IdType | undefined): this {
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
    if (value === undefined) {
      this.versionId = undefined;
    } else {
      const parseResult = fhirIdSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Meta.versionId (${value})`, parseResult.error);
      }
      this.versionId = new IdType(parseResult.data);
    }
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
  public getLastUpdatedElement(): InstantType | undefined {
    return this.lastUpdated;
  }

  /**
   * Assigns the provided PrimitiveType value to the `lastUpdated` property.
   *
   * @param element - the `lastUpdated` value
   * @returns this
   */
  public setLastUpdatedElement(element: InstantType | undefined): this {
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
    if (value === undefined) {
      this.lastUpdated = undefined;
    } else {
      const parseResult = fhirInstantSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Meta.lastUpdated (${value})`, parseResult.error);
      }
      this.lastUpdated = new InstantType(parseResult.data);
    }
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
  public getSourceElement(): UriType | undefined {
    return this.source;
  }

  /**
   * Assigns the provided PrimitiveType value to the `source` property.
   *
   * @param element - the `source` value
   * @returns this
   */
  public setSourceElement(element: UriType | undefined): this {
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
    if (value === undefined) {
      this.source = undefined;
    } else {
      const parseResult = fhirUriSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Meta.source (${value})`, parseResult.error);
      }
      this.source = new UriType(parseResult.data);
    }
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
    this.initProfile();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.profile!;
  }

  /**
   * Assigns the provided PrimitiveType array value to the `profile` property.
   *
   * @param element - the `profile` array value
   * @returns this
   */
  public setProfileElement(element: CanonicalType[] | undefined): this {
    this.profile = element;
    return this;
  }

  /**
   * Add the provided PrimitiveType value to the `profile` array property.
   *
   * @param value - the `profile` value
   * @returns this
   */
  public addProfileElement(value: CanonicalType): this {
    assert(value, `'value' is required`);
    this.initProfile();
    this.profile?.push(value);
    return this;
  }

  /**
   * @returns `true` if the `profile` property exists and has a value; `false` otherwise
   */
  public hasProfileElement(): boolean {
    return this.profile !== undefined && !isEmpty(this.profile);
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
        const parseResult = fhirCanonicalSchema.safeParse(profileValue);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Meta.profile array item (${profileValue})`, parseResult.error);
        }
        const element = new CanonicalType(parseResult.data);
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
  public addProfile(value: fhirCanonical): this {
    assert(value, `'value' is required`);
    const parseResult = fhirCanonicalSchema.safeParse(value);
    if (!parseResult.success) {
      throw new PrimitiveTypeError(`Invalid Meta.profile array item (${value})`, parseResult.error);
    }
    const element = new CanonicalType(parseResult.data);
    this.addProfileElement(element);
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
   *
   * @private
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
    this.initSecurity();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.security!;
  }

  /**
   * Assigns the provided Coding array value to the `security` property.
   *
   * @param value - the `security` array value
   * @returns this
   */
  public setSecurity(value: Coding[] | undefined): this {
    this.security = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `security` array property.
   *
   * @param value - the `security` value
   * @returns this
   */
  public addSecurity(value: Coding): this {
    assert(value, `'value' is required`);
    this.initSecurity();
    this.security?.push(value);
    return this;
  }

  /**
   * @returns `true` if the `security` property exists and has a value; `false` otherwise
   */
  public hasSecurity(): boolean {
    return this.security !== undefined && !isEmpty(this.security);
  }

  /**
   * Initialize the `security` property
   *
   * @private
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
    this.initTag();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.tag!;
  }

  /**
   * Assigns the provided Coding array value to the `tag` property.
   *
   * @param value - the `tag` array value
   * @returns this
   */
  public setTag(value: Coding[] | undefined): this {
    this.tag = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `tag` array property.
   *
   * @param value - the `tag` value
   * @returns this
   */
  public addTag(value: Coding): this {
    assert(value, `'value' is required`);
    this.initTag();
    this.tag?.push(value);
    return this;
  }

  /**
   * @returns `true` if the `tag` property exists and has a value; `false` otherwise
   */
  public hasTag(): boolean {
    return this.tag !== undefined && !isEmpty(this.tag);
  }

  /**
   * Initialize the `tag` property
   *
   * @private
   */
  private initTag(): void {
    if (this.tag === undefined) {
      this.tag = [] as Coding[];
    }
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'Meta';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.versionId, this.lastUpdated, this.source, this.profile, this.security, this.tag)
    );
  }

  /**
   * {@inheritDoc DataType.copy}
   */
  public override copy(): Meta {
    const dest = new Meta();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Element.copyValues}
   */
  public override copyValues(dest: Meta): void {
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
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
