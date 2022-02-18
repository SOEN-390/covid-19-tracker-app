import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';
import { TestResult } from '../enum/TestResult.enum';

export class Patient extends User {

    // Variables

    private _medicalId!: string;
    private _testResult!: TestResult;

    // Constructor

    public constructor (id: string, firstName: string, lastName: string, phoneNumber: string, address: string, medicalId: string, testResult: TestResult) {
        super(id, firstName, lastName, phoneNumber, address);
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

    public getRole(): UserType {
        return UserType.PATIENT;
    }

}
