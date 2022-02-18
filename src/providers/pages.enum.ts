export enum Pages {
    login = '/login',
    register = '/register'
}

export enum PatientPages {
    home = '/home',
    overview = '/home/overview',
    appointments = '/home/appointments',
    symptoms = '/home/symptoms',
    patientProfile = '/home/patient-profile'
}

export enum DoctorPages {
    home = '/doctor',
    dashboard = '/doctor/dashboard',
    patientProfile = '/doctor/patient-profile'
}

export enum HealthOfficialPages {
    home = '/health-official',
    patientsPage ='/health-official/patients',
    patientProfile = '/health-official/patient-profile'
}

export enum ImmigrationOfficerPages {
    home = '/immigration-officer',
    immigrationDashboard = '/immigration-officer/dashboard',
    patientProfile = '/immigration-officer/patient-profile'
}

export enum AdminPages {
    home = '/admin',
    patientProfile = '/admin/patient-profile'
}
