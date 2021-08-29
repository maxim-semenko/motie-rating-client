import React from 'react';
import Button from "react-bootstrap/Button";

function AddRemoveFilmBasket(props) {
    return (
        <div>
            {
                props.isContain === true ?
                    <div>
                        <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                            <Button variant="outline-success">
                                <b>Buy film</b>
                            </Button>{' '}
                            <Button variant="outline-danger" onClick={() => props.methodRemove(props.filmId)}>
                                <b>Remove from basket</b>
                            </Button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="d-grid gap-2" style={{marginTop: "20px"}}>
                            <Button variant="outline-success"
                                    disabled={!localStorage.getItem("user")}>
                                <b>Buy film</b>
                            </Button>{' '}
                            <Button variant="outline-primary" disabled={!localStorage.getItem("user")}
                                    onClick={() => props.methodAdd(props.film)}>
                                <b>Add to basket</b>
                            </Button>
                        </div>
                    </div>
            }
        </div>
    )
}

export default AddRemoveFilmBasket