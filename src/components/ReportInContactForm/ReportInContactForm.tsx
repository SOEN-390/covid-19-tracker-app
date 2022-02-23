import './ReportInContactForm.css';

import React, { useState } from 'react';
import {
	IonButton,
	IonCol,
	IonContent,
	IonGrid,
	IonInput,
	IonItemDivider,
	IonLabel,
	IonRow,
	IonTitle, useIonToast
} from '@ionic/react';
import HttpService from '../../providers/http.service';


const ReportInContactForm: React.FC = () => {

	const [present] = useIonToast();
	const [formValues, setFormValues] = useState([{firstname: '', lastname: '', email: '', phone: ''}]);

	const handleChange = (i: any, e: any) => {
		const newFormValues: any = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};
	const addFormFields = () => {
		setFormValues([...formValues, {firstname: '', lastname: '', email: '', phone: ''}]);
	};
	const handleSubmit = async () => {
		try {
			await HttpService.post(`patients/report`, { people: formValues});
			present("Successfully submitted report", 1500);
		} catch (error) {
			present("Failed to submit. Please try again later", 1500);
		}
	};


	return (
		<IonContent>
			<IonTitle id="report__title">People In Contact </IonTitle>
			<form>

				{formValues.map((element, index) => (
					<IonGrid key={index}>
						<div className="form-inline">
							<IonRow>
								<IonCol id={'report__field'}>
									<IonLabel>First Name</IonLabel>
									<IonInput type="text" name="firstname" value={element.firstname || ''}
											  onIonChange={e => handleChange(index, e)}/>
								</IonCol>
								<IonCol id={'report__field'}>
									<IonLabel>Last Name</IonLabel>
									<IonInput type="text" name="lastname" value={element.lastname || ''}
											  onIonChange={e => handleChange(index, e)}/>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol id={'report__field'}>
									<IonLabel>Email</IonLabel>
									<IonInput type="text" name="email" value={element.email || ''}
											  onIonChange={e => handleChange(index, e)}/>
								</IonCol>
								<IonCol id={'report__field'}>
									<IonLabel>Phone</IonLabel>
									<IonInput type="text" name="phone" value={element.phone || ''}
											  onIonChange={e => handleChange(index, e)}/>
								</IonCol>
							</IonRow>
							<IonItemDivider/>
						</div>
					</IonGrid>
				))}
				<div className="button-section">
					<IonButton className="button_add" type="button" color="warning" onClick={() => addFormFields()}>Add
						Another</IonButton>
					<IonButton className="button_submit" color="favorite"
							   onClick={() => handleSubmit()}>Submit</IonButton>
				</div>
			</form>
		</IonContent>
	);
};

export default ReportInContactForm;
