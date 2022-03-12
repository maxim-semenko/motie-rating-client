import React, {useEffect} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../../common/NavigationBar"
import ProfileMenu from "../../../common/ProfileMenu"
import BasketItem from "../../../common/BasketItem"
import Footer from "../../../common/Footer"
import {getBasketById} from "../../../../redux/basket/BasketAction";
import {useDispatch, useSelector} from "react-redux";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import Spinner from "react-bootstrap/Spinner";

function BasketPage() {
    const dispatch = useDispatch()
    const {loadingBasket, basketFilmList, price} = useSelector(state => state.dataBaskets)

    useEffect(() => {
            let user = JSON.parse(localStorage.getItem("user"))
            if (user != null) {
                dispatch(getBasketById(user.id))
            }
        }, [dispatch]
    )

    const showBasket = () => {
        if (loadingBasket || basketFilmList === null) {
            return (
                <div>
                   <span style={{paddingTop: "2%"}}>
                       <Spinner animation="border" size={"lg"}/>
                   </span>
                </div>
            )
        } else if (basketFilmList.length === 0) {
            return (<div><h3>The basket is empty</h3></div>)
        } else {
            return (
                <div>
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
                </div>
            )
        }
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={3} style={{marginTop: "20px"}}><ProfileMenu/></Col>
                    <Col lg={9} style={{marginTop: "20px"}}>
                        <Jumbotron className="bg-dark text-white" style={{paddingTop: "5%", paddingBottom: "5%"}}>
                            <Container>
                                <h2><b>BASKET LIST</b></h2>
                                <hr/>
                                {showBasket()}
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default BasketPage