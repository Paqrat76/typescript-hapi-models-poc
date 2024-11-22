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
 * FHIR CodeSystem: ContactPointSystem
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem ContactPointSystem](http://hl7.org/fhir/contact-point-system)
 */
export class ContactPointSystemEnum implements IFhirCodeEnum {
  public static readonly PHONE = new FhirCodeDefinition(
    'PHONE',
    `phone`,
    `http://hl7.org/fhir/contact-point-system`,
    `Phone`,
    `The value is a telephone number used for voice calls. Use of full international numbers starting with + is recommended to enable automatic dialing support but not required.`,
  );
  public static readonly FAX = new FhirCodeDefinition(
    'FAX',
    `fax`,
    `http://hl7.org/fhir/contact-point-system`,
    `Fax`,
    `The value is a fax machine. Use of full international numbers starting with + is recommended to enable automatic dialing support but not required.`,
  );
  public static readonly EMAIL = new FhirCodeDefinition(
    'EMAIL',
    `email`,
    `http://hl7.org/fhir/contact-point-system`,
    `Email`,
    `The value is an email address.`,
  );
  public static readonly PAGER = new FhirCodeDefinition(
    'PAGER',
    `pager`,
    `http://hl7.org/fhir/contact-point-system`,
    `Pager`,
    `The value is a pager number. These may be local pager numbers that are only usable on a particular pager system.`,
  );
  public static readonly URL = new FhirCodeDefinition(
    'URL',
    `url`,
    `http://hl7.org/fhir/contact-point-system`,
    `URL`,
    `A contact that is not a phone, fax, pager or email address and is expressed as a URL. This is intended for various institutional or personal contacts including web sites, blogs, Skype, Twitter, Facebook, etc. Do not use for email addresses.`,
  );
  public static readonly SMS = new FhirCodeDefinition(
    'SMS',
    `sms`,
    `http://hl7.org/fhir/contact-point-system`,
    `SMS`,
    `A contact that can be used for sending an sms message (e.g. mobile phones, some landlines).`,
  );
  public static readonly OTHER = new FhirCodeDefinition(
    'OTHER',
    `other`,
    `http://hl7.org/fhir/contact-point-system`,
    `Other`,
    `A contact that is not a phone, fax, page or email address and is not expressible as a URL. E.g. Internal mail address. This SHOULD NOT be used for contacts that are expressible as a URL (e.g. Skype, Twitter, Facebook, etc.) Extensions may be used to distinguish "other" contact types.`,
  );
  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      ContactPointSystemEnum.PHONE,
      ContactPointSystemEnum.FAX,
      ContactPointSystemEnum.EMAIL,
      ContactPointSystemEnum.PAGER,
      ContactPointSystemEnum.URL,
      ContactPointSystemEnum.SMS,
      ContactPointSystemEnum.OTHER,
      ContactPointSystemEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (ContactPointSystemEnum.PHONE.code === code) {
      return ContactPointSystemEnum.PHONE;
    } else if (ContactPointSystemEnum.FAX.code === code) {
      return ContactPointSystemEnum.FAX;
    } else if (ContactPointSystemEnum.EMAIL.code === code) {
      return ContactPointSystemEnum.EMAIL;
    } else if (ContactPointSystemEnum.PAGER.code === code) {
      return ContactPointSystemEnum.PAGER;
    } else if (ContactPointSystemEnum.URL.code === code) {
      return ContactPointSystemEnum.URL;
    } else if (ContactPointSystemEnum.SMS.code === code) {
      return ContactPointSystemEnum.SMS;
    } else if (ContactPointSystemEnum.OTHER.code === code) {
      return ContactPointSystemEnum.OTHER;
    } else if (ContactPointSystemEnum.NULL.code === code) {
      return ContactPointSystemEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown ContactPointSystemEnum 'code' value '${code}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
