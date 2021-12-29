import React, {useState} from 'react'
import {Alert, Button, Form, Modal} from "react-bootstrap"
import CSSTransition from "react-transition-group/CSSTransition"
import {Cookies} from "react-cookie"
import AuthService from "../../../service/AuthService"
import '../../../styles/Animation.css'
import '../../../styles/FormControl.css'
import {Link} from "react-router-dom";
import UserValidator from "../../../validation/UserValidator";

function SignInDialog(props) {
    const cookies = new Cookies()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showError, setShowError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    /**
     * Method that set username value
     * @param event
     */
    const changeUsernameHandler = (event) => {
        setUsernameError('')
        setUsername(event.target.value)
    }

    /**
     * Method that set password value
     * @param event
     */
    const changePasswordHandler = (event) => {
        setPasswordError('')
        setPassword(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (!findFormErrors()) {
            login(event)
        }
    }

    /**
     * Method that find all errors in input form.
     * @returns {boolean}
     */
    const findFormErrors = () => {
        let isErrors = false
        let error

        // username errors
        error = UserValidator.validateUsername(username)
        if (error !== "") {
            setUsernameError(error);
            isErrors = true
        }

        // password errors
        error = UserValidator.validatePassword(password)
        if (error !== "") {
            setPasswordError(error);
            isErrors = true
        }
        return isErrors
    }

    /**
     * Method that perform authentication
     * @param event
     */
    const login = (event) => {
        event.preventDefault()
        AuthService.login({username: username, password: password})
            .then(response => {
                localStorage.setItem("user", JSON.stringify(response.data.user))
                cookies.set("jwt", response.data.token, {path: "/", sameSite: "strict", maxAge: 3600 * 24 * 60})
                props.setIsLoginMethod()
                closeModal()
            }).catch(error => {
                if (error.response.status === 400) {
                    setShowError("Profile was locked!")
                } else if (error.response.status === 404 || error.response.status === 403) {
                    setShowError("Profile was not founded! Please, check your input username and password")
                }
                console.log(error)
            }
        )
    }

    const closeModal = () => {
        props.onHide()
    }

    return (
        <Modal{...props} size="lg"
              dialogClassName="modal-90w public-profile-modal-class"
              aria-labelledby="example-custom-modal-styling-title"
              className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign in</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark">
                <CSSTransition in={showError} classNames="my-node" timeout={100} unmountOnExit>
                    <Alert variant="danger" onClose={() => setShowError(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>{showError}</p>
                    </Alert>
                </CSSTransition>
                <Form>
                    <Form.Group>
                        <Form.Label><b>USERNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter username"
                                      autocomplete="off"
                                      onChange={changeUsernameHandler}
                                      isInvalid={usernameError}/>
                        <Form.Control.Feedback type='invalid'>{usernameError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>PASSWORD</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="password"
                                      placeholder="Enter password"
                                      autocomplete="off"
                                      onChange={changePasswordHandler}
                                      isInvalid={passwordError}/>
                        <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
                <Link to={"/restore-password"}>
                    <b style={{color: "white"}}>Forgot password?</b>
                </Link>

            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeModal}>Close</Button>
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Sign in</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignInDialog