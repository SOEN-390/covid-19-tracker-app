import React from 'react';
import { IonContent, IonPage, IonTitle } from '@ionic/react';
import NavBar from '../../components/NavBar';
import { PieChart } from 'react-minimal-pie-chart';

const DoctorDashboard: React.FC = () => {

    return (
        <IonPage>
            <IonContent>
                <NavBar />

                <IonTitle>Diagnostics</IonTitle>
                <PieChart
                    data={[
                        { title: 'Positive', value: 10, color: '#E38627' },
                        { title: 'Negative', value: 15, color: '#C13C37' },
                        { title: 'Unconfirmed', value: 20, color: '#6A2135' }
                    ]}
                />

                <IonTitle>Patients</IonTitle>
                <PieChart
                    data={[
                        { title: 'Men', value: 10, color: '#E38627' },
                        { title: 'Women', value: 15, color: '#C13C37' }
                    ]}
                />;
            </IonContent>
        </IonPage>
    );
};

export default DoctorDashboard;
