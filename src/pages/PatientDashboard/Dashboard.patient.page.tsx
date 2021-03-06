import React, { useState } from 'react';
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
	IonToolbar
} from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import './Dashboard.patient.page.scss';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';
import { PatientPages } from '../../providers/pages.enum';

const DashboardPatientPage: React.FC = () => {

	const {currentProfile} = useAuth();
	const history = useHistory();
	const [reminderNotification, setreminderNotification] = useState<boolean>(currentProfile.reminded);
	const routeChange = () => {
		setreminderNotification(false);
		unRemindPatient();
		const path = PatientPages.patientProfile;
		history.push(path);
	};

	function unRemindPatient() {
		currentProfile.reminded = false;
		HttpService.post(`patients/${currentProfile.medicalId}/unremind`, {role: currentProfile.getRole()});
	}

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

					<IonRow>
						<IonCard color={reminderNotification ? 'danger' : 'light'}
								 className={'dashboard-patient__reminder-card'}
						>
							<IonCardHeader>
								<IonCardTitle>
									{
										reminderNotification ? 'Submit Symptoms Form Reminder' :
											'There is no Notification to show'
									}
								</IonCardTitle>
							</IonCardHeader>
							{
								reminderNotification &&
								<IonCardContent>
									You need to update your status ... Please update it now!
									<br/>
									<br/>
									<IonButton className={'symptoms-patient__symptoms-form'}
											   data-testid={'symptoms-patient__symptoms-form'}
											   onClick={routeChange}
									>
										update your status
									</IonButton>
								</IonCardContent>
							}
						</IonCard>
					</IonRow>

				</IonCol>
			</IonContent>
		</IonPage>
	);
};

export default DashboardPatientPage;
