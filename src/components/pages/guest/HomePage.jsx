import React, {useEffect, useState} from 'react'
import {Button, Container, Form, FormControl, Jumbotron} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import NavigationBar from "../../common/NavigationBar"
import HomeFilmList from "../../common/HomeFilmList";
import Footer from "../../common/Footer"
import Pagination from "react-js-pagination";
import {getBasketById} from "../../../redux/basket/BasketAction";
import {getFilms, getFilmsByName, resetFilms} from "../../../redux/film/FilmAction";
import Spinner from "react-bootstrap/Spinner";
import {getPurchaseStorageById} from "../../../redux/purchase/PurchaseAction";
import '../../../styles/FormControl.css'

function HomePage() {
    const dispatch = useDispatch()
    const [isInitPage, setIsInitPage] = useState(false)
    const {films, loading, totalElements} = useSelector(state => state.dataFilms)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchByName, setSearchByName] = useState(false)
    const [nameForSearch, setNameForSearch] = useState("")

    useEffect(() => {
            if (!isInitPage) {
                dispatch(resetFilms())
                dispatch(getFilms(currentPage, 9))
                const user = JSON.parse(localStorage.getItem("user"));
                if (user !== null) {
                    dispatch(getBasketById(user.id))
                    dispatch(getPurchaseStorageById(user.id))
                }
                setIsInitPage(true)
            }
        }, [currentPage, dispatch, isInitPage]
    )

    const getAllFilmsByName = () => {
        if (!searchByName) {
            setSearchByName(true)
            setCurrentPage(1)
            dispatch(getFilmsByName(nameForSearch))
        } else {
            dispatch(getFilmsByName(nameForSearch, currentPage, 9))
        }
    }

    const getAllFilms = () => {
        setSearchByName(false)
        setCurrentPage(1)
        setNameForSearch("")
        dispatch(getFilms(1, 9))
    }

    const changePage = (page) => {
        setCurrentPage(page)
        dispatch(getFilms(page, 9))
    }

    const showContent = () => {
        if (!isInitPage || loading || (films.length === 0 && !searchByName)) {
            return (
                <div>
                    <span style={{paddingTop: "2%"}}><Spinner animation="border" size={"lg"}/></span>
                </div>
            )
        } else {
            return (
                <div>
                    <Form className="d-flex">
                        <FormControl
                            style={{marginRight: "5px"}}
                            value={nameForSearch}
                            type="search"
                            placeholder="Search film by name"
                            className="me-2"
                            aria-label="Search"
                            onChange={event => setNameForSearch(event.target.value.replace(/[^a-zA-Z\s0-9]/g, ""))}
                        />
                        <Button variant="outline-success"
                                onClick={getAllFilmsByName}><b>Search</b></Button>
                        {
                            searchByName ?
                                <Button style={{marginLeft: "5px"}}
                                        variant="outline-warning"
                                        onClick={getAllFilms}><b>Reset</b>
                                </Button>
                                :
                                null
                        }
                    </Form>
                    <br/>
                    {displayPagination()}
                    {
                        films.length === 0 ?
                            <div>
                                <h2>The result is empty! Try again.</h2>
                            </div>
                            :
                            <HomeFilmList/>
                    }
                    <br/>
                    {displayPagination()}
                </div>
            )
        }
    }

    const displayPagination = () => {
        return (
            <Pagination itemClass="page-item"
                        linkClass="page-link"
                        activePage={currentPage}
                        totalItemsCount={totalElements}
                        itemsCountPerPage={9}
                        pageRangeDisplayed={5}
                        onChange={(pageNumber) => changePage(pageNumber)}
            />
        )
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>
                        <div>
                            {!searchByName ? <b>LAST ADDED FILMS</b> : <b>THE RESULT BY SEARCH</b>}
                        </div>
                    </h1>
                    <Container>
                        <div>
                            {showContent()}
                        </div>
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    );
}

export default HomePage