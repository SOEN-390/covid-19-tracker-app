import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import DashboardDoctorPage from './Dashboard.doctor.page';
import { UserType } from '../../enum/UserType.enum';
import { ionFireEvent } from '@ionic/react-test-utils';
import { IPatient } from '../../interfaces/IPatient';
import { TestResult } from '../../enum/TestResult.enum';
import { Gender } from '../../enum/Gender.enum';
import HttpService from '../../providers/http.service';

// Cannot get to 100%, PieChart is throwing errors

const mockHttpGetFn = jest.spyOn(HttpService, 'get');

const mockGetRoleFn = () => UserType.DOCTOR;
jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		currentProfile: {
			getRole: mockGetRoleFn,
			licenseId: '55'
		}
	})
}));

test('DashboardDoctorPage: Renders without crashing', () => {
	jest.mock('devextreme-react/pie-chart', () => ({
		PieChart: () => null,
	}));
	const {baseElement} = render(<DashboardDoctorPage />);
	expect(baseElement).toBeDefined();
});

describe('DashboardDoctorPage: Patient Reminded', () => {
	let renderedPage: RenderResult;

	beforeEach(() => {
		jest.mock('devextreme-react/pie-chart', () => ({
			PieChart: () => null,
		}));
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpGetFn.mockImplementation(async (path: string) => {
			console.log(path);
			if (path === 'doctors/55/patients/assigned') {
				return [
					{
						gender: Gender.NONE,
						testResult: TestResult.PENDING
					} as IPatient,
					{
						gender: Gender.MALE,
						testResult: TestResult.POSITIVE
					} as IPatient,
					{
						gender: Gender.FEMALE,
						testResult: TestResult.NEGATIVE
					} as IPatient
				];
			}
		});
		renderedPage = render(<DashboardDoctorPage />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});

	// test('Update Status Clicked', () => {
	// 	const updateButton = renderedPage.queryByTestId('symptoms-patient__symptoms-form') as HTMLIonButtonElement;
	// 	ionFireEvent.click(updateButton);
	// });

});
