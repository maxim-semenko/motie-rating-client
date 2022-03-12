import React, {useEffect, useState} from 'react'
import NavigationBar from "../../common/NavigationBar"
import Footer from "../../common/Footer"
import {Container, Jumbotron} from "react-bootstrap";
import 'react-slideshow-image/dist/styles.css'
import "react-multi-carousel/lib/styles.css";
import CarouselComponent from "../../common/CarouselComponent";
import GenreService from "../../../service/GenreService";
import FilmService from "../../../service/FilmService";
import Spinner from "react-bootstrap/Spinner";

function TopPage() {
    const [genres, setGenres] = useState([]);
    const [filmsList, setFilmsList] = useState([]);

    useEffect(() => {
        GenreService.findAll()
            .then(resp => {
                async function fetchFilmsByGenre() {
                    let temp = filmsList
                    for (const genre of resp.data.content) {
                        await FilmService.findTop9ByGenre(genre.name)
                            .then((response) => {
                                temp.push(response.data)
                            })
                    }
                    return temp
                }

                fetchFilmsByGenre().then(data => {
                    setGenres(resp.data.content)
                    setFilmsList(data);
                })
            })
    }, [filmsList])

    const getText = (index) => {
        return "TOP 9 " + genres[index].name.toUpperCase() + " FILMS";
    }

    return (
        <div>
            <NavigationBar/>
            <Container>
                <Jumbotron className="bg-dark text-white"
                           style={{marginTop: "20px", paddingTop: "20px"}}>
                    <h1 style={{textAlign: "center", marginLeft: "12px", marginBottom: "15px"}}>
                        <b>THE BEST FILMS IN EVERY GENRE</b>
                    </h1>
                    <Container>
                        <div>
                            {
                                filmsList.length !== 0 ?
                                    <div>
                                        {
                                            filmsList.map((films, index) =>
                                                <div><CarouselComponent text={getText(index)} films={films}/></div>
                                            )
                                        }
                                    </div>
                                    :
                                    <span style={{paddingTop: "2%"}}><Spinner animation="border" size={"lg"}/></span>
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
