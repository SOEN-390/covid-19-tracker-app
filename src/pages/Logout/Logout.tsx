import {
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonMenuButton,
    IonPage,
    useIonToast,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Pages } from '../../providers/pages.enum';
import { useAuth } from '../../providers/auth.provider';


const Logout: React.FC = () => {
    let history = useHistory();
    const {signout} = useAuth();
    const [present] = useIonToast();

    async function signOut() {
        signout();
        present('Logged out.', 1500);
        history.push(Pages.login);
    }

    return (
        <IonPage>

            <IonMenuButton/>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className="ion-text-center">Are you Sure You want to logout?</IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="ion-margin-horizontal">
                    <IonButton onClick={signOut}>Yes</IonButton>
                    <IonButton>No</IonButton>
                </IonCardContent>
            </IonCard>

        </IonPage>


    );
};

export default Logout;
