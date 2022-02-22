import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { AdminPages } from '../../providers/pages.enum';
import React, { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { Patient } from '../../objects/Patient.class';

const AssignedConfirmedPage: React.FC = () => {
	const [patients, setPatients] = useState<Patient[]>();

	useEffect(() => {
		patientsRetrieval();
	}, []);

	function onPatientsChanged(patients: Patient[]) {
		setPatients(patients);
	}

	async function patientsRetrieval() {
		HttpService.get('patients/all').then((patients: Patient[]) => {
			setPatients(patients);
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
					patients !== undefined ?
						<PatientsTable patients={patients} onChange={onPatientsChanged}/> :
						null
				}
			</IonContent>
		</IonPage>
	);
};

export default AssignedConfirmedPage;

