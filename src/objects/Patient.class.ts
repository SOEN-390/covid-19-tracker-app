import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';
import { TestResult } from '../enum/TestResult.enum';
import { GenderEnum } from '../enum/Gender.enum';

export class Patient extends User {

    // Variables

    private _medicalId!: string;
    private _testResult!: TestResult;
    private _dob!: string;
    private _gender!: GenderEnum;

    // Constructor

    public constructor (id: string, firstName: string, lastName: string, phoneNumber: string, address: string,
                        medicalId: string, testResult: TestResult, dob: string, gender: GenderEnum) {
        super(id, firstName, lastName, phoneNumber, address);
        this._medicalId = medicalId;
        this._testResult = testResult;
        this._dob = dob;
        this._gender = gender;
    }



// Getters

    public get medicalId(): string {
        return this._medicalId;
    }

    public get testResult(): TestResult {
        return this._testResult;
    }

    get dob(): string {
        return this._dob;
    }


    get gender(): GenderEnum {
        return this._gender;
    }

    // Setters

    public set testResult(value: TestResult) {
        this._testResult = value;
    }

    set dob(value: string) {
        this._dob = value;
    }

    set gender(value: GenderEnum) {
        this._gender = value;
    }


    // Methods

    public getRole(): UserType {
        return UserType.PATIENT;
    }

}
