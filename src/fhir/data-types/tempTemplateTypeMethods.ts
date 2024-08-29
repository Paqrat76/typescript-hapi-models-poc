/* istanbul ignore file */

// TODO: After all complex datatype classes are created, DELETE this file!!

import { BooleanType } from '@src/fhir/data-types/primitive/BooleanType';
import { CanonicalType } from '@src/fhir/data-types/primitive/CanonicalType';
import { CodeType } from '@src/fhir/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir/data-types/primitive/DateTimeType';
import { IdType } from '@src/fhir/data-types/primitive/IdType';
import { InstantType } from '@src/fhir/data-types/primitive/InstantType';
import { StringType } from '@src/fhir/data-types/primitive/StringType';
import { UriType } from '@src/fhir/data-types/primitive/UriType';
import { XhtmlType } from '@src/fhir/data-types/primitive/XhtmlType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCanonical,
  fhirCanonicalSchema,
  fhirCode,
  fhirCodeSchema,
  fhirDateTime,
  fhirDateTimeSchema,
  fhirId,
  fhirIdSchema,
  fhirInstant,
  fhirInstantSchema,
  fhirString,
  fhirStringSchema,
  fhirUri,
  fhirUriSchema,
  fhirXhtml,
  fhirXhtmlSchema,
} from '@src/fhir/data-types/primitive/primitive-types';
import { PrimitiveTypeError } from '@src/fhir/errors/PrimitiveTypeError';

export class TempTemplateTypeMethods {
  // =====================================================================
  // XxxClass / BooleanType (xxxxBoolean / XxxxBoolean)
  // =====================================================================
  protected xxxxBoolean?: BooleanType | undefined;

