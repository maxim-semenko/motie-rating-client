import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import {Col, Container, Jumbotron, Row} from "react-bootstrap";
import Footer from "./Footer";
import FilmService from "../service/FilmService";
import Card from "react-bootstrap/Card";

import '../css/FormControl.css';
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";


class HomePage extends Component {
    decryption;
    price;
    timeInMinutes;

    constructor(props) {
        super(props);

        this.state = {
            films: [],
        }
    }

    componentDidMount() {
        FilmService.getAll().then((res) => {
            this.setState({films: res.data})
            console.log(this.state.films);
        })
    }

    render() {
        return (
            <div>
                <NavigationBar/>

                <Container>
                    <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                        <Container>
                            <Row>
                                {
                                    this.state.films.map(
                                        films =>
                                            <div className="col-md-6 col-xl-4" style={{marginTop: "30px"}}>
                                                <Card className="customCard">
                                                    <Link to="/about">
                                                        <Card.Img variant="top" height="450rem" src={films.imageURL}/>
                                                    </Link>
                                                    <Card.Title>
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
                                                            <Button variant="outline-success">
                                                                Buy film
                                                            </Button>{' '}
                                                            <Button variant="outline-primary">
                                                                Add to basket
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
                </Container>


                {/*<table className={"table table-bordered"}>*/}
                {/*    <thead>*/}
                {/*    <tr>*/}
                {/*        <th>Name</th>*/}
                {/*        <th>Decryption</th>*/}
                {/*        <th>Price</th>*/}
                {/*        <th>timeInMinutes</th>*/}
                {/*    </tr>*/}
                {/*    </thead>*/}
                {/*    <tbody>*/}
                {/*    {*/}
                {/*        this.state.films.map(*/}
                {/*            films =>*/}
                {/*                <tr key={films.id}>*/}
                {/*                    <td>{films.name}</td>*/}
                {/*                    <td>{films.decryption}</td>*/}
                {/*                    <td>{films.price}</td>*/}
                {/*                    <td>{films.timeInMinutes}</td>*/}
                {/*                </tr>*/}
                {/*        )*/}
                {/*    }*/}
                {/*    </tbody>*/}
                {/*</table>*/}

                <Footer/>
            </div>
        )
            ;
    }
}

export default HomePage;