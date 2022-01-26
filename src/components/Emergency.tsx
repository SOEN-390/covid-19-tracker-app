import { IonCol, IonContent, IonFooter, IonGrid, IonIcon, IonItem, IonItemDivider, IonRow, IonText } from "@ionic/react";
import { call } from "ionicons/icons";

import './SearchBar.css'
import './Emergency.css';

function Emergency() {
    return (



        <IonFooter>
            <div className="emergencyBox">

                <IonRow>


                    <IonCol size="1.5"><IonIcon icon={call} /></IonCol>
                    <IonCol>
                        <text style={{ color: "red" }}>
                            Emergency Hotline
                        </text>
                        {"\n"}
                        <p>+232 453 4324</p>
                    </IonCol>



                </IonRow>


            </div>
        </IonFooter >




    );
}

export default Emergency;