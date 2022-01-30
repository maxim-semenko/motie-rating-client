import React from 'react';
import {Button, Modal} from "react-bootstrap";
import {deleteFilmById, getFilms} from "../../../../redux/film/FilmAction";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";

function RemoveFilmDialog(props) {
    const dispatch = useDispatch()
    const {film, loadingFilm, currentPage, sizePage} = useSelector(state => state.dataFilms)

    const handleSubmit = () => {
        dispatch(deleteFilmById(film.id))
            .then((response) => {
                console.log(response)
                dispatch(getFilms(currentPage, sizePage))
                props.onHide()
                notifySuccess('The film was deleted successfully!')
            })
            .catch((error) => {
                console.log("AAAAAAAAAAAAAAAaa")
                // console.log(error)
                notifyError('Error to delete the film!')
            });
    }

    const notifySuccess = (text) => toast.success(text, {
        position: "top-right",
    });

    const notifyError = (text) => toast.error(text, {
        position: "top-right",
    });

    const closeModal = () => {
        props.onHide()
    }

    const showContent = () => {
        if (loadingFilm) {
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
                            <p>Are you really want to remove this film?!</p>
                            <p>Name: <span style={{textTransform: "uppercase"}}>{film.name}</span></p>
                            <p><img alt="" src={film.imageURL} height="350px" style={{marginTop: "10px"}}/></p>
                        </h4>
                    </b>
                </div>
            )
        }
    }

    toast.configure()
    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#9a9da0"}}><b>Remove film</b></Modal.Title>
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

export default RemoveFilmDialog;