import { render } from '@testing-library/react';
import React from 'react';
import AppointmentsPage from './Appointments.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<AppointmentsPage />);
	expect(baseElement).toBeDefined();
});
