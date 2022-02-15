import { IonAvatar, IonButton, IonCol, IonGrid, IonMenuButton, IonRow, IonSearchbar, IonToolbar } from '@ionic/react';
import './NavBar.css';
import logo from '../resources/icon.png';
import { useState } from 'react';
import HttpService from '../providers/http.service';



function NavBar() {
   const [searchText, setSearchText] = useState('');

    async function search() {
        if(searchText.trim() == ''){
            return
        }
     HttpService.get(`patients/${searchText}`).then(async (response) => {
         const data = await response.json();
         console.log("HERE IS THE DATA IN JSON FORM: ", data);
     }).catch((error) => {
         console.log("ERROR: ", error);
     });
    }
    return (
        <IonToolbar>
            <IonMenuButton slot="start" />
            <IonGrid>
                <IonRow className="ion-align-items-end">
                    <IonCol size="7" size-sd>
                    <IonSearchbar  value={searchText} onIonChange={e => setSearchText(e.detail.value!)}
                        showCancelButton="never" />
                    </IonCol>
                    <IonCol size="1" >
                        <IonAvatar className="avatar">
                            <img src={logo} alt=""/>
                        </IonAvatar>
                    </IonCol>
                    <IonCol>
                        <IonButton onClick={search}> search </IonButton>
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
