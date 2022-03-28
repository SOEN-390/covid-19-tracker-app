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
import './Doctor.modal.scss';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import { Table, Td, Tr } from 'react-super-responsive-table';
import HttpService from '../../providers/http.service';
import { IPatient } from '../../interfaces/IPatient';

const DoctorModal: React.FC<{
	doctor: IDoctorTableRow;
	trigger?: string;
	setDoctorsArray: (doctors: IDoctorTableRow[]) => void;
}> = ({ setDoctorsArray, doctor, trigger }) => {
	const [patientsArray, setPatientsArray] = useState<IPatient[]>([]);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [present] = useIonToast();
	const unAssignPatient = async (
		medicalId: string,
		licenseId: string
	): Promise<void> => {
		try {
			await HttpService.patch(
				`admins/patient/${medicalId}
				/doctor/${licenseId}/un-assign`,
				{}
			);
			present('Successfully unAssigned Doctor', 1500);
		} catch (e) {
			present('Failed to unAssign Doctor', 1500);
		}
	};

	const onClickHandler = async (medicalId: string) => {
		await unAssignPatient(medicalId!, doctor.licenseId!);
		doctorsRetrieval();
		setModalOpen?.(false);
		return;
	};

	useEffect(() => {
		HttpService.get(`doctors/${doctor.licenseId}/patients/assigned`).then(
			(numberOfPatientsResponse) => {
				console.log('numberOfPatientsResponse: ', numberOfPatientsResponse);
				setPatientsArray(numberOfPatientsResponse);
			}
		);
	}, []);

	async function doctorsRetrieval() {
		const doctorsResponse: IDoctorTableRow[] = await HttpService.get(
			'doctors/all'
		);
		setDoctorsArray?.(doctorsResponse);
	}

	return (
		<IonModal
			isOpen={modalOpen}
			onIonModalDidPresent={() => setModalOpen(true)}
			trigger={trigger}
		>
			<IonCard>
				<IonCardHeader>
					<IonCardSubtitle>
						{doctor.assignedPatientsCount > 0 ? 'Patients' : 'Patient'}
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<Table className={'doctors-assigned__table'}>
						{patientsArray.length > 0 &&
							patientsArray.map((row) => {
								return (
									<Table key={row.id} className={'doctor-modal__table'}>
										<Tr className={'doctor-modal__table-row'}>
											<Td
												className={'doctor-table__doctor-name'}
											>{`${row.firstName} ${row.lastName}`}</Td>
											<IonButton onClick={() => onClickHandler(row.medicalId)}>
												{'UnAssign'}
											</IonButton>
										</Tr>
									</Table>
								);
							})}
					</Table>
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};

export default DoctorModal;
