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
 * Global constants
 *
 * @module
 */

/**
 * @category Constants
 */
export const INSTANCE_EMPTY_ERROR_MSG = `Parsed instance is unexpectedly "empty"`;
/**
 * @category Constants
 */
export const REQUIRED_PROPERTIES_DO_NOT_EXIST = 'The following required properties do not exist:';
/**
 * @category Constants
 */
export const REQUIRED_PROPERTIES_REQD_IN_JSON =
  'The following required properties must be included in the provided JSON:';
/**
 * @category Constants
 */
export const INVALID_VALUEX_MULTIPLE_PROPERTIES =
  'The value[x] property must have only one representation. Has multiple value[x] representations:';
/**
 * @category Constants
 */
export const INVALID_VALUEX_PROPERTY = `The value[x] property cannot be represented by "value".`;
