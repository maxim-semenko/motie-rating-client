import React, {Component} from 'react';
import {Alert, Button, Col, Container, Form, Jumbotron, Row} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import CSSTransition from "react-transition-group/CSSTransition";
import Footer from "../Footer";
import UserService from "../../service/UserService";

class ClassProfileEditPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            showError: false,
            showSuccess: false,
            errors: new Map([
                ["username", ''],
                ["email", ''],
                ["password", ''],
            ])
        }
        this.update = this.update.bind(this);
    }

    componentDidMount() {
        this.setState({firstname: this.state.user.firstname});
        this.setState({lastname: this.state.user.lastname});
        this.setState({username: this.state.user.username});
        this.setState({email: this.state.user.email});
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

    update = (e) => {
        e.preventDefault();
        let self = this;
        let request = {
            id: this.state.user.id,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            username: this.state.username,
            roles: this.state.user.roles
        }

        UserService.update(request)
            .then((response) => {
                console.log(response.data);
                localStorage.setItem("user", JSON.stringify(response.data));
                self.setState({showSuccess: true});
            }).catch(function (error) {
                if (error.response.data) {
                    self.setState({showError: error.response.data.message});
                    console.log(error.response.data.message);
                }
            }
        );
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Jumbotron className="bg-dark text-white"
                                       style={{textAlign: "left", paddingTop: "20px", paddingBottom: "20px"}}>
                                <Form>
                                    <CSSTransition in={this.state.showError} classNames="my-node" timeout={500}
                                                   unmountOnExit>
                                        <Alert variant="danger" onClose={() => this.setState({showError: false})}
                                               dismissible>
                                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                                            <p>{this.state.showError}! Try again.</p>
                                        </Alert>
                                    </CSSTransition>
                                    <CSSTransition in={this.state.showSuccess} classNames="my-node" timeout={500}
                                                   unmountOnExit>
                                        <Alert variant="success" onClose={() => this.setState({showSuccess: false})}
                                               dismissible>
                                            <Alert.Heading>It's OK!</Alert.Heading>
                                            <p>Your profile was edited successfully!</p>
                                        </Alert>
                                    </CSSTransition>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label><b>FIRSTNAME</b></Form.Label>
                                                <Form.Control type="text" className="sign-in-input"
                                                              value={this.state.firstname}
                                                              onChange={this.changeFirstnameHandler}
                                                              placeholder="Enter firstname"/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label><b>LASTNAME</b></Form.Label>
                                                <Form.Control type="text" className="sign-in-input"
                                                              value={this.state.lastname}
                                                              onChange={this.changeLastnameHandler}
                                                              placeholder="Enter lastname"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label><b>USERNAME</b></Form.Label>
                                        <Form.Control type="text" className="sign-in-input"
                                                      value={this.state.username}
                                                      onChange={this.changeUsernameHandler}
                                                      placeholder="Enter username"/>
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label><b>EMAIL</b></Form.Label>
                                        <Form.Control type="email" className="sign-in-input"
                                                      value={this.state.user.email}
                                                      onChange={this.changeEmailHandler}
                                                      placeholder="Enter email"/>
                                    </Form.Group>
                                    <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                                        <Button variant="outline-success" size="lg" onClick={this.update}>
                                            Edit profile
                                        </Button>
                                    </div>
                                </Form>
                                <hr/>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label><b>NEW PASSWORD</b></Form.Label>
                                                <Form.Control type="text" className="sign-in-input"
                                                              placeholder="Enter new password"/>
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group as={Col} controlId="formGridEmail">
                                                <Form.Label><b>REPEAT NEW PASSWORD</b></Form.Label>
                                                <Form.Control type="email" className="sign-in-input"
                                                              placeholder="Enter again new password"/>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <div style={{textAlign: "right", paddingRight: "1.5%"}}>
                                        <Button variant="outline-success" size="lg" href="/profile/edit">
                                            Edit password
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
}

export default ClassProfileEditPage;