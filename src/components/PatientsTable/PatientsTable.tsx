import { IonButton } from '@ionic/react';
import './PatientsTable.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
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
        <div style={{width: '100%', overflow: 'hidden'}}>
            <TableContainer id="table_container">
                <Table stickyHeader aria-label="sticky table" style={{borderRadius: '200px', position: 'relative'}}>
                    <TableHead
                        style={{borderRadius: '25px', borderStyle: '2px'}}>
                        <TableRow className={'head'}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{
                                        minWidth: column.minWidth,
                                        color: '#2C4D62', fontSize: '24px',
                                        fontWeight: 'bold',
                                        backgroundColor: 'rgba(44, 77, 98, .12)',
                                        height: '90px',

                                    }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            props.patientTableRows.map((patientTableRow) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={patientTableRow.name}
                                              style={{
                                                  borderRadius: '25px',
                                                  borderCollapse: 'collapse',
                                                  padding: '10px'
                                              }}>

                                        <TableCell id="colName">{patientTableRow.name}</TableCell>
                                        <TableCell id="colSta">
                                            <div id="PosStatus">{patientTableRow.status}</div>
                                        </TableCell>
                                        <TableCell id="Col">{patientTableRow.last_update}</TableCell>
                                        <TableCell id="Col">{patientTableRow.doctor}</TableCell>
                                        <TableCell id="Col">
                                            <IonButton color="favorite" shape="round">
                                                {patientTableRow.action}
                                            </IonButton>
                                        </TableCell>
                                        <TableCell id="Col">{patientTableRow.priority}</TableCell>
                                        <TableCell>
                                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                                        </TableCell>
                                    </TableRow>
                                );
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default PatientsTable;
