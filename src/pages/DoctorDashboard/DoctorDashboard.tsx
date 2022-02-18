import React from 'react';
import { IonContent, IonPage } from '@ionic/react';
import NavBar from '../../components/NavBar';

const DoctorDashboard: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <NavBar />


            </IonContent>
        </IonPage>
    );
};

export default DoctorDashboard;
