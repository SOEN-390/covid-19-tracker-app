import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonMenuButton, IonPage, } from '@ionic/react';
import { signOutUser } from '../../providers/firebase.service';
import { useHistory } from 'react-router-dom';


const Logout: React.FC = () => {
    let history = useHistory();

    async function signout() {
        signOutUser()
        history.push('/login')
    }

    return (
        <IonPage>

            <IonMenuButton/>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className="ion-text-center">Are you Sure You want to logout?</IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="ion-margin-horizontal">
                    <IonButton onClick={signout}>Yes</IonButton>
                    <IonButton>No</IonButton>
                </IonCardContent>
            </IonCard>

        </IonPage>


    );
};

export default Logout;
