/*
 * Copyright (c) 2024. Joe Paquette
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 */

import { FHIR_MAX_STRING_LENGTH, fhirCode, fhirString } from '@src/fhir-core/data-types/primitive/primitive-types';
import { Base } from '@src/fhir-core/base-models/Base';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { IdType } from '@src/fhir-core/data-types/primitive/IdType';
import { IntegerType } from '@src/fhir-core/data-types/primitive/IntegerType';
import { Meta } from '@src/fhir-core/data-types/complex/Meta';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Period } from '@src/fhir-core/data-types/complex/Period';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { FhirResourceType } from '@src/fhir-core/base-models/FhirResourceType';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
import {
  BackboneElement,
  BackboneType,
  DataType,
  Element,
  Extension,
  setFhirComplexJson,
  setFhirPrimitiveJson,
} from '@src/fhir-core/base-models/core-fhir-models';
import { isEmpty as _isEmpty } from '@src/fhir-core/utility/common-util';
import * as JSON from '@src/fhir-core/utility/json-helpers';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';

export {
  FHIR_MIN_INTEGER,
  FHIR_MAX_INTEGER,
  FHIR_MIN_INTEGER64,
  FHIR_MAX_INTEGER64,
} from '@src/fhir-core/data-types/primitive/primitive-types';

/**
 * Property values used in FHIR resource data model testing for Resource and DomainResource
 */

export const VALID_ID = 'id12345';
export const VALID_ID_TYPE = new IdType(VALID_ID);
export const VERSION_ID = 'VID-1972';
export const VALID_META = new Meta();
VALID_META.setVersionId(VERSION_ID);
export const IMPLICIT_RULES_VALUE = 'implicitRules';
export const LANGUAGE_VALUE = 'en-US';
export const VALID_CODE_GENERATED = `generated`;
export const VALID_XHTML = '<div xmlns="http://www.w3.org/1999/xhtml">text</div>';
export const VALID_NARRATIVE = new Narrative(VALID_CODE_GENERATED, VALID_XHTML);
export const VALID_EXTENSION = new Extension('extUrl', new StringType('Extension string value'));
export const VALID_MODIFIER_EXTENSION = new Extension('modExtUrl', new StringType('ModifierExtension string value'));

export const VALID_ID_2 = 'id67890';
export const VALID_ID_TYPE_2 = new IdType(VALID_ID_2);
export const VERSION_ID_2 = 'VID-1976';
export const VALID_META_2 = new Meta();
VALID_META_2.setVersionId(VERSION_ID_2);
export const IMPLICIT_RULES_VALUE_2 = 'implicitRules2';
export const LANGUAGE_VALUE_2 = 'en-UK';
export const VALID_CODE_GENERATED_2 = `generated`;
export const VALID_XHTML_2 = '<div xmlns="http://www.w3.org/1999/xhtml">text two</div>';
export const VALID_NARRATIVE_2 = new Narrative(VALID_CODE_GENERATED_2, VALID_XHTML_2);
export const VALID_EXTENSION_2 = new Extension('extUrl2', new StringType('Extension string value 2'));
export const VALID_MODIFIER_EXTENSION_2 = new Extension(
  'modExtUrl2',
  new StringType('ModifierExtension string value 2'),
);

/**
 * Property values used for datatype testing for Element.id and Element.extension
 */
export const DATATYPE_ID = 'DT-1357';
export const DATATYPE_EXTENSION = new Extension('datatypeUrl', new StringType('datatype extension string value'));

export const UNDEFINED_VALUE = undefined;

/**
 * Common constants used in validation testing
 */

export const INVALID_CODE_VALUE = ' Invalid code ';
export const INVALID_CODE_TYPE = new StringType(INVALID_CODE_VALUE);
export const INVALID_BASE64BINARY = 'invalidBase64Binary';
export const INVALID_NON_STRING_TYPE_VALUE = 'Invalid datatype';
export const INVALID_NON_STRING_TYPE = new StringType(INVALID_NON_STRING_TYPE_VALUE);
export const INVALID_STRING_TYPE_VALUE = 12345;
export const INVALID_STRING_TYPE = new IntegerType(INVALID_STRING_TYPE_VALUE);
export const INVALID_STRING = '';
export const TOO_BIG_STRING = getString(FHIR_MAX_STRING_LENGTH + 2);

