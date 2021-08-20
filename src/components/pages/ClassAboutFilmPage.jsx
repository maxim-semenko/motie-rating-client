import React, {Component} from 'react';
import NavigationBar from "../NavigationBar";
import Footer from "../Footer";
import {Button, Col, Container, Jumbotron, Row} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import FilmService from "../../service/FilmService";
import BasketService from "../../service/BasketService";

class ClassAboutFilmPage extends Component {
    genre;
    name;

    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id,
            film: '',
            genre: '',
            rating: 0
        }
        this.removeFromBasket = this.removeFromBasket.bind(this);
        this.ratingChanged = this.ratingChanged.bind(this);
    }


    componentDidMount() {
        FilmService.getById(this.state.id)
            .then((response) => {
                this.setState({film: response.data});
                this.setState({genre: response.data.genre.name});
            }).catch(function (error) {

            }
        )
    }

    removeFromBasket(filmId) {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({basketList: response.data.filmList});
            }).catch(function (error) {

            }
        )
    }

    checkIsContainInBasket(filmId) {
        const array1 = this.state.basketList;
        let isContain = false;

        for (let key in array1) {
            if (array1[key].id === filmId) {
                isContain = true;
                break;
            }
        }
        return (
            <div>

                {
                    isContain === true ?
                        <div>
                            <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                <Button variant="outline-success">
                                    <b>Buy film</b>
                                </Button>{' '}
                                <Button variant="outline-danger"
                                        onClick={() => this.removeFromBasket(filmId)}>
                                    <b>Remove from basket</b>
                                </Button>
                            </div>
                        </div>
                        :
                        <div>
                            <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                <Button variant="outline-success">
                                    <b>Buy film</b>
                                </Button>{' '}
                                <Button variant="outline-primary"
                                        onClick={() => this.addToBasket(filmId)}>
                                    <b>Add to basket</b>
                                </Button>
                            </div>
                        </div>
                }
            </div>
        )
    }

    ratingChanged(newRating) {
        this.setState({rating: newRating});
    }

    render() {
        return (
            <div>
                <NavigationBar/>
                <Container>
                    <Jumbotron className="bg-dark text-white"
                               style={{marginTop: "20px", padding: "20px 20px 40px 0px"}}>
                        <Container>
                            <Row>
                                <Col lg={5} style={{marginTop: "20px"}}>
                                    <img src={this.state.film.imageURL} alt={this.state.film.imageURL} height="500rem"
                                         style={{border: "2px solid black"}}/>
                                </Col>
                                <Col lg={7} style={{marginTop: "20px", textAlign: "left"}}>
                                    <h1 style={{textTransform: "uppercase"}}>{this.state.film.name}</h1>
                                    <p style={{textAlign: "justify"}}>{this.state.film.description}</p>
                                    <hr/>
                                    <p>Time: {this.state.film.timeInMinutes} minutes</p>
                                    <p>Genre: {this.state.genre}</p>
                                    <ReactStars
                                        count={10}
                                        size={40}
                                        onChange={this.ratingChanged}
                                        activeColor="#ffd700"
                                    />
                                    Your mark: {this.state.rating}
                                </Col>
                            </Row>
                        </Container>
                    </Jumbotron>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default ClassAboutFilmPage;