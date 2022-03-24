import { render } from '@testing-library/react';
import React from 'react';
import DashboardPatientPage from './Dashboard.patient.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<DashboardPatientPage />);
	expect(baseElement).toBeDefined();
});
