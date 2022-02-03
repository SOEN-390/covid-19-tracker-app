import { IonPage } from '@ionic/react';

import NavBar from '../../components/NavBar';
import Symptom from '../../components/Symptom';

const SymptomsForm: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <NavBar />
            <Symptom />

        </IonPage>


    );
};

export default SymptomsForm;
