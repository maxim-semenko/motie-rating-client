import React, {useEffect, useState} from 'react'
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"
import {Container, Jumbotron} from "react-bootstrap";
import 'react-slideshow-image/dist/styles.css'
import "react-multi-carousel/lib/styles.css";
import Spinner from "react-bootstrap/Spinner";
import FilmService from "../../../service/FilmService";
import CarouselComponent from "../../common/CarouselComponent";

function TopPage() {
    const [actionFilmList, setActionFilmList] = useState([]);
    const [adventureFilmList, setAdventureFilmList] = useState([]);
    const [cartoonFilmList, setCartoonFilmList] = useState([]);
    const [comedyFilmList, setComedyFilmList] = useState([]);
    const [dramaticFilmList, setDramaticFilmList] = useState([]);
    const [fantasyFilmList, setFantasyFilmList] = useState([]);
    const [romanticFilmList, setRomanticFilmList] = useState([]);
    const [scientificFilmList, setScientificFilmList] = useState([]);

    useEffect(() => {
        FilmService.findTop9ByGenre("Action")
            .then((response) => {
                setActionFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Adventure")
            .then((response) => {
                setAdventureFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Cartoon")
            .then((response) => {
                setCartoonFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Comedy")
            .then((response) => {
                setComedyFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Dramatic")
            .then((response) => {
                setDramaticFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Fantasy")
            .then((response) => {
                setFantasyFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Romantic")
            .then((response) => {
                setRomanticFilmList(response.data)
            })
        FilmService.findTop9ByGenre("Scientific")
            .then((response) => {
                setScientificFilmList(response.data)
            })
    }, [])

    const check = () => {
        return actionFilmList.length === 0 || adventureFilmList.length === 0 || cartoonFilmList.length === 0
            || comedyFilmList.length === 0 || dramaticFilmList.length === 0 || fantasyFilmList.length === 0
            || romanticFilmList.length === 0 || scientificFilmList.length === 0;
    }

    const showContent = () => {
        return (
            <div>
                <CarouselComponent text="TOP 9 ACTION FILMS" films={actionFilmList}/>
                <CarouselComponent text="TOP 9 ADVENTURE FILMS" films={adventureFilmList}/>
                <CarouselComponent text="TOP 9 CARTOON FILMS" films={cartoonFilmList}/>
                <CarouselComponent text="TOP 9 COMEDY FILMS" films={comedyFilmList}/>
                <CarouselComponent text="TOP 9 DRAMATIC FILMS" films={dramaticFilmList}/>
                <CarouselComponent text="TOP 9 FANTASY FILMS" films={fantasyFilmList}/>
                <CarouselComponent text="TOP 9 ROMANTIC FILMS" films={romanticFilmList}/>
                <CarouselComponent text="TOP 9 SCIENTIFIC FILMS" films={scientificFilmList}/>
            </div>
        )
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white"
                           style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>
                        <div>
                            <b>THE BEST FILMS IN EVERY GENRE</b>
                        </div>
                    </h1>
                    <Container>
                        <div>
                            {
                                check() ?
                                    <div>
                                        <span style={{paddingTop: "2%"}}><Spinner animation="border"
                                                                                  size={"lg"}/></span>
                                    </div>
                                    :
                                    <div>
                                        {showContent()}
                                    </div>
                            }
                        </div>
                    </Container>
                </Jumbotron>
            </Container>
            <Footer/>
        </div>
    );
}

export default TopPage