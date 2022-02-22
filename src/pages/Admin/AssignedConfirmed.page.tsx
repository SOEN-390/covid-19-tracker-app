import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { AdminPages } from '../../providers/pages.enum';
import React, { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';

const AssignedConfirmedPage: React.FC = () => {
	const [patientsArray, setPatientsArray] = useState<IPatientTableRow[]>();

	useEffect(() => {
		patientsRetrieval();
	}, []);

	async function patientsRetrieval() {
		HttpService.get('patients/all').then(async (response) => {
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
							<IonButton id="con" color="favorite"
									   routerLink={AdminPages.assignedConfirmed}>Assigned</IonButton>
						</IonCol>
						<IonCol class="unconfirmedButton">
							<IonButton color="favorite1"
									   routerLink={AdminPages.unAssignedConfirmed}>UnAssigned</IonButton>
						</IonCol>
						<IonCol/>
					</IonRow>
				</div>
				{
					patientsArray !== undefined ?
						<PatientsTable patientTableRows={patientsArray}/> :
						null
				}
			</IonContent>
		</IonPage>
	);
};

export default AssignedConfirmedPage;

