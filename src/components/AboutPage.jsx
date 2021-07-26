import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";

class AboutPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    выпывп
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Jumbotron className="bg-dark text-white">
                                <h1>About page</h1>
                                <p>
                                    This is simple example component with some text.
                                </p>
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