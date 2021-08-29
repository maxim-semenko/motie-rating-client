import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Row, Table} from "react-bootstrap"
import NavigationBar from "../../NavigationBar"
import CSSTransition from "react-transition-group/CSSTransition"
import Footer from "../../Footer"
import FilmService from "../../../service/FilmService"

function AllFilmsPage(props) {
    const [loading, setLoading] = useState(false)
    const [filmList, setFilmList] = useState([])

    useEffect(() => {
            if (filmList.length === 0) {
                // props.history.replace({pathname: `/product/`});
                setLoading(true)
                FilmService.findAll()
                    .then(response => {
                        setFilmList(response.data)
                        setLoading(false)
                    }).catch(error => {
                        console.log(error);
                    }
                )
            }
        }, [filmList.length]
    )

    return (
        <div>
            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <Row>
                            <div style={{margin: "0 auto"}}>
                                <Button href="/profile/admin/controllers" variant="outline-danger"
                                        style={{marginBottom: "20px"}}>
                                    <b>Back to controllers</b>
                                </Button>
                            </div>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Time</th>
                                    <th>Country</th>
                                    <th>Year</th>
                                    <th>Rating</th>
                                    <th>Price($)</th>
                                    <th>Genre</th>
                                    <th>Action</th>
                                </tr>
                                </thead>
                                <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                                    <tbody>
                                    {
                                        filmList.map(film =>
                                            <tr key={film.id}>
                                                <td><b>{film.name}</b></td>
                                                <td><b>{film.timeInMinutes}min</b></td>
                                                <td><b>{film.country}</b></td>
                                                <td><b>{film.year}</b></td>
                                                <td><b>{film.rating}</b></td>
                                                <td><b>{film.price}$</b></td>
                                                <td><b>{film.genre.name}</b></td>
                                                <td>
                                                    <Button variant="outline-success">
                                                        <b>Edit</b>
                                                    </Button>{' '}
                                                    <Button variant="outline-danger">
                                                        <b>Remove</b>
                                                    </Button>{' '}
                                                    <Button variant="outline-warning">
                                                        <b>More info</b>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                    </tbody>
                                </CSSTransition>
                            </Table>
                        </Row>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    );
}

export default AllFilmsPage;