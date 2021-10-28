import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Modal, Row} from "react-bootstrap"
import '../../../../styles/Animation.css'
import '../../../../styles/FormControl.css'
import FilmService from "../../../../service/FilmService";
import GenreService from "../../../../service/GenreService";
import CountryService from "../../../../service/CountryService";
import {useSelector} from "react-redux";


function CreateUpdateFilmModal(props) {
    const [genreList, setGenreList] = useState([])
    const [countryList, setCountryList] = useState([])

    const {film, loading} = useSelector(state => state.dataFilms)
    const [loadingAll, setLoadingAll] = useState(true)

    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState('')
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState('')
    const [country, setCountry] = useState('')

    const [usernameError, setUsernameError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    /**
     * Method that set username value
     * @param event
     */
    // const changeUsernameHandler = (event) => {
    //     setUsernameError('')
    //     setUsername(event.target.value)
    // }

    useEffect(() => {
            if (props.method === "update") {
                setName(film.name)
                setYear(film.year)
                setTime(film.timeInMinutes)
                setPrice(film.price)
                setImageURL(film.imageURL)
                setDescription(film.description)
                setCountry(film.country)
                setGenre(film.genre)
            }
            CountryService.findAll()
                .then(response => {
                    setCountryList(response.data)
                }).catch(error => {
                    console.log(error)
                }
            )
            GenreService.findAll()
                .then(response => {
                    setGenreList(response.data)
                    setLoadingAll(false)
                }).catch(error => {
                    console.log(error)
                }
            )

        }, [film.name, props.method]
    )

    /**
     * Method that set password value
     * @param event
     */
    const changePasswordHandler = (event) => {
        setPasswordError('')
        // setPassword(event.target.value)
    }

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
        FilmService.create(request)
            .then(response => {
                // props.updateList();
                closeModal()
            }).catch(error => {
                // setShowError(true)
                console.log(error)
            }
        )
        // if (!findFormErrors()) {
        //     login(event)
        // }
    }


    // const findFormErrors = () => {
    //     let isErrors = false
    //     // name errors
    //     if (!username || username === '') {
    //         isErrors = true
    //         setUsernameError('username cannot be blank!')
    //     } else if (username.length < 3) {
    //         isErrors = true
    //         setUsernameError('username is too short!')
    //     }
    //     // password errors
    //     if (!password || password === '') {
    //         isErrors = true
    //         setPasswordError('password cannot be blank!')
    //     }
    //     return isErrors
    // }

    const showContent = () => {
        if (!loadingAll) {
            return (
                <div>
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Form>
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label style={{marginBottom: "0px"}}><b>NAME</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="my-input"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={event => setName(event.target.value)}
                                    />
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label style={{marginBottom: "0px"}}><b>YEAR</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          placeholder="Enter year"
                                                          value={year}
                                                          onChange={event => setYear(event.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label style={{marginBottom: "0px"}}><b>TIME (minutes)</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          placeholder="Enter time"
                                                          value={time}
                                                          onChange={event => setTime(event.target.value)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col}>
                                            <Form.Label style={{marginBottom: "0px"}}><b>PRICE</b></Form.Label>
                                            <Form.Control
                                                type="text"
                                                className="my-input"
                                                placeholder="Enter price"
                                                value={price}
                                                onChange={event => setPrice(event.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Col}>
                                    <Form.Label style={{marginBottom: "0px"}}><b>IMAGE-URL</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="my-input"
                                        placeholder="Enter url-image"
                                        value={imageURL}
                                        onChange={event => setImageURL(event.target.value)}
                                    />
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{marginBottom: "0px"}}><b>COUNTRY</b></Form.Label>
                                    <Form.Control className="my-input"
                                                  as="select" aria-label="Default select example"
                                                  onChange={event => setCountry(JSON.parse(event.target.value))}>
                                        <option value="null">Select...</option>
                                        {countryList.map((item, index) =>
                                            <option
                                                selected={props.method === "create" ? false : item.name === country.name}
                                                key={index}
                                                value={JSON.stringify(item)}>
                                                {item.name}
                                            </option>
                                        )}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{marginBottom: "0px"}}><b>GENRE</b></Form.Label>
                                    <Form.Control className="my-input" as="select" aria-label="Default select example"
                                                  onChange={event => setGenre(JSON.parse(event.target.value))}>
                                        <option value="null">Select...</option>
                                        {genreList.map((item, index) =>
                                            <option selected={props.method === "create" ? false : item.name === genre.name}
                                                    key={index}
                                                    value={JSON.stringify(item)}>
                                                {item.name}
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
                                              value={description}
                                              onChange={event => setDescription(event.target.value)}/>
                            </Form.Group>
                        </Col>
                    </Row>
                </div>
            )
        } else {
            return (
                <div>
                    loading...
                </div>
            )
        }
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
                <Modal.Title>{props.method === "create" ? "Create film" : "Update film"}</Modal.Title>
            </Modal.Header>
            <Modal.Body className="modal-dark">
                {showContent()}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-danger" onClick={closeModal}>Close</Button>
                <Button variant={props.method === "create" ? "outline-primary" : "outline-success"}
                        type="submit"
                        onClick={handleSubmit}>
                    {props.method === "create" ? "Create" : "Update"}
                </Button>

            </Modal.Footer>
        </Modal>
    )
}

export default CreateUpdateFilmModal