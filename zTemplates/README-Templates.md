# FHIR Data Model Templates

The template files in this directory are text files that contain selected methods and related code blocks to be used
when handcrafting additional FHIR resource data models classes. They evolved from some early efforts to provide sample
data type methods that could be copied/pasted into handcrafted FHIR resource data models.

These templates will be used when creating handcrafted FHIR resource data models in order to provide a consistent and
repeatable process for defining the necessary class properties and associated methods. Using these templates will also
validate that the code blocks are correct for each of the scenarios. The ultimate goal is to inform the creation of
actual templates to be used in generating all FHIR resource data models.

Because the few handcrafted FHIR resource data models can not cover **all** possible combinations of methods and related
code blocks, a `TestDataModel` class has been created to represent a FHIR pseudo-resource that contains fields and nested
BackboneElements representing **all** possible combinations of methods and related code blocks. This will allow the
testing of all possible combinations of methods and related code blocks to ensure that these templates can reliably
be used to define the code generation templates. For details about this `TestDataModel` class, refer to
[README-TestModels.md](../src/test-models/README-TestModels.md),
