import './DoctorTable.css';
import * as React from 'react';
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
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
                    props.doctorTableRows.map((row) => {
                        return (
                            <Tr id="tableRow">
                                <Td id="colName">{row.firstName+ " "+ row.lastName}</Td>
                                <Td id="col">{row.licenseId}</Td>
                                <Td id="col">{row.phoneNumber}</Td>
                                <Td id="col">{row.address}</Td>
                                <Td id="col">{row.email}</Td>
                            </Tr>
                        );
                    })
                }
            </Tbody>
        </Table>
    );
}

export default DoctorsTable;
