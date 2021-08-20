import React, {useEffect, useState} from 'react';
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import NavigationBar from "../NavigationBar";
import ProfileMenu from "../ProfileMenu";
import Footer from "../Footer";
import BasketService from "../../service/BasketService";
import BasketItemComponent from "../BasketItemComponent";

function BasketPage() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [list, setList] = useState([])
    const [totalPrice, setTotalPrice] = useState()

    useEffect(() => {
        BasketService.getById(user.basket.id)
            .then((response) => {
                setList(response.data.filmList)
                setTotalPrice(response.data.summa);
            }).catch(function (error) {

            }
        )
    })

    function removeFromBasket(filmId) {
        BasketService.remove(JSON.parse(localStorage.getItem("user")).id, filmId)
            .then((response) => {
                this.setState({list: response.data.filmList});
                this.setState({totalPrice: response.data.summa});
            }).catch(function (error) {

            }
        )
    }

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
                            {
                                list.length === 0 ?
                                    <div>
                                        <h3>The basket is empty :(</h3>
                                    </div>
                                    :
                                    <div>
                                        <h3>Total price: {Number(totalPrice).toFixed(2)}$</h3>
                                        <Container>
                                            <Row>
                                                {
                                                    list.slice(0).reverse().map(film =>
                                                        <div>
                                                            <BasketItemComponent film={film}
                                                                                 removeFromBasket={removeFromBasket}/>
                                                            <br/>
                                                        </div>
                                                    )
                                                }
                                            </Row>
                                        </Container>
                                    </div>
                            }
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default BasketPage;