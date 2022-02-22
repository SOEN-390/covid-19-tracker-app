import React, { useState } from 'react';
import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react';





const ReportInContact: React.FC = () => {


	const [formValues, setFormValues] = useState([{ firstname: '', lastname: '', email: '', phone: '' }]);
	console.log(formValues);

	const handleChange = (i: any, e: any) => {
		const newFormValues: any = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};
	const addFormFields = () => {
		setFormValues([...formValues, { firstname: '', lastname: '', email: '', phone: '' }]);
	};
	const handleSubmit = (event: any) => {
		event.preventDefault();
		alert(JSON.stringify(formValues));
	};





	return (
		<form>
			{formValues.map((element, index) => (
				<div className="form-inline" key={index}>
					<IonLabel>First Name</IonLabel>
					<IonInput type="text" name="firstname" value={element.firstname || ''} onIonChange={e => handleChange(index, e)} />
					<IonLabel>Last Name</IonLabel>
					<IonInput type="text" name="lastname" value={element.lastname || ''} onIonChange={e => handleChange(index, e)} />
					<IonLabel>Email</IonLabel>
					<IonInput type="text" name="email" value={element.email || ''} onIonChange={e => handleChange(index, e)} />
					<IonLabel>Phone</IonLabel>
					<IonInput type="text" name="phone" value={element.phone || ''} onIonChange={e => handleChange(index, e)} />

				</div>
			))}
			<div className="button-section">
				<IonButton className="button add" type="button" onClick={() => addFormFields()}>Add</IonButton>
				<IonButton className="button submit" type="submit" onClick={() => handleSubmit} >Submit</IonButton>
			</div>
		</form>
	);
};

export default ReportInContact;
