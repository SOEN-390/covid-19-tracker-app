import { TestResult } from '../enum/TestResult.enum';

export interface IPatient {
    medicalId: string;
    firstName: string;
    lastName: string;
    testResult: string;
    address: string;
    email: string | null | undefined;
    phoneNumber: string;
    dateOfbirth: string;
}
