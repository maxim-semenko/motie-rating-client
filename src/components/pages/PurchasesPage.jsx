import React from 'react';
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import ProfileMenu from "../ProfileMenu";
import Footer from "../Footer";

function PurchasesPage()  {
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
                            Your purchases
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default PurchasesPage;