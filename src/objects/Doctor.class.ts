import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';

export class Doctor extends User {

	// Variables

	private _licenseId: string;
	private _email: string;
	private _emergencyLeave: boolean;

	// Constructor

	public constructor(id: string, firstName: string, lastName: string, email: string, phoneNumber: string,
					   address: string, licenseId: string, emergencyLeave: boolean) {
		super(id, firstName, lastName, phoneNumber, address);
		this._email = email;
		this._licenseId = licenseId;
		this._emergencyLeave = emergencyLeave;
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

	get emergencyLeave(): boolean {
		return this._emergencyLeave;
	}

	set emergencyLeave(value: boolean) {
		this._emergencyLeave = value;
	}

	// Methods

	public getRole(): UserType {
		return UserType.DOCTOR;
	}

}
