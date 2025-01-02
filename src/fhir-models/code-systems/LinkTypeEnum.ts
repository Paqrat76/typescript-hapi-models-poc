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

import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: LinkTypeEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem LinkType](http://hl7.org/fhir/link-type)
 */
export class LinkTypeEnum implements IFhirCodeEnum {
  public static readonly REPLACED_BY = new FhirCodeDefinition(
    'REPLACED_BY',
    `replaced-by`,
    `http://hl7.org/fhir/link-type`,
    `Replaced-by`,
    `The patient resource containing this link must no longer be used. The link points forward to another patient resource that must be used in lieu of the patient resource that contains this link.`,
  );
  public static readonly REPLACES = new FhirCodeDefinition(
    'REPLACES',
    `replaces`,
    `http://hl7.org/fhir/link-type`,
    `Replaces`,
    `The patient resource containing this link is the current active patient record. The link points back to an inactive patient resource that has been merged into this resource, and should be consulted to retrieve additional referenced information.`,
  );
  public static readonly REFER = new FhirCodeDefinition(
    'REFER',
    `refer`,
    `http://hl7.org/fhir/link-type`,
    `Refer`,
    `The patient resource containing this link is in use and valid but not considered the main source of information about a patient. The link points forward to another patient resource that should be consulted to retrieve additional patient information.`,
  );
  public static readonly SEEALSO = new FhirCodeDefinition(
    'SEEALSO',
    `seealso`,
    `http://hl7.org/fhir/link-type`,
    `See also`,
    `The patient resource containing this link is in use and valid, but points to another patient resource that is known to contain data about the same person. Data in this resource might overlap or contradict information found in the other patient resource. This link does not indicate any relative importance of the resources concerned, and both should be regarded as equally valid.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      LinkTypeEnum.REPLACED_BY,
      LinkTypeEnum.REPLACES,
      LinkTypeEnum.REFER,
      LinkTypeEnum.SEEALSO,
      LinkTypeEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (LinkTypeEnum.REPLACED_BY.code === code) {
      return LinkTypeEnum.REPLACED_BY;
    } else if (LinkTypeEnum.REPLACES.code === code) {
      return LinkTypeEnum.REPLACES;
    } else if (LinkTypeEnum.REFER.code === code) {
      return LinkTypeEnum.REFER;
    } else if (LinkTypeEnum.SEEALSO.code === code) {
      return LinkTypeEnum.SEEALSO;
    } else if (LinkTypeEnum.NULL.code === code) {
      return LinkTypeEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown LinkTypeEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
