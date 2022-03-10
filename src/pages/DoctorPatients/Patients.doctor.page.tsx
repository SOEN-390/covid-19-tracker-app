import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { Patient } from '../../objects/Patient.class';
import './Patients.doctor.page.scss';

const PatientsDoctorPage: React.FC = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [patientsTableRow, setPatientsTableRow] = useState<Patient[]>([]);
	const {currentProfile} = useAuth();
	const [tableSelection, setTableSelection] = useState<'confirmed' | 'unconfirmed'>('confirmed');

	useEffect(() => {
		getAssignedPatients();
	}, []);

	useEffect(() => {
		if (tableSelection === 'confirmed') {
			getAssignedConfirmedPatients();
		} else {
			getAssignedUnconfirmedPatients();
		}
	}, [patients]);

	function onPatientsChanged(patients: Patient[]) {
		setPatients(patients);
	}

	function getAssignedPatients() {
		HttpService.get(`doctors/${currentProfile.id}/patients/assigned`).then((patients: Patient[]) => {
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

	function getAssignedConfirmedPatients() {
		const patientTableRow: Patient[] = [];
		for (const patient of patients) {
			if (patient?.testResult === TestResult.POSITIVE || patient?.testResult === TestResult.NEGATIVE) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('confirmed');
		setPatientsTableRow(patientTableRow);
	}

	function getAssignedUnconfirmedPatients() {
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
			</IonToolbar>
			<IonContent className={'patient-doctor-page__content'}>
				<IonTitle>Patients</IonTitle>
				<div>
					<IonRow>
						<IonCol/>
						<IonCol className={'patient-doctor-page__confirmed'}>
							<IonButton className={tableSelection === 'confirmed' ? 'patient-doctor-page__button-selected' : 'patient-doctor-page__button-unselected'}
									   onClick={getAssignedConfirmedPatients}>Confirmed</IonButton>
						</IonCol>
						<IonCol className={'patient-doctor-page__unconfirmed'}>
							<IonButton className={tableSelection === 'unconfirmed' ? 'patient-doctor-page__button-selected' : 'patient-doctor-page__button-unselected'}
									   onClick={getAssignedUnconfirmedPatients}>UnConfirmed</IonButton>
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

export default PatientsDoctorPage;
