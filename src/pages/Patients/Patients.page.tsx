import {
	IonButton,
	IonCol,
	IonContent,
	IonPage,
	IonRow,
	IonTitle,
	IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { Patient } from '../../objects/Patient.class';
import './Patients.page.scss';
import { UserType } from '../../enum/UserType.enum';

const PatientsPage: React.FC = () => {
	const [patients, setPatients] = useState<Patient[]>([]);
	const [patientsTableRow, setPatientsTableRow] = useState<Patient[]>([]);
	const { currentProfile } = useAuth();
	const [tableSelection, setTableSelection] = useState<
		'confirmed' | 'unconfirmed'
	>('confirmed');

	useEffect(() => {
		if (currentProfile.getRole() === UserType.DOCTOR) {
			getAssignedPatients();
		} else if (
			currentProfile.getRole() === UserType.ADMIN ||
			currentProfile.getRole() === UserType.HEALTH_OFFICIAL
		) {
			getAllPatients();
		}
	}, []);

	useEffect(() => {
		if (tableSelection === 'confirmed') {
			getConfirmedPatients();
		} else {
			getUnconfirmedPatients();
		}
	}, [patients]);

	function onPatientsChanged(changedPatient: Patient) {
		for (const [index, patient] of patients.entries()) {
			if (patient.medicalId === changedPatient.medicalId) {
				patients[index] = changedPatient;
			}
		}
		setPatients([...patients]);
	}

	function getAllPatients() {
		HttpService.get('patients/all')
			.then((patients: Patient[]) => {
				const patientsArranged: Patient[] = [];
				for (const patient of patients) {
					if (patient.flagged) {
						patientsArranged.unshift(patient);
					} else {
						patientsArranged.push(patient);
					}
				}
				setPatients?.(patientsArranged);
			})
			.catch((error) => {
				console.log('ERROR: ', error);
			});
	}

	function getAssignedPatients() {
		HttpService.get(`doctors/${currentProfile.licenseId}/patients/assigned`)
			.then((patients: Patient[]) => {
				const patientsArranged: Patient[] = [];
				for (const patient of patients) {
					if (patient.flagged) {
						patientsArranged.unshift(patient);
					} else {
						patientsArranged.push(patient);
					}
				}
				setPatients(patientsArranged);
			})
			.catch((error) => {
				console.log('ERROR: ', error);
			});
	}

	function getConfirmedPatients() {
		const patientTableRow: Patient[] = [];
		for (const patient of patients) {
			if (
				patient?.testResult === TestResult.POSITIVE ||
				patient?.testResult === TestResult.NEGATIVE
			) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('confirmed');
		setPatientsTableRow(patientTableRow);
	}

	function getUnconfirmedPatients() {
		const patientTableRow: Patient[] = [];
		for (const patient of patients) {
			if (
				patient?.testResult === TestResult.PENDING ||
				patient?.testResult === null
			) {
				patientTableRow.push(patient);
			}
		}
		setTableSelection('unconfirmed');
		setPatientsTableRow(patientTableRow);
	}

	return (
		<IonPage>
			<IonToolbar></IonToolbar>
			<IonContent className={'patients-page__content'}>
				<IonTitle>PATIENTS</IonTitle>
				<div>
					<IonRow>
						<IonCol />
						<IonCol className={'patients-page__confirmed'}>
							<IonButton
								className={
									tableSelection === 'confirmed'
										? 'patients-page__button-selected'
										: 'patients-page__button-unselected'
								}
								onClick={getConfirmedPatients}
							>
								Confirmed
							</IonButton>
						</IonCol>
						<IonCol className={'patients-page__unconfirmed'}>
							<IonButton
								className={
									tableSelection === 'unconfirmed'
										? 'patients-page__button-selected'
										: 'patients-page__button-unselected'
								}
								onClick={getUnconfirmedPatients}
							>
								UnConfirmed
							</IonButton>
						</IonCol>
						<IonCol />
					</IonRow>
					<br />
				</div>
				{patients !== undefined ? (
					<PatientsTable
						patients={patientsTableRow}
						setPatients={setPatients}
						onChange={onPatientsChanged}
					/>
				) : null}
			</IonContent>
		</IonPage>
	);
};

export default PatientsPage;
