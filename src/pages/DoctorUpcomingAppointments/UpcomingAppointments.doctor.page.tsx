import React, { useEffect, useState } from 'react';
import AppointmentsTable from '../../components/AppointmentsTable/AppointmentsTable';
import { IonContent, IonLabel, IonPage, IonTitle, IonToolbar, useIonToast } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';
import { IAppointmentTableData } from '../../interfaces/IAppointment';

const UpcomingAppointmentsDoctorPage: React.FC = () => {

	const { currentProfile } = useAuth();
	const [present] = useIonToast();
	const [appointments, setAppointments] = useState<IAppointmentTableData[]>([]);

	useEffect(() => {
		getUpcomingAppointments();
	}, []);

	async function getUpcomingAppointments() {
		try {
			const data = await HttpService.get(`doctors/${currentProfile.licenseId}/upcoming-appointments`);
			setAppointments(data);
		}
		catch (e) {
			present('No upcoming appointments', 1500);
		}
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<IonContent>
				{
					appointments.length === 0 ?
						<IonTitle>
							<IonLabel>You do not have any upcoming appointments</IonLabel>
						</IonTitle> :
						<AppointmentsTable appointments={appointments}/>
				}
			</IonContent>

		</IonPage>
	);
};

export default UpcomingAppointmentsDoctorPage;
