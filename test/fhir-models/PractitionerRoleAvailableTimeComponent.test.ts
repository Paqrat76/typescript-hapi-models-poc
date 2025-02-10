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

import { Base } from '@src/fhir-core/base-models/Base';
import { BackboneElement, Element, Extension } from '@src/fhir-core/base-models/core-fhir-models';
import { DaysOfWeekEnum } from '@src/fhir-core/data-types/code-systems/DaysOfWeekEnum';
import { BooleanType } from '@src/fhir-core/data-types/primitive/BooleanType';
import { CodeType, EnumCodeType } from '@src/fhir-core/data-types/primitive/CodeType';
import { fhirCode } from '@src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '@src/fhir-core/data-types/primitive/StringType';
import { TimeType } from '@src/fhir-core/data-types/primitive/TimeType';
import { InvalidCodeError } from '@src/fhir-core/errors/InvalidCodeError';
import { InvalidTypeError } from '@src/fhir-core/errors/InvalidTypeError';
import { PrimitiveTypeError } from '@src/fhir-core/errors/PrimitiveTypeError';
import { PractitionerRoleAvailableTimeComponent } from '@src/fhir-models/PractitionerRole';
import {
  DATATYPE_EXTENSION,
  DATATYPE_ID,
  INVALID_NON_STRING_TYPE,
  INVALID_NON_STRING_TYPE_VALUE,
  UNDEFINED_VALUE,
  VALID_EXTENSION,
  VALID_EXTENSION_2,
  VALID_ID,
  VALID_ID_2,
  VALID_MODIFIER_EXTENSION,
  VALID_MODIFIER_EXTENSION_2,
} from '../test-utils';

