import React, {useEffect, useState} from 'react'
import {Button, Col, Container, Jumbotron, Row, Table} from "react-bootstrap"
import {Link} from "react-router-dom";
import NavigationBar from "../../../common/NavigationBar"
import Footer from "../../../common/Footer"
import {getCountries, getCountryById, setCurrentPage, setSizePage} from "../../../../redux/country/CountryAction";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import PaginationComponent from "../../../common/PaginationComponent";
import RemoveCountryDialog from "./RemoveCountryDialog";
import CreateUpdateCountryDialog from "./CreateUpdateCountryDialog";

function AllCountriesPage() {
    const dispatch = useDispatch()
    const {countries, loading, currentPage, sizePage, totalElements} = useSelector(state => state.dataCountries)

    const [showCreateUpdateCountryDialog, setShowCreateUpdateCountryDialog] = useState(false)
    const [showRemoveCountryDialog, setShowRemoveCountryDialog] = useState(false)
    const [method, setMethod] = useState("")

    useEffect(() => {
            dispatch(getCountries(currentPage, sizePage))
        }, [currentPage, dispatch, sizePage]
    )

    const removeCountry = (id) => {
        dispatch(getCountryById(id))
        setShowRemoveCountryDialog(true)
    }

    const createCountry = () => {
        setShowCreateUpdateCountryDialog(true);
        setMethod("create")
    }

    /**
     * Method that load needed film by id and open CreateUpdateFilmDialog with method update.
     * @param {number} id  - Film id
     */
    const editCountry = (id) => {
        dispatch(getCountryById(id))
        setShowCreateUpdateCountryDialog(true);
        setMethod("update")
    }

    const showContent = () => {
        return (
            <Table striped bordered hover variant="dark">
                <thead>
                <tr>
                    <th style={{minWidth: "9rem"}}>Id</th>
                    <th style={{minWidth: "15rem"}}>Name</th>
                    <th>Action</th>
                </tr>
                </thead>
                {
                    loading && countries.length === 0 ?
                        <div>
                            <span style={{paddingTop: "2%", paddingLeft: "35%", position: "absolute"}}>
                                <Spinner animation="border"/>
                            </span>
                        </div>
                        :
                        <tbody>
                        {
                            countries.map(country =>
                                <tr key={country.id}>
                                    <td><b>{country.id}</b></td>
                                    <td><b>{country.name}</b></td>
                                    <td>
                                        <Button variant="outline-success"
                                                onClick={() => editCountry(country.id)}>
                                            <b>Edit</b>
                                        </Button>{' '}
                                        <Button variant="outline-danger"
                                                onClick={() => removeCountry(country.id)}>
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
        if (showCreateUpdateCountryDialog) {
            return (
                <CreateUpdateCountryDialog
                    show={showCreateUpdateCountryDialog}
                    onHide={() => setShowCreateUpdateCountryDialog(false)}
                    method={method}
                />
            )
        }
        if (showRemoveCountryDialog) {
            return (
                <RemoveCountryDialog
                    show={showRemoveCountryDialog}
                    onHide={() => setShowRemoveCountryDialog(false)}
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
                            <Link to="/profile/admin/controllers">
                                <Button variant="outline-danger"
                                        style={{marginBottom: "20px"}}>
                                    <b>Back to controllers</b>
                                </Button>{' '}
                            </Link>
                            <Button variant="outline-primary"
                                    style={{marginBottom: "20px"}} onClick={() => createCountry()}>
                                <b>Add a new country</b>
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

export default AllCountriesPage