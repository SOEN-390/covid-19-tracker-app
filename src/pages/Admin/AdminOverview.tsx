import { IonPage, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';



const AdminOverview: React.FC = () =>{

    return (
        <IonPage>
            <IonToolbar>
                <NavBar/>
                <h1>Welcome to Admin Dashboard</h1>
            </IonToolbar>
        </IonPage>
    );
}
export default AdminOverview;
