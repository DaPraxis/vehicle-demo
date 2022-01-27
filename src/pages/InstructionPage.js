import React from 'react'
import GaugeComponent from '../Components/GaugeComponent';
import {Container, Row, Col, Button} from 'react-bootstrap'

class InstructionPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            wlValue: 1, // start workload value
            maxWl: 20,
            minWl: 1,
        }
    }

    render() {
        return (
            <Container>
                <Row className="justify-content-md-center">
                    <Row className="justify-content-md-center">
                        <h1>Instruction</h1>
                    </Row>
                    <Row className="justify-content-md-center">
                        <br/>
                        <br/>
                        <br/>
                    </Row>
                    <Row className="justify-content-md-center">
                        <h2>⬆ or ➡ Arrow Key Increases the Gauge Meter, while ⬇ or ⬅ Arrow Key Decreases the Mental Workload Gauge Meter <Button variant="secondary" onClick={this.props.nextPage}>Next</Button></h2>
                    </Row>
                    
                </Row>
                <Row className="justify-content-md-center">
                        <br/>
                    </Row>
                <Row className="justify-content-md-center">
                    <Col>
                        <GaugeComponent initWl={5} maxWl={20} minWl={0} textColor={'black'}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default InstructionPage;