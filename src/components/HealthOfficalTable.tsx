import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow } from '@ionic/react';
import { flag } from 'ionicons/icons';
import './HealthOfficialTable.css';
import logo from '../resources/UserIcon.png'


function HealthOfficialTable() {

    // @ts-ignore
    return (
        <div className='tab'>
            <text>
                <h1>Patients</h1>
            </text>
            <div>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol></IonCol>
                    <IonCol id="confirmed">Confirmed</IonCol>
                    <IonCol id="nonConfirmed">NonConfirmed</IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </div>
            <div id="Container">
                <IonRow id="tableHead">
                    <IonCol></IonCol>
                    <IonCol id="col">PATIENT</IonCol>
                    <IonCol id="col">STATUS</IonCol>
                    <IonCol id="col">LAST UPDATE</IonCol>
                    <IonCol id="col">ACTION</IonCol>
                    <IonCol id="col"></IonCol>
                </IonRow>
                <IonRow id="tableRow">

                    <IonCol><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                    <IonCol id="col">Chris Evans</IonCol>
                    <IonCol id="col"><div id="status">POSITIVE</div></IonCol>
                    <IonCol id="lastUpdate">22/01/2022, 2:00 PM</IonCol>
                    <IonCol id="col"><div id="action">Contact</div></IonCol>
                    <IonCol id="col">...</IonCol>
                </IonRow>

                <IonRow id="tableRow">
                    <IonCol id="col">Selena Gomez</IonCol>
                    <IonCol id="col"><div id="status">POSITIVE</div></IonCol>
                    <IonCol id="lastUpdate">28/01/2022, 6:00 PM</IonCol>
                    <IonCol id="col"><div id="action">Contact</div></IonCol>
                    <IonCol id="col">...</IonCol>

                </IonRow>
            </div>

        </div>

    );
}


export default HealthOfficialTable;
