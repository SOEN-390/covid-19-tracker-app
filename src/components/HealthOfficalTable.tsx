import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow, IonTitle, IonGrid, IonContent } from '@ionic/react';
import { flag } from 'ionicons/icons';
import './HealthOfficialTable.css';
import logo from '../resources/UserIcon.png'
import { IonReactHashRouter } from '@ionic/react-router';


function HealthOfficialTable() {

    // @ts-ignore
    return (

        <div className='tab'>
            <text>
                <IonTitle id="patientHeader">Patients</IonTitle>
            </text>
            <div>
                {/* Unconfirmed and Confirmed Buttons located at the top of table for user to pick*/}
                <IonRow>
                    <IonCol size="6" class="confirmButton">
                        <IonButton color="favorite">Confirmed</IonButton>
                    </IonCol>
                    <IonCol size="6" class="unconfirmedButton">
                        <IonButton color="favorite1">Unconfirmed</IonButton>
                    </IonCol>
                </IonRow>
            </div>

            {/* All info related to patients */}
            <div id="Container">
                <div id="innerContainer">
                    <IonGrid>
                        <IonRow>
                            <IonCol id="headCol" size = "2">Name</IonCol>
                            <IonCol id="headCol">Status</IonCol>
                            <IonCol id="headCol">Last Update</IonCol>
                            <IonCol id="headCol">Doctor</IonCol>
                            <IonCol id="headCol">Days QUAR</IonCol>
                            <IonCol id="headCol">Action</IonCol>
                            <IonCol id="headCol">Priority</IonCol>
                            <IonCol id="headCol"></IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                {/* Each row has info of patient in the columns*/}
                <IonGrid>

                    {/* Patients with positive status*/}
                    <IonRow id="tableRow">
                        <IonCol size="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                        <IonCol id="colName" size = "2" >Blaine Charles </IonCol>
                        <IonCol >
                            <div id="PosStatus">POSITIVE</div>
                        </IonCol>
                        <IonCol id="lastUpdate" >22/01/2022, 2:00 PM</IonCol>
                        <IonCol id="colDoc" >Dr. Francois Olivier</IonCol>
                        <IonCol id="col" >1 day</IonCol>
                        <IonCol id="col" >
                            <IonButton color="favorite" shape="round"> Contact </IonButton>
                        </IonCol>
                        <IonCol>
                        </IonCol>
                        <IonCol id="col" >
                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow id="tableRow">
                        <IonCol size="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                        <IonCol id="colName" size="2">Justin Blue</IonCol>
                        <IonCol size="1">
                            <div id="PosStatus">POSITIVE</div>
                        </IonCol>
                        <IonCol id="lastUpdate" size="2">22/01/2022, 2:00 PM</IonCol>
                        <IonCol id="colName" size="2">Dr. Kerolos Wahba</IonCol>
                        <IonCol id="col" size="1">5 days</IonCol>
                        <IonCol id="col" size="2">
                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow id="tableRow">
                        <IonCol size="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                        <IonCol id="colName" size="2">Bob Troy</IonCol>
                        <IonCol size="1">
                            <div id="PosStatus">POSITIVE</div>
                        </IonCol>
                        <IonCol id="lastUpdate" size="2">22/01/2022, 2:00 PM</IonCol>
                        <IonCol id="colName" size="2">Dr. Vithya Nagamuthu</IonCol>
                        <IonCol id="col" size="1">3 days</IonCol>
                        <IonCol id="col" size="2">
                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                        </IonCol>
                    </IonRow>

                    {/*Patients with Negative status (for testing purposes)*/}
                    <IonRow id="tableRow">
                        <IonCol size="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                        <IonCol id="colName" size="2">Selena Gomez</IonCol>
                        <IonCol size="1">
                            <div id="NegStatus">NEGATIVE</div>
                        </IonCol>
                        <IonCol id="lastUpdate" size="2">22/01/2022, 2:00 PM</IonCol>
                        <IonCol id="colName" size="2">Dr. MarcAngelo Bracken</IonCol>
                        <IonCol id="col" size="1">10 days</IonCol>
                        <IonCol margin-top={'8px'} margin-bottom={'8px'} id="col" size="2">
                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                        </IonCol>
                    </IonRow>

                    <IonRow id="tableRow">
                        <IonCol size="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                        <IonCol id="colName" size="2">Blaine Charles David Earl</IonCol>
                        <IonCol size="1">
                            <div id="NegStatus">NEGATIVE</div>
                        </IonCol>
                        <IonCol id="lastUpdate" size="2">22/01/2022, 2:00 PM</IonCol>
                        <IonCol id="colName" size="2">Dr. Sarah Salib</IonCol>
                        <IonCol id="col" size="1">2 days</IonCol>
                        <IonCol id="col" size="2">
                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </div>
        </div>
    );
}

export default HealthOfficialTable;
