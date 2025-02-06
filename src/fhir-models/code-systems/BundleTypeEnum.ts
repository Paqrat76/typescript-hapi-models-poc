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

import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '@src/fhir-core/base-models/core-fhir-codes';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: BundleTypeEnum
 *
 * @remarks
 * This class is a "pseudo-enumeration" of code values having FHIR code properties.
 *
 * @category CodeSystems
 * @see [FHIR CodeSystem BundleType](http://hl7.org/fhir/bundle-type)
 */
export class BundleTypeEnum implements IFhirCodeEnum {
  public static readonly DOCUMENT = new FhirCodeDefinition(
    'DOCUMENT',
    `document`,
    `http://hl7.org/fhir/bundle-type`,
    `Document`,
    `The bundle is a document. The first resource is a Composition.`,
  );
  public static readonly MESSAGE = new FhirCodeDefinition(
    'MESSAGE',
    `message`,
    `http://hl7.org/fhir/bundle-type`,
    `Message`,
    `The bundle is a message. The first resource is a MessageHeader.`,
  );
  public static readonly TRANSACTION = new FhirCodeDefinition(
    'TRANSACTION',
    `transaction`,
    `http://hl7.org/fhir/bundle-type`,
    `Transaction`,
    `The bundle is a transaction - intended to be processed by a server as an atomic commit.`,
  );
  public static readonly TRANSACTION_RESPONSE = new FhirCodeDefinition(
    'TRANSACTION_RESPONSE',
    `transaction-response`,
    `http://hl7.org/fhir/bundle-type`,
    `Transaction Response`,
    `The bundle is a transaction response. Because the response is a transaction response, the transaction has succeeded, and all responses are error free.`,
  );
  public static readonly BATCH = new FhirCodeDefinition(
    'BATCH',
    `batch`,
    `http://hl7.org/fhir/bundle-type`,
    `Batch`,
    `The bundle is a set of actions - intended to be processed by a server as a group of independent actions.`,
  );
  public static readonly BATCH_RESPONSE = new FhirCodeDefinition(
    'BATCH_RESPONSE',
    `batch-response`,
    `http://hl7.org/fhir/bundle-type`,
    `Batch Response`,
    `The bundle is a batch response. Note that as a batch, some responses may indicate failure and others success.`,
  );
  public static readonly HISTORY = new FhirCodeDefinition(
    'HISTORY',
    `history`,
    `http://hl7.org/fhir/bundle-type`,
    `History List`,
    `The bundle is a list of resources from a history interaction on a server.`,
  );
  public static readonly SEARCHSET = new FhirCodeDefinition(
    'SEARCHSET',
    `searchset`,
    `http://hl7.org/fhir/bundle-type`,
    `Search Results`,
    `The bundle is a list of resources returned as a result of a search/query interaction, operation, or message.`,
  );
  public static readonly COLLECTION = new FhirCodeDefinition(
    'COLLECTION',
    `collection`,
    `http://hl7.org/fhir/bundle-type`,
    `Collection`,
    `The bundle is a set of resources collected into a single package for ease of distribution that imposes no processing obligations or behavioral rules beyond persistence.`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      BundleTypeEnum.DOCUMENT,
      BundleTypeEnum.MESSAGE,
      BundleTypeEnum.TRANSACTION,
      BundleTypeEnum.TRANSACTION_RESPONSE,
      BundleTypeEnum.BATCH,
      BundleTypeEnum.BATCH_RESPONSE,
      BundleTypeEnum.HISTORY,
      BundleTypeEnum.SEARCHSET,
      BundleTypeEnum.COLLECTION,
      BundleTypeEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (BundleTypeEnum.DOCUMENT.code === code) {
      return BundleTypeEnum.DOCUMENT;
    } else if (BundleTypeEnum.MESSAGE.code === code) {
      return BundleTypeEnum.MESSAGE;
    } else if (BundleTypeEnum.TRANSACTION.code === code) {
      return BundleTypeEnum.TRANSACTION;
    } else if (BundleTypeEnum.TRANSACTION_RESPONSE.code === code) {
      return BundleTypeEnum.TRANSACTION_RESPONSE;
    } else if (BundleTypeEnum.BATCH.code === code) {
      return BundleTypeEnum.BATCH;
    } else if (BundleTypeEnum.BATCH_RESPONSE.code === code) {
      return BundleTypeEnum.BATCH_RESPONSE;
    } else if (BundleTypeEnum.HISTORY.code === code) {
      return BundleTypeEnum.HISTORY;
    } else if (BundleTypeEnum.SEARCHSET.code === code) {
      return BundleTypeEnum.SEARCHSET;
    } else if (BundleTypeEnum.COLLECTION.code === code) {
      return BundleTypeEnum.COLLECTION;
    } else if (BundleTypeEnum.NULL.code === code) {
      return BundleTypeEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown BundleTypeEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
