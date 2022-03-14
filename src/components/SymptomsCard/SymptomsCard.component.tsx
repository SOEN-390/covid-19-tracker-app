import React, { useState } from 'react';
import { Patient } from '../../objects/Patient.class';
import {
	IonButton,
	IonCard,
	IonCardContent,
	IonCardHeader,
	IonCardSubtitle,
	IonCardTitle,
	IonModal
} from '@ionic/react';

const SymptomsCardComponent: React.FC<{ patient: Patient, trigger: string}> = (props) => {

	const [modalOpen, setModalOpen] = useState<boolean>(false);

	return (
		<IonModal isOpen={modalOpen} trigger={props.trigger}
				  onIonModalDidPresent={() => setModalOpen(true)}>
			<IonCard>
				<IonCardHeader>
					<IonCardTitle>{props.patient.firstName + ' ' + props.patient.lastName}</IonCardTitle>
					<IonCardSubtitle>Temperature</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					37.8 Celsius
				</IonCardContent>
				<IonCardHeader>
					<IonCardSubtitle>Breathing</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					Severe difficulty breathing
				</IonCardContent>
				<IonCardHeader>
					<IonCardSubtitle>Other Symptoms</IonCardSubtitle>
				</IonCardHeader>
				<IonCardContent>
					Fever along with running nose
				</IonCardContent>
			</IonCard>
			<IonButton onClick={() => setModalOpen(false)}>Close Symptoms Form</IonButton>
		</IonModal>
	);
};

export default SymptomsCardComponent;
