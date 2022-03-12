import React, {useState} from 'react'
import {Alert, Button, Form, Modal} from "react-bootstrap"
import AuthService from "../../../../service/AuthService"
import CSSTransition from "react-transition-group/CSSTransition";
import UserValidator from "../../../../validation/UserValidator";

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

        let errors = UserValidator.validateAllForSignUp(firstname, lastname, username, email, password)
        setFirstnameError(errors.firstnameError)
        setLastnameError(errors.lastnameError)
        setUsernameError(errors.usernameError)
        setEmailError(errors.emailError)
        setPasswordError(errors.passwordError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
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
                                      autoComplete="off"
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
                                      autoComplete="off"
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
                                      autoComplete="off"
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
                                      autoComplete="off"
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
                                      autoComplete="off"
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