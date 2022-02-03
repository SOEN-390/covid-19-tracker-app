import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

jest.mock('firebase/compat/app', () => {
    return {
        initializeApp: jest.fn(() => true),
        auth: jest.fn(() => {
            return {
                onAuthStateChanged: jest.fn((callback) => callback(null)),
                createUserWithEmailAndPassword: jest.fn(() => Promise.resolve(true)), // TODO: Send the correct response format
                signInWithEmailAndPassword: jest.fn(() => Promise.resolve(true)), // TODO: Send the correct response format
                signOut: jest.fn()
            }
        })
    }
});

test('renders without crashing', () => {

    const {baseElement} = render(<App/>);
    expect(baseElement).toBeDefined();

});
