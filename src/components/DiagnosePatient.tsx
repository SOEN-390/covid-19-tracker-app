import { IonAvatar, IonButton, IonCard, IonCardContent, IonCol, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonRow, IonText } from '@ionic/react';
import './DiagnosePatient.css';
import logo from '../resources/icon.png'


function DiagnosePatient() {



    return (
        <IonContent>
            <div id='Container'>

                <IonRow>
                    <IonCol size='2'>
                        <IonAvatar>
                            <IonImg className='imgg' src={logo} />
                        </IonAvatar></IonCol>
                    <IonCol>
                        <IonRow>
                            <div>

                                <IonText><strong>First Name</strong></IonText>
                                <p className='box'>Chirs</p>
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
                                <p className='box'>Evans</p>
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


            </div>
        </IonContent>
    );
}

export default DiagnosePatient;
