import React from 'react';
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import {ImUsers, MdLocalMovies, RiFeedbackFill} from "react-icons/all";
import {Link} from "react-router-dom";
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";

function AdminPage() {
    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px", padding: "20px 20px 20px 20px", textAlign: "left"}}>
                        <Jumbotron className="bg-dark text-white">
                            <Link to="/profile/cabinet" className="my-link">
                                <h5>
                                    <span className="menu-icon"><ImUsers size={24}/></span>USERS CONTROL
                                </h5>
                            </Link>
                            <hr/>
                            <br/>
                            <Link to="/profile/cabinet" className="my-link">
                                <h5>
                                    <span className="menu-icon"><MdLocalMovies size={24}/></span>FILMS CONTROL
                                </h5>
                            </Link>
                            <hr/>
                            <br/>
                            <Link to="/profile/cabinet" className="my-link">
                                <h5>
                                    <span className="menu-icon"><RiFeedbackFill size={24}/></span>USER'S MESSAGES
                                </h5>
                            </Link>
                            <hr/>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default AdminPage;