import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {deleteGenreById} from "../../../../redux/genre/GenreAction";

function RemoveGenreDialog(props) {
    const dispatch = useDispatch()
    const {genre, loading} = useSelector(state => state.dataGenres)

    const handleSubmit = () => {
        dispatch(deleteGenreById(genre.id))
        props.onHide()
    }

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
                <div style={{color: "white"}}>
                    <b>
                        <h4>
                            <p>Are you really want to remove this genre?!</p>
                            <p>Name: <span style={{textTransform: "uppercase"}}>{genre.name}</span></p>
                        </h4>
                    </b>
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
                    <Modal.Title style={{color: "#9a9da0"}}><b>Remove genre "{genre.name}"</b></Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    {showContent()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-success" onClick={closeModal}>Close</Button>
                    <Button variant={"outline-danger"}
                            type="submit"
                            onClick={handleSubmit}>
                        Remove
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RemoveGenreDialog;