import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import * as React from 'react';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import { UserType } from '../../enum/UserType.enum';
import { useEffect, useState } from 'react';
import HttpService from '../../providers/http.service';

const PatientsPage: React.FC = () => {


    const [patientsArray, setPatientsArray]= useState <IPatientTableRow[]> ()

    useEffect(() => {
        patientsRetrieval();
      }, []);

    async function patientsRetrieval() {
        HttpService.get(`patients/all`).then(async (response) => {
            console.log('HERE IS THE DATA IN JSON FORM: ', response);
            setPatientsArray(response);
        }).catch((error) => {
            console.log('ERROR: ', error);
        });
    }

    return (
        <IonPage>

            <IonToolbar>
                <NavBar/>
            </IonToolbar>
            <IonContent>
                <IonTitle id="title"> Patients </IonTitle>
                <div>
                    <IonRow>
                        <IonCol/>
                        {/*These buttons will change the request and rows!*/}
                        <IonCol class="confirmButton"> <IonButton id="con"
                                                                  color="favorite">Confirmed</IonButton></IonCol>
                        <IonCol class="unconfirmedButton"><IonButton color="favorite1">Unconfirmed</IonButton></IonCol>
                        <IonCol/>
                    </IonRow>
                </div>
                {
                    patientsArray !== undefined ?
                        <PatientsTable currentUserType={UserType.HEALTH_OFFICIAL} patientTableRows={patientsArray} /> :
                        null
                }            
            </IonContent>

        </IonPage>
    );
};

export default PatientsPage;
