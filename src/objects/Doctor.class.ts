import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';

export class Doctor extends User {

	// Variables

	private _licenseId: string;
	private _email: string;

	// Constructor

	public constructor(id: string, firstName: string, lastName: string, email: string, phoneNumber: string, address: string, licenseId: string) {
		super(id, firstName, lastName, phoneNumber, address);
		this._email = email;
		this._licenseId = licenseId;
	}

	// Getters and Setters

	get email(): string {
		return this._email;
	}

	set email(value: string) {
		this._email = value;
	}

	get licenseId(): string {
		return this._licenseId;
	}

	set licenseId(value: string) {
		this._licenseId = value;
	}

	// Methods

	public getRole(): UserType {
		return UserType.DOCTOR;
	}

}
