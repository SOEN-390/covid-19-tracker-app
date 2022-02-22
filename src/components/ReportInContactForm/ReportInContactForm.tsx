import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';





const ReportInContact: React.FC = () => {
	const [formValues, setFormValues] = useState([{ firstname: "", lastname: "", email: "", phone: "" }])

	const handleAddClick = () => {
		setFormValues([...formValues, { firstname: "", lastname: "", email: "", phone: "" }]);
	};

	return (
		<form className="ion-padding">
			<IonItem>
				<IonLabel position="floating">First Name</IonLabel>
				<IonInput value={ } />
			</IonItem>
			<IonItem>
				<IonLabel position="floating">Last Name</IonLabel>
				<IonInput />
			</IonItem>
			<IonItem>
				<IonLabel position="floating" >Email</IonLabel>
				<IonInput type="email" />
			</IonItem>
			<IonItem>
				<IonLabel position="floating">Phone Number</IonLabel>
				<IonInput type="number" />
			</IonItem>
			<IonButton className="ion-margin-top" expand="block" onClick={handleAddClick}>
				Add another
			</IonButton>
			<IonButton className="ion-margin-top" type="submit" expand="block">
				Submit
			</IonButton>
		</form>
	);
};

export default ReportInContact;
