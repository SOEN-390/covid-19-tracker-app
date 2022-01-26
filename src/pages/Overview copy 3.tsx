import { IonAvatar, IonCol, IonContent, IonGrid, IonMenuButton, IonPage, IonRow } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';


import SearchBar from '../components/SearchBar';



const Overview: React.FC = () => {

    const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonMenuButton></IonMenuButton>
            <SearchBar />
        </IonPage>
    );
};

export default Overview;
