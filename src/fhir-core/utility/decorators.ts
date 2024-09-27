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
 * TypeScript decorators
 *
 * @remarks
 * All TypeScript decorators should be included in this module.
 * However, due to TypeScript circular references, the following have been moved to the
 * indicated module:
 * - ReferenceTargets() placed in Reference-Identifier.ts
 * - OpenDataTypes() placed in core-fhir-models.ts
 *
 * @module
 */

import { strict as assert } from 'node:assert';
import { DataType } from '@src/fhir-core/base-models/core-fhir-models';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { DATA_TYPES, FhirDataType } from '@src/fhir-core/data-types/FhirDataType';

/**
 * Factory function for ChoiceDataTypes decorator for polymorphic (i.e., value[x]) data type "set" methods
 *
 * @remarks
 * This decorator validates the data type of the provided "set" method argument against the list
 * of the provided choiceDataTypes. The choiceDataTypes are expressed as FHIR primitive and/or
 * complex data type names. These values are available in each data type class as `instance.fhirType()`.
 *
 * @param choiceDataTypes - String array containing choice data types based on instance.fhirType()
 * @returns ChoiceDataTypes decorator
 * @throws AssertionError for invalid uses
 * @throws InvalidTypeError for actual choice data type does not agree with the specified choiceDataTypes
 *
 * @category Decorators
 */
export function ChoiceDataTypes(choiceDataTypes: FhirDataType[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function <This, Args extends any[], Return>(
    originalMethod: (this: This, ...args: Args) => Return,
    context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Return>,
  ) {
    return function (this: This, ...args: Args): Return {
      if (choiceDataTypes.length > 0) {
        // Verify choiceDataTypes contain valid, non-duplicate values
        const choiceDataTypeSet = new Set(choiceDataTypes);
        assert(choiceDataTypes.length === choiceDataTypeSet.size, 'choiceDataTypes contains duplicate DataTypes');
        assert(
          choiceDataTypes.every((choiceDt) => DATA_TYPES.includes(choiceDt)),
          'choiceDataTypes contains invalid FhirDataType(s)',
        );
      }

      const methodName = String(context.name);
      assert(
        args.length === 1 && (args[0] === undefined || args[0] === null || args[0] instanceof DataType),
        `Decorator expects ${methodName} to have one argument with type of 'DataType | undefined | null'`,
      );
      // undefined supports optional argument while null supports required argument
      const value = args[0] as DataType | undefined | null;

      // Return the original function if there is nothing for this decorator to do:
      // - choiceDataTypes array is empty
      // - Decorator should only be used on a method defined as:
      //   `public set[PropertyName](value: DataType | undefined): this`
      // - value is undefined or null
      if (choiceDataTypes.length === 0 || !methodName.startsWith('set') || value === undefined || value === null) {
        return originalMethod.call(this, ...args);
      }

      const isValidChoiceDataType = choiceDataTypes.some((choiceDt) => value.fhirType() === choiceDt);

      if (!isValidChoiceDataType) {
        throw new InvalidTypeError(
          `${methodName}: 'value' argument type (${value.fhirType()}) is not for a supported DataType`,
        );
      }

      return originalMethod.call(this, ...args);
    };
  };
}
