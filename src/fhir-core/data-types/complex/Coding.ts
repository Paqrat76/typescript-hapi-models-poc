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

import { DataType, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCode,
  fhirCodeSchema,
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Coding Class
 *
 * @remarks
 * Base StructureDefinition for Coding Type: A reference to a code defined by a terminology system.
 *
 * **FHIR Specification**
 * - **Short:** A reference to a code defined by a terminology system
 * - **Definition:** A reference to a code defined by a terminology system.
 * - **Comment:** Codes may be defined very casually in enumerations or code lists, up to very formal definitions such as SNOMED CT - see the HL7 v3 Core Principles for more information.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Coding
 *
 * @category Datatypes: Complex
 * @see [FHIR Coding](http://hl7.org/fhir/StructureDefinition/Coding)
 */
export class Coding extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Coding.system Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Identity of the terminology system
   * - **Definition:** The identification of the code system that defines the meaning of the symbol in the code.
   * - **Comment:** The URI may be an OID (urn:oid:...) or a UUID (urn:uuid:...).  OIDs and UUIDs SHALL be references to the HL7 OID registry. Otherwise, the URI should come from HL7's list of FHIR defined special URIs or it should reference to some definition that establishes the system clearly and unambiguously.
   * - **Requirements:** Need to be unambiguous about the source of the definition of the symbol.
   * - **FHIR Type:** `uri`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected system?: UriType | undefined;

  /**
   * Coding.version Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Version of the system - if relevant
   * - **Definition:** The version of the code system which was used when choosing this code. Note that a well-maintained code system does not need the version reported, because the meaning of codes is consistent across versions. However this cannot consistently be assured, and when the meaning is not guaranteed to be consistent, the version SHOULD be exchanged.
   * - **Comment:** Where the terminology does not clearly define what string should be used to identify code system versions, the recommendation is to use the date (expressed in FHIR date format) on which that version was officially published as the version date.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected version?: StringType | undefined;

  /**
   * Coding.code Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Symbol in syntax defined by the system
   * - **Definition:** A symbol in syntax defined by the system. The symbol may be a predefined code or an expression in a syntax defined by the coding system (e.g. post-coordination).
   * - **Requirements:** Need to refer to a particular code in the system.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected code?: CodeType | undefined;

  /**
   * Coding.display Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Representation defined by the system
   * - **Definition:** A representation of the meaning of the code in the system, following the rules of the system.
   * - **Requirements:** Need to be able to carry a human-readable meaning of the code for readers that do not know  the system.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected display?: StringType | undefined;

  /**
   * Coding.userSelected Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** If this coding was chosen directly by the user
   * - **Definition:** Indicates that this coding was chosen by a user directly - e.g. off a pick list of available items (codes or displays).
   * - **Comment:** Amongst a set of alternatives, a directly chosen code is the most appropriate starting point for new translations. There is some ambiguity about what exactly 'directly chosen' implies, and trading partner agreement may be needed to clarify the use of this element and its consequences more completely.
   * - **Requirements:** This has been identified as a clinical safety criterium - that this exact system/code pair was chosen explicitly, rather than inferred by the system based on some rules or language processing.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected userSelected?: BooleanType | undefined;

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
    this.system = element;
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
    const optErrMsg = `Invalid Coding.system (${String(value)})`;
    this.system =
      value === undefined ? undefined : new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `system` property exists and has a value; `false` otherwise
   */
  public hasSystem(): boolean {
    return this.hasSystemElement();
  }

  /**
   * @returns the `version` property value as a PrimitiveType
   */
  public getVersionElement(): StringType {
    return this.version ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `version` property.
   *
   * @param element - the `version` value
   * @returns this
   */
  public setVersionElement(element: StringType | undefined): this {
    this.version = element;
    return this;
  }

  /**
   * @returns `true` if the `version` property exists and has a value; `false` otherwise
   */
  public hasVersionElement(): boolean {
    return this.version !== undefined && !this.version.isEmpty();
  }

  /**
   * @returns the `version` property value as a primitive value
   */
  public getVersion(): fhirString | undefined {
    return this.version?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `version` property.
   *
   * @param value - the `version` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setVersion(value: fhirString | undefined): this {
    const optErrMsg = `Invalid Coding.version (${String(value)})`;
    this.version =
      value === undefined ? undefined : new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `version` property exists and has a value; `false` otherwise
   */
  public hasVersion(): boolean {
    return this.hasVersionElement();
  }

  /**
   * @returns the `code` property value as a PrimitiveType
   */
  public getCodeElement(): CodeType {
    return this.code ?? new CodeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `code` property.
   *
   * @param element - the `code` value
   * @returns this
   */
  public setCodeElement(element: CodeType | undefined): this {
    this.code = element;
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCodeElement(): boolean {
    return this.code !== undefined && !this.code.isEmpty();
  }

  /**
   * @returns the `code` property value as a primitive value
   */
  public getCode(): fhirCode | undefined {
    return this.code?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `code` property.
   *
   * @param value - the `code` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setCode(value: fhirCode | undefined): this {
    const optErrMsg = `Invalid Coding.code (${String(value)})`;
    this.code =
      value === undefined ? undefined : new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCode(): boolean {
    return this.hasCodeElement();
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
    this.display = element;
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
    const optErrMsg = `Invalid Coding.display (${String(value)})`;
    this.display =
      value === undefined ? undefined : new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `display` property exists and has a value; `false` otherwise
   */
  public hasDisplay(): boolean {
    return this.hasDisplayElement();
  }

  /**
   * @returns the `userSelected` property value as a PrimitiveType
   */
  public getUserSelectedElement(): BooleanType {
    return this.userSelected ?? new BooleanType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `userSelected` property.
   *
   * @param element - the `userSelected` value
   * @returns this
   */
  public setUserSelectedElement(element: BooleanType | undefined): this {
    this.userSelected = element;
    return this;
  }

  /**
   * @returns `true` if the `userSelected` property exists and has a value; `false` otherwise
   */
  public hasUserSelectedElement(): boolean {
    return this.userSelected !== undefined && !this.userSelected.isEmpty();
  }

  /**
   * @returns the `userSelected` property value as a primitive value
   */
  public getUserSelected(): fhirBoolean | undefined {
    return this.userSelected?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `userSelected` property.
   *
   * @param value - the `userSelected` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setUserSelected(value: fhirBoolean | undefined): this {
    const optErrMsg = `Invalid Coding.userSelected (${String(value)}))`;
    this.userSelected =
      value === undefined ? undefined : new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `userSelected` property exists and has a value; `false` otherwise
   */
  public hasUserSelected(): boolean {
    return this.hasUserSelectedElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Coding';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.system, this.version, this.code, this.display, this.userSelected);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Coding {
    const dest = new Coding();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Coding): void {
    super.copyValues(dest);
    dest.system = this.system?.copy();
    dest.version = this.version?.copy();
    dest.code = this.code?.copy();
    dest.display = this.display?.copy();
    dest.userSelected = this.userSelected?.copy();
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

    if (this.hasSystemElement()) {
      setFhirPrimitiveJson<fhirUri>(this.getSystemElement(), 'system', jsonObj);
    }

    if (this.hasVersionElement()) {
      setFhirPrimitiveJson<fhirString>(this.getVersionElement(), 'version', jsonObj);
    }

    if (this.hasCodeElement()) {
      setFhirPrimitiveJson<fhirCode>(this.getCodeElement(), 'code', jsonObj);
    }

    if (this.hasDisplayElement()) {
      setFhirPrimitiveJson<fhirString>(this.getDisplayElement(), 'display', jsonObj);
    }

    if (this.hasUserSelectedElement()) {
      setFhirPrimitiveJson<fhirBoolean>(this.getUserSelectedElement(), 'userSelected', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
