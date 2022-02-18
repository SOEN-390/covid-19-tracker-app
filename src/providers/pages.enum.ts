export enum Pages {
    login = '/login',
    register = '/register'
}

export enum PatientPages {
    home = '/home',
    overview = '/home/overview',
    appointments = '/home/appointments',
    symptoms = '/home/symptoms',
    patientProfile = '/home/patient-profile',
    settings = '/home/settings'
}

export enum DoctorPages {
    home = '/doctor',
    patientProfile = '/doctor/patient-profile',
    settings = '/doctor/settings'
}

export enum HealthOfficialPages {
    home = '/health-official',
    patientsPage ='/health-official/patients',
    patientProfile = '/health-official/patient-profile',
    settings = '/health-official/settings'
}

export enum ImmigrationOfficerPages {
    home = '/immigration-officer',
    immigrationDashboard = '/immigration-officer/dashboard',
    patientProfile = '/immigration-officer/patient-profile',
    settings = '/immigration-officer/settings'
}

export enum AdminPages {
    home = '/admin',
    overview = '/admin/admin-overview',
    patientProfile = '/admin/patient-profile',
    assignedConfirmed = '/admin/assignedConfirmed',
    unAssignedConfirmed = '/admin/unAssignedConfirmed',
    doctors = '/admin/doctors',
    settings = '/admin/settings'
}
