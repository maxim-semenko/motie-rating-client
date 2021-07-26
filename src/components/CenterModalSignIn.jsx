import React, {Component} from 'react';
import {Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import AuthService from "../service/AuthService";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

class CenterModalSignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.auth = this.auth.bind(this);
    }

    changeUsernameHandler = (event) => {
        this.setState({username: event.target.value})
    }

    changePasswordHandler = (event) => {
        this.setState({password: event.target.value})
    }

    auth = (e) => {
        e.preventDefault();
        let request = {username: this.state.username, password: this.state.password}

        AuthService.login(request)
            .then((response) => {
                localStorage.setItem("user", JSON.stringify(response.data.user));
                cookies.set("jwt", response.data.token, {path: "/", sameSite: "strict", maxAge: 3600 * 24 * 60});
                this.props.onHide();
            }).catch(function (error) {
                console.log("!!!!!");
                console.log(error.response.status);
            }
        );


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
            <Modal
                {...this.props}
                size="lg"

                // aria-labelledby="contained-modal-title-vcenter"
                // centered
            >
                <Modal.Header closeButton style={{background: "#343a40"}}>
                    <Modal.Title id="contained-modal-title-vcenter">Sign in</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{background: "#343a40"}}>
                    <Form>
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
                    <Button variant="primary" type="submit" onClick={this.auth}>Sign in</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CenterModalSignIn;