  /**
   * @returns the `xxxxBoolean` property value as a PrimitiveType
   */
  public getXxxxBooleanElement(): BooleanType | undefined {
    return this.xxxxBoolean;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxBoolean` property.
   *
   * @param element - the `xxxxBoolean` value
   * @returns this
   */
  public setXxxxBooleanElement(element: BooleanType | undefined): this {
    this.xxxxBoolean = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxBoolean` property exists and has a value; `false` otherwise
   */
  public hasXxxxBooleanElement(): boolean {
    return this.xxxxBoolean !== undefined;
  }

  /**
   * @returns the `xxxxBoolean` property value as a primitive value
   */
  public getXxxxBoolean(): fhirBoolean | undefined {
    return this.xxxxBoolean?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxBoolean` property.
   *
   * @param value - the `xxxxBoolean` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxBoolean(value: fhirBoolean | undefined): this {
    if (value === undefined) {
      this.xxxxBoolean = undefined;
    } else {
      const parseResult = fhirBooleanSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxBoolean (${String(value)})`, parseResult.error);
      }
      this.xxxxBoolean = new BooleanType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxBoolean` property exists and has a value; `false` otherwise
   */
  public hasXxxxBoolean(): boolean {
    return this.hasXxxxBooleanElement();
  }

  // =====================================================================
  // XxxClass / Canonical (xxxxCanonical / XxxxCanonical)
  // =====================================================================
  protected xxxxCanonical?: CanonicalType | undefined;

  /**
   * @returns the `xxxxCanonical` property value as a PrimitiveType
   */
  public getXxxxCanonicalElement(): CanonicalType | undefined {
    return this.xxxxCanonical;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxCanonical` property.
   *
   * @param element - the `xxxxCanonical` value
   * @returns this
   */
  public setXxxxCanonicalElement(element: CanonicalType | undefined): this {
    this.xxxxCanonical = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxCanonical` property exists and has a value; `false` otherwise
   */
  public hasXxxxCanonicalElement(): boolean {
    return this.xxxxCanonical !== undefined && !this.xxxxCanonical.isEmpty();
  }

  /**
   * @returns the `xxxxCanonical` property value as a primitive value
   */
  public getXxxxCanonical(): fhirCanonical | undefined {
    return this.xxxxCanonical?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxCanonical` property.
   *
   * @param value - the `xxxxCanonical` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxCanonical(value: fhirCanonical | undefined): this {
    if (value === undefined) {
      this.xxxxCanonical = undefined;
    } else {
      const parseResult = fhirCanonicalSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxCanonical (${value})`, parseResult.error);
      }
      this.xxxxCanonical = new CanonicalType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxCanonical` property exists and has a value; `false` otherwise
   */
  public hasXxxxCanonical(): boolean {
    return this.hasXxxxCanonicalElement();
  }

  // =====================================================================
  // XxxClass / CodeType (xxxxCode / XxxxCode)
  // =====================================================================
  protected xxxxCode?: CodeType | undefined;

  /**
   * @returns the `xxxxCode` property value as a PrimitiveType
   */
  public getXxxxCodeElement(): CodeType | undefined {
    return this.xxxxCode;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxCode` property.
   *
   * @param element - the `xxxxCode` value
   * @returns this
   */
  public setXxxxCodeElement(element: CodeType | undefined): this {
    this.xxxxCode = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxCode` property exists and has a value; `false` otherwise
   */
  public hasXxxxCodeElement(): boolean {
    return this.xxxxCode !== undefined && !this.xxxxCode.isEmpty();
  }

  /**
   * @returns the `xxxxCode` property value as a primitive value
   */
  public getXxxxCode(): fhirCode | undefined {
    return this.xxxxCode?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxCode` property.
   *
   * @param value - the `xxxxCode` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxCode(value: fhirCode | undefined): this {
    if (value === undefined) {
      this.xxxxCode = undefined;
    } else {
      const parseResult = fhirCodeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxCode (${value})`, parseResult.error);
      }
      this.xxxxCode = new CodeType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxCode` property exists and has a value; `false` otherwise
   */
  public hasXxxxCode(): boolean {
    return this.hasXxxxCodeElement();
  }

  // =====================================================================
  // XxxClass / DateTimeType (xxxxDataTime / XxxxDataTime)
  // =====================================================================
  protected xxxxDataTime?: DateTimeType | undefined;

  /**
   * @returns the `xxxxDataTime` property value as a PrimitiveType
   */
  public getXxxxDataTimeElement(): DateTimeType | undefined {
    return this.xxxxDataTime;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxDataTime` property.
   *
   * @param element - the `xxxxDataTime` value
   * @returns this
   */
  public setXxxxDataTimeElement(element: DateTimeType | undefined): this {
    this.xxxxDataTime = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxDataTime` property exists and has a value; `false` otherwise
   */
  public hasXxxxDataTimeElement(): boolean {
    return this.xxxxDataTime !== undefined && !this.xxxxDataTime.isEmpty();
  }

  /**
   * @returns the `xxxxDataTime` property value as a primitive value
   */
  public getXxxxDataTime(): fhirDateTime | undefined {
    return this.xxxxDataTime?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxDataTime` property.
   *
   * @param value - the `xxxxDataTime` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxDataTime(value: fhirDateTime | undefined): this {
    if (value === undefined) {
      this.xxxxDataTime = undefined;
    } else {
      const parseResult = fhirDateTimeSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxDataTime (${value})`, parseResult.error);
      }
      this.xxxxDataTime = new DateTimeType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxDataTime` property exists and has a value; `false` otherwise
   */
  public hasXxxxDataTime(): boolean {
    return this.hasXxxxDataTimeElement();
  }

  // =====================================================================
  // XxxClass / IdType (xxxxId / XxxxId)
  // =====================================================================
  protected xxxxId?: IdType | undefined;

  /**
   * @returns the `xxxxId` property value as a PrimitiveType
   */
  public getXxxxIdElement(): IdType | undefined {
    return this.xxxxId;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxId` property.
   *
   * @param element - the `xxxxId` value
   * @returns this
   */
  public setXxxxIdElement(element: IdType | undefined): this {
    this.xxxxId = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxId` property exists and has a value; `false` otherwise
   */
  public hasXxxxIdElement(): boolean {
    return this.xxxxId !== undefined && !this.xxxxId.isEmpty();
  }

  /**
   * @returns the `xxxxId` property value as a primitive value
   */
  public getXxxxId(): fhirId | undefined {
    return this.xxxxId?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxId` property.
   *
   * @param value - the `xxxxId` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxId(value: fhirId | undefined): this {
    if (value === undefined) {
      this.xxxxId = undefined;
    } else {
      const parseResult = fhirIdSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxId (${value})`, parseResult.error);
      }
      this.xxxxId = new IdType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxId` property exists and has a value; `false` otherwise
   */
  public hasXxxxId(): boolean {
    return this.hasXxxxIdElement();
  }

  // =====================================================================
  // XxxClass / InstantType (xxxxInstant / XxxxInstant)
  // =====================================================================
  protected xxxxInstant?: InstantType | undefined;

  /**
   * @returns the `xxxxInstant` property value as a PrimitiveType
   */
  public getXxxxInstantElement(): InstantType | undefined {
    return this.xxxxInstant;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxInstant` property.
   *
   * @param element - the `xxxxInstant` value
   * @returns this
   */
  public setXxxxInstantElement(element: InstantType | undefined): this {
    this.xxxxInstant = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxInstant` property exists and has a value; `false` otherwise
   */
  public hasXxxxInstantElement(): boolean {
    return this.xxxxInstant !== undefined && !this.xxxxInstant.isEmpty();
  }

  /**
   * @returns the `xxxxInstant` property value as a primitive value
   */
  public getXxxxInstant(): fhirInstant | undefined {
    return this.xxxxInstant?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxInstant` property.
   *
   * @param value - the `xxxxInstant` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxInstant(value: fhirInstant | undefined): this {
    if (value === undefined) {
      this.xxxxInstant = undefined;
    } else {
      const parseResult = fhirInstantSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxInstant (${value})`, parseResult.error);
      }
      this.xxxxInstant = new InstantType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxInstant` property exists and has a value; `false` otherwise
   */
  public hasXxxxInstant(): boolean {
    return this.hasXxxxInstantElement();
  }

  // =====================================================================
  // XxxClass / StringType (xxxxString / XxxxString)
  // =====================================================================
  protected xxxxString?: StringType | undefined;

  /**
   * @returns the `xxxxString` property value as a PrimitiveType
   */
  public getXxxxStringElement(): StringType | undefined {
    return this.xxxxString;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxString` property.
   *
   * @param element - the `xxxxString` value
   * @returns this
   */
  public setXxxxStringElement(element: StringType | undefined): this {
    this.xxxxString = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxString` property exists and has a value; `false` otherwise
   */
  public hasXxxxStringElement(): boolean {
    return this.xxxxString !== undefined && !this.xxxxString.isEmpty();
  }

  /**
   * @returns the `xxxxString` property value as a primitive value
   */
  public getXxxxString(): fhirString | undefined {
    return this.xxxxString?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxString` property.
   *
   * @param value - the `xxxxString` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxString(value: fhirString | undefined): this {
    if (value === undefined) {
      this.xxxxString = undefined;
    } else {
      const parseResult = fhirStringSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxString (${value})`, parseResult.error);
      }
      this.xxxxString = new StringType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxString` property exists and has a value; `false` otherwise
   */
  public hasXxxxString(): boolean {
    return this.hasXxxxStringElement();
  }

  // =====================================================================
  // XxxClass / UriType (xxxxUri / XxxxUri)
  // =====================================================================
  protected xxxxUri?: UriType | undefined;

  /**
   * @returns the `xxxxUri` property value as a PrimitiveType
   */
  public getXxxxUriElement(): UriType | undefined {
    return this.xxxxUri;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxUri` property.
   *
   * @param element - the `xxxxUri` value
   * @returns this
   */
  public setXxxxUriElement(element: UriType | undefined): this {
    this.xxxxUri = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxUri` property exists and has a value; `false` otherwise
   */
  public hasXxxxUriElement(): boolean {
    return this.xxxxUri !== undefined && !this.xxxxUri.isEmpty();
  }

  /**
   * @returns the `xxxxUri` property value as a primitive value
   */
  public getXxxxUri(): fhirUri | undefined {
    return this.xxxxUri?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxUri` property.
   *
   * @param value - the `xxxxUri` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxUri(value: fhirUri | undefined): this {
    if (value === undefined) {
      this.xxxxUri = undefined;
    } else {
      const parseResult = fhirUriSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxUri (${value})`, parseResult.error);
      }
      this.xxxxUri = new UriType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxUri` property exists and has a value; `false` otherwise
   */
  public hasXxxxUri(): boolean {
    return this.hasXxxxUriElement();
  }

  // =====================================================================
  // XxxClass / XhtmlType (xxxxXhtml / XxxxXhtml)
  // =====================================================================
  protected xxxxXhtml?: XhtmlType | undefined;

  /**
   * @returns the `xxxxXhtml` property value as a PrimitiveType
   */
  public getXxxxXhtmlElement(): XhtmlType | undefined {
    return this.xxxxXhtml;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxXhtml` property.
   *
   * @param element - the `xxxxXhtml` value
   * @returns this
   */
  public setXxxxXhtmlElement(element: XhtmlType | undefined): this {
    this.xxxxXhtml = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxXhtml` property exists and has a value; `false` otherwise
   */
  public hasXxxxXhtmlElement(): boolean {
    return this.xxxxXhtml !== undefined && !this.xxxxXhtml.isEmpty();
  }

  /**
   * @returns the `xxxxXhtml` property value as a primitive value
   */
  public getXxxxXhtml(): fhirXhtml | undefined {
    return this.xxxxXhtml?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxXhtml` property.
   *
   * @param value - the `xxxxXhtml` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxXhtml(value: fhirXhtml | undefined): this {
    if (value === undefined) {
      this.xxxxXhtml = undefined;
    } else {
      const parseResult = fhirXhtmlSchema.safeParse(value);
      if (!parseResult.success) {
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxXhtml (${value})`, parseResult.error);
      }
      this.xxxxXhtml = new XhtmlType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxXhtml` property exists and has a value; `false` otherwise
   */
  public hasXxxxXhtml(): boolean {
    return this.hasXxxxXhtmlElement();
  }
}
