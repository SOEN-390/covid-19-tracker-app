import { RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import React from 'react';
import AdminRouting from './Admin.routing';
import DoctorRouting from './Doctor.routing';
import HealthOfficialRouting from './HealthOfficial.routing';
import ImmigrationOfficerRouting from './ImmigrationOfficer.routing';
import PatientRouting from './Patient.routing';

jest.mock('../providers/auth.provider', () => ({
	useAuth: () => ({
	})
}));

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useLocation: () => ({
		pathname: 'localhost:3000/example/path'
	})
}));

describe('AdminRouting', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<AdminRouting />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});
});

describe('DoctorRouting', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<DoctorRouting />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});
});

describe('HealthOfficialRouting', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<HealthOfficialRouting />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});
});

describe('ImmigrationOfficerRouting', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<ImmigrationOfficerRouting />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});
});

describe('PatientRouting', () => {
	let renderedPage: RenderResult;

	beforeEach(async () => {
		renderedPage = render(<PatientRouting />);
	});

	test('Renders without crashing', () => {
		expect(renderedPage.baseElement).toBeDefined();
	});
});
