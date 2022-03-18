import { UserType } from '../enum/UserType.enum';

export abstract class User {

	// Variables

	private readonly _id!: string;
	private _firstName!: string;
	private _lastName!: string;
	private _phoneNumber!: string;
	private _address!: string;

	// Constructor

	protected constructor(id: string, firstName: string, lastName: string, phoneNumber: string, address: string) {
		this._id = id;
		this._firstName = firstName;
		this._lastName = lastName;
		this._phoneNumber = phoneNumber;
		this._address = address;
	}

	// Getters & Setters

	get id(): string {
		return this._id;
	}

	get firstName(): string {
		return this._firstName;
	}

	set firstName(value: string) {
		this._firstName = value;
	}

	get lastName(): string {
		return this._lastName;
	}

	set lastName(value: string) {
		this._lastName = value;
	}

	get phoneNumber(): string {
		return this._phoneNumber;
	}

	set phoneNumber(value: string) {
		this._phoneNumber = value;
	}

	get address(): string {
		return this._address;
	}

	set address(value: string) {
		this._address = value;
	}

	// Methods

	public abstract getRole(): UserType;

	public getFullName(): string {
		return this._firstName + ' ' + this._lastName;
	}

}
