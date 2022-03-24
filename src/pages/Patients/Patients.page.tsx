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
import NavBar from '../../components/NavBar/NavBar';
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
		} else if (currentProfile.getRole() === UserType.IMMIGRATION_OFFICER) {
			getAllFlaggedPatients();
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
				if (currentProfile.getRole() === UserType.IMMIGRATION_OFFICER) {
					patients.splice(index, 1);
				} else {
					patients[index] = changedPatient;
				}
			}
		}
		setPatients([...patients]);
	}

	function getAllFlaggedPatients(): void {
		HttpService.get(`immigrations/${currentProfile.id}/patients/flagged`)
			.then((patients: Patient[]) => {
				setPatients(patients);
			})
			.catch((error) => {
				console.log('ERROR: ', error);
			});
	}

	function getAssignedPatients(): void {
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

	function getAllPatients(): void {
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

	function getConfirmedPatients() {
		const patientTableRow = patients.filter(
			(patient) =>
				patient?.testResult === TestResult.POSITIVE ||
				patient?.testResult === TestResult.NEGATIVE
		);
		setTableSelection('confirmed');
		setPatientsTableRow(patientTableRow);
	}

	function getUnconfirmedPatients() {
		const patientTableRow = patients.filter(
			(patient) =>
				patient?.testResult === TestResult.PENDING ||
				patient?.testResult === null
		);
		setTableSelection('unconfirmed');
		setPatientsTableRow(patientTableRow);
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar />
			</IonToolbar>
			<IonContent className={'patients-page__content'}>
				{currentProfile.getRole() === UserType.IMMIGRATION_OFFICER ? (
					<IonTitle>FLAGGED PATIENTS</IonTitle>
				) : (
					<IonTitle>PATIENTS</IonTitle>
				)}
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
						onChange={onPatientsChanged}
					/>
				) : null}
			</IonContent>
		</IonPage>
	);
};

export default PatientsPage;
