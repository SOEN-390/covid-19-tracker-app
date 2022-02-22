import React from 'react';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';

const AddAnotherPerson = () => {
	return
}



const ReportInContact: React.FC = () => {
	return (
		<form className="ion-padding">
			<IonItem>
				<IonLabel position="floating">First Name</IonLabel>
				<IonInput />
			</IonItem>
			<IonItem>
				<IonLabel position="floating">Last Name</IonLabel>
				<IonInput />
			</IonItem>
			<IonItem>
				<IonLabel position="floating" >Email</IonLabel>
				<IonInput type="email"/>
			</IonItem>
			<IonItem>
				<IonLabel position="floating">Phone Number</IonLabel>
				<IonInput type="number" />
			</IonItem>
			<IonButton className="ion-margin-top" expand="block" onClick={}>
				Add another
			</IonButton>
			<IonButton className="ion-margin-top" type="submit" expand="block">
				Submit
			</IonButton>
		</form>
	);
}

export  default ReportInContact;
