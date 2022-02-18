import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import * as React from 'react';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';

const PatientsPage: React.FC = () => {

    function createData(
        firstName: string,
        lastName: string,
        testResult: string,
        lastUpdate: string,
        doctorName: string,
        action: string,
        priority: string,
        monitor_symptoms: string
    ): IPatientTableRow {
        return {firstName, lastName, testResult, lastUpdate, action, doctorName, priority, monitor_symptoms};
    }

    const rows = [
        createData('Sarah Salib', 'Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah', 'Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', '')
    ];

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
                <PatientsTable patientTableRows={rows}/>
            </IonContent>

        </IonPage>
    );
};

export default PatientsPage;
