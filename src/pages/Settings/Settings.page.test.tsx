import { render } from '@testing-library/react';
import React from 'react';
import SettingsPage from './Settings.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

test('SettingsPage: Renders without crashing', () => {
	const {baseElement} = render(<SettingsPage />);
	expect(baseElement).toBeDefined();
});
