import { IonMenuButton, IonPage } from '@ionic/react';

import SearchBar from '../../components/SearchBar';

const Overview: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonMenuButton></IonMenuButton>
            <SearchBar />

        </IonPage>
    );
};

export default Overview;
