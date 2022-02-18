import './PatientsTable.css';
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { IDoctorTableRow } from '../../interfaces/IDoctorTableRow';


interface Column {
    id: 'name' | 'licenseId' | 'phoneNumber' | 'address' | 'email' ;
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
        id: 'licenseId',
        label: 'LicenseId',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'phoneNumber',
        label: 'Phone Number',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'address',
        label: 'Address',
        minWidth: 170,
        align: 'center'
    },
    {
        id: 'email',
        label: 'Email',
        minWidth: 170,
        align: 'center'
    }
];


const DoctorsTable: React.FC<{ doctorTableRows: IDoctorTableRow[] }> = (props) => {

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
                            props.doctorTableRows.map((doctorTableRow) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={doctorTableRow.firstName+" "+doctorTableRow.lastName}
                                              style={{
                                                  borderRadius: '25px',
                                                  borderCollapse: 'collapse',
                                                  padding: '10px'
                                              }}>

                                        <TableCell id="colName">{doctorTableRow.firstName+" "+doctorTableRow.lastName}</TableCell>
                                        <TableCell id="Col"> {doctorTableRow.licenseId}</TableCell>
                                        <TableCell id="Col"> {doctorTableRow.phoneNumber}</TableCell>
                                        <TableCell id="Col"> {doctorTableRow.address}</TableCell>
                                        <TableCell id="Col"> {doctorTableRow.email}</TableCell>
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

export default DoctorsTable;
