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
import { Identifier, Reference } from '@src/fhir-core/data-types/complex/Reference-Identifier';
import { ReferenceTargets } from '@src/fhir-core/decorators/ReferenceTargets';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { MockTask } from '../../test-utils';

describe('ReferenceTargets', () => {
  it('should throw AssertionError with duplicate ReferenceTargets', () => {
    const testRelativeRef = 'Organization/1234';
    let testReference = new Reference().setReference(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    let t = () => {
      testMockTaskR1.setMyReferenceProperty3(testReference);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`referenceTargets contains duplicate ResourceTypes`);

    const testAbsoluteRef = 'https://somedomain.com/path/Organization/1234';
    testReference = new Reference().setReference(testAbsoluteRef);
    t = () => {
      testMockTaskR1.setMyReferenceProperty3(testReference);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`referenceTargets contains duplicate ResourceTypes`);
  });

  it('should throw AssertionError with invalid resource in ReferenceTargets', () => {
    const testRelativeRef = 'Organization/1234';
    const testReference = new Reference().setReference(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      testMockTaskR1.setMyReferenceProperty4(testReference);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(`referenceTargets contains invalid ResourceType(s)`);
  });

  it('should throw AssertionError with invalid method argument type', () => {
    const testRelativeRef = 'Identifier/1234';
    const testIdentifier = new Identifier().setValue(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    const t = () => {
      testMockTaskR1.setMyReferenceProperty5(testIdentifier);
    };
    expect(t).toThrow(AssertionError);
    expect(t).toThrow(
      `Decorator expects setMyReferenceProperty5 to have one argument with type of 'Reference | undefined | null'`,
    );
  });

  it('should succeed with "any" reference', () => {
    const testRelativeRef = 'Location/1234';
    let testReference = new Reference().setReference(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setMyReferenceProperty2(testReference);
    expect(testMockTaskR1.getMyReferenceProperty2().hasReference()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty2().getReference()).toBeDefined();
    expect(testMockTaskR1.getMyReferenceProperty2().getReference()).toStrictEqual(testRelativeRef);

    const testAbsoluteRef = 'https://somedomain.com/path/Location/1234';
    testReference = new Reference().setReference(testAbsoluteRef);
    testMockTaskR1.setMyReferenceProperty2(testReference);
    expect(testMockTaskR1.getMyReferenceProperty2().hasReference()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty2().getReference()).toBeDefined();
    expect(testMockTaskR1.getMyReferenceProperty2().getReference()).toStrictEqual(testAbsoluteRef);
  });

  it('should succeed with method not starting with "set"', () => {
    const testRelativeRef = 'Organization/1234';
    const testReference = new Reference().setReference(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.xxxMyReferenceProperty6(testReference);
    expect(testMockTaskR1.getMyReferenceProperty6().hasReference()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty6().getReference()).toBeDefined();
    expect(testMockTaskR1.getMyReferenceProperty6().getReference()).toStrictEqual(testRelativeRef);
  });

  it('should succeed with undefined reference', () => {
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setMyReferenceProperty1(undefined);
    expect(testMockTaskR1.getMyReferenceProperty1().hasReference()).toBe(false);
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toBeUndefined();
  });

  it('should succeed with null reference', () => {
    const testMockTaskR1 = new MockTaskR1();
    // @ts-expect-error: allow for testing
    testMockTaskR1.setMyReferenceProperty7(null);
    expect(testMockTaskR1.getMyReferenceProperty7()).toBeNull();
  });

  it('should succeed with Reference.reference not set', () => {
    const testRelativeRef = 'Organization/1234';
    const testReference = new Reference().setDisplay(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setMyReferenceProperty1(testReference);
    expect(testMockTaskR1.getMyReferenceProperty1().hasReference()).toBe(false);
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toBeUndefined();
    expect(testMockTaskR1.getMyReferenceProperty1().hasDisplay()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty1().getDisplay()).toBeDefined();
  });

  it('should succeed with Reference.reference set to internal reference', () => {
    const testInternalRef = '#1234';
    const testReference = new Reference().setReference(testInternalRef);
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setMyReferenceProperty1(testReference);
    expect(testMockTaskR1.getMyReferenceProperty1().hasReference()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toBeDefined();
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toStrictEqual(testInternalRef);
  });

  it('should throw InvalidTypeError with invalid (not Organization) reference', () => {
    const testRelativeRef = 'Location/1234';
    let testReference = new Reference().setReference(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    let t = () => {
      testMockTaskR1.setMyReferenceProperty1(testReference);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `setMyReferenceProperty1: 'value' argument (${testRelativeRef}) is not for a valid resource type`,
    );

    const testAbsoluteRef = 'https://somedomain.com/path/Location/1234';
    testReference = new Reference().setReference(testAbsoluteRef);
    t = () => {
      testMockTaskR1.setMyReferenceProperty1(testReference);
    };
    expect(t).toThrow(InvalidTypeError);
    expect(t).toThrow(
      `setMyReferenceProperty1: 'value' argument (${testAbsoluteRef}) is not for a valid resource type`,
    );
  });

  it('should succeed with valid Organization reference', () => {
    const testRelativeRef = 'Organization/1234';
    let testReference = new Reference().setReference(testRelativeRef);
    const testMockTaskR1 = new MockTaskR1();
    testMockTaskR1.setMyReferenceProperty1(testReference);
    expect(testMockTaskR1.getMyReferenceProperty1().hasReference()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toBeDefined();
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toStrictEqual(testRelativeRef);

    const testAbsoluteRef = 'https://somedomain.com/path/Organization/1234';
    testReference = new Reference().setReference(testAbsoluteRef);
    testMockTaskR1.setMyReferenceProperty1(testReference);
    expect(testMockTaskR1.getMyReferenceProperty1().hasReference()).toBe(true);
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toBeDefined();
    expect(testMockTaskR1.getMyReferenceProperty1().getReference()).toStrictEqual(testAbsoluteRef);
  });
});

export class MockTaskR1 extends MockTask {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  protected myReferenceProperty1?: Reference | undefined;

  public getMyReferenceProperty1(): Reference {
    return this.myReferenceProperty1 ?? new Reference();
  }

  @ReferenceTargets(['Organization'])
  public setMyReferenceProperty1(value: Reference | undefined): this {
    this.myReferenceProperty1 = value;
    return this;
  }

  protected myReferenceProperty2?: Reference | undefined;

  public getMyReferenceProperty2(): Reference {
    return this.myReferenceProperty2 ?? new Reference();
  }

  @ReferenceTargets([])
  public setMyReferenceProperty2(value: Reference | undefined): this {
    this.myReferenceProperty2 = value;
    return this;
  }

  protected myReferenceProperty3?: Reference | undefined;

  @ReferenceTargets(['Organization', 'Organization', 'Location'])
  public setMyReferenceProperty3(value: Reference | undefined): this {
    this.myReferenceProperty3 = value;
    return this;
  }

  protected myReferenceProperty4?: Reference | undefined;

  // @ts-expect-error: allow for testing
  @ReferenceTargets(['InvalidResource'])
  public setMyReferenceProperty4(value: Reference | undefined): this {
    this.myReferenceProperty4 = value;
    return this;
  }

  protected myReferenceProperty5?: Identifier | undefined;

  @ReferenceTargets(['Organization'])
  public setMyReferenceProperty5(value: Identifier | undefined): this {
    this.myReferenceProperty5 = value;
    return this;
  }

  protected myReferenceProperty6?: Reference | undefined;

  public getMyReferenceProperty6(): Reference {
    return this.myReferenceProperty6 ?? new Reference();
  }

  @ReferenceTargets(['Organization'])
  public xxxMyReferenceProperty6(value: Reference | undefined): this {
    this.myReferenceProperty6 = value;
    return this;
  }

  protected myReferenceProperty7: Reference | null = null;

  public getMyReferenceProperty7(): Reference {
    // @ts-expect-error: allow for testing
    return this.myReferenceProperty7;
  }

  @ReferenceTargets(['Organization'])
  public setMyReferenceProperty7(value: Reference): this {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (value !== null) {
      this.myReferenceProperty7 = value;
    }
    return this;
  }

  public override fhirType(): string {
    return 'MockTaskR1';
  }

  public override copy(): MockTaskR1 {
    const dest = new MockTaskR1();
    this.copyValues(dest);
    return dest;
  }
}