describe('PractitionerRoleAvailableTimeComponent', () => {
  const VALID_DOW_SUN = `sun`;
  const VALID_DOW_MON = `mon`;
  const VALID_DOW_TUE = `tue`;
  const VALID_DOW_THU = `thu`;
  const VALID_DOW_FRI = `fri`;
  const VALID_DOW_SAT = `sat`;
  const UNSUPPORTED_ENUM_CODE = 'unsupportedEnumCode';
  const INVALID_DOW_TYPE = new StringType(VALID_DOW_MON);
  const INVALID_DOW_TYPE_VALUE = new CodeType(UNSUPPORTED_ENUM_CODE);

  const VALID_START_TIME = `08:00:00`;
  const VALID_END_TIME = `17:00:00`;
  const VALID_START_TIME_2 = `09:00:00`;
  const VALID_END_TIME_2 = `15:00:00`;

  let daysOfWeekEnum: DaysOfWeekEnum;
  beforeAll(() => {
    daysOfWeekEnum = new DaysOfWeekEnum();
  });

  describe('Base Tests', () => {
    it('should be properly instantiated as empty', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();

      expect(testPractitionerRoleAvailableTimeComponent).toBeDefined();
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(PractitionerRoleAvailableTimeComponent);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleAvailableTimeComponent.constructor.name).toStrictEqual(
        'PractitionerRoleAvailableTimeComponent',
      );
      expect(testPractitionerRoleAvailableTimeComponent.fhirType()).toStrictEqual('PractitionerRole.availableTime');
      expect(testPractitionerRoleAvailableTimeComponent.isEmpty()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.toJSON()).toBeUndefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([] as EnumCodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([] as CodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([] as fhirCode[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toBeUndefined();
    });

    it('should properly copy()', () => {
      const practitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      practitionerRoleAvailableTimeComponent.setId(VALID_ID);
      practitionerRoleAvailableTimeComponent.setExtension([VALID_EXTENSION]);
      practitionerRoleAvailableTimeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      practitionerRoleAvailableTimeComponent.setDaysOfWeek([VALID_DOW_MON, VALID_DOW_FRI]);
      practitionerRoleAvailableTimeComponent.setAllDay(false);
      practitionerRoleAvailableTimeComponent.setAvailableStartTime(VALID_START_TIME);
      practitionerRoleAvailableTimeComponent.setAvailableEndTime(VALID_END_TIME);

      let testPractitionerRoleAvailableTimeComponent = practitionerRoleAvailableTimeComponent.copy();
      expect(testPractitionerRoleAvailableTimeComponent).toBeDefined();
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(PractitionerRoleAvailableTimeComponent);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleAvailableTimeComponent.constructor.name).toStrictEqual(
        'PractitionerRoleAvailableTimeComponent',
      );
      expect(testPractitionerRoleAvailableTimeComponent.fhirType()).toStrictEqual('PractitionerRole.availableTime');
      expect(testPractitionerRoleAvailableTimeComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      const enumCodeMon = new EnumCodeType(VALID_DOW_MON, daysOfWeekEnum);
      const enumCodeFri = new EnumCodeType(VALID_DOW_FRI, daysOfWeekEnum);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([enumCodeMon, enumCodeFri]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeMon as CodeType,
        enumCodeFri as CodeType,
      ]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_MON, VALID_DOW_FRI]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType(false));
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(
        new TimeType(VALID_START_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toStrictEqual(VALID_START_TIME);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(
        new TimeType(VALID_END_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toStrictEqual(VALID_END_TIME);

      // Reset to undefined

      practitionerRoleAvailableTimeComponent.setId(UNDEFINED_VALUE);
      practitionerRoleAvailableTimeComponent.setExtension(UNDEFINED_VALUE);
      practitionerRoleAvailableTimeComponent.setModifierExtension(UNDEFINED_VALUE);
      practitionerRoleAvailableTimeComponent.setDaysOfWeek(UNDEFINED_VALUE);
      practitionerRoleAvailableTimeComponent.setAllDay(UNDEFINED_VALUE);
      practitionerRoleAvailableTimeComponent.setAvailableStartTime(UNDEFINED_VALUE);
      practitionerRoleAvailableTimeComponent.setAvailableEndTime(UNDEFINED_VALUE);

      testPractitionerRoleAvailableTimeComponent = practitionerRoleAvailableTimeComponent.copy();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([] as EnumCodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([] as CodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([] as fhirCode[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toBeUndefined();
    });

    it('should be properly reset by modifying all properties with primitives', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      testPractitionerRoleAvailableTimeComponent.setId(VALID_ID);
      testPractitionerRoleAvailableTimeComponent.setExtension([VALID_EXTENSION]);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeek([VALID_DOW_MON]);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeek(VALID_DOW_FRI);
      testPractitionerRoleAvailableTimeComponent.setAllDay(false);
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTime(VALID_START_TIME);
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTime(VALID_END_TIME);

      expect(testPractitionerRoleAvailableTimeComponent).toBeDefined();
      expect(testPractitionerRoleAvailableTimeComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      const enumCodeMon = new EnumCodeType(VALID_DOW_MON, daysOfWeekEnum);
      const enumCodeFri = new EnumCodeType(VALID_DOW_FRI, daysOfWeekEnum);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([enumCodeMon, enumCodeFri]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeMon as CodeType,
        enumCodeFri as CodeType,
      ]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_MON, VALID_DOW_FRI]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType(false));
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(
        new TimeType(VALID_START_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toStrictEqual(VALID_START_TIME);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(
        new TimeType(VALID_END_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toStrictEqual(VALID_END_TIME);

      // Reset

      testPractitionerRoleAvailableTimeComponent.setId(VALID_ID_2);
      testPractitionerRoleAvailableTimeComponent.setExtension([VALID_EXTENSION_2]);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      const enumCodeSat = new EnumCodeType(VALID_DOW_SAT, daysOfWeekEnum);
      const enumCodeSun = new EnumCodeType(VALID_DOW_SUN, daysOfWeekEnum);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType([enumCodeSat]);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(enumCodeSun);
      testPractitionerRoleAvailableTimeComponent.setAllDay(true);
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTime(VALID_START_TIME_2);
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTime(VALID_END_TIME_2);

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([enumCodeSat, enumCodeSun]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeSat as CodeType,
        enumCodeSun as CodeType,
      ]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_SAT, VALID_DOW_SUN]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType(true));
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(
        new TimeType(VALID_START_TIME_2),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toStrictEqual(VALID_START_TIME_2);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(
        new TimeType(VALID_END_TIME_2),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toStrictEqual(VALID_END_TIME_2);

      // Reset as empty

      testPractitionerRoleAvailableTimeComponent.setId(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setExtension(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setAllDay(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTime(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTime(UNDEFINED_VALUE);

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([] as EnumCodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([] as CodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([] as fhirCode[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toBeUndefined();

      // Reset setDaysOfWeekElement for coverage

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeek([VALID_DOW_TUE]);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeek(VALID_DOW_THU);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_TUE, VALID_DOW_THU]);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType(undefined);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(undefined);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([] as EnumCodeType[]);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekElement(undefined);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekElement(undefined);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([] as CodeType[]);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeek(undefined);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeek(undefined);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([] as fhirCode[]);
    });

    it('should be properly reset by modifying all properties with DataTypes', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      testPractitionerRoleAvailableTimeComponent.setId(VALID_ID);
      testPractitionerRoleAvailableTimeComponent.setExtension([VALID_EXTENSION]);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekElement([new CodeType(VALID_DOW_MON)]);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekElement(new CodeType(VALID_DOW_FRI));
      testPractitionerRoleAvailableTimeComponent.setAllDayElement(new BooleanType(false));
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTimeElement(new TimeType(VALID_START_TIME));
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTimeElement(new TimeType(VALID_END_TIME));

      expect(testPractitionerRoleAvailableTimeComponent).toBeDefined();
      expect(testPractitionerRoleAvailableTimeComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      const enumCodeMon = new EnumCodeType(VALID_DOW_MON, daysOfWeekEnum);
      const enumCodeFri = new EnumCodeType(VALID_DOW_FRI, daysOfWeekEnum);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([enumCodeMon, enumCodeFri]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeMon as CodeType,
        enumCodeFri as CodeType,
      ]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_MON, VALID_DOW_FRI]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType(false));
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(
        new TimeType(VALID_START_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toStrictEqual(VALID_START_TIME);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(
        new TimeType(VALID_END_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toStrictEqual(VALID_END_TIME);

      // Reset

      testPractitionerRoleAvailableTimeComponent.setId(VALID_ID_2);
      testPractitionerRoleAvailableTimeComponent.setExtension([VALID_EXTENSION_2]);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION_2]);
      const enumCodeSat = new EnumCodeType(VALID_DOW_SAT, daysOfWeekEnum);
      const enumCodeSun = new EnumCodeType(VALID_DOW_SUN, daysOfWeekEnum);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType([enumCodeSat]);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(enumCodeSun);
      testPractitionerRoleAvailableTimeComponent.setAllDayElement(new BooleanType(true));
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTimeElement(new TimeType(VALID_START_TIME_2));
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTimeElement(new TimeType(VALID_END_TIME_2));

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toStrictEqual(VALID_ID_2);
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([VALID_EXTENSION_2]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION_2]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([enumCodeSat, enumCodeSun]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeSat as CodeType,
        enumCodeSun as CodeType,
      ]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_SAT, VALID_DOW_SUN]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType(true));
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(
        new TimeType(VALID_START_TIME_2),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toStrictEqual(VALID_START_TIME_2);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(
        new TimeType(VALID_END_TIME_2),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toStrictEqual(VALID_END_TIME_2);

      // Reset as empty

      testPractitionerRoleAvailableTimeComponent.setId(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setExtension(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setAllDayElement(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTimeElement(UNDEFINED_VALUE);
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTimeElement(UNDEFINED_VALUE);

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([] as Extension[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([] as Extension[]);

      // PractitionerRoleAvailableTimeComponent properties
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([] as EnumCodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([] as CodeType[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([] as fhirCode[]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(new BooleanType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toBeUndefined();
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(new TimeType());
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toBeUndefined();

      // Reset setDaysOfWeekElement for coverage

      const codeTypeTue = new CodeType(VALID_DOW_TUE);
      const codeTypeThu = new CodeType(VALID_DOW_THU);
      const enumCodeTue = new EnumCodeType(VALID_DOW_TUE, daysOfWeekEnum);
      const enumCodeThu = new EnumCodeType(VALID_DOW_THU, daysOfWeekEnum);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekElement([codeTypeTue]);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekElement(codeTypeThu);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeTue as CodeType,
        enumCodeThu as CodeType,
      ]);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType(undefined);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(undefined);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([] as EnumCodeType[]);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeekElement(undefined);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeekElement(undefined);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([] as CodeType[]);

      testPractitionerRoleAvailableTimeComponent.setDaysOfWeek(undefined);
      testPractitionerRoleAvailableTimeComponent.addDaysOfWeek(undefined);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([] as fhirCode[]);
    });
  });

  describe('Serialization/Deserialization', () => {
    const VALID_JSON = {
      id: 'id12345',
      extension: [
        {
          url: 'extUrl',
          valueString: 'Extension string value',
        },
      ],
      modifierExtension: [
        {
          url: 'modExtUrl',
          valueString: 'ModifierExtension string value',
        },
      ],
      daysOfWeek: ['mon', 'fri'],
      allDay: false,
      _allDay: {
        id: 'DT-1357',
        extension: [
          {
            url: 'datatypeUrl',
            valueString: 'datatype extension string value',
          },
        ],
      },
      availableStartTime: '08:00:00',
      availableEndTime: '17:00:00',
    };

    it('should properly create serialized content', () => {
      const allDayType = new BooleanType(false);
      allDayType.setId(DATATYPE_ID);
      allDayType.addExtension(DATATYPE_EXTENSION);

      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      testPractitionerRoleAvailableTimeComponent.setId(VALID_ID);
      testPractitionerRoleAvailableTimeComponent.setExtension([VALID_EXTENSION]);
      testPractitionerRoleAvailableTimeComponent.setModifierExtension([VALID_MODIFIER_EXTENSION]);
      testPractitionerRoleAvailableTimeComponent.setDaysOfWeek([VALID_DOW_MON, VALID_DOW_FRI]);
      testPractitionerRoleAvailableTimeComponent.setAllDayElement(allDayType);
      testPractitionerRoleAvailableTimeComponent.setAvailableStartTime(VALID_START_TIME);
      testPractitionerRoleAvailableTimeComponent.setAvailableEndTime(VALID_END_TIME);

      expect(testPractitionerRoleAvailableTimeComponent).toBeDefined();
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(PractitionerRoleAvailableTimeComponent);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleAvailableTimeComponent.constructor.name).toStrictEqual(
        'PractitionerRoleAvailableTimeComponent',
      );
      expect(testPractitionerRoleAvailableTimeComponent.fhirType()).toStrictEqual('PractitionerRole.availableTime');
      expect(testPractitionerRoleAvailableTimeComponent.isEmpty()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.toJSON()).toBeDefined();

      // inherited properties from BackboneElement
      expect(testPractitionerRoleAvailableTimeComponent.hasId()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getId()).toStrictEqual(VALID_ID);
      expect(testPractitionerRoleAvailableTimeComponent.hasExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getExtension()).toEqual([VALID_EXTENSION]);
      expect(testPractitionerRoleAvailableTimeComponent.hasModifierExtension()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getModifierExtension()).toEqual([VALID_MODIFIER_EXTENSION]);

      // PractitionerRoleAvailableTimeComponent properties
      const enumCodeMon = new EnumCodeType(VALID_DOW_MON, daysOfWeekEnum);
      const enumCodeFri = new EnumCodeType(VALID_DOW_FRI, daysOfWeekEnum);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekEnumType()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekEnumType()).toEqual([enumCodeMon, enumCodeFri]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeekElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeekElement()).toEqual([
        enumCodeMon as CodeType,
        enumCodeFri as CodeType,
      ]);
      expect(testPractitionerRoleAvailableTimeComponent.hasDaysOfWeek()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getDaysOfWeek()).toEqual([VALID_DOW_MON, VALID_DOW_FRI]);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDayElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDayElement()).toEqual(allDayType);
      expect(testPractitionerRoleAvailableTimeComponent.hasAllDay()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAllDay()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTimeElement()).toEqual(
        new TimeType(VALID_START_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableStartTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableStartTime()).toStrictEqual(VALID_START_TIME);
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTimeElement()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTimeElement()).toEqual(
        new TimeType(VALID_END_TIME),
      );
      expect(testPractitionerRoleAvailableTimeComponent.hasAvailableEndTime()).toBe(true);
      expect(testPractitionerRoleAvailableTimeComponent.getAvailableEndTime()).toStrictEqual(VALID_END_TIME);

      expect(testPractitionerRoleAvailableTimeComponent.toJSON()).toEqual(VALID_JSON);
    });

    it('should return undefined when deserialize with no json', () => {
      let testPractitionerRoleAvailableTimeComponent: PractitionerRoleAvailableTimeComponent | undefined = undefined;

      testPractitionerRoleAvailableTimeComponent = PractitionerRoleAvailableTimeComponent.parse({});
      expect(testPractitionerRoleAvailableTimeComponent).toBeUndefined();

      testPractitionerRoleAvailableTimeComponent = PractitionerRoleAvailableTimeComponent.parse(null);
      expect(testPractitionerRoleAvailableTimeComponent).toBeUndefined();

      // @ts-expect-error: allow for testing
      testPractitionerRoleAvailableTimeComponent = PractitionerRoleAvailableTimeComponent.parse(undefined);
      expect(testPractitionerRoleAvailableTimeComponent).toBeUndefined();
    });

    it('should properly deserialize with valid json', () => {
      const testPractitionerRoleAvailableTimeComponent = PractitionerRoleAvailableTimeComponent.parse(VALID_JSON);

      expect(testPractitionerRoleAvailableTimeComponent).toBeDefined();
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(PractitionerRoleAvailableTimeComponent);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(BackboneElement);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Element);
      expect(testPractitionerRoleAvailableTimeComponent).toBeInstanceOf(Base);
      expect(testPractitionerRoleAvailableTimeComponent?.constructor.name).toStrictEqual(
        'PractitionerRoleAvailableTimeComponent',
      );
      expect(testPractitionerRoleAvailableTimeComponent?.fhirType()).toStrictEqual('PractitionerRole.availableTime');
      expect(testPractitionerRoleAvailableTimeComponent?.isEmpty()).toBe(false);
      expect(testPractitionerRoleAvailableTimeComponent?.toJSON()).toEqual(VALID_JSON);
    });
  });

  describe('Type Assertion Tests', () => {
    // These tests are all negative (error) tests. All other tests are, by definition,
    // positive tests for type assertions.

    it('should throw InvalidTypeError when setDaysOfWeekEnumType for invalid enum', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.setDaysOfWeekEnumType([INVALID_DOW_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.daysOfWeek; Provided instance array has an element that is not an instance of DaysOfWeekEnum.`,
      );
    });

    it('should throw InvalidTypeError when addDaysOfWeekEnumType for invalid enum', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.addDaysOfWeekEnumType(INVALID_DOW_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.daysOfWeek; Provided type is not an instance of DaysOfWeekEnum.`,
      );
    });

    it('should throw InvalidTypeError when setDaysOfWeekElement for invalid type', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.setDaysOfWeekElement([INVALID_DOW_TYPE]);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.daysOfWeek; Provided element array has an element that is not an instance of CodeType.`,
      );
    });

    it('should throw InvalidTypeError when addDaysOfWeekElement for invalid type', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.addDaysOfWeekElement(INVALID_DOW_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.daysOfWeek; Provided element is not an instance of CodeType.`,
      );
    });

    it('should throw InvalidCodeError when setDaysOfWeekElement for invalid type value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        testPractitionerRoleAvailableTimeComponent.setDaysOfWeekElement([INVALID_DOW_TYPE_VALUE]);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown DaysOfWeekEnum 'code' value 'unsupportedEnumCode'`);
    });

    it('should throw InvalidCodeError when addDaysOfWeekElement for invalid type value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        testPractitionerRoleAvailableTimeComponent.addDaysOfWeekElement(INVALID_DOW_TYPE_VALUE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown DaysOfWeekEnum 'code' value 'unsupportedEnumCode'`);
    });

    it('should throw InvalidCodeError when setDaysOfWeek for invalid value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        testPractitionerRoleAvailableTimeComponent.setDaysOfWeek([UNSUPPORTED_ENUM_CODE]);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown DaysOfWeekEnum 'code' value 'unsupportedEnumCode'`);
    });

    it('should throw InvalidCodeError when addDaysOfWeek for invalid value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        testPractitionerRoleAvailableTimeComponent.addDaysOfWeek(UNSUPPORTED_ENUM_CODE);
      };
      expect(t).toThrow(InvalidCodeError);
      expect(t).toThrow(`Unknown DaysOfWeekEnum 'code' value 'unsupportedEnumCode'`);
    });

    it('should throw InvalidTypeError when setAllDayElement for invalid type', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.setAllDayElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.allDay; Provided value is not an instance of BooleanType.`,
      );
    });

    it('should throw PrimitiveTypeError when setAllDay for invalid value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.setAllDay(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.availableTime.allDay (Invalid datatype)`);
    });

    it('should throw InvalidTypeError when setAvailableStartTimeElement for invalid type', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.setAvailableStartTimeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.availableStartTime; Provided value is not an instance of TimeType.`,
      );
    });

    it('should throw PrimitiveTypeError when setAvailableStartTime for invalid value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        testPractitionerRoleAvailableTimeComponent.setAvailableStartTime(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.availableTime.availableStartTime (Invalid datatype)`);
    });

    it('should throw InvalidTypeError when setAvailableEndTimeElement for invalid type', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        // @ts-expect-error: allow for testing
        testPractitionerRoleAvailableTimeComponent.setAvailableEndTimeElement(INVALID_NON_STRING_TYPE);
      };
      expect(t).toThrow(InvalidTypeError);
      expect(t).toThrow(
        `Invalid PractitionerRole.availableTime.availableEndTime; Provided value is not an instance of TimeType.`,
      );
    });

    it('should throw PrimitiveTypeError when setAvailableEndTime for invalid value', () => {
      const testPractitionerRoleAvailableTimeComponent = new PractitionerRoleAvailableTimeComponent();
      const t = () => {
        testPractitionerRoleAvailableTimeComponent.setAvailableEndTime(INVALID_NON_STRING_TYPE_VALUE);
      };
      expect(t).toThrow(PrimitiveTypeError);
      expect(t).toThrow(`Invalid PractitionerRole.availableTime.availableEndTime (Invalid datatype)`);
    });
  });
});
