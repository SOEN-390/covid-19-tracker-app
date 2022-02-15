import { IonPage } from '@ionic/react';
import { useParams } from 'react-router';

import DiagnosePatient from '../../components/DiagnosePatient';
import NavBar from '../../components/NavBar';

const PatientProfile: React.FC = () => {


    return (
        <IonPage>
            <NavBar />

            <DiagnosePatient />
        </IonPage>
    );
};

export default PatientProfile;
