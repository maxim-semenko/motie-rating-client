import React, {useEffect, useState} from 'react';
import NavigationBar from "../../common/NavigationBar";
import {Button, Col, Container, Form, Jumbotron} from "react-bootstrap";
import Footer from "../../common/Footer";
import FeedbackService from "../../../service/FeedbackService";
import AlertCSSTransition from "../../common/AlertCSSTransition";

function FeedbackPage() {

    const [listTypes, setListTypes] = useState([]);
    const [sending, setSending] = useState(false);

    //Values
    const [title, setTitle] = useState('')
    const [text, setText] = useState('')
    const [type, setType] = useState(null)

    // Values errors
    const [titleError, setTitleError] = useState('')
    const [textError, setTextError] = useState('')
    const [typeError, setTypeError] = useState('')

    const [showSuccess, setShowSuccess] = useState(false)
    const [showError, setShowError] = useState(false)

    const [successText, setSuccessText] = useState(false)
    const [errorText, setErrorText] = useState(false)

    useEffect(() => {
        FeedbackService.getAllTypes().then(resp => {
            console.log(resp.data.content)
            setListTypes(resp.data.content);
        })
    }, [])

    const changeTitleHandler = (event) => {
        setTitle(event.target.value)
        setTitleError('')
    }

    const changeTextHandler = (event) => {
        setText(event.target.value)
        setTextError('')
    }

    const changeTypeHandler = (event) => {
        setType(JSON.parse(event.target.value))
        setTypeError('')
    }


    const findErrors = (request) => {
        let isError = false;

        if (request.title.length === 0) {
            setTitleError("title can't be empty")
            isError = true
        } else if (request.title.length < 5) {
            setTitleError("title is so short")
            isError = true
        } else if (request.title.length > 50) {
            setTitleError("title is so long")
            isError = true
        }

        if (request.text.length === 0) {
            setTextError("text can't be empty")
            isError = true
        } else if (request.text.length < 20) {
            setTextError("text is so short")
            isError = true
        } else if (request.text.length > 1024) {
            setTextError("text is so long")
            isError = true
        }

        if (request.feedbackType === null) {
            setTypeError("type can't be empty")
            isError = true
        }

        return isError
    }

    const handleSend = () => {
        const request = {
            title: title,
            text: text,
            feedbackType: type
        }
        if (!findErrors(request)) {
            console.log(request)
            setSending(true)
            FeedbackService.create(request)
                .then(resp => {
                    console.log(resp)
                    setSending(false)
                    setSuccessText("Your feedback have sent successfully! Thanks you.")
                    setShowSuccess(true)
                })
                .catch(error => {
                    console.log(error)
                    setSending(false)
                    setShowError(true)
                    setTextError("Please, check your input date!")
                })
        }
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{marginLeft: "12px", marginBottom: "15px"}}><b>FEEDBACK</b></h1>
                    <AlertCSSTransition in={showSuccess}
                                        variant="success"
                                        textHeader="It's OK!"
                                        text={successText}
                                        close={() => setShowSuccess(false)}
                    />
                    <AlertCSSTransition in={showError}
                                        variant="danger"
                                        textHeader="Oh snap! You got an error!"
                                        text={errorText}
                                        close={() => setShowError(false)}
                    />
                    <Container style={{textAlign: "left"}}>
                        <Form>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{marginBottom: "0px"}}><b>TITLE</b></Form.Label>
                                <Form.Control
                                    type="text"
                                    className="my-input"
                                    placeholder="Enter title"
                                    isInvalid={titleError}
                                    onChange={changeTitleHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{titleError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label><b>TEXT</b></Form.Label>
                                <Form.Control as="textarea" type="text"
                                              className="my-input" rows={4}
                                              style={{minHeight: "75px", maxHeight: "100px", resize: "none"}}
                                              placeholder="Enter text"
                                              isInvalid={textError}
                                              onChange={changeTextHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{textError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{marginBottom: "0px"}}><b>TYPE FEEDBACK</b></Form.Label>
                                <Form.Control className="my-input"
                                              as="select"
                                              isInvalid={typeError}
                                              onChange={changeTypeHandler}
                                >
                                    <option key={0} value={"null"}>Select...</option>
                                    {listTypes.map((type, index) =>
                                        <option
                                            key={index}
                                            value={JSON.stringify(type)}>
                                            {type.name}
                                        </option>
                                    )}
                                </Form.Control>
                                <Form.Control.Feedback type='invalid'>{typeError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Button variant="outline-success"
                                        disabled={sending}
                                        onClick={!sending ? handleSend : null}>
                                    <b>{sending ? 'loading...' : 'Send'}</b>
                                </Button>{' '}
                            </Form.Group>
                        </Form>
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    );
}

export default FeedbackPage;