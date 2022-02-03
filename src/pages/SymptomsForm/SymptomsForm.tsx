import { IonMenuButton, IonPage } from '@ionic/react';

import SearchBar from '../../components/SearchBar';
import '../../components/Symptom';
import Symptom from '../../components/Symptom';

const SymptomsForm: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonMenuButton/>
            <SearchBar />
            <Symptom />

        </IonPage>


    );
};

export default SymptomsForm;
