import { IonAvatar, IonCol, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import './NavBar.css';
import logo from '../resources/icon.png';

function NavBar() {
    return (
        <IonToolbar>
            <IonMenuButton slot="start" />
            <IonGrid>
                <IonRow className="ion-align-items-end">
                    <IonCol size="9" size-sd>
                        <IonSearchbar />
                    </IonCol>

                    <IonCol size="1">
                        <IonAvatar className="avatar">
                            <img src={logo} alt=""/>
                        </IonAvatar>
                    </IonCol>
                    {/*<IonCol size="2">*/}

                    {/*    <h5>Beshoy Soliman</h5>*/}
                    {/*    <p>Doctor</p>*/}

                    {/*</IonCol>*/}

                </IonRow>
            </IonGrid>
        </IonToolbar>

    );
}

export default NavBar;
