import React from 'react';
import {Link} from "react-router-dom";
import {Button} from "react-bootstrap";

function BackControlsButtonComponent() {
    return (
        <Link to="/profile/admin/controls">
            <Button variant="outline-danger" style={{marginBottom: "20px"}}><b>Back to controls</b></Button>{' '}
        </Link>
    );
}

export default BackControlsButtonComponent;
