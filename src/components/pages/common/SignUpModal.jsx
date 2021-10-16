import React, {useState} from 'react'
import {Button, Form, Modal} from "react-bootstrap"
import AuthService from "../../../service/AuthService"

function SignUpModal(props) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    /**
     * Method that register by user's params of from input form.
     * @param event
     */
    const register = (event) => {
        event.preventDefault()
        let request = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password
        }

        AuthService.register(request).then(response => {
            console.log(response.data)
            props.onHide()
        })
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
                <Form>
                    <Form.Group>
                        <Form.Label><b>FIRSTNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter firstname"
                                      autocomplete="off"
                                      onChange={event => setFirstname(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>LASTNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter lastname"
                                      autocomplete="off"
                                      onChange={event => setLastname(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>EMAIL</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="email"
                                      placeholder="Enter email"
                                      autocomplete="off"
                                      onChange={event => setEmail(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>USERNAME</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="text"
                                      placeholder="Enter username"
                                      autocomplete="off"
                                      onChange={event => setUsername(event.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label><b>PASSWORD</b></Form.Label>
                        <Form.Control className="my-input"
                                      type="password"
                                      placeholder="Enter password"
                                      onChange={event => setPassword(event.target.value)}/>
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

export default SignUpModal