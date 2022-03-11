import { IonPage, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React from 'react';

const AdminOverviewPage: React.FC = () => {

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
				<h1>Welcome to Admin Dashboard</h1>
			</IonToolbar>
		</IonPage>
	);
};

export default AdminOverviewPage;
