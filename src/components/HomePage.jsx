import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import Footer from "./Footer";

class HomePage extends Component {

    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Jumbotron className="bg-dark text-white">
                                <h1>Hello, World!</h1>
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

export default HomePage;