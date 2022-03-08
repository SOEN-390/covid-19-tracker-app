import { IonTitle, IonPage, IonToolbar, IonContent } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import DoctorsTable from '../../components/DoctorsTable/DoctorsTable';
import './Doctors.admin.page.scss';

const DoctorsAdminPage: React.FC = () => {

	const [doctorsArray, setDoctorsArray] = useState<IDoctorTableRow[]>();

	useEffect(() => {
		doctorsRetrieval();
	}, []);

	async function doctorsRetrieval() {
		const doctorsResponse: IDoctorTableRow[] = await HttpService.get(
			'doctors/all'
		);
		doctorsResponse.map(async (doctor: IDoctorTableRow) => {
			const numberOfPatientsResponse = await HttpService.get(
				`doctors/${doctor.licenseId}/patients/assigned`
			);
			const modifiedDoctorResponse = {
				...doctor,
				numberOfPatients: numberOfPatientsResponse.length,
			};
			setDoctorsArray([modifiedDoctorResponse]);
		});
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent className={'doctors-admin__content'} >
				<IonTitle>Doctors</IonTitle>
				<br/>
				{
					doctorsArray ? <DoctorsTable doctorTableRows={doctorsArray}/> : null
				}
			</IonContent>
		</IonPage>
	);

};

export default DoctorsAdminPage;
