# FHIR Type Framework

[Mermaid Docs](https://mermaid.js.org/intro/)

**Refer to [FHIR Type Framework](https://hl7.org/fhir/R5/types.html)**

```mermaid
classDiagram
  note "(F) - FHIR Framework class"

  class Base
  <<abstract>> Base
    Base : +fhirType() string*
    Base : +isEmpty() boolean*
    Base : +copy() Base*
    Base : +copyValues(Base)*
    Base : +equalsDeep(Base) bool
    Base : +compareDeep(Base, Base, bool) bool$
    Base : +compareDeep(List~Base~, List~Base~, bool) bool$
    Base : +compareDeep(XhtmlNode, XhtmlNode, bool) bool$
    Base : +compareValues(PrimitiveType, PrimitiveType, bool) bool$
    Base : +compareValues(List~PrimitiveType~, List~PrimitiveType~, bool) bool$

  class Element
  <<abstract>> Element
    Element : #string id
    Element : #List~Extension~ extension
    Element : +getId() string
    Element : +setId(string) Element
    Element : +hasId() bool
    Element : +getExtension() List~Extension~
    Element : +setExtension(List~Extension~) Element
    Element : +hasExtension(string) bool
    Element : +getExtensionByUrl(string) Extension
    Element : +addExtension(Extension) Element
    Element : +removeExtension(string)
    Element : +copy() Element*
    Element : +copyValues(Element)
  Element --|> Base

  class BackboneElement
  <<abstract>> BackboneElement
    BackboneElement : #List~Extension~ modifierExtension
    BackboneElement : +getModifierExtension() List~Extension~
    BackboneElement : +getModifierExtensionByUrl(string) Extension
    BackboneElement : +setModifierExtension(List~Extension~) BackboneElement
    BackboneElement : +hasModifierExtension() bool
    BackboneElement : +addModifierExtension() Extension
    BackboneElement : +addModifierExtension(Extension) BackboneElement
    BackboneElement : +addModifierExtension(string, DataType)
    BackboneElement : +removeModifierExtension(string)
    BackboneElement : +copy() BackboneElement*
  BackboneElement --|> Element

  class DataType
  <<abstract>> DataType
    DataType : +copy() DataType*
  DataType --|> Element

  class BackboneType
  <<abstract>> BackboneType
    BackboneType : #List~Extension~ modifierExtension
    BackboneType : +getModifierExtension() List~Extension~
    BackboneType : +getModifierExtensionByUrl(string) Extension
    BackboneType : +setModifierExtension(List~Extension~) BackboneType
    BackboneType : +hasModifierExtension() bool
    BackboneType : +addModifierExtension() Extension
    BackboneType : +addModifierExtension(Extension) BackboneType
    BackboneType : +copy() BackboneType*
  BackboneType --|> DataType

  class PrimitiveType~T~
  <<abstract>> PrimitiveType
    PrimitiveType : -myCoercedValue T
    PrimitiveType : -myStringValue string
    PrimitiveType : +getValue() T
    PrimitiveType : +setValue(T) PrimitiveType~T~
    PrimitiveType : +hasValue() bool
    PrimitiveType : +getValueAsString() string
    PrimitiveType : +setValueAsString(string)
    PrimitiveType : +encodeToString(T) string*
    PrimitiveType : +parseToPrimitive(string) T*
  PrimitiveType --|> DataType

  class Resource["Resource (F)"]
    Resource : +string id
    Resource : +Meta meta
    Resource : +uri impliciteRules
    Resource : +code language
  Resource --|> Base

  class DomainResource["DomainResource (F)"]
    DomainResource : +Narrative text
    DomainResource : +List~Resource~ contained
    DomainResource : +List~Extension~ extension
    DomainResource : +List~Extension~ modifierExtension
  DomainResource --|> Resource

  class Extension
    Extension : #uri url
    Extension : #DataType value
    Extension : +getUrl() uri
    Extension : +setUrl(uri) Extension
    Extension : +hasUrl() bool
    Extension : +getValue() DataType
    Extension : +setValue(DataType) Extension
    Extension : +hasValue() bool
  Extension --|> Element

```
