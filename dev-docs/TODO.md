# TODO

## POC Feature Set

- Make PrimitiveType `encode()` and `decode()` static methods. Use these static methods to replace
  existing primitive handling code in constructors and primitive methods.
- Decide on whether `resourceType()` should return a string based on `fhirType()` or an `enum ResourceType`.
- Investigate and implement approach to ensure `Reference.reference` only accepts target references.
- Investigate and implement approach to runtime parameter assertions (e.g., not null, not undefined, not empty,
  appropriate type, etc.)
- Add Date handling for FHIR `date`/`dateTime`/`time`/`instant` using [Luxon](https://moment.github.io/luxon/#/?id=luxon)
- Investigate and implement serialization/parsing (deserialization) for all FHIR data models
  - For inspiration, see HAPI FHIR [Parsing and Serialization](https://hapifhir.io/hapi-fhir/docs/model/parsers.html)
- Setup functional testing to verify implementation of HAPI FHIR features
  - Adding simple and complex and multiple extensions and modifierExtensions within DataTypes and Resources
  - [Working With Resources](https://hapifhir.io/hapi-fhir/docs/model/working_with_resources.html)
  - [Resource References](https://hapifhir.io/hapi-fhir/docs/model/references.html)
  - [Profiles and Extensions](https://hapifhir.io/hapi-fhir/docs/model/profiles_and_extensions.html)

## Possible Considerations (future roadmap)

- HAPI FHIR Features
  - [Custom Structures](https://hapifhir.io/hapi-fhir/docs/model/custom_structures.html)
  - [Bundle Builder](https://hapifhir.io/hapi-fhir/docs/model/bundle_builder.html)
