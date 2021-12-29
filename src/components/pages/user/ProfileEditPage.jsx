import React, {useEffect, useState} from 'react';
import {Alert, Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";
import CSSTransition from "react-transition-group/CSSTransition";
import NavigationBar from "../common/NavigationBar";
import Footer from "../../Footer";
import UserService from "../../../service/UserService";
import {Link} from "react-router-dom";
import DeleteProfileDialog from "./DeleteProfileDialog";
import UserValidator from "../../../validation/UserValidator";

function ProfileEditPage() {

    const [userId, setUserId] = useState(0)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [showError, setShowError] = useState(false)
    const [showSuccess, setShowSuccess] = useState(false)
    const [showDeleteProfileDialog, setShowDeleteProfileDialog] = useState(false)

    // Errors
    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [oldPasswordError, setOldPasswordError] = useState('')
    const [newPasswordError, setNewPasswordError] = useState('')

    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("user"))
        setUserId(user.id)
        setFirstname(user.firstname)
        setLastname(user.lastname)
        setUsername(user.username)
        setEmail(user.email)
    }, [])

    const changeUsernameHandler = (event) => {
        setUsername(event.target.value)
        setUsernameError("")
    }

    const changeOldPasswordHandler = (event) => {
        setOldPassword(event.target.value)
        setOldPasswordError("")
    }

    const changeNewPasswordHandler = (event) => {
        setNewPassword(event.target.value)
        setNewPasswordError("")
    }

    const changeFirstnameHandler = (event) => {
        setFirstname(event.target.value)
        setFirstnameError("")
    }

    const changeLastnameHandler = (event) => {
        setLastname(event.target.value)
        setLastnameError("")
    }

    const changeEmailHandler = (event) => {
        setEmail(event.target.value)
        setEmailError("")
    }

    const update = (event) => {
        event.preventDefault();
        setShowSuccess(false)

        if (!findFormErrorsForUpdate()) {
            let request = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
            }

            UserService.updateById(request, userId)
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
    }

    const findFormErrorsForUpdate = () => {
        let isErrors = false

        let errors = UserValidator.validateAllWithoutPassword(firstname, lastname, username, email)
        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setUsernameError(errors.usernameError)
        setEmailError(errors.emailError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors
    }

    const findFormErrorsForUpdatePassword = () => {
        let isErrors = false

        // oldPassword errors
        let error = UserValidator.validatePassword(oldPassword)
        if (error !== "") {
            setOldPasswordError(error);
            isErrors = true
        }

        // newPassword errors
        error = UserValidator.validatePassword(newPassword)
        if (error !== "") {
            setNewPasswordError(error);
            isErrors = true
        }

        return isErrors
    }

    const updatePassword = (event) => {
        event.preventDefault();
        setShowSuccess(false)
        if (!findFormErrorsForUpdatePassword()) {
            let request = {
                oldPassword: oldPassword,
                newPassword: newPassword
            }
            UserService.updatePasswordById(request, userId)
                .then((response) => {
                    console.log(response.data);
                    setShowSuccess(true)
                }).catch(function (error) {
                    console.log(error.response);
                    setShowError(error.response.data.message)
                }
            );
        }
    }

    const showDialog = () => {
        if (showDeleteProfileDialog) {
            return (
                <DeleteProfileDialog
                    show={showDeleteProfileDialog}
                    onHide={() => setShowDeleteProfileDialog(false)}
                />
            )
        }
    }

    return (
        <div>
            <NavigationBar/>
            {showDialog()}
            <Container>
                <Row>
                    <Col lg={12} style={{marginTop: "20px", textAlign: "left"}}>
                        <Link to="/profile/cabinet">
                            <Button variant="outline-danger"
                                    style={{marginBottom: "20px"}}>
                                <b>Back to profile</b>
                            </Button>
                        </Link>{' '}
                        <Jumbotron className="bg-dark text-white"
                                   style={{textAlign: "left", paddingTop: "20px", paddingBottom: "20px"}}>
                            <Form>
                                <CSSTransition in={showError}
                                               classNames="my-node"
                                               timeout={500}
                                               unmountOnExit>
                                    <Alert variant="danger" onClose={() => setShowError(false)}
                                           dismissible>
                                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                        <p>{showError}! Try again.</p>
                                    </Alert>
                                </CSSTransition>
                                <CSSTransition in={showSuccess}
                                               classNames="my-node"
                                               timeout={500}
                                               unmountOnExit>
                                    <Alert variant="success"
                                           onClose={() => setShowSuccess(false)}
                                           dismissible>
                                        <Alert.Heading>It's OK!</Alert.Heading>
                                        <p>Your profile was edited successfully!</p>
                                    </Alert>
                                </CSSTransition>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>FIRSTNAME</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          autocomplete="off"
                                                          value={firstname}
                                                          onChange={changeFirstnameHandler}
                                                          isInvalid={firstnameError}
                                                          placeholder="Enter firstname"
                                            />
                                            <Form.Control.Feedback
                                                type='invalid'>{firstnameError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>LASTNAME</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          autocomplete="off"
                                                          value={lastname}
                                                          onChange={changeLastnameHandler}
                                                          isInvalid={lastnameError}
                                                          placeholder="Enter lastname"
                                            />
                                            <Form.Control.Feedback
                                                type='invalid'>{lastnameError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><b>USERNAME</b></Form.Label>
                                    <Form.Control type="text"
                                                  className="my-input"
                                                  autocomplete="off"
                                                  value={username}
                                                  onChange={changeUsernameHandler}
                                                  isInvalid={usernameError}
                                                  placeholder="Enter username"
                                    />
                                    <Form.Control.Feedback type='invalid'>{usernameError}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label><b>EMAIL</b></Form.Label>
                                    <Form.Control type="email"
                                                  className="my-input"
                                                  autocomplete="off"
                                                  value={email}
                                                  onChange={changeEmailHandler}
                                                  isInvalid={emailError}
                                                  placeholder="Enter email"
                                    />
                                    <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                                </Form.Group>
                                <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                                    <Button variant="outline-danger"
                                            onClick={() => setShowDeleteProfileDialog(true)}>
                                        <b>Delete account</b>
                                    </Button>{' '}
                                    <Button variant="outline-success"
                                            onClick={update}>
                                        <b>Edit profile</b>
                                    </Button>
                                </div>
                            </Form>
                            <hr/>
                            <Form>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>OLD PASSWORD</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          isInvalid={oldPasswordError}
                                                          autocomplete="off"
                                                          onChange={changeOldPasswordHandler}
                                                          placeholder="Enter old password"
                                            />
                                            <Form.Control.Feedback
                                                type='invalid'>{oldPasswordError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label><b>NEW PASSWORD</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          isInvalid={newPasswordError}
                                                          autocomplete="off"
                                                          onChange={changeNewPasswordHandler}
                                                          placeholder="Enter new password"
                                            />
                                            <Form.Control.Feedback
                                                type='invalid'>{newPasswordError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                                    <Button variant="outline-success" onClick={updatePassword}>
                                        <b>Edit password</b>
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