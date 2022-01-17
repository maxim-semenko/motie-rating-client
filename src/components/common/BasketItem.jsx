import React from 'react'
import {Card} from "react-bootstrap"
import {Link} from "react-router-dom"
import AddRemoveFilmBasket from "./AddRemoveFilmBasket";

function BasketItem(props) {
    return (
        <div>
            <Card className="customCard" style={{textAlign: "left"}}>
                <Card.Header style={{textAlign: "left"}}>
                    <Link to={{pathname: `/film/${props.film.id}`}} className="my-link">
                        <h2>{props.film.name}</h2>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <div>
                        <Link to={{pathname: `/film/${props.film.id}`}}>
                            <img alt="" src={props.film.imageURL} height="200px"
                                 style={{float: "left", paddingRight: "10px", paddingBottom: "10px"}}/>
                        </Link>
                        <blockquote className="blockquote mb-0">
                            <p style={{textAlign: "justify"}}>
                                <b>Description: </b> {props.film.description}
                            </p>
                        </blockquote>
                    </div>
                    <br/>
                    <AddRemoveFilmBasket film={props.film}/>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BasketItem