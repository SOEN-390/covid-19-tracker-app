import { IonAvatar, IonCol, IonContent, IonGrid, IonRow, IonSearchbar } from "@ionic/react";
import './SearchBar.css'
import logo from '../resources/icon.png'

function SearchBar() {
    return (
        <IonContent fullscreen>
            <IonGrid >
                <IonRow className="background">
                    <IonCol sizeXl='6'>
                        <IonSearchbar />
                    </IonCol>


                    <IonCol sizeXl='0.5' sizeXs='1.5'>
                        <IonAvatar className="avatar">
                            <img src={logo} alt="" />
                        </IonAvatar>
                    </IonCol>
                    <IonCol sizeXl='5.5' sizeXs='4'>

                        <h5>Beshoy Soliman</h5>
                        <p>Doctor</p>

                    </IonCol>



                </IonRow>
            </IonGrid>



        </IonContent>
    );
}

export default SearchBar;