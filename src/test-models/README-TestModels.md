# Comprehensive Data Model Testing

## Background

The ultimate intent is for a code generator to consume FHIR `StructureDefinition`s for a specified FHIR release that
generates TypeScript classes (data models) representing each FHIR resource.

The generated TypeScript classes are not just "plain old objects" - they are sophisticated data models.
They include private data element properties and public methods that provide for reading and modifying the values of
these data elements.
Public helper methods are provided to help identify the type of FHIR resource and to facilitate the handling
of class instances.
Additionally, they contain public methods used to serialize and deserialize the data according to the FHIR
specification.

Testing generated classes is not feasible, so we must test the patterns used to generate these data models.
FHIR resources have many common characteristics that can be defined in various patterns that will be used by the
code generator templates. These various patterns can be tested giving us confidence that generated classes will be
dependable.

An extensive TypeScript library has been created for use within the generated TypeScript classes.
This core library contains the FHIR primitive and complex data type definitions used by the generated classes
as well as various common utilities and helpers required by the generated TypeScript classes.
This library includes its own comprehensive test suite.

Code template patterns have been defined making use of this library.
Testing these code template patterns is necessary to ensure generated code works as expected.
To accomplish this, we will use hand-crafted test (mock) FHIR data models to be used in testing.
These hand-crafted test data models will include all supported patterns to ensure these patterns and their use of
the core library work as expected.

## Data Model Requirements

This primary test FHIR data model should support the following requirements:

- Extends `DomainResource`
  Handcrafted data models for `Parameters` and `Bundle` exist that extend `Resource`
- Contains nested `BackboneElement`s
- Contains a shared `BackboneElement` (`StructureDefinition.contentReference`)
- Fields to represent the following data element types
  - BackboneElement type
  - Choice data type (uses TypeScript decorators) (single field only)
  - Complex data type
  - EnumCodeType (required internal FHIR codes)
  - Open data type (uses TypeScript decorators) (single field only)
  - Primitive data type
  - Reference data type (uses TypeScript decorators)
  - Resource data type
    > NOTE: While no specific rule exists in the FHIR specification, use of Resource as an element data type is
            limited to Bundle and Parameters. In these use cases, the data element is always a single, optional
            value (0..1).
            The exception is the DomainResource.contained. It is always an optional list (0..*).
- Fields to demonstrate the following characteristics for each of the above data element types:
  - Optional single field (cardinality `0..1`)
    - [x] BackboneElement type / TBD01
    - [x] Choice data type / **choice01**
    - [x] Complex data type / **complex01**
    - [x] EnumCodeType / **enumCode01**
    - [x] Open data type / **open01**
    - [x] Primitive data type / **primitive01**
    - [x] Reference data type / **reference01**
    - [x] Resource data type / **resource01**
  - Required single field (cardinality `1..1`)
    - [x] BackboneElement type / TBD11
    - [x] Choice data type / **choice11**
    - [x] Complex data type / **complex11**
    - [x] EnumCodeType / **enumCode11**
    - [x] Open data type / **open11**
    - [x] Primitive data type / **primitive11**
    - [x] Reference data type / **reference11**
  - Optional list field (cardinality `0..*`)
    - [x] BackboneElement type / TBD0x
    - [x] Complex data type / **complex0x**
    - [x] EnumCodeType / **enumCode0x**
    - [x] Primitive data type / **primitive0x**
    - [x] Reference data type / **reference0x**
  - Required list field (cardinality `1..*`)
    - [x] BackboneElement type / TBD1x
    - [x] Complex data type / **complex1x**
    - [x] EnumCodeType / **enumCode1x**
    - [x] Primitive data type / **primitive1x**
    - [x] Reference data type / **reference1x**
