import React, {useEffect, useState} from 'react'
import {Button, Container, Form, FormControl, Jumbotron} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "./NavigationBar"
import Footer from "../../Footer"
import {getFilms, getFilmsByName} from "../../../redux/film/FilmAction";
import Pagination from "react-js-pagination";
import Spinner from "react-bootstrap/Spinner";
import '../../../styles/FormControl.css'
import HomeFilmList from "./HomeFilmList";

function HomePage() {
    const dispatch = useDispatch()
    const {films, loading, totalElements} = useSelector(state => state.dataFilms)
    const [isLogin, setIsLogin] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [searchByName, setSearchByName] = useState(false)
    const [nameForSearch, setNameForSearch] = useState("")

    useEffect(() => {
            localStorage.getItem("user") !== null ? setIsLogin(true) : setIsLogin(false)
            dispatch(getFilms(currentPage, 9))
        }, [currentPage, dispatch, isLogin]
    )

    const getAllFilmsByName = () => {
        if (!searchByName) {
            setSearchByName(true)
            setCurrentPage(1)
            dispatch(getFilmsByName(1, 9, nameForSearch))
        } else {
            dispatch(getFilmsByName(currentPage, 9, nameForSearch))
        }
    }

    const getAllFilms = () => {
        setSearchByName(false)
        setCurrentPage(1)
        setNameForSearch("")
        dispatch(getFilms(1, 9))
    }

    const showContent = () => {
        if (loading) {
            return (
                <div>
                   <span style={{paddingTop: "2%"}}>
                       <Spinner animation="border" size={"lg"}/>
                   </span>
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
                            onChange={(event) => setNameForSearch(event.target.value)}
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
                    <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                        {
                            films.length === 0 ?
                                <div>
                                    <h2>The result is empty! Try again.</h2>
                                </div>
                                :
                                <HomeFilmList films={films} isLogin={isLogin}/>
                        }
                    </CSSTransition>
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
                        onChange={(pageNumber) => setCurrentPage(pageNumber)}
            />
        )
    }

    return (
        <div>
            <NavigationBar setIsLoginMethod={setIsLogin}/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>

                        {
                            !searchByName ?
                                <div>
                                    LAST ADDED FILMS
                                </div>
                                :
                                <div>
                                    THE RESULT BY SEARCH
                                </div>

                        }
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