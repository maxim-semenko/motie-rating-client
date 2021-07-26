import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import ProfileMenu from "./ProfileMenu";
import Footer from "./Footer";

class BalancePage extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={3} style={{marginTop: "20px"}}>
                            <ProfileMenu/>
                        </Col>
                        <Col lg={9} style={{marginTop: "20px"}}>
                            <Jumbotron className="bg-dark text-white">
                                Your balance
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
                <Footer/>

            </div>
        );
    }
}

export default BalancePage;