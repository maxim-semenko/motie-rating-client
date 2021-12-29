import React, {useEffect, useState} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "./NavigationBar"
import Footer from "../../Footer"
import ReactStars from "react-rating-stars-component"
import FilmService from "../../../service/FilmService"
import spinner from "../../../img/spinner.svg"
import CardFilm from "./CardFilm";
import {useDispatch, useSelector} from "react-redux";
import {getBasketById} from "../../../redux/basket/BasketAction";

function AboutFilmPage(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [film, setFilm] = useState([])
    const [rating, setRating] = useState(0)
    const {basketFilmList} = useSelector(state => state.dataBaskets)


    useEffect(() => {
            FilmService.getById(props.match.params.id)
                .then(response => {
                    setFilm(response.data)
                    setLoading(false)
                }).catch(error => {
                    console.log(error)
                }
            )
            if (basketFilmList === null) {
                dispatch(getBasketById(JSON.parse(localStorage.getItem("user")).id))
            }
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
                    <Container>
                        {loading || basketFilmList === null?
                            <div>
                                <img alt="" src={spinner} style={{resize: "both", width: "100%", height: "256px"}}/>
                            </div>
                            :
                            <Row>
                                <Col lg={4} style={{marginTop: "20px"}}>
                                    <CardFilm film={film}/>
                                </Col>
                                <Col lg={8} style={{marginTop: "20px", textAlign: "left"}}>
                                    <h1 style={{textTransform: "uppercase"}}>{film.name}</h1>
                                    <p style={{textAlign: "justify"}}><i>{film.description}</i></p>
                                    <hr/>
                                    <h4><b>Country:</b> {film.country.name}</h4>
                                    <h4><b>Genre:</b> {film.genre.name}</h4>
                                    <h4><b>Year:</b> {film.year}</h4>
                                    <h4><b>Time:</b> {film.timeInMinutes} minutes</h4>
                                    <h4><b>Rating:</b> {film.rating}</h4>
                                    <hr/>
                                    <h4>
                                        <b style={{marginRight: "10px"}}>Your mark:</b>
                                        {rating === 0 ? 'You dont rate this film' : rating}
                                    </h4>
                                    <div style={{marginTop: "-20px"}}>
                                        <ReactStars count={10} size={40}
                                                    onChange={ratingChanged}
                                                    activeColor="#ffd700"/>
                                    </div>


                                </Col>
                            </Row>
                        }
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    )
}

export default AboutFilmPage