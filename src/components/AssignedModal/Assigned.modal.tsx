import React, { useEffect, useState } from 'react';
import { Patient } from '../../objects/Patient.class';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonModal,
	useIonToast,
} from '@ionic/react';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import { Table, Td, Tr } from 'react-super-responsive-table';
import HttpService from '../../providers/http.service';
import { IPatient } from '../../interfaces/IPatient';

const AssignedComponent: React.FC<{
	patient: IPatient;
	trigger: string;
	setPatients: (patient: Patient[]) => void;
}> = ({ patient, trigger, setPatients }) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	console.log('trigger: ', trigger);
	console.log('modalOpen: ', modalOpen);

	const [doctors, setDoctors] = useState<IDoctorTableRow[]>([]);

	useEffect(() => {
		console.log('tick');
		if (!patient.doctorName) {
			HttpService.get('doctors/all').then((value) => setDoctors(value));
		}
	}, []);

	return (
		<IonModal
			isOpen={modalOpen}
			trigger={trigger}
			onIonModalDidPresent={() => setModalOpen(true)}
		>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>
						{!patient.doctorName ? 'Doctors' : 'Doctor'}
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<Table className={'doctors-assigned__table'}>
						{!patient.doctorName ? (
							doctors.map((row, index) => {
								return (
									<DoctorsRow
										key={index}
										name={row.firstName + ' ' + row.lastName}
										isAssign
										setModalOpen={setModalOpen}
										medicalId={patient.medicalId}
										licenseId={row.licenseId}
									/>
								);
							})
						) : (
							<DoctorsRow
								isAssign={false}
								name={patient.doctorName}
								medicalId={patient.medicalId}
								licenseId={patient.doctorId!}
								setPatients={setPatients}
							/>
						)}
					</Table>
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};

const DoctorsRow: React.FC<{
	name: string;
	isAssign?: boolean;
	medicalId?: string;
	licenseId?: string;
	setPatients?: (patient: Patient[]) => void;
	setModalOpen?: (open: boolean) => void;
}> = ({
	name,
	isAssign = false,
	medicalId,
	licenseId,
	setPatients,
	setModalOpen,
}) => {
	const [present] = useIonToast();
	const unAssignPatient = async (
		medicalId: string,
		licenseId: string
	): Promise<void> => {
		try {
			await HttpService.patch(
				`admins/patient/${medicalId}
				/doctor/${licenseId}/unassign`,
				{}
			);
			present('Successfully unAssigned Doctor', 1500);
		} catch (e) {
			present('Failed to unAssign Doctor', 1500);
		}
	};

	const assignPatient = async (
		medicalId: string,
		licenseId: string
	): Promise<void> => {
		try {
			await HttpService.patch(
				`admins/patient/${medicalId}
				/doctor/${licenseId}/assign`,
				{}
			);
			present('Successfully unAssigned Doctor', 1500);
		} catch (e) {
			present('Failed to unAssign Doctor', 1500);
		}
	};

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

	const onClickHandler = async () => {
		if (!isAssign) {
			await unAssignPatient(medicalId!, licenseId!).then(() => {
				getAllPatients();
			});
			return;
		} else {
			assignPatient(medicalId!, licenseId!).then(() => {
				getAllPatients();
				return setModalOpen?.(false);
			});
		}
	};

	return (
		<Tr
			style={{
				display: 'flex',
				justifyContent: 'space-between',
				alignItems: 'center',
			}}
			className={'doctor-table__table-row'}
		>
			<Td className={'doctor-table__doctor-name'}>{name}</Td>
			<IonButton onClick={onClickHandler}>
				{isAssign ? 'Add' : 'UnAssign'}
			</IonButton>
		</Tr>
	);
};

export default AssignedComponent;
