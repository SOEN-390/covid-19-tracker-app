import React, { useEffect, useState } from 'react';
import {
	IonButton,
	IonCard,
	IonCardContent, IonCardHeader,
	IonCardTitle,
	IonCol,
	IonContent,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar, useIonToast
} from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.patient.page.scss';
import { useHistory } from 'react-router-dom';
import { Patient } from '../../objects/Patient.class';
import { useAuth } from '../../providers/auth.provider';
import { ISymptom, ISymptomResponse } from '../../interfaces/ISymptom';
import HttpService from '../../providers/http.service';



const DashboardPatientPage: React.FC = () => {
	const [presentToast] = useIonToast();
	const {currentProfile} = useAuth();
	const history = useHistory();

	const routeChange = () =>{
		currentProfile.reminded = !currentProfile.reminded;
		HttpService.post(
			`patients/${currentProfile.medicalId}/${currentProfile.reminded}`,
			{ role: currentProfile.getRole() }
		).then(() => {
			// props.onChange(currentProfile);
			// presentToast(`Successfully ${patient.flagged ? 'FLAGGED' : 'UNFLAGGED'} patient.`, 1000);
		}).catch(() => {
			presentToast('An error has occurred. Please try again.', 1000);
		});
		console.log('on click '+ currentProfile.reminded);

		const path='/home/patient-profile';
		history.push(path);
	};

	return (

		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent className={'dashboard-patient__page'}>
				<IonCol>
					<IonRow>
						<IonTitle>Notifications</IonTitle>
					</IonRow>
					{
						 currentProfile.reminded == 0 ? null  :
							<IonRow>
								<IonCard className={'dashboard-patient__reminder-card'}>
									<IonCardHeader>
										<IonCardTitle>Submit Symptoms Form Reminder</IonCardTitle>
									</IonCardHeader>
									<IonCardContent>
										You need to update your status... Please update it now
									</IonCardContent>
									<IonCardContent>
										<IonButton className={'symptoms-patient__symptoms-form'} onClick={routeChange}>
											update your status
										</IonButton>
									</IonCardContent>
								</IonCard>
							</IonRow>
					}
				</IonCol>
			</IonContent>
		</IonPage>
	);
};

export default DashboardPatientPage;
