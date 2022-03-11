import { render } from '@testing-library/react';
import React from 'react';
import OverviewPage from './Overview.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<OverviewPage />);
	expect(baseElement).toBeDefined();
});
