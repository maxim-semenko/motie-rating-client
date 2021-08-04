import React from 'react';
import Route from 'react-router-dom/Route';
import Redirect from 'react-router-dom/Redirect';
import jwt from "jsonwebtoken";
import {Cookies} from "react-cookie";

const cookies = new Cookies();

function ProtectRoute({component: Component, ...rest}) {
    return (
        <Route
            {...rest}
            render={(props) => {
                let token = cookies.get("jwt");
                jwt.verify(token, 'jwtappdemo', function (err) {
                    if (err) {
                        console.log("NOT VALID JWT");
                        cookies.remove("jwt", {path: "/"});
                        token = false;
                    }
                });
                if (token) {
                    return <Component/>;
                } else {
                    return (
                        <Redirect to={{pathname: "/", state: {from: props.location}}}/>
                    );
                }
            }}
        />
    );
}

export default ProtectRoute;