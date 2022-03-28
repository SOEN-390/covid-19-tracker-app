import { TestResult } from '../enum/TestResult.enum';
import { Gender } from '../enum/Gender.enum';

export interface IPatient {
	id?: string;
	medicalId: string;
	firstName: string;
	lastName: string;
	doctorName?: string;
	doctorId?: string;
	testResult: TestResult;
	address: string;
	email: string | null | undefined;
	phoneNumber: string;
	dob: string;
	gender: Gender;
	flagged?: boolean;
	reminded?: boolean;
	lastUpdated?: Date;
}


export interface IContact {
	medicalId: string,
	firstName: string,
	lastName: string,
	testResult: TestResult
}
