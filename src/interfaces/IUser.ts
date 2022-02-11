import { testResult } from '../enum/testResult';

export interface IUser {
    medicalId: string;
    firstName: string;
    lastName: string;
    testResult: testResult;
    address: string;
    email: string | null | undefined;
    phoneNumber: string;
}
