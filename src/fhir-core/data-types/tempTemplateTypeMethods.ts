/* istanbul ignore file */

// TODO: After all complex datatype classes are created, convert this file to template documentation!

import { isNil } from 'lodash';
import { Base } from '@src/fhir-core/base-models/Base';
import { Value } from '@src/fhir-core/utility/json-helpers';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CanonicalType } from '@src/fhir-core/data-types/primitive/CanonicalType';
import { assertEnumCodeType, CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { DecimalType } from '@src/fhir-core/data-types/primitive/DecimalType';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { InstantType } from '@src/fhir-core/data-types/primitive/InstantType';
import { PositiveIntType } from '@src/fhir-core/data-types/primitive/PositiveIntType';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import { UriType } from '@src/fhir-core/data-types/primitive/UriType';
import { XhtmlType } from '@src/fhir-core/data-types/primitive/XhtmlType';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
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
  fhirPositiveInt,
  fhirPositiveIntSchema,
  fhirString,
  fhirStringSchema,
  fhirUnsignedInt,
  fhirUnsignedIntSchema,
  fhirUri,
  fhirUriSchema,
  fhirXhtml,
  fhirXhtmlSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { assertFhirType, assertFhirTypeList } from '@src/fhir-core/utility/type-guards';
import { GroupTypeEnum } from '@src/fhir-models/code-systems/GroupTypeEnum';

//region FhirCodeEnum
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
      throw new InvalidCodeError(`Unknown XxxxEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
//endregion

export class TempTemplateTypeMethods {
  //region BooleanType - Optional
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
    const optErrMsg = `Invalid XxxClass.xxxxBoolean; Provided element is not an instance of BooleanType.`;
    assertFhirType<BooleanType>(element, BooleanType, optErrMsg);
    this.xxxxBoolean = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxBoolean` property exists and has a value; `false` otherwise
   */
  public hasXxxxBooleanElement(): boolean {
    return this.xxxxBoolean !== undefined && !this.xxxxBoolean.isEmpty();
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
    const optErrMsg = `Invalid XxxClass.xxxxBoolean (${String(value)}))`;
    this.xxxxBoolean =
      value === undefined ? undefined : new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxBoolean` property exists and has a value; `false` otherwise
   */
  public hasXxxxBoolean(): boolean {
    return this.hasXxxxBooleanElement();
  }
  //endregion

  //region BooleanType - Required
  // =====================================================================
  // XxxClass / BooleanType (xxxxBooleanReq / XxxxBooleanReq)
  // =====================================================================
  protected xxxxBooleanReq: BooleanType | null = null;

  /**
   * @returns the `xxxxBooleanReq` property value as a PrimitiveType
   */
  public getXxxxBooleanReqElement(): BooleanType | null {
    return this.xxxxBooleanReq;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxBooleanReq` property.
   *
   * @param element - the `xxxxBooleanReq` value
   * @returns this
   */
  public setXxxxBooleanReqElement(element: BooleanType): this {
    if (!isNil(element)) {
      const optErrMsg = `Invalid XxxClass.xxxxBoolean; Provided element is not an instance of BooleanType.`;
      assertFhirType<BooleanType>(element, BooleanType, optErrMsg);
      this.xxxxBooleanReq = element;
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxBooleanReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxBooleanReqElement(): boolean {
    return !isNil(this.xxxxBooleanReq) && !this.xxxxBooleanReq.isEmpty();
  }

  /**
   * @returns the `xxxxBooleanReq` property value as a primitive value
   */
  public getXxxxBooleanReq(): fhirBoolean | null {
    if (this.xxxxBooleanReq?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.xxxxBooleanReq.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `xxxxBooleanReq` property.
   *
   * @param value - the `xxxxBooleanReq` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxBooleanReq(value: fhirBoolean): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid XxxClass.xxxxBooleanReq (${String(value)})`;
      this.xxxxBooleanReq = new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxBooleanReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxBooleanReq(): boolean {
    return this.hasXxxxBooleanReqElement();
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
    const optErrMsg = `Invalid XxxClass.xxxxCanonical; Provided element is not an instance of CanonicalType.`;
    assertFhirType<CanonicalType>(element, CanonicalType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxCanonical (${String(value)})`;
    this.xxxxCanonical =
      value === undefined
        ? undefined
        : new CanonicalType(parseFhirPrimitiveData(value, fhirCanonicalSchema, optErrMsg));
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
    const optErrMsg = `Invalid XxxClass.xxxxCode; Provided element is not an instance of CodeType.`;
    assertFhirType<CodeType>(element, CodeType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxCode (${String(value)})`;
    this.xxxxCode =
      value === undefined ? undefined : new CodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxCode` property exists and has a value; `false` otherwise
   */
  public hasXxxxCode(): boolean {
    return this.hasXxxxCodeElement();
  }
  //endregion

  //region EnumCodeType - Optional
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
    const errMsgPrefix = 'EnumCodeType.xxxxValue';
    assertEnumCodeType<GroupTypeEnum>(enumType, GroupTypeEnum, errMsgPrefix);
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
      this.xxxxValue = undefined;
      return this;
    }
    const optErrMsg = `Invalid XxxClass.xxxxValue; Provided element is not an instance of CodeType.`;
    assertFhirType<CodeType>(element, CodeType, optErrMsg);
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
      this.xxxxValue = undefined;
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

  //region EnumCodeType - Required
  // =====================================================================
  // EnumCodeType (xxxEnumReq // xxxxValueReq / XxxxValueReqReq)
  // =====================================================================
  private readonly xxxEnumReq: XxxxEnum = new XxxxEnum(); //code system Enum class initialized in constructor
  protected xxxxValueReq: EnumCodeType | null = null;

  /**
   * @returns the `xxxxValueReq` property value as a EnumCodeType
   */
  public getXxxxValueReqEnumType(): EnumCodeType | null {
    return this.xxxxValueReq;
  }

  /**
   * Assigns the provided EnumCodeType value to the `xxxxValueReq` property.
   *
   * @param enumType - the `xxxxValueReq` value
   * @returns this
   */
  public setXxxxValueReqEnumType(enumType: EnumCodeType): this {
    if (!isNil(enumType)) {
      const errMsgPrefix = 'EnumCodeType.xxxxValueReq';
      assertEnumCodeType<GroupTypeEnum>(enumType, GroupTypeEnum, errMsgPrefix);
      this.xxxxValueReq = enumType;
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxValueReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxValueReqEnumType(): boolean {
    return (
      !isNil(this.xxxxValueReq) && !this.xxxxValueReq.isEmpty() && this.xxxxValueReq.fhirCodeEnumeration.length > 0
    );
  }

  /**
   * @returns the `xxxxValueReq` property value as a PrimitiveType
   */
  public getXxxxValueReqElement(): CodeType | null {
    if (this.xxxxValueReq === null) {
      return null;
    }
    return this.xxxxValueReq as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxValueReq` property.
   *
   * @param element - the `xxxxValueReq` value
   * @returns this
   */
  public setXxxxValueReqElement(element: CodeType): this {
    if (!isNil(element)) {
      const optErrMsg = `Invalid XxxClass.xxxxValueReq; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.xxxxValueReq = new EnumCodeType(element, this.xxxEnumReq);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxValueReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxValueReqElement(): boolean {
    return this.hasXxxxValueReqEnumType();
  }

  /**
   * @returns the `xxxxValueReq` property value as a primitive value
   */
  public getXxxxValueReq(): fhirCode | null {
    if (this.xxxxValueReq === null) {
      return null;
    }
    return this.xxxxValueReq.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `xxxxValueReq` property.
   *
   * @param value - the `xxxxValueReq` value
   * @returns this
   */
  public setXxxxValueReq(value: fhirCode): this {
    if (!isNil(value)) {
      this.xxxxValueReq = new EnumCodeType(value, this.xxxEnumReq);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxValueReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxValueReq(): boolean {
    return this.hasXxxxValueReqEnumType();
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
    const optErrMsg = `Invalid XxxClass.xxxxDataTime; Provided element is not an instance of DateTimeType.`;
    assertFhirType<DateTimeType>(element, DateTimeType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxDataTime (${String(value)})`;
    this.xxxxDataTime =
      value === undefined ? undefined : new DateTimeType(parseFhirPrimitiveData(value, fhirDateTimeSchema, optErrMsg));
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
    const optErrMsg = `Invalid XxxClass.xxxxDecimal; Provided element is not an instance of DecimalType.`;
    assertFhirType<DecimalType>(element, DecimalType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxDecimal (${String(value)})`;
    this.xxxxDecimal =
      value === undefined ? undefined : new DecimalType(parseFhirPrimitiveData(value, fhirDecimalSchema, optErrMsg));
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
    const optErrMsg = `Invalid XxxClass.xxxxId; Provided element is not an instance of IdType.`;
    assertFhirType<IdType>(element, IdType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxId (${String(value)})`;
    this.xxxxId = value === undefined ? undefined : new IdType(parseFhirPrimitiveData(value, fhirIdSchema, optErrMsg));
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
    const optErrMsg = `Invalid XxxClass.xxxxInstant; Provided element is not an instance of InstantType.`;
    assertFhirType<InstantType>(element, InstantType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxInstant (${String(value)})`;
    this.xxxxInstant =
      value === undefined ? undefined : new InstantType(parseFhirPrimitiveData(value, fhirInstantSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxInstant` property exists and has a value; `false` otherwise
   */
  public hasXxxxInstant(): boolean {
    return this.hasXxxxInstantElement();
  }
  //endregion

  //region PositiveIntType
  // =====================================================================
  // XxxClass / PositiveIntType (xxxxPositiveInt / XxxxPositiveInt)
  // =====================================================================
  protected xxxxPositiveInt?: PositiveIntType | undefined;

  /**
   * @returns the `xxxxPositiveInt` property value as a PrimitiveType
   */
  public getXxxxPositiveIntElement(): PositiveIntType {
    return this.xxxxPositiveInt ?? new PositiveIntType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxPositiveInt` property.
   *
   * @param element - the `xxxxPositiveInt` value
   * @returns this
   */
  public setXxxxPositiveIntElement(element: PositiveIntType | undefined): this {
    this.xxxxPositiveInt = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxPositiveInt` property exists and has a value; `false` otherwise
   */
  public hasXxxxPositiveIntElement(): boolean {
    return this.xxxxPositiveInt !== undefined && !this.xxxxPositiveInt.isEmpty();
  }

  /**
   * @returns the `xxxxPositiveInt` property value as a primitive value
   */
  public getXxxxPositiveInt(): fhirPositiveInt | undefined {
    return this.xxxxPositiveInt?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxPositiveInt` property.
   *
   * @param value - the `xxxxPositiveInt` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxPositiveInt(value: fhirPositiveInt | undefined): this {
    const optErrMsg = `Invalid XxxClass.xxxxPositiveInt (${String(value)})`;
    this.xxxxPositiveInt =
      value === undefined
        ? undefined
        : new PositiveIntType(parseFhirPrimitiveData(value, fhirPositiveIntSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxPositiveInt` property exists and has a value; `false` otherwise
   */
  public hasXxxxPositiveInt(): boolean {
    return this.hasXxxxPositiveIntElement();
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
    const optErrMsg = `Invalid XxxClass.xxxxString; Provided element is not an instance of StringType.`;
    assertFhirType<StringType>(element, StringType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxString`;
    this.xxxxString =
      value === undefined ? undefined : new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxString` property exists and has a value; `false` otherwise
   */
  public hasXxxxString(): boolean {
    return this.hasXxxxStringElement();
  }
  //endregion

  //region UnsignedIntType
  // =====================================================================
  // XxxClass / UnsignedIntType (xxxxUnsignedInt / XxxxUnsignedInt)
  // =====================================================================
  protected xxxxUnsignedInt?: UnsignedIntType | undefined;

  /**
   * @returns the `xxxxUnsignedInt` property value as a PrimitiveType
   */
  public getXxxxUnsignedIntElement(): UnsignedIntType {
    return this.xxxxUnsignedInt ?? new UnsignedIntType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxUnsignedInt` property.
   *
   * @param element - the `xxxxUnsignedInt` value
   * @returns this
   */
  public setXxxxUnsignedIntElement(element: UnsignedIntType | undefined): this {
    this.xxxxUnsignedInt = element;
    return this;
  }

  /**
   * @returns `true` if the `xxxxUnsignedInt` property exists and has a value; `false` otherwise
   */
  public hasXxxxUnsignedIntElement(): boolean {
    return this.xxxxUnsignedInt !== undefined && !this.xxxxUnsignedInt.isEmpty();
  }

  /**
   * @returns the `xxxxUnsignedInt` property value as a primitive value
   */
  public getXxxxUnsignedInt(): fhirUnsignedInt | undefined {
    return this.xxxxUnsignedInt?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `xxxxUnsignedInt` property.
   *
   * @param value - the `xxxxUnsignedInt` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxUnsignedInt(value: fhirUnsignedInt | undefined): this {
    const optErrMsg = `Invalid XxxClass.xxxxUnsignedInt (${String(value)})`;
    this.xxxxUnsignedInt =
      value === undefined
        ? undefined
        : new UnsignedIntType(parseFhirPrimitiveData(value, fhirUnsignedIntSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxUnsignedInt` property exists and has a value; `false` otherwise
   */
  public hasXxxxUnsignedInt(): boolean {
    return this.hasXxxxUnsignedIntElement();
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
    const optErrMsg = `Invalid XxxClass.xxxxUri; Provided element is not an instance of UriType.`;
    assertFhirType<UriType>(element, UriType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxUri (${String(value)})`;
    this.xxxxUri =
      value === undefined ? undefined : new UriType(parseFhirPrimitiveData(value, fhirUriSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxUri` property exists and has a value; `false` otherwise
   */
  public hasXxxxUri(): boolean {
    return this.hasXxxxUriElement();
  }
  //endregion

  //region XhtmlType - Optional
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
    const optErrMsg = `Invalid XxxClass.xxxxXhtml; Provided element is not an instance of XhtmlType.`;
    assertFhirType<XhtmlType>(element, XhtmlType, optErrMsg);
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
    const optErrMsg = `Invalid XxxClass.xxxxXhtml`;
    this.xxxxXhtml =
      value === undefined ? undefined : new XhtmlType(parseFhirPrimitiveData(value, fhirXhtmlSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `xxxxXhtml` property exists and has a value; `false` otherwise
   */
  public hasXxxxXhtml(): boolean {
    return this.hasXxxxXhtmlElement();
  }
  //endregion

  //region XhtmlType - Required
  // =====================================================================
  // XxxClass / XhtmlType (xxxxXhtmlReq / XxxxXhtmlReq)
  // =====================================================================
  protected xxxxXhtmlReq: XhtmlType | null = null;

  /**
   * @returns the `xxxxXhtmlReq` property value as a PrimitiveType
   */
  public getXxxxXhtmlReqElement(): XhtmlType | null {
    return this.xxxxXhtmlReq;
  }

  /**
   * Assigns the provided PrimitiveType value to the `xxxxXhtmlReq` property.
   *
   * @param element - the `xxxxXhtmlReq` value
   * @returns this
   */
  public setXxxxXhtmlReqElement(element: XhtmlType): this {
    if (!isNil(element)) {
      const optErrMsg = `Invalid XxxClass.xxxxXhtmlReq; Provided element is not an instance of XhtmlType.`;
      assertFhirType<XhtmlType>(element, XhtmlType, optErrMsg);
      this.xxxxXhtmlReq = element;
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxXhtmlReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxXhtmlReqElement(): boolean {
    return !isNil(this.xxxxXhtmlReq) && !this.xxxxXhtmlReq.isEmpty();
  }

  /**
   * @returns the `xxxxXhtmlReq` property value as a primitive value
   */
  public getXxxxXhtmlReq(): fhirXhtml | null {
    if (this.xxxxXhtmlReq?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.xxxxXhtmlReq.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `xxxxXhtmlReq` property.
   *
   * @param value - the `xxxxXhtmlReq` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setXxxxXhtmlReq(value: fhirXhtml): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid XxxClass.xxxxXhtmlReq`;
      this.xxxxXhtmlReq = new XhtmlType(parseFhirPrimitiveData(value, fhirXhtmlSchema, optErrMsg));
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxXhtmlReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxXhtmlReq(): boolean {
    return this.hasXxxxXhtmlReqElement();
  }
  //endregion

  //region Model - Optional
  // =====================================================================
  // Complex Model 0..1 / MockFhirModel (xxxxModel / XxxxModel)
  // =====================================================================
  protected xxxxModel?: MockFhirModel | undefined;

  /**
   * @returns the `xxxxModel` property value as a Coding object
   */
  public getXxxxModel(): MockFhirModel {
    return this.xxxxModel ?? new MockFhirModel();
  }

  /**
   * Assigns the provided Coding object value to the `xxxxModel` property.
   *
   * @param value - the `xxxxModel` object value
   * @returns this
   */
  public setXxxxModel(value: MockFhirModel | undefined): this {
    const optErrMsg = `Invalid MockFhirModel.xxxxModel; Provided element is not an instance of MockFhirModel.`;
    assertFhirType<MockFhirModel>(value, MockFhirModel, optErrMsg);
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

  //region Model - Required
  // =====================================================================
  // Complex Model 0..1 / MockFhirModel (xxxxModelReq / XxxxModelReq)
  // =====================================================================
  protected xxxxModelReq: MockFhirModel | null = null;

  /**
   * @returns the `xxxxModelReq` property value as a Coding object
   */
  public getXxxxModelReq(): MockFhirModel | null {
    return this.xxxxModelReq;
  }

  /**
   * Assigns the provided Coding object value to the `xxxxModelReq` property.
   *
   * @param value - the `xxxxModelReq` object value
   * @returns this
   */
  public setXxxxModelReq(value: MockFhirModel): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid MockFhirModel.xxxxModelReq; Provided element is not an instance of MockFhirModel.`;
      assertFhirType<MockFhirModel>(value, MockFhirModel, optErrMsg);
      this.xxxxModelReq = value;
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxModelReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxModelReq(): boolean {
    return !isNil(this.xxxxModelReq) && !this.xxxxModelReq.isEmpty();
  }
  //endregion

  //region Model Array - Optional
  // =====================================================================
  // Complex Model 0..* / MockFhirModel[] (xxxxModelArray / XxxxModelArray)
  // =====================================================================
  protected xxxxModelArray?: MockFhirModel[] | undefined;

  /**
   * @returns the `xxxxModelArray` property value as a MockFhirModel array
   */
  public getXxxxModelArray(): MockFhirModel[] {
    return this.xxxxModelArray ?? ([] as MockFhirModel[]);
  }

  /**
   * Assigns the provided MockFhirModel array value to the `xxxxModelArray` property.
   *
   * @param value - the `xxxxModelArray` array value
   * @returns this
   */
  public setXxxxModelArray(value: MockFhirModel[] | undefined): this {
    const optErrMsg = `Invalid MockFhirModel.xxxxModelArray; Provided value array has an element that is not an instance of MockFhirModel.`;
    assertFhirTypeList<MockFhirModel>(value, MockFhirModel, optErrMsg);
    this.xxxxModelArray = value;
    return this;
  }

  /**
   * Add the provided MockFhirModel value to the `xxxxModelArray` array property.
   *
   * @param value - the `xxxxModelArray` value
   * @returns this
   */
  public addXxxxModelArray(value?: MockFhirModel): this {
    if (value !== undefined) {
      const optErrMsg = `Invalid MockFhirModel.xxxxModelArray; Provided element is not an instance of MockFhirModel.`;
      assertFhirType<MockFhirModel>(value, MockFhirModel, optErrMsg);
      this.initXxxxModelArray();
      this.xxxxModelArray?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxModelArray` property exists and has a value; `false` otherwise
   */
  public hasXxxxModelArray(): boolean {
    return (
      this.xxxxModelArray !== undefined &&
      this.xxxxModelArray.length > 0 &&
      this.xxxxModelArray.some((item: MockFhirModel) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `xxxxModelArray` property
   *
   * @private
   */
  private initXxxxModelArray(): void {
    if (this.xxxxModelArray === undefined) {
      this.xxxxModelArray = [] as MockFhirModel[];
    }
  }
  //endregion

  //region Model Array - Required
  // =====================================================================
  // Complex Model 0..* / MockFhirModel[] (xxxxModelArrayReq / XxxxModelArrayReq)
  // =====================================================================
  protected xxxxModelArrayReq: MockFhirModel[] | null = null;

  /**
   * @returns the `xxxxModelArrayReq` property value as a Coding array
   */
  public getXxxxModelArrayReq(): MockFhirModel[] | null {
    return this.xxxxModelArrayReq;
  }

  /**
   * Assigns the provided Coding array value to the `xxxxModelArrayReq` property.
   *
   * @param value - the `xxxxModelArrayReq` array value
   * @returns this
   */
  public setXxxxModelArrayReq(value: MockFhirModel[]): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid MockFhirModel.xxxxModelArrayReq; Provided value array has an element that is not an instance of MockFhirModel.`;
      assertFhirTypeList<MockFhirModel>(value, MockFhirModel, optErrMsg);
      this.xxxxModelArrayReq = value;
    }
    return this;
  }

  /**
   * Add the provided Coding value to the `xxxxModelArrayReq` array property.
   *
   * @param value - the `xxxxModelArrayReq` value
   * @returns this
   */
  public addXxxxModelArrayReq(value: MockFhirModel): this {
    if (!isNil(value)) {
      const optErrMsg = `Invalid MockFhirModel.xxxxModelArrayReq; Provided element is not an instance of MockFhirModel.`;
      assertFhirType<MockFhirModel>(value, MockFhirModel, optErrMsg);
      this.initXxxxModelArrayReq();
      this.xxxxModelArrayReq?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `xxxxModelArrayReq` property exists and has a value; `false` otherwise
   */
  public hasXxxxModelArrayReq(): boolean {
    return (
      !isNil(this.xxxxModelArrayReq) &&
      this.xxxxModelArrayReq.length > 0 &&
      this.xxxxModelArrayReq.some((item: MockFhirModel) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `xxxxModelArrayReq` property
   *
   * @private
   */
  private initXxxxModelArrayReq(): void {
    if (this.xxxxModelArrayReq === null) {
      this.xxxxModelArrayReq = [] as MockFhirModel[];
    }
  }
  //endregion
}

class MockFhirModel extends Base {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public fhirType(): string {
    return 'MockFhirModel';
  }

  public isEmpty(): boolean {
    return true;
  }

  // NOT USED
  public copy(): MockFhirModel {
    const dest = new MockFhirModel();
    this.copyValues(dest);
    return dest;
  }

  // NOT USED
  // @ts-expect-error: ignore param for test purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected copyValues(dest: MockFhirModel): void {
    return;
  }

  // NOT USED
  public toJSON(): Value | undefined {
    return undefined;
  }
}
