import React, {useEffect} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../../common/NavigationBar"
import ProfileMenu from "../../../common/ProfileMenu"
import Footer from "../../../common/Footer"
import {useDispatch, useSelector} from "react-redux";
import {getPurchaseStorageById} from "../../../../redux/purchase/PurchaseAction";
import BasketItem from "../../../common/BasketItem";
import Spinner from "react-bootstrap/Spinner";

function PurchasesPage() {

    const user = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const {loadingPurchaseStorage, purchaseFilmList} = useSelector(state => state.dataPurchases)

    useEffect(() => {
            window.scrollTo(0, 0);
            if (JSON.parse(localStorage.getItem("user")) != null) {
                dispatch(getPurchaseStorageById(JSON.parse(localStorage.getItem("user")).id))
            }
        }, [dispatch, user.id]
    )

    const showPurchases = () => {
        if (loadingPurchaseStorage || purchaseFilmList === null) {
            return (
                <div>
                    <span style={{paddingTop: "2%"}}><Spinner animation="border" size={"lg"}/></span>
                </div>
            )
        } else if (purchaseFilmList.length === 0) {
            return (
                <div>
                    <h3>The Purchases is empty</h3>
                </div>
            )
        } else {
            return (
                <div>
                    {
                        purchaseFilmList.slice(0).reverse().map(film =>
                            <div key={film.id}>
                                <BasketItem film={film} showButtons={false}/>
                                <br/>
                            </div>
                        )
                    }
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
                        <Jumbotron className="bg-dark text-white" style={{paddingTop: "5%", paddingBottom: "5%"}}>
                            <Container>
                                <h2><b>PURCHASES LIST</b></h2>
                                <hr/>
                                {showPurchases()}
                            </Container>
                        </Jumbotron>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </div>
    );
}

export default PurchasesPage