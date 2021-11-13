import React, {useEffect, useState} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "../common/NavigationBar"
import ProfileMenu from "./ProfileMenu"
import BasketItem from "../../BasketItem"
import Footer from "../../Footer"
import BasketService from "../../../service/BasketService"
import spinner from "../../../img/spinner.svg"

function BasketPage() {
    const user = JSON.parse(localStorage.getItem("user"))
    const [loading, setLoading] = useState(true)
    const [basketList, setBasketList] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
            BasketService.getById(user.id)
                .then(response => {
                    setBasketList(response.data.filmList)
                    setTotalPrice(response.data.summa)
                    setLoading(false)
                }).catch(error => {
                    console.log(error)
                }
            )
        }, [user.id]
    )

    const removeFromBasket = (filmId) => {
        BasketService.remove(user.id, filmId)
            .then(response => {
                setBasketList(response.data.filmList)
                setTotalPrice(response.data.summa)
            }).catch(error => {
                console.log(error)
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
                        <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                            <Jumbotron className="bg-dark text-white">
                                {loading ?
                                    <div>
                                        <img alt="" src={spinner}
                                             style={{resize: "both", width: "100%", height: "256px"}}/>
                                    </div>
                                    :
                                    <div>
                                        {
                                            basketList.length === 0 ?
                                                <div>
                                                    <h3>The basket is empty :(</h3>
                                                </div>
                                                :
                                                <div>
                                                    <h3>Total price: {Number(totalPrice).toFixed(2)}$</h3>
                                                    <Container>
                                                        <Row>
                                                            {
                                                                basketList.slice(0).reverse().map(film =>
                                                                    <div>
                                                                        <BasketItem
                                                                            film={film}
                                                                            removeFromBasket={removeFromBasket}/>
                                                                        <br/>
                                                                    </div>
                                                                )
                                                            }
                                                        </Row>
                                                    </Container>
                                                </div>
                                        }
                                    </div>
                                }
                            </Jumbotron>
                        </CSSTransition>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default BasketPage