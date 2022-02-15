import { UserType } from '../enum/UserType.enum';

export abstract class User {

    // Variables

    private _id!: string;
    private _firstName!: string;
    private _lastName!: string;
    private _phoneNumber!: string;
    private _address!: string;

    // Constructor

    constructor (id: string, firstName: string, lastName: string, phoneNumber: string, address: string) {
        this._id = id;
        this._firstName = firstName;
        this._lastName = lastName;
        this._phoneNumber = phoneNumber;
        this._address = address;
    }

    // Getters

    public get id(): string {
        return this._id;
    }

    public get firstName(): string {
        return this._firstName;
    }

    public get lastName(): string {
        return this._lastName;
    }

    public get phoneNumber(): string {
        return this._phoneNumber;
    }

    public get address(): string {
        return this._address;
    }

    // Setters

    public set firstName(value: string) {
        this._firstName = value;
    }

    public set lastName(value: string) {
        this._lastName = value;
    }

    public set phoneNumber(value: string) {
        this._phoneNumber = value;
    }

    public set address(value: string) {
        this._address = value;
    }

    // Methods

    public abstract getRole(): UserType;

}
