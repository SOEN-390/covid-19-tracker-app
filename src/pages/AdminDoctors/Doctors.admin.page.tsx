import { IonTitle, IonPage, IonToolbar, IonContent } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React, { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';
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
		setDoctorsArray(doctorsResponse);
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
					doctorsArray.length !== 0 ? <DoctorsTable doctorTableRows={doctorsArray}/> : null
				}
			</IonContent>
		</IonPage>
	);

};

export default DoctorsAdminPage;
