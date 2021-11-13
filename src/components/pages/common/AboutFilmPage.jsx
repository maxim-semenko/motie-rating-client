import React, {useEffect, useState} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import Footer from "../../Footer"
import ReactStars from "react-rating-stars-component"
import FilmService from "../../../service/FilmService"
import spinner from "../../../img/spinner.svg"

function AboutFilmPage(props) {
    const [loading, setLoading] = useState(true)
    const [film, setFilm] = useState([])
    const [genre, setGenre] = useState('')
    const [country, setCountry] = useState('')
    const [rating, setRating] = useState(0)

    useEffect(() => {
            // setLoading(true)
            FilmService.getById(props.match.params.id)
                .then(response => {
                    setFilm(response.data)
                    setGenre(response.data.genre.name)
                    setCountry(response.data.country.name)
                    setLoading(false)
                }).catch(error => {
                    console.log(error)
                }
            )

        }, [props.match.params.id]
    )

    const ratingChanged = (newRating) => {
        setRating(newRating)
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", padding: "20px 20px 40px 0px"}}>
                    {/*<CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>*/}
                    <Container>
                        {loading ?
                            <div>
                                <img alt="" src={spinner}
                                     style={{resize: "both", width: "100%", height: "256px"}}/>
                            </div>
                            :
                            <Row>
                                <Col lg={5} style={{marginTop: "20px"}}>
                                    <img src={film.imageURL} alt={film.imageURL} height="450rem"
                                         style={{border: "2px solid black"}}/>
                                </Col>
                                <Col lg={7} style={{marginTop: "20px", textAlign: "left"}}>
                                    <h1 style={{textTransform: "uppercase"}}>{film.name}</h1>
                                    <p style={{textAlign: "justify"}}>{film.description}</p>
                                    <hr/>
                                    <b>Country: {country}</b>
                                    <br/>
                                    <b>Time: {film.timeInMinutes} minutes</b>
                                    <br/>
                                    <b>Genre: {genre}</b>
                                    <ReactStars count={10} size={40} onChange={ratingChanged}
                                                activeColor="#ffd700"/>
                                    Your mark: {rating}
                                </Col>
                            </Row>
                        }
                    </Container>
                    {/*</CSSTransition>*/}
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    )
}

export default AboutFilmPage