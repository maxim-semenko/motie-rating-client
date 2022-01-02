import React, {useState} from 'react'
import {Button, Container, Nav, Navbar} from "react-bootstrap"
import {FaShoppingCart} from "react-icons/all"
import SignInDialog from "../pages/user/auth/SignInDialog"
import SignUpDialog from "../pages/user/auth/SignUpDialog"
import {Cookies} from "react-cookie"
import imgLogo from "../../img/logo.svg"
import AuthService from "../../service/AuthService"
import {Link} from "react-router-dom";

function NavigationBar(props) {
    const cookies = new Cookies()
    const [showSignInModal, setShowSignInModal] = useState(false)
    const [showSignUpModal, setShowSignUpModal] = useState(false)
    const token = cookies.get("jwt");

    const isLogin = () => {
        return (
            <div>
                {
                    token != null ?
                        <div>
                            <Link to="/profile/cabinet">
                                <Button variant="outline-primary"><b>profile</b></Button>{' '}
                            </Link>
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
                    token != null ?
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/profile/basket">
                                <span style={{color: "white"}}>
                                        <FaShoppingCart size={34}/>
                                </span>
                            </Nav.Link>
                        </Nav>
                        : null
                }
            </div>
        )
    }

    const showModals = () => {
        if (showSignUpModal) {
            return (
                <SignUpDialog
                    show={showSignUpModal}
                    onHide={() => setShowSignUpModal(false)}
                />
            )
        }
        if (showSignInModal) {
            return (
                <SignInDialog
                    show={showSignInModal}
                    onHide={() => setShowSignInModal(false)}
                    setIsLoginMethod={props.setIsLoginMethod}
                />
            )
        }
    }

    return (
        <div>
            {showModals()}
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{fontSize: "18px"}}>
                <Container>
                    <Navbar.Brand as={Link} to="/">
                        <img alt="" src={imgLogo} width="41" height="41" className="d-inline-block align-top"/>{' '}
                        <strong style={{fontSize: "24px"}}>MovieRating</strong>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/"><b>HOME</b></Nav.Link>
                            <Nav.Link as={Link} to="/top"><b>TOP</b></Nav.Link>
                            <Nav.Link as={Link} to="/about"><b>ABOUT</b></Nav.Link>
                            <Nav.Link as={Link} to="/feedback"><b>FEEDBACK</b></Nav.Link>
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