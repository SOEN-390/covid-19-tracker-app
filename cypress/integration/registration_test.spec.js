
describe('Unsuccessful Sign up Process', () => {

	it('Unsuccessful Signup with invalid confirmed password', () => {

		cy.visit('http://localhost:8100/register');

		//input email
		cy.get('[data-cy=email]')
			.type('emailRegistrationTest@demo.com')
			.should('have.value', 'emailRegistrationTest@demo.com');

		//input password
		cy.get('[data-cy=password]')
			.type('PasswordTest')
			.should('have.value', 'PasswordTest');

		//input copy of the password
		cy.get('[data-cy=confirmed_password]')
			.type('Password')
			.should('have.value', 'Password');

		cy.contains('Next').click();
		cy.url().should('include', '/register');
	});

});

describe('Signup Process Success', () => {
	it('Sign up', () => {
		cy.visit('http://localhost:8100/register');

		//input email
		cy.get('[data-cy=email]')
			.type('RegisterTest@email.com')
			.should('have.value', 'RegisterTest@email.com');

		//input password
		cy.get('[data-cy=password]')
			.type('emailRegistrationTest')
			.should('have.value', 'emailRegistrationTest');

		//input copy of the password
		cy.get('[data-cy=confirmed_password]')
			.type('emailRegistrationTest')
			.should('have.value', 'emailRegistrationTest');

		cy.contains('Next').click();
		cy.url().should('include', '/2');
	});
});

describe('Registration Page 2 Process', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8100/register/2');
	});

	it('Unsuccessful Register due to empty Medical Number', () => {
		//input
		cy.get('[data-cy=first_name]')
			.type('Steve')
			.should('have.value', 'Steve');

		//input Last Name
		cy.get('[data-cy=last_name]')
			.type('Shawn')
			.should('have.value', 'Shawn');

		// input empty Medical Number
		cy.get('[data-cy=medical_number]')
			.should('have.value', '');

		//input Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1990-01-01')
			.should('have.value', '1990-01-01');

		// input address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]');

		// Pick Test Result
		cy.get('[data-cy=testResult]');

		cy.contains('Register').click();
		cy.url().should('include', '/2');
	});

	it('Unsuccessful Register due to invalid Date of birth', () => {
		//input First Name
		cy.get('[data-cy=first_name]')
			.type('Steve')
			.should('have.value', 'Steve');

		//input Last Name
		cy.get('[data-cy=last_name]')
			.type('Shawn')
			.should('have.value', 'Shawn');

		// input Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input invalid Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1000-01-01')
			.should('have.value', '1000-01-01');

		// input address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]');

		// Pick Test Result
		cy.get('[data-cy=testResult]');

		cy.contains('Register').click();
		cy.url().should('include', '/2');
	});

	it('Unsuccessful Register due to empty Date of birth', () => {
		//input First Name
		cy.get('[data-cy=first_name]')
			.type('Steve')
			.should('have.value', 'Steve');

		//input Last Name
		cy.get('[data-cy=last_name]')
			.type('Shawn')
			.should('have.value', 'Shawn');

		// input Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input empty Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.should('have.value', '');

		// input address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]');

		// Pick Test Result
		cy.get('[data-cy=testResult]');

		cy.contains('Register').click();
		cy.url().should('include', '/2');
	});


	it('Unsuccessful Register due to empty Address', () => {
		//incorrect input
		cy.get('[data-cy=first_name]')
			.type('Steve')
			.should('have.value', 'Steve');

		//input Last Name
		cy.get('[data-cy=last_name]')
			.type('Shawn')
			.should('have.value', 'Shawn');

		// input Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1999-01-01')
			.should('have.value', '1999-01-01');

		// input empty address
		cy.get('[data-cy=address]')
			.should('have.value', '');

		// input phone number
		cy.get('[data-cy=phone_number]')
			.type('5141234567')
			.should('have.value', '5141234567');

		// Pick any gender
		cy.get('[data-cy=gender]');

		// Pick Test Result
		cy.get('[data-cy=testResult]');

		cy.contains('Register').click();
		cy.url().should('include', '/2');
	});

	it('Unsuccessful Register due to empty Phone number', () => {
		//incorrect input
		cy.get('[data-cy=first_name]')
			.type('Steve')
			.should('have.value', 'Steve');

		//input Last Name
		cy.get('[data-cy=last_name]')
			.type('Shawn')
			.should('have.value', 'Shawn');

		// input Medical Number
		cy.get('[data-cy=medical_number]')
			.type('A12345')
			.should('have.value', 'A12345');

		//input Date of Birth
		cy.get('[data-cy=date_of_birth]')
			.type('1999-01-01')
			.should('have.value', '1999-01-01');

		// input address
		cy.get('[data-cy=address]')
			.type('Montreal')
			.should('have.value', 'Montreal');

		// input empty phone number
		cy.get('[data-cy=phone_number]')
			.should('have.value', '');

		// Pick any gender
		cy.get('[data-cy=gender]');

		// Pick Test Result
		cy.get('[data-cy=testResult]');

		cy.contains('Register').click();
		cy.url().should('include', '/2');
	});
});

describe('Registration Page 2 Success', () => {
	it('Sign up', () => {
		cy.visit('http://localhost:8100/register/2');

		//input correct First Name
		cy.get('[data-cy=first_name]')
			.type('John')
			.should('have.value', 'John');

		//input correct Last Name
		cy.get('[data-cy=last_name]')
			.type('Smith')
			.should('have.value', 'Smith');

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
		cy.get('[data-cy=gender]');

		// Pick Test Result
		cy.get('[data-cy=testResult]');


		cy.contains('Register').click();
		cy.url().should('include', '/login');
	});
});
/* */
