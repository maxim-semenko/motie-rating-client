import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {toast} from "react-toastify";
import {createGenre, updateGenre} from "../../../../redux/genre/GenreAction";
import GenreValidator from "../../../../validation/GenreValidator";
import 'react-toastify/dist/ReactToastify.css'

function CreateUpdateGenreDialog(props) {
    const dispatch = useDispatch()
    const {genre, loading} = useSelector(state => state.dataGenres)
    const [id, setId] = useState(0);
    const [name, setName] = useState('');

    // Errors
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        if (props.method === "update") {
            setId((genre.id))
            setName(genre.name)
        }
    }, [genre.id, genre.name, props.method])

    const handleSubmit = () => {
        const request = {name: name}
        if (!findFormErrors(request)) {
            if (props.method === "create") {
                dispatch(createGenre(request))
                    .then((response) => {
                        console.log(response)
                        notifySuccess('The new genre was created successfully!')
                    })
                    .catch((error) => {
                        console.log(error)
                        notifyError('Error to create a new genre, please check your input data!')
                    });
            } else {
                dispatch(updateGenre(request, id))
                    .then((response) => {
                        console.log(response)
                        notifySuccess('The genre was updated successfully!')
                    })
                    .catch((error) => {
                        console.log(error)
                        notifyError('Error to update the genre, please check your input data!')
                    });
            }
        }
    }


    const findFormErrors = (request) => {
        let isErrors = false
        let error = GenreValidator.validate(request.name)
        if (error) {
            setNameError(error)
            isErrors = true
        }

        return isErrors
    }

    const notifySuccess = (text) => toast.success(text, {
        autoClose: 2000,
        position: "top-right",
    });

    const notifyError = (text) => toast.error(text, {
        autoClose: 2000,
        position: "top-right",
    });


    /**
     * Method that set film's name value.
     * @param event event
     */
    const changeNameHandler = (event) => {
        setName(event.target.value)
        setNameError('')
    }

    const showContent = () => {
        if (loading) {
            return (
                <div>
                    loading...
                </div>
            )
        } else {
            return (
                <div style={{color: "white"}}>
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Form enctype="multipart/form-data">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label style={{marginBottom: "0px"}}><b>NAME</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="my-input"
                                        placeholder="Enter name"
                                        autoComplete="off"
                                        value={name}
                                        onChange={changeNameHandler}
                                        isInvalid={nameError}
                                    />
                                    <Form.Control.Feedback type='invalid'>{nameError}</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </div>
            )
        }
    }

    toast.configure()
    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#9a9da0"}}>
                        <b>{props.method === "create" ? "Create genre" : "Update genre"}</b>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    {showContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => props.onHide()}>Close</Button>
                    <Button variant={props.method === "create" ? "outline-primary" : "outline-success"}
                            type="submit"
                            onClick={handleSubmit}>
                        {props.method === "create" ? "Create" : "Update"}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default CreateUpdateGenreDialog;