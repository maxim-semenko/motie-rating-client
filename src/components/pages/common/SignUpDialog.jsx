import React, {useState} from 'react'
import {Alert, Button, Form, Modal} from "react-bootstrap"
import AuthService from "../../../service/AuthService"
import CSSTransition from "react-transition-group/CSSTransition";

function SignUpDialog(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [showSuccessfulSignUp, setShowSuccessfulSignUp] = useState('');
    const [showErrorSignUp, setShowErrorSignUp] = useState('');

    // Errors
    const [firstnameError, setFirstnameError] = useState('')
    const [lastnameError, setLastnameError] = useState('')
    const [usernameError, setUsernameError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const changeUsernameHandler = (event) => {
        setUsername(event.target.value)
        setUsernameError("")
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
        setPasswordError("")
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

    /**
     * Method that register by user's params of from input form.
     * @param event
     */
    const register = (event) => {
        event.preventDefault()
        setShowErrorSignUp(false)
        if (!findFormErrorsForRegister()) {
            let request = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                username: username,
                password: password
            }
            AuthService.register(request)
                .then(response => {
                    console.log(response.data)
                    setShowSuccessfulSignUp(true)
                    setTimeout(function () {
                        if (props.show) {
                            props.onHide()
                        }
                    }, 5000);
                })
                .catch(error => {
                    console.log(error.response.data)
                    setShowErrorSignUp(error.response.data.message)
                })
        }
    }

    const findFormErrorsForRegister = () => {
        let isErrors = false

        // firstname errors
        if (!firstname || firstname === '') {
            isErrors = true
            setFirstnameError('firstname cannot be empty!')
        } else if (firstname.length < 2) {
            isErrors = true
            setFirstnameError('firstname is too short!')
        } else if (firstname.length > 25) {
            isErrors = true
            setFirstnameError('firstname is too long!')
        }

        // lastname errors
        if (!lastname || lastname === '') {
            isErrors = true
            setLastnameError('lastname cannot be empty!')
        } else if (lastname.length < 2) {
            isErrors = true
            setLastnameError('lastname is too short!')
        } else if (lastname.length > 25) {
            isErrors = true
            setLastnameError('lastname is too long!')
        }

        // username errors
        if (!username || username === '') {
            isErrors = true
            setUsernameError('username cannot be empty!')
        } else if (username.length < 2) {
            isErrors = true
            setUsernameError('username is too short!')
        } else if (username.length > 25) {
            isErrors = true
            setUsernameError('username is too long!')
        }

        // Email errors
        if (!email || email === '') {
            isErrors = true
            setEmailError('email cannot be empty!')
        } else if (email.length < 2) {
            isErrors = true
            setEmailError('email is too short!')
        } else if (email.length > 30) {
            isErrors = true
            setEmailError('email is too long!')
        }

        // Password errors
        if (!password || password === '') {
            isErrors = true
            setPasswordError('password cannot be empty!')
        } else if (password.length < 4) {
            isErrors = true
            setPasswordError('password is too short!')
        } else if (password.length > 255) {
            isErrors = true
            setPasswordError('password is too long!')
        }

        return isErrors
    }

    return (
        <Modal{...props} size="lg"
              dialogClassName="modal-90w public-profile-modal-class"
              aria-labelledby="example-custom-modal-styling-title"
              className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title>Sign up</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark">
                <CSSTransition in={showErrorSignUp} classNames="my-node" timeout={100} unmountOnExit>
                    <Alert variant="danger" onClose={() => setShowErrorSignUp(false)} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>{showErrorSignUp}</p>
                    </Alert>
                </CSSTransition>
                <CSSTransition in={showSuccessfulSignUp} classNames="my-node" timeout={100} unmountOnExit>
                    <Alert variant="success" onClose={() => setShowSuccessfulSignUp(false)} dismissible>
                        <Alert.Heading>All right! You have successfully registered!</Alert.Heading>
                        <p>Your username: {username}. Close after 5sec...</p>
                    </Alert>
                </CSSTransition>
                <Form>
                    <Form.Group>
                        <Form.Label><b>FIRSTNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter firstname"
                                      autocomplete="off"
                                      isInvalid={firstnameError}
                                      onChange={changeFirstnameHandler}
                        />
                        <Form.Control.Feedback type='invalid'>{firstnameError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>LASTNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter lastname"
                                      autocomplete="off"
                                      isInvalid={lastnameError}
                                      onChange={changeLastnameHandler}
                        />
                        <Form.Control.Feedback type='invalid'>{lastnameError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>EMAIL</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="email"
                                      placeholder="Enter email"
                                      autocomplete="off"
                                      isInvalid={emailError}
                                      onChange={changeEmailHandler}
                        />
                        <Form.Control.Feedback type='invalid'>{emailError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>USERNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter username"
                                      autocomplete="off"
                                      isInvalid={usernameError}
                                      onChange={changeUsernameHandler}
                        />
                        <Form.Control.Feedback type='invalid'>{usernameError}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>PASSWORD</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="password"
                                      placeholder="Enter password"
                                      autocomplete="off"
                                      isInvalid={passwordError}
                                      onChange={changePasswordHandler}
                        />
                        <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={props.onHide}>Close</Button>
                <Button variant="outline-primary" type="submit" onClick={register}>Sign up</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default SignUpDialog