export function getString(maxLength: number): string {
  // https://www.geeksforgeeks.org/javascript-program-for-generating-a-string-of-specific-length/#using-for-loop
  let str = '';
  const characters = '!( abcdefghijklmnopqrstuvwxyz . ABCDEFGHIJKLMNOPQRSTUVWXYZ )?';
  const charLen = characters.length;

  for (let i = 0; i < maxLength; i++) {
    // Generating a random index
    const idx = Math.floor(Math.random() * charLen);
    str += characters.charAt(idx);
  }

  return str;
}

/**
 * Mock objects used in testing
 */

export class MockBase extends Base {
  public mockValue: string | undefined = undefined;

  constructor(value?: string) {
    super();
    if (value) {
      this.mockValue = value;
    }
  }

  public fhirType(): string {
    return 'MockBase';
  }

  public isEmpty(): boolean {
    return _isEmpty(this.mockValue);
  }

  public copy(): MockBase {
    const dest = new MockBase();
    this.copyValues(dest);
    return dest;
  }

  protected copyValues(dest: MockBase): void {
    dest.mockValue = this.mockValue;
  }

  // NOT USED
  public toJSON(): JSON.Value | undefined {
    return undefined;
  }
}

export class MockElement extends Element {
  constructor(id?: fhirString, extension?: Extension[]) {
    super();
    if (id !== undefined) {
      super.setId(id);
    }
    if (extension !== undefined) {
      super.setExtension(extension);
    }
  }

  public override isEmpty(): boolean {
    return super.isEmpty();
  }

  public copy(): MockElement {
    const dest = new MockElement();
    this.copyValues(dest);
    return dest;
  }
}

export class MockBackboneElement extends BackboneElement {
  constructor(modifierExtension?: Extension[]) {
    super();
    if (modifierExtension !== undefined) {
      super.setModifierExtension(modifierExtension);
    }
  }

  public override isEmpty(): boolean {
    return super.isEmpty();
  }

  public copy(): MockBackboneElement {
    const dest = new MockBackboneElement();
    this.copyValues(dest);
    return dest;
  }
}

export class MockBackboneType extends BackboneType {
  constructor(modifierExtension?: Extension[]) {
    super();
    if (modifierExtension !== undefined) {
      super.setModifierExtension(modifierExtension);
    }
  }

  public override isEmpty(): boolean {
    return super.isEmpty();
  }

  public copy(): MockBackboneType {
    const dest = new MockBackboneType();
    this.copyValues(dest);
    return dest;
  }
}

export class MockFhirModel extends Base {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public fhirType(): string {
    return 'MockFhirModel';
  }

  public isEmpty(): boolean {
    return true;
  }

  // NOT USED
  public copy(): MockFhirModel {
    const dest = new MockFhirModel();
    this.copyValues(dest);
    return dest;
  }

  // NOT USED
  // @ts-expect-error: ignore param for test purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected copyValues(dest: MockFhirModel): void {
    return;
  }

  // NOT USED
  public toJSON(): JSON.Value | undefined {
    return undefined;
  }
}

export class MockResource extends Resource {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public resourceType(): FhirResourceType {
    // @ts-expect-error: allow for testing purposes
    return 'Resource';
  }

  public fhirType(): string {
    return 'MockResource';
  }

  public override isEmpty(): boolean {
    return super.isEmpty();
  }

  // NOT USED
  public copy(): MockResource {
    const dest = new MockResource();
    this.copyValues(dest);
    return dest;
  }

