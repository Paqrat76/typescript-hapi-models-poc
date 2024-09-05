/* istanbul ignore file */

// TODO: After all complex datatype classes are created, DELETE this file!!

import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { Coding } from '@src/fhir-core/data-types/complex/Coding';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCanonical,
  fhirCanonicalSchema,
  fhirCode,
  fhirCodeSchema,
  fhirDateTime,
  fhirDateTimeSchema,
  fhirDecimal,
  fhirDecimalSchema,
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
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';

//region EnumCodeType
// import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
// import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
// import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';

// =====================================================================
// XxxxEnum / EnumCodeType (XxxxCS / xxxx-code-system)
// =====================================================================

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: XxxxEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem XxxxCS](https://hl7.org/fhir/R4/xxxx-code-system.html)
 */
export class XxxxEnum implements IFhirCodeEnum {
  public static readonly DUMMY = new FhirCodeDefinition(
    'DUMMY',
    `dummy`,
    `http://hl7.org/fhir/dummy-code-system`,
    `Dummy`,
    `Definition...`,
  );
  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [XxxxEnum.DUMMY, XxxxEnum.NULL];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (XxxxEnum.DUMMY.code === code) {
      return XxxxEnum.DUMMY;
    } else if (XxxxEnum.NULL.code === code) {
      return XxxxEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown XxxxEnum 'code' value '${code}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
//endregion

export class TempTemplateTypeMethods {
  //region BooleanType
  // =====================================================================
  // XxxClass / BooleanType (xxxxBoolean / XxxxBoolean)
  // =====================================================================
  protected xxxxBoolean?: BooleanType | undefined;

  /**
   * @returns the `xxxxBoolean` property value as a PrimitiveType
   */
  public getXxxxBooleanElement(): BooleanType {
    return this.xxxxBoolean ?? new BooleanType();
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
  //endregion

  //region CanonicalType
  // =====================================================================
  // XxxClass / Canonical (xxxxCanonical / XxxxCanonical)
  // =====================================================================
  protected xxxxCanonical?: CanonicalType | undefined;

  /**
   * @returns the `xxxxCanonical` property value as a PrimitiveType
   */
  public getXxxxCanonicalElement(): CanonicalType {
    return this.xxxxCanonical ?? new CanonicalType();
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
  //endregion

  //region CodeType
  // =====================================================================
  // XxxClass / CodeType (xxxxCode / XxxxCode)
  // =====================================================================
  protected xxxxCode?: CodeType | undefined;

  /**
   * @returns the `xxxxCode` property value as a PrimitiveType
   */
  public getXxxxCodeElement(): CodeType {
    return this.xxxxCode ?? new CodeType();
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
  //endregion

  //region EnumCodeType
  // =====================================================================
  // EnumCodeType (xxxEnum // xxxxValue / XxxxValue)
  // =====================================================================
  private readonly xxxEnum: XxxxEnum = new XxxxEnum(); //code system Enum class initialized in constructor
  protected xxxxValue?: EnumCodeType | undefined;

  /**
   * @returns the `xxxxValue` property value as a EnumCodeType
   */
  public getXxxxValueEnumType(): EnumCodeType | undefined {
    return this.xxxxValue;
  }

  /**
   * Assigns the provided EnumCodeType value to the `xxxxValue` property.
   *
   * @param enumType - the `xxxxValue` value
   * @returns this
   */
  public setXxxxValueEnumType(enumType: EnumCodeType | undefined): this {
    if (enumType === undefined) {
      return this;
    }
    this.xxxxValue = enumType;
    return this;
  }

  /**
   * @returns `true` if the `xxxxValue` property exists and has a value; `false` otherwise
   */
  public hasXxxxValueEnumType(): boolean {
    return this.xxxxValue !== undefined && !this.xxxxValue.isEmpty() && this.xxxxValue.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `xxxxValue` property value as a PrimitiveType
   */
  public getXxxxValueElement(): CodeType | undefined {
    if (this.xxxxValue === undefined) {
      return undefined;
    }
    return this.xxxxValue as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxValue` property.
   *
   * @param element - the `xxxxValue` value
   * @returns this
   */
  public setXxxxValueElement(element: CodeType | undefined): this {
    if (element === undefined) {
      return this;
    }
    this.xxxxValue = new EnumCodeType(element, this.xxxEnum);
    return this;
  }

  /**
   * @returns `true` if the `xxxxValue` property exists and has a value; `false` otherwise
   */
  public hasXxxxValueElement(): boolean {
    return this.hasXxxxValueEnumType();
  }

  /**
   * @returns the `xxxxValue` property value as a primitive value
   */
  public getXxxxValue(): fhirCode | undefined {
    if (this.xxxxValue === undefined) {
      return undefined;
    }
    return this.xxxxValue.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `xxxxValue` property.
   *
   * @param value - the `xxxxValue` value
   * @returns this
   */
  public setXxxxValue(value: fhirCode | undefined): this {
    if (value === undefined) {
      return this;
    }
    this.xxxxValue = new EnumCodeType(value, this.xxxEnum);
    return this;
  }

  /**
   * @returns `true` if the `xxxxValue` property exists and has a value; `false` otherwise
   */
  public hasXxxxValue(): boolean {
    return this.hasXxxxValueEnumType();
  }
  //endregion

  //region DateTimeType
  // =====================================================================
  // XxxClass / DateTimeType (xxxxDataTime / XxxxDataTime)
  // =====================================================================
  protected xxxxDataTime?: DateTimeType | undefined;

  /**
   * @returns the `xxxxDataTime` property value as a PrimitiveType
   */
  public getXxxxDataTimeElement(): DateTimeType {
    return this.xxxxDataTime ?? new DateTimeType();
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
  //endregion

  //region DecimalType
  // =====================================================================
  // XxxClass / DecimalType (xxxxDecimal / XxxxDecimal)
  // =====================================================================
  protected xxxxDecimal?: DecimalType | undefined;

  /**
   * @returns the `xxxxDecimal` property value as a PrimitiveType
   */
  public getXxxxDecimalElement(): DecimalType {
    return this.xxxxDecimal ?? new DecimalType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxDecimal` property.
   *
   * @param element - the `xxxxDecimal` value
   * @returns this
   */
  public setXxxxDecimalElement(element: DecimalType | undefined): this {
    this.xxxxDecimal = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxDecimal` property exists and has a value; `false` otherwise
   */
  public hasXxxxDecimalElement(): boolean {
    return this.xxxxDecimal !== undefined && !this.xxxxDecimal.isEmpty();
  }

  /**
   * @returns the `xxxxDecimal` property value as a primitive value
   */
  public getXxxxDecimal(): fhirDecimal | undefined {
    return this.xxxxDecimal?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxDecimal` property.
   *
   * @param value - the `xxxxDecimal` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxDecimal(value: fhirDecimal | undefined): this {
    if (value === undefined) {
      this.xxxxDecimal = undefined;
    } else {
      const parseResult = fhirDecimalSchema.safeParse(value);
      if (!parseResult.success) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        throw new PrimitiveTypeError(`Invalid XxxClass.xxxxDecimal (${value})`, parseResult.error);
      }
      this.xxxxDecimal = new DecimalType(parseResult.data);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxDecimal` property exists and has a value; `false` otherwise
   */
  public hasXxxxDecimal(): boolean {
    return this.hasXxxxDecimalElement();
  }
  //endregion

  //region IdType
  // =====================================================================
  // XxxClass / IdType (xxxxId / XxxxId)
  // =====================================================================
  protected xxxxId?: IdType | undefined;

  /**
   * @returns the `xxxxId` property value as a PrimitiveType
   */
  public getXxxxIdElement(): IdType {
    return this.xxxxId ?? new IdType();
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
  //endregion

  //region InstantType
  // =====================================================================
  // XxxClass / InstantType (xxxxInstant / XxxxInstant)
  // =====================================================================
  protected xxxxInstant?: InstantType | undefined;

  /**
   * @returns the `xxxxInstant` property value as a PrimitiveType
   */
  public getXxxxInstantElement(): InstantType {
    return this.xxxxInstant ?? new InstantType();
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
  //endregion

  //region StringType
  // =====================================================================
  // XxxClass / StringType (xxxxString / XxxxString)
  // =====================================================================
  protected xxxxString?: StringType | undefined;

  /**
   * @returns the `xxxxString` property value as a PrimitiveType
   */
  public getXxxxStringElement(): StringType {
    return this.xxxxString ?? new StringType();
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
  //endregion

  //region UriType
  // =====================================================================
  // XxxClass / UriType (xxxxUri / XxxxUri)
  // =====================================================================
  protected xxxxUri?: UriType | undefined;

  /**
   * @returns the `xxxxUri` property value as a PrimitiveType
   */
  public getXxxxUriElement(): UriType {
    return this.xxxxUri ?? new UriType();
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
  //endregion

  //region XhtmlType
  // =====================================================================
  // XxxClass / XhtmlType (xxxxXhtml / XxxxXhtml)
  // =====================================================================
  protected xxxxXhtml?: XhtmlType | undefined;

  /**
   * @returns the `xxxxXhtml` property value as a PrimitiveType
   */
  public getXxxxXhtmlElement(): XhtmlType {
    return this.xxxxXhtml ?? new XhtmlType();
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
  //endregion

  //region Model
  // =====================================================================
  // Complex Model 0..1 / Coding (xxxxModel / XxxxModel)
  // =====================================================================
  protected xxxxModel?: Coding | undefined;

  /**
   * @returns the `xxxxModel` property value as a Coding object
   */
  public getXxxxModel(): Coding {
    return this.xxxxModel ?? new Coding();
  }

  /**
   * Assigns the provided Coding object value to the `xxxxModel` property.
   *
   * @param value - the `xxxxModel` object value
   * @returns this
   */
  public setXxxxModel(value: Coding | undefined): this {
    this.xxxxModel = value;
    return this;
  }

  /**
   * @returns `true` if the `xxxxModel` property exists and has a value; `false` otherwise
   */
  public hasXxxxModel(): boolean {
    return this.xxxxModel !== undefined && !this.xxxxModel.isEmpty();
  }
  //endregion

  //region Model Array
  // =====================================================================
  // Complex Model 0..* / Coding[] (xxxxModelArray / XxxxModelArray)
  // =====================================================================
  protected xxxxModelArray?: Coding[] | undefined;

  /**
   * @returns the `xxxxModelArray` property value as a Coding array
   */
  public getXxxxModelArray(): Coding[] {
    return this.xxxxModelArray ?? ([] as Coding[]);
  }

  /**
   * Assigns the provided Coding array value to the `xxxxModelArray` property.
   *
   * @param value - the `xxxxModelArray` array value
   * @returns this
   */
  public setXxxxModelArray(value: Coding[] | undefined): this {
    this.xxxxModelArray = value;
    return this;
  }

  /**
   * Add the provided Coding value to the `xxxxModelArray` array property.
   *
   * @param value - the `xxxxModelArray` value
   * @returns this
   */
  public addXxxxModelArray(value?: Coding): this {
    if (value === undefined) {
      return this;
    }
    this.initXxxxModelArray();
    this.xxxxModelArray?.push(value);
    return this;
  }

  /**
   * @returns `true` if the `xxxxModelArray` property exists and has a value; `false` otherwise
   */
  public hasXxxxModelArray(): boolean {
    return (
      this.xxxxModelArray !== undefined &&
      this.xxxxModelArray.length > 0 &&
      this.xxxxModelArray.some((item: Coding) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `xxxxModelArray` property
   *
   * @private
   */
  private initXxxxModelArray(): void {
    if (this.xxxxModelArray === undefined) {
      this.xxxxModelArray = [] as Coding[];
    }
  }
  //endregion
}
