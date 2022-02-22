import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';

export class ImmigrationOfficer extends User {

	// Constructor

	public constructor(id: string, firstName: string, lastName: string, phoneNumber: string, address: string) {
		super(id, firstName, lastName, phoneNumber, address);
	}

	// Methods

	public getRole(): UserType {
		return UserType.IMMIGRATION_OFFICER;
	}

}