  // NOT USED
  // @ts-expect-error: ignore param for test purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected copyValues(dest: MockResource): void {
    return;
  }

  public override toJSON(): JSON.Value | undefined {
    // Will always have, at least, the 'resourceType' property from Resource
    const jsonObj = super.toJSON() as JSON.Object;
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

export class MockTask extends DomainResource {
  public mockPrimitive: StringType | undefined = undefined;
  public mockComplex: Period | undefined = undefined;

  constructor(stringValue?: StringType, periodValue?: Period) {
    super();
    if (stringValue) {
      this.mockPrimitive = stringValue;
    }
    if (periodValue) {
      this.mockComplex = periodValue;
    }
  }

  public resourceType(): FhirResourceType {
    return 'Task';
  }

  public fhirType(): string {
    return 'MockTask';
  }

  public override isEmpty(): boolean {
    return super.isEmpty() && this.mockPrimitive === undefined && this.mockComplex === undefined;
  }

  public copy(): MockTask {
    const dest = new MockTask();
    this.copyValues(dest);
    return dest;
  }

  protected override copyValues(dest: MockTask): void {
    super.copyValues(dest);
    dest.mockPrimitive = this.mockPrimitive?.copy();
    dest.mockComplex = this.mockComplex?.copy();
    return;
  }

  public override toJSON(): JSON.Value | undefined {
    // Will always have, at least, the 'resourceType' property from Resource
    const jsonObj = super.toJSON() as JSON.Object;

    if (this.mockPrimitive !== undefined) {
      setFhirPrimitiveJson<fhirString>(this.mockPrimitive, 'mockPrimitive', jsonObj);
    }

    if (this.mockComplex !== undefined) {
      setFhirComplexJson(this.mockComplex, 'mockComplex', jsonObj);
    }

    // jsonObj will always have, at least, the 'resourceType' property from Resource.
    // If that is all jsonObj has, return undefined.
    return Object.keys(jsonObj).length > 1 ? jsonObj : undefined;
  }
}

export class MockComplexDataType extends DataType {
  public mockValue: string | undefined = undefined;

  constructor(value?: string) {
    super();
    if (value) {
      this.mockValue = value;
    }
  }

  public override fhirType(): string {
    return 'MockComplexDataType';
  }

  public override isEmpty(): boolean {
    return _isEmpty(this.mockValue);
  }

  // NOT USED
  public copy(): MockComplexDataType {
    const dest = new MockComplexDataType();
    this.copyValues(dest);
    return dest;
  }

  // NOT USED
  // @ts-expect-error: ignore param for test purposes
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected copyValues(dest: MockComplexDataType): void {
    return;
  }
}

export class MockCodeEnum implements IFhirCodeEnum {
  // Code definitions copied from NarrativeStatusEnum
  public static readonly GENERATED = new FhirCodeDefinition(
    'GENERATED',
    `generated`,
    `http://hl7.org/fhir/narrative-status`,
    `Generated`,
    `The contents of the narrative are entirely generated from the core elements in the content.`,
  );
  public static readonly EXTENSIONS = new FhirCodeDefinition(
    'EXTENSIONS',
    `extensions`,
    `http://hl7.org/fhir/narrative-status`,
    `Extensions`,
    `The contents of the narrative are entirely generated from the core elements in the content and some of the content is generated from extensions. The narrative SHALL reflect the impact of all modifier extensions.`,
  );
  public static readonly ADDITIONAL = new FhirCodeDefinition(
    'ADDITIONAL',
    `additional`,
    `http://hl7.org/fhir/narrative-status`,
    `Additional`,
    `The contents of the narrative may contain additional information not found in the structured data. Note that there is no computable way to determine what the extra information is, other than by human inspection.`,
  );
  public static readonly EMPTY = new FhirCodeDefinition(
    'EMPTY',
    `empty`,
    `http://hl7.org/fhir/narrative-status`,
    `Empty`,
    `The contents of the narrative are some equivalent of "No human-readable text provided in this case".`,
  );

  values(): IFhirCodeDefinition[] {
    return [MockCodeEnum.GENERATED, MockCodeEnum.EXTENSIONS, MockCodeEnum.ADDITIONAL, MockCodeEnum.EMPTY];
  }

  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (MockCodeEnum.GENERATED.code === code) {
      return MockCodeEnum.GENERATED;
    } else if (MockCodeEnum.EXTENSIONS.code === code) {
      return MockCodeEnum.EXTENSIONS;
    } else if (MockCodeEnum.ADDITIONAL.code === code) {
      return MockCodeEnum.ADDITIONAL;
    } else if (MockCodeEnum.EMPTY.code === code) {
      return MockCodeEnum.EMPTY;
    } else {
      throw new InvalidCodeError(`Unknown MockCodeEnum 'code' value '${code}'`);
    }
  }
}
