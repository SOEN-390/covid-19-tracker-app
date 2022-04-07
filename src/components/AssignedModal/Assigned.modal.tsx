import React, { useEffect, useState } from 'react';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonModal,
	useIonToast,
} from '@ionic/react';
import './Assigned.modal.scss';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import { Table, Td, Tr } from 'react-super-responsive-table';
import HttpService from '../../providers/http.service';
import { IPatient } from '../../interfaces/IPatient';

const AssignedComponent: React.FC<{
	onChange: (patient: IPatient) => void;
	assignModal: { open: boolean, patient: IPatient }
}> = (props) => {
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [doctors, setDoctors] = useState<IDoctorTableRow[]>([]);

	const [present] = useIonToast();

	useEffect(() => {
		HttpService.get('doctors/all').then((value: IDoctorTableRow[]) => {
			if (props.assignModal.patient.doctorName !== null) {
				value.forEach((doctor) => {
					if (
						doctor.firstName + ' ' + doctor.lastName ===
						props.assignModal.patient.doctorName
					) {
						setDoctors([doctor]);
						return;
					}
				});
				return;
			}
			setDoctors(value);
		});
	}, [props.assignModal.patient.doctorName]);

	useEffect(() => {
		setModalOpen(props.assignModal.open);
	}, [props.assignModal]);


	async function unAssignPatient(licenseId: string): Promise<void> {
		try {
			const path = `admins/patient/${props.assignModal.patient.medicalId}/doctor/${licenseId}/un-assign`;
			await HttpService.patch(path, {});
			present('Successfully unAssigned Doctor', 1500);
		} catch (e) {
			present('Failed to unAssign Doctor', 1500);
		}
	}

	async function assignPatient(licenseId: string): Promise<void> {
		try {
			await HttpService.patch(
				`admins/patient/${props.assignModal.patient.medicalId}/doctor/${licenseId}/assign`,
				{}
			);
			present('Successfully Assigned Doctor', 1500);
		} catch (e) {
			present('Failed to Assign Doctor', 1500);
		}
	}

	function getDoctorRow(
		doctorTableRow: IDoctorTableRow,
		Assigned: boolean
	): JSX.Element {
		return (
			<Tr
				className={'patients-modal__table-row'}
				key={doctorTableRow.licenseId}
			>
				<Td className={'doctor-table__doctor-name'}>
					{doctorTableRow.firstName + ' ' + doctorTableRow.lastName}
				</Td>
				<Td>
					<IonButton
						onClick={() => {
							onClickHandler(doctorTableRow);
						}}
					>
						{Assigned ? 'UnAssign' : 'Add'}
					</IonButton>
				</Td>
			</Tr>
		);
	}

	function onClickHandler(doctorTableRow: IDoctorTableRow) {
		if (props.assignModal.patient.doctorName) {
			unAssignPatient(doctorTableRow.licenseId).then(() => {
				delete props.assignModal.patient.doctorName;
				props.onChange(props.assignModal.patient);
				setModalOpen?.(false);
			});
			return;
		} else {
			assignPatient(doctorTableRow.licenseId).then(() => {
				props.assignModal.patient.doctorName =
					doctorTableRow.firstName + ' ' + doctorTableRow.lastName;
				props.onChange(props.assignModal.patient);
				setModalOpen?.(false);
			});
		}
	}

	return (
		<IonModal
			isOpen={modalOpen}
			onIonModalWillPresent={() => {
				setModalOpen(true);
			}}
			onDidDismiss={()=>setModalOpen(false)}
		>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>
						{!props.assignModal.patient.doctorName ? 'Doctors' : 'Doctor'}
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<Table className={'patients-modal__table'}>
						<tbody>
							{doctors.map((row) => {
								return getDoctorRow(row, !!props.assignModal.patient.doctorName);
							})}
						</tbody>
					</Table>
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};

export default AssignedComponent;
