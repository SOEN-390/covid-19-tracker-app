//unknown = does not exist
//invalid = incorrect format
describe('Login Page Unsuccessful login', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8100/login');
	});


	it('Unsuccessful Login with unknown email', () => {

		cy.get('[data-cy=email]')
			.type('fakey@fake.com')
			.should('have.value', 'fakey@fake.com');

		cy.get('[data-cy=password]')
			.type('fake')
			.should('have.value', 'fake');
		cy.contains('LOGIN')
			.click();

		cy.get('ion-toast');
		cy.url().should('include', '/login');

	});

	it('Unsuccessful Login with invalid email', () => {

		cy.get('[data-cy=email]')
			.type('fm')
			.should('have.value', 'fm');

		cy.get('[data-cy=password]')
			.type('fake')
			.should('have.value', 'fake');
		cy.contains('LOGIN')
			.click();

		cy.get('ion-toast');
		cy.url().should('include', '/login');

	});

	it('Unsuccessful Login with invalid password', () => {

		cy.get('[data-cy=email]')
			.type('patient@patient.com')
			.should('have.value', 'patient@patient.com');

		cy.get('[data-cy=password]')
			.type('fake')
			.should('have.value', 'fake');
		cy.contains('LOGIN')
			.click();

		cy.get('ion-toast');
		cy.url().should('include', '/login');

	});

	it('Unsuccessful Login with incorrect password', () => {

		cy.get('[data-cy=email]')
			.type('patient@patient.com')
			.should('have.value', 'patient@patient.com');

		cy.get('[data-cy=password]')
			.type('fake123')
			.should('have.value', 'fake123');
		cy.contains('LOGIN')
			.click();

		cy.get('ion-toast');
		cy.url().should('include', '/login');

	});

});

describe('Login Page Successful login', () => {

	it('Successfully Login', () => {
		cy.visit('http://localhost:8100/login');

		cy.get('[data-cy=email]')
			//input correct email
			.type('bla@bla.com')
			.should('have.value', 'bla@bla.com');
		//input correct password
		cy.get('[data-cy=password]')
			.type('Bla')
			.should('have.value', 'Bla');

		cy.contains('LOGIN').click();
		cy.wait(6000);
		cy.contains('Search');

	});

	it('Successfully Logs out', () => {

		cy.wait(6000);
		cy.contains('Logout').click();

	});
});
