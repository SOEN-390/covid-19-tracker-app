import React, { useEffect, useState } from 'react';
import AppointmentsTable from '../../components/AppointmentsTable/AppointmentsTable';
import { IonContent, IonLabel, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';
import { IAppointmentTableData } from '../../interfaces/IAppointment';
import './Doctor.upcoming.appointments.page.scss';


const DoctorUpcomingAppointmentsPage: React.FC = () => {

	const {currentProfile} = useAuth();
	const [present] = useIonToast();
	const [appointments, setAppointments] = useState<IAppointmentTableData[]>([]);

	useEffect(() => {
		getUpcomingAppointments();
	}, []);

	async function getUpcomingAppointments() {
		try {
			const data = await HttpService.get(`doctors/${currentProfile.licenseId}/upcoming-appointments`);
			setAppointments(data);
		} catch (e) {
			present('No upcoming appointments', 1500);
		}
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonTitle>APPOINTMENTS</IonTitle>
			<IonContent>
				{appointments.length === 0 &&

					<IonLabel>You do not have any upcoming appointments</IonLabel>
				}
				{
					appointments.length > 0 &&
					<AppointmentsTable appointments={appointments}/>
				}

			</IonContent>

		</IonPage>

	);
};

export default DoctorUpcomingAppointmentsPage;
