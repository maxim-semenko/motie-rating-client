import React, {Component} from 'react';
import {Card, Container, Jumbotron, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Footer from "../Footer";
import AddRemoveFilmBasketComponent from "../AddRemoveFilmBasketComponent";
import NavigationBar from "../NavigationBar";
import BasketService from "../../service/BasketService";
import FilmService from "../../service/FilmService";
import '../../styles/FormControl.css';

class ClassHomePage extends Component {
    price;
    timeInMinutes;

    constructor(props) {
        super(props);

        this.state = {
            films: [],
            basketList: [],
            isLogin: false
        }

        this.addToBasket = this.addToBasket.bind(this);
        this.removeFromBasket = this.removeFromBasket.bind(this);

        this.setIsLogin = this.setIsLogin.bind(this);
    }

    setIsLogin() {
        this.setState({isLogin: !this.state.isLogin})
    }

    componentDidMount() {
        if (localStorage.getItem("user")) {
            this.setState({isLogin: true})
        } else {
            this.setState({isLogin: false});
        }
        FilmService.getAll().then((res) => {
            this.setState({films: res.data})
        })
        if (localStorage.getItem("user") != null) {
            BasketService.getById(JSON.parse(localStorage.getItem("user")).basket.id)
                .then((response) => {
                    this.setState({basketList: response.data.filmList});
                }).catch(function (error) {
                    console.log(error);
                }
            )
        }
    }

    addToBasket(filmId) {
        BasketService.add(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({basketList: response.data.filmList});
            }).catch(function (error) {
                console.log(error);
            }
        )
    }

    removeFromBasket(filmId) {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({basketList: response.data.filmList});
                this.setState({totalPrice: response.data.summa});
            }).catch(function (error) {
                console.log(error);
            }
        )
    }

    checkContain(filmId) {
        const list = this.state.basketList;
        let isContain = false;

        for (let key in list) {
            if (list.hasOwnProperty(key)) {
                if (list[key].id === filmId) {
                    isContain = true;
                    break;
                }
            }
        }

        return isContain;
    }

    render() {
        return (
            <div>
                <NavigationBar setIsLoginMethod={this.setIsLogin}/>
                <Container>
                    <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                        <Container>
                            <Row>
                                {
                                    this.state.films.slice(0).reverse().map(films =>
                                        <div className="col-md-6 col-xl-4" style={{marginTop: "30px"}} key={films.id}>
                                            <Card className="customCard">
                                                <Link to={{pathname: `film/${films.id}`}}>
                                                    <Card.Img variant="top" height="450rem" src={films.imageURL}/>
                                                </Link>
                                                <Card.Title style={{paddingTop: "5px"}}>
                                                    <Link to={{pathname: `film/${films.id}`}} className="my-link">
                                                        <h5 style={{textTransform: "uppercase"}}><b>{films.name}</b>
                                                        </h5>
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
                                                    <AddRemoveFilmBasketComponent
                                                        isContain={this.checkContain(films.id)}
                                                        filmId={films.id}
                                                        methodAdd={this.addToBasket}
                                                        methodRemove={this.removeFromBasket}
                                                    />
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
        );
    }
}

export default ClassHomePage;