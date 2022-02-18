import { IonPage, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';

const SettingsPage: React.FC = () =>{

    return (
        <IonPage>
            <IonToolbar>
                <NavBar/>
            </IonToolbar>
        </IonPage>
    );
}
export default SettingsPage;
