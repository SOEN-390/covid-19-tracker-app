import { User } from './User.class';
import { IPatient } from '../interfaces/IPatient';
import { UserType } from '../enum/UserType.enum';
import { TestResult } from '../enum/TestResult.enum';

export class Patient extends User implements IPatient {

    // Variables

    private _medicalId!: string;
    private _testResult!: TestResult;

    // Constructor

    public constructor (id: string, firstName: string, lastName: string, phoneNumber: string, address: string, email: string, medicalId: string, testResult: TestResult) {
        super(id, firstName, lastName, phoneNumber, address, email);
        this._medicalId = medicalId;
        this._testResult = testResult;
    }

    // Getters

    public get medicalId(): string {
        return this._medicalId;
    }

    public get testResult(): TestResult {
        return this._testResult;
    }

    // Setters

    public set testResult(value: TestResult) {
        this._testResult = value;
    }

    // Methods

    getRole(): UserType {
        return UserType.PATIENT;
    }

}
