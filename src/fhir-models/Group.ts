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

import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { BackboneElement, DataType } from '@src/fhir-core/base-models/core-fhir-models';
import { ResourceType } from '@src/fhir-core/base-models/ResourceType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { EnumCodeType } from '@src/fhir-core/data-types/primitive/EnumCodeType';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { Quantity } from '@src/fhir-core/data-types/complex/Quantity';
import { Range } from '@src/fhir-core/data-types/complex/Range';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { UnsignedIntType } from '@src/fhir-core/data-types/primitive/UnsignedIntType';
import {
  fhirBoolean,
  fhirCode,
  fhirString,
  fhirUnsignedInt,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { GroupTypeEnum } from '@src/fhir-models/code-systems/GroupTypeEnum';
import { isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import { ReferenceTargets } from '@src/fhir-core/decorators/ReferenceTargets';
import { assertFhirType, FhirTypeGuard } from '@src/fhir-core/utility/type-guards';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Group Class
 *
 * @remarks
 * Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.
 *
 * **FHIR Specification**
 * - **Short:** Group of multiple entities
 * - **Definition:** Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.
 * - **Comment:** If both Group.characteristic and Group.member are present, then the members are the individuals who were found who met the characteristic.  It's possible that there might be other candidate members who meet the characteristic and aren't (yet) in the list.  All members SHALL have the listed characteristics.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Group
 *
 * @category Resource Models
 * @see [FHIR Group](http://hl7.org/fhir/StructureDefinition/Group)
 */
export class Group extends DomainResource implements IBase {
  /**
   * @param type - person | animal | practitioner | device | medication | substance
   * @param actual - Descriptive or actual
   */
  constructor(type: EnumCodeType | CodeType | fhirCode | null, actual: BooleanType | fhirBoolean | null) {
    super();

    this.groupTypeEnum = new GroupTypeEnum();

    if (type === null) {
      this.type = null;
    } else if (type instanceof EnumCodeType) {
      this.type = type;
    } else {
      try {
        this.type = new EnumCodeType(type, this.groupTypeEnum);
      } catch (err) {
        // fromCode() in EnumCodeType() will throw InvalidCodeError
        // if the provided code is undefined or is unknown
        if (err instanceof InvalidCodeError) {
          const errMsg = `Invalid Group.type parameter: ${err.message}`;
          throw new InvalidCodeError(errMsg, err);
        } else {
          let errMsg: string;
          if (typeof type === 'string') {
            errMsg = `Invalid Group.type parameter (${type})`;
          } else {
            errMsg = `Invalid Group.type parameter: Unexpected error`;
          }
          throw new InvalidCodeError(errMsg, err as Error);
        }
      }
    }

    if (actual === null) {
      this.actual = null;
    } else if (actual instanceof BooleanType) {
      this.actual = actual;
    } else {
      const optErrMsg = `Invalid Group.actual parameter (${String(actual)})`;
      this.actual = new BooleanType(BooleanType.parse(actual, optErrMsg));
    }
  }

  private readonly groupTypeEnum: GroupTypeEnum;

  /**
   * Group.identifier Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Unique id
   * - **Definition:** A unique business identifier for this group.
   * - **Requirements:** Allows the group to be referenced from external specifications.
   * - **FHIR Type:** `Identifier`
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected identifier?: Identifier[] | undefined;

  /**
   * Group.active Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Whether this group's record is in active use
   * - **Definition:** Indicates whether the record for the group is available for use or is merely being retained for historical purposes.
   * - **Requirements:** Need to be able to mark a group record as not to be used because it was created in error or is otherwise no longer available (e.g. a herd that no longer exists).
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected active?: BooleanType | undefined;

  /**
   * Group.type Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** person | animal | practitioner | device | medication | substance
   * - **Definition:** Identifies the broad classification of the kind of resources the group includes.
   * - **Comment:** Group members SHALL be of the appropriate resource type (Patient for person or animal; or Practitioner, Device, Medication or Substance for the other types.).
   * - **Requirements:** Identifies what type of resources the group is made up of.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected type: EnumCodeType | null;

  /**
   * Group.actual Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Descriptive or actual
   * - **Definition:** If true, indicates that the resource refers to a specific group of real individuals.  If false, the group defines a set of intended individuals.
   * - **Requirements:** There are use-cases for groups that define specific collections of individuals, and other groups that define "types" of intended individuals.  The requirements for both kinds of groups are similar, so we use a single resource, distinguished by this flag.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected actual: BooleanType | null;

  /**
   * Group.code Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Kind of Group members
   * - **Definition:** Provides a specific type of resource the group includes; e.g. "cow", "syringe", etc.
   * - **Comment:** This would generally be omitted for Person resources.
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected code?: CodeableConcept | undefined;

  /**
   * Group.name Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Label for Group
   * - **Definition:** A label assigned to the group for human identification and communication.
   * - **Requirements:** Used to identify the group in human communication.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected name?: StringType | undefined;

  /**
   * Group.quantity Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Number of members
   * - **Definition:** A count of the number of resource instances that are part of the group.
   * - **Comment:** Note that the quantity may be less than the number of members if some of the members are not active.>
   * - **Requirements:** Group size is a common defining characteristic.
   * - **FHIR Type:** `unsignedInt`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected quantity?: UnsignedIntType | undefined;

  /**
   * Group.managingEntity Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Entity that is the custodian of the Group's definition
   * - **Definition:** Entity responsible for defining and maintaining Group characteristics and/or registered members.
   * - **Comment:** This does not strictly align with ownership of a herd or flock, but may suffice to represent that relationship in simple cases. More complex cases will require an extension.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: ['http://hl7.org/fhir/StructureDefinition/Organization', 'http://hl7.org/fhir/StructureDefinition/RelatedPerson', 'http://hl7.org/fhir/StructureDefinition/Practitioner', 'http://hl7.org/fhir/StructureDefinition/PractitionerRole']
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  protected managingEntity?: Reference | undefined;

  /**
   * Group.characteristic Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Include / Exclude group members by Trait
   * - **Definition:** Identifies traits whose presence r absence is shared by members of the group.
   * - **Comment:** All the identified characteristics must be true for an entity to a member of the group.
   * - **Requirements:** Needs to be a generic mechanism for identifying what individuals can be part of a group.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected characteristic?: GroupCharacteristicComponent[] | undefined;

  /**
   * Group.member Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Who or what is in group
   * - **Definition:** Identifies the resource instances that are members of the group.
   * - **Requirements:** Often the only thing of interest about a group is "who's in it".
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected member?: GroupMemberComponent[] | undefined;

  /**
   * {@inheritDoc Resource.resourceType}
   */
  public resourceType(): ResourceType {
    return this.fhirType() as ResourceType;
  }

  /**
   * @returns the `identifier` property value as a Identifier array
   */
  public getIdentifier(): Identifier[] {
    return this.identifier ?? ([] as Identifier[]);
  }

  /**
   * Assigns the provided Identifier array value to the `identifier` property.
   *
   * @param value - the `identifier` array value
   * @returns this
   */
  public setIdentifier(value: Identifier[] | undefined): this {
    value?.forEach((identifier) => {
      assertFhirType(
        identifier,
        Identifier,
        `Group.setIdentifier(): At least one provided array item is not an instance of Identifier.`,
      );
    });
    this.identifier = value;
    return this;
  }

  /**
   * Add the provided Identifier value to the `identifier` array property.
   *
   * @param value - the `identifier` value
   * @returns this
   */
  public addIdentifier(value?: Identifier): this {
    if (value !== undefined) {
      assertFhirType(
        value,
        Identifier,
        `Group.addIdentifier(): The provided argument is not an instance of Identifier.`,
      );
      this.initIdentifier();
      this.identifier?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `identifier` property exists and has a value; `false` otherwise
   */
  public hasIdentifier(): boolean {
    return (
      this.identifier !== undefined &&
      this.identifier.length > 0 &&
      this.identifier.some((item: Identifier) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `identifier` property
   *
   * @private
   */
  private initIdentifier(): void {
    if (this.identifier === undefined) {
      this.identifier = [] as Identifier[];
    }
  }

  /**
   * @returns the `active` property value as a PrimitiveType
   */
  public getActiveElement(): BooleanType {
    return this.active ?? new BooleanType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `active` property.
   *
   * @param element - the `active` value
   * @returns this
   */
  public setActiveElement(element: BooleanType | undefined): this {
    assertFhirType(
      element,
      BooleanType,
      `Group.setActiveElement(): The provided argument is not an instance of BooleanType.`,
    );
    this.active = element;
    return this;
  }

  /**
   * @returns `true` if the `active` property exists and has a value; `false` otherwise
   */
  public hasActiveElement(): boolean {
    return this.active !== undefined && !this.active.isEmpty();
  }

  /**
   * @returns the `active` property value as a primitive value
   */
  public getActive(): fhirBoolean | undefined {
    return this.active?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `active` property.
   *
   * @param value - the `active` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setActive(value: fhirBoolean | undefined): this {
    const optErrMsg = `Invalid Group.active (${String(value)}))`;
    this.active = value === undefined ? undefined : new BooleanType(BooleanType.parse(value, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `active` property exists and has a value; `false` otherwise
   */
  public hasActive(): boolean {
    return this.hasActiveElement();
  }

  /**
   * @returns the `type` property value as a EnumCodeType
   */
  public getTypeEnumType(): EnumCodeType | null {
    return this.type;
  }

  /**
   * Assigns the provided EnumCodeType value to the `type` property.
   *
   * @param enumType - the `type` value
   * @returns this
   */
  public setTypeEnumType(enumType: EnumCodeType): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (enumType !== null) {
      assertFhirType(
        enumType,
        EnumCodeType,
        `Group.setTypeEnumType(): The provided argument is not an instance of EnumCodeType.`,
      );
      this.type = enumType;
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasTypeEnumType(): boolean {
    return this.type !== null && !this.type.isEmpty() && this.type.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `type` property value as a PrimitiveType
   */
  public getTypeElement(): CodeType | null {
    if (this.type === null) {
      return null;
    }
    return this.type as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `type` property.
   *
   * @param element - the `type` value
   * @returns this
   */
  public setTypeElement(element: CodeType): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (element !== null) {
      assertFhirType(
        element,
        CodeType,
        `Group.setTypeElement(): The provided argument is not an instance of CodeType.`,
      );
      this.type = new EnumCodeType(element, this.groupTypeEnum);
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasTypeElement(): boolean {
    return this.hasTypeEnumType();
  }

  /**
   * @returns the `type` property value as a primitive value
   */
  public getType(): fhirCode | null {
    if (this.type === null) {
      return null;
    }
    return this.type.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `type` property.
   *
   * @param value - the `type` value
   * @returns this
   */
  public setType(value: fhirCode): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      this.type = new EnumCodeType(value, this.groupTypeEnum);
    }
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasType(): boolean {
    return this.hasTypeEnumType();
  }

  /**
   * @returns the `actual` property value as a PrimitiveType
   */
  public getActualElement(): BooleanType | null {
    return this.actual;
  }

  /**
   * Assigns the provided PrimitiveType value to the `actual` property.
   *
   * @param element - the `actual` value
   * @returns this
   */
  public setActualElement(element: BooleanType): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (element !== null) {
      assertFhirType(
        element,
        BooleanType,
        `Group.setActualElement(): The provided argument is not an instance of BooleanType.`,
      );
      this.actual = element;
    }
    return this;
  }

  /**
   * @returns `true` if the `actual` property exists and has a value; `false` otherwise
   */
  public hasActualElement(): boolean {
    return this.actual !== null && !this.actual.isEmpty();
  }

  /**
   * @returns the `actual` property value as a primitive value
   */
  public getActual(): fhirBoolean | null {
    if (this.actual?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.actual.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `actual` property.
   *
   * @param value - the `actual` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setActual(value: fhirBoolean): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      const optErrMsg = `Invalid Group.actual (${String(value)})`;
      this.actual = new BooleanType(BooleanType.parse(value, optErrMsg));
    }
    return this;
  }

  /**
   * @returns `true` if the `actual` property exists and has a value; `false` otherwise
   */
  public hasActual(): boolean {
    return this.hasActualElement();
  }

  /**
   * @returns the `code` property value as a CodeableConcept object
   */
  public getCode(): CodeableConcept {
    return this.code ?? new CodeableConcept();
  }

  /**
   * Assigns the provided CodeableConcept object value to the `code` property.
   *
   * @param value - the `code` object value
   * @returns this
   */
  public setCode(value: CodeableConcept | undefined): this {
    assertFhirType(
      value,
      CodeableConcept,
      `Group.setCode(): The provided argument is not an instance of CodeableConcept.`,
    );
    this.code = value;
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCode(): boolean {
    return this.code !== undefined && !this.code.isEmpty();
  }

  /**
   * @returns the `name` property value as a PrimitiveType
   */
  public getNameElement(): StringType {
    return this.name ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `name` property.
   *
   * @param element - the `name` value
   * @returns this
   */
  public setNameElement(element: StringType | undefined): this {
    assertFhirType(
      element,
      StringType,
      `Group.setNameElement(): The provided argument is not an instance of StringType.`,
    );
    this.name = element;
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasNameElement(): boolean {
    return this.name !== undefined && !this.name.isEmpty();
  }

  /**
   * @returns the `name` property value as a primitive value
   */
  public getName(): fhirString | undefined {
    return this.name?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `name` property.
   *
   * @param value - the `name` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setName(value: fhirString | undefined): this {
    const optErrMsg = `Invalid Group.name (${String(value)})`;
    this.name = value === undefined ? undefined : new StringType(StringType.parse(value, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasName(): boolean {
    return this.hasNameElement();
  }

  /**
   * @returns the `quantity` property value as a PrimitiveType
   */
  public getQuantityElement(): UnsignedIntType {
    return this.quantity ?? new UnsignedIntType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `quantity` property.
   *
   * @param element - the `quantity` value
   * @returns this
   */
  public setQuantityElement(element: UnsignedIntType | undefined): this {
    assertFhirType(
      element,
      UnsignedIntType,
      `Group.setQuantityElement(): The provided argument is not an instance of UnsignedIntType.`,
    );
    this.quantity = element;
    return this;
  }

  /**
   * @returns `true` if the `quantity` property exists and has a value; `false` otherwise
   */
  public hasQuantityElement(): boolean {
    return this.quantity !== undefined && !this.quantity.isEmpty();
  }

  /**
   * @returns the `quantity` property value as a primitive value
   */
  public getQuantity(): fhirUnsignedInt | undefined {
    return this.quantity?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `quantity` property.
   *
   * @param value - the `quantity` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setQuantity(value: fhirUnsignedInt | undefined): this {
    const optErrMsg = `Invalid Group.quantity (${String(value)})`;
    this.quantity = value === undefined ? undefined : new UnsignedIntType(UnsignedIntType.parse(value, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `quantity` property exists and has a value; `false` otherwise
   */
  public hasQuantity(): boolean {
    return this.hasQuantityElement();
  }

  /**
   * @returns the `managingEntity` property value as a Reference object
   */
  public getManagingEntity(): Reference {
    return this.managingEntity ?? new Reference();
  }

  /**
   * Assigns the provided Reference object value to the `managingEntity` property.
   *
   * @param value - the `managingEntity` object value
   * @returns this
   */
  @ReferenceTargets(['Organization', 'RelatedPerson', 'Practitioner', 'PractitionerRole'])
  public setManagingEntity(value: Reference | undefined): this {
    this.managingEntity = value;
    return this;
  }

  /**
   * @returns `true` if the `managingEntity` property exists and has a value; `false` otherwise
   */
  public hasManagingEntity(): boolean {
    return this.managingEntity !== undefined && !this.managingEntity.isEmpty();
  }

  /**
   * @returns the `characteristic` property value as a GroupCharacteristicComponent array
   */
  public getCharacteristic(): GroupCharacteristicComponent[] {
    return this.characteristic ?? ([] as GroupCharacteristicComponent[]);
  }

  /**
   * Assigns the provided GroupCharacteristicComponent array value to the `characteristic` property.
   *
   * @param value - the `characteristic` array value
   * @returns this
   */
  public setCharacteristic(value: GroupCharacteristicComponent[] | undefined): this {
    value?.forEach((component) => {
      assertFhirType(
        component,
        GroupCharacteristicComponent,
        `Group.setCharacteristic(): At least one provided array item is not an instance of GroupCharacteristicComponent.`,
      );
    });
    this.characteristic = value;
    return this;
  }

  /**
   * Add the provided GroupCharacteristicComponent value to the `characteristic` array property.
   *
   * @param value - the `characteristic` value
   * @returns this
   */
  public addCharacteristic(value?: GroupCharacteristicComponent): this {
    if (value !== undefined) {
      assertFhirType(
        value,
        GroupCharacteristicComponent,
        `Group.addCharacteristic(): The provided argument is not an instance of GroupCharacteristicComponent.`,
      );
      this.initCharacteristic();
      this.characteristic?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `characteristic` property exists and has a value; `false` otherwise
   */
  public hasCharacteristic(): boolean {
    return (
      this.characteristic !== undefined &&
      this.characteristic.length > 0 &&
      this.characteristic.some((item: GroupCharacteristicComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `characteristic` property
   *
   * @private
   */
  private initCharacteristic(): void {
    if (this.characteristic === undefined) {
      this.characteristic = [] as GroupCharacteristicComponent[];
    }
  }

  /**
   * @returns the `member` property value as a GroupMemberComponent array
   */
  public getMember(): GroupMemberComponent[] {
    return this.member ?? ([] as GroupMemberComponent[]);
  }

  /**
   * Assigns the provided GroupMemberComponent array value to the `member` property.
   *
   * @param value - the `member` array value
   * @returns this
   */
  public setMember(value: GroupMemberComponent[] | undefined): this {
    value?.forEach((component) => {
      assertFhirType(
        component,
        GroupMemberComponent,
        `Group.setMember(): At least one provided array item is not an instance of GroupMemberComponent.`,
      );
    });
    this.member = value;
    return this;
  }

  /**
   * Add the provided GroupMemberComponent value to the `member` array property.
   *
   * @param value - the `member` value
   * @returns this
   */
  public addMember(value?: GroupMemberComponent): this {
    if (value !== undefined) {
      assertFhirType(
        value,
        GroupMemberComponent,
        `Group.addMember(): The provided argument is not an instance of GroupMemberComponent.`,
      );
      this.initMember();
      this.member?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `member` property exists and has a value; `false` otherwise
   */
  public hasMember(): boolean {
    return (
      this.member !== undefined &&
      this.member.length > 0 &&
      this.member.some((item: GroupMemberComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `member` property
   *
   * @private
   */
  private initMember(): void {
    if (this.member === undefined) {
      this.member = [] as GroupMemberComponent[];
    }
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'Group';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(
        this.identifier,
        this.active,
        this.type,
        this.actual,
        this.code,
        this.name,
        this.quantity,
        this.managingEntity,
        this.characteristic,
        this.member,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Group {
    const dest = new Group(this.type, this.actual);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: Group): void {
    super.copyValues(dest);
    dest.identifier = this.identifier;
    dest.active = this.active;
    dest.type = this.type;
    dest.actual = this.actual;
    dest.code = this.code;
    dest.name = this.name;
    dest.quantity = this.quantity;
    dest.managingEntity = this.managingEntity;
    dest.characteristic = this.characteristic;
    dest.member = this.member;
  }
}

/**
 * GroupCharacteristicComponent Subclass
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** Include / Exclude group members by Trait
 * - **Definition:** Identifies traits whose presence r absence is shared by members of the group.
 * - **Comment:** All the identified characteristics must be true for an entity to a member of the group.
 * - **Requirements:** Needs to be a generic mechanism for identifying what individuals can be part of a group.
 *
 * @category Resource Models
 * @see [FHIR Group](http://hl7.org/fhir/StructureDefinition/Group)
 */
export class GroupCharacteristicComponent extends BackboneElement {
  /**
   * @param code - Kind of characteristic
   * @param value - Value held by characteristic (valid types: `CodeableConcept`, `BooleanType`, `Quantity`, `Range`, `Reference`)
   * @param exclude - Group includes or excludes
   */
  constructor(code: CodeableConcept | null, value: DataType | null, exclude: BooleanType | fhirBoolean | null) {
    super();
    this.code = code;

    if (value === null) {
      this.value = null;
    } else {
      this.value = this.checkValueDataType(value);
    }

    if (exclude === null) {
      this.exclude = null;
    } else if (exclude instanceof BooleanType) {
      this.exclude = exclude;
    } else {
      const optErrMsg = `Invalid GroupCharacteristicComponent.exclude parameter (${String(exclude)})`;
      this.exclude = new BooleanType(BooleanType.parse(exclude, optErrMsg));
    }
  }

  /**
   * Group.characteristic.code Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Kind of characteristic
   * - **Definition:** A code that identifies the kind of trait being asserted.
   * - **Requirements:** Need a formal way of identifying the characteristic being described.
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected code: CodeableConcept | null;

  /**
   * Group.characteristic.value[x] Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Value held by characteristic
   * - **Definition:** The value of the trait that holds (or does not hold - see 'exclude') for members of the group.
   * - **Comment:** For Range, it means members of the group have a value that falls somewhere within the specified range.
   * - **Requirements:** The value of the characteristic is what determines group membership.
   * - **FHIR Types:**
   *  - `CodeableConcept`
   *  - `boolean`
   *  - `Quantity`
   *  - `Range`
   *  - `Reference`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected value: DataType | null;

  /**
   * Group.characteristic.exclude Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Group includes or excludes
   * - **Definition:** If true, indicates the characteristic is one that is NOT held by members of the group.
   * - **Comment:** This is labeled as "Is Modifier" because applications cannot wrongly include excluded members as included or vice versa.
   * - **Requirements:** Sometimes group membership is determined by characteristics not possessed.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected exclude: BooleanType | null;

  /**
   * Group.characteristic.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Period over which characteristic is tested
   * - **Definition:** The period over which the characteristic is tested; e.g. the patient had an operation during the month of June.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected period?: Period | undefined;

  /**
   * @returns the `code` property value as a CodeableConcept object
   */
  public getCode(): CodeableConcept | null {
    return this.code;
  }

  /**
   * Assigns the provided CodeableConcept object value to the `code` property.
   *
   * @param value - the `code` object value
   * @returns this
   */
  public setCode(value: CodeableConcept): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      assertFhirType(
        value,
        CodeableConcept,
        `GroupCharacteristicComponent.setCode(): The provided argument is not an instance of CodeableConcept.`,
      );
      this.code = value;
    }
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCode(): boolean {
    return this.code !== null && !this.code.isEmpty();
  }

  /**
   * @returns the `value` property value as a DataType object
   */
  public getValue(): DataType | null {
    return this.value;
  }

  /**
   * Assigns the provided DataType object value to the `value` property.
   *
   * @param value - the `value` object value
   * @returns this
   */
  public setValue(value: DataType): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      this.value = this.checkValueDataType(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `value` property exists and has a value; `false` otherwise
   */
  public hasValue(): boolean {
    return this.value !== null && !this.value.isEmpty();
  }

  /**
   * Returns the provide value if is a supported DataType; otherwise throws InvalidTypeError.
   *
   * @param value - the `value` object value
   * @returns the provide value if it is a supported DataType
   * @throws InvalidTypeError if value is not a supported DataType
   * @private
   */
  private checkValueDataType(value: DataType): DataType {
    if (
      !(
        FhirTypeGuard(value, BooleanType) ||
        FhirTypeGuard(value, CodeableConcept) ||
        FhirTypeGuard(value, Quantity) ||
        FhirTypeGuard(value, Range) ||
        FhirTypeGuard(value, Reference)
      )
    ) {
      throw new InvalidTypeError(`Invalid DataType for Group.characteristic.value[x]: ${value.fhirType()}`);
    }
    return value;
  }

  /**
   * @returns the `value` property value as a CodeableConcept object
   */
  public getValueCodeableConcept(): CodeableConcept | null {
    if (this.value === null) {
      return null;
    }
    if (!(this.value instanceof CodeableConcept)) {
      throw new InvalidTypeError(
        `DataType mismatch for Group.characteristic.value[x]: Expected CodeableConcept but encountered ${this.value.fhirType()}`,
      );
    }
    return this.value;
  }

  /**
   * @returns `true` if the `value` property exists as a CodeableConcept and has a value; `false` otherwise
   */
  public hasValueCodeableConcept(): boolean {
    return this.value !== null && !this.value.isEmpty() && this.value instanceof CodeableConcept;
  }

  /**
   * @returns the `value` property value as a BooleanType object
   */
  public getValueBooleanType(): BooleanType | null {
    if (this.value === null) {
      return null;
    }
    if (!(this.value instanceof BooleanType)) {
      throw new InvalidTypeError(
        `DataType mismatch for Group.characteristic.value[x]: Expected BooleanType but encountered ${this.value.fhirType()}`,
      );
    }
    return this.value;
  }

  /**
   * @returns `true` if the `value` property exists as a boolean and has a value; `false` otherwise
   */
  public hasValueBooleanType(): boolean {
    return this.value !== null && !this.value.isEmpty() && this.value instanceof BooleanType;
  }

  /**
   * @returns the `value` property value as a Quantity object
   */
  public getValueQuantity(): Quantity | null {
    if (this.value === null) {
      return null;
    }
    if (!(this.value instanceof Quantity)) {
      throw new InvalidTypeError(
        `DataType mismatch for Group.characteristic.value[x]: Expected Quantity but encountered ${this.value.fhirType()}`,
      );
    }
    return this.value;
  }

  /**
   * @returns `true` if the `value` property exists as a Quantity and has a value; `false` otherwise
   */
  public hasValueQuantity(): boolean {
    return this.value !== null && !this.value.isEmpty() && this.value instanceof Quantity;
  }

  /**
   * @returns the `value` property value as a Range object
   */
  public getValueRange(): Range | null {
    if (this.value === null) {
      return null;
    }
    if (!(this.value instanceof Range)) {
      throw new InvalidTypeError(
        `DataType mismatch for Group.characteristic.value[x]: Expected Range but encountered ${this.value.fhirType()}`,
      );
    }
    return this.value;
  }

  /**
   * @returns `true` if the `value` property exists as a Range and has a value; `false` otherwise
   */
  public hasValueRange(): boolean {
    return this.value !== null && !this.value.isEmpty() && this.value instanceof Range;
  }

  /**
   * @returns the `value` property value as a Reference object
   */
  public getValueReference(): Reference | null {
    if (this.value === null) {
      return null;
    }
    if (!(this.value instanceof Reference)) {
      throw new InvalidTypeError(
        `DataType mismatch for Group.characteristic.value[x]: Expected Reference but encountered ${this.value.fhirType()}`,
      );
    }
    return this.value;
  }

  /**
   * @returns `true` if the `value` property exists as a Reference and has a value; `false` otherwise
   */
  public hasValueReference(): boolean {
    return this.value !== null && !this.value.isEmpty() && this.value instanceof Reference;
  }

  /**
   * @returns the `exclude` property value as a PrimitiveType
   */
  public getExcludeElement(): BooleanType | null {
    return this.exclude;
  }

  /**
   * Assigns the provided PrimitiveType value to the `exclude` property.
   *
   * @param element - the `exclude` value
   * @returns this
   */
  public setExcludeElement(element: BooleanType): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (element !== null) {
      assertFhirType(
        element,
        BooleanType,
        `GroupCharacteristicComponent.setExcludeElement(): The provided argument is not an instance of BooleanType.`,
      );
      this.exclude = element;
    }
    return this;
  }

  /**
   * @returns `true` if the `exclude` property exists and has a value; `false` otherwise
   */
  public hasExcludeElement(): boolean {
    return this.exclude !== null && !this.exclude.isEmpty();
  }

  /**
   * @returns the `exclude` property value as a primitive value
   */
  public getExclude(): fhirBoolean | null {
    if (this.exclude?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.exclude.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `exclude` property.
   *
   * @param value - the `exclude` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setExclude(value: fhirBoolean): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      const optErrMsg = `Invalid GroupCharacteristicComponent.exclude (${String(value)})`;
      this.exclude = new BooleanType(BooleanType.parse(value, optErrMsg));
    }
    return this;
  }

  /**
   * @returns `true` if the `exclude` property exists and has a value; `false` otherwise
   */
  public hasExclude(): boolean {
    return this.hasExcludeElement();
  }

  /**
   * @returns the `period` property value as a Period object
   */
  public getPeriod(): Period {
    return this.period ?? new Period();
  }

  /**
   * Assigns the provided Period object value to the `period` property.
   *
   * @param value - the `period` object value
   * @returns this
   */
  public setPeriod(value: Period | undefined): this {
    assertFhirType(
      value,
      Period,
      `GroupCharacteristicComponent.setPeriod(): The provided argument is not an instance of Period.`,
    );
    this.period = value;
    return this;
  }

  /**
   * @returns `true` if the `period` property exists and has a value; `false` otherwise
   */
  public hasPeriod(): boolean {
    return this.period !== undefined && !this.period.isEmpty();
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'Group.characteristic';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.code, this.value, this.exclude, this.period);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): GroupCharacteristicComponent {
    const dest = new GroupCharacteristicComponent(this.code, this.value, this.exclude);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: GroupCharacteristicComponent): void {
    super.copyValues(dest);
    dest.code = this.code;
    dest.value = this.value;
    dest.exclude = this.exclude;
    dest.period = this.period;
  }
}

/**
 * GroupMemberComponent Subclass
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** Who or what is in group
 * - **Definition:** Identifies the resource instances that are members of the group.
 * - **Requirements:** Often the only thing of interest about a group is "who's in it".
 *
 * @category Resource Models
 * @see [FHIR Group](http://hl7.org/fhir/StructureDefinition/Group)
 */
export class GroupMemberComponent extends BackboneElement {
  /**
   * @param entity - Reference to the group member
   */
  constructor(entity: Reference | null) {
    super();

    this.entity = entity;
  }

  /**
   * Group.member.entity Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Reference to the group member
   * - **Definition:** A reference to the entity that is a member of the group. Must be consistent with Group.type. If the entity is another group, then the type must be the same.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Patient', 'http://hl7.org/fhir/StructureDefinition/Practitioner', 'http://hl7.org/fhir/StructureDefinition/PractitionerRole', 'http://hl7.org/fhir/StructureDefinition/Device', 'http://hl7.org/fhir/StructureDefinition/Medication', 'http://hl7.org/fhir/StructureDefinition/Substance', 'http://hl7.org/fhir/StructureDefinition/Group' ]
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected entity: Reference | null;

  /**
   * Group.member.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Period member belonged to the group
   * - **Definition:** The period that the member was in the group, if known.
   * - **Requirements:** Need to track who was in a group at a  particular time.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected period?: Period | undefined;

  /**
   * Group.member.inactive Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** If member is no longer in group
   * - **Definition:** A flag to indicate that the member is no longer in the group, but previously may have been a member.
   * - **Requirements:** Sometimes you don't know when someone stopped being in a group, but not when.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** <StructureDefinition.snapshot.element[i].min>..<StructureDefinition.snapshot.element[i].max>
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected inactive?: BooleanType | undefined;

  /**
   * @returns the `entity` property value as a Reference object
   */
  public getEntity(): Reference | null {
    return this.entity;
  }

  /**
   * Assigns the provided Reference object value to the `entity` property.
   *
   * @param value - the `entity` object value
   * @returns this
   */
  @ReferenceTargets(['Patient', 'Practitioner', 'PractitionerRole', 'Device', 'Medication', 'Substance', 'Group'])
  public setEntity(value: Reference): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      this.entity = value;
    }
    return this;
  }

  /**
   * @returns `true` if the `entity` property exists and has a value; `false` otherwise
   */
  public hasEntity(): boolean {
    return this.entity !== null && !this.entity.isEmpty();
  }

  /**
   * @returns the `period` property value as a Period object
   */
  public getPeriod(): Period {
    return this.period ?? new Period();
  }

  /**
   * Assigns the provided Period object value to the `period` property.
   *
   * @param value - the `period` object value
   * @returns this
   */
  public setPeriod(value: Period | undefined): this {
    assertFhirType(
      value,
      Period,
      `GroupMemberComponent.setPeriod(): The provided argument is not an instance of Period.`,
    );
    this.period = value;
    return this;
  }

  /**
   * @returns `true` if the `period` property exists and has a value; `false` otherwise
   */
  public hasPeriod(): boolean {
    return this.period !== undefined && !this.period.isEmpty();
  }

  /**
   * @returns the `inactive` property value as a PrimitiveType
   */
  public getInactiveElement(): BooleanType {
    return this.inactive ?? new BooleanType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `inactive` property.
   *
   * @param element - the `inactive` value
   * @returns this
   */
  public setInactiveElement(element: BooleanType | undefined): this {
    assertFhirType(
      element,
      BooleanType,
      `GroupMemberComponent.setInactiveElement(): The provided argument is not an instance of BooleanType.`,
    );
    this.inactive = element;
    return this;
  }

  /**
   * @returns `true` if the `inactive` property exists and has a value; `false` otherwise
   */
  public hasInactiveElement(): boolean {
    return this.inactive !== undefined;
  }

  /**
   * @returns the `inactive` property value as a primitive value
   */
  public getInactive(): fhirBoolean | undefined {
    return this.inactive?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `inactive` property.
   *
   * @param value - the `inactive` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setInactive(value: fhirBoolean | undefined): this {
    const optErrMsg = `Invalid GroupMemberComponent.inactive (${String(value)}))`;
    this.inactive = value === undefined ? undefined : new BooleanType(BooleanType.parse(value, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `inactive` property exists and has a value; `false` otherwise
   */
  public hasInactive(): boolean {
    return this.hasInactiveElement();
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'Group.member';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.entity, this.period, this.inactive);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): GroupMemberComponent {
    const dest = new GroupMemberComponent(this.entity);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: GroupMemberComponent): void {
    super.copyValues(dest);
    dest.entity = this.entity;
    dest.period = this.period;
    dest.inactive = this.inactive;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
