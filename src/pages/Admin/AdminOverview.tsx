import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow,IonTitle,IonGrid,IonContent, IonPage, IonToolbar, IonText } from '@ionic/react';
import { flag } from 'ionicons/icons';
import '../../components/HealthOfficialTable.css';
import logo from '../../resources/UserIcon.png'
import { IonReactHashRouter } from '@ionic/react-router';
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
