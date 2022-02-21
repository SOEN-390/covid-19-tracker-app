import { IonPage } from '@ionic/react';

import PatientInformation from '../../components/PatientInformation/PatientInformation';
import NavBar from '../../components/NavBar';

const PatientProfilePage: React.FC = () => {


    return (
        <IonPage>
            <NavBar />

            <PatientInformation />
        </IonPage>
    );
};

export default PatientProfilePage;
