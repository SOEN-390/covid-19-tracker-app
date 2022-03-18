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
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import { Table, Td, Tr } from 'react-super-responsive-table';
import HttpService from '../../providers/http.service';
import { IPatient } from '../../interfaces/IPatient';

const AssignedComponent: React.FC<{
	patient: IPatient; trigger: string; onChange: (patient: IPatient) => void;
}> = (props) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [doctors, setDoctors] = useState<IDoctorTableRow[]>([]);

	const [present] = useIonToast();

	useEffect(() => {
		HttpService.get('doctors/all').then((value: IDoctorTableRow[]) => {
			if (props.patient.doctorName !== null) {
				value.forEach((doctor) => {
					if (doctor.firstName + ' ' + doctor.lastName === props.patient.doctorName) {
						setDoctors([doctor]);
						return;
					}
				});
				return;
			}
			setDoctors(value);
		});
	}, []);

	async function unAssignPatient(licenseId: string): Promise<void> {
		try {
			const path = `admins/patient/${props.patient.medicalId}/doctor/${licenseId}/un-assign`;
			await HttpService.patch(path, {});
			present('Successfully unAssigned Doctor', 1500);
		} catch (e) {
			present('Failed to unAssign Doctor', 1500);
		}
	}

	async function assignPatient(licenseId: string): Promise<void> {
		try {
			await HttpService.patch(
				`admins/patient/${props.patient.medicalId}/doctor/${licenseId}/assign`,
				{}
			);
			present('Successfully Assigned Doctor', 1500);
		} catch (e) {
			present('Failed to unAssign Doctor', 1500);
		}
	}

	function getDoctorRow(doctorTableRow: IDoctorTableRow, isAssign: boolean): JSX.Element {
		return (
			<Table>
				<Tr
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
					className={'doctor-table__table-row'}
					key={doctorTableRow.licenseId}
				>
					<Td className={'doctor-table__doctor-name'}>
						{doctorTableRow.firstName + ' ' + doctorTableRow.lastName}
					</Td>
					<IonButton onClick={() => {
						onClickHandler(doctorTableRow);
					}}>
						{isAssign ? 'UnAssign' : 'Add'}
					</IonButton>
				</Tr>
			</Table>

		);
	}

	function onClickHandler(doctorTableRow: IDoctorTableRow) {
		if (props.patient.doctorName) {
			unAssignPatient(doctorTableRow.licenseId!).then(() => {
				props.patient.doctorName = null;
				props.onChange(props.patient);
				setModalOpen?.(false);
			});
			return;
		} else {
			assignPatient(doctorTableRow.licenseId!).then(() => {
				props.patient.doctorName = doctorTableRow.firstName + ' ' + doctorTableRow.lastName;
				props.onChange(props.patient);
				setModalOpen?.(false);
			});
		}
	}

	return (
		<IonModal
			isOpen={modalOpen}
			trigger={props.trigger}
			onIonModalDidPresent={() => setModalOpen(true)}
		>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>
						{!props.patient.doctorName ? 'Doctors' : 'Doctor'}
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<Table className={'doctors-assigned__table'}>
						{
							doctors.map((row) => {
								return (
									getDoctorRow(row, !!props.patient.doctorName)
								);
							})
						}
					</Table>
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};

export default AssignedComponent;
