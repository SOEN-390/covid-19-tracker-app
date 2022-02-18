import { IonPage, IonToolbar } from '@ionic/react';

import NavBar from '../../components/NavBar';

const OverviewPage: React.FC = () => {

    // const { name } = useParams<{ name: string; }>(); //to get page name

    return (
        <IonPage>

            <IonToolbar>
                <NavBar />
            </IonToolbar>


        </IonPage>
    );
};

export default OverviewPage;