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
     const response = await HttpService.get(`patients/${searchText}`);
    }
    return (
        <IonToolbar>
            <IonMenuButton slot="start" />
            <IonGrid>
                <IonRow className="ion-align-items-end">
                    <IonCol size="9" size-sd>

                    <IonSearchbar value={searchText} onIonChange={e => setSearchText(e.detail.value!)}
                    showCancelButton="never" ></IonSearchbar>
                    <IonButton onClick={search}> search </IonButton>


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
