# TODO

## POC Feature Set

- Add several more hand-crafted FHIR models to verify template examples for the FHIR data model code generator.
  Consider the following:
  - [Patient](https://hl7.org/fhir/R4/patient.html)
    - Most important FHIR resource!!
  - [Organization](https://hl7.org/fhir/R4/organization.html)
    - simple resource that is referenced by many other resources (`contained` example for other resources)
  - [Bundle](https://hl7.org/fhir/R4/bundle.html)
    - extends Resource rather than DomainResource
    - nested BackboneElements
    - includes reference to another fields in resource (`link`)
  - [Parameters](https://hl7.org/fhir/R4/parameters.html)
    - extends Resource rather than DomainResource
    - contains single field of BackboneElement type
    - includes reference to same FHIR resource
    - includes "open" data type (`value[x]`)
  - [OperationOutcome](https://hl7.org/fhir/R4/operationoutcome.html)
    - contains single field of BackboneElement type
  - [Provenance](https://hl7.org/fhir/R4/provenance.html)
    - polymorphic field (`occurred[x]`);
    - includes reference to another fields in resource (`agent`)
  - [QuestionnaireResponse](https://hl7.org/fhir/R4/questionnaireresponse.html)
    - nested BackboneElements
    - polymorphic field (`value[x]`);
    - nested references to parent BackboneElement (`item`)
  - etc. ...
- Consider throwing an Error from "get" methods rather than returning null for required data elements
- Setup functional testing to verify implementation of HAPI FHIR features
  - Adding simple and complex and multiple extensions and modifierExtensions within DataTypes and Resources
  - [Working With Resources](https://hapifhir.io/hapi-fhir/docs/model/working_with_resources.html)
  - [Resource References](https://hapifhir.io/hapi-fhir/docs/model/references.html)
  - [Profiles and Extensions](https://hapifhir.io/hapi-fhir/docs/model/profiles_and_extensions.html)

## Possible Considerations (future roadmap)

- Investigate serialization output option to only include FHIR "summary" fields
  - Ref: [Summary](https://hl7.org/fhir/r4/search.html#summary)
- HAPI FHIR Features
  - [Custom Structures](https://hapifhir.io/hapi-fhir/docs/model/custom_structures.html)
  - [Bundle Builder](https://hapifhir.io/hapi-fhir/docs/model/bundle_builder.html)
  - [Narrative Generator](https://hapifhir.io/hapi-fhir/docs/model/narrative_generation.html)
