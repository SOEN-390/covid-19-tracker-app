
describe('Unsuccessful Sign up Process', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8100/register');
	});

	it('Unsuccessful Signup with invalid confirmed password', () => {
		//input correct email
		cy.get('[data-cy=email]')
			.type('emailRegistrationTest@demo.com')
			.should('have.value', 'emailRegistrationTest@demo.com');

		//input correct password
		cy.get('[data-cy=password]')
			.type('Demo123')
			.should('have.value', 'Demo123');

		//input correct copy of the password
		cy.get('[data-cy=confirmed_password]')
			.type('Demo1234')
			.should('have.value', 'Demo1234');

		cy.contains('Next').click();
	});

});

describe('Signup Process Success', () => {
	it('Sign up', () => {
		cy.visit('http://localhost:8100/register');

		//input correct email
		cy.get('[data-cy=email]')
			.type('emailRegistrationTest@demo.com')
			.should('have.value', 'emailRegistrationTest@demo.com');

		//input correct password
		cy.get('[data-cy=password]')
			.type('Demo123')
			.should('have.value', 'Demo123');

		//input correct copy of the password
		cy.get('[data-cy=confirmed_password]')
			.type('Demo123')
			.should('have.value', 'Demo123');

		cy.contains('Next').click();
	});
});

describe('Unsuccessful Personal Information Registration Process', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8100/register/2');
	});

	it('Unsuccessful Register due to empty First Name', () => {
		//incorrect input
		cy.get('[data-cy=first_name]')
			.type('0')
			.should('have.value', '0');

		//input correct Last Name
		cy.get('[data-cy=last_name]')
			.type('bla')
			.should('have.value', 'bla');

		// input correct Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input correct Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1990-01-01')
			.should('have.value', '1990-01-01');

		// input correct address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]')

		// Pick Test Result
		cy.get('[data-cy=testResult]')

		cy.contains('Register').click();
	});

	it('Unsuccessful Register due to empty Last Name', () => {
		//input correct First Name
		cy.get('[data-cy=first_name]')
			.type('bla')
			.should('have.value', 'bla');

		//input incorrect Last Name
		cy.get('[data-cy=last_name]')
			.type('0')
			.should('have.value', '0');

		// input correct Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input correct Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1990-01-01')
			.should('have.value', '1990-01-01');

		// input correct address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]')

		// Pick Test Result
		cy.get('[data-cy=testResult]')

		cy.contains('Register').click();
	});

	it('Unsuccessful Register due to empty Medical Number', () => {
			//incorrect input
			cy.get('[data-cy=first_name]')
				.type('bla')
				.should('have.value', 'bla');

			//input correct Last Name
			cy.get('[data-cy=last_name]')
				.type('bla')
				.should('have.value', 'bla');

			// input correct Medical Number
			cy.get('[data-cy=medical_number]')
				.type('0')
				.should('have.value', '0');

			//input correct Date of Birth
			cy.get('[data-cy=date_of_birth]')
				.type('1990-01-01')
				.should('have.value', '1990-01-01');

			// input correct address
			cy.get('[data-cy=address]')
				.type('Montreal')
				.should('have.value', 'Montreal');

			// input phone number
			cy.get('[data-cy=phone_number]')
				.type('5141234567')
				.should('have.value', '5141234567');

			// Pick any gender
			cy.get('[data-cy=gender]')

			// Pick Test Result
			cy.get('[data-cy=testResult]')

			cy.contains('Register').click();
	});

	it('Unsuccessful Register due to invalid Date of birth', () => {
		//incorrect input
		cy.get('[data-cy=first_name]')
			.type('bla')
			.should('have.value', 'bla');

		//input correct Last Name
		cy.get('[data-cy=last_name]')
			.type('bla')
			.should('have.value', 'bla');

		// input correct Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input incorrect Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1000-01-01')
			.should('have.value', '1000-01-01');

		// input correct address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]')

		// Pick Test Result
		cy.get('[data-cy=testResult]')

		cy.contains('Register').click();
	});

	it('Unsuccessful Register due to empty Address', () => {
		//incorrect input
		cy.get('[data-cy=first_name]')
			.type('bla')
			.should('have.value', 'bla');

		//input correct Last Name
		cy.get('[data-cy=last_name]')
			.type('bla')
			.should('have.value', 'bla');

		// input correct Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input incorrect Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1999-01-01')
			.should('have.value', '1999-01-01');

		// input correct address
		cy.get('[data-cy=address]')
			.type('0')
			.should('have.value', '0');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]')

		// Pick Test Result
		cy.get('[data-cy=testResult]')

		cy.contains('Register').click();
	});

	it('Unsuccessful Register due to empty Phone number', () => {
		//incorrect input
		cy.get('[data-cy=first_name]')
			.type('bla')
			.should('have.value', 'bla');

		//input correct Last Name
		cy.get('[data-cy=last_name]')
			.type('bla')
			.should('have.value', 'bla');

		// input correct Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input incorrect Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1999-01-01')
			.should('have.value', '1999-01-01');

		// input correct address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('0')
			.should('have.value', '0');

		// Pick any gender
		cy.get('[data-cy=gender]')

		// Pick Test Result
		cy.get('[data-cy=testResult]')

		cy.contains('Register').click();
	});
});



describe('Personal Information Registration Process Success', () => {
	it('Sign up', () => {
		cy.visit('http://localhost:8100/register/2');

		//input correct First Name
		cy.get('[data-cy=first_name]')
			.type('bla')
			.should('have.value', 'bla');

		//input correct Last Name
		cy.get('[data-cy=last_name]')
			.type('bla')
			.should('have.value', 'bla');

		// input correct Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input correct Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1990-01-01')
			.should('have.value', '1990-01-01');

		// input correct address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]')

		// Pick Test Result
		cy.get('[data-cy=testResult]')


		cy.contains('Register').click();
	});
});
/* */
