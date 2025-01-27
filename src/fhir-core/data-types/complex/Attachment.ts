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

import { IBase } from '@src/fhir-core/base-models/IBase';
import { DataType, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UrlType } from '@src/fhir-core/data-types/primitive/UrlType';
import {
  fhirBase64Binary,
  fhirBase64BinarySchema,
  fhirCode,
  fhirCodeSchema,
  fhirDateTime,
  fhirDateTimeSchema,
  fhirString,
  fhirStringSchema,
  fhirUnsignedInt,
  fhirUnsignedIntSchema,
  fhirUrl,
  fhirUrlSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType, isDefined } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Attachment Class
 *
 * @remarks
 * Base StructureDefinition for Attachment Type: For referring to data content defined in other formats.
 * Many models need to include data defined in other specifications that is complex and opaque to the healthcare model. This includes documents, media recordings, structured data, etc.
 *
 * **FHIR Specification**
 * - **Short:** Content in a format defined elsewhere
 * - **Definition:** For referring to data content defined in other formats.
 * - **Comment:** When providing a summary view (for example with Observation.value[x]) Attachment should be represented with a brief display text such as "Signed Procedure Consent".
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Attachment
 *
 * @category Datatypes: Complex
 * @see [FHIR Attachment](http://hl7.org/fhir/StructureDefinition/Attachment)
 */
export class Attachment extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Attachment.contentType Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Mime type of the content, with charset etc.
   * - **Definition:** Identifies the type of the data in the attachment and allows a method to be chosen to interpret or render the data. Includes mime type parameters such as charset where appropriate.
   * - **Requirements:** Processors of the data need to be able to know how to interpret the data.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private contentType?: CodeType | undefined;

  /**
   * Attachment.language Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Human language of the content (BCP-47)
   * - **Definition:** The human language of the content. The value can be any valid value according to BCP 47.
   * - **Requirements:** Users need to be able to choose between the languages in a set of attachments.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private language?: CodeType | undefined;

  /**
   * Attachment.data Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Data inline, base64ed
   * - **Definition:** The actual data of the attachment - a sequence of bytes, base64 encoded.
   * - **Comment:** The base64-encoded data SHALL be expressed in the same character set as the base resource XML or JSON.
   * - **Requirements:** The data needs to able to be transmitted inline.
   * - **FHIR Type:** `base64Binary`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private data?: Base64BinaryType | undefined;

  /**
   * Attachment.url Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Uri where the data can be found
   * - **Definition:** A location where the data can be accessed.
   * = **Comment:** If both data and url are provided, the url SHALL point to the same content as the data contains. Urls may be relative references or may reference transient locations such as a wrapping envelope using cid: though this has ramifications for using signatures. Relative URLs are interpreted relative to the service url, like a resource reference, rather than relative to the resource itself. If a URL is provided, it SHALL resolve to actual data.
   * - **Requirements:** The data needs to be transmitted by reference.
   * - **FHIR Type:** `url`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private url?: UrlType | undefined;

  /**
   * Attachment.size Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Number of bytes of content (if url provided)
   * - **Definition:** The number of bytes of data that make up this attachment (before base64 encoding, if that is done).
   * = **Comment:** The number of bytes is redundant if the data is provided as a base64binary, but is useful if the data is provided as a url reference.
   * - **Requirements:** Representing the size allows applications to determine whether they should fetch the content automatically in advance, or refuse to fetch it at all.
   * - **FHIR Type:** `unsignedInt`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private size?: UnsignedIntType | undefined;

  /**
   * Attachment.hash Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Hash of the data (sha-1, base64ed)
   * - **Definition:** The calculated hash of the data using SHA-1. Represented using base64.
   * = **Comment:** The hash is calculated on the data prior to base64 encoding, if the data is based64 encoded. The hash is not intended to support digital signatures. Where protection against malicious threats a digital signature should be considered, see [Provenance.signature](https://hl7.org/fhir/provenance-definitions.html#Provenance.signature) for mechanism to protect a resource with a digital signature.
   * - **Requirements:** Included so that applications can verify that the contents of a location have not changed due to technical failures (e.g., storage rot, transport glitch, incorrect version).
   * - **FHIR Type:** `base64Binary`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private hash?: Base64BinaryType | undefined;

  /**
   * Attachment.title Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Label to display in place of the data
   * - **Definition:** A label or set of text to display in place of the data.
   * - **Requirements:** Applications need a label to display to a human user in place of the actual data if the data cannot be rendered or perceived by the viewer.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private title?: StringType | undefined;

  /**
   * Attachment.creation Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Date attachment was first creation
   * - **Definition:** The date that the attachment was first creation.
   * - **Requirements:** This is often tracked as an integrity issue for use of the attachment.
   * - **FHIR Type:** `dateTime`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private creation?: DateTimeType | undefined;

  /**
   * @returns the `contentType` property value as a PrimitiveType
   */
  public getContentTypeElement(): CodeType {
    return this.contentType ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `contentType` property.
   *
   * @param element - the `contentType` value
   * @returns this
   */
  public setContentTypeElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Attachment.contentType; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.contentType = element;
    } else {
      this.contentType = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `contentType` property exists and has a value; `false` otherwise
   */
  public hasContentTypeElement(): boolean {
    return isDefined<CodeType>(this.contentType) && !this.contentType.isEmpty();
  }

  /**
   * @returns the `contentType` property value as a primitive value
   */
  public getContentType(): fhirCode | undefined {
    return this.contentType?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `contentType` property.
   *
   * @param value - the `contentType` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setContentType(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Attachment.contentType (${String(value)})`;
      this.contentType = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.contentType = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `contentType` property exists and has a value; `false` otherwise
   */
  public hasContentType(): boolean {
    return this.hasContentTypeElement();
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
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Attachment.language; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.language = element;
    } else {
      this.language = undefined;
    }
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
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Attachment.language (${String(value)})`;
      this.language = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.language = undefined;
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
   * @returns the `data` property value as a PrimitiveType
   */
  public getDataElement(): Base64BinaryType {
    return this.data ?? new Base64BinaryType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `data` property.
   *
   * @param element - the `data` value
   * @returns this
   */
  public setDataElement(element: Base64BinaryType | undefined): this {
    if (isDefined<Base64BinaryType>(element)) {
      const optErrMsg = `Invalid Attachment.data; Provided element is not an instance of Base64BinaryType.`;
      assertFhirType<Base64BinaryType>(element, Base64BinaryType, optErrMsg);
      this.data = element;
    } else {
      this.data = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `data` property exists and has a value; `false` otherwise
   */
  public hasDataElement(): boolean {
    return isDefined<Base64BinaryType>(this.data) && !this.data.isEmpty();
  }

  /**
   * @returns the `data` property value as a primitive value
   */
  public getData(): fhirBase64Binary | undefined {
    return this.data?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `data` property.
   *
   * @param value - the `data` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setData(value: fhirBase64Binary | undefined): this {
    if (isDefined<fhirBase64Binary>(value)) {
      const optErrMsg = `Invalid Attachment.data (${String(value)})`;
      this.data = new Base64BinaryType(parseFhirPrimitiveData(value, fhirBase64BinarySchema, optErrMsg));
    } else {
      this.data = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `data` property exists and has a value; `false` otherwise
   */
  public hasData(): boolean {
    return this.hasDataElement();
  }

  /**
   * @returns the `url` property value as a PrimitiveType
   */
  public getUrlElement(): UrlType {
    return this.url ?? new UrlType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `url` property.
   *
   * @param element - the `url` value
   * @returns this
   */
  public setUrlElement(element: UrlType | undefined): this {
    if (isDefined<UrlType>(element)) {
      const optErrMsg = `Invalid Attachment.url; Provided element is not an instance of UrlType.`;
      assertFhirType<UrlType>(element, UrlType, optErrMsg);
      this.url = element;
    } else {
      this.url = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `url` property exists and has a value; `false` otherwise
   */
  public hasUrlElement(): boolean {
    return isDefined<UrlType>(this.url) && !this.url.isEmpty();
  }

  /**
   * @returns the `url` property value as a primitive value
   */
  public getUrl(): fhirUrl | undefined {
    return this.url?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `url` property.
   *
   * @param value - the `url` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setUrl(value: fhirUrl | undefined): this {
    if (isDefined<fhirUrl>(value)) {
      const optErrMsg = `Invalid Attachment.url (${String(value)})`;
      this.url = new UrlType(parseFhirPrimitiveData(value, fhirUrlSchema, optErrMsg));
    } else {
      this.url = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `url` property exists and has a value; `false` otherwise
   */
  public hasUrl(): boolean {
    return this.hasUrlElement();
  }

  /**
   * @returns the `size` property value as a PrimitiveType
   */
  public getSizeElement(): UnsignedIntType {
    return this.size ?? new UnsignedIntType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `size` property.
   *
   * @param element - the `size` value
   * @returns this
   */
  public setSizeElement(element: UnsignedIntType | undefined): this {
    if (isDefined<UnsignedIntType>(element)) {
      const optErrMsg = `Invalid Attachment.size; Provided element is not an instance of UnsignedIntType.`;
      assertFhirType<UnsignedIntType>(element, UnsignedIntType, optErrMsg);
      this.size = element;
    } else {
      this.size = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `size` property exists and has a value; `false` otherwise
   */
  public hasSizeElement(): boolean {
    return isDefined<UnsignedIntType>(this.size) && !this.size.isEmpty();
  }

  /**
   * @returns the `size` property value as a primitive value
   */
  public getSize(): fhirUnsignedInt | undefined {
    return this.size?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `size` property.
   *
   * @param value - the `size` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setSize(value: fhirUnsignedInt | undefined): this {
    if (isDefined<fhirUnsignedInt>(value)) {
      const optErrMsg = `Invalid Attachment.size (${String(value)})`;
      this.size = new UnsignedIntType(parseFhirPrimitiveData(value, fhirUnsignedIntSchema, optErrMsg));
    } else {
      this.size = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `size` property exists and has a value; `false` otherwise
   */
  public hasSize(): boolean {
    return this.hasSizeElement();
  }

  /**
   * @returns the `hash` property value as a PrimitiveType
   */
  public getHashElement(): Base64BinaryType {
    return this.hash ?? new Base64BinaryType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `hash` property.
   *
   * @param element - the `hash` value
   * @returns this
   */
  public setHashElement(element: Base64BinaryType | undefined): this {
    if (isDefined<Base64BinaryType>(element)) {
      const optErrMsg = `Invalid Attachment.hash; Provided element is not an instance of Base64BinaryType.`;
      assertFhirType<Base64BinaryType>(element, Base64BinaryType, optErrMsg);
      this.hash = element;
    } else {
      this.hash = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `hash` property exists and has a value; `false` otherwise
   */
  public hasHashElement(): boolean {
    return isDefined<Base64BinaryType>(this.hash) && !this.hash.isEmpty();
  }

  /**
   * @returns the `hash` property value as a primitive value
   */
  public getHash(): fhirBase64Binary | undefined {
    return this.hash?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `hash` property.
   *
   * @param value - the `hash` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setHash(value: fhirBase64Binary | undefined): this {
    if (isDefined<fhirBase64Binary>(value)) {
      const optErrMsg = `Invalid Attachment.hash (${String(value)})`;
      this.hash = new Base64BinaryType(parseFhirPrimitiveData(value, fhirBase64BinarySchema, optErrMsg));
    } else {
      this.hash = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `hash` property exists and has a value; `false` otherwise
   */
  public hasHash(): boolean {
    return this.hasHashElement();
  }

  /**
   * @returns the `title` property value as a PrimitiveType
   */
  public getTitleElement(): StringType {
    return this.title ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `title` property.
   *
   * @param element - the `title` value
   * @returns this
   */
  public setTitleElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid Attachment.title; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.title = element;
    } else {
      this.title = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `title` property exists and has a value; `false` otherwise
   */
  public hasTitleElement(): boolean {
    return isDefined<StringType>(this.title) && !this.title.isEmpty();
  }

  /**
   * @returns the `title` property value as a primitive value
   */
  public getTitle(): fhirString | undefined {
    return this.title?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `title` property.
   *
   * @param value - the `title` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setTitle(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid Attachment.title (${String(value)})`;
      this.title = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.title = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `title` property exists and has a value; `false` otherwise
   */
  public hasTitle(): boolean {
    return this.hasTitleElement();
  }

  /**
   * @returns the `creation` property value as a PrimitiveType
   */
  public getCreationElement(): DateTimeType {
    return this.creation ?? new DateTimeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `creation` property.
   *
   * @param element - the `creation` value
   * @returns this
   */
  public setCreationElement(element: DateTimeType | undefined): this {
    if (isDefined<DateTimeType>(element)) {
      const optErrMsg = `Invalid Attachment.creation; Provided element is not an instance of DateTimeType.`;
      assertFhirType<DateTimeType>(element, DateTimeType, optErrMsg);
      this.creation = element;
    } else {
      this.creation = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `creation` property exists and has a value; `false` otherwise
   */
  public hasCreationElement(): boolean {
    return isDefined<DateTimeType>(this.creation) && !this.creation.isEmpty();
  }

  /**
   * @returns the `creation` property value as a primitive value
   */
  public getCreation(): fhirDateTime | undefined {
    return this.creation?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `creation` property.
   *
   * @param value - the `creation` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setCreation(value: fhirDateTime | undefined): this {
    if (isDefined<fhirDateTime>(value)) {
      const optErrMsg = `Invalid Attachment.creation (${String(value)})`;
      this.creation = new DateTimeType(parseFhirPrimitiveData(value, fhirDateTimeSchema, optErrMsg));
    } else {
      this.creation = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `creation` property exists and has a value; `false` otherwise
   */
  public hasCreation(): boolean {
    return this.hasCreationElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Attachment';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(
        this.contentType,
        this.language,
        this.data,
        this.url,
        this.size,
        this.hash,
        this.title,
        this.creation,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Attachment {
    const dest = new Attachment();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Attachment): void {
    super.copyValues(dest);
    dest.contentType = this.contentType?.copy();
    dest.language = this.language?.copy();
    dest.data = this.data?.copy();
    dest.url = this.url?.copy();
    dest.size = this.size?.copy();
    dest.hash = this.hash?.copy();
    dest.title = this.title?.copy();
    dest.creation = this.creation?.copy();
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

    if (this.hasContentTypeElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getContentTypeElement(), 'contentType', jsonObj);
    }

    if (this.hasLanguageElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getLanguageElement(), 'language', jsonObj);
    }

    if (this.hasDataElement()) {
      setFhirPrimitiveJson<fhirBase64Binary>(this.getDataElement(), 'data', jsonObj);
    }

    if (this.hasUrlElement()) {
      setFhirPrimitiveJson<fhirUrl>(this.getUrlElement(), 'url', jsonObj);
    }

    if (this.hasSizeElement()) {
      setFhirPrimitiveJson<fhirUnsignedInt>(this.getSizeElement(), 'size', jsonObj);
    }

    if (this.hasHashElement()) {
      setFhirPrimitiveJson<fhirBase64Binary>(this.getHashElement(), 'hash', jsonObj);
    }

    if (this.hasTitleElement()) {
      setFhirPrimitiveJson<fhirString>(this.getTitleElement(), 'title', jsonObj);
    }

    if (this.hasCreationElement()) {
      setFhirPrimitiveJson<fhirDateTime>(this.getCreationElement(), 'creation', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
