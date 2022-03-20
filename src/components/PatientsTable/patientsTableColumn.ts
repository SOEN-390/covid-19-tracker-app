export interface PatientsTableColumn {
	id: 'patients' | 'status' | 'lastUpdate' | 'doctor' | 'action' | 'priority' | 'monitorSymptoms' | 'reviewed' | 'reminder';
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
		id: 'action',
		label: 'Action',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'monitorSymptoms',
		label: 'Monitor',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'reviewed',
		label: 'Reviewed',
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
		id: 'lastUpdated',
		label: 'Last Updated',
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
		id: 'lastUpdated',
		label: 'Last Updated',
		minWidth: 170,
		align: 'center'
	}
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
		id: 'monitorSymptoms',
		label: 'Monitor',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'reminder',
		label: 'Reminder',
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
		id: 'lastUpdated',
		label: 'Last Updated',
		minWidth: 170,
		align: 'center'
	}
];

export const immigrationOfficerColumns: readonly PatientsTableColumn[] = [
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
		id: 'action',
		label: 'Action',
		minWidth: 170,
		align: 'center'
	},
	{
		id: 'monitorSymptoms',
		label: 'Monitor',
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
		id: 'lastUpdated',
		label: 'Last Updated',
		minWidth: 170,
		align: 'center'
	}
];
