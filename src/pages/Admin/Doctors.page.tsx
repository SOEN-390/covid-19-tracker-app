import { IonTitle, IonPage, IonToolbar, IonContent } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import DoctorsTable from '../../components/DoctorsTable/DoctorsTable';

const DoctorsPage: React.FC = () => {
	const [doctorsArray, setDoctorsArray] = useState<IDoctorTableRow[]>();

	useEffect(() => {
		doctorsRetrieval();
	}, []);

	const doctorsRetrieval = async (): Promise<IDoctorTableRow[] | void> => {
		const doctorsResponse: IDoctorTableRow[] = await HttpService.get(
			'doctors/all'
		);
		console.log('doctorsResponse: ', doctorsResponse);

		doctorsResponse.map(async (doctor: IDoctorTableRow) => {
			console.log('doctor: ', doctor);
			const numberOfPatientsResponse = await HttpService.get(
				`doctors/${doctor.licenseId}/patients/assigned`
			);
			const modifiedDoctorResponse = {
				...doctor,
				numberOfPatients: numberOfPatientsResponse.length,
			};
			console.log('modifiedDoctorResponse: ', modifiedDoctorResponse);
			setDoctorsArray([modifiedDoctorResponse]);
		});
	};

	return (
		<IonPage>
			<IonToolbar>
				<NavBar />
			</IonToolbar>
			<IonContent>
				<IonTitle id="patientHeader">Doctors</IonTitle>
				<br />
				{doctorsArray && <DoctorsTable doctorTableRows={doctorsArray} />}
			</IonContent>
		</IonPage>
	);
};
export default DoctorsPage;
