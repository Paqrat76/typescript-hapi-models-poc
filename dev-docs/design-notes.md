# Project Design Notes

## General References

- [Handling Class Libraries in Node.js (With and Without TypeScript)](https://betterprogramming.pub/handling-class-libraries-in-node-js-with-and-without-typescript-39b73b2186b6)

### FHIR Specifications

- [FHIR R4](https://hl7.org/fhir/R4)
- [FHIR R4B](https://hl7.org/fhir/R4B)
- [FHIR R5](https://hl7.org/fhir/R5)
- [FHIR (6.0.0-ballot2)](https://hl7.org/fhir/6.0.0-ballot2)
- [FHIR (CI-build)](https://build.fhir.org/index.html)

### HAPI FHIR

#### Reference Links

- hapi-fhir-base ([JavaDoc](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-base/), [Source](https://github.com/hapifhir/hapi-fhir/tree/master/hapi-fhir-base))
- hapi-fhir-structures-r4 ([JavaDoc](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-structures-r4/))
- hapi-fhir-structures-r5 ([JavaDoc](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-structures-r5/))
- org.hl7.fhir.core ([Source](https://github.com/hapifhir/org.hl7.fhir.core))
  - org.hl7.fhir.r4 ([Source](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r4))
  - org.hl7.fhir.r4b ([Source](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r4b))
  - org.hl7.fhir.r5 ([Source](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r5))

#### Package Links

##### hapifhir/hapi-fhir

GitHub: [hapifhir/hapi-fhir](https://github.com/hapifhir/hapi-fhir)

- HAPI base classes and interfaces: [ca.uhn.fhir.model.api](https://github.com/hapifhir/hapi-fhir/tree/master/hapi-fhir-base/src/main/java/ca/uhn/fhir/model/api)
  - [JavaDocs](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-base/ca/uhn/fhir/model/api/package-summary.html)
- HAPI Annotations: [ca.uhn.fhir.model.api.annotation](https://github.com/hapifhir/hapi-fhir/tree/master/hapi-fhir-base/src/main/java/ca/uhn/fhir/model/api/annotation)
  - [JavaDocs](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-base/ca/uhn/fhir/model/api/annotation/package-summary.html)
- HAPI FHIR primitive definition classes (XxxxDt): [ca.uhn.fhir.model.primitive](https://github.com/hapifhir/hapi-fhir/tree/master/hapi-fhir-base/src/main/java/ca/uhn/fhir/model/primitive)
  - [JavaDocs](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-base/ca/uhn/fhir/model/primitive/package-summary.html)
- FHIR base interfaces: [org.hl7.fhir.instance.model.api](https://github.com/hapifhir/hapi-fhir/tree/master/hapi-fhir-base/src/main/java/org/hl7/fhir/instance/model/api)
  - [JavaDocs](https://hapifhir.io/hapi-fhir/apidocs/hapi-fhir-base/org/hl7/fhir/instance/model/api/package-summary.html)

##### hapifhir/org.hl7.fhir.core

GitHub: [hapifhir/org.hl7.fhir.core](https://github.com/hapifhir/org.hl7.fhir.core)

- Core FHIR R4: [org.hl7.fhir.r4](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4)

  - Element model classes: [org.hl7.fhir.r4.elementmodel](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/elementmodel)
  - FHIR datatype and resource classes: [org.hl7.fhir.r4.model](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model)
    - Includes `XxxxType` that extends `PrimitiveType<T>` that extends `Type`

- Core FHIR R5: [org.hl7.fhir.r5](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r5/src/main/java/org/hl7/fhir/r5)
  - Element model classes: [org.hl7.fhir.r5.elementmodel](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r5/src/main/java/org/hl7/fhir/r5/elementmodel)
  - Extensions: [org.hl7.fhir.r5.extensions](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r5/src/main/java/org/hl7/fhir/r5/extensions)
  - FHIR datatype and resource classes: [org.hl7.fhir.r5.model](https://github.com/hapifhir/org.hl7.fhir.core/tree/master/org.hl7.fhir.r5/src/main/java/org/hl7/fhir/r5/model)

## TypeScript Runtime Data Validator References

- A TypeScript Runtime Data Validators Comparison
  - [Part 1: Introduction](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-50a6abf3c559)
  - [Part 2: io-ts](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-eeedc6b0583a)
  - [Part 3: joi](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-c422e431926a)
  - [Part 4: yup](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-15f0ea2e3265)
  - [Part 5: ajv](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-cdbb532f0b89)
  - [Part 6: zod](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-92887e22ee65)
  - [Part 7: superstruct](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-67cb9abb599b)
- NPM Trends: [ajv vs io-ts vs joi vs superstruct vs yup vs zod](https://npmtrends.com/ajv-vs-io-ts-vs-joi-vs-superstruct-vs-yup-vs-zod)
- Head-to-Head: [io-ts vs Zod vs superstruct Analysis](https://moiva.io/?npm=io-ts+superstruct+zod)

### \*\*\* Zod Library

- [zod](https://www.npmjs.com/package/zod)
  - Documentation [Zod](https://zod.dev/)
    - [Ecosystem](https://zod.dev/?id=ecosystem)
  - GitHub [colinhacks/zod](https://github.com/colinhacks/zod)
  - Tutorial [Zod](https://www.totaltypescript.com/tutorials/zod)
- Zod Related Libraries
  - Zod [API Libraries](https://zod.dev/?id=api-libraries)
  - Zod [Zod to X](https://zod.dev/?id=zod-to-x)
  - Zod [X to Zod](https://zod.dev/?id=x-to-zod)
  - Zod [Mocking](https://zod.dev/?id=mocking)
  - Zod [Utilities for Zod](https://zod.dev/?id=utilities-for-zod)
  - [zod-validation-error](https://www.npmjs.com/package/zod-validation-error)
  - [zod-error](https://www.npmjs.com/package/zod-error)
  - [zod-metadata](https://www.npmjs.com/package/zod-metadata) - metadata support for Zod schemas
  - [zod-opts](https://www.npmjs.com/package/zod-opts) - parsing and validating command-line arguments
  - [validatorjs/validator.js](https://github.com/validatorjs/validator.js) - use in conjunction with `Refinements`
  - [NPM zod Search](https://www.npmjs.com/search?q=keywords:zod)
- Articles
  - [A step-by-step guide on how to use Zod Library to build type-safe applications with TypeScript.](https://medium.com/@brianridolcedev/a-step-by-step-guide-on-how-to-use-zod-library-to-build-type-safe-applications-with-typescript-7010d46e1200)
  - [Schema validation in TypeScript with Zod](https://blog.logrocket.com/schema-validation-typescript-zod/)
  - [Effortless Data Validation with Zod](https://blog.stackademic.com/boost-your-typescript-skills-effortless-data-validation-with-zod-4eb05177fb5f)
  - [Validate Environment Variables With Zod](https://catalins.tech/validate-environment-variables-with-zod/)
  - [Zod: Zero to Hero Series](https://dev.to/shaharke/series/26937)

### superstruct Library

- [superstruct](https://www.npmjs.com/package/superstruct)
  - Documentation [Superstruct](https://docs.superstructjs.org/)

### io-ts Library

- FHIR Types (using io-ts)
  - [Handle FHIR Objects with Typescript (and Javascript)](https://medium.com/@ahryman40k/handle-fhir-objects-in-typescript-and-javascript-7110f5a0686f)
  - [typescript-fhir-types](https://github.com/Ahryman40k/typescript-fhir-types) (2019)
  - [typescript-fhir-types](https://github.com/imaware/typescript-fhir-types) (2022 - forked from above)
- [io-ts](https://www.npmjs.com/package/io-ts)
  - Peer [fp-ts](https://www.npmjs.com/package/fp-ts)
  - Documentation [index.md](https://github.com/gcanti/io-ts/blob/HEAD/index.md)
- [io-ts-types](https://www.npmjs.com/package/io-ts-types)
  - Documentation [Modules](https://gcanti.github.io/io-ts-types/docs/modules)
- [io-ts-extra](https://www.npmjs.com/package/io-ts-extra)
- Articles
  - [How I use io-ts to guarantee runtime type safety in my TypeScript](https://kieran.casa/io-ts/)
  - [Bridging Static and Runtime Types with io-ts](https://tooploox.com/bridging-static-and-runtime-types-with-io-ts)
  - [Unlocking the Power of Type Encoding / Decoding with io-ts](https://marcoghiani.com/blog/runtime-type-encoding-decoding-io-ts)
  - [Run-Time Type Checking in TypeScript with io-ts](https://www.azavea.com/blog/2020/10/29/run-time-type-checking-in-typescript-with-io-ts/)
  - [Creating Custom io-ts Decoders for Runtime Parsing](https://medium.com/agiledigital/creating-custom-io-ts-decoders-for-runtime-parsing-ffbfc8705bfa)
  - [Typescript Runtime Validation With io-ts](https://medium.com/swlh/typescript-runtime-validation-with-io-ts-456f095b7f86)
  - [Printing Useful io-ts Errors](https://observablehq.com/@awhitty/printing-useful-io-ts-errors)
  - [Using fp-ts and io-ts: types and implementation](https://dev.to/ruizb/using-fp-ts-and-io-ts-types-and-implementation-1k6a)
  - [Bounded types in io-ts](https://dev.to/derp/bounded-types-in-io-ts-28g5)
- Simple Examples
  - [Typescript json validation with io-ts](https://til.cybertec-postgresql.com/post/2019-09-16-Typescript-json-validation-with-io-ts/)
  - [Types with IO-TS](https://www.madsbuch.com/types-with-ts-io)
- Tools
  - Transform Tools [JSON to io-ts](https://transform.tools/json-to-io-ts)
  - jsDocs.io [io-ts](https://www.jsdocs.io/package/io-ts)

## JavaScript Object Serialization/Deserialization

### FHIR Guidance

- FHIR [JSON representation of primitive elements](https://hl7.org/fhir/R5/json.html#primitive)

  - **Representation**
    - FHIR elements with primitive datatypes are represented in two parts:
      - A JSON property with the name of the element, which has a JSON type of `number`, `boolean`, or `string`
      - a JSON property with \_ prepended to the name of the element, which, if present, contains the value's `id` and/or `extensions`
    - The FHIR types `integer`, `unsignedInt`, `positiveInt` and `decimal` are represented as a `JSON number`,
      the FHIR type `boolean` as a `JSON boolean`, and all other types (including `integer64`) are represented as a
      `JSON string` which has the same content as that specified for the relevant datatype. Whitespace is always
      significant (i.e. no leading and trailing spaces for non-strings).
  - **Repeating Primitives (`x..*`)**

    - In the case where the primitive element may repeat, it is represented in two arrays. `JSON null` values are used
      to fill out both arrays so that the `id` and/or `extension` are aligned with the matching value in the first array.

      ```json
        "code": [ "au", "nz" ],
        "_code": [
          null,
          {
            "extension" : [ {
              "url" : "http://hl7.org/fhir/StructureDefinition/display",
              "valueString" : "New Zealand a.k.a Kiwiland"
            }]
          }
        ]
      ```

### Libraries

- [One naïve man’s struggle with TypeScript class serialization](https://medium.com/@aems/one-mans-struggle-with-typescript-class-serialization-478d4bbb5826)
- [Mastering Type-Safe JSON Serialization in TypeScript](https://hackernoon.com/mastering-type-safe-json-serialization-in-typescript)
  - Consider superstruct library above?
- [Deserializing JSON in TypeScript](https://www.bytefish.de/blog/json_deserizaltion_with_typescript.html)
- [typescript-json-serializer](https://www.npmjs.com/package/typescript-json-serializer) - uses experimentalDecorators
- [ts-jackson](https://www.npmjs.com/package/ts-jackson) - uses experimentalDecorators
- [ts-serializable](https://www.npmjs.com/package/ts-serializable) - uses experimentalDecorators
- [serializr](https://www.npmjs.com/package/serializr) - uses experimentalDecorators
- [TypeSerializer](https://www.npmjs.com/package/typeserializer) - VERY OLD!
- NPM [keywords:JSON reviver](https://www.npmjs.com/search?q=keywords%3AJSON%20reviver)
  - [Custom Types Serializer](https://www.npmjs.com/package/custom-types-serializer)
- [DeepKit Framework](https://deepkit.io/) - High-quality TypeScript libraries and next-gen backend framework; Perpetual "alpha" since 2020
  - [Documentation](https://deepkit.io/documentation)
  - [Deepkit Runtime Types](https://deepkit.io/library/type) - @deepkit/type; Rich runtime type system for TypeScript with reflection,
    serialization/deserialization, validation, and many more features
  - [Runtime Types Documentation](https://deepkit.io/documentation/runtime-types) - uses experimentalDecorators
  - [deepkit/deepkit-framework](https://github.com/deepkit/deepkit-framework)
- [Typia](https://typia.io/) - customizable serializer/deserializer/validator for TypeScript; Active development since before 2022
  - [Use a TypeScript plugin to validate and cast data](https://jsoneditoronline.org/indepth/parse/json-to-typescript/#4-use-a-typescript-plugin-to-validate-and-cast-data)
  - [Typia Docs](https://typia.io/docs/)
  - [Random Generator](https://typia.io/docs/random/)
  - [samchon/typia](https://github.com/samchon/typia)
  - [Online Typia Playground](https://typia.io/playground/)
- [TypeScript Enums and Serialization](https://blog.mavnn.co.uk/2022/11/24/typescript_enums_and_serialization.html)
  - [schemawax](https://www.npmjs.com/package/schemawax)
- [Recreating advanced Enum types in Typescript](https://medium.com/swlh/recreating-advanced-enum-types-in-typescript-7a267a2a885)
- [ts-typed-json](https://www.npmjs.com/package/ts-typed-json)
- [typedjson](https://www.npmjs.com/package/typedjson)
- [typescript-json-decoder](https://www.npmjs.com/package/typescript-json-decoder)

## Date/DateTime Handling

### FHIR Date/Time Primitives

**NOTE:** Where a timezone (`+zz:zz`) is specified, UTC (`Z`) may also be specified

- [date](https://hl7.org/fhir/R5/datatypes.html#date)
  - `YYYY`
  - `YYYY-MM`
  - `YYYY-MM-DD`
- [dateTime](https://hl7.org/fhir/R5/datatypes.html#dateTime)
  - `YYYY`
  - `YYYY-MM`
  - `YYYY-MM-DD`
  - `YYYY-MM-DDThh:mm:ss+zz:zz` / `YYYY-MM-DDThh:mm:ssZ`
  - `YYYY-MM-DDThh:mm:ss.sss+zz:zz` / `YYYY-MM-DDThh:mm:ss.sssZ`
- [instant](https://hl7.org/fhir/R5/datatypes.html#instant)
  - `YYYY-MM-DDThh:mm:ss.sss+zz:zz` / `YYYY-MM-DDThh:mm:ss.sssZ`

### Luxon

- **References**

  - NPM [Luxon](https://www.npmjs.com/package/luxon)
  - Home [Luxon](https://moment.github.io/luxon/#/)
    - [Changing the default zone](https://moment.github.io/luxon/#/zones?id=changing-the-default-zone)
      - `Settings.defaultZone = "utc";`
      - `DateTime.local().zoneName;` //=> 'UTC
    - [Luxon Validity](https://moment.github.io/luxon/#/validity)
    - [Luxon API](https://moment.github.io/luxon/api-docs/index.html)
    - [Some Luxon examples](https://moment.github.io/luxon/demo/global.html)

- **Notes**
  - **Immutable**, chainable, unambiguous API
  - Native time zone and Intl support (no locale or tz files)
  - Months in Luxon are 1-indexed instead of 0-indexed like in Moment and the native Date type
  - Luxon has both a Duration type and an Interval type
  - Luxon parsers are very strict
  - Luxon uses getters instead of accessor methods, so `dateTime.year` instead of `dateTime.year()`
  - Luxon centralizes its "setters", like `dateTime.set({year: 2016, month: 4})` instead of `dateTime.year(2016).month(4)`

#### Luxon Parsing ([ISO 8601](https://moment.github.io/luxon/#/parsing?id=iso-8601))

- All supported FHIR formats are directly parsable by Luzon
  - `const dt: DateTime = DateTime.fromISO("2016");`
  - `const dt: DateTime = DateTime.fromISO("2016-05");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25T09:24:15Z");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25T09:24:15-04.00");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25T09:24:15.123Z");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25T09:24:15.123-04.00");`
- DateTime.fromISO() will default to the system's local timezone unless an offset is included in the dateTime string
  or a timezone option is provided to override the default:
  - `const dt: DateTime = DateTime.fromISO("2016-05-25T09:24:15Z");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25T09:24:15-04.00");`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25", { zone: "utc" });`
  - `const dt: DateTime = DateTime.fromISO("2016-05-25", { zone: "America/New_York" });`
- `DateTime.now().toISO()` will default to the system's local date/time and timezone in ISO format
- `DateTime.utc().toISO()` will default to UTC and timezone in ISO format

#### Luxon Formatting ([ISO 8601](https://moment.github.io/luxon/#/parsing?id=iso-8601))

- to ISO
  - `dt.toISO();` //=> '2017-04-20T11:32:00.000-04:00'
  - `dt.toISO({ suppressMilliseconds: true });` //=> '2017-04-20T11:32:00-04:00'
  - `dt.toISODate();` //=> '2017-04-20'
- to Format
  - `dt.toFormat("yyyy");` //=> '2017'
  - `dt.toFormat("yyyy-MM");` //=> '2017-04'

## Design Decisions

### Auto Create DataType Elements on `getXxxxElement`

- **NOTE:** HAPI FHIR has been designed to "auto create" data type elements rather than to return `null`.
  See class header content in [Configuration.java](https://github.com/hapifhir/org.hl7.fhir.core/blob/master/org.hl7.fhir.r4/src/main/java/org/hl7/fhir/r4/model/Configuration.java)
- Therefore, we will follow suit and not return `undefined` for all `getXxxxElement` methods.

### TypeScript Runtime Data Validator for Primitives

Based on past experience with FHIR data model generators for TypeScript, I wanted to define at least FHIR primitive
data types using TypeScript runtime data validators.
I was somewhat familiar with [io-ts](https://www.npmjs.com/package/io-ts) and wanted to gain a better understanding of that library.
In my investigation, I ran across [A TypeScript Runtime Data Validators Comparison](https://javascript.plainenglish.io/a-typescript-runtime-data-validators-comparison-50a6abf3c559).
The article defines a set of desired design goals a runtime data validator library should satisfy.
Subsequent articles provided reviews of six (6) popular runtime data validator libraries that documented how well the
libraries satisfied the design goals.

**Based on these reviews and my subsequent "deep dive", I decided to use the [Zod](https://www.npmjs.com/package/zod) library.**

### JavaScript Object Serialization/Deserialization Approach

After researching this subject in many articles on the web and after investigating the various serialization/deserialization
libraries (see above), I came to the conclusion that a "generic" approach to serialization/deserialization was overkill
in this use case. While complex and primitive data type models are handcrafted, the ultimate goal is to use a code
generator to create all FHIR resource data models for each version of FHIR. From experience, creating class templates
for a code generator is a straight-forward process. Trying to generalize the serialization/deserialization functionality
adds unnecessary complexity to the templates and the generated code.

My goal for the serialization/deserialization functionality was to access the functionality from the FHIR resource data
model classes - not from a separate "tool"/"parser" as is the case in the HAPI FHIR project. To that end, I decided to
provide a public `toJSON()` instance method on each FHIR resource data model class to perform the serialization. This
allows consumers of these data model classes to manipulate the data models instances as needed and then when ready,
execute the `toJSON()` method of the instance to render the FHIR compatible JSON data object. For the deserialization
process, I decided to provide a public static `parse(sourceJson: JSON.Object)` method that can consume the provided
JSON data object and return a fully populated FHIR resource data model instance.

### Unit Testing Strategy

Unit testing best practices recommend testing the public interfaces and not the abstract or private interfaces.
While I agree with this recommendation, I have chosen to ignore this recommendation for needs of this
proof-of-concept project.
The primary goal of this project is to create a set of hand-crafted data models that can be used to create
templates from which a production-level project can be created to generate FHIR data models using FHIR
StructureDefinitions.
Therefore, the hand-crafted data models must be fully documented with significant unit testing to verify
all functionality to be generated.
The abstract core FHIR models will be created with a minimal set of functionality to define a minimal
viable product.
As FHIR models are hand-crafted for data types and resources, additional functionality will be added to
meet design needs.
The desire is to write all unit tests as these data models evolve into a final state.

**Therefore for convenience, it will be easier to test the abstract classes rather than replicating tests
across all hand-crafted derived classes.**

### Code Documentation

#### Background

Most Node-based projects make use of [JSDoc](https://jsdoc.app/) for documenting the code base and optionally
generating project documentation.
For projects using TypeScript, Microsoft provides the [JSDoc Reference](https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html).
This combination works for many cases.
In my case, this was not a satisfactory approach. My biggest issue is the inability to provide documentation
for TypeScript `type` definitions.
Generating the project documentation using JSDoc and TypeScript felt like a kluge.

As an alternative, Microsoft provides [TSDoc](https://tsdoc.org/) as a replacement for JSDoc in TypeScript projects.
"TSDoc is a proposal to standardize the doc comments used in TypeScript code, so that different tools can extract content
without getting confused by each other's markup.
Microsoft also provides a library package that provides an open source reference implementation of a parser.
Using this library is an easy way to ensure that your tool is 100% compatible with the standard."

I decided to investigate TSDoc for my use in this project.
I noticed the TSDoc documentation mentions various tools that interact with the JSDoc/TSDoc notations and tags.
One that caught my eye is [TypeDoc](https://typedoc.org/).
It generates project documentation based on JSDoc/TSDoc notations and tags.
Its home page is very brief.
It provides a 2-step process to use TypeDoc out of the box:

```shell
# Install
npm install --save-dev typedoc

# Execute typedoc on your project
npx typedoc src/index.ts
```

Following the above steps, I was pleasantly surprised by the quality of the automatic generation of the project's documentation.
The current state of the project had very limited JSDoc notations, but TypeDoc generated very good documentation based
on the actual TypeScript code. Where JSDoc notation existed, TypeDoc parsed that content and added it to the generated
documentation.
I was immediately sold on TypeDoc!

The TypeDoc ecosystem includes plugins for various uses.
I was thrilled when I discovered a plugin for Zod (described above).
TypeDoc provides extensive configuration, but in my case, I only needed to included five (5) options!

**Therefore, I am using TypeDoc to generate project documentation!**

#### Class Header Template

```typescript
/**
 * <StructureDefinition.type> Class
 *
 * @remarks
 * <StructureDefinition.description>
 *
 * **FHIR Specification**
 * - **Short:** <StructureDefinition.snapshot.element[0]?.short>
 * - **Definition:** <StructureDefinition.snapshot.element[0]?.definition>
 * - **Comment:** <StructureDefinition.snapshot.element[0]?.comment>
 * - **Requirements:** <StructureDefinition.snapshot.element[0]?.requirements>
 * - **FHIR Version:** <StructureDefinition.fhirVersion>
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.<StructureDefinition.type>
 *
 * @category Resource Models | Datatypes: Complex
 * @see [FHIR <StructureDefinition.type>](<StructureDefinition.url>)
 */
```

#### Component (BackboneElement) Class Header Template

The `<StructureDefinition.snapshot.element[i].path>` will be reformatted as follows:

- The `path` value will be PascalCase
- The `.` separator will be removed
- 'Component' will be appended to the reformatted `path`

```typescript
/**
 * <StructureDefinition.snapshot.element[i].path>Component Subclass
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** <StructureDefinition.snapshot.element[i]?.short>
 * - **Definition:** <StructureDefinition.snapshot.element[i]?.definition>
 * - **Comment:** <StructureDefinition.snapshot.element[i]?.comment>
 * - **Requirements:** <StructureDefinition.snapshot.element[i]?.requirements>
 *
 * @category Resource Models
 * @see [FHIR <StructureDefinition.type>](<StructureDefinition.url>)
 */
```

#### Field Header Template

```typescript
/**
 * <StructureDefinition.snapshot.element[i].path> Element
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** <StructureDefinition.snapshot.element[i]?.short>
 * - **Definition:** <StructureDefinition.snapshot.element[i]?.definition>
 * - **Comment:** <StructureDefinition.snapshot.element[i]?.comment>
 * - **Requirements:** <StructureDefinition.snapshot.element[i]?.requirements>
 * - **FHIR Type:** `<StructureDefinition.snapshot.element[i].type.code[0]>`
 *   - _TargetProfiles_: [ <StructureDefinition.snapshot.element[i].type.code[0].taretProfile[?]> ]
 * - **Cardinality:** <StructureDefinition.snapshot.element[i].min>..<StructureDefinition.snapshot.element[i].max>
 * - **isModifier:** <StructureDefinition.snapshot.element[i].isModifier>
 * - **isModifierReason:** <StructureDefinition.snapshot.element[i].isModifier?>
 * - **isSummary:** <StructureDefinition.snapshot.element[i].isSummary>
 */
```

#### Polymorphic Field Header Template

```typescript
/**
 * <StructureDefinition.snapshot.element[i].path> Element
 *
 * @remarks
 * **FHIR Specification**
 * - **Short:** <StructureDefinition.snapshot.element[i]?.short>
 * - **Definition:** <StructureDefinition.snapshot.element[i]?.definition>
 * - **Comment:** <StructureDefinition.snapshot.element[i]?.comment>
 * - **Requirements:** <StructureDefinition.snapshot.element[i]?.requirements>
 * - **FHIR Types:**
 *  - `<StructureDefinition.snapshot.element[i].type.code[j]>`
 *    - _TargetProfiles_: [ <StructureDefinition.snapshot.element[i].type.code[0].taretProfile[?]> ]
 * - **Cardinality:** <StructureDefinition.snapshot.element[i].min>..<StructureDefinition.snapshot.element[i].max>
 * - **isModifier:** <StructureDefinition.snapshot.element[i].isModifier>
 * - **isModifierReason:** <StructureDefinition.snapshot.element[i].isModifier?>
 * - **isSummary:** <StructureDefinition.snapshot.element[i].isSummary>
 */
```

### TypeScript Circular References

References:

- [How to fix nasty circular dependency issues once and for all in JavaScript & TypeScript](https://medium.com/visual-development/how-to-fix-nasty-circular-dependency-issues-once-and-for-all-in-javascript-typescript-a04c987cf0de)
- [Tired of circular dependency in Typescript/Node.js?](https://dev.to/tahsinature/tired-of-circular-dependency-in-typescriptnodejs-4i0a)
- [Detect, Prevent, and Fix: Circular Dependencies In JavaScript and TypeScript](https://javascript.plainenglish.io/detect-prevent-and-fix-circular-dependencies-in-javascript-and-typescript-7d9819d37ce2)

The FHIR specification defines data types and resources (data models) based on the [FHIR Type Framework](https://hl7.org/fhir/R5/types.html).
Ultimately, the specification defines these data structures for exchanging healthcare data using JSON and/or XML.
By design, circular references in the specification cannot be prevented but are not a problem in the actual data structures.
Examples of circular references in the FHIR specification include:

- The FHIR Reference data type includes the Identifier data type while the Identifier data type includes the Reference
  data type.
- All data types inherit from the FHIR Element that includes a property for FHIR Extensions while the FHIR
  Extension references almost all FHIR data types.

When designing data structures using TypeScript, these circular references cannot be avoided and must be resolved.
Various strategies exist to resolve circular references such as:

- Use relative imports inside of the same module
- Move common code into a separate file to be imported
- Move code from one module to another
- Last resort: Combine files with circular dependencies into one file

Unfortunately, due to the FHIR specification, the "last resort" above has been occasionally used in this project.
When this has been done, a file/module header block documents these cases.
