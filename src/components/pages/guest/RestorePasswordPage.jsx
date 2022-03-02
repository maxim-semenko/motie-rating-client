import React, {useEffect, useState} from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Button, Col, Container, Form, Jumbotron} from "react-bootstrap";
import MailService from "../../../service/MailService";
import AlertCSSTransition from "../../common/AlertCSSTransition";
import AuthService from "../../../service/AuthService";

function RestorePasswordPage(props) {

    useEffect(() => {
        if (localStorage.getItem("user") !== null) {
            props.history.push('/')
        }
    })

    const [sendingMail, setSendingMail] = useState(false);

    // Values
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')

    // Value's errors
    const [emailError, setEmailError] = useState('')
    const [codeError, setCodeError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    // Show messages
    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    // Messages
    const [successText, setSuccessText] = useState(false)
    const [errorText, setErrorText] = useState(false)


    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
        setEmailError('')
    }

    const changeCodeHandler = (event) => {
        setCode(event.target.value)
        setCodeError('')
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
        setPasswordError('')
    }

    const findErrors = (request) => {
        let errors = false

        if (request.email.length === 0) {
            setEmailError("email can't be empty")
            errors = true
        }
        if (request.emailCode.length === 0) {
            setCodeError("email code can't be empty")
            errors = true
        }
        if (request.newPassword.length === 0) {
            setPasswordError("password can't be empty")
            errors = true
        }

        return errors
    }

    const sendMail = () => {
        let request = {
            email: email,
            typeMessage: "RESTORE_PASSWORD",
        }
        if (email.length === 0) {
            setEmailError("email can't be empty")
        } else {
            setSendingMail(true)
            MailService.send(request)
                .then((resp) => {
                    console.log(resp.data)
                    setSendingMail(false)
                    setSuccessText("Success to sending email code! Check your mail account.")
                    setShowSuccess(true);
                })
                .catch(error => {
                    console.log(error.response.data)
                    setSendingMail(false)
                    setErrorText(error.response.data.message);
                    setShowError(true);
                })
        }
    }

    const submitChangePassword = () => {
        let request = {
            email: email,
            emailCode: code,
            newPassword: password
        }
        if (!findErrors(request)) {
            AuthService.restorePassword(request)
                .then(() => {
                    setShowSuccess(true)
                    setSuccessText("Your password was restore successfully! Redirect to home page after 5 sec")
                    setTimeout(function () {
                        props.history.push('/')
                    }, 5000);
                })
                .catch(error => {
                    setShowError(true)
                    setErrorText(error.response.data.message)
                })
        }
    }


    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{marginLeft: "12px", marginBottom: "15px"}}><b>RESTORE PASSWORD</b></h1>
                    <AlertCSSTransition in={showSuccess}
                                        variant="success"
                                        textHeader="It's OK!"
                                        text={successText}
                                        close={() => setShowSuccess(false)}/>
                    <AlertCSSTransition in={showError}
                                        variant="danger"
                                        textHeader="Oh snap! You got an error!"
                                        text={errorText}
                                        close={() => setShowError(false)}/>
                    <Container style={{textAlign: "left"}}>
                        <Form>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{marginBottom: "0px"}}><b>EMAIL</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="my-input"
                                    placeholder="Enter your email"
                                    isInvalid={emailError}
                                    onChange={changeEmailHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="outline-primary"
                                        disabled={sendingMail}
                                        onClick={!sendingMail ? sendMail : null}>
                                    <b>{sendingMail ? 'loading...' : 'Send code'}</b>
                                </Button>{' '}
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{marginBottom: "0px"}}><b>EMAIL CODE</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="my-input"
                                    placeholder="Enter your email code"
                                    isInvalid={codeError}
                                    onChange={changeCodeHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{codeError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{marginBottom: "0px"}}><b>NEW PASSWORD</b></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="my-input"
                                    placeholder="Enter your new password"
                                    isInvalid={passwordError}
                                    onChange={changePasswordHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="outline-success" onClick={submitChangePassword}>
                                    <b>Change password</b>
                                </Button>{' '}
                            </Form.Group>
                        </Form>
                    </Container>
                </Jumbotron>
            </Container>
        </div>
    );
}

export default RestorePasswordPage;