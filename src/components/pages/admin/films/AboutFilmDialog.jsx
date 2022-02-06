import React from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {useSelector} from "react-redux";

function AboutFilmDialog(props) {
    const {film, loadingFilm} = useSelector(state => state.dataFilms)

    const showContent = () => {
        if (loadingFilm) {
            return (
                <div>
                    loading...
                </div>
            )
        } else {
            return (
                <div>
                    <Container>
                        <Row>
                            <Col lg={5} style={{marginTop: "20px"}}>
                                <img src={film.imageURL} alt={film.imageURL} height="450rem" width="300rem"
                                     style={{border: "2px solid black"}}/>
                            </Col>
                            <Col lg={7} style={{marginTop: "20px", textAlign: "left"}}>
                                <div style={{color: "white"}}>
                                    <h1 style={{textTransform: "uppercase"}}>{film.name}</h1>
                                    <p style={{textAlign: "justify"}}><b>Description:</b> {film.description}</p>
                                    <hr/>
                                    <h5><b>Year:</b> {film.year}</h5>
                                    <h5><b>Time:</b> {film.timeInMinutes} minutes</h5>
                                    <h5><b>Price:</b> {film.price}$</h5>
                                    <h5><b>Countries: </b>
                                        {
                                            film.countries.map((item, index) =>
                                                <span key={index} style={{marginRight: "8px"}}>
                                                            <b>{item.name}</b>
                                                </span>
                                            )
                                        }
                                    </h5>
                                    <h5><b>Genres: </b>
                                        {
                                            film.genres.map((item, index) =>
                                                <span key={index}>
                                                            <b>{item.name} </b>
                                                </span>
                                            )
                                        }
                                    </h5>
                                    <h5><b>Rating:</b> {film.rating}</h5>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
        }
    }

    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#9a9da0"}}><b>About film</b></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    {showContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={() => props.onHide()}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AboutFilmDialog;