import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import {Link} from "react-router-dom";
import {AiFillHome, ImUsers, MdLocalMovies, RiFeedbackFill, VscFeedback} from "react-icons/all";

class AdminPage extends Component {
    render() {
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
}

export default AdminPage;