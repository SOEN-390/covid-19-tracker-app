import { IonAvatar, IonCol, IonContent, IonGrid, IonMenuButton, IonPage, IonRow } from '@ionic/react';
import { useParams } from 'react-router';
import './Page.css';
import logo from '../resources/icon.png';


import SearchBar from '../components/SearchBar';
import '../components/Symptom';
import Symptom from '../components/Symptom';



const SymptomsForm: React.FC = () => {

    const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonMenuButton></IonMenuButton>
            <SearchBar />
            <Symptom />

        </IonPage>


    );
};

export default SymptomsForm;
