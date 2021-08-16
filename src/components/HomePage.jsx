import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Container, Jumbotron, Row} from "react-bootstrap";
import Footer from "./Footer";
import FilmService from "../service/FilmService";
import Card from "react-bootstrap/Card";

import '../css/FormControl.css';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import BasketService from "../service/BasketService";


class HomePage extends Component {
    price;
    timeInMinutes;

    constructor(props) {
        super(props);

        this.state = {
            films: [],
            basketList: []
        }

        this.addToBasket = this.addToBasket.bind(this);
        this.removeFromBasket = this.removeFromBasket.bind(this);
    }

    componentDidMount() {
        FilmService.getAll().then((res) => {
            this.setState({films: res.data})
        })
        BasketService.getById(JSON.parse(localStorage.getItem("user")).basket.id)
            .then((response) => {
                console.log(response.data);
                this.setState({basketList: response.data.filmList});
            }).catch(function (error) {

            }
        )
    }

    addToBasket(filmId) {
        BasketService.add(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({basketList: response.data.filmList});
            }).catch(function (error) {

            }
        )
    }

    removeFromBasket(filmId) {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({basketList: response.data.filmList});
                this.setState({totalPrice: response.data.summa});
            }).catch(function (error) {

            }
        )
    }

    checkIsContainInBasket(filmId) {
        const array1 = this.state.basketList;
        let isContain = false;

        // for (const key of iterator) {
        //     console.log(key);
        // }
        for (let key in array1) {
            if (array1[key].id === filmId) {
                isContain = true;
                console.log("isContain = " + isContain + " id = " + filmId);

                break;
            }
            // console.log("key " + key + " has value " + array1[key].id);
        }
        return (
            <div>

                {
                    isContain === true ?
                        <div>
                            <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                <Button variant="outline-success">
                                    Buy film
                                </Button>{' '}
                                <Button variant="outline-danger"
                                        onClick={() => this.removeFromBasket(filmId)}>
                                    Remove from basket
                                </Button>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                <Button variant="outline-success">
                                    Buy film
                                </Button>{' '}
                                <Button variant="outline-primary"
                                        onClick={() => this.addToBasket(filmId)}>
                                    Add to basket
                                </Button>
                            </div>
                        </div>
                }
            </div>
        )
    }


    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                        <Container>
                            <Row>
                                {
                                    this.state.films.slice(0).reverse().map(films =>
                                        <div className="col-md-6 col-xl-4" style={{marginTop: "30px"}} key={films.id}>
                                            <Card className="customCard">
                                                <Link to="/about">
                                                    <Card.Img variant="top" height="450rem" src={films.imageURL}/>
                                                </Link>
                                                <Card.Title style={{paddingTop: "5px"}}>
                                                    <Link to="/about" className="my-link">
                                                        <h3 style={{textTransform: "uppercase"}}>{films.name}</h3>
                                                    </Link>
                                                </Card.Title>
                                                <Card.Body style={{paddingTop: "0px"}}>
                                                    <div style={{
                                                        backgroundColor: "orange",
                                                        borderRadius: "10px",
                                                        margin: "5px 20% 20px 20%"
                                                    }}>
                                                        <b>Price: {films.price}$</b>
                                                    </div>
                                                    {this.checkIsContainInBasket(films.id)}

                                                </Card.Body>
                                            </Card>
                                        </div>
                                    )
                                }
                            </Row>
                        </Container>
                    </Jumbotron>
                </Container>
                <Footer/>
            </div>
        )
            ;
    }
}

export default HomePage;