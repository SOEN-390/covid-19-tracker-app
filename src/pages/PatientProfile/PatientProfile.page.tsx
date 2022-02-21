import { IonPage } from '@ionic/react';

import DiagnosePatient from '../../components/DiagnosePatient';
import NavBar from '../../components/NavBar';

const PatientProfilePage: React.FC = () => {


    return (
        <IonPage>
            <NavBar />

            <DiagnosePatient />
        </IonPage>
    );
};

export default PatientProfilePage;
