import { IonAvatar, IonButton, IonCol, IonContent, IonImg, IonInput, IonLabel, IonRow, IonText } from '@ionic/react';
import './PatientInformation.css';
import logo from '../../resources/icon.png';
import { IPatient } from '../../interfaces/IPatient';
import { useAuth } from '../../providers/auth.provider';
import { UserType } from '../../enum/UserType.enum';
import React from 'react';

const PatientInformation: React.FC<{ patient: IPatient }> = (props) => {
	const {currentProfile} = useAuth();


	return (
		<IonContent>
			<div id="Container">

				<IonRow>
					<IonCol size="2">
						<IonAvatar>
							<IonImg src={logo}/>
						</IonAvatar></IonCol>
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
								<IonCol><IonInput className="login-text-field"/></IonCol>
							</IonRow>
							<IonRow>
								<IonCol size="3"><IonLabel>Description</IonLabel></IonCol>
								<IonCol><IonInput className="login-text-field"/></IonCol>
								<IonButton className="buttonc">Add</IonButton>
							</IonRow>

						</div>
					</IonRow>
				}

			</div>
		</IonContent>
	);
};

export default PatientInformation;
