import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';
import { TestResult } from '../enum/TestResult.enum';
import { Gender } from '../enum/Gender.enum';

export class Patient extends User {

	// Variables

	private readonly _medicalId!: string;
	private _testResult!: TestResult;
	private _dob!: string;
	private _gender!: Gender;
	private _flagged!: boolean;

	// Constructor

	public constructor(id: string, firstName: string, lastName: string, phoneNumber: string, address: string,
					   medicalId: string, testResult: TestResult, dob: string, gender: Gender, flagged: boolean) {
		super(id, firstName, lastName, phoneNumber, address);
		this._medicalId = medicalId;
		this._testResult = testResult;
		this._dob = dob;
		this._gender = gender;
		this._flagged = flagged;
	}


	// Getters & Setters

	get medicalId(): string {
		return this._medicalId;
	}

	get testResult(): TestResult {
		return this._testResult;
	}

	set testResult(value: TestResult) {
		this._testResult = value;
	}

	get dob(): string {
		return this._dob;
	}

	set dob(value: string) {
		this._dob = value;
	}

	get gender(): Gender {
		return this._gender;
	}

	set gender(value: Gender) {
		this._gender = value;
	}

	get flagged(): boolean {
		return this._flagged;
	}

	set flagged(value: boolean) {
		this._flagged = value;
	}

	// Methods

	public getRole(): UserType {
		return UserType.PATIENT;
	}

}
