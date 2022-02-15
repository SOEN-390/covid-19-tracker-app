import { IonPage, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';
import HealthOfficialTable from '../../components/HO_nonConfirmed_TABLE';

const HO_nonConfirmedPatients: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonToolbar>
                <NavBar />
            </IonToolbar>
            <HealthOfficialTable/>

        </IonPage>
    );
};

export default HO_nonConfirmedPatients;
