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

import { FhirCodeDefinition, IFhirCodeDefinition, IFhirCodeEnum } from '../../fhir-core/base-models/core-fhir-codes';
import { fhirCode } from '../../fhir-core/data-types/primitive/primitive-types';
import { InvalidCodeError } from '../../fhir-core/errors/InvalidCodeError';

/* istanbul ignore file */
/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * FHIR CodeSystem: TaskStatusEnum
 *
 * Used for testing purposes only!
 */
export class TaskStatusEnum implements IFhirCodeEnum {
  public static readonly DRAFT = new FhirCodeDefinition('DRAFT', `draft`, `http://hl7.org/fhir/task-status`);
  public static readonly REQUESTED = new FhirCodeDefinition(
    'REQUESTED',
    `requested`,
    `http://hl7.org/fhir/task-status`,
  );
  public static readonly RECEIVED = new FhirCodeDefinition('RECEIVED', `received`, `http://hl7.org/fhir/task-status`);
  public static readonly ACCEPTED = new FhirCodeDefinition('ACCEPTED', `accepted`, `http://hl7.org/fhir/task-status`);
  public static readonly REJECTED = new FhirCodeDefinition('REJECTED', `rejected`, `http://hl7.org/fhir/task-status`);
  public static readonly READY = new FhirCodeDefinition('READY', `ready`, `http://hl7.org/fhir/task-status`);
  public static readonly CANCELLED = new FhirCodeDefinition(
    'CANCELLED',
    `cancelled`,
    `http://hl7.org/fhir/task-status`,
  );
  public static readonly IN_PROGRESS = new FhirCodeDefinition(
    'IN_PROGRESS',
    `in-progress`,
    `http://hl7.org/fhir/task-status`,
  );
  public static readonly ON_HOLD = new FhirCodeDefinition('ON_HOLD', `on-hold`, `http://hl7.org/fhir/task-status`);
  public static readonly FAILED = new FhirCodeDefinition('FAILED', `failed`, `http://hl7.org/fhir/task-status`);
  public static readonly COMPLETED = new FhirCodeDefinition(
    'COMPLETED',
    `completed`,
    `http://hl7.org/fhir/task-status`,
  );
  public static readonly ENTERED_IN_ERROR = new FhirCodeDefinition(
    'ENTERED_IN_ERROR',
    `entered-in-error`,
    `http://hl7.org/fhir/task-status`,
  );

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      TaskStatusEnum.DRAFT,
      TaskStatusEnum.REQUESTED,
      TaskStatusEnum.RECEIVED,
      TaskStatusEnum.ACCEPTED,
      TaskStatusEnum.REJECTED,
      TaskStatusEnum.READY,
      TaskStatusEnum.CANCELLED,
      TaskStatusEnum.IN_PROGRESS,
      TaskStatusEnum.ON_HOLD,
      TaskStatusEnum.FAILED,
      TaskStatusEnum.COMPLETED,
      TaskStatusEnum.ENTERED_IN_ERROR,
      TaskStatusEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (TaskStatusEnum.DRAFT.code === code) {
      return TaskStatusEnum.DRAFT;
    } else if (TaskStatusEnum.REQUESTED.code === code) {
      return TaskStatusEnum.REQUESTED;
    } else if (TaskStatusEnum.RECEIVED.code === code) {
      return TaskStatusEnum.RECEIVED;
    } else if (TaskStatusEnum.ACCEPTED.code === code) {
      return TaskStatusEnum.ACCEPTED;
    } else if (TaskStatusEnum.REJECTED.code === code) {
      return TaskStatusEnum.REJECTED;
    } else if (TaskStatusEnum.READY.code === code) {
      return TaskStatusEnum.READY;
    } else if (TaskStatusEnum.CANCELLED.code === code) {
      return TaskStatusEnum.CANCELLED;
    } else if (TaskStatusEnum.IN_PROGRESS.code === code) {
      return TaskStatusEnum.IN_PROGRESS;
    } else if (TaskStatusEnum.ON_HOLD.code === code) {
      return TaskStatusEnum.ON_HOLD;
    } else if (TaskStatusEnum.FAILED.code === code) {
      return TaskStatusEnum.FAILED;
    } else if (TaskStatusEnum.COMPLETED.code === code) {
      return TaskStatusEnum.COMPLETED;
    } else if (TaskStatusEnum.ENTERED_IN_ERROR.code === code) {
      return TaskStatusEnum.ENTERED_IN_ERROR;
    } else if (TaskStatusEnum.NULL.code === code) {
      return TaskStatusEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown TaskStatusEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
