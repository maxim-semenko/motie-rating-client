import React, {Component} from 'react';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AuthService from "../service/AuthService";
import {Cookies} from "react-cookie";
import '../styles/Example.css'
import '../styles/FormControl.css'
import CSSTransition from "react-transition-group/CSSTransition";
import Alert from "react-bootstrap/Alert";

const cookies = new Cookies();

class ClassCenterModalSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showError: false,
            errors: new Map([
                ["username", ''],
                ["password", ''],
            ])
        }
        this.auth = this.auth.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.closeWindow = this.closeWindow.bind(this);
    }

    // Method that set username value
    changeUsernameHandler = (event) => {
        this.state.errors.set("username", '')
        this.setState({username: event.target.value})
    }

    // Method that set password value
    changePasswordHandler = (event) => {
        this.state.errors.set("password", '')
        this.setState({password: event.target.value})
    }

    // Method that perform authentication
    auth = (e) => {
        e.preventDefault();
        let self = this;
        AuthService.login({username: this.state.username, password: this.state.password})
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                cookies.set("jwt", response.data.token, {path: "/", sameSite: "strict", maxAge: 3600 * 24 * 60});
                this.props.setIsLoginMethod();
                this.closeWindow()
            }).catch(function (error) {
                self.setState({showError: true});
            }
        );
    }

    findFormErrors = () => {
        const username = this.state.username;
        const password = this.state.password;
        let newErrors = new Map();

        // name errors
        if (!username || username === '') {
            newErrors.set("username", 'username cannot be blank!');
        } else if (username.length < 3) {
            newErrors.set("username", 'username is too short!');
        }
        // password errors
        if (!password || password === '') {
            newErrors.set("password", 'password cannot be blank!');
        }

        return newErrors;
    }

    handleSubmit = e => {
        e.preventDefault();
        let formErrors = this.findFormErrors();
        if (formErrors.size === 0) {
            this.auth(e);
        } else {
            this.setState({errors: this.findFormErrors()});
        }
    }

    closeWindow() {
        this.setState({showError: false});
        this.props.onHide();
    }

    render() {
        return (
            <Modal{...this.props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton className="special_modal">
                    <Modal.Title id="contained-modal-title-vcenter">Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark" closeButton>
                    <CSSTransition in={this.state.showError} classNames="my-node" timeout={500} unmountOnExit>
                        <Alert variant="danger" onClose={() => this.setState({showError: false})} dismissible>
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>Profile was not founded! Please, check your input username and password</p>
                        </Alert>
                    </CSSTransition>
                    <Form>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label><b>USERNAME</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter username" autocomplete="off"
                                          onChange={this.changeUsernameHandler}
                                          className="sign-in-input"
                                          isInvalid={this.state.errors.get("username")}/>
                            <Form.Control.Feedback
                                type='invalid'>{this.state.errors.get("username")}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><b>PASSWORD</b></Form.Label>
                            <Form.Control type="password" placeholder="Enter password" autocomplete="off"
                                          onChange={this.changePasswordHandler}
                                          className="sign-in-input"
                                          isInvalid={this.state.errors.get("password")}/>
                            <Form.Control.Feedback type='invalid'>
                                {this.state.errors.get("password")}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer className="special_modal">
                    <Button variant="outline-danger" onClick={this.closeWindow}>Close</Button>
                    <Button variant="outline-primary" type="submit" onClick={this.handleSubmit}>Sign in</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ClassCenterModalSignIn;