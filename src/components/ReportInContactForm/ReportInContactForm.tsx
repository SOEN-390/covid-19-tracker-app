import './ReportInContactForm.scss';
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
import { useAuth } from '../../providers/auth.provider';

interface form {
	firstname: string,
	lastname: string,
	email: string,
	phoneNumber: string
}

const ReportInContactForm: React.FC = () => {

	const {currentProfile} = useAuth();
	const [present] = useIonToast();
	const [formValues, setFormValues] = useState<form[]>([{firstname: '', lastname: '', email: '', phoneNumber: ''}]);

	const handleChange = (i: number, e: any): void => {
		const newFormValues: any = [...formValues];
		newFormValues[i][e.target.name] = e.target.value;
		setFormValues(newFormValues);
	};

	const addFormFields = (): void => {
		setFormValues([...formValues, {firstname: '', lastname: '', email: '', phoneNumber: ''}]);
	};

	const handleSubmit = (): void => {
		let pass = true;
		formValues.forEach((person) => {
			if (person.firstname.trim() == '' || person.lastname.trim() == '' || person.phoneNumber.trim() == '' || person.email.trim() == '') {
				present('Please fill up all of the fields', 1500);
				pass = false;
			}
		});
		if (pass) {
			reportForm();
		}
	};

	async function reportForm(): Promise<void> {
		try {
			await HttpService.post(`patients/${currentProfile.id}/report`, {people: formValues});
			present('Successfully submitted report', 1500);
		} catch (error) {
			present('Failed to submit. Please try again later', 1500);
		}
	}

	return (
		<IonContent className={'report-form__content'}>
			<IonTitle className={'report-form__title'}>People In Contact</IonTitle>
			<form>
				{
					formValues.map((element, index) => (
						<IonGrid key={index}>
							<div className="report-form__input-div">
								<IonRow>
									<IonCol className={'report-form__input-div__column'}>
										<IonLabel>First Name</IonLabel>
										<IonInput type="text" name="firstname" value={element.firstname || ''}
												  onIonChange={e => handleChange(index, e)}/>
									</IonCol>
									<IonCol className={'report-form__input-div__column'}>
										<IonLabel>Last Name</IonLabel>
										<IonInput type="text" name="lastname" value={element.lastname || ''}
												  onIonChange={e => handleChange(index, e)}/>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol className={'report-form__input-div__column'}>
										<IonLabel>Email</IonLabel>
										<IonInput type="text" name="email" value={element.email || ''}
												  onIonChange={e => handleChange(index, e)}/>
									</IonCol>
									<IonCol className={'report-form__input-div__column'}>
										<IonLabel>Phone</IonLabel>
										<IonInput type="text" name="phoneNumber" value={element.phoneNumber || ''}
												  onIonChange={e => handleChange(index, e)}/>
									</IonCol>
								</IonRow>
								<IonItemDivider/>
							</div>
						</IonGrid>
					))
				}
				<div className={'report-form__buttons-div'}>
					<IonButton className={'report-form__buttons-div__add'} type="button" color="warning" onClick={() => addFormFields()}>Add
						Another</IonButton>
					<IonButton className={'report-form__buttons-div__submit'}
							   onClick={() => handleSubmit()}>Submit</IonButton>
				</div>
			</form>
		</IonContent>
	);
};

export default ReportInContactForm;
