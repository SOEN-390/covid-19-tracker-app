import { IonTitle, IonPage, IonToolbar, IonContent } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
import DoctorsTable from '../../components/DoctorsTable/DoctorsTable';

const DoctorsPage: React.FC = () => {

	const [doctorsArray, setDoctorssArray] = useState<IDoctorTableRow[]>();

	useEffect(() => {
		doctorssRetrieval();
	}, []);

	async function doctorssRetrieval() {
		HttpService.get('doctors/all').then(async (response) => {
			console.log('HERE IS THE DATA IN JSON FORM: ', response);
			setDoctorssArray(response);
		}).catch((error) => {
			console.log('ERROR: ', error);
		});
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent>
				<IonTitle id="patientHeader">Doctors</IonTitle>
				<br/>
				{
					doctorsArray !== undefined ? <DoctorsTable doctorTableRows={doctorsArray}/> : null
				}
			</IonContent>
		</IonPage>
	);

};

export default DoctorsPage;
