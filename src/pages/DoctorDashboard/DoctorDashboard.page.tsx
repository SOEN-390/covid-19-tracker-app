import React, { useState } from 'react';
import { IonCard, IonCol, IonContent, IonPage, IonRow, IonTitle } from '@ionic/react';
import NavBar from '../../components/NavBar';
import './DoctorDashboard.page.css';
import PieChart, {
    Legend,
    Series,
    Tooltip,
    Label,
    Connector,
    Export,
} from 'devextreme-react/pie-chart';

const DoctorDashboardPage: React.FC = () => {

    const diagnosticData = [{
        testResult: 'Positive',
        val: 10,
    }, {
        testResult: 'Negative',
        val: 15,
    }, {
        testResult: 'Non-Confirmed',
        val: 3,
    }];

    const genderData = [{
        gender: 'Male',
        val: 10,
    }, {
        gender: 'Female',
        val: 15,
    }, {
        gender: 'Other',
        val: 3,
    }];

    function customizeTooltip(arg: any) {
        return {
            text: `${arg.argumentText} - ${(arg.percent * 100).toFixed(2)}%`,
        };
    }

    return (
        <IonPage>
            <IonContent>
                <NavBar/>

                <IonCol>
                    <IonRow>
                <IonCard>
                    <PieChart
                        id="pie"
                        type="doughnut"
                        title="Diagnostics"
                        palette="Soft Pastel"
                        dataSource={diagnosticData}
                    >
                        <Series argumentField="testResult">
                            <Label visible={true}>
                                <Connector visible={true}/>
                            </Label>
                        </Series>
                        <Export enabled={true}/>
                        <Legend
                            margin={20}
                            horizontalAlignment="center"
                            verticalAlignment="bottom"
                        />
                        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                            {/*<Format type="percentage" />*/}
                        </Tooltip>
                    </PieChart>
                </IonCard>

                <IonCard>
                    <PieChart
                        id="pie"
                        type="doughnut"
                        title="Patients"
                        palette="Soft Pastel"
                        dataSource={genderData}
                    >
                        <Series argumentField="gender">
                            <Label visible={true}>
                                <Connector visible={true}/>
                            </Label>
                        </Series>
                        <Export enabled={true}/>
                        <Legend
                            margin={20}
                            horizontalAlignment="center"
                            verticalAlignment="bottom"
                        />
                        <Tooltip enabled={true} customizeTooltip={customizeTooltip}>
                            {/*<Format type="percentage" />*/}
                        </Tooltip>
                    </PieChart>
                </IonCard>
                    </IonRow>
                </IonCol>

            </IonContent>
        </IonPage>
    );
};

export default DoctorDashboardPage;
