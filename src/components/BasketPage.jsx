import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import Footer from "./Footer";
import ProfileMenu from "./ProfileMenu";

class BasketPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        }
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
                            Not empty
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