import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { AdminPages } from '../../providers/pages.enum';
import React, { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import { UserType } from '../../enum/UserType.enum';

const UnAssignedConfirmedPage: React.FC = () => {
	const [patientsArray, setPatientsArray] = useState<IPatientTableRow[]>();

	useEffect(() => {
		patientsRetrieval();
	}, []);

	async function patientsRetrieval() {
		HttpService.get('patients/all').then(async (response) => {
			console.log('HERE IS THE DATA IN JSON FORM: ', response);
			setPatientsArray(response);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent>
				<IonTitle id="patientHeader">Patients</IonTitle>
				<div>
					<IonRow>
						<IonCol/>
						{/*These buttons will change the request and rows!*/}
						<IonCol class="confirmButton">
							<IonButton color="favorite1" routerLink={AdminPages.assignedConfirmed}>Assigned</IonButton>
						</IonCol>
						<IonCol class="unconfirmedButton">
							<IonButton id="con" color="favorite"
									   routerLink={AdminPages.unAssignedConfirmed}>UnAssigned</IonButton>
						</IonCol>
						<IonCol/>
					</IonRow>
				</div>
				{
					patientsArray !== undefined ?
						<PatientsTable currentUserType={UserType.ADMIN} patientTableRows={patientsArray}/> :
						null
				}
			</IonContent>
		</IonPage>
	);
};

export default UnAssignedConfirmedPage;
