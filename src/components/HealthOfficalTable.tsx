import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow,IonTitle,IonGrid,IonContent } from '@ionic/react';
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
                <IonRow>
                    <IonCol size="6" class="confirmButton">
                        <IonButton  color= "favorite" >Confirmed</IonButton>
                    </IonCol>
                    <IonCol size="6" class = "unconfirmedButton">
                        <IonButton color= "favorite1" >Unconfirmed</IonButton>
                    </IonCol>
                </IonRow>
            </div>

            <div id="Container">
                <div id = "innerContainer">
                    <IonGrid>
                        <IonRow>
                            <IonCol size ="2" id="headCol">Name</IonCol>
                            <IonCol size ="1" id="headCol">Status</IonCol>
                            <IonCol size ="2" id="headCol">Last Update</IonCol>
                            <IonCol size ="2" id="headCol">Doctor</IonCol>
                            <IonCol size ="1" id="headCol">Days Quarantined</IonCol>
                            <IonCol size ="2" id="headCol">Action</IonCol>
                        </IonRow>
                    </IonGrid>
                </div>

                    <IonGrid>
                        <IonRow id="tableRow" >
                            <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                            <IonCol id="colName" size ="2">Blaine Charles David Earl</IonCol>
                            <IonCol size ="1" ><div id="PosStatus">POSITIVE</div></IonCol>
                            <IonCol id="lastUpdate" size ="2">22/01/2022, 2:00 PM</IonCol>
                            <IonCol id="colName" size ="2" >Dr. Francois Olivier Thibeault</IonCol>
                            <IonCol id="col" size ="1" >1 day</IonCol>
                            <IonCol id="col" size ="2">
                                <IonButton color ="favorite" shape = "round"> Monitor Symptoms </IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow id="tableRow">
                            <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                            <IonCol id="colName" size ="2" >Selena Gomez</IonCol>
                            <IonCol size ="1" ><div id="NegStatus">NEGATIVE</div></IonCol>
                            <IonCol id="lastUpdate" size ="2">22/01/2022, 2:00 PM</IonCol>
                            <IonCol id="colName" size ="2">Dr. MarcAngelo Bracken-Sagiz</IonCol>
                            <IonCol id="col" size ="1" >10 days</IonCol>
                            <IonCol margin-top={"8px"} margin-bottom= {"8px"} id="col" size ="2">
                                <IonButton color ="favorite" shape = "round"> Monitor Symptoms </IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow id="tableRow" >
                            <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                            <IonCol id="colName" size ="2" >Justin Blue</IonCol>
                            <IonCol size ="1" ><div id="PosStatus">POSITIVE</div></IonCol>
                            <IonCol id="lastUpdate" size ="2">22/01/2022, 2:00 PM</IonCol>
                            <IonCol id="colName" size ="2">Dr. Kerolos Wahba</IonCol>
                            <IonCol id="col" size ="1" >5 days</IonCol>
                            <IonCol id="col" size ="2">
                                <IonButton color ="favorite" shape = "round"> Monitor Symptoms </IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow id="tableRow">
                            <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                            <IonCol id="colName" size ="2"  >Bob Troy</IonCol>
                            <IonCol size ="1" ><div id="PosStatus">POSITIVE</div></IonCol>
                            <IonCol id="lastUpdate" size ="2">22/01/2022, 2:00 PM</IonCol>
                            <IonCol id="colName" size ="2">Dr. Vithya Nagamuthu</IonCol>
                            <IonCol id="col" size ="1" >3 days</IonCol>
                            <IonCol id="col" size ="2">
                                <IonButton color ="favorite" shape = "round"> Monitor Symptoms </IonButton>
                            </IonCol>
                        </IonRow>

                        <IonRow id="tableRow">
                            <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                            <IonCol id="colName" size ="2" >Blaine Charles David Earl</IonCol>
                            <IonCol size ="1"><div id="NegStatus">NEGATIVE</div></IonCol>
                            <IonCol id="lastUpdate" size ="2">22/01/2022, 2:00 PM</IonCol>
                            <IonCol id="colName" size ="2">Dr. Sarah Salib</IonCol>
                            <IonCol id="col" size ="1" >2 days</IonCol>
                            <IonCol id="col" size ="2">
                                <IonButton color ="favorite" shape = "round"> Monitor Symptoms </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
            </div>
        </div>
    );
}
export default HealthOfficialTable;
