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

import { DomainResource } from '@src/fhir-core/base-models/DomainResource';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Group Class
 *
 * @remarks
 * Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.
 *
 * **FHIR Specification**
 * - **Short:** Group of multiple entities
 * - **Definition:** Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.
 * - **Comment:** If both Group.characteristic and Group.member are present, then the members are the individuals who were found who met the characteristic.  It's possible that there might be other candidate members who meet the characteristic and aren't (yet) in the list.  All members SHALL have the listed characteristics.
 * - **FHIR Version:** 4.0.1
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.Group
 *
 * @category Resource Models
 * @see [FHIR Group](http://hl7.org/fhir/StructureDefinition/Group)
 */
export class Group extends DomainResource {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  /**
   * {@inheritDoc Resource.resourceType}
   */
  public resourceType(): string {
    return this.fhirType();
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'Group';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    // TODO - complete
    //return super.isEmpty() && isElementEmpty(this.text, this.contained, this.extension, this.modifierExtension);
    return super.isEmpty();
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public override copy(): Group {
    // TODO - complete
    return new Group();
  }

  /**
   * {@inheritDoc Base.copyValues}
   */
  public override copyValues(dest: Group): void {
    // TODO - complete
    super.copyValues(dest);
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
