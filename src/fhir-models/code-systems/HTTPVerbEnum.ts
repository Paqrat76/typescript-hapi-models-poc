/*
 * Copyright (c) 2025. Joe Paquette
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

import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';
import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: HTTPVerbEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem HTTPVerb](http://hl7.org/fhir/http-verb)
 */
export class HTTPVerbEnum implements IFhirCodeEnum {
  public static readonly GET = new FhirCodeDefinition(
    'GET',
    `GET`,
    `http://hl7.org/fhir/http-verb`,
    `GET`,
    `HTTP GET Command.`,
  );
  public static readonly HEAD = new FhirCodeDefinition('HEAD', `HEAD`, `http://hl7.org/fhir/http-verb`, `HEAD`, `HEAD`);
  public static readonly POST = new FhirCodeDefinition(
    'POST',
    `POST`,
    `http://hl7.org/fhir/http-verb`,
    `POST`,
    `HTTP POST Command.`,
  );
  public static readonly PUT = new FhirCodeDefinition(
    'PUT',
    `PUT`,
    `http://hl7.org/fhir/http-verb`,
    `PUT`,
    `HTTP PUT Command.`,
  );
  public static readonly DELETE = new FhirCodeDefinition(
    'DELETE',
    `DELETE`,
    `http://hl7.org/fhir/http-verb`,
    `DELETE`,
    `HTTP DELETE Command.`,
  );
  public static readonly PATCH = new FhirCodeDefinition(
    'PATCH',
    `PATCH`,
    `http://hl7.org/fhir/http-verb`,
    `PATCH`,
    `HTTP PATCH Command.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      HTTPVerbEnum.GET,
      HTTPVerbEnum.HEAD,
      HTTPVerbEnum.POST,
      HTTPVerbEnum.PUT,
      HTTPVerbEnum.DELETE,
      HTTPVerbEnum.PATCH,
      HTTPVerbEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (HTTPVerbEnum.GET.code === code) {
      return HTTPVerbEnum.GET;
    } else if (HTTPVerbEnum.HEAD.code === code) {
      return HTTPVerbEnum.HEAD;
    } else if (HTTPVerbEnum.POST.code === code) {
      return HTTPVerbEnum.POST;
    } else if (HTTPVerbEnum.PUT.code === code) {
      return HTTPVerbEnum.PUT;
    } else if (HTTPVerbEnum.DELETE.code === code) {
      return HTTPVerbEnum.DELETE;
    } else if (HTTPVerbEnum.PATCH.code === code) {
      return HTTPVerbEnum.PATCH;
    } else if (HTTPVerbEnum.NULL.code === code) {
      return HTTPVerbEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown HTTPVerbEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
