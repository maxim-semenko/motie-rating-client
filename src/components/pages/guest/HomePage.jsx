import React, {useEffect, useState} from 'react'
import {Button, Container, Form, FormControl, Jumbotron} from "react-bootstrap"
import {useDispatch} from "react-redux";
import NavigationBar from "../../common/NavigationBar"
import HomeFilmList from "../../common/HomeFilmList";
import Footer from "../../common/Footer"
import Pagination from "react-js-pagination";
import {getBasketById} from "../../../redux/basket/BasketAction";
import Spinner from "react-bootstrap/Spinner";
import {getPurchaseStorageById} from "../../../redux/purchase/PurchaseAction";
import FilmService from "../../../service/FilmService";
import '../../../styles/FormControl.css'

function HomePage() {
    const dispatch = useDispatch()

    const [isInitPage, setIsInitPage] = useState(false)
    const [films, setFilms] = useState([])
    const [loadingFilms, setLoadingFilms] = useState(true)
    const [totalFilms, setTotalFilms] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)

    const [searchByName, setSearchByName] = useState(false)
    const [nameForSearch, setNameForSearch] = useState("")

    useEffect(() => {
            if (!isInitPage) {
                FilmService.getAll(1, 9).then(resp => {
                    console.log(resp.data)
                    setFilms(resp.data.content)
                    setTotalFilms(resp.data.totalElements)
                    setLoadingFilms(false)
                })
                const user = JSON.parse(localStorage.getItem("user"));
                if (user !== null) {
                    dispatch(getBasketById(user.id))
                    dispatch(getPurchaseStorageById(user.id))
                }
                setIsInitPage(true)
            }
        }, [dispatch, isInitPage]
    )

    const getAllFilmsByName = () => {
        if (nameForSearch.length !== 0) {
            setLoadingFilms(true)
            setSearchByName(true)
            setCurrentPage(1)
            FilmService.getAllByName(1, 9, nameForSearch).then(resp => {
                gotFilmsSuccess(resp)
            })
        }
    }

    const resetFilms = () => {
        setNameForSearch("")
        setSearchByName(false)
        getAllFilms();
    }

    const gotFilmsSuccess = (resp) => {
        setFilms(resp.data.content)
        setTotalFilms(resp.data.totalElements)
        setLoadingFilms(false)
    }

    const changePage = (page) => {
        getAllFilms(page, 9)
    }

    const getAllFilms = (page = 1, size = 9) => {
        setLoadingFilms(true)
        setCurrentPage(page)
        FilmService.getAll(page, size).then(resp => {
            gotFilmsSuccess(resp)
        })
    }


    const showResetButton = () => {
        if (searchByName) {
            return (
                <Button style={{marginLeft: "5px"}} variant="outline-warning" onClick={resetFilms}><b>Reset</b></Button>
            )
        }
    }

    const PaginationComponent = () => {
        return (
            <Pagination itemClass="page-item"
                        linkClass="page-link"
                        activePage={currentPage}
                        totalItemsCount={totalFilms}
                        itemsCountPerPage={9}
                        pageRangeDisplayed={5}
                        onChange={(pageNumber) => changePage(pageNumber)}
            />
        )
    }

    const showFilmList = () => {
        if (films.length === 0) {
            return <h2>The result is empty! Try again.</h2>
        } else {
            return <HomeFilmList films={films}/>
        }
    }

    const Content = () => {
        return (
            <div>
                <Form className="d-flex">
                    <FormControl
                        style={{marginRight: "5px"}}
                        value={nameForSearch}
                        placeholder="Search films by name"
                        onChange={event => setNameForSearch(event.target.value.replace(/[^a-zA-Z\s0-9]/g, ""))}
                    />
                    <Button variant="outline-success" onClick={getAllFilmsByName}><b>Search</b></Button>
                    {showResetButton()}
                </Form>
                <br/>
                <PaginationComponent/>
                {showFilmList()}
                <br/>
                <PaginationComponent/>
            </div>
        )
    }

    const showContent = () => {
        if (loadingFilms) {
            return <span style={{paddingTop: "2%"}}><Spinner animation="border" size={"lg"}/></span>
        } else {
            return <Content/>
        }
    }

    return (
        <maim>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white" style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>
                        {!searchByName ? <b>LAST ADDED FILMS</b> : <b>THE RESULT BY SEARCH</b>}
                    </h1>
                    <Container>
                        {showContent()}
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </maim>
    );
}

export default HomePage
