# TODO

## POC Feature Set

- Document logic for combinations for `@OpenDataTypesMeta()` when used in array(s)
- Investigate strategies to resolve circular references caused by:
  - fhir-contained-resource-parser/getFhirModelParseResults(...)
  - fhir-parsers/getValueXData(...)

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
