import React from 'react';
import CardFilm from "./CardFilm";
import {Row} from "react-bootstrap";

function HomeFilmList(props) {

    return (
        <Row>
            {
                props.films.slice(0).map(film =>
                    <div className="col-md-6 col-xl-4" style={{marginTop: "30px"}} key={film.id}>
                        <CardFilm film={film}/>
                    </div>
                )
            }
        </Row>

    );
}

export default HomeFilmList;