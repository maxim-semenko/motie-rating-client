import React, {Component} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import AuthService from "../service/AuthService";

class ClassCenterModalSignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstname: '',
            lastname: '',
            email: ''
        }

        this.register = this.register.bind(this);
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value})
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    changeFirstnameHandler = (event) => {
        this.setState({firstname: event.target.value})
    }

    changeLastnameHandler = (event) => {
        this.setState({lastname: event.target.value})
    }

    changeEmailHandler = (event) => {
        this.setState({email: event.target.value})
    }

    register = (e) => {
        e.preventDefault();
        let request = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            password: this.state.password
        }

        AuthService.register(request).then((response) => {
            console.log(response.data);
        });
    }

    render() {
        const buttonStyle = {
            border: "none",
            borderBottom: "1px solid grey",
            borderRadius: "0px",
            boxShadow: "none",
            padding: "0 0 0 0",
            color: "white",
            background: "transparent"
        }
        return (
            <Modal{...this.props} size="lg">
                <Modal.Header closeButton style={{background: "#343a40"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Sign up</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "#343a40"}}>
                    <Form>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><b>FIRSTNAME</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter firstname" style={buttonStyle}
                                          onChange={this.changeFirstnameHandler}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><b>LASTNAME</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter lastname" style={buttonStyle}
                                          onChange={this.changeLastnameHandler}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><b>EMAIL</b></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" style={buttonStyle}
                                          onChange={this.changeEmailHandler}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label><b>USERNAME</b></Form.Label>
                            <Form.Control type="text" placeholder="Enter username" autocomplete="off"
                                          style={buttonStyle}
                                          onChange={this.changeUsernameHandler}/>
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Label><b>PASSWORD</b></Form.Label>
                            <Form.Control type="password" placeholder="Enter password" style={buttonStyle}
                                          onChange={this.changePasswordHandler}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer style={{background: "#343a40"}}>
                    <Button onClick={this.props.onHide}>Close</Button>
                    <Button variant="primary" type="submit" onClick={this.register}>Sign up</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ClassCenterModalSignUp;