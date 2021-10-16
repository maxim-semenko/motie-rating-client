import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Modal, Row} from "react-bootstrap"
import {Cookies} from "react-cookie"
import '../../../styles/Animation.css'
import '../../../styles/FormControl.css'
import FilmService from "../../../service/FilmService";
import GenreService from "../../../service/GenreService";


function EditFilmModal(props) {
    const cookies = new Cookies()
    const [genreList, setGenreList] = useState([])

    const [name, setName] = useState('')
    const [country, setCountry] = useState('')
    const [year, setYear] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    useEffect(() => {
            if (genreList.length === 0) {
                GenreService.findAll()
                    .then(response => {
                        setGenreList(response.data)
                    }).catch(error => {
                        console.log(error)
                    }
                )
            }
        }, [genreList.length]
    )

    const handleSubmit = (event) => {
        event.preventDefault()
        let request = {
            name: name,
            country: country,
            year: year,
            timeInMinutes: time,
            price: price,
            imageURL: imageURL,
            description: description,
            genre: genre
        }
        FilmService.add(request)
            .then(response => {
                props.updateList();
                closeModal()
            }).catch(error => {
                // setShowError(true)
                console.log(error)
            }
        )
    }

    const closeModal = () => {
        props.onHide()
    }

    return (
        <Modal{...props} size="lg"
              dialogClassName="modal-90w public-profile-modal-class"
              aria-labelledby="example-custom-modal-styling-title"
              className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title>Edit film</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark">
                <Row>
                    <Col lg={12} style={{marginTop: "20px"}}>
                        <Form>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label style={{marginBottom: "0px"}}><b>NAME</b></Form.Label>
                                <Form.Control type="text" className="my-input"
                                              placeholder="Enter name"
                                              onChange={event => setName(event.target.value)}/>

                            </Form.Group>
                            <Row>
                                <Col>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label style={{marginBottom: "0px"}}><b>COUNTRY</b></Form.Label>
                                        <Form.Control type="text" className="my-input"
                                                      placeholder="Enter country"
                                                      onChange={event => setCountry(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label style={{marginBottom: "0px"}}><b>YEAR</b></Form.Label>
                                        <Form.Control type="text" className="my-input"
                                                      placeholder="Enter year"
                                                      onChange={event => setYear(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label style={{marginBottom: "0px"}}><b>TIME</b></Form.Label>
                                        <Form.Control type="text" className="my-input"
                                                      placeholder="Enter time"
                                                      onChange={event => setTime(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <Form.Group as={Col}>
                                        <Form.Label style={{marginBottom: "0px"}}><b>PRICE</b></Form.Label>
                                        <Form.Control type="text" className="my-input"
                                                      placeholder="Enter price"
                                                      onChange={event => setPrice(event.target.value)}/>
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Form.Group as={Col}>
                                <Form.Label style={{marginBottom: "0px"}}><b>IMAGE-URL</b></Form.Label>
                                <Form.Control type="text" className="my-input"
                                              placeholder="Enter url-image"
                                              onChange={event => setImageURL(event.target.value)}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{marginBottom: "0px"}}><b>GENRE</b></Form.Label>
                                <Form.Control className="my-input" as="select" aria-label="Default select example"
                                              name={"roles"}
                                              onChange={event => setGenre(JSON.parse(event.target.value))}>
                                    <option value="null">Select...</option>
                                    {genreList.map((option, index) =>
                                        <option key={index} value={JSON.stringify(option)}>
                                            {option.name}
                                        </option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                        </Form>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Label><b>DESCRIPTION</b></Form.Label>
                            <Form.Control as="textarea" type="text" className="my-input" rows={2}
                                          style={{minHeight: "75px", maxHeight: "75px", resize: "none"}}
                                          placeholder="Enter description"
                                          onChange={event => setDescription(event.target.value)}/>
                        </Form.Group>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeModal}>Close</Button>
                <Button variant="outline-primary" type="submit" onClick={handleSubmit}>Edit</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditFilmModal