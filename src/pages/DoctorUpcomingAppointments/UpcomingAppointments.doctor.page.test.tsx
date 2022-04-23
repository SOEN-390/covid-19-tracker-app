import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import HttpService from '../../providers/http.service';
import { UserType } from '../../enum/UserType.enum';
import UpcomingAppointmentsDoctorPage from './UpcomingAppointments.doctor.page';
import { IAppointmentTableData } from '../../interfaces/IAppointment';

// Could not get 100%. As a Patient is throwing weird react errors.

const mockHttpGetFn = jest.spyOn(HttpService, 'get');

let mockMedicalIdParam: string | undefined = undefined;
jest.mock('react-router', () => ({
	...jest.requireActual('react-router'),
	useParams: () => ({
		medicalId: mockMedicalIdParam
	})
}));

let mockGetRoleFn = () => UserType.DOCTOR;
jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		currentProfile: {
			licenseId: '56',
			getRole: mockGetRoleFn
		}
	})
}));

test('UpcomingAppointmentsDoctorPage: Renders without crashing', () => {
	const {baseElement} = render(<UpcomingAppointmentsDoctorPage/>);
	expect(baseElement).toBeDefined();
});

describe('UpcomingAppointmentsDoctorPage: As a doctor', () => {
	let renderedPage: RenderResult;

	beforeEach(() => {
		mockMedicalIdParam = '55';
		mockGetRoleFn = () => UserType.DOCTOR;
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpGetFn.mockImplementation(async (path: string): IAppointmentTableData[] => {
			if (path === 'doctors/56/upcoming-appointments') {
				return [{
					patientName: 'test',
					appointmentSubject: 'test',
					appointmentDate : Date.prototype
				}];
			}
		});
		renderedPage = render(<UpcomingAppointmentsDoctorPage />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});

});
