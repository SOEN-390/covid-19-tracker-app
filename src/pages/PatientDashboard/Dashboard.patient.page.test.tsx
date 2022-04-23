import { render, RenderResult } from '@testing-library/react';
import React from 'react';
import DashboardPatientPage from './Dashboard.patient.page';
import { UserType } from '../../enum/UserType.enum';
import { ionFireEvent } from '@ionic/react-test-utils';
import HttpService from '../../providers/http.service';

const mockHttpPostFn = jest.spyOn(HttpService, 'post');

const mockGetRoleFn = () => UserType.PATIENT;
let mockPatientReminded = false;
jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		currentProfile: {
			getRole: mockGetRoleFn,
			medicalId: '55',
			reminded: mockPatientReminded
		}
	})
}));

const mockPushHistoryFn = jest.fn();
jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockPushHistoryFn
	})
}));

test('DashboardPatientPage: Renders without crashing', () => {
	const {baseElement} = render(<DashboardPatientPage />);
	expect(baseElement).toBeDefined();
});

describe('DashboardPatientPage: Patient Reminded', () => {
	let renderedPage: RenderResult;

	beforeEach(() => {
		mockPushHistoryFn.mockReturnValue(true);
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		mockHttpPostFn.mockImplementation((path: string) => {
			if (path === 'patients/55/unremind') {
				return true;
			}
		});
		mockPatientReminded = true;
		renderedPage = render(<DashboardPatientPage />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});

	test('Update Status Clicked', () => {
		const updateButton = renderedPage.queryByTestId('symptoms-patient__symptoms-form') as HTMLIonButtonElement;
		ionFireEvent.click(updateButton);
	});

});
