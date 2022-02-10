import { testResult } from '../enum/testResult';

export interface IUser {
    medicalId: string,
    firstName: string,
    lastName: string,
    testResults: testResult
    address: string
    email: string
    phoneNumber: string
}