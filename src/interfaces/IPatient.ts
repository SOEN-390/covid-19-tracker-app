import { TestResult } from '../enum/TestResult.enum';

export interface IPatient {
    medicalId: string;
    firstName: string;
    lastName: string;
    testResult: TestResult;
    address: string;
    email: string | null | undefined;
    phoneNumber: string;
}
