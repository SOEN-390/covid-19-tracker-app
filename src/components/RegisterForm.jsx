import React, { Component } from "react"
import Register from "../pages/Register/Register";
import RegisterNext from "../pages/Register/RegisterNext";
export class RegisterForm extends Component {

    state = {
        step: 1,
        email: '',
        fName: '',
        lName: '',
        testResult: '',
        address: '',
        medicalCard: ''

    };

    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    };

    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    };

    inputChange = input => e => {
        this.setState({
            [input]: e.target.value
        });
    };

    render() {
        const { step } = this.state;
        const { email, password, fName, lName, testResult, address, medicalCard } = this.state;
        const values = { email, password, fName, lName, testResult, address, medicalCard };

        switch (step) {
            case 1:
                return (
                    <Register
                        nextStep={this.nextStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
            case 2:
                return (
                    <RegisterNext
                        nextStep={this.nextStep}
                        prevStep={this.prevStep}
                        inputChange={this.inputChange}
                        values={values}
                    />
                );
           
        }
    }
}

export default RegisterForm