import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';


export default class UserDetails extends Component{

    saveAndContinue = (e) => {
        // if (e.target.checkValidity() === false) {
        //     // e.preventDefault();
        //     e.stopPropagation();
        // }else{
        //     // e.preventDefault(); 
        //     this.props.nextStep();
        e.preventDefault();
        if(e.target.checkValidity()){
            this.props.nextStep();
        }
    };


    render() {
        return( <Container>
                    <Form onSubmit={this.saveAndContinue}>
                        <Row>
                            <Form.Group as={Col} controlId="formFirstName" noValidate>
                                <Form.Label className="label">First Name</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.firstName}
                                name="firstName"
                                required
                                placeholder = "Enter First Name"
                                minlength='2'
                                pattern='[a-zA-Z]*'
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formLastName">
                                <Form.Label className="label">Last Name</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.lastName}
                                name="lastName"
                                placeholder = "Enter Last Name"
                                required
                                minlength='2'
                                pattern='[a-zA-Z]*'
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>
                        </Row>

                        <Form.Group controlId="formEmail">
                            <Form.Label className="label">Email Address</Form.Label>
                            <Form.Control
                            type="email"
                            defaultValue={this.props.inputValues.email}
                            name="email"
                            placeholder = "Enter Email"
                            required
                            onChange={this.props.handleChange}
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" style={{marginTop:"2%"}}>Next</Button>
                    </Form>
                </Container>
        );
    }
}