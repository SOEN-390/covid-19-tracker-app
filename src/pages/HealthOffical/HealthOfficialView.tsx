import {IonPage, IonToolbar} from '@ionic/react';
import HealthOfficialTable from '../../components/HealthOfficalTable';

import NavBar from '../../components/NavBar';

const HealthOfficialView: React.FC = () => {

    return (
        <IonPage>
        <IonToolbar>
        <NavBar/>
        <HealthOfficialTable/>
        </IonToolbar>

        </IonPage>
    );
};
export default HealthOfficialView;
