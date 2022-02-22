import {
	IonButton,
	IonCardHeader,
	IonCheckbox,
	IonCol,
	IonContent,
	IonGrid,
	IonInput,
	IonLabel,
	IonRow
} from '@ionic/react';
import './Symptom.css';
import React from 'react';

const Symptom: React.FC = () => {
	return (
		<IonContent>

			<IonGrid>
				<form className="container">

					<IonRow>
						<IonCol size="8">
							<IonLabel className="text">My Temperature (°C) </IonLabel>
						</IonCol>
						<IonCol size="4">
							<IonInput className="col-75" type="number"/>
						</IonCol>

					</IonRow>

				</form>
			</IonGrid>


			<IonGrid>
				<form className="container">
					<IonCardHeader>BREATHING</IonCardHeader>
					<IonRow>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="7">
							<IonLabel>Severe difficulty breathing</IonLabel></IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="7">
							<IonLabel>Severe chest pain</IonLabel></IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="7">
							<IonLabel>Feeling confused or unsure of where you are</IonLabel></IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="7">
							<IonLabel>Losing consciousness</IonLabel></IonCol>
					</IonRow>

				</form>
			</IonGrid>

			<IonGrid>
				<form className="container">
					<IonCardHeader>Other Symptoms</IonCardHeader>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Fever and/or chills</IonLabel></IonCol>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Cough or barking cough (croup)</IonLabel></IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Shortness of breath</IonLabel></IonCol>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Muscle aches/joint pain</IonLabel></IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Decrease or loss of taste or smell</IonLabel></IonCol>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Runny or stuffy/congested nose
							</IonLabel></IonCol>
					</IonRow>
					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Extreme tiredness</IonLabel></IonCol>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Headache</IonLabel></IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Sore throat</IonLabel></IonCol>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Nausea, vomiting and/or diarrhea</IonLabel></IonCol>
					</IonRow>

					<IonRow>
						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>None of the above</IonLabel></IonCol>

						<IonCol size="1">
							<IonCheckbox/>
						</IonCol>
						<IonCol size="5">
							<IonLabel>Severe chest pain</IonLabel></IonCol>
					</IonRow>

				</form>
				<IonButton type="submit"> SUBMIT</IonButton>
			</IonGrid>


		</IonContent>

	);
};

export default Symptom;

