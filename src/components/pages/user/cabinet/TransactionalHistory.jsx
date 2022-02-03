import React, {useEffect} from 'react'
import {Col, Container, Jumbotron, Row} from "react-bootstrap"
import NavigationBar from "../../../common/NavigationBar"
import ProfileMenu from "../../../common/ProfileMenu"
import Footer from "../../../common/Footer"
import {useDispatch, useSelector} from "react-redux";
import {getAllTransactionsByUserId} from "../../../../redux/transaction/TransactionAction";
import TransactionItem from "../../../common/TransactionItem";
import Spinner from "react-bootstrap/Spinner";

function TransactionalHistory() {

    const dispatch = useDispatch()
    const {loadingTransactions, transactionsList} = useSelector(state => state.dataTransactions)

    useEffect(() => {
            let user = JSON.parse(localStorage.getItem("user"));
            if (user != null) {
                dispatch(getAllTransactionsByUserId(user.id))
            }
        }, [dispatch]
    )

    const showPurchases = () => {
        if (loadingTransactions || transactionsList === null) {
            return (
                <div>
                    <span style={{paddingTop: "2%"}}><Spinner animation="border" size={"lg"}/></span>
                </div>
            )
        } else if (transactionsList.length === 0) {
            return (
                <div>
                    <h3>The Transactions is empty</h3>
                </div>
            )
        } else {
            return (
                <div>
                    {
                        transactionsList.slice(0).reverse().map((transaction, index) =>
                            <div key={transaction.id} style={{textAlign: "left"}}>
                                <TransactionItem transaction={transaction}/>
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
                                <h2><b>TRANSACTIONAL HISTORY</b></h2>
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

export default TransactionalHistory