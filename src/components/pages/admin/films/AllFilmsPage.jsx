import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Form, Jumbotron, Row, Table} from "react-bootstrap"
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../../Footer"
import CreateUpdateFilmDialog from "./CreateUpdateFilmDialog";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getFilmById, getFilms, setCurrentPage, setSizePage} from "../../../../redux/film/FilmAction";
import Pagination from "react-js-pagination";
import Spinner from 'react-bootstrap/Spinner'
import RemoveFilmDialog from "./RemoveFilmDialog";
import AboutFilmDialog from "./AboutFilmDialog";

function AllFilmsPage() {
    const dispatch = useDispatch()
    const {films, loading, currentPage, sizePage, totalElements} = useSelector(state => state.dataFilms)

    const [showAddEditFilmDialog, setShowAddEditFilmDialog] = useState(false)
    const [showAboutFilmDialog, setShowAboutFilmDialog] = useState(false)
    const [showRemoveFilmDialog, setShowRemoveFilmDialog] = useState(false)
    const [method, setMethod] = useState("")

    useEffect(() => {
            dispatch(getFilms(currentPage, sizePage))
            if (totalElements !== 0 && sizePage > totalElements) {
                dispatch(setSizePage(totalElements))
            }
        }, [currentPage, dispatch, sizePage, totalElements]
    )

    const aboutFilm = (id) => {
        dispatch(getFilmById(id))
        setShowAboutFilmDialog(true)
    }

    const removeFilm = (id) => {
        dispatch(getFilmById(id))
        setShowRemoveFilmDialog(true)
    }

    const createFilm = () => {
        setShowAddEditFilmDialog(true);
        setMethod("create")
    }

    /**
     * Method that load needed film by id and open CreateUpdateFilmDialog with method update.
     * @param {number} id  - Film id
     */
    const editFilm = (id) => {
        dispatch(getFilmById(id))
        setShowAddEditFilmDialog(true);
        setMethod("update")
    }

    const showContent = () => {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th style={{minWidth: "16rem"}}>Name</th>
                    <th style={{minWidth: "16rem"}}>Genre</th>
                    <th style={{minWidth: "1rem"}}>Rating</th>
                    <th style={{minWidth: "1rem"}}>Price($)</th>
                    <th>Action</th>
                </tr>
                </thead>
                {
                    loading && films.length === 0 ?
                        <div>
                            <span style={{paddingTop: "2%", paddingLeft: "30%", position: "absolute"}}>
                                <Spinner animation="border"/>
                            </span>
                        </div>
                        :
                        <tbody>
                        {
                            films.map(film =>
                                <tr key={film.id}>
                                    <td><b>{film.name}</b></td>
                                    <td><b>{film.genre.name}</b></td>
                                    <td><b>{film.rating}</b></td>
                                    <td><b>{film.price}$</b></td>
                                    <td>
                                        <Button variant="outline-success"
                                                onClick={() => editFilm(film.id)}>
                                            <b>Edit</b>
                                        </Button>{' '}
                                        <Button variant="outline-danger"
                                                onClick={() => removeFilm(film.id)}>
                                            <b>Remove</b>
                                        </Button>{' '}
                                        <Button variant="outline-warning"
                                                onClick={() => aboutFilm(film.id)}>
                                            <b>More info</b>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        }
                        </tbody>
                }
            </Table>
        )
    }


    return (
        <div>
            {
                showAddEditFilmDialog ?
                    <CreateUpdateFilmDialog
                        show={showAddEditFilmDialog}
                        onHide={() => setShowAddEditFilmDialog(false)}
                        method={method}
                        updateList={getFilms}
                    />
                    :
                    null
            }
            {
                showRemoveFilmDialog ?
                    <RemoveFilmDialog
                        show={showRemoveFilmDialog}
                        onHide={() => setShowRemoveFilmDialog(false)}
                    />
                    :
                    null
            }
            {
                showAboutFilmDialog ?
                    <AboutFilmDialog
                        show={showAboutFilmDialog}
                        onHide={() => setShowAboutFilmDialog(false)}
                    />
                    :
                    null
            }
            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <Link to="/profile/admin/controllers">
                            <Button variant="outline-danger"
                                    style={{marginBottom: "20px"}}>
                                <b>Back to controllers</b>
                            </Button>{' '}
                        </Link>
                        <Button variant="outline-primary"
                                style={{marginBottom: "20px"}} onClick={() => createFilm()}>
                            <b>Create a new film</b>
                        </Button>
                        <Row>
                            <div style={{margin: "0"}}>
                                <Form style={{textAlign: "left"}}>
                                    <Form.Group className="mb-4">
                                        <Form.Label> Size of elements:</Form.Label>
                                        <Form.Control as={"input"} type={"number"}
                                                      placeholder={"Count of elements of page"}
                                                      value={sizePage}
                                                      onChange={event => {
                                                          dispatch(setSizePage(event.target.value));
                                                          dispatch(setCurrentPage(1))
                                                      }
                                                      }
                                                      min={"1"}
                                                      max={totalElements} style={{width: "120px"}}>
                                        </Form.Control>
                                    </Form.Group>
                                    <Form.Group className="mb-4">
                                        <Pagination itemClass="page-item"
                                                    linkClass="page-link"
                                                    activePage={currentPage}
                                                    itemsCountPerPage={sizePage}
                                                    totalItemsCount={totalElements}
                                                    pageRangeDisplayed={5}
                                                    onChange={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
                                        />
                                    </Form.Group>
                                </Form>
                            </div>
                            {showContent()}
                        </Row>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    );
}

export default AllFilmsPage;