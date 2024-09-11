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

import { DataType } from '@src/fhir-core/base-models/core-fhir-models';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { fhirString } from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir-core/utility/element-util';

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
  protected coding?: Coding[] | undefined;

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
  protected text?: StringType | undefined;

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
    this.coding = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `coding` array property.
   *
   * @param value - the `coding` value
   * @returns this
   */
  public addCoding(value?: Coding): this {
    if (value !== undefined) {
      this.initCoding();
      this.coding?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `coding` property exists and has a value; `false` otherwise
   */
  public hasCoding(): boolean {
    return this.coding !== undefined && this.coding.length > 0 && this.coding.some((item: Coding) => !item.isEmpty());
  }

  /**
   * Initialize the `coding` property
   *
   * @private
   */
  private initCoding(): void {
    if (this.coding === undefined) {
      this.coding = [] as Coding[];
    }
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
    this.text = element;
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasTextElement(): boolean {
    return this.text !== undefined && !this.text.isEmpty();
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
    const optErrMsg = `Invalid CodeableConcept.text`;
    this.text = value === undefined ? undefined : new StringType(StringType.parse(value, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasText(): boolean {
    return this.hasTextElement();
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'CodeableConcept';
  }

  /**
   * {@inheritDoc Base.isEmpty}
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
    if (this.coding !== undefined) {
      dest.coding = [] as Coding[];
      for (const security of this.coding) {
        dest.coding.push(security.copy());
      }
    } else {
      dest.coding = undefined;
    }
    dest.text = this.text?.copy();
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
