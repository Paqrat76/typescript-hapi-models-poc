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

import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import z, { ZodError, ZodIssue, ZodIssueCode } from 'zod';

describe('PrimitiveTypeError', () => {
  it(`should be properly instantiated`, () => {
    const testZodIssues: ZodIssue[] = [
      {
        code: ZodIssueCode.custom,
        path: ['testpath', 0],
        message: 'This is test issue #1 message',
      },
      {
        code: ZodIssueCode.custom,
        path: ['testpath', 1],
        message: 'This is test issue #2 message',
      },
    ];
    const testZodError = new ZodError(testZodIssues);
    const pte = new PrimitiveTypeError('Primitive Type Error test message', testZodError);

    expect(pte).toBeInstanceOf(Error);
    expect(pte.name).toEqual('PrimitiveTypeError');
    expect(pte.message).toEqual('Primitive Type Error test message');

    const expectedDetails = ['This is test issue #1 message', 'This is test issue #2 message'];
    expect(pte.getDetails()).toHaveLength(2);
    expect(pte.getDetails()).toEqual(expect.arrayContaining(expectedDetails));
    expect(pte.getIssues()).toHaveLength(2);
  });

  it(`should raise expected error for invalid object parse`, () => {
    // Using Zod demonstrative example: https://zod.dev/ERROR_HANDLING?id=a-demonstrative-example
    const personSchema = z.object({
      names: z.array(z.string()).nonempty(), // at least 1 name
      address: z
        .object({
          line1: z.string(),
          zipCode: z.number().min(10000), // American 5-digit code
        })
        .strict(), // do not allow unrecognized keys
    });

    const parseResult = personSchema.safeParse({
      names: ['Dave', 12], // 12 is not a string
      address: {
        line1: '123 Maple Ave',
        zipCode: 123, // zip code isn't 5 digits
        extra: 'other stuff', // unrecognized key
      },
    });

    if (parseResult.success) {
      fail(`Unexpected parse success`);
    } else {
      const pte = new PrimitiveTypeError(`personSchema parse failure`, parseResult.error);
      expect(pte.name).toEqual('PrimitiveTypeError');
      expect(pte.message).toEqual('personSchema parse failure');

      const expectedIssues = getPersonSchemaParseResultIssues();
      const details = pte.getDetails();
      expect(details).toHaveLength(3);
      expect(details).toContain(expectedIssues[0]?.message);
      expect(details).toContain(expectedIssues[1]?.message);
      expect(details).toContain(expectedIssues[2]?.message);

      const issues = pte.getIssues();
      expect(issues).toHaveLength(3);
      expect(issues).toContainEqual(expectedIssues[0]);
      expect(issues).toContainEqual(expectedIssues[1]);
      expect(issues).toContainEqual(expectedIssues[2]);
    }
  });
});

function getPersonSchemaParseResultIssues() {
  // Minor differences between actual results and Zod demonstrative
  // example: https://zod.dev/ERROR_HANDLING?id=a-demonstrative-example
  return [
    {
      code: 'invalid_type',
      expected: 'string',
      message: 'Expected string, received number', // different than Zod example
      path: ['names', 1],
      received: 'number',
    },
    {
      code: 'too_small',
      exact: false, // not in than Zod example
      inclusive: true,
      message: 'Number must be greater than or equal to 10000', // different than Zod example
      minimum: 10000,
      path: ['address', 'zipCode'],
      type: 'number',
    },
    {
      code: 'unrecognized_keys',
      keys: ['extra'],
      message: "Unrecognized key(s) in object: 'extra'",
      path: ['address'],
    },
  ];
}
