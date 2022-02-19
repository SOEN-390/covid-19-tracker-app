import { IonButton, IonCol, IonContent, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import { useAuth } from '../../providers/auth.provider';
import HttpService from '../../providers/http.service';
import { TestResult } from '../../enum/TestResult.enum';
import PatientsTable from '../../components/PatientsTable/PatientsTable';
import { UserType } from '../../enum/UserType.enum';

const PatientsDoctorPage: React.FC = () => {
    const [patientsArray, setPatientsArray] = useState<IPatientTableRow[]>([]);
    const [patientsTableRow, setPatientsTableRow] = useState<IPatientTableRow[]>([]);
    const {currentProfile} = useAuth();
    const [tableSelection, setTableSelection] = useState<'confirmed' | 'unconfirmed'>('confirmed');

    useEffect(() => {
        getAssignedPatients();
    }, []);

    useEffect(() => {
        if (tableSelection === 'confirmed') {
            getAssignedConfirmedPatients();
        } else {
            getAssignedUnconfirmedPatients();
        }
    }, [patientsArray]);

    function getAssignedPatients() {
        HttpService.get(`doctors/${currentProfile.id}/patients/assigned`).then((patients: IPatientTableRow[]) => {
            setPatientsArray(patients);
        }).catch((error) => {
            console.log('ERROR: ', error);
        });
    }

    function getAssignedConfirmedPatients() {
        const patientTableRow: IPatientTableRow[] = [];
        for (let patient of patientsArray) {
            if (patient?.testResult === TestResult.POSITIVE || patient?.testResult === TestResult.NEGATIVE) {
                patientTableRow.push(patient);
            }
        }
        setTableSelection('confirmed');
        setPatientsTableRow(patientTableRow);
    }

    function getAssignedUnconfirmedPatients() {
        const patientTableRow: IPatientTableRow[] = [];
        for (let patient of patientsArray) {
            if (patient?.testResult === TestResult.PENDING || patient?.testResult === null) {
                patientTableRow.push(patient);
            }
        }
        setTableSelection('unconfirmed');
        setPatientsTableRow(patientTableRow);
    }


    return (
        <IonPage>
            <IonToolbar>
                <NavBar/>
            </IonToolbar>
            <IonContent>
                <IonTitle id="patientHeader">Patients</IonTitle>
                <div>
                    <IonRow>
                        <IonCol/>
                        <IonCol class="confirmButton">
                            <IonButton color={tableSelection === 'confirmed' ? 'favorite1' : 'favorite'}
                                       onClick={getAssignedConfirmedPatients}>Confirmed</IonButton>
                        </IonCol>
                        <IonCol class="unconfirmedButton">
                            <IonButton color={tableSelection === 'unconfirmed' ? 'favorite1' : 'favorite'}
                                       onClick={getAssignedUnconfirmedPatients}>UnConfirmed</IonButton>
                        </IonCol>
                        <IonCol/>
                    </IonRow>
                </div>
                {
                    patientsArray !== undefined ?
                        <PatientsTable currentUserType={UserType.DOCTOR} patientTableRows={patientsTableRow}/> :
                        null
                }
            </IonContent>
        </IonPage>
    );
}

export default PatientsDoctorPage;
