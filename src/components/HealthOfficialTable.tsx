import { IonAvatar, IonButton, IonCol, IonIcon, IonImg, IonRow, IonTitle, IonGrid, IonContent } from '@ionic/react';
import { flag } from 'ionicons/icons';
import './HealthOfficialTable.css';


import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';


interface Column{
    id: 'name' | 'status' | 'last_update' | 'doctor'|'daysQUAR'| 'action'| 'priority' |'monitor_symptoms';
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
        id: 'last_update',
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
        id: 'daysQUAR',
        label: 'Days of Quarantine',
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
    last_update : string;
    doctor :string;
    daysQUAR: string;
    action : string;
    priority :string;
    monitor_symptoms:string;
}

function createData(
    name: string,
    status : string,
    last_update : string,
    doctor :string,
    daysQUAR: string,
    action : string,
    priority :string,
    monitor_symptoms:string
): Data {
    return { name, status, last_update, action, doctor, daysQUAR, priority, monitor_symptoms };
}

const rows = [
    createData('Sarah SalibSarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),
    createData('Sarah Salib', 'positive', '20-11-2021', 'Kero', '2days', 'contact', '1',''),

];


export default function HealthOfficialTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <IonContent>
            <IonTitle id="title"> Patients </IonTitle>
            <div>
                <IonRow>
                    <IonCol></IonCol>
                    <IonCol class="confirmButton" > <IonButton id="con"  color="favorite">Confirmed</IonButton></IonCol>
                    <IonCol class="unconfirmedButton"><IonButton  color="favorite1">Unconfirmed</IonButton></IonCol>
                    <IonCol></IonCol>
                </IonRow>
            </div>

        <div style={{width: '100%', overflow: 'hidden' }}>
            <TableContainer  id='table_container'>
                <Table stickyHeader aria-label="sticky table" style={{borderRadius:'200px', position:'relative'}}>
                    <TableHead
                        style={{borderRadius:'25px', borderStyle:'2px'}} >
                        <TableRow className={'head'}>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth,
                                        color:"#2C4D62", fontSize:'24px',
                                        fontWeight:'bold',
                                        backgroundColor:"rgba(44, 77, 98, .12)",
                                        height:'90px',

                                }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .map((row) => {
                                return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.name}
                                        style={{borderRadius:'25px', borderCollapse:'collapse', padding:'10px'}}>

                                        <TableCell id='colName' >{row.name}</TableCell>
                                        <TableCell id='colSta'>
                                            <div id="PosStatus">{row.status}</div>
                                        </TableCell>
                                        <TableCell  id='Col' >{row.last_update}</TableCell>
                                        <TableCell  id='Col'>{row.doctor}</TableCell>
                                        <TableCell  id='Col'>{row.daysQUAR}</TableCell>
                                        <TableCell  id='Col'>
                                            <IonButton color="favorite" shape="round">{row.action} </IonButton>
                                        </TableCell>
                                        <TableCell id='Col'>{row.priority}</TableCell>
                                        <TableCell >
                                            <IonButton color="favorite" shape="round"> Monitor Symptoms </IonButton>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </IonContent>
    );
}
