import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonIcon,
	IonModal,
	useIonActionSheet,
	useIonToast
} from '@ionic/react';
import './PatientsTable.scss';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { UserType } from '../../enum/UserType.enum';
import { adminColumns, doctorColumns, healthOfficialColumns, PatientsTableColumn } from './patientsTableColumn';
import { call, flag, mail, mailOpen, mailUnread } from 'ionicons/icons';
import { useAuth } from '../../providers/auth.provider';
import { TestResult } from '../../enum/TestResult.enum';
import { Patient } from '../../objects/Patient.class';
import HttpService from '../../providers/http.service';

const PatientsTable: React.FC<{ patients: Patient[], onChange: (patient: Patient) => void }> = (props) => {

	const {currentProfile} = useAuth();
	const [columns, setColumns] = useState<readonly PatientsTableColumn[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [symptomsIndex, setSymptomsIndex] = useState<number>();

	const [presentToast] = useIonToast();
	const [presentActionSheet, dismissActionSheet] = useIonActionSheet();

	useEffect(() => {
		switch (currentProfile.getRole()) {
			case UserType.DOCTOR:
				setColumns(doctorColumns);
				break;
			case UserType.HEALTH_OFFICIAL:
				setColumns(healthOfficialColumns);
				break;
			case UserType.ADMIN:
				setColumns(adminColumns);
				break;
		}
	}, []);

	function flagPatient(patient: Patient) {
		patient.flagged = !patient.flagged;
		HttpService.post(
			`patients/${patient.medicalId}/${patient.flagged ? 'flag' : 'unflag'}`,
			{role: currentProfile.getRole()}
		).then(() => {
			props.onChange(patient);
			presentToast(`Successfully ${patient.flagged ? 'FLAGGED' : 'UNFLAGGED'} patient'`, 1000);
		}).catch(() => {
			presentToast('An error has occurred. Please try again.', 1000);
		});
	}

	function reviewPatient(patient: Patient) {
		patient.reviewed = !patient.reviewed;
		HttpService.patch(
			`doctors/${patient.medicalId}/${patient.reviewed ? 'review' : 'unreview'}`,
			{role: currentProfile.getRole()}
		).then(() => {
			props.onChange(patient);
		}).catch(() => {
			presentToast('An error has occurred. Please try again.', 1500);
		});
	}

	function getRow(patient: Patient, index: number): JSX.Element | null {

		return (
			<Tr className="patients-table__table-entries"
				key={index}
				style={{background: patient.reviewed ? '' : '#cfe2f3'}}
				onClick={() => reviewPatient(patient)}
			>
				<Td key={index}
					className="patients-table__table-entries__name">{patient.firstName + ' ' + patient.lastName}</Td>
				<Td key={index}>
					<div key={index} className={'patients-table__status ' +
						(patient.testResult === TestResult.POSITIVE ? 'patients-table__status__positive' : '') +
						(patient.testResult === TestResult.NEGATIVE ? 'patients-table__status__negative' : '') +
						(patient.testResult === TestResult.PENDING ? 'patients-table__status__pending' : '')
					}>
						{patient.testResult === TestResult.POSITIVE && 'Positive'}
						{patient.testResult === TestResult.NEGATIVE && 'Negative'}
						{patient.testResult === TestResult.PENDING && 'Pending'}
					</div>
				</Td>
				{
					(currentProfile.getRole() === UserType.HEALTH_OFFICIAL || currentProfile.getRole() === UserType.ADMIN) &&
					<Td key={index} className="patients-table__table-entries__doctor-name">
						Dr. {patient.doctorName}
					</Td>
				}
				<Td key={index}>
					<IonButton shape="round"
							   expand="block"
							   onClick={() => {
								   presentActionSheet(
									   [
										   {
											   text: 'Email',
											   icon: mail,
											   handler: () => {
												   window.location.href = `mailto:${patient.email}+?subject=COVID-Tracker&body=`;
											   }
										   },
										   {
											   text: 'Phone',
											   icon: call,
											   handler: () => {
												   window.location.href = `tel:${patient.phoneNumber}`;
											   }
										   }],
									   'Contact by');
								   setTimeout(dismissActionSheet, 10000);
							   }}
					>
						Contact
					</IonButton>
				</Td>

				{
					(currentProfile.getRole() === UserType.HEALTH_OFFICIAL || currentProfile.getRole() === UserType.DOCTOR) &&
					<Td key={index}>
						<IonButton shape="round" onClick={() => {
							reviewPatient(patient);
							setShowModal(true);
							setSymptomsIndex(index);
						}}>
							Monitor Symptoms
						</IonButton>
					</Td>
				}

				{
					(currentProfile.getRole() === UserType.HEALTH_OFFICIAL || currentProfile.getRole() === UserType.DOCTOR) &&
					symptomsIndex !== undefined &&
					<IonModal isOpen={showModal} breakpoints={[0.1, 0.5, 1]} initialBreakpoint={0.5} swipeToClose={true}
							  onDidDismiss={() => setShowModal(false)}>
						<IonCard>
							<IonCardHeader>
								<IonCardTitle>{props.patients[symptomsIndex].firstName + ' ' + props.patients[symptomsIndex].lastName}</IonCardTitle>
								<IonCardSubtitle>Temperature</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								37.8 Celsius
							</IonCardContent>
							<IonCardHeader>
								<IonCardSubtitle>Breathing</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								Severe difficulty breathing
							</IonCardContent>
							<IonCardHeader>
								<IonCardSubtitle>Other Symptoms</IonCardSubtitle>
							</IonCardHeader>
							<IonCardContent>
								Fever along with running nose
							</IonCardContent>
						</IonCard>
						<IonButton onClick={() => setShowModal(false)}>Close Symptoms Form</IonButton>
					</IonModal>
				}
				{
					(currentProfile.getRole() === UserType.DOCTOR) &&
					<Td key={index} className={'patients-table__flag'}>
						<IonIcon
							ios={patient.reviewed ? mailUnread : mailOpen}
							md={patient.reviewed ? mailUnread : mailOpen}
						/>
					</Td>
				}
				<Td key={index} className={'patients-table__flag'}>
					<IonIcon
						className={patient.flagged ? 'patients-table__flag__high-priority' : 'patients-table__flag__no-priority'}
						ios={flag} md={flag}
						onClick={() => {
							reviewPatient(patient);
							flagPatient(patient);
						}}
					/>
				</Td>
			</Tr>
		);
	}

	return (
		<Table className={'patients-table__table'}>
			<Thead>
				<Tr className={'patients-table__table-head'}>
					{
						columns.map((column, index) => (
							<Th key={index} className={'patients-table__table-column-title'}>
								{column.label}
							</Th>
						))
					}
				</Tr>
			</Thead>
			<Tbody>
				{
					props.patients.map((row, index) => {
						return getRow(row, index);
					})
				}
			</Tbody>
		</Table>
	);
};

export default PatientsTable;
