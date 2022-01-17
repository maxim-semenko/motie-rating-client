import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Col, Form, Modal, Row} from "react-bootstrap";
import {createCountry, getCountries, updateCountry} from "../../../../redux/country/CountryAction";
import {toast} from "react-toastify";
import CountryValidator from "../../../../validation/CountryValidator";

function CreateUpdateCountryDialog(props) {
    const dispatch = useDispatch()
    const {country, loading, currentPage, sizePage} = useSelector(state => state.dataCountries)
    const [id, setId] = useState(0);
    const [name, setName] = useState('');

    // Errors
    const [nameError, setNameError] = useState('')

    useEffect(() => {
        if (props.method === "update") {
            setId((country.id))
            setName(country.name)
        }
    }, [country.id, country.name, props.method])

    const handleSubmit = () => {
        const request = {name: name}
        if (!findFormErrors(request)) {
            if (props.method === "create") {
                dispatch(createCountry(request))
                    .then((response) => {
                        console.log(response)
                        dispatch(getCountries(currentPage, sizePage))
                        notifySuccess('The new country was created successfully!')
                    })
                    .catch((error) => {
                        console.log(error)
                        notifyError('Error to create a new country, please check your input data!')
                    });
            } else {
                dispatch(updateCountry(request, id))
                    .then((response) => {
                        console.log(response)
                        dispatch(getCountries(currentPage, sizePage))
                        notifySuccess('The country was updated successfully!')
                    })
                    .catch((error) => {
                        console.log(error)
                        notifyError('Error to update the country, please check your input data!')
                    });
            }
        }
    }

    const notifySuccess = (text) => toast.success(text, {
        position: "top-right",
    });

    const notifyError = (text) => toast.error(text, {
        position: "top-right",
    });

    const findFormErrors = (request) => {
        let isErrors = false
        let error = CountryValidator.validate(request.name)
        if (error) {
            setNameError(error)
            isErrors = true
        }

        return isErrors
    }

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
                                        autocomplete="off"
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
                        <b>{props.method === "create" ? "Create country" : "Update country"}</b>
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

export default CreateUpdateCountryDialog;