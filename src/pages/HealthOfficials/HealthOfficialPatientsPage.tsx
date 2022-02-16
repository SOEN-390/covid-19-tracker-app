import { IonPage, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';
import HealthOfficialTable from '../../components/HealthOfficialTable';

const HealthOfficialPatientsPage: React.FC = () => {

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

export default HealthOfficialPatientsPage;
