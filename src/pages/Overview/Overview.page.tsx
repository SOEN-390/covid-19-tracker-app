import { IonPage, IonToolbar } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import React from 'react';

const OverviewPage: React.FC = () => {

	return (
		<IonPage>

			<IonToolbar>
				<NavBar/>
			</IonToolbar>

		</IonPage>
	);
};

export default OverviewPage;
