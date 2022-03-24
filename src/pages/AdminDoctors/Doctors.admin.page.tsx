import { IonTitle, IonPage, IonToolbar, IonContent } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import { IPatient } from '../../interfaces/IPatient';
import DoctorsTable from '../../components/DoctorsTable/DoctorsTable';
import './Doctors.admin.page.scss';

const DoctorsAdminPage: React.FC = () => {

	const [doctorsArray, setDoctorsArray] = useState<IDoctorTableRow[]>([]);

	useEffect(() => {
		doctorsRetrieval();
	}, []);

	async function doctorsRetrieval() {
		setDoctorsArray([]);
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
					assignedPatientsCount: numberOfPatientsResponse.length,
				};
			} catch (error) {
				doctorsResponse[index] = {
					...doctor,
					assignedPatientsCount: '0',
				};
			}
		}
		setDoctorsArray(doctorsResponse);
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent className={'doctors-admin__content'}>
				<IonTitle>Doctors</IonTitle>
				<br/>
				{
					doctorsArray.length !== 0 ? <DoctorsTable doctorTableRows={doctorsArray}
															  setDoctorsArray={setDoctorsArray}
					/> : null
				}
			</IonContent>
		</IonPage>
	);

};

export default DoctorsAdminPage;
