import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Footer from "./Footer";
import '../css/FormControl.css'

class AboutPage extends Component {

    constructor(props) {
        super(props);

        this.state = {}
    }


    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Jumbotron className="bg-dark text-white">
                                ABOUT PAGE
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default AboutPage;