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
import moment from 'moment';



const DashboardPatientPage: React.FC = () => {
	const [presentToast] = useIonToast();
	const { currentProfile } = useAuth();
	const history = useHistory();

	const routeChange = () => {
		unRemindPatient(currentProfile);
		HttpService.post(
			`patients/${currentProfile.medicalId}/${currentProfile.reminded}`,
			{ role: currentProfile.getRole() }
		);

		const path = '/home/patient-profile';
		history.push(path);
	};

	function unRemindPatient(patient: Patient) {

		patient.reminded = false;
		//setTime(currentHour);
		HttpService.post(
			`patients/${patient.medicalId}/unremind`,
			{ role: currentProfile.getRole() }
		);

	}
	

	return (

		<IonPage>
			<IonToolbar>
				<NavBar />
			</IonToolbar>
			<IonContent className={'dashboard-patient__page'}>
				<IonCol>
					<IonRow>
						<IonTitle>Notifications</IonTitle>
					</IonRow>
					{
						currentProfile.reminded == 0 ? null :
							<IonRow>
								<IonCard color={currentProfile.reminded ? 'danger' : 'light'} className={'dashboard-patient__reminder-card'}>
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

					{
						currentProfile.reminded == 1 ? null :
							<IonRow>
								<IonCard color='light' className={'dashboard-patient__reminder-card'}>
									<IonCardHeader>
										<IonCardTitle>There is no Notification to show</IonCardTitle>
									</IonCardHeader>

								</IonCard>
							</IonRow>

					}

				</IonCol>
			</IonContent>
		</IonPage>
	);
};

export default DashboardPatientPage;
