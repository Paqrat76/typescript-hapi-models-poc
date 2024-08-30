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

import { DataType } from '@src/fhir/base-models/core-fhir-models';
import { IBase } from '@src/fhir/base-models/IBase';
import { UriType } from '@src/fhir/data-types/primitive/UriType';
import { StringType } from '@src/fhir/data-types/primitive/StringType';
import { CodeType } from '@src/fhir/data-types/primitive/CodeType';
import { BooleanType } from '@src/fhir/data-types/primitive/BooleanType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCode,
  fhirCodeSchema,
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
} from '@src/fhir/data-types/primitive/primitive-types';
import { isElementEmpty } from '@src/fhir/utility/element-util';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Complex FHIR Datatype: Coding
 *
 * @remarks
 * A Coding is a representation of a defined concept using a symbol from a defined "code system".
 *
 * The meaning of the Coding is defined by the code. The system provides the source of the definition
 * of the code, along with an optional version reference. The display is a human display for the text
 * defined by the system - it is not intended for computation.
 *
 * @category Datatypes: Complex
 * @see [FHIR Coding](https://hl7.org/fhir/R5/datatypes.html#Coding)
 */
export class Coding extends DataType implements IBase {
  /**
   * @param system - Identity of the terminology system
   * @param code - Symbol in syntax defined by the system
   * @param display - Representation defined by the system
   * @throws PrimitiveTypeError for invalid primitive types
   */
  constructor(system?: UriType | fhirUri, code?: CodeType | fhirCode, display?: StringType | fhirString) {
    super();
    if (system !== undefined) {
      if (system instanceof UriType) {
        this.system = system;
      } else {
        const parseResult = fhirUriSchema.safeParse(system);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Coding.system (${system})`, parseResult.error);
        }
        this.system = new UriType(parseResult.data);
      }
    }
    if (code !== undefined) {
      if (code instanceof CodeType) {
        this.code = code;
      } else {
        const parseResult = fhirCodeSchema.safeParse(code);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Coding.code (${code})`, parseResult.error);
        }
        this.code = new CodeType(parseResult.data);
      }
    }
    if (display !== undefined) {
      if (display instanceof StringType) {
        this.display = display;
      } else {
        const parseResult = fhirStringSchema.safeParse(display);
        if (!parseResult.success) {
          throw new PrimitiveTypeError(`Invalid Coding.display (${display})`, parseResult.error);
        }
        this.display = new StringType(parseResult.data);
      }
    }
  }

  /**
   * Identity of the terminology system
   *
   * @remarks
   * The URI may be an OID (urn:oid:...) or a UUID (urn:uuid:...). OIDs and UUIDs SHALL be references
   * to the HL7 OID registry. Otherwise, the URI should come from HL7's list of FHIR defined special URIs,
   * or it should reference to some definition that establishes the system clearly and unambiguously.
   */
  protected system?: UriType | undefined;
  /**
   * Version of the system - if relevant
   *
   * @remarks
   * The version of the code system which was used when choosing this code. Note that a well-maintained
   * code system does not need the version reported, because the meaning of codes is consistent across
   * versions. However, this cannot consistently be assured, and when the meaning is not guaranteed to be
   * consistent, the version SHOULD be exchanged.
   */
  protected version?: StringType | undefined;
  /**
   * Symbol in syntax defined by the system
   *
   * @remarks
   * The symbol may be a predefined code or an expression in a syntax defined by the coding system
   * (e.g. post-coordination).
   */
  protected code?: CodeType | undefined;
  /**
   * Representation defined by the system
   *
   * @remarks
   * A representation of the meaning of the code in the system, following the rules of the system.
   * Need to be able to carry a human-readable meaning of the code for readers that do not know the system.
   */
  protected display?: StringType | undefined;
  /**
   * If this coding was chosen directly by the user
   *
   * @remarks
   * Indicates that this coding was chosen by a user directly - e.g. off a pick list of available items
   * (codes or displays).
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
    if (value === undefined) {
      this.system = undefined;
    } else {
      const parseResult = fhirUriSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Coding.system (${value})`, parseResult.error);
      }
      this.system = new UriType(parseResult.data);
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
    if (value === undefined) {
      this.version = undefined;
    } else {
      const parseResult = fhirStringSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Coding.version (${value})`, parseResult.error);
      }
      this.version = new StringType(parseResult.data);
    }
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
    if (value === undefined) {
      this.code = undefined;
    } else {
      const parseResult = fhirCodeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Coding.code (${value})`, parseResult.error);
      }
      this.code = new CodeType(parseResult.data);
    }
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
    if (value === undefined) {
      this.display = undefined;
    } else {
      const parseResult = fhirStringSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Coding.display (${value})`, parseResult.error);
      }
      this.display = new StringType(parseResult.data);
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
    return this.userSelected !== undefined;
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
    if (value === undefined) {
      this.userSelected = undefined;
    } else {
      const parseResult = fhirBooleanSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid Coding.userSelected (${String(value)})`, parseResult.error);
      }
      this.userSelected = new BooleanType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `userSelected` property exists and has a value; `false` otherwise
   */
  public hasUserSelected(): boolean {
    return this.hasUserSelectedElement();
  }

  /**
   * {@inheritDoc Element.fhirType}
   */
  public override fhirType(): string {
    return 'Coding';
  }

  /**
   * {@inheritDoc Element.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.system, this.version, this.code, this.display, this.userSelected);
  }

  /**
   * {@inheritDoc DataType.copy}
   */
  public override copy(): Coding {
    const dest = new Coding();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Element.copyValues}
   */
  public override copyValues(dest: Coding): void {
    super.copyValues(dest);
    dest.system = this.system?.copy();
    dest.version = this.version?.copy();
    dest.code = this.code?.copy();
    dest.display = this.display?.copy();
    dest.userSelected = this.userSelected?.copy();
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
