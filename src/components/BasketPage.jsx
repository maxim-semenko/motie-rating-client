import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import Footer from "./Footer";
import ProfileMenu from "./ProfileMenu";
import Card from "react-bootstrap/Card";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import BasketService from "../service/BasketService";

class BasketPage extends Component {
    basket;
    filmList;
    summa;

    constructor(props) {
        super(props);
        this.state = {
            user: JSON.parse(localStorage.getItem("user")),
            list: [],
            totalPrice: 0
        }

        this.removeFromBasket = this.removeFromBasket.bind(this);

    }

    componentDidMount() {
        BasketService.getById(this.state.user.basket.id)
            .then((response) => {
                console.log(response.data);
                this.setState({list: response.data.filmList});
                this.setState({totalPrice: response.data.summa});
            }).catch(function (error) {

            }
        )
    }

    removeFromBasket(filmId) {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({list: response.data.filmList});
                this.setState({totalPrice: response.data.summa});
            }).catch(function (error) {

            }
        )
    }

    showList() {
        return (
            <div>
                {
                    this.state.list.length === 0 ?
                        <div>
                            The basket is empty :(
                        </div>
                        :
                        <div>
                            total price: {this.state.totalPrice.toFixed(2)}$
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
                    <Row>
                        <Col lg={3} style={{marginTop: "20px"}}>
                            <ProfileMenu/>
                        </Col>
                        <Col lg={9} style={{marginTop: "20px"}}>
                            <Jumbotron className="bg-dark text-white">
                                {this.showList()}
                                <Container>
                                    <Row>
                                        {
                                            this.state.list.slice(0).reverse().map(films =>
                                                <div className="col-md-6 col-xl-6" style={{marginTop: "30px"}}
                                                     key={films.id}>
                                                    <Card className="customCard" style={{borderRadius: "5px"}}>
                                                        <Link to="/about">
                                                            <Card.Img variant="top" height="450rem"
                                                                      src={films.imageURL} style={{
                                                                borderTopLeftRadius: "5px",
                                                                borderTopRightRadius: "5px"
                                                            }}/>
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

                                                            <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                                                                <Button variant="outline-success" >
                                                                    Buy film
                                                                </Button>{' '}
                                                                <Button variant="outline-danger"
                                                                        onClick={() => this.removeFromBasket(films.id)}>
                                                                    Remove from basket
                                                                </Button>
                                                            </div>
                                                        </Card.Body>
                                                    </Card>
                                                </div>
                                            )
                                        }
                                    </Row>
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
                <Footer/>
            </div>
        );
    }
}

export default BasketPage;