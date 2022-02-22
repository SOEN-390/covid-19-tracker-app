import { IonPage } from '@ionic/react';
import NavBar from '../../components/NavBar/NavBar';
import Symptom from '../../components/Symptom/Symptom';
import React from 'react';

const SymptomsFormPage: React.FC = () => {

	return (
		<IonPage>

			<NavBar/>
			<Symptom/>

		</IonPage>
	);
};

export default SymptomsFormPage;
