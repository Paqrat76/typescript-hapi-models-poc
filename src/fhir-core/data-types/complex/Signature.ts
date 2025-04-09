/*
 * Copyright (c) 2025. Joe Paquette
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
  PrimitiveType,
  setFhirComplexJson,
  setFhirComplexListJson,
  setFhirPrimitiveJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import {
  INSTANCE_EMPTY_ERROR_MSG,
  REQUIRED_PROPERTIES_DO_NOT_EXIST,
  REQUIRED_PROPERTIES_REQD_IN_JSON,
} from '@src/fhir-core/constants';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { Reference, ReferenceTargets } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Base64BinaryType } from '@src/fhir-core/data-types/primitive/Base64BinaryType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import {
  fhirBase64Binary,
  fhirBase64BinarySchema,
  fhirCode,
  fhirCodeSchema,
  fhirInstant,
  fhirInstantSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import {
  getPrimitiveTypeJson,
  parseBase64BinaryType,
  parseCodeType,
  parseInstantType,
  processElementJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  assertIsDefinedList,
  isDefined,
  isDefinedList,
} from '@src/fhir-core/utility/type-guards';
import { strict as assert } from 'node:assert';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Signature Class
 *
 * @remarks
 * Base StructureDefinition for Signature Type: A signature along with supporting context. The signature may be a digital signature that is cryptographic in nature, or some other signature acceptable to the domain. This other signature may be as simple as a graphical image representing a hand-written signature, or a signature ceremony Different signature approaches have different utilities.
 *
 * There are a number of places where content must be signed in healthcare.
 *
 * **FHIR Specification**
 * - **Short:** A Signature - XML DigSig, JWS, Graphical image of signature, etc.
 * - **Definition:** A signature along with supporting context. The signature may be a digital signature that is cryptographic in nature, or some other signature acceptable to the domain. This other signature may be as simple as a graphical image representing a hand-written signature, or a signature ceremony Different signature approaches have different utilities.
 * - **Comment:** The elements of the Signature Resource are for ease of access of these elements. For digital signatures (Xml DigSig, JWS), the non-repudiation proof comes from the Signature  validation, which includes validation of the referenced objects (e.g. Resources) (a.k.a., Content) in the XML-Signature Detached form.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Signature
 *
 * @category Datatypes: Complex
 * @see [FHIR Signature](http://hl7.org/fhir/StructureDefinition/Signature)
 */
export class Signature extends DataType implements IBase {
  /**
   * @param type - Indication of the reason the entity signed the object(s)
   * @param when - When the signature was created
   * @param who - Who signed
   */
  constructor(type: Coding[] | null, when: InstantType | fhirInstant | null, who: Reference | null) {
    super();

    this.type = null;
    if (isDefinedList<Coding>(type)) {
      this.setType(type);
    }

    this.when = null;
    if (isDefined<InstantType | fhirInstant>(when)) {
      if (when instanceof PrimitiveType) {
        this.setWhenElement(when);
      } else {
        this.setWhen(when);
      }
    }

    this.who = null;
    if (isDefined<Reference>(who)) {
      this.setWho(who);
    }
  }

