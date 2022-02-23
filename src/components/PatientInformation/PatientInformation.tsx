import {
	IonAvatar,
	IonButton,
	IonCol,
	IonContent, IonIcon,
	IonImg,
	IonInput, IonItem,
	IonLabel, IonListHeader, IonModal, IonRadio, IonRadioGroup,
	IonRow,
	IonText, useIonToast
} from '@ionic/react';
import './PatientInformation.css';
import { IPatient } from '../../interfaces/IPatient';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import React, { useState } from 'react';
import { TestResult } from '../../enum/TestResult.enum';
import HttpService from '../../providers/http.service';
import { flag } from 'ionicons/icons';

const PatientInformation: React.FC<{ patient: IPatient, updateStatus?: any, updateFlag?: any }> = (props) => {
	const {currentProfile} = useAuth();

	const [showModal, setShowModal] = useState(false);
	const [status, setStatus] = useState(props.patient.testResult);
	const [present] = useIonToast();

	async function updateStatus() {
		if (currentProfile.testResult == status) {
			return;
		}
		try {
			await HttpService.patch(`patients/${currentProfile.id}/status`, {status: status});
			props.updateStatus(status);
			setShowModal(false);
			present('Successfully updated status', 1500);
		} catch (e) {
			present('Failed to update status', 1500);
		}
	}

	async function flagPatient() {
		try {
			await HttpService.post(`patients/${props.patient.medicalId}/flag`,
				{role: currentProfile.getRole()});
			props.updateFlag(true);
			present('Successfully flagged patient', 1500);
		}
		catch (e) {
			present('Failed to flag patient', 1500);
		}
	}

	async function unFlagPatient() {
		try {
			await HttpService.post(`patients/${props.patient.medicalId}/unflag`,
				{role: currentProfile.getRole()});
			props.updateFlag(false);
			present('Successfully unflagged patient', 1500);
		}
		catch (e) {
			present('Failed to unflag patient', 1500);
		}
	}

	return (
		<IonContent>
			<div id="Container">
				<IonRow>

					<IonCol>
						<IonRow>
							<div>

								<IonText><strong>First Name</strong></IonText>
								<p className="box"> {props.patient.firstName}  </p>
							</div>
						</IonRow>
						<IonRow>
							<div>

								<IonText><strong>Medicare Number</strong></IonText>
								<p className="box">{props.patient.medicalId}</p>
							</div>
						</IonRow>
						<IonRow>
							<div>

								<IonText> <strong>Email</strong></IonText>
								<p className="box">{props.patient.email}</p>
							</div>
						</IonRow>

					</IonCol>
					<IonCol>
						<IonRow>
							<div>

								<IonText><strong>Last Name</strong></IonText>
								<p className="box">{props.patient.lastName}</p>
							</div>
						</IonRow>
						<IonRow>
							<div>

								<IonText><strong>Phone Number</strong></IonText>
								<p className="box">{props.patient.phoneNumber}</p>
							</div>
						</IonRow>

						<IonRow>
							<div>

								<IonText><strong>Date of birth</strong></IonText>
								<p className="box">{props.patient.dob}</p>
							</div>
						</IonRow>

					</IonCol>
					<IonCol>
						<IonRow>
							<div>

								<IonText><strong>Address</strong></IonText>
								<p className="box">{props.patient.address}</p>

							</div>
						</IonRow>

						<IonRow>
							<div>

								<IonText><strong>Test Result</strong></IonText>
								<p className="box">{props.patient.testResult}</p>

							</div>
						</IonRow>

						<IonRow>
							<div>

								<IonText><strong>Gender</strong></IonText>
								<p className="box">{props.patient.gender}</p>

							</div>
						</IonRow>

					</IonCol>
					{
						currentProfile.getRole() != UserType.PATIENT && props.patient.medicalId != '' &&
						<IonCol>
							{props.patient.flagged  &&
							<IonButton color="danger" onClick={() => unFlagPatient()}>
								<IonIcon ios={flag} md={flag}/>
							</IonButton>
							}
							{!props.patient.flagged &&
							<IonButton color="success" onClick={() => flagPatient()}>
								<IonIcon ios={flag} md={flag}/>
							</IonButton>
							}
							</IonCol>
					}

					{currentProfile.getRole() === UserType.PATIENT &&
					<IonRow>
						<div className="button">
							<IonCol> <IonButton onClick={() => {
								setShowModal(true);
							}} className="buttonc">Edit Status</IonButton> </IonCol>
						</div>
					</IonRow>
					}

				</IonRow>
				{currentProfile.getRole() === UserType.DOCTOR &&
				<IonRow>

					<div className="button">

						<IonCol> <IonButton className="buttonc">Symptoms form</IonButton> </IonCol>
						<IonCol> <IonButton className="buttonc">Set an Appointment</IonButton> </IonCol>
						<IonCol> <IonButton className="buttonc">Send Email</IonButton> </IonCol>
					</div>
				</IonRow>}
				{currentProfile.getRole() === UserType.DOCTOR &&
				<IonRow>
					<table className="blueTable">
						<thead>
						<tr>
							<th>Date</th>
							<th>Temperature</th>
							<th>Breathing</th>
							<th>Other Symptoms</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td>cell1_1</td>
							<td>cell2_1</td>
							<td>cell3_1</td>
							<td>cell4_1</td>
						</tr>
						<tr>
							<td>cell1_2</td>
							<td>cell2_2</td>
							<td>cell3_2</td>
							<td>cell4_2</td>
						</tr>
						<tr>
							<td>cell1_3</td>
							<td>cell2_3</td>
							<td>cell3_3</td>
							<td>cell4_3</td>
						</tr>
						</tbody>
					</table>
				</IonRow>
				}
				{currentProfile.getRole() === UserType.DOCTOR &&
				<IonRow>
					<div className="button">
						<IonCol> <IonButton className="buttonc">Add Symptoms</IonButton> </IonCol>
						<IonCol> <IonButton className="buttonc">Modify Symptoms</IonButton> </IonCol>
						<IonCol> <IonButton className="buttonc">Delete Symptoms</IonButton> </IonCol>
					</div>
				</IonRow>
				}
				{currentProfile.getRole() === UserType.DOCTOR &&
				<IonRow>
					<div id="Container2">
						<IonRow>
							<IonCol size="3"><IonLabel>Subject</IonLabel></IonCol>
							<IonCol><IonInput className="login-text-field"></IonInput></IonCol>

						</IonRow>
						<IonRow>
							<IonCol size="3"><IonLabel>Description</IonLabel></IonCol>
							<IonCol><IonInput className="login-text-field"></IonInput></IonCol>
							<IonButton className="buttonc">Add</IonButton>

						</IonRow>

					</div>
				</IonRow>
				}

				<IonModal isOpen={showModal}>
					<IonContent>
						<IonRadioGroup value={status} onIonChange={e => setStatus(e.detail.value)}>
							<IonListHeader>
								<IonLabel>Edit your Status</IonLabel>
							</IonListHeader>
							<IonItem>
								<IonLabel>Positive</IonLabel>
								<IonRadio slot="start" value={TestResult.POSITIVE}/>
							</IonItem>

							<IonItem>
								<IonLabel>Negative</IonLabel>
								<IonRadio slot="start" value={TestResult.NEGATIVE}/>
							</IonItem>

							<IonItem>
								<IonLabel>Not tested/Pending</IonLabel>
								<IonRadio slot="start" value={TestResult.PENDING}/>
							</IonItem>

						</IonRadioGroup>

					</IonContent>
					<IonButton color="success" onClick={() => updateStatus()}>Save</IonButton>
					<IonButton color="danger" onClick={() => setShowModal(false)}>Cancel</IonButton>
				</IonModal>

			</div>
		</IonContent>

	);
};

export default PatientInformation;
