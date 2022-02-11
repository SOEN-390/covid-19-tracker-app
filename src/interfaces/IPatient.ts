import { testResult } from '../enum/testResult';

export interface IPatient {
    medicalId: string;
    firstName: string;
    lastName: string;
    testResult: testResult;
    address: string;
    email: string | null | undefined;
    phoneNumber: string;
}
