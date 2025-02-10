/*
 * Copyright (c) 2025. Joe Paquette
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

import { Address } from '../src/fhir-core/data-types/complex/Address';
import { Attachment } from '../src/fhir-core/data-types/complex/Attachment';
import { HumanName } from '../src/fhir-core/data-types/complex/HumanName';
import { Period } from '../src/fhir-core/data-types/complex/Period';
import { Quantity } from '../src/fhir-core/data-types/complex/Quantity-variations';
import { Identifier, Reference } from '../src/fhir-core/data-types/complex/Reference-Identifier';
import { BooleanType } from '../src/fhir-core/data-types/primitive/BooleanType';
import { CodeType } from '../src/fhir-core/data-types/primitive/CodeType';
import { DateTimeType } from '../src/fhir-core/data-types/primitive/DateTimeType';
import { DecimalType } from '../src/fhir-core/data-types/primitive/DecimalType';
import { IntegerType } from '../src/fhir-core/data-types/primitive/IntegerType';
import { fhirUri } from '../src/fhir-core/data-types/primitive/primitive-types';
import { StringType } from '../src/fhir-core/data-types/primitive/StringType';
import { UriType } from '../src/fhir-core/data-types/primitive/UriType';
import { SimplePersonModel } from '../src/test-models/SimplePersonModel';
import { MockTask } from './test-utils';

/**
 * Common test data used by the TestDataModel and SimplePersonModel tests.
 *
 * @module
 */

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace TestData {
  export const VALID_CONSENT_DRAFT = `draft`;
  export const VALID_CONSENT_DRAFT_TYPE = new CodeType(VALID_CONSENT_DRAFT);
  export const VALID_CONSENT_ACTIVE = `active`;
  export const VALID_CONSENT_ACTIVE_TYPE = new CodeType(VALID_CONSENT_ACTIVE);

  export const VALID_CONTRIBUTOR_AUTHOR = `author`;
  export const VALID_CONTRIBUTOR_AUTHOR_TYPE = new CodeType(VALID_CONTRIBUTOR_AUTHOR);
  export const VALID_CONTRIBUTOR_REVIEWER = `reviewer`;
  export const VALID_CONTRIBUTOR_REVIEWER_TYPE = new CodeType(VALID_CONTRIBUTOR_REVIEWER);

  export const VALID_TASKCODE_APPROVE = `approve`;
  export const VALID_TASKCODE_APPROVE_TYPE = new CodeType(VALID_TASKCODE_APPROVE);
  export const VALID_TASKCODE_FULFILL = `fulfill`;
  export const VALID_TASKCODE_FULFILL_TYPE = new CodeType(VALID_TASKCODE_FULFILL);

  export const VALID_TASKSTATUS_REQUESTED = `requested`;
  export const VALID_TASKSTATUS_REQUESTED_TYPE = new CodeType(VALID_TASKSTATUS_REQUESTED);
  export const VALID_TASKSTATUS_ACCEPTED = `accepted`;
  export const VALID_TASKSTATUS_ACCEPTED_TYPE = new CodeType(VALID_TASKSTATUS_ACCEPTED);

  export const VALID_BOOLEAN_TRUE = true;
  export const VALID_BOOLEAN_TRUE_TYPE = new BooleanType(VALID_BOOLEAN_TRUE);
  export const VALID_BOOLEAN_FALSE = false;
  export const VALID_BOOLEAN_FALSE_TYPE = new BooleanType(VALID_BOOLEAN_FALSE);

  export const VALID_STRING = 'This is a valid string.';
  export const VALID_STRING_TYPE = new StringType(VALID_STRING);
  export const VALID_STRING_2 = 'This is another valid string.';
  export const VALID_STRING_TYPE_2 = new StringType(VALID_STRING_2);

  export const VALID_INTEGER = 13579;
  export const VALID_INTEGER_TYPE = new IntegerType(VALID_INTEGER);
  export const VALID_INTEGER_2 = 24680;
  export const VALID_INTEGER_TYPE_2 = new IntegerType(VALID_INTEGER_2);

  export const VALID_DATETIME = `2024-01-28T14:30:00.000Z`;
  export const VALID_DATETIME_TYPE = new DateTimeType(VALID_DATETIME);
  export const VALID_DATETIME_2 = `2024-07-21T15:15:00.000Z`;
  export const VALID_DATETIME_TYPE_2 = new DateTimeType(VALID_DATETIME_2);

  export const VALID_DECIMAL = 128.1978;
  export const VALID_DECIMAL_TYPE = new DecimalType(VALID_DECIMAL);
  export const VALID_DECIMAL_2 = 721.198;
  export const VALID_DECIMAL_TYPE_2 = new DecimalType(VALID_DECIMAL_2);

  export const VALID_URI = 'validUri' as fhirUri;
  export const VALID_URI_TYPE = new UriType(VALID_URI);
  export const VALID_URI_2 = 'validUri2' as fhirUri;
  export const VALID_URI_TYPE_2 = new UriType(VALID_URI_2);

  export const VALID_QUANTITY = new Quantity();
  VALID_QUANTITY.setValue(VALID_DECIMAL);

  export const VALID_PERSON_REFERENCE_VALUE = 'Person/PER-13579';
  export const VALID_PERSON_REFERENCE = new Reference();
  VALID_PERSON_REFERENCE.setReference(VALID_PERSON_REFERENCE_VALUE);
  export const VALID_PERSON_REFERENCE_VALUE_2 = 'Person/PER-97531';
  export const VALID_PERSON_REFERENCE_2 = new Reference();
  VALID_PERSON_REFERENCE_2.setReference(VALID_PERSON_REFERENCE_VALUE_2);

  export const VALID_CONDITION_REFERENCE_VALUE = 'Condition/CON-24680';
  export const VALID_CONDITION_REFERENCE = new Reference();
  VALID_CONDITION_REFERENCE.setReference(VALID_CONDITION_REFERENCE_VALUE);
  export const VALID_CONDITION_REFERENCE_VALUE_2 = 'Condition/CON-8642';
  export const VALID_CONDITION_REFERENCE_2 = new Reference();
  VALID_CONDITION_REFERENCE_2.setReference(VALID_CONDITION_REFERENCE_VALUE_2);

  const VALID_START_DATETIME = `2024-03-15T00:00:00.000Z`;
  const VALID_END_DATETIME = `2024-07-03T01:00:00.000Z`;
  export const VALID_PERIOD = new Period();
  VALID_PERIOD.setStart(VALID_START_DATETIME);
  VALID_PERIOD.setEnd(VALID_END_DATETIME);
  const VALID_START_DATETIME_2 = `2024-10-31T15:00:00.000Z`;
  export const VALID_PERIOD_2 = new Period();
  VALID_PERIOD_2.setStart(VALID_START_DATETIME_2);

  export const VALID_SYSTEM = 'http://sample/system/one';
  export const VALID_SYSTEM_2 = 'http://sample/system/two';
  export const VALID_IDENTIFIER = new Identifier();
  VALID_IDENTIFIER.setSystem(VALID_SYSTEM);
  VALID_IDENTIFIER.setValue(VALID_STRING);
  export const VALID_IDENTIFIER_2 = new Identifier();
  VALID_IDENTIFIER_2.setSystem(VALID_SYSTEM_2);
  VALID_IDENTIFIER_2.setValue(VALID_STRING_2);

  export const VALID_TASK_NAME = 'MockTask Name';
  export const VALID_TASK_NAME_2 = 'MockTask Name Two';
  export const VALID_MOCK_TASK = new MockTask(new StringType(VALID_TASK_NAME), TestData.VALID_PERIOD);
  export const VALID_MOCK_TASK_2 = new MockTask(new StringType(VALID_TASK_NAME_2), TestData.VALID_PERIOD_2);

  export const VALID_FAMILY = 'Surname';
  export const VALID_FAMILY_2 = 'LastName';
  export const VALID_FIRST_NAME = 'First';
  export const VALID_FIRST_NAME_2 = 'First2';
  export const VALID_MIDDLE_NAME = 'Middle';
  export const VALID_MIDDLE_NAME_2 = 'Middle2';
  export const VALID_PREFIX = 'Mr.';
  export const VALID_PREFIX_2 = 'Ms.';
  export const VALID_SUFFIX = 'Sr.';
  export const VALID_SUFFIX_2 = 'MD';
  export const VALID_HUMAN_NAME = new HumanName();
  VALID_HUMAN_NAME.setFamily(VALID_FAMILY);
  VALID_HUMAN_NAME.setGiven([VALID_FIRST_NAME, VALID_MIDDLE_NAME]);
  VALID_HUMAN_NAME.addPrefix(VALID_PREFIX);
  VALID_HUMAN_NAME.addSuffix(VALID_SUFFIX);
  export const VALID_HUMAN_NAME_2 = new HumanName();
  VALID_HUMAN_NAME_2.setFamily(VALID_FAMILY_2);
  VALID_HUMAN_NAME_2.setGiven([VALID_FIRST_NAME_2, VALID_MIDDLE_NAME_2]);
  VALID_HUMAN_NAME_2.addPrefix(VALID_PREFIX_2);
  VALID_HUMAN_NAME_2.addSuffix(VALID_SUFFIX_2);

  export const VALID_USE_HOME = `home`;
  export const VALID_USE_WORK = `work`;
  export const VALID_TYPE_POSTAL = `postal`;
  export const VALID_LINE_A = '1234 Main ST';
  export const VALID_LINE_A_2 = '4321 Central ST';
  export const VALID_LINE_B = 'APT 15A';
  export const VALID_CITY = 'Nashua';
  export const VALID_CITY_2 = 'Renton';
  export const VALID_STATE = 'NH';
  export const VALID_STATE_2 = 'WA';
  export const VALID_POSTAL = '03064';
  export const VALID_POSTAL_2 = '98058';
  export const VALID_COUNTRY = 'US';
  export const VALID_ADDRESS = new Address();
  VALID_ADDRESS.setUse(VALID_USE_HOME);
  VALID_ADDRESS.setType(VALID_TYPE_POSTAL);
  VALID_ADDRESS.setLine([VALID_LINE_A, VALID_LINE_B]);
  VALID_ADDRESS.setCity(VALID_CITY);
  VALID_ADDRESS.setState(VALID_STATE);
  VALID_ADDRESS.setPostalCode(VALID_POSTAL);
  VALID_ADDRESS.setCountry(VALID_COUNTRY);
  export const VALID_ADDRESS_2 = new Address();
  VALID_ADDRESS_2.setUse(VALID_USE_WORK);
  VALID_ADDRESS_2.setType(VALID_TYPE_POSTAL);
  VALID_ADDRESS_2.setLine([VALID_LINE_A_2]);
  VALID_ADDRESS_2.setCity(VALID_CITY_2);
  VALID_ADDRESS_2.setState(VALID_STATE_2);
  VALID_ADDRESS_2.setPostalCode(VALID_POSTAL_2);
  VALID_ADDRESS_2.setCountry(VALID_COUNTRY);

  export const VALID_PHONE = '888-555-1234';
  export const VALID_PHONE_TYPE = new StringType(VALID_PHONE);
  export const VALID_PHONE_2 = '888-555-9876';
  export const VALID_PHONE_TYPE_2 = new StringType(VALID_PHONE_2);

  export const VALID_CODE = `testCodeType`;
  export const VALID_URL = `testUrlType`;
  export const VALID_UNSIGNED_INT = 697276;
  export const VALID_BASE64BINARY_HASH = `0f60168295bc9d6b0535feaf0975a63532959834`;
  export const VALID_CODE_2 = `testCodeType2`;
  export const VALID_URL_2 = `testUrlType2`;
  export const VALID_UNSIGNED_INT_2 = 767269;
  export const VALID_BASE64BINARY_HASH_2 = `0f60168295bc9d6b0535feaf0975a63532959845`;
  export const VALID_ATTACHMENT = new Attachment();
  VALID_ATTACHMENT.setContentType(VALID_CODE);
  VALID_ATTACHMENT.setUrl(VALID_URL);
  VALID_ATTACHMENT.setSize(VALID_UNSIGNED_INT);
  VALID_ATTACHMENT.setHash(VALID_BASE64BINARY_HASH);
  VALID_ATTACHMENT.setTitle(TestData.VALID_STRING);
  export const VALID_ATTACHMENT_2 = new Attachment();
  VALID_ATTACHMENT_2.setContentType(VALID_CODE_2);
  VALID_ATTACHMENT_2.setUrl(VALID_URL_2);
  VALID_ATTACHMENT_2.setSize(VALID_UNSIGNED_INT_2);
  VALID_ATTACHMENT_2.setHash(VALID_BASE64BINARY_HASH_2);
  VALID_ATTACHMENT_2.setTitle(TestData.VALID_STRING_2);

  export const SIMPLE_PERSON_MODEL_ID = 'SMP-123';
  export const SIMPLE_PERSON_MODEL = new SimplePersonModel();
  SIMPLE_PERSON_MODEL.setId(SIMPLE_PERSON_MODEL_ID);
  SIMPLE_PERSON_MODEL.setIdentifier(TestData.VALID_IDENTIFIER);
  SIMPLE_PERSON_MODEL.setName(TestData.VALID_HUMAN_NAME);
  SIMPLE_PERSON_MODEL.setAddress(TestData.VALID_ADDRESS);
  SIMPLE_PERSON_MODEL.setPhone(TestData.VALID_PHONE);

  export const SIMPLE_PERSON_MODEL_ID_2 = 'SMP-987';
  export const SIMPLE_PERSON_MODEL_2 = new SimplePersonModel();
  SIMPLE_PERSON_MODEL_2.setId(SIMPLE_PERSON_MODEL_ID_2);
  SIMPLE_PERSON_MODEL_2.setIdentifier(TestData.VALID_IDENTIFIER_2);
  SIMPLE_PERSON_MODEL_2.setName(TestData.VALID_HUMAN_NAME_2);
  SIMPLE_PERSON_MODEL_2.setAddress(TestData.VALID_ADDRESS_2);
  SIMPLE_PERSON_MODEL_2.setPhone(TestData.VALID_PHONE_2);
}
