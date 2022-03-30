import React, { useEffect, useState } from 'react';
import AppointmentsTable from '../../components/AppointmentsTable/AppointmentsTable';
import { IonContent, IonPage, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';



const DoctorUpcomingAppointmentsPage: React.FC = () => {

	const { currentProfile } = useAuth();

	useEffect(() => {
		getUpcomingAppointments();
	}, []);

	async function getUpcomingAppointments() {
		try {
			const data = await HttpService.get(`doctors/${currentProfile.licenseId}/upcoming-appointments`);
			console.log(data);

		}
		catch (e) {

		}

	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent>
				<AppointmentsTable/>
			</IonContent>

		</IonPage>

	);
};

export default DoctorUpcomingAppointmentsPage;
