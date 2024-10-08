# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

### Changed

### Deprecated

### Removed

### Fixed

### Security

---

## [0.8.0] - 2024-10-10

### Added

- InvalidDateTimeError
- DateTime utilities for Luxon DateTime library

### Changed

- Updated dependencies
- Implemented interfaces for use of DateTime related utilities in DateType, DataTimeType, and InstantType


## [0.7.4] - 2024-09-27

### Added

- Added support to ensure polymorphic and open data types only accepts target data types

### Changed

- Renamed ResourceType to FhirResourceType


## [0.7.3] - 2024-09-26

### Changed

- Updated dependencies
- Completed applying parameter type assertions
- Replaced all static `parse` functions from primitive data type classes to a generic parse function defined in primitive-types.ts
- Resolved circular dependencies


## [0.7.2] - 2024-09-13

### Added

- Added type guard and type assertion functions and updated tests

### Changed

- Broke up Group test suite into files for each Group class


## [0.7.1] - 2024-09-12

### Added

- Added decorator ReferenceTargets
- Added FhirResourceType type


## [0.7.0] - 2024-09-11

### Added

- Added static parse method to all PrimitiveType classes; Used new parse method to replace redundant code


## [0.6.0] - 2024-09-09

### Changed

- Filled out Group resource
- Updated tempTemplateTypeMethods and ensure existing code is consistent with the templates


## [0.5.3] - 2024-09-05

### Added

- Added following complex data types for FHIR Group
  - CodeableConcept
  - Identifier
  - Quantity
  - Range
  - Reference
  - SimpleQuantity
- Added QuantityComparatorEnum code system

### Changed

- Reorganized the source and test directory structure

### Fixed

- Resolved circular dependencies


## [0.5.2] - 2024-09-02

### Added

- Added stub class for Group
- Added FHIR CodeSystem: GroupTypeEnum

### Changed

- Updated all class and property headers using new template headers
- Renamed FHIR code interfaces and code definition object

### Fixed

- Fixed Narrative - properties are required (1..1)


## [0.5.1] - 2024-08-30

### Added

- Added `public abstract resourceType(): string;` to Resource

### Changed

- Changed all `getXxxxElement` methods to "auto create" an empty `XxxxType` rather than returning undefined.
  See "Auto Create DataType Elements on `getXxxxElement`" section under "Design Decisions" in [design-note.md](./dev-docs/design-notes.md)


## [0.5.0] - 2024-08-29

### Added

- Added complex data types: Coding, Meta, Narrative
- Added FHIR resources: Resource, DomainResource
- Added support for CodeTypes having a required enumerated code system
  - Added primitive data types: EnumCodeType
  - Added FHIR code system: NarrativeStatusEnum
- Added support for TypeDoc and the ability to generate library documentation
-
### Changed

- Updated dependencies
- Added/changed "JSDoc" headers compatible with TypeDoc
- Minor updates to improve tests

### Fixed

- Fixed several bugs identified from additional tests

### Security

- Overrode micromatch to version 4.0.8 to resolve [CVE-2024-4067](https://github.com/advisories/GHSA-952p-6rrq-rcjv)


## [0.4.0] - 2024-08-23

### Added

- Added dev dependency on TypeDoc

### Changed

- Added/updated "JSDoc" comment blocks in a current code
- Added ability to generate project documentation


## [0.3.0] - 2024-08-20

### Added

- Added additional WIP content including unit tests:
  - the remaining primitive datatype models

### Changed

- Minor updates to original primitive datatype models and PrimitiveType


## [0.2.0] - 2024-08-20

### Added

- Added initial WIP content including unit tests:
  - base model (minimal implementation)
  - core models based on the [FHIR Type Framework](https://hl7.org/fhir/R5/types.html)
  - Extension model
  - primitive type definitions
  - selected primitive datatype models
  - Period complex data type model

### Changed

- Updated dependencies
- Minor updates to various project configurations

### Removed

- Removed the source and tests from the `typescript-template` project

## [0.1.0] - 2024-07-19

### Added

- `typescript-hapi-models-poc` project initialized from `typescript-template` project
