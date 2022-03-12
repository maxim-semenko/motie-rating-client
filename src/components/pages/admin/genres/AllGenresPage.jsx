import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Row, Table} from "react-bootstrap"
import NavigationBar from "../../../common/NavigationBar"
import Footer from "../../../common/Footer"
import {getGenreById, getGenres, setCurrentPage, setSizePage} from "../../../../redux/genre/GenreAction";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import PaginationComponent from "../../../common/PaginationComponent";
import CreateUpdateGenreDialog from "./CreateUpdateGenreDialog";
import RemoveGenreDialog from "./RemoveGenreDialog";
import BackControlsButtonComponent from "../../../common/BackControlsButtonComponent";

function AllGenresPage() {
    const dispatch = useDispatch()
    const {genres, loading, currentPage, sizePage, totalElements} = useSelector(state => state.dataGenres)

    const [showAddEditGenreDialog, setShowAddEditGenreDialog] = useState(false)
    const [showRemoveGenreDialog, setShowRemoveGenreDialog] = useState(false)
    const [method, setMethod] = useState("")

    useEffect(() => {
            dispatch(getGenres(currentPage, sizePage))
        }, [currentPage, dispatch, sizePage]
    )

    const removeGenre = (id) => {
        dispatch(getGenreById(id))
        setShowRemoveGenreDialog(true)
    }

    const createGenre = () => {
        setShowAddEditGenreDialog(true);
        setMethod("create")
    }

    /**
     * Method that load needed film by id and open CreateUpdateFilmDialog with method update.
     * @param {number} id  - Film id
     */
    const editGenre = (id) => {
        dispatch(getGenreById(id))
        setShowAddEditGenreDialog(true);
        setMethod("update")
    }

    const showContent = () => {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th style={{minWidth: "9rem"}}>№</th>
                    <th style={{minWidth: "15rem"}}>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                {
                    loading && genres.length === 0 ?
                        <div>
                            <span style={{paddingTop: "2%", paddingLeft: "35%", position: "absolute"}}>
                                <Spinner animation="border"/>
                            </span>
                        </div>
                        :
                        <tbody>
                        {
                            genres.map((genre, index) =>
                                <tr key={index}>
                                    <td><b>{index + 1 + sizePage * (currentPage - 1)}</b></td>
                                    <td><b>{genre.name}</b></td>
                                    <td>
                                        <Button variant="outline-success"
                                                onClick={() => editGenre(genre.id)}>
                                            <b>Edit</b>
                                        </Button>{' '}
                                        <Button variant="outline-danger"
                                                onClick={() => removeGenre(genre.id)}>
                                            <b>Remove</b>
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

    const changeSizePage = (event) => {
        dispatch(setSizePage(event.target.value));
        dispatch(setCurrentPage(1))
    }

    const showDialogs = () => {
        if (showAddEditGenreDialog) {
            return (
                <CreateUpdateGenreDialog
                    show={showAddEditGenreDialog}
                    onHide={() => setShowAddEditGenreDialog(false)}
                    method={method}
                />
            )
        }
        if (showRemoveGenreDialog) {
            return (
                <RemoveGenreDialog
                    show={showRemoveGenreDialog}
                    onHide={() => setShowRemoveGenreDialog(false)}
                />
            )
        }
    }

    return (
        <div>
            {showDialogs()}
            <NavigationBar/>
            <Container fluid>
                <Col lg={12} style={{marginTop: "20px"}}>
                    <Jumbotron className="bg-dark text-white">
                        <div style={{margin: "0 auto"}}>
                            <BackControlsButtonComponent/>
                            <Button variant="outline-primary"
                                    style={{marginBottom: "20px"}} onClick={() => createGenre()}>
                                <b>Add a new genre</b>
                            </Button>
                        </div>
                        <Row>
                            <PaginationComponent
                                sizePage={sizePage}
                                totalElements={totalElements}
                                currentPage={currentPage}
                                changeSizePage={changeSizePage}
                                changeCurrentPage={(pageNumber) => dispatch(setCurrentPage(pageNumber))}
                            />
                            {showContent()}
                        </Row>
                    </Jumbotron>
                </Col>
            </Container>
            <Footer/>
        </div>
    )
}

export default AllGenresPage
