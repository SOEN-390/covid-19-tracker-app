import { IonButton } from '@ionic/react';
import './PatientsTable.css';
import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';


interface Column {
    id: 'name' | 'status' | 'last_update' | 'doctor' | 'action' | 'priority' | 'monitor_symptoms';
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
        align: 'center'
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'last_update',
        label: 'Last Update',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'doctor',
        label: 'Doctor',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'priority',
        label: 'Priority',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'monitor_symptoms',
        label: '',
        minWidth: 170,
        align: 'center'
    }
];


const PatientsTable: React.FC<{ patientTableRows: IPatientTableRow[] }> = (props) => {

    return (
        <Table>
            <Thead>
                <Tr id="tableHead">
                    {columns.map((column) => (
                        <Th id="headCol">{column.label}</Th>
                    ))}
                </Tr>
            </Thead>
            <Tbody>
                {
                    props.patientTableRows.map((row) => {
                        return (
                            <Tr id="tableRow">
                                <Td id="colName">{row.name}</Td>
                                <Td>
                                    <div id="PosStatus">{row.status}</div>
                                </Td>
                                <Td id="lastUpdate">{row.last_update}</Td>
                                <Td id="colDoc">{row.doctor}</Td>
                                <Td id="col"><IonButton color="favorite" shape="round"
                                                        size="large"> {row.action} </IonButton></Td>
                                <Td id="col"> {row.priority}</Td>
                                <Td id="col"> <IonButton color="favorite" shape="round"
                                                         size="large"> Symptoms </IonButton></Td>
                            </Tr>
                        );
                    })
                }
            </Tbody>
        </Table>
    );
}

export default PatientsTable;
