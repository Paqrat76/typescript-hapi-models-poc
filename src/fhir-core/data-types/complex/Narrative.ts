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

import { isNil } from 'lodash';
import { REQUIRED_PROPERTIES_DO_NOT_EXIST } from '@src/fhir-core/constants';
import { DataType, PrimitiveType, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import {
  assertEnumCodeType,
  CodeType,
  EnumCodeType,
  constructorCodeValueAsEnumCodeType,
} from '@src/fhir-core/data-types/primitive/CodeType';
import { NarrativeStatusEnum } from '@src/fhir-core/data-types/code-systems/NarrativeStatusEnum';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import {
  fhirCode,
  fhirCodeSchema,
  fhirXhtml,
  fhirXhtmlSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { assertFhirType } from '@src/fhir-core/utility/type-guards';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { FhirError } from '@src/fhir-core/errors/FhirError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Narrative Class
 *
 * @remarks
 * Base StructureDefinition for Narrative Type: A human-readable summary of the resource conveying the essential clinical and business information for the resource.
 *
 * While both `status` and `div` cannot be `undefined`, either may be initialized via the constructor to `null`.
 * However, both `status` and `div` cannot be set (reassigned) to `null`.
 * This supports the rare need to initialize Narrative as "empty".
 *
 * **FHIR Specification**
 * - **Short:** Human-readable summary of the resource (essential clinical and business information)
 * - **Definition:** A human-readable summary of the resource conveying the essential clinical and business information for the resource.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Narrative
 *
 * @category Datatypes: Complex
 * @see [FHIR Narrative](http://hl7.org/fhir/StructureDefinition/Narrative)
 */
export class Narrative extends DataType implements IBase {
  private readonly narrativeStatusEnum: NarrativeStatusEnum;

  /**
   * @param status - The status of the narrative
   * @param div - The actual narrative content, a stripped down version of XHTML
   */
  constructor(status: EnumCodeType | CodeType | fhirCode | null, div: XhtmlType | fhirXhtml | null) {
    super();

    this.narrativeStatusEnum = new NarrativeStatusEnum();

    this.status = constructorCodeValueAsEnumCodeType<NarrativeStatusEnum>(
      status,
      NarrativeStatusEnum,
      this.narrativeStatusEnum,
      'Narrative.status',
    );

    this.div = null;
    if (!isNil(div)) {
      if (div instanceof PrimitiveType) {
        this.setDivElement(div);
      } else {
        this.setDiv(div);
      }
    }
  }

  /**
   * Narrative.status Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** generated | extensions | additional | empty
   * - **Definition:** The status of the narrative - whether it's entirely generated (from just the defined data or the extensions too), or whether a human authored it and it may contain additional data.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected status: EnumCodeType | null;

  /**
   * Narrative.div Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Limited xhtml content
   * - **Definition:** The actual narrative content, a stripped down version of XHTML.
   * - **Comment:** The contents of the html element are an XHTML fragment containing only the basic html formatting elements described in chapters 7-11 and 15 of the HTML 4.0 standard, <a> elements (either name or href), images and internally contained stylesheets. The XHTML content SHALL NOT contain a head, a body, external stylesheet references, scripts, forms, base/link/xlink, frames, iframes and objects.
   * - **FHIR Type:** `xhtml`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected div: XhtmlType | null;

  /**
   * @returns the `status` property value as a EnumCodeType
   */
  public getStatusEnumType(): EnumCodeType | null {
    return this.status;
  }

  /**
   * Assigns the provided EnumCodeType value to the `status` property.
   *
   * @param enumType - the `status` value
   * @returns this
   */
  public setStatueEnumType(enumType: EnumCodeType): this {
    if (!isNil(enumType)) {
      const errMsgPrefix = 'Invalid Narrative.status';
      assertEnumCodeType<NarrativeStatusEnum>(enumType, NarrativeStatusEnum, errMsgPrefix);
      this.status = enumType;
    }
    return this;
  }

  /**
   * @returns `true` if the `status` property exists and has a value; `false` otherwise
   */
  public hasStatusEnumType(): boolean {
    return !isNil(this.status) && !this.status.isEmpty() && this.status.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `status` property value as a PrimitiveType
   */
  public getStatusElement(): CodeType | null {
    if (this.status === null) {
      return null;
    }
    return this.status as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `status` property.
   *
   * @param element - the `status` value
   * @returns this
   */
  public setStatusElement(element: CodeType): this {
    if (!isNil(element)) {
      const optErrMsg = `Invalid Narrative.status; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.status = new EnumCodeType(element, this.narrativeStatusEnum);
    }
    return this;
  }

  /**
   * @returns `true` if the `status` property exists and has a value; `false` otherwise
   */
  public hasStatusElement(): boolean {
    return this.hasStatusEnumType();
  }

  /**
   * @returns the `status` property value as a primitive value
   */
  public getStatus(): fhirCode | null {
    if (this.status === null) {
      return null;
    }
    return this.status.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `status` property.
   *
   * @param value - the `status` value
   * @returns this
   */
  public setStatus(value: fhirCode): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid Narrative.status (${String(value)})`;
      this.status = new EnumCodeType(
        parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg),
        this.narrativeStatusEnum,
      );
    }
    return this;
  }

  /**
   * @returns `true` if the `status` property exists and has a value; `false` otherwise
   */
  public hasStatus(): boolean {
    return this.hasStatusEnumType();
  }

  /**
   * @returns the `div` property value as a PrimitiveType
   */
  public getDivElement(): XhtmlType | null {
    return this.div;
  }

  /**
   * Assigns the provided PrimitiveType value to the `div` property.
   *
   * @param element - the `div` value
   * @returns this
   */
  public setDivElement(element: XhtmlType): this {
    if (!isNil(element)) {
      const optErrMsg = `Invalid Narrative.div; Provided element is not an instance of XhtmlType.`;
      assertFhirType<XhtmlType>(element, XhtmlType, optErrMsg);
      this.div = element;
    }
    return this;
  }

  /**
   * @returns `true` if the `div` property exists and has a value; `false` otherwise
   */
  public hasDivElement(): boolean {
    return !isNil(this.div) && !this.div.isEmpty();
  }

  /**
   * @returns the `div` property value as a primitive value
   */
  public getDiv(): fhirXhtml | null {
    if (this.div?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.div.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `div` property.
   *
   * @param value - the `div` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setDiv(value: fhirXhtml): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid Narrative.div (invalid value provided)`;
      this.div = new XhtmlType(parseFhirPrimitiveData(value, fhirXhtmlSchema, optErrMsg));
    }
    return this;
  }

  /**
   * @returns `true` if the `div` property exists and has a value; `false` otherwise
   */
  public hasDiv(): boolean {
    return this.hasDivElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Narrative';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.status, this.div);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Narrative {
    // Initialize dest Narrative - these values will be overridden in copyValues()
    const dest = new Narrative(null, null);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: Narrative): void {
    super.copyValues(dest);
    dest.status = this.status === null ? null : this.status.copy();
    dest.div = this.div === null ? null : this.div.copy();
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

    const missingReqdProperties: string[] = [];

    if (this.hasStatusElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getStatusElement()!, 'status', jsonObj);
    } else {
      missingReqdProperties.push('Narrative.status');
    }

    if (this.hasDivElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirXhtml>(this.getDivElement()!, 'div', jsonObj);
    } else {
      missingReqdProperties.push('Narrative.div');
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
