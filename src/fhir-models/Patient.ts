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

import { IBase } from '@src/fhir-core/base-models/IBase';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import {
  BackboneElement,
  DataType,
  setFhirBackboneElementListJson,
  setFhirComplexJson,
  setFhirComplexListJson,
  setFhirPrimitiveJson,
  setPolymorphicValueJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { AdministrativeGenderEnum } from '@src/fhir-models/code-systems/AdministrativeGenderEnum';
import { LinkTypeEnum } from '@src/fhir-models/code-systems/LinkTypeEnum';
import { Address } from '@src/fhir-core/data-types/complex/Address';
import { Attachment } from '@src/fhir-core/data-types/complex/Attachment';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { DateTimeType } from '@src/fhir-core/data-types/primitive/DateTimeType';
import { CodeableConcept } from '@src/fhir-core/data-types/complex/CodeableConcept';
import { ContactPoint } from '@src/fhir-core/data-types/complex/ContactPoint';
import { DateType } from '@src/fhir-core/data-types/primitive/DateType';
import { HumanName } from '@src/fhir-core/data-types/complex/HumanName';
import { Identifier, Reference, ReferenceTargets } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import {
  assertEnumCodeType,
  CodeType,
  constructorCodeValueAsEnumCodeType,
  EnumCodeType,
} from '@src/fhir-core/data-types/primitive/CodeType';
import {
  fhirBoolean,
  fhirBooleanSchema,
  fhirCode,
  fhirCodeSchema,
  fhirDate,
  fhirDateSchema,
  parseFhirPrimitiveData,
} from '@src/fhir-core/data-types/primitive/primitive-types';
import { REQUIRED_PROPERTIES_DO_NOT_EXIST, REQUIRED_PROPERTIES_REQD_IN_JSON } from '@src/fhir-core/constants';
import { isEmpty } from '@src/fhir-core/utility/common-util';
import { ChoiceDataTypes, ChoiceDataTypesMeta } from '@src/fhir-core/utility/decorators';
import { copyListValues, extractFieldName, isElementEmpty } from '@src/fhir-core/utility/fhir-util';
import {
  assertFhirResourceTypeJson,
  getPrimitiveTypeJson,
  parseAddress,
  parseAttachment,
  parseBooleanType,
  parseCodeableConcept,
  parseCodeType,
  parseContactPoint,
  parseDateType,
  parseHumanName,
  parseIdentifier,
  parsePeriod,
  parsePolymorphicDataType,
  parseReference,
  processBackboneElementJson,
  processDomainResourceJson,
} from '@src/fhir-core/utility/fhir-parsers';
import {
  assertFhirType,
  assertFhirTypeList,
  assertIsDefined,
  isDefined,
  isDefinedList,
} from '@src/fhir-core/utility/type-guards';
import { parseContainedResources } from '@src/fhir-models/fhir-contained-resource-parser';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { FhirError } from '@src/fhir-core/errors/FhirError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Patient Class
 *
 * @remarks
 * Demographics and other administrative information about an individual or animal receiving care or other health-related services.
 *
 * racking patient is the center of the healthcare process.
 *
 * **FHIR Specification**
 * - **Short:** Information about an individual or animal receiving health care services
 * - **Definition:** Demographics and other administrative information about an individual or animal receiving care or other health-related services.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Patient
 *
 * @category Resource Models
 * @see [FHIR Patient](http://hl7.org/fhir/StructureDefinition/Patient)
 */
export class Patient extends DomainResource implements IBase {
  constructor() {
    super();

    this.administrativeGenderEnum = new AdministrativeGenderEnum();
  }

  /**
   * Parse the provided `Patient` json to instantiate the Patient data model.
   *
   * @param sourceJson - JSON representing FHIR `Patient`
   * @returns Patient data model or undefined for `Patient`
   */
  public static override parse(sourceJson: JSON.Object): Patient | undefined {
    if (!isDefined<JSON.Object>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const classJsonObj: JSON.Object = JSON.asObject(sourceJson, `Patient JSON`);
    assertFhirResourceTypeJson(classJsonObj, 'Patient');
    const instance = new Patient();
    processDomainResourceJson(instance, classJsonObj);

    // NOTE: Added IF and ONLY IF a choice data type is used
    const classMetadata: DecoratorMetadataObject | null = Patient[Symbol.metadata];
    const errorMessage = `DecoratorMetadataObject does not exist for Patient`;
    assertIsDefined<DecoratorMetadataObject>(classMetadata, errorMessage);

    // NOTE: "contained" is handled in Resource-based FHIR model rather than in processDomainResourceJson above
    //       to minimize circular references!
    let sourceField = 'Patient.contained';
    let fieldName = extractFieldName(sourceField);
    // Ignore for coverage because we do not currently have a legal FHIR resource data model to be used
    /* istanbul ignore next */
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const containedJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      parseContainedResources(instance, containedJsonArray, sourceField);
    }

    sourceField = 'Patient.identifier';
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

    sourceField = 'Patient.active';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, 'boolean');
      const datatype: BooleanType | undefined = parseBooleanType(dtJson, dtSiblingJson);
      instance.setActiveElement(datatype);
    }

    sourceField = 'Patient.name';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: HumanName | undefined = parseHumanName(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addName(datatype);
        }
      });
    }

    sourceField = 'Patient.telecom';
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

    sourceField = 'Patient.gender';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, 'string');
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setGenderElement(datatype);
    }

    sourceField = 'Patient.birthDate';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(classJsonObj, sourceField, fieldName, 'string');
      const datatype: DateType | undefined = parseDateType(dtJson, dtSiblingJson);
      instance.setBirthDateElement(datatype);
    }

    sourceField = 'Patient.deceased[x]';
    fieldName = extractFieldName(sourceField);
    const deceased: DataType | undefined = parsePolymorphicDataType(
      classJsonObj,
      sourceField,
      fieldName,
      classMetadata,
    );
    instance.setDeceased(deceased);

    sourceField = 'Patient.address';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Address | undefined = parseAddress(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addAddress(datatype);
        }
      });
    }

    sourceField = 'Patient.maritalStatus';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const datatype: CodeableConcept | undefined = parseCodeableConcept(classJsonObj[fieldName], sourceField);
      instance.setMaritalStatus(datatype);
    }

    sourceField = 'Patient.multipleBirth[x]';
    fieldName = extractFieldName(sourceField);
    const multipleBirth: DataType | undefined = parsePolymorphicDataType(
      classJsonObj,
      sourceField,
      fieldName,
      classMetadata,
    );
    instance.setMultipleBirth(multipleBirth);

    sourceField = 'Patient.photo';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Attachment | undefined = parseAttachment(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addPhoto(datatype);
        }
      });
    }

    sourceField = 'Patient.contact';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value) => {
        const component: PatientContactComponent | undefined = PatientContactComponent.parse(componentJson);
        if (component !== undefined) {
          instance.addContact(component);
        }
      });
    }

    sourceField = 'Patient.communication';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value) => {
        const component: PatientCommunicationComponent | undefined = PatientCommunicationComponent.parse(componentJson);
        if (component !== undefined) {
          instance.addCommunication(component);
        }
      });
    }

    sourceField = 'Patient.generalPractitioner';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: Reference | undefined = parseReference(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addGeneralPractitioner(datatype);
        }
      });
    }

    sourceField = 'Patient.managingOrganization';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      const datatype: Reference | undefined = parseReference(classJsonObj[fieldName], sourceField);
      instance.setManagingOrganization(datatype);
    }

    sourceField = 'Patient.link';
    fieldName = extractFieldName(sourceField);
    if (fieldName in classJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const componentJsonArray: JSON.Array = JSON.asArray(classJsonObj[fieldName]!, sourceField);
      componentJsonArray.forEach((componentJson: JSON.Value) => {
        const component: PatientLinkComponent | undefined = PatientLinkComponent.parse(componentJson);
        if (component !== undefined) {
          instance.addLink(component);
        }
      });
    }

    return instance;
  }

  /**
   * FHIR CodeSystem: AdministrativeGender
   *
   * @see {@link AdministrativeGenderEnum}
   */
  private readonly administrativeGenderEnum: AdministrativeGenderEnum;

  /**
   * Patient.identifier Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** An identifier for this patient
   * - **Definition:** An identifier for this patient.
   * - **Requirements:** Patients are almost always assigned specific numerical identifiers.
   * - **FHIR Type:** `Identifier`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private identifier?: Identifier[] | undefined;

  /**
   * Patient.active Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Whether this patient's record is in active use
   * - **Definition:** Whether this patient record is in active use. Many systems use this property to mark as non-current patients, such as those that have not been seen for a period of time based on an organization's business rules.  It is often used to filter patient lists to exclude inactive patients  Deceased patients may also be marked as inactive for the same reasons, but may be active for some time after death.
   * - **Comment:** If a record is inactive, and linked to an active record, then future patient/record updates should occur on the other patient.
   * - **Requirements:** Need to be able to mark a patient record as not to be used because it was created in error.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This element is labelled as a modifier because it is a status element that can indicate that a record should not be treated as valid
   * - **isSummary:** true
   */
  private active?: BooleanType | undefined;

  /**
   * Patient.name Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A name associated with the patient
   * - **Definition:** A name associated with the individual.
   * - **Comment:** A patient may have multiple names with different uses or applicable periods. For animals, the name is a "HumanName" in the sense that is assigned and used by humans and has the same patterns.
   * - **Requirements:** Need to be able to track the patient by multiple names. Examples are your official name and a partner name.
   * - **FHIR Type:** `HumanName`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private name?: HumanName[] | undefined;

  /**
   * Patient.telecom Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A contact detail for the individual
   * - **Definition:** A contact detail (e.g. a telephone number or an email address) by which the individual may be contacted.
   * - **Comment:** A Patient may have multiple ways to be contacted with different uses or applicable periods.  May need to have options for contacting the person urgently and also to help with identification. The address might not go directly to the individual, but may reach another party that is able to proxy for the patient (i.e. home phone, or pet owner's phone).
   * - **Requirements:** People have (primary) ways to contact them in some way such as phone, email.
   * - **FHIR Type:** `ContactPoint`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private telecom?: ContactPoint[] | undefined;

  /**
   * Patient.gender Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** male | female | other | unknown
   * - **Definition:** Administrative Gender - the gender that the patient is considered to have for administration and record keeping purposes.
   * - **Comment:** The gender might not match the biological sex as determined by genetics or the individual's preferred identification. Note that for both humans and particularly animals, there are other legitimate possibilities than male and female, though the vast majority of systems and contexts only support male and female.  Systems providing decision support or enforcing business rules should ideally do this on the basis of Observations dealing with the specific sex or gender aspect of interest (anatomical, chromosomal, social, etc.)  However, because these observations are infrequently recorded, defaulting to the administrative gender is common practice.  Where such defaulting occurs, rule enforcement should allow for the variation between administrative and biological, chromosomal and other gender aspects.  For example, an alert about a hysterectomy on a male should be handled as a warning or overridable error, not a "hard" error.  See the Patient Gender and Sex section for additional information about communicating patient gender and sex.
   * - **Requirements:** Needed for identification of the individual, in combination with (at least) name and birth date.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private gender?: EnumCodeType | undefined;

  /**
   * Patient.birthDate Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The date of birth for the individual
   * - **Definition:** The date of birth for the individual.
   * - **Comment:** At least an estimated year should be provided as a guess if the real DOB is unknown  There is a standard extension "patient-birthTime" available that should be used where Time is required (such as in maternity/infant care systems).
   * - **Requirements:** Age of the individual drives many clinical processes.
   * - **FHIR Type:** `date`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private birthDate?: DateType | undefined;

  /**
   * Patient.deceased[x] Element
   *
   * @decorator `@ChoiceDataTypesMeta('Patient.deceased[x]', ['boolean', 'dateTime'])`
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Indicates if the individual is deceased or not
   * - **Definition:** Indicates if the individual is deceased or not.
   * - **Comment:** If there's no value in the instance, it means there is no statement on whether or not the individual is deceased. Most systems will interpret the absence of a value as a sign of the person being alive.
   * - **Requirements:** The fact that a patient is deceased influences the clinical process. Also, in human communication and relation management it is necessary to know whether the person is alive.
   * - **FHIR Types:**
   *  - `boolean`
   *  - `dateTime`
   * - **Cardinality:** 0..1
   * - **isModifier:** true
   * - **isModifierReason:** This element is labeled as a modifier because once a patient is marked as deceased, the actions that are appropriate to perform on the patient may be significantly different.
   * - **isSummary:** true
   */
  @ChoiceDataTypesMeta('Patient.deceased[x]', ['boolean', 'dateTime'])
  private deceased?: DataType | undefined;

  /**
   * Patient.address Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** An address for the individual
   * - **Definition:** An address for the individual.
   * - **Comment:** Patient may have multiple addresses with different uses or applicable periods.
   * - **Requirements:** May need to keep track of patient addresses for contacting, billing or reporting requirements and also to help with identification.
   * - **FHIR Type:** `Address`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private address?: Address[] | undefined;

  /**
   * Patient.maritalStatus Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Marital (civil) status of a patient
   * - **Definition:** This field contains a patient's most recent marital (civil) status.
   * - **Requirements:** Most, if not all systems capture it.
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private maritalStatus?: CodeableConcept | undefined;

  /**
   * Patient.multipleBirth[x] Element
   *
   * @decorator `@ChoiceDataTypesMeta('Patient.multipleBirth[x]', ['boolean', 'integer'])`
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Whether patient is part of a multiple birth
   * - **Definition:** Indicates whether the patient is part of a multiple (boolean) or indicates the actual birth order (integer).
   * - **Comment:** Where the valueInteger is provided, the number is the birth number in the sequence. E.g. The middle birth in triplets would be valueInteger=2 and the third born would have valueInteger=3 If a boolean value was provided for this triplets example, then all 3 patient records would have valueBoolean=true (the ordering is not indicated).
   * - **Requirements:** For disambiguation of multiple-birth children, especially relevant where the care provider doesn't meet the patient, such as labs.
   * - **FHIR Types:**
   *  - `boolean`
   *  - `integer`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  @ChoiceDataTypesMeta('Patient.multipleBirth[x]', ['boolean', 'integer'])
  private multipleBirth?: DataType | undefined;

  /**
   * Patient.photo Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Image of the patient
   * - **Definition:** Image of the patient.
   * - **Comment:** Guidelines: * Use id photos, not clinical photos. * Limit dimensions to thumbnail. * Keep byte count low to ease resource updates.
   * - **Requirements:** Many EHR systems have the capability to capture an image of the patient. Fits with newer social media usage too.
   * - **FHIR Type:** `Attachment`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private photo?: Attachment[] | undefined;

  /**
   * Patient.contact Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A contact party (e.g. guardian, partner, friend) for the patient
   * - **Definition:** A contact party (e.g. guardian, partner, friend) for the patient.
   * - **Comment:** Contact covers all kinds of contact parties: family members, business contacts, guardians, caregivers. Not applicable to register pedigree and family ties beyond use of having contact.
   * - **Requirements:** Need to track people you can contact about the patient.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private contact?: PatientContactComponent[] | undefined;

  /**
   * Patient.communication Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A language which may be used to communicate with the patient about his or her health
   * - **Definition:** A language which may be used to communicate with the patient about his or her health.
   * - **Comment:** If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple Patient.Communication associations.   For animals, language is not a relevant field, and should be absent from the instance. If the Patient does not speak the default local language, then the Interpreter Required Standard can be used to explicitly declare that an interpreter is required.
   * - **Requirements:** If a patient does not speak the local language, interpreters may be required, so languages spoken and proficiency are important things to keep track of both for patient and other persons of interest.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private communication?: PatientCommunicationComponent[] | undefined;

  /**
   * Patient.generalPractitioner Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Patient's nominated primary care provider
   * - **Definition:** Patient's nominated care provider.
   * - **Comment:** This may be the primary care provider (in a GP context), or it may be a patient nominated care manager in a community/disability setting, or even organization that will provide people to perform the care provider roles.  It is not to be used to record Care Teams, these should be in a CareTeam resource that may be linked to the CarePlan or EpisodeOfCare resources. Multiple GPs may be recorded against the patient for various reasons, such as a student that has his home GP listed along with the GP at university during the school semesters, or a "fly-in/fly-out" worker that has the onsite GP also included with his home GP to remain aware of medical issues.  Jurisdictions may decide that they can profile this down to 1 if desired, or 1 per type.
   * - **FHIR Type:** `Reference
   *   - _TargetProfiles_: ['http://hl7.org/fhir/StructureDefinition/Organization', 'http://hl7.org/fhir/StructureDefinition/Practitioner', 'http://hl7.org/fhir/StructureDefinition/PractitionerRole']
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private generalPractitioner?: Reference[] | undefined;

  /**
   * Patient.managingOrganization Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Organization that is the custodian of the patient record
   * - **Definition:** Organization that is the custodian of the patient record.
   * - **Comment:** There is only one managing organization for a specific patient record. Other organizations will have their own Patient record, and may use the Link property to join the records together (or a Person resource which can include confidence ratings for the association).
   * - **Requirements:** Need to know who recognizes this patient record, manages and updates it.
   * - **FHIR Type:** `Reference
   *   - _TargetProfiles_: ['http://hl7.org/fhir/StructureDefinition/Organization']
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private managingOrganization?: Reference | undefined;

  /**
   * Patient.link Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Link to another patient resource that concerns the same actual person
   * - **Definition:** Link to another patient resource that concerns the same actual patient.
   * - **Comment:** There is no assumption that linked patient records have mutual links.
   * - **Requirements:** There are multiple use cases:    * Duplicate patient records due to the clerical errors associated with the difficulties of identifying humans consistently, and  * Distribution of patient information across multiple servers.
   * - **FHIR Type:** `BackboneElement`
   * - **Cardinality:** 0..*
   * - **isModifier:** true
   * - **isModifierReason:** This element is labeled as a modifier because it might not be the main Patient resource, and the referenced patient should be used instead of this Patient record. This is when the link.type value is 'replaced-by'
   * - **isSummary:** false
   */
  private link?: PatientLinkComponent[] | undefined;

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
      const optErrMsg = `Invalid Patient.identifier; Provided value array has an element that is not an instance of Identifier.`;
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
      const optErrMsg = `Invalid Patient.identifier; Provided element is not an instance of Identifier.`;
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
    if (isDefined<BooleanType>(element)) {
      const optErrMsg = `Invalid Patient.active; Provided element is not an instance of BooleanType.`;
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
      const optErrMsg = `Invalid Patient.active (${String(value)})`;
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
   * @returns the `name` property value as a HumanName array
   */
  public getName(): HumanName[] {
    return this.name ?? ([] as HumanName[]);
  }

  /**
   * Assigns the provided HumanName array value to the `name` property.
   *
   * @param value - the `name` array value
   * @returns this
   */
  public setName(value: HumanName[] | undefined): this {
    if (isDefinedList<HumanName>(value)) {
      const optErrMsg = `Invalid Patient.name; Provided value array has an element that is not an instance of HumanName.`;
      assertFhirTypeList<HumanName>(value, HumanName, optErrMsg);
      this.name = value;
    } else {
      this.name = undefined;
    }
    return this;
  }

  /**
   * Add the provided HumanName value to the `name` array property.
   *
   * @param value - the `name` value
   * @returns this
   */
  public addName(value: HumanName | undefined): this {
    if (isDefined<HumanName>(value)) {
      const optErrMsg = `Invalid Patient.name; Provided element is not an instance of HumanName.`;
      assertFhirType<HumanName>(value, HumanName, optErrMsg);
      this.initName();
      this.name?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasName(): boolean {
    return isDefinedList<HumanName>(this.name) && this.name.some((item: HumanName) => !item.isEmpty());
  }

  /**
   * Initialize the `name` property
   */
  private initName(): void {
    if (this.name === undefined) {
      this.name = [] as HumanName[];
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
      const optErrMsg = `Invalid Patient.telecom; Provided value array has an element that is not an instance of ContactPoint.`;
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
      const optErrMsg = `Invalid Patient.telecom; Provided element is not an instance of ContactPoint.`;
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
   * Initialize the `telecom` property
   */
  private initTelecom(): void {
    if (this.telecom === undefined) {
      this.telecom = [] as ContactPoint[];
    }
  }

  /**
   * @returns the `gender` property value as a EnumCodeType
   */
  public getGenderEnumType(): EnumCodeType | undefined {
    return this.gender;
  }

  /**
   * Assigns the provided EnumCodeType value to the `gender` property.
   *
   * @param enumType - the `gender` value
   * @returns this
   */
  public setGenderEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = 'Invalid Patient.gender';
      assertEnumCodeType<AdministrativeGenderEnum>(enumType, AdministrativeGenderEnum, errMsgPrefix);
      this.gender = enumType;
    } else {
      this.gender = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `gender` property exists and has a value; `false` otherwise
   */
  public hasGenderEnumType(): boolean {
    return isDefined<EnumCodeType>(this.gender) && !this.gender.isEmpty() && this.gender.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `gender` property value as a PrimitiveType
   */
  public getGenderElement(): CodeType | undefined {
    if (this.gender === undefined) {
      return undefined;
    }
    return this.gender as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `gender` property.
   *
   * @param element - the `gender` value
   * @returns this
   */
  public setGenderElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Patient.gender; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.gender = new EnumCodeType(element, this.administrativeGenderEnum);
    } else {
      this.gender = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `gender` property exists and has a value; `false` otherwise
   */
  public hasGenderElement(): boolean {
    return this.hasGenderEnumType();
  }

  /**
   * @returns the `gender` property value as a primitive value
   */
  public getGender(): fhirCode | undefined {
    if (this.gender === undefined) {
      return undefined;
    }
    return this.gender.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `gender` property.
   *
   * @param value - the `gender` value
   * @returns this
   */
  public setGender(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Patient.gender; Provided value is not an instance of fhirCode.`;
      this.gender = new EnumCodeType(
        parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg),
        this.administrativeGenderEnum,
      );
    } else {
      this.gender = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `gender` property exists and has a value; `false` otherwise
   */
  public hasGender(): boolean {
    return this.hasGenderEnumType();
  }

  /**
   * @returns the `birthDate` property value as a PrimitiveType
   */
  public getBirthDateElement(): DateType {
    return this.birthDate ?? new DateType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `birthDate` property.
   *
   * @param element - the `birthDate` value
   * @returns this
   */
  public setBirthDateElement(element: DateType | undefined): this {
    if (isDefined<DateType>(element)) {
      const optErrMsg = `Invalid Patient.birthDate; Provided element is not an instance of DateType.`;
      assertFhirType<DateType>(element, DateType, optErrMsg);
      this.birthDate = element;
    } else {
      this.birthDate = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `birthDate` property exists and has a value; `false` otherwise
   */
  public hasBirthDateElement(): boolean {
    return isDefined<DateType>(this.birthDate) && !this.birthDate.isEmpty();
  }

  /**
   * @returns the `birthDate` property value as a primitive value
   */
  public getBirthDate(): fhirDate | undefined {
    return this.birthDate?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `birthDate` property.
   *
   * @param value - the `birthDate` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setBirthDate(value: fhirDate | undefined): this {
    if (isDefined<fhirDate>(value)) {
      const optErrMsg = `Invalid Patient.birthDate (${String(value)})`;
      this.birthDate = new DateType(parseFhirPrimitiveData(value, fhirDateSchema, optErrMsg));
    } else {
      this.birthDate = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `birthDate` property exists and has a value; `false` otherwise
   */
  public hasBirthDate(): boolean {
    return this.hasBirthDateElement();
  }

  /**
   * @returns the `deceased` property value as a Deceased object
   */
  public getDeceased(): DataType | undefined {
    return this.deceased;
  }

  /**
   * Assigns the provided Deceased object value to the `deceased` property.
   *
   * @decorator `@ChoiceDataTypes('Patient.deceased[x]')`
   *
   * @param value - the `deceased` object value
   * @returns this
   */
  @ChoiceDataTypes('Patient.deceased[x]')
  public setDeceased(value: DataType | undefined): this {
    if (isDefined<DataType>(value)) {
      // assertFhirType<DataType>(value, DataType) unnecessary because @ChoiceDataTypes decorator ensures proper type/value
      this.deceased = value;
    } else {
      this.deceased = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `deceased` property exists and has a value; `false` otherwise
   */
  public hasDeceased(): boolean {
    return isDefined<DataType>(this.deceased) && !this.deceased.isEmpty();
  }

  /**
   * @returns the `deceased` property value as a BooleanType object
   */
  public getDeceasedBooleanType(): BooleanType | undefined {
    if (!isDefined<DataType>(this.deceased)) {
      return undefined;
    }
    if (!(this.deceased instanceof BooleanType)) {
      throw new InvalidTypeError(
        `DataType mismatch for Patient.deceased[x]: Expected BooleanType but encountered ${this.deceased.fhirType()}`,
      );
    }
    return this.deceased;
  }

  /**
   * @returns `true` if the `deceased` property exists as a BooleanType and has a value; `false` otherwise
   */
  public hasDeceasedBooleanType(): boolean {
    return this.hasDeceased() && this.deceased instanceof BooleanType;
  }

  /**
   * @returns the `deceased` property value as a DateTimeType object
   */
  public getDeceasedDateTimeType(): DateTimeType | undefined {
    if (!isDefined<DataType>(this.deceased)) {
      return undefined;
    }
    if (!(this.deceased instanceof DateTimeType)) {
      throw new InvalidTypeError(
        `DataType mismatch for Patient.deceased[x]: Expected DateTimeType but encountered ${this.deceased.fhirType()}`,
      );
    }
    return this.deceased;
  }

  /**
   * @returns `true` if the `deceased` property exists as a DateTimeType and has a value; `false` otherwise
   */
  public hasDeceasedDateTimeType(): boolean {
    return this.hasDeceased() && this.deceased instanceof DateTimeType;
  }

  /**
   * @returns the `address` property value as a Address array
   */
  public getAddress(): Address[] {
    return this.address ?? ([] as Address[]);
  }

  /**
   * Assigns the provided Address array value to the `address` property.
   *
   * @param value - the `address` array value
   * @returns this
   */
  public setAddress(value: Address[] | undefined): this {
    if (isDefinedList<Address>(value)) {
      const optErrMsg = `Invalid Patient.address; Provided value array has an element that is not an instance of Address.`;
      assertFhirTypeList<Address>(value, Address, optErrMsg);
      this.address = value;
    } else {
      this.address = undefined;
    }
    return this;
  }

  /**
   * Add the provided Address value to the `address` array property.
   *
   * @param value - the `address` value
   * @returns this
   */
  public addAddress(value: Address | undefined): this {
    if (isDefined<Address>(value)) {
      const optErrMsg = `Invalid Patient.address; Provided element is not an instance of Address.`;
      assertFhirType<Address>(value, Address, optErrMsg);
      this.initAddress();
      this.address?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `address` property exists and has a value; `false` otherwise
   */
  public hasAddress(): boolean {
    return isDefinedList<Address>(this.address) && this.address.some((item: Address) => !item.isEmpty());
  }

  /**
   * Initialize the `address` property
   */
  private initAddress(): void {
    if (this.address === undefined) {
      this.address = [] as Address[];
    }
  }

  /**
   * @returns the `maritalStatus` property value as a MaritalStatus object
   */
  public getMaritalStatus(): CodeableConcept {
    return this.maritalStatus ?? new CodeableConcept();
  }

  /**
   * Assigns the provided MaritalStatus object value to the `maritalStatus` property.
   *
   * @param value - the `maritalStatus` object value
   * @returns this
   */
  public setMaritalStatus(value: CodeableConcept | undefined): this {
    if (isDefined<CodeableConcept>(value)) {
      const optErrMsg = `Invalid Patient.maritalStatus; Provided element is not an instance of CodeableConcept.`;
      assertFhirType<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.maritalStatus = value;
    } else {
      this.maritalStatus = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `maritalStatus` property exists and has a value; `false` otherwise
   */
  public hasMaritalStatus(): boolean {
    return isDefined<CodeableConcept>(this.maritalStatus) && !this.maritalStatus.isEmpty();
  }

  /**
   * @returns the `multipleBirth` property value as a DataType object
   */
  public getMultipleBirth(): DataType | undefined {
    return this.multipleBirth;
  }

  /**
   * Assigns the provided DataType object value to the `multipleBirth` property.
   *
   * @decorator `@ChoiceDataTypes('Patient.multipleBirth[x]')`
   *
   * @param value - the `multipleBirth` object value
   * @returns this
   */
  @ChoiceDataTypes('Patient.multipleBirth[x]')
  public setMultipleBirth(value: DataType | undefined): this {
    if (isDefined<DataType>(value)) {
      // assertFhirType<DataType>(value, DataType) unnecessary because @ChoiceDataTypes decorator ensures proper type/value
      this.multipleBirth = value;
    } else {
      this.multipleBirth = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `multipleBirth` property exists and has a value; `false` otherwise
   */
  public hasMultipleBirth(): boolean {
    return isDefined<DataType>(this.multipleBirth) && !this.multipleBirth.isEmpty();
  }

  /**
   * @returns the `multipleBirth` property value as a BooleanType object
   */
  public getMultipleBirthBooleanType(): BooleanType | undefined {
    if (!isDefined<DataType>(this.multipleBirth)) {
      return undefined;
    }
    if (!(this.multipleBirth instanceof BooleanType)) {
      throw new InvalidTypeError(
        `DataType mismatch for Patient.multipleBirth[x]: Expected BooleanType but encountered ${this.multipleBirth.fhirType()}`,
      );
    }
    return this.multipleBirth;
  }

  /**
   * @returns `true` if the `multipleBirth` property exists as a BooleanType and has a value; `false` otherwise
   */
  public hasMultipleBirthBooleanType(): boolean {
    return this.hasMultipleBirth() && this.multipleBirth instanceof BooleanType;
  }

  /**
   * @returns the `multipleBirth` property value as a IntegerType object
   */
  public getMultipleBirthIntegerType(): IntegerType | undefined {
    if (!isDefined<DataType>(this.multipleBirth)) {
      return undefined;
    }
    if (!(this.multipleBirth instanceof IntegerType)) {
      throw new InvalidTypeError(
        `DataType mismatch for Patient.multipleBirth[x]: Expected IntegerType but encountered ${this.multipleBirth.fhirType()}`,
      );
    }
    return this.multipleBirth;
  }

  /**
   * @returns `true` if the `multipleBirth` property exists as a IntegerType and has a value; `false` otherwise
   */
  public hasMultipleBirthIntegerType(): boolean {
    return this.hasMultipleBirth() && this.multipleBirth instanceof IntegerType;
  }

  /**
   * @returns the `photo` property value as a Attachment array
   */
  public getPhoto(): Attachment[] {
    return this.photo ?? ([] as Attachment[]);
  }

  /**
   * Assigns the provided Attachment array value to the `photo` property.
   *
   * @param value - the `photo` array value
   * @returns this
   */
  public setPhoto(value: Attachment[] | undefined): this {
    if (isDefinedList<Attachment>(value)) {
      const optErrMsg = `Invalid Patient.photo; Provided value array has an element that is not an instance of Attachment.`;
      assertFhirTypeList<Attachment>(value, Attachment, optErrMsg);
      this.photo = value;
    } else {
      this.photo = undefined;
    }
    return this;
  }

  /**
   * Add the provided Attachment value to the `photo` array property.
   *
   * @param value - the `photo` value
   * @returns this
   */
  public addPhoto(value: Attachment | undefined): this {
    if (isDefined<Attachment>(value)) {
      const optErrMsg = `Invalid Patient.photo; Provided element is not an instance of Attachment.`;
      assertFhirType<Attachment>(value, Attachment, optErrMsg);
      this.initPhoto();
      this.photo?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `photo` property exists and has a value; `false` otherwise
   */
  public hasPhoto(): boolean {
    return isDefinedList<Attachment>(this.photo) && this.photo.some((item: Attachment) => !item.isEmpty());
  }

  /**
   * Initialize the `photo` property
   */
  private initPhoto(): void {
    if (this.photo === undefined) {
      this.photo = [] as Attachment[];
    }
  }

  /**
   * @returns the `contact` property value as a PatientContactComponent array
   */
  public getContact(): PatientContactComponent[] {
    return this.contact ?? ([] as PatientContactComponent[]);
  }

  /**
   * Assigns the provided PatientContactComponent array value to the `contact` property.
   *
   * @param value - the `contact` array value
   * @returns this
   */
  public setContact(value: PatientContactComponent[] | undefined): this {
    if (isDefinedList<PatientContactComponent>(value)) {
      const optErrMsg = `Invalid Patient.contact; Provided value array has an element that is not an instance of PatientContactComponent.`;
      assertFhirTypeList<PatientContactComponent>(value, PatientContactComponent, optErrMsg);
      this.contact = value;
    } else {
      this.contact = undefined;
    }
    return this;
  }

  /**
   * Add the provided PatientContactComponent value to the `contact` array property.
   *
   * @param value - the `contact` value
   * @returns this
   */
  public addContact(value: PatientContactComponent | undefined): this {
    if (isDefined<PatientContactComponent>(value)) {
      const optErrMsg = `Invalid Patient.contact; Provided element is not an instance of PatientContactComponent.`;
      assertFhirType<PatientContactComponent>(value, PatientContactComponent, optErrMsg);
      this.initContact();
      this.contact?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `contact` property exists and has a value; `false` otherwise
   */
  public hasContact(): boolean {
    return (
      isDefinedList<PatientContactComponent>(this.contact) &&
      this.contact.some((item: PatientContactComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `contact` property
   */
  private initContact(): void {
    if (this.contact === undefined) {
      this.contact = [] as PatientContactComponent[];
    }
  }

  /**
   * @returns the `communication` property value as a PatientCommunicationComponent array
   */
  public getCommunication(): PatientCommunicationComponent[] {
    return this.communication ?? ([] as PatientCommunicationComponent[]);
  }

  /**
   * Assigns the provided PatientCommunicationComponent array value to the `communication` property.
   *
   * @param value - the `communication` array value
   * @returns this
   */
  public setCommunication(value: PatientCommunicationComponent[] | undefined): this {
    if (isDefinedList<PatientCommunicationComponent>(value)) {
      const optErrMsg = `Invalid Patient.communication; Provided value array has an element that is not an instance of PatientCommunicationComponent.`;
      assertFhirTypeList<PatientCommunicationComponent>(value, PatientCommunicationComponent, optErrMsg);
      this.communication = value;
    } else {
      this.communication = undefined;
    }
    return this;
  }

  /**
   * Add the provided PatientCommunicationComponent value to the `communication` array property.
   *
   * @param value - the `communication` value
   * @returns this
   */
  public addCommunication(value: PatientCommunicationComponent | undefined): this {
    if (isDefined<PatientCommunicationComponent>(value)) {
      const optErrMsg = `Invalid Patient.communication; Provided element is not an instance of PatientCommunicationComponent.`;
      assertFhirType<PatientCommunicationComponent>(value, PatientCommunicationComponent, optErrMsg);
      this.initCommunication();
      this.communication?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `communication` property exists and has a value; `false` otherwise
   */
  public hasCommunication(): boolean {
    return (
      isDefinedList<PatientCommunicationComponent>(this.communication) &&
      this.communication.some((item: PatientCommunicationComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `communication` property
   */
  private initCommunication(): void {
    if (this.communication === undefined) {
      this.communication = [] as PatientCommunicationComponent[];
    }
  }

  /**
   * @returns the `generalPractitioner` property value as a Reference array
   */
  public getGeneralPractitioner(): Reference[] {
    return this.generalPractitioner ?? ([] as Reference[]);
  }

  /**
   * Assigns the provided Reference array value to the `generalPractitioner` property.
   *
   * @decorator `@ReferenceTargets('Patient.generalPractitioner', ['Organization', 'Practitioner', 'PractitionerRole'])`
   *
   * @param value - the `generalPractitioner` array value
   * @returns this
   */
  @ReferenceTargets('Patient.generalPractitioner', ['Organization', 'Practitioner', 'PractitionerRole'])
  public setGeneralPractitioner(value: Reference[] | undefined): this {
    if (isDefinedList<Reference>(value)) {
      // assertFhirTypeList<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.generalPractitioner = value;
    } else {
      this.generalPractitioner = undefined;
    }
    return this;
  }

  /**
   * Add the provided Reference value to the `generalPractitioner` array property.
   *
   * @decorator `@ReferenceTargets('Patient.generalPractitioner', ['Organization', 'Practitioner', 'PractitionerRole'])`
   *
   * @param value - the `generalPractitioner` value
   * @returns this
   */
  @ReferenceTargets('Patient.generalPractitioner', ['Organization', 'Practitioner', 'PractitionerRole'])
  public addGeneralPractitioner(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.initGeneralPractitioner();
      this.generalPractitioner?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `generalPractitioner` property exists and has a value; `false` otherwise
   */
  public hasGeneralPractitioner(): boolean {
    return (
      isDefinedList<Reference>(this.generalPractitioner) &&
      this.generalPractitioner.some((item: Reference) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `generalPractitioner` property
   */
  private initGeneralPractitioner(): void {
    if (this.generalPractitioner === undefined) {
      this.generalPractitioner = [] as Reference[];
    }
  }

  /**
   * @returns the `managingOrganization` property value as a ManagingOrganization object
   */
  public getManagingOrganization(): Reference {
    return this.managingOrganization ?? new Reference();
  }

  /**
   * Assigns the provided ManagingOrganization object value to the `managingOrganization` property.
   *
   * @decorator `@ReferenceTargets('Patient.managingOrganization', ['Organization'])`
   *
   * @param value - the `managingOrganization` object value
   * @returns this
   */
  @ReferenceTargets('Patient.managingOrganization', ['Organization'])
  public setManagingOrganization(value: Reference | undefined): this {
    if (isDefined<Reference>(value)) {
      // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
      this.managingOrganization = value;
    } else {
      this.managingOrganization = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `managingOrganization` property exists and has a value; `false` otherwise
   */
  public hasManagingOrganization(): boolean {
    return isDefined<Reference>(this.managingOrganization) && !this.managingOrganization.isEmpty();
  }

  /**
   * @returns the `link` property value as a PatientLinkComponent array
   */
  public getLink(): PatientLinkComponent[] {
    return this.link ?? ([] as PatientLinkComponent[]);
  }

  /**
   * Assigns the provided PatientLinkComponent array value to the `link` property.
   *
   * @param value - the `link` array value
   * @returns this
   */
  public setLink(value: PatientLinkComponent[] | undefined): this {
    if (isDefinedList<PatientLinkComponent>(value)) {
      const optErrMsg = `Invalid Patient.link; Provided value array has an element that is not an instance of PatientLinkComponent.`;
      assertFhirTypeList<PatientLinkComponent>(value, PatientLinkComponent, optErrMsg);
      this.link = value;
    } else {
      this.link = undefined;
    }
    return this;
  }

  /**
   * Add the provided PatientLinkComponent value to the `link` array property.
   *
   * @param value - the `link` value
   * @returns this
   */
  public addLink(value: PatientLinkComponent | undefined): this {
    if (isDefined<PatientLinkComponent>(value)) {
      const optErrMsg = `Invalid Patient.link; Provided element is not an instance of PatientLinkComponent.`;
      assertFhirType<PatientLinkComponent>(value, PatientLinkComponent, optErrMsg);
      this.initLink();
      this.link?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `link` property exists and has a value; `false` otherwise
   */
  public hasLink(): boolean {
    return (
      isDefinedList<PatientLinkComponent>(this.link) && this.link.some((item: PatientLinkComponent) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `link` property
   */
  private initLink(): void {
    if (this.link === undefined) {
      this.link = [] as PatientLinkComponent[];
    }
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Patient';
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
        this.name,
        this.telecom,
        this.gender,
        this.birthDate,
        this.deceased,
        this.address,
        this.maritalStatus,
        this.multipleBirth,
        this.photo,
        this.contact,
        this.communication,
        this.generalPractitioner,
        this.managingOrganization,
        this.link,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Patient {
    const dest = new Patient();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: Patient): void {
    super.copyValues(dest);
    const identifierList = copyListValues<Identifier>(this.identifier);
    dest.identifier = identifierList.length === 0 ? undefined : identifierList;
    dest.active = this.active?.copy();
    const nameList = copyListValues<HumanName>(this.name);
    dest.name = nameList.length === 0 ? undefined : nameList;
    const telecomList = copyListValues<ContactPoint>(this.telecom);
    dest.telecom = telecomList.length === 0 ? undefined : telecomList;
    dest.gender = this.gender?.copy();
    dest.birthDate = this.birthDate?.copy();
    dest.deceased = this.deceased?.copy();
    const addressList = copyListValues<Address>(this.address);
    dest.address = addressList.length === 0 ? undefined : addressList;
    dest.maritalStatus = this.maritalStatus?.copy();
    dest.multipleBirth = this.multipleBirth?.copy();
    const photoList = copyListValues<Attachment>(this.photo);
    dest.photo = photoList.length === 0 ? undefined : photoList;
    const contactList = copyListValues<PatientContactComponent>(this.contact);
    dest.contact = contactList.length === 0 ? undefined : contactList;
    const communicationList = copyListValues<PatientCommunicationComponent>(this.communication);
    dest.communication = communicationList.length === 0 ? undefined : communicationList;
    const generalPractitionerList = copyListValues<Reference>(this.generalPractitioner);
    dest.generalPractitioner = generalPractitionerList.length === 0 ? undefined : generalPractitionerList;
    dest.managingOrganization = this.managingOrganization?.copy();
    const linkList = copyListValues<PatientLinkComponent>(this.link);
    dest.link = linkList.length === 0 ? undefined : linkList;
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

    if (this.hasName()) {
      setFhirComplexListJson(this.getName(), 'name', jsonObj);
    }

    if (this.hasTelecom()) {
      setFhirComplexListJson(this.getTelecom(), 'telecom', jsonObj);
    }

    if (this.hasGenderElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getGenderElement()!, 'gender', jsonObj);
    }

    if (this.hasBirthDateElement()) {
      setFhirPrimitiveJson<fhirDate>(this.getBirthDateElement(), 'birthDate', jsonObj);
    }

    if (this.hasDeceased()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getDeceased()!, 'deceased', jsonObj);
    }

    if (this.hasAddress()) {
      setFhirComplexListJson(this.getAddress(), 'address', jsonObj);
    }

    if (this.hasMaritalStatus()) {
      setFhirComplexJson(this.getMaritalStatus(), 'maritalStatus', jsonObj);
    }

    if (this.hasMultipleBirth()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setPolymorphicValueJson(this.getMultipleBirth()!, 'multipleBirth', jsonObj);
    }

    if (this.hasPhoto()) {
      setFhirComplexListJson(this.getPhoto(), 'photo', jsonObj);
    }

    if (this.hasContact()) {
      setFhirBackboneElementListJson(this.getContact(), 'contact', jsonObj);
    }

    if (this.hasCommunication()) {
      setFhirBackboneElementListJson(this.getCommunication(), 'communication', jsonObj);
    }

    if (this.hasGeneralPractitioner()) {
      setFhirComplexListJson(this.getGeneralPractitioner(), 'generalPractitioner', jsonObj);
    }

    if (this.hasManagingOrganization()) {
      setFhirComplexJson(this.getManagingOrganization(), 'managingOrganization', jsonObj);
    }

    if (this.hasLink()) {
      setFhirBackboneElementListJson(this.getLink(), 'link', jsonObj);
    }

    // jsonObj will always have, at least, the 'resourceType' property from Resource.
    // If that is all jsonObj has, return undefined.
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

/**
 * PatientContactComponent Subclass for `Patient.contact`
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** A contact party (e.g. guardian, partner, friend) for the patient
 * - **Definition:** A contact party (e.g. guardian, partner, friend) for the patient.
 * - **Comment:** Contact covers all kinds of contact parties: family members, business contacts, guardians, caregivers. Not applicable to register pedigree and family ties beyond use of having contact.
 * - **Requirements:** Need to track people you can contact about the patient.
 *
 * @category Resource Models
 * @see [FHIR Patient](http://hl7.org/fhir/StructureDefinition/Patient)
 */
export class PatientContactComponent extends BackboneElement {
  constructor() {
    super();

    this.administrativeGenderEnum = new AdministrativeGenderEnum();
  }

  /**
   * Parse the provided `Patient.contact` json to instantiate the PatientContactComponent data model.
   *
   * @param sourceJson - JSON representing FHIR `Patient.communication`
   * @returns PatientContactComponent data model or undefined for `Patient.contact`
   */
  public static parse(sourceJson: JSON.Value): PatientContactComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const backboneJsonObj: JSON.Object = JSON.asObject(sourceJson, `PatientContactComponent JSON`);
    const instance = new PatientContactComponent();
    processBackboneElementJson(instance, backboneJsonObj);

    let sourceField = 'Patient.contact.relationship';
    let fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(backboneJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: CodeableConcept | undefined = parseCodeableConcept(
          dataElementJson,
          `${sourceField}[${String(idx)}]`,
        );
        if (datatype !== undefined) {
          instance.addRelationship(datatype);
        }
      });
    }

    sourceField = 'Patient.contact.name';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: HumanName | undefined = parseHumanName(backboneJsonObj[fieldName], sourceField);
      instance.setName(datatype);
    }

    sourceField = 'Patient.contact.telecom';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const dataElementJsonArray: JSON.Array = JSON.asArray(backboneJsonObj[fieldName]!, sourceField);
      dataElementJsonArray.forEach((dataElementJson: JSON.Value, idx) => {
        const datatype: ContactPoint | undefined = parseContactPoint(dataElementJson, `${sourceField}[${String(idx)}]`);
        if (datatype !== undefined) {
          instance.addTelecom(datatype);
        }
      });
    }

    sourceField = 'Patient.contact.address';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: Address | undefined = parseAddress(backboneJsonObj[fieldName], sourceField);
      instance.setAddress(datatype);
    }

    sourceField = 'Patient.contact.gender';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'string');
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      instance.setGenderElement(datatype);
    }

    sourceField = 'Patient.contact.organization';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: Reference | undefined = parseReference(backboneJsonObj[fieldName], sourceField);
      instance.setOrganization(datatype);
    }

    sourceField = 'Patient.contact.period';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: Period | undefined = parsePeriod(backboneJsonObj[fieldName], sourceField);
      instance.setPeriod(datatype);
    }

    return instance;
  }

  /**
   * FHIR CodeSystem: AdministrativeGender
   *
   * @see {@link AdministrativeGenderEnum}
   */
  private readonly administrativeGenderEnum: AdministrativeGenderEnum;

  /**
   * Patient.contact.relationship Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The kind of relationship
   * - **Definition:** The nature of the relationship between the patient and the contact person.
   * - **Requirements:** Used to determine which contact person is the most relevant to approach, depending on circumstances.
   * - **FHIR Type:** `CodeableConcept`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private relationship?: CodeableConcept[] | undefined;

  /**
   * Patient.contact.name Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A name associated with the contact person
   * - **Definition:** A name associated with the contact person.
   * - **Requirements:** Contact persons need to be identified by name, but it is uncommon to need details about multiple other names for that contact person.
   * - **FHIR Type:** `HumanName`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private name?: HumanName | undefined;

  /**
   * Patient.contact.telecom Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** A contact detail for the person
   * - **Definition:** A contact detail for the person, e.g. a telephone number or an email address.
   * - **Comment:** Contact may have multiple ways to be contacted with different uses or applicable periods.  May need to have options for contacting the person urgently, and also to help with identification.
   * - **Requirements:** People have (primary) ways to contact them in some way such as phone, email.
   * - **FHIR Type:** `ContactPoint`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private telecom?: ContactPoint[] | undefined;

  /**
   * Patient.contact.address Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Address for the contact person
   * - **Definition:** Address for the contact person.
   * - **Requirements:** Need to keep track where the contact person can be contacted per postal mail or visited.
   * - **FHIR Type:** `Address`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private address?: Address | undefined;

  /**
   * Patient.contact.gender Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** male | female | other | unknown
   * - **Definition:** Administrative Gender - the gender that the contact person is considered to have for administration and record keeping purposes.
   * - **Requirements:** Needed to address the person correctly.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private gender?: EnumCodeType | undefined;

  /**
   * Patient.contact.organization Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Organization that is associated with the contact
   * - **Definition:** Organization on behalf of which the contact is acting or for which the contact is working.
   * - **Requirements:** For guardians or business related contacts, the organization is relevant.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Organization' ]
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private organization?: Reference | undefined;

  /**
   * Patient.contact.period Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The period during which this contact person or organization is valid to be contacted relating to this patient
   * - **Definition:** The period during which this contact person or organization is valid to be contacted relating to this patient.
   * - **FHIR Type:** `Period`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private period?: Period | undefined;

  /**
   * @returns the `relationship` property value as a CodeableConcept array
   */
  public getRelationship(): CodeableConcept[] {
    return this.relationship ?? ([] as CodeableConcept[]);
  }

  /**
   * Assigns the provided CodeableConcept array value to the `relationship` property.
   *
   * @param value - the `relationship` array value
   * @returns this
   */
  public setRelationship(value: CodeableConcept[] | undefined): this {
    if (isDefinedList<CodeableConcept>(value)) {
      const optErrMsg = `Invalid Patient.contact.relationship; Provided value array has an element that is not an instance of CodeableConcept.`;
      assertFhirTypeList<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.relationship = value;
    } else {
      this.relationship = undefined;
    }
    return this;
  }

  /**
   * Add the provided CodeableConcept value to the `relationship` array property.
   *
   * @param value - the `relationship` value
   * @returns this
   */
  public addRelationship(value: CodeableConcept | undefined): this {
    if (isDefined<CodeableConcept>(value)) {
      const optErrMsg = `Invalid Patient.contact.relationship; Provided element is not an instance of CodeableConcept.`;
      assertFhirType<CodeableConcept>(value, CodeableConcept, optErrMsg);
      this.initRelationship();
      this.relationship?.push(value);
    }
    return this;
  }

  /**
   * @returns `true` if the `relationship` property exists and has a value; `false` otherwise
   */
  public hasRelationship(): boolean {
    return (
      isDefinedList<CodeableConcept>(this.relationship) &&
      this.relationship.some((item: CodeableConcept) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `relationship` property
   */
  private initRelationship(): void {
    if (this.relationship === undefined) {
      this.relationship = [] as CodeableConcept[];
    }
  }

  /**
   * @returns the `name` property value as a Name object
   */
  public getName(): HumanName {
    return this.name ?? new HumanName();
  }

  /**
   * Assigns the provided Name object value to the `name` property.
   *
   * @param value - the `name` object value
   * @returns this
   */
  public setName(value: HumanName | undefined): this {
    if (isDefined<HumanName>(value)) {
      const optErrMsg = `Invalid Patient.contact.name; Provided element is not an instance of HumanName.`;
      assertFhirType<HumanName>(value, HumanName, optErrMsg);
      this.name = value;
    } else {
      this.name = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `name` property exists and has a value; `false` otherwise
   */
  public hasName(): boolean {
    return isDefined<HumanName>(this.name) && !this.name.isEmpty();
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
      const optErrMsg = `Invalid Patient.contact.telecom; Provided value array has an element that is not an instance of ContactPoint.`;
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
      const optErrMsg = `Invalid Patient.contact.telecom; Provided element is not an instance of ContactPoint.`;
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
   * Initialize the `telecom` property
   */
  private initTelecom(): void {
    if (this.telecom === undefined) {
      this.telecom = [] as ContactPoint[];
    }
  }

  /**
   * @returns the `address` property value as a Address object
   */
  public getAddress(): Address {
    return this.address ?? new Address();
  }

  /**
   * Assigns the provided Address object value to the `address` property.
   *
   * @param value - the `address` object value
   * @returns this
   */
  public setAddress(value: Address | undefined): this {
    if (isDefined<Address>(value)) {
      const optErrMsg = `Invalid Patient.contact.address; Provided element is not an instance of Address.`;
      assertFhirType<Address>(value, Address, optErrMsg);
      this.address = value;
    } else {
      this.address = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `address` property exists and has a value; `false` otherwise
   */
  public hasAddress(): boolean {
    return isDefined<Address>(this.address) && !this.address.isEmpty();
  }

  /**
   * @returns the `gender` property value as a EnumCodeType
   */
  public getGenderEnumType(): EnumCodeType | undefined {
    return this.gender;
  }

  /**
   * Assigns the provided EnumCodeType value to the `gender` property.
   *
   * @param enumType - the `gender` value
   * @returns this
   */
  public setGenderEnumType(enumType: EnumCodeType | undefined): this {
    if (isDefined<EnumCodeType>(enumType)) {
      const errMsgPrefix = 'Invalid Patient.contact.gender';
      assertEnumCodeType<AdministrativeGenderEnum>(enumType, AdministrativeGenderEnum, errMsgPrefix);
      this.gender = enumType;
    } else {
      this.gender = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `gender` property exists and has a value; `false` otherwise
   */
  public hasGenderEnumType(): boolean {
    return isDefined<EnumCodeType>(this.gender) && !this.gender.isEmpty() && this.gender.fhirCodeEnumeration.length > 0;
  }

  /**
   * @returns the `gender` property value as a PrimitiveType
   */
  public getGenderElement(): CodeType | undefined {
    if (this.gender === undefined) {
      return undefined;
    }
    return this.gender as CodeType;
  }

  /**
   * Assigns the provided PrimitiveType value to the `gender` property.
   *
   * @param element - the `gender` value
   * @returns this
   */
  public setGenderElement(element: CodeType | undefined): this {
    if (isDefined<CodeType>(element)) {
      const optErrMsg = `Invalid Patient.contact.gender; Provided element is not an instance of CodeType.`;
      assertFhirType<CodeType>(element, CodeType, optErrMsg);
      this.gender = new EnumCodeType(element, this.administrativeGenderEnum);
    } else {
      this.gender = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `gender` property exists and has a value; `false` otherwise
   */
  public hasGenderElement(): boolean {
    return this.hasGenderEnumType();
  }

  /**
   * @returns the `gender` property value as a primitive value
   */
  public getGender(): fhirCode | undefined {
    if (this.gender === undefined) {
      return undefined;
    }
    return this.gender.fhirCode.code;
  }

  /**
   * Assigns the provided primitive value to the `gender` property.
   *
   * @param value - the `gender` value
   * @returns this
   */
  public setGender(value: fhirCode | undefined): this {
    if (isDefined<fhirCode>(value)) {
      const optErrMsg = `Invalid Patient.contact.gender; Provided value is not an instance of fhirCode.`;
      this.gender = new EnumCodeType(
        parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg),
        this.administrativeGenderEnum,
      );
    } else {
      this.gender = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `gender` property exists and has a value; `false` otherwise
   */
  public hasGender(): boolean {
    return this.hasGenderEnumType();
  }

  /**
   * @returns the `organization` property value as a Organization object
   */
  public getOrganization(): Reference {
    return this.organization ?? new Reference();
  }

  /**
   * Assigns the provided Organization object value to the `organization` property.
   *
   * @decorator `@ReferenceTargets('Patient.contact.organization', ['Organization'])`
   *
   * @param value - the `organization` object value
   * @returns this
   */
  @ReferenceTargets('Patient.contact.organization', ['Organization'])
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
      const optErrMsg = `Invalid Patient.contact.period; Provided element is not an instance of Period.`;
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
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Patient.contact';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return (
      super.isEmpty() &&
      isElementEmpty(
        this.relationship,
        this.name,
        this.telecom,
        this.address,
        this.gender,
        this.organization,
        this.period,
      )
    );
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): PatientContactComponent {
    const dest = new PatientContactComponent();
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: PatientContactComponent): void {
    super.copyValues(dest);
    const relationshipList = copyListValues<CodeableConcept>(this.relationship);
    dest.relationship = relationshipList.length === 0 ? undefined : relationshipList;
    dest.name = this.name?.copy();
    const telecomList = copyListValues<ContactPoint>(this.telecom);
    dest.telecom = telecomList.length === 0 ? undefined : telecomList;
    dest.address = this.address?.copy();
    dest.gender = this.gender?.copy();
    dest.organization = this.organization?.copy();
    dest.period = this.period?.copy();
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

    if (this.hasRelationship()) {
      setFhirComplexListJson(this.getRelationship(), 'relationship', jsonObj);
    }

    if (this.hasName()) {
      setFhirComplexJson(this.getName(), 'name', jsonObj);
    }

    if (this.hasTelecom()) {
      setFhirComplexListJson(this.getTelecom(), 'telecom', jsonObj);
    }

    if (this.hasAddress()) {
      setFhirComplexJson(this.getAddress(), 'address', jsonObj);
    }

    if (this.hasGenderElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getGenderElement()!, 'gender', jsonObj);
    }

    if (this.hasOrganization()) {
      setFhirComplexJson(this.getOrganization(), 'organization', jsonObj);
    }

    if (this.hasPeriod()) {
      setFhirComplexJson(this.getPeriod(), 'period', jsonObj);
    }

    return jsonObj;
  }
}

/**
 * PatientCommunicationComponent Subclass for `Patient.communication`
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** A language which may be used to communicate with the patient about his or her health
 * - **Definition:** A language which may be used to communicate with the patient about his or her health.
 * - **Comment:** If no language is specified, this *implies* that the default local language is spoken.  If you need to convey proficiency for multiple modes, then you need multiple Patient.Communication associations.   For animals, language is not a relevant field, and should be absent from the instance. If the Patient does not speak the default local language, then the Interpreter Required Standard can be used to explicitly declare that an interpreter is required.
 * - **Requirements:** If a patient does not speak the local language, interpreters may be required, so languages spoken and proficiency are important things to keep track of both for patient and other persons of interest.
 *
 * @category Resource Models
 * @see [FHIR Patient](http://hl7.org/fhir/StructureDefinition/Patient)
 */
export class PatientCommunicationComponent extends BackboneElement {
  /**
   * @param language - The language which can be used to communicate with the patient about his or her health
   */
  constructor(language: CodeableConcept | null) {
    super();

    this.language = null;
    if (isDefined<CodeableConcept>(language)) {
      this.setLanguage(language);
    }
  }

  /**
   * Parse the provided `Patient.communication` json to instantiate the PatientCommunicationComponent data model.
   *
   * @param sourceJson - JSON representing FHIR `Patient.communication`
   * @returns PatientCommunicationComponent data model or undefined for `Patient.communication`
   */
  public static parse(sourceJson: JSON.Value): PatientCommunicationComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const backboneJsonObj: JSON.Object = JSON.asObject(sourceJson, `PatientCommunicationComponent JSON`);
    const instance = new PatientCommunicationComponent(null);
    processBackboneElementJson(instance, backboneJsonObj);

    const missingReqdProperties: string[] = [];

    let sourceField = 'Patient.communication.language';
    let fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: CodeableConcept | undefined = parseCodeableConcept(backboneJsonObj[fieldName], sourceField);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setLanguage(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    sourceField = 'Patient.communication.preferred';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'boolean');
      const datatype: BooleanType | undefined = parseBooleanType(dtJson, dtSiblingJson);
      instance.setPreferredElement(datatype);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  /**
   * Patient.communication.language Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The language which can be used to communicate with the patient about his or her health
   * - **Definition:** The ISO-639-1 alpha 2 code in lower case for the language, optionally followed by a hyphen and the ISO-3166-1 alpha 2 code for the region in upper case; e.g. "en" for English, or "en-US" for American English versus "en-EN" for England English.
   * - **Comment:** The structure aa-BB with this exact casing is one the most widely used notations for locale. However not all systems actually code this but instead have it as free text. Hence CodeableConcept instead of code as the data type.
   * - **Requirements:** Most systems in multilingual countries will want to convey language. Not all systems actually need the regional dialect.
   * - **FHIR Type:** `CodeableConcept>`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private language: CodeableConcept | null;

  /**
   * Patient.communication.preferred Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Language preference indicator
   * - **Definition:** Indicates whether or not the patient prefers this language (over other languages he masters up a certain level).
   * - **Comment:** This language is specifically identified for communicating healthcare information.
   * - **Requirements:** People that master multiple languages up to certain level may prefer one or more, i.e. feel more confident in communicating in a particular language making other languages sort of a fall back method.
   * - **FHIR Type:** `boolean`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  private preferred?: BooleanType | undefined;

  /**
   * @returns the `language` property value as a CodeableConcept object
   */
  public getLanguage(): CodeableConcept | null {
    return this.language;
  }

  /**
   * Assigns the provided CodeableConcept object value to the `language` property.
   *
   * @param value - the `language` object value
   * @returns this
   */
  public setLanguage(value: CodeableConcept): this {
    assertIsDefined<CodeableConcept>(value, `Patient.communication.language is required`);
    const optErrMsg = `Invalid Patient.communication.language; Provided element is not an instance of CodeableConcept.`;
    assertFhirType<CodeableConcept>(value, CodeableConcept, optErrMsg);
    this.language = value;
    return this;
  }

  /**
   * @returns `true` if the `language` property exists and has a value; `false` otherwise
   */
  public hasLanguage(): boolean {
    return isDefined<CodeableConcept>(this.language) && !this.language.isEmpty();
  }

  /**
   * @returns the `preferred` property value as a PrimitiveType
   */
  public getPreferredElement(): BooleanType {
    return this.preferred ?? new BooleanType();
  }

  /**
   * Assigns the provided PrimitiveType value to the `preferred` property.
   *
   * @param element - the `preferred` value
   * @returns this
   */
  public setPreferredElement(element: BooleanType | undefined): this {
    if (isDefined<BooleanType>(element)) {
      const optErrMsg = `Invalid Patient.communication.preferred; Provided element is not an instance of BooleanType.`;
      assertFhirType<BooleanType>(element, BooleanType, optErrMsg);
      this.preferred = element;
    } else {
      this.preferred = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `preferred` property exists and has a value; `false` otherwise
   */
  public hasPreferredElement(): boolean {
    return isDefined<BooleanType>(this.preferred) && !this.preferred.isEmpty();
  }

  /**
   * @returns the `preferred` property value as a primitive value
   */
  public getPreferred(): fhirBoolean | undefined {
    return this.preferred?.getValue();
  }

  /**
   * Assigns the provided primitive value to the `preferred` property.
   *
   * @param value - the `preferred` value
   * @returns this
   * @throws PrimitiveTypeError for invalid primitive types
   */
  public setPreferred(value: fhirBoolean | undefined): this {
    if (isDefined<fhirBoolean>(value)) {
      const optErrMsg = `Invalid Patient.communication.preferred (${String(value)})`;
      this.preferred = new BooleanType(parseFhirPrimitiveData(value, fhirBooleanSchema, optErrMsg));
    } else {
      this.preferred = undefined;
    }
    return this;
  }

  /**
   * @returns `true` if the `preferred` property exists and has a value; `false` otherwise
   */
  public hasPreferred(): boolean {
    return this.hasPreferredElement();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Patient.communication';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.language, this.preferred);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): PatientCommunicationComponent {
    const dest = new PatientCommunicationComponent(this.language);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: PatientCommunicationComponent): void {
    super.copyValues(dest);
    dest.language = this.language ? this.language.copy() : null;
    dest.preferred = this.preferred?.copy();
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

    if (this.hasLanguage()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirComplexJson(this.getLanguage()!, 'language', jsonObj);
    } else {
      missingReqdProperties.push(`Patient.communication.language`);
    }

    if (this.hasPreferredElement()) {
      setFhirPrimitiveJson<fhirBoolean>(this.getPreferredElement(), 'preferred', jsonObj);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/**
 * PatientLinkComponent Subclass for `Patient.link`
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** Link to another patient resource that concerns the same actual person
 * - **Definition:** Link to another patient resource that concerns the same actual patient.
 * - **Comment:** There is no assumption that linked patient records have mutual links.
 * - **Requirements:** There are multiple use cases:    * Duplicate patient records due to the clerical errors associated with the difficulties of identifying humans consistently, and * * Distribution of patient information across multiple servers.
 *
 * @category Resource Models
 * @see [FHIR Patient](http://hl7.org/fhir/StructureDefinition/Patient)
 */
export class PatientLinkComponent extends BackboneElement {
  /**
   * @param other - Reference to the other patient or related person resource that the link refers to
   * @param type - replaced-by | replaces | refer | seealso
   */
  constructor(other: Reference | null, type: EnumCodeType | CodeType | fhirCode | null) {
    super();

    this.other = null;
    if (isDefined<Reference>(other)) {
      this.setOther(other);
    }

    this.linkTypeEnum = new LinkTypeEnum();

    this.type = constructorCodeValueAsEnumCodeType<LinkTypeEnum>(
      type,
      LinkTypeEnum,
      this.linkTypeEnum,
      'Patient.link.type',
    );
  }

  /**
   * Parse the provided `Patient.link` json to instantiate the PatientLinkComponent data model.
   *
   * @param sourceJson - JSON representing FHIR `Patient.link`
   * @returns PatientLinkComponent data model or undefined for `Patient.link`
   */
  public static parse(sourceJson: JSON.Value): PatientLinkComponent | undefined {
    if (!isDefined<JSON.Value>(sourceJson) || (JSON.isJsonObject(sourceJson) && isEmpty(sourceJson))) {
      return undefined;
    }
    const backboneJsonObj: JSON.Object = JSON.asObject(sourceJson, `PatientLinkComponent JSON`);
    const instance = new PatientLinkComponent(null, null);
    processBackboneElementJson(instance, backboneJsonObj);

    const missingReqdProperties: string[] = [];

    let sourceField = 'Patient.link.other';
    let fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const datatype: Reference | undefined = parseReference(backboneJsonObj[fieldName], sourceField);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setOther(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    sourceField = 'Patient.link.type';
    fieldName = extractFieldName(sourceField);
    if (fieldName in backboneJsonObj) {
      const { dtJson, dtSiblingJson } = getPrimitiveTypeJson(backboneJsonObj, sourceField, fieldName, 'string');
      const datatype: CodeType | undefined = parseCodeType(dtJson, dtSiblingJson);
      if (datatype === undefined) {
        missingReqdProperties.push(sourceField);
      } else {
        instance.setTypeElement(datatype);
      }
    } else {
      missingReqdProperties.push(sourceField);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_REQD_IN_JSON} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return instance;
  }

  /**
   * FHIR CodeSystem: LinkType
   *
   * @see {@link LinkTypeEnum}
   */
  private readonly linkTypeEnum: LinkTypeEnum;

  /**
   * Patient.link.other Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** The other patient or related person resource that the link refers to
   * - **Definition:** The other patient resource that the link refers to.
   * - **Comment:** Referencing a RelatedPerson here removes the need to use a Person record to associate a Patient and RelatedPerson as the same individual.
   * - **FHIR Type:** `Reference`
   *   - _TargetProfiles_: [ 'http://hl7.org/fhir/StructureDefinition/Patient', 'http://hl7.org/fhir/StructureDefinition/RelatedPerson' ]
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private other: Reference | null;

  /**
   * Patient.link.type Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** replaced-by | replaces | refer | seealso
   * - **Definition:** The type of link between this patient resource and another patient resource.
   * - **FHIR Type:** `code`
   * - **Cardinality:** 1..1
   * - **isModifier:** false
   * - **isSummary:** true
   */
  private type: EnumCodeType | null;

  /**
   * @returns the `other` property value as a Reference object
   */
  public getOther(): Reference | null {
    return this.other;
  }

  /**
   * Assigns the provided Reference object value to the `other` property.
   *
   * @decorator `@ReferenceTargets('Patient.link.other', ['Patient', 'RelatedPerson'])`
   *
   * @param value - the `other` object value
   * @returns this
   */
  @ReferenceTargets('Patient.link.other', ['Patient', 'RelatedPerson'])
  public setOther(value: Reference): this {
    assertIsDefined<Reference>(value, `Patient.link.other is required`);
    // assertFhirType<Reference>(value, Reference) unnecessary because @ReferenceTargets decorator ensures proper type/value
    this.other = value;
    return this;
  }

  /**
   * @returns `true` if the `other` property exists and has a value; `false` otherwise
   */
  public hasOther(): boolean {
    return isDefined<Reference>(this.other) && !this.other.isEmpty();
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
    assertIsDefined<EnumCodeType>(enumType, `Patient.link.type is required`);
    const errMsgPrefix = `Invalid Patient.link.type`;
    assertEnumCodeType<LinkTypeEnum>(enumType, LinkTypeEnum, errMsgPrefix);
    this.type = enumType;
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasTypeEnumType(): boolean {
    return isDefined<EnumCodeType>(this.type) && !this.type.isEmpty() && this.type.fhirCodeEnumeration.length > 0;
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
    assertIsDefined<CodeType>(element, `Patient.link.type is required`);
    const optErrMsg = `Invalid Patient.link.type; Provided value is not an instance of CodeType.`;
    assertFhirType<CodeType>(element, CodeType, optErrMsg);
    this.type = new EnumCodeType(element, this.linkTypeEnum);
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
    assertIsDefined<fhirCode>(value, `Patient.link.type is required`);
    const optErrMsg = `Invalid Patient.link.type (${String(value)})`;
    this.type = new EnumCodeType(parseFhirPrimitiveData(value, fhirCodeSchema, optErrMsg), this.linkTypeEnum);
    return this;
  }

  /**
   * @returns `true` if the `type` property exists and has a value; `false` otherwise
   */
  public hasType(): boolean {
    return this.hasTypeEnumType();
  }

  /**
   * {@inheritDoc IBase.fhirType}
   */
  public override fhirType(): string {
    return 'Patient.link';
  }

  /**
   * {@inheritDoc IBase.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.other, this.type);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): PatientLinkComponent {
    const dest = new PatientLinkComponent(this.other, this.type);
    this.copyValues(dest);
    return dest;
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: PatientLinkComponent): void {
    super.copyValues(dest);
    dest.other = this.other ? this.other.copy() : null;
    dest.type = this.type ? this.type.copy() : null;
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

    if (this.hasOther()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirComplexJson(this.getOther()!, 'other', jsonObj);
    } else {
      missingReqdProperties.push(`Patient.link.other`);
    }

    if (this.hasTypeElement()) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      setFhirPrimitiveJson<fhirCode>(this.getTypeElement()!, 'type', jsonObj);
    } else {
      missingReqdProperties.push(`Patient.link.type`);
    }

    if (missingReqdProperties.length > 0) {
      const errMsg = `${REQUIRED_PROPERTIES_DO_NOT_EXIST} ${missingReqdProperties.join(', ')}`;
      throw new FhirError(errMsg);
    }

    return jsonObj;
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
