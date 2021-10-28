import React, {useState} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {FaShoppingCart} from "react-icons/all"
import SignInModal from "./pages/common/SignInModal"
import SignUpModal from "./pages/common/SignUpModal"
import {Cookies} from "react-cookie"
import imgLogo from "../img/logo.svg"
import AuthService from "../service/AuthService"

function NavigationBar(props) {
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const cookies = new Cookies()

    const isLogin = () => {
        return (
            <div>
                {
                    cookies.get("jwt") != null ?
                        <div>
                            <Button variant="outline-primary" href={"/profile/cabinet"}><b>profile</b></Button>{' '}
                            <Button variant="outline-danger" href={"/"}
                                    onClick={() => AuthService.logout(cookies)}><b>Logout</b></Button>
                        </div>
                        :
                        <div>
                            <Button variant="outline-primary" onClick={() => setShowSignInModal(true)}>Sign in</Button>
                            {' '}
                            <Button variant="outline-success" onClick={() => setShowSignUpModal(true)}>Sign up</Button>
                        </div>
                }
            </div>
        )
    }

    const isShowBasketImage = () => {
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

    return (
        <div>
            <SignInModal show={showSignInModal} onHide={() => setShowSignInModal(false)}
                         setIsLoginMethod={props.setIsLoginMethod}/>
            <SignUpModal show={showSignUpModal} onHide={() => setShowSignUpModal(false)}/>

            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: "18px"}}>
                <Container>
                    <Navbar.Brand href="/">
                        <img alt="" src={imgLogo} width="41" height="41" className="d-inline-block align-top"/>{' '}
                        <strong style={{fontSize: "24px"}}>MovieRating</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/"><b>HOME</b></Nav.Link>
                            <Nav.Link href="/top"><b>TOP</b></Nav.Link>
                            <Nav.Link href="/about"><b>ABOUT</b></Nav.Link>
                            <Nav.Link href="/feedback"><b>FEEDBACK</b></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                    <Navbar.Collapse className="justify-content-end">
                        {isShowBasketImage()}
                        {isLogin()}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default NavigationBar