import { render } from '@testing-library/react';
import React from 'react';
import ReportInContactPage from './ReportInContact.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<ReportInContactPage />);
	expect(baseElement).toBeDefined();
});
