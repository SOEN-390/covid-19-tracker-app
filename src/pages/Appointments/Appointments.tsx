import { IonMenuButton, IonPage } from '@ionic/react';
import { useParams } from 'react-router';

import SearchBar from '../../components/SearchBar';

const Appointments: React.FC = () => {

    const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonMenuButton ></IonMenuButton>

            <SearchBar />

        </IonPage>
    );
};

export default Appointments;
