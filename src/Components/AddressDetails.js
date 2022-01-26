import React, { Component } from 'react';
import { Form, Button, Col, Container, Row } from 'react-bootstrap';


export default class AddressDetails extends Component{

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    saveAndContinue = (e) => {
        e.preventDefault();
        if(e.target.checkValidity()){
            this.props.nextStep();
        }
    };


    render() {
        return( <Container>
                    <Form onSubmit={this.saveAndContinue}>
                        <Row>
                            <Form.Group as={Col} controlId="formCity">
                                <Form.Label>City</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.city}
                                name="city"
                                required
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formState" required>
                                <Form.Label>Province</Form.Label>
                                <Form.Control as="select" name="state" value={this.props.inputValues.state} onChange={this.props.handleChange}>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    {/* <option value="AL">Alabama</option>
                                    <option value="AK">Alaska</option>
                                    <option value="AZ">Arizona</option>
                                    <option value="AR">Arkansas</option>
                                    <option value="CA">California</option>
                                    <option value="CO">Colorado</option>
                                    <option value="CT">Connecticut</option>
                                    <option value="DE">Delaware</option>
                                    <option value="DC">District Of Columbia</option>
                                    <option value="FL">Florida</option>
                                    <option value="GA">Georgia</option>
                                    <option value="HI">Hawaii</option>
                                    <option value="ID">Idaho</option>
                                    <option value="IL">Illinois</option>
                                    <option value="IN">Indiana</option>
                                    <option value="IA">Iowa</option>
                                    <option value="KS">Kansas</option>
                                    <option value="KY">Kentucky</option>
                                    <option value="LA">Louisiana</option>
                                    <option value="ME">Maine</option>
                                    <option value="MD">Maryland</option>
                                    <option value="MA">Massachusetts</option>
                                    <option value="MI">Michigan</option>
                                    <option value="MN">Minnesota</option>
                                    <option value="MS">Mississippi</option>
                                    <option value="MO">Missouri</option>
                                    <option value="MT">Montana</option>
                                    <option value="NE">Nebraska</option>
                                    <option value="NV">Nevada</option>
                                    <option value="NH">New Hampshire</option>
                                    <option value="NJ">New Jersey</option>
                                    <option value="NM">New Mexico</option>
                                    <option value="NY">New York</option>
                                    <option value="NC">North Carolina</option>
                                    <option value="ND">North Dakota</option>
                                    <option value="OH">Ohio</option>
                                    <option value="OK">Oklahoma</option>
                                    <option value="OR">Oregon</option>
                                    <option value="PA">Pennsylvania</option>
                                    <option value="RI">Rhode Island</option>
                                    <option value="SC">South Carolina</option>
                                    <option value="SD">South Dakota</option>
                                    <option value="TN">Tennessee</option>
                                    <option value="TX">Texas</option>
                                    <option value="UT">Utah</option>
                                    <option value="VT">Vermont</option>
                                    <option value="VA">Virginia</option>
                                    <option value="WA">Washington</option>
                                    <option value="WV">West Virginia</option>
                                    <option value="WI">Wisconsin</option>
                                    <option value="WY">Wyoming</option> */}
                                    <option value="AB">Alberta</option>
                                    <option value="BC">British Columbia</option>
                                    <option value="YT">Yukon</option>
                                    <option value="NT">Northwest Territories</option>
                                    <option value="NU">Nunavut</option>
                                    <option value="NL">Newfoundland and Labrador</option>
                                    <option value="PE">Prince Edward Island</option>
                                    <option value="NS">Nova Scotia</option>
                                    <option value="QC">Quebec</option>
                                    <option value="ON">Ontario</option>
                                    <option value="MB">Manitoba</option>
                                    <option value="SK">Saskatchewan</option>
                                </Form.Control>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formZip">
                                <Form.Label>Zip</Form.Label>
                                <Form.Control
                                type="text"
                                defaultValue={this.props.inputValues.zip}
                                name="zip"
                                required
                                onChange={this.props.handleChange}
                                />
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="formAgeGroup">
                                <Form.Label>Age Group</Form.Label>
                                <Form.Control as="select" name="ageGroup" value={this.props.inputValues.ageGroup} 
                                    onChange={this.props.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="17-­26">17-­26 years</option>
                                    <option value="27­-36">27­-36 years</option>
                                    <option value="37­-46">37­-46 years</option>
                                    <option value="47­-56">47­-56 years</option>
                                    <option value="57­-66">57­-66 years</option>
                                    <option value=">66"> &gt;66 years</option>
                                </Form.Control>
                            </Form.Group>
                            
                            <Form.Group as={Col} controlId="formGender">
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select" name="gender" value={this.props.inputValues.gender} 
                                    onChange={this.props.handleChange} required>
                                    <option hidden value="">
                                        Select...
                                    </option>
                                    <option value="male">male</option>
                                    <option value="female">female</option>
                                    <option value="N.A.">Not Available</option>
                                </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="formDrivingYrs">
                                    <Form.Label>How many years have you been driving (from the year you got your driving license)?</Form.Label>
                                    <Form.Control as="select" name="driveYrs" value={this.props.inputValues.driveYrs} 
                                        onChange={this.props.handleChange} required>
                                        <option hidden value="">
                                            Select...
                                        </option>
                                        <option value="&le;5">&le;5 years</option>
                                        <option value="6-10 years">6-10 years</option>
                                        <option value="10-20 years">10-20 years</option>
                                        <option value=">20 years">&gt;20 years</option>
                                    </Form.Control>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Form.Group as={Col} controlId="formDrivingFreq">
                                    <Form.Label>How frequent do you drive?</Form.Label>
                                    <Form.Control as="select" name="driveFreq" value={this.props.inputValues.driveFreq} 
                                        onChange={this.props.handleChange} required>
                                        <option hidden value="">
                                            Select...
                                        </option>
                                        <option value="Almost every day">Almost every day</option>
                                        <option value="A few days a week">A few days a week</option>
                                        <option value="A few days a month">A few days a month</option>
                                        <option value="Never">Never</option>
                                    </Form.Control>
                            </Form.Group>
                        </Row>

                        <Button variant="secondary" style={{marginTop:"2%"}} onClick={this.back}>Back</Button>{' '}
                        <Button type="submit" variant="primary" style={{marginTop:"2%"}}>Next</Button>
                    </Form>
                </Container>
        );
    }
}