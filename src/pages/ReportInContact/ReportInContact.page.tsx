import ReportInContactForm from '../../components/ReportInContactForm/ReportInContactForm';
import React from 'react';
import { IonPage, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';

const ReportInContactPage: React.FC = () => {

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
			</IonToolbar>
			<ReportInContactForm />
		</IonPage>

	);

};

export default ReportInContactPage;
