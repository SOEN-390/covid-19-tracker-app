import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import * as React from 'react';
import { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';
import { Patient } from '../../objects/Patient.class';

const PatientsPage: React.FC = () => {

	const [patients, setPatients] = useState<Patient[]>([]);
	const [patientsTableRow, setPatientsTableRow] = useState<Patient[]>([]);
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
	}, [patients]);

	function onPatientsChanged(patients: Patient[]) {
		setPatients(patients);
	}

	async function getAllPatients() {
		HttpService.get('patients/all').then((patients: Patient[]) => {
			const patientsArranged: Patient[] = [];
			for (const patient of patients) {
				if (patient.flagged) {
					patientsArranged.unshift(patient);
				} else {
					patientsArranged.push(patient);
				}
			}
			setPatients(patientsArranged);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	function filterConfirmedPatients() {
		const patientTableRow: Patient[] = [];
		for (const patient of patients) {
			if (patient?.testResult === TestResult.POSITIVE || patient?.testResult === TestResult.NEGATIVE) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('confirmed');
		setPatientsTableRow(patientTableRow);
	}

	function filterUnconfirmedPatients() {
		const patientTableRow: Patient[] = [];
		for (const patient of patients) {
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
					patients !== undefined ?
						<PatientsTable patients={patientsTableRow} onChange={onPatientsChanged}/> :
						null
				}
			</IonContent>

		</IonPage>
	);
};

export default PatientsPage;
