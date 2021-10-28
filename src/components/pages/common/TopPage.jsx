import React from 'react'
import NavigationBar from "../../NavigationBar"
import Footer from "../../Footer"
import {Col, Container, Jumbotron, Row} from "react-bootstrap";

function TopPage() {
    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white">
                            <h1>TOP PAGE</h1>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>

        </div>
    );
}

export default TopPage