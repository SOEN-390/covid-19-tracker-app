import { IonAvatar, IonCol, IonContent, IonGrid, IonMenuButton, IonPage, IonRow } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';
import logo from '../resources/icon.png'


import SearchBar from '../components/SearchBar';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>(); //to get page name

  return (
    <IonPage>

      <IonMenuButton></IonMenuButton>
      <IonContent fullscreen>
        <IonGrid>
          <IonRow className="background">
            <IonCol size='6'>
              <SearchBar />
            </IonCol>


            <IonCol size='3'>
              <IonAvatar>
                <img src={logo} alt="" />
              </IonAvatar>
            </IonCol>
            <IonCol size='3' offset='-2.2'>

              <h5>Beshoy Soliman</h5>
              <p>Doctor</p>

            </IonCol>



          </IonRow>
        </IonGrid>



      </IonContent>
    </IonPage>
  );
};

export default Page;
