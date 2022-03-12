import React from 'react'
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../../common/NavigationBar"
import ProfileMenu from "../../../common/ProfileMenu"
import Footer from "../../../common/Footer"
import imgUser from "../../../../img/user.svg"
import {Link} from "react-router-dom";

function CabinetPage() {
    const user = JSON.parse(localStorage.getItem("user"))

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={3} style={{marginTop: "20px"}}><ProfileMenu/></Col>
                    <Col lg={9} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white" style={{paddingTop: "20px", paddingBottom: "45px"}}>
                            <Row>
                                <Col lg={4} style={{padding: "10px 0px 0px 10px"}}>
                                    <img alt="" src={imgUser}
                                         style={{resize: "both", width: "100%", height: "252px"}}
                                    />
                                    <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                        <Link to="/profile/edit">
                                            <Button variant="outline-success" size="lg">
                                                <b>Edit profile</b>
                                            </Button>
                                        </Link>
                                    </div>
                                </Col>
                                <Col lg={8} style={{textAlign: "left", paddingTop: "20px"}}>
                                    <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                        <b>USERNAME: {user.username}</b></p>
                                    <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                        <b>EMAIL: {user.email}</b></p>
                                    <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                        <b>FIRSTNAME: {user.firstname}</b></p>
                                    <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                        <b>LASTNAME: {user.lastname}</b></p>
                                </Col>
                            </Row>
                        </Jumbotron>
                    </Col>
                    <Col lg={12}>
                        {
                            user.isAdmin ?
                                <div>
                                    <Jumbotron className="bg-dark text-white"
                                               style={{paddingTop: "15px", paddingBottom: "25px"}}>
                                        <div className="d-grid gap-2" style={{marginTop: "15px"}}>
                                            <Link to="/profile/admin/controls">
                                                <Button variant="outline-warning"
                                                        size="lg">
                                                    <b>Go to admin profile</b>
                                                </Button>{' '}
                                            </Link>
                                        </div>
                                    </Jumbotron>
                                </div>
                                :
                                null
                        }
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default CabinetPage
