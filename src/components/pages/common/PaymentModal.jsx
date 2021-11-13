import React from 'react';
import {Button, Modal} from "react-bootstrap";

function PaymentModal(props) {
    return (
        <div>
            <Modal{...props} size="lg"
                  dialogClassName="modal-90w public-profile-modal-class"
                  aria-labelledby="example-custom-modal-styling-title"
                  className="special_modal">
                <Modal.Header closeButton>
                    <Modal.Title>{props.method === "create" ? "Create film" : "Update film"}</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-dark">
                    Payment
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-danger">Close</Button>
                    <Button variant={props.method === "create" ? "outline-primary" : "outline-success"}
                            type="submit">

                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default PaymentModal;