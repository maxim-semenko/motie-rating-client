import React from 'react'
import {Button, Card} from "react-bootstrap"
import {Link} from "react-router-dom"

function BasketItem(props) {
    return (
        <div>
            <Card className="customCard" style={{textAlign: "left"}}>
                <Card.Header style={{textAlign: "left"}}>
                    <Link to={{pathname: `/film/${props.film.id}`}}
                          className="my-link">
                        <h2>{props.film.name}</h2>
                    </Link>
                </Card.Header>
                <Card.Body>
                    <blockquote className="blockquote mb-0">
                        <p style={{textAlign: "justify"}}>
                            Description: {props.film.description}
                        </p>
                    </blockquote>
                    <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                        <Button variant="outline-success">
                            <b>Buy film({props.film.price}$)</b>
                        </Button>{' '}
                        <Button variant="outline-danger"
                                onClick={() => props.removeFromBasket(props.film.id)}>
                            <b>Remove from basket</b>
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
}

export default BasketItem