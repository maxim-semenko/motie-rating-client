import React, {Component} from 'react';
import {Container, Nav, Navbar} from "react-bootstrap";
import imgLogo from "../img/logo.svg"

import CenterModalSignIn from "./CenterModalSignIn";
import CenterModalSignUp from "./CenterModalSignUp";
import {Cookies} from "react-cookie";
import {FaShoppingCart} from "react-icons/all";
import Button from "react-bootstrap/Button";
import AuthService from "../service/AuthService";

const cookies = new Cookies();

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSignIn: false,
            showSignUp: false,
            showLogOut: false,
            showAlert: true
        }
    }

    openModal() {
        this.setState({showSignIn: true});
    }

    closeModal() {
        this.setState({showSignIn: false});
    }

    openModalSignUp() {
        this.setState({showSignUp: true});
    }

    closeModalSignUp() {
        this.setState({showSignUp: false});
    }

    isLogin() {
        return (
            <div>
                {
                    cookies.get("jwt") != null ?
                        <div>
                            <Button variant="outline-primary" href={"/profile/cabinet"}><b>profile</b></Button>{' '}
                            <Button variant="outline-danger" href={"/"}
                                    onClick={() => this.logOut()}><b>Logout</b></Button>
                        </div>
                        :
                        <div>
                            <Button variant="outline-primary" onClick={() => this.openModal()}>Sign in</Button>{' '}
                            <Button variant="outline-success" onClick={() => this.openModalSignUp()}>Sign up</Button>
                        </div>
                }
            </div>
        )
    }

    isShowBasketImage() {
        return (
            <div>
                {
                    cookies.get("jwt") != null ?
                        <Nav className="me-auto">
                            <Nav.Link href="/profile/basket">
                                <span style={{color: "white"}}><FaShoppingCart size={34}/></span>
                            </Nav.Link>
                        </Nav>
                        : null
                }
            </div>
        )
    }


    logOut() {
        AuthService.logout(cookies);
        // cookies.remove("jwt", {path: "/"});
        // localStorage.removeItem("user");
    }

    render() {
        return (
            <div>
                <CenterModalSignIn show={this.state.showSignIn} onHide={() => this.closeModal()}/>
                <CenterModalSignUp show={this.state.showSignUp} onHide={() => this.closeModalSignUp()}/>

                <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: "18px"}}>
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt=""
                                src={imgLogo}
                                width="41"
                                height="41"
                                className="d-inline-block align-top"
                            />{' '}
                            <strong style={{fontSize: "24px"}}>MovieRating</strong>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/">Home</Nav.Link>
                                <Nav.Link href="/top">Top</Nav.Link>
                                <Nav.Link href="/search">Search</Nav.Link>
                                <Nav.Link href="/about">About</Nav.Link>
                                <Nav.Link href="/feedback">Feedback</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            {this.isShowBasketImage()}
                            {this.isLogin()}
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;