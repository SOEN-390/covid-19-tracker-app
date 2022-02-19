import { IonButton, IonIcon } from '@ionic/react';
import './PatientsTable.css';
import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import { IPatientTableRow } from '../../interfaces/IPatientTableRow';
import { flag } from 'ionicons/icons';


interface Column {
    id: 'patients' | 'status' | 'last_update' | 'action' | 'priority';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

const columns: readonly Column[] = [
    {
        id: 'patients',
        label: 'patient',
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

];


const PatientsPerDoctorTable: React.FC<{ patientTableRows: IPatientTableRow[] }> = (props) => {

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
                                <Td id="colName">{row.firstName + " " + row.lastName}</Td>
                                <Td>
                                    <div id={row.testResult == 'positive' ? "PosStatus" : "NegStatus"}>{row.testResult == 'positive' ? 'Positive' : 'Negative'}</div>
                                </Td>
                                <Td id="lastUpdate">March 17, 2021</Td>
                                <Td id="col"><IonButton color="favorite" shape="round"
                                    size="large"> No-Action needed </IonButton></Td>
                                <Td id="col"> {row.priority}
                                    <IonButton>
                                        <IonIcon slot="start" ios={flag} md={flag} />



                                    </IonButton></Td>

                            </Tr>
                        );
                    })
                }
            </Tbody>
        </Table>
    );
}

export default PatientsPerDoctorTable;
