import React from 'react';
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
});
