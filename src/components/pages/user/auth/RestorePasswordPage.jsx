import React, {useState} from 'react';
import NavigationBar from "../../../common/NavigationBar";
import {Button, Col, Container, Form, Jumbotron} from "react-bootstrap";
import MailService from "../../../../service/MailService";

function RestorePasswordPage() {

    const [sendingMail, setSendingMail] = useState(false);

    // Values
    const [email, setEmail] = useState('')

    // Value's errors
    const [emailError, setEmailError] = useState('')

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

    const sendMail = () => {
        setSendingMail(true)
        let request = {
            email: email,
            typeMessage: "RESTORE_PASSWORD",
        }
        MailService.send(request)
            .then((resp) => {
                console.log(resp.data)
                setSendingMail(false)
                setSuccessText("Success to sending email code! Check your mail account.")
                setShowSuccess(true);
            })
            .catch(error => {
                console.log(error)
                setSendingMail(false)
                setErrorText("Failed to sending email code!");
                setShowError(true);
            })
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{marginLeft: "12px", marginBottom: "15px"}}><b>RESTORE PASSWORD</b></h1>
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
                                    // isInvalid={titleError}
                                    // onChange={changeTitleHandler}
                                />
                                <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{marginBottom: "0px"}}><b>NEW PASSWORD</b></Form.Label>
                                <Form.Control
                                    type="password"
                                    className="my-input"
                                    placeholder="Enter your new password"
                                    // isInvalid={titleError}
                                    // onChange={changeTitleHandler}
                                />
                                <Form.Control.Feedback type='invalid'></Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="outline-success">
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