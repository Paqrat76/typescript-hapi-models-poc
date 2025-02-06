# TODO

## POC Feature Set

- Investigate pushing parsers into data models to put them in the data models as in the FHIR data models while
  eliminating circular references:
  - including primitive data type parsers in PrimitiveType or in individual primitive data models
  - including static parse methods in complex data types
- Determine whether to hand-craft all Complex data types or code generate all Complex data types based on parser
  investigation above

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
