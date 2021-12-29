import React, {useState} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import UserService from "../../../service/UserService";
import AuthService from "../../../service/AuthService";
import {Cookies} from "react-cookie"
import {useHistory} from "react-router-dom";
import CSSTransition from "react-transition-group/CSSTransition";

function DeleteProfileDialog(props) {
    const history = useHistory('');
    const cookies = new Cookies()
    const [password, setPassword] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [showError, setShowError] = useState('')
    const [showSuccess, setShowSuccess] = useState('')

    const handleSubmit = () => {
        setShowError(false)
        if (!findErrors()) {
            let id = JSON.parse(localStorage.getItem("user")).id
            UserService.deleteAccount(password, id)
                .then(response => {
                    console.log(response.data)
                    setShowSuccess("Your account have deleted successfully! You will go to home page after 5sec...")
                    setTimeout(function () {
                        if (props.show) {
                            AuthService.logout(cookies).then(() => {
                                history.push('/');
                            })
                        }
                    }, 5000);
                })
                .catch(error => {
                    console.log(error.response.data)
                    if (error.response.status === 400) {
                        setShowError("Passwords not equals!")
                    } else if (error.response.status === 404) {
                        setShowError("Current user not found!")
                    }
                })
        }
    }

    const changePasswordHandler = (event) => {
        setPassword(event.target.value)
        setPasswordError("")
    }

    const findErrors = () => {
        let isErrors = false

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

        return isErrors;
    }

    const closeModal = () => {
        props.onHide()
    }

    const showContent = () => {
        return (
            <div style={{color: "white"}}>
                <b>
                    <Alert variant="warning">
                        WARNING! If you delete your account, it will be forever and you will not be able to restore it!
                    </Alert>
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
                            <p>{showSuccess}</p>
                        </Alert>
                    </CSSTransition>
                    <h5>
                        <p>For security, you should to input your password of account:</p>
                        <Form>
                            <Form.Control
                                type="password"
                                className="my-input"
                                placeholder="Enter password"
                                isInvalid={passwordError}
                                onChange={changePasswordHandler}
                            />
                            <Form.Control.Feedback type='invalid'>{passwordError}</Form.Control.Feedback>
                        </Form>
                    </h5>
                </b>
            </div>
        )
    }


    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#9a9da0"}}><b>Delete your account</b></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    {showContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" disabled={showSuccess}
                            onClick={closeModal}>Close</Button>
                    <Button variant={"outline-danger"}
                            type="submit"
                            disabled={showSuccess}
                            onClick={handleSubmit}>
                        Delete account
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DeleteProfileDialog;