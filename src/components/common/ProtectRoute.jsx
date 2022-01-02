import React from 'react'
import {Redirect, Route} from 'react-router-dom'
import jwt from "jsonwebtoken"
import {Cookies} from "react-cookie"

function ProtectRoute({component: Component, ...rest}) {
    const cookies = new Cookies();
    return (
        <Route
            {...rest}
            render={(props) => {
                let token = cookies.get("jwt")
                jwt.verify(token, 'jwtappdemo', function (err) {
                    if (err) {
                        console.log("NOT VALID JWT")
                        cookies.remove("jwt", {path: "/"})
                        token = false
                    }
                });
                if (token) {
                    return <Component/>
                } else {
                    return <Redirect to={{pathname: "/", state: {from: props.location}}}/>
                }
            }}
        />
    )
}

export default ProtectRoute