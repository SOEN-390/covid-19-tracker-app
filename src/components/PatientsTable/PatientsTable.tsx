import {
	ActionSheetButton,
	IonButton,
	IonIcon,
	useIonActionSheet,
	useIonToast
} from '@ionic/react';
import './PatientsTable.scss';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { UserType } from '../../enum/UserType.enum';
import {
	adminColumns,
	doctorColumns,
	healthOfficialColumns,
	immigrationOfficerColumns,
	PatientsTableColumn
} from './patientsTableColumn';
import {
	call,
	flag,
	mail,
	close,
	checkmarkCircleOutline,
	checkmarkDoneCircleOutline,
	personRemoveOutline,
	personAddOutline,
} from 'ionicons/icons';
import { useAuth } from '../../providers/auth.provider';
import { TestResult } from '../../enum/TestResult.enum';
import { Patient } from '../../objects/Patient.class';
import HttpService from '../../providers/http.service';
import SymptomsCardComponent from '../SymptomsCard/SymptomsCard.component';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import {
	AdminPages,
	DoctorPages,
	HealthOfficialPages,
	ImmigrationOfficerPages,
} from '../../providers/pages.enum';
import AssignedComponent from '../AssignedModal/Assigned.modal';
import { IPatient } from '../../interfaces/IPatient';
import Moment from 'react-moment';
import { ISymptomResponse } from '../../interfaces/ISymptom';

