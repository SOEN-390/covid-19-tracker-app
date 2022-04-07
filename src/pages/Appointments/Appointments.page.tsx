import { IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import './Appointments.page.scss';
import React from 'react';

const AppointmentsPage: React.FC = () => {

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonTitle>Appointments</IonTitle>

		</IonPage>
	);
};

export default AppointmentsPage;
