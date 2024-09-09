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

import { strict as assert } from 'node:assert';
import { Resource } from '@src/fhir-core/base-models/Resource';
import { Narrative } from '@src/fhir-core/data-types/complex/Narrative';
import { Extension, IBaseExtension, IBaseModifierExtension } from '@src/fhir-core/base-models/core-fhir-models';
import { fhirUri } from '@src/fhir-core/data-types/primitive/primitive-types';
import { isElementEmpty, validateUrl } from '@src/fhir-core/utility/element-util';
import { IBase } from '@src/fhir-core/base-models/IBase';

/* eslint-disable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */

/**
 * Abstract DomainResource Class
 *
 * @remarks
 * A resource that includes narrative, extensions, and contained resources.
 *
 * **FHIR Specification**
 * - **Short:** A resource with narrative, extensions, and contained resources.
 * - **Definition:** A resource that includes narrative, extensions, and contained resources.
 * - **FHIR Version:** 4.0.1; Normative since 4.0.0
 *
 * @privateRemarks
 * Loosely based on HAPI FHIR org.hl7.fhir-core.r4.model.DomainResource
 *
 * @category Base Models
 * @see [FHIR DomainResource](http://hl7.org/fhir/StructureDefinition/DomainResource)
 */
export abstract class DomainResource extends Resource implements IBase, IBaseExtension, IBaseModifierExtension {
  protected constructor() {
    super();
  }

  /**
   * DomainResource.text Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Text summary of the resource, for human interpretation
   * - **Definition:** A human-readable narrative that contains a summary of the resource and can be used to represent the content of the resource to a human. The narrative need not encode all the structured data, but is required to contain sufficient detail to make it "clinically safe" for a human to just read the narrative. Resource definitions may define what content should be represented in the narrative to ensure clinical safety.
   * - **Comment:** Contained resources do not have narrative. Resources that are not contained SHOULD have a narrative. In some cases, a resource may only have text with little or no additional discrete data (as long as all minOccurs=1 elements are satisfied).  This may be necessary for data from legacy systems where information is captured as a "text blob" or where text is additionally entered raw or narrated and encoded information is added later.
   * - **FHIR Type:** `Narrative`
   * - **Cardinality:** 0..1
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected text?: Narrative | undefined;

  /**
   * DomainResource.contained Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Contained, inline Resources
   * - **Definition:** These resources do not have an independent existence apart from the resource that contains them - they cannot be identified independently, and nor can they have their own independent transaction scope.
   * - **Comment:** This should never be done when the content can be identified properly, as once identification is lost, it is extremely difficult (and context dependent) to restore it again. Contained resources may have profiles and tags In their meta elements, but SHALL NOT have security labels.
   * - **FHIR Type:** `Resource`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected contained?: Resource[] | undefined;

  /**
   * DomainResource.extension Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Additional content defined by implementations
   * - **Definition:** May be used to represent additional information that is not part of the basic definition of the resource. To make the use of extensions safe and manageable, there is a strict set of governance  applied to the definition and use of extensions. Though any implementer can define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension.
   * - **Comment:** There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.
   * - **FHIR Type:** `Extension`
   * - **Cardinality:** 0..*
   * - **isModifier:** false
   * - **isSummary:** false
   */
  protected extension?: Extension[] | undefined;

  /**
   * DomainResource.modifierExtension Element
   *
   * @remarks
   * **FHIR Specification**
   * - **Short:** Extensions that cannot be ignored
   * - **Definition:** May be used to represent additional information that is not part of the basic definition of the resource and that modifies the understanding of the element that contains it and/or the understanding of the containing element's descendants. Usually modifier elements provide negation or qualification. To make the use of extensions safe and manageable, there is a strict set of governance applied to the definition and use of extensions. Though any implementer is allowed to define an extension, there is a set of requirements that SHALL be met as part of the definition of the extension. Applications processing a resource are required to check for modifier extensions. Modifier extensions SHALL NOT change the meaning of any elements on Resource or DomainResource (including cannot change the meaning of modifierExtension itself).
   * - **Comment:** There can be no stigma associated with the use of extensions by any application, project, or standard - regardless of the institution or jurisdiction that uses or defines the extensions.  The use of extensions is what allows the FHIR specification to retain a core level of simplicity for everyone.
   * - **Requirements:** Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](https://hl7.org/fhir/R4/extensibility.html#modifierExtension).
   * - **FHIR Type:** `Extension`
   * - **Cardinality:** 0..*
   * - **isModifier:** true
   * - **isModifierReason:** Modifier extensions allow for extensions that *cannot* be safely ignored to be clearly distinguished from the vast majority of extensions which can be safely ignored.  This promotes interoperability by eliminating the need for implementers to prohibit the presence of extensions. For further information, see the [definition of modifier extensions](https://hl7.org/fhir/R4/extensibility.html#modifierExtension).
   * - **isSummary:** false
   */
  protected modifierExtension?: Extension[] | undefined;