  /**
   * Parse the provided `Signature` json to instantiate the Signature data model.
   *
   * @param sourceJson - JSON representing FHIR `Signature`
   * @param optSourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to Signature
   * @returns Signature data model or undefined for `Signature`
   */
  public static parse(sourceJson: JSON.Value, optSourceField?: string): Signature | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'Signature';
    const datatypeJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new Signature(null, null, null);
    processElementJson(instance, datatypeJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    const missingReqdProperties: string[] = [];

    fieldName = 'type';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in datatypeJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Coding | undefined = Coding.parse(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype === undefined) {
          missingReqdProperties.push(`${sourceField}[${String(idx)}]`);
        } else {
          instance.addType(datatype);
        }
      });
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'when';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: InstantType | undefined = parseInstantType(dtJson, dtSiblingJson);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setWhenElement(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'who';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in datatypeJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Reference | undefined = Reference.parse(datatypeJsonObj[fieldName]!, sourceField);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setWho(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    fieldName = 'onBehalfOf';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in datatypeJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const datatype: Reference | undefined = Reference.parse(datatypeJsonObj[fieldName]!, sourceField);
      instance.setOnBehalfOf(datatype);
    }

    fieldName = 'targetFormat';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setTargetFormatElement(datatype);
    }

    fieldName = 'sigFormat';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setSigFormatElement(datatype);
    }

    fieldName = 'data';
    sourceField = `${source}.${fieldName}`;
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: Base64BinaryType | undefined = parseBase64BinaryType(dtJson, dtSiblingJson);
      instance.setDataElement(datatype);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
    return instance;
  }

  /**
   * Signature.type Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Indication of the reason the entity signed the object(s)
   * - **Definition:** An indication of the reason that the entity signed this document. This may be explicitly included as part of the signature information and can be used when determining accountability for various actions concerning the document.
   * - **Comment:** Examples include attesting to: authorship, correct transcription, and witness of specific event. Also known as a &quot;Commitment Type Indication&quot;.
   * - **FHIR Type:** `Coding`
   * - **Cardinality:** 1..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private type: Coding[] | null;

  /**
   * Signature.when Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** When the signature was created
   * - **Definition:** "When the digital signature was signed.
   * - **Comment:** This should agree with the information in the signature.
   * - **FHIR Type:** `instant`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private when: InstantType | null;

  /**
   * Signature.who Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Who signed
   * - **Definition:** A reference to an application-usable description of the identity that signed  (e.g. the signature used their private key).
   * - **Comment:** This should agree with the information in the signature.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ http://hl7.org/fhir/StructureDefinition/Practitioner, http://hl7.org/fhir/StructureDefinition/PractitionerRole, http://hl7.org/fhir/StructureDefinition/RelatedPerson, http://hl7.org/fhir/StructureDefinition/Patient, http://hl7.org/fhir/StructureDefinition/Device, http://hl7.org/fhir/StructureDefinition/Organization ]
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private who: Reference | null;

  /**
   * Signature.onBehalfOff Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The party represented
   * - **Definition:** A reference to an application-usable description of the identity that is represented by the signature.
   * - **Comment:** The party that can't sign. For example a child.
   * - **Requirements:** used when the signature is on behalf of a non-signer.
   * - **FHIR Type:** `Reference`
   *  - _TargetProfiles_: [ http://hl7.org/fhir/StructureDefinition/Practitioner, http://hl7.org/fhir/StructureDefinition/PractitionerRole, http://hl7.org/fhir/StructureDefinition/RelatedPerson, http://hl7.org/fhir/StructureDefinition/Patient, http://hl7.org/fhir/StructureDefinition/Device, http://hl7.org/fhir/StructureDefinition/Organization ]
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private onBehalfOf?: Reference | undefined;

  /**
   * Signature.targetFormat Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The technical format of the signed resources
   * - **Definition:** A mime type that indicates the technical format of the target resources signed by the signature.
   * - **Comment:** "xml", "json" and "ttl" are allowed, which describe the simple encodings described in the specification (and imply appropriate bundle support). Otherwise, mime types are legal here.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private targetFormat?: CodeType | undefined;

  /**
   * Signature.sigFormat Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The technical format of the signature
   * - **Definition:** A mime type that indicates the technical format of the signature. Important mime types are application/signature+xml for XML DigSig, application/jose for JWS, and image/* for a graphical image of a signature, etc.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private sigFormat?: CodeType | undefined;

  /**
   * Signature.data Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The actual signature content (XML DigSig. JWS, picture, etc.)
   * - **Definition:** The base64 encoding of the Signature content. When signature is not recorded electronically this element would be empty.
   * - **Comment:** Where the signature type is an XML DigSig, the signed content is a FHIR Resource(s), the signature is of the XML form of the Resource(s) using  XML-Signature (XMLDIG) "Detached Signature" form.
   * - **FHIR Type:** `base64Binary`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private data?: Base64BinaryType | undefined;

  /**
   * @returns the `type` property value as a Coding array
   */
  public getType(): Coding[] | null {
    return this.type;
  }

  /**
   * Assigns the provided Coding array value to the `type` property.
   *
   * @param value - the `type` array value
   * @returns this
   */
  public setType(value: Coding[]): this {
    assertIsDefinedList<Coding>(value, `Signature.type is required`);
    const optErrMsg = `Invalid Signature.type; Provided value array has an element that is not an instance of Coding.`;
    assertFhirTypeList<Coding>(value, Coding, optErrMsg);
    this.type = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `type` array property.
   *
   * @param value - the `type` value
   * @returns this
   */
  public addType(value: Coding | undefined): this {
    if (isDefined<Coding>(value)) {
      const optErrMsg = `Invalid Signature.type; Provided element is not an instance of Coding.`;
      assertFhirType<Coding>(value, Coding, optErrMsg);
      this.initType();
      this.type?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasType(): boolean {
    return isDefinedList<Coding>(this.type) && this.type.some((item: Coding) => !item.isEmpty());
  }

  /**
   * Initialize the `type` property
   */
  private initType(): void {
    if (!this.hasType()) {
      this.type = [] as Coding[];
    }
  }

  /**
   * @returns the `when` property value as a PrimitiveType
   */
  public getWhenElement(): InstantType | null {
    return this.when;
  }

  /**
   * Assigns the provided PrimitiveType value to the `when` property.
   *
   * @param element - the `when` value
   * @returns this
   */
  public setWhenElement(element: InstantType): this {
    assertIsDefined<InstantType>(element, `Signature.when is required`);
    const optErrMsg = `Invalid Signature.when; Provided value is not an instance of InstantType.`;
    assertFhirType<InstantType>(element, InstantType, optErrMsg);
    this.when = element;
    return this;
  }

  /**
   * @returns `true` if the `when` property exists and has a value; `false` otherwise
   */
  public hasWhenElement(): boolean {
    return isDefined<InstantType>(this.when) && !this.when.isEmpty();
  }

  /**
   * @returns the `when` property value as a primitive value
   */
  public getWhen(): fhirInstant | null {
    if (this.when?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.when.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `when` property.
   *
   * @param value - the `when` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setWhen(value: fhirInstant): this {
    assertIsDefined<fhirInstant>(value, `Signature.when is required`);
    const optErrMsg = `Invalid Signature.when (${String(value)})`;
    this.when = new InstantType(parseFhirPrimitiveData(value, fhirInstantSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `when` property exists and has a value; `false` otherwise
   */
  public hasWhen(): boolean {
    return this.hasWhenElement();
  }

  /**
   * @returns the `who` property value as a Reference object
   */
  public getWho(): Reference | null {
    return this.who;
  }

  /**
   * Assigns the provided Reference object value to the `who` property.
   *
   * @param value - the `who` object value
   * @returns this
   */
  @ReferenceTargets('Signature.who', [
    'Practitioner',
    'PractitionerRole',
    'RelatedPerson',
    'Patient',
    'Device',
    'Organization',
  ])
  public setWho(value: Reference): this {
    assertIsDefined<Reference>(value, `Signature.who is required`);
    // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
    this.who = value;
    return this;
  }

  /**
   * @returns `true` if the `who` property exists and has a value; `false` otherwise
   */
  public hasWho(): boolean {
    return isDefined<Reference>(this.who) && !this.who.isEmpty();
  }

  /**
   * @returns the `onBehalfOf` property value as a OnBehalfOf object
   */
  public getOnBehalfOf(): Reference {
    return this.onBehalfOf ?? new Reference();
  }

  /**
   * Assigns the provided OnBehalfOf object value to the `onBehalfOf` property.
   *
   * @param value - the `onBehalfOf` object value
   * @returns this
   */
  @ReferenceTargets('Signature.onBehalfOf', [
    'Practitioner',
    'PractitionerRole',
    'RelatedPerson',
    'Patient',
    'Device',
    'Organization',
  ])
  public setOnBehalfOf(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.onBehalfOf = value;
    } else {
      this.onBehalfOf = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `onBehalfOf` property exists and has a value; `false` otherwise
   */
  public hasOnBehalfOf(): boolean {
    return isDefined<Reference>(this.onBehalfOf) && !this.onBehalfOf.isEmpty();
  }

  /**
   * @returns the `targetFormat` property value as a PrimitiveType
   */
  public getTargetFormatElement(): CodeType {
    return this.targetFormat ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `targetFormat` property.
   *
   * @param element - the `targetFormat` value
   * @returns this
   */
  public setTargetFormatElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Signature.targetFormat; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.targetFormat = element;
    } else {
      this.targetFormat = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `targetFormat` property exists and has a value; `false` otherwise
   */
  public hasTargetFormatElement(): boolean {
    return isDefined<CodeType>(this.targetFormat) && !this.targetFormat.isEmpty();
  }

  /**
   * @returns the `targetFormat` property value as a primitive value
   */
  public getTargetFormat(): fhirCode | undefined {
    return this.targetFormat?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `targetFormat` property.
   *
   * @param value - the `targetFormat` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setTargetFormat(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Signature.targetFormat (${String(value)})`;
      this.targetFormat = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.targetFormat = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `targetFormat` property exists and has a value; `false` otherwise
   */
  public hasTargetFormat(): boolean {
    return this.hasTargetFormatElement();
  }

  /**
   * @returns the `sigFormat` property value as a PrimitiveType
   */
  public getSigFormatElement(): CodeType {
    return this.sigFormat ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `sigFormat` property.
   *
   * @param element - the `sigFormat` value
   * @returns this
   */
  public setSigFormatElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Signature.sigFormat; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.sigFormat = element;
    } else {
      this.sigFormat = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `sigFormat` property exists and has a value; `false` otherwise
   */
  public hasSigFormatElement(): boolean {
    return isDefined<CodeType>(this.sigFormat) && !this.sigFormat.isEmpty();
  }

  /**
   * @returns the `sigFormat` property value as a primitive value
   */
  public getSigFormat(): fhirCode | undefined {
    return this.sigFormat?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `sigFormat` property.
   *
   * @param value - the `sigFormat` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setSigFormat(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Signature.sigFormat (${String(value)})`;
      this.sigFormat = new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    } else {
      this.sigFormat = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `sigFormat` property exists and has a value; `false` otherwise
   */
  public hasSigFormat(): boolean {
    return this.hasSigFormatElement();
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
      const optErrMsg = `Invalid Signature.data; Provided element is not an instance of Base64BinaryType.`;
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
      const optErrMsg = `Invalid Signature.data (${String(value)})`;
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
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Signature';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(this.type, this.when, this.who, this.onBehalfOf, this.targetFormat, this.sigFormat, this.data)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Signature {
    // Initialize dest Signature - these values will be overridden in copyValues()
    const dest = new Signature(null, null, null);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Signature): void {
    super.copyValues(dest);
    const typeList = copyListValues<Coding>(this.type);
    dest.type = typeList.length === 0 ? null : typeList;
    dest.when = this.when === null ? null : this.when.copy();
    dest.who = this.who === null ? null : this.who.copy();
    dest.onBehalfOf = this.onBehalfOf?.copy();
    dest.targetFormat = this.targetFormat?.copy();
    dest.sigFormat = this.sigFormat?.copy();
    dest.data = this.data?.copy();
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
    // Required class properties exist (have a min cardinality > 0); therefore do not check for this.isEmpty()!
    // if (this.isEmpty()) {
    //   return undefined;
    // }

    let jsonObj = super.toJSON() as JSON.Object | undefined;
    jsonObj ??= {} as JSON.Object;

    const missingReqdProperties: string[] = [];

    if (this.hasType()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirComplexListJson(this.getType()!, 'type', jsonObj);
    } else {
      missingReqdProperties.push(`Signature.type`);
    }

    if (this.hasWhenElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirInstant>(this.getWhenElement()!, 'when', jsonObj);
    } else {
      missingReqdProperties.push(`Signature.when`);
    }

    if (this.hasWho()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirComplexJson(this.getWho()!, 'who', jsonObj);
    } else {
      missingReqdProperties.push(`Signature.who`);
    }

    if (this.hasOnBehalfOf()) {
      setFhirComplexJson(this.getOnBehalfOf(), 'onBehalfOf', jsonObj);
    }

    if (this.hasTargetFormatElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getTargetFormatElement(), 'targetFormat', jsonObj);
    }

    if (this.hasSigFormatElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getSigFormatElement(), 'sigFormat', jsonObj);
    }

    if (this.hasDataElement()) {
      setFhirPrimitiveJson<fhirBase64Binary>(this.getDataElement(), 'data', jsonObj);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
