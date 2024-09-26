# TODO

## POC Feature Set

- Investigate and implement approach to ensure polymorphic data types only accepts target data types.
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