  /**
   * @returns the `text` property value as a Narrative
   */
  public getText(): Narrative {
    return this.text ?? new Narrative(null, null);
  }

  /**
   * Assigns the provided value to the `text` property.
   *
   * @param value - the `text` value
   * @returns this
   */
  public setText(value: Narrative | undefined): this {
    this.text = value;
    return this;
  }

  /**
   * @returns `true` if the `text` property exists and has a value; `false` otherwise
   */
  public hasText(): boolean {
    return this.text !== undefined && !this.text.isEmpty();
  }

  /**
   * @returns the `contained` property value as a Resource array
   */
  public getContained(): Resource[] {
    return this.contained ?? ([] as Resource[]);
  }

  /**
   * Assigns the provided Resource array value to the `contained` property.
   *
   * @param value - the `contained` array value
   * @returns this
   */
  public setContained(value: Resource[] | undefined): this {
    this.contained = value;
    return this;
  }

  /**
   * Add the provided Resource value to the `contained` array property.
   *
   * @param value - the `contained` value
   * @returns this
   */
  public addContained(value?: Resource): this {
    if (value === undefined) {
      return this;
    }
    this.initContained();
    this.contained?.push(value);
    return this;
  }

  /**
   * @returns `true` if the `contained` property exists and has a value; `false` otherwise
   */
  public hasContained(): boolean {
    return (
      this.contained !== undefined &&
      this.contained.length > 0 &&
      this.contained.some((item: Resource) => !item.isEmpty())
    );
  }

  /**
   * Initialize the `contained` property
   *
   * @private
   */
  private initContained(): void {
    if (this.contained === undefined) {
      this.contained = [] as Resource[];
    }
  }

  /**
   * {@inheritDoc IBaseExtension.getExtension}
   */
  public getExtension(): Extension[] {
    return this.extension ?? ([] as Extension[]);
  }

  /**
   * {@inheritDoc IBaseExtension.setExtension}
   */
  public setExtension(extension: Extension[] | undefined): this {
    this.extension = extension;
    return this;
  }

