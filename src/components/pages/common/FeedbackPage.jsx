import React, {useEffect, useState} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "../../Footer";
import {useHistory} from 'react-router-dom'

function FeedbackPage(props) {
    const history = useHistory('');

    const search = window.location.search;
    const params = new URLSearchParams(search);
    const [username, setUsername] = useState('');
    const [firstname, setFirstname] = useState('');
    useEffect(() => {
        if (params.toString() === "") {
            console.log("AAAAAAAAAa");
        }
    }, [])

    const updateUrl = (event) => {
        const {name, value} = event?.target;
        value === "" ? params.delete(name) : params.set(name, value);

        history.push({
            pathname: window.location.pathname,
            search: params.toString()
        });
    }

    return (
        <div>
            <NavigationBar/>
            <h1>FEEDBACK PAGE</h1>
            <input name={"username"} onChange={updateUrl}/>
            <br/>
            <input name={"firstname"} onChange={updateUrl}/>
            <br/>
            {/*<Button onClick={() => history.push("/")}>Go to</Button>*/}
            <p>USERNAME = {params.get('username')}</p>
            <Footer/>
        </div>
    );
}

export default FeedbackPage;