import { IonAvatar, IonCol, IonContent, IonGrid, IonMenuButton, IonPage, IonRow } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import logo from '../resources/icon.png'


import SearchBar from '../components/SearchBar';



const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>(); //to get page name

  return (
    <IonPage>

      <IonMenuButton></IonMenuButton>
      <IonContent fullscreen>
        <IonGrid >
          <IonRow className="background">
            <IonCol sizeXl='6'>
              <SearchBar />
            </IonCol>


            <IonCol sizeXl='0.5' sizeXs='1.5' size='2'>
              <IonAvatar className="avatar">
                <img src={logo} alt="" />
              </IonAvatar>
            </IonCol>
            <IonCol sizeXl='5.5' sizeXs='4'>


              <text>Beshoy Soliman</text>
              <text>Doctosr</text>

            </IonCol>



          </IonRow>
        </IonGrid>



      </IonContent>
    </IonPage>
  );
};

export default Page;
