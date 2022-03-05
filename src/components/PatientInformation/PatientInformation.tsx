import {
	IonButton, IonCheckbox,
	IonCol,
	IonContent, IonIcon,
	IonInput, IonItem,
	IonLabel, IonListHeader, IonModal, IonRadio, IonRadioGroup,
	IonRow,
	IonText, IonTitle, useIonToast
} from '@ionic/react';
import './PatientInformation.css';
import { IPatient } from '../../interfaces/IPatient';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import React, { useState } from 'react';
import { TestResult } from '../../enum/TestResult.enum';
import HttpService from '../../providers/http.service';
import { flag } from 'ionicons/icons';
import { ISymptom, ISymptomResponse, ISymptomTable } from '../../interfaces/ISymptom';
import Moment from 'react-moment';
import 'moment-timezone';


const PatientInformation: React.FC<{ patient: IPatient, updateStatus: (status: TestResult) => void, updateFlag: (bool: boolean) => void,
	symptomsList: ISymptom[], symptomsResponse: ISymptomResponse[] }> = (props) => {

		const {currentProfile} = useAuth();
		const [showStatusModal, setShowStatusModal] = useState(false);
		const [showSymptomsModal, setShowSymptomsModal] = useState(false);
		const [status, setStatus] = useState(props.patient.testResult);
		const [present] = useIonToast();
		const [seeSymptoms, setSeeSymptoms] = useState<boolean>(false);
		const [symptomsTable, setSymptomsTable] = useState<Map<Date, ISymptomTable[]>>(new Map<Date, ISymptomTable[]>());

		async function updateStatus() {
			if (currentProfile.testResult == status) {
				return;
			}
			try {
				await HttpService.patch(`patients/${currentProfile.id}/status`, {status: status});
				props.updateStatus(status);
				setShowStatusModal(false);
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
			} catch (e) {
				present('Failed to flag patient', 1500);
			}
		}

		async function unFlagPatient() {
			try {
				await HttpService.post(`patients/${props.patient.medicalId}/unflag`,
					{role: currentProfile.getRole()});
				props.updateFlag(false);
				present('Successfully unflagged patient', 1500);
			} catch (e) {
				present('Failed to unflag patient', 1500);
			}
		}

		function handleCheck(e: string) {
			if (!props.symptomsList) {
				return;
			}
			for (const symp of props.symptomsList) {
				if (symp.name === e) {
					symp.isChecked = true;
					break;
				}
			}
		}

		async function submitSymptoms() {
			if (!props.symptomsList) {
				return;
			}
			const symptomsToRequest: string[] = [];
			for (const symp of props.symptomsList) {
				if (symp.isChecked) {
					symptomsToRequest.push(symp.name);
				}
			}
			if (symptomsToRequest.length ==0) {
				present('Please select symptoms to request', 1500);
				return;
			}
			try {
				await HttpService.post(`doctors/${currentProfile.id}/patient/${props.patient.medicalId}/symptoms`, {
					checklist: symptomsToRequest
				});
				setShowSymptomsModal(false);
				present('Successfully requested symptoms', 1500);
			}
			catch (e) {
				present('You already have a pending request', 1500);
			}
		}

		function generateSymptomsTable() {
			if (!props.symptomsList || !props.symptomsResponse) {
				return;
			}
			const symptomsTableMap = new Map<Date, ISymptomTable[]>();

			for (let i=0; i<props.symptomsResponse.length; i++) {
				if (i==0) {
					symptomsTableMap.set(props.symptomsResponse[i].onDate, []);
				}
				if (i > 0 && props.symptomsResponse[i].onDate != props.symptomsResponse[i-1].onDate) {
					symptomsTableMap.set(props.symptomsResponse[i].onDate, []);
				}
			}
			mapResponseToRow(symptomsTableMap);
		}

		function mapResponseToRow(symptomsTableMap: Map<Date, ISymptomTable[]>) {
			for (const [key , value] of symptomsTableMap) {
				for (let i=0; i< props.symptomsList.length; i++) {
					for (const response of props.symptomsResponse) {
						if (props.symptomsList[i].name == response.name && response.onDate == key) {
							value[i] = {name: response.name, description: response.description,
								response: response.response};
						}
						else {
							if (!value[i]) {
								value[i] = {name: props.symptomsList[i].name, description: props.symptomsList[i].description,
									response: undefined};
							}

						}
					}

				}
			}
			setSymptomsTable(symptomsTableMap);
			setSeeSymptoms(true);
		}


		return (
			<IonContent>

				{props.patient.medicalId == '' && <IonTitle>
					<IonLabel>Enter the medical ID of a patient above and hit search</IonLabel>
				</IonTitle>}

				{props.patient.medicalId != '' &&


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
							{props.patient.flagged &&
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
								setShowStatusModal(true);
							}} className="buttonc">Edit Status</IonButton> </IonCol>
						</div>
					</IonRow>
					}

				</IonRow>
				{
					currentProfile.getRole() === UserType.DOCTOR &&
				<IonRow>

					<div className="button">

						<IonCol> <IonButton className="buttonc" onClick={() => setShowSymptomsModal(true)}>Request
							symptoms update</IonButton> </IonCol>
						<IonCol> <IonButton className="buttonc">Set an Appointment</IonButton> </IonCol>
						<IonCol> <IonButton className="buttonc">Send Email</IonButton> </IonCol>
						{
							props.symptomsResponse && props.symptomsResponse.length > 0 && props.symptomsList && !seeSymptoms &&
							<IonCol> <IonButton className="buttonc" onClick={()=> { generateSymptomsTable();} }>See Symptoms</IonButton></IonCol>
						}
						{
							seeSymptoms && <IonCol> <IonButton className="buttonc" onClick={()=> { setSeeSymptoms(false);} }>Hide Symptoms</IonButton></IonCol>
						}

					</div>
				</IonRow>
				}
				{
					currentProfile.getRole() === UserType.DOCTOR &&
				<IonRow>
					{
						props.symptomsResponse.length == 0 && !seeSymptoms && <IonTitle>
							<IonLabel>The patient has not submitted a Symptoms form yet</IonLabel>
						</IonTitle>
					}
					{
						props.symptomsList && props.symptomsResponse && seeSymptoms &&
					<table className="blueTable">
						<caption><IonLabel>Patient&rsquo;s Symptom updates</IonLabel></caption>
						<thead>
							<tr>
								{
									props.symptomsList.map((el, index) => <th
										key={index}>
										{el.description}</th>)
								}
								<th>Updated on</th>
							</tr>
						</thead>
						<tbody>
							{
								Array.from(symptomsTable).map((el, index1) => {
									return (
										<tr key={index1}>{ el[1].map((el, index2) => {
											if (el.response == true || el.response == false) {
												return <td key={index1+ '-'+ index2}>{el.response? 'Yes':'No'}</td>;
											}
											else {
												return <td key={index1+ '-'+ index2}>Not Requested</td>;
											}
										}) }
										<td key={index1}><Moment  date={el[0]}/></td></tr>
									);
								})
							}
						</tbody>
					</table>
					}
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

				<IonModal isOpen={showStatusModal}>
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
					<IonButton color="danger" onClick={() => setShowStatusModal(false)}>Cancel</IonButton>
				</IonModal>

				<IonModal isOpen={showSymptomsModal}>
					<IonContent>

						{props.symptomsList && props.symptomsList.map((el, index) => <IonItem
							key={index}>
							<IonCheckbox value={el.name} checked={el.isChecked} onIonChange={e => handleCheck(e.detail.value)} />
							<IonLabel>{el.description}</IonLabel></IonItem>)}

					</IonContent>
					<IonButton color="success" onClick={() => submitSymptoms()}>Request</IonButton>
					<IonButton color="danger" onClick={() => setShowSymptomsModal(false)}>Cancel</IonButton>
				</IonModal>

			</div>

				}
			</IonContent>

		);
	};

export default PatientInformation;
