import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import Footer from "./Footer";
import imgUser from "../img/user.svg";
import Button from "react-bootstrap/Button";
import ProfileMenu from "./ProfileMenu";

class CabinetPage extends Component {
    roles;
    balance;

    constructor(props) {
        super(props);

        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            userRoles: []
        }
    }

    isShowAdminAction() {
        let array = this.state.user.roles;
        for (let key in array) {
            if (array.hasOwnProperty(key)) {
                this.state.userRoles.push(array[key].name);
            }
        }
        return (
            <div>
                {
                    this.state.userRoles.includes("ROLE_ADMIN") ?
                        <div>
                            <Jumbotron className="bg-dark text-white"
                                       style={{paddingTop: "25px", paddingBottom: "35px"}}>
                                <h3 className="text-center">ADMIN FUNCTIONAL</h3>
                                <div className="d-grid gap-2" style={{marginTop: "15px"}}>
                                    <Button href="/profile/admin" variant="outline-warning" size="lg">
                                        <b>Go to admin profile</b>
                                    </Button>{' '}
                                </div>
                            </Jumbotron>
                        </div>
                        :
                        null
                }
            </div>
        )
    }

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
                            <Jumbotron className="bg-dark text-white"
                                       style={{paddingTop: "20px", paddingBottom: "44px"}}>
                                <Row>
                                    <Col lg={4} style={{padding: "10px 0px 0px 10px"}}>
                                        <img
                                            alt=""
                                            src={imgUser}
                                            style={{resize: "both", width: "100%", height: "256px"}}
                                            // style={{width: "100%",
                                            //     height: "auto",
                                            //     /* Magic! */
                                            //     maxWidth: "50vw"}}
                                        />
                                        <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                            <Button variant="outline-success" size="lg" href="/profile/edit">
                                                <b>Edit profile</b>
                                            </Button>
                                        </div>
                                    </Col>
                                    <Col lg={8} style={{textAlign: "left", paddingTop: "20px"}}>
                                        <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                            <b>USERNAME: {this.state.user.username}</b></p>
                                        <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                            <b>EMAIL: {this.state.user.email}</b></p>
                                        <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                            <b>FIRSTNAME: {this.state.user.firstname}</b></p>
                                        <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                            <b>LASTNAME: {this.state.user.lastname}</b></p>
                                        <p style={{borderBottom: "1px solid grey", paddingBottom: "5px"}}>
                                            <b>BALANCE: {this.state.user.balance}$</b></p>
                                    </Col>
                                </Row>
                            </Jumbotron>
                        </Col>
                        <Col lg={12}>
                            {this.isShowAdminAction()}
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default CabinetPage;