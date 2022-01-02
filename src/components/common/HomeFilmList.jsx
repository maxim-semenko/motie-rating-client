import React from 'react';
import CardFilm from "./CardFilm";
import {Row} from "react-bootstrap";
import {useSelector} from "react-redux";

function HomeFilmList() {
    const {films} = useSelector(state => state.dataFilms)

    const showList = () => {
        return (
            <Row>
                {
                    films.slice(0).map(film =>
                        <div className="col-md-6 col-xl-4"
                             style={{marginTop: "30px"}}
                             key={film.id}>
                            <CardFilm film={film}/>
                        </div>
                    )
                }
            </Row>
        )
    }

    return (
        <div>
            {showList()}
        </div>
    );
}

export default HomeFilmList;