import React from 'react';
import {Link} from "react-router-dom";
import {Card} from "react-bootstrap";
import AddRemoveFilmBasket from "./AddRemoveFilmBasket";

function CardFilm(props) {
    return (
        <div>
            <Card className="customCard">
                <Link to={{pathname: `/film/${props.film.id}`}}>
                    <Card.Img variant="top" height="450rem" src={props.film.imageURL}/>
                </Link>
                <Card.Title style={{paddingTop: "5px"}}>
                    <Link to={{pathname: `/film/${props.film.id}`}} className="my-link">
                        <h5 style={{textTransform: "uppercase"}}><b>{props.film.name}</b></h5>
                    </Link>
                </Card.Title>
                <Card.Body style={{paddingTop: "0px"}}>
                    <div style={{
                        backgroundColor: "orange",
                        borderRadius: "10px",
                        margin: "5px 20% 20px 20%"
                    }}>
                        <b>Rating: {props.film.rating}</b>
                    </div>
                    <AddRemoveFilmBasket film={props.film}/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardFilm;