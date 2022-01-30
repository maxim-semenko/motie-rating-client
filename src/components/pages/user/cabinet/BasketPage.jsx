import React, {useEffect} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "../../../common/NavigationBar"
import ProfileMenu from "../../../common/ProfileMenu"
import BasketItem from "../../../common/BasketItem"
import Footer from "../../../common/Footer"
import spinner from "../../../../img/spinner.svg"
import {getBasketById} from "../../../../redux/basket/BasketAction";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";

function BasketPage() {
    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {loadingBasket, basketFilmList, price} = useSelector(state => state.dataBaskets)

    useEffect(() => {
            if (JSON.parse(localStorage.getItem("user")) != null && basketFilmList === null) {
                dispatch(getBasketById(JSON.parse(localStorage.getItem("user")).id))
            }
        }, [basketFilmList, dispatch, user.id]
    )


    const showBasket = () => {
        if (loadingBasket || basketFilmList === null) {
            return (
                <div>
                    <img alt="" src={spinner}
                         style={{resize: "both", width: "100%", height: "256px"}}/>
                </div>
            )
        } else if (basketFilmList.length === 0) {
            return (
                <div>
                    <h3>The basket is empty :(</h3>
                </div>
            )
        } else {
            return (
                <div>
                    <Container>
                        <h2><b>BASKET LIST</b></h2>
                        <hr/>
                        <Row>
                            <div style={{textAlign: "left"}}>
                                <Link to="/profile/payment" className="my-link">
                                    <Button variant='outline-primary' size="lg">
                                        <b>Make an order ({Number(price).toFixed(2)}$)</b>
                                    </Button>
                                </Link>
                                <br/>
                                <br/>
                            </div>
                            <hr/>
                            {
                                basketFilmList.slice(0).reverse().map(film =>
                                    <div key={film.id}>
                                        <BasketItem film={film} showButtons={true}/>
                                        <br/>
                                    </div>
                                )
                            }
                        </Row>
                    </Container>
                </div>
            )
        }
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
                        <CSSTransition in={!loadingBasket} classNames="my-node" timeout={1000} unmountOnExit>
                            <Jumbotron className="bg-dark text-white" style={{paddingTop: "5%", paddingBottom: "5%"}}>
                                {showBasket()}
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