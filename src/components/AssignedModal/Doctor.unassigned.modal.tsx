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

const DoctorUnassignedModal: React.FC<{
	doctor: IDoctorTableRow;
	trigger?: string;
	setDoctorsArray: (doctors: IDoctorTableRow[]) => void;
}> = ({setDoctorsArray, doctor, trigger}) => {
	const [patientsArray, setPatientsArray] = useState<IPatient[]>([]);
	console.log('patientsArray: ', patientsArray);
	const [modalOpen, setModalOpen] = useState<boolean>(false);

	useEffect(() => {
		HttpService.get(`doctors/${doctor.licenseId}/patients/assigned`).then(
			(numberOfPatientsResponse) => {
				setPatientsArray(numberOfPatientsResponse);
			}
		);
	}, []);

	async function doctorsRetrieval() {
		const doctorsResponse: IDoctorTableRow[] = await HttpService.get(
			'doctors/all'
		);
		for (const [index, doctor] of doctorsResponse.entries()) {
			try {
				const numberOfPatientsResponse: IPatient[] = await HttpService.get(
					`doctors/${doctor.licenseId}/patients/assigned`
				);

				console.log(numberOfPatientsResponse);
				doctorsResponse[index] = {
					...doctor,
					numberOfPatients: numberOfPatientsResponse.length,
				};
				setPatientsArray(numberOfPatientsResponse);
			} catch (error) {
				doctorsResponse[index] = {
					...doctor,
					numberOfPatients: '0',
				};
			}
		}
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
						{doctor.numberOfPatients > 0 ? 'Patients' : 'Patient'}
					</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					<Table className={'doctors-assigned__table'}>
						{patientsArray.length > 0 &&
							patientsArray.map((row, index) => {
								return (
									<DoctorsRow
										key={index}
										name={row.firstName + ' ' + row.lastName}
										setModalOpen={setModalOpen}
										medicalId={row.medicalId}
										licenseId={doctor.licenseId}
										callPatientList={doctorsRetrieval}
									/>
								);
							})}
					</Table>
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close</IonButton>
		</IonModal>
	);
};

const DoctorsRow: React.FC<{
	name: string;
	medicalId?: string;
	licenseId?: string;
	setModalOpen?: (open: boolean) => void;
	callPatientList: () => void;
}> = ({name, medicalId, licenseId, setModalOpen, callPatientList}) => {
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

	const onClickHandler = async () => {
		await unAssignPatient(medicalId!, licenseId!);
		callPatientList();
		setModalOpen?.(false);
		return;
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
			<IonButton onClick={onClickHandler}>{'UnAssign'}</IonButton>
		</Tr>
	);
};

export default DoctorUnassignedModal;
