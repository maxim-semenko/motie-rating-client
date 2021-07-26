import React, {Component} from 'react';
import {Col, Container, Navbar} from "react-bootstrap";

class Footer extends Component {
    render() {
        let currentYear = new Date().getUTCFullYear();
        return (
            <div>
                <Navbar fixed="bottom" bg="dark" variant="dark">
                    <Container>
                        <Col lg={12} className="text-center text-muted">
                            <div>
                                {currentYear}, All rights Reserved by Maxim Semenko
                            </div>
                        </Col>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default Footer;