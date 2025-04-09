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

import { DataType, setFhirComplexListJson, setFhirPrimitiveJson } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { INSTANCE_EMPTY_ERROR_MSG } from '@src/fhir-core/constants';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import {
  fhirString,
  fhirStringSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import { getPrimitiveTypeJson, parseStringType, processElementJson } from '@src/fhir-core/utility/fhir-parsers';
import { copyListValues, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { assertFhirType, assertFhirTypeList, isDefined, isDefinedList } from '@src/fhir-core/utility/type-guards';
import { strict as assert } from 'node:assert';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * CodeableConcept Class
 *
 * @remarks
 * Base StructureDefinition for CodeableConcept Type: A concept that may be defined by a formal reference to a terminology or ontology or may be provided by text.
 *
 * **FHIR Specification**
 * - **Short:** Concept - reference to a terminology or just text
 * - **Definition:** A concept that may be defined by a formal reference to a terminology or ontology or may be provided by text.
 * - **Comment:** Not all terminology uses fit this general pattern. In some cases, models should not use CodeableConcept and use Coding directly and provide their own structure for managing text, codings, translations and the relationship between elements and pre- and post-coordination.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.CodeableConcept
 *
 * @category Datatypes: Complex
 * @see [FHIR CodeableConcept](http://hl7.org/fhir/StructureDefinition/CodeableConcept)
 */
export class CodeableConcept extends DataType implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Parse the provided `CodeableConcept` json to instantiate the CodeableConcept data model.
   *
   * @param sourceJson - JSON representing FHIR `CodeableConcept`
   * @param optSourceField - Optional data source field (e.g. `<complexTypeName>.<complexTypeFieldName>`); defaults to CodeableConcept
   * @returns CodeableConcept data model or undefined for `CodeableConcept`
   */
  public static parse(sourceJson: JSON.Value, optSourceField?: string): CodeableConcept | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const source = isDefined<string>(optSourceField) ? optSourceField : 'CodeableConcept';
    const datatypeJsonObj: JSON.Object = JSON.asObject(sourceJson, `${source} JSON`);
    const instance = new CodeableConcept();
    processElementJson(instance, datatypeJsonObj);

    let fieldName: string;
    let sourceField: string;
    let primitiveJsonType: 'boolean' | 'number' | 'string';

    fieldName = 'coding';
    sourceField = `${source}.${fieldName}`;
    if (fieldName in datatypeJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(datatypeJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Coding | undefined = Coding.parse(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addCoding(datatype);
        }
      });
    }

    fieldName = 'text';
    sourceField = `${source}.${fieldName}`;
    // eslint-disable-next-line prefer-const
    primitiveJsonType = 'string';
    if (fieldName in datatypeJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(
        datatypeJsonObj,
        sourceField,
        fieldName,
        primitiveJsonType,
      );
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      instance.setTextElement(datatype);
    }

    assert(!instance.isEmpty(), INSTANCE_EMPTY_ERROR_MSG);
    return instance;
  }

  /**
   * CodeableConcept.coding Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Code defined by a terminology system
   * - **Definition:** A reference to a code defined by a terminology system.
   * - **Comment:** Codes may be defined very casually in enumerations, or code lists, up to very formal definitions such as SNOMED CT - see the HL7 v3 Core Principles for more information.  Ordering of codings is undefined and SHALL NOT be used to infer meaning. Generally, at most only one of the coding values will be labeled as UserSelected = true.
   * - **Requirements:** Allows for alternative encodings within a code system, and translations to other code systems.
   * - **FHIR Type:** `Coding`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private coding?: Coding[] | undefined;

  /**
   * CodeableConcept.text Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Plain text representation of the concept
   * - **Definition:** A human language representation of the concept as seen/selected/uttered by the user who entered the data and/or which represents the intended meaning of the user.
   * - **Comment:** Very often the text is the same as a displayName of one of the codings.
   * - **Requirements:** The codes from the terminologies do not always capture the correct meaning with all the nuances of the human using them, or sometimes there is no appropriate code at all. In these cases, the text is used to capture the full meaning of the source.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private text?: StringType | undefined;

  /**
   * @returns the `coding` property value as a Coding array
   */
  public getCoding(): Coding[] {
    return this.coding ?? ([] as Coding[]);
  }

  /**
   * Assigns the provided Coding array value to the `coding` property.
   *
   * @param value - the `coding` array value
   * @returns this
   */
  public setCoding(value: Coding[] | undefined): this {
    if (isDefinedList<Coding>(value)) {
      const optErrMsg = `Invalid CodeableConcept.coding; Provided value array has an element that is not an instance of Coding.`;
      assertFhirTypeList<Coding>(value, Coding, optErrMsg);
      this.coding = value;
    } else {
      this.coding = undefined;
    }
    return this;
  }

  /**
   * Add the provided Coding value to the `coding` array property.
   *
   * @param value - the `coding` value
   * @returns this
   */
  public addCoding(value: Coding | undefined): this {
    if (isDefined<Coding>(value)) {
      const optErrMsg = `Invalid CodeableConcept.coding; Provided value is not an instance of Coding.`;
      assertFhirType<Coding>(value, Coding, optErrMsg);
      this.initCoding();
      this.coding?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `coding` property exists and has a value; `false` otherwise
   */
  public hasCoding(): boolean {
    return isDefinedList<Coding>(this.coding) && this.coding.some((item: Coding) => !item.isEmpty());
  }

  /**
   * Initialize the `coding` property
   */
  private initCoding(): void {
    this.coding ??= [] as Coding[];
  }

  /**
   * @returns the `text` property value as a PrimitiveType
   */
  public getTextElement(): StringType {
    return this.text ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `text` property.
   *
   * @param element - the `text` value
   * @returns this
   */
  public setTextElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid CodeableConcept.text; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.text = element;
    } else {
      this.text = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasTextElement(): boolean {
    return isDefined<StringType>(this.text) && !this.text.isEmpty();
  }

  /**
   * @returns the `text` property value as a primitive value
   */
  public getText(): fhirString | undefined {
    return this.text?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `text` property.
   *
   * @param value - the `text` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setText(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid CodeableConcept.text (invalid value provided)`;
      this.text = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.text = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasText(): boolean {
    return this.hasTextElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'CodeableConcept';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.coding, this.text);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): CodeableConcept {
    const dest = new CodeableConcept();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: CodeableConcept): void {
    super.copyValues(dest);
    const codingList = copyListValues<Coding>(this.coding);
    dest.coding = codingList.length === 0 ? undefined : codingList;
    dest.text = this.text?.copy();
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
    jsonObj ??= {} as JSON.Object;

    if (this.hasCoding()) {
      setFhirComplexListJson(this.getCoding(), 'coding', jsonObj);
    }

    if (this.hasTextElement()) {
      setFhirPrimitiveJson<fhirString>(this.getTextElement(), 'text', jsonObj);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
