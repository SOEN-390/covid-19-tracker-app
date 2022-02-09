import { IonPage, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';
import HealthOfficialTable from '../../components/HealthOfficialTable';

const HO_NonConfirmedPatient: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonToolbar>
                <NavBar />
                <HealthOfficialTable/>
            </IonToolbar>


        </IonPage>
    );
};

export default HO_NonConfirmedPatient;
