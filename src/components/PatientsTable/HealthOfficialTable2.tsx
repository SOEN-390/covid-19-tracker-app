import React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import './HealthOfficialTable2.css';
import { IonAvatar, IonButton, IonCol, IonContent, IonRow, IonTitle } from '@ionic/react';



interface Column{
    id: 'name' | 'status' | 'lastUpdate' | 'doctor'| 'action'| 'priority' |'monitor_symptoms';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}


const columns: readonly Column[] = [
    {
        id: 'name',
        label: 'Name',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'lastUpdate',
        label: 'Last Update',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'doctor',
        label: 'Doctor',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'priority',
        label: 'Priority',
        minWidth: 170,
        align: "center"
    },
    {
        id: 'monitor_symptoms',
        label: '',
        minWidth: 170,
        align: "center"
    }
];

interface Data {
    name: string;
    status : string;
    lastUpdate : string;
    doctor :string;
    action : string;
    priority :string;
    monitorSymptoms:string;
}

function createData(
    name: string,
    status : string,
    lastUpdate : string,
    doctor :string,
    action : string,
    priority :string,
    monitorSymptoms:string
): Data {
    return { name, status, lastUpdate, action, doctor, priority, monitorSymptoms };
}


const rows = [
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1',''),
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', 'contact', '1','')
]


export default function PatientTable1() {
    return (
        <IonContent >
            <IonTitle id="title"> Patients </IonTitle>
            <div>
                <IonRow>
                    <IonCol/>
                    <IonCol class="confirmButton" > <IonButton id="con"  color="favorite">Confirmed</IonButton></IonCol>
                    <IonCol class="unconfirmedButton"><IonButton  color="favorite1">Unconfirmed</IonButton></IonCol>
                    <IonCol/>
                </IonRow>
            </div>

        <Table>
            <Thead>
                <Tr id="tableHead">
                    {columns.map((column) => (
                    <Th id="headCol">{column.label}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {rows.map((row) => {
                    return (
                <Tr id="tableRow">
                    <Td  id="colName">{row.name}</Td>
                    <Td><div id="PosStatus">{row.status}</div></Td>
                    <Td id="lastUpdate">{row.lastUpdate}</Td>
                    <Td id="colDoc">{row.doctor}</Td>
                    <Td id='col'><IonButton color="favorite" shape="round" size="large"> {row.action} </IonButton></Td>
                    <Td id='col'> {row.priority}</Td>
                    <Td id='col'> <IonButton color="favorite" shape="round" size="large">  Symptoms </IonButton></Td>
                </Tr>
                    );
                })}
            </Tbody>
        </Table>
        </IonContent>
    );
}
