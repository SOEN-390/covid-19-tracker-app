export interface PatientsTableColumn {
    id: 'patients' | 'status' | 'last_update' | 'doctor' | 'action' | 'priority' | 'monitor_symptoms';
    label: string;
    minWidth?: number;
    align?: 'center';
    format?: (value: number) => string;
}

export const doctorColumns: readonly PatientsTableColumn[] = [
    {
        id: 'patients',
        label: 'Patient',
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
    {
        id: 'monitor_symptoms',
        label: '',
        minWidth: 170,
        align: 'center'
    }
];

export const adminColumns: readonly PatientsTableColumn[] = [
    {
        id: 'patients',
        label: 'Patient',
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
];

export const healthOfficialColumns: readonly PatientsTableColumn[] = [
    {
        id: 'patients',
        label: 'Patient',
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


