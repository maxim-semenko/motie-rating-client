import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"
import ReactStars from "react-rating-stars-component"
import spinner from "../../../img/spinner.svg"
import CardFilm from "../../common/CardFilm";
import {useDispatch, useSelector} from "react-redux";
import {getBasketById} from "../../../redux/basket/BasketAction";
import MarkService from "../../../service/MarkService";
import {getFilmById} from "../../../redux/film/FilmAction";
import CSSTransition from "react-transition-group/CSSTransition";

function AboutFilmPage(props) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const [isLogin, setIsLogin] = useState()
    const {basketFilmList} = useSelector(state => state.dataBaskets)
    const {film, loadingFilm} = useSelector(state => state.dataFilms)
    const [markId, setMarkId] = useState(0)

    useEffect(() => {
            const isContainUser = localStorage.getItem("user") !== null
            setIsLogin(isContainUser)

            dispatch(getFilmById(props.match.params.id))
            if (isContainUser) {
                const userId = JSON.parse(localStorage.getItem("user")).id
                dispatch(getBasketById(userId))
                MarkService.getByUserIdAndFilmId(userId, props.match.params.id)
                    .then(response => {
                        console.log(response)
                        setRating(response.data.value)
                        setMarkId(response.data.id)
                        setLoading(false)
                    }).catch(error => {
                        console.log(error)
                        setLoading(false)
                    }
                )
            } else {
                setLoading(false)
            }

        }, [dispatch, props.match.params.id]
    )

    const ratingChanged = (newRating) => {
        setRating(newRating)
        let request = {
            userId: JSON.parse(localStorage.getItem("user")).id,
            filmId: Number.parseInt(props.match.params.id),
            value: newRating
        }

        console.log(request)

        MarkService.create(request)
            .then(response => {
                console.log(response)
                setMarkId(response.data.id)
                dispatch(getFilmById(props.match.params.id))
            }).catch(error => {
                console.log(error)
            }
        )
    }

    const getRating = () => {
        if (rating === 0) {
            return (
                <span>You dont rate this film</span>
            )
        } else {
            return (
                <span>{rating}</span>
            )
        }
    }

    const removeMark = () => {
        MarkService.delete(markId, JSON.parse(localStorage.getItem("user")).id)
            .then(response => {
                console.log(response)
                dispatch(getFilmById(props.match.params.id))
                setRating(0)
                setMarkId(0)
            }).catch(error => {
                console.log(error)
            }
        )
    }

    const showSetterRating = () => {
        if (isLogin) {
            return (
                <div>
                    <h4>
                        <b style={{marginRight: "10px"}}>Your mark:</b>
                        {getRating()}
                    </h4>
                    {showReactStars()}
                    <CSSTransition in={rating !== 0} classNames="my-node" timeout={500} unmountOnExit>
                        <Button variant={"outline-danger"} type="submit" onClick={removeMark}>
                            <b>Remove mark</b>
                        </Button>
                    </CSSTransition>
                </div>
            )
        }
    }

    const showReactStars = () => {
        if (rating !== 0) {
            return (
                <div>
                    <div style={{marginTop: "-20px"}}>
                        <ReactStars count={10} size={46} value={rating} edit={false} activeColor="#ffd700"/>
                    </div>
                </div>
            )
        } else {
            return (
                <div style={{marginTop: "-20px"}}>
                    <ReactStars count={10} size={46} onChange={ratingChanged} activeColor="#ffd700"/>
                </div>
            )
        }
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", padding: "20px 20px 40px 0px"}}>
                    <Container>
                        {(loadingFilm && film === null) || film === null || loading ||
                        (basketFilmList === null && JSON.parse(localStorage.getItem("user")) != null) ?
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
                                    <h4><b>Country: </b>
                                        {
                                            film.countries.map((item, index) =>
                                                <span key={index}><b>{item.name}, </b></span>
                                            )
                                        }
                                    </h4>
                                    <h4><b>Genre: </b>
                                        {
                                            film.genres.map((item, index) =>
                                                <span key={index}><b>{item.name}, </b></span>
                                            )
                                        }
                                    </h4>
                                    <h4><b>Year:</b> {film.year}</h4>
                                    <h4><b>Time:</b> {film.timeInMinutes} minutes</h4>
                                    <h4><b>Rating:</b> {film.rating.toFixed(2)}</h4>
                                    <hr/>
                                    {showSetterRating()}
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