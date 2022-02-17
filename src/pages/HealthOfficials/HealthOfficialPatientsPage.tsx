import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';
import HealthOfficialTable from '../../components/HealthOfficialTable';
import * as React from 'react';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';

const HealthOfficialPatientsPage: React.FC = () => {

    function createData(
        name: string,
        status: string,
        last_update: string,
        doctor: string,
        action: string,
        priority: string,
        monitor_symptoms: string
    ): IPatientTableRow {
        return {name, status, last_update, action, doctor, priority, monitor_symptoms};
    }

    const rows = [
        createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', ''),
        createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1', '')
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
                <HealthOfficialTable patientTableRows={rows}/>
            </IonContent>

        </IonPage>
    );
};

export default HealthOfficialPatientsPage;
