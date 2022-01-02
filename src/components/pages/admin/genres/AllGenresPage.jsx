import React, {useEffect} from 'react'
import {Button, Col, Container, Jumbotron, Row, Table} from "react-bootstrap"
import {Link} from "react-router-dom";
import NavigationBar from "../../../common/NavigationBar"
import Footer from "../../../common/Footer"
import {createCountry, getCountries, setCurrentPage, setSizePage} from "../../../../redux/country/CountryAction";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "react-bootstrap/Spinner";
import PaginationComponent from "../../../common/PaginationComponent";

function AllGenresPage() {
    const dispatch = useDispatch()
    const {countries, loading, currentPage, sizePage, totalElements} = useSelector(state => state.dataCountries)

    useEffect(() => {
            dispatch(getCountries(currentPage, sizePage))
            console.log(countries)
            if (totalElements !== 0 && sizePage > totalElements) {
                dispatch(setSizePage(totalElements))
            }
        }, [countries, currentPage, dispatch, sizePage, totalElements]
    )

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
                                        <Button variant="outline-success">
                                            <b>Edit</b>
                                        </Button>{' '}
                                        <Button variant="outline-danger">
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

    return (
        <div>
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