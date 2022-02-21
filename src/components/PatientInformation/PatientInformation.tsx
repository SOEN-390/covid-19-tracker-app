import { IonAvatar, IonButton, IonCol, IonContent, IonImg, IonInput, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import './PatientInformation.css';
import logo from '../../resources/icon.png'
import HttpService from '../../providers/http.service';
import { useState } from 'react';



const PatientInformation: React.FC = () => {
    const [firstName, setfirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [medicalNumber, setMedicalNumber] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    HttpService.get(`patients/${55}`).then(async (response) => {
        const data = await response.json();
        setfirstName(data.firstName)
        setLastName(data.lastName)

    }).catch((error) => {
    });



    return (
        <IonContent>
            <div id='Container'>

                <IonRow>
                    <IonCol size='2'>
                        <IonAvatar>
                            <IonImg src={logo} />
                        </IonAvatar></IonCol>
                    <IonCol>
                        <IonRow>
                            <div>

                                <IonText><strong>First Name</strong></IonText>
                                <p className='box'> {firstName}  </p>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText><strong>Medicare Number</strong></IonText>
                                <p className='box'>EVAN 2022 3900</p>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText> <strong>Email</strong></IonText>
                                <p className='box'>Chirs_evans@gmail.com</p>
                            </div>
                        </IonRow>

                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <div>

                                <IonText><strong>Last Name</strong></IonText>
                                <p className='box'>{lastName}</p>
                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText><strong>Phone Number</strong></IonText>
                                <p className='box'>(514)-911-9110</p>
                            </div>
                        </IonRow>


                    </IonCol>
                    <IonCol>
                        <IonRow>
                            <div>

                                <IonText><strong>Address</strong></IonText>
                                <p className='box'>123 rue street st tariq</p>

                            </div>
                        </IonRow>
                        <IonRow>
                            <div>

                                <IonText><strong>Postal Code</strong></IonText>
                                <p className='box'>H9j 2v6</p>
                            </div>
                        </IonRow>


                    </IonCol>


                </IonRow>
                <IonRow>
                    <div className='button'>
                        <IonCol> <IonButton className='buttonc'>Symptoms form</IonButton> </IonCol>
                        <IonCol> <IonButton className='buttonc'>Set an Appoiment</IonButton> </IonCol>
                        <IonCol> <IonButton className='buttonc'>Send Email</IonButton> </IonCol>
                    </div>
                </IonRow>
                <IonRow>
                    <table className="blueTable">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Temperature</th>
                                <th>Breathing</th>
                                <th>Other Symptomes</th>
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
                    <div className='button'>
                        <IonCol> <IonButton className='buttonc'>Add Symptomes</IonButton> </IonCol>
                        <IonCol> <IonButton className='buttonc'>Modify Symptomes</IonButton> </IonCol>
                        <IonCol> <IonButton className='buttonc'>Delete Symptomes</IonButton> </IonCol>
                    </div>
                </IonRow>
                <IonRow>
                    <div id='Container2'>
                        <IonRow>
                            <IonCol size='3'><IonLabel>Subject</IonLabel></IonCol>
                            <IonCol ><IonInput className='login-text-field'></IonInput></IonCol>

                        </IonRow>
                        <IonRow>
                            <IonCol size='3'><IonLabel>Description</IonLabel></IonCol>
                            <IonCol><IonInput className='login-text-field'></IonInput></IonCol>
                            <IonButton className='buttonc'>Add</IonButton>

                        </IonRow>

                    </div>
                </IonRow>



            </div>
        </IonContent>
    );
}

export default PatientInformation;
