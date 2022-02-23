import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonContent,
	IonIcon,
	IonModal,
	useIonToast
} from '@ionic/react';
import './PatientsTable.scss';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { Table, Tbody, Td, Th, Thead, Tr } from 'react-super-responsive-table';
import { UserType } from '../../enum/UserType.enum';
import { adminColumns, doctorColumns, healthOfficialColumns, PatientsTableColumn } from './patientsTableColumn';
import { flag } from 'ionicons/icons';
import { useAuth } from '../../providers/auth.provider';
import { TestResult } from '../../enum/TestResult.enum';
import { Patient } from '../../objects/Patient.class';
import HttpService from '../../providers/http.service';

const PatientsTable: React.FC<{ patients: Patient[], onChange: (patient: Patient[]) => void }> = (props) => {

	const {currentProfile} = useAuth();
	const [columns, setColumns] = useState<readonly PatientsTableColumn[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [symptomsIndex, setSymptomsIndex] = useState<number>();

	const [present] = useIonToast();

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
			props.onChange(props.patients);
		}).catch(() => {
			present('An error has occurred. Please try again.', 1500);
		});
	}


	function getRow(patient: Patient, index: number): JSX.Element | null {

		return (
			<Tr id="tableRow" key={index}>
				<Td key={index} id="colName">{patient.firstName + ' ' + patient.lastName}</Td>
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
				<Td key={index} id="lastUpdate">
					March 17, 2021
				</Td>
				{
					currentProfile.getRole() !== UserType.DOCTOR &&
					<Td key={index} id="colDoc">
						Dr.Sue
					</Td>
				}
				<Td key={index} id="col">
					<IonButton color="favorite" shape="round" size="large">
						Contact
					</IonButton>
				</Td>

				{
					currentProfile.getRole() === UserType.HEALTH_OFFICIAL &&
					<Td key={index} id="col">
						<IonButton color="favorite" shape="round" size="large" onClick={() => {
							setShowModal(true);
							setSymptomsIndex(index);
						}}>
							Monitor Symptoms
						</IonButton>
					</Td>
				}
				{
					currentProfile.getRole() === UserType.DOCTOR &&
					<Td key={index} id="col">
						<IonButton color="favorite" shape="round" size="large" onClick={() => {
							setShowModal(true);
							setSymptomsIndex(index);
						}}>
							Monitor Symptoms
						</IonButton>
					</Td>
				}

				{
					currentProfile.getRole() === UserType.HEALTH_OFFICIAL &&
					symptomsIndex !== undefined &&
					<IonModal isOpen={showModal}>
						<IonContent fullscreen>
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
						</IonContent>
						<IonButton onClick={() => setShowModal(false)}>Close Symptoms Form</IonButton>
					</IonModal>
				}
				{
					currentProfile.getRole() === UserType.DOCTOR &&
					symptomsIndex !== undefined &&
					<IonModal isOpen={showModal}>
						<IonContent fullscreen>
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
						</IonContent>
						<IonButton onClick={() => setShowModal(false)}>Close Symptoms Form</IonButton>
					</IonModal>
				}

				<Td key={index} className={'patients-table__flag'}>
					<IonIcon className={patient.flagged ? 'high-priority' : 'no-priority'}
							 ios={flag} md={flag}
							 onClick={() => flagPatient(patient)}
					/>
				</Td>
			</Tr>
		);
	}

	return (
		<Table>
			<Thead>
				<Tr id="tableHead">
					{
						columns.map((column, index) => (
							<Th key={index} id="headCol">
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
