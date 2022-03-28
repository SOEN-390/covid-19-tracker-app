import {
	IonButton,
	IonCard, IonCardContent,
	IonCardHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonPage,
	IonToolbar, useIonToast
} from '@ionic/react';
import React, { useState } from 'react';
import NavBar from '../../components/NavBar/NavBar';
import { ISymptom } from '../../interfaces/ISymptom';
import HttpService from '../../providers/http.service';

const AdminAddSymptomsPage: React.FC = () => {

	const [name, setName] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [present] = useIonToast();

	async function addSymptom(): Promise<void> {
		if (name === '' || description === '') {
			present('Please complete the required fields', 1500);
			return;
		}
		const symptom: ISymptom = {	name: name,
			description: description
		};
		try {
			await HttpService.post('admins/symptom', {
				symptom: symptom
			});
			resetFields();
			present('Successfully added symptom', 1500);
		}
		catch (e) {
			present('Failed to add symptom', 1500);
		}
	}

	function resetFields() {
		setName('');
		setDescription('');
	}

	return (
		<IonPage>
			<IonToolbar>
				<NavBar/>
				<IonCard>
					<IonCardHeader>Add Symptom Form</IonCardHeader>
					<IonCardContent>
						<IonItem>
							<IonLabel position="floating">Name</IonLabel>
							<IonInput  value={name}
									   onIonChange={e => setName(e.detail.value!)}/>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Description</IonLabel>
							<IonInput  value={description}
									   onIonChange={e => setDescription(e.detail.value!)}/>
						</IonItem>
						<IonButton color='success' onClick={()=> addSymptom()}>Submit</IonButton>
					</IonCardContent>
				</IonCard>
			</IonToolbar>
		</IonPage>

	);
};

export default AdminAddSymptomsPage;
