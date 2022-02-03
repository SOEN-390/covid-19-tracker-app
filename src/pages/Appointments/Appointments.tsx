import { IonMenuButton, IonPage } from '@ionic/react';

import NavBar from '../../components/NavBar';

const Appointments: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <NavBar />

        </IonPage>
    );
};

export default Appointments;
