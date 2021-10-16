import React, {useEffect, useState} from 'react'
import {Card, Container, Jumbotron, Row} from "react-bootstrap"
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "../../NavigationBar"
import AddRemoveFilmBasket from "../../AddRemoveFilmBasket"
import Footer from "../../Footer"
import BasketService from "../../../service/BasketService"
import spinner from "../../../img/spinner.svg"
import '../../../styles/FormControl.css'
import {getFilms} from "../../../redux/film/FilmAction";

function HomePage() {

    const dispatch = useDispatch()
    const {films, loading, currentPage, sizePage} = useSelector(state => state.dataFilms)
    const [basketList, setBasketList] = useState([])
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
            localStorage.getItem("user") !== null ? setIsLogin(true) : setIsLogin(false)
            if (isLogin) {
                BasketService.getById(JSON.parse(localStorage.getItem("user")).id)
                    .then(response => {
                        setBasketList(response.data.filmList)
                    }).catch(error => {
                        console.log(error)
                    }
                )
            }
            dispatch(getFilms(currentPage, sizePage))

        }, [currentPage, isLogin, sizePage]
    )


    const addToBasket = (film) => {
        BasketService.add(JSON.parse(localStorage.getItem("user")).id, film.id)
            .then(response => {
                setBasketList([...basketList, film])
                console.log(response)
            }).catch(error => {
                console.log(error)
            }
        )
    }

    const removeFromBasket = (filmId) => {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then(response => {
                setBasketList(basketList.filter(item => item.id !== filmId))
                console.log(response)
            })
            .catch(error => {
                    console.log(error)
                }
            )
    }

    const checkContain = (filmId) => {
        for (let key in basketList) {
            if (basketList[key].id === filmId) {
                return true
            }
        }
        return false
    }

    return (
        <div>
            <NavigationBar setIsLoginMethod={setIsLogin}/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                        <Container>
                            {loading ?
                                <div>
                                    <img alt="" src={spinner}
                                         style={{resize: "both", width: "100%", height: "256px"}}/>
                                </div>
                                :
                                <Row>
                                    {
                                        films.slice(0).reverse().map(film =>
                                            <div className="col-md-6 col-xl-4" style={{marginTop: "30px"}}
                                                 key={film.id}>
                                                <Card className="customCard">
                                                    <Link to={{pathname: `film/${film.id}`}}>
                                                        <Card.Img variant="top" height="450rem" src={film.imageURL}/>
                                                    </Link>
                                                    <Card.Title style={{paddingTop: "5px"}}>
                                                        <Link to={{pathname: `film/${film.id}`}} className="my-link">
                                                            <h5 style={{textTransform: "uppercase"}}><b>{film.name}</b>
                                                            </h5>
                                                        </Link>
                                                    </Card.Title>
                                                    <Card.Body style={{paddingTop: "0px"}}>
                                                        <div style={{
                                                            backgroundColor: "orange",
                                                            borderRadius: "10px",
                                                            margin: "5px 20% 20px 20%"
                                                        }}>
                                                            <b>Price: {film.price}$</b>
                                                        </div>
                                                        <AddRemoveFilmBasket
                                                            isContain={checkContain(film.id)}
                                                            filmId={film.id}
                                                            film={film}
                                                            methodAdd={addToBasket}
                                                            methodRemove={removeFromBasket}
                                                        />
                                                    </Card.Body>
                                                </Card>
                                            </div>
                                        )
                                    }
                                </Row>
                            }
                        </Container>
                    </CSSTransition>
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    );
}

export default HomePage