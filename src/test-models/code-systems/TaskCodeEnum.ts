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
 * FHIR CodeSystem: TaskCodeEnum
 *
 * Used for testing purposes only!
 */
export class TaskCodeEnum implements IFhirCodeEnum {
  public static readonly APPROVE = new FhirCodeDefinition('APPROVE', `approve`, `http://hl7.org/fhir/task-code`);
  public static readonly FULFILL = new FhirCodeDefinition('FULFILL', `fulfill`, `http://hl7.org/fhir/task-code`);
  public static readonly ABORT = new FhirCodeDefinition('ABORT', `abort`, `http://hl7.org/fhir/task-code`);
  public static readonly REPLACE = new FhirCodeDefinition('REPLACE', `replace`, `http://hl7.org/fhir/task-code`);
  public static readonly CHANGE = new FhirCodeDefinition('CHANGE', `change`, `http://hl7.org/fhir/task-code`);
  public static readonly SUSPEND = new FhirCodeDefinition('SUSPEND', `suspend`, `http://hl7.org/fhir/task-code`);
  public static readonly RESUME = new FhirCodeDefinition('RESUME', `resume`, `http://hl7.org/fhir/task-code`);

  // NULL added to help check for non-existent value
  public static readonly NULL = new FhirCodeDefinition('NULL', `null`);

  /**
   * {@inheritDoc IFhirCodeEnum.values}
   */
  values(): IFhirCodeDefinition[] {
    return [
      TaskCodeEnum.APPROVE,
      TaskCodeEnum.FULFILL,
      TaskCodeEnum.ABORT,
      TaskCodeEnum.REPLACE,
      TaskCodeEnum.CHANGE,
      TaskCodeEnum.SUSPEND,
      TaskCodeEnum.RESUME,
      TaskCodeEnum.NULL,
    ];
  }

  /**
   * {@inheritDoc IFhirCodeEnum.fromCode}
   */
  fromCode(code: fhirCode | undefined): IFhirCodeDefinition {
    if (code === undefined) {
      throw new InvalidCodeError(`The provided 'code' value is undefined`);
    } else if (TaskCodeEnum.APPROVE.code === code) {
      return TaskCodeEnum.APPROVE;
    } else if (TaskCodeEnum.FULFILL.code === code) {
      return TaskCodeEnum.FULFILL;
    } else if (TaskCodeEnum.ABORT.code === code) {
      return TaskCodeEnum.ABORT;
    } else if (TaskCodeEnum.REPLACE.code === code) {
      return TaskCodeEnum.REPLACE;
    } else if (TaskCodeEnum.CHANGE.code === code) {
      return TaskCodeEnum.CHANGE;
    } else if (TaskCodeEnum.SUSPEND.code === code) {
      return TaskCodeEnum.SUSPEND;
    } else if (TaskCodeEnum.RESUME.code === code) {
      return TaskCodeEnum.RESUME;
    } else if (TaskCodeEnum.NULL.code === code) {
      return TaskCodeEnum.NULL;
    } else {
      throw new InvalidCodeError(`Unknown TaskCodeEnum 'code' value '${String(code)}'`);
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