  /**
   * {@inheritDoc IBaseExtension.hasExtension}
   */
  public hasExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getExtension().some((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return this.existsExtension();
  }

  /**
   * {@inheritDoc IBaseExtension.getExtensionByUrl}
   */
  public getExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasExtension()) {
      const results = this.getExtension().filter((ext) => ext.getUrl() && ext.getUrl() === url);
      if (results.length === 0) {
        return undefined;
      }
      assert(results.length === 1, `The url (${url}) must have only one match`);
      return results[0];
    }
    return undefined;
  }

  /**
   * {@inheritDoc IBaseExtension.addExtension}
   */
  public addExtension(extension?: Extension): this {
    if (extension !== undefined) {
      this.initExtension();
      // @ts-expect-error: initExtension() ensures this.extension exists
      this.extension.push(extension);
    }
    return this;
  }

  /**
   * {@inheritDoc IBaseExtension.removeExtension}
   */
  public removeExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasExtension()) {
      const results = this.getExtension().filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setExtension(results);
    }
  }

  /**
   * Ensures the `extension` property exists and if not initializes it to an empty array.
   *
   * @private
   */
  private initExtension(): void {
    if (!this.extension) {
      this.extension = [] as Extension[];
    }
  }

  /**
   * Determines if `extension` property exists, and if so, determines if the `extension` array is empty.
   *
   * @returns `true` if the `extension` property array exists and has at least one element; false otherwise
   * @private
   */
  private existsExtension(): boolean {
    return (
      this.extension !== undefined &&
      this.extension.length > 0 &&
      this.extension.some((item: Extension) => !item.isEmpty())
    );
  }

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtension}
   */
  public getModifierExtension(): Extension[] {
    return this.modifierExtension ?? ([] as Extension[]);
  }

  /**
   * {@inheritDoc IBaseModifierExtension.setModifierExtension}
   */
  public setModifierExtension(extension: Extension[] | undefined): this {
    this.modifierExtension = extension;
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.hasModifierExtension}
   */
  public hasModifierExtension(url?: fhirUri): boolean {
    if (url) {
      validateUrl(url);
      return this.getModifierExtension().some((ext) => ext.getUrl() && ext.getUrl() === url);
    }
    return this.existsModifierExtension();
  }

  /**
   * {@inheritDoc IBaseModifierExtension.getModifierExtensionByUrl}
   */
  public getModifierExtensionByUrl(url: fhirUri): Extension | undefined {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      const results = this.getModifierExtension().filter((ext) => ext.getUrl() && ext.getUrl() === url);
      if (results.length === 0) {
        return undefined;
      }
      assert(results.length === 1, `The url (${url}) must have only one match`);
      return results[0];
    }
    return undefined;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.addModifierExtension}
   */
  public addModifierExtension(extension: Extension | undefined): this {
    if (extension !== undefined) {
      this.initModifierExtension();
      // @ts-expect-error: initExtension() ensures this.extension exists
      this.modifierExtension.push(extension);
    }
    return this;
  }

  /**
   * {@inheritDoc IBaseModifierExtension.removeModifierExtension}
   */
  public removeModifierExtension(url: fhirUri): void {
    validateUrl(url);
    if (this.hasModifierExtension()) {
      const results = this.getModifierExtension().filter((ext) => !ext.getUrl() || ext.getUrl() !== url);
      this.setModifierExtension(results);
    }
  }

  /**
   * Ensures the `modifierExtension` property exists and if not initializes it to an empty array.
   *
   * @private
   */
  private initModifierExtension(): void {
    if (!this.modifierExtension) {
      this.modifierExtension = [] as Extension[];
    }
  }

  /**
   * Determines if `modifierExtension` property exists, and if so, determines if the `modifierExtension`
   * array is empty.
   *
   * @returns `true` if the `modifierExtension` property array exists and has at least one element;
   * false otherwise
   * @private
   */
  private existsModifierExtension(): boolean {
    return (
      this.modifierExtension !== undefined &&
      this.modifierExtension.length > 0 &&
      this.modifierExtension.some((item: Extension) => !item.isEmpty())
    );
  }

  /**
   * {@inheritDoc Base.fhirType}
   */
  public override fhirType(): string {
    return 'DomainResource';
  }

  /**
   * {@inheritDoc Base.isEmpty}
   */
  public override isEmpty(): boolean {
    return super.isEmpty() && isElementEmpty(this.text, this.contained, this.extension, this.modifierExtension);
  }

  /**
   * {@inheritDoc Base.copy}
   */
  public abstract override copy(): DomainResource;

  /**
   * {@inheritDoc Base.copyValues}
   */
  protected override copyValues(dest: DomainResource): void {
    super.copyValues(dest);
    dest.text = this.text?.copy();
    if (this.contained == undefined) {
      dest.contained = undefined;
    } else {
      dest.contained = [] as Resource[];
      for (const contained of this.contained) {
        dest.contained.push(contained.copy());
      }
    }
    if (this.extension === undefined) {
      dest.extension = undefined;
    } else {
      dest.extension = [] as Extension[];
      for (const extension of this.extension) {
        dest.extension.push(extension.copy());
      }
    }
    if (this.modifierExtension == undefined) {
      dest.modifierExtension = undefined;
    } else {
      dest.modifierExtension = [] as Extension[];
      for (const modifierExtension of this.modifierExtension) {
        dest.modifierExtension.push(modifierExtension.copy());
      }
    }
  }
}

/* eslint-enable jsdoc/require-param, jsdoc/require-returns -- false positives when inheritDoc tag used */