- All get/set/has methods for each single field as appropriate for the data type
- All get/set/has/add/init methods for each list field as appropriate for the data type
- `copyValues()` examples for each of the four cardinality characteristics:

  - Optional single field (cardinality `0..1`)

    ```typescript
    dest.xxxxFieldName = this.xxxxFieldName?.copy();
    ```

  - Required single field (cardinality `1..1`)

    ```typescript
    dest.xxxxFieldName = this.xxxxFieldName ? this.xxxxFieldName.copy() : null;
    ```

  - Optional list field (cardinality `0..*`)

    ```typescript
    const xxxxFieldNameList = copyListValues<XxxxDataType>(this.xxxxFieldName);
    dest.xxxxFieldName = xxxxFieldNameList.length === 0 ? undefined : xxxxFieldNameList;
    ```

  - Required list field (cardinality `1..*`)

    ```typescript
    const xxxxFieldNameList = copyListValues<XxxxDataType>(this.xxxxFieldName);
    dest.xxxxFieldName = xxxxFieldNameList.length === 0 ? null : xxxxFieldNameList;
    ```

- Fully defined `toJson()` method
- Fully defined static `parse()` method
- Uses appropriate utilities/helpers defined in the core library
- Uses actual FHIR complex and primitive types defined in the core library
- Uses several FHIR code systems (implements `IFhirCodeEnum`) to be used only for testing
  - [x] ContributorTypeEnum: https://hl7.org/fhir/R4/codesystem-contributor-type.html
  - [x] ConsentStateEnum: https://hl7.org/fhir/R4/codesystem-consent-state-codes.html
  - [x] TaskCodeEnum: https://hl7.org/fhir/R4/codesystem-task-code.html
  - [x] TaskStatusEnum: https://hl7.org/fhir/R4/codesystem-task-status.html
- Uses a simple hand-crafted test (mock) FHIR data model to be used for testing `DomainResource.contained`

## Data Model Definition

### TestDataModel Base Requirements

- `resourceType`: `Basic` // Must be a valid FHIR resource type
- `fhirType()` => `TestDataModel`
- BackboneElement nesting
  - TestDataModelPrimitiveComponent
  - TestDataModelComplexComponent
    - TestDataModelReferenceComponent
      - TestDataModelEnumCodeComponent

### TestDataModel Class Definitions

- TestDataModel

  - choice01?: Range | Quantity | undefined;
  - open01?: DataType | undefined;
  - resource01?: Resource | undefined;
  - backbonePrimitive0x?: TestDataModelPrimitiveComponent[] | undefined;
  - backboneComplex01?: TestDataModelComplexComponent | undefined;

- TestDataModelPrimitiveComponent

  - primitive01?: DateTimeType | undefined;
  - primitive0x?: IntegerType[] | undefined;
  - primitive11: BooleanType | null;
  - primitive1x: StringType[] | null;
  - choice11: UriType | StringType | null;

- TestDataModelComplexComponent

  - complex01?: HumanName | undefined;
  - complex0x?: Address[] | undefined;
  - complex11: Period | null;
  - complex1x: Attachment[] | null;
  - open11: DataType | null;
  - backboneReference11: TestDataModelReferenceComponent | null;

- TestDataModelReferenceComponent

  - reference01?: Reference | undefined; // ANY
  - reference0x?: Reference[] | undefined; // Practitioner, PractitionerRole, Organization
  - reference11: Reference | null; // Patient, Person (for testing `contained`)
  - reference1x: Reference[] | null; // Condition
  - backboneEnumCode1x: TestDataModelEnumCodeComponent[] | null;

- TestDataModelEnumCodeComponent
  - enumCode01?: EnumCodeType | undefined; // TaskCodeEnum
  - enumCode0x?: EnumCodeType[] | undefined; // ContributorTypeEnum
  - enumCode11: EnumCodeType | null; // TaskStatusEnum
  - enumCode1x: EnumCodeType[] | null; // ConsentStateEnum
  - backbonePrimitive0x?: TestDataModelPrimitiveComponent[] | undefined;

### SimplePersonModel Class Definition

NOTE: Used for `DomainResource.contained` testing

- SimplePersonModel
  - ResourceType() => `Person` // Must be a valid FHIR resource type
  - `fhirType()` => `SimplePersonModel`
  - identifier?: Identifier | undefined;
  - name?: HumanName | undefined;
  - address?: Address | undefined
  - phone?: StringType | undefined
