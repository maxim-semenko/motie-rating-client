import React, {Component} from 'react';
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends Component {
    render() {
        return (
            <div style={{paddingTop: "30px"}}>
                <Navbar fixed="bottom" bg="dark" variant="dark">
                    <Container>
                        <Col lg={12} className="text-center text-muted">
                            <div>
                                {new Date().getUTCFullYear()}, All rights Reserved by Maxim Semenko
                            </div>
                        </Col>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Footer;