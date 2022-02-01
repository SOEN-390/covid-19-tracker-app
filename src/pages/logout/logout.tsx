import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonMenuButton, IonPage, } from '@ionic/react';
import {signoutuser} from '../../../src/firebaseconfig';

const Logout: React.FC = () => {
    async function signout(){
        signoutuser()
      }

    return (
        <IonPage>

            <IonMenuButton></IonMenuButton>

            <IonCard>
                <IonCardHeader>
                    <IonCardTitle className='ion-text-center'>Are you Sure You want to logout?</IonCardTitle>
                </IonCardHeader>

                <IonCardContent className="ion-margin-horizontal">
                    <IonButton onClick={signout} >Yes</IonButton>
                    <IonButton>No</IonButton>
                </IonCardContent>
            </IonCard>

        </IonPage>


    );
};

export default Logout;