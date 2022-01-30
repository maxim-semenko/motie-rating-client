import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Button, Modal} from "react-bootstrap";
import {deleteCountryById} from "../../../../redux/country/CountryAction";
import {toast} from "react-toastify";

function RemoveCountryDialog(props) {
    const dispatch = useDispatch()
    const {country, loading} = useSelector(state => state.dataCountries)

    const handleSubmit = () => {
        dispatch(deleteCountryById(country.id))
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
                            <p>Are you really want to remove this country?!</p>
                            <p>Name: <span style={{textTransform: "uppercase"}}>{country.name}</span></p>
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
                    <Modal.Title style={{color: "#9a9da0"}}><b>Remove country</b></Modal.Title>
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

export default RemoveCountryDialog;