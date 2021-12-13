import React, {useEffect, useState} from 'react'
import {Container, Jumbotron} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux";
import CSSTransition from "react-transition-group/CSSTransition"
import NavigationBar from "./NavigationBar"
import Footer from "../../Footer"
import {getFilms} from "../../../redux/film/FilmAction";
import Pagination from "react-js-pagination";
import Spinner from "react-bootstrap/Spinner";
import '../../../styles/FormControl.css'
import HomeFilmList from "./HomeFilmList";

function HomePage() {
    const dispatch = useDispatch()
    const {films, loading, totalElements} = useSelector(state => state.dataFilms)
    const [isLogin, setIsLogin] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
            localStorage.getItem("user") !== null ? setIsLogin(true) : setIsLogin(false)
            dispatch(getFilms(currentPage, 9))
        }, [currentPage, dispatch, isLogin]
    )


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
                    {displayPagination()}
                    <CSSTransition in={!loading} classNames="my-node" timeout={1000} unmountOnExit>
                        <HomeFilmList films={films} isLogin={isLogin}/>
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
                    <h1 style={{textAlign: "left", marginLeft: "12px", marginBottom: "15px"}}>
                        The lasted added films list
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