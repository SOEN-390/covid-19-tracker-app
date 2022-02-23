import { TestResult } from '../enum/TestResult.enum';
import { Gender } from '../enum/Gender.enum';

export interface IPatient {
	medicalId: string;
	firstName: string;
	lastName: string;
	testResult: TestResult;
	address: string;
	email: string | null | undefined;
	phoneNumber: string;
	dob: string;
	gender: Gender;
	// lastUpdatedAt: string;
	// priority: boolean; //Not required
}