const PatientsTable: React.FC<{ patients: Patient[], onChange: (patient: Patient) => void }> = (props) => {

	const { currentProfile } = useAuth();
	const [columns, setColumns] = useState<readonly PatientsTableColumn[]>([]);
	const [assignModal, setAssignModal] = useState<{ open: boolean, patient: Patient }>();
	const [presentToast] = useIonToast();
	const [presentActionSheet, dismissActionSheet] = useIonActionSheet();
	const history = useHistory();
	const [symptoms, setSymptoms] = useState<ISymptomResponse[]>([]);
	const currentDate = moment().format('YYYY-M-D');

	const StringifyPatientList = JSON.stringify(props.patients);

	useEffect(() => {
		switch (currentProfile.getRole()) {
			case UserType.DOCTOR:
				setColumns(doctorColumns);
				break;
			case UserType.HEALTH_OFFICIAL:
				setColumns(healthOfficialColumns);
				break;
			case UserType.IMMIGRATION_OFFICER:
				setColumns(immigrationOfficerColumns);
				break;
			case UserType.ADMIN:
				setColumns(adminColumns);
				break;
		}
	}, [StringifyPatientList]);

	function flagPatient(patient: Patient) {
		patient.flagged = !patient.flagged;
		HttpService.post(
			`patients/${patient.medicalId}/${patient.flagged ? 'flag' : 'unflag'}`,
			{ role: currentProfile.getRole() }
		)
			.then(() => {
				props.onChange(patient);
				presentToast(
					`Successfully ${patient.flagged ? 'FLAGGED' : 'UNFLAGGED'} patient.`,
					1000
				);
			})
			.catch(() => {
				presentToast('An error has occurred. Please try again.', 1000);
			});
	}

	function remindPatient(patient: Patient) {

		const lastUpdated = moment(patient.lastUpdated).format('YYYY-M-D');
		if (patient.reminded) {
			presentToast('Patient already reminded', 1500);

			return;
		}
		if (currentDate == lastUpdated) {
			const confirmRemind = confirm('Patient status is already updated today, are you sure you want to continue?');
			if (!confirmRemind) {
				return;
			}
		}
		patient.reminded = true;
		HttpService.post(
			`patients/${patient.medicalId}/remind`,
			{ role: currentProfile.getRole() }
		).then(() => {
			props.onChange(patient);
			presentToast('Successfully REMINDED patient.', 1000);
		}).catch(() => {
			presentToast('An error has occurred. Please try again.', 1000);
		});


	}

	function reviewPatient(patient: Patient) {
		if (currentProfile.getRole() !== UserType.DOCTOR) {
			return;
		}
		patient.reviewed = !patient.reviewed;
		HttpService.patch(
			`doctors/${patient.medicalId}/${patient.reviewed ? 'review' : 'unreview'}`,
			{ role: currentProfile.getRole() }
		).then(() => {
			props.onChange(patient);
		}).catch(() => {
			presentToast('An error has occurred. Please try again.', 1500);
		});
	}

	async function getLatestSymptoms(patient: Patient): Promise<void> {
		setSymptoms([]);
		try {
			const data = await HttpService.get(`patients/${patient.medicalId}/latest-symptoms`);
			setSymptoms(data);
		}
		catch (e) {
			console.log(e);
		}
	}

	function generateContactList(patient: Patient): ActionSheetButton[] {
		const contactOption: ActionSheetButton[] = [];
		if (patient.email) {
			contactOption.push({
				text: 'Email',
				icon: mail,
				handler: () => {
					window.location.href = `mailto:${patient.email}+?subject=COVID-Tracker&body=`;
				}
			});
		}
		if (patient.email) {
			contactOption.push({
				text: 'Phone',
				icon: call,
				handler: () => {
					window.location.href = `tel:${patient.phoneNumber}`;
				}
			});
		}
		contactOption.push({
			text: 'Cancel',
			icon: close,
			role: 'cancel'
		});
		return contactOption;
	}

	function getRow(patient: Patient, index: number): JSX.Element | null {
		return (
			<Tr className="patients-table__table-entries"
				key={index}
				style={{ background: currentProfile.getRole() === UserType.DOCTOR ? (patient.reviewed ? '' : '#F5F6F6') : '' }}
			>
				<Td key={index}
					className="patients-table__table-entries__name"
					onClick={() => {
						if (!patient.reviewed) {
							reviewPatient(patient);
						}
						if (currentProfile.getRole() === UserType.ADMIN) {
							history.push({
								pathname: AdminPages.patientProfile + '/' + patient.medicalId
							});
						} else if (currentProfile.getRole() === UserType.IMMIGRATION_OFFICER) {
							history.push({
								pathname: ImmigrationOfficerPages.patientProfile + '/' + patient.medicalId
							});
						} else if (currentProfile.getRole() === UserType.HEALTH_OFFICIAL) {
							history.push({
								pathname: HealthOfficialPages.patientProfile + '/' + patient.medicalId
							});
						} else if (currentProfile.getRole() === UserType.DOCTOR) {
							history.push({
								pathname: DoctorPages.patientProfile + '/' + patient.medicalId
							});
						}
					}}
				>
					{patient.firstName + ' ' + patient.lastName}
				</Td>
				<Td key={index}>
					<div key={index} className={'patients-table__status ' +
						(patient.testResult === TestResult.POSITIVE ? 'patients-table__status__positive' : '') +
						(patient.testResult === TestResult.NEGATIVE ? 'patients-table__status__negative' : '') +
						(patient.testResult === TestResult.PENDING ? 'patients-table__status__pending' : '')
					}>
						{patient.testResult === TestResult.POSITIVE && 'POSITIVE'}
						{patient.testResult === TestResult.NEGATIVE && 'NEGATIVE'}
						{patient.testResult === TestResult.PENDING && 'PENDING'}
					</div>
				</Td>
				{(currentProfile.getRole() === UserType.HEALTH_OFFICIAL ||
					currentProfile.getRole() === UserType.ADMIN) && (
					<Td
						key={index}
						className="patients-table__table-entries__doctor-name"
						onClick={() => {
							setAssignModal({ open: true, patient });
						}}						>
						{patient.doctorName ? (
							<>
								{'Dr.' + patient.doctorName + ' '}
								<IonIcon icon={personRemoveOutline} />
							</>
						) : (<>
							{'Not Assigned'}
							<IonIcon icon={personAddOutline} />
						</>
						)}
					</Td>
				)}
				<Td key={index}>					<IonButton shape="round"
					expand="block"
					onClick={() => {
						presentActionSheet(
							generateContactList(patient),
							'Contact by');
						setTimeout(dismissActionSheet, 10000);
					}}
				>
					Contact
				</IonButton>
				</Td>
				{
					(
						currentProfile.getRole() === UserType.HEALTH_OFFICIAL ||
						currentProfile.getRole() === UserType.DOCTOR ||
						currentProfile.getRole() === UserType.IMMIGRATION_OFFICER
					) &&
					<Td key={index}>
						<IonButton id={`patients-table__monitor-${patient.medicalId}`} shape="round" onClick={async () => {
							if (!patient.reviewed) {
								reviewPatient(patient);
							}
							await getLatestSymptoms(patient);
						}}>
							Monitor Symptoms
						</IonButton>

						<SymptomsCardComponent trigger={`patients-table__monitor-${patient.medicalId}`}
							patient={patient} symptoms={symptoms} />


					</Td>
				}
				{
					(currentProfile.getRole() === UserType.DOCTOR) &&
					<Td key={index} className={'patients-table__flag'}>
						<IonIcon icon={patient.reviewed ? checkmarkDoneCircleOutline : checkmarkCircleOutline}
							color={patient.reviewed ? 'success' : ''}
							onClick={() => {
								reviewPatient(patient);
							}}
						/>
					</Td>
				}
				{
					(currentProfile.getRole() === UserType.HEALTH_OFFICIAL) &&

					<Td key={index} className={'patients-table__reminder'}>
						<IonButton color={patient.reminded ? 'success' : 'light'}
							onClick={() => remindPatient(patient)} >
							{patient.reminded ? 'patient reminded' : 'Remind patient'}</IonButton>
					</Td>
				}
				<Td key={index} className={'patients-table__flag'}>
					<IonIcon
						className={patient.flagged ? 'patients-table__flag__high-priority' : 'patients-table__flag__no-priority'}
						icon={flag} onClick={() => flagPatient(patient)}
					/>
				</Td>
				<Td key={index} > <Moment format={'LLL'} date={patient.lastUpdated} />
				</Td>
			</Tr>
		);
	}

	return (
		<>
			{
				assignModal && assignModal.patient &&
				<AssignedComponent
					assignModal={assignModal}
					onChange={(patient: IPatient) => {
						props.onChange(patient as Patient);
						setAssignModal({ open: false, patient: assignModal.patient });
					}}
				/>
			}
			<Table className={'patients-table__table'}>
				<Thead>
					<Tr className={'patients-table__table-head'}>
						{columns.map((column, index) => (
							<Th key={index} className={'patients-table__table-column-title'}>
								{column.label}
							</Th>
						))}
					</Tr>
				</Thead>
				<Tbody>
					{props.patients.map((row, index) => {
						return getRow(row, index);
					})}
				</Tbody>
			</Table>
		</>
	);
};

export default PatientsTable;
