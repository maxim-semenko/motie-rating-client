import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Form, Jumbotron, Pagination, Row, Table} from "react-bootstrap"
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "../../NavigationBar"
import Footer from "../../Footer"
import FilmService from "../../../service/FilmService"
import AddFilmModal from "./AddFilmModal";
import EditFilmModal from "./EditFilmModal";
import {useHistory} from "react-router-dom";

function AllFilmsPage() {
    const history = useHistory('');
    const search = window.location.search;
    const params = new URLSearchParams(search);

    const [loading, setLoading] = useState(false)
    const [filmList, setFilmList] = useState([])
    const [showAddFilmModal, setShowAddFilmModal] = useState(false)
    const [showEditFilmModal, setShowEditFilmModal] = useState(false)

    const [currentPage, setCurrentPage] = useState(0)
    const [size, setSize] = useState(10)
    const [totalPages, setTotalPages] = useState(0)
    const [totalElements, setTotalElements] = useState(0)
    // const [currentPage, setCurrentPage] = useState(0)


    useEffect(() => {
            FilmService.getAll().then(response => {
                setFilmList(response.data.content)
                setLoading(false)
            })
            // if (filmList.length === 0) {
            //     setLoading(true)
            //     FilmService.getAll()
            //         .then(response => {
            //             setFilmList(response.data.content)
            //             setTotalPages(response.data.totalPages)
            //             setTotalElements(response.data.totalElements)
            //             setLoading(false)
            //         }).catch(error => {
            //             console.log(error);
            //         }
            //     )
            // }
        }, []
    )

    const getFilms = () => {
        FilmService.getAll(currentPage, size)
            .then(response => {
                setFilmList(response.data.content)
                setTotalPages(response.data.totalPages)
                setTotalElements(response.data.totalElements)
                setLoading(false)
            }).catch(error => {
                console.log(error);
            }
        )
    }

    const next = (page) => {
        FilmService.getAll(page + 1, size)
            .then(response => {
                setFilmList(response.data.content)
                setTotalPages(response.data.totalPages)
                setTotalElements(response.data.totalElements)
                setLoading(false)
                if (page + 1 > totalPages - 1) {
                    page = totalPages - 1
                } else {
                    setCurrentPage(page + 1)
                }
            }).catch(error => {
                console.log(error);
            }
        )
    }

    const selectPage = (event) => {
        let size = event.target.value
        FilmService.getAll(currentPage, size)
            .then(response => {
                setFilmList(response.data.content)
                setTotalPages(response.data.totalPages)
                setTotalElements(response.data.totalElements)
                setLoading(false)
                setSize(size)
            }).catch(error => {
                console.log(error);
            }
        )
    }


    const prev = (page) => {
        FilmService.getAll(page - 1, size)
            .then(response => {
                setFilmList(response.data.content)
                setTotalPages(response.data.totalPage)
                setTotalElements(response.data.totalElements)
                setLoading(false)
                if (page - 1 < 0) {
                    page = 0
                } else {
                    setCurrentPage(page - 1)
                }
            }).catch(error => {
                console.log(error);
            }
        )

    }

    const removeFilm = (id) => {
        FilmService.removeById(id).then(response => {
            console.log(response)
            getFilms()
        }).catch(error => {
                console.log(error)
            }
        )
    }

    return (
        <div>
            <AddFilmModal
                show={showAddFilmModal}
                onHide={() => setShowAddFilmModal(false)}
                updateList={getFilms}
            />
            <EditFilmModal
                show={showEditFilmModal}
                onHide={() => setShowEditFilmModal(false)}
                updateList={getFilms}
            />

            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <Row>
                            <div style={{margin: "0"}}>
                                <Button href="/profile/admin/controllers" variant="outline-danger"
                                        style={{marginBottom: "20px"}}>
                                    <b>Back to controllers</b>
                                </Button>{' '}
                                <Button variant="outline-success"
                                        style={{marginBottom: "20px"}} onClick={() => setShowAddFilmModal(true)}>
                                    <b>Add a new film</b>
                                </Button>

                                <Form style={{textAlign: "left"}}>
                                    <Form.Group className="mb-4">
                                        <Form.Label> Size of elements:</Form.Label>
                                        <Form.Control as={"input"} type={"number"}
                                                      placeholder={"Count of elements of page"}
                                                      value={size} onChange={event => selectPage(event)} min={"1"}
                                                      max={totalElements} style={{width: "120px"}}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-4">

                                        <Pagination size={"lg"}>
                                            <Pagination.First disabled={currentPage === 0}/>
                                            <Pagination.Prev disabled={currentPage === 0}
                                                             onClick={() => prev(currentPage)}/>

                                            <Pagination.Item>{currentPage + 1}</Pagination.Item>

                                            <Pagination.Next disabled={currentPage === totalPages - 1}
                                                             onClick={() => next(currentPage)}/>
                                            <Pagination.Last disabled={currentPage === totalPages - 1}/>
                                        </Pagination>
                                    </Form.Group>

                                </Form>
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
                                                <td><b>{film.country.name}</b></td>
                                                <td><b>{film.year}</b></td>
                                                <td><b>{film.rating}</b></td>
                                                <td><b>{film.price}$</b></td>
                                                <td><b>{film.genre.name}</b></td>
                                                <td>
                                                    <Button variant="outline-success"
                                                            onClick={() => setShowEditFilmModal(true)}>
                                                        <b>Edit</b>
                                                    </Button>{' '}
                                                    <Button variant="outline-danger"
                                                            onClick={() => removeFilm(film.id)}>
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