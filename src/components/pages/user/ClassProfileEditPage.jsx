import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";
import CSSTransition from "react-transition-group/CSSTransition";
import NavigationBar from "../common/NavigationBar";
import Footer from "../../Footer";
import UserService from "../../../service/UserService";

function ProfileEditPage(props) {

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setUsername(user.username)
        setEmail(user.email)
    }, [])

    const changeUsernameHandler = (event) => {
        setUsername(event.target.value)
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
    }

    const changeFirstnameHandler = (event) => {
        setFirstname(event.target.value)
    }

    const changeLastnameHandler = (event) => {
        setLastname(event.target.value)
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
    }

    const update = (event) => {
        event.preventDefault();
        setShowSuccess(false)
        let request = {
            id: JSON.parse(localStorage.getItem("user")).id,
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
        }

        UserService.update(request)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                setShowSuccess(true)
            }).catch(function (error) {
                console.log(error.response);
                setShowError(error.response.data.message)
            }
        );
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white"
                                   style={{textAlign: "left", paddingTop: "20px", paddingBottom: "20px"}}>
                            <Form>
                                <CSSTransition in={showError} classNames="my-node" timeout={500}
                                               unmountOnExit>
                                    <Alert variant="danger" onClose={() => setShowError(false)}
                                           dismissible>
                                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                        <p>{showError}! Try again.</p>
                                    </Alert>
                                </CSSTransition>
                                <CSSTransition in={showSuccess} classNames="my-node" timeout={500}
                                               unmountOnExit>
                                    <Alert variant="success" onClose={() => setShowSuccess(false)}
                                           dismissible>
                                        <Alert.Heading>It's OK!</Alert.Heading>
                                        <p>Your profile was edited successfully!</p>
                                    </Alert>
                                </CSSTransition>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>FIRSTNAME</b></Form.Label>
                                            <Form.Control type="text" className="my-input"
                                                          value={firstname}
                                                          onChange={changeFirstnameHandler}
                                                          placeholder="Enter firstname"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>LASTNAME</b></Form.Label>
                                            <Form.Control type="text" className="my-input"
                                                          value={lastname}
                                                          onChange={changeLastnameHandler}
                                                          placeholder="Enter lastname"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><b>USERNAME</b></Form.Label>
                                    <Form.Control type="text" className="my-input"
                                                  value={username}
                                                  onChange={changeUsernameHandler}
                                                  placeholder="Enter username"/>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><b>EMAIL</b></Form.Label>
                                    <Form.Control type="email" className="my-input"
                                                  value={email}
                                                  onChange={changeEmailHandler}
                                                  placeholder="Enter email"/>
                                </Form.Group>
                                <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                                    <Button variant="outline-success" size="lg" onClick={update}>
                                        Edit profile
                                    </Button>
                                </div>
                            </Form>
                            <hr/>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>NEW PASSWORD</b></Form.Label>
                                            <Form.Control type="text" className="my-input"
                                                          placeholder="Enter new password"/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>REPEAT NEW PASSWORD</b></Form.Label>
                                            <Form.Control type="email" className="my-input"
                                                          placeholder="Enter again new password"/>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                                    <Button variant="outline-success" size="lg" href="/profile/edit">
                                        Edit password
                                    </Button>
                                </div>
                            </Form>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default ProfileEditPage;