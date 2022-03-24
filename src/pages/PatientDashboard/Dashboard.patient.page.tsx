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


	const [reminded] = useState<any>(true);

	const {currentProfile} = useAuth();
	const history = useHistory();
	const routeChange = () =>{
		const path='/home/symptoms';
		history.push(path);
	};
	function isReminded(): string {
		if (!currentProfile) {
			return '';
		}
		console.log(`${currentProfile.reminded}`);
		return `${currentProfile.reminded}`;
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent className={'dashboard-patient__page'}>
				<IonCol>
					<IonRow>
						<IonCard color={isReminded()==='true'?'danger':'light'} className={'dashboard-patient__reminder-card'}>
							<IonCardHeader>
								<IonCardTitle>Submit Symptoms Form Reminder</IonCardTitle>
							</IonCardHeader>
							<IonCardContent>
								You need to submit your symptoms form ... Please submit now
							</IonCardContent>
							<IonCardContent>
								<IonButton className={'symptoms-patient__symptoms-form'} onClick={routeChange}>
									Submit Symptoms form
								</IonButton>
							</IonCardContent>
						</IonCard>
					</IonRow>
				</IonCol>

			</IonContent>
		</IonPage>
	);
};

export default DashboardPatientPage;
