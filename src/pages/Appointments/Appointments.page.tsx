import { IonPage, IonTitle, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React from 'react';

const AppointmentsPage: React.FC = () => {

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
				<IonTitle>Appointments</IonTitle>
			</IonToolbar>

		</IonPage>
	);
};

export default AppointmentsPage;
