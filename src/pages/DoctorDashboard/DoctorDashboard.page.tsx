import React, { useState } from 'react';
import { IonContent, IonPage, IonTitle } from '@ionic/react';
import NavBar from '../../components/NavBar';
import { PieChart } from 'react-minimal-pie-chart';
import './DoctorDashboard.page.css';

const DoctorDashboardPage: React.FC = () => {

    const [selectedDiagnostics, setSelectedDiagnostics] = useState<number | undefined>(0);
    // const [hovered, setHovered] = useState<number | undefined>(undefined);
    const [selectedGender, setSelectedGender] = useState<number | undefined>(0);

    return (
        <IonPage>
            <IonContent>
                <NavBar />

                <IonTitle>Diagnostics</IonTitle>
                <PieChart
                    style={{
                        fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                        fontSize: '8px'
                    }}
                    className={"doctor-dashboard__piechart"}
                    radius={40}
                    label={({ x, y, dx, dy, dataEntry }) => (
                        <text
                            key={dataEntry.title}
                            x={x}
                            y={y}
                            dx={dx}
                            dy={dy}
                            dominantBaseline="central"
                            textAnchor="middle"
                            style={{
                                fill: '#fff',
                                opacity: 0.75,
                                pointerEvents: 'none',
                                fontSize: '5px',
                                fontFamily: 'sans-serif'
                            }}
                        >
                            {dataEntry.title}
                            {/*<br/>*/}
                            {/*{'(' + dataEntry.percentage.toFixed(2) + ')'}*/}
                        </text>
                    )}
                    labelPosition={100 - 60 / 2}
                    segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                    segmentsShift={(index) => (index === selectedDiagnostics ? 6 : 1)}
                    lineWidth={50}
                    animate={true}
                    data={[
                        { title: 'Positive', value: 10, color: '#E38627' },
                        { title: 'Negative', value: 15, color: '#C13C37' },
                        { title: 'Unconfirmed', value: 20, color: '#6A2135' }
                    ]}
                    onClick={(_, index) => {
                        setSelectedDiagnostics(index === selectedDiagnostics ? undefined : index);
                    }}
                    // onMouseOver={(_, index) => {
                    //     setHovered(index);
                    // }}
                    // onMouseOut={() => {
                    //     setHovered(undefined);
                    // }}
                />

                <IonTitle>Patients</IonTitle>
                <PieChart
                    style={{
                        fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                        fontSize: '8px'
                    }}
                    className={"doctor-dashboard__piechart"}
                    radius={40}
                    label={({ x, y, dx, dy, dataEntry }) => (
                        <text
                            key={dataEntry.title}
                            x={x}
                            y={y}
                            dx={dx}
                            dy={dy}
                            dominantBaseline="central"
                            textAnchor="middle"
                            style={{
                                fill: '#fff',
                                opacity: 0.75,
                                pointerEvents: 'none',
                                fontSize: '5px',
                                fontFamily: 'sans-serif'
                            }}
                        >
                            {dataEntry.title}
                            {/*<br/>*/}
                            {/*{'(' + dataEntry.percentage.toFixed(2) + ')'}*/}
                        </text>
                    )}
                    labelPosition={100 - 60 / 2}
                    segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                    segmentsShift={(index) => (index === selectedGender ? 6 : 1)}
                    lineWidth={50}
                    animate={true}
                    data={[
                        { title: 'Men', value: 10, color: '#E38627' },
                        { title: 'Women', value: 15, color: '#C13C37' },
                        { title: 'Other', value: 10, color: '#6A2135' }
                    ]}
                    onClick={(_, index) => {
                        setSelectedGender(index === selectedGender ? undefined : index);
                    }}
                    // onMouseOver={(_, index) => {
                    //     setHovered(index);
                    // }}
                    // onMouseOut={() => {
                    //     setHovered(undefined);
                    // }}
                />
            </IonContent>
        </IonPage>
    );
};

export default DoctorDashboardPage;
