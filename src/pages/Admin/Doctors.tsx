import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow,IonTitle,IonGrid,IonContent, IonPage, IonToolbar } from '@ionic/react';
import { flag } from 'ionicons/icons';
import '../../components/HealthOfficialTable.css';
import logo from '../../resources/UserIcon.png'
import { IonReactHashRouter } from '@ionic/react-router';
import NavBar from '../../components/NavBar';


interface patient {
    Name: string;
    Status: string;
    LastUpdate: string;
    Doctor: string;
    DaysQuarantined: string;

}
const patients: patient[] = [
    {
        Name: 'James',
        Status: 'POSITIVE',
        LastUpdate: '2/01/2022, 2:00 PM',
        Doctor: 'Dr. MarcAngelo Bracken-Sagiz',
        DaysQuarantined: '12',
    },
    {
        Name: 'Charles',
        Status: 'NEGATIVE',
        LastUpdate: '2/01/2022, 2:00 PM',
        Doctor: 'Dr. MarcAngelo Bracken-Sagiz',
        DaysQuarantined: '12',
    },
    {
        Name: 'Charles',
        Status: 'POSITIVE',
        LastUpdate: '2/01/2022, 2:00 PM',
        Doctor: '',
        DaysQuarantined: '12',
    },
    {
        Name: 'Charles',
        Status: 'POSITIVE',
        LastUpdate: '2/01/2022, 2:00 PM',
        Doctor: 'Dr. MarcAngelo Bracken-Sagiz',
        DaysQuarantined: '12',
    },
];


const Doctors: React.FC = () =>{

    // @ts-ignore
    return (
        <IonPage>
        <IonToolbar>
        <NavBar/>

        <div className='tab'>
            <text>
                <IonTitle id="patientHeader">Doctors</IonTitle>
            </text>

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


                {patients.map((patient, index) => {
                        return (
                            <IonGrid key={index} >
                                <IonRow id="tableRow">
                                <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                                <IonCol id="colName" size ="2">{patient.Name}</IonCol>
                                <IonCol size ="1" ><div id={patient.Status=='POSITIVE'?"PosStatus":"NegStatus"}>{patient.Status}</div></IonCol>
                                <IonCol id="lastUpdate" size ="2">{patient.LastUpdate}</IonCol>
                                <IonCol id="colName" size ="2" >{patient.Doctor==''?'---':patient.Doctor}</IonCol>
                                <IonCol id="col" size ="1" >{patient.DaysQuarantined}</IonCol>
                                <IonCol id="col" size ="2">
                                    <IonButton color ="favorite" shape = "round"> {patient.Doctor==''?'ASSIGN':'UNASSIGN'} </IonButton>
                                </IonCol>

                                </IonRow>
                            </IonGrid>
                        );
                    })
                    }

                    
            </div>
        </div>
        </IonToolbar>
        </IonPage>
    );
}
export default Doctors;
