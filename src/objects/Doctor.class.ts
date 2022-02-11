import { User } from './User.class';
import { UserType } from '../enum/UserType.enum';

export class Doctor extends User {

    // Constructor

    public constructor (id: string, firstName: string, lastName: string, phoneNumber: string, address: string, email: string) {
        super(id, firstName, lastName, phoneNumber, address, email);
    }

    // Methods

    public getRole(): UserType {
        return UserType.IMMIGRATION_OFFICER;
    }

}
