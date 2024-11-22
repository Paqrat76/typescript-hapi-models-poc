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

import { AssertionError } from 'node:assert';
import { parseContainedResources } from '@src/fhir-models/fhir-contained-resource-parser';
import { Group } from '@src/fhir-models/Group';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PractitionerRole } from '@src/fhir-models/PractitionerRole';
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';

describe('fhir-contained-resource-parser', () => {
  let testGroup: Group;

  beforeEach(() => {
    testGroup = new Group('person', false);
  });

  it('should AssertionError for undefined args', () => {
    let t = () => {
      // @ts-expect-error: allow undefined for testing
      parseContainedResources(undefined, [], 'sourceField');
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`instance argument is required`);

    t = () => {
      // @ts-expect-error: allow undefined for testing
      parseContainedResources(testGroup, undefined, 'sourceField');
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`containedJsonArray argument is required`);

    t = () => {
      // @ts-expect-error: allow undefined for testing
      parseContainedResources(testGroup, [], undefined);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`sourceField argument is required`);
  });

  it('should not throw error for empty containedJsonArray', () => {
    let t = () => {
      parseContainedResources(testGroup, [], 'sourceField');
    };
    expect(t).not.toThrow();
    expect(testGroup.hasContained()).toBe(false);

    t = () => {
      parseContainedResources(testGroup, [{}], 'sourceField');
    };
    expect(t).not.toThrow();
    expect(testGroup.hasContained()).toBe(false);
  });

  it('should InvalidTypeError for invalid "resourceType"', () => {
    let t = () => {
      parseContainedResources(testGroup, [{ bogus: 'bad json' }], 'sourceField');
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`The provided JSON does not represent a FHIR Resource (missing 'resourceType' element).`);

    t = () => {
      parseContainedResources(testGroup, [{ resourceType: 'badResourceType' }], 'sourceField');
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Invalid JSON 'resourceType' ('badResourceType') value.`);

    t = () => {
      parseContainedResources(testGroup, [{ resourceType: 'Patient' }], 'sourceField');
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(`Unexpected resource type Patient`);
  });

  it('should set valid "contained" entry', () => {
    const VALID_IDENTIFIER = new Identifier();
    VALID_IDENTIFIER.setValue('Identifier Value');
    const VALID_REFERENCE_VALUE = new Reference();
    VALID_REFERENCE_VALUE.setReference('Practitioner/13579');

    const VALID_CONTAINED = new PractitionerRole();
    VALID_CONTAINED.setId('#P1');
    VALID_CONTAINED.setActive(false);
    VALID_CONTAINED.addIdentifier(VALID_IDENTIFIER);
    VALID_CONTAINED.setPractitioner(VALID_REFERENCE_VALUE);

    const testJsonArray = [
      {
        resourceType: 'PractitionerRole',
        id: '#P1',
        active: false,
        identifier: [
          {
            value: 'Identifier Value',
          },
        ],
        practitioner: {
          reference: 'Practitioner/13579',
        },
      },
    ];

    parseContainedResources(testGroup, testJsonArray, 'sourceField');
    expect(testGroup.hasContained()).toBe(true);
    expect(testGroup.getContained()).toStrictEqual([VALID_CONTAINED]);
  });
});
