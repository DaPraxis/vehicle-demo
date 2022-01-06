import React, { Component } from 'react';
import { Button, Container } from 'react-bootstrap';

export default class Confirmation extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    };

    render(){
        const {inputValues: { firstName, lastName, email, city, state, zip, ageGroup, gender, driveYrs, driveFreq}} = this.props;

        return(
            <Container>
                <p>First Name: {firstName}</p>
                <p>Last Name: {lastName}</p>
                <p>Email: {email}</p>
                <p>City: {city}</p>
                <p>State: {state}</p>
                <p>Zip: {zip}</p>
                <p>Age Group: {ageGroup}</p>
                <p>Gender: {gender}</p>
                <p>Years of Driving: {driveYrs}</p>
                <p>Frequency of Driving: {driveFreq}</p>
                <Button variant="secondary" onClick={this.back}>Back</Button>{' '}
                <Button variant="primary" onClick={this.props.nextPage}>Confirm</Button>
            </Container>
        )
    }
}