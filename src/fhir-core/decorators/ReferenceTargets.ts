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

/**
 * ReferenceTargets Decorator
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { RESOURCE_TYPES, ResourceType } from '@src/fhir-core/base-models/ResourceType';
import { Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { FhirTypeGuard } from '@src/fhir-core/utility/type-guards';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';

/**
 * Factory function for ReferenceTargets decorator.
 *
 * @remarks
 * This decorator validates the provided Reference.reference value for relative or absolute
 * references are only for the defined ElementDefinition's 'targetProfile' value(s).
 *
 * @param referenceTargets - ResourceType array of target references.
 *                           An empty array is allowed and represents "Any" resource.
 * @returns ReferenceTargets decorator
 * @throws AssertionError for invalid uses
 * @throws InvalidTypeError for actual reference type do not agree with the specified ReferenceTargets
 *
 * @category Decorators
 */
export function ReferenceTargets(referenceTargets: ResourceType[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    return function (this: This, ...args: Args): Return {
      const isAnyResource = referenceTargets.length === 0;
      if (!isAnyResource) {
        // Verify referenceTargets contain valid, non-duplicate values
        const referenceTargetSet = new Set(referenceTargets);
        assert(
          referenceTargets.length === referenceTargetSet.size,
          'referenceTargets contains duplicate ResourceTypes',
        );
        assert(
          referenceTargets.every((refTarget) => RESOURCE_TYPES.includes(refTarget)),
          'referenceTargets contains invalid ResourceType(s)',
        );
      }

      const methodName = String(context.name);
      assert(
        args.length === 1 && (args[0] === undefined || args[0] === null || FhirTypeGuard(args[0], Reference)),
        `Decorator expects ${methodName} to have one argument with type of 'Reference | undefined | null'`,
      );
      // undefined supports optional argument while null supports required argument
      const value = args[0] as Reference | undefined | null;

      // Return the original function if there is nothing for this decorator to do:
      // - referenceTargets array is empty - implies "Any" resource
      // - Decorator should only be used on a method defined as:
      //   `public set[PropertyName](value: Reference | undefined): this`
      // - The value of type Reference should have the Reference.reference property set
      // - The referenceTargets array should have at least one valid ResourceType value
      // - Reference is to a "contained" resource - reference value begins with "#"
      if (
        isAnyResource ||
        !methodName.startsWith('set') ||
        value === undefined ||
        value === null ||
        !value.hasReference() ||
        value.getReference()?.startsWith('#')
      ) {
        return originalMethod.call(this, ...args);
      }

      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const referenceValue = value.getReference()!;
      // referenceValue (Reference.reference) examples:
      // - Organization/1234
      // - https://somedomain.com/path/Organization/1234
      const isValidReference = referenceTargets.some((refTarget) => referenceValue.includes(`${refTarget}/`));

      if (!isValidReference) {
        throw new InvalidTypeError(
          `${methodName}: 'value' argument (${referenceValue}) is not for a valid resource type`,
        );
      }

      return originalMethod.call(this, ...args);
    };
  };
}
