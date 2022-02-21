import { IonAvatar, IonButton, IonCol, IonContent, IonImg, IonInput, IonLabel, IonRow, IonText } from '@ionic/react';
import './PatientInformation.css';
import logo from '../../resources/icon.png'
import HttpService from '../../providers/http.service';
import { useState } from 'react';


const PatientInformation: React.FC = () => {
    const [medicalNumber, setMedicalNumber] = useState('')
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [testResult, setTestResult] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [dob, setDOB] = useState('');
    const [gender, setGender] = useState('');


    HttpService.get(`patients/${55}`).then(async (data) => {
        setData(data);
    }).catch((error) => {
        console.log(error);
    });

    function setData(data: any) {
        setMedicalNumber(data.medicalId);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setTestResult(data.testResult);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setEmail(data.email);
        setDOB(data.dob);
        setGender(data.gender);
    }


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
                                <p className="box"> {firstName}  </p>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText><strong>Medicare Number</strong></IonText>
                                <p className="box">{medicalNumber}</p>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText> <strong>Email</strong></IonText>
                                <p className="box">{email}</p>
                            </div>
                        </IonRow>

                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <div>

                                <IonText><strong>Last Name</strong></IonText>
                                <p className="box">{lastName}</p>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText><strong>Phone Number</strong></IonText>
                                <p className="box">{phoneNumber}</p>
                            </div>
                        </IonRow>

                        <IonRow>
                            <div>

                                <IonText><strong>Date of birth</strong></IonText>
                                <p className="box">{dob}</p>
                            </div>
                        </IonRow>


                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <div>

                                <IonText><strong>Address</strong></IonText>
                                <p className="box">{address}</p>

                            </div>
                        </IonRow>

                        <IonRow>
                            <div>

                                <IonText><strong>Test Result</strong></IonText>
                                <p className="box">{testResult}</p>

                            </div>
                        </IonRow>

                        <IonRow>
                            <div>

                                <IonText><strong>Gender</strong></IonText>
                                <p className="box">{gender}</p>

                            </div>
                        </IonRow>

                    </IonCol>


                </IonRow>
                <IonRow>
                    <div className="button">
                        <IonCol> <IonButton className="buttonc">Symptoms form</IonButton> </IonCol>
                        <IonCol> <IonButton className="buttonc">Set an Appointment</IonButton> </IonCol>
                        <IonCol> <IonButton className="buttonc">Send Email</IonButton> </IonCol>
                    </div>
                </IonRow>
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
                <IonRow>
                    <div className="button">
                        <IonCol> <IonButton className="buttonc">Add Symptoms</IonButton> </IonCol>
                        <IonCol> <IonButton className="buttonc">Modify Symptoms</IonButton> </IonCol>
                        <IonCol> <IonButton className="buttonc">Delete Symptoms</IonButton> </IonCol>
                    </div>
                </IonRow>
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


            </div>
        </IonContent>
    );
}

export default PatientInformation;
