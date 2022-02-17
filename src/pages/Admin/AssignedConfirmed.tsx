import { IonAvatar, IonButton, IonCol, IonRow,IonTitle,IonGrid, IonPage, IonToolbar, IonText } from '@ionic/react';
import '../../components/HealthOfficialTable.css';
import logo from '../../resources/UserIcon.png'
import NavBar from '../../components/NavBar';
import { Pages } from '../../providers/pages.enum';
import { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';


interface patientSchema {
    firstName: string, 
    lastName: string, 
    testResult:string|null,
    LastUpdate: Date;
    DoctorName: string;
    DaysQuarantined: string;
}


const AssignedConfirmed: React.FC = () =>{
    const [patientsArray, setPatientsArray]= useState <patientSchema[]> ()

    useEffect(() => {
        patientsRetrieval();
      }, []);

    async function patientsRetrieval() {
       
        HttpService.get(`patients/all`).then(async (response) => {
            const data: Array<patientSchema> = await response.json();
            console.log('HERE IS THE DATA IN JSON FORM: ', data);
            setPatientsArray(data);
        }).catch((error) => {
            console.log('ERROR: ', error);
        });
    }

    return (
        <IonPage>
        <IonToolbar>
        <NavBar/>

        <div className='tab'>
            <IonText>
                <IonTitle id="patientHeader">Patients</IonTitle>
            </IonText>
            <div>
                <IonRow>
                    <IonCol size="6" class="confirmButton">
                        <IonButton  color= "favorite" routerLink={Pages.assignedConfirmed} >ASSIGNED</IonButton>
                    </IonCol>
                    <IonCol size="6" class = "unconfirmedButton">
                        <IonButton color= "favorite1" routerLink={Pages.unAssignedConfirmed}>UNASSIGNED</IonButton>
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

                {patientsArray? patientsArray.map((patient, index) => {
                        return (
                            <IonGrid key={index} >
                                <IonRow id="tableRow">
                                <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                                <IonCol id="colName" size ="2">{patient.firstName+' '+patient.lastName}</IonCol>
                                <IonCol size ="1" ><div id={patient.testResult=='positive'?"PosStatus":"NegStatus"}>{patient.testResult==null?'Negative':'Positive'}</div></IonCol>
                                <IonCol id="lastUpdate" size ="2">September 10, 2021</IonCol>
                                <IonCol id="colName" size ="1" >Dr.Sarah</IonCol>
                                <IonCol id="col" size ="1" > 15 Days</IonCol>
                                <IonCol id="col" size ="2">
                                    <IonButton color ="favorite" shape = "round"> UNASSIGN </IonButton>
                                </IonCol>

                                </IonRow>
                            </IonGrid>
                        );
                    }):null
                    }
            </div>
        </div>
        </IonToolbar>
        </IonPage>
    );
}
export default AssignedConfirmed;

