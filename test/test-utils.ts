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

import { FHIR_MAX_STRING_LENGTH, fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { IBase } from '@src/fhir-core/base-models/IBase';
import { DomainResource } from '@src/fhir-core/base-models/DomainResource';
import { ResourceType } from '@src/fhir-core/base-models/ResourceType';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';

export {
  FHIR_MIN_INTEGER,
  FHIR_MAX_INTEGER,
  FHIR_MIN_INTEGER64,
  FHIR_MAX_INTEGER64,
} from '@src/fhir-core/data-types/primitive/primitive-types';

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

export class MockFhirModel implements IBase {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor,@typescript-eslint/no-empty-function
  constructor() {}

  public fhirType(): string {
    return 'MockFhirModel';
  }

  public isEmpty(): boolean {
    return true;
  }
}

export class MockTask extends DomainResource {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  public resourceType(): ResourceType {
    return 'Task';
  }

  public override fhirType(): string {
    return 'MockTask';
  }

  public copy(): MockTask {
    const dest = new MockTask();
    this.copyValues(dest);
    return dest;
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
