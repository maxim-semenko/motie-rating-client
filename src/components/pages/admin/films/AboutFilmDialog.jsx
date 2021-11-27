import React from 'react';
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

function AboutFilmDialog(props) {
    const dispatch = useDispatch()
    const {film, loading} = useSelector(state => state.dataFilms)


    const closeModal = () => {
        props.onHide()
    }

    const showContent = () => {
        if (loading) {
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
                                <img src={film.imageURL} alt={film.imageURL} height="450rem"
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
                                    <h5><b>Country:</b> {film.country.name}</h5>
                                    <h5><b>Genre:</b> {film.genre.name}</h5>
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
                    <Modal.Title style={{color: "#9a9da0"}}><b>About film "{film.name}"</b></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    {showContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={closeModal}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default AboutFilmDialog;