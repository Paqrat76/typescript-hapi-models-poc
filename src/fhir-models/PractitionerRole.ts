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

import { REQUIRED_PROPERTIES_DO_NOT_EXIST, REQUIRED_PROPERTIES_REQD_IN_JSON } from '@src/fhir-core/constants';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import {
  assertEnumCodeType,
  assertEnumCodeTypeList,
  CodeType,
  EnumCodeType,
} from '@src/fhir-core/data-types/primitive/CodeType';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { Identifier, Reference, ReferenceTargets } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { TimeType } from '@src/fhir-core/data-types/primitive/TimeType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCode,
  fhirCodeSchema,
  fhirString,
  fhirStringSchema,
  fhirTime,
  fhirTimeSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { DaysOfWeekEnum } from '@src/fhir-core/data-types/code-systems/DaysOfWeekEnum';
import {
  BackboneElement,
  PrimitiveType,
  setFhirBackboneElementListJson,
  setFhirComplexJson,
  setFhirComplexListJson,
  setFhirPrimitiveJson,
  setFhirPrimitiveListJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import {
  assertFhirResourceTypeJson,
  getPrimitiveTypeJson,
  getPrimitiveTypeListJson,
  parseBooleanType,
  parseCodeableConcept,
  parseCodeType,
  parseContactPoint,
  parseIdentifier,
  parsePeriod,
  parseReference,
  parseStringType,
  parseTimeType,
  PrimitiveTypeJson,
  processBackboneElementJson,
  processDomainResourceJson,
} from '@src/fhir-core/utility/fhir-parsers';
import { parseContainedResources } from '@src/fhir-models/fhir-contained-resource-parser';
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  isDefined,
  isDefinedList,
} from '@src/fhir-core/utility/type-guards';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import { copyListValues, extractFieldName, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { FhirError } from '@src/fhir-core/errors/FhirError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * PractitionerRole Class
 *
 * @remarks
 * A specific set of Roles/Locations/specialties/services that a practitioner may perform at an organization for a period of time.
 *
 * **FHIR Specification**
 * - **Short:** Roles/organizations the practitioner is associated with
 * - **Definition:** A specific set of Roles/Locations/specialties/services that a practitioner may perform at an organization for a period of time.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.PractitionerRole
 *
 * @category Resource Models
 * @see [FHIR PractitionerRole](http://hl7.org/fhir/StructureDefinition/PractitionerRole)
 */
export class PractitionerRole extends DomainResource implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * Parse the provided `PractitionerRole` json to instantiate the PractitionerRole data model.
   *
   * @param sourceJson - JSON representing FHIR `PractitionerRole`
   * @returns PractitionerRole data model or undefined for `PractitionerRole`
   */
  public static override parse(sourceJson: JSON.Object): PractitionerRole | undefined {
    if (!isDefined<JSON.Object>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `PractitionerRole JSON`);
    assertFhirResourceTypeJson(classJsonObj, 'PractitionerRole');
    const instance = new PractitionerRole();
    processDomainResourceJson(instance, classJsonObj);

    // NOTE: "contained" is handled in Resource-based FHIR model rather than in processDomainResourceJson above
    //       to minimize circular references!
    let sourceField = 'PractitionerRole.contained';
    let fieldName = extractFieldName(sourceField);
    // Ignore for coverage because we do not currently have a legal FHIR resource data model to be used
    /* istanbul ignore next */
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const containedJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      parseContainedResources(instance, containedJsonArray, sourceField);
    }

    sourceField = 'PractitionerRole.identifier';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Identifier | undefined = parseIdentifier(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addIdentifier(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.active';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, 'boolean');
      const datatype: BooleanType | undefined = parseBooleanType(dtJson, dtSiblingJson);
      instance.setActiveElement(datatype);
    }

    sourceField = 'PractitionerRole.period';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const datatype: Period | undefined = parsePeriod(classJsonObj[fieldName], sourceField);
      instance.setPeriod(datatype);
    }

    sourceField = 'PractitionerRole.practitioner';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const datatype: Reference | undefined = parseReference(classJsonObj[fieldName], sourceField);
      instance.setPractitioner(datatype);
    }

    sourceField = 'PractitionerRole.organization';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const datatype: Reference | undefined = parseReference(classJsonObj[fieldName], sourceField);
      instance.setOrganization(datatype);
    }

    sourceField = 'PractitionerRole.code';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: CodeableConcept | undefined = parseCodeableConcept(
          dataElementJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (datatype !== undefined) {
          instance.addCode(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.specialty';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: CodeableConcept | undefined = parseCodeableConcept(
          dataElementJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (datatype !== undefined) {
          instance.addSpecialty(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.location';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Reference | undefined = parseReference(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addLocation(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.healthcareService';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const dataElementJsonArray: JSON.Array = JSON.asArray(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        classJsonObj[fieldName]!,
        sourceField,
      );
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Reference | undefined = parseReference(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addHealthcareService(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.telecom';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: ContactPoint | undefined = parseContactPoint(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addTelecom(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.availableTime';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const componentJsonArray: JSON.Array = JSON.asArray(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        classJsonObj[fieldName]!,
        sourceField,
      );
      componentJsonArray.forEach((componentJson: JSON.Value) => {
        const component: PractitionerRoleAvailableTimeComponent | undefined =
          PractitionerRoleAvailableTimeComponent.parse(componentJson);
        if (component !== undefined) {
          instance.addAvailableTime(component);
        }
      });
    }

    sourceField = 'PractitionerRole.notAvailable';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const componentJsonArray: JSON.Array = JSON.asArray(
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        classJsonObj[fieldName]!,
        sourceField,
      );
      componentJsonArray.forEach((componentJson: JSON.Value) => {
        const component: PractitionerRoleNotAvailableComponent | undefined =
          PractitionerRoleNotAvailableComponent.parse(componentJson);
        if (component !== undefined) {
          instance.addNotAvailable(component);
        }
      });
    }

    sourceField = 'PractitionerRole.availabilityExceptions';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, 'string');
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      instance.setAvailabilityExceptionsElement(datatype);
    }

    sourceField = 'PractitionerRole.endpoint';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Reference | undefined = parseReference(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addEndpoint(datatype);
        }
      });
    }

    return instance;
  }

  /**
   * PractitionerRole.identifier Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Business Identifiers that are specific to a role/location
   * - **Definition:** Business Identifiers that are specific to a role/location.
   * - **Requirements:** Often, specific identities are assigned for the agent.
   * - **FHIR Type:** `Identifier`
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private identifier?: Identifier[] | undefined;

  /**
   * PractitionerRole.active Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Whether this practitioner role record is in active use
   * - **Definition:** Whether this practitioner role record is in active use.
   * - **Comment:** If this value is false, you may refer to the period to see when the role was in active use. If there is no period specified, no inference can be made about when it was active.
   * - **Requirements:** Need to be able to mark a practitioner role record as not to be used because it was created in error, or otherwise no longer in active use.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private active?: BooleanType | undefined;

  /**
   * PractitionerRole.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The period during which the practitioner is authorized to perform in these role(s)
   * - **Definition:** The period during which the person is authorized to act as a practitioner in these role(s) for the organization.
   * - **Requirements:** Even after the agencies is revoked, the fact that it existed must still be recorded.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private period?: Period | undefined;

  /**
   * PractitionerRole.practitioner Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Practitioner that is able to provide the defined services for the organization
   * - **Definition:** Practitioner that is able to provide the defined services for the organization.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Practitioner' ]
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private practitioner?: Reference | undefined;

  /**
   * PractitionerRole.organization Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Organization where the roles are available
   * - **Definition:** The organization where the Practitioner performs the roles associated.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Organization' ]
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private organization?: Reference | undefined;

  /**
   * PractitionerRole.code Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Roles which this practitioner may perform
   * - **Definition:** Roles which this practitioner is authorized to perform for the organization.
   * - **Comment:** A person may have more than one role.
   * - **Requirements:** Need to know what authority the practitioner has - what can they do?
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private code?: CodeableConcept[] | undefined;

  /**
   * PractitionerRole.specialty Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Specific specialty of the practitioner
   * - **Definition:** Specific specialty of the practitioner.
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private specialty?: CodeableConcept[] | undefined;

  /**
   * PractitionerRole.location Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The location(s) at which this practitioner provides care
   * - **Definition:** The location(s) at which this practitioner provides care.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Location' ]
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private location?: Reference[] | undefined;

  /**
   * PractitionerRole.healthcareService Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The list of healthcare services that this worker provides for this role's Organization/Location(s)
   * - **Definition:** The list of healthcare services that this worker provides for this role's Organization/Location(s).
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/HealthcareService' ]
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private healthcareService?: Reference[] | undefined;

  /**
   * PractitionerRole.telecom Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Contact details that are specific to the role/location/service
   * - **Definition:** Contact details that are specific to the role/location/service.
   * - **Requirements:** Often practitioners have a dedicated line for each location (or service) that they work at, and need to be able to define separate contact details for each of these.
   * - **FHIR Type:** `ContactPoint`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private telecom?: ContactPoint[] | undefined;

  /**
   * PractitionerRole.availableTime Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Times the Service Site is available
   * - **Definition:** A collection of times the practitioner is available or performing this role at the location and/or healthcareservice.
   * - **Comment:** More detailed availability information may be provided in associated Schedule/Slot resources.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private availableTime?: PractitionerRoleAvailableTimeComponent[] | undefined;

  /**
   * PractitionerRole.notAvailable Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Not available during this time due to provided reason
   * - **Definition:** The practitioner is not available or performing this role during this period of time due to the provided reason.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private notAvailable?: PractitionerRoleNotAvailableComponent[] | undefined;

  /**
   * PractitionerRole.availabilityExceptions Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Description of availability exceptions
   * - **Definition:** A description of site availability exceptions, e.g. public holiday availability. Succinctly describing all possible exceptions to normal site availability as details in the available Times and not available Times.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private availabilityExceptions?: StringType | undefined;

  /**
   * PractitionerRole.endpoint Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Technical endpoints providing access to services operated for the practitioner with this role
   * - **Definition:** Technical endpoints providing access to services operated for the practitioner with this role.
   * - **Requirements:** Organizations have multiple systems that provide various services and ,ay also be different for practitioners too. So the endpoint satisfies the need to be able to define the technical connection details for how to connect to them, and for what purpose.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Endpoint' ]
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private endpoint?: Reference[] | undefined;

  /**
   * {@inheritDoc Resource.resourceType}
   */
  public resourceType(): FhirResourceType {
    return this.fhirType() as FhirResourceType;
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
    if (isDefinedList<Identifier>(value)) {
      const optErrMsg = `Invalid PractitionerRole.identifier; Provided value array has an element that is not an instance of Identifier.`;
      assertFhirTypeList<Identifier>(value, Identifier, optErrMsg);
      this.identifier = value;
    } else {
      this.identifier = undefined;
    }
    return this;
  }

  /**
   * Add the provided Identifier value to the `identifier` array property.
   *
   * @param value - the `identifier` value
   * @returns this
   */
  public addIdentifier(value: Identifier | undefined): this {
    if (isDefined<Identifier>(value)) {
      const optErrMsg = `Invalid PractitionerRole.identifier; Provided value is not an instance of Identifier.`;
      assertFhirType<Identifier>(value, Identifier, optErrMsg);
      this.initIdentifier();
      this.identifier?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `identifier` property exists and has a value; `false` otherwise
   */
  public hasIdentifier(): boolean {
    return isDefinedList<Identifier>(this.identifier) && this.identifier.some((item: Identifier) => !item.isEmpty());
  }

  /**
   * Initialize the `identifier` property
   */
  private initIdentifier(): void {
    if (!this.hasIdentifier()) {
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
    if (isDefined<BooleanType>(element)) {
      const optErrMsg = `Invalid PractitionerRole.active; Provided value is not an instance of BooleanType.`;
      assertFhirType<BooleanType>(element, BooleanType, optErrMsg);
      this.active = element;
    } else {
      this.active = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `active` property exists and has a value; `false` otherwise
   */
  public hasActiveElement(): boolean {
    return isDefined<BooleanType>(this.active) && !this.active.isEmpty();
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
    if (isDefined<fhirBoolean>(value)) {
      const optErrMsg = `Invalid PractitionerRole.active (${String(value)})`;
      this.active = new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    } else {
      this.active = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `active` property exists and has a value; `false` otherwise
   */
  public hasActive(): boolean {
    return this.hasActiveElement();
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
    if (isDefined<Period>(value)) {
      const optErrMsg = `Invalid PractitionerRole.period; Provided value is not an instance of Period.`;
      assertFhirType<Period>(value, Period, optErrMsg);
      this.period = value;
    } else {
      this.period = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `period` property exists and has a value; `false` otherwise
   */
  public hasPeriod(): boolean {
    return isDefined<Period>(this.period) && !this.period.isEmpty();
  }

  /**
   * @returns the `practitioner` property value as a Reference object
   */
  public getPractitioner(): Reference {
    return this.practitioner ?? new Reference();
  }

  /**
   * Assigns the provided Reference object value to the `practitioner` property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.practitioner', ['Practitioner'])`
   *
   * @param value - the `practitioner` object value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.practitioner', ['Practitioner'])
  public setPractitioner(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.practitioner = value;
    } else {
      this.practitioner = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `practitioner` property exists and has a value; `false` otherwise
   */
  public hasPractitioner(): boolean {
    return isDefined<Reference>(this.practitioner) && !this.practitioner.isEmpty();
  }

  /**
   * @returns the `organization` property value as a Reference object
   */
  public getOrganization(): Reference {
    return this.organization ?? new Reference();
  }

  /**
   * Assigns the provided Reference object value to the `organization` property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.practitioner', ['Organization'])`
   *
   * @param value - the `organization` object value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.organization', ['Organization'])
  public setOrganization(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.organization = value;
    } else {
      this.organization = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `organization` property exists and has a value; `false` otherwise
   */
  public hasOrganization(): boolean {
    return isDefined<Reference>(this.organization) && !this.organization.isEmpty();
  }

  /**
   * @returns the `code` property value as a CodeableConcept array
   */
  public getCode(): CodeableConcept[] {
    return this.code ?? ([] as CodeableConcept[]);
  }

  /**
   * Assigns the provided CodeableConcept array value to the `code` property.
   *
   * @param value - the `code` array value
   * @returns this
   */
  public setCode(value: CodeableConcept[] | undefined): this {
    if (isDefinedList<CodeableConcept>(value)) {
      const optErrMsg = `Invalid PractitionerRole.code; Provided value array has an element that is not an instance of CodeableConcept.`;
      assertFhirTypeList<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.code = value;
    } else {
      this.code = undefined;
    }
    return this;
  }

  /**
   * Add the provided CodeableConcept value to the `code` array property.
   *
   * @param value - the `code` value
   * @returns this
   */
  public addCode(value: CodeableConcept | undefined): this {
    if (isDefined<CodeableConcept>(value)) {
      const optErrMsg = `Invalid PractitionerRole.code; Provided value is not an instance of CodeableConcept.`;
      assertFhirType<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.initCode();
      this.code?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `code` property exists and has a value; `false` otherwise
   */
  public hasCode(): boolean {
    return isDefinedList<CodeableConcept>(this.code) && this.code.some((item: CodeableConcept) => !item.isEmpty());
  }

  /**
   * Initialize the `code` property
   */
  private initCode(): void {
    if (!this.hasCode()) {
      this.code = [] as CodeableConcept[];
    }
  }

  /**
   * @returns the `specialty` property value as a CodeableConcept array
   */
  public getSpecialty(): CodeableConcept[] {
    return this.specialty ?? ([] as CodeableConcept[]);
  }

  /**
   * Assigns the provided CodeableConcept array value to the `specialty` property.
   *
   * @param value - the `specialty` array value
   * @returns this
   */
  public setSpecialty(value: CodeableConcept[] | undefined): this {
    if (isDefinedList<CodeableConcept>(value)) {
      const optErrMsg = `Invalid PractitionerRole.specialty; Provided value array has an element that is not an instance of CodeableConcept.`;
      assertFhirTypeList<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.specialty = value;
    } else {
      this.specialty = undefined;
    }
    return this;
  }

  /**
   * Add the provided CodeableConcept value to the `specialty` array property.
   *
   * @param value - the `specialty` value
   * @returns this
   */
  public addSpecialty(value: CodeableConcept | undefined): this {
    if (isDefined<CodeableConcept>(value)) {
      const optErrMsg = `Invalid PractitionerRole.specialty; Provided value is not an instance of CodeableConcept.`;
      assertFhirType<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.initSpecialty();
      this.specialty?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `specialty` property exists and has a value; `false` otherwise
   */
  public hasSpecialty(): boolean {
    return (
      isDefinedList<CodeableConcept>(this.specialty) && this.specialty.some((item: CodeableConcept) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `specialty` property
   */
  private initSpecialty(): void {
    if (!this.hasSpecialty()) {
      this.specialty = [] as CodeableConcept[];
    }
  }

  /**
   * @returns the `location` property value as a Reference array
   */
  public getLocation(): Reference[] {
    return this.location ?? ([] as Reference[]);
  }

  /**
   * Assigns the provided Reference array value to the `location` property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.location', ['Location'])`
   *
   * @param value - the `location` array value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.location', ['Location'])
  public setLocation(value: Reference[] | undefined): this {
    if (isDefinedList<Reference>(value)) {
      // assertFhirTypeList<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.location = value;
    } else {
      this.location = undefined;
    }
    return this;
  }

  /**
   * Add the provided Reference value to the `location` array property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.location', ['Location'])`
   *
   * @param value - the `location` value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.location', ['Location'])
  public addLocation(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.initLocation();
      this.location?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `location` property exists and has a value; `false` otherwise
   */
  public hasLocation(): boolean {
    return isDefinedList<Reference>(this.location) && this.location.some((item: Reference) => !item.isEmpty());
  }

  /**
   * Initialize the `location` property
   */
  private initLocation(): void {
    if (!this.hasLocation()) {
      this.location = [] as Reference[];
    }
  }

  /**
   * @returns the `healthcareService` property value as a Reference array
   */
  public getHealthcareService(): Reference[] {
    return this.healthcareService ?? ([] as Reference[]);
  }

  /**
   * Assigns the provided Reference array value to the `healthcareService` property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.healthcareService', ['HealthcareService']`)
   *
   * @param value - the `healthcareService` array value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.healthcareService', ['HealthcareService'])
  public setHealthcareService(value: Reference[] | undefined): this {
    if (isDefinedList<Reference>(value)) {
      // assertFhirTypeList<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.healthcareService = value;
    } else {
      this.healthcareService = undefined;
    }
    return this;
  }

  /**
   * Add the provided Reference value to the `healthcareService` array property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.healthcareService', ['HealthcareService'])`
   *
   * @param value - the `healthcareService` value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.healthcareService', ['HealthcareService'])
  public addHealthcareService(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.initHealthcareService();
      this.healthcareService?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `healthcareService` property exists and has a value; `false` otherwise
   */
  public hasHealthcareService(): boolean {
    return (
      isDefinedList<Reference>(this.healthcareService) &&
      this.healthcareService.some((item: Reference) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `healthcareService` property
   */
  private initHealthcareService(): void {
    if (!this.hasHealthcareService()) {
      this.healthcareService = [] as Reference[];
    }
  }

  /**
   * @returns the `telecom` property value as a ContactPoint array
   */
  public getTelecom(): ContactPoint[] {
    return this.telecom ?? ([] as ContactPoint[]);
  }

  /**
   * Assigns the provided ContactPoint array value to the `telecom` property.
   *
   * @param value - the `telecom` array value
   * @returns this
   */
  public setTelecom(value: ContactPoint[] | undefined): this {
    if (isDefinedList<ContactPoint>(value)) {
      const optErrMsg = `Invalid PractitionerRole.telecom; Provided value array has an element that is not an instance of ContactPoint.`;
      assertFhirTypeList<ContactPoint>(value, ContactPoint, optErrMsg);
      this.telecom = value;
    } else {
      this.telecom = undefined;
    }
    return this;
  }

  /**
   * Add the provided ContactPoint value to the `telecom` array property.
   *
   * @param value - the `telecom` value
   * @returns this
   */
  public addTelecom(value: ContactPoint | undefined): this {
    if (isDefined<ContactPoint>(value)) {
      const optErrMsg = `Invalid PractitionerRole.telecom; Provided value is not an instance of ContactPoint.`;
      assertFhirType<ContactPoint>(value, ContactPoint, optErrMsg);
      this.initTelecom();
      this.telecom?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `telecom` property exists and has a value; `false` otherwise
   */
  public hasTelecom(): boolean {
    return isDefinedList<ContactPoint>(this.telecom) && this.telecom.some((item: ContactPoint) => !item.isEmpty());
  }

  /**
   * Initialize the `identifier` property
   */
  private initTelecom(): void {
    if (!this.hasTelecom()) {
      this.telecom = [] as ContactPoint[];
    }
  }

  /**
   * @returns the `availableTime` property value as a PractitionerRoleAvailableTimeComponent array
   */
  public getAvailableTime(): PractitionerRoleAvailableTimeComponent[] {
    return this.availableTime ?? ([] as PractitionerRoleAvailableTimeComponent[]);
  }

  /**
   * Assigns the provided PractitionerRoleAvailableTimeComponent array value to the `availableTime` property.
   *
   * @param value - the `availableTime` array value
   * @returns this
   */
  public setAvailableTime(value: PractitionerRoleAvailableTimeComponent[] | undefined): this {
    if (isDefinedList<PractitionerRoleAvailableTimeComponent>(value)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime; Provided value array has an element that is not an instance of PractitionerRoleAvailableTimeComponent.`;
      assertFhirTypeList<PractitionerRoleAvailableTimeComponent>(
        value,
        PractitionerRoleAvailableTimeComponent,
        optErrMsg,
      );
      this.availableTime = value;
    } else {
      this.availableTime = undefined;
    }
    return this;
  }

  /**
   * Add the provided PractitionerRoleAvailableTimeComponent value to the `availableTime` array property.
   *
   * @param value - the `availableTime` value
   * @returns this
   */
  public addAvailableTime(value: PractitionerRoleAvailableTimeComponent | undefined): this {
    if (isDefined<PractitionerRoleAvailableTimeComponent>(value)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime; Provided element is not an instance of PractitionerRoleAvailableTimeComponent.`;
      assertFhirType<PractitionerRoleAvailableTimeComponent>(value, PractitionerRoleAvailableTimeComponent, optErrMsg);
      this.initAvailableTime();
      this.availableTime?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `availableTime` property exists and has a value; `false` otherwise
   */
  public hasAvailableTime(): boolean {
    return (
      isDefinedList<PractitionerRoleAvailableTimeComponent>(this.availableTime) &&
      this.availableTime.some((item: PractitionerRoleAvailableTimeComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `availableTime` property
   */
  private initAvailableTime(): void {
    if (this.availableTime === undefined) {
      this.availableTime = [] as PractitionerRoleAvailableTimeComponent[];
    }
  }

  /**
   * @returns the `notAvailable` property value as a PractitionerRoleNotAvailableComponent array
   */
  public getNotAvailable(): PractitionerRoleNotAvailableComponent[] {
    return this.notAvailable ?? ([] as PractitionerRoleNotAvailableComponent[]);
  }

  /**
   * Assigns the provided PractitionerRoleNotAvailableComponent array value to the `notAvailable` property.
   *
   * @param value - the `notAvailable` array value
   * @returns this
   */
  public setNotAvailable(value: PractitionerRoleNotAvailableComponent[] | undefined): this {
    if (isDefinedList<PractitionerRoleNotAvailableComponent>(value)) {
      const optErrMsg = `Invalid PractitionerRole.notAvailable; Provided value array has an element that is not an instance of PractitionerRoleNotAvailableComponent.`;
      assertFhirTypeList<PractitionerRoleNotAvailableComponent>(
        value,
        PractitionerRoleNotAvailableComponent,
        optErrMsg,
      );
      this.notAvailable = value;
    } else {
      this.notAvailable = undefined;
    }
    return this;
  }

  /**
   * Add the provided PractitionerRoleNotAvailableComponent value to the `notAvailable` array property.
   *
   * @param value - the `notAvailable` value
   * @returns this
   */
  public addNotAvailable(value: PractitionerRoleNotAvailableComponent | undefined): this {
    if (isDefined<PractitionerRoleNotAvailableComponent>(value)) {
      const optErrMsg = `Invalid PractitionerRole.notAvailable; Provided element is not an instance of PractitionerRoleNotAvailableComponent.`;
      assertFhirType<PractitionerRoleNotAvailableComponent>(value, PractitionerRoleNotAvailableComponent, optErrMsg);
      this.initNotAvailable();
      this.notAvailable?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `notAvailable` property exists and has a value; `false` otherwise
   */
  public hasNotAvailable(): boolean {
    return (
      isDefinedList<PractitionerRoleNotAvailableComponent>(this.notAvailable) &&
      this.notAvailable.some((item: PractitionerRoleNotAvailableComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `notAvailable` property
   */
  private initNotAvailable(): void {
    if (this.notAvailable === undefined) {
      this.notAvailable = [] as PractitionerRoleNotAvailableComponent[];
    }
  }

  /**
   * @returns the `availabilityExceptions` property value as a PrimitiveType
   */
  public getAvailabilityExceptionsElement(): StringType {
    return this.availabilityExceptions ?? new StringType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `availabilityExceptions` property.
   *
   * @param element - the `availabilityExceptions` value
   * @returns this
   */
  public setAvailabilityExceptionsElement(element: StringType | undefined): this {
    if (isDefined<StringType>(element)) {
      const optErrMsg = `Invalid PractitionerRole.availabilityExceptions; Provided element is not an instance of StringType.`;
      assertFhirType<StringType>(element, StringType, optErrMsg);
      this.availabilityExceptions = element;
    } else {
      this.availabilityExceptions = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `availabilityExceptions` property exists and has a value; `false` otherwise
   */
  public hasAvailabilityExceptionsElement(): boolean {
    return isDefined<StringType>(this.availabilityExceptions) && !this.availabilityExceptions.isEmpty();
  }

  /**
   * @returns the `availabilityExceptions` property value as a primitive value
   */
  public getAvailabilityExceptions(): fhirString | undefined {
    return this.availabilityExceptions?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `availabilityExceptions` property.
   *
   * @param value - the `availabilityExceptions` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setAvailabilityExceptions(value: fhirString | undefined): this {
    if (isDefined<fhirString>(value)) {
      const optErrMsg = `Invalid PractitionerRole.availabilityExceptions`;
      this.availabilityExceptions = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    } else {
      this.availabilityExceptions = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `availabilityExceptions` property exists and has a value; `false` otherwise
   */
  public hasAvailabilityExceptions(): boolean {
    return this.hasAvailabilityExceptionsElement();
  }

  /**
   * @returns the `endpoint` property value as a Reference array
   */
  public getEndpoint(): Reference[] {
    return this.endpoint ?? ([] as Reference[]);
  }

  /**
   * Assigns the provided Reference array value to the `endpoint` property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.endpoint', ['Endpoint'])`
   *
   * @param value - the `endpoint` array value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.endpoint', ['Endpoint'])
  public setEndpoint(value: Reference[] | undefined): this {
    if (isDefinedList<Reference>(value)) {
      // assertFhirTypeList<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.endpoint = value;
    } else {
      this.endpoint = undefined;
    }
    return this;
  }

  /**
   * Add the provided Reference value to the `endpoint` array property.
   *
   * @decorator `@ReferenceTargets('PractitionerRole.endpoint', ['Endpoint'])`
   *
   * @param value - the `endpoint` value
   * @returns this
   */
  @ReferenceTargets('PractitionerRole.endpoint', ['Endpoint'])
  public addEndpoint(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.initEndpoint();
      this.endpoint?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `endpoint` property exists and has a value; `false` otherwise
   */
  public hasEndpoint(): boolean {
    return isDefinedList<Reference>(this.endpoint) && this.endpoint.some((item: Reference) => !item.isEmpty());
  }

  /**
   * Initialize the `endpoint` property
   */
  private initEndpoint(): void {
    if (!this.hasEndpoint()) {
      this.endpoint = [] as Reference[];
    }
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'PractitionerRole';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(
        this.identifier,
        this.active,
        this.period,
        this.practitioner,
        this.organization,
        this.code,
        this.specialty,
        this.location,
        this.healthcareService,
        this.telecom,
        this.availableTime,
        this.notAvailable,
        this.availabilityExceptions,
        this.endpoint,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): PractitionerRole {
    const dest = new PractitionerRole();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: PractitionerRole): void {
    super.copyValues(dest);
    const identifierList = copyListValues<Identifier>(this.identifier);
    dest.identifier = identifierList.length === 0 ? undefined : identifierList;
    dest.active = this.active?.copy();
    dest.period = this.period?.copy();
    dest.practitioner = this.practitioner?.copy();
    dest.organization = this.organization?.copy();
    const codeList = copyListValues<CodeableConcept>(this.code);
    dest.code = codeList.length === 0 ? undefined : codeList;
    const specialtyList = copyListValues<CodeableConcept>(this.specialty);
    dest.specialty = specialtyList.length === 0 ? undefined : specialtyList;
    const locationList = copyListValues<Reference>(this.location);
    dest.location = locationList.length === 0 ? undefined : locationList;
    const healthcareServiceList = copyListValues<Reference>(this.healthcareService);
    dest.healthcareService = healthcareServiceList.length === 0 ? undefined : healthcareServiceList;
    const telecomList = copyListValues<ContactPoint>(this.telecom);
    dest.telecom = telecomList.length === 0 ? undefined : telecomList;
    const availableTimeList = copyListValues<PractitionerRoleAvailableTimeComponent>(this.availableTime);
    dest.availableTime = availableTimeList.length === 0 ? undefined : availableTimeList;
    const notAvailableList = copyListValues<PractitionerRoleNotAvailableComponent>(this.notAvailable);
    dest.notAvailable = notAvailableList.length === 0 ? undefined : notAvailableList;
    dest.availabilityExceptions = this.availabilityExceptions?.copy();
    const endpointList = copyListValues<Reference>(this.endpoint);
    dest.endpoint = endpointList.length === 0 ? undefined : endpointList;
  }

  /**
   * {@inheritDoc IBase.toJSON}
   */
  public override toJSON(): JSON.Value | undefined {
    if (this.isEmpty()) {
      return undefined;
    }
    // Will always have, at least, the 'resourceType' property from Resource
    const jsonObj = super.toJSON() as JSON.Object;

    if (this.hasIdentifier()) {
      setFhirComplexListJson(this.getIdentifier(), 'identifier', jsonObj);
    }

    if (this.hasActiveElement()) {
      setFhirPrimitiveJson<fhirBoolean>(this.getActiveElement(), 'active', jsonObj);
    }

    if (this.hasPeriod()) {
      setFhirComplexJson(this.getPeriod(), 'period', jsonObj);
    }

    if (this.hasPractitioner()) {
      setFhirComplexJson(this.getPractitioner(), 'practitioner', jsonObj);
    }

    if (this.hasOrganization()) {
      setFhirComplexJson(this.getOrganization(), 'organization', jsonObj);
    }

    if (this.hasCode()) {
      setFhirComplexListJson(this.getCode(), 'code', jsonObj);
    }

    if (this.hasSpecialty()) {
      setFhirComplexListJson(this.getSpecialty(), 'specialty', jsonObj);
    }

    if (this.hasLocation()) {
      setFhirComplexListJson(this.getLocation(), 'location', jsonObj);
    }

    if (this.hasHealthcareService()) {
      setFhirComplexListJson(this.getHealthcareService(), 'healthcareService', jsonObj);
    }

    if (this.hasTelecom()) {
      setFhirComplexListJson(this.getTelecom(), 'telecom', jsonObj);
    }

    if (this.hasAvailableTime()) {
      setFhirBackboneElementListJson(this.getAvailableTime(), 'availableTime', jsonObj);
    }

    if (this.hasNotAvailable()) {
      setFhirBackboneElementListJson(this.getNotAvailable(), 'notAvailable', jsonObj);
    }

    if (this.hasAvailabilityExceptionsElement()) {
      setFhirPrimitiveJson<fhirString>(this.getAvailabilityExceptionsElement(), 'availabilityExceptions', jsonObj);
    }

    if (this.hasEndpoint()) {
      setFhirComplexListJson(this.getEndpoint(), 'endpoint', jsonObj);
    }

    // jsonObj will always have, at least, the 'resourceType' property from Resource.
    // If that is all jsonObj has, return undefined.
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

/**
 * PractitionerRoleAvailableTimeComponent Subclass for `PractitionerRole.availableTime`
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** Times the Service Site is available
 * - **Definition:** A collection of times the practitioner is available or performing this role at the location and/or healthcareservice.
 * - **Comment:** More detailed availability information may be provided in associated Schedule/Slot resources.
 *
 * @category Resource Models
 * @see [FHIR PractitionerRole](http://hl7.org/fhir/StructureDefinition/PractitionerRole)
 */
export class PractitionerRoleAvailableTimeComponent extends BackboneElement {
  constructor() {
    super();

    this.daysOfWeekEnum = new DaysOfWeekEnum();
  }

  /**
   * Parse the provided `PractitionerRole.availableTime` json to instantiate the PractitionerRoleAvailableTimeComponent data model.
   *
   * @param sourceJson - JSON representing FHIR `PractitionerRole.availableTime`
   * @returns PractitionerRoleAvailableTimeComponent data model or undefined for `PractitionerRole.availableTime`
   */
  public static parse(sourceJson: JSON.Value): PractitionerRoleAvailableTimeComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const backboneJsonObj: JSON.Object = JSON.asObject(sourceJson, `PractitionerRoleAvailableTimeComponent JSON`);
    const instance = new PractitionerRoleAvailableTimeComponent();
    processBackboneElementJson(instance, backboneJsonObj);

    let sourceField = 'PractitionerRole.availableTime.daysOfWeek';
    let fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const dataJsonArray: PrimitiveTypeJson[] = getPrimitiveTypeListJson(
        backboneJsonObj,
        sourceField,
        fieldName,
        'string',
      );
      dataJsonArray.forEach((dataJson: PrimitiveTypeJson) => {
        const datatype: CodeType | undefined = parseCodeType(dataJson.dtJson, dataJson.dtSiblingJson);
        if (datatype !== undefined) {
          instance.addDaysOfWeekElement(datatype);
        }
      });
    }

    sourceField = 'PractitionerRole.availableTime.allDay';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'boolean');
      const datatype: BooleanType | undefined = parseBooleanType(dtJson, dtSiblingJson);
      instance.setAllDayElement(datatype);
    }

    sourceField = 'PractitionerRole.availableTime.availableStartTime';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'string');
      const datatype: TimeType | undefined = parseTimeType(dtJson, dtSiblingJson);
      instance.setAvailableStartTimeElement(datatype);
    }

    sourceField = 'PractitionerRole.availableTime.availableEndTime';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'string');
      const datatype: TimeType | undefined = parseTimeType(dtJson, dtSiblingJson);
      instance.setAvailableEndTimeElement(datatype);
    }

    return instance;
  }

  /**
   * FHIR CodeSystem: DaysOfWeek
   *
   * @see {@link DaysOfWeekEnum}
   */
  private readonly daysOfWeekEnum: DaysOfWeekEnum;

  /**
   * PractitionerRole.availableTime.daysOfWeek Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** mon | tue | wed | thu | fri | sat | sun
   * - **Definition:** Indicates which days of the week are available between the start and end Times.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private daysOfWeek?: EnumCodeType[] | undefined;

  /**
   * PractitionerRole.availableTime.allDay Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Always available? e.g. 24 hour service
   * - **Definition:** Is this always available? (hence times are irrelevant) e.g. 24 hour service.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private allDay?: BooleanType | undefined;

  /**
   * PractitionerRole.availableTime.availableStartTime Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Opening time of day (ignored if allDay = true)
   * - **Definition:** The opening time of day. Note: If the AllDay flag is set, then this time is ignored.
   * - **Comment:** The timezone is expected to be for where this HealthcareService is provided at.
   * - **FHIR Type:** `time`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private availableStartTime?: TimeType | undefined;

  /**
   * PractitionerRole.availableTime.availableEndTime Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** "Closing time of day (ignored if allDay = true)
   * - **Definition:** The closing time of day. Note: If the AllDay flag is set, then this time is ignored.
   * - **Comment:** The timezone is expected to be for where this HealthcareService is provided at.
   * - **FHIR Type:** `time`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private availableEndTime?: TimeType | undefined;

  /**
   * @returns the `daysOfWeek` property value as a EnumCodeType array
   */
  public getDaysOfWeekEnumType(): EnumCodeType[] {
    return this.daysOfWeek ?? ([] as EnumCodeType[]);
  }

  /**
   * Assigns the provided EnumCodeType array value to the `daysOfWeek` property.
   *
   * @param enumTypes - the `daysOfWeek` array value
   * @returns this
   */
  public setDaysOfWeekEnumType(enumTypes: EnumCodeType[] | undefined): this {
    if (isDefinedList<EnumCodeType>(enumTypes)) {
      const errMsgPrefix = `Invalid PractitionerRole.availableTime.daysOfWeek`;
      assertEnumCodeTypeList<DaysOfWeekEnum>(enumTypes, DaysOfWeekEnum, errMsgPrefix);
      this.daysOfWeek = enumTypes;
    } else {
      this.daysOfWeek = undefined;
    }
    return this;
  }

  /**
   * Add the provided EnumCodeType value to the `daysOfWeek` array property.
   *
   * @param enumType - the `daysOfWeek` value
   * @returns this
   */
  public addDaysOfWeekEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = `Invalid PractitionerRole.availableTime.daysOfWeek`;
      assertEnumCodeType<DaysOfWeekEnum>(enumType, DaysOfWeekEnum, errMsgPrefix);
      this.initDaysOfWeek();
      this.daysOfWeek?.push(enumType);
    }
    return this;
  }

  /**
   * @returns `true` if the `daysOfWeek` property exists and has a value; `false` otherwise
   */
  public hasDaysOfWeekEnumType(): boolean {
    return (
      isDefinedList<EnumCodeType>(this.daysOfWeek) &&
      this.daysOfWeek.some((item: EnumCodeType) => !item.isEmpty()) &&
      this.daysOfWeek.every((item: EnumCodeType) => item.fhirCodeEnumeration.length > 0)
    );
  }

  /**
   * @returns the `daysOfWeek` property value as a PrimitiveType array
   */
  public getDaysOfWeekElement(): CodeType[] {
    if (this.daysOfWeek === undefined) {
      return [] as CodeType[];
    }
    return this.daysOfWeek as CodeType[];
  }

  /**
   * Assigns the provided PrimitiveType array value to the `daysOfWeek` property.
   *
   * @param elements - the `daysOfWeek` array value
   * @returns this
   */
  public setDaysOfWeekElement(elements: CodeType[] | undefined): this {
    if (isDefinedList<CodeType>(elements)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.daysOfWeek; Provided element array has an element that is not an instance of CodeType.`;
      assertFhirTypeList<CodeType>(elements, CodeType, optErrMsg);
      const enumCodeTypes = [] as EnumCodeType[];
      elements.forEach((type: CodeType) => {
        enumCodeTypes.push(new EnumCodeType(type, this.daysOfWeekEnum));
      });
      this.daysOfWeek = enumCodeTypes;
    } else {
      this.daysOfWeek = undefined;
    }
    return this;
  }

  /**
   * Add the provided PrimitiveType value to the `daysOfWeek` array property.
   *
   * @param element - the `daysOfWeek` value
   * @returns this
   */
  public addDaysOfWeekElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.daysOfWeek; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.initDaysOfWeek();
      this.daysOfWeek?.push(new EnumCodeType(element, this.daysOfWeekEnum));
    }
    return this;
  }

  /**
   * @returns `true` if the `daysOfWeek` property exists and has a value; `false` otherwise
   */
  public hasDaysOfWeekElement(): boolean {
    return this.hasDaysOfWeekEnumType();
  }

  /**
   * @returns the `daysOfWeek` property value as a primitive value array
   */
  public getDaysOfWeek(): fhirCode[] {
    if (this.daysOfWeek === undefined) {
      return [] as fhirCode[];
    }
    const values = [] as fhirCode[];
    for (const item of this.daysOfWeek) {
      values.push(item.fhirCode.code);
    }
    return values;
  }

  /**
   * Assigns the provided primitive value array to the `daysOfWeek` property.
   *
   * @param values - the `daysOfWeek` value array
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setDaysOfWeek(values: fhirCode[] | undefined): this {
    if (isDefinedList<fhirCode>(values)) {
      const enumCodeTypes = [] as EnumCodeType[];
      const optErrMsg = `Invalid PractitionerRole.availableTime.daysOfWeek; Provided value is not an instance of fhirCode.`;
      values.forEach((value: fhirCode) => {
        enumCodeTypes.push(
          new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.daysOfWeekEnum),
        );
      });
      this.daysOfWeek = enumCodeTypes;
    } else {
      this.daysOfWeek = undefined;
    }
    return this;
  }

  /**
   * Add the provided primitive value to the `daysOfWeek` array property.
   *
   * @param value - the `daysOfWeek` value
   * @returns this
   */
  public addDaysOfWeek(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      this.initDaysOfWeek();
      const optErrMsg = `Invalid PractitionerRole.availableTime.daysOfWeek; Provided value is not an instance of fhirCode.`;
      this.daysOfWeek?.push(
        new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.daysOfWeekEnum),
      );
    }
    return this;
  }

  /**
   * @returns `true` if the `profile` property exists and has a value; `false` otherwise
   */
  public hasDaysOfWeek(): boolean {
    return this.hasDaysOfWeekEnumType();
  }

  /**
   * Initialize the profile property
   */
  private initDaysOfWeek(): void {
    if (this.daysOfWeek === undefined) {
      this.daysOfWeek = [] as EnumCodeType[];
    }
  }

  /**
   * @returns the `allDay` property value as a PrimitiveType
   */
  public getAllDayElement(): BooleanType {
    return this.allDay ?? new BooleanType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `allDay` property.
   *
   * @param element - the `allDay` value
   * @returns this
   */
  public setAllDayElement(element: BooleanType | undefined): this {
    if (isDefined<BooleanType>(element)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.allDay; Provided value is not an instance of BooleanType.`;
      assertFhirType<BooleanType>(element, BooleanType, optErrMsg);
      this.allDay = element;
    } else {
      this.allDay = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `allDay` property exists and has a value; `false` otherwise
   */
  public hasAllDayElement(): boolean {
    return isDefined<BooleanType>(this.allDay) && !this.allDay.isEmpty();
  }

  /**
   * @returns the `allDay` property value as a primitive value
   */
  public getAllDay(): fhirBoolean | undefined {
    return this.allDay?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `allDay` property.
   *
   * @param value - the `allDay` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setAllDay(value: fhirBoolean | undefined): this {
    if (isDefined<fhirBoolean>(value)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.allDay (${String(value)})`;
      this.allDay = new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    } else {
      this.allDay = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `allDay` property exists and has a value; `false` otherwise
   */
  public hasAllDay(): boolean {
    return this.hasAllDayElement();
  }

  /**
   * @returns the `availableStartTime` property value as a PrimitiveType
   */
  public getAvailableStartTimeElement(): TimeType {
    return this.availableStartTime ?? new TimeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `availableStartTime` property.
   *
   * @param element - the `availableStartTime` value
   * @returns this
   */
  public setAvailableStartTimeElement(element: TimeType | undefined): this {
    if (isDefined<TimeType>(element)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.availableStartTime; Provided value is not an instance of TimeType.`;
      assertFhirType<TimeType>(element, TimeType, optErrMsg);
      this.availableStartTime = element;
    } else {
      this.availableStartTime = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `availableStartTime` property exists and has a value; `false` otherwise
   */
  public hasAvailableStartTimeElement(): boolean {
    return isDefined<TimeType>(this.availableStartTime) && !this.availableStartTime.isEmpty();
  }

  /**
   * @returns the `availableStartTime` property value as a primitive value
   */
  public getAvailableStartTime(): fhirTime | undefined {
    return this.availableStartTime?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `availableStartTime` property.
   *
   * @param value - the `availableStartTime` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setAvailableStartTime(value: fhirTime | undefined): this {
    if (isDefined<fhirTime>(value)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.availableStartTime (${String(value)})`;
      this.availableStartTime = new TimeType(parseFhirPrimitiveData(value, fhirTimeSchema, optErrMsg));
    } else {
      this.availableStartTime = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `availableStartTime` property exists and has a value; `false` otherwise
   */
  public hasAvailableStartTime(): boolean {
    return this.hasAvailableStartTimeElement();
  }

  /**
   * @returns the `availableEndTime` property value as a PrimitiveType
   */
  public getAvailableEndTimeElement(): TimeType {
    return this.availableEndTime ?? new TimeType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `availableEndTime` property.
   *
   * @param element - the `availableEndTime` value
   * @returns this
   */
  public setAvailableEndTimeElement(element: TimeType | undefined): this {
    if (isDefined<TimeType>(element)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.availableEndTime; Provided value is not an instance of TimeType.`;
      assertFhirType<TimeType>(element, TimeType, optErrMsg);
      this.availableEndTime = element;
    } else {
      this.availableEndTime = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `availableEndTime` property exists and has a value; `false` otherwise
   */
  public hasAvailableEndTimeElement(): boolean {
    return isDefined<TimeType>(this.availableEndTime) && !this.availableEndTime.isEmpty();
  }

  /**
   * @returns the `availableEndTime` property value as a primitive value
   */
  public getAvailableEndTime(): fhirTime | undefined {
    return this.availableEndTime?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `availableEndTime` property.
   *
   * @param value - the `availableEndTime` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setAvailableEndTime(value: fhirTime | undefined): this {
    if (isDefined<fhirTime>(value)) {
      const optErrMsg = `Invalid PractitionerRole.availableTime.availableEndTime (${String(value)})`;
      this.availableEndTime = new TimeType(parseFhirPrimitiveData(value, fhirTimeSchema, optErrMsg));
    } else {
      this.availableEndTime = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `availableEndTime` property exists and has a value; `false` otherwise
   */
  public hasAvailableEndTime(): boolean {
    return this.hasAvailableEndTimeElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'PractitionerRole.availableTime';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() && isElementEmpty(this.daysOfWeek, this.allDay, this.availableStartTime, this.availableEndTime)
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): PractitionerRoleAvailableTimeComponent {
    const dest = new PractitionerRoleAvailableTimeComponent();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: PractitionerRoleAvailableTimeComponent): void {
    super.copyValues(dest);
    const daysOfWeekList = copyListValues<EnumCodeType>(this.daysOfWeek);
    dest.daysOfWeek = daysOfWeekList.length === 0 ? undefined : daysOfWeekList;
    dest.allDay = this.allDay?.copy();
    dest.availableStartTime = this.availableStartTime?.copy();
    dest.availableEndTime = this.availableEndTime?.copy();
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

    if (this.hasDaysOfWeekElement()) {
      setFhirPrimitiveListJson<fhirCode>(this.getDaysOfWeekElement(), 'daysOfWeek', jsonObj);
    }

    if (this.hasAllDayElement()) {
      setFhirPrimitiveJson<fhirBoolean>(this.getAllDayElement(), 'allDay', jsonObj);
    }

    if (this.hasAvailableStartTimeElement()) {
      setFhirPrimitiveJson<fhirTime>(this.getAvailableStartTimeElement(), 'availableStartTime', jsonObj);
    }

    if (this.hasAvailableEndTimeElement()) {
      setFhirPrimitiveJson<fhirTime>(this.getAvailableEndTimeElement(), 'availableEndTime', jsonObj);
    }

    return jsonObj;
  }
}

/**
 * PractitionerRoleNotAvailableComponent Subclass for `PractitionerRole.notAvailable`
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** Not available during this time due to provided reason
 * - **Definition:** The practitioner is not available or performing this role during this period of time due to the provided reason.
 *
 * @category Resource Models
 * @see [FHIR PractitionerRole](http://hl7.org/fhir/StructureDefinition/PractitionerRole)
 */
export class PractitionerRoleNotAvailableComponent extends BackboneElement {
  /**
   * @param description - Reason presented to the user explaining why time not available
   */
  constructor(description: StringType | fhirString | null) {
    super();

    this.description = null;
    if (isDefined<StringType | fhirString>(description)) {
      if (description instanceof PrimitiveType) {
        this.setDescriptionElement(description);
      } else {
        this.setDescription(description);
      }
    }
  }

  /**
   * Parse the provided `PractitionerRole.notAvailable` json to instantiate the PractitionerRoleNotAvailableComponent data model.
   *
   * @param sourceJson - JSON representing FHIR `PractitionerRole.notAvailable`
   * @returns PractitionerRoleNotAvailableComponent data model or undefined for `PractitionerRole.notAvailable`
   */
  public static parse(sourceJson: JSON.Value): PractitionerRoleNotAvailableComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const backboneJsonObj: JSON.Object = JSON.asObject(sourceJson, `PractitionerRoleNotAvailableComponent JSON`);
    const instance = new PractitionerRoleNotAvailableComponent(null);
    processBackboneElementJson(instance, backboneJsonObj);

    const missingReqdProperties: string[] = [];

    let sourceField = 'PractitionerRole.notAvailable.description';
    let fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'string');
      const datatype: StringType | undefined = parseStringType(dtJson, dtSiblingJson);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setDescriptionElement(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    sourceField = 'PractitionerRole.notAvailable.during';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: Period | undefined = parsePeriod(backboneJsonObj[fieldName], sourceField);
      instance.setDuring(datatype);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  /**
   * PractitionerRole.notAvailable.description Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Reason presented to the user explaining why time not available
   * - **Definition:** The reason that can be presented to the user as to why this time is not available.
   * - **FHIR Type:** `string`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private description: StringType | null;

  /**
   * PractitionerRole.notAvailable.during Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Service not available from this date
   * - **Definition:** Service is not available (seasonally or for a public holiday) from this date.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private during?: Period | undefined;

  /**
   * @returns the `description` property value as a PrimitiveType
   */
  public getDescriptionElement(): StringType | null {
    return this.description;
  }

  /**
   * Assigns the provided PrimitiveType value to the `description` property.
   *
   * @param element - the `description` value
   * @returns this
   */
  public setDescriptionElement(element: StringType): this {
    assertIsDefined<StringType>(element, `PractitionerRole.notAvailable.description is required`);
    const optErrMsg = `Invalid PractitionerRole.notAvailable.description; Provided value is not an instance of StringType.`;
    assertFhirType<StringType>(element, StringType, optErrMsg);
    this.description = element;
    return this;
  }

  /**
   * @returns `true` if the `description` property exists and has a value; `false` otherwise
   */
  public hasDescriptionElement(): boolean {
    return isDefined<StringType>(this.description) && !this.description.isEmpty();
  }

  /**
   * @returns the `description` property value as a primitive value
   */
  /**
   * @returns the `description` property value as a primitive value
   */
  public getDescription(): fhirString | null {
    if (this.description?.getValue() === undefined) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.description.getValue()!;
  }

  /**
   * Assigns the provided primitive value to the `description` property.
   *
   * @param value - the `description` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setDescription(value: fhirString): this {
    assertIsDefined<fhirString>(value, `PractitionerRole.notAvailable.description is required`);
    const optErrMsg = `Invalid PractitionerRole.notAvailable.description`;
    this.description = new StringType(parseFhirPrimitiveData(value, fhirStringSchema, optErrMsg));
    return this;
  }

  /**
   * @returns `true` if the `description` property exists and has a value; `false` otherwise
   */
  public hasDescription(): boolean {
    return this.hasDescriptionElement();
  }

  /**
   * @returns the `during` property value as a Period object
   */
  public getDuring(): Period {
    return this.during ?? new Period();
  }

  /**
   * Assigns the provided Period object value to the `during` property.
   *
   * @param value - the `during` object value
   * @returns this
   */
  public setDuring(value: Period | undefined): this {
    if (isDefined<Period>(value)) {
      const optErrMsg = `Invalid PractitionerRole.notAvailable.during; Provided value is not an instance of Period.`;
      assertFhirType<Period>(value, Period, optErrMsg);
      this.during = value;
    } else {
      this.during = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `during` property exists and has a value; `false` otherwise
   */
  public hasDuring(): boolean {
    return isDefined<Period>(this.during) && !this.during.isEmpty();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'PractitionerRole.notAvailable';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.description, this.during);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): PractitionerRoleNotAvailableComponent {
    const dest = new PractitionerRoleNotAvailableComponent(this.description);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: PractitionerRoleNotAvailableComponent): void {
    super.copyValues(dest);
    dest.description = this.description ? this.description.copy() : null;
    dest.during = this.during?.copy();
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
    if (jsonObj === undefined) {
      jsonObj = {} as JSON.Object;
    }

    const missingReqdProperties: string[] = [];

    if (this.hasDescriptionElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirString>(this.getDescriptionElement()!, 'description', jsonObj);
    } else {
      missingReqdProperties.push(`PractitionerRole.notAvailable.description`);
    }

    if (this.hasDuring()) {
      setFhirComplexJson(this.getDuring(), 'during', jsonObj);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
