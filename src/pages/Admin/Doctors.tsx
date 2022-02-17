import { IonAvatar,  IonCol,  IonRow,IonTitle,IonGrid, IonPage, IonToolbar, IonText } from '@ionic/react';
import '../../components/HealthOfficialTable.css';
import logo from '../../resources/UserIcon.png'
import NavBar from '../../components/NavBar';
import { useState, useEffect } from 'react';
import HttpService from '../../providers/http.service';


interface doctortSchema {
    firstName: string, 
    lastName: string, 
    licenseId: string,
    phoneNumber:string,
    address: Date;
    email: string;
}


const Doctors: React.FC = () =>{

    const [doctorsArray, setDoctorssArray]= useState <doctortSchema[]> ()

    useEffect(() => {
        doctorssRetrieval();
      }, []);

      async function doctorssRetrieval() {
        HttpService.get(`doctors/all`).then(async (response) => {
            console.log('HERE IS THE DATA IN JSON FORM: ', response);
            setDoctorssArray(response);
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
                <IonTitle id="patientHeader">Doctors</IonTitle>
            </IonText>

            <div id="Container">
                <div id = "innerContainer">
                    <IonGrid>
                        <IonRow>
                            <IonCol size ="1" id="headCol">Name</IonCol>
                            <IonCol size ="1" id="headCol">LicenseId</IonCol>
                            <IonCol size ="2" id="headCol">PhoneNumber</IonCol>
                            <IonCol size ="2" id="headCol">Address</IonCol>
                            <IonCol size ="1" id="headCol">Email</IonCol>
                        </IonRow>
                    </IonGrid>
                </div>


                {doctorsArray? doctorsArray.map((doctor, index) => {
                        return (
                            <IonGrid key={index} >
                                <IonRow id="tableRow">
                                <IonCol size ="1px"><IonAvatar><img src={logo}/></IonAvatar></IonCol>
                                <IonCol id="colName" size ="1.5">{doctor.firstName+' '+doctor.lastName}</IonCol>
                                <IonCol id="colName" size="1.5">{doctor.licenseId}</IonCol>
                                <IonCol id="colName" size="2">{doctor.phoneNumber}</IonCol>
                                <IonCol id="colName" size ="1" >{doctor.address}</IonCol>
                                <IonCol id="col" size ="2" >{doctor.email}</IonCol>
                                

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
export default Doctors;
