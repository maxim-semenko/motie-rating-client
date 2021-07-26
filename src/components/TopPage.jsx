import React, {Component} from 'react';
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

class TopPage extends Component {
    render() {
        return (
            <div>
                <NavigationBar/>
                <h1>NEWEST PAGE</h1>
                <Footer/>
            </div>
        );
    }
}

export default TopPage;