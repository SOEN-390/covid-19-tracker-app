import React from 'react';
import { fireEvent, render, RenderResult } from '@testing-library/react';
import { ionFireEvent } from '@ionic/react-test-utils';
import RegisterPage from './Register.page';

jest.mock('../../providers/auth.provider', () => ({
	useAuth: () => ({
		signup: jest.fn()
	}),
}));


test('RegisterPage: Renders without crashing', () => {
	const {baseElement} = render(<RegisterPage />);
	expect(baseElement).toBeDefined();
});

describe('Register: Test register form', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<RegisterPage />);
	});

	test('Insert email', () => {
		const emailField = renderedPage.queryByTestId('register__email-field') as HTMLIonInputElement;
		ionFireEvent.ionChange(emailField, 'demo@demo.com');
		expect(emailField.value).toBe('demo@demo.com');
	});

	test('Insert null email', () => {
		const emailField = renderedPage.queryByTestId('register__email-field') as HTMLIonInputElement;
		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		ionFireEvent.ionChange(emailField, null!);
		expect(emailField.value).toBe('');
	});

});
