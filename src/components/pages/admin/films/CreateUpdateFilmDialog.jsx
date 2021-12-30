import React, {useEffect, useState} from 'react'
import {Button, Col, Form, Modal, Row} from "react-bootstrap"
import {toast} from 'react-toastify'
import {useDispatch, useSelector} from "react-redux"
import {createFilm, getFilms, updateFilm} from "../../../../redux/film/FilmAction"
import GenreService from "../../../../service/GenreService"
import CountryService from "../../../../service/CountryService"
import 'react-toastify/dist/ReactToastify.css'
import '../../../../styles/Animation.css'
import '../../../../styles/FormControl.css'
import FilmValidator from "../../../../validation/FilmValidator";

function CreateUpdateFilmDialog(props) {
    const dispatch = useDispatch()
    const {film, currentPage, sizePage} = useSelector(state => state.dataFilms)
    const [loadingAll, setLoadingAll] = useState(true)

    const [genreList, setGenreList] = useState([])
    const [countryList, setCountryList] = useState([])

    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [year, setYear] = useState('')
    const [time, setTime] = useState('')
    const [price, setPrice] = useState('')
    const [imageURL, setImageURL] = useState("")
    const [description, setDescription] = useState('')
    const [genre, setGenre] = useState(null)
    const [country, setCountry] = useState(null)

    // Errors
    const [nameError, setNameError] = useState('')
    const [yearError, setYearError] = useState('')
    const [timeError, setTimeError] = useState('')
    const [priceError, setPriceError] = useState('')
    const [imageURLError, setImageURLError] = useState('')
    const [descriptionError, setDescriptionError] = useState('')
    const [genreError, setGenreError] = useState('')
    const [countryError, setCountryError] = useState('')

    /**
     * Method that set film's name value.
     * @param event event
     */
    const changeNameHandler = (event) => {
        setName(event.target.value)
        setNameError('')
    }

    /**
     * Method that set film's year value.
     * @param event event
     */
    const changeYearHandler = (event) => {
        setYear(event.target.value)
        setYearError('')
    }

    /**
     * Method that set film's time value.
     * @param event event
     */
    const changeTimeHandler = (event) => {
        setTime(event.target.value)
        setTimeError('')
    }

    /**
     * Method that set film's price value.
     * @param event event
     */
    const changePriceHandler = (event) => {
        setPrice(event.target.value)
        setPriceError('')
    }

    /**
     * Method that set film's imageURL value.
     * @param event event
     */
    const changeImageURLHandler = async (event) => {
        setImageURL(await convertBase64(event.target.files[0]))
        setImageURLError('')
    };

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader()
            fileReader.readAsDataURL(file)
            fileReader.onload = () => {
                resolve(fileReader.result)
            };
            fileReader.onerror = (error) => {
                reject(error)
            };
        });
    };

    const changeDescriptionHandler = (event) => {
        setDescription(event.target.value)
        setDescriptionError('')
    }

    const changeCountryHandler = (event) => {
        setCountry(JSON.parse(event.target.value))
        setCountryError('')
    }

    const changeGenreHandler = (event) => {
        setGenre(JSON.parse(event.target.value))
        setGenreError('')
    }

    useEffect(() => {
            if (props.method === "update") {
                setId(film.id)
                setGenre(film.genre)
                setCountry(film.country)
                setName(film.name)
                setYear(film.year)
                setTime(film.timeInMinutes)
                setPrice(film.price)
                setImageURL(film.imageURL)
                setDescription(film.description)
            }
            CountryService.getAll()
                .then(response => {
                    setCountryList(response.data.content)
                }).catch(error => {
                    console.log(error)
                }
            )
            GenreService.findAll()
                .then(response => {
                    console.log(response)
                    setGenreList(response.data)
                    setLoadingAll(false)
                }).catch(error => {
                    console.log(error)
                }
            )
        }, [film.country, film.description, film.genre, film.id, film.imageURL,
            film.name, film.price, film.timeInMinutes, film.year, props.method]
    )

    const handleSubmit = (event) => {
        event.preventDefault()

        if (!findFormErrors()) {
            let request = {
                name: name,
                country: country,
                year: year,
                timeInMinutes: time,
                price: price,
                description: description,
                genre: genre,
                imageURL: imageURL
            }
            if (props.method === "create") {
                console.log(request)
                if ((country === null || country === undefined) ||
                    (genre === null || genre === undefined)) {
                    alert("ERROR")
                } else {
                    dispatch(createFilm(request))
                        .then((response) => {
                            console.log(response)
                            dispatch(getFilms(currentPage, sizePage))
                            notifySuccess()
                        })
                        .catch((error) => {
                            console.log(error)
                            notifyError()
                        });
                }
            } else {
                dispatch(updateFilm(request, id))
            }
        }
    }

    const findFormErrors = () => {
        let isErrors = false

        let errors = FilmValidator.validateAllForCreateUpdate(name, year, time, price, description, imageURL, country, genre)
        setNameError(errors.nameError)
        setYearError(errors.yearError)
        setTimeError(errors.timeError)
        setPriceError(errors.priceError)
        setDescriptionError(errors.descriptionError)
        setImageURLError(errors.imageURLError)
        setCountryError(errors.countryError)
        setGenreError(errors.genreError)

        for (let key in errors) {
            if (errors[key] !== '') {
                isErrors = true
            }
        }

        return isErrors

    }

    const notifyError = () => toast.error('Error to create a new film, please check your input data!', {
        position: "top-right",
    });

    const notifySuccess = () => toast.success('The new film was created successfully!', {
        position: "top-right",
    });

    const showContent = () => {
        if (!loadingAll && genre !== undefined && country !== undefined) {
            return (
                <div>
                    <Row>
                        <Col lg={12} style={{marginTop: "20px"}}>
                            <Form enctype="multipart/form-data">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label style={{marginBottom: "0px"}}><b>NAME</b></Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="my-input"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={changeNameHandler}
                                        isInvalid={nameError}
                                    />
                                    <Form.Control.Feedback type='invalid'>{nameError}</Form.Control.Feedback>
                                </Form.Group>
                                <Row>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label style={{marginBottom: "0px"}}><b>YEAR</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          placeholder="Enter year"
                                                          value={year}
                                                          onChange={changeYearHandler}
                                                          isInvalid={yearError}
                                            />
                                            <Form.Control.Feedback type='invalid'>{yearError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label style={{marginBottom: "0px"}}><b>TIME (in
                                                minutes)</b></Form.Label>
                                            <Form.Control type="text"
                                                          className="my-input"
                                                          placeholder="Enter time"
                                                          value={time}
                                                          onChange={changeTimeHandler}
                                                          isInvalid={timeError}
                                            />
                                            <Form.Control.Feedback type='invalid'>{timeError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group as={Col}>
                                            <Form.Label style={{marginBottom: "0px"}}><b>PRICE</b></Form.Label>
                                            <Form.Control
                                                type="number"
                                                className="my-input"
                                                placeholder="Enter price"
                                                value={price}
                                                onChange={changePriceHandler}
                                                isInvalid={priceError}
                                            />
                                            <Form.Control.Feedback type='invalid'>{priceError}</Form.Control.Feedback>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Form.Group as={Col}>
                                    <Form.Label style={{marginBottom: "0px"}}><b>COUNTRY</b></Form.Label>
                                    <Form.Control className="my-input"
                                                  as="select" aria-label="Default select example"
                                                  isInvalid={countryError}
                                                  onChange={changeCountryHandler}>
                                        <option key={0} value={"null"}>Select...</option>
                                        {countryList.map((item, index) =>
                                            <option
                                                selected={props.method === "create" ? false : item.name === country.name}
                                                key={index}
                                                value={JSON.stringify(item)}>
                                                {item.name}
                                            </option>
                                        )}
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{countryError}</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group as={Col}>
                                    <Form.Label style={{marginBottom: "0px"}}><b>GENRE</b></Form.Label>
                                    <Form.Control className="my-input" as="select" aria-label="Default select example"
                                                  isInvalid={genreError}
                                                  onChange={changeGenreHandler}>
                                        <option key={0} value={"null"}>Select...</option>
                                        {genreList.map((item, index) =>
                                            <option
                                                selected={props.method === "create" ? false : item.name === genre.name}
                                                key={index}
                                                value={JSON.stringify(item)}>
                                                {item.name}
                                            </option>
                                        )}
                                    </Form.Control>
                                    <Form.Control.Feedback type='invalid'>{genreError}</Form.Control.Feedback>
                                </Form.Group>
                            </Form>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label><b>DESCRIPTION</b></Form.Label>
                                <Form.Control as="textarea" type="text" className="my-input" rows={2}
                                              style={{minHeight: "75px", maxHeight: "75px", resize: "none"}}
                                              placeholder="Enter description"
                                              value={description}
                                              isInvalid={descriptionError}
                                              onChange={changeDescriptionHandler}/>
                                <Form.Control.Feedback type='invalid'>{descriptionError}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label style={{marginBottom: "0px"}}><b>IMAGE-URL</b></Form.Label>
                                <Form.Control
                                    type="file"
                                    className="my-input"
                                    placeholder="Enter url-image"
                                    isInvalid={imageURLError}
                                    onChange={changeImageURLHandler}
                                />
                                <Form.Control.Feedback type='invalid'>{imageURLError}</Form.Control.Feedback>
                                <br/>
                                <br/>
                                <img alt="" src={imageURL} height="200px"/>
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

    toast.configure()
    return (
        <Modal{...props} size="lg" className="special_modal">
            <Modal.Header closeButton>
                <Modal.Title style={{color: "#9a9da0"}}>
                    <b>{props.method === "create" ? "Create film" : "Update film"}</b>
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
    )
}

export default CreateUpdateFilmDialog