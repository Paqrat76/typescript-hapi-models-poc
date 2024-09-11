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

import { FhirCodeDefinition } from '@src/fhir-core/base-models/core-fhir-codes';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';

describe('FhirCodeDefinition', () => {
  const TEST_NAME = 'GENERATED';
  const VALID_CODE = `generated`;
  const INVALID_CODE = ' invalid CodeType ';
  const TEST_SYSTEM = `http://hl7.org/fhir/narrative-status`;
  const TEST_DISPLAY = `Generated`;
  const TEST_DEFINITION = `The contents of the narrative are entirely generated from the core elements in the content.`;

  it('should be properly instantiated with minimum args', () => {
    const testBaseFhirCode = new FhirCodeDefinition(TEST_NAME, VALID_CODE);
    expect(testBaseFhirCode).toBeDefined();
    expect(testBaseFhirCode).toBeInstanceOf(FhirCodeDefinition);
    expect(testBaseFhirCode.constructor.name).toStrictEqual('FhirCodeDefinition');
    expect(testBaseFhirCode.name).toStrictEqual(TEST_NAME);
    expect(testBaseFhirCode.code).toStrictEqual(VALID_CODE);
    expect(testBaseFhirCode.system).toBeUndefined();
    expect(testBaseFhirCode.display).toBeUndefined();
    expect(testBaseFhirCode.definition).toBeUndefined();
    expect(testBaseFhirCode.toJSON()).toStrictEqual(VALID_CODE);
  });

  it('should be properly instantiated with all args', () => {
    const testBaseFhirCode = new FhirCodeDefinition(TEST_NAME, VALID_CODE, TEST_SYSTEM, TEST_DISPLAY, TEST_DEFINITION);
    expect(testBaseFhirCode).toBeDefined();
    expect(testBaseFhirCode).toBeInstanceOf(FhirCodeDefinition);
    expect(testBaseFhirCode.constructor.name).toStrictEqual('FhirCodeDefinition');
    expect(testBaseFhirCode.name).toStrictEqual(TEST_NAME);
    expect(testBaseFhirCode.code).toStrictEqual(VALID_CODE);
    expect(testBaseFhirCode.system).toStrictEqual(TEST_SYSTEM);
    expect(testBaseFhirCode.display).toStrictEqual(TEST_DISPLAY);
    expect(testBaseFhirCode.definition).toStrictEqual(TEST_DEFINITION);
    expect(testBaseFhirCode.toJSON()).toStrictEqual(VALID_CODE);
  });

  it('should throw PrimitiveTypeError from constructor when initialized with invalid code', () => {
    const t = () => {
      new FhirCodeDefinition(TEST_NAME, INVALID_CODE);
    };
    expect(t).toThrow(PrimitiveTypeError);
    expect(t).toThrow(`Invalid value for CodeType (${INVALID_CODE})`);
  });
});
