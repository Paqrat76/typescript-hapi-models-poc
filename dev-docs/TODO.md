# TODO

## POC Feature Set

- Add several more hand-crafted FHIR models to verify template examples for the FHIR data model code generator.
  Consider the following:
  - [Bundle](https://hl7.org/fhir/R4/bundle.html)
    - extends Resource rather than DomainResource
    - nested BackboneElements
    - includes reference to other fields in resource (`link`)
  - [Parameters](https://hl7.org/fhir/R4/parameters.html)
    - extends Resource rather than DomainResource
    - contains single field of BackboneElement type
    - includes reference to same FHIR resource
    - includes "open" data type (`value[x]`)
  - [Provenance](https://hl7.org/fhir/R4/provenance.html)
    - polymorphic field (`occurred[x]`);
    - includes reference to other fields in resource (`agent`)
  - [QuestionnaireResponse](https://hl7.org/fhir/R4/questionnaireresponse.html)
    - nested BackboneElements
    - polymorphic field (`value[x]`);
    - nested references to parent BackboneElement (`item`)
  - etc. ...
- Determine whether to hand-craft all Complex data types or code generate all Complex data types
- Investigate pushing parsers into data models to put them in the data models as in the FHIR data models while
  eliminating circular references:
  - including primitive data type parsers in PrimitiveType or in individual primitive data models
  - including static parse methods in complex data types
- Consider throwing an Error from "get" methods rather than returning null for required data elements
- Setup functional testing to verify implementation of HAPI FHIR features
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
