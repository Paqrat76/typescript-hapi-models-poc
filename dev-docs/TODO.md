# TODO

## POC Feature Set

- Investigate pushing parsers into data models to put them in the data models as in the FHIR data models while
  eliminating circular references:
  - including primitive data type parsers in PrimitiveType or in individual primitive data models
  - including static parse methods in complex data types
- Determine whether to hand-craft all Complex data types or code generate all Complex data types based on parser
  investigation above

## Comprehensive Data Model Testing

Add hand-crafted test (mock) FHIR data models for comprehensive template testing.
This primary test data model should support the following requirements:

- Extends DomainResource
- Nested BackboneElements
- Shared BackboneElement (`StructureDefinition.contentReference`)
- Fields to represent the following data element types
  - BackboneElement type
  - Choice data type (uses decorators)
  - Complex data type
  - EnumCodeType (required internal FHIR codes)
  - Open data type (uses decorators)
  - Primitive data type
  - Reference data type (uses decorators)
  - Resource data type
- Fields to demonstrate the following characteristics for each of the above data element types
  - Optional single field (0..1)
  - Required single field (1..1)
  - Optional list field (0..\*)
  - Required list field (1..\*)
  - copyValues() example for each of the four above characteristics
  - All get/set/has methods for each single field as appropriate for the data type
  - All get/set/has/add/init methods for each list field as appropriate for the data type
- Fully defined `toJson()` method
- Fully defined static `parse()` method
- Uses actual FHIR complex and primitive types in src/fhir-core/datatypes
- Uses hand-crafted test (mock) FHIR code systems (implements IFhirCodeEnum)
- Uses a simple hand-crafted test (mock) FHIR data model to be used for testing `DomainResource.contained`

Setup functional testing to verify implementation of HAPI FHIR features:

- Adding simple and complex and multiple extensions and modifierExtensions within DataTypes and Resources
- [Working With Resources](https://hapifhir.io/hapi-fhir/docs/model/working_with_resources.html)
- [Resource References](https://hapifhir.io/hapi-fhir/docs/model/references.html)
- [Profiles and Extensions](https://hapifhir.io/hapi-fhir/docs/model/profiles_and_extensions.html)

## Possible Considerations (future roadmap)

- Investigate approaches to implementing complex data type invariant "rules" (e.g., Period: "+ Rule: If present,
  start SHALL have a lower value than end")
- Investigate approaches to implementing resource invariant "rules"/"constraints"
- Investigate serialization output option to only include FHIR "summary" fields
  - Ref: [Summary](https://hl7.org/fhir/r4/search.html#summary)
- HAPI FHIR Features
  - [Custom Structures](https://hapifhir.io/hapi-fhir/docs/model/custom_structures.html)
  - [Bundle Builder](https://hapifhir.io/hapi-fhir/docs/model/bundle_builder.html)
  - [Narrative Generator](https://hapifhir.io/hapi-fhir/docs/model/narrative_generation.html)
