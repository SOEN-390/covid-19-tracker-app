import { render } from '@testing-library/react';
import React from 'react';
import AdminOverviewPage from './AdminOverview.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<AdminOverviewPage />);
	expect(baseElement).toBeDefined();
});
