import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';
import { TestResult } from '../enum/TestResult.enum';
import { Gender } from '../enum/Gender.enum';

export class Patient extends User {

	// Variables

	private readonly _medicalId!: string;
	private _email!: string;
	private _testResult!: TestResult;
	private _dob!: string;
	private _gender!: Gender;
	private _lastUpdated?: Date;
	private _flagged?: boolean;
	private _reminded?: boolean;
	private _reviewed?: boolean;
	private _doctorName?: string;
	private _assigned?: boolean;

	// Constructor

	public constructor(id: string, firstName: string, lastName: string, email: string, phoneNumber: string, address: string,
		medicalId: string, testResult: TestResult, dob: string, gender: Gender, flagged?: boolean,
		reminded?: boolean, lastUpdated?: Date) {
		super(id, firstName, lastName, phoneNumber, address);
		this._medicalId = medicalId;
		this._email = email;
		this._testResult = testResult;
		this._dob = dob;
		this._gender = gender;
		this._flagged = flagged;
		this._reminded = reminded;
		this._lastUpdated = lastUpdated;
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

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get flagged(): boolean {
		return this._flagged || false;
	}

	set flagged(value: boolean) {
		this._flagged = value;
	}

	get reminded(): boolean {
		return this._reminded || false;
	}

	set reminded(value: boolean) {
		this._reminded = value;
	}

	get reviewed(): boolean {
		return this._reviewed || false;
	}

	set reviewed(value: boolean) {
		this._reviewed = value;
	}

	get doctorName(): string {
		return this._doctorName || '';
	}

	set doctorName(value: string) {
		this._doctorName = value;
	}
	get lastUpdated(): Date {
		return <Date>this._lastUpdated;
	}

	set lastUpdated(value: Date) {
		this._lastUpdated = value;
	}

	get assigned(): boolean {
		return this._assigned || false;
	}

	set assigned(value: boolean) {
		this._assigned = value;
	}
	// Methods

	public getRole(): UserType {
		return UserType.PATIENT;
	}

}
