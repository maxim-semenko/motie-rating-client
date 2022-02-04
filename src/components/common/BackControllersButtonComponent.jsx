import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function BackControllersButtonComponent() {
    return (
        <Link to="/profile/admin/controllers">
            <Button variant="outline-danger"
                    style={{marginBottom: "20px"}}>
                <b>Back to controllers</b>
            </Button>{' '}
        </Link>
    );
}

export default BackControllersButtonComponent;