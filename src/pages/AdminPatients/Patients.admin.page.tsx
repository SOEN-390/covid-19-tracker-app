import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React, { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { Patient } from '../../objects/Patient.class';
import { TestResult } from '../../enum/TestResult.enum';
import './Patients.admin.page.scss';

const PatientsAdminPage: React.FC = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [patientsTableRow, setPatientsTableRow] = useState<Patient[]>([]);
	const [tableSelection, setTableSelection] = useState<'confirmed' | 'unconfirmed'>('confirmed');

	useEffect(() => {
		getPatients();
	}, []);

	useEffect(() => {
		if (tableSelection === 'confirmed') {
			getConfirmedPatients();
		} else {
			getUnconfirmedPatients();
		}
	}, [patients]);

	function onPatientsChanged(patients: Patient[]) {
		setPatients(patients);
	}

	async function getPatients() {
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

	function getConfirmedPatients() {
		const patientTableRow: Patient[] = [];
		for (const patient of patients) {
			if (patient?.testResult === TestResult.POSITIVE || patient?.testResult === TestResult.NEGATIVE) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('confirmed');
		setPatientsTableRow(patientTableRow);
	}

	function getUnconfirmedPatients() {
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
			<IonContent className={'patient-admin-page__content'}>
				<IonTitle>Patients</IonTitle>
				<div>
					<IonRow>
						<IonCol/>
						<IonCol className={'patient-admin-page__confirmed'}>
							<IonButton className={tableSelection === 'confirmed' ?
								'patient-admin-page__button-selected' :
								'patient-admin-page__button-unselected'}
									   onClick={getConfirmedPatients}>Confirmed</IonButton>
						</IonCol>
						<IonCol className={'patient-admin-page__unconfirmed'}>
							<IonButton className={tableSelection === 'unconfirmed' ?
								'patient-admin-page__button-selected' :
								'patient-admin-page__button-unselected'}
									   onClick={getUnconfirmedPatients}>UnConfirmed</IonButton>
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

export default PatientsAdminPage;

