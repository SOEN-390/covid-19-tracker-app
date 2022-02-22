import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import * as React from 'react';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';

const PatientsPage: React.FC = () => {

	const [patientsArray, setPatientsArray] = useState<IPatientTableRow[]>([]);
	const [patientsTableRow, setPatientsTableRow] = useState<IPatientTableRow[]>([]);
	const [tableSelection, setTableSelection] = useState<'confirmed' | 'unconfirmed'>('confirmed');

	useEffect(() => {
		getAllPatients();
	}, []);

	useEffect(() => {
		if (tableSelection === 'confirmed') {
			filterConfirmedPatients();
		} else {
			filterUnconfirmedPatients();
		}
	}, [patientsArray]);

	async function getAllPatients() {
		HttpService.get('patients/all').then(async (response) => {
			setPatientsArray(response);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	function filterConfirmedPatients() {
		const patientTableRow: IPatientTableRow[] = [];
		for (const patient of patientsArray) {
			if (patient?.testResult === TestResult.POSITIVE || patient?.testResult === TestResult.NEGATIVE) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('confirmed');
		setPatientsTableRow(patientTableRow);
	}

	function filterUnconfirmedPatients() {
		const patientTableRow: IPatientTableRow[] = [];
		for (const patient of patientsArray) {
			if (patient?.testResult === TestResult.PENDING || patient?.testResult === null) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('unconfirmed');
		setPatientsTableRow(patientTableRow);
	}

	return (
		<IonPage>

			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent>
				<IonTitle id="title"> Patients </IonTitle>
				<div>
					<IonRow>
						<IonCol/>
						<IonCol class="confirmButton">
							<IonButton color={tableSelection === 'confirmed' ? 'favorite1' : 'favorite'}
									   onClick={filterConfirmedPatients}>Confirmed</IonButton>
						</IonCol>
						<IonCol class="unconfirmedButton">
							<IonButton color={tableSelection === 'unconfirmed' ? 'favorite1' : 'favorite'}
									   onClick={filterUnconfirmedPatients}>UnConfirmed</IonButton>
						</IonCol>
						<IonCol/>
					</IonRow>
				</div>
				{
					patientsArray !== undefined ?
						<PatientsTable patientTableRows={patientsTableRow}/> :
						null
				}
			</IonContent>

		</IonPage>
	);
};

export default PatientsPage;
