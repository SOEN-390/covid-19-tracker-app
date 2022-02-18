import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useState, useEffect } from 'react';
import NavBar from '../../components/NavBar';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import HttpService from '../../providers/http.service';
import { DoctorPages } from '../../providers/pages.enum';
import { useAuth } from '../../providers/auth.provider';

const ConfirmedPatientsTable: React.FC = () => {
    const [patientsArray, setPatientsArray] = useState<IPatientTableRow[]>();
    const {currentProfile } = useAuth();

    useEffect(() => {
        getAssignedPatients();
    }, []);

    async function getAssignedPatients() {
        if (!currentProfile) {
            return;
        }
        HttpService.get(`doctors/${currentProfile.id}/patients/assigned`).then(async (response) => {
            console.log('HERE IS THE DATA IN JSON FORM: ', response);
            setPatientsArray(response);
        }).catch((error) => {
            console.log('ERROR: ', error);
        });
    }


    return (
        <IonPage>
            <IonToolbar>
                <NavBar />
            </IonToolbar>
            <IonContent>
                <IonTitle id="patientHeader">Patients</IonTitle>
                <div>
                    <IonRow>
                        <IonCol />
                        {/*These buttons will change the request and rows!*/}
                        <IonCol class="confirmButton">
                            <IonButton color="favorite1" routerLink={DoctorPages.assignedConfirmed}>Assigned</IonButton>
                        </IonCol>
                        <IonCol class="unconfirmedButton">
                            <IonButton id="con" color="favorite" routerLink={DoctorPages.unAssignedConfirmed}>UnAssigned</IonButton>
                        </IonCol>
                        <IonCol />
                    </IonRow>
                </div>
                {
                    patientsArray !== undefined ? <PatientsTable patientTableRows={patientsArray} /> : null
                }
            </IonContent>
        </IonPage>
    );
}

export default ConfirmedPatientsTable;
