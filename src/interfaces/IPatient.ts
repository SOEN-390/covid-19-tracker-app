import { TestResult } from '../enum/TestResult.enum';
import { Gender } from '../enum/Gender.enum';

export interface IPatient {
	id?: string;
	medicalId: string;
	firstName: string;
	lastName: string;
	doctorName?: string | null;
	doctorId?: string | null;
	testResult: TestResult;
	address: string;
	email: string | null;
	phoneNumber: string;
	dob: string;
	gender: Gender;
	flagged?: boolean;
}

export interface IContact {
	medicalId: string;
	firstName: string;
	lastName: string;
	testResult: TestResult;
